import { action } from 'mobx';
import { observer } from 'mobx-react';
import React, { useCallback } from 'react';

import { DvachFilterModel, FilterTextOptionModel } from '../../model/DvachFilterModel';

const FilterTextOption: React.FunctionComponent<{
    filter: DvachFilterModel<FilterTextOptionModel>;
}> = observer(props => {
    const updateText = useCallback(
        action((event: React.ChangeEvent<HTMLInputElement>) => {
            props.filter.parameter.text = event.target.value;
        }),
        [ props.filter ],
    );
    const updateIsRegex = useCallback(
        action((event: React.ChangeEvent<HTMLInputElement>) => {
            props.filter.parameter.isRegex = event.target.checked;
        }),
        [ props.filter ],
    );
    const updateIsNegated = useCallback(
        action((event: React.ChangeEvent<HTMLInputElement>) => {
            props.filter.parameter.isNegated = event.target.checked;
        }),
        [ props.filter ],
    );

    return (
        <div className="dvach-search-filter__options-block">
            <label className="dvach-search-filter__text-input-label">
                <span className="dvach-search-filter__name-label-text">{props.filter.name}</span>
                <input
                    className="dvach-search-filter__text-input"
                    type="text"
                    value={props.filter.parameter.text}
                    onInput={updateText}
                />
            </label>
            <label className="dvach-search-filter__use-regexp-label">
                <input
                    className="dvach-search-filter__use-regexp-checkbox"
                    type="checkbox"
                    checked={props.filter.parameter.isRegex}
                    onChange={updateIsRegex}
                />
                <span className="dvach-search-filter__use-regexp-label-text">Regex</span>
            </label>
            <label className="dvach-search-filter__negate-label">
                <input
                    className="dvach-search-filter__negate-checkbox"
                    type="checkbox"
                    checked={props.filter.parameter.isNegated}
                    onChange={updateIsNegated}
                />
                <span className="dvach-search-filter__negate-label-text">Отрицание</span>
            </label>
        </div>
    );
});

export default FilterTextOption;