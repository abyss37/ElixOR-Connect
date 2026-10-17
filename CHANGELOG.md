# Changelog

All notable changes to ElixOR Connect are documented in this file.

ElixOR Connect is a Flask-based financial management platform for companies, products, budgets, invoices, payments, analytics, and document generation. The project was originally developed under the name FinFlow.

This changelog follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

Changes made after `v1.1.0` that have not yet been included in a formal release.

### Improved

- Refined light-theme styling and visual consistency across application pages.
- Improved sidebar contrast and readability in light mode.
- Continued standardization of page-specific CSS and theme styles.
- Improved landing page localization for English and Ukrainian interfaces.
- Refined user management page styling and layout.
- Improved separation of page-specific stylesheets to simplify maintenance.

### Infrastructure

- Improved production deployment script reliability and permission handling.
- Continued hardening the deployment workflow and rollback safeguards.
- Maintained a controlled production deployment process through GitHub Actions.
- Continued improving CI checks for deployment scripts, Python syntax, dependencies, and database migrations.

### Documentation

- Added application screenshots to the README using a local development environment with demonstration data.
- Expanded visual documentation of the dashboard, companies, products, budgets, invoices, analytics, notifications, audit log, users, and invoice generator.
- Updated project documentation to reflect the ElixOR Connect branding.

---

## [1.1.0] - 2026-09-25

Feature release expanding the application, originally released as FinFlow, into a broader financial management platform.

### Added

- Multi-currency support for budgets and invoices.
- Product management and product-linked financial metrics.
- Product-level financial control.
- Our Company configuration for invoice issuer information.
- Company signature and stamp assets for generated documents.
- Expanded financial reporting and dashboard capabilities.
- Additional database migrations for the expanded financial model.

### Improved

- Currency-aware financial calculations and document data.
- Invoice PDF generation using configured company information.
- Invoice generator preview and document composition.
- Company-level dashboard financial controls.
- Dashboard and Analytics financial presentation.
- Company and product financial views.
- Responsive layouts and Tailwind-based styling.
- Production configuration and deployment consistency.
- Repository organization and documentation.

### Database

- Added currency fields to budgets and invoices.
- Added product-related database structures.
- Added Our Company configuration storage.
- Added support for company stamp assets.
- Extended the financial data model through Alembic migrations.
- Added production user and security metadata where required by the expanded application.

### Document Generation

- Integrated the configured Our Company profile into invoice PDF generation.
- Added support for including signatures and stamps in generated documents.
- Improved document layout and composition for production use.
- Preserved invoice financial information and issuer details in generated documents.

### Infrastructure

- Continued PostgreSQL-first production deployment.
- Maintained the Gunicorn and systemd production service architecture.
- Continued using the established backup and retention strategy.
- Improved production asset handling and configuration consistency.

### Documentation

- Expanded project documentation and roadmap.
- Documented the expanded financial model and application capabilities.
- Updated the changelog for the `v1.1.0` release.

---

## [1.0.0] - 2026-09-10

Initial production-ready release of the application, originally published under the name FinFlow.

### Added

- Flask-based financial management platform.
- PostgreSQL production database.
- SQLAlchemy-based data layer.
- Alembic database migration workflow.
- Session-based user authentication.
- Role-based access control with three roles:
  - Administrator
  - Manager
  - Viewer
- Administrative user management.
- Protected application routes and API endpoints.
- CSRF protection for state-changing requests.
- Audit Log with user attribution.
- Persistent notifications with read and unread states.
- Company-specific budget and spending dashboards.
- ALPHA and BETA product analytics.
- Invoice lifecycle management.
- Invoice payment tracking.
- Invoice cancellation workflow.
- Invoice generator with PDF and HTML output.
- Contract date management.
- English and Ukrainian interface localization.
- Responsive dashboard interface.
- User profile dropdown with role information and logout.
- PostgreSQL-aware database connection configuration.
- Gunicorn production deployment.
- systemd service configuration.
- Automated daily project and PostgreSQL backups.
- Backup retention and rotation with a 14-day retention period.
- Backup integrity verification.
- Git-based release workflow.

### Security

- Explicit application `SECRET_KEY` configuration through the production environment.
- Secure session cookie configuration:
  - `HttpOnly`
  - `SameSite=Lax`
  - `Secure`
- Authentication required for protected application pages.
- Role-based authorization for financial write operations.
- CSRF token validation for POST requests.
- API-specific authentication and authorization responses.
- Password hashing using Werkzeug.
- Sensitive environment configuration stored outside the Git repository.
- Backup exclusions for secrets, virtual environments, Git metadata, and temporary files.

### Database

- Production database migration to PostgreSQL.
- SQLAlchemy 2.x data layer.
- Established and applied Alembic migration chain.
- Accounting data integrity constraints.
- Invoice lifecycle and payment tracking fields.
- Persistent notification storage and deduplication.
- User accounts and role assignments.
- Audit Log user attribution.

### Dashboard and Analytics

- Company-specific ALPHA and BETA dashboard cards.
- Budget, spending, and remaining-budget calculations.
- Contract completion dates.
- Invoice payment status tracking.
- Outstanding invoice exposure based on unpaid amounts.
- Analytics v2.
- Product-level financial overview.
- Responsive dashboard presentation.

### Audit and Notifications

- Centralized Audit Log.
- Automatic attribution of new audit events to the authenticated user.
- Preservation of historical audit entries without forced attribution.
- Notification API for retrieving and marking notifications as read.
- Read-all notification action.
- Notification deduplication support.

### Infrastructure

- Python 3.13 production runtime.
- Flask 3.x.
- Flask-SQLAlchemy 3.x.
- SQLAlchemy 2.x.
- PostgreSQL 17.
- Alembic.
- Gunicorn.
- systemd.
- Reverse-proxy-compatible deployment.
- Linux production environment.
- Automated backup scheduling through cron.

### Documentation

- Initial project README.
- Documented architecture and project structure.
- Documented authentication and role model.
- Documented security configuration.
- Documented database migration workflow.
- Documented deployment process.
- Documented backup strategy.
- Established GitHub release workflow.

---

## Versioning

ElixOR Connect follows Semantic Versioning for published releases.

- `MAJOR` — incompatible API, architectural, or data-model changes.
- `MINOR` — backward-compatible functionality and feature additions.
- `PATCH` — backward-compatible bug fixes, security fixes, and maintenance updates.

## Links

[Unreleased]: https://github.com/abyss37/ElixOR-Connect/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/abyss37/ElixOR-Connect/releases/tag/v1.1.0
[1.0.0]: https://github.com/abyss37/ElixOR-Connect/releases/tag/v1.0.0