import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
// import { kanaToRomaji, kanjiToHiragana } from '../utils/kanaToRomaji';
import { convertToRomaji, convertToHiragana } from '../utils/kanaToRomajiWanakana';

interface LocationState {
    difficulty: string;
    problemCount: number;
}

interface TypingText {
    id: number;
    difficulty: string;
    content: string;
    created_at: string;
}

interface ConvertedText {
    original: string;
    hiragana: string;
    romaji: string;
}


const ProblemCountSetupPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LocationState | undefined;

    useEffect(() => {
        if (!state) {
            navigate('/');
        }
    }, [state, navigate]);

    const { difficulty, problemCount } = state || { difficulty: 'human', problemCount: 10 };

    const [problems, setProblems] = useState<TypingText[]>([]);
    const [convertedProblems, setConvertedProblems] = useState<ConvertedText[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [conversionLoading, setConversionLoading] = useState<boolean>(true);
    const [currentProblemIndex, setCurrentProblemIndex] = useState<number>(0);
    const [userInput, setUserInput] = useState<string>('');
    const [countdown, setCountdown] = useState<number>(3);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [isComposing, setIsComposing] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);

    // Supabsaseから問題文を取得
    useEffect (() => {
        const fetchProblems = async () => {
            const { data, error } = await supabase
                .from('typing_texts')
                .select('*')
                .eq('difficulty', difficulty)
                .limit(problemCount);

            if ( error) {
                console.error('Error fetching problems:', error);
            } else if (data && data.length > 0) {
                setProblems(data);
            } else {
                console.error('No problems found for difficulty:', difficulty);
            }
            setLoading(false);
        };
        fetchProblems();
    }, [difficulty, problemCount]);

    // 各問題を変換
    useEffect(() => {
        if (problems.length === 0) return;
        const converted = problems.map((problem) => {
            const hiragana = convertToHiragana(problem.content);
            const romaji = convertToRomaji(problem.content);
            return {
                original: problem.content,
                hiragana,
                romaji,
            };
        })
        ;
        setConvertedProblems(converted);
        setConversionLoading(false);
    }, [loading, problems]);

    // カウントダウン
    useEffect(() => {
        if (!loading && !conversionLoading && convertedProblems.length > 0) {
            const countdownTimer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(countdownTimer);
                        setGameStarted(true);
                        setStartTime(Date.now());
                        inputRef.current?.focus();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(countdownTimer);
        }
    }, [loading, conversionLoading, convertedProblems]);

    const currentConverted: ConvertedText = convertedProblems[currentProblemIndex] || {
        original: '',
        hiragana: '',
        romaji: '',
    };

    const renderProblemText = () => {
        const correctRomaji = currentConverted.romaji.slice(0, userInput.length);
        const remainingRomaji = currentConverted.romaji.slice(userInput.length);
        return (
            <div>
                <div className='text-sm text-blue-600 font-mono mb-1'>
                    <span className='font-bold'>{correctRomaji}</span>
                    <span className='text-gray-400'>{remainingRomaji}</span>
                </div>
                <div className='text-xl text-gray-700 font-medium'>{currentConverted.hiragana}</div>
                <div className='text-2xl font-bold'>{currentConverted.original}</div>
                
            </div>
        );
    };

    const handleCompositionStart = () => {
        setIsComposing(true);
    };

    const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
        setIsComposing(false);

        const finalValue = e.currentTarget.value;
        setUserInput(finalValue);
        if (finalValue === currentConverted.romaji) {
            processCorrectInput()
        }
    };

    // 正しい入力が完了したときの処理
    const processCorrectInput = () => {
        setUserInput("");
        if (currentProblemIndex + 1 < convertedProblems.length) {
        setCurrentProblemIndex(currentProblemIndex + 1);
        } else {
        const endTime = Date.now();
        const totalTime = (endTime - (startTime || endTime)) / 1000;
        navigate('/result', { state: { totalTime } });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isComposing) return;
        const value = e.target.value;

        if (!currentConverted.romaji.startsWith(value)) {
            return;
        }

        setUserInput(value);

        if (value === currentConverted.romaji) {
            processCorrectInput();
        }
    };

    if (loading || conversionLoading) {
        return (
            <div className='min-h-screen flex items-center justify-center bg-gray-100'>
                <p className='text-xl'>問題を取得中...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            {!gameStarted ? (
                <div className="text-6xl font-bold">{countdown > 0 ? countdown : 'GO!'}</div>
            ) : (
                <div className="w-full max-w-2xl bg-white p-6 rounded shadow-md">
                    <h2 className="text-xl font-bold mb-4">
                        問題 {currentProblemIndex + 1} / {convertedProblems.length}
                    </h2>
                    <div className="text-2xl mb-6">{renderProblemText()}</div>
                    <input
                        type="text"
                        ref={inputRef}
                        value={userInput}
                        onChange={handleChange}
                        onCompositionStart={handleCompositionStart}
                        onCompositionEnd={handleCompositionEnd}
                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="ここに入力..."
                    />
                    <div className="mt-4 flex justify-between">
                        <Link
                            to="/"
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                        >
                            ホームへ戻る
                        </Link>
                    </div>
                </div>
            )}
        </div>
    ); 
};

export default ProblemCountSetupPage;