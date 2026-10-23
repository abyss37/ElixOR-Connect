"""Audit API tests using an isolated in-memory SQLite database."""

import json
import os
from pathlib import Path
import unittest
import uuid

os.environ["DATABASE_URL"] = "sqlite:///:memory:"
os.environ["SECRET_KEY"] = "isolated-audit-log-test-key"

from app import AuditLog, Company, User, app, db  # noqa: E402
from tests.sqlite_audit_helpers import register_sqlite_audit_id_handler  # noqa: E402


class AuditLogContactPrivacyTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        app.config.update(TESTING=True, SECRET_KEY="audit-log-test-key")
        cls.client = app.test_client()
        with app.app_context():
            db.create_all()
        register_sqlite_audit_id_handler()

    def test_contact_audit_api_redacts_personal_values_and_preserves_financial_details(self):
        suffix = uuid.uuid4().hex[:12]
        with app.app_context():
            user = User(
                username=f"audit-{suffix}",
                password_hash="unused",
                role="admin",
            )
            company = Company(name=f"Audit Privacy {suffix}")
            db.session.add_all([user, company])
            db.session.flush()

            contact_log = AuditLog(
                action="CONTACT_UPDATED",
                entity_type="contact",
                entity_id="12",
                company_id=company.id,
                user_id=user.id,
                description="Private Person private@example.test +1-555-0100 confidential note",
                details=json.dumps({
                    "changed_fields": ["full_name", "email", "notes", "private@example.test"],
                    "full_name": "Private Person",
                    "email": "private@example.test",
                    "phone": "+1-555-0100",
                    "notes": "confidential note",
                }),
            )
            financial_log = AuditLog(
                action="UPDATE_INVOICE",
                entity_type="invoice",
                entity_id="42",
                company_id=company.id,
                user_id=user.id,
                description="Invoice total updated",
                details=json.dumps({"amount": "125.00", "currency": "EUR"}),
            )
            db.session.add_all([contact_log, financial_log])
            db.session.commit()
            user_id = user.id
            contact_log_id = contact_log.id
            financial_log_id = financial_log.id

        with self.client.session_transaction() as session:
            session["user_id"] = user_id

        response = self.client.get("/api/audit-log")
        self.assertEqual(response.status_code, 200)
        body = response.get_data(as_text=True)
        self.assertNotIn("Private Person", body)
        self.assertNotIn("private@example.test", body)
        self.assertNotIn("+1-555-0100", body)
        self.assertNotIn("confidential note", body)

        items = {item["id"]: item for item in response.json["items"]}
        contact_item = items[contact_log_id]
        self.assertIsNone(contact_item["description"])
        self.assertIsNone(contact_item["entity_id"])
        self.assertIsNone(contact_item["software"])
        self.assertEqual(
            contact_item["details"],
            {"changed_fields": ["full_name", "email", "notes"]},
        )
        self.assertEqual(
            items[financial_log_id]["details"],
            {"amount": "125.00", "currency": "EUR"},
        )
        self.assertEqual(items[financial_log_id]["description"], "Invoice total updated")

    def test_password_change_event_has_localized_label_and_safe_target_username(self):
        suffix = uuid.uuid4().hex[:12]
        with app.app_context():
            user = User(
                username=f"actor-{suffix}",
                password_hash="unused",
                role="admin",
            )
            db.session.add(user)
            db.session.flush()
            password_log = AuditLog(
                action="USER_PASSWORD_CHANGED",
                entity_type="user",
                entity_id="77",
                user_id=user.id,
                description="Password changed for user kato",
                details=json.dumps({"username": "kato"}),
            )
            db.session.add(password_log)
            db.session.commit()
            user_id = user.id
            password_log_id = password_log.id

        with self.client.session_transaction() as session:
            session["user_id"] = user_id

        response = self.client.get("/api/audit-log")
        self.assertEqual(response.status_code, 200)
        event = next(
            item for item in response.json["items"]
            if item["id"] == password_log_id
        )
        self.assertEqual(event["action"], "USER_PASSWORD_CHANGED")
        self.assertEqual(event["description"], "Password changed for user kato")
        self.assertEqual(event["details"], {"username": "kato"})

        audit_js = Path("static/js/audit.js").read_text(encoding="utf-8")
        translations = Path("static/js/finflow-i18n.js").read_text(encoding="utf-8")
        self.assertIn("USER_PASSWORD_CHANGED: 'User password changed'", audit_js)
        self.assertIn("legacyPasswordDescription.test(String(description))", audit_js)
        self.assertIn(
            '"User password changed": ["Пароль користувача змінено", "User password changed"]',
            translations,
        )
        self.assertIn('"User": ["Користувач", "User"]', translations)


if __name__ == "__main__":
    unittest.main()
