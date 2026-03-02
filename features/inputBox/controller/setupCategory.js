export default function setupCategoryController({ formData }) {
    const root = document.getElementById('input-root');

    root.addEventListener('click', (e) => {
        const actionEl = e.target.closest('[data-action]');
        if (!actionEl) return;

        const action = actionEl.dataset.action;

        switch (action) {
            case 'toggle-category':
                formData.setIsCategoryOpen(!formData.isCategoryOpen);
                break;

            case 'close-category':
                formData.setIsCategoryOpen(false);
                break;

            case 'select-category': {
                const value = actionEl.dataset.value;
                if (!value) return;

                formData.setCategory(value);
                formData.setIsCategoryOpen(false);
                break;
            }
        }
    });
}
