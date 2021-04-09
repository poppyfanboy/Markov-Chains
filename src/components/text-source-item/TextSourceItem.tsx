import './text-source-item.pcss';

import React from 'react';

import SearchOptions from '../search-options/SearchOptions';
import DvachSearchFilter, { DvachSearchFilterType } from '../dvach-search-filter/DvachSearchFilter';

const TextSourceItem: React.FunctionComponent = () =>
    <li className="text-source-item markov-chains-app__text-source-item">
        <textarea
            cols={80}
            rows={2}
            className="text-source-item__input-text"
            placeholder="Ссылка на источник или сам текст"
            defaultValue={''}
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
                    step="0.05"
                    defaultValue={1}
                />
            </label>
        </div>

        <SearchOptions />

        <div className="text-source-item__dvach-search-filters-block">
            <ul className="text-source-item__dvach-search-filters-list">
                <DvachSearchFilter filterType={DvachSearchFilterType.NAME} />
                <DvachSearchFilter filterType={DvachSearchFilterType.TRIPCODE} />
                <DvachSearchFilter filterType={DvachSearchFilterType.IS_THREAD_OP} />
                <DvachSearchFilter filterType={DvachSearchFilterType.POST_CONTAINS_WORDS} />
            </ul>
            <select className="text-source-item__dvach-filter-select">
                <option className="text-source-item__dvach-filter-option">Имя</option>
                <option className="text-source-item__dvach-filter-option">Трипкод</option>
                <option className="text-source-item__dvach-filter-option">ОП треда</option>
                <option className="text-source-item__dvach-filter-option">
                    (Не) содержит слова
                </option>
            </select>
            <div className="text-source-item__add-dvach-filter-block">
                <button className="text-source-item__add-dvach-filter-button">
                    Добавить фильтр
                </button>
            </div>
            <div className="text-source-item__switch-dvach-filters-combinators-block">
                <button className="text-source-item__switch-dvach-filters-combinators-button">
                    Соответствие по всем фильтрам / Соответствие хотя бы по одному фильтру
                </button>
            </div>
        </div>
        <div className="text-source-item__generic-url-search-filters-block">
            <label className="text-source-item__generic-url-query-selector-label">
                <span className="text-source-item__generic-url-query-selector-label-text">
                    Селектор для блока с текстом
                </span>
                <input className="text-source-item__generic-url-query-selector-input" type="text" />
            </label>
        </div>
    </li>;

export default TextSourceItem;
