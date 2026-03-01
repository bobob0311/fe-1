import { createElement } from '../../utils.js';

export default function createAddPaymentModal() {
    const $body = createAddPaymentModalBody();
    const $buttons = createAddPaymentModalButtons();

    return createElement('div', { class: 'modal-content' }, [$body, $buttons]);
}

function createAddPaymentModalBody() {
    const $message = createElement(
        'div',
        {},
        '추가 하실 결제수단을 입력해주세요.',
    );

    const $input = createElement('input', {
        type: 'text',
        'data-field': 'new-payment-name',
    });

    return createElement('div', { class: 'modal-content-wrapper' }, [
        $message,
        $input,
    ]);
}

function createAddPaymentModalButtons() {
    const $cancelBtn = createElement(
        'button',
        {
            class: 'sb-16',
            'data-action': 'close-modal',
        },
        '취소',
    );

    const $addBtn = createElement(
        'button',
        {
            class: 'sb-16',
            'data-action': 'confirm-add-payment',
        },
        '추가',
    );

    return createElement('div', { class: 'modal-btn-wrapper' }, [
        $cancelBtn,
        $addBtn,
    ]);
}
