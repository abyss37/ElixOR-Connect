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
            "Sign in to ElixOR Connect": "Увійти до FinFlow",

            "Financial Operations Platform":
                "Платформа фінансових операцій",

            "A modern self-hosted platform for managing budgets, invoices, payments, contracts, analytics, notifications and financial operations in one controlled environment.":
                "Сучасна self-hosted платформа для керування бюджетами, рахунками, платежами, договорами, аналітикою, сповіщеннями та фінансовими операціями в одному контрольованому середовищі.",

            "Sign in to your ElixOR Connect workspace":
                "Увійдіть до робочого простору FinFlow",

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


    /* =========================================================
       LANGUAGE
       ========================================================= */

    function getLang() {
        const stored = localStorage.getItem("finflow-language");

        if (stored === "ru") {
            localStorage.setItem("finflow-language", "uk");
            return "uk";
        }

        return stored === "en" ? "en" : "uk";
    }


    function getLanguage() {
        return getLang();
    }


    function setLang(lang) {
        lang = lang === "en" ? "en" : "uk";

        localStorage.setItem("finflow-language", lang);

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
        ukrainianToEnglish[translations.uk[english]] = english;
    });


    function translate(value, lang) {
        if (!value) return value;

        lang = lang || getLang();

        const text = String(value);

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
                /Budget exceeded by €([\d,.]+)/gi,
                "Бюджет перевищено на €$1"
            );

            result = result.replace(
                /([\d.]+)% of the budget has been invoiced\. €([\d,.]+) remains\./gi,
                "Виставлено $1% бюджету. Залишок: €$2."
            );

            result = result.replace(
                /Contract ends in (\d+) day(?:s)?/gi,
                "До завершення договору $1 дн"
            );
        }


        if (lang === "en") {

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
                /Бюджет перевищено на €([\d,.]+)/gi,
                "Budget exceeded by €$1"
            );

            result = result.replace(
                /Виставлено ([\d.]+)% бюджету\. Залишок: €([\d,.]+)\./gi,
                "$1% of the budget has been invoiced. €$2 remains."
            );

            result = result.replace(
                /До завершення договору (\d+) дн/gi,
                "Contract ends in $1 day"
            );
        }


        return result;
    }


    /* =========================================================
       DOM TRANSLATION
       ========================================================= */

    const originalTextNodes = new WeakMap();


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
       PUBLIC API
       ========================================================= */

    document.documentElement.setAttribute(
        "data-finflow-i18n-loaded",
        "yes"
    );

    window.finflowI18n = {

        getLang,
        getLanguage,
        translate,
        translateSmart,
        setLang,
        applyLanguage,
        addLanguageSwitcher,
        addLandingLanguageSwitcher,
        addSwitcher: addLanguageSwitcher
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
