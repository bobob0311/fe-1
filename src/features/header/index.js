import headerView from './view.js';

export default function setupHeader({ dateData }) {
    const $headerRoot = document.getElementById('header-root');
    // 이벤트 바인딩
    bindEvents($headerRoot, dateData);

    // 초기 렌더링
    const { element: HeaderEl, update } = headerView();
    $headerRoot.append(HeaderEl);
    update(dateData);

    // 구독
    dateData.subscribe(() => update(dateData));
}

function bindEvents(container, dateData) {
    container.addEventListener('click', (e) => {
        const action = e.target.closest('button')?.dataset.action;

        if (action === 'prev') {
            dateData.decreaseMonth();
        }

        if (action === 'next') {
            dateData.increaseMonth();
        }
    });
}
