import bindEvents from './controller/index.js';
import InputBoxView from './view.js';

export default function setupInputBox({ formData, dailyData }) {
    const $inputBoxRoot = document.getElementById('input-root');
    const { element: $inputBox, update } = InputBoxView({ formData });
    $inputBoxRoot.append($inputBox);

    bindEvents({ formData, dailyData });

    [
        'payment',
        'amount',
        'date',
        'description',
        'category',
        'validity',
        'modal',
    ].forEach((type) => formData.subscribe(type, () => update(type, formData)));
}
