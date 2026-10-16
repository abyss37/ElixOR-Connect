import contextlib
import io
import json
import re
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch


REPO_ROOT = Path(__file__).resolve().parents[2]
SCRIPT = REPO_ROOT / "ops" / "elixor-deploy"


def get_embedded_python_blocks():
    text = SCRIPT.read_text(encoding="utf-8")

    blocks = re.findall(
        r"<<'PYTHON'\n(.*?)\nPYTHON",
        text,
        flags=re.DOTALL,
    )

    if len(blocks) != 2:
        raise AssertionError(
            f"Expected 2 embedded Python blocks, found {len(blocks)}"
        )

    return blocks


class SnapshotValidatorTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # The second heredoc validates the saved package snapshot.
        cls.validator = get_embedded_python_blocks()[1]

    def validate(self, contents):
        with tempfile.TemporaryDirectory(
            prefix="elixor-snapshot-test-"
        ) as directory:
            snapshot = Path(directory) / "requirements-before.txt"
            snapshot.write_text(contents, encoding="utf-8")

            return subprocess.run(
                [
                    sys.executable,
                    "-c",
                    self.validator,
                    str(snapshot),
                ],
                capture_output=True,
                text=True,
                check=False,
            )

    def test_accepts_pinned_packages(self):
        result = self.validate(
            "Flask==3.1.3\n"
            "psycopg-binary==3.3.5\n"
            "typing_extensions==4.16.0\n"
        )

        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn("Validated 3 pinned packages", result.stdout)

    def test_rejects_empty_snapshot(self):
        result = self.validate("")

        self.assertNotEqual(result.returncode, 0)
        self.assertIn("no valid package pins", result.stderr)

    def test_rejects_version_ranges(self):
        result = self.validate("Flask>=3.1.0\n")

        self.assertNotEqual(result.returncode, 0)
        self.assertIn("Unsupported snapshot entry", result.stderr)

    def test_rejects_direct_urls(self):
        result = self.validate(
            "Flask @ https://example.invalid/flask.whl\n"
        )

        self.assertNotEqual(result.returncode, 0)
        self.assertIn("Unsupported snapshot entry", result.stderr)

    def test_rejects_duplicate_normalized_names(self):
        result = self.validate(
            "example-package==1.0\n"
            "example_package==2.0\n"
        )

        self.assertNotEqual(result.returncode, 0)
        self.assertIn("Duplicate normalized package name", result.stderr)


class DeploymentScriptStructureTests(unittest.TestCase):
    def test_script_rejects_arguments(self):
        text = SCRIPT.read_text(encoding="utf-8")

        self.assertIn(
            'if [ "$#" -ne 0 ]; then',
            text,
        )

    def test_rollback_checks_exact_package_versions(self):
        text = SCRIPT.read_text(encoding="utf-8")

        self.assertIn(
            'if actual_version != expected_version:',
            text,
        )
        self.assertIn(
            'raise SystemExit(1)',
            text,
        )
        self.assertIn(
            'echo "CRITICAL: ROLLBACK INCOMPLETE."',
            text,
        )

    def test_deployment_uses_health_check(self):
        text = SCRIPT.read_text(encoding="utf-8")

        self.assertIn("http://127.0.0.1/health", text)
        self.assertIn("ROLLBACK COMPLETED.", text)

    def test_signal_handlers_are_registered(self):
        text = SCRIPT.read_text(encoding="utf-8")

        self.assertIn('trap \'handle_deploy_signal HUP\' HUP', text)
        self.assertIn('trap \'handle_deploy_signal INT\' INT', text)
        self.assertIn('trap \'handle_deploy_signal TERM\' TERM', text)
        self.assertIn('trap - ERR HUP INT TERM', text)
        self.assertIn('SIGNAL_EXIT_CODE="$exit_code"', text)

    def test_update_flag_is_set_before_git_merge(self):
        text = SCRIPT.read_text(encoding="utf-8")

        update_position = text.index("===== UPDATE CODE =====")
        flag_position = text.index("UPDATED=1", update_position)
        merge_position = text.index(
            'git merge --ff-only "$TARGET_COMMIT"',
            update_position,
        )

        self.assertLess(flag_position, merge_position)

    def test_rollback_restores_packages_without_network_index(self):
        text = SCRIPT.read_text(encoding="utf-8")

        self.assertIn("--no-index", text)
        self.assertIn('--find-links "$WHEELHOUSE_DIR"', text)
        self.assertIn("--only-binary=:all:", text)
        self.assertIn("CRITICAL: Saved package snapshot or local wheelhouse is missing.", text)

    def test_package_archive_is_prepared_before_backup_and_code_update(self):
        text = SCRIPT.read_text(encoding="utf-8")

        download_position = text.index("===== SAVE OFFLINE PYTHON PACKAGE ARCHIVE =====")
        backup_position = text.index("===== CREATE BACKUP =====")
        update_position = text.index("===== UPDATE CODE =====")

        self.assertLess(download_position, backup_position)
        self.assertLess(backup_position, update_position)

    def test_package_archive_failure_aborts_before_code_update(self):
        text = SCRIPT.read_text(encoding="utf-8")

        download_position = text.index("===== SAVE OFFLINE PYTHON PACKAGE ARCHIVE =====")
        failure_position = text.index(
            "ERROR: Could not save all required package distributions."
        )
        update_position = text.index("===== UPDATE CODE =====")

        self.assertLess(download_position, failure_position)
        self.assertLess(failure_position, update_position)
        self.assertIn(
            'rm -rf -- "$STATE_DIR"\n    exit 1',
            text[failure_position:update_position],
        )


class PackageReconciliationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # The first heredoc reconciles the previous Python environment.
        cls.reconciler = get_embedded_python_blocks()[0]

    def run_reconciler(self, snapshot_contents, installed_packages):
        with tempfile.TemporaryDirectory(
            prefix="elixor-reconcile-test-"
        ) as directory:
            snapshot = Path(directory) / "requirements-before.txt"
            snapshot.write_text(snapshot_contents, encoding="utf-8")

            calls = []

            def fake_run(args, **kwargs):
                calls.append(args)

                if args[1:4] == ["-m", "pip", "list"]:
                    return SimpleNamespace(
                        stdout=json.dumps(installed_packages),
                        stderr="",
                        returncode=0,
                    )

                if args[1:4] == ["-m", "pip", "uninstall"]:
                    return SimpleNamespace(
                        stdout="",
                        stderr="",
                        returncode=0,
                    )

                raise AssertionError(
                    f"Unexpected subprocess invocation: {args!r}"
                )

            stdout = io.StringIO()
            stderr = io.StringIO()
            original_argv = sys.argv[:]
            exit_code = 0

            try:
                sys.argv = ["reconciler", str(snapshot)]

                with (
                    patch("subprocess.run", side_effect=fake_run),
                    contextlib.redirect_stdout(stdout),
                    contextlib.redirect_stderr(stderr),
                ):
                    try:
                        exec(
                            compile(
                                self.reconciler,
                                "<package-reconciler-test>",
                                "exec",
                            ),
                            {"__name__": "__main__"},
                        )
                    except SystemExit as exc:
                        exit_code = exc.code or 0
            finally:
                sys.argv = original_argv

            return exit_code, stdout.getvalue(), stderr.getvalue(), calls

    def test_accepts_exact_restored_versions(self):
        code, output, error, calls = self.run_reconciler(
            "Flask==3.1.3\n",
            [{"name": "Flask", "version": "3.1.3"}],
        )

        self.assertEqual(code, 0, error)
        self.assertIn("Verified exact versions", output)
        self.assertFalse(any(call[1:4] == ["-m", "pip", "uninstall"]
                             for call in calls))

    def test_rejects_version_mismatch(self):
        code, output, error, _ = self.run_reconciler(
            "Flask==3.1.3\n",
            [{"name": "Flask", "version": "3.1.4"}],
        )

        self.assertNotEqual(code, 0)
        self.assertIn("Package version verification failed", output)

    def test_rejects_missing_package(self):
        code, output, error, _ = self.run_reconciler(
            "Flask==3.1.3\n",
            [],
        )

        self.assertNotEqual(code, 0)
        self.assertIn("NOT INSTALLED", output)

    def test_removes_packages_not_in_snapshot(self):
        code, output, error, calls = self.run_reconciler(
            "Flask==3.1.3\n",
            [
                {"name": "Flask", "version": "3.1.3"},
                {"name": "UnexpectedPackage", "version": "1.0"},
            ],
        )

        self.assertEqual(code, 0, error)
        self.assertIn("UnexpectedPackage", output)
        self.assertTrue(
            any(
                call[1:4] == ["-m", "pip", "uninstall"]
                and "UnexpectedPackage" in call
                for call in calls
            )
        )


if __name__ == "__main__":
    unittest.main(verbosity=2)
