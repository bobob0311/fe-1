import createDateInput from './inputItems/date.js';
import createCategoryInput from './inputItems/category.js';
import createAmountInput from './inputItems/amount.js';
import createDescriptionInput from './inputItems/description.js';
import createPaymentInput from './inputItems/payment.js';
import createSummitButton from './summitBtn.js';
import formData from '../../store/formData.js';
import bindFormDataToInputs from '../../controller/inputController.js';

export default function initalizeInputBox() {
    formData.init();
    const { sign, amount, date, description } = formData;

    const $rootElement = document.getElementById('input-placeholder');

    const $dateInputElement = createDateInput(date);
    const $valueInputElement = createAmountInput(sign, amount);
    const $descriptionInputElement = createDescriptionInput(description);
    const $paymentInputElement = createPaymentInput();
    const $categoryInputElement = createCategoryInput();
    const $summitBtnElement = createSummitButton();

    [
        $dateInputElement,
        $valueInputElement,
        $descriptionInputElement,
        $paymentInputElement,
        $categoryInputElement,
        $summitBtnElement,
    ].forEach(($el) => $rootElement.appendChild($el));

    initFormEvents($rootElement);
    //bindFormDataToInputs(formData);
}

function initFormEvents($root) {
    $root.addEventListener('input', (e) => {
        const field = e.target.dataset.field;
        if (!field) return;

        switch (field) {
            case 'amount':
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
    });
}
