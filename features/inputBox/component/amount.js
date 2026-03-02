import { createElement, formatAmount } from '../../../utils.js';

export default function createAmountInput({ sign, amount }) {
    const $input = createAmountInputNode(amount);
    const $signBtn = createAmountButtonNode(sign);

    const $amountInput = createElement('div', { class: 'value-wrapper' }, [
        createAmountLabelNode(),
        createContentBox($signBtn, $input),
    ]);

    function update({ sign, amount }) {
        const $img = $signBtn.querySelector('img');

        $input.value = formatAmount(amount);
        $img.src = `/public/${sign ? 'plus' : 'minus'}.svg`;
        $img.setAttribute('aria-label', sign ? '플러스' : '마이너스');
    }

    return {
        element: $amountInput,
        update,
    };
}

function createAmountLabelNode() {
    return createElement(
        'label',
        { for: 'valueInput', class: 'lt-12' },
        '금액',
    );
}

function createContentBox(signBtn, input) {
    return createElement('div', { class: 'value-box' }, [
        signBtn,
        input,
        createElement('span', {}, '원'),
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
