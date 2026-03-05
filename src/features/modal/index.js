import formData from '../../store/formData.js';
import payment from '../../store/payment.js';
import { createElement } from '../../utils.js';
import bindModalEventsOnce from './controller/index.js';
import createModal from './view.js';

export default function renderModal(modalState) {
    const $rootModal = document.querySelector('#modal-root');
    if (!$rootModal) return;

    bindModalEventsOnce($rootModal, formData, payment);
    if (!modalState) {
        $rootModal.replaceChildren();
        return;
    }
    const $modal = createElement(
        'div',
        { class: 'modal' },
        createModal(modalState),
    );
    const $background = createElement('div', {
        class: 'block',
        'data-action': 'close-modal',
    });

    $rootModal.replaceChildren($modal, $background);
}
