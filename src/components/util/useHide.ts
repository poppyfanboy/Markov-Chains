import React, { useEffect } from 'react';

export default function useHide<T extends HTMLElement>(
    refObject: React.RefObject<T>,
    className: string,
    hideCondition: () => boolean,
    deps: Object[],
): void {
    useEffect(() => {
        if (refObject.current == null) {
            return;
        }
        if (hideCondition()) {
            refObject.current.classList.add(`${className}_hidden`);
        } else {
            refObject.current.classList.remove(`${className}_hidden`);
        }
    }, [ ...deps, refObject.current, className, hideCondition ]);
}
