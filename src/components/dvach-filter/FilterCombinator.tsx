import './filter-combinator.pcss';

import { action } from 'mobx';
import { observer } from 'mobx-react';
import React, { useCallback, useRef } from 'react';

import { DvachFilterCombinator, DvachFilterGeneric } from '@model/DvachFilterModel';

const FilterCombinator: React.FunctionComponent<{
    className: string | null;
    filter: DvachFilterGeneric;
}> = observer(({ className, filter }) => {
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
        [ filter, andCombinatorRef.current, orCombinatorRef.current ],
    );

    return (
        <div className={`filter-combinator ${className ?? ''}`}>
            <label className="filter-combinator__label">
                <input
                    type="radio"
                    name="dvach-filter-combinator"
                    className="filter-combinator__radio"
                    checked={filter.combinator == DvachFilterCombinator.AND}
                    onChange={updateCombinator}
                    ref={andCombinatorRef}
                />
                <span className="filter-combinator__label-text">И</span>
            </label>
            <label className="filter-combinator__label">
                <input
                    type="radio"
                    name="dvach-filter-combinator"
                    className="filter-combinator__radio"
                    checked={filter.combinator == DvachFilterCombinator.OR}
                    onChange={updateCombinator}
                    ref={orCombinatorRef}
                />
                <span className="filter-combinator__label-text">ИЛИ</span>
            </label>
        </div>
    );
});

export default FilterCombinator;
