import { formatAmount } from '../utils.js';

function renderAmountInput(amount, sign) {
    const $input = document.getElementById('valueInput');
    const $signImg = document.getElementById('sign');

    if ($input) $input.value = formatAmount(Math.abs(amount)) || '';
    if ($signImg)
        $signImg.setAttribute(
            'src',
            sign ? '/public/minus.svg' : '/public/plus.svg',
        );
}

function renderDateInput(date) {
    const $input = document.getElementById('dateInput');
    if ($input) $input.value = date || '';
}

function renderCategoryInput(category) {
    const $category = document.getElementById('dropdown-toggle-category');
    if ($category) $category.textContent = category || '선택하세요.';
}

function renderPaymentInput(payment) {
    const $payment = document.getElementById('dropdown-toggle-payment');
    if ($payment) $payment.textContent = payment || '선택하세요.';
}

function renderDescriptionInput(description) {
    const $input = document.getElementById('descriptionInput');
    if ($input) $input.value = description || '';
}

export {
    renderAmountInput,
    renderCategoryInput,
    renderDateInput,
    renderDescriptionInput,
    renderPaymentInput,
};
