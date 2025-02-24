import React from "react";
import Button from "./Button";

interface DifficultyOption {
    label: string;
    range: string;
    value: "human" | "superhuman" | "alien";
}

interface DifficultySelectProps {
    difficulty?: string;
    setDifficulty: (value: string) => void;
}

const difficulties: DifficultyOption[] = [
    { label: "人間", range: "3~6文字程度", value: "human" },
    { label: "超人", range: "10文字程度", value: "superhuman" },
    { label: "宇宙人", range: "それ以上", value: "alien" },
]

const DifficultySelect: React.FC<DifficultySelectProps> = ({ difficulty, setDifficulty }) => {
    return (
        <div className="space-y-6">
            <div className="relative">
                <div className="bg-gray-600 text-white text-center py-2 px-6 rounded-lg font-bold tracking-wider shadow-lg">
                    文字数を選ぶ
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {difficulties.map((d) => (
                    <Button
                        key={d.value}
                        onClick={() => setDifficulty(d.value)}
                        selected={difficulty === d.value}
                    >
                        <div font-bold mb-1>{d.label}</div>
                        <div className="text-sm opacity-80">{d.range}</div>
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default DifficultySelect