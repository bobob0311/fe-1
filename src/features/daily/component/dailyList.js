import { createElement } from '../../../utils.js';
import createOneDayBox from './oneDayBox.js';
import createDailyListHeader from './dailyListHeader.js'; // 헤더 분리했다는 전제

export default function createDailyList(dateData, dailyData) {
    const $container = createElement('ol', { class: 'daily-list-wrapper' });
    let oneDayBoxMap = new Map();

    function renderAll() {
        const { totalIncome, totalExpense, totalCount } =
            dailyData.getTotalInfo(dateData.year, dateData.month);

        const selectedId = dailyData.getSelectedId();

        const $header = createDailyListHeader({
            totalCount,
            totalIncome,
            totalExpense,
            filteredIncome: dailyData.filteredIncome,
            filteredExpense: dailyData.filteredExpense,
        });

        const visibleDays = dailyData.getVisibleData(
            Number(dateData.year),
            Number(dateData.month),
        );

        oneDayBoxMap = new Map();

        const dayElements = visibleDays.map((dayInfo) => {
            const { income, expense } = dailyData.getDayTotal(dayInfo);

            const instance = createOneDayBox(
                dayInfo,
                income,
                expense,
                selectedId,
            );

            oneDayBoxMap.set(String(dayInfo.date), instance);

            return instance.element;
        });

        $container.replaceChildren($header, ...dayElements);
    }

    renderAll();

    function broadcast(type, state) {
        oneDayBoxMap.forEach((instance) => instance.update(type, state));
    }

    function update(type, state) {
        if (type === 'rerender') {
            renderAll();
            return;
        }

        if (state?.dayKey != null) {
            oneDayBoxMap.get(String(state.dayKey))?.update(type, state);
            return;
        }

        broadcast(type, state);
    }

    return { element: $container, update };
}
