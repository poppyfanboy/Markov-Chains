import './search-options.pcss';

import React from 'react';

/**
 * Настройки, связанные с содержанием указанного источника. Сюда не входит
 * вероятность встретить источник, потому что изменив вероятность, можно
 * сгенерировать новый текст без повторного обращения к источнику.
 */
const SearchOptions: React.FunctionComponent = () =>
    <div className="search-options text-source-item__search-options">
        <div className="search-options__is-dvach-url-block">
            <label className="search-options__is-dvach-url-label">
                <input type="checkbox" className="search-options__is-dvach-url-checkbox" />
                <span className="search-options__is-dvach-url-label-text">Ссылка на двач</span>
            </label>
        </div>
        <div className="search-options__is-generic-url-block">
            <label className="search-options__is-generic-url-label">
                <input type="checkbox" className="search-options__is-generic-url-checkbox" />
                <span className="search-options__is-generic-url-label-text">
                    Произвольная ссылка
                </span>
            </label>
        </div>
        <div className="search-options__text-source-max-length-block">
            <label className="search-options__text-source-max-length-label">
                <span className="search-options__text-source-max-length-label-text">
                    Максимальная длина
                </span>
                <input
                    type="text"
                    className="search-options__text-source-max-length-input"
                    placeholder="10k"
                />
            </label>
            <select className="search-options__text-source-max-length-units-select">
                <option className="search-options__text-source-max-length-unit-option">слов</option>
                <option className="search-options__text-source-max-length-unit-option">
                    символов
                </option>
            </select>
        </div>
    </div>;

export default SearchOptions;
