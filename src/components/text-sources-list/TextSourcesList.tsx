import React, { useCallback, useRef, useEffect } from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';

import TextSource from '@components/text-source/TextSource';
import { TextSourcesListModel } from '@model/TextSourcesListModel';
import { TextSourceModel } from '@model/TextSourceModel';

const TextSourcesList: React.FunctionComponent<{
    model: TextSourcesListModel;
}> = observer(({ model }) => {
    const onAddNewSourceButtonClick = useCallback(
        action(() => {
            model.addNewTextSource();
        }),
        [ model ],
    );
    const onRemoveSourceButtonClick = useCallback(
        action((textSourceModel: TextSourceModel) => {
            model.removeTextSource(textSourceModel.id);
        }),
        [ model ],
    );
    const onEvenProbabilitiesButtonClick = useCallback(
        action(() => {
            model.evenProbabilities();
        }),
        [ model ],
    );

    const evenProbabilitiesBlockRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (evenProbabilitiesBlockRef.current == null) {
            return;
        }
        const element = evenProbabilitiesBlockRef.current;
        if (model.textSources.length > 1) {
            element.classList.remove('markov-chains-app__even-text-sources-probabilities_hidden');
        } else {
            element.classList.add('markov-chains-app__even-text-sources-probabilities_hidden');
        }
    }, [ evenProbabilitiesBlockRef.current, model.textSources.length ]);

    return (
        <section className="markov-chains-app__text-sources-section">
            <h2 className="markov-chains-app__text-sources-heading">Список источников</h2>
            <ul className="markov-chains-app__text-sources-list">
                {model.textSources.map(textSourceModel =>
                    <TextSource
                        model={textSourceModel}
                        probabilityInputVisible={model.textSources.length > 1}
                        key={textSourceModel.id}
                        onRemove={onRemoveSourceButtonClick}
                    />,
                )}
            </ul>
            <div
                className="markov-chains-app__even-text-sources-probabilities markov-chains-app__even-text-sources-probabilities_hidden"
                ref={evenProbabilitiesBlockRef}
            >
                <button
                    className="markov-chains-app__event-text-sources-probabilities-button"
                    onClick={onEvenProbabilitiesButtonClick}
                >
                    Выровнять вероятности источников
                </button>
            </div>
            <div className="markov-chains-app__add-new-text-source">
                <button
                    className="markov-chains-app__add-new-text-source-button"
                    onClick={onAddNewSourceButtonClick}
                >
                    Добавить источник
                </button>
            </div>
        </section>
    );
});

export default TextSourcesList;
