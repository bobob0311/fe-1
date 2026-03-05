import { createElement, formatAmount } from '../../../utils.js';

export default function createDaily(dailyInfo, selectedId) {
    let currentInfo = dailyInfo;

    const $daily = createElement('li', {
        class: `daily-line ${selectedId === currentInfo.id ? 'selected' : ''}`,
        id: currentInfo.id,
    });

    render($daily, currentInfo);

    function handleDailyUpdate({ newDailyInfo }) {
        if (!newDailyInfo) return;
        currentInfo = newDailyInfo;

        render($daily, currentInfo);
    }

    function handleSelectedUpdate({ newSelectedId }) {
        $daily.classList.toggle('selected', newSelectedId === currentInfo.id);
    }

    const handlers = {
        'daily-update': handleDailyUpdate,
        'selected-update': handleSelectedUpdate,
    };

    function update(type, state) {
        handlers[type]?.(state);
    }

    return { element: $daily, update };
}

function render($root, info) {
    $root.replaceChildren();
    const $elements = buildDailyElements(info);
    $elements.forEach(($el) => $root.appendChild($el));
}

const COLOR = {
    생활: '#A7B9E9',
    '문화/여가': '#BDA6E1',
    미분류: '#F0B0D3',
    교통: '#7DB7BF',
    식비: '#C5E0EB',
    '의료/건강': '#BCDFD3',
    용돈: '#AACD7E',
    '기타 수입': '#A28878',
    '쇼핑/뷰티': '#D7CA6B',
    월급: '#E39D5D',
};

function buildDailyElements(info) {
    return [
        createCategory(info),
        createDescription(info),
        createPayment(info),
        createAmount(info),
        createDeleteButton(),
    ];
}

function createCategory(info) {
    return createElement(
        'div',
        {
            class: 'category-info lt-14',
            style: `background-color:${COLOR[info.category] || '#ccc'}`,
        },
        info.category,
    );
}

function createDescription(info) {
    return createElement(
        'div',
        { class: 'description-info lt-14' },
        info.description,
    );
}

function createPayment(info) {
    return createElement('div', { class: 'payment-info lt-14' }, info.payment);
}

function createAmount(info) {
    return createElement(
        'div',
        {
            class: `amount-info ${
                info.amount > 0 ? 'text-blue' : 'text-red'
            } lt-14`,
        },
        `${formatAmount(info.amount)}원`,
    );
}

function createDeleteButton() {
    return createElement(
        'button',
        {
            class: 'daily-delete-btn sb-12 hidden',
        },
        [
            createElement('div', {}, [
                createElement('img', {
                    src: '/public/closed.svg',
                }),
            ]),
            createElement('span', {}, '삭제'),
        ],
    );
}
