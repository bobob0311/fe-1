import { createElement } from '../../../utils.js';

export default function createCenterNavigation() {
    const $leftBtn = createLeftbtn();
    const $content = createContent();
    const $rightBtn = createRightbtn();

    const $headerEl = createElement(
        'div',
        {
            id: 'center-wrapper',
        },
        [$leftBtn, $content.element, $rightBtn],
    );

    function update({ year, month }) {
        $content.update({ year, month });
    }

    return { element: $headerEl, update };
}

function createLeftbtn() {
    const $leftBtnImg = createElement('img', {
        'aria-label': '왼쪽 버튼',
        src: 'public/chevron-left.svg',
    });
    return createElement('button', { 'data-action': 'prev' }, $leftBtnImg);
}

function createRightbtn() {
    const $leftBtnImg = createElement('img', {
        'aria-label': '오른쪽 버튼',
        src: 'public/chevron-right.svg',
    });
    return createElement('button', { 'data-action': 'next' }, $leftBtnImg);
}

function createContent() {
    const $yearNum = createElement('span');
    const $monthNum = createElement('span');
    const $yearString = createElement('span');

    function update({ year, month }) {
        const monthName = new Date(year, month - 1).toLocaleString('en-US', {
            month: 'long',
        });

        $yearNum.textContent = year;
        $monthNum.textContent = month;
        $yearString.textContent = monthName;
    }

    const $contentEl = createElement('div', { id: 'location' }, [
        $yearNum,
        $monthNum,
        $yearString,
    ]);

    return { element: $contentEl, update };
}
