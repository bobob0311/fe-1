import { createElement } from '../../utils.js';
import createCenterNavigation from './component/centerNavigation.js';
import createHeaderTab from './component/headerTab.js';

export default function headerView() {
    const $navigation = createCenterNavigation();
    const $HeaderTab = createHeaderTab();
    const $headerLabel = createElement(
        'h1',
        { id: 'main-title' },
        'Wise Wallet',
    );

    const element = createElement('div', { id: 'header-wrapper' }, [
        $headerLabel,
        $navigation.element,
        $HeaderTab,
    ]);

    function update({ year, month }) {
        $navigation.update({ year, month });
    }

    return {
        element,
        update,
    };
}
