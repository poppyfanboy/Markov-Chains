import React, { useCallback, useEffect, useRef, useState } from 'react';
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

const DvachFiltersBlock: React.FunctionComponent<{
    textSourceModel: TextSourceModel;
}> = observer(({ textSourceModel }) => {
    const dvachFiltersBlockRef: React.RefObject<HTMLDivElement> = useRef(null);
    useEffect(() => {
        if (dvachFiltersBlockRef.current == null) {
            return;
        }
        if (textSourceModel.isDvachUrl) {
            dvachFiltersBlockRef.current.classList.remove(
                'text-source-item__dvach-search-filters-block_hidden',
            );
        } else {
            dvachFiltersBlockRef.current.classList.add(
                'text-source-item__dvach-search-filters-block_hidden',
            );
        }
    }, [ textSourceModel.isDvachUrl, dvachFiltersBlockRef.current ]);

    const switchCombinatorsBlockRef: React.RefObject<HTMLDivElement> = useRef(null);
    useEffect(() => {
        if (switchCombinatorsBlockRef.current == null) {
            return;
        }
        if (textSourceModel.dvachFilters.length > 2) {
            switchCombinatorsBlockRef.current.classList.remove(
                'text-source-item__switch-dvach-filters-combinators-block_hidden',
            );
        } else {
            switchCombinatorsBlockRef.current.classList.add(
                'text-source-item__switch-dvach-filters-combinators-block_hidden',
            );
        }
    }, [ switchCombinatorsBlockRef, textSourceModel.dvachFilters.length ]);

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
            className="text-source-item__dvach-search-filters-block text-source-item__dvach-search-filters-block_hidden"
            ref={dvachFiltersBlockRef}
        >
            <ul className="text-source-item__dvach-search-filters-list">
                {textSourceModel.dvachFilters.map(filter =>
                    <DvachFilter filter={filter} key={filter.id} onFilterRemove={removeFilter} />,
                )}
            </ul>
            <select
                className="text-source-item__dvach-filter-select"
                value={mapFilterTypeToHtmlValue(filterToAdd)}
                onChange={updateFilterToAdd}
            >
                <option className="text-source-item__dvach-filter-option" value="name">
                    Имя
                </option>
                <option className="text-source-item__dvach-filter-option" value="tripcode">
                    Трипкод
                </option>
                <option className="text-source-item__dvach-filter-option" value="is-op">
                    ОП треда
                </option>
                <option className="text-source-item__dvach-filter-option" value="contains-words">
                    (Не) содержит слова
                </option>
            </select>
            <div className="text-source-item__add-dvach-filter-block">
                <button
                    className="text-source-item__add-dvach-filter-button"
                    onClick={addNewFilter}
                >
                    Добавить фильтр
                </button>
            </div>
            <div
                className="text-source-item__switch-dvach-filters-combinators-block text-source-item__switch-dvach-filters-combinators-block_hidden"
                ref={switchCombinatorsBlockRef}
            >
                <button
                    className="text-source-item__switch-dvach-filters-combinators-button"
                    onClick={toggleFiltersCombinators}
                >
                    Соответствие по всем фильтрам / Соответствие хотя бы по одному фильтру
                </button>
            </div>
        </div>
    );
});

export default DvachFiltersBlock;
