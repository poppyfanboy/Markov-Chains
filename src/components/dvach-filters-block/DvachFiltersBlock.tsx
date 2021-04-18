import './dvach-filters-block.pcss';

import React, { useCallback, useRef, useState } from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';

import DvachFilter from '@components/dvach-filter/DvachFilter';
import {
    DvachFilterCombinator,
    DvachFilterGeneric,
    DvachFilterType,
    mapFilterTypeToHtmlValue,
    mapHtmlValueToFilterType,
} from '@model/DvachFilterModel';
import { TextSourceModel } from '@model/TextSourceModel';
import useHide from '@components/util/useHide';

const DvachFiltersBlock: React.FunctionComponent<{
    className: string | null;
    textSourceModel: TextSourceModel;
}> = observer(({ className, textSourceModel }) => {
    const dvachFiltersBlockRef: React.RefObject<HTMLDivElement> = useRef(null);
    useHide(dvachFiltersBlockRef, 'dvach-filters-block', () => !textSourceModel.isDvachUrl, [
        textSourceModel.isDvachUrl,
    ]);

    const toggleCombinatorsBlockRef: React.RefObject<HTMLDivElement> = useRef(null);
    useHide(
        toggleCombinatorsBlockRef,
        'dvach-filters-block__toggle-combinators-block',
        () => textSourceModel.dvachFilters.length <= 2,
        [ textSourceModel.dvachFilters.length ],
    );

    const removeFilter = useCallback(
        action((filter: DvachFilterGeneric) => {
            textSourceModel.removeDvachFilter(filter.id);
        }),
        [ textSourceModel ],
    );

    const [ filterToAdd, setFilterToAdd ] = useState(DvachFilterType.NAME);
    const updateFilterToAdd = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            setFilterToAdd(mapHtmlValueToFilterType(event.target.value));
        },
        [ setFilterToAdd ],
    );
    const addNewFilter = useCallback(
        action(() => {
            textSourceModel.addDvachFilter(filterToAdd);
            if (textSourceModel.dvachFilters.length > 2) {
                textSourceModel.dvachFilters[textSourceModel.dvachFilters.length - 2].combinator =
                    DvachFilterCombinator.AND;
            }
        }),
        [
            textSourceModel,
            textSourceModel.dvachFilters,
            textSourceModel.dvachFilters.length,
            filterToAdd,
        ],
    );

    const toggleFiltersCombinators = useCallback(
        action(() => {
            // do not account for the last combinator
            const combinatorsCount = textSourceModel.dvachFilters.length - 1;
            let andCount = 0;
            for (let i = 0; i < combinatorsCount; i++) {
                andCount +=
                    textSourceModel.dvachFilters[i].combinator == DvachFilterCombinator.AND ? 1 : 0;
            }
            let newCombinator =
                andCount / combinatorsCount > 0.5 ?
                    DvachFilterCombinator.AND :
                    DvachFilterCombinator.OR;
            if (andCount == combinatorsCount) {
                newCombinator = DvachFilterCombinator.OR;
            } else if (andCount == 0) {
                newCombinator = DvachFilterCombinator.AND;
            }

            textSourceModel.dvachFilters.forEach(filter => {
                filter.combinator = newCombinator;
            });
        }),
        [ textSourceModel.dvachFilters ],
    );

    return (
        <div
            className={`dvach-filters-block dvach-filters-block_hidden ${className ?? ''}`}
            ref={dvachFiltersBlockRef}
        >
            <ul className="dvach-filters-block__list">
                {textSourceModel.dvachFilters.map(filter =>
                    <DvachFilter
                        filter={filter}
                        key={filter.id}
                        onFilterRemove={removeFilter}
                        className="dvach-filters-block__dvach-filter"
                    />,
                )}
            </ul>
            <select
                className="dvach-filters-block__type-select"
                value={mapFilterTypeToHtmlValue(filterToAdd)}
                onChange={updateFilterToAdd}
            >
                <option className="dvach-filters-block__type-option" value="name">
                    Имя
                </option>
                <option className="dvach-filters-block__type-option" value="tripcode">
                    Трипкод
                </option>
                <option className="dvach-filters-block__type-option" value="is-op">
                    ОП треда
                </option>
                <option className="dvach-filters-block__type-option" value="contains-words">
                    (Не) содержит слова
                </option>
            </select>
            <div className="dvach-filters-block__add-block">
                <button className="dvach-filters-block__add-button" onClick={addNewFilter}>
                    Добавить фильтр
                </button>
            </div>
            <div
                className="dvach-filters-block__toggle-combinators-block dvach-filters-block__toggle-combinators-block_hidden"
                ref={toggleCombinatorsBlockRef}
            >
                <button
                    className="dvach-filters-block__toggle-combinators-button"
                    onClick={toggleFiltersCombinators}
                >
                    Соответствие по всем фильтрам / Соответствие хотя бы по одному фильтру
                </button>
            </div>
        </div>
    );
});

export default DvachFiltersBlock;
