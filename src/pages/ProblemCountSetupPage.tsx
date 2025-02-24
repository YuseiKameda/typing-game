import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DifficultySelect from '../components/DifficultySelect';
import Button from '../components/Button';
import QuestionCountSelect from '../components/QuestionCountSelect';

const ProblemCountSetupPage: React.FC = () => {
    const navigate = useNavigate();
    const [difficulty, setDifficulty] = useState<string>('');
    const [problemCount, setProblemCount] = useState<number | null>(null);

    const handleStart = () => {
        navigate('/game', { state: {difficulty, problemCount } });
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex flex-col items-center justify-center p-4 font-mono">
            <div className="w-full max-w-3xl backdrop-blur-sm bg-black/30 border border-gray-700/50 rounded-3xl p-8 space-y-8 shadow-2xl animate-fade-in hover:border-gray-600/50 transition-colors duration-300 flex flex-col">
                <DifficultySelect difficulty={difficulty} setDifficulty={setDifficulty} />
                <QuestionCountSelect problemCount={problemCount} setProblemCount={setProblemCount} />
                <div className="flex items-center justify-center pt-4">
                <Button
                    variant="start"
                    onClick={handleStart}
                    disabled={!difficulty || !problemCount}
                    className='mt-4'
                >
                    スタート
                </Button>
                </div>
            </div>
            <div className='flex flex-col space-y-4 items-center font-mono'>
                <Link
                to="/"
                // className='w-64 text-center block bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded mt-4'
                className="absolute bottom-12 px-4 py-2 font-mono text-sm text-gray-400 border border-gray-700/50 
                    rounded-full hover:bg-gray-800/50 hover:border-gray-600 transition-all duration-300 
                    focus:outline-none focus:ring-2 focus:ring-gray-500/40 
                    flex items-center gap-2 backdrop-blur-sm bg-black/20"
                >
                ホームへ戻る
                </Link>
            </div>
        </div>
    );
}

export default ProblemCountSetupPage;