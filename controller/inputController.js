import formData from '../store/formData.js';
import {
    renderAmountInput,
    renderCategoryInput,
    renderDateInput,
    renderDescriptionInput,
    renderPaymentInput,
} from '../viewHandler/inputView.js';

export default function bindFormDataToInputs() {
    formData.subscribe('amount', () =>
        renderAmountInput(formData.amount, formData.sign),
    );
    formData.subscribe('date', () => renderDateInput(formData.date));
    formData.subscribe('description', () =>
        renderDescriptionInput(formData.description),
    );
    formData.subscribe('category', () =>
        renderCategoryInput(formData.category),
    );
    formData.subscribe('payment', () => renderPaymentInput(formData.payment));
}
