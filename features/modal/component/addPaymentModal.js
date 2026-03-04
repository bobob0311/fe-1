import { createElement } from '../../../utils.js';
import createConfirmModal from './_confirmModal.js';

export default function createAddPaymentModal() {
    const $input = createElement('input', {
        'data-field': 'new-payment-name',
    });

    return createConfirmModal({
        message: '추가 하실 결제수단을 입력해주세요.',
        bodyChildren: [$input],
        confirmAction: 'confirm-add-payment',
        confirmText: '추가',
    });
}
