"""add company contacts

Revision ID: 20261022c02
Revises: 20261022c01
Create Date: 2026-10-22
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "20261022c02"
down_revision: Union[str, Sequence[str], None] = "20261022c01"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "contact",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column(
            "company_id",
            sa.Integer(),
            sa.ForeignKey("company.id", ondelete="RESTRICT"),
            nullable=False,
        ),
        sa.Column("full_name", sa.String(length=255), nullable=False),
        sa.Column("job_title", sa.String(length=255), nullable=True),
        sa.Column("email", sa.String(length=255), nullable=True),
        sa.Column("phone", sa.String(length=100), nullable=True),
        sa.Column("mobile", sa.String(length=100), nullable=True),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column(
            "is_primary",
            sa.Boolean(),
            nullable=False,
            server_default=sa.false(),
        ),
        sa.Column(
            "status",
            sa.String(length=20),
            nullable=False,
            server_default="ACTIVE",
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),
        sa.CheckConstraint(
            "length(trim(full_name)) > 0",
            name="ck_contact_full_name_nonempty",
        ),
        sa.CheckConstraint(
            "status IN ('ACTIVE', 'ARCHIVED')",
            name="ck_contact_status",
        ),
    )
    op.create_index(
        "ix_contact_company_status",
        "contact",
        ["company_id", "status"],
    )
    op.create_index(
        "uq_contact_active_primary_per_company",
        "contact",
        ["company_id"],
        unique=True,
        postgresql_where=sa.text("is_primary = true AND status = 'ACTIVE'"),
        sqlite_where=sa.text("is_primary = 1 AND status = 'ACTIVE'"),
    )


def downgrade() -> None:
    op.drop_index(
        "uq_contact_active_primary_per_company",
        table_name="contact",
    )
    op.drop_index("ix_contact_company_status", table_name="contact")
    op.drop_table("contact")
