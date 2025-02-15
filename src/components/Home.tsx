// src/components/Home.tsx
import React, { useState } from 'react';

const HomePage: React.FC = () => {
  // モード: タイムアタック（全問完了時間） vs. 時間制限モード（スコア計算）
  const [mode, setMode] = useState<'time_attack' | 'time_limit'>('time_attack');
  // 難易度: "human"（人間モード）、"superhuman"（超人モード）、"alien"（宇宙人モードなど）
  const [difficulty, setDifficulty] = useState<string>('human');
  // 問題数: 5問, 10問, 15問
  const [problemCount, setProblemCount] = useState<number>(5);

  const handleStartGame = () => {
    // 今後はここでルーティングしてゲーム画面へ遷移するなどの処理を実装
    console.log('Starting game with settings:', { mode, difficulty, problemCount });
    // 例: navigate(`/game?mode=${mode}&difficulty=${difficulty}&problemCount=${problemCount}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8">タイピングゲーム</h1>
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 py-6">
        {/* モード選択 */}
        <div className="mb-4">
          <label htmlFor="mode" className="block text-gray-700 text-sm font-bold mb-2">
            モード選択
          </label>
          <select
            id="mode"
            value={mode}
            onChange={(e) => setMode(e.target.value as 'time_attack' | 'time_limit')}
            className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="time_attack">タイムアタック</option>
            <option value="time_limit">時間制限モード</option>
          </select>
        </div>
        {/* 難易度選択 */}
        <div className="mb-4">
          <label htmlFor="difficulty" className="block text-gray-700 text-sm font-bold mb-2">
            難易度選択
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="human">人間モード（3～6文字）</option>
            <option value="superhuman">超人モード（約10文字）</option>
            <option value="alien">宇宙人モード（例）</option>
          </select>
        </div>
        {/* 問題数選択 */}
        <div className="mb-6">
          <label htmlFor="problemCount" className="block text-gray-700 text-sm font-bold mb-2">
            問題数
          </label>
          <select
            id="problemCount"
            value={problemCount}
            onChange={(e) => setProblemCount(Number(e.target.value))}
            className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value={5}>5問</option>
            <option value={10}>10問</option>
            <option value={15}>15問</option>
          </select>
        </div>
        <button
          onClick={handleStartGame}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          ゲーム開始
        </button>
      </div>
    </div>
  );
};

export default HomePage;
