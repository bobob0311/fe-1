import { createElement } from '../../utils.js';
import formData from '../../store/formData.js';
import { dailyData } from '../../store/daily.js';
import dateData from '../../store/date.js';
import { dailyViewChange } from '../../viewHandler/dailyView.js';
import { bindInputValue } from '../../viewHandler/inputView.js';

export default function createSummitButton() {
    const summitBtnInnerHtml = `
            <button class="add-button" disabled>
                <img
                    src="/public/check.svg"
                    width="24px"
                    height="24px"
                />
            </button>
        `;

    const $summitBtn = createElement(
        'div',
        {
            class: 'add-button-wrappe',
        },
        summitBtnInnerHtml,
    );

    const $btn = $summitBtn.firstElementChild;
    $btn.addEventListener('click', () => {
        if (!formData.isValid) return;
        if (formData.isEdit) {
            dailyData.changeDailyData(formData);
        } else {
            dailyData.uploadDailyData(formData);
        }

        const { year: nowYear, month: nowMonth } = dateData;
        const [year, month] = formData.date.split('-');
        if (nowYear == year && month == nowMonth)
            dailyViewChange(nowYear, nowMonth);

        formData.init();
        bindInputValue(formData);
    });

    formData.subscribeIsValid((isValid) => {
        if (isValid) {
            $btn.removeAttribute('disabled');
        } else {
            $btn.disabled = true;
        }
    });

    return $summitBtn;
}
