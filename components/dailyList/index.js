import { dailyData } from '../../store/daily.js';
import formData from '../../store/formData.js';
import { renderDailyView } from '../../viewHandler/dailyView.js';

export default function initalizeDailyList() {
    const today = new Date().toISOString().split('T')[0];
    const [year, month] = today.split('-');
    const $dailyRoot = document.querySelector('#daily-placeholder');
    bindEvents($dailyRoot);
    renderDailyView(year, month);
}

function bindEvents($rootElement) {
    $rootElement.addEventListener('click', (e) => {
        // 필터 상태 변경 로직
        if (e.target.closest('#filter-income')) {
            dailyData.toggleIncomeFilter();
            return;
        }

        if (e.target.closest('#filter-expense')) {
            dailyData.toggleExpenseFilter();
            return;
        }

        // 라인  클릭 로직
        const $dailyLine = e.target.closest('.daily-line');
        if (!$dailyLine) return;

        const prevSelectedId = dailyData.getSelectedId();
        const nowSelectedId = $dailyLine.getAttribute('id');

        // 삭제 버튼 클릭시 삭제
        const $deleteBtn = e.target.closest('.daily-delete-btn');
        if ($deleteBtn) {
            dailyData.removeDailyData(nowSelectedId);
            formData.init();
            dailyData.setSelectedId(null);
            return;
        }

        if (prevSelectedId == nowSelectedId) {
            dailyData.setSelectedId(null);
            formData.init();
            return;
        } else {
            dailyData.setSelectedId(nowSelectedId);
        }

        formData.setEdit(true);
        formData.setDailyId(nowSelectedId);

        const { date, items } = dailyData.findDailyDataById(nowSelectedId);
        items.amount > 0 ? (items.sign = true) : (items.sign = false);

        formData.setFormData(date, items);
    });
}
