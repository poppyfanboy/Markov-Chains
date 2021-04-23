import { action, computed, makeObservable, observable } from 'mobx';

import { DvachFilterGeneric, DvachFilterType, dvachFilterFactory } from './DvachFilterModel';
import { TextLengthInputModel, TextLengthUnit } from './TextLengthInputModel';
import { TextSourcesListModel } from './TextSourcesListModel';

// incremented every time a new text source is created
let textSourceId = 0;

export class TextSourceModel {
    textContent = '';
    dvachFilters: DvachFilterGeneric[] = [];
    private _isDvachUrl = false;
    private _isGenericUrl = false;
    private _probability = 1;
    private _maxTextLengthToFetchInputModel: TextLengthInputModel;
    private _id: number;
    private _ownerListModel: TextSourcesListModel;

    constructor(ownerListModel: TextSourcesListModel, textContent = '', initialProbability = 0) {
        this._id = textSourceId++;

        makeObservable(this, {
            textContent: observable,
            dvachFilters: observable.shallow,
            _isDvachUrl: observable,
            _isGenericUrl: observable,
            _probability: observable,
            isDvachUrl: computed,
            isGenericUrl: computed,
            probability: computed,
            addDvachFilter: action,
            removeDvachFilter: action,
            setProbability: action,
            setProbabilityUnsafe: action,
        } as any);

        this.textContent = textContent;
        this._ownerListModel = ownerListModel;
        this._probability = Math.max(0, Math.min(1, initialProbability));
        this._maxTextLengthToFetchInputModel = new TextLengthInputModel(10000, TextLengthUnit.WORD);
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
        this._ownerListModel.updateProbabilitiesRelativeTo(this, Math.min(Math.max(0, value), 1));
    }

    setProbabilityUnsafe(value: number): void {
        this._probability = value;
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

    get maxTextLengthToFetchInputModel(): TextLengthInputModel {
        return this._maxTextLengthToFetchInputModel;
    }

    get id(): number {
        return this._id;
    }

    get ownerListModel(): TextSourcesListModel {
        return this._ownerListModel;
    }
}
