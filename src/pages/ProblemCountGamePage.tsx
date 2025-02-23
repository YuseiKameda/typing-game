import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

interface LocationState {
    difficulty: string;
    problemCount: number;
}

interface DBText {
    id: number;
    difficulty: string;
    original: string;
    hiragana: string;
    created_at: string;
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
}


const ProblemCountSetupPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LocationState | undefined;
    // const inputRef = useRef<HTMLInputElement>(null);
    
    const [texts, setTexts] = useState<DBText[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [typingText, setTypingText] = useState<TypingText | null>(null);
    const [feedback, setFeedback] = useState<string>('');
    const [userInputDisplay, setUserInputDisplay] = useState<string>('');

    const [countdown, setCountdown] = useState<number>(3);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<number | null>(null);

    const [totalCorrect, setTotalCorrect] = useState<number>(0);
    const [totalMistakes, setTotalMistakes] = useState<number>(0);
    
    useEffect(() => {
        if (!state) {
            navigate('/');
        }
    }, [state, navigate]);

    const { difficulty, problemCount } = state || { difficulty: 'human', problemCount: 10 };


    // Supabsaseから問題文を取得
    useEffect (() => {
        const fetchTexts = async () => {
            const { data, error } = await supabase
                .from('typing_texts')
                .select('*')
                .eq('difficulty', difficulty)
            if (error) {
                console.error('Error fetching problems:', error);
                return [];
            } else if (data && data.length > 0) {
                // シャッフル
                const shuffled = [...data];
                for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }
                const selected = shuffled.slice(0, problemCount);
                setTexts(selected);
                const first = new TypingText(selected[0].hiragana);
                setTypingText(first);
            } else {
                console.error('No problems found for difficulty:', difficulty);
            }
        };
        fetchTexts();
    }, [difficulty, problemCount]);

    // カウントダウン
    useEffect(() => {
        if (texts.length > 0 && typingText && !gameStarted) {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setGameStarted(true);
                        setStartTime(Date.now());
                        return 0;
                    }
                    return prev -1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [texts, typingText, gameStarted]);

    // 記録登録用関数
    const registerRecord = async (record: RankingRecord) => {
        const { error } = await supabase
            .from('typing_rankings')
            .insert([record]);
        if(error) {
            console.error('Error inserting record:', error);
        }
    };

    // キー入力判定
    useEffect(() => {
        const handleKeyDown = async (e: KeyboardEvent) => {
            if (!typingText) return;
            const key = e.key;
            if (!TypingText.isValidInputKey(key)) return;
    
            const result = typingText.inputKey(key);
    
            setUserInputDisplay(typingText.completedRoman);
            if (result === 'unmatch') {
                setFeedback('ミスタイプ！');
                setTotalMistakes((prev) => prev + 1);
                return;
            } else if (result === 'incomplete') {
                setFeedback('');
                setUserInputDisplay(typingText.completedRoman);
                setTotalCorrect((prev) => prev + 1);
            } else if (result === 'complete') {
                setFeedback('正解！');
                setUserInputDisplay('');
                setTotalCorrect((prev) => prev + 1);
                // 次のテキストへ移行
                if (currentIndex + 1 < texts.length) {
                    const nextIndex = currentIndex + 1;
                    const nextText = new TypingText(texts[nextIndex].hiragana);
                    setTypingText(nextText);
                    setCurrentIndex(nextIndex);
                    setUserInputDisplay(nextText.completedRoman);
                } else {
                    // 全問終了時の処理
                    const endTime = Date.now();
                    const totalTime = (endTime - (startTime || endTime)) / 1000;
                    const record = {
                        mode: 'problem_count',
                        difficulty,
                        problem_count: problemCount,
                        time_limit: null,
                        clear_time: totalTime,
                        correct_count: totalCorrect,
                        mistake_count: totalMistakes,
                        nickname: 'anonymous',
                        icon: null,
                    };
                    await registerRecord(record);
                    navigate('/result', { state: { totalTime, totalCorrect, totalMistakes } });
                }
            }
            setFeedback('');
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [gameStarted, typingText, currentIndex, texts, startTime, totalCorrect, totalMistakes, difficulty, problemCount, navigate]);



    // 表示用: 上段にローマ字（入力済み部分を反映）、中段にひらがな、下段に元の日本語
    const renderProblemText = () => {
        if (!typingText) return null;
        return (
        <div className="space-y-2">
            <div className='text-white'>タイプ数: {totalCorrect}</div>
            <div className="mt-8 text-4xl font-bold text-white">{texts[currentIndex].original}</div>
            <div className="text-2xl text-gray-300 font-medium">{texts[currentIndex].hiragana}</div>
            <div className="text-xl text-green-500 font-mono">
                <span className="font-bold">{userInputDisplay}</span>
                <span className="text-gray-200">{typingText.remainingRoman}</span>
            </div>
        </div>
        );
    };

    

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[url(/backgroundImage.jpeg)] bg-cover bg-center">
            {/* <h2 className="text-2xl font-bold mb-4">タイピングゲーム</h2> */}
            {!gameStarted ? (
                <div className='text-6xl font-bold'>{countdown}</div>
            ) : (
                <>
                    <div className={
                            "w-full max-w-3xl bg-gradient-to-r from-gray-400 to-black rounded-3xl border border-gray-800 p-8 space-y-8 shadow-2xl" + 
                            (feedback === 'ミスタイプ！' ? "border-4 border-red-500" : "border border-gray-800")
                            }>
                        <div className='flex-grow flex flex-col items-center justify-center'>{renderProblemText()}</div>
                        {/* {feedback && <p className='text-red-500 text-center'>{feedback}</p>} */}
                        <div className="mt-4 flex justify-center">
                            <Link to="/" className='text-center block bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded mt-4'>
                            ホームへ戻る
                            </Link>
                        </div>
                    </div>
                </>
            )}
            </div>
        );
    };

export default ProblemCountSetupPage;