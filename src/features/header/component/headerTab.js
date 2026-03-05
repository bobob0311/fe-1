import { createElement } from '../../../utils.js';

const TAB = [
    { label: '내역', svgName: 'doc' },
    { label: '달력', svgName: 'calendar' },
    { label: '통계', svgName: 'chart' },
];

export default function createHeaderTab() {
    return createElement(
        'div',
        {
            id: 'header-tab',
        },
        createLinkList(TAB),
    );
}

function createLinkList(list) {
    return createElement(
        'ul',
        {},
        list.map((item) => createLinkIcon(item)),
    );
}

function createLinkIcon({ label, svgName }) {
    const $img = createElement('img', {
        'aria-label': `${label}`,
        src: `/public/${svgName}.svg`,
    });
    return createElement('li', {}, createElement('a', {}, $img));
}
