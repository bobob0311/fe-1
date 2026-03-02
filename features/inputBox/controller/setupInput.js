export default function setupInputController({ formData }) {
    const root = document.getElementById('input-root');

    let isComposing = false;

    root.addEventListener('compositionstart', (e) => {
        if (e.target.dataset.field === 'amount') {
            isComposing = true;
        }
    });

    root.addEventListener('compositionend', (e) => {
        if (e.target.dataset.field !== 'amount') return;

        isComposing = false;

        const raw = e.target.value.replace(/[^0-9]/g, '');
        formData.setAmount(Number(raw));
    });

    root.addEventListener('input', (e) => {
        const field = e.target.dataset.field;
        if (!field) return;

        if (field === 'amount') {
            if (isComposing) return;

            const raw = e.target.value.replace(/[^0-9]/g, '');
            formData.setAmount(Number(raw));
        }

        if (field === 'description') {
            formData.setDescription(e.target.value);
        }

        if (field === 'date') {
            formData.setDate(e.target.value);
        }
    });
}
