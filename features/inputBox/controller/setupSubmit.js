export default function setupSubmitController({ formData, dailyData }) {
    const root = document.getElementById('input-root');

    root.addEventListener('click', (e) => {
        const submitBtn = e.target.closest('[data-action="submit-daily"]');
        if (!submitBtn) return;

        if (!formData.isValid) return;

        if (formData.isEdit) {
            dailyData.changeDailyData(formData);
        } else {
            dailyData.uploadDailyData(formData);
        }

        formData.init();
    });
}
