import { createElement, formatAmount } from '../../../utils.js';

export default function createAmountInput(sign, amount) {
    const $valueInputItem = createElement(
        'div',
        {
            class: 'value-wrapper',
        },
        [createAmountLabelNode(), createContentBox(sign, amount)],
    );
    return $valueInputItem;
}

function createAmountLabelNode() {
    return createElement(
        'label',
        { for: 'valueInput', class: 'lt-12' },
        '금액',
    );
}

function createContentBox(sign, amount) {
    return createElement('div', { class: 'value-box' }, [
        createAmountButtonNode(sign),
        createAmountInputNode(amount),
        '<span>원</span>',
    ]);
}

function createAmountInputNode(amount) {
    return createElement('input', {
        id: 'valueInput',
        type: 'text',
        value: formatAmount(amount),
        class: 'sb-12',
        'data-field': 'amount',
        placeholder: 0,
    });
}

function createAmountButtonNode(sign) {
    const $amountImgNode = createElement('img', {
        id: 'sign',
        src: `/public/${sign ? 'plus' : 'minus'}.svg`,
        'aria-label': `${sign ? '플러스' : '마이너스'}`,
        width: '16px',
    });
    return createElement('button', { id: 'toggle-sign' }, $amountImgNode);
}
