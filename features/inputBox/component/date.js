import { createElement } from '../../../utils.js';

export default function createDateInput({ date }) {
    const $dateInputItem = createElement(
        'div',
        {
            class: 'date-wrapper',
        },
        [createDateLabelNode(), createDateInputNode(date)],
    );

    function update({ date }) {
        const $dateInput = $dateInputItem.querySelector('#dateInput');
        $dateInput.value = date;
    }

    return { element: $dateInputItem, update };
}

function createDateLabelNode() {
    return createElement('label', { for: 'dateInput', class: 'lt-12' }, '일자');
}
function createDateInputNode(date) {
    return createElement('input', {
        id: 'dateInput',
        type: 'date',
        value: date || '',
        class: 'sb-12',
        'data-field': 'date',
    });
}
