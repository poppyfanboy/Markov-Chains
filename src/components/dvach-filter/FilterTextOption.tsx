import './filter-text-option.pcss';

import { action } from 'mobx';
import { observer } from 'mobx-react';
import React, { useCallback } from 'react';

import { DvachFilterModel, FilterTextOptionModel } from '@model/DvachFilterModel';

const FilterTextOption: React.FunctionComponent<{
    className: string | null;
    filter: DvachFilterModel<FilterTextOptionModel>;
}> = observer(({ className, filter }) => {
    const updateText = useCallback(
        action((event: React.ChangeEvent<HTMLInputElement>) => {
            filter.parameter.text = event.target.value;
        }),
        [ filter.parameter ],
    );
    const updateIsRegex = useCallback(
        action((event: React.ChangeEvent<HTMLInputElement>) => {
            filter.parameter.isRegex = event.target.checked;
        }),
        [ filter.parameter ],
    );
    const updateIsNegated = useCallback(
        action((event: React.ChangeEvent<HTMLInputElement>) => {
            filter.parameter.isNegated = event.target.checked;
        }),
        [ filter.parameter ],
    );

    return (
        <div className={`filter-text-option ${className ?? ''}`}>
            <label className="filter-text-option__text-input-label">
                <span className="filter-text-option__text-input-label-text">{filter.name}</span>
                <input
                    className="filter-text-option__text-input"
                    type="text"
                    value={filter.parameter.text}
                    onInput={updateText}
                />
            </label>
            <label className="filter-text-option__use-regex-label">
                <input
                    className="filter-text-option__use-regex-checkbox"
                    type="checkbox"
                    checked={filter.parameter.isRegex}
                    onChange={updateIsRegex}
                />
                <span className="filter-text-option__use-regex-label-text">Regex</span>
            </label>
            <label className="filter-text-option__negate-label">
                <input
                    className="filter-text-option__negate-checkbox"
                    type="checkbox"
                    checked={filter.parameter.isNegated}
                    onChange={updateIsNegated}
                />
                <span className="filter-text-option__negate-label-text">Отрицание</span>
            </label>
        </div>
    );
});

export default FilterTextOption;
