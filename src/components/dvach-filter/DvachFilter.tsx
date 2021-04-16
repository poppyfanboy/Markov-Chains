import './dvach-search-filter.pcss';

import React, { useCallback } from 'react';
import { observer } from 'mobx-react';

import {
    DvachFilterGeneric,
    DvachFilterType,
    DvachFilterModel,
    FilterTextOptionModel,
    FilterCheckboxOptionModel,
} from '@model/DvachFilterModel';
import FilterCheckboxOption from './FilterCheckboxOption';
import FilterTextOption from './FilterTextOption';
import FilterCombinator from './FilterCombinator';

const DvachFilter: React.FunctionComponent<{
    filter: DvachFilterGeneric;
    onFilterRemove: (filter: DvachFilterGeneric) => void;
}> = observer(({ filter, onFilterRemove }) => {
    const onRemoveButtonClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        // clicking the button tries to do business with the form somehow
        event.preventDefault();
        onFilterRemove(filter);
    }, [ onFilterRemove, filter ]);

    return (
        <li className="dvach-search-filter text-source-item__dvach-search-filter">
            <form>
                {filter.type == DvachFilterType.IS_THREAD_OP ?
                    <FilterCheckboxOption
                        filter={filter as DvachFilterModel<FilterCheckboxOptionModel>}
                    /> :
                    <FilterTextOption filter={filter as DvachFilterModel<FilterTextOptionModel>} />
                }
                <div className="dvach-search-filter-remove-block">
                    <button
                        className="dvach-search-filter-remove-button"
                        onClick={onRemoveButtonClick}
                    >
                        Удалить фильтр
                    </button>
                </div>
                <FilterCombinator filter={filter} />
            </form>
        </li>
    );
});

export default DvachFilter;
