import './search-options.pcss';

import React from 'react';
import { observer } from 'mobx-react';
import { useCallback, useRef } from 'react';
import { action } from 'mobx';

import { TextSourceModel } from '@model/TextSourceModel';
import { TextLength, TextLengthUnit } from '@model/util/TextLength';

/**
 * Настройки, связанные с содержанием указанного источника. Сюда не входит
 * вероятность встретить источник, потому что изменив вероятность, можно
 * сгенерировать новый текст без повторного обращения к источнику.
 */
const SearchOptions: React.FunctionComponent<{
    textSource: TextSourceModel;
}> = observer(props => {
    const wordUnitOptionRef: React.RefObject<HTMLOptionElement> = useRef(null);
    const charUnitOptionRef: React.RefObject<HTMLOptionElement> = useRef(null);

    const { textSource } = props;
    const updateIsDvachUrl = useCallback(
        action((event: React.ChangeEvent<HTMLInputElement>) => {
            textSource.setIsDvachUrl(event.target.checked);
        }),
        [ textSource ],
    );
    const updateIsGenericUrl = useCallback(
        action((event: React.ChangeEvent<HTMLInputElement>) => {
            textSource.setIsGenericUrl(event.target.checked);
        }),
        [ textSource ],
    );
    const updateMaxLength = useCallback(
        action((event: React.ChangeEvent<HTMLInputElement>) => {
            let parsedNumber = Number.parseInt(event.target.value, 10);
            if (Number.isNaN(parsedNumber)) {
                parsedNumber = 0;
            }
            textSource.maxTextLengthToFetch = new TextLength(
                parsedNumber,
                textSource.maxTextLengthToFetch.unit,
            );
        }),
        [ textSource ],
    );
    const updateLengthUnit = useCallback(
        action((event: React.ChangeEvent<HTMLSelectElement>) => {
            const count = textSource.maxTextLengthToFetch.count;
            textSource.maxTextLengthToFetch = new TextLength(
                count,
                event.target.value == 'words' ? TextLengthUnit.WORD : TextLengthUnit.CHAR,
            );
        }),
        [ textSource ],
    );

    return (
        <div className="search-options text-source-item__search-options">
            <div className="search-options__is-dvach-url-block">
                <label className="search-options__is-dvach-url-label">
                    <input
                        type="checkbox"
                        className="search-options__is-dvach-url-checkbox"
                        checked={textSource.isDvachUrl}
                        onChange={updateIsDvachUrl}
                    />
                    <span className="search-options__is-dvach-url-label-text">Ссылка на двач</span>
                </label>
            </div>
            <div className="search-options__is-generic-url-block">
                <label className="search-options__is-generic-url-label">
                    <input
                        type="checkbox"
                        className="search-options__is-generic-url-checkbox"
                        checked={textSource.isGenericUrl}
                        onChange={updateIsGenericUrl}
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
                        value={textSource.maxTextLengthToFetch.count}
                        onChange={updateMaxLength}
                    />
                </label>
                <select
                    className="search-options__text-source-max-length-units-select"
                    value={
                        textSource.maxTextLengthToFetch.unit == TextLengthUnit.WORD ?
                            'words' :
                            'chars'
                    }
                    onChange={updateLengthUnit}
                >
                    <option
                        className="search-options__text-source-max-length-unit-option"
                        ref={wordUnitOptionRef}
                        value="words"
                    >
                        слов
                    </option>
                    <option
                        className="search-options__text-source-max-length-unit-option"
                        ref={charUnitOptionRef}
                        value="chars"
                    >
                        символов
                    </option>
                </select>
            </div>
        </div>
    );
});

export default SearchOptions;
