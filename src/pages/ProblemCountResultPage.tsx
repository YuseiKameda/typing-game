import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

interface LocationState {
    totalTime: number;
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

    const { totalTime } = state;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[url(/backgroundImage.jpeg)] bg-cover bg-center">
        <h2 className="text-3xl font-bold mb-6">結果</h2>
        <p className="text-xl mb-8">
            全 {totalTime.toFixed(2)} 秒でクリアしました！
        </p>
        <div className="flex flex-col space-y-4">
            <Link
            to="/ranking"
            className="w-64 text-center py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700"
            >
            ランキング一覧
            </Link>
            <Link
            to="/"
            className="w-64 text-center py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700"
            >
            ホームへ戻る
            </Link>
        </div>
        </div>
    );
};

export default ProblemCountResultPage;
