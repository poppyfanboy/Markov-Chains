import './text-source.pcss';

import React, { useCallback, useRef, useEffect } from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';

import SearchOptions from '@components/search-options/SearchOptions';
import { TextSourceModel } from '@model/TextSourceModel';
import DvachFiltersBlock from '@components/dvach-filters-block/DvachFiltersBlock';
import GenericUrlFiltersBlock from '@components/generic-url-filters-block/GenericUrlFiltersBlock';

const TextSource: React.FunctionComponent<{
    className: string | null;
    model: TextSourceModel;
    probabilityInputVisible: boolean;
    onRemove: (model: TextSourceModel) => void;
}> = observer(({ className, model, probabilityInputVisible, onRemove }) => {
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

    const probabilityBlockRef: React.RefObject<HTMLDivElement> = useRef(null);
    useEffect(() => {
        if (probabilityBlockRef.current == null) {
            return;
        }
        if (probabilityInputVisible) {
            probabilityBlockRef.current.classList.remove('text-source__probability-block_hidden');
        } else {
            probabilityBlockRef.current.classList.add('text-source__probability-block_hidden');
        }
    }, [ probabilityInputVisible, probabilityBlockRef.current ]);

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
        [ model, textInputRef.current ],
    );

    const probabilityStep = model.ownerListModel.step;

    return (
        <li className={`text-source ${className ?? ''}`}>
            <textarea
                cols={80}
                rows={2}
                className="text-source__text-input"
                placeholder="Ссылка на источник или сам текст"
                value={model.textContent}
                onChange={updateText}
                ref={textInputRef}
            />

            <div className="text-source__clear-text-block">
                <button
                    className="text-source__clear-text-button"
                    onClick={onTextInputClearButtonClick}
                >
                    Очистить
                </button>
            </div>
            <div className="text-source__remove-block">
                <button className="text-source__remove-button" onClick={onRemoveButtonClick}>
                    Удалить
                </button>
            </div>
            <div
                className="text-source__probability-block text-source__probability-block_hidden"
                ref={probabilityBlockRef}
            >
                <label className="text-source__probability-label">
                    <span className="text-source__probability-label-text">
                        Вероятность использовать источник
                    </span>
                    <input
                        type="range"
                        className="text-source__probability-input"
                        min={0}
                        max={1}
                        step={probabilityStep}
                        value={model.probability}
                        onChange={updateProbability}
                    />
                    <span className="text-source__probability-input-value">
                        {(
                            Math.round(model.probability / probabilityStep) * probabilityStep
                        ).toFixed(Math.floor(Math.log10(1 / probabilityStep)))}
                    </span>
                </label>
            </div>
            <SearchOptions textSourceModel={model} />
            <DvachFiltersBlock
                className="text-source__dvach-filters-block"
                textSourceModel={model}
            />
            <GenericUrlFiltersBlock
                className="text-source__generic-url-filters-block"
                textSourceModel={model}
            />
        </li>
    );
});

export default TextSource;
