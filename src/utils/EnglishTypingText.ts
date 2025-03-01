import { ITypingText } from "./ITypingText";

export class EnglishTypingText implements ITypingText {
    text: string;
    pointer: number;

    constructor(text: string) {
        this.text = text;
        this.pointer = 0;
    }

    get roman(): string {
        return this.text;
    }

    get completedRoman(): string {
        return this.text.substring(0, this.pointer);
    }

    get remainingRoman(): string {
        return this.text.substring(this.pointer);
    }

    inputKey(key: string): "unmatch" | "incomplete" | "complete" {
        if (this.pointer >= this.text.length) {
            return "complete";
        }
        const expected = this.text[this.pointer];
        if (key !== expected) {
            return "unmatch";
        }
        this.pointer++;
        return this.pointer === this.text.length ? "complete" : "incomplete";
    }
}
