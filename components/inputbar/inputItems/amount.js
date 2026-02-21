import { createElement } from '../../../utils.js';

export default function createAmountInput(sign) {
    const $valueInputItem = createElement(
        'div',
        {
            class: 'value-wrapper',
        },
        [createAmountLabelNode(), createContentBox(sign)],
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

function createContentBox(sign) {
    return createElement('div', { class: 'value-box' }, [
        createAmountButtonNode(sign),
        createAmountInputNode(),
        '<span>원</span>',
    ]);
}

function createAmountInputNode() {
    return createElement('input', {
        id: 'valueInput',
        type: 'text',
        class: 'sb-12',
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
