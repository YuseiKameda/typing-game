// src/utils/ITypingText.ts
export interface ITypingText {
    roman: string;
    completedRoman: string;
    remainingRoman: string;
    inputKey(key: string): "unmatch" | "incomplete" | "complete";
}
