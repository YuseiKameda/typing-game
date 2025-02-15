import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8">タイピングゲーム - ホーム</h1>
      <div className="flex flex-col space-y-4">
        <Link to="/setup"
              className="w-64 text-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          問題数モード
        </Link>
        <Link to="/time_mode_setup"
              className="w-64 text-center px-4 py-2 bg-gray-500 text-gray-700 rounded cursor-not-allowed">
          時間制限モード（準備中）
        </Link>
        <Link to="/ranking"
              className="w-64 text-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
          ランキングを見る
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
