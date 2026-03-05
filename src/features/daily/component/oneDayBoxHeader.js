import {
    createElement,
    formatDateToKorean,
    formatAmount,
} from '../../../utils.js';

export default function createOneDayHeader(
    date,
    oneDayTotalIncome,
    oneDayTotalExpense,
) {
    const $dateInfo = createDateInfoNode(date);
    const $amountInfo = createAmountInfoNode(
        oneDayTotalIncome,
        oneDayTotalExpense,
    );

    const $oneDayHeader = createElement('div', { class: 'daily-header' }, [
        $dateInfo,
        $amountInfo,
    ]);

    function handleOneDayTotalAmountUpdate({
        oneDayTotalIncome,
        oneDayTotalExpense,
    }) {
        const $newAmountInfo = createAmountInfoNode(
            oneDayTotalIncome,
            oneDayTotalExpense,
        );
        $dateInfo.replaceWith($newAmountInfo);
    }

    const handlers = { 'oneDay-total-update': handleOneDayTotalAmountUpdate };

    function update(type, state) {
        handlers[type]?.(state);
    }

    return { element: $oneDayHeader, update };
}

function createDateInfoNode(date) {
    const dateToKorean = formatDateToKorean(date);
    return createElement('div', { class: 'date-info' }, `${dateToKorean}`);
}

function createAmountInfoNode(oneDayTotalIncome, oneDayTotalExpense) {
    const $wrapper = createElement('div', { class: 'amount-wrapper' });

    if (oneDayTotalIncome != null && oneDayTotalIncome !== 0) {
        $wrapper.appendChild(
            createElement(
                'div',
                { class: 'amount-line' },
                `수입 ${formatAmount(oneDayTotalIncome)}원`,
            ),
        );
    }

    if (oneDayTotalExpense != null && oneDayTotalExpense !== 0) {
        $wrapper.appendChild(
            createElement(
                'div',
                { class: 'amount-line' },
                `지출 ${formatAmount(Math.abs(oneDayTotalExpense))}원`,
            ),
        );
    }

    return $wrapper;
}
