import React, { useState, useEffect} from "react";
import { supabase } from "../lib/supabaseClient";
import Button from "../components/Button";
import { Link } from "react-router-dom";

interface RankingRecord {
    id: number;
    mode: string;
    difficulty: string;
    problem_count: number | null;
    time_limit: number | null;
    clear_time: number;
    correct_count: number;
    mistake_count: number;
    nickname: string;
    icon: string | null;
    created_at: string;
}

const RankingPage: React.FC = () => {
    const [selectedProblemCount, setSelectedProblemCount] = useState<number>(5);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('human');
    const [rankings, setRankings] = useState<RankingRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRankings = async () => {
            setLoading(true);
            // problem_count が選択された値と一致するものを取得
            const { data, error } = await supabase
                .from('typing_rankings')
                .select('*')
                .eq('mode', 'problem_count')
                .eq('problem_count', selectedProblemCount)
                .eq('difficulty', selectedDifficulty);
            if (error) {
                console.error('Error fetching rankings:', error);
            } else if (data) {
                const sorted = data.sort((a, b) => {
                    const kpsA = a.clear_time > 0 ? a.correct_count / a.clear_time : 0;
                    const kpsB = b.clear_time > 0 ? b.correct_count / b.clear_time : 0;
                    return kpsB - kpsA;
                });
                setRankings(sorted);
            }
            setLoading(false);
        };
        fetchRankings();
    }, [selectedProblemCount, selectedDifficulty]);

    // 問題数タブ
    const renderTabs = () => {
        const options = [5, 10, 15];
        return (
            <div className="mb-6 flex space-x-4">
                {options.map((count) => (
                    <Button
                        key={count}
                        onClick={() => setSelectedProblemCount(count)}
                        selected={selectedProblemCount === count}
                    >
                        {count}門
                    </Button>
                ))}

            </div>
        )
    }

    // 難易度タブ
    const renderDifficultyTabs = () => {
        const options = [
            { label: '人間', value: 'human' },
            { label: '超人', value: 'superhuman' },
            { label: '宇宙人', value: 'alien' },
        ];
        return (
            <div className="mb-6 flex space-x-4">
                {options.map((diff) => (
                    <Button
                        key={diff.value}
                        onClick={() => setSelectedDifficulty(diff.value)}
                        selected={selectedDifficulty === diff.value}
                    >
                        {diff.label}
                    </Button>
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex flex-col items-center justify-center p-4 font-mono">
            <h2 className="text-3xl text-white mb-6">ランキング</h2>
            {renderDifficultyTabs()}
            {renderTabs()}
            {loading ? (
                <div className="w-full max-w-xl bg-gradient-to-r from-gray-400 to-black rounded-3xl border border-gray-800 p-8 space-y-8 shadow-2xl">
                    <p>ロード中...</p>
                </div>
            ) : (
                <div className="w-full max-w-3xl backdrop-blur-sm bg-black/30 border border-gray-700/50 rounded-3xl p-8 space-y-8 shadow-2xl animate-fade-in hover:border-gray-600/50 transition-colors duration-300 flex flex-col">
                    <div className="flex-grow overflow-y-auto max-h-[400px] px-4">
                        {rankings.length > 0 ? (
                            rankings.map((record, index) => {
                                const kps = record.clear_time > 0 ? (record.correct_count / record.clear_time).toFixed(2) : '0';
                                const total = record.correct_count + record.mistake_count;
                                const accuracy = total > 0 ? ((record.correct_count / total) * 100).toFixed(1) : '0';
                                return (
                                    <div key={record.id} className="flex justify-between items-center py-2 border-b border-gray-700">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-lg font-bold text-white">{index + 1}位</span>
                                            {/* アイコンがあれば表示 */}
                                            {record.icon && <img src={record.icon} alt="icon" className="w-10 h-10"/>}
                                            <span className="text-white">{record.nickname}</span>
                                        </div>
                                        <div className="text-white text-right">
                                            <p>
                                                <span className="text-sm text-gray-300">速度: </span>
                                                <span className="text-lg font-bold">{kps} /s</span>
                                            </p>
                                            <p className="text-sm">
                                                <span className="text-gray-300">正確性: </span>
                                                <span>{accuracy} %</span>
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-white">該当記録がありません</p>
                        )}
                    </div>
                </div>
            )}
            <div className='flex flex-col space-y-4 items-center font-mono'>
                <Link
                to="/"
                // className='w-64 text-center block bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded mt-4'
                className="absolute bottom-6 px-4 py-2 font-mono text-sm text-gray-400 border border-gray-700/50 
                    rounded-full hover:bg-gray-800/50 hover:border-gray-600 transition-all duration-300 
                    focus:outline-none focus:ring-2 focus:ring-gray-500/40 
                    flex items-center gap-2 backdrop-blur-sm bg-black/20"
                >
                ホームへ戻る
                </Link>
            </div>
        </div>
    );
};

export default RankingPage;