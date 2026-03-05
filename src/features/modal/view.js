import createAddPaymentModal from './component/addPaymentModal.js';
import createDeletePaymentModal from './component/deletePaymentModal.js';

export default function createModal(modalState) {
    if (!modalState) return null;

    switch (modalState.type) {
        case 'add-payment':
            return createAddPaymentModal();

        case 'delete-payment':
            return createDeletePaymentModal(modalState.value);
    }
}
