import { DvachPostModel } from './DvachPostModel';

// incremented every time a new filter is created
let filterId = 0;

export type DvachFilter = DvachFilterModel<TextFilterInput> | DvachFilterModel<CheckboxFilterInput>;

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

export type TextFilterInput = {
    text: string;
    isRegex: boolean;
    isNegated: boolean;
};

export type CheckboxFilterInput = {
    checked: boolean;
};

export function dvachFilterFactory(
    type: DvachFilterType,
    combinator: DvachFilterCombinator = DvachFilterCombinator.AND,
): DvachFilter {
    switch (type) {
    case DvachFilterType.NAME:
        return new DvachFilterModel<TextFilterInput>(
            type,
            'Имя',
            filterId++,
            (parameter: TextFilterInput, post: DvachPostModel) => false,
            {
                text: '',
                isRegex: false,
                isNegated: false,
            },
            combinator,
        );
    case DvachFilterType.TRIPCODE:
        return new DvachFilterModel<TextFilterInput>(
            type,
            'Трипкод',
            filterId++,
            (parameter: TextFilterInput, post: DvachPostModel) => false,
            {
                text: '',
                isRegex: false,
                isNegated: false,
            },
            combinator,
        );
    case DvachFilterType.POST_CONTAINS_WORDS:
        return new DvachFilterModel<TextFilterInput>(
            type,
            'Содержит слова',
            filterId++,
            (parameter: TextFilterInput, post: DvachPostModel) => false,
            {
                text: '',
                isRegex: false,
                isNegated: false,
            },
            combinator,
        );
    case DvachFilterType.IS_THREAD_OP:
        return new DvachFilterModel<CheckboxFilterInput>(
            type,
            'Является ОПом треда',
            filterId++,
            (parameter: CheckboxFilterInput, post: DvachPostModel) => false,
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
