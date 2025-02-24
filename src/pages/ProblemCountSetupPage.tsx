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
        <div className="min-h-screen bg-[url('/backgroundImage.jpeg')] bg-cover bg-center flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-gradient-to-r from-gray-400 to-black rounded-3xl border border-gray-800 p-8 space-y-8 shadow-2xl">
                <DifficultySelect difficulty={difficulty} setDifficulty={setDifficulty} />
                <QuestionCountSelect problemCount={problemCount} setProblemCount={setProblemCount} />
                <div className="flex items-center justify-center pt-4">
                <Button
                    variant="default"
                    onClick={handleStart}
                    disabled={!difficulty || !problemCount}
                    className='mt-4'
                >
                    スタート
                </Button>
                </div>
            </div>
            <div className='flex flex-col space-y-4 items-center'>
                <Link
                to="/"
                className='w-64 text-center block bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded mt-4'
                >
                ホームへ戻る
                </Link>
            </div>
        </div>
    );
}

export default ProblemCountSetupPage;