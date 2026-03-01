import { createElement } from '../../../utils.js';
import createCategoryInputOption from './categoryOption.js';

export default function createCategoryInput(category, isCategoryOpen, sign) {
    return createElement(
        'div',
        { class: 'category-wrapper' },
        createCategoryContent(category, isCategoryOpen, sign),
    );
}

function createCategoryContent(category, isCategoryOpen, sign) {
    return createElement('div', { class: 'dropdown-category' }, [
        createCategoryButton(category),
        isCategoryOpen ? createCategoryInputOption(sign) : null,
        isCategoryOpen ? createCategoryBackground() : null,
    ]);
}

function createCategoryButton(category) {
    const $categoryLabel = createElement(
        'label',
        { for: 'categoryInput', class: 'dropdown-label lt-12' },
        '분류',
    );

    const $categoryContent = createElement('span', { class: 'select-btn' }, [
        createElement(
            'span',
            {
                id: 'dropdown-toggle-category',
                class: 'dropdown-btn sb-12',
            },
            category || '선택하세요',
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
            class: 'dropdown-main-category',
            'data-action': 'toggle-category',
        },
        [$categoryLabel, $categoryContent],
    );
}

function createCategoryBackground() {
    return createElement('div', {
        class: 'select-background',
        'data-action': 'close-category',
    });
}
