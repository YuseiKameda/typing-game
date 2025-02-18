// src/types/typing-jp.d.ts
declare class TypingText {
    constructor(text: string);
    inputKey(key: string): "unmatch" | "incomplete" | "complete";
    static isValidInputKey(key: string): boolean;
    readonly text: string;
    readonly completedText: string;
    readonly remainingText: string;
    readonly roman: string;
    readonly completedRoman: string;
    readonly remainingRoman: string;
}

declare const TypingText: {
new (text: string): TypingText;
isValidInputKey(key: string): boolean;
};
