import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import NicknameModal from '../components/NicknameModal';

interface LocationState {
    totalTime: number;
    totalCorrect: number;
    totalMistakes: number;
    difficulty: string;
    problemCount: number;
}

interface RankingRecord {
    mode: string;
    difficulty: string;
    problem_count: number;
    time_limit: number | null;
    clear_time: number;
    correct_count: number;
    mistake_count: number;
    nickname: string;
    icon: string | null;
    created_at?: string;
}

const ProblemCountResultPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LocationState | undefined;
    const [showNicknameModal, setShowNicknameModal] = useState<boolean>(false);
    const [recordRegistered, setRecordRegistered] = useState<boolean>(false);

    if (!state) {
        navigate('/');
        return null;
    }

    const { totalTime, totalCorrect, totalMistakes, difficulty, problemCount } = state;
    const finalTotalCorrect = totalCorrect + 1
    const totalKeystrokes = finalTotalCorrect + totalMistakes;
    const kps = totalTime > 0 ? (finalTotalCorrect / totalTime).toFixed(2) : '0';
    const accuracy = totalKeystrokes > 0 ? ((finalTotalCorrect /totalKeystrokes) * 100).toFixed(1) : '0';

    // 記録登録用関数
    const registerRecord = async (record: RankingRecord) => {
        const { error } = await supabase
            .from('typing_rankings')
            .insert([record]);
        if(error) {
            console.error('Error inserting record:', error);
        }
    };

    const handleYes = () => {
        setShowNicknameModal(true);
    };

    const handleNicknameConfirm = async (nickname: string, icon: string | null) => {
        setShowNicknameModal(false);
        const record: RankingRecord = {
            mode: 'problem_count',
            difficulty,
            problem_count: problemCount,
            time_limit: null,
            clear_time: totalTime,
            correct_count: finalTotalCorrect,
            mistake_count: totalMistakes,
            nickname,
            icon,
        };
        await registerRecord(record);
        setRecordRegistered(true);
    };

    const handleCancel = () => {
        setShowNicknameModal(false);
    };

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
                {!recordRegistered && (
                    <div className="flex flex-col space-y-4 mt-4 items-center">
                        <p className="text-lg text-yellow-500 text-center">記録に名前をつけて登録しませんか？</p>
                            <button onClick={handleYes} className="w-64 text-center px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700">
                                記録を登録
                            </button>
                    </div>
                )}
                    <div className="flex flex-col space-y-4 items-center">
                        <Link
                        to="/ranking"
                        className="w-64 text-center block py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-800"
                        >
                        ランキング
                        </Link>
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
            {showNicknameModal && (
                <NicknameModal onConfirm={handleNicknameConfirm} onCancel={handleCancel} />
            )}
        </div>
    );
};

export default ProblemCountResultPage;
