import { dailyData } from '../../store/daily.js';
import { createElement, formatAmount } from '../../utils.js';
import createOneDayBox from './oneDayBox.js';

export default function createDailyList(year, month) {
    const $container = createElement('ol', { class: 'daily-list-wrapper' }, [
        createDailyHeader(
            dailyData.totalCount,
            dailyData.totalIncome,
            dailyData.totalExpense,
            dailyData.filteredIncome,
            dailyData.filteredExpense,
        ),
        ...dailyData
            .getDailyByYearAndMonth(Number(year), Number(month))
            .map((list) => createOneDayBox(list)),
    ]);

    return $container;
}

function createDailyHeader(
    totalCount,
    totalIncome,
    totalExpense,
    filteredIncome,
    filteredExpense,
) {
    return createElement('div', { class: 'total-header' }, [
        createTotalCountNode(totalCount),
        createWholeTotalAmountNode(
            totalIncome,
            totalExpense,
            filteredIncome,
            filteredExpense,
        ),
    ]);
}

function createTotalCountNode(totalCount) {
    return createElement(
        'div',
        { class: 'amount-wrapper' },
        `전체 내역: ${totalCount}건`,
    );
}

function createWholeTotalAmountNode(
    totalIncome,
    totalExpense,
    filteredIncome,
    filteredExpense,
) {
    return createElement('div', { class: 'amount-wrapper' }, [
        createTotalAmountNode(true, totalIncome, filteredIncome),
        createTotalAmountNode(false, totalExpense, filteredExpense),
    ]);
}

function createTotalAmountNode(sign, amount, checked) {
    const buttonContent = sign ? 'income' : 'expense';
    const amountCase = sign ? '수입' : '지출';

    const $amountButton = createAmountFilterButton(buttonContent, checked);
    const $content = createElement(
        'span',
        { class: 'lt-12' },
        `${amountCase}: ${formatAmount(amount)}`,
    );

    return createElement('div', { class: 'amount-container' }, [
        $amountButton,
        $content,
    ]);
}

function createAmountFilterButton(buttonContent, checked) {
    const $checkImg = createElement('img', {
        width: '12',
        height: '12',
        src: '/public/check.svg',
    });
    const $button = createElement(
        'button',
        {
            id: `filter-${buttonContent}`,
            class: `check-wrapper ${checked ? 'amount-btn-active' : ''}`,
        },
        $checkImg,
    );
    return $button;
}
