(() => {
    "use strict";

    const root = document.querySelector(".ff-company-detail-page");
    const dataNode = document.getElementById("companyContactsData");
    if (!root || !dataNode) return;

    let data;
    try {
        data = JSON.parse(dataNode.textContent || "{}");
    } catch (error) {
        console.error("Invalid company detail data", error);
        return;
    }

    const modal = document.getElementById("contactModal");
    const form = document.getElementById("contactForm");
    const formError = document.getElementById("contactFormError");
    const translate = value => window.finflowI18n?.translateSmart(value) || value;
    const contacts = Array.isArray(data.contacts) ? data.contacts : [];

    function csrfToken() {
        return window.FIN_FLOW_CSRF_TOKEN || form?.elements.csrf_token?.value || "";
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.add("hidden");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("overflow-hidden");
    }

    function openModal(contact = null) {
        if (!modal || !form || !data.canManage || root.dataset.companyStatus !== "ACTIVE") return;
        form.reset();
        form.elements.contact_id.value = contact?.id || "";
        form.elements.full_name.value = contact?.full_name || "";
        form.elements.job_title.value = contact?.job_title || "";
        form.elements.email.value = contact?.email || "";
        form.elements.phone.value = contact?.phone || "";
        form.elements.mobile.value = contact?.mobile || "";
        form.elements.notes.value = contact?.notes || "";
        form.elements.is_primary.checked = Boolean(contact?.is_primary);
        const title = document.getElementById("contactModalTitle");
        title.textContent = translate(contact ? "Edit contact" : "Add contact");
        title.dataset.i18n = contact ? "Edit contact" : "Add contact";
        formError?.classList.add("hidden");
        modal.classList.remove("hidden");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("overflow-hidden");
        form.elements.full_name.focus();
    }

    async function post(url, body = null) {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": csrfToken(),
                ...(body ? { "Content-Type": "application/json" } : {}),
            },
            ...(body ? { body: JSON.stringify(body) } : {}),
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok || result.status === "error") {
            throw new Error(result.message || translate("Could not update contact."));
        }
        return result;
    }

    document.addEventListener("click", async event => {
        if (event.target.closest("[data-contact-create]")) {
            openModal();
            return;
        }
        if (event.target.closest("[data-contact-close]")) {
            closeModal();
            return;
        }

        const editButton = event.target.closest("[data-contact-edit]");
        if (editButton) {
            const contact = contacts.find(item => Number(item.id) === Number(editButton.dataset.contactEdit));
            if (contact) openModal(contact);
            return;
        }

        const actionButton = event.target.closest("[data-contact-archive], [data-contact-restore], [data-contact-primary]");
        if (!actionButton || !data.canManage) return;
        const contactId = actionButton.dataset.contactArchive || actionButton.dataset.contactRestore || actionButton.dataset.contactPrimary;
        let action;
        let confirmMessage;
        if (actionButton.hasAttribute("data-contact-archive")) {
            action = "archive";
            confirmMessage = translate("Archive this contact?");
        } else if (actionButton.hasAttribute("data-contact-restore")) {
            action = "restore";
        } else {
            action = "primary";
        }

        if (confirmMessage && !window.confirm(confirmMessage)) return;
        actionButton.disabled = true;
        try {
            await post(`/companies/${data.companyId}/contacts/${contactId}/${action}`);
            window.location.reload();
        } catch (error) {
            window.alert(error.message || translate("Could not update contact."));
            actionButton.disabled = false;
        }
    });

    form?.addEventListener("submit", async event => {
        event.preventDefault();
        if (!data.canManage || !form) return;
        const contactId = form.elements.contact_id.value;
        const payload = {
            full_name: form.elements.full_name.value.trim(),
            job_title: form.elements.job_title.value.trim(),
            email: form.elements.email.value.trim(),
            phone: form.elements.phone.value.trim(),
            mobile: form.elements.mobile.value.trim(),
            notes: form.elements.notes.value.trim(),
            is_primary: form.elements.is_primary.checked,
        };
        try {
            await post(
                `/companies/${data.companyId}/contacts${contactId ? `/${contactId}/update` : ""}`,
                payload,
            );
            window.location.reload();
        } catch (error) {
            formError.textContent = error.message || translate("Could not save contact.");
            formError.classList.remove("hidden");
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && modal && !modal.classList.contains("hidden")) closeModal();
    });
})();
