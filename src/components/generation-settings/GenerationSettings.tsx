import './generation-settings.pcss';

import React from 'react';

const GenerationSettings: React.FunctionComponent = () =>
    <div className="markov-chains-app__generation-settings-block">
        <div className="markov-chains-app__generation-strategy-block">
            <label className="markov-chains-app__generation-strategy-label">
                <input
                    name="generation-strategy"
                    type="radio"
                    className="markov-chains-app__generation-strategy-input"
                    defaultChecked
                />
                <span className="markov-chains-app__generation-strategy-name">По словам</span>
            </label>
            <label className="markov-chains-app__generation-strategy-label">
                <input
                    name="generation-strategy"
                    type="radio"
                    className="markov-chains-app__generation-strategy-input"
                />
                <span className="markov-chains-app__generation-strategy-name">По частям речи</span>
            </label>
            <label className="markov-chains-app__generation-strategy-label">
                <input
                    name="generation-strategy"
                    type="radio"
                    className="markov-chains-app__generation-strategy-input"
                />
                <span className="markov-chains-app__generation-strategy-name">По N-граммам</span>
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
                <option className="markov-chains-app__output-size-unit-option">слов</option>
                <option className="markov-chains-app__output-size-unit-option">символов</option>
            </select>
        </div>
    </div>;

export default GenerationSettings;
