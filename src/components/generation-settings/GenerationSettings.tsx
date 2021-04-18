import './generation-settings.pcss';

import React, { useCallback, useRef, useContext } from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';

import TextLengthInput from '@components/text-length-input/TextLengthInput';
import {
    GenerationStrategy,
    mapGenerationStrategyToHumanName,
    mapGenerationStrategyToHtmlValue,
    mapHtmlValueToGenerationStrategy,
} from '@model/AppModel';
import { AppContext } from '@components/markov-chains-app/MarkovChainsApp';
import useHide from '@components/util/useHide';

const GenerationSettings: React.FunctionComponent<{
    className: string | null;
}> = observer(({ className }) => {
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

    useHide(
        nGramSizeBlockRef,
        'generation-settings__n-gram-size-block',
        () => appModel.generationStrategy != GenerationStrategy.BY_N_GRAMMS,
        [ appModel.generationStrategy ],
    );

    return (
        <section className={`generation-settings ${className ?? ''}`}>
            <h2 className="generation-settings__heading">Настройки генерации</h2>
            <div className="generation-settings__main-block">
                <div className="generation-settings__strategy-selection-block">
                    {appModel.generationStrategiesList.map((strategy, index) =>
                        <label className="generation-settings__strategy-label" key={index}>
                            <input
                                className="generation-settings__strategy-input"
                                name="generation-strategy"
                                type="radio"
                                value={mapGenerationStrategyToHtmlValue(strategy)}
                                checked={appModel.generationStrategy == strategy}
                                onChange={onGenerationStrategyChange}
                            />
                            <span className="generation-settings__strategy-label-text">
                                {mapGenerationStrategyToHumanName(strategy)}
                            </span>
                        </label>,
                    )}
                </div>
                <div
                    className="generation-settings__n-gram-size-block generation-settings__n-gram-size-block_hidden"
                    ref={nGramSizeBlockRef}
                >
                    <label className="generation-settings__n-gram-size-label">
                        <span className="generation-settings__n-gram-size-label-text">
                            Размер N-грамм (в символах)
                        </span>
                        <input
                            type="number"
                            className="generation-settings__n-gram-size-input"
                            min={1}
                            value={appModel.nGrammsSize}
                            onChange={onNGrammsSizeChange}
                        />
                    </label>
                </div>
                <TextLengthInput
                    className="generation-settings__text-length-input"
                    model={appModel.generatedTextLengthInputModel}
                    unitsOptions={appModel.availableTextLengthUnits}
                />
            </div>
        </section>
    );
});

export default GenerationSettings;
