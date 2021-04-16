import { action } from 'mobx';
import React, { useCallback } from 'react';
import { observer } from 'mobx-react';

import { TextLengthInputModel, mapHtmlValueToTextLengthUnit } from '@model/TextLengthInputModel';
import {
    TextLengthUnit,
    mapTextLengthUnitToHtmlValue,
    mapTextLengthUnitToHumanString,
} from '@model/TextLengthInputModel';

const TextLengthInput: React.FunctionComponent<{
    className: string;
    unitsOptions: TextLengthUnit[] | null;
    model: TextLengthInputModel;
}> = observer(({ className, unitsOptions, model }) => {
    const onInputTextChange = useCallback(
        action((event: React.ChangeEvent<HTMLInputElement>) => {
            model.rawCount = event.target.value;
        }),
        [ model ],
    );
    const onLengthUnitChange = useCallback(
        action((event: React.ChangeEvent<HTMLSelectElement>) => {
            model.unit = mapHtmlValueToTextLengthUnit(event.target.value);
        }),
        [ model ],
    );

    return (
        <div className={`text-length-input ${className ?? ''}`}>
            <label className="text-length-input__text-source-max-length-label">
                <span className="text-length-input__text-source-max-length-label-text">
                    Максимальная длина
                </span>
                <input
                    type="text"
                    className="text-length-input__text-source-max-length-input"
                    onChange={onInputTextChange}
                    value={model.rawCount ?? ''}
                    placeholder={`${model.count }`}
                />
            </label>
            <select
                className="text-length-input__text-source-max-length-units-select"
                onChange={onLengthUnitChange}
                value={mapTextLengthUnitToHtmlValue(model.unit)}
            >
                {unitsOptions?.map(lengthUnit =>
                    <option
                        className="text-length-input__text-source-max-length-unit-option"
                        value={mapTextLengthUnitToHtmlValue(lengthUnit)}
                        key={mapTextLengthUnitToHtmlValue(lengthUnit)}
                    >
                        {mapTextLengthUnitToHumanString(lengthUnit)}
                    </option>,
                )}
            </select>
        </div>
    );
});

export default TextLengthInput;
