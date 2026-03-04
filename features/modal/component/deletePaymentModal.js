import { createElement } from '../../../utils.js';
import createConfirmModal from './_confirmModal.js';

export default function createDeletePaymentModal(targetName) {
    const $target = createElement(
        'span',
        { class: 'delete-modal-value' },
        targetName ?? '',
    );

    return createConfirmModal({
        message: '해당 결제 수단을 삭제하시겠습니까?',
        bodyChildren: [$target],
        confirmAction: 'confirm-delete-payment',
        confirmText: '삭제',
        cancelText: '취소',
    });
}
