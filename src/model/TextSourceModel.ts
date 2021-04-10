import { DvachFilter, DvachFilterType, dvachFilterFactory } from './DvachFilterModel';
import { TextLength, TextLengthUnit } from './util/TextLength';

export class TextSourceModel {
    textContent = '';
    maxTextLengthToFetch: TextLength = new TextLength(10_000, TextLengthUnit.WORD);
    private _isDvachUrl = false;
    private _isGenericUrl = false;
    private _probability = 1;
    private dvachFilters: DvachFilter[] = [];

    addDvachFilter(type: DvachFilterType): void {
        this.dvachFilters.push(dvachFilterFactory(type));
    }

    removeDvachFilter(id: number): void {
        for (let i = 0; i < this.dvachFilters.length; i++) {
            if (this.dvachFilters[i].id == id) {
                this.dvachFilters.splice(i, 1);
            }
        }
    }

    get probability(): number {
        return this._probability;
    }

    set probability(value: number) {
        this._probability = Math.min(Math.max(0, value), 1);
    }

    get isDvachUrl(): boolean {
        return this._isDvachUrl;
    }

    set isDvachUrl(value: boolean) {
        this._isDvachUrl = value;
        if (this._isDvachUrl && this._isGenericUrl) {
            this._isGenericUrl = false;
        }
    }

    get isGenericUrl(): boolean {
        return this._isGenericUrl;
    }

    set isGenericUrl(value: boolean) {
        this._isGenericUrl = value;
        if (this._isGenericUrl && this._isDvachUrl) {
            this._isDvachUrl = false;
        }
    }
}
