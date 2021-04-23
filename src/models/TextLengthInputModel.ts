import { makeObservable, observable, computed } from 'mobx';

export enum TextLengthUnit {
    WORD,
    CHAR,
    SENTENCE,
}

export class TextLengthInputModel {
    unit: TextLengthUnit;
    rawCount: string | null = null;
    private defaultCount: number;

    constructor(defaultCount = 0, initialUnit: TextLengthUnit = TextLengthUnit.WORD) {
        this.unit = initialUnit;
        this.defaultCount = defaultCount;

        makeObservable(this, {
            unit: observable,
            rawCount: observable,
            count: computed,
        } as any);
    }

    get count(): number | null {
        if (this.rawCount == null || this.rawCount.length == 0) {
            return this.defaultCount;
        }
        let count: number | null = null;
        if (isNumber(this.rawCount)) {
            count = Number.parseInt(this.rawCount, 10);
            if (multipliedBy1000(this.rawCount)) {
                count *= 1000;
            }
        }
        return count;
    }
}

export function mapTextLengthUnitToHumanString(lengthUnit: TextLengthUnit): string {
    const index = Math.max(
        lengthUnits.findIndex(other => lengthUnit == other),
        0,
    );
    return lengthUnitsHumanStrings[index];
}

export function mapTextLengthUnitToHtmlValue(lengthUnit: TextLengthUnit): string {
    const index = Math.max(
        lengthUnits.findIndex(other => lengthUnit == other),
        0,
    );
    return lengthUnitsHtmlValues[index];
}

export function mapHtmlValueToTextLengthUnit(value: string): TextLengthUnit {
    const index = Math.max(
        lengthUnitsHtmlValues.findIndex(other => value == other),
        0,
    );
    return lengthUnits[index];
}

const lengthUnits: TextLengthUnit[] = [
    TextLengthUnit.WORD,
    TextLengthUnit.CHAR,
    TextLengthUnit.SENTENCE,
];
const lengthUnitsHumanStrings: string[] = [ 'слов', 'символов', 'предложений' ];
const lengthUnitsHtmlValues: string[] = [ 'words', 'chars', 'sentences' ];

const isNumberRegexp = /^\d+[kKкК]?$/;
const multipliedBy1000Regexp = /[kKкК]$/;

function isNumber(str: string) {
    return isNumberRegexp.test(str);
}

function multipliedBy1000(str: string) {
    return multipliedBy1000Regexp.test(str);
}
