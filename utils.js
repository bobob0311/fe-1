export const createElement = (tag, attributes = {}, content) => {
    const $wrapperElement = document.createElement(tag);

    Object.entries(attributes).forEach(([key, value]) => {
        $wrapperElement.setAttribute(key, value);
    });

    if (typeof content === 'string') {
        $wrapperElement.innerHTML = content;
    } else if (content instanceof Node) {
        $wrapperElement.appendChild(content);
    } else if (Array.isArray(content)) {
        content.forEach((item) => {
            if (typeof item === 'string') {
                $wrapperElement.insertAdjacentHTML('beforeend', item);
            } else if (item instanceof Node) {
                $wrapperElement.appendChild(item);
            }
        });
    }
    return $wrapperElement;
};

export function formatDateToKorean(dateStr) {
    const date = new Date(dateStr); // 문자열 → Date 객체로 변환

    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
    const day = date.getDate();

    const weekdayNames = [
        '일요일',
        '월요일',
        '화요일',
        '수요일',
        '목요일',
        '금요일',
        '토요일',
    ];
    const weekday = weekdayNames[date.getDay()]; // 요일 인덱스 → 한글

    return `${month}월 ${day}일 ${weekday}`;
}

export function formatAmount(value) {
    const textValue = String(value);
    return textValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
