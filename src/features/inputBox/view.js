import { createElement } from '../../utils.js';
import createAmountInput from './component/amount.js';
import createCategoryInput from './component/category.js';
import createDateInput from './component/date.js';
import createDescriptionInput from './component/description.js';
import createPaymentInput from './component/payment.js';
import createSummitFormButton from './component/summitBtn.js';

export default function InputBoxView({ formData }) {
    const { element: $amountEl, update: amountUpdate } =
        createAmountInput(formData);
    const { element: $categoryEl, update: categoryUpdate } =
        createCategoryInput(formData);
    const { element: $dateEl, update: dateUpdate } = createDateInput(formData);
    const { element: $descriptionEl, update: descriptionUpdate } =
        createDescriptionInput(formData);
    const { element: $paymentEl, update: paymentUpdate } =
        createPaymentInput(formData);
    const { element: $submitBtn, update: submitBtnUpdate } =
        createSummitFormButton(formData);

    const $inputBoxEl = createElement('fragment', {}, [
        $dateEl,
        $amountEl,
        $descriptionEl,
        $paymentEl,
        $categoryEl,
        $submitBtn,
    ]);

    function update(type, state) {
        switch (type) {
            case 'amount':
                amountUpdate(state);
                break;
            case 'category':
                categoryUpdate(state);
                break;
            case 'date':
                dateUpdate(state);
                break;
            case 'description':
                descriptionUpdate(state);
                break;
            case 'payment':
                paymentUpdate(state);
            case 'validity':
                submitBtnUpdate(state);
        }
    }

    return { element: $inputBoxEl, update };
}
