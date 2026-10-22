"""add company CRM lifecycle fields

Revision ID: 20261022c01
Revises: 5e7c1a9d4b2f
Create Date: 2026-10-22

This is an additive migration against the existing ``company`` table. The
baseline revision in this repository is intentionally empty, so verify the
target database's table/column state before applying this migration.
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "20261022c01"
down_revision: Union[str, Sequence[str], None] = "5e7c1a9d4b2f"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "company",
        sa.Column(
            "status",
            sa.String(length=20),
            nullable=False,
            server_default="ACTIVE",
        ),
    )
    op.add_column(
        "company",
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),
    )
    op.add_column(
        "company",
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),
    )
    op.create_check_constraint(
        "ck_company_status",
        "company",
        "status IN ('ACTIVE', 'ARCHIVED')",
    )


def downgrade() -> None:
    op.drop_constraint("ck_company_status", "company", type_="check")
    op.drop_column("company", "updated_at")
    op.drop_column("company", "created_at")
    op.drop_column("company", "status")
