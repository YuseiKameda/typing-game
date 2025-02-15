// // src/utils/kanaToRomaji.ts
// import Kuroshiro from 'kuroshiro';
// import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji';

// let kuroshiroInstance: Kuroshiro | null = null;

// export const initKuroshiro = async () => {
//     if (!kuroshiroInstance) {
//         kuroshiroInstance = new Kuroshiro();
//         // 辞書ファイルは public/dic に配置したものを指定
//         await kuroshiroInstance.init(new KuromojiAnalyzer({ dicPath: '/dic' }));
//     }
// };

// export const kanaToRomaji = async (text: string): Promise<string> => {
//     await initKuroshiro();
//     // mode を "normal" に修正
//     return kuroshiroInstance!.convert(text, { to: 'romaji', mode: 'normal' });
// };

// export const kanjiToHiragana = async (text: string): Promise<string> => {
//     await initKuroshiro();
//     return kuroshiroInstance!.convert(text, { to: 'hiragana', mode: 'normal' });
// };
