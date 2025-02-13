// src/components/TypingGame.tsx
import React, { useState, useRef } from 'react';

const sampleTexts = [
  "こんにちは",
  "タイピングゲームを始めよう",
  "React と Supabase の連携を楽しもう",
  "プログラミングは楽しい冒険だ",
  "TypeScript で堅牢なコードを書く",
];

const TypingGame: React.FC = () => {
  const [targetText, setTargetText] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const startGame = () => {
    // サンプルテキストからランダムに選択
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setTargetText(randomText);
    setUserInput("");
    setGameStarted(true);
    setElapsedTime(null);
    setStartTime(Date.now());
    // ゲーム開始後、入力欄にフォーカス
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const endGame = () => {
    if (startTime) {
      const timeTaken = (Date.now() - startTime) / 1000;
      setElapsedTime(timeTaken);
    }
    setGameStarted(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);

    // ユーザー入力が正解と一致したら終了
    if (value === targetText) {
      endGame();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6">タイピングゲーム</h1>

      {!gameStarted && elapsedTime === null && (
        <button
          onClick={startGame}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          ゲーム開始
        </button>
      )}

      {gameStarted && (
        <div className="w-full max-w-xl bg-white p-6 rounded shadow">
          <p className="text-lg mb-4">
            <span className="font-bold">問題:</span> {targetText}
          </p>
          <input
            type="text"
            ref={inputRef}
            value={userInput}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="ここに入力..."
          />
        </div>
      )}

      {!gameStarted && elapsedTime !== null && (
        <div className="mt-4 text-center">
          <p className="text-xl font-bold">
            結果: {elapsedTime.toFixed(2)}秒でクリア！
          </p>
          <button
            onClick={startGame}
            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            もう一度チャレンジ
          </button>
        </div>
      )}
    </div>
  );
};

export default TypingGame;
