import { createElement } from '../../utils.js';

export default function createDeleteModal(targetName) {
    const $body = createDeleteModalBody(targetName);
    const $buttons = createDeleteModalButtons();

    return createElement('div', { class: 'modal-content' }, [$body, $buttons]);
}

function createDeleteModalBody(targetName) {
    const $message = createElement(
        'div',
        {},
        '해당 결제 수단을 삭제하시겠습니까?',
    );

    const $target = createElement(
        'span',
        { class: 'delete-modal-value' },
        targetName,
    );

    return createElement('div', { class: 'modal-content-wrapper' }, [
        $message,
        $target,
    ]);
}

function createDeleteModalButtons() {
    const $cancleBtn = createElement(
        'button',
        { 'data-action': 'close-modal', class: 'sb-16' },
        '취소',
    );
    const $deleteBtn = createElement(
        'button',
        { 'data-action': 'confirm-delete-payment', class: 'sb-16' },
        '삭제',
    );

    return createElement('div', { class: 'modal-btn-wrapper' }, [
        $cancleBtn,
        $deleteBtn,
    ]);
}
