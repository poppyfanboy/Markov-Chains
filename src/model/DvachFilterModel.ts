import { DvachPostModel } from './DvachPostModel';

import { makeObservable, observable } from 'mobx';

// incremented every time a new filter is created
let filterId = 0;

export type FilterTextOptionModel = {
    text: string;
    isRegex: boolean;
    isNegated: boolean;
};

export type FilterCheckboxOptionModel = {
    checked: boolean;
};

export type DvachFilter =
    | DvachFilterModel<FilterTextOptionModel>
    | DvachFilterModel<FilterCheckboxOptionModel>;

export enum DvachFilterType {
    NAME,
    TRIPCODE,
    IS_THREAD_OP,
    POST_CONTAINS_WORDS,
}

export enum DvachFilterCombinator {
    AND,
    OR,
}

export function dvachFilterFactory(
    type: DvachFilterType,
    combinator = DvachFilterCombinator.AND,
): DvachFilter {
    switch (type) {
    case DvachFilterType.NAME:
        return new DvachFilterModel<FilterTextOptionModel>(
            type,
            'Имя',
            filterId++,
            (parameter: FilterTextOptionModel, post: DvachPostModel) => false,
            {
                text: '',
                isRegex: false,
                isNegated: false,
            },
            combinator,
        );
    case DvachFilterType.TRIPCODE:
        return new DvachFilterModel<FilterTextOptionModel>(
            type,
            'Трипкод',
            filterId++,
            (parameter: FilterTextOptionModel, post: DvachPostModel) => false,
            {
                text: '',
                isRegex: false,
                isNegated: false,
            },
            combinator,
        );
    case DvachFilterType.POST_CONTAINS_WORDS:
        return new DvachFilterModel<FilterTextOptionModel>(
            type,
            'Содержит слова',
            filterId++,
            (parameter: FilterTextOptionModel, post: DvachPostModel) => false,
            {
                text: '',
                isRegex: false,
                isNegated: false,
            },
            combinator,
        );
    case DvachFilterType.IS_THREAD_OP:
        return new DvachFilterModel<FilterCheckboxOptionModel>(
            type,
            'Является ОПом треда',
            filterId++,
            (parameter: FilterCheckboxOptionModel, post: DvachPostModel) => false,
            {
                checked: false,
            },
            combinator,
        );
    default:
        throw new Error('Фильтр не определён');
    }
}

type TestFunction<TParameter> = (parameter: TParameter, post: DvachPostModel) => boolean;

export class DvachFilterModel<TParameter> {
    parameter: TParameter;
    combinator: DvachFilterCombinator;
    private _type: DvachFilterType;
    private _name: string;
    private testFunction: TestFunction<TParameter>;
    private _id: number;

    constructor(
        type: DvachFilterType,
        name: string,
        id: number,
        testFunction: TestFunction<TParameter>,
        parameter: TParameter,
        combinator: DvachFilterCombinator,
    ) {
        makeObservable(this, {
            parameter: observable,
            combinator: observable,
        });

        this._type = type;
        this._name = name;
        this._id = id;
        this.parameter = parameter;
        this.combinator = combinator;
        this.testFunction = testFunction;
    }

    test(post: DvachPostModel): boolean {
        return this.testFunction(this.parameter, post);
    }

    get type(): DvachFilterType {
        return this._type;
    }

    get name(): string {
        return this._name;
    }

    get id(): number {
        return this._id;
    }
}
