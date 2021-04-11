import React, { useCallback, useRef } from 'react';

import { DvachFilterCombinator } from '../../../model/DvachFilterModel';

const FilterCombinator: React.FunctionComponent<{
    combinator: DvachFilterCombinator;
    onCombinatorChange: (newValue: DvachFilterCombinator) => void;
}> = props => {
    const andCombinatorRef: React.RefObject<HTMLInputElement> = useRef(null);
    const orCombinatorRef: React.RefObject<HTMLInputElement> = useRef(null);

    const changeCombinator = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (!event.target.checked) {
                return;
            }
            if (event.target == andCombinatorRef.current) {
                props.onCombinatorChange(DvachFilterCombinator.AND);
            } else if (event.target == orCombinatorRef.current) {
                props.onCombinatorChange(DvachFilterCombinator.OR);
            }
        },
        [ props.onCombinatorChange ],
    );

    return (
        <div className="dvach-search-filter__combinator-block">
            <label className="dvach-search-filter__combinator-label">
                <input
                    type="radio"
                    name="dvach-search-filter-combinator"
                    className="dvach-search-filter__combinator-input"
                    checked={props.combinator == DvachFilterCombinator.AND}
                    onChange={changeCombinator}
                    ref={andCombinatorRef}
                />
                <span className="dvach-search-filter__combinator-label-text">И</span>
            </label>
            <label className="dvach-search-filter__combinator-label">
                <input
                    type="radio"
                    name="dvach-search-filter-combinator"
                    className="dvach-search-filter__combinator-input"
                    checked={props.combinator == DvachFilterCombinator.OR}
                    onChange={changeCombinator}
                    ref={orCombinatorRef}
                />
                <span className="dvach-search-filter__combinator-label-text">ИЛИ</span>
            </label>
        </div>
    );
};

export default FilterCombinator;
