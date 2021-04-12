import './text-source-item.pcss';

import React, { useCallback, useRef, useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';

import SearchOptions from '@components/search-options/SearchOptions';
import { TextSourceModel } from '@model/TextSourceModel';
import {
    DvachFilterCombinator,
    DvachFilterType,
    mapFilterTypeToHtmlValue,
    mapHtmlValueToFilterType,
} from '@model/DvachFilterModel';
import DvachFilter from '@components/dvach-filter/DvachFilter';

const TextSource: React.FunctionComponent<{
    textSource: TextSourceModel;
}> = observer(props => {
    const { textSource } = props;

    const updateProbability = useCallback(
        action((event: React.ChangeEvent<HTMLInputElement>) => {
            textSource.setProbability(event.target.valueAsNumber);
        }),
        [ textSource ],
    );
    const updateText = useCallback(
        action((event: React.ChangeEvent<HTMLTextAreaElement>) => {
            textSource.textContent = event.target.value;
        }),
        [ textSource ],
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
            textSource.addDvachFilter(filterToAdd);
        }),
        [ textSource, filterToAdd ],
    );

    const toggleFiltersCombinators = useCallback(
        action(() => {
            const andCount = textSource.dvachFilters.reduce(
                (acc, filter) => acc + (filter.combinator == DvachFilterCombinator.AND ? 1 : 0),
                0,
            );
            let newCombinator =
                andCount / textSource.dvachFilters.length > 0.5 ?
                    DvachFilterCombinator.AND :
                    DvachFilterCombinator.OR;
            if (andCount == textSource.dvachFilters.length) {
                newCombinator = DvachFilterCombinator.OR;
            } else if (andCount == 0) {
                newCombinator = DvachFilterCombinator.AND;
            }

            textSource.dvachFilters.forEach(filter => {
                filter.combinator = newCombinator;
            });
        }),
        [ textSource ],
    );

    const dvachFiltersBlockRef: React.RefObject<HTMLDivElement> = useRef(null);
    useEffect(() => {
        if (dvachFiltersBlockRef.current == null) {
            return;
        }
        if (textSource.isDvachUrl) {
            dvachFiltersBlockRef.current.classList.remove(
                'text-source-item__dvach-search-filters-block_hidden',
            );
        } else {
            dvachFiltersBlockRef.current.classList.add(
                'text-source-item__dvach-search-filters-block_hidden',
            );
        }
    }, [ textSource.isDvachUrl, dvachFiltersBlockRef ]);

    const genericUrlFiltersBlockRef: React.RefObject<HTMLDivElement> = useRef(null);
    useEffect(() => {
        if (genericUrlFiltersBlockRef.current == null) {
            return;
        }
        if (textSource.isGenericUrl) {
            genericUrlFiltersBlockRef.current.classList.remove(
                'text-source-item__generic-url-search-filters-block_hidden',
            );
        } else {
            genericUrlFiltersBlockRef.current.classList.add(
                'text-source-item__generic-url-search-filters-block_hidden',
            );
        }
    }, [ textSource.isGenericUrl, genericUrlFiltersBlockRef ]);

    return (
        <li className="text-source-item markov-chains-app__text-source-item">
            <textarea
                cols={80}
                rows={2}
                className="text-source-item__input-text"
                placeholder="Ссылка на источник или сам текст"
                value={textSource.textContent}
                onChange={updateText}
            />

            <div className="text-source-item__clear-text-block">
                <button className="text-source-item__clear-text-button">Очистить</button>
            </div>
            <div className="text-source-item__remove-block">
                <button className="text-source-item__remove-button">Удалить</button>
            </div>
            <div className="text-source-item__probability-block">
                <label className="text-source-item__probability-input-label">
                    <span className="text-source-item__probability-input-label-text">
                        Вероятность использовать источник
                    </span>
                    <input
                        type="range"
                        className="text-source-item__probability-input"
                        min={0}
                        max={1}
                        step="0.01"
                        value={textSource.probability}
                        onChange={updateProbability}
                    />
                </label>
            </div>

            <SearchOptions textSource={textSource} />

            <div
                className="text-source-item__dvach-search-filters-block"
                ref={dvachFiltersBlockRef}
            >
                <ul className="text-source-item__dvach-search-filters-list">
                    {textSource.dvachFilters.map(filter =>
                        <DvachFilter filter={filter} key={filter.id} />,
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
                    <option
                        className="text-source-item__dvach-filter-option"
                        value="contains-words"
                    >
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
                <div className="text-source-item__switch-dvach-filters-combinators-block">
                    <button
                        className="text-source-item__switch-dvach-filters-combinators-button"
                        onClick={toggleFiltersCombinators}
                    >
                        Соответствие по всем фильтрам / Соответствие хотя бы по одному фильтру
                    </button>
                </div>
            </div>

            <div
                className="text-source-item__generic-url-search-filters-block"
                ref={genericUrlFiltersBlockRef}
            >
                <label className="text-source-item__generic-url-query-selector-label">
                    <span className="text-source-item__generic-url-query-selector-label-text">
                        Селектор для блока с текстом
                    </span>
                    <input
                        className="text-source-item__generic-url-query-selector-input"
                        type="text"
                    />
                </label>
            </div>
        </li>
    );
});

export default TextSource;
