import React from 'react';

import TextLengthInput from '@components/text-length-input/TextLengthInput';
import { TextLengthInputModel } from '@model/TextLengthInputModel';
import { TextLengthUnit } from '@model/TextLengthInputModel';

const GenerationSettings: React.FunctionComponent = () =>
    <section className="markov-chains-app__main-controls-section">
        <h2 className="markov-chains-app__main-controls-heading">Настройки генерации</h2>
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
            {/* pass app model here instead */}
            <TextLengthInput
                className="markov-chains-app__output-size-block"
                model={new TextLengthInputModel(200, TextLengthUnit.WORD)}
                unitsOptions={[ TextLengthUnit.CHAR, TextLengthUnit.WORD, TextLengthUnit.SENTENCE ]}
            />
        </div>
    </section>;

export default GenerationSettings;
