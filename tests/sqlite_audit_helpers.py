"""SQLite-only helpers shared by tests that write audit log entries."""

from sqlalchemy import event, func, select

from app import AuditLog


_LAST_ALLOCATED_ID_KEY = "elixor_test_last_audit_log_id"


def _assign_sqlite_audit_id(mapper, connection, target):
    if target.id is not None or connection.dialect.name != "sqlite":
        return

    max_id_in_database = connection.execute(
        select(func.max(AuditLog.id))
    ).scalar_one()
    last_allocated_id = connection.info.get(_LAST_ALLOCATED_ID_KEY, 0)
    next_id = max(max_id_in_database or 0, last_allocated_id) + 1
    target.id = next_id
    connection.info[_LAST_ALLOCATED_ID_KEY] = next_id


def register_sqlite_audit_id_handler():
    """Register the SQLite test ID allocator once for the shared model."""
    if not event.contains(AuditLog, "before_insert", _assign_sqlite_audit_id):
        event.listen(AuditLog, "before_insert", _assign_sqlite_audit_id)
