import { createElement } from '../../../utils.js';

export default function createConfirmModal({
    message,
    bodyChildren = [],
    cancelAction = 'close-modal',
    confirmAction,
    cancelText = '취소',
    confirmText = '확인',
}) {
    const $body = createElement('div', { class: 'modal-content-wrapper' }, [
        createElement('div', {}, `${message}`),
        ...bodyChildren,
    ]);

    const $buttons = createElement('div', { class: 'modal-btn-wrapper' }, [
        createElement(
            'button',
            {
                class: 'sb-16',
                'data-action': cancelAction,
                type: 'button',
            },
            cancelText,
        ),
        createElement(
            'button',
            {
                class: 'sb-16',
                'data-action': confirmAction,
            },
            `${confirmText}`,
        ),
    ]);

    return createElement('div', { class: 'modal-content' }, [$body, $buttons]);
}
