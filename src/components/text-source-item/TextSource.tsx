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
import { DvachFilterGeneric } from '../../model/DvachFilterModel';

const TextSource: React.FunctionComponent<{
    model: TextSourceModel;
    probabilityInputVisible: boolean;
    onRemove: (model: TextSourceModel) => void;
}> = observer(({ model, probabilityInputVisible, onRemove }) => {
    const updateProbability = useCallback(
        action((event: React.ChangeEvent<HTMLInputElement>) => {
            model.setProbability(event.target.valueAsNumber);
        }),
        [ model ],
    );
    const updateText = useCallback(
        action((event: React.ChangeEvent<HTMLTextAreaElement>) => {
            model.textContent = event.target.value;
        }),
        [ model ],
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
            model.addDvachFilter(filterToAdd);
        }),
        [ model, filterToAdd ],
    );

    const removeFilter = useCallback(
        action((filter: DvachFilterGeneric) => {
            model.removeDvachFilter(filter.id);
        }),
        [ model ],
    );

    const toggleFiltersCombinators = useCallback(
        action(() => {
            const andCount = model.dvachFilters.reduce(
                (acc, filter) => acc + (filter.combinator == DvachFilterCombinator.AND ? 1 : 0),
                0,
            );
            let newCombinator =
                andCount / model.dvachFilters.length > 0.5 ?
                    DvachFilterCombinator.AND :
                    DvachFilterCombinator.OR;
            if (andCount == model.dvachFilters.length) {
                newCombinator = DvachFilterCombinator.OR;
            } else if (andCount == 0) {
                newCombinator = DvachFilterCombinator.AND;
            }

            model.dvachFilters.forEach(filter => {
                filter.combinator = newCombinator;
            });
        }),
        [ model ],
    );

    const dvachFiltersBlockRef: React.RefObject<HTMLDivElement> = useRef(null);
    useEffect(() => {
        if (dvachFiltersBlockRef.current == null) {
            return;
        }
        if (model.isDvachUrl) {
            dvachFiltersBlockRef.current.classList.remove(
                'text-source-item__dvach-search-filters-block_hidden',
            );
        } else {
            dvachFiltersBlockRef.current.classList.add(
                'text-source-item__dvach-search-filters-block_hidden',
            );
        }
    }, [ model.isDvachUrl, dvachFiltersBlockRef ]);

    const genericUrlFiltersBlockRef: React.RefObject<HTMLDivElement> = useRef(null);
    useEffect(() => {
        if (genericUrlFiltersBlockRef.current == null) {
            return;
        }
        if (model.isGenericUrl) {
            genericUrlFiltersBlockRef.current.classList.remove(
                'text-source-item__generic-url-search-filters-block_hidden',
            );
        } else {
            genericUrlFiltersBlockRef.current.classList.add(
                'text-source-item__generic-url-search-filters-block_hidden',
            );
        }
    }, [ model.isGenericUrl, genericUrlFiltersBlockRef ]);

    const probabilityBlockRef: React.RefObject<HTMLDivElement> = useRef(null);
    useEffect(() => {
        if (probabilityBlockRef.current == null) {
            return;
        }
        if (probabilityInputVisible) {
            probabilityBlockRef.current.classList.remove(
                'text-source-item__probability-block_hidden',
            );
        } else {
            probabilityBlockRef.current.classList.add('text-source-item__probability-block_hidden');
        }
    }, [ probabilityInputVisible, probabilityBlockRef ]);

    const onRemoveButtonClick = useCallback(() => {
        onRemove(model);
    }, [ onRemove, model ]);

    const textInputRef: React.RefObject<HTMLTextAreaElement> = useRef(null);
    const onTextInputClearButtonClick = useCallback(
        action(() => {
            if (textInputRef.current == null) {
                return;
            }
            model.textContent = '';
        }),
        [ model, textInputRef ],
    );

    return (
        <li className="text-source-item markov-chains-app__text-source-item">
            <textarea
                cols={80}
                rows={2}
                className="text-source-item__input-text"
                placeholder="Ссылка на источник или сам текст"
                value={model.textContent}
                onChange={updateText}
                ref={textInputRef}
            />

            <div className="text-source-item__clear-text-block">
                <button
                    className="text-source-item__clear-text-button"
                    onClick={onTextInputClearButtonClick}
                >
                    Очистить
                </button>
            </div>
            <div className="text-source-item__remove-block">
                <button className="text-source-item__remove-button" onClick={onRemoveButtonClick}>
                    Удалить
                </button>
            </div>
            <div className="text-source-item__probability-block text-source-item__probability-block_hidden" ref={probabilityBlockRef}>
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
                        value={model.probability}
                        onChange={updateProbability}
                    />
                    <label>{(Math.round(model.probability / 0.01) * 0.01).toFixed(2)}</label>
                </label>
            </div>

            <SearchOptions textSource={model} />

            <div
                className="text-source-item__dvach-search-filters-block text-source-item__dvach-search-filters-block_hidden"
                ref={dvachFiltersBlockRef}
            >
                <ul className="text-source-item__dvach-search-filters-list">
                    {model.dvachFilters.map(filter =>
                        <DvachFilter
                            filter={filter}
                            key={filter.id}
                            onFilterRemove={removeFilter}
                        />,
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
                className="text-source-item__generic-url-search-filters-block text-source-item__generic-url-search-filters-block_hidden"
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
