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
    selectedLanguage: string;
}

interface RankingRecord {
    mode: string;
    language: string;
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

    const { totalTime, totalCorrect, totalMistakes, difficulty, problemCount, selectedLanguage } = state;
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
            language: selectedLanguage,
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
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex flex-col items-center justify-center p-4 font-mono">
            <div className="w-full max-w-3xl backdrop-blur-sm bg-black/30 border border-gray-700/50 rounded-3xl p-8 space-y-8 shadow-2xl animate-fade-in hover:border-gray-600/50 transition-colors duration-300 flex flex-col">
                <h2 className="text-3xl text-white text-center">結果</h2>
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
                        <p className="text-md text-yellow-500 text-center">記録に名前をつけて登録しませんか？</p>
                            <button onClick={handleYes} className="text-center px-6 py-2 font-mono text-sm border rounded transition-all duration-300 focus:outline-none focus:ring-2 bg-yellow-500/10 text-yellow-400 border-yellow-500/50 hover:bg-yellow-500/20 hover:border-yellow-400 focus:ring-yellow-500/40 active:bg-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.1)] hover:shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                                記録を登録
                            </button>
                    </div>
                )}
                    <div className="flex flex-col space-y-4 items-center">
                        <Link
                            to="/ranking"
                            className="text-center px-6 py-2 font-mono text-sm border rounded transition-all duration-300 focus:outline-none focus:ring-2 bg-purple-500/10 text-purple-400 border-purple-500/50 hover:bg-purple-500/20 hover:border-purple-400 focus:ring-purple-500/40 active:bg-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                        >
                            ランキング
                        </Link>
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
            {showNicknameModal && (
                <NicknameModal onConfirm={handleNicknameConfirm} onCancel={handleCancel} />
            )}
        </div>
    );
};

export default ProblemCountResultPage;
