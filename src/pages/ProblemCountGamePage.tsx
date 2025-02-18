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
                .limit(problemCount);

            if ( error) {
                console.error('Error fetching problems:', error);
            } else if (data && data.length > 0) {
                setTexts(data);
                const first = new TypingText(data[0].hiragana);
                setTypingText(first);
            } else {
                console.error('No problems found for difficulty:', difficulty);
            }
        };
        fetchTexts();
    }, [difficulty, problemCount]);

    useEffect(() => {
        // キー入力判定
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!typingText) return;
            const key = e.key;
            if (!TypingText.isValidInputKey(key)) return;
    
            const result = typingText.inputKey(key);
    
            setUserInputDisplay(typingText.completedRoman);
    
            if (result === 'unmatch') {
                setFeedback('ミスタイプ！');
                return;
            } else if (result === 'incomplete') {
                setFeedback('');
                setUserInputDisplay(typingText.completedRoman);
            } else if (result === 'complete') {
                setFeedback('正解！');
                // 入力欄をクリア
                setUserInputDisplay('');
                // 次のテキストへ移行
                if (currentIndex + 1 < texts.length) {
                    const nextIndex = currentIndex + 1;
                    const nextText = new TypingText(texts[nextIndex].hiragana);
                    setTypingText(nextText);
                    setCurrentIndex(nextIndex);
    
                    setUserInputDisplay(nextText.completedRoman);
                } else {
                    // 全問終了時の処理（結果画面へ遷移など）
                    navigate('/', { state: { /* 結果データ */ } });
                }
            }
            setFeedback('');
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [typingText, currentIndex, texts, navigate]);



    // 表示用: 上段にローマ字（入力済み部分を反映）、中段にひらがな、下段に元の日本語
    const renderProblemText = () => {
        if (!typingText) return null;
        return (
        <div className="space-y-2">
            <div className="text-2xl font-bold">{texts[currentIndex].original}</div>
            <div className="text-xl text-gray-700 font-medium">{texts[currentIndex].hiragana}</div>
            <div className="text-sm text-blue-600 font-mono">
                <span className="font-bold">{userInputDisplay}</span>
                <span className="text-gray-400">{typingText.remainingRoman}</span>
            </div>
        </div>
        );
    };

    

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">タイピングゲーム</h2>
            {typingText && (
                <>
                    <div className='mb-2'>{renderProblemText()}</div>
                    {/* <input 
                        type="text" 
                        ref={inputRef}
                        value={userInputDisplay}
                        onKeyDown={handleKeyDown}
                        className='w-full max-w-md p-2 border rounded focus:outline-none focus:ring'
                        placeholder='ローマ字で入力'
                        readOnly
                    /> */}
                    {feedback && <p className='mt-2 text-red-500'>{feedback}</p>}
                </>
            )}
                <div className="mt-4">
                    <Link to="/" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">
                    ホームへ戻る
                    </Link>
                </div>
            </div>
        );
    };

export default ProblemCountSetupPage;