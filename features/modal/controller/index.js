export default function bindModalEventsOnce($rootModal, formData, payment) {
    if ($rootModal.dataset.listener) return;

    $rootModal.addEventListener('click', (e) => {
        const el = e.target.closest('[data-action]');
        const action = el?.dataset?.action;
        if (!action) return;
        switch (action) {
            case 'close-modal':
                formData.setModal(null);
                break;

            case 'confirm-add-payment': {
                const input = $rootModal.querySelector(
                    '[data-field="new-payment-name"]',
                );
                const value = input?.value?.trim();
                if (!value) return;

                payment.addPayment(value);
                formData.setIsPaymentOpen(false);
                formData.setModal(null);
                break;
            }

            case 'confirm-delete-payment':
                payment.deletePayment(formData.modal);
                formData.setIsPaymentOpen(false);
                formData.setModal(null);
                break;
        }
    });

    $rootModal.dataset.listener = 'true';
}
