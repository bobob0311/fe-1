import { createElement } from '../../utils.js';

export default function createSummitFormButton(isValid) {
    const $btnImg = createElement('img', {
        src: '/public/check.svg',
        width: '24px',
        height: '24px',
    });

    const $summitButton = createElement(
        'button',
        {
            class: `add-button`,
            disabled: !isValid,
        },
        $btnImg,
    );
    return createElement(
        'div',
        { class: 'add-button-wrapper', 'data-action': 'submit-daily' },
        $summitButton,
    );
}
