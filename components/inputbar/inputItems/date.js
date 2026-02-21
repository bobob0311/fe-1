import { createElement } from '../../../utils.js';
import formData from '../../../store/formData.js';

export default function createDateInput(date) {
    const $dateInputItem = createElement(
        'div',
        {
            class: 'date-wrapper',
        },
        [createDateLabelNode(), createDateInputNode(date)],
    );

    const $dateInput = $dateInputItem.querySelector('#dateInput');
    $dateInput.addEventListener('change', (e) => {
        formData.setDate(e.target.value);
    });

    return $dateInputItem;
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
