import createDateInput from './inputItems/date.js';
import createCategoryInput from './inputItems/category.js';
import createAmountInput from './inputItems/amount.js';
import createDescriptionInput from './inputItems/description.js';
import createPaymentInput from './inputItems/payment.js';
import createSummitButton from './summitBtn.js';
import formData from '../../store/formData.js';
import bindFormDataToInputs from '../../controller/inputController.js';
import { dailyData } from '../../store/daily.js';
import dateData from '../../store/date.js';

export default function initalizeInputBox() {
    formData.init();
    const { sign, amount, date, description } = formData;

    const $rootElement = document.getElementById('input-root');

    const $dateInputElement = createDateInput(date);
    const $valueInputElement = createAmountInput(sign, amount);
    const $descriptionInputElement = createDescriptionInput(description);
    const $paymentInputElement = createPaymentInput();
    const $categoryInputElement = createCategoryInput();
    const $summitBtnElement = createSummitButton(formData.isValid);

    [
        $dateInputElement,
        $valueInputElement,
        $descriptionInputElement,
        $paymentInputElement,
        $categoryInputElement,
        $summitBtnElement,
    ].forEach(($el) => $rootElement.appendChild($el));

    initFormEvents($rootElement);
    bindFormDataToInputs();
}

function initFormEvents($root) {
    let isComposing = false;

    $root.addEventListener('compositionstart', (e) => {
        if (e.target.dataset.field === 'amount') {
            isComposing = true;
        }
    });

    $root.addEventListener('compositionend', (e) => {
        if (e.target.dataset.field === 'amount') {
            isComposing = false;

            const raw = e.target.value.replace(/[^0-9]/g, '');
            formData.setAmount(Number(raw));
        }
    });

    $root.addEventListener('input', (e) => {
        const field = e.target.dataset.field;
        if (!field) return;

        switch (field) {
            case 'amount':
                if (isComposing) return;

                const raw = e.target.value.replace(/[^0-9]/g, '');
                formData.setAmount(Number(raw));
                break;

            case 'description':
                formData.setDescription(e.target.value);
                break;

            case 'date':
                formData.setDate(e.target.value);
                break;
        }
    });

    $root.addEventListener('click', (e) => {
        const toggleBtn = e.target.closest('#toggle-sign');
        if (toggleBtn) {
            formData.setSign(!formData.sign);
        }

        const actionEl = e.target.closest('[data-action]');
        if (!actionEl) return;

        const action = actionEl.dataset.action;

        switch (action) {
            case 'toggle-payment':
                formData.setIsPaymentOpen(!formData.isPaymentOpen);
                break;

            case 'close-payment':
                formData.setIsPaymentOpen(false);
                break;

            case 'select-payment': {
                const value = actionEl.dataset.value;
                formData.setPayment(value);
                formData.setIsPaymentOpen(false);
                break;
            }
            case 'request-delete-payment': {
                const value = actionEl.dataset.value;
                if (!value) return;
                formData.setModal({
                    type: 'delete-payment',
                    value,
                });
                break;
            }
            case 'request-add-payment': {
                formData.setModal({
                    type: 'add-payment',
                });
                break;
            }
            case 'toggle-category': {
                formData.setIsCategoryOpen(!formData.isCategoryOpen);
                break;
            }

            case 'close-category':
                formData.setIsCategoryOpen(false);
                break;
            case 'select-category':
                const value = actionEl.dataset.value;
                if (!value) return;
                formData.setCategory(value);
                formData.setIsCategoryOpen(false);
                break;
            case 'submit-daily':
                if (!formData.isValid) return;

                if (formData.isEdit) {
                    dailyData.changeDailyData(formData);
                } else {
                    dailyData.uploadDailyData(formData);
                }

                formData.init();
        }
    });
}
