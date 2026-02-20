import {
    createElement,
    formatAmount,
    formatDateToKorean,
} from '../../utils.js';
import createDaily from './daily.js';

export default function createOneDayBox(dailyInfo) {
    const { date } = dailyInfo;

    const $oneDayBox = createElement(
        'li',
        {
            class: 'day-container',
        },
        // 1, 1 로 하드코딩되어있는 Income과 expense값 수정 해야됩니다.
        [createOneDayHeader(date, 1, 1), createOneDayList(dailyInfo)],
    );

    return $oneDayBox;
}

function createOneDayList(dailyInfo) {
    return createElement(
        'ol',
        { class: 'daliy-line-wrapper' },
        dailyInfo.items.map((info) => createDaily(info)),
    );
}

function createOneDayHeader(date, oneDayTotalIncome, oneDayTotalExpense) {
    const $dateInfo = createDateInfoNode(date);
    const $amountInfo = createAmountInfoNode(
        oneDayTotalIncome,
        oneDayTotalExpense,
    );

    const $oneDayHeader = createElement('div', { class: 'daily-header' }, [
        $dateInfo,
        $amountInfo,
    ]);
    return $oneDayHeader;
}

function createDateInfoNode(date) {
    const dateToKorean = formatDateToKorean(date);
    return createElement('div', { class: 'date-info' }, `${dateToKorean}`);
}

function createAmountInfoNode(oneDayTotalIncome, oneDayTotalExpense) {
    let amountHTML = '';
    amountHTML +=
        oneDayTotalIncome != 0
            ? `<div>수입 ${formatAmount(oneDayTotalIncome)}원</div>`
            : '';
    amountHTML +=
        oneDayTotalExpense != 0
            ? `<div class="amount-line">지출 ${formatAmount(
                  oneDayTotalExpense,
              )}원</div>`
            : '';

    const $amountInfo = createElement(
        'div',
        { class: 'amount-wrapper' },
        amountHTML,
    );
    return $amountInfo;
}
