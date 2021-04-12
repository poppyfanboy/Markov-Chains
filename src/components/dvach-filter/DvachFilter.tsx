import './dvach-search-filter.pcss';

import React from 'react';
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
}> = observer(props =>
    <li className="dvach-search-filter text-source-item__dvach-search-filter">
        <form>
            {props.filter.type == DvachFilterType.IS_THREAD_OP ?
                <FilterCheckboxOption
                    filter={props.filter as DvachFilterModel<FilterCheckboxOptionModel>}
                /> :
                <FilterTextOption
                    filter={props.filter as DvachFilterModel<FilterTextOptionModel>}
                />
            }
            <FilterCombinator filter={props.filter} />
        </form>
    </li>,
);

export default DvachFilter;
