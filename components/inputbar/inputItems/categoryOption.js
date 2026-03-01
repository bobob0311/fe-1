import { createElement } from '../../../utils.js';

const expenseCategories = [
    '생활',
    '식비',
    '교통',
    '쇼핑/뷰티',
    '의료/건강',
    '문화/여가',
    '미분류',
];

const incomeCategories = ['월급', '용돈', '기타 수입'];

export default function createCategoryInputOption(sign) {
    const items = sign ? incomeCategories : expenseCategories;

    return createElement(
        'ul',
        {
            id: 'dropdown-list-category',
            class: 'dropdown-list-category',
        },
        items.map((item) => createCategoryItem(item)),
    );
}

function createCategoryItem(item) {
    return createElement(
        'li',
        {
            class: 'category-line',
            'data-action': 'select-category',
            'data-value': item,
        },
        createElement('span', { class: 'lt-12' }, item),
    );
}
