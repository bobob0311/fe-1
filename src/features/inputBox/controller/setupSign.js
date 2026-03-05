export default function setupSignController({ formData }) {
    const root = document.getElementById('input-root');

    root.addEventListener('click', (e) => {
        const toggleBtn = e.target.closest('#toggle-sign');
        if (!toggleBtn) return;

        formData.setSign(!formData.sign);
    });
}
