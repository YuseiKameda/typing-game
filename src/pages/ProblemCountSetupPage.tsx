import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const ProblemCountSetupPage: React.FC = () => {
    const navigate = useNavigate();
    const [difficulty, setDifficulty] = useState<string>('human');
    const [problemCount, setProblemCount] = useState<number>(10);

    const handleStart = () => {
        navigate('/game', { state: {difficulty, problemCount } });
    };

    return (
        <div className='min-h-screen flex flex-col justify-center items-center p-4 bg-[url(/backgroundImage.jpeg)] bg-cover bg-center'>
            <h2 className='text-3xl font-bold mb-6'>モード設定</h2>
            <div className='w-full max-w-md bg-white p-6 rounded shadow-md'>
                {/* 難易度選択 */}
                <div className='mb-6'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>難易度選択</label>
                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className='block w-full px-3 py-2 border rounded-md focus:outline-none focus:rind focus:border-blue-300'
                    >
                        <option value="human">人間（3~6文字程度）</option>
                        <option value="superhuman">超人（10文字程度）</option>
                        <option value="alien">宇宙人</option>
                    </select>
                </div>
                {/* 問題数選択 */}
                <div className='mb-6'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>問題数選択</label>
                    <select
                        value={problemCount}
                        onChange={(e) => setProblemCount(parseInt(e.target.value))}
                        className='block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
                    >
                        <option value={5}>5問</option>
                        <option value={10}>10問</option>
                        <option value={15}>15問</option>
                    </select>
                </div>
                <button
                    onClick={handleStart}
                    className='w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                >
                    スタート
                </button>
                <Link
                    to='/'
                    className='w-full text-center block bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4'
                >
                    ホームへ戻る
                </Link>
            </div>
        </div>
    )
}

export default ProblemCountSetupPage;