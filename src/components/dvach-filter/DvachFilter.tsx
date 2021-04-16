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
    const onRemoveButtonClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            // clicking the button tries to do business with the form somehow
            event.preventDefault();
            onFilterRemove(filter);
        },
        [ onFilterRemove, filter ],
    );

    return (
        <li className="dvach-search-filter text-source-item__dvach-search-filter">
            <form>
                {(() => {
                    switch (filter.type) {
                    case DvachFilterType.IS_THREAD_OP:
                        return (
                            <FilterCheckboxOption
                                filter={filter as DvachFilterModel<FilterCheckboxOptionModel>}
                            />
                        );
                    case DvachFilterType.NAME:
                    case DvachFilterType.TRIPCODE:
                    case DvachFilterType.POST_CONTAINS_WORDS:
                        return (
                            <FilterTextOption
                                filter={filter as DvachFilterModel<FilterTextOptionModel>}
                            />
                        );
                    default:
                        return <></>;
                    }
                })()}
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
