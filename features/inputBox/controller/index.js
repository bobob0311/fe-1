import setupCategoryController from './setupCategory.js';
import setupInputController from './setupInput.js';
import setupPaymentController from './setupPayment.js';
import setupSignController from './setupSign.js';
import setupSubmitController from './setupSubmit.js';

export default function bindEvents({ formData, dailyData }) {
    setupInputController({ formData });
    setupSignController({ formData });
    setupPaymentController({ formData });
    setupCategoryController({ formData });
    setupSubmitController({ formData, dailyData });
}
