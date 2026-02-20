import createDailyList from '../components/dailyList/dailyList.js';

export function renderDailyView(year, month) {
    // dailyView 초기화
    const $dailyRoot = document.querySelector('#daily-placeholder');
    $dailyRoot.innerHTML = '';

    $dailyRoot.append(createDailyList(year, month));
}
