import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex flex-col items-center justify-center p-4 font-mono">
        <div className="absolute top-0 left-0 w-full flex justify-center pointer-events-none select-none">
          <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text 
              bg-gradient-to-b from-cyan-400 to-cyan-600 py-6 tracking-tight">
            SPACE TYPING
          </h1>
        </div>
        <div className="flex flex-col space-y-4">
          <Link to="/setup"
                className="text-center px-6 py-3 text-sm border rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 bg-emerald-500/10 text-emerald-400 border-emerald-500/50 hover:bg-emerald-500/20 hover:border-emerald-400 focus:ring-emerald-500/40 active:bg-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            問題数モード
          </Link>
          <Link to="/time_mode_setup"
                className="text-center px-6 py-3 text-sm bg-gray-500 text-gray-700 rounded cursor-not-allowed">
            時間制限モード（準備中）
          </Link>
          <Link to="/ranking"
                className="text-center px-6 py-2 font-mono text-sm border rounded transition-all duration-300 focus:outline-none focus:ring-2 bg-purple-500/10 text-purple-400 border-purple-500/50 hover:bg-purple-500/20 hover:border-purple-400 focus:ring-purple-500/40 active:bg-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            ランキング
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
