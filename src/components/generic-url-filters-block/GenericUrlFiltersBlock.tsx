import './generic-url-filters-block.pcss';

import React, { useRef } from 'react';
import { observer } from 'mobx-react';

import { TextSourceModel } from '@model/TextSourceModel';
import useHide from '@components/util/useHide';

const GenericUrlFiltersBlock: React.FunctionComponent<{
    className: string | null;
    textSourceModel: TextSourceModel;
}> = observer(({ className, textSourceModel }) => {
    const genericUrlFiltersBlockRef: React.RefObject<HTMLDivElement> = useRef(null);
    useHide(
        genericUrlFiltersBlockRef,
        'generic-url-filters-block',
        () => !textSourceModel.isGenericUrl,
        [ textSourceModel.isGenericUrl ],
    );

    return (
        <div
            className={`generic-url-filters-block generic-url-filters-block_hidden ${
                className ?? ''
            }`}
            ref={genericUrlFiltersBlockRef}
        >
            <label className="generic-url-filters-block__label">
                <span className="generic-url-filters-block__label-text">
                    Селектор для блока с текстом
                </span>
                <input className="generic-url-filters-block__input" type="text" />
            </label>
        </div>
    );
});

export default GenericUrlFiltersBlock;
