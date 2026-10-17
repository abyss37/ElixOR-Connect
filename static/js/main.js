(() => {

    const body = document.body;

    const sidebarToggle =
        document.getElementById('ff-sidebar-toggle');

    const mobileMenu =
        document.getElementById('ff-mobile-menu');

    const sidebarOverlay =
        document.getElementById('ff-sidebar-overlay');

    const STORAGE_KEY =
        'finflow-sidebar-collapsed';


    /* ========================================================
       GLOBAL NOTIFICATION BADGE
       ======================================================== */

    const notificationBadge =
        document.getElementById('ff-notification-badge');

    let notificationBadgeRevision = 0;
    let notificationBadgeRequestInFlight = false;

    function renderNotificationBadgeCount(count) {
        notificationBadge.textContent =
            count > 99
                ? '99+'
                : String(count);

        notificationBadge.classList.toggle(
            'hidden',
            count === 0
        );
    }

    function setNotificationBadgeCount(count) {

        if (
            !notificationBadge ||
            !Number.isInteger(count) ||
            count < 0
        ) {
            return;
        }

        notificationBadgeRevision += 1;
        renderNotificationBadgeCount(count);
    }

    window.setNotificationBadgeCount =
        setNotificationBadgeCount;

    async function refreshNotificationBadge() {
        if (notificationBadgeRequestInFlight) {
            return;
        }

        notificationBadgeRequestInFlight = true;
        const requestRevision = notificationBadgeRevision;

        try {
            const response = await fetch(
                '/api/notifications?count_only=1',
                {
                    headers: {
                        'Accept': 'application/json'
                    },
                    credentials: 'same-origin'
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();

            if (
                data?.status === 'ok' &&
                Number.isInteger(data.unread_count) &&
                data.unread_count >= 0 &&
                requestRevision === notificationBadgeRevision
            ) {
                renderNotificationBadgeCount(data.unread_count);
            }
        } catch (error) {
            console.debug(
                '[FinFlow] Notification badge refresh failed',
                error
            );
        } finally {
            notificationBadgeRequestInFlight = false;
        }
    }

    function initNotificationBadge() {

        if (!notificationBadge) {
            return;
        }

        // notifications.js already refreshes the full list and count there.
        if (document.getElementById('notification-list')) {
            return;
        }

        refreshNotificationBadge();
        window.setInterval(
            refreshNotificationBadge,
            30000
        );
    }


    /* ========================================================
       DESKTOP SIDEBAR
       ======================================================== */

    function updateToggle(collapsed) {

        if (!sidebarToggle) {
            return;
        }

        const icon =
            sidebarToggle.querySelector('i');

        if (icon) {

            icon.className =
                collapsed
                    ? 'bi bi-grip-vertical'
                    : 'bi bi-list';
        }

        sidebarToggle.setAttribute(
            'aria-label',
            collapsed
                ? 'Expand sidebar'
                : 'Collapse sidebar'
        );

        sidebarToggle.setAttribute(
            'title',
            collapsed
                ? 'Expand sidebar'
                : 'Collapse sidebar'
        );
    }


    function setSidebarCollapsed(
        collapsed,
        persist = true
    ) {

        body.classList.toggle(
            'ff-sidebar-collapsed',
            collapsed
        );

        updateToggle(collapsed);

        if (persist) {

            try {

                localStorage.setItem(
                    STORAGE_KEY,
                    collapsed ? '1' : '0'
                );

            } catch (error) {
                /* localStorage unavailable */
            }
        }
    }


    function restoreSidebarState() {

        let saved = null;

        try {
            saved =
                localStorage.getItem(STORAGE_KEY);

        } catch (error) {
            saved = null;
        }

        const collapsed = saved === '1';

        setSidebarCollapsed(
            collapsed,
            false
        );

        document.documentElement.classList.remove(
            'ff-sidebar-precollapsed'
        );
    }


    sidebarToggle?.addEventListener(
        'click',
        () => {

            const collapsed =
                body.classList.contains(
                    'ff-sidebar-collapsed'
                );

            setSidebarCollapsed(
                !collapsed,
                true
            );
        }
    );


    /* ========================================================
       MOBILE SIDEBAR
       ======================================================== */

    function openMobileSidebar() {

        body.classList.add(
            'ff-mobile-sidebar-open'
        );
    }


    function closeMobileSidebar() {

        body.classList.remove(
            'ff-mobile-sidebar-open'
        );
    }


    mobileMenu?.addEventListener(
        'click',
        openMobileSidebar
    );


    sidebarOverlay?.addEventListener(
        'click',
        closeMobileSidebar
    );


    document
        .querySelectorAll('.ff-nav-item')
        .forEach(item => {

            item.addEventListener(
                'click',
                () => {

                    if (
                        window.innerWidth <= 760
                    ) {
                        closeMobileSidebar();
                    }
                }
            );
        });


    document.addEventListener(
        'keydown',
        event => {

            if (event.key === 'Escape') {
                closeMobileSidebar();
            }
        }
    );


    /* ========================================================
       LANGUAGE SWITCHER
       ======================================================== */

    function updateLanguageButtons(lang) {

        document
            .querySelectorAll('.ff-language-button')
            .forEach(button => {

                const active =
                    button.dataset.lang === lang;

                button.classList.toggle(
                    'is-active',
                    active
                );

                button.setAttribute(
                    'aria-pressed',
                    active ? 'true' : 'false'
                );
            });
    }


    function initLanguageSwitcher() {

        const i18n = window.finflowI18n;

        if (!i18n) {
            console.warn(
                '[FinFlow] i18n is not loaded'
            );
            return;
        }

        updateLanguageButtons(
            i18n.getLanguage()
        );

        document
            .querySelectorAll('.ff-language-button')
            .forEach(button => {

                button.addEventListener(
                    'click',
                    () => {

                        const lang =
                            button.dataset.lang;

                        if (
                            lang !== 'uk' &&
                            lang !== 'en'
                        ) {
                            return;
                        }

                        i18n.setLang(lang);
                    }
                );
            });


        window.addEventListener(
            'finflow-language-changed',
            event => {

                const lang =
                    event.detail?.lang ||
                    i18n.getLanguage();

                updateLanguageButtons(lang);
            }
        );
    }


    /* ========================================================
       THEME SWITCHER
       ======================================================== */

    const themeToggle =
        document.getElementById("ff-theme-toggle");

    function updateThemeToggle(theme) {

        if (!themeToggle) {
            return;
        }

        const icon = themeToggle.querySelector("i");
        const isLight = theme === "light";

        if (icon) {
            icon.className = isLight
                ? "bi bi-moon-stars-fill"
                : "bi bi-sun-fill";
        }

        const label = isLight
            ? "Switch to dark theme"
            : "Switch to light theme";

        themeToggle.setAttribute("aria-label", label);
        themeToggle.setAttribute("title", label);
    }

    function initThemeSwitcher() {

        const i18n = window.finflowI18n;

        if (!i18n || !themeToggle) {
            return;
        }

        updateThemeToggle(i18n.getTheme());

        themeToggle.addEventListener(
            "click",
            () => {
                i18n.toggleTheme();
            }
        );

        window.addEventListener(
            "finflow-theme-changed",
            event => {
                updateThemeToggle(
                    event.detail?.theme || i18n.getTheme()
                );
            }
        );
    }


    /* ========================================================
       USER MENU
       ======================================================== */

    const userMenuButton =
        document.getElementById('ff-user-menu-button');

    const userMenu =
        document.getElementById('ff-user-menu');

    const logoutButton =
        document.getElementById('ff-logout-button');

    const logoutForm =
        document.getElementById('ff-logout-form');


    function closeUserMenu() {

        if (!userMenu || !userMenuButton) {
            return;
        }

        userMenu.hidden = true;

        userMenuButton.setAttribute(
            'aria-expanded',
            'false'
        );
    }


    function openUserMenu() {

        if (!userMenu || !userMenuButton) {
            return;
        }

        userMenu.hidden = false;

        userMenuButton.setAttribute(
            'aria-expanded',
            'true'
        );
    }


    if (userMenuButton && userMenu) {

        userMenuButton.addEventListener(
            'click',
            event => {

                event.stopPropagation();

                if (userMenu.hidden) {
                    openUserMenu();
                } else {
                    closeUserMenu();
                }
            }
        );


        userMenu.addEventListener(
            'click',
            event => {
                event.stopPropagation();
            }
        );


        document.addEventListener(
            'click',
            () => {
                closeUserMenu();
            }
        );


        document.addEventListener(
            'keydown',
            event => {

                if (
                    event.key === 'Escape' &&
                    !userMenu.hidden
                ) {
                    closeUserMenu();
                    userMenuButton.focus();
                }
            }
        );
    }


    if (logoutButton && logoutForm) {

        logoutButton.addEventListener(
            'click',
            () => {

                logoutButton.disabled = true;

                logoutForm.submit();
            }
        );
    }


    /* ========================================================
       INITIAL STATE
       ======================================================== */

    restoreSidebarState();
    initLanguageSwitcher();
    initThemeSwitcher();
    initNotificationBadge();

})();
