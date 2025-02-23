import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

interface LocationState {
    totalTime: number;
    totalCorrect: number;
    totalMistakes: number;
}

const ProblemCountResultPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LocationState | undefined;

    if (!state) {
        // 状態がない場合はホームに戻る
        navigate('/');
        return null;
    }

    const { totalTime, totalCorrect, totalMistakes } = state;
    const finalTotalCorrect = totalCorrect + 1
    const totalKeystrokes = finalTotalCorrect + totalMistakes;
    const kps = totalTime > 0 ? (finalTotalCorrect / totalTime).toFixed(2) : '0';
    const accuracy = totalKeystrokes > 0 ? ((finalTotalCorrect /totalKeystrokes) * 100).toFixed(1) : '0';

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[url(/backgroundImage.jpeg)] bg-cover bg-center">
            <div className="w-full max-w-3xl bg-gradient-to-r from-gray-400 to-black rounded-3xl border border-gray-800 p-8 space-y-8 shadow-2xl">
                <h2 className="text-3xl font-bold text-white text-center">結果</h2>
                <div className='text-xl text-white space-y-4 text-center'>
                    <p>
                        <span className='text-sm text-gray-300'>クリアタイム：</span>
                        <span className='text-xl font-bold text-white'>{totalTime.toFixed(2)} s</span>
                    </p>
                    <p>
                        <span className='text-sm text-gray-300'>総タイプ数：</span>
                        <span className='text-xl font-bold text-white'>
                            {totalKeystrokes} <span className='text-base font-normal text-gray-200'>(正: {finalTotalCorrect} / 誤: {totalMistakes})</span>
                        </span>
                    </p>
                    <p>
                        <span className='text-sm text-gray-300'>1秒あたりのタイプ数：</span>
                        <span className='text-xl font-bold text-white'>{kps} /s</span>
                    </p>
                    <p>
                        <span className='text-sm text-gray-300'>正確性：</span>
                        <span className='text-xl font-bold text-white'>{accuracy} %</span>
                    </p>
                </div>
                <div className="flex flex-col space-y-4 items-center">
                    <Link
                    to="/ranking"
                    className="w-64 text-center block py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-800"
                    >
                    ランキング一覧
                    </Link>
                    <Link
                    to="/"
                    className='w-64 text-center block bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded mt-4'
                    >
                    ホームへ戻る
                    </Link>
            </div>
        </div>
        </div>
    );
};

export default ProblemCountResultPage;
