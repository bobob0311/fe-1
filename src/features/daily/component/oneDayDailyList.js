import createDaily from './daily.js';
import { createElement } from '../../../utils.js';

export default function createOneDayList(oneDayInfo, selectedId) {
    const $ol = createElement('ol', {
        class: 'daliy-line-wrapper',
    });

    let instanceMap = new Map();
    let currentSelectedId = selectedId ?? null;

    function mountList(items, newSelectedId) {
        $ol.replaceChildren();
        instanceMap = new Map();
        currentSelectedId = newSelectedId ?? null;

        items.forEach((info) => {
            const { element, update } = createDaily(info, currentSelectedId);
            $ol.appendChild(element);
            instanceMap.set(String(info.id), update);
        });
    }

    mountList(oneDayInfo.items, selectedId);

    function handleDailyUpdate({ newDailyInfo }) {
        if (!newDailyInfo) return;

        const updateFn = instanceMap.get(String(newDailyInfo.id));
        if (!updateFn) return;
        updateFn('daily-update', { newDailyInfo });
    }

    function handleDailyListUpdate({ newDailyInfos }) {
        if (!newDailyInfos) return;
        mountList(newDailyInfos.items, null);
    }

    function handleSelectedUpdate({ newSelectedId }) {
        const prevId =
            currentSelectedId != null ? String(currentSelectedId) : null;
        const nextId = newSelectedId != null ? String(newSelectedId) : null;

        if (prevId && nextId && prevId === nextId) {
            instanceMap.get(prevId)?.('selected-update', {
                newSelectedId: null,
            });

            currentSelectedId = null;
            return;
        }

        if (prevId) {
            instanceMap.get(prevId)?.('selected-update', {
                newSelectedId: null,
            });
        }

        if (nextId) {
            instanceMap.get(nextId)?.('selected-update', { newSelectedId });
            currentSelectedId = newSelectedId;
        } else {
            currentSelectedId = null;
        }
    }

    const handlers = {
        'daily-update': handleDailyUpdate,
        'daily-list-update': handleDailyListUpdate,
        'selected-update': handleSelectedUpdate,
    };

    function update(type, state) {
        handlers[type]?.(state);
    }

    return { element: $ol, update };
}
