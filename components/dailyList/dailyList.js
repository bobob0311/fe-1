import { dailyData } from '../../store/daily.js';
import { createElement, formatAmount } from '../../utils.js';
import createOneDayBox from './oneDayBox.js';

export default function createDailyList(year, month) {
    const $container = createElement('ol', { class: 'daily-list-wrapper' }, [
        createDailyHeader(
            dailyData.totalCount,
            dailyData.totalIncome,
            dailyData.totalExpense,
        ),
        ...dailyData
            .getDailyByYearAndMonth(Number(year), Number(month))
            .map((list) => createOneDayBox(list)),
    ]);

    return $container;
}

function createDailyHeader(totalCount, totalIncome, totalExpense) {
    return createElement('div', { class: 'total-header' }, [
        createTotalCountNode(totalCount),
        createWholeTotalAmountNode(totalIncome, totalExpense),
    ]);

    return `
        <div class="total-header">
            <div class="lt-12">전체 내역    ${totalCount}건 </div>
            <div class="amount-wrapper">
                <div class="amount-container">    
                    <button id="filter-income" class="check-wrapper amount-btn-active"> 
                        <img width="12" height="12" src="/public/check.svg" /> 
                    </button>
                    <span class="lt-12">수입: ${formatAmount(
                        totalIncome,
                    )}</span>
                </div>
                <div class="amount-container">
                    <button id="filter-expense" class="check-wrapper amount-btn-active"> 
                        <img width="12" height="12" src="/public/check.svg" /> 
                    </button>
                    <span class="lt-12">지출: ${formatAmount(
                        totalExpense,
                    )}<span>
                </div>
            </div>
        </div>`;
}

function createTotalCountNode(totalCount) {
    return createElement(
        'div',
        { class: 'amount-wrapper' },
        `전체 내역: ${totalCount}건`,
    );
}

function createWholeTotalAmountNode(totalIncome, totalExpense) {
    return createElement('div', { class: 'amount-wrapper' }, [
        createTotalAmountNode(true, totalIncome),
        createTotalAmountNode(false, totalExpense),
    ]);
}

function createTotalAmountNode(sign, amount) {
    const buttonContent = sign ? 'income' : 'expense';
    const amountCase = sign ? '수입' : '지출';

    const $amountButton = createAmountFilterButton(buttonContent);
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

function createAmountFilterButton(buttonContent) {
    const $checkImg = createElement('img', {
        width: '12',
        height: '12',
        src: '/public/check.svg',
    });
    const $button = createElement(
        'button',
        {
            id: `filter-${buttonContent}`,
            class: 'check-wrapper amount-btn-active',
        },
        $checkImg,
    );
    return $button;
}
