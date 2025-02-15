import { toHiragana, toRomaji } from "wanakana";

export const convertToRomaji = (text: string): string => {
    return toRomaji(text);
};

export const convertToHiragana = (text: string): string => {
    return toHiragana(text);
};
