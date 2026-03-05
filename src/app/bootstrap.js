import setupHeader from '../features/header/index.js';
import setupInputBox from '../features/inputBox/index.js';
import dateData from '../store/date.js';
import formData from '../store/formData.js';
import dailyData from '../store/daily.js';
import setupDailyList from '../features/daily/index.js';

export default async function bootstrap() {
    await dailyData.init();
    dateData.init();
    formData.init();

    setupHeader({ dateData });
    setupInputBox({ formData, dailyData });
    setupDailyList();
}
