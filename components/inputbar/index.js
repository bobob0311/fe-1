import createDateInput from './inputItems/date.js';
import createCategoryInput from './inputItems/category.js';
import createAmountInput from './inputItems/amount.js';
import createDescriptionInput from './inputItems/description.js';
import createPaymentInput from './inputItems/payment.js';
import createSummitButton from './summitBtn.js';
import formData from '../../store/formData.js';
import bindFormDataToInputs from '../../controller/inputController.js';

export default function initalizeInputBox() {
    const $rootElement = document.getElementById('input-placeholder');

    const $dateInputElement = createDateInput();
    const $valueInputElement = createAmountInput();
    const $descriptionInputElement = createDescriptionInput();
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
    formData.init();
}

function initFormEvents($root) {
    $root.addEventListener('input', (e) => {
        if (e.target.id === 'valueInput') {
            const raw = e.target.value.replace(/[^0-9]/g, '');
            formData.setAmount(Number(raw));
        }
    });

    $root.addEventListener('click', (e) => {
        const toggleBtn = e.target.closest('#toggle-sign');
        if (toggleBtn) {
            formData.setSign(!formData.sign);
        }
    });
}
