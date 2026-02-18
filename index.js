import initalizeDailyList from './components/dailyList/index.js';
import initializeHeader from './components/header/index.js';
import initalizeInputBox from './components/inputbar/index.js';
import { dailyData } from './store/daily.js';
import dateData from './store/date.js';
import { renderDailyView } from './viewHandler/dailyView.js';
import { renderDateView } from './viewHandler/dateView.js';

await dailyData.init();

dailyData.subscribe(() => {
    renderDailyView(dateData.year, dateData.month);
});

dateData.subscribe(({ year, month }) => {
    renderDailyView(year, month);
    renderDateView(year, month);
});

document.getElementById('header-placeholder').append(initializeHeader());
initalizeInputBox();
initalizeDailyList();

dateData.initDateData();
