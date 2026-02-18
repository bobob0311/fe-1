import { createElement } from '../../utils.js';
import dateData from '../../store/date.js';

const centerNavigationHTML = `
    <button>
        <img
            aria-label="왼쪽 버튼"
            src="public/chevron-left.svg"
        />
    </button>
    <div id="location">
        <span>2023</span>
        <span>8</span>
        <span>August</span>
    </div>
    <button>
        <img
            aria-label="오른쪽 버튼"
            src="/public/chevron-right.svg"
        />
    </button>
    `;

export default function createCenterNavigation() {
    const $centerNavigation = createElement(
        'div',
        {
            id: 'center-wrapper',
        },
        centerNavigationHTML,
    );

    centerNavigationAddEventListener($centerNavigation);

    return $centerNavigation;
}

function centerNavigationAddEventListener($wrapper) {
    const [$minusBtn, _, $plusBtn] = $wrapper.children;

    $minusBtn.addEventListener('click', () => {
        dateData.decreaseMonth();
    });
    $plusBtn.addEventListener('click', () => {
        dateData.increaseMonth();
    });
}
