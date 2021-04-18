import './generic-url-filters-block.pcss';

import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';

import { TextSourceModel } from '@model/TextSourceModel';

const GenericUrlFiltersBlock: React.FunctionComponent<{
    className: string | null;
    textSourceModel: TextSourceModel;
}> = observer(({ className, textSourceModel }) => {
    const genericUrlFiltersBlockRef: React.RefObject<HTMLDivElement> = useRef(null);
    useEffect(() => {
        if (genericUrlFiltersBlockRef.current == null) {
            return;
        }
        if (textSourceModel.isGenericUrl) {
            genericUrlFiltersBlockRef.current.classList.remove(
                'generic-url-filters-block_hidden',
            );
        } else {
            genericUrlFiltersBlockRef.current.classList.add(
                'generic-url-filters-block_hidden',
            );
        }
    }, [ textSourceModel.isGenericUrl, genericUrlFiltersBlockRef.current ]);

    return (
        <div
            className={`generic-url-filters-block generic-url-filters-block_hidden ${className ?? ''}`}
            ref={genericUrlFiltersBlockRef}
        >
            <label className="generic-url-filters-block__label">
                <span className="generic-url-filters-block__label-text">
                        Селектор для блока с текстом
                </span>
                <input
                    className="generic-url-filters-block__input"
                    type="text"
                />
            </label>
        </div>
    );
});

export default GenericUrlFiltersBlock;
