import dailyData from '../../store/daily.js';
import dateData from '../../store/date.js';
import createDailyList from './component/dailyList.js';
import formData from '../../store/formData.js';
import bindEvents from './controller/index.js';

export default function setupDailyList() {
    const $dailyRoot = document.querySelector('#daily-root');
    const { element, update } = createDailyList(dateData, dailyData);

    bindEvents($dailyRoot, dailyData, formData);
    $dailyRoot.append(element);

    dailyData.subscribe('selected-update', (state) => {
        update('selected-update', state);
    });

    dailyData.subscribe('rerender', () => {
        update('rerender');
    });

    dailyData.subscribe('daily-update', (newItems) => {
        update('daily-update', newItems);
    });
    dateData.subscribe(() => {
        update('rerender');
    });
}
