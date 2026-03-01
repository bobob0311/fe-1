import createCategoryInput from '../components/inputbar/inputItems/category.js';
import createPaymentInput from '../components/inputbar/inputItems/payment.js';
import createSummitFormButton from '../components/inputbar/summitBtn.js';
import { formatAmount } from '../utils.js';

function renderAmountInput(amount, sign) {
    const $input = document.getElementById('valueInput');
    const $signImg = document.getElementById('sign');

    if (!$input || !$signImg) return;

    $input.value = formatAmount(Math.abs(amount)) || '';
    $signImg.src = sign ? '/public/plus.svg' : '/public/minus.svg';
}

function renderDateInput(date) {
    const $input = document.getElementById('dateInput');
    if ($input) $input.value = date || '';
}

function renderCategoryInput(category, isCategoryOpen, sign) {
    const $category = document.querySelector('.category-wrapper');
    if (!$category) return;
    $category.replaceWith(createCategoryInput(category, isCategoryOpen, sign));
}

function renderPaymentInput(payment, isPaymentOpen) {
    const $payment = document.querySelector('.payment-wrapper');
    if (!$payment) return;
    $payment.replaceWith(createPaymentInput(payment, isPaymentOpen));
}

function renderDescriptionInput(description) {
    const $input = document.getElementById('descriptionInput');
    const $length = document.getElementById('current-text-length');
    $length.innerHTML = description.length;
    if ($input) $input.value = description || '';
}

function renderSummitBtn(isValid) {
    const $submitBtn = document.querySelector('.add-button-wrapper');
    $submitBtn.replaceWith(createSummitFormButton(isValid));
}

export {
    renderAmountInput,
    renderCategoryInput,
    renderDateInput,
    renderDescriptionInput,
    renderPaymentInput,
    renderSummitBtn,
};
