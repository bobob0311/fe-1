import setupHeader from '../features/header/index.js';
import dateData from '../store/date.js';

export default async function bootstrap() {
    // await dailyData.init();
    dateData.init();

    setupHeader({ dateData });
    // setupInputBox();
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
