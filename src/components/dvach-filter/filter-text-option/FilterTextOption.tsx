import React, { useCallback } from 'react';

const FilterTextOption: React.FunctionComponent<{
    name: string;
    text: string;
    isRegex: boolean;
    isNegated: boolean;
    onTextChange: (newText: string) => void;
    onIsRegexChange: (newValue: boolean) => void;
    onIsNegatedChange: (newValue: boolean) => void;
}> = props => {
    const changeText = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            props.onTextChange(event.target.value);
        },
        [ props.onTextChange ],
    );
    const changeIsRegex = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            props.onIsRegexChange(event.target.checked);
        },
        [ props.onIsRegexChange ],
    );
    const changeIsNegated = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            props.onIsNegatedChange(event.target.checked);
        },
        [ props.onIsNegatedChange ],
    );

    return (
        <div className="dvach-search-filter__options-block">
            <label className="dvach-search-filter__text-input-label">
                <span className="dvach-search-filter__name-label-text">{props.name}</span>
                <input
                    className="dvach-search-filter__text-input"
                    type="text"
                    value={props.text}
                    onInput={changeText}
                />
            </label>
            <label className="dvach-search-filter__use-regexp-label">
                <input
                    className="dvach-search-filter__use-regexp-checkbox"
                    type="checkbox"
                    checked={props.isRegex}
                    onChange={changeIsRegex}
                />
                <span className="dvach-search-filter__use-regexp-label-text">Regex</span>
            </label>
            <label className="dvach-search-filter__negate-label">
                <input
                    className="dvach-search-filter__negate-checkbox"
                    type="checkbox"
                    checked={props.isNegated}
                    onChange={changeIsNegated}
                />
                <span className="dvach-search-filter__negate-label-text">Отрицание</span>
            </label>
        </div>
    );
};

export default FilterTextOption;
