import React, { useCallback } from 'react';

const FilterCheckboxOption: React.FunctionComponent<{
    name: string;
    isChecked: boolean;
    onIsCheckedChange: (newValue: boolean) => void;
}> = props => {
    const changeIsChecked = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            props.onIsCheckedChange(event.target.checked);
        },
        [ props.onIsCheckedChange ],
    );

    return (
        <div className="dvach-search-filter__options-block">
            <label className="dvach-search-filter__checkbox-input-label">
                <span className="dvach-search-filter__name-label-text">{props.name}</span>
                <input
                    className="dvach-search-filter__checkbox-input"
                    type="checkbox"
                    checked={props.isChecked}
                    onChange={changeIsChecked}
                />
            </label>
        </div>
    );
};

export default FilterCheckboxOption;
