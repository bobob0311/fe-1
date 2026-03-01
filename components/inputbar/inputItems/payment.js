import { createElement } from '../../../utils.js';
import createPayemntInputOption from './paymentOption.js';

export default function createPaymentInput(payment, isPaymentOpen) {
    return createElement(
        'div',
        {
            class: 'payment-wrapper',
        },
        createPaymentContent(payment, isPaymentOpen),
    );
}

function createPaymentContent(payment, isPaymentOpen) {
    return createElement('div', { class: 'dropdown-payment' }, [
        createPaymentButton(payment),
        isPaymentOpen ? createPayemntInputOption() : null,
        isPaymentOpen ? createPaymentBackground() : null,
    ]);
}

function createPaymentButton(payment) {
    const $paymentLabel = createElement(
        'label',
        { for: 'paymentInput', class: 'dropdown-label lt-12' },
        '분류',
    );

    const $paymentContent = createElement('span', { class: 'select-btn' }, [
        createElement(
            'span',
            {
                id: 'dropdown-toggle-payment',
                class: 'dropdown-btn sb-12',
            },
            payment || '선택하세요',
        ),
        createElement('img', {
            width: '32',
            height: '16',
            src: '/public/chevron-down.svg',
        }),
    ]);

    return createElement(
        'span',
        {
            class: 'dropdown-main-payment',
            'data-action': 'toggle-payment',
        },
        [$paymentLabel, $paymentContent],
    );
}

function createPaymentBackground() {
    return createElement('div', {
        class: 'select-background',
        'data-action': 'close-payment',
    });
}
