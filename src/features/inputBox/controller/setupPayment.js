// controller/paymentController.js

export default function setupPaymentController({ formData }) {
    const root = document.getElementById('input-root');

    root.addEventListener('click', (e) => {
        const actionEl = e.target.closest('[data-action]');
        if (!actionEl) return;

        const action = actionEl.dataset.action;

        switch (action) {
            case 'toggle-payment':
                formData.setIsPaymentOpen(!formData.isPaymentOpen);
                break;

            case 'close-payment':
                formData.setIsPaymentOpen(false);
                break;

            case 'select-payment': {
                formData.setPayment(actionEl.dataset.value);
                formData.setIsPaymentOpen(false);
                break;
            }

            case 'request-delete-payment': {
                const value = actionEl.dataset.value;
                if (!value) return;

                formData.setModal({
                    type: 'delete-payment',
                    value,
                });
                break;
            }

            case 'request-add-payment':
                formData.setModal({
                    type: 'add-payment',
                });
                break;
        }
    });
}
