import './dvach-filter.pcss';

import React, { useCallback } from 'react';
import { observer } from 'mobx-react';

import {
    DvachFilterGeneric,
    DvachFilterType,
    DvachFilterModel,
    FilterTextOptionModel,
    FilterCheckboxOptionModel,
} from '@models/DvachFilterModel';
import FilterCheckboxOption from './FilterCheckboxOption';
import FilterTextOption from './FilterTextOption';
import FilterCombinator from './FilterCombinator';

const DvachFilter: React.FunctionComponent<{
    filter: DvachFilterGeneric;
    onFilterRemove: (filter: DvachFilterGeneric) => void;
    className: string | null;
}> = observer(({ filter, onFilterRemove, className }) => {
    const onRemoveButtonClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            // clicking the button tries to do business with the form somehow
            event.preventDefault();
            onFilterRemove(filter);
        },
        [ onFilterRemove, filter ],
    );

    return (
        <li className={`dvach-filter ${className ?? ''}`}>
            <form>
                {(() => {
                    switch (filter.type) {
                    case DvachFilterType.IS_THREAD_OP:
                        return (
                            <FilterCheckboxOption
                                className="dvach-filter__option-block"
                                filter={filter as DvachFilterModel<FilterCheckboxOptionModel>}
                            />
                        );
                    case DvachFilterType.NAME:
                    case DvachFilterType.TRIPCODE:
                    case DvachFilterType.POST_CONTAINS_WORDS:
                        return (
                            <FilterTextOption
                                className="dvach-filter__option-block"
                                filter={filter as DvachFilterModel<FilterTextOptionModel>}
                            />
                        );
                    default:
                        return <></>;
                    }
                })()}
                <div className="dvach-filter__remove-block">
                    <button
                        className="dvach-filter__remove-button"
                        onClick={onRemoveButtonClick}
                    >
                        Удалить фильтр
                    </button>
                </div>
                <FilterCombinator className="dvach-filter__filter-combinator" filter={filter} />
            </form>
        </li>
    );
});

export default DvachFilter;
