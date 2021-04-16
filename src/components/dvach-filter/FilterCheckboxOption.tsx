import { action } from 'mobx';
import { observer } from 'mobx-react';
import React, { useCallback } from 'react';

import { DvachFilterModel, FilterCheckboxOptionModel } from '@model/DvachFilterModel';

const FilterCheckboxOption: React.FunctionComponent<{
    filter: DvachFilterModel<FilterCheckboxOptionModel>;
}> = observer(({ filter }) => {
    const updateIsChecked = useCallback(
        action((event: React.ChangeEvent<HTMLInputElement>) => {
            filter.parameter.checked = event.target.checked;
        }),
        [ filter.parameter ],
    );

    return (
        <div className="dvach-search-filter__options-block">
            <label className="dvach-search-filter__checkbox-input-label">
                <span className="dvach-search-filter__name-label-text">{filter.name}</span>
                <input
                    className="dvach-search-filter__checkbox-input"
                    type="checkbox"
                    checked={filter.parameter.checked}
                    onChange={updateIsChecked}
                />
            </label>
        </div>
    );
});

export default FilterCheckboxOption;
