import './filter-checkbox-option.pcss';

import { action } from 'mobx';
import { observer } from 'mobx-react';
import React, { useCallback } from 'react';

import { DvachFilterModel, FilterCheckboxOptionModel } from '@model/DvachFilterModel';

const FilterCheckboxOption: React.FunctionComponent<{
    filter: DvachFilterModel<FilterCheckboxOptionModel>;
    className: string | null;
}> = observer(({ filter, className }) => {
    const updateIsChecked = useCallback(
        action((event: React.ChangeEvent<HTMLInputElement>) => {
            filter.parameter.checked = event.target.checked;
        }),
        [ filter.parameter ],
    );

    return (
        <div className={`filter-checkbox-option ${className ?? ''}`}>
            <label className="filter-checkbox-option__label">
                <span className="filter-checkbox-option__label-text">{filter.name}</span>
                <input
                    className="filter-checkbox-option__checkbox"
                    type="checkbox"
                    checked={filter.parameter.checked}
                    onChange={updateIsChecked}
                />
            </label>
        </div>
    );
});

export default FilterCheckboxOption;
