"""CRM contact tests using an isolated in-memory SQLite database only."""

import os
import unittest
import uuid
from decimal import Decimal

os.environ["DATABASE_URL"] = "sqlite:///:memory:"
os.environ["SECRET_KEY"] = "isolated-contact-crm-test-key"

from app import (  # noqa: E402
    AuditLog,
    Company,
    CompanyBudget,
    Contact,
    Invoice,
    Product,
    User,
    app,
    db,
)
from tests.sqlite_audit_helpers import register_sqlite_audit_id_handler  # noqa: E402


class ContactCrmTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        app.config.update(TESTING=True, SECRET_KEY="contact-crm-test-key")
        cls.client = app.test_client()
        with app.app_context():
            db.create_all()
        register_sqlite_audit_id_handler()

    def setUp(self):
        self.suffix = uuid.uuid4().hex[:12]
        self.company_counter = 0
        with app.app_context():
            db.create_all()
            username = f"contact-{self.suffix}"
            user = User(username=username, password_hash="unused", role="admin")
            product = Product.query.filter_by(code="CONTACT_TEST").first()
            if product is None:
                product = Product(code="CONTACT_TEST", name="Contact Test Product", status="ACTIVE")
                db.session.add(product)
            db.session.add(user)
            db.session.commit()
            self.user_id = user.id
        with self.client.session_transaction() as session:
            session["user_id"] = self.user_id
            session["csrf_token"] = "contact-crm-csrf"

    def create_company(self, status="ACTIVE"):
        self.company_counter += 1
        with app.app_context():
            company = Company(
                name=f"Contact CRM {self.suffix}-{self.company_counter}",
                status=status,
            )
            db.session.add(company)
            db.session.commit()
            return company.id

    def create_contact(self, company_id, full_name="Jordan Smith", **values):
        payload = {"full_name": full_name, **values}
        response = self.post(f"/companies/{company_id}/contacts", json=payload)
        self.assertEqual(response.status_code, 201, response.get_data(as_text=True))
        return response.json["contact_id"]

    def post(self, url, **kwargs):
        headers = kwargs.pop("headers", {})
        headers["X-CSRF-Token"] = "contact-crm-csrf"
        return self.client.post(url, headers=headers, **kwargs)

    def test_create_contact_and_normalize_fields(self):
        company_id = self.create_company()
        contact_id = self.create_contact(
            company_id,
            "  Jordan Smith  ",
            email="  Jordan@Example.COM ",
            phone=" +1 555 0100 ",
            job_title=" Finance Lead ",
        )
        with app.app_context():
            contact = db.session.get(Contact, contact_id)
            self.assertEqual(contact.company_id, company_id)
            self.assertEqual(contact.full_name, "Jordan Smith")
            self.assertEqual(contact.email, "jordan@example.com")
            self.assertEqual(contact.phone, "+1 555 0100")
            self.assertEqual(contact.job_title, "Finance Lead")
            self.assertEqual(contact.status, "ACTIVE")
            self.assertFalse(contact.is_primary)
            self.assertIsNotNone(contact.created_at)
            self.assertIsNotNone(contact.updated_at)
            self.assertTrue(Contact.created_at.property.columns[0].type.timezone)

    def test_name_is_required_and_fields_obey_length_limits(self):
        company_id = self.create_company()
        missing_name = self.post(f"/companies/{company_id}/contacts", json={"email": "a@example.com"})
        self.assertEqual(missing_name.status_code, 400)
        self.assertEqual(missing_name.json["message"], "Contact name is required.")

        for field, maximum in {
            "full_name": 255,
            "job_title": 255,
            "email": 255,
            "phone": 100,
            "mobile": 100,
        }.items():
            payload = {"full_name": "Valid Person", field: "x" * (maximum + 1)}
            response = self.post(f"/companies/{company_id}/contacts", json=payload)
            self.assertEqual(response.status_code, 400, field)
            self.assertEqual(response.json["message"], "Contact field exceeds its maximum length.")

        invalid_email = self.post(
            f"/companies/{company_id}/contacts",
            json={"full_name": "Valid Person", "email": "not-an-email"},
        )
        self.assertEqual(invalid_email.status_code, 400)
        self.assertEqual(invalid_email.json["message"], "Enter a valid email address.")

    def test_viewer_cannot_modify_contacts(self):
        company_id = self.create_company()
        contact_id = self.create_contact(company_id)
        with app.app_context():
            viewer = User(
                username=f"viewer-{self.suffix}",
                password_hash="unused",
                role="viewer",
            )
            db.session.add(viewer)
            db.session.commit()
            viewer_id = viewer.id
        with self.client.session_transaction() as session:
            session["user_id"] = viewer_id

        response = self.post(
            f"/companies/{company_id}/contacts/{contact_id}/update",
            json={"full_name": "Changed Name"},
        )
        self.assertEqual(response.status_code, 403)
        with app.app_context():
            self.assertEqual(db.session.get(Contact, contact_id).full_name, "Jordan Smith")

    def test_contact_cannot_be_accessed_through_another_company_id(self):
        company_id = self.create_company()
        other_company_id = self.create_company()
        contact_id = self.create_contact(company_id)
        response = self.post(
            f"/companies/{other_company_id}/contacts/{contact_id}/archive"
        )
        self.assertEqual(response.status_code, 404)
        with app.app_context():
            self.assertEqual(db.session.get(Contact, contact_id).status, "ACTIVE")

    def test_assigning_primary_contact_replaces_previous_primary(self):
        company_id = self.create_company()
        first_id = self.create_contact(company_id, "First Contact", is_primary=True)
        second_id = self.create_contact(company_id, "Second Contact")
        result = self.post(f"/companies/{company_id}/contacts/{second_id}/primary")
        self.assertEqual(result.status_code, 200, result.get_data(as_text=True))
        with app.app_context():
            first = db.session.get(Contact, first_id)
            second = db.session.get(Contact, second_id)
            self.assertFalse(first.is_primary)
            self.assertTrue(second.is_primary)
            self.assertEqual(
                Contact.query.filter_by(company_id=company_id, status="ACTIVE", is_primary=True).count(),
                1,
            )

    def test_create_as_primary_is_audited_as_both_creation_and_assignment(self):
        company_id = self.create_company()
        contact_id = self.create_contact(company_id, "Primary Contact", is_primary=True)
        with app.app_context():
            actions = {
                row.action
                for row in AuditLog.query.filter_by(
                    entity_type="contact",
                    entity_id=contact_id,
                    company_id=company_id,
                ).all()
            }
            self.assertIn("CONTACT_CREATED", actions)
            self.assertIn("CONTACT_PRIMARY_SET", actions)

    def test_contact_archive_and_restore_are_idempotent(self):
        company_id = self.create_company()
        contact_id = self.create_contact(company_id, is_primary=True)
        archived = self.post(f"/companies/{company_id}/contacts/{contact_id}/archive")
        repeated_archive = self.post(f"/companies/{company_id}/contacts/{contact_id}/archive")
        self.assertEqual(archived.status_code, 200)
        self.assertEqual(repeated_archive.status_code, 200)
        with app.app_context():
            contact = db.session.get(Contact, contact_id)
            self.assertEqual(contact.status, "ARCHIVED")
            self.assertFalse(contact.is_primary)

        restored = self.post(f"/companies/{company_id}/contacts/{contact_id}/restore")
        repeated_restore = self.post(f"/companies/{company_id}/contacts/{contact_id}/restore")
        self.assertEqual(restored.status_code, 200)
        self.assertEqual(repeated_restore.status_code, 200)
        with app.app_context():
            contact = db.session.get(Contact, contact_id)
            self.assertEqual(contact.status, "ACTIVE")
            self.assertFalse(contact.is_primary)

    def test_archived_company_rejects_create_and_contact_restore(self):
        company_id = self.create_company(status="ARCHIVED")
        rejected_create = self.post(
            f"/companies/{company_id}/contacts",
            json={"full_name": "Archived Company Contact"},
        )
        self.assertEqual(rejected_create.status_code, 409)

        with app.app_context():
            contact = Contact(company_id=company_id, full_name="Archived Contact", status="ARCHIVED")
            db.session.add(contact)
            db.session.commit()
            contact_id = contact.id
        rejected_restore = self.post(f"/companies/{company_id}/contacts/{contact_id}/restore")
        self.assertEqual(rejected_restore.status_code, 409)
        with app.app_context():
            self.assertEqual(db.session.get(Contact, contact_id).status, "ARCHIVED")

    def test_company_archive_keeps_contacts_invoices_and_budgets(self):
        company_id = self.create_company()
        contact_id = self.create_contact(company_id, is_primary=True)
        with app.app_context():
            invoice = Invoice(
                company_id=company_id,
                software="CONTACT_TEST",
                amount_eur=Decimal("120.00"),
                paid_amount_eur=Decimal("0.00"),
                currency="EUR",
            )
            budget = CompanyBudget(
                company_id=company_id,
                software="CONTACT_TEST",
                total_amount=Decimal("500.00"),
                currency="EUR",
            )
            db.session.add_all([invoice, budget])
            db.session.commit()
            invoice_id, budget_id = invoice.id, budget.id

        response = self.post(f"/companies/{company_id}/delete")
        self.assertEqual(response.status_code, 200)
        with app.app_context():
            self.assertIsNotNone(db.session.get(Contact, contact_id))
            self.assertIsNotNone(db.session.get(Invoice, invoice_id))
            self.assertIsNotNone(db.session.get(CompanyBudget, budget_id))

    def test_company_detail_is_available_to_viewer_and_shows_finance_history(self):
        company_id = self.create_company()
        contact_id = self.create_contact(company_id)
        with app.app_context():
            invoice = Invoice(
                company_id=company_id,
                software="CONTACT_TEST",
                amount_eur=Decimal("120.00"),
                paid_amount_eur=Decimal("0.00"),
                currency="EUR",
                invoice_number="CONTACT-DETAIL-1",
            )
            budget = CompanyBudget(
                company_id=company_id,
                software="CONTACT_TEST",
                total_amount=Decimal("500.00"),
                currency="EUR",
            )
            db.session.add_all([invoice, budget])
            db.session.commit()
            viewer = User(username=f"detail-viewer-{self.suffix}", password_hash="unused", role="viewer")
            db.session.add(viewer)
            db.session.commit()
            viewer_id = viewer.id
        with self.client.session_transaction() as session:
            session["user_id"] = viewer_id
        response = self.client.get(f"/companies/{company_id}")
        self.assertEqual(response.status_code, 200)
        html = response.get_data(as_text=True)
        self.assertIn("Jordan Smith", html)
        self.assertIn("CONTACT-DETAIL-1", html)
        self.assertIn("CONTACT_TEST", html)
        self.assertNotIn("contactForm", html)
        with app.app_context():
            self.assertEqual(db.session.get(Contact, contact_id).company_id, company_id)

    def test_audit_records_contact_operations_without_personal_values(self):
        company_id = self.create_company()
        contact_id = self.create_contact(
            company_id,
            "Private Contact Name",
            email="private@example.com",
            notes="Confidential note",
        )
        self.post(
            f"/companies/{company_id}/contacts/{contact_id}/update",
            json={"full_name": "Updated Private Name", "notes": "Updated secret"},
        )
        self.post(f"/companies/{company_id}/contacts/{contact_id}/primary")
        self.post(f"/companies/{company_id}/contacts/{contact_id}/archive")
        self.post(f"/companies/{company_id}/contacts/{contact_id}/restore")
        with app.app_context():
            logs = AuditLog.query.filter(
                AuditLog.entity_type == "contact",
                AuditLog.company_id == company_id,
            ).all()
            actions = {row.action for row in logs}
            self.assertTrue({
                "CONTACT_CREATED",
                "CONTACT_UPDATED",
                "CONTACT_PRIMARY_SET",
                "CONTACT_ARCHIVED",
                "CONTACT_RESTORED",
            }.issubset(actions))
            for log in logs:
                self.assertNotIn("Private Contact Name", log.details or "")
                self.assertNotIn("private@example.com", log.details or "")
                self.assertNotIn("Confidential note", log.details or "")


if __name__ == "__main__":
    unittest.main()
