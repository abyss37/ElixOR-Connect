(function () {
    "use strict";
    const THEME_STORAGE_KEY = "finflow-theme";

    function getTheme() {
        try {
            const saved = localStorage.getItem(THEME_STORAGE_KEY);
            if (saved === "light" || saved === "dark") return saved;
        } catch (e) {}

        return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
            ? "light"
            : "dark";
    }

    function setTheme(theme) {
        const nextTheme = theme === "light" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", nextTheme);
        try { localStorage.setItem(THEME_STORAGE_KEY, nextTheme); } catch (e) {}
        updateThemeToggle();
    }

    function toggleTheme() {
        setTheme(getTheme() === "light" ? "dark" : "light");
    }

    function updateThemeToggle() {
        const button = document.getElementById("elixor-theme-toggle");
        if (!button) return;
        const icon = button.querySelector("i");
        const theme = getTheme();
        if (icon) {
            icon.className = theme === "light" ? "bi bi-moon-stars-fill" : "bi bi-sun-fill";
        }
        const label = theme === "light" ? "Switch to dark theme" : "Switch to light theme";
        button.setAttribute("aria-label", label);
        button.setAttribute("title", label);
    }


    const translations = {
        uk: {
            navFeatures: "Можливості",
            navSecurity: "Безпека",
            navArchitecture: "Архітектура",
            navUseCases: "Сценарії",
            signIn: "Увійти",

            heroEyebrow: "SELF-HOSTED FINANCIAL INFRASTRUCTURE",
            heroTitle: "Мультикомпанійний фінансовий контроль.",
            heroAccent: "Без cloud lock-in.",
            heroDescription:
                "Сучасна self-hosted платформа для керування компаніями, бюджетами, рахунками та фінансовими операціями в єдиному контрольованому робочому просторі.",
            heroPrimary: "Увійти до ElixOR Connect",
            heroGithub: "Переглянути код на GitHub",
            metaSovereignty: "Контроль даних",
            metaSelfHosted: "Self-hosted",

            systemReady: "Система готова",
            overview: "Огляд",
            companies: "Компанії",
            invoices: "Рахунки",
            analytics: "Аналітика",
            workspace: "ФІНАНСОВИЙ ПРОСТІР",
            dashboardTitle: "Фінансовий огляд",
            activeInvoices: "АКТИВНІ РАХУНКИ",
            budgetUtilization: "ВИКОРИСТАННЯ БЮДЖЕТУ",
            counterparties: "КОНТРАГЕНТИ",
            tracked: "Відстежувані організації",
            financialSummary: "Фінансове зведення",
            systemStatus: "Стан системи",
            connected: "Підключено",
            protected: "Захищено",
            enabled: "Увімкнено",

            valueMulti: "Мультикомпанійність",
            valueMultiText: "Ізольовані фінансові контури",
            valueSelf: "Власна інфраструктура",
            valueSelfText: "Ваша інфраструктура",
            valueAudit: "Аудитованість",
            valueAuditText: "Прозора історія операцій",
            valueDatabaseText: "Робоча база даних",

            productKicker: "РОБОЧИЙ ПРОСТІР",
            productTitle: "Ваш фінансовий простір. Під вашим контролем.",
            productDescription:
                "Об'єднайте операції компаній, бюджети, рахунки та фінансову аналітику, не передаючи контроль над власною інфраструктурою.",
            budgets: "Бюджети",
            audit: "Аудит",
            currentWorkspace: "ПОТОЧНИЙ ПРОСТІР",
            budget: "ЗАГАЛЬНИЙ БЮДЖЕТ",
            invoiced: "ВИСТАВЛЕНО РАХУНКІВ",
            remaining: "ЗАЛИШОК",
            utilization: "ВИКОРИСТАННЯ",
            budgetHealth: "Стан бюджету",
            withinLimits: "У межах планових лімітів",

            featuresKicker: "ОСНОВНІ МОЖЛИВОСТІ",
            featuresTitle: "Усе під контролем.",
            featuresDescription:
                "Фокусований операційний рівень для фінансових команд, яким потрібні прозорість, контроль і мінімум зайвої складності.",

            featureCompanies: "Керування компаніями",
            featureCompaniesText:
                "Керуйте організаціями та підтримуйте розділені фінансові контури в єдиному робочому просторі.",
            featureInvoices: "Рахунки та білінг",
            featureInvoicesText:
                "Створюйте, керуйте та відстежуйте вихідні рахунки в контрольованому фінансовому процесі.",
            featureBudgets: "Контроль бюджету",
            featureBudgetsText:
                "Контролюйте бюджети, використання коштів та фінансові пороги в реальному часі.",
            featureAnalytics: "Фінансова аналітика",
            featureAnalyticsText:
                "Перетворюйте операційні дані на зрозумілу фінансову аналітику та контроль.",
            featureRBAC: "Рольовий доступ",
            featureRBACText:
                "Керуйте доступом до чутливих операцій відповідно до ролей і відповідальності користувачів.",
            featureAudit: "Журнал аудиту",
            featureAuditText:
                "Зберігайте контрольовану історію важливих системних і фінансових дій.",

            securityKicker: "БЕЗПЕКА ТА ІНФРАСТРУКТУРА",
            securityTitle: "Ваша інфраструктура. Ваші дані.",
            securityDescription:
                "ElixOR Connect працює всередині вашої інфраструктури, надаючи організації прямий контроль над розгортанням, доступом і фінансовими даними.",

            architectureKicker: "АРХІТЕКТУРА",
            architectureTitle: "Створено для розвитку вашої інфраструктури.",
            architectureDescription:
                "Надійна фінансова основа сьогодні, готова підключатися до ширших бізнес-процесів завтра.",
            architectureCore: "Ядро фінансових операцій",
            architectureFinance: "Фінанси",
            architectureFinanceText: "Бюджети · Рахунки · Аналітика",
            architectureEntities: "Сутності",
            architectureEntitiesText: "Компанії · Продукти · Контури",
            architectureFuture: "Інтеграції",
            architectureFutureText: "CRM · ERP · Бізнес-процеси",
            roadmapLabel: "ШЛЯХ РОЗВИТКУ",

            useCasesKicker: "СТВОРЕНО ДЛЯ",
            useCasesTitle:
                "Фінансовий контроль для команд, які цінують власність над даними.",
            useCaseCompanies: "Кілька компаній",
            useCaseCompaniesText:
                "Розділяйте фінансові операції між організаціями та бізнес-напрямами.",
            useCaseServices: "Сервісний бізнес",
            useCaseServicesText:
                "Керуйте контрактами, бюджетами, рахунками та операційними витратами з одного простору.",
            useCasePrivacy: "Команди, орієнтовані на приватність",
            useCasePrivacyText:
                "Розгортайте платформу у власній інфраструктурі, коли фінансові дані мають залишатися під вашим контролем.",

            finalKicker: "ELIXOR CONNECT",
            finalTitle: "Фінансовий контроль без cloud lock-in.",
            finalDescription:
                "Контрольований робочий простір для сучасних фінансових операцій.",
            finalPrimary: "Запустити ElixOR Connect",
            finalGithub: "Переглянути код",

            footerTagline: "Self-hosted платформа фінансових операцій",
            license: "Ліцензія"
        },

        en: {
            navFeatures: "Features",
            navSecurity: "Security",
            navArchitecture: "Architecture",
            navUseCases: "Use Cases",
            signIn: "Sign In",

            heroEyebrow: "SELF-HOSTED FINANCIAL INFRASTRUCTURE",
            heroTitle: "Multi-Company Financial Control.",
            heroAccent: "Zero Cloud Lock-in.",
            heroDescription:
                "A modern self-hosted platform for managing companies, budgets, invoices and financial operations in one controlled workspace.",
            heroPrimary: "Sign in to ElixOR Connect",
            heroGithub: "View Source on GitHub",
            metaSovereignty: "Data sovereignty",
            metaSelfHosted: "Self-hosted",

            systemReady: "System Ready",
            overview: "Overview",
            companies: "Companies",
            invoices: "Invoices",
            analytics: "Analytics",
            workspace: "FINANCIAL WORKSPACE",
            dashboardTitle: "Financial Overview",
            activeInvoices: "ACTIVE INVOICES",
            budgetUtilization: "BUDGET UTILIZATION",
            counterparties: "COUNTERPARTIES",
            tracked: "Tracked entities",
            financialSummary: "Financial Summary",
            systemStatus: "System Status",
            connected: "Connected",
            protected: "Protected",
            enabled: "Enabled",

            valueMulti: "Multi-Company",
            valueMultiText: "Isolated financial scopes",
            valueSelf: "Self-Hosted",
            valueSelfText: "Your infrastructure",
            valueAudit: "Auditable",
            valueAuditText: "Traceable operations",
            valueDatabaseText: "Production database",

            productKicker: "THE WORKSPACE",
            productTitle: "Your financial workspace. Under your control.",
            productDescription:
                "Bring company operations, budgets, invoices and financial visibility together without giving up control of your infrastructure.",
            budgets: "Budgets",
            audit: "Audit",
            currentWorkspace: "CURRENT WORKSPACE",
            budget: "TOTAL BUDGET",
            invoiced: "INVOICED",
            remaining: "REMAINING",
            utilization: "UTILIZATION",
            budgetHealth: "Budget Health",
            withinLimits: "Within planned limits",

            featuresKicker: "CORE CAPABILITIES",
            featuresTitle: "Everything under control.",
            featuresDescription:
                "A focused operational layer for financial teams that need clarity, control and minimal unnecessary complexity.",

            featureCompanies: "Company Management",
            featureCompaniesText:
                "Manage organizations and maintain separated financial scopes from one workspace.",
            featureInvoices: "Invoices & Billing",
            featureInvoicesText:
                "Create, manage and track outgoing invoices with controlled financial workflows.",
            featureBudgets: "Budget Control",
            featureBudgetsText:
                "Monitor budgets, utilization and financial thresholds in real time.",
            featureAnalytics: "Financial Analytics",
            featureAnalyticsText:
                "Turn operational data into clear financial insights and actionable visibility.",
            featureRBAC: "Role-Based Access",
            featureRBACText:
                "Control access to sensitive operations according to user roles and responsibilities.",
            featureAudit: "Audit Trail",
            featureAuditText:
                "Keep a traceable history of important system and financial actions.",

            securityKicker: "SECURITY & INFRASTRUCTURE",
            securityTitle: "Your infrastructure. Your data.",
            securityDescription:
                "ElixOR Connect runs inside your infrastructure, giving your organization direct control over deployment, access and financial data.",

            architectureKicker: "ARCHITECTURE",
            architectureTitle: "Built to evolve with your infrastructure.",
            architectureDescription:
                "A solid financial foundation today, designed to connect with broader business workflows tomorrow.",
            architectureCore: "Financial Operations Core",
            architectureFinance: "Finance",
            architectureFinanceText: "Budgets · Invoices · Analytics",
            architectureEntities: "Entities",
            architectureEntitiesText: "Companies · Products · Scope",
            architectureFuture: "Integrations",
            architectureFutureText: "CRM · ERP · Business workflows",
            roadmapLabel: "EVOLUTION PATH",

            useCasesKicker: "СТВОРЕНО ДЛЯ",
            useCasesTitle:
                "Financial control for teams that value data ownership.",
            useCaseCompanies: "Кілька компаній",
            useCaseCompaniesText:
                "Keep financial operations separated across organizations and business units.",
            useCaseServices: "Сервісний бізнес",
            useCaseServicesText:
                "Manage contracts, budgets, invoices and operational spending from one workspace.",
            useCasePrivacy: "Команди, орієнтовані на приватність",
            useCasePrivacyText:
                "Deploy inside your own infrastructure when financial data should remain under your control.",

            finalKicker: "ELIXOR CONNECT",
            finalTitle: "Financial control without the cloud lock-in.",
            finalDescription:
                "A controlled workspace for modern financial operations.",
            finalPrimary: "Launch ElixOR Connect",
            finalGithub: "View Source",

            footerTagline: "Self-hosted Financial Operations Platform",
            license: "License"
        }
    };

    function getLanguage() {
        try {
            const stored = localStorage.getItem("finflow-language");

            if (stored === "en") {
                return "en";
            }

            if (stored === "ru") {
                localStorage.setItem("finflow-language", "uk");
            }
        } catch (e) {}

        return "uk";
    }

    function setLanguage(lang) {
        lang = lang === "en" ? "en" : "uk";

        try {
            localStorage.setItem("finflow-language", lang);
        } catch (e) {}

        applyLanguage(lang);
    }

    function applyLanguage(lang) {
        const t = translations[lang] || translations.uk;

        document.documentElement.lang = lang;

        document.querySelectorAll("[data-i18n]").forEach(function (element) {
            const key = element.getAttribute("data-i18n");

            if (Object.prototype.hasOwnProperty.call(t, key)) {
                element.textContent = t[key];
            }
        });

        document.querySelectorAll(".elixor-language button").forEach(function (button) {
            button.classList.toggle(
                "is-active",
                button.getAttribute("data-lang") === lang
            );
        });

        updateDocumentMeta(lang);
        document.body.classList.remove("elixor-i18n-pending");
    }

    function updateDocumentMeta(lang) {
        const titles = {
            uk: "ElixOR Connect — Платформа фінансового контролю",
            en: "ElixOR Connect — Financial Infrastructure"
        };

        const descriptions = {
            uk:
                "ElixOR Connect — self-hosted платформа фінансового контролю та фінансових операцій.",
            en:
                "ElixOR Connect — self-hosted financial operations and company control platform."
        };

        document.title = titles[lang];

        const meta = document.querySelector('meta[name="description"]');

        if (meta) {
            meta.setAttribute("content", descriptions[lang]);
        }
    }

    function init() {
        document.querySelectorAll(".elixor-language button").forEach(function (button) {
            button.addEventListener("click", function () {
                setLanguage(this.getAttribute("data-lang"));
            });
        });

        const themeButton = document.getElementById("elixor-theme-toggle");

        if (themeButton) {
            themeButton.addEventListener("click", function () {
                toggleTheme();
            });
        }

        document.documentElement.setAttribute("data-theme", getTheme());
        window.addEventListener("finflow-theme-changed", updateThemeToggle);
        updateThemeToggle();

        applyLanguage(getLanguage());

        window.addEventListener("storage", function (event) {
            if (event.key === "finflow-language") {
                applyLanguage(getLanguage());
            }

            if (event.key === THEME_STORAGE_KEY) {
                document.documentElement.setAttribute("data-theme", getTheme());
                updateThemeToggle();
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

    window.elixorSetLanguage = setLanguage;
})();
