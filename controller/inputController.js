import renderModal from '../components/modal/index.js';
import formData from '../store/formData.js';
import payment from '../store/payment.js';
import {
    renderAmountInput,
    renderCategoryInput,
    renderDateInput,
    renderDescriptionInput,
    renderPaymentInput,
    renderSummitBtn,
} from '../viewHandler/inputView.js';

// sign을 하나 따로 파야할지도 왜냐면 category가 sign에 따라 바뀌어야해서 초기화가 필요합니다.
export default function bindFormDataToInputs() {
    payment.subscribe('payment', renderPayment);
    formData.subscribe('payment', renderPayment);

    formData.subscribe('amount', () =>
        renderAmountInput(formData.amount, formData.sign),
    );
    formData.subscribe('date', () => renderDateInput(formData.date));
    formData.subscribe('description', () =>
        renderDescriptionInput(formData.description),
    );
    formData.subscribe('category', () =>
        renderCategoryInput(
            formData.category,
            formData.isCategoryOpen,
            formData.sign,
        ),
    );
    formData.subscribe('validity', () => {
        renderSummitBtn(formData.isValid);
    });
    formData.subscribe('modal', () => {
        renderModal(formData.modal);
    });
}

const renderPayment = () =>
    renderPaymentInput(formData.payment, formData.isPaymentOpen);
