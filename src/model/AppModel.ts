import { makeObservable, observable, computed, action } from 'mobx';

import { TextSourcesListModel } from './TextSourcesListModel';
import { TextLengthInputModel, TextLengthUnit } from './TextLengthInputModel';

export enum GenerationStrategy {
    BY_WORDS,
    BY_PARTS_OF_SPEECH,
    BY_N_GRAMMS,
}

const generationStrategies = [
    GenerationStrategy.BY_WORDS,
    GenerationStrategy.BY_PARTS_OF_SPEECH,
    GenerationStrategy.BY_N_GRAMMS,
];
const generationStrategiesHtmlValues = [ 'by-words', 'by-pos', 'by-n-gramms' ];
const generationStrategiesHumanNames = [ 'по словам', 'по частям речи', 'по N-граммам' ];

export function mapGenerationStrategyToHtmlValue(strategy: GenerationStrategy): string {
    const index = Math.max(
        generationStrategies.findIndex(other => strategy == other),
        0,
    );
    return generationStrategiesHtmlValues[index];
}

export function mapGenerationStrategyToHumanName(strategy: GenerationStrategy): string {
    const index = Math.max(
        generationStrategies.findIndex(other => strategy == other),
        0,
    );
    return generationStrategiesHumanNames[index];
}

export function mapHtmlValueToGenerationStrategy(value: string): GenerationStrategy {
    const index = Math.max(
        generationStrategiesHtmlValues.findIndex(other => value == other),
        0,
    );
    return generationStrategies[index];
}

export class AppModel {
    private _generationStrategy: GenerationStrategy = GenerationStrategy.BY_WORDS;
    private _generatedText: string | null = null;
    private _nGrammsSize = 1;
    private _sourcesListModel = new TextSourcesListModel(1e-3);
    private _generatedTextLengthInputModel = new TextLengthInputModel(200, TextLengthUnit.WORD);
    private _generationStrategiesList = [
        GenerationStrategy.BY_WORDS,
        GenerationStrategy.BY_PARTS_OF_SPEECH,
        GenerationStrategy.BY_N_GRAMMS,
    ];

    private _availableTextLengthUnits: TextLengthUnit[] = [
        TextLengthUnit.WORD,
        TextLengthUnit.SENTENCE,
    ];

    constructor() {
        makeObservable(this, {
            _generationStrategy: observable,
            generationStrategy: computed,
            setGenerationStrategy: action,
            _generatedText: observable,
            generatedText: computed,
            _nGrammsSize: observable,
            nGrammsSize: computed,
            setNGrammsSize: action,
            _availableTextLengthUnits: observable,
            availableTextLengthUnits: computed,
        } as any);
    }

    generateText(): string {
        this._generatedText = '';
        return this._generatedText;
    }

    get generationStrategy(): GenerationStrategy {
        return this._generationStrategy;
    }

    setGenerationStrategy(strategy: GenerationStrategy): void {
        this._generationStrategy = strategy;
        if (strategy == GenerationStrategy.BY_N_GRAMMS) {
            this._availableTextLengthUnits = [
                TextLengthUnit.WORD,
                TextLengthUnit.SENTENCE,
                TextLengthUnit.CHAR,
            ];
        } else {
            this._availableTextLengthUnits = [
                TextLengthUnit.WORD,
                TextLengthUnit.SENTENCE,
            ];
        }
    }

    get generatedText(): string {
        if (this._generatedText == null) {
            return this.generateText();
        }
        return this._generatedText!;
    }

    get nGrammsSize(): number {
        return this._nGrammsSize;
    }

    setNGrammsSize(value: number): void {
        this._nGrammsSize = Math.max(1, value);
    }

    get sourcesListModel(): TextSourcesListModel {
        return this._sourcesListModel;
    }

    get generatedTextLengthInputModel(): TextLengthInputModel {
        return this._generatedTextLengthInputModel;
    }

    get generationStrategiesList(): GenerationStrategy[] {
        return this._generationStrategiesList;
    }

    get availableTextLengthUnits(): TextLengthUnit[] {
        return this._availableTextLengthUnits;
    }
}
