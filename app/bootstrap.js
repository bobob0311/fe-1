import setupHeader from '../features/header/index.js';
import setupInputBox from '../features/inputBox/index.js';
import dateData from '../store/date.js';
import formData from '../store/formData.js';
import dailyData from '../store/daily.js';

export default async function bootstrap() {
    // await dailyData.init();
    dateData.init();
    formData.init();

    setupHeader({ dateData });
    setupInputBox({ formData, dailyData });
    // setupDailyList();
}

/*
await dailyData.init();

dailyData.subscribe(() => {
    renderDailyView(dateData.year, dateData.month);
});

dateData.subscribe(({ year, month }) => {
    renderDailyView(year, month);
    renderDateView(year, month);
});

document.getElementById('header-root').append(initializeHeader());
initalizeInputBox();
initalizeDailyList();

dateData.initDateData();
*/
