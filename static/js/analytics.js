(function () {
    'use strict';

    const DATA_ID = 'finflowAnalyticsInvoiceData';

    function t(value) {
        return window.finflowI18n?.translateSmart(value) || value;
    }

    function getInvoices() {
        const rawData = document.getElementById(DATA_ID);

        if (!rawData) {
            return [];
        }

        try {
            const parsed = JSON.parse(rawData.textContent || '[]');
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            console.error('[FinFlow] Analytics data parse error:', error);
            return [];
        }
    }

    function normalizeCurrency(value) {
        return window.FinFlowMoney
            ? window.FinFlowMoney.normalizeCurrency(value)
            : String(value || 'EUR').trim().toUpperCase();
    }

    function money(value, currency) {
        const code = normalizeCurrency(currency);

        return window.FinFlowMoney
            ? window.FinFlowMoney.formatMoney(value, code)
            : `${code} ${Number(value || 0).toLocaleString(window.finflowI18n?.getLocale?.() || 'uk-UA', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`;
    }

    function number(value) {
        const result = Number(value);
        return Number.isFinite(result) ? result : 0;
    }

    function activeInvoices(invoices) {
        return invoices.filter(function (invoice) {
            return String(invoice.status || '').toUpperCase() !== 'CANCELLED';
        });
    }

    function getFilters() {
        const company = document.getElementById('filterCompany');
        const product = document.getElementById('filterProduct');

        return {
            company: company ? company.value : '',
            product: product ? product.value : ''
        };
    }

    function invoiceCompanyId(invoice) {
        return String(
            invoice.company_id ??
            invoice.companyId ??
            invoice.company?.id ??
            ''
        );
    }

    function invoiceCompanyName(invoice) {
        return (
            invoice.company?.name ||
            invoice.company_name ||
            t('Unknown')
        );
    }

    function invoiceProduct(invoice) {
        return String(
            invoice.software ||
            invoice.product ||
            ''
        ).toUpperCase();
    }

    function invoiceCurrency(invoice) {
        return normalizeCurrency(
            invoice.currency ||
            invoice.currency_code ||
            'EUR'
        );
    }

    function invoiceAmount(invoice) {
        return number(
            invoice.amount_eur ??
            invoice.amount ??
            0
        );
    }

    function invoiceDate(invoice) {
        return String(
            invoice.invoice_date ||
            invoice.date ||
            ''
        ).slice(0, 10);
    }

    function filteredInvoices(invoices) {
        const filters = getFilters();

        return activeInvoices(invoices).filter(function (invoice) {
            if (
                filters.company &&
                invoiceCompanyId(invoice) !== String(filters.company)
            ) {
                return false;
            }

            if (
                filters.product &&
                invoiceProduct(invoice) !== String(filters.product).toUpperCase()
            ) {
                return false;
            }

            return true;
        });
    }

    function groupByCurrency(items) {
        const result = {};

        items.forEach(function (item) {
            const currency = item.currency;

            if (!result[currency]) {
                result[currency] = 0;
            }

            result[currency] += number(item.amount);
        });

        return result;
    }

    function setText(id, value) {
        const element = document.getElementById(id);

        if (element) {
            element.textContent = value;
        }
    }

    function renderKpis(selected) {
        const currencyTotals = groupByCurrency(
            selected.map(function (invoice) {
                return {
                    currency: invoiceCurrency(invoice),
                    amount: invoiceAmount(invoice)
                };
            })
        );

        const currencies = Object.keys(currencyTotals);
        const totalElement = document.getElementById('analyticsTotal');

        if (!currencies.length) {
            setText('analyticsTotal', money(0, 'EUR'));
        } else if (totalElement) {
            totalElement.replaceChildren();

            currencies.forEach(function (currency) {
                const row = document.createElement('div');

                row.className = 'ff-analytics-total-row';
                row.textContent = money(
                    currencyTotals[currency],
                    currency
                );

                totalElement.appendChild(row);
            });
        }

        const companies = new Set(
            selected.map(invoiceCompanyName)
        );

        const products = new Set(
            selected.map(invoiceProduct)
        );

        setText('analyticsCompanyCount', companies.size);
        setText('analyticsProductCount', products.size);
        setText('analyticsInvoiceCount', selected.length);
    }

    function emptyState(icon, text) {
        return `
            <div class="ff-analytics-empty">
                <i class="bi ${icon}"></i>
                <span>${text}</span>
            </div>
        `;
    }

    function escapeHtml(value) {
        return String(value ?? '').replace(
            /[&<>'"]/g,
            function (char) {
                return {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    "'": '&#39;',
                    '"': '&quot;'
                }[char];
            }
        );
    }

    function renderCompanyBars(selected) {
        const target = document.getElementById('companyBars');

        if (!target) {
            return;
        }

        const totals = {};

        selected.forEach(function (invoice) {
            const company = invoiceCompanyName(invoice);
            const currency = invoiceCurrency(invoice);
            const key = `${company}|||${currency}`;

            if (!totals[key]) {
                totals[key] = {
                    company: company,
                    currency: currency,
                    amount: 0
                };
            }

            totals[key].amount += invoiceAmount(invoice);
        });

        const rows = Object.values(totals)
            .sort(function (a, b) {
                return a.currency.localeCompare(b.currency) || b.amount - a.amount;
            });

        if (!rows.length) {
            target.innerHTML = emptyState(
                'bi-bar-chart',
                t('No expense data')
            );
            return;
        }

        const maxByCurrency = {};

        rows.forEach(function (row) {
            maxByCurrency[row.currency] = Math.max(
                maxByCurrency[row.currency] || 0,
                row.amount
            );
        });

        target.innerHTML = rows.map(function (row) {
            const max = maxByCurrency[row.currency] || 0;
            const width = max
                ? Math.min(100, (row.amount / max) * 100)
                : 0;

            const label = `${row.company} · ${money(row.amount, row.currency)}`;

            return `
                <div class="ff-analytics-bar-row">
                    <div class="ff-analytics-bar-header">
                        <span class="ff-analytics-bar-name">
                            <span data-finflow-no-i18n>${escapeHtml(row.company)}</span>
                        </span>

                        <span class="ff-analytics-bar-value">
                            ${money(row.amount, row.currency)}
                        </span>
                    </div>

                    <div
                        class="ff-analytics-bar-track"
                        role="img"
                        aria-label="${escapeHtml(label)}"
                        title="${escapeHtml(label)}">
                        <div
                            class="ff-analytics-bar-fill ff-analytics-bar-fill-company"
                            style="width:${width.toFixed(2)}%"
                            aria-hidden="true">
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    function renderProductBars(selected) {
        const target = document.getElementById('productBars');

        if (!target) {
            return;
        }

        const totals = {};

        selected.forEach(function (invoice) {
            const product = invoiceProduct(invoice);
            const currency = invoiceCurrency(invoice);
            const key = `${product}|||${currency}`;

            if (!totals[key]) {
                totals[key] = {
                    product: product,
                    currency: currency,
                    amount: 0
                };
            }

            totals[key].amount += invoiceAmount(invoice);
        });

        const rows = Object.values(totals)
            .sort(function (a, b) {
                return a.currency.localeCompare(b.currency) || b.amount - a.amount;
            });

        if (!rows.length) {
            target.innerHTML = emptyState(
                'bi-pie-chart',
                t('No product data')
            );
            return;
        }

        const maxByCurrency = {};

        rows.forEach(function (row) {
            maxByCurrency[row.currency] = Math.max(
                maxByCurrency[row.currency] || 0,
                row.amount
            );
        });

        target.innerHTML = rows.map(function (row) {
            const max = maxByCurrency[row.currency] || 0;
            const width = max
                ? Math.min(100, (row.amount / max) * 100)
                : 0;

            const fillClass = row.product
                ? 'ff-analytics-bar-fill-product'
                : 'ff-analytics-bar-fill-company';
            const label = `${row.product || t('Unknown')} · ${money(row.amount, row.currency)}`;

            return `
                <div class="ff-analytics-bar-row">
                    <div class="ff-analytics-bar-header">
                        <span class="ff-analytics-bar-name">
                            <span data-finflow-no-i18n>${escapeHtml(row.product)}</span>
                        </span>

                        <span class="ff-analytics-bar-value">
                            ${money(row.amount, row.currency)}
                        </span>
                    </div>

                    <div
                        class="ff-analytics-bar-track"
                        role="img"
                        aria-label="${escapeHtml(label)}"
                        title="${escapeHtml(label)}">
                        <div
                            class="ff-analytics-bar-fill ${fillClass}"
                            style="width:${width.toFixed(2)}%"
                            aria-hidden="true">
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    function monthLabel(month) {
        const date = new Date(`${month}-01T00:00:00`);

        if (Number.isNaN(date.getTime())) {
            return month;
        }

        return date.toLocaleDateString(window.finflowI18n?.getLocale?.() || 'uk-UA', {
            month: 'short',
            year: 'numeric'
        }).replace('.', '');
    }

    function compactAmount(value, currency) {
        const locale = window.finflowI18n?.getLocale?.() || 'uk-UA';

        try {
            return new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: normalizeCurrency(currency),
                notation: 'compact',
                maximumFractionDigits: 1
            }).format(value);
        } catch (error) {
            return `${normalizeCurrency(currency)} ${Number(value || 0).toLocaleString(locale, {
                notation: 'compact',
                maximumFractionDigits: 1
            })}`;
        }
    }

    function renderCurrencyTrend(target, currency, monthlyRows) {
        const monthValues = new Map(monthlyRows.map(function (row) {
            return [row.month, row.amount];
        }));
        const months = [...monthValues.keys()].sort();

        if (!months.length) {
            return '';
        }

        const values = months.map(month => number(monthValues.get(month)));
        const max = Math.max(...values, 0);
        const chartWidth = 720;
        const chartHeight = 252;
        const left = 66;
        const right = 704;
        const top = 20;
        const bottom = 196;
        const plotWidth = right - left;
        const plotHeight = bottom - top;
        const denominator = Math.max(max, 1);
        const points = values.map(function (value, index) {
            const x = months.length === 1
                ? left + plotWidth / 2
                : left + (index / (months.length - 1)) * plotWidth;
            const y = bottom - (value / denominator) * plotHeight;
            return { x, y, value, month: months[index] };
        });
        const line = points.map(point => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(' ');
        const area = `${left},${bottom} ${line} ${right},${bottom}`;
        const grid = [0, 1, 2, 3].map(function (step) {
            const y = top + (plotHeight / 3) * step;
            const value = max * (1 - step / 3);
            return `
                <g class="ff-analytics-trend-gridline">
                    <line x1="${left}" y1="${y.toFixed(1)}" x2="${right}" y2="${y.toFixed(1)}"></line>
                    <text x="${left - 9}" y="${(y + 3).toFixed(1)}" text-anchor="end">${escapeHtml(compactAmount(value, currency))}</text>
                </g>
            `;
        }).join('');
        const labelIndexes = new Set();
        const labelCount = Math.min(months.length, 6);

        for (let index = 0; index < labelCount; index += 1) {
            labelIndexes.add(labelCount === 1
                ? Math.floor((months.length - 1) / 2)
                : Math.round(index * (months.length - 1) / (labelCount - 1)));
        }

        const axisLabels = [...labelIndexes].map(function (index) {
            const point = points[index];
            return `<text class="ff-analytics-trend-month" x="${point.x.toFixed(1)}" y="${bottom + 25}" text-anchor="middle">${escapeHtml(monthLabel(point.month))}</text>`;
        }).join('');
        const pointMarkup = points.map(function (point) {
            const label = `${monthLabel(point.month)} · ${money(point.value, currency)}`;
            return `
                <circle
                    class="ff-analytics-trend-point"
                    cx="${point.x.toFixed(1)}"
                    cy="${point.y.toFixed(1)}"
                    r="4"
                    tabindex="0"
                    aria-label="${escapeHtml(label)}"></circle>
            `;
        }).join('');
        const heading = `${t('Monthly expenses')} · ${currency}`;

        target.insertAdjacentHTML('beforeend', `
            <section class="ff-analytics-trend-series" aria-label="${escapeHtml(heading)}">
                <div class="ff-analytics-trend-series-head">
                    <span class="ff-analytics-trend-legend-mark" aria-hidden="true"></span>
                    <strong>${escapeHtml(currency)}</strong>
                    <span>${escapeHtml(t('By month'))}</span>
                </div>
                <div class="ff-analytics-trend-plot">
                    <svg viewBox="0 0 ${chartWidth} ${chartHeight}" role="img" aria-label="${escapeHtml(heading)}" preserveAspectRatio="xMidYMid meet">
                        ${grid}
                        <polygon class="ff-analytics-trend-area" points="${area}"></polygon>
                        <polyline class="ff-analytics-trend-line" points="${line}"></polyline>
                        ${pointMarkup}
                        ${axisLabels}
                    </svg>
                    <div class="ff-analytics-chart-tooltip" role="status" aria-live="polite" hidden></div>
                </div>
            </section>
        `);

        const series = target.lastElementChild;
        const plot = series.querySelector('.ff-analytics-trend-plot');
        const tooltip = series.querySelector('.ff-analytics-chart-tooltip');

        series.querySelectorAll('.ff-analytics-trend-point').forEach(function (point) {
            function showTooltip() {
                const pointBounds = point.getBoundingClientRect();
                const plotBounds = plot.getBoundingClientRect();

                tooltip.textContent = point.getAttribute('aria-label');
                tooltip.hidden = false;

                const halfTooltipWidth = tooltip.offsetWidth / 2;
                const visibleLeft = plot.scrollLeft + halfTooltipWidth + 8;
                const visibleRight = plot.scrollLeft + plot.clientWidth - halfTooltipWidth - 8;
                const pointX = pointBounds.left - plotBounds.left + plot.scrollLeft + pointBounds.width / 2;
                const tooltipX = visibleRight >= visibleLeft
                    ? Math.min(Math.max(pointX, visibleLeft), visibleRight)
                    : plot.scrollLeft + plot.clientWidth / 2;
                const pointY = pointBounds.top - plotBounds.top + plot.scrollTop;
                const showBelow = pointY < 54;

                tooltip.classList.toggle('is-below', showBelow);
                tooltip.style.left = `${tooltipX}px`;
                tooltip.style.top = `${pointY + (showBelow ? 12 : -7)}px`;
            }

            function hideTooltip() {
                tooltip.hidden = true;
            }

            point.addEventListener('mouseenter', showTooltip);
            point.addEventListener('focus', showTooltip);
            point.addEventListener('mouseleave', hideTooltip);
            point.addEventListener('blur', hideTooltip);
        });
    }

    function renderMonthly(selected) {
        const target = document.getElementById('monthlyChart');

        if (!target) {
            return;
        }

        const totals = {};

        selected.forEach(function (invoice) {
            const date = invoiceDate(invoice);

            if (!date || date.length < 7) {
                return;
            }

            const month = date.slice(0, 7);
            const currency = invoiceCurrency(invoice);
            const key = `${month}|||${currency}`;

            if (!totals[key]) {
                totals[key] = {
                    month: month,
                    currency: currency,
                    amount: 0
                };
            }

            totals[key].amount += invoiceAmount(invoice);
        });

        const rows = Object.values(totals)
            .sort(function (a, b) {
                if (a.month === b.month) {
                    return a.currency.localeCompare(b.currency);
                }

                return a.month.localeCompare(b.month);
            });

        if (!rows.length) {
            target.innerHTML = emptyState(
                'bi-graph-up',
                t('No monthly data')
            );
            return;
        }

        const currencies = [...new Set(rows.map(row => row.currency))];
        target.classList.toggle('ff-analytics-monthly-multi', currencies.length > 1);
        target.innerHTML = '';

        currencies.forEach(function (currency) {
            renderCurrencyTrend(
                target,
                currency,
                rows.filter(row => row.currency === currency)
            );
        });
    }

    function renderAnalytics(invoices) {
        const selected = filteredInvoices(invoices);

        renderKpis(selected);
        renderCompanyBars(selected);
        renderProductBars(selected);
        renderMonthly(selected);
    }

    function bindFilters(invoices) {
        const apply = document.getElementById('applyFilters');
        const reset = document.getElementById('resetFilters');

        if (apply) {
            apply.addEventListener('click', function () {
                renderAnalytics(invoices);
            });
        }

        if (reset) {
            reset.addEventListener('click', function () {
                const company =
                    document.getElementById('filterCompany');

                const product =
                    document.getElementById('filterProduct');

                if (company) {
                    company.value = '';
                }

                if (product) {
                    product.value = '';
                }

                renderAnalytics(invoices);
            });
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        const invoices = getInvoices();

        bindFilters(invoices);
        renderAnalytics(invoices);

        window.addEventListener('finflow-language-changed', function () {
            renderAnalytics(invoices);
        });

        console.log(
            '[FinFlow] Analytics initialized:',
            invoices.length,
            'invoices'
        );
    });

})();
