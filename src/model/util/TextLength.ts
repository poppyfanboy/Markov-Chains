export enum TextLengthUnit {
    WORD,
    CHAR,
}

export class TextLength {
    private _count: number;
    private _unit: TextLengthUnit;

    constructor(count = 0, unit: TextLengthUnit = TextLengthUnit.WORD) {
        this._unit = unit;
        this._count = count;
    }

    get count(): number {
        return this._count;
    }

    get unit(): TextLengthUnit {
        return this._unit;
    }
}
