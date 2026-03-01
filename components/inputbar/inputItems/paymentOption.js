import { createElement } from '../../../utils.js';
import payment from '../../../store/payment.js';

export default function createPayemntInputOption() {
    const $paymentOptionItems = createElement(
        'ul',
        { id: 'dropdown-List-payment', class: 'dropdown-list-payment' },
        [...createPaymentListNode(payment.data), createAppendItemButton()],
    );
    return $paymentOptionItems;
}

function createPaymentListNode(items) {
    return items.map((item) =>
        createElement(
            'li',
            { 'data-action': 'select-payment', 'data-value': item },
            [
                createElement('span', { class: 'lt-12' }, item),
                createOptionDeleteButton(item),
            ],
        ),
    );
}

function createOptionDeleteButton(item) {
    return createElement(
        'button',
        {
            'data-action': 'request-delete-payment',
            'data-value': item,
        },
        createElement('img', {
            src: '/public/red-closed.svg',
        }),
    );
}

function createAppendItemButton() {
    const $button = createElement(
        'button',
        { 'data-action': 'request-add-payment', id: 'payment-add-button' },
        createElement('span', { class: 'lt-12' }, '추가하기'),
    );
    return createElement('li', { id: 'payment-line' }, $button);
}
