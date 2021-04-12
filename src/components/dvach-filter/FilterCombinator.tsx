import { action } from 'mobx';
import { observer } from 'mobx-react';
import React, { useCallback, useRef } from 'react';

import { DvachFilterCombinator, DvachFilterGeneric } from '@model/DvachFilterModel';

const FilterCombinator: React.FunctionComponent<{
    filter: DvachFilterGeneric;
}> = observer(props => {
    const { filter } = props;

    const andCombinatorRef: React.RefObject<HTMLInputElement> = useRef(null);
    const orCombinatorRef: React.RefObject<HTMLInputElement> = useRef(null);
    const updateCombinator = useCallback(
        action((event: React.ChangeEvent<HTMLInputElement>) => {
            if (!event.target.checked) {
                return;
            }
            if (event.target == andCombinatorRef.current) {
                filter.combinator = DvachFilterCombinator.AND;
            } else if (event.target == orCombinatorRef.current) {
                filter.combinator = DvachFilterCombinator.OR;
            }
        }),
        [ filter ],
    );

    return (
        <div className="dvach-search-filter__combinator-block">
            <label className="dvach-search-filter__combinator-label">
                <input
                    type="radio"
                    name="dvach-search-filter-combinator"
                    className="dvach-search-filter__combinator-input"
                    checked={filter.combinator == DvachFilterCombinator.AND}
                    onChange={updateCombinator}
                    ref={andCombinatorRef}
                />
                <span className="dvach-search-filter__combinator-label-text">И</span>
            </label>
            <label className="dvach-search-filter__combinator-label">
                <input
                    type="radio"
                    name="dvach-search-filter-combinator"
                    className="dvach-search-filter__combinator-input"
                    checked={filter.combinator == DvachFilterCombinator.OR}
                    onChange={updateCombinator}
                    ref={orCombinatorRef}
                />
                <span className="dvach-search-filter__combinator-label-text">ИЛИ</span>
            </label>
        </div>
    );
});

export default FilterCombinator;
