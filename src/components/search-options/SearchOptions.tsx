import './search-options.pcss';

import React from 'react';
import { observer } from 'mobx-react';
import { useCallback } from 'react';
import { action } from 'mobx';

import { TextSourceModel } from '@model/TextSourceModel';
import { TextLengthUnit } from '@model/TextLengthInputModel';
import TextLengthInput from '@components/text-length-input/TextLengthInput';

/**
 * Настройки, связанные с содержанием указанного источника. Сюда не входит
 * вероятность встретить источник, потому что изменив вероятность, можно
 * сгенерировать новый текст без повторного обращения к источнику.
 */
const SearchOptions: React.FunctionComponent<{
    textSource: TextSourceModel;
}> = observer(({ textSource }) => {
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
            <TextLengthInput
                className="search-options__text-source-max-length-block"
                unitsOptions={[ TextLengthUnit.CHAR, TextLengthUnit.WORD, TextLengthUnit.SENTENCE ]}
                model={textSource.maxTextLengthToFetchInputModel}
            />
        </div>
    );
});

export default SearchOptions;
