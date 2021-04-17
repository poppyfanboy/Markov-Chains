import React, { useCallback, useRef, useEffect, useContext } from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';

import TextLengthInput from '@components/text-length-input/TextLengthInput';
import { GenerationStrategy } from '../../model/AppModel';
import {
    mapGenerationStrategyToHumanName,
    mapGenerationStrategyToHtmlValue,
    mapHtmlValueToGenerationStrategy,
} from '@model/AppModel';
import { AppContext } from '@components/markov-chains-app/MarkovChainsApp';

const GenerationSettings: React.FunctionComponent = observer(() => {
    const appModel = useContext(AppContext);
    if (appModel == null) {
        return <></>;
    }

    const nGramSizeBlockRef: React.RefObject<HTMLDivElement> = useRef(null);

    const onGenerationStrategyChange = useCallback(
        action((event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.checked) {
                appModel.setGenerationStrategy(
                    mapHtmlValueToGenerationStrategy(event.target.value),
                );
            }
        }),
        [ appModel ],
    );
    const onNGrammsSizeChange = useCallback(
        action((event: React.ChangeEvent<HTMLInputElement>) => {
            appModel.setNGrammsSize(event.target.valueAsNumber || 1);
        }),
        [ appModel.setNGrammsSize ],
    );

    useEffect(() => {
        if (nGramSizeBlockRef.current == null) {
            return;
        }
        if (appModel.generationStrategy == GenerationStrategy.BY_N_GRAMMS) {
            nGramSizeBlockRef.current.classList.remove(
                'markov-chains-app__n-gram-size-block_hidden',
            );
        } else {
            nGramSizeBlockRef.current.classList.add('markov-chains-app__n-gram-size-block_hidden');
        }
    }, [ nGramSizeBlockRef.current, appModel.generationStrategy ]);

    return (
        <section className="markov-chains-app__main-controls-section">
            <h2 className="markov-chains-app__main-controls-heading">Настройки генерации</h2>
            <div className="markov-chains-app__generation-settings-block">
                <div className="markov-chains-app__generation-strategy-block">
                    {appModel.generationStrategiesList.map((strategy, index) =>
                        <label className="markov-chains-app__generation-strategy-label" key={index}>
                            <input
                                name="generation-strategy"
                                type="radio"
                                className="markov-chains-app__generation-strategy-input"
                                value={mapGenerationStrategyToHtmlValue(strategy)}
                                checked={appModel.generationStrategy == strategy}
                                onChange={onGenerationStrategyChange}
                            />
                            <span className="markov-chains-app__generation-strategy-name">
                                {mapGenerationStrategyToHumanName(strategy)}
                            </span>
                        </label>,
                    )}
                </div>
                <div
                    className="markov-chains-app__n-gram-size-block markov-chains-app__n-gram-size-block_hidden"
                    ref={nGramSizeBlockRef}
                >
                    <label className="markov-chains-app__n-gram-size-label">
                        <span className="markov-chains-app__n-gram-size-label-text">
                            Размер N-грамм (в символах)
                        </span>
                        <input
                            type="number"
                            className="markov-chains-app__n-gram-size-input"
                            min={1}
                            value={appModel.nGrammsSize}
                            onChange={onNGrammsSizeChange}
                        />
                    </label>
                </div>
                <TextLengthInput
                    className="markov-chains-app__output-size-block"
                    model={appModel.generatedTextLengthInputModel}
                    unitsOptions={appModel.availableTextLengthUnits}
                />
            </div>
        </section>
    );
});

export default GenerationSettings;
