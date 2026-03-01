import createDailyList from '../components/dailyList/dailyList.js';

export function renderDailyView(year, month) {
    const $dailyRoot = document.querySelector('#daily-root');
    $dailyRoot.innerHTML = '';

    $dailyRoot.append(createDailyList(year, month));
}
