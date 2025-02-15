import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

interface LocationState {
    difficulty: string;
    problemCount: number;
}

const sampleProblems = [
    "こんにちは",
    "タイピングゲーム",
    "プログラミングは楽しい",
    "ReactとSupabaseを使う",
    "TypeScriptで堅牢なコードを書く",
    "Tailwind CSSでデザインする",
    "挑戦することが大切",
    "学びと成長の場",
    "競技性とエンタメの両立",
    "未来を創る力",
];

const ProblemCountSetupPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LocationState | undefined;

    useEffect(() => {
        if (!state) {
            navigate('/');
        }
    }, [state, navigate]);

    const { problemCount } = state || { difficulty: 'human', problemCount: 10 };

    const [problems] = useState<string[]>(() => {
        const shuffled = [...sampleProblems].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, problemCount);
    });

    const [currentProblemIndex, setCurrentProblemIndex] = useState<number>(0);
    const [userInput, setUserInput] = useState<string>('');
    const [countdown, setCountdown] = useState<number>(3);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<number | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    // カウントダウン
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setGameStarted(true);
            setStartTime(Date.now());
            inputRef.current?.focus();
        }
    }, [countdown]);

    const currentProblem = problems[currentProblemIndex];

    const renderProblemText = () => {
        const correctPart = currentProblem.slice(0, userInput.length);
        const remainingPart = currentProblem.slice(userInput.length);
        return (
            <span>
                <span className='text-gray-800 font-bold'>{correctPart}</span>
                <span className='text-gray-400'>{remainingPart}</span>
            </span>
        );
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUserInput(value);
        if (value === currentProblem) {
            setUserInput('');
            if (currentProblemIndex + 1 < problems.length) {
                setCurrentProblemIndex(currentProblemIndex + 1);
            } else {
                const endTime = Date.now();
                const totalTime = (endTime - (startTime || endTime)) / 1000;
                navigate('/result', { state: { totalTime } });
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            {!gameStarted ? (
                <div className="text-6xl font-bold">{countdown}</div>
            ) : (
                <div className="w-full max-w-2xl bg-white p-6 rounded shadow-md">
                    <h2 className="text-xl font-bold mb-4">問題 {currentProblemIndex + 1} / {problems.length}</h2>
                    <div className="text-2xl mb-6">{renderProblemText()}</div>
                    <input
                        type="text"
                        ref={inputRef}
                        value={userInput}
                        onChange={handleChange}
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