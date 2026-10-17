(function () {
    "use strict";

    /*
     * ElixOR Connect global i18n
     *
     * Single source of truth for:
     * Dashboard
     * Analytics
     * Invoice Generator
     * Users
     * Audit Log
     *
     * Languages:
     *   uk
     *   en
     */

    const translations = {
        uk: {

            /* ==================== COMMON ==================== */

            "FinFlow": "ElixOR Connect",
            "Control": "Контроль",
            "ElixOR Connect — Financial Control": "ElixOR Connect — Фінансовий контроль",
            "Financial control platform": "Платформа фінансового контролю",
            "Financial overview": "Фінансовий огляд",
            "Client details": "Реквізити клієнта",
            "Invoice items are stored in the contract data": "Позиції рахунку зберігаються в даних договору",

            "Dashboard": "Панель керування",
            "Analytics": "Аналітика",
            "Audit Log": "Журнал аудиту",

            "Financial control for contracts, invoices & budgets":
                "Фінансовий контроль договорів, рахунків і бюджетів",

            "Know where your budget stands.":
                "Контролюйте стан бюджету.",

            "Track contract budgets, invoices and remaining spend in one place — with early warnings before a budget becomes a problem.":
                "Контролюйте бюджети договорів, рахунки та залишок коштів в одному місці — з ранніми попередженнями про ризики.",

                "Registry of issued invoices, payments and contract obligations.":
        "Реєстр виставлених рахунків, оплат і договірних зобов'язань.",

    "Search invoices or companies...":
        "Пошук за рахунком або компанією...",

    "All statuses": "Усі статуси",
    "All payments": "Усі оплати",
    "Table": "Таблиця",
    "Cards": "Картки",
    "Deadline": "Термін",

    "Create an invoice directly in the registry.":
        "Створення рахунку безпосередньо в реєстрі.",

    "Basic information": "Основні дані",
    "Amount and terms": "Сума та умови",
    "Payment terms": "Умови оплати",
    "15 days": "15 днів",
    "Client information": "Дані клієнта",

    "Bill To / client details":
        "Bill To / реквізити клієнта",

    "Address, email and other client details":
        "Адреса, email та інші реквізити клієнта",

    "Invoice items": "Позиції рахунку",

    "Items are stored inside contract_details.":
        "Позиції зберігаються всередині contract_details.",

    "Add item": "Додати позицію",
    "Qty": "К-сть",
    "Rate": "Ставка",
    "Delete item": "Видалити позицію",

    "Additional information": "Додаткова інформація",
    "Note": "Примітка",
    "Additional invoice information":
        "Додаткова інформація щодо рахунку",

    "Payment terms, penalties, delivery dates, etc.":
        "Умови оплати, штрафи, строки поставки тощо.",

    "Save invoice": "Зберегти рахунок",
    "No invoices found": "Рахунків не знайдено",

    "Change your search filters or create a new invoice.":
        "Змініть параметри пошуку або створіть новий рахунок.",

"New invoice": "Новий рахунок",
            "Add invoice": "Додати рахунок",
            "Create invoice": "Створити рахунок",
            "Create invoice PDF": "Створити рахунок PDF",

            "Manage ElixOR Connect products and product lines.": "Керування продуктами та продуктовими напрямами ElixOR Connect.",
            "Product filter": "Фільтр продуктів",
            "Archived": "Архівні",
            "New product": "Новий продукт",
            "Search products...": "Пошук продуктів...",
            "Product view": "Вигляд продуктів",
            "Total products": "Усього продуктів",
            "Active products": "Активних продуктів",
            "Archived products": "Архівних продуктів",
            "Description not specified.": "Опис не задано.",
            "No products yet": "Продуктів поки немає",
            "Create your first product to get started.": "Створіть перший продукт, щоб почати роботу.",
            "Create product": "Створити продукт",
            "Add a product to the ElixOR Connect catalog.": "Додайте продукт до каталогу ElixOR Connect.",
            "Product code": "Код продукту",
            "For example, CRM": "Наприклад, CRM",
            "Stable technical identifier for the product.": "Стабільний технічний ідентифікатор продукту.",
            "For example, ElixOR Connect CRM": "Наприклад, ElixOR Connect CRM",
            "Short product description...": "Короткий опис продукту...",
            "Saving...": "Збереження...",
            "Edit product": "Редагувати продукт",
            "Change product parameters in the ElixOR Connect catalog.": "Змініть параметри продукту в каталозі ElixOR Connect.",
            "Enter product code.": "Введіть код продукту.",
            "Code may contain only Latin letters, numbers, hyphen and underscore.": "Код може містити лише латинські літери, цифри, дефіс і підкреслення.",
            "Enter product name.": "Введіть назву продукту.",
            "Server did not return product data.": "Сервер не повернув дані продукту.",
            "Failed to save product.": "Не вдалося зберегти продукт.",
            "Archive product": "Архівувати продукт",
            "Archive": "Архівувати",
            "It will remain in the system but will be excluded from new operations.": "Він залишиться в системі, але буде виключений із нових операцій.",
            "Failed to archive product.": "Не вдалося архівувати продукт.",
            "Product is used in the system.": "Продукт використовується в системі.",
            "Physical deletion is not possible.": "Фізичне видалення неможливе.",
            "Use archiving instead.": "Скористайтеся архівуванням.",
            "This action cannot be undone.": "Цю дію неможливо скасувати.",
            "Product is used in the system and cannot be deleted.": "Продукт використовується в системі та не може бути видалений.",
            "Failed to delete product.": "Не вдалося видалити продукт.",
            "days overdue": "дн. прострочено",
            "Save": "Зберегти",
            "Close": "Закрити",
            "Cancel": "Скасувати",
            "Edit": "Редагувати",
            "Edit organization": "Редагувати організацію",
            "Change basic legal entity data": "Змінити основні дані юридичної особи",
            "Director": "Керівник",
            "Previous": "Назад",
            "Next": "Далі",
            "Create details set": "Створити набір реквізитів",
            "Bank details": "Банківські реквізити",
            "Additional": "Додатково",
            "Apply": "Застосувати",
            "Reset": "Скинути",
            "View": "Докладніше",
            "View details": "Докладніше",
            "Hide": "Сховати",
            "Generate": "Створити",
            "Draft": "Чернетка",

            "Overview": "Огляд",
            "Save error.": "Помилка збереження.",
            "Budget saved, but completion date could not be updated.": "Бюджет збережено, але дату завершення змінити не вдалося.",
            "Failed to save budget.": "Не вдалося зберегти бюджет.",
            "Failed to get CSRF token. Reload the page.": "Не вдалося отримати CSRF-токен. Перезавантажте сторінку.",
            "Create budget for company and product.": "Створення бюджету для компанії та продукту",
            "Change": "Змінити",
            "days until completion": "дн. до завершення",
            "Ends today": "Завершується сьогодні",
            "Overdue by": "Прострочено на",
            "Exceeded": "Перевищено",
            "Empty": "Не задано",
            "Currency": "Валюта",
            "Select product": "Оберіть продукт",
            "Select company": "Оберіть компанію",
            "Edit budget": "Редагувати бюджет",
            "Try changing the filters or create a budget for the company.": "Спробуйте змінити фільтри або створити бюджет для компанії.",
            "No budgets found": "Бюджетів не знайдено",
            "All currencies": "Усі валюти",
                "Active invoices": "Активних рахунків",
    "Fully paid": "Повністю оплачено",
    "Outstanding balance": "Залишок до оплати",
    "Open invoice": "Відкрити рахунок",
    "Contract completion": "Завершення договору",
    "Contract details": "Деталі договору",
    "Open": "Відкрити",

"Need attention": "Потребують уваги",
            "Under control": "Під контролем",
            "Refresh": "Оновити",
            "New budget": "Новий бюджет",
            "Manage company budgets, expenses and contract status.": "Керування бюджетами компаній, витратами та станом договорів.",
            "Products": "Продукти",
            "Companies": "Компанії",
            "Budgets": "Бюджети",
            "Invoices": "Рахунки",
            "Insights": "Аналітика",
            "Audit": "Аудит",
            "Alerts": "Сповіщення",
            "Administration": "Адміністрування",
            "Organization": "Організація",
            "Legal entities": "Юридичні особи",
            "Legal entities, company details, signatures and stamps used for documents.": "Юридичні особи ElixOR Connect, реквізити, підписи та печатки для оформлення документів.",
            "Create organization": "Створити організацію",
            "Companies on whose behalf ElixOR Connect creates documents and operations.": "Компанії, від імені яких ElixOR Connect формує документи та операції.",
            "company": "компанія",
            "companies": "компаній",
            "Open company data": "Відкрити дані компанії",
            "Company not created yet": "Компанію ще не створено",
            "Add a legal entity on whose behalf ElixOR Connect will issue documents.": "Додайте юридичну особу, від імені якої ElixOR Connect оформлюватиме документи.",
            "Products count one": "продукт",
            "Products count few": "продукти",
            "Products count many": "продуктів",
            "Details sets one": "набір реквізитів",
            "Details sets few": "набори реквізитів",
            "Details sets many": "наборів реквізитів",
            "Logo": "Логотип",
            "Signature": "Підпис",
            "Stamp": "Печатка",
            "Digital signature": "ЕЦП",
            "Add a legal entity on whose behalf ElixOR Connect will issue documents.": "Додайте юридичну особу, від імені якої ElixOR Connect оформлюватиме документи.",
            "Legal entity data": "Дані юридичної особи",
            "For example, ООО «Кайзерин»": "Наприклад, ТОВ «Кайзерин»",
            "Full legal name of the organization.": "Повна юридична назва організації.",
            "Director full name": "ПІБ керівника",
            "Director position": "Посада керівника",
            "For example, General Director": "Наприклад, Генеральний директор",
            "Contact details of the legal entity": "Контактні дані юридичної особи",
            "Phone": "Телефон",
            "Email": "Email",
            "Availability for new documents": "Доступність для нових документів",
            "The organization will be available when creating new documents.": "Організація буде доступна для вибору під час створення нових документів.",
            "Available": "Доступна",
            "Can be used in new documents": "Можна використовувати в нових документах",
            "Legal entity details, company information and documents.": "Дані юридичної особи, реквізити та документи.",
            "Company data": "Дані компанії",
            "Legal details": "Юридичні реквізити",
            "Registration and banking information": "Реєстраційні та банківські дані",
            "Add details set": "Додати набір",
            "Details set": "Набір реквізитів",
            "Details sets": "Набори реквізитів",
            "Legal, registration and banking information for documents.": "Юридична, реєстраційна та банківська інформація для документів.",
            "Main Details": "Основні реквізити",
            "ElixOR Connect — Main Details": "ElixOR Connect — Основні реквізити",
            "Edit details set": "Редагувати набір реквізитів",
            "Legal address": "Юридична адреса",
            "Actual address": "Фактична адреса",
            "Registration number": "Реєстраційний номер",
            "Tax number": "Податковий номер",
            "VAT number": "Номер платника ПДВ",
            "Bank": "Банк",
            "IBAN": "IBAN",
            "SWIFT": "SWIFT",
            "Documents and signatures": "Документи та підписи",
            "Files used when generating documents.": "Файли, які використовуються під час формування документів.",
            "Uploaded": "Завантажено",
            "Configured": "Налаштовано",
            "Not configured": "Не налаштовано",
            "Replace": "Замінити",
            "Upload": "Завантажити",
            "Preview": "Перегляд",
            "Details sets have not been added yet": "Набори реквізитів ще не додані",
            "Add a details set to use legal and banking information in documents.": "Додайте набір, щоб використовувати юридичні та банківські дані компанії в документах.",
            "Uploaded feminine": "Завантажена",
            "Not uploaded feminine": "Не завантажена",
            "Legal, registration and banking information": "Юридичні, реєстраційні та банківські дані",
            "Form steps": "Кроки форми",
            "Main": "Основне",
            "Addresses": "Адреси",
            "Registration": "Реєстрація",
            "Details set name": "Назва набору",
            "For example: Main details": "Наприклад: Основні реквізити",
            "Legal and tax registration": "Реєстрація та податки",
            "Tax ID / tax number": "ІПН / податковий номер",
            "VAT / VAT number": "VAT / номер ПДВ",
            "Our organization": "Наша організація",
            "Main navigation": "Головна навігація",
            "Financial control and system status":
                "Фінансовий контроль і стан системи",

            "New company": "Нова компанія",
            "Search companies...": "Пошук компаній...",
            "Clear search": "Очистити пошук",
            "Company view": "Вигляд компаній",
            "Grid": "Плитка",
            "List": "Список",
            "of": "з",
            "Companies not found": "Компаній не знайдено",
            "Try changing your search query.": "Спробуйте змінити пошуковий запит.",
            "Reset search": "Скинути пошук",
            "Actions": "Дії",
            "Company": "Компанія",
            "Delete": "Видалити",
            "invoices": "рахунків",
            "Budget": "Бюджет",
            "Spent": "Використано",
            "Remaining": "Залишок",
            "Budget utilization": "Використання бюджету",
            "Contract end": "Завершення договору",
            "Company invoices": "Рахунки компанії",
            "Collapse": "Згорнути",
            "All": "Усі",
            "No invoices": "Рахунків немає",
            "Loading invoices...": "Завантаження рахунків...",
            "No companies yet": "Компаній поки немає",
            "Create your first company to get started.": "Створіть першу компанію, щоб почати роботу.",
            "Company list": "Список компаній",
            "Contract": "Договір",
            "Company name": "Назва компанії",
            "For example, Alpha LLC": "Наприклад, ТОВ «Альфа»",
            "Company stamp": "Печатка компанії",
            "Used in invoice generator and document printing.": "Використовується в генераторі рахунків і під час друку документа.",
            "Not uploaded": "Не завантажена",
            "Upload stamp": "Завантажити печатку",
            "PNG, JPG or WebP · up to 5 MB": "PNG, JPG або WebP · до 5 МБ",
            "Date not specified": "Дата не вказана",
            "completed": "завершено",
            "days ago": "дн. тому",
            "today": "сьогодні",
            "days remaining": "дн. залишилося",
            "Completed": "Завершено",
            "Paid": "Оплачено",
            "Partially paid": "Частково оплачено",
            "Unpaid": "Не оплачено",
            "Payment": "Оплата",
            "Cancel invoice": "Скасувати рахунок",
            "Cancellation reason": "Причина скасування",
            "Overdue": "Прострочено",
            "Payment amount": "Сума оплати",
            "Invoice amount": "Сума рахунку",
            "Current payment": "Поточна оплата",
            "Enter a valid amount.": "Введіть коректну суму.",
            "Payment amount cannot be negative.": "Сума оплати не може бути від'ємною.",
            "Payment amount cannot exceed invoice amount.": "Сума оплати не може перевищувати суму рахунку.",
            "Reason is required.": "Причина скасування обов'язкова.",
            "Invoice will remain in history but will be excluded from financial totals.": "Рахунок залишиться в історії, але буде виключений із фінансових підсумків.",
            /* ==================== NOTIFICATIONS ==================== */

            "Notifications": "Сповіщення",
            "Notification center": "Центр сповіщень",
            "Recent system alerts": "Останні системні події",
            "Mark all as read": "Прочитати всі",
            "Mark as read": "Позначити як прочитане",
            "Information": "Інформація",
            "All clear": "Усе чисто",
            "No active notifications.": "Немає активних сповіщень.",
            "Critical": "Критично",
            "Warning": "Попередження",
            "Info": "Інформація",
            "Just now": "Щойно",
            "minute": "хвилина",
            "minutes": "хвилин",
            "hour": "година",
            "hours": "годин",
            "day": "день",
            "days": "днів",
            "Overdue invoice": "Прострочений рахунок",
            "Budget warning": "Попередження про бюджет",
            "Critical budget level": "Критичний рівень бюджету",
            "Budget exceeded": "Бюджет перевищено",
            "Contract expiring": "Завершення договору",
            "alerts": "попереджень",

            /* ==================== SUMMARY ==================== */

            "Total budget": "Загальний бюджет",
            "All active products": "Усі активні продукти",
            "Invoiced": "Виставлено рахунків",
            "Recorded spend": "Враховані витрати",
            "Available budget": "Доступний бюджет",
            "Utilization": "Використання",
            "Budget consumed": "Використано бюджету",

            "Attention needed": "Потрібна увага",
            "Issues that may affect contract or budget control.":
                "Проблеми, які можуть вплинути на контроль договорів або бюджету.",

            "Everything looks healthy": "Усе гаразд",

            "No budgets above 80% and no contracts ending within 30 days.":
                "Немає бюджетів понад 80% і договорів, що завершуються протягом найближчих 30 днів.",

            "No budgets above 85% and no contracts ending within 30 days.":
                "Немає бюджетів понад 85% і договорів, що завершуються протягом найближчих 30 днів.",

            /* ==================== ANALYTICS ==================== */

            "Financial Analytics": "Фінансова аналітика",
            "FINANCIAL ANALYTICS": "ФІНАНСОВА АНАЛІТИКА",
            "Financial control dashboard": "Панель фінансового контролю",

            "Detailed financial analysis":
                "Детальний фінансовий аналіз",

            "Explore budget utilization, invoice exposure and spending trends.":
                "Аналізуйте використання бюджету, виставлені рахунки та динаміку витрат.",

            "A compact view of budget utilization, invoice exposure and spending trends.":
                "Компактний огляд використання бюджету, виставлених рахунків і динаміки витрат.",

            "Live dashboard": "Дані в реальному часі",
            "Overall utilization": "Загальне використання",
            "Invoiced amount against total budget":
                "Виставлена сума відносно загального бюджету",
            "of total budget": "від загального бюджету",
            "Exposure": "Обсяг зобов'язань",

            "Spend by company": "Сума рахунків за компаніями",
            "Active invoiced amount by company.":
                "Сума активних рахунків за компаніями",

            "Spend by product": "Сума рахунків за продуктами",
            "Active invoiced amount by product.":
                "Сума активних рахунків за продуктами",

            "Monthly spending": "Сума рахунків за місяцями",
            "Active invoiced amount grouped by invoice month.":
                "Сума активних рахунків у розрізі місяців",

            "Invoice activity by date":
                "Динаміка виставлених рахунків",

            "Timeline": "Динаміка",
            "No active invoice spending yet.":
                "Активних виставлених рахунків поки немає",

            "No dated invoices yet.": "Рахунків із датою поки немає.",

            /* ==================== BUDGET ==================== */

            "Budget health": "Стан бюджету",
            "Budget overview": "Огляд бюджету",
            "Only companies and invoices": "Тільки компанії та рахунки",
            "Editing archive template": "Редагується шаблон з архіву",
            "Editing archive template:": "Редагується шаблон з архіву:",
            "Bank account selection": "Вибір банківських рахунків",
            "Show banks in invoice": "Відображати банки в інвойсі:",
            "Invoice archive": "Архів інвойсів",
            "Create blank": "Створити порожній",
            "New": "Новий",
            "Search archive...": "Пошук в архіві...",
            "Archive is empty": "Архів порожній",
            "Saving invoice": "Збереження інвойсу",
            "You are editing a previously saved invoice": "Ви редагуєте раніше збережений інвойс",
            "Choose an action: update the existing invoice in the archive or save the current version as a new invoice.": "Оберіть дію: оновити наявний інвойс в архіві або зберегти поточну версію як новий інвойс.",
            "Save (update this invoice)": "Зберегти (оновити цей інвойс)",
            "Save as new": "Зберегти як новий",
            "Invoice successfully updated!": "Інвойс успішно оновлено!",
            "New invoice successfully saved to registry!": "Новий інвойс успішно збережено до реєстру!",
            "Invoice save error": "Помилка збереження інвойсу:",
            "Could not connect to server": "Не вдалося підключитися до сервера",


            "Selected product budget and invoice overview":
                "Огляд бюджету та рахунків вибраного продукту",

            "Remaining budget by company":
                "Залишок бюджету за компаніями",

            "Click for detailed overview":
                "Натисніть для докладного огляду",

            "Click to view full budget overview":
                "Натисніть, щоб переглянути повний огляд бюджету",

            "Budget attention": "Бюджет потребує уваги",
            "Budget almost exhausted": "Бюджет майже вичерпано",

            "USED": "ВИКОРИСТАНО",
            "Used": "Використано",
            "% used": "% використано",

            "Active invoiced": "Активно виставлено",

            /* ==================== WORKSPACE ==================== */

            "Workspace": "Робоча область",
            "Companies & contracts": "Компанії та договори",

            "Set budgets, review spend and spot risk at a glance.":
                "Встановлюйте бюджети, контролюйте витрати та одразу помічайте ризики.",

            "Click to view invoices":
                "Натисніть, щоб переглянути рахунки",

            "Contract budget (€)": "Бюджет договору (€)",

            "No companies yet. Create your first invoice to get started.":
                "Компаній поки немає. Створіть перший рахунок, щоб почати.",

            /* ==================== INVOICES ==================== */

            "Invoice registry": "Реєстр рахунків",
            "Recent invoices": "Останні рахунки",
            "Search invoices...": "Пошук рахунків...",

            "Invoice": "Рахунок",
            "Date": "Дата",
            "Product": "Продукт",
            "Amount": "Сума",
            "Status": "Статус",

            "ISSUED": "ВИСТАВЛЕНО",
            "Issued": "Виставлено",

            "CANCELLED": "СКАСОВАНО",
            "Cancelled": "Скасовано",

            "PAID": "ОПЛАЧЕНО",
            "PARTIAL": "ЧАСТКОВО",
            "UNPAID": "НЕ ОПЛАЧЕНО",
            "OVERDUE": "ПРОСТРОЧЕНО",
            "HISTORY": "ІСТОРІЯ",
            "OVER BUDGET": "ПЕРЕВИЩЕННЯ БЮДЖЕТУ",
            "HIGH USAGE": "ВИСОКЕ ЗАВАНТАЖЕННЯ",
            "HEALTHY": "У НОРМІ",

            "Outstanding": "До сплати",
            "paid": "оплачено",
            "due": "до сплати",

            "Paid amount for invoice": "Сума оплати за рахунком",
            "Total": "Усього",
            "Currently paid": "Наразі оплачено",
            "Enter total paid amount": "Введіть загальну суму оплати",
            "Please enter a valid non-negative amount.": "Введіть коректну невід'ємну суму.",
            "Paid amount cannot exceed invoice total": "Сума оплати не може перевищувати загальну суму рахунку",

            "Update payment": "Оновити оплату",
            "Users": "Користувачі",
            "Logout": "Вийти",
            "Administrator": "Адміністратор",
            "Manager": "Менеджер",
            "Viewer": "Переглядач",

            "No invoices yet.": "Рахунків поки немає.",
            "Total:": "Разом:",
            "No data yet": "Даних поки немає",
            "No budget data": "Немає даних щодо бюджету",

            "Invoices · ": "Рахунки · ",

            /* ==================== INVOICE FORMS ==================== */

            "Quickly add an invoice directly to the registry":
                "Швидко додайте рахунок безпосередньо до реєстру",

            "Software Product": "Програмний продукт",
            "Invoice number": "Номер рахунку",
            "Invoice date": "Дата рахунку",
            "Completion date": "Дата завершення",
            "Amount (€)": "Сума (€)",

            "Save to Registry": "Зберегти до реєстру",

                "Change existing invoice data.": "Зміна даних існуючого рахунку.",

"Edit invoice": "Редагувати рахунок",

            "Cancellation reason:": "Причина скасування:",
                "Save changes": "Зберегти зміни",
    "Fill in company, invoice number, date and amount.": "Заповніть компанію, номер рахунку, дату та суму.",
    "Invoice amount must be greater than zero.": "Сума рахунку має бути більшою за нуль.",
    "Failed to save invoice.": "Не вдалося зберегти рахунок.",
    "Enter a valid non-negative amount.": "Введіть коректну невід'ємну суму.",
    "Payment amount cannot exceed invoice amount": "Сума оплати не може перевищувати суму рахунку",
    "Failed to update payment.": "Не вдалося оновити оплату.",
    "Invoice cancellation reason:": "Причина скасування рахунку:",
    "Cancel this invoice?": "Скасувати цей рахунок?",
    "It will remain in the registry with status CANCELLED.": "Він залишиться в реєстрі зі статусом CANCELLED.",
    "Failed to cancel invoice.": "Не вдалося скасувати рахунок.",

    "Paid on invoice": "Оплачено по рахунку",
    "Paid now": "Оплачено зараз",
    "Enter total payment amount:": "Введіть загальну суму оплати:",

"Cancellation reason is required.":
                "Необхідно вказати причину скасування.",

            "Cancel this invoice? It will remain in the registry as CANCELLED.":
                "Скасувати цей рахунок? Він залишиться в реєстрі зі статусом «СКАСОВАНО».",

            "Cancelled invoices cannot be edited":
                "Скасовані рахунки не можна редагувати",

            "Cancelled invoices cannot be edited.":
                "Скасовані рахунки не можна редагувати.",

            "Cancelled invoices remain in history but are excluded from active spend and remaining budget.":
                "Скасовані рахунки залишаються в історії, але не враховуються в активних витратах і залишку бюджету.",

            "Cancellation failed":
                "Не вдалося скасувати рахунок",

            "Payment update failed":
                "Не вдалося оновити оплату",

            "Save failed": "Не вдалося зберегти",
            "Save failed.": "Не вдалося зберегти.",
            "Could not save invoice.": "Не вдалося зберегти рахунок.",

            "PNG export is unavailable.": "Експорт PNG недоступний.",
            "Could not save PNG.": "Не вдалося зберегти PNG.",
            "Save PNG": "Зберегти PNG",

            /* ==================== GENERATOR ==================== */

            "Invoice Generator": "Генератор рахунків",

            "Client / Company Name":
                "Назва клієнта / компанії",

            "Payment Terms": "Умови оплати",
            "Notes": "Примітки",
            "Terms": "Умови",

            "Notes - any relevant information not already covered":
                "Примітки — додаткова інформація",

            "Terms - late fees, payment methods, delivery schedules":
                "Умови — штрафи, способи оплати, строки постачання",

            "Search in archive...": "Пошук в архіві...",
            "Пошук в архіві...": "Пошук в архіві...",

            "Редагується рахунок з архіву:":
                "Редагується рахунок з архіву:",

            /* ==================== USERS ==================== */


            "Manage ElixOR Connect users, roles and access.":
                "Керування користувачами ElixOR Connect, ролями та доступом.",

            "Create user": "Створити користувача",

            "Add a new account with an initial role and password.":
                "Додайте новий обліковий запис із початковою роллю та паролем.",

            "Username": "Ім'я користувача",
            "Password": "Пароль",
            "Email": "Електронна пошта",
            "Administrators": "Адміністратори",
            "Role": "Роль",
            "Minimum 8 characters": "Мінімум 8 символів",
            "username": "ім'я користувача",

            "User accounts": "Облікові записи",

            "Username is the stable identity used in the audit log.":
                "Ім'я користувача — постійний ідентифікатор, що використовується в журналі аудиту.",

            "Username is the stable identity used in the audit log. The latest login IP is recorded for account activity tracking.":
                "Ім'я користувача використовується як стабільний ідентифікатор в аудит-лозі. IP-адреса останнього входу зберігається для відстеження активності облікового запису.",

            "User": "Користувач",
            "Created": "Створено",
            "Last login": "Останній вхід",
            "IP": "IP",

            "You": "Ви",
            "Active": "Активний",
            "Inactive": "Неактивний",
            "Never": "Ніколи",

            "Change password": "Змінити пароль",
            "Activate": "Активувати",
            "Deactivate": "Деактивувати",
            "New password": "Новий пароль",

            "Password must contain at least 8 characters.":
                "Пароль має містити щонайменше 8 символів.",

            "No users found.": "Користувачів не знайдено.",

            "Your role cannot be changed here.":
                "Вашу роль не можна змінити тут.",

            "You cannot deactivate your own account.":
                "Ви не можете деактивувати власний обліковий запис.",

            "Back to dashboard":
                "Повернутися до панелі керування",

            "Admin": "Адміністратор",

            /* ==================== AUDIT ==================== */

            "Filters": "Фільтри",
            "Filter the analytics view": "Фільтрація аналітики",

            "Date from": "Дата від",
            "Date to": "Дата до",

            "All companies": "Усі компанії",
            "All products": "Усі продукти",

            "Complete history of financial and system changes":
                "Повна історія фінансових і системних змін",

            "Narrow the audit history by event, company, product or date.":
                "Фільтруйте історію за подією, компанією, продуктом або датою.",

            "Search": "Пошук",
            "Invoice, description, ID...":
                "Рахунок, опис, ID...",

            "Action": "Дія",
            "All actions": "Усі дії",

            "Company created": "Компанію створено",
            "Invoice created": "Рахунок створено",
            "Invoice updated": "Рахунок змінено",
            "Invoice cancelled": "Рахунок скасовано",
            "Budget updated": "Бюджет змінено",
            "Contract date updated": "Дату договору змінено",

            "From": "Від",
            "To": "До",
            "Date & Time": "Дата й час",
            "Entity": "Об'єкт",
            "Description": "Опис",
            "Details": "Деталі",
            "Changes": "Зміни",

            "No additional details.":
                "Додаткових деталей немає.",

            "Page": "Сторінка",
            "event": "подія",
            "events": "подій",
            "total": "усього",

            "Paid amount": "Оплачено",
            "Payment status": "Статус оплати",
            "Invoice ID": "ID рахунку",
            "Contract date": "Дата договору",
            "Contract budget": "Бюджет договору",

            "company_budget": "Бюджет компанії",
            "invoice": "Рахунок",

            /* ==================== LANDING ==================== */

            "Sign in": "Увійти",
            "Sign in to ElixOR Connect": "Увійти до ElixOR Connect",

            "Financial Operations Platform":
                "Платформа фінансових операцій",

            "A modern self-hosted platform for managing budgets, invoices, payments, contracts, analytics, notifications and financial operations in one controlled environment.":
                "Сучасна self-hosted платформа для керування бюджетами, рахунками, платежами, договорами, аналітикою, сповіщеннями та фінансовими операціями в одному контрольованому середовищі.",

            "Sign in to your ElixOR Connect workspace":
                "Увійдіть до робочого простору ElixOR Connect",

            "Self-hosted":
                "Self-hosted",

            "Private by design":
                "Приватність за задумом",

            "Your financial data stays under your control.":
                "Ваші фінансові дані залишаються під вашим контролем."

        },

        en: {}
    };

    Object.keys(translations.uk).forEach(function (key) {
        translations.en[key] = key;
    });

    /*
     * Legacy client-rendered strings and missing page labels.  Keeping
     * these mappings here lets the existing DOM observer and dialog
     * wrappers localize dynamic content without adding page-specific
     * translation systems.
     */
    const legacyTranslations = {
        "Search products": ["Пошук продуктів", "Search products"],
        "Search companies": ["Пошук компаній", "Search companies"],
        "Additional details used in documents": ["Додаткові реквізити для документів", "Additional details used in documents"],
        "Bank name": ["Назва банку", "Bank name"],
        "Contact details of the company.": ["Контактні дані компанії.", "Contact details of the company."],
        "General Director": ["Генеральний директор", "General Director"],
        "SWIFT / BIC": ["SWIFT / BIC", "SWIFT / BIC"],
        "Add a new account with an initial role and password": ["Додайте обліковий запис із початковою роллю та паролем", "Add a new account with an initial role and password"],
        "All roles": ["Усі ролі", "All roles"],
        "Create User": ["Створити користувача", "Create User"],
        "No users found": ["Користувачів не знайдено", "No users found"],
        "No users match the current filters": ["Немає користувачів, що відповідають поточним фільтрам", "No users match the current filters"],
        "Password must contain at least 8 characters": ["Пароль має містити щонайменше 8 символів", "Password must contain at least 8 characters"],
        "Search users": ["Пошук користувачів", "Search users"],
        "Set a new password for": ["Задати новий пароль для", "Set a new password for"],
        "Total users": ["Усього користувачів", "Total users"],
        "Active invoices trend": ["Динаміка активних рахунків", "Active invoices trend"],
        "Active lines": ["Активні рядки", "Active lines"],
        "Analysis parameters": ["Параметри аналізу", "Analysis parameters"],
        "By month": ["За місяцями", "By month"],
        "Expenses by company": ["Витрати за компаніями", "Expenses by company"],
        "Expenses by product": ["Витрати за продуктами", "Expenses by product"],
        "Financial analytics and ElixOR Connect metrics": ["Фінансова аналітика та показники ElixOR Connect", "Financial analytics and ElixOR Connect metrics"],
        "Financial scope": ["Фінансовий контур", "Financial scope"],
        "In financial analysis": ["У фінансовому аналізі", "In financial analysis"],
        "Included in calculation": ["Враховано в розрахунку", "Included in calculation"],
        "Monthly expenses": ["Щомісячні витрати", "Monthly expenses"],
        "No expense data": ["Немає даних про витрати", "No expense data"],
        "No monthly data": ["Немає помісячних даних", "No monthly data"],
        "No product data": ["Немає даних про продукти", "No product data"],
        "Product distribution": ["Розподіл за продуктами", "Product distribution"],
        "Product line": ["Продуктова лінійка", "Product line"],
        "Selection settings": ["Параметри вибору", "Selection settings"],
        "TOTAL VOLUME": ["ЗАГАЛЬНИЙ ОБСЯГ", "TOTAL VOLUME"],
        "Volume distribution": ["Розподіл обсягу", "Volume distribution"],
        "Нет активных продуктов": ["Немає активних продуктів", "No active products"],
        "Тип ресурса": ["Тип ресурсу", "Asset type"],
        "Новый файл": ["Новий файл", "New file"],
        "Предыдущий файл": ["Попередній файл", "Previous file"],
        "Исходный формат": ["Початковий формат", "Original format"],
        "Исходное имя": ["Початкова назва", "Original name"],
        "Обработанный формат": ["Оброблений формат", "Processed format"],
        "ID компании": ["ID компанії", "Company ID"],
        "ID счёта": ["ID рахунку", "Invoice ID"],
        "Номер счёта": ["Номер рахунку", "Invoice number"],
        "Продукт": ["Продукт", "Product"],
        "Сумма": ["Сума", "Amount"],
        "Валюта": ["Валюта", "Currency"],
        "Статус": ["Статус", "Status"],
        "Изменения": ["Зміни", "Changes"],
        "Логотип": ["Логотип", "Logo"],
        "Печать": ["Печатка", "Stamp"],
        "Подпись": ["Підпис", "Signature"],
        "Ошибка загрузки журнала": ["Не вдалося завантажити журнал аудиту", "Failed to load audit log"],
        "Неизвестная ошибка": ["Невідома помилка", "Unknown error"],
        "Не удалось загрузить": ["Не вдалося завантажити", "Could not load"],
        "Показать детали": ["Показати деталі", "Show details"],
        "Скрыть детали": ["Приховати деталі", "Hide details"],
        "Удалить фильтр": ["Видалити фільтр", "Remove filter"],
        "Без компании": ["Без компанії", "No company"],
        "Система": ["Система", "System"],
        "Результаты с учётом выбранных фильтров": ["Результати з урахуванням вибраних фільтрів", "Results matching the selected filters"],
        "Деактивировать этого пользователя?": ["Деактивувати цього користувача?", "Deactivate this user?"],
        "Просроченный счёт": ["Прострочений рахунок", "Overdue invoice"],
        "Превышение бюджета": ["Перевищення бюджету", "Budget exceeded"],
        "Критическое состояние бюджета": ["Критичний стан бюджету", "Critical budget status"],
        "Предупреждение по бюджету": ["Попередження щодо бюджету", "Budget warning"],
        "Завершение договора": ["Завершення договору", "Contract ending"],
        "Системное уведомление": ["Системне сповіщення", "System notification"],
        "Прочитано": ["Прочитано", "Read"],
        "Новое уведомление": ["Нове сповіщення", "New notification"],
        "Прочитать": ["Прочитати", "Mark as read"],
        "Удалить уведомление": ["Видалити сповіщення", "Delete notification"],
        "Удалить это уведомление?": ["Видалити це сповіщення?", "Delete this notification?"],
        "Не удалось удалить уведомление": ["Не вдалося видалити сповіщення", "Could not delete notification"],
        "Не удалось удалить уведомление.": ["Не вдалося видалити сповіщення.", "Could not delete notification."],
        "Отменён": ["Скасовано", "Cancelled"],
        "Оплачен": ["Сплачено", "Paid"],
        "Частично оплачен": ["Сплачено частково", "Partially paid"],
        "Не оплачен": ["Не сплачено", "Unpaid"],
        "Укажите причину аннулирования:": ["Укажіть причину скасування:", "Enter a cancellation reason:"],
        "Причина обязательна.": ["Необхідно вказати причину.", "A reason is required."],
        "Аннулировать счет?": ["Скасувати рахунок?", "Cancel this invoice?"],
        "Ошибка аннулирования": ["Не вдалося скасувати рахунок", "Could not cancel invoice"],
        "Ошибка сохранения": ["Не вдалося зберегти зміни", "Could not save changes"],
        "Показати пароль": ["Показати пароль", "Show password"],
        "Обновить журнал": ["Оновити журнал", "Refresh log"],
        "Предыдущая страница": ["Попередня сторінка", "Previous page"],
        "Следующая страница": ["Наступна сторінка", "Next page"],
        "Switch language to Ukrainian": ["Переключити мову на українську", "Switch language to Ukrainian"],
        "Switch to Ukrainian": ["Перейти на українську", "Switch to Ukrainian"],
        "Переключити мову на англійську": ["Переключити мову на англійську", "Switch language to English"],
        "Переключити на англійську": ["Перейти на англійську", "Switch to English"],
        "Main navigation": ["Головна навігація", "Main navigation"],
        "Primary navigation": ["Основна навігація", "Primary navigation"],
        "Toggle theme": ["Перемкнути тему", "Toggle theme"],
        "Language": ["Мова", "Language"],
        "Close": ["Закрити", "Close"],
        "Delete": ["Видалити", "Delete"],
        "Change password": ["Змінити пароль", "Change password"],
        "Deactivate": ["Деактивувати", "Deactivate"],
        "Activate": ["Активувати", "Activate"],
        "Filter by role": ["Фільтрувати за роллю", "Filter by role"],
        "Form steps": ["Кроки форми", "Form steps"],
        "Name": ["Назва", "Name"],
        "Generator": ["Генератор", "Generator"]
        ,"Invalid username or password.": ["Неправильне ім'я користувача або пароль.", "Invalid username or password."]
        ,"Financial control platform": ["Платформа фінансового контролю", "Financial control platform"]
        ,"Welcome back": ["З поверненням", "Welcome back"]
        ,"Sign in to continue working in ElixOR Connect.": ["Увійдіть, щоб продовжити роботу в ElixOR Connect.", "Sign in to continue working in ElixOR Connect."]
        ,"Enter username": ["Введіть ім'я користувача", "Enter username"]
        ,"Enter password": ["Введіть пароль", "Enter password"]
        ,"Secure access to ElixOR Connect": ["Захищений доступ до ElixOR Connect", "Secure access to ElixOR Connect"]
        ,"Financial management system": ["Система фінансового управління", "Financial management system"]
        ,"Show password": ["Показати пароль", "Show password"]
        ,"Hide password": ["Приховати пароль", "Hide password"]
        ,"Новая компания": ["Нова компанія", "New company"]
        ,"Не удалось сохранить компанию.": ["Не вдалося зберегти компанію.", "Could not save company."]
        ,"Не удалось удалить компанию.": ["Не вдалося видалити компанію.", "Could not delete company."]
        ,"Введите корректную сумму.": ["Введіть коректну суму.", "Enter a valid amount."]
        ,"Сумма оплаты не может быть отрицательной.": ["Сума оплати не може бути від'ємною.", "Payment amount cannot be negative."]
        ,"Сумма оплаты не может превышать сумму счёта.": ["Сума оплати не може перевищувати суму рахунку.", "Payment amount cannot exceed the invoice total."]
        ,"Не удалось обновить оплату.": ["Не вдалося оновити оплату.", "Could not update payment."]
        ,"Причина отмены счёта:": ["Причина скасування рахунку:", "Invoice cancellation reason:"]
        ,"Причина отмены обязательна.": ["Необхідно вказати причину скасування.", "A cancellation reason is required."]
        ,"Не удалось отменить счёт.": ["Не вдалося скасувати рахунок.", "Could not cancel invoice."]
        ,"Событие": ["Подія", "Event"]
        ,"Создано": ["Створено", "Created"]
        ,"Удалить": ["Видалити", "Delete"]
        ,"Не удалось загрузить уведомления": ["Не вдалося завантажити сповіщення", "Could not load notifications"]
        ,"Проверьте соединение с сервером и обновите страницу.": ["Перевірте з'єднання із сервером і перезавантажте сторінку.", "Check your connection to the server and reload the page."]
        ,"Завершён": ["Завершено", "Ended"]
        ,"Все контрольные события в выбранной категории отсутствуют.": ["У вибраній категорії немає контрольних подій.", "There are no control events in the selected category."]
        ,"Счёт": ["Рахунок", "Invoice"]
        ,"Частично оплачено": ["Сплачено частково", "Partially paid"]
        ,"Не оплачено": ["Не сплачено", "Unpaid"]
        ,"Search: ": ["Пошук: ", "Search: "]
        ,"Action: ": ["Дія: ", "Action: "]
        ,"Company: ": ["Компанія: ", "Company: "]
        ,"User: ": ["Користувач: ", "User: "]
        ,"Product: ": ["Продукт: ", "Product: "]
        ,"From: ": ["Від: ", "From: "]
        ,"To: ": ["До: ", "To: "]
        ,"updated": ["оновлено", "updated"]
        ,"Original file": ["Початковий файл", "Original file"]
        ,"Previous file": ["Попередній файл", "Previous file"]
        ,"New file": ["Новий файл", "New file"]
        ,"Original format": ["Початковий формат", "Original format"]
        ,"Processed as": ["Оброблено як", "Processed as"]
        ,"Companies, contracts and financial relationships in one workspace.": ["Компанії, договори та фінансові зв'язки в одному робочому просторі.", "Companies, contracts and financial relationships in one workspace."]
        ,"Имя пользователя используется как стабильный идентификатор в аудит-логе. IP-адреса последнего входа сохраняется для отслеживания активности учётной записи.": ["Ім'я користувача є сталим ідентифікатором у журналі аудиту. IP-адреса останнього входу зберігається для відстеження активності облікового запису.", "The username is the stable identity used in the audit log. The latest login IP is recorded for account activity tracking."]
        ,"Live preview": ["Попередній перегляд", "Live preview"]
        ,"Registry": ["Реєстр", "Registry"]
        ,"Volume": ["Обсяг", "Volume"]
        ,"PO Number": ["Номер замовлення", "PO Number"]
        ,"Reference": ["Посилання", "Reference"]
        ,"Contacts": ["Контакти", "Contacts"]
        ,"Products count one": ["продукт", "product"]
        ,"Products count few": ["продукти", "products"]
        ,"Products count many": ["продуктів", "products"]
        ,"Details sets one": ["набір реквізитів", "details set"]
        ,"Details sets few": ["набори реквізитів", "details sets"]
        ,"Details sets many": ["наборів реквізитів", "details sets"]
        ,"product": ["продукт", "product"]
        ,"products": ["продукти", "products"]
        ,"details set": ["набір реквізитів", "details set"]
        ,"details sets": ["набори реквізитів", "details sets"]
        ,"15 днів": ["15 днів", "15 days"]
        ,"Компания с таким названием уже существует.": ["Компанія з такою назвою вже існує.", "A company with this name already exists."]
        ,"Код продукта обязателен.": ["Необхідно вказати код продукту.", "Product code is required."]
        ,"Код продукта не должен превышать 50 символов.": ["Код продукту має містити не більше 50 символів.", "Product code must be 50 characters or fewer."]
        ,"Код продукта может содержать только латинские буквы, цифры, дефис и подчёркивание.": ["Код продукту може містити лише латинські літери, цифри, дефіс і підкреслення.", "Product code may contain only Latin letters, numbers, hyphens, and underscores."]
        ,"Название продукта обязательно.": ["Необхідно вказати назву продукту.", "Product name is required."]
        ,"Название продукта не должно превышать 255 символов.": ["Назва продукту має містити не більше 255 символів.", "Product name must be 255 characters or fewer."]
        ,"Описание продукта не должно превышать 10000 символов.": ["Опис продукту має містити не більше 10 000 символів.", "Product description must be 10,000 characters or fewer."]
        ,"Продукт с таким кодом уже существует.": ["Продукт із таким кодом уже існує.", "A product with this code already exists."]
        ,"Продукт используется в системе и не может быть удалён.": ["Продукт використовується в системі, тому його не можна видалити.", "This product is in use and cannot be deleted."]
        ,"Неизвестный тип файла.": ["Невідомий тип файлу.", "Unknown file type."]
        ,"Файл не выбран.": ["Файл не вибрано.", "No file was selected."]
        ,"Допустимые форматы: PNG, JPG, JPEG, WebP.": ["Дозволені формати: PNG, JPG, JPEG, WebP.", "Allowed formats: PNG, JPG, JPEG, WebP."]
        ,"Размер файла не должен превышать 5 МБ.": ["Розмір файлу не має перевищувати 5 МБ.", "File size must not exceed 5 MB."]
        ,"Не удалось сохранить файл.": ["Не вдалося зберегти файл.", "Could not save the file."]
        ,"until": ["до", "until"]
        ,"Delete company": ["Видалити компанію", "Delete company"]
        ,"Deleting the company will also remove its invoices, budgets, and related notifications.": ["Разом із компанією буде видалено її рахунки, бюджети та пов'язані сповіщення.", "Deleting the company will also remove its invoices, budgets, and related notifications."]
        ,"The audit history will be preserved.": ["Історія аудиту збережеться.", "The audit history will be preserved."]
        ,"How much has been paid on this invoice?": ["Скільки сплачено за рахунком?", "How much has been paid on this invoice?"]
        ,"Invoice total": ["Сума рахунку", "Invoice total"]
        ,"Current payment": ["Поточна оплата", "Current payment"]
        ,"Cancel invoice": ["Скасувати рахунок", "Cancel invoice"]
        ,"The invoice will remain in history but be excluded from financial totals.": ["Рахунок залишиться в історії, але його буде виключено з фінансових підсумків.", "The invoice will remain in history but be excluded from financial totals."]
        ,"Change role of user to": ["Змінити роль користувача на", "Change role of user to"]
        ,"Resource not found.": ["Ресурс не знайдено.", "Resource not found."]
        ,"Access denied.": ["Доступ заборонено.", "Access denied."]
        ,"An internal server error occurred.": ["Сталася внутрішня помилка сервера.", "An internal server error occurred."]
        ,"Invoice not found": ["Рахунок не знайдено", "Invoice not found"]
        ,"Cancelled invoices cannot be edited.": ["Скасовані рахунки не можна редагувати.", "Cancelled invoices cannot be edited."]
        ,"Cancelled invoices cannot have their payment status changed.": ["Статус оплати скасованих рахунків не можна змінити.", "Cancelled invoices cannot have their payment status changed."]
        ,"paid_amount_eur is required": ["Потрібно вказати суму оплати.", "Payment amount is required."]
        ,"Payment information unchanged.": ["Дані про оплату не змінилися.", "Payment information unchanged."]
        ,"Payment information updated.": ["Дані про оплату оновлено.", "Payment information updated."]
        ,"Invoice is already cancelled.": ["Рахунок уже скасовано.", "Invoice is already cancelled."]
        ,"Cancellation reason must be 2000 characters or less.": ["Причина скасування має містити не більше 2 000 символів.", "Cancellation reason must be 2,000 characters or fewer."]
        ,"Could not cancel invoice.": ["Не вдалося скасувати рахунок.", "Could not cancel invoice."]
        ,"Notification not found": ["Сповіщення не знайдено", "Notification not found"]
        ,"Could not create company.": ["Не вдалося створити компанію.", "Could not create company."]
        ,"Could not update company.": ["Не вдалося оновити компанію.", "Could not update company."]
        ,"Could not delete company.": ["Не вдалося видалити компанію.", "Could not delete company."]
        ,"Could not create product.": ["Не вдалося створити продукт.", "Could not create product."]
        ,"Could not update product.": ["Не вдалося оновити продукт.", "Could not update product."]
        ,"Could not archive product.": ["Не вдалося архівувати продукт.", "Could not archive product."]
        ,"Could not delete product.": ["Не вдалося видалити продукт.", "Could not delete product."]
        ,"Could not update payment information.": ["Не вдалося оновити дані про оплату.", "Could not update payment information."]
        ,"Could not load notifications.": ["Не вдалося завантажити сповіщення.", "Could not load notifications."]
        ,"Could not update notification.": ["Не вдалося оновити сповіщення.", "Could not update notification."]
        ,"Could not delete notification.": ["Не вдалося видалити сповіщення.", "Could not delete notification."]
        ,"Could not mark notifications as read.": ["Не вдалося позначити сповіщення прочитаними.", "Could not mark notifications as read."]
        ,"Unsupported currency": ["Непідтримувана валюта", "Unsupported currency"]
        ,"Invalid monetary value": ["Некоректне грошове значення.", "Invalid monetary value"]
        ,"Paid amount cannot be negative": ["Сума оплати не може бути від’ємною.", "Paid amount cannot be negative"]
        ,"Paid amount cannot exceed invoice total": ["Сума оплати не може перевищувати загальну суму рахунку.", "Paid amount cannot exceed invoice total"]
        ,"Dates must use YYYY-MM-DD format": ["Дати мають бути у форматі YYYY-MM-DD.", "Dates must use YYYY-MM-DD format"]
        ,"Company name is required": ["Необхідно вказати назву компанії.", "Company name is required"]
        ,"Unknown software product": ["Невідомий програмний продукт.", "Unknown software product"]
        ,"Total amount must be greater than 0": ["Загальна сума має бути більшою за 0.", "Total amount must be greater than 0"]
        ,"Invalid budget product or amount": ["Некоректний продукт або сума бюджету.", "Invalid budget product or amount"]
        ,"Invalid company budget data.": ["Некоректні дані бюджету компанії.", "Invalid company budget data."]
        ,"Invalid contract completion date or currency.": ["Некоректна дата завершення договору або валюта.", "Invalid contract completion date or currency."]
        ,"Invalid audit log filters.": ["Некоректні параметри фільтрації журналу аудиту.", "Invalid audit log filters."]
        ,"Файл не является корректным изображением.": ["Файл не є коректним зображенням.", "The file is not a valid image."]
        ,"Изображение имеет некорректные размеры.": ["Зображення має некоректні розміри.", "The image dimensions are invalid."]
        ,"Invalid company_id": ["Некоректний ідентифікатор компанії.", "Invalid company_id"]
        ,"Invalid user_id": ["Некоректний ідентифікатор користувача.", "Invalid user_id"]
        ,"Invalid software product": ["Некоректний програмний продукт.", "Invalid software product"]
        ,"Invalid date_from. Expected YYYY-MM-DD.": ["Некоректна дата початку. Очікується формат YYYY-MM-DD.", "Invalid date_from. Expected YYYY-MM-DD."]
        ,"Invalid date_to. Expected YYYY-MM-DD.": ["Некоректна дата завершення. Очікується формат YYYY-MM-DD.", "Invalid date_to. Expected YYYY-MM-DD."]
        ,"Обзор": ["Огляд", "Dashboard"]
        ,"Финансовый контроль и состояние системы": ["Фінансовий контроль і стан системи", "Financial control and system status"]
        ,"Активна": ["Активна", "Active"]
        ,"Руководитель": ["Керівник", "Director"]
        ,"Организация ещё не создана": ["Організацію ще не створено", "Organization has not been created"]
        ,"Не создана": ["Не створено", "Not created"]
        ,"Компании": ["Компанії", "Companies"]
        ,"зарегистрировано": ["зареєстровано", "registered"]
        ,"Продукты": ["Продукти", "Products"]
        ,"Общий бюджет": ["Загальний бюджет", "Total budget"]
        ,"по валютам": ["за валютами", "by currency"]
        ,"Счета": ["Рахунки", "Invoices"]
        ,"активных": ["активних", "active"]
        ,"активный счёт": ["активний рахунок", "active invoice"]
        ,"активных счетов": ["активних рахунків", "active invoices"]
        ,"Активные счета": ["Активні рахунки", "Active invoices"]
        ,"Оплачено": ["Сплачено", "Paid"]
        ,"Остаток бюджета": ["Залишок бюджету", "Remaining budget"]
        ,"Использование": ["Використання", "Utilization"]
        ,"Редактировать компанию": ["Редагувати компанію", "Edit company"]
        ,"Название компании обязательно.": ["Необхідно вказати назву компанії.", "Company name is required."]
        ,"Название компании не должно превышать 255 символов.": ["Назва компанії має містити не більше 255 символів.", "Company name must be 255 characters or fewer."]
        ,"COMPANY": ["КОМПАНІЯ", "COMPANY"]
        ,"К счетам": ["До рахунків", "Back to invoices"]
        ,"Скачать PDF": ["Завантажити PDF", "Download PDF"]
        ,"Архив счетов": ["Архів рахунків", "Invoice archive"]
        ,"Поиск счета...": ["Пошук рахунку...", "Search invoices..."]
        ,"Все": ["Усі", "All"]
        ,"Счета не найдены": ["Рахунків не знайдено", "No invoices found"]
        ,"Измените поисковый запрос или фильтр.": ["Змініть пошуковий запит або фільтр.", "Change the search query or filter."]
        ,"Выберите счет": ["Оберіть рахунок", "Select an invoice"]
        ,"Нет выбранного счета": ["Рахунок не вибрано", "No invoice selected"]
        ,"Выберите документ из архива, чтобы открыть его предпросмотр.": ["Оберіть документ в архіві, щоб відкрити попередній перегляд.", "Select a document from the archive to preview it."]
        ,"Реквизиты пока не заполнены": ["Реквізити ще не заповнено", "Organization details have not been added yet"]
        ,"Организация не указана": ["Організацію не вказано", "No organization specified"]
        ,"Юридический адрес:": ["Юридична адреса:", "Legal address:"]
        ,"Рег. номер:": ["Реєстраційний номер:", "Registration number:"]
        ,"ИНН:": ["ІПН:", "Tax ID:"]
        ,"Банк:": ["Банк:", "Bank:"]
        ,"Счёт отменён": ["Рахунок скасовано", "Invoice cancelled"]
        ,"Причина отмены не указана.": ["Причину скасування не вказано.", "No cancellation reason provided."]
        ,"Invoice date": ["Дата рахунку", "Invoice date"]
        ,"Completion date": ["Дата завершення", "Completion date"]
        ,"PO number": ["Номер замовлення", "PO number"]
        ,"Payment status": ["Статус оплати", "Payment status"]
        ,"Outstanding": ["До сплати", "Outstanding"]
        ,"Subtotal": ["Проміжний підсумок", "Subtotal"]
        ,"FILTERS": ["ФІЛЬТРИ", "FILTERS"]
        ,"COMPANY ANALYSIS": ["АНАЛІЗ ЗА КОМПАНІЯМИ", "COMPANY ANALYSIS"]
        ,"PRODUCT ANALYSIS": ["АНАЛІЗ ЗА ПРОДУКТАМИ", "PRODUCT ANALYSIS"]
        ,"TIMELINE": ["ДИНАМІКА", "TIMELINE"]
        ,"MONTHLY": ["ЩОМІСЯЦЯ", "MONTHLY"]
        ,"SYSTEM ACTIVITY": ["АКТИВНІСТЬ СИСТЕМИ", "SYSTEM ACTIVITY"]
        ,"Журнал аудита": ["Журнал аудиту", "Audit log"]
        ,"История действий и изменений в системе": ["Історія дій і змін у системі", "History of system activity and changes"]
        ,"Контроль действий системы": ["Контроль дій системи", "System activity overview"]
        ,"События": ["Події", "Events"]
        ,"Сбросить фильтры": ["Скинути фільтри", "Reset filters"]
        ,"Все действия": ["Усі дії", "All actions"]
        ,"Все компании": ["Усі компанії", "All companies"]
        ,"Все пользователи": ["Усі користувачі", "All users"]
        ,"Все продукты": ["Усі продукти", "All products"]
        ,"Дата / время": ["Дата / час", "Date / time"]
        ,"Действие": ["Дія", "Action"]
        ,"Компания": ["Компанія", "Company"]
        ,"Пользователь": ["Користувач", "User"]
        ,"Описание": ["Опис", "Description"]
        ,"Показывать": ["Показувати", "Show"]
        ,"Оповещения": ["Сповіщення", "Notifications"]
        ,"NOTIFICATION CENTER": ["ЦЕНТР СПОВІЩЕНЬ", "NOTIFICATION CENTER"]
        ,"уведомлений": ["сповіщень", "notifications"]
        ,"Прочитать все": ["Прочитати всі", "Mark all as read"]
        ,"Непрочитанные": ["Непрочитані", "Unread"]
        ,"Критические": ["Критичні", "Critical"]
        ,"Предупреждения": ["Попередження", "Warnings"]
        ,"EVENTS": ["ПОДІЇ", "EVENTS"]
        ,"Центр уведомлений": ["Центр сповіщень", "Notification center"]
        ,"Все уведомления": ["Усі сповіщення", "All notifications"]
        ,"Загрузка уведомлений": ["Завантаження сповіщень", "Loading notifications"]
        ,"Получаем актуальное состояние системы…": ["Отримуємо актуальний стан системи…", "Loading the latest system status…"]
        ,"Уведомлений нет": ["Сповіщень немає", "No notifications"]
        ,"Непрочитанных уведомлений нет": ["Немає непрочитаних сповіщень", "No unread notifications"]
        ,"Выдан": ["Виставлено", "Issued"]
        ,"Готов к печати": ["Готовий до друку", "Ready to print"]
        ,"Генератор": ["Генератор", "Generator"]
        ,"Системные события, финансовые риски и контрольные уведомления": ["Системні події, фінансові ризики та контрольні сповіщення", "System events, financial risks and control notifications"]
        ,"Не удалось загрузить журнал": ["Не вдалося завантажити журнал аудиту", "Could not load the audit log"]
        ,"Текущее состояние": ["Поточний стан", "Current status"]
        ,"Договоры и отношения": ["Договори та відносини", "Contracts and relationships"]
        ,"Расходы и лимиты": ["Витрати та ліміти", "Expenses and limits"]
        ,"Счета и оплаты": ["Рахунки та оплати", "Invoices and payments"]
        ,"Показатели и динамика": ["Показники та динаміка", "Metrics and trends"]
        ,"Системное событие": ["Системна подія", "System event"]
        ,"Критично": ["Критично", "Critical"]
        ,"Внимание": ["Увага", "Warning"]
        ,"Информация": ["Інформація", "Information"]
        ,"Платформа финансового контроля": ["Платформа фінансового контролю", "Financial control platform"]
        ,"Просмотр, печать и серверное формирование PDF существующих счетов.": ["Перегляд, друк і формування PDF на сервері для наявних рахунків.", "Preview, print and server-side PDF generation for existing invoices."]
        ,"Фильтры журнала": ["Фільтри журналу", "Audit log filters"]
        ,"Настройте выборку событий": ["Налаштуйте вибірку подій", "Configure the event selection"]
        ,"Очистить поиск": ["Очистити пошук", "Clear search"]
        ,"Событие, описание, ID...": ["Подія, опис, ID...", "Event, description, ID..."]
        ,"Поиск": ["Пошук", "Search"]
        ,"От даты": ["Від дати", "From date"]
        ,"До даты": ["До дати", "To date"]
        ,"Применить": ["Застосувати", "Apply"]
        ,"Сбросить": ["Скинути", "Reset"]
        ,"События системы": ["Події системи", "System events"]
        ,"Последние действия в системе": ["Останні дії в системі", "Latest system activity"]
        ,"Всего событий": ["Усього подій", "Total events"]
        ,"На странице": ["На сторінці", "On this page"]
        ,"Текущий статус": ["Поточний стан", "Current status"]
        ,"Отслеживайте изменения, операции пользователей и финансовые события в едином журнале ElixOR Connect.": ["Відстежуйте зміни, дії користувачів і фінансові події в єдиному журналі ElixOR Connect.", "Track changes, user actions and financial events in one ElixOR Connect log."]
        ,"Дата начала не может быть позже даты окончания.": ["Дата початку не може бути пізніше дати завершення.", "The start date cannot be after the end date."]
        ,"Готово": ["Готово", "Ready"]
        ,"Ошибка": ["Помилка", "Error"]
        ,"Загрузка": ["Завантаження", "Loading"]
        ,"Нет совпадений": ["Збігів не знайдено", "No matches"]
        ,"Загрузка журнала": ["Завантаження журналу", "Loading audit log"]
        ,"Получаем события из базы данных...": ["Отримуємо події з бази даних...", "Loading events from the database..."]
        ,"События не найдены": ["Подій не знайдено", "No events found"]
        ,"Измените параметры фильтрации или сбросьте фильтры.": ["Змініть параметри фільтрації або скиньте фільтри.", "Change the filters or reset them."]
        ,"Проверьте соединение с сервером.": ["Перевірте з'єднання із сервером.", "Check your connection to the server."]
        ,"Повторить": ["Повторити", "Retry"]
        ,"Открыть организацию": ["Відкрити організацію", "Open organization"]
        ,"Открыть раздел нашей организации": ["Відкрити розділ нашої організації", "Open our organization"]
        ,"Основные показатели": ["Основні показники", "Key metrics"]
        ,"Финансовая сводка": ["Фінансовий підсумок", "Financial summary"]
        ,"Разделы ElixOR Connect": ["Розділи ElixOR Connect", "ElixOR Connect sections"]
        ,"из": ["із", "of"]
        ,"страница": ["сторінка", "page"]
        ,"All companies": ["Усі компанії", "All companies"]
        ,"All products": ["Усі продукти", "All products"]
        ,"Create": ["Створити", "Create"]
        ,"Update": ["Оновити", "Update"]
        ,"Cancel": ["Скасувати", "Cancel"]
        ,"Login": ["Вхід", "Login"]
        ,"Logout": ["Вихід", "Logout"]
        ,"COMPANIES": ["КОМПАНІЇ", "COMPANIES"]
        ,"PRODUCTS": ["ПРОДУКТИ", "PRODUCTS"]
        ,"INVOICES": ["РАХУНКИ", "INVOICES"]
        ,"Software License": ["Ліцензія на програмне забезпечення", "Software License"]
        ,"Invoice": ["Рахунок", "Invoice"]
        ,"Description": ["Опис", "Description"]
        ,"Amount": ["Сума", "Amount"]
        ,"Notes": ["Примітки", "Notes"]
        ,"Paid": ["Сплачено", "Paid"]
        ,"Total": ["Усього", "Total"]
        ,"Product": ["Продукт", "Product"]
        ,"Currency": ["Валюта", "Currency"]
        ,"Terms & conditions": ["Умови", "Terms & conditions"]
        ,"Open organization": ["Відкрити організацію", "Open organization"]
        ,"Open our organization": ["Відкрити нашу організацію", "Open our organization"]
        ,"Key metrics": ["Основні показники", "Key metrics"]
        ,"Financial summary": ["Фінансовий підсумок", "Financial summary"]
        ,"ElixOR Connect sections": ["Розділи ElixOR Connect", "ElixOR Connect sections"]
        ,"Print": ["Друк", "Print"]
        ,"Бюджеты": ["Бюджети", "Budgets"]
        ,"Аналитика": ["Аналітика", "Analytics"]
        ,"счетов": ["рахунків", "invoices"]
        ,"0 счетов": ["0 рахунків", "0 invoices"]
        ,"Выберите документ из архива,": ["Оберіть документ в архіві,", "Select a document from the archive,"]
        ,"чтобы открыть его предпросмотр.": ["щоб відкрити попередній перегляд.", "to open its preview."]
        ,"ElixOR Connect — Overview": ["ElixOR Connect — Огляд", "ElixOR Connect — Overview"]
        ,"Invoice Generator — ElixOR Connect": ["Генератор рахунків — ElixOR Connect", "Invoice Generator — ElixOR Connect"]
        ,"Audit Log — ElixOR Connect": ["Журнал аудиту — ElixOR Connect", "Audit Log — ElixOR Connect"]
        ,"Notifications — ElixOR Connect": ["Сповіщення — ElixOR Connect", "Notifications — ElixOR Connect"]
        ,"Companies — ElixOR Connect": ["Компанії — ElixOR Connect", "Companies — ElixOR Connect"]
        ,"Analytics — ElixOR Connect": ["Аналітика — ElixOR Connect", "Analytics — ElixOR Connect"]
        ,"Unknown": ["Невідомо", "Unknown"]
        ,"Entity": ["Об'єкт", "Entity"]
    };

    Object.keys(legacyTranslations).forEach(function (source) {
        const [ukrainian, english] = legacyTranslations[source];
        translations.uk[source] = ukrainian;
        translations.en[source] = english;
    });


    /* =========================================================
       LANGUAGE
       ========================================================= */

    let sessionLanguage = null;
    let sessionTheme = null;
    let languagePersistenceUnavailable = false;
    let themePersistenceUnavailable = false;

    function readPreference(key) {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            return null;
        }
    }

    function writePreference(key, value) {
        try {
            localStorage.setItem(key, value);
            return true;
        } catch (error) {
            return false;
        }
    }

    function getLang() {
        if (languagePersistenceUnavailable && sessionLanguage) {
            return sessionLanguage;
        }

        const stored = readPreference("finflow-language");

        if (stored === "uk" || stored === "en") {
            sessionLanguage = stored;
            return stored;
        }

        if (stored === "ru") {
            sessionLanguage = "uk";
            writePreference("finflow-language", sessionLanguage);
            return sessionLanguage;
        }

        return sessionLanguage || "uk";
    }


    function getLanguage() {
        return getLang();
    }

    function getLocale() {
        return getLang() === "en" ? "en-GB" : "uk-UA";
    }


    function setLang(lang) {
        lang = lang === "en" ? "en" : "uk";

        sessionLanguage = lang;
        languagePersistenceUnavailable =
            !writePreference("finflow-language", lang);

        applyLanguage(lang);

        window.dispatchEvent(
            new CustomEvent("finflow-language-changed", {
                detail: { lang: lang }
            })
        );
    }


    /* =========================================================
       TRANSLATION
       ========================================================= */

    const ukrainianToEnglish = {};

    Object.keys(translations.uk).forEach(function (english) {
        const ukrainian = translations.uk[english];
        if (!Object.prototype.hasOwnProperty.call(ukrainianToEnglish, ukrainian)) {
            ukrainianToEnglish[ukrainian] = english;
        }
    });


    function translate(value, lang) {
        if (String(value).trim() === "ElixOR Connect") return "ElixOR Connect";
        if (!value) return value;

        lang = lang || getLang();

        const text = String(value);
        const normalizedText = text.replace(/\s+/g, " ").trim();

        if (
            translations[lang] &&
            Object.prototype.hasOwnProperty.call(translations[lang], text)
        ) {
            return translations[lang][text];
        }

        if (normalizedText !== text && translations[lang]) {
            const normalizedKey = Object.keys(translations[lang]).find(function (key) {
                return key.replace(/\s+/g, " ").trim() === normalizedText;
            });
            if (normalizedKey) return translations[lang][normalizedKey];
        }

        if (lang === "uk") {

            if (translations.uk[text]) {
                return translations.uk[text];
            }

            const lower = text.toLowerCase();

            const englishKey =
                Object.keys(translations.uk).find(function (key) {
                    return key.toLowerCase() === lower;
                });

            return englishKey
                ? translations.uk[englishKey]
                : text;
        }


        if (lang === "en") {

            if (ukrainianToEnglish[text]) {
                return ukrainianToEnglish[text];
            }

            const lower = text.toLowerCase();

            const ukrainianKey =
                Object.keys(ukrainianToEnglish).find(function (key) {
                    return key.toLowerCase() === lower;
                });

            return ukrainianKey
                ? ukrainianToEnglish[ukrainianKey]
                : text;
        }


        return text;
    }


    function translateSmart(value, lang) {

        let result = translate(value, lang);

        if (!result) return result;


        if (lang === "uk") {

            result = result.replace(
                /Invoice (.+?) is (\d+) day(?:s)? overdue\. ([€$₴][\d,.]+) outstanding\./gi,
                "Рахунок $1 прострочено на $2 дн. Не сплачено: $3."
            );

            result = result.replace(
                /\bISSUED\b/gi,
                "ВИСТАВЛЕНО"
            );

            result = result.replace(
                /\bCANCELLED\b/gi,
                "СКАСОВАНО"
            );

            result = result.replace(
                /\bPAID\b/gi,
                "ОПЛАЧЕНО"
            );

            result = result.replace(
                /\bPARTIAL\b/gi,
                "ЧАСТКОВО"
            );

            result = result.replace(
                /\bUNPAID\b/gi,
                "НЕ ОПЛАЧЕНО"
            );

            result = result.replace(
                /\bOVERDUE\b/gi,
                "ПРОСТРОЧЕНО"
            );

            result = result.replace(
                /\bHISTORY\b/gi,
                "ІСТОРІЯ"
            );

            result = result.replace(
                /\bHEALTHY\b/gi,
                "У НОРМІ"
            );

            result = result.replace(
                /\bHIGH USAGE\b/gi,
                "ВИСОКЕ ЗАВАНТАЖЕННЯ"
            );

            result = result.replace(
                /\bOVER BUDGET\b/gi,
                "ПЕРЕВИЩЕННЯ БЮДЖЕТУ"
            );

            result = result.replace(
                /\bused\b/gi,
                "використано"
            );

            result = result.replace(
                /\balerts\b/gi,
                "попереджень"
            );

            result = result.replace(
                /Budget exceeded by ([€$₴])([\d,.]+)/gi,
                "Бюджет перевищено на $1$2"
            );

            result = result.replace(
                /([\d,.]+)% of the budget has been invoiced\. ([€$₴])([\d,.]+) remains\./gi,
                "Виставлено $1% бюджету. Залишок: $2$3."
            );

            result = result.replace(
                /Contract ends in (\d+) day(?:s)?\./gi,
                "До завершення договору $1 дн."
            );

            result = result.replace(
                /Invoice (.+?) is (\d+) day(?:s)? overdue\. ([€$₴][\d,.]+) outstanding\./gi,
                "Рахунок $1 прострочено на $2 дн. Не сплачено: $3."
            );

            result = result.replace(
                /Contract ends in (\d+) day(?:s)?/gi,
                "До завершення договору $1 дн"
            );
        }


        if (lang === "en") {

            result = result.replace(
                /Рахунок (.+?) прострочено на (\d+) дн\.? Не сплачено: ([€$₴][\d,.]+)\./gi,
                "Invoice $1 is $2 days overdue. $3 outstanding."
            );

            result = result.replace(
                /\bВИСТАВЛЕНО\b/gi,
                "ISSUED"
            );

            result = result.replace(
                /\bСКАСОВАНО\b/gi,
                "CANCELLED"
            );

            result = result.replace(
                /\bОПЛАЧЕНО\b/gi,
                "PAID"
            );

            result = result.replace(
                /\bЧАСТИЧНО\b/gi,
                "PARTIAL"
            );

            result = result.replace(
                /\bНЕ ОПЛАЧЕНО\b/gi,
                "UNPAID"
            );

            result = result.replace(
                /\bПРОСТРОЧЕНО\b/gi,
                "OVERDUE"
            );

            result = result.replace(
                /\bІСТОРІЯ\b/gi,
                "HISTORY"
            );

            result = result.replace(
                /\bУ НОРМІ\b/gi,
                "HEALTHY"
            );

            result = result.replace(
                /\bВИСОКЕ НАВАНТАЖЕННЯ\b/gi,
                "HIGH USAGE"
            );

            result = result.replace(
                /\bПЕРЕВИЩЕННЯ БЮДЖЕТУ\b/gi,
                "OVER BUDGET"
            );

            result = result.replace(
                /\bВИКОРИСТАНО\b/gi,
                "used"
            );

            result = result.replace(
                /\bпопереджень\b/gi,
                "alerts"
            );

            result = result.replace(
                /Бюджет перевищено на ([€$₴])([\d,.]+)/gi,
                "Budget exceeded by $1$2"
            );

            result = result.replace(
                /Виставлено ([\d,.]+)% бюджету\. Залишок: ([€$₴])([\d,.]+)\./gi,
                "$1% of the budget has been invoiced. $2$3 remains."
            );

            result = result.replace(
                /До завершення договору (\d+) дн\.?/gi,
                "Contract ends in $1 days."
            );

            result = result.replace(
                /Рахунок (.+?) прострочено на (\d+) дн\.? Не сплачено: ([€$₴][\d,.]+)\./gi,
                "Invoice $1 is $2 days overdue. $3 outstanding."
            );
        }


        return result;
    }


    /* =========================================================
       DOM TRANSLATION
       ========================================================= */

    const originalTextNodes = new WeakMap();
    const originalDocumentTitle = document.title;


    function sourceText(node) {

        if (!originalTextNodes.has(node)) {
            originalTextNodes.set(node, node.nodeValue);
        }

        return originalTextNodes.get(node);
    }


    function isProtected(node) {

        return !!(
            node &&
            node.closest &&
            node.closest(
                '[data-finflow-no-i18n], .invoice-document, #invoiceDocument, .print-invoice'
            )
        );
    }


    function translateDom(root, lang) {

        if (!root) return;


        const walker = document.createTreeWalker(
            root,
            NodeFilter.SHOW_TEXT
        );


        const nodes = [];
        let node;


        while ((node = walker.nextNode())) {
            nodes.push(node);
        }


        nodes.forEach(function (textNode) {

            if (isProtected(textNode.parentElement)) {
                return;
            }


            const parent = textNode.parentElement;

            if (
                parent &&
                parent.closest &&
                parent.closest(
                    "script, style"
                )
            ) {
                return;
            }


            const original = sourceText(textNode);
            const trimmed = original.trim();


            if (!trimmed) return;


            const translated =
                translateSmart(trimmed, lang);


            if (translated !== trimmed) {

                textNode.nodeValue =
                    original.replace(
                        trimmed,
                        translated
                    );

            } else {

                textNode.nodeValue = original;
            }
        });


        if (
            root.querySelectorAll
        ) {

            root.querySelectorAll(
                "input, textarea, select, button, [title], [aria-label]"
            ).forEach(function (el) {

                if (isProtected(el)) {
                    return;
                }


                [
                    "placeholder",
                    "title",
                    "aria-label"
                ].forEach(function (attr) {

                    if (!el.hasAttribute(attr)) {
                        return;
                    }


                    const marker =
                        "data-finflow-original-" + attr;


                    if (!el.hasAttribute(marker)) {

                        el.setAttribute(
                            marker,
                            el.getAttribute(attr)
                        );
                    }


                    const original =
                        el.getAttribute(marker);


                    el.setAttribute(
                        attr,
                        translateSmart(
                            original,
                            lang
                        )
                    );
                });
            });
        }


        /* Explicit data-i18n support */

        root.querySelectorAll &&
        root.querySelectorAll("[data-i18n]").forEach(function (el) {

            const key = el.dataset.i18n;

            el.textContent =
                lang === "uk"
                    ? (translations.uk[key] || key)
                    : key;
        });


        root.querySelectorAll &&
        root.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {

            const key =
                el.dataset.i18nPlaceholder;

            el.placeholder =
                lang === "uk"
                    ? (translations.uk[key] || key)
                    : key;
        });


        root.querySelectorAll &&
        root.querySelectorAll("[data-i18n-title]").forEach(function (el) {

            const key =
                el.dataset.i18nTitle;

            el.title =
                lang === "uk"
                    ? (translations.uk[key] || key)
                    : key;
        });

        root.querySelectorAll("[data-i18n-aria-label]").forEach(function (el) {
            const key = el.dataset.i18nAriaLabel;
            const translated =
                lang === "uk"
                    ? (translations.uk[key] || key)
                    : (translations.en[key] || key);

            el.setAttribute("aria-label", translated);
        });

        root.querySelectorAll("[data-finflow-date]").forEach(function (el) {
            const value = el.dataset.finflowDate;
            const date = new Date(value);
            if (Number.isNaN(date.getTime())) return;

            const options = el.hasAttribute("data-finflow-date-time")
                ? { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }
                : { year: "numeric", month: "2-digit", day: "2-digit" };

            el.textContent = new Intl.DateTimeFormat(
                lang === "en" ? "en-GB" : "uk-UA",
                options
            ).format(date);
        });


        /* Explicit data-i18n-value support */

        root.querySelectorAll &&
        root.querySelectorAll("[data-i18n-value]").forEach(function (el) {

            const key =
                el.dataset.i18nValue;

            const translated =
                translations.uk[key] || key;

            /*
             * Only translate known default values.
             * Any other value is considered user input
             * and must never be overwritten.
             */
            if (
                el.value === key ||
                el.value === translated ||
                el.value === "" ||
                !el.value
            ) {
                el.value =
                    lang === "uk"
                        ? translated
                        : key;
            }
        });
    }


    /* =========================================================
       SWITCHER
       ========================================================= */

    function updateSwitcher(lang) {

        const button =
            document.getElementById(
                "finflow-lang-button"
            );

        if (!button) {
            return;
        }

        button.textContent =
            lang === "uk"
                ? "UA"
                : "EN";

        button.setAttribute(
            "aria-label",
            lang === "uk"
                ? "Switch language to Ukrainian"
                : "Переключити мову на англійську"
        );

        button.title =
            lang === "uk"
                ? "Switch to Ukrainian"
                : "Переключити на англійську";
    }

    function addLanguageSwitcher() {
        /*
         * Dashboard language switcher is rendered statically
         * inside the ElixOR Connect sidebar.
         *
         * Keep this function for API compatibility, but do not
         * create another floating/button switcher here.
         */
        return;
    }

    function updateLandingSwitcher(lang) {

        const switcher =
            document.getElementById(
                "ff-landing-lang-switcher"
            );

        if (!switcher) {
            return;
        }

        switcher
            .querySelectorAll(".landing-language-button")
            .forEach(function (button) {
                const active =
                    button.dataset.lang === lang;

                button.classList.toggle(
                    "is-active",
                    active
                );

                button.setAttribute(
                    "aria-pressed",
                    active ? "true" : "false"
                );
            });
    }


    function addLandingLanguageSwitcher() {

        const switcher =
            document.getElementById(
                "ff-landing-lang-switcher"
            );

        if (!switcher) {
            return;
        }

        switcher
            .querySelectorAll(".landing-language-button")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {
                        setLang(
                            button.dataset.lang === "en"
                                ? "en"
                                : "uk"
                        );
                    }
                );
            });

        updateLandingSwitcher(
            getLang()
        );
    }


    /* =========================================================
       LANGUAGE APPLICATION
       ========================================================= */

    function applyLanguage(lang) {

        lang = lang === "en"
            ? "en"
            : "uk";


        document.documentElement.lang =
            lang;

        document.title = translateSmart(originalDocumentTitle, lang);


        translateDom(
            document.body,
            lang
        );


        updateSwitcher(lang);
        updateLandingSwitcher(lang);


        /*
         * Dashboard dynamic UI
         */

        if (
            typeof window.renderNotificationCenter ===
            "function"
        ) {
            window.renderNotificationCenter();
        }


        if (
            typeof window.updateSummaryCards ===
            "function"
        ) {
            window.updateSummaryCards();
        }


        if (
            typeof window.updateProductCardMetrics ===
            "function"
        ) {
            window.updateProductCardMetrics();
        }
    }


    /* =========================================================
       BROWSER DIALOGS
       ========================================================= */

    const originalAlert =
        window.alert;

    const originalConfirm =
        window.confirm;

    const originalPrompt =
        window.prompt;


    window.alert =
        function (message) {

            return originalAlert(
                translateSmart(
                    String(message),
                    getLang()
                )
            );
        };


    window.confirm =
        function (message) {

            return originalConfirm(
                translateSmart(
                    String(message),
                    getLang()
                )
            );
        };


    window.prompt =
        function (
            message,
            defaultValue
        ) {

            return originalPrompt(
                translateSmart(
                    String(message),
                    getLang()
                ),
                defaultValue
            );
        };


    /* =========================================================
       DYNAMIC DOM
       ========================================================= */

    const observer =
        new MutationObserver(
            function (mutations) {

                const lang =
                    getLang();


                mutations.forEach(
                    function (mutation) {

                        mutation.addedNodes.forEach(
                            function (node) {

                                if (
                                    node.nodeType ===
                                    Node.ELEMENT_NODE
                                ) {

                                    translateDom(
                                        node,
                                        lang
                                    );
                                }
                            }
                        );
                    }
                );
            }
        );


    /* =========================================================
       THEME ENGINE
       ========================================================= */

    const THEME_STORAGE_KEY = "finflow-theme";

    function getTheme() {
        if (themePersistenceUnavailable && sessionTheme) {
            return sessionTheme;
        }

        const saved = readPreference(THEME_STORAGE_KEY);

        if (saved === "light" || saved === "dark") {
            sessionTheme = saved;
            return saved;
        }

        return sessionTheme || "dark";
    }

    function applyTheme(theme, persist = true) {
        const nextTheme = theme === "light" ? "light" : "dark";

        sessionTheme = nextTheme;
        document.documentElement.setAttribute("data-theme", nextTheme);

        if (persist) {
            themePersistenceUnavailable =
                !writePreference(THEME_STORAGE_KEY, nextTheme);
        }

        window.dispatchEvent(
            new CustomEvent("finflow-theme-changed", {
                detail: { theme: nextTheme }
            })
        );

        return nextTheme;
    }

    function setTheme(theme) {
        return applyTheme(theme, true);
    }

    function toggleTheme() {
        return setTheme(getTheme() === "light" ? "dark" : "light");
    }

    applyTheme(getTheme(), false);

    /* =========================================================
       PUBLIC API
       ========================================================= */

    document.documentElement.setAttribute(
        "data-finflow-i18n-loaded",
        "yes"
    );

    window.finflowI18n = {

        getLang,
        getLanguage,
        getLocale,
        translate,
        translateSmart,
        setLang,
        applyLanguage,
        addLanguageSwitcher,
        addLandingLanguageSwitcher,
        addSwitcher: addLanguageSwitcher,
        getTheme,
        setTheme,
        toggleTheme,
        applyTheme
    };


    /* =========================================================
       INIT
       ========================================================= */

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            addLandingLanguageSwitcher();

            applyLanguage(
                getLang()
            );


            observer.observe(
                document.body,
                {
                    childList: true,
                    subtree: true
                }
            );
        }
    );

})();
