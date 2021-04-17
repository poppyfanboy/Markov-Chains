import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';

import { TextSourceModel } from '@model/TextSourceModel';

const GenericUrlFiltersBlock: React.FunctionComponent<{
    textSourceModel: TextSourceModel;
}> = observer(({ textSourceModel }) => {
    const genericUrlFiltersBlockRef: React.RefObject<HTMLDivElement> = useRef(null);
    useEffect(() => {
        if (genericUrlFiltersBlockRef.current == null) {
            return;
        }
        if (textSourceModel.isGenericUrl) {
            genericUrlFiltersBlockRef.current.classList.remove(
                'text-source-item__generic-url-search-filters-block_hidden',
            );
        } else {
            genericUrlFiltersBlockRef.current.classList.add(
                'text-source-item__generic-url-search-filters-block_hidden',
            );
        }
    }, [ textSourceModel.isGenericUrl, genericUrlFiltersBlockRef.current ]);

    return (
        <div
            className="text-source-item__generic-url-search-filters-block text-source-item__generic-url-search-filters-block_hidden"
            ref={genericUrlFiltersBlockRef}
        >
            <label className="text-source-item__generic-url-query-selector-label">
                <span className="text-source-item__generic-url-query-selector-label-text">
                        Селектор для блока с текстом
                </span>
                <input
                    className="text-source-item__generic-url-query-selector-input"
                    type="text"
                />
            </label>
        </div>
    );
});

export default GenericUrlFiltersBlock;
