import { createElement } from '../../../utils.js';
import createOneDayHeader from './oneDayBoxHeader.js';
import createOneDayList from './oneDayDailyList.js';

export default function createOneDayBox(
    dailyInfo,
    oneDayTotalIncome,
    oneDayTotalExpense,
    selectedId,
) {
    const { date } = dailyInfo;
    const { element: $oneDayList, update: oneDayListUpdate } = createOneDayList(
        dailyInfo,
        selectedId,
    );
    const { element: $oneDayHeader, update: oneDayHeaderUpdate } =
        createOneDayHeader(date, oneDayTotalIncome, oneDayTotalExpense);

    const $oneDayBox = createElement(
        'li',
        {
            class: 'day-container',
        },
        [$oneDayHeader, $oneDayList],
    );

    function update(type, state) {
        if (type === 'oneDay-total-update') {
            oneDayHeaderUpdate(type, state);
        } else {
            oneDayListUpdate(type, state);
        }
    }

    return { element: $oneDayBox, update };
}
