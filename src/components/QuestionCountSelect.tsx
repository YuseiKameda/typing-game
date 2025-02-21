import React from "react";
import Button from "./Button";

interface QuestionCount {
    label: string;
    value: 5 | 10 | 15;
}

interface QuestionCountSelectProps {
    problemCount: number | null;
    setProblemCount: (value: 5 | 10 | 15) => void;
}

const questionCounts: QuestionCount[] = [
    { label: "5問", value: 5 },
    { label: "10問", value: 10 },
    { label: "15問", value: 15 },
]

const QuestionCountSelect: React.FC<QuestionCountSelectProps> = ({ problemCount, setProblemCount }) => {
    return (
        <div className="space-y-6">
            <div className="relative">
                <div className="bg-gray-600 text-white text-center py-2 px-6 rounded-lg font-bold tracking-wider shadow-lg">
                    問題数を設定
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {questionCounts.map((q) => (
                    <Button
                        key={q.value}
                        onClick={() => setProblemCount(q.value)}
                        selected={problemCount === q.value}
                    >
                        {q.label}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default QuestionCountSelect