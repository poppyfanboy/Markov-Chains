import './text-sources-list.pcss';

import React, { useCallback, useRef } from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';

import TextSource from '@components/text-source/TextSource';
import { TextSourcesListModel } from '@model/TextSourcesListModel';
import { TextSourceModel } from '@model/TextSourceModel';
import useHide from '@components/util/useHide';

const TextSourcesList: React.FunctionComponent<{
    className: string | null;
    model: TextSourcesListModel;
}> = observer(({ className, model }) => {
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
    useHide(
        evenProbabilitiesBlockRef,
        'text-sources-list__even-probabilities-block',
        () => model.textSources.length <= 1,
        [ model.textSources.length ],
    );

    return (
        <section className={`text-sources-list ${className ?? ''}`}>
            <h2 className="text-sources-list__heading">Список источников</h2>
            <ul className="text-sources-list__list">
                {model.textSources.map(textSourceModel =>
                    <TextSource
                        className="text-sources-list__text-source"
                        model={textSourceModel}
                        probabilityInputVisible={model.textSources.length > 1}
                        key={textSourceModel.id}
                        onRemove={onRemoveSourceButtonClick}
                    />,
                )}
            </ul>
            <div
                className="text-sources-list__even-probabilities-block text-sources-list__even-probabilities-block_hidden"
                ref={evenProbabilitiesBlockRef}
            >
                <button
                    className="text-sources-list__even-probabilities-button"
                    onClick={onEvenProbabilitiesButtonClick}
                >
                    Выровнять вероятности источников
                </button>
            </div>
            <div className="text-sources-list__add-new-text-source-block">
                <button
                    className="text-sources-list__add-new-text-source-button"
                    onClick={onAddNewSourceButtonClick}
                >
                    Добавить источник
                </button>
            </div>
        </section>
    );
});

export default TextSourcesList;
