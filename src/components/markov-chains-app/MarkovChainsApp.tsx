import './markov-chains-app.pcss';

import React from 'react';

const MarkovChainsApp: React.FunctionComponent = () =>
    <React.Fragment>
        <header className="markov-chains-app__header">
            <h1 className="markov-chains-app__heading">Цепи Маркова</h1>
        </header>

        <main className="markov-chains-app__main-content">
            <div className="markov-chains-app__generated-text-block">
                *Сгенерированный текст*
            </div>

            <section className="markov-chains-app__main-controls-section">
                <h2 className="markov-chains-app__main-controls-heading">Настройки генерации</h2>
                <div className="markov-chains-app__generate-text-block">
                    <button className="markov-chains-app__generate-text-button">
                        Сгенерировать текст
                    </button>
                </div>
                <div className="markov-chains-app__generation-settings-block">
                    <div className="markov-chains-app__generation-strategy-block">
                        <label className="markov-chains-app__generation-strategy-label">
                            <input
                                name="generation-strategy"
                                type="radio"
                                className="markov-chains-app__generation-strategy-input"
                                defaultChecked
                            />
                            <span className="markov-chains-app__generation-strategy-name">
                                По словам
                            </span>
                        </label>
                        <label className="markov-chains-app__generation-strategy-label">
                            <input
                                name="generation-strategy"
                                type="radio"
                                className="markov-chains-app__generation-strategy-input"
                            />
                            <span className="markov-chains-app__generation-strategy-name">
                                По частям речи
                            </span>
                        </label>
                        <label className="markov-chains-app__generation-strategy-label">
                            <input
                                name="generation-strategy"
                                type="radio"
                                className="markov-chains-app__generation-strategy-input"
                            />
                            <span className="markov-chains-app__generation-strategy-name">
                                По N-граммам
                            </span>
                        </label>
                    </div>
                    <div className="markov-chains-app__n-gram-size-block">
                        <label className="markov-chains-app__n-gram-size-label">
                            <span className="markov-chains-app__n-gram-size-label-text">
                                Размер N-грамм (в символах)
                            </span>
                            <input
                                type="number"
                                className="markov-chains-app__n-gram-size-input"
                                min={1}
                                defaultValue={1}
                            />
                        </label>
                    </div>
                    <div className="markov-chains-app__output-size-block">
                        <label className="markov-chains-app__output-size-label">
                            <span className="markov-chains-app__output-size-label-text">
                                Размер выходного текста
                            </span>
                            <input
                                type="text"
                                className="markov-chains-app__output-size-input"
                                placeholder="200"
                            />
                        </label>
                        <select className="markov-chains-app__output-size-units-select">
                            <option className="markov-chains-app__output-size-unit-option">
                                слов
                            </option>
                            <option className="markov-chains-app__output-size-unit-option">
                                символов
                            </option>
                        </select>
                    </div>
                </div>
            </section>

            <section className="markov-chains-app__text-sources-section">
                <h2 className="markov-chains-app__text-sources-heading">Список источников</h2>
                <ul className="markov-chains-app__text-sources-list">
                    <li className="text-source-item markov-chains-app__text-source-item">
                        <textarea
                            cols={80}
                            rows={2}
                            className="text-source-item__input-text"
                            placeholder="Ссылка на источник или сам текст"
                            defaultValue={''}
                        />
                        <div className="text-source-item__clear-text-block">
                            <button className="text-source-item__clear-text-button">
                                Очистить
                            </button>
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
                        <div className="search-options text-source-item__search-options">
                            <div className="search-options__is-dvach-url-block">
                                <label className="search-options__is-dvach-url-label">
                                    <input
                                        type="checkbox"
                                        className="search-options__is-dvach-url-checkbox"
                                    />
                                    <span className="search-options__is-dvach-url-label-text">
                                        Ссылка на двач
                                    </span>
                                </label>
                            </div>
                            <div className="search-options__is-generic-url-block">
                                <label className="search-options__is-generic-url-label">
                                    <input
                                        type="checkbox"
                                        className="search-options__is-generic-url-checkbox"
                                    />
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
                                    <option className="search-options__text-source-max-length-unit-option">
                                        слов
                                    </option>
                                    <option className="search-options__text-source-max-length-unit-option">
                                        символов
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="text-source-item__dvach-search-filters-block">
                            <ul className="text-source-item__dvach-search-filters-list">
                                <li className="dvach-search-filter text-source-item__dvach-search-filter">
                                    <form>
                                        <div className="dvach-search-filter__options-block">
                                            <label className="dvach-search-filter__text-input-label">
                                                <span className="dvach-search-filter__name-label-text">
                                                    Имя
                                                </span>
                                                <input
                                                    className="dvach-search-filter__text-input"
                                                    type="text"
                                                />
                                            </label>
                                            <label className="dvach-search-filter__use-regexp-label">
                                                <input
                                                    className="dvach-search-filter__use-regexp-checkbox"
                                                    type="checkbox"
                                                />
                                                <span className="dvach-search-filter__use-regexp-label-text">
                                                    Regex
                                                </span>
                                            </label>
                                            <label className="dvach-search-filter__negate-label">
                                                <input
                                                    className="dvach-search-filter__negate-checkbox"
                                                    type="checkbox"
                                                />
                                                <span className="dvach-search-filter__negate-label-text">
                                                    Отрицание
                                                </span>
                                            </label>
                                        </div>
                                        <div className="dvach-search-filter__combinator-block">
                                            <label className="dvach-search-filter__combinator-label">
                                                <input
                                                    type="radio"
                                                    name="dvach-search-filter-combinator"
                                                    className="dvach-search-filter__combinator-input"
                                                    defaultChecked
                                                />
                                                <span className="dvach-search-filter__combinator-label-text">
                                                    И
                                                </span>
                                            </label>
                                            <label className="dvach-search-filter__combinator-label">
                                                <input
                                                    type="radio"
                                                    name="dvach-search-filter-combinator"
                                                    className="dvach-search-filter__combinator-input"
                                                />
                                                <span className="dvach-search-filter__combinator-label-text">
                                                    ИЛИ
                                                </span>
                                            </label>
                                        </div>
                                    </form>
                                </li>
                                <li className="dvach-search-filter text-source-item__dvach-search-filter">
                                    <form>
                                        <div className="dvach-search-filter__options-block">
                                            <label className="dvach-search-filter__text-input-label">
                                                <span className="dvach-search-filter__name-label-text">
                                                    Трипкод
                                                </span>
                                                <input
                                                    className="dvach-search-filter__text-input"
                                                    type="text"
                                                />
                                            </label>
                                            <label className="dvach-search-filter__use-regexp-label">
                                                <input
                                                    className="dvach-search-filter__use-regexp-checkbox"
                                                    type="checkbox"
                                                />
                                                <span className="dvach-search-filter__use-regexp-label-text">
                                                    Regex
                                                </span>
                                            </label>
                                            <label className="dvach-search-filter__negate-label">
                                                <input
                                                    className="dvach-search-filter__negate-checkbox"
                                                    type="checkbox"
                                                />
                                                <span className="dvach-search-filter__negate-label-text">
                                                    Отрицание
                                                </span>
                                            </label>
                                        </div>
                                        <div className="dvach-search-filter__combinator-block">
                                            <label className="dvach-search-filter__combinator-label">
                                                <input
                                                    type="radio"
                                                    name="dvach-search-filter-combinator"
                                                    className="dvach-search-filter__combinator-input"
                                                    defaultChecked
                                                />
                                                <span className="dvach-search-filter__combinator-label-text">
                                                    И
                                                </span>
                                            </label>
                                            <label className="dvach-search-filter__combinator-label">
                                                <input
                                                    type="radio"
                                                    name="dvach-search-filter-combinator"
                                                    className="dvach-search-filter__combinator-input"
                                                />
                                                <span className="dvach-search-filter__combinator-label-text">
                                                    ИЛИ
                                                </span>
                                            </label>
                                        </div>
                                    </form>
                                </li>
                                <li className="dvach-search-filter text-source-item__dvach-search-filter">
                                    <form>
                                        <div className="dvach-search-filter__options-block">
                                            <label className="dvach-search-filter__checkbox-input-label">
                                                <span className="dvach-search-filter__name-label-text">
                                                    Является ОПом
                                                </span>
                                                <input
                                                    className="dvach-search-filter__checkbox-input"
                                                    type="checkbox"
                                                />
                                            </label>
                                        </div>
                                        <div className="dvach-search-filter__combinator-block">
                                            <label className="dvach-search-filter__combinator-label">
                                                <input
                                                    type="radio"
                                                    name="dvach-search-filter-combinator"
                                                    className="dvach-search-filter__combinator-input"
                                                    defaultChecked
                                                />
                                                <span className="dvach-search-filter__combinator-label-text">
                                                    И
                                                </span>
                                            </label>
                                            <label className="dvach-search-filter__combinator-label">
                                                <input
                                                    type="radio"
                                                    name="dvach-search-filter-combinator"
                                                    className="dvach-search-filter__combinator-input"
                                                />
                                                <span className="dvach-search-filter__combinator-label-text">
                                                    ИЛИ
                                                </span>
                                            </label>
                                        </div>
                                    </form>
                                </li>
                                <li className="dvach-search-filter text-source-item__dvach-search-filter">
                                    <form>
                                        <div className="dvach-search-filter__options-block">
                                            <label className="dvach-search-filter__text-input-label">
                                                <span className="dvach-search-filter__name-label-text">
                                                    Содержит слова
                                                </span>
                                                <input
                                                    className="dvach-search-filter__text-input"
                                                    type="text"
                                                />
                                            </label>
                                            <label className="dvach-search-filter__use-regexp-label">
                                                <input
                                                    className="dvach-search-filter__use-regexp-checkbox"
                                                    type="checkbox"
                                                />
                                                <span className="dvach-search-filter__use-regexp-label-text">
                                                    Regex
                                                </span>
                                            </label>
                                            <label className="dvach-search-filter__negate-label">
                                                <input
                                                    className="dvach-search-filter__negate-checkbox"
                                                    type="checkbox"
                                                />
                                                <span className="dvach-search-filter__negate-label-text">
                                                    Отрицание
                                                </span>
                                            </label>
                                        </div>
                                        <div className="dvach-search-filter__combinator-block">
                                            <label className="dvach-search-filter__combinator-label">
                                                <input
                                                    type="radio"
                                                    name="dvach-search-filter-combinator"
                                                    className="dvach-search-filter__combinator-input"
                                                    defaultChecked
                                                />
                                                <span className="dvach-search-filter__combinator-label-text">
                                                    И
                                                </span>
                                            </label>
                                            <label className="dvach-search-filter__combinator-label">
                                                <input
                                                    type="radio"
                                                    name="dvach-search-filter-combinator"
                                                    className="dvach-search-filter__combinator-input"
                                                />
                                                <span className="dvach-search-filter__combinator-label-text">
                                                    ИЛИ
                                                </span>
                                            </label>
                                        </div>
                                    </form>
                                </li>
                            </ul>
                            <select className="text-source-item__dvach-filter-select">
                                <option className="text-source-item__dvach-filter-option">
                                    Имя
                                </option>
                                <option className="text-source-item__dvach-filter-option">
                                    Трипкод
                                </option>
                                <option className="text-source-item__dvach-filter-option">
                                    ОП треда
                                </option>
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
                                    Соответствие по всем фильтрам / Соответствие хотя бы по одному
                                    фильтру
                                </button>
                            </div>
                        </div>
                        <div className="text-source-item__generic-url-search-filters-block">
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
                </ul>
                <div className="markov-chains-app__add-new-text-source">
                    <button className="markov-chains-app__add-new-text-source-button">
                        Добавить источник
                    </button>
                </div>
            </section>
        </main>

        <footer className="markov-chains-app__footer">
            <div className="markov-chains-app__help-block">
                Какая-то информация в футере, не знаю.
            </div>
        </footer>
    </React.Fragment>;

export default MarkovChainsApp;
