import formData from '../../store/formData.js';
import payment from '../../store/payment.js';
import { createElement } from '../../utils.js';
import createAddPaymentModal from './addModal.js';
import createDeleteModal from './deleteModal.js';

export default function renderModal(modalState) {
    const $rootModal = document.querySelector('#root-modal');
    if (!$rootModal) return;

    if (!modalState) {
        $rootModal.innerHTML = '';
        return;
    }

    if (!$rootModal.dataset.listener) {
        $rootModal.addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            if (!action) return;
            switch (action) {
                case 'close-modal':
                    formData.setModal(null);
                    break;

                case 'confirm-add-payment': {
                    const input = $rootModal.querySelector(
                        '[data-field="new-payment-name"]',
                    );

                    const value = input?.value.trim();
                    if (!value) return;
                    payment.addPayment(value);
                    formData.setModal(null);
                    break;
                }

                case 'confirm-delete-payment':
                    payment.deletePayment(formData.modal);
                    formData.setModal(null);
                    break;
            }
        });

        $rootModal.dataset.listener = 'true';
    }
    let content;

    switch (modalState.type) {
        case 'add-payment':
            content = createAddPaymentModal();
            break;

        case 'delete-payment':
            content = createDeleteModal(modalState.value);
            break;
    }

    const $modal = createElement('div', { class: 'modal' }, content);
    const $background = createElement(
        'div',
        { class: 'block', 'data-action': 'close-modal' },
        '',
    );

    $rootModal.replaceChildren($modal, $background);
}
