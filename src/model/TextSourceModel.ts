import { DvachFilterGeneric, DvachFilterType, dvachFilterFactory } from './DvachFilterModel';
import { TextLength, TextLengthUnit } from './util/TextLength';

import { action, computed, makeObservable, observable } from 'mobx';

export class TextSourceModel {
    textContent = '';
    maxTextLengthToFetch: TextLength = new TextLength(10_000, TextLengthUnit.WORD);
    dvachFilters: DvachFilterGeneric[] = [];
    private _isDvachUrl = false;
    private _isGenericUrl = false;
    private _probability = 1;

    constructor(textContent = '') {
        makeObservable(this, {
            textContent: observable,
            maxTextLengthToFetch: observable,
            dvachFilters: observable.shallow,
            _isDvachUrl: observable,
            _isGenericUrl: observable,
            _probability: observable,
            isDvachUrl: computed,
            isGenericUrl: computed,
            probability: computed,
            addDvachFilter: action,
            removeDvachFilter: action,
        } as any);

        this.textContent = textContent;
    }

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

    setProbability(value: number): void {
        this._probability = Math.min(Math.max(0, value), 1);
    }

    get isDvachUrl(): boolean {
        return this._isDvachUrl;
    }

    setIsDvachUrl(value: boolean): void {
        this._isDvachUrl = value;
        if (this._isDvachUrl && this._isGenericUrl) {
            this._isGenericUrl = false;
        }
    }

    get isGenericUrl(): boolean {
        return this._isGenericUrl;
    }

    setIsGenericUrl(value: boolean): void {
        this._isGenericUrl = value;
        if (this._isGenericUrl && this._isDvachUrl) {
            this._isDvachUrl = false;
        }
    }
}
