import { createElement } from '../../../utils.js';

export default function createDescriptionInput({ description }) {
    const $descriptionInput = createElement(
        'div',
        { class: 'description-wrapper' },
        [
            createDescriptionHeaderNode(description.length),
            createDescriptionInputNode(description),
        ],
    );

    const $input = $descriptionInput.querySelector('#descriptionInput');
    const $countEl = $descriptionInput.querySelector('#current-text-length');

    function update(state) {
        const { description } = state;

        $input.value = description;
        const length = description?.length ?? 0;
        $countEl.textContent = String(length);
    }

    return {
        element: $descriptionInput,
        update,
    };
}

function createDescriptionHeaderNode(descriptionLength) {
    const $headerLabel = createElement(
        'label',
        {
            for: 'descriptionInput',
            class: 'lt-12',
        },
        '내용',
    );
    const $headeContent = createElement('span', { class: 'count-box lt-12' }, [
        createElement(
            'span',
            { id: 'current-text-length' },
            String(descriptionLength),
        ),
        ' /32',
    ]);
    return createElement(
        'span',
        {
            class: 'count-box-header',
        },
        [$headerLabel, $headeContent],
    );
}

function createDescriptionInputNode(description) {
    return createElement('input', {
        placeholder: '입력하세요',
        id: 'descriptionInput',
        value: description,
        type: 'text',
        class: 'sb-12',
        maxlength: '32',
        'data-field': 'description',
    });
}
