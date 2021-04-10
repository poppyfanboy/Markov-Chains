import './dvach-search-filter.pcss';

import React from 'react';

import { DvachFilter, DvachFilterType } from '../../model/DvachFilterModel';

const DvachSearchFilterOptions: React.FunctionComponent<{
    filter: DvachFilter
}> = props => {
    if (props.filter.type == DvachFilterType.IS_THREAD_OP) {
        return (
            <div className="dvach-search-filter__options-block">
                <label className="dvach-search-filter__checkbox-input-label">
                    <span className="dvach-search-filter__name-label-text">
                        {props.filter.name}
                    </span>
                    <input className="dvach-search-filter__checkbox-input" type="checkbox" />
                </label>
            </div>
        );
    }

    return (
        <div className="dvach-search-filter__options-block">
            <label className="dvach-search-filter__text-input-label">
                <span className="dvach-search-filter__name-label-text">
                    {props.filter.name}
                </span>
                <input className="dvach-search-filter__text-input" type="text" />
            </label>
            <label className="dvach-search-filter__use-regexp-label">
                <input className="dvach-search-filter__use-regexp-checkbox" type="checkbox" />
                <span className="dvach-search-filter__use-regexp-label-text">Regex</span>
            </label>
            <label className="dvach-search-filter__negate-label">
                <input className="dvach-search-filter__negate-checkbox" type="checkbox" />
                <span className="dvach-search-filter__negate-label-text">Отрицание</span>
            </label>
        </div>
    );
};

const DvachSearchFilter: React.FunctionComponent<{
    filter: DvachFilter
}> = props => {
    return (
        <li className="dvach-search-filter text-source-item__dvach-search-filter">
            <form>
                <DvachSearchFilterOptions filter={props.filter} />
                <div className="dvach-search-filter__combinator-block">
                    <label className="dvach-search-filter__combinator-label">
                        <input
                            type="radio"
                            name="dvach-search-filter-combinator"
                            className="dvach-search-filter__combinator-input"
                            defaultChecked
                        />
                        <span className="dvach-search-filter__combinator-label-text">И</span>
                    </label>
                    <label className="dvach-search-filter__combinator-label">
                        <input
                            type="radio"
                            name="dvach-search-filter-combinator"
                            className="dvach-search-filter__combinator-input"
                        />
                        <span className="dvach-search-filter__combinator-label-text">ИЛИ</span>
                    </label>
                </div>
            </form>
        </li>
    );
};

export default DvachSearchFilter;
