import './dvach-search-filter.pcss';

import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';

import {
    DvachFilter,
    DvachFilterType,
    DvachFilterModel,
    FilterTextOptionModel,
    FilterCheckboxOptionModel,
} from '../../model/DvachFilterModel';

import FilterCheckboxOption from './filter-checkbox-option/FilterCheckboxOption';
import FilterTextOption from './filter-text-option/FilterTextOption';
import FilterCombinator from './filter-combinator/FilterCombinator';
import { DvachFilterCombinator } from '../../model/DvachFilterModel';

const DvachSearchFilter: React.FunctionComponent<{
    filter: DvachFilter;
}> = observer(props => {
    const updateCombinator = useCallback(
        action((newValue: DvachFilterCombinator) => {
            props.filter.combinator = newValue;
        }),
        [ props.filter ],
    );

    if (props.filter.type == DvachFilterType.IS_THREAD_OP) {
        const filter = props.filter as DvachFilterModel<FilterCheckboxOptionModel>;
        const updateChecked = useCallback(
            action((newValue: boolean) => {
                filter.parameter.checked = newValue;
            }),
            [ filter ],
        );

        return (
            <li className="dvach-search-filter text-source-item__dvach-search-filter">
                <form>
                    <FilterCheckboxOption
                        name={filter.name}
                        isChecked={filter.parameter.checked}
                        onIsCheckedChange={updateChecked}
                    />
                    <FilterCombinator
                        combinator={props.filter.combinator}
                        onCombinatorChange={updateCombinator}
                    />
                </form>
            </li>
        );
    }

    const filter = props.filter as DvachFilterModel<FilterTextOptionModel>;
    const updateText = useCallback(
        action((newText: string) => {
            filter.parameter.text = newText;
        }),
        [ filter ],
    );
    const updateIsRegex = useCallback(
        action((newValue: boolean) => {
            filter.parameter.isRegex = newValue;
        }),
        [ filter ],
    );
    const updateIsNegated = useCallback(
        action((newValue: boolean) => {
            filter.parameter.isNegated = newValue;
        }),
        [ filter ],
    );

    return (
        <li className="dvach-search-filter text-source-item__dvach-search-filter">
            <form>
                <FilterTextOption
                    name={filter.name}
                    text={filter.parameter.text}
                    isNegated={filter.parameter.isNegated}
                    isRegex={filter.parameter.isRegex}
                    onTextChange={updateText}
                    onIsRegexChange={updateIsRegex}
                    onIsNegatedChange={updateIsNegated}
                />
                <FilterCombinator
                    combinator={props.filter.combinator}
                    onCombinatorChange={updateCombinator}
                />
            </form>
        </li>
    );
});

export default DvachSearchFilter;
