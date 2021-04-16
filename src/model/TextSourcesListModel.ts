import { makeObservable, observable } from 'mobx';

import { TextSourceModel } from './TextSourceModel';

export class TextSourcesListModel {
    textSources: TextSourceModel[] = [];
    private _step: number;

    constructor(step: number) {
        makeObservable(this, {
            textSources: observable.shallow,
        });
        this._step = step;
    }

    addNewTextSource(): void {
        if (this.textSources.length == 0) {
            this.textSources.push(new TextSourceModel(this, '', 1));
        } else {
            this.textSources.push(new TextSourceModel(this));
        }
    }

    getTextSource(id: number): TextSourceModel | null {
        const index = this.textSources.findIndex(textSource => textSource.id == id);
        return id == -1 ? null : this.textSources[index];
    }

    removeTextSource(id: number): void {
        let probabilityLost = 0;
        for (let i = 0; i < this.textSources.length; i++) {
            if (this.textSources[i].id == id) {
                probabilityLost = this.textSources[i].probability;
                this.textSources.splice(i, 1);
            }
        }
        if (this.textSources.length == 1) {
            this.textSources[0].setProbability(1);
        }
        if (this.textSources.length > 1) {
            this.updateProbabilitiesRelativeTo(
                this.textSources[0],
                this.textSources[0].probability + probabilityLost,
            );
        }
    }

    updateProbabilitiesRelativeTo(textSourceModel: TextSourceModel, newProbability: number): void {
        const totalPointsCount = this.roundToSteps(1);
        const oldPointsCount = this.roundToSteps(textSourceModel.probability);
        const newPointsCount = this.roundToSteps(newProbability);

        const pointsDiff = newPointsCount - oldPointsCount;
        const otherPointsSum = totalPointsCount - oldPointsCount;

        let redistributedSum = 0;
        for (let i = 0; i < this.textSources.length; i++) {
            if (this.textSources[i] == textSourceModel) {
                continue;
            }
            const otherOldPoints = this.roundToSteps(this.textSources[i].probability);
            let redistributedPoints = 0;
            if (otherPointsSum != 0) {
                redistributedPoints =
                    otherOldPoints -
                    Math.sign(pointsDiff) *
                        Math.floor(Math.abs(pointsDiff * otherOldPoints / otherPointsSum));
                this.textSources[i].setProbabilityUnsafe(redistributedPoints * this._step);
            } else {
                redistributedPoints =
                    otherOldPoints -
                    Math.sign(pointsDiff) *
                        Math.floor(Math.abs(pointsDiff / (this.textSources.length - 1)));
                this.textSources[i].setProbabilityUnsafe(redistributedPoints * this._step);
            }
            redistributedSum += redistributedPoints;
        }
        textSourceModel.setProbabilityUnsafe((totalPointsCount - redistributedSum) * this._step);
    }

    evenProbabilities(): void {
        const totalPointsCount = this.roundToSteps(1);
        let pointsLeft = totalPointsCount;
        for (let i = 1; i < this.textSources.length; i++) {
            const points = Math.floor(totalPointsCount / this.textSources.length);
            this.textSources[i].setProbabilityUnsafe(points * this._step);
            pointsLeft -= points;
        }
        this.textSources[0].setProbabilityUnsafe(pointsLeft * this._step);
    }

    private roundToSteps(value: number) {
        return Math.round(value / this._step);
    }

    get step(): number {
        return this._step;
    }
}
