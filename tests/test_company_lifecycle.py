"""Isolated SQLite tests for Company CRM lifecycle behavior.

These tests always override DATABASE_URL before importing the application, so
they cannot connect to a developer or production database.
"""

import os
import unittest
from decimal import Decimal

os.environ["DATABASE_URL"] = "sqlite:///:memory:"
os.environ["SECRET_KEY"] = "isolated-company-lifecycle-test-key"

from app import (  # noqa: E402
    AuditLog,
    Company,
    CompanyBudget,
    Invoice,
    Product,
    User,
    app,
    db,
    get_or_create_company,
)
from tests.sqlite_audit_helpers import register_sqlite_audit_id_handler  # noqa: E402


class CompanyLifecycleTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        app.config.update(TESTING=True, SECRET_KEY="company-lifecycle-test")
        cls.client = app.test_client()
        register_sqlite_audit_id_handler()

    def setUp(self):
        with app.app_context():
            db.drop_all()
            db.create_all()
            self.user = User(
                username="crm-test-admin",
                password_hash="not-used",
                role="admin",
            )
            db.session.add(self.user)
            db.session.add(Product(code="ALPHA", name="Product Alpha", status="ACTIVE"))
            db.session.commit()
            self.user_id = self.user.id
        with self.client.session_transaction() as session:
            session["user_id"] = self.user_id
            session["csrf_token"] = "csrf-test-token"

    def tearDown(self):
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def post(self, url, **kwargs):
        headers = kwargs.pop("headers", {})
        headers["X-CSRF-Token"] = "csrf-test-token"
        return self.client.post(url, headers=headers, **kwargs)

    def test_new_company_defaults_are_active_with_utc_timestamps(self):
        with app.app_context():
            company = Company(name="New CRM Company")
            db.session.add(company)
            db.session.commit()
            self.assertEqual(company.status, "ACTIVE")
            self.assertIsNotNone(company.created_at)
            self.assertIsNotNone(company.updated_at)
            self.assertTrue(Company.created_at.property.columns[0].type.timezone)

    def test_archiving_preserves_financial_rows_and_is_idempotent(self):
        with app.app_context():
            company = Company(name="Financial History Ltd", stamp_filename="stamp.png")
            db.session.add(company)
            db.session.flush()
            invoice = Invoice(
                company_id=company.id,
                software="ALPHA",
                amount_eur=Decimal("120.00"),
                paid_amount_eur=Decimal("0.00"),
                currency="EUR",
            )
            budget = CompanyBudget(
                company_id=company.id,
                software="ALPHA",
                total_amount=Decimal("500.00"),
                currency="EUR",
            )
            db.session.add_all([invoice, budget])
            db.session.commit()
            company_id, invoice_id, budget_id = company.id, invoice.id, budget.id

        first = self.post(f"/companies/{company_id}/delete")
        second = self.post(f"/companies/{company_id}/delete")
        self.assertEqual(first.status_code, 200, first.get_data(as_text=True))
        self.assertEqual(second.status_code, 200, second.get_data(as_text=True))

        with app.app_context():
            company = db.session.get(Company, company_id)
            self.assertEqual(company.status, "ARCHIVED")
            self.assertEqual(company.stamp_filename, "stamp.png")
            self.assertIsNotNone(db.session.get(Invoice, invoice_id))
            self.assertIsNotNone(db.session.get(CompanyBudget, budget_id))
            self.assertEqual(
                AuditLog.query.filter_by(action="COMPANY_ARCHIVED").count(),
                1,
            )

    def test_archived_company_is_not_duplicated_and_requires_reactivation(self):
        with app.app_context():
            company = Company(name="Archived Prospect", status="ARCHIVED")
            db.session.add(company)
            db.session.commit()
            company_id = company.id
            with self.assertRaises(ValueError):
                get_or_create_company("Archived Prospect")
            self.assertEqual(Company.query.filter_by(name="Archived Prospect").count(), 1)

        result = self.post(
            "/save_generated_invoice",
            json={
                "company_name": "Archived Prospect",
                "invoice_number": "CRM-ARCHIVED-1",
                "invoice_date": "2026-01-01",
                "software": "ALPHA",
                "currency": "EUR",
                "amount_eur": "25.00",
            },
        )
        self.assertEqual(result.status_code, 409, result.get_data(as_text=True))
        self.assertEqual(result.json["code"], "company_archived")

        budget_result = self.post(
            "/update_company_budget",
            data={
                "company_id": str(company_id),
                "software": "ALPHA",
                "currency": "EUR",
                "total_amount": "100.00",
            },
        )
        self.assertEqual(budget_result.status_code, 409, budget_result.get_data(as_text=True))

        restored = self.post(f"/companies/{company_id}/reactivate")
        self.assertEqual(restored.status_code, 200, restored.get_data(as_text=True))
        with app.app_context():
            self.assertEqual(db.session.get(Company, company_id).status, "ACTIVE")

    def test_active_company_still_accepts_new_invoice_and_budget(self):
        with app.app_context():
            company = Company(name="Active Customer")
            db.session.add(company)
            db.session.commit()
            company_id = company.id

        invoice_response = self.post(
            "/save_generated_invoice",
            json={
                "company_name": "Active Customer",
                "invoice_number": "ACTIVE-1",
                "invoice_date": "2026-01-01",
                "software": "ALPHA",
                "currency": "EUR",
                "amount_eur": "25.00",
            },
        )
        self.assertEqual(invoice_response.status_code, 200, invoice_response.get_data(as_text=True))

        budget_response = self.post(
            "/update_company_budget",
            data={
                "company_id": str(company_id),
                "software": "ALPHA",
                "currency": "EUR",
                "total_amount": "100.00",
            },
        )
        self.assertEqual(budget_response.status_code, 200, budget_response.get_data(as_text=True))


if __name__ == "__main__":
    unittest.main()
