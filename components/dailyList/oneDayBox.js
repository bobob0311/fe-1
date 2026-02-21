import {
    createElement,
    formatAmount,
    formatDateToKorean,
} from '../../utils.js';
import createDaily from './daily.js';

export default function createOneDayBox(
    dailyInfo,
    oneDayTotalIncome,
    oneDayTotalExpense,
    selectedId,
) {
    const { date } = dailyInfo;
    const $oneDayBox = createElement(
        'li',
        {
            class: 'day-container',
        },
        [
            createOneDayHeader(date, oneDayTotalIncome, oneDayTotalExpense),
            createOneDayList(dailyInfo, selectedId),
        ],
    );

    return $oneDayBox;
}

function createOneDayList(dailyInfo, selectedId) {
    return createElement(
        'ol',
        { class: 'daliy-line-wrapper' },
        dailyInfo.items.map((info) => createDaily(info, selectedId)),
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
                  Math.abs(oneDayTotalExpense),
              )}원</div>`
            : '';

    const $amountInfo = createElement(
        'div',
        { class: 'amount-wrapper' },
        amountHTML,
    );
    return $amountInfo;
}
