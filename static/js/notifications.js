(function () {
    'use strict';

    const state = {
        notifications: [],
        unreadCount: null,
        filter: 'all',
        loading: false,
        revision: 0
    };


    // =========================================================
    // HELPERS
    // =========================================================

    function escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }


    function t(value) {
        return window.finflowI18n?.translateSmart?.(value) || value;
    }


    function getCsrfToken() {
        return document.querySelector(
            '#ff-logout-form input[name="csrf_token"]'
        )?.value || '';
    }


    function setUnreadCount(value) {
        if (Number.isInteger(value) && value >= 0) {
            state.unreadCount = value;
            window.setNotificationBadgeCount?.(value);
        }
    }


    function showReadError(markAll = false) {
        const isEnglish =
            window.finflowI18n?.getLang?.() === 'en';

        const message = markAll
            ? isEnglish
                ? 'Could not mark notifications as read. Please try again.'
                : 'Не вдалося позначити сповіщення прочитаними. Спробуйте ще раз.'
            : isEnglish
                ? 'Could not mark this notification as read. Please try again.'
                : 'Не вдалося позначити сповіщення прочитаним. Спробуйте ще раз.';

        window.alert(message);
    }


    function formatDate(value) {
        if (!value) {
            return '—';
        }

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return '—';
        }

        return new Intl.DateTimeFormat(
            document.documentElement.lang === 'en'
                ? 'en-GB'
                : 'uk-UA',
            {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }
        ).format(date);
    }


    function notificationIcon(item) {
        switch (item.type) {
            case 'OVERDUE_INVOICE':
                return 'bi-receipt-cutoff';

            case 'BUDGET_EXCEEDED':
                return 'bi-graph-down-arrow';

            case 'BUDGET_CRITICAL':
                return 'bi-exclamation-octagon';

            case 'BUDGET_WARNING':
                return 'bi-exclamation-triangle';

            case 'CONTRACT_EXPIRING':
                return 'bi-calendar-x';

            default:
                return 'bi-bell';
        }
    }


    function notificationTypeLabel(type) {
        switch (type) {
            case 'OVERDUE_INVOICE':
                return t('Просроченный счёт');

            case 'BUDGET_EXCEEDED':
                return t('Превышение бюджета');

            case 'BUDGET_CRITICAL':
                return t('Критическое состояние бюджета');

            case 'BUDGET_WARNING':
                return t('Предупреждение по бюджету');

            case 'CONTRACT_EXPIRING':
                return t('Завершение договора');

            default:
                return t('Системное уведомление');
        }
    }


    function levelLabel(level) {
        switch (level) {
            case 'critical':
                return t('Критично');

            case 'warning':
                return t('Внимание');

            case 'info':
                return t('Информация');

            default:
                return t(level || 'Информация');
        }
    }


    function visibleNotifications() {
        switch (state.filter) {
            case 'unread':
                return state.notifications.filter(
                    item => !item.is_read
                );

            case 'critical':
                return state.notifications.filter(
                    item => item.level === 'critical'
                );

            case 'warning':
                return state.notifications.filter(
                    item => item.level === 'warning'
                );

            default:
                return state.notifications;
        }
    }


    function updateBadge() {
        const badge =
            document.getElementById('ff-notification-badge');

        if (!badge) {
            return;
        }

        const unread = Number.isInteger(state.unreadCount)
            ? state.unreadCount
            : state.notifications.filter(
                item => !item.is_read
            ).length;

        badge.textContent =
            unread > 99
                ? '99+'
                : String(unread);

        badge.classList.toggle(
            'hidden',
            unread === 0
        );
    }


    function updateSummary() {
        const all = state.notifications.length;

        const unread = state.notifications.filter(
            item => !item.is_read
        ).length;

        const critical = state.notifications.filter(
            item => item.level === 'critical'
        ).length;

        const warning = state.notifications.filter(
            item => item.level === 'warning'
        ).length;

        const values = {
            'notification-total': all,
            'notification-count-all': all,
            'notification-count-unread': unread,
            'notification-count-critical': critical,
            'notification-count-warning': warning
        };

        Object.keys(values).forEach(function (id) {
            const element = document.getElementById(id);

            if (element) {
                element.textContent = values[id];
            }
        });
    }


    function updateFilterLabel() {
        const label =
            document.getElementById(
                'notification-filter-label'
            );

        if (!label) {
            return;
        }

        const labels = {
            all: t('Все уведомления'),
            unread: t('Непрочитанные'),
            critical: t('Критические'),
            warning: t('Предупреждения')
        };

        label.textContent =
            labels[state.filter] || labels.all;
    }


    // =========================================================
    // RENDER
    // =========================================================

    function render() {
        updateSummary();
        updateBadge();
        updateFilterLabel();

        const list =
            document.getElementById('notification-list');

        if (!list) {
            return;
        }

        const items = visibleNotifications();

        if (!items.length) {
            list.innerHTML = `
                <div class="ff-notification-empty">
                    <span class="ff-notification-empty-icon">
                        <i class="bi bi-check2-circle"></i>
                    </span>

                    <div>
                        <strong>
                            ${state.filter === 'unread'
                                ? t('Непрочитанных уведомлений нет')
                                : t('Уведомлений нет')}
                        </strong>

                        <span>
                            ${t('Все контрольные события в выбранной категории отсутствуют.')}
                        </span>
                    </div>
                </div>
            `;

            return;
        }

        list.innerHTML = items.map(renderNotification).join('');
    }


    function renderNotification(item) {
        const unreadClass =
            item.is_read
                ? ''
                : ' is-unread';

        const levelClass =
            ` is-${escapeHtml(item.level || 'info')}`;

        const expandedClass =
            item.expanded
                ? ' is-expanded'
                : '';

        const companyMeta =
            item.title
                ? escapeHtml(item.title)
                : 'ElixOR Connect';

        const contextParts = [];

        if (item.software) {
            contextParts.push(
                `<span data-finflow-no-i18n>${escapeHtml(item.software)}</span>`
            );
        }

        if (item.invoice_id) {
            contextParts.push(
                `${escapeHtml(t('Счёт'))} <span data-finflow-no-i18n>#${escapeHtml(item.invoice_id)}</span>`
            );
        }

        const context =
            contextParts.length
                ? contextParts.join(' · ')
                : t('Системное событие');

        const knownSystemType = [
            'OVERDUE_INVOICE',
            'BUDGET_EXCEEDED',
            'BUDGET_CRITICAL',
            'BUDGET_WARNING',
            'CONTRACT_EXPIRING'
        ].includes(item.type);
        const message = knownSystemType
            ? t(item.message || '')
            : item.message || '';
        const messageProtection = knownSystemType
            ? ''
            : ' data-finflow-no-i18n';

        return `
            <article
                class="ff-notification-item${unreadClass}${levelClass}${expandedClass}"
                data-notification-id="${escapeHtml(item.id)}"
                tabindex="0"
                role="button"
                aria-expanded="${item.expanded ? 'true' : 'false'}">

                <div class="ff-notification-item-icon">
                    <i class="bi ${notificationIcon(item)}"></i>
                </div>

                <div class="ff-notification-item-main">

                    <div class="ff-notification-item-top">

                        <div class="ff-notification-item-heading">

                            <span class="ff-notification-level">
                                ${escapeHtml(levelLabel(item.level))}
                            </span>

                            <h3 data-finflow-no-i18n>
                                ${companyMeta}
                            </h3>

                        </div>

                        <time>
                            ${escapeHtml(formatDate(item.created_at))}
                        </time>

                    </div>

                    <div class="ff-notification-item-type">
                        ${escapeHtml(
                            notificationTypeLabel(item.type)
                        )}
                        <span>·</span>
                        ${context}
                    </div>

                    <p class="ff-notification-item-message"${messageProtection}>
                        ${escapeHtml(message)}
                    </p>

                    <div class="ff-notification-item-details">

                        <div class="ff-notification-detail-row">
                            <span>${escapeHtml(t('Событие'))}</span>
                            <strong>
                                ${escapeHtml(
                                    notificationTypeLabel(item.type)
                                )}
                            </strong>
                        </div>

                        ${
                            item.software
                                ? `
                                    <div class="ff-notification-detail-row">
                                        <span>${escapeHtml(t('Продукт'))}</span>
                                        <strong>
                                            <span data-finflow-no-i18n>${escapeHtml(item.software)}</span>
                                        </strong>
                                    </div>
                                `
                                : ''
                        }

                        ${
                            item.invoice_id
                                ? `
                                    <div class="ff-notification-detail-row">
                                        <span>${escapeHtml(t('Счёт'))}</span>
                                        <strong>
                                            #${escapeHtml(item.invoice_id)}
                                        </strong>
                                    </div>
                                `
                                : ''
                        }

                        <div class="ff-notification-detail-row">
                            <span>${escapeHtml(t('Создано'))}</span>
                            <strong>
                                ${escapeHtml(formatDate(item.created_at))}
                            </strong>
                        </div>

                        <div class="ff-notification-detail-message">
                            <span${messageProtection}>${escapeHtml(message)}</span>
                        </div>

                    </div>

                    <div class="ff-notification-item-footer">

                        <span class="ff-notification-status">
                            <i class="bi ${
                                item.is_read
                                    ? 'bi-check2'
                                    : 'bi-dot'
                            }"></i>

                            ${
                                item.is_read
                                    ? t('Прочитано')
                                    : t('Новое уведомление')
                            }
                        </span>

                        <div class="ff-notification-item-actions">

                            ${
                                item.is_read
                                    ? ''
                                    : `
                                        <button
                                            type="button"
                                            class="ff-notification-read"
                                            data-read-id="${escapeHtml(item.id)}">

                                            <i class="bi bi-check2"></i>
                                            ${escapeHtml(t('Прочитать'))}
                                        </button>
                                    `
                            }

                            <button
                                type="button"
                                class="ff-notification-delete"
                                data-delete-id="${escapeHtml(item.id)}"
                                aria-label="${escapeHtml(t('Удалить уведомление'))}"
                                title="${escapeHtml(t('Удалить уведомление'))}">

                                <i class="bi bi-trash3"></i>
                                ${escapeHtml(t('Удалить'))}
                            </button>

                        </div>

                    </div>

                </div>

            </article>
        `;
    }

    // =========================================================
    // API
    // =========================================================

    async function loadNotifications() {
        if (state.loading) {
            return;
        }

        state.loading = true;
        const requestRevision = state.revision;

        try {
            const response = await fetch(
                '/api/notifications',
                {
                    headers: {
                        'Accept': 'application/json'
                    },
                    credentials: 'same-origin'
                }
            );

            if (!response.ok) {
                throw new Error(
                    `HTTP ${response.status}`
                );
            }

            const data = await response.json();

            if (
                !data ||
                !Array.isArray(data.notifications)
            ) {
                throw new Error(
                    'Invalid notification response'
                );
            }

            if (requestRevision !== state.revision) {
                return;
            }

            state.notifications =
                data.notifications;
            state.unreadCount = null;
            setUnreadCount(data.unread_count);

            render();

        } catch (error) {
            console.debug(
                '[FinFlow] Notification load failed',
                error
            );

            const list =
                document.getElementById(
                    'notification-list'
                );

            if (list) {
                list.innerHTML = `
                    <div class="ff-notification-error">
                        <span class="ff-notification-state-icon">
                            <i class="bi bi-wifi-off"></i>
                        </span>

                        <div>
                            <strong>
                                Не удалось загрузить уведомления
                            </strong>

                            <span>
                                Проверьте соединение с сервером и обновите страницу.
                            </span>
                        </div>
                    </div>
                `;
            }

        } finally {
            state.loading = false;
        }
    }


    async function markAsRead(notificationId) {
        try {
            const csrfToken = getCsrfToken();

            if (!csrfToken) {
                throw new Error('CSRF token is unavailable');
            }

            const response = await fetch(
                `/api/notifications/${encodeURIComponent(notificationId)}/read`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'X-CSRF-Token': csrfToken
                    },
                    credentials: 'same-origin'
                }
            );

            if (!response.ok) {
                throw new Error(
                    `HTTP ${response.status}`
                );
            }

            const data = await response.json();

            if (data.status !== 'ok') {
                throw new Error(
                    data.message || 'Unable to mark notification'
                );
            }

            state.revision += 1;

            const item =
                state.notifications.find(
                    notification =>
                        String(notification.id) ===
                        String(notificationId)
                );

            if (item) {
                item.is_read =
                    data.notification?.is_read ?? true;
                item.read_at =
                    data.notification?.read_at ||
                    new Date().toISOString();
            }

            setUnreadCount(data.unread_count);
            render();

        } catch (error) {
            console.debug(
                '[FinFlow] Mark notification as read failed',
                error
            );
            render();
            showReadError();
        }
    }


    async function markAllAsRead() {
        const unread =
            state.notifications.filter(
                item => !item.is_read
            );

        if (!unread.length) {
            return;
        }

        try {
            const csrfToken = getCsrfToken();

            if (!csrfToken) {
                throw new Error('CSRF token is unavailable');
            }

            const response = await fetch(
                '/api/notifications/read-all',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'X-CSRF-Token': csrfToken
                    },
                    credentials: 'same-origin'
                }
            );

            if (!response.ok) {
                throw new Error(
                    `HTTP ${response.status}`
                );
            }

            const data = await response.json();

            if (data.status !== 'ok') {
                throw new Error(
                    data.message || 'Unable to mark notifications'
                );
            }

            state.revision += 1;

            state.notifications.forEach(function (item) {
                item.is_read = true;

                if (!item.read_at) {
                    item.read_at =
                        new Date().toISOString();
                }
            });

            setUnreadCount(data.unread_count);
            render();

        } catch (error) {
            console.debug(
                '[FinFlow] Mark all notifications failed',
                error
            );
            showReadError(true);
        }
    }


    // =========================================================
    // FILTERS / EVENTS
    // =========================================================

    function setFilter(filter) {
        state.filter = filter || 'all';

        document
            .querySelectorAll(
                '[data-notification-filter]'
            )
            .forEach(function (button) {
                button.classList.toggle(
                    'is-active',
                    button.dataset.notificationFilter ===
                        state.filter
                );
            });

        render();
    }


    function bindEvents() {
        document
            .querySelectorAll(
                '[data-notification-filter]'
            )
            .forEach(function (button) {
                button.addEventListener(
                    'click',
                    function () {
                        setFilter(
                            button.dataset.notificationFilter
                        );
                    }
                );
            });


        const readAll =
            document.getElementById(
                'notification-read-all'
            );

        if (readAll) {
            readAll.addEventListener(
                'click',
                markAllAsRead
            );
        }


        document.addEventListener(
            'click',
            function (event) {
                const deleteButton =
                    event.target.closest(
                        '[data-delete-id]'
                    );

                if (deleteButton) {
                    event.stopPropagation();

                    deleteNotification(
                        deleteButton.dataset.deleteId
                    );

                    return;
                }

                const readButton =
                    event.target.closest(
                        '[data-read-id]'
                    );

                if (readButton) {
                    event.stopPropagation();

                    markAsRead(
                        readButton.dataset.readId
                    );

                    return;
                }

                const itemElement =
                    event.target.closest(
                        '.ff-notification-item'
                    );

                if (!itemElement) {
                    return;
                }

                toggleNotification(
                    itemElement.dataset.notificationId
                );
            }
        );


        document.addEventListener(
            'keydown',
            function (event) {
                if (
                    event.key !== 'Enter' &&
                    event.key !== ' '
                ) {
                    return;
                }

                const itemElement =
                    event.target.closest(
                        '.ff-notification-item'
                    );

                if (!itemElement) {
                    return;
                }

                event.preventDefault();

                toggleNotification(
                    itemElement.dataset.notificationId
                );
            }
        );
    }


    async function deleteNotification(notificationId) {
        const item = state.notifications.find(
            notification =>
                String(notification.id) ===
                String(notificationId)
        );

        if (!item) {
            return;
        }

        const confirmed = window.confirm(
            'Удалить это уведомление?'
        );

        if (!confirmed) {
            return;
        }

        try {
            const csrfToken = getCsrfToken();

            if (!csrfToken) {
                throw new Error('CSRF token is unavailable');
            }

            const response = await fetch(
                `/api/notifications/${encodeURIComponent(notificationId)}`,
                {
                    method: 'DELETE',
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
                        'X-CSRF-Token': csrfToken
                    }
                }
            );

            const data = await response.json();

            if (!response.ok || data.status !== 'ok') {
                throw new Error(
                    data.message ||
                    'Не удалось удалить уведомление'
                );
            }

            state.revision += 1;

            state.notifications =
                state.notifications.filter(
                    notification =>
                        String(notification.id) !==
                        String(notificationId)
                );

            setUnreadCount(data.unread_count);
            render();

        } catch (error) {
            console.debug(
                '[FinFlow] Delete notification failed',
                error
            );

            window.alert(
                'Не удалось удалить уведомление.'
            );
        }
    }


    function toggleNotification(notificationId) {
        const item = state.notifications.find(
            notification =>
                String(notification.id) ===
                String(notificationId)
        );

        if (!item) {
            return;
        }

        item.expanded = !item.expanded;

        if (
            item.expanded &&
            !item.is_read
        ) {
            markAsRead(notificationId);
            return;
        }

        render();
    }


    // Keep compatibility with finflow-i18n.js.
    window.renderNotificationCenter =
        function () {
            render();
        };


    // =========================================================
    // INIT
    // =========================================================

    document.addEventListener(
        'DOMContentLoaded',
        function () {
            bindEvents();
            loadNotifications();

            window.setInterval(
                loadNotifications,
                30000
            );
        }
    );

})();
