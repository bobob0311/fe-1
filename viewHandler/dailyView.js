import { dailyData } from '../store/daily.js';
import formData from '../store/formData.js';
import createDailyList from '../components/dailyList/dailyList.js';

export function renderDailyView(year, month) {
    // dailyView 초기화
    const $dailyRoot = document.querySelector('#daily-placeholder');
    $dailyRoot.innerHTML = '';

    $dailyRoot.append(createDailyList(year, month));

    addFilterEventListener('filter-income', $dailyRoot, () =>
        dailyData.toggleIncomeFilter(),
    );
    addFilterEventListener('filter-expense', $dailyRoot, () =>
        dailyData.toggleExpenseFilter(),
    );

    bindListClickEvent($dailyRoot);
}

function addFilterEventListener(targetId, $rootElement, filterFn) {
    $rootElement.querySelector(`#${targetId}`).addEventListener('click', () => {
        filterFn();
    });
}

function bindListClickEvent($rootElement) {
    $rootElement.addEventListener('click', (e) => {
        const $dailyLine = e.target.closest('.daily-line');

        if (!$dailyLine) return;

        const $deleteBtn = e.target.closest('.daily-delete-btn');
        const seletedId = $dailyLine.getAttribute('id');

        if ($deleteBtn) {
            dailyData.removeDailyData(seletedId);
            return;
        }

        if ($dailyLine.classList.contains('selected')) {
            $dailyLine.classList.remove('selected');
            formData.init();
            return;
        }

        $dailyLine.classList.add('selected');
        formData.setEdit(true);
        formData.setDailyId(seletedId);

        const { date, items } = dailyData.findDailyDataById(seletedId);
        items.amount > 0 ? (items.sign = true) : (items.sign = false);

        formData.setFormData(date, items);
    });
}
