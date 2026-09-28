(function () {
    'use strict';

    const page = document.getElementById('productsPage');

    if (!page) {
        return;
    }

    const dataElement = document.getElementById('productsData');

    let products = [];

    try {
        products = dataElement
            ? JSON.parse(dataElement.textContent || '[]')
            : [];
    } catch (error) {
        console.error('[FinFlow] Failed to parse products data:', error);
        products = [];
    }

    let currentFilter = 'all';
    let searchQuery = '';
let currentView = 'grid';

const PRODUCTS_VIEW_STORAGE_KEY = 'finflow-products-view';

const viewButtons = Array.from(
    document.querySelectorAll('[data-products-view]')
);

function applyProductsView(view, persist = true) {
    const normalizedView = view === 'list' ? 'list' : 'grid';

    currentView = normalizedView;

    if (grid) {
        grid.classList.toggle('is-list', normalizedView === 'list');
    }

    viewButtons.forEach(button => {
        const isActive = button.dataset.productsView === normalizedView;

        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    if (persist) {
        try {
            localStorage.setItem(
                PRODUCTS_VIEW_STORAGE_KEY,
                normalizedView
            );
        } catch (error) {}
    }
}

function loadProductsView() {
    let savedView = 'grid';

    try {
        const storedView = localStorage.getItem(
            PRODUCTS_VIEW_STORAGE_KEY
        );

        if (storedView === 'list') {
            savedView = 'list';
        }
    } catch (error) {}

    applyProductsView(savedView, false);
}

    let editingProductId = null;
    let busy = false;

    const grid = document.getElementById('productsGrid');
    const searchInput = document.getElementById('productSearch');
    const searchClearButton = document.getElementById('product-search-clear');

    const modal = document.getElementById('productModal');
    const form = document.getElementById('productForm');

    const productIdInput = document.getElementById('productId');
    const codeInput = document.getElementById('productCode');
    const nameInput = document.getElementById('productName');
    const descriptionInput = document.getElementById('productDescription');

    const modalTitle = document.getElementById('productModalTitle');
    const modalSubtitle = document.getElementById('productModalSubtitle');
    const formError = document.getElementById('productFormError');
    const saveButton = document.getElementById('productSaveButton');

    const createButton = document.getElementById('createProductButton');
    const createEmptyButton = document.getElementById('createProductEmptyButton');

    const filterButtons = Array.from(
        document.querySelectorAll('[data-product-filter]')
    );

    const canManage = page.dataset.canManage === 'true';


    function escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }


    function getProduct(id) {
        return products.find(
            product => Number(product.id) === Number(id)
        );
    }


    function formatDate(value) {
        if (!value) {
            return '—';
        }

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return '—';
        }

        return new Intl.DateTimeFormat('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(date);
    }


    function statusLabel(status) {
        if (status === 'ARCHIVED') {
            return {
                text: window.finflowI18n?.translateSmart("Archived") || "Archived",
                icon: 'bi-archive-fill'
            };
        }

        return {
            text: window.finflowI18n?.translateSmart("Active") || "Active",
            icon: 'bi-check-circle-fill'
        };
    }


    function normalizeProduct(product) {
        return {
            id: Number(product.id),
            code: String(product.code || '').trim().toUpperCase(),
            name: String(product.name || '').trim(),
            description: String(product.description || '').trim(),
            status: String(product.status || 'ACTIVE').trim().toUpperCase(),
            created_at: product.created_at || null,
            updated_at: product.updated_at || null,
            usage: {
                budgets: Number(product.usage?.budgets || 0),
                invoices: Number(product.usage?.invoices || 0)
            }
        };
    }


    products = products.map(normalizeProduct);


    function getFilteredProducts() {
        const query = searchQuery.trim().toLowerCase();

        return products.filter(product => {
            const matchesFilter =
                currentFilter === 'all'
                || (currentFilter === 'active' && product.status === 'ACTIVE')
                || (currentFilter === 'archived' && product.status === 'ARCHIVED');

            if (!matchesFilter) {
                return false;
            }

            if (!query) {
                return true;
            }

            return [
                product.code,
                product.name,
                product.description
            ].some(value =>
                String(value || '').toLowerCase().includes(query)
            );
        });
    }


    function renderCard(product) {
        const status = statusLabel(product.status);
        const archived = product.status === 'ARCHIVED';

        return `
            <article
                class="ff-product-card"
                data-product-id="${product.id}"
                data-product-code="${escapeHtml(product.code)}"
                data-product-name="${escapeHtml(product.name)}"
                data-product-status="${escapeHtml(product.status)}"
            >

                <div class="ff-product-card-top">

                    <div class="ff-product-identity">

                        <div class="ff-product-mark">
                            <i class="bi bi-box-seam"></i>
                        </div>

                        <div class="ff-product-heading">
                            <div class="ff-product-code">
                                ${escapeHtml(product.code)}
                            </div>

                            <h3>
                                ${escapeHtml(product.name)}
                            </h3>
                        </div>

                    </div>

                    <span class="ff-product-status ff-product-status-${archived ? 'archived' : 'active'}">
                        <i class="bi ${status.icon}"></i>
                        ${status.text}
                    </span>

                </div>


                <div class="ff-product-description">
                    ${
                        product.description
                            ? escapeHtml(product.description)
                            : `<span>${window.finflowI18n?.translateSmart("Description not specified.") || "Description not specified."}</span>`
                    }
                </div>


                <div class="ff-product-usage">

                    <div class="ff-product-usage-item">
                        <i class="bi bi-wallet2"></i>
                        <div>
                            <strong>${product.usage.budgets}</strong>
                            <span>${window.finflowI18n?.translateSmart("Budgets") || "Budgets"}</span>
                        </div>
                    </div>

                    <div class="ff-product-usage-divider"></div>

                    <div class="ff-product-usage-item">
                        <i class="bi bi-receipt"></i>
                        <div>
                            <strong>${product.usage.invoices}</strong>
                            <span>${window.finflowI18n?.translateSmart("Invoices") || "Invoices"}</span>
                        </div>
                    </div>

                </div>


                <div class="ff-product-card-footer">

                    <div class="ff-product-created">
                        <span>${window.finflowI18n?.translateSmart("Created") || "Created"}</span>
                        <strong>${formatDate(product.created_at)}</strong>
                    </div>

                    ${
                        canManage
                            ? `
                                <div class="ff-product-actions">

                                    <button
                                        type="button"
                                        class="ff-product-action"
                                        data-product-action="edit"
                                        title="Edit"
                                        aria-label="${escapeHtml(window.finflowI18n?.translateSmart("Edit") || "Edit")} ${escapeHtml(product.name)}"
                                    >
                                        <i class="bi bi-pencil"></i>
                                    </button>

                                    ${
                                        !archived
                                            ? `
                                                <button
                                                    type="button"
                                                    class="ff-product-action"
                                                    data-product-action="archive"
                                                    title="Archive"
                                                    aria-label="${escapeHtml(window.finflowI18n?.translateSmart("Archive") || "Archive")} ${escapeHtml(product.name)}"
                                                >
                                                    <i class="bi bi-archive"></i>
                                                </button>
                                            `
                                            : ''
                                    }

                                    <button
                                        type="button"
                                        class="ff-product-action ff-product-action-danger"
                                        data-product-action="delete"
                                        title="Delete"
                                        aria-label="${escapeHtml(window.finflowI18n?.translateSmart("Delete") || "Delete")} ${escapeHtml(product.name)}"
                                    >
                                        <i class="bi bi-trash3"></i>
                                    </button>

                                </div>
                            `
                            : ''
                    }

                </div>

            </article>
        `;
    }


    function renderProducts() {
        if (!grid) {
            return;
        }

        const filtered = getFilteredProducts();

        grid.innerHTML = filtered.map(renderCard).join('');

        const visibleCount = document.getElementById(
            'products-visible-count'
        );

        if (visibleCount) {
            visibleCount.textContent = filtered.length;
        }

        if (searchClearButton) {
            searchClearButton.classList.toggle(
                'hidden',
                !searchQuery.trim()
            );
        }

        updateSummary();
    }


    function updateSummary() {
        const total = products.length;

        const active = products.filter(
            product => product.status === 'ACTIVE'
        ).length;

        const archived = products.filter(
            product => product.status === 'ARCHIVED'
        ).length;

        const totalElement = document.getElementById(
            'productsTotalCount'
        );

        const activeElement = document.getElementById(
            'productsActiveCount'
        );

        const archivedElement = document.getElementById(
            'productsArchivedCount'
        );

        if (totalElement) {
            totalElement.textContent = total;
        }

        if (activeElement) {
            activeElement.textContent = active;
        }

        if (archivedElement) {
            archivedElement.textContent = archived;
        }
    }


    function setFormError(message) {
        if (!formError) {
            return;
        }

        formError.textContent = message || '';
        formError.hidden = !message;
    }


    function setSaveBusy(value) {
        busy = value;

        if (!saveButton) {
            return;
        }

        saveButton.disabled = value;

        const icon = saveButton.querySelector('i');
        const text = saveButton.querySelector('span');

        if (value) {
            if (icon) {
                icon.className = 'bi bi-arrow-repeat';
            }

            if (text) {
                text.textContent = window.finflowI18n?.translateSmart("Saving...") || "Saving...";
            }
        } else {
            if (icon) {
                icon.className = 'bi bi-check-lg';
            }

            if (text) {
                text.textContent = window.finflowI18n?.translateSmart("Save") || "Save";
            }
        }
    }


    function openModal(product = null) {
        if (!modal || !form) {
            return;
        }

        editingProductId = product ? Number(product.id) : null;

        productIdInput.value = product ? product.id : '';
        codeInput.value = product ? product.code : '';
        nameInput.value = product ? product.name : '';
        descriptionInput.value = product ? product.description : '';

        setFormError('');

        if (product) {
            modalTitle.textContent = window.finflowI18n?.translateSmart("Edit product") || "Edit product";
            modalSubtitle.textContent =
                window.finflowI18n?.translateSmart("Change product parameters in the ElixOR Connect catalog.") || "Change product parameters in the ElixOR Connect catalog.";
        } else {
            modalTitle.textContent = window.finflowI18n?.translateSmart("New product") || "New product";
            modalSubtitle.textContent =
                window.finflowI18n?.translateSmart("Add a product to the ElixOR Connect catalog.") || "Add a product to the ElixOR Connect catalog.";
        }

        modal.hidden = false;
        modal.setAttribute('aria-hidden', 'false');

        document.body.classList.add('ff-modal-open');

        window.requestAnimationFrame(() => {
            modal.classList.add('is-open');

            if (product) {
                nameInput.focus();
                nameInput.select();
            } else {
                codeInput.focus();
            }
        });
    }


    function closeModal() {
        if (!modal) {
            return;
        }

        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');

        window.setTimeout(() => {
            modal.hidden = true;
        }, 180);

        document.body.classList.remove('ff-modal-open');

        editingProductId = null;
        setFormError('');
    }


    async function apiRequest(url, options = {}) {
        const csrfInput = document.querySelector(
            'input[name="csrf_token"]'
        );

        const csrfToken = csrfInput
            ? csrfInput.value
            : '';

        const headers = {
            'Accept': 'application/json',
            ...(options.headers || {})
        };

        if (csrfToken && !headers['X-CSRF-Token']) {
            headers['X-CSRF-Token'] = csrfToken;
        }

        const response = await fetch(url, {
            credentials: 'same-origin',
            ...options,
            headers
        });

        let payload = null;

        try {
            payload = await response.json();
        } catch (error) {
            payload = null;
        }

        if (!response.ok) {
            const error = new Error(
                payload?.message
                || payload?.error
                || `Request failed: ${response.status}`
            );

            error.status = response.status;
            error.code = payload?.code || '';
            error.payload = payload;

            throw error;
        }

        return payload;
    }


    async function saveProduct(event) {
        event.preventDefault();

        if (busy || !canManage) {
            return;
        }

        const code = String(codeInput.value || '').trim().toUpperCase();
        const name = String(nameInput.value || '').trim();
        const description = String(descriptionInput.value || '').trim();

        setFormError('');

        if (!code) {
            setFormError(window.finflowI18n?.translateSmart("Enter product code.") || "Enter product code.");
            codeInput.focus();
            return;
        }

        if (!/^[A-Z0-9_-]+$/.test(code)) {
            setFormError(
                window.finflowI18n?.translateSmart("Code may contain only Latin letters, numbers, hyphen and underscore.") || "Code may contain only Latin letters, numbers, hyphen and underscore."
            );
            codeInput.focus();
            return;
        }

        if (!name) {
            setFormError(window.finflowI18n?.translateSmart("Enter product name.") || "Enter product name.");
            nameInput.focus();
            return;
        }

        const body = JSON.stringify({
            code,
            name,
            description
        });

        setSaveBusy(true);

        try {
            let result;

            if (editingProductId) {
                result = await apiRequest(
                    `/products/${editingProductId}/update`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body
                    }
                );
            } else {
                result = await apiRequest(
                    '/products/create',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body
                    }
                );
            }

            if (!result?.product) {
                throw new Error(window.finflowI18n?.translateSmart("Server did not return product data.") || "Server did not return product data.");
            }

            const normalized = normalizeProduct(result.product);

            const existingIndex = products.findIndex(
                product => Number(product.id) === Number(normalized.id)
            );

            if (existingIndex >= 0) {
                products[existingIndex] = {
                    ...products[existingIndex],
                    ...normalized
                };
            } else {
                products.push(normalized);
            }

            closeModal();
            renderProducts();
        } catch (error) {
            console.error('[FinFlow] Product save failed:', error);
            setFormError(error.message || window.finflowI18n?.translateSmart("Failed to save product.") || "Failed to save product.");
        } finally {
            setSaveBusy(false);
        }
    }


    async function archiveProduct(product) {
        if (busy || !canManage || !product) {
            return;
        }

        const confirmed = window.confirm(
            `${window.finflowI18n?.translateSmart("Archive product") || "Archive product"} «${product.name}»?\n\n`
            + `${window.finflowI18n?.translateSmart("It will remain in the system but will be excluded from new operations.") || "It will remain in the system but will be excluded from new operations."}`
        );

        if (!confirmed) {
            return;
        }

        busy = true;

        try {
            const result = await apiRequest(
                `/products/${product.id}/archive`,
                {
                    method: 'POST'
                }
            );

            if (result?.product) {
                const normalized = normalizeProduct({
                    ...product,
                    ...result.product
                });

                const index = products.findIndex(
                    item => Number(item.id) === Number(product.id)
                );

                if (index >= 0) {
                    products[index] = normalized;
                }

                renderProducts();
            }

        } catch (error) {
            console.error('[FinFlow] Product archive failed:', error);

            window.alert(
                error.message || window.finflowI18n?.translateSmart("Failed to archive product.") || "Failed to archive product."
            );
        } finally {
            busy = false;
        }
    }


    async function deleteProduct(product) {
        if (busy || !canManage || !product) {
            return;
        }

        const usage = product.usage || {};
        const used =
            Number(usage.budgets || 0)
            + Number(usage.invoices || 0);

        if (used > 0) {
            window.alert(
                `${window.finflowI18n?.translateSmart("Product is used in the system.") || "Product is used in the system."} «${product.name}».\n\n`
                + `${window.finflowI18n?.translateSmart("Budgets") || "Budgets"}: ${usage.budgets || 0}\n`
                + `${window.finflowI18n?.translateSmart("Invoices") || "Invoices"}: ${usage.invoices || 0}\n\n`
                + `${window.finflowI18n?.translateSmart("Physical deletion is not possible.") || "Physical deletion is not possible."} `
                + `${window.finflowI18n?.translateSmart("Use archiving instead.") || "Use archiving instead."}`
            );

            return;
        }

        const confirmed = window.confirm(
            `${window.finflowI18n?.translateSmart("Delete") || "Delete"} «${product.name}»?\n\n`
            + `${window.finflowI18n?.translateSmart("This action cannot be undone.") || "This action cannot be undone."}`
        );

        if (!confirmed) {
            return;
        }

        busy = true;

        try {
            await apiRequest(
                `/products/${product.id}/delete`,
                {
                    method: 'POST'
                }
            );

            products = products.filter(
                item => Number(item.id) !== Number(product.id)
            );

            renderProducts();

        } catch (error) {
            console.error('[FinFlow] Product delete failed:', error);

            if (error.code === 'in_use') {
                window.alert(
                    error.message
                    || window.finflowI18n?.translateSmart("Product is used in the system and cannot be deleted.") || "Product is used in the system and cannot be deleted."
                );
            } else {
                window.alert(
                    error.message || window.finflowI18n?.translateSmart("Failed to delete product.") || "Failed to delete product."
                );
            }
        } finally {
            busy = false;
        }
    }


    function handleGridClick(event) {
        const actionButton = event.target.closest(
            '[data-product-action]'
        );

        if (!actionButton) {
            return;
        }

        const card = actionButton.closest(
            '[data-product-id]'
        );

        if (!card) {
            return;
        }

        const product = getProduct(card.dataset.productId);

        if (!product) {
            return;
        }

        const action = actionButton.dataset.productAction;

        if (action === 'edit') {
            openModal(product);
        } else if (action === 'archive') {
            archiveProduct(product);
        } else if (action === 'delete') {
            deleteProduct(product);
        }
    }


    function handleSearch() {
        searchQuery = searchInput
            ? searchInput.value
            : '';

        renderProducts();
    }


    function clearSearch() {
        if (!searchInput) {
            return;
        }

        searchInput.value = '';
        searchQuery = '';

        renderProducts();
        searchInput.focus();
    }


    function handleFilter(event) {
        const button = event.currentTarget;
        const filter = button.dataset.productFilter;

        if (!filter) {
            return;
        }

        currentFilter = filter;

        filterButtons.forEach(item => {
            item.classList.toggle(
                'is-active',
                item === button
            );
        });

        renderProducts();
    }


    if (form) {
        form.addEventListener('submit', saveProduct);
    }

    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    if (searchClearButton) {
        searchClearButton.addEventListener('click', clearSearch);
    }

    if (grid) {
        grid.addEventListener('click', handleGridClick);
    }

    if (searchInput) {
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilter);
    });

    if (createButton) {
        createButton.addEventListener(
            'click',
            () => openModal()
        );
    }

    if (createEmptyButton) {
        createEmptyButton.addEventListener(
            'click',
            () => openModal()
        );
    }

    if (modal) {
        modal.addEventListener('click', event => {
            if (event.target.closest('[data-product-modal-close]')) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && modal && !modal.hidden) {
            closeModal();
        }
    });


    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            applyProductsView(button.dataset.productsView);
        });
    });

    loadProductsView();
    renderProducts();

    window.FinFlowProducts = {
        get products() {
            return products;
        },
        refresh: renderProducts
    };

    console.log(
        '[FinFlow] Products initialized:',
        products.length
    );

})();
