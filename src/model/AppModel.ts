import { TextLengthUnit } from './TextLengthInputModel';

export enum GenerationStrategy {
    BY_WORDS,
    BY_PARTS_OF_SPEECH,
    BY_N_GRAMMS,
}

export class AppModel {
    generationStrategy: GenerationStrategy = GenerationStrategy.BY_WORDS;
    private _generatedText: string | null = null;
    private _nGrammsSize = 1;

    generateText(): string {
        this._generatedText = '';
        return this._generatedText;
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

    set nGrammsSize(value: number) {
        this._nGrammsSize = Math.max(1, value);
    }
}
