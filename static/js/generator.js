(() => {
    "use strict";

    const page = document.getElementById("generatorPage");

    if (!page) {
        return;
    }

    function t(value) {
        return window.finflowI18n?.translateSmart(value) || value;
    }

    const invoices = Array.isArray(window.finflowGeneratorInvoices)
        ? window.finflowGeneratorInvoices
        : [];

    const archiveList = document.getElementById("generatorArchiveList");
    const archiveEmpty = document.getElementById("generatorArchiveEmpty");
    const archiveCount = document.getElementById("generatorArchiveCount");
    const searchInput = document.getElementById("generatorArchiveSearch");
    const preview = document.getElementById("generatorInvoicePaper");
    const previewLabel = document.getElementById("generatorPreviewLabel");
    const previewStatus = document.getElementById("generatorPreviewStatus");
    const printButton = document.getElementById("generatorPrintButton");
    const pdfButton = document.getElementById("generatorPdfButton");

    const initialInvoiceId = Number(
        page.dataset.initialInvoiceId || 0
    );

    let selectedInvoiceId = null;
    let activeFilter = "ALL";

    function escapeHtml(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function parseContractDetails(raw) {
        if (!raw) {
            return {};
        }

        if (typeof raw === "object") {
            return raw;
        }

        try {
            return JSON.parse(raw);
        } catch (error) {
            return {};
        }
    }

    function normalizeItems(contract) {
        const rawItems = Array.isArray(contract?.items)
            ? contract.items
            : [];

        return rawItems
            .map((item) => {
                if (typeof item === "string") {
                    return {
                        description: item.trim(),
                        quantity: 1,
                        rate: null,
                    };
                }

                return {
                    description: String(
                        item?.description || ""
                    ).trim(),

                    quantity: Number(item?.quantity || 1),

                    rate:
                        item?.rate === null ||
                        item?.rate === undefined ||
                        item?.rate === ""
                            ? null
                            : Number(item.rate),
                };
            })
            .filter((item) => item.description);
    }

    function formatMoney(value, currency) {
        return window.FinFlowMoney
            ? window.FinFlowMoney.formatMoney(value, currency)
            : `${String(currency || "EUR").toUpperCase()} ${Number(value || 0).toLocaleString(window.finflowI18n?.getLocale?.() || "uk-UA", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}`;
    }

    function formatDate(value) {
        if (!value) {
            return "—";
        }

        const parts = String(value).split("-");

        if (parts.length !== 3) {
            return escapeHtml(value);
        }

        const date = new Date(`${parts[0]}-${parts[1]}-${parts[2]}T00:00:00`);
        if (Number.isNaN(date.getTime())) {
            return escapeHtml(value);
        }

        return new Intl.DateTimeFormat(
            window.finflowI18n?.getLocale?.() || "uk-UA",
            { day: "2-digit", month: "2-digit", year: "numeric" }
        ).format(date);
    }

    function statusLabel(status) {
        const normalized = String(status || "ISSUED").toUpperCase();

        if (normalized === "CANCELLED") {
            return t("Отменён");
        }

        return t("Выдан");
    }

    function paymentLabel(status) {
        const normalized = String(status || "UNPAID").toUpperCase();

        const labels = {
            PAID: t("Оплачен"),
            PARTIAL: t("Частично оплачен"),
            UNPAID: t("Не оплачен"),
        };

        return labels[normalized] || normalized;
    }

    function getFilteredInvoices() {
        const query = String(searchInput?.value || "")
            .trim()
            .toLowerCase();

        return invoices.filter((invoice) => {
            const software = String(
                invoice.software || ""
            ).toUpperCase();

            if (
                activeFilter !== "ALL" &&
                software !== activeFilter
            ) {
                return false;
            }

            if (!query) {
                return true;
            }

            const haystack = [
                invoice.invoice_number,
                invoice.company_name,
                invoice.software,
                invoice.currency,
                invoice.status,
                invoice.payment_status,
            ]
                .map((value) => String(value || "").toLowerCase())
                .join(" ");

            return haystack.includes(query);
        });
    }

    function renderArchive() {
        if (!archiveList) {
            return;
        }

        const filtered = getFilteredInvoices();

        archiveList.innerHTML = "";

        if (archiveCount) {
            archiveCount.textContent = String(filtered.length);
        }

        if (!filtered.length) {
            archiveEmpty.hidden = false;
            return;
        }

        archiveEmpty.hidden = true;

        filtered.forEach((invoice) => {
            const cancelled =
                String(invoice.status || "").toUpperCase() === "CANCELLED";

            const item = document.createElement("button");

            item.type = "button";
            item.className = "ff-generator-archive-item";
            item.dataset.invoiceId = String(invoice.id);

            if (Number(invoice.id) === Number(selectedInvoiceId)) {
                item.classList.add("is-active");
            }

            item.innerHTML = `
                <span class="ff-generator-archive-icon">
                    <i class="bi bi-file-earmark-text"></i>
                </span>

                <span class="ff-generator-archive-main">
                    <strong data-finflow-no-i18n>
                        ${escapeHtml(
                            invoice.invoice_number || `#${invoice.id}`
                        )}
                    </strong>

                    <span data-finflow-no-i18n>
                        ${escapeHtml(invoice.company_name || "—")}
                    </span>

                    <small>
                        <span data-finflow-no-i18n>${escapeHtml(invoice.software || "—")}</span>
                        ·
                        <span data-finflow-no-i18n>${escapeHtml(invoice.currency || "—")}</span>
                        ·
                        <span data-finflow-no-i18n>${formatMoney(
                            invoice.amount,
                            invoice.currency
                        )}</span>
                    </small>
                </span>

                <span class="ff-generator-archive-meta">
                    <span class="ff-generator-status ${
                        cancelled
                            ? "is-cancelled"
                            : "is-issued"
                    }">
                        ${escapeHtml(statusLabel(invoice.status))}
                    </span>

                    <time>
                        ${formatDate(invoice.invoice_date)}
                    </time>
                </span>
            `;

            item.addEventListener("click", () => {
                selectInvoice(invoice.id);
            });

            archiveList.appendChild(item);
        });
    }

    function updateArchiveSelection() {
        document
            .querySelectorAll(".ff-generator-archive-item")
            .forEach((item) => {
                item.classList.toggle(
                    "is-active",
                    Number(item.dataset.invoiceId) ===
                        Number(selectedInvoiceId)
                );
            });
    }

    function renderEmptyPreview() {
        preview.innerHTML = `
            <div class="ff-paper-placeholder">
                <div class="ff-paper-placeholder-icon">
                    <i class="bi bi-file-earmark-pdf"></i>
                </div>

                <h2>${escapeHtml(t("Выберите счет"))}</h2>

                <p>
                    ${escapeHtml(t("Выберите документ из архива, чтобы открыть его предпросмотр."))}
                </p>
            </div>
        `;

        if (previewLabel) {
            previewLabel.textContent = t("Выберите счет");
        }

        if (previewStatus) {
            previewStatus.className =
                "ff-generator-preview-status";

            previewStatus.innerHTML = `
                <i class="bi bi-circle"></i>
                ${escapeHtml(t("Нет выбранного счета"))}
            `;
        }

        if (pdfButton) {
            pdfButton.disabled = true;
        }

        if (printButton) {
            printButton.disabled = true;
        }
    }

    const ourCompany = window.finflowOurCompany || {};

    function renderOurCompanyRequisites() {
        const details = Array.isArray(ourCompany.details)
            ? ourCompany.details
            : [];

        const requisites = details[0] || {};

        const lines = [];

        if (requisites.legal_address) {
            lines.push(`${escapeHtml(t("Юридический адрес:"))} <span data-finflow-no-i18n>${escapeHtml(requisites.legal_address)}</span>`);
        }

        if (requisites.registration_number) {
            lines.push(`${escapeHtml(t("Рег. номер:"))} <span data-finflow-no-i18n>${escapeHtml(requisites.registration_number)}</span>`);
        }

        if (requisites.tax_number) {
            lines.push(`${escapeHtml(t("ИНН:"))} <span data-finflow-no-i18n>${escapeHtml(requisites.tax_number)}</span>`);
        }

        if (requisites.vat_number) {
            lines.push(`VAT: <span data-finflow-no-i18n>${escapeHtml(requisites.vat_number)}</span>`);
        }

        if (requisites.bank_name) {
            lines.push(`${escapeHtml(t("Банк:"))} <span data-finflow-no-i18n>${escapeHtml(requisites.bank_name)}</span>`);
        }

        if (requisites.iban) {
            lines.push(`IBAN: <span data-finflow-no-i18n>${escapeHtml(requisites.iban)}</span>`);
        }

        if (requisites.swift) {
            lines.push(`SWIFT: <span data-finflow-no-i18n>${escapeHtml(requisites.swift)}</span>`);
        }

        return lines.length
            ? lines.join("<br>")
            : t("Реквизиты пока не заполнены");
    }

    function renderOurCompanyHeader(invoiceNumber) {
        const logo = ourCompany.logo_url
            ? `
                <img
                    src="${escapeHtml(ourCompany.logo_url)}"
                    alt="${escapeHtml(ourCompany.name || "Логотип")}"
                >
            `
            : `
                <span class="ff-paper-org-logo-placeholder">
                    <i class="bi bi-building"></i>
                </span>
            `;

        return `
            <header class="ff-paper-header ff-paper-org-header">

                <div class="ff-paper-org">

                    <div class="ff-paper-org-logo">
                        ${logo}
                    </div>

                    <div class="ff-paper-org-info">
                        <strong data-finflow-no-i18n>
                            ${escapeHtml(
                            ourCompany.name || t("Организация не указана")
                            )}
                        </strong>

                        <div class="ff-paper-org-requisites">
                            ${renderOurCompanyRequisites()}
                        </div>

                        ${
                            ourCompany.phone || ourCompany.email
                                ? `
                                    <div class="ff-paper-org-contact">
                                        ${
                                            ourCompany.phone
                                                ? escapeHtml(ourCompany.phone)
                                                : ""
                                        }

                                        ${
                                            ourCompany.phone &&
                                            ourCompany.email
                                                ? " · "
                                                : ""
                                        }

                                        ${
                                            ourCompany.email
                                                ? escapeHtml(ourCompany.email)
                                                : ""
                                        }
                                    </div>
                                `
                                : ""
                        }
                    </div>

                </div>

                <div class="ff-paper-title">
                    <span>${escapeHtml(t("Invoice"))}</span>

                    <strong data-finflow-no-i18n>
                        #${escapeHtml(
                            invoiceNumber || ""
                        )}
                    </strong>
                </div>

            </header>
        `;
    }

    function renderInvoice(invoice) {
        const invoiceNumberForHeader =
            invoice.invoice_number || invoice.id;

        const contract = parseContractDetails(
            invoice.contract_details
        );

        const items = normalizeItems(contract);

        const currency = window.FinFlowMoney
            ? window.FinFlowMoney.normalizeCurrency(invoice.currency)
            : String(invoice.currency || "EUR").toUpperCase();

        const subtotal = items.length
            ? items.reduce((sum, item) => {
                  if (
                      Number.isFinite(item.rate) &&
                      Number.isFinite(item.quantity)
                  ) {
                      return sum + item.quantity * item.rate;
                  }

                  return sum;
              }, 0)
            : Number(invoice.amount || 0);

        const total = Number(invoice.amount || 0);

        const cancelled =
            String(invoice.status || "").toUpperCase() === "CANCELLED";

        const paid = Number(invoice.paid_amount || 0);

        const outstanding = Math.max(
            total - paid,
            0
        );

        const renderedItems = items.length
            ? items
                  .map((item, index) => {
                      const lineTotal =
                          Number.isFinite(item.rate) &&
                          Number.isFinite(item.quantity)
                              ? item.rate * item.quantity
                              : null;

                      return `
                          <tr>
                              <td class="ff-paper-index">
                                  ${index + 1}
                              </td>

                              <td>
                              <span data-finflow-no-i18n>${escapeHtml(item.description)}</span>
                              </td>

                              <td class="ff-paper-number">
                                  ${
                                      Number.isFinite(item.quantity)
                                          ? item.quantity
                                          : "—"
                                  }
                              </td>

                              <td class="ff-paper-number">
                                  ${
                                      Number.isFinite(item.rate)
                                          ? formatMoney(
                                                item.rate,
                                                invoice.currency
                                            )
                                          : "—"
                                  }
                              </td>

                              <td class="ff-paper-number">
                                  ${
                                      lineTotal !== null
                                          ? formatMoney(
                                                lineTotal,
                                                invoice.currency
                                            )
                                          : "—"
                                  }
                              </td>
                          </tr>
                      `;
                  })
                  .join("")
            : `
                <tr>
                    <td class="ff-paper-index">1</td>
                    <td>
                        <span data-finflow-no-i18n>${escapeHtml(invoice.software || "")}</span>
                        ${escapeHtml(t("Software License"))}
                    </td>
                    <td class="ff-paper-number">1</td>
                    <td class="ff-paper-number" data-finflow-no-i18n>
                        ${formatMoney(total, invoice.currency)}
                    </td>
                    <td class="ff-paper-number" data-finflow-no-i18n>
                        ${formatMoney(total, invoice.currency)}
                    </td>
                </tr>
            `;

        const cancellationBlock = cancelled
            ? `
                <div class="ff-paper-alert ff-paper-alert-danger">
                    <i class="bi bi-x-octagon"></i>

                    <div>
                        <strong>${escapeHtml(t("Счёт отменён"))}</strong>

                        <span data-finflow-no-i18n>
                            ${
                                invoice.cancellation_reason
                                    ? escapeHtml(
                                          invoice.cancellation_reason
                                      )
                                    : t("Причина отмены не указана.")
                            }
                        </span>
                    </div>
                </div>
            `
            : "";

        preview.innerHTML = `
            <article class="ff-paper-document">

                ${renderOurCompanyHeader(invoiceNumberForHeader)}

                ${cancellationBlock}

                <section class="ff-paper-parties">

                    <div class="ff-paper-party">
                    <span class="ff-paper-label">${escapeHtml(t("BILL TO"))}</span>

                        <strong data-finflow-no-i18n>
                            ${escapeHtml(
                                invoice.company_name || "—"
                            )}
                        </strong>

                        <p data-finflow-no-i18n>
                            ${
                                contract.bill_to_details
                                    ? escapeHtml(
                                          contract.bill_to_details
                                      ).replace(
                                          /\n/g,
                                          "<br>"
                                      )
                                    : "—"
                            }
                        </p>
                    </div>

                </section>

                <section class="ff-paper-meta-grid">

                    <div>
                        <span>${escapeHtml(t("Invoice date"))}</span>
                        <strong>
                            ${formatDate(invoice.invoice_date)}
                        </strong>
                    </div>

                    <div>
                        <span>${escapeHtml(t("Completion date"))}</span>
                        <strong>
                            ${formatDate(invoice.completion_date)}
                        </strong>
                    </div>

                    <div>
                        <span>${escapeHtml(t("Product"))}</span>
                        <strong data-finflow-no-i18n>
                            ${escapeHtml(invoice.software || "—")}
                        </strong>
                    </div>

                    <div>
                        <span>${escapeHtml(t("Currency"))}</span>
                        <strong data-finflow-no-i18n>
                            ${escapeHtml(invoice.currency || "—")}
                        </strong>
                    </div>

                    <div>
                        <span>${escapeHtml(t("PO number"))}</span>
                        <strong data-finflow-no-i18n>
                            ${escapeHtml(
                                contract.po_number || "—"
                            )}
                        </strong>
                    </div>

                    <div>
                        <span>${escapeHtml(t("Payment terms"))}</span>
                        <strong data-finflow-no-i18n>
                            ${escapeHtml(
                                contract.payment_terms || "—"
                            )}
                        </strong>
                    </div>

                </section>

                <section class="ff-paper-items">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>${escapeHtml(t("Description"))}</th>
                                <th>${escapeHtml(t("Qty"))}</th>
                                <th>${escapeHtml(t("Rate"))}</th>
                                <th>${escapeHtml(t("Amount"))}</th>
                            </tr>
                        </thead>

                        <tbody>
                            ${renderedItems}
                        </tbody>
                    </table>
                </section>

                <section class="ff-paper-summary">

                    <div class="ff-paper-payment">

                        <div>
                            <span>${escapeHtml(t("Payment status"))}</span>
                            <strong>
                                ${escapeHtml(
                                    paymentLabel(
                                        invoice.payment_status
                                    )
                                )}
                            </strong>
                        </div>

                        <div>
                            <span>${escapeHtml(t("Paid"))}</span>
                            <strong>
                                ${formatMoney(
                                    paid,
                                    invoice.currency
                                )}
                            </strong>
                        </div>

                        <div>
                            <span>${escapeHtml(t("Outstanding"))}</span>
                            <strong>
                                ${formatMoney(
                                    outstanding,
                                    invoice.currency
                                )}
                            </strong>
                        </div>

                    </div>

                    <div class="ff-paper-totals">

                        <div>
                            <span>${escapeHtml(t("Subtotal"))}</span>
                            <strong>
                                ${formatMoney(
                                    subtotal,
                                    invoice.currency
                                )}
                            </strong>
                        </div>

                        <div class="ff-paper-total">
                            <span>${escapeHtml(t("Total"))}</span>
                            <strong>
                                ${formatMoney(
                                    total,
                                    invoice.currency
                                )}
                            </strong>
                        </div>

                    </div>

                </section>

                ${
                    contract.notes
                        ? `
                            <section class="ff-paper-notes">
                                <span>${escapeHtml(t("Notes"))}</span>
                                <p data-finflow-no-i18n>
                                    ${escapeHtml(
                                        contract.notes
                                    ).replace(
                                        /\n/g,
                                        "<br>"
                                    )}
                                </p>
                            </section>
                        `
                        : ""
                }

                ${
                    contract.terms
                        ? `
                            <section class="ff-paper-terms">
                                <span>${escapeHtml(t("Terms & conditions"))}</span>
                                <p data-finflow-no-i18n>
                                    ${escapeHtml(
                                        contract.terms
                                    ).replace(
                                        /\n/g,
                                        "<br>"
                                    )}
                                </p>
                            </section>
                        `
                        : ""
                }

                ${
                    ourCompany.signature_url || ourCompany.stamp_url
                        ? `
                            <section class="ff-paper-signature-final">
                                ${
                                    ourCompany.signature_url
                                        ? `
                                            <div class="ff-paper-signature-final-image">
                                                <img
                                                    src="${escapeHtml(
                                                        ourCompany.signature_url
                                                    )}"
                                                alt="${escapeHtml(t("Подпись"))}"
                                                >
                                            </div>
                                        `
                                        : ""
                                }

                                ${
                                    ourCompany.stamp_url
                                        ? `
                                            <div class="ff-paper-stamp-final-image">
                                                <img
                                                    src="${escapeHtml(
                                                        ourCompany.stamp_url
                                                    )}"
                                                    alt="${escapeHtml(t("Stamp"))}"
                                                >
                                            </div>
                                        `
                                        : ""
                                }
                            </section>
                        `
                        : ""
                }


            </article>
        `;

        if (previewLabel) {
            previewLabel.textContent =
                `${window.finflowI18n?.translateSmart("Invoice") || "Invoice"} ${invoice.invoice_number || `#${invoice.id}`}`;
        }

        if (previewStatus) {
            previewStatus.className =
                `ff-generator-preview-status ${
                    cancelled
                        ? "is-cancelled"
                        : "is-ready"
                }`;

            previewStatus.innerHTML = `
                <i class="bi ${
                    cancelled
                        ? "bi-x-circle"
                        : "bi-check-circle"
                }"></i>

                ${
                    cancelled
                        ? t("Отменён")
                        : t("Готов к печати")
                }
            `;
        }

        if (pdfButton) {
            pdfButton.disabled = false;
        }

        if (printButton) {
            printButton.disabled = false;
        }
    }

    function selectInvoice(invoiceId) {
        const invoice = invoices.find(
            (item) =>
                Number(item.id) === Number(invoiceId)
        );

        if (!invoice) {
            selectedInvoiceId = null;
            renderEmptyPreview();
            updateArchiveSelection();
            return;
        }

        selectedInvoiceId = Number(invoice.id);

        renderArchive();
        updateArchiveSelection();
        renderInvoice(invoice);
    }

    function downloadPdf() {
        if (!selectedInvoiceId) {
            return;
        }

        window.location.href =
            `/generator/pdf/${encodeURIComponent(
                selectedInvoiceId
            )}?lang=${encodeURIComponent(
                window.finflowI18n?.getLang?.() === "uk" ? "uk" : "en"
            )}`;
    }

    function printInvoice() {
        if (!selectedInvoiceId) {
            return;
        }

        window.print();
    }

    searchInput?.addEventListener("input", () => {
        renderArchive();
    });

    document
        .querySelectorAll(".ff-generator-filter")
        .forEach((button) => {
            button.addEventListener("click", () => {
                activeFilter =
                    button.dataset.filter || "ALL";

                document
                    .querySelectorAll(
                        ".ff-generator-filter"
                    )
                    .forEach((item) => {
                        item.classList.toggle(
                            "is-active",
                            item === button
                        );
                    });

                renderArchive();
            });
        });

    pdfButton?.addEventListener(
        "click",
        downloadPdf
    );

    printButton?.addEventListener(
        "click",
        printInvoice
    );

    renderArchive();

    window.addEventListener("finflow-language-changed", () => {
        renderArchive();
        if (selectedInvoiceId) {
            selectInvoice(selectedInvoiceId);
        } else {
            renderEmptyPreview();
        }
    });

    if (initialInvoiceId) {
        selectInvoice(initialInvoiceId);
    } else if (invoices.length) {
        selectInvoice(invoices[0].id);
    } else {
        renderEmptyPreview();
    }
})();
