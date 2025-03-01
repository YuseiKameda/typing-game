import React from "react";
import Button from "./Button";

interface LanguageOption {
    label: string;
    range: string;
    value: "japanese" | "english";
}

interface LanguageSelectProps {
    selectedLanguage?: string;
    setSelectedLanguage: (value: string) => void;
}

const difficulties: LanguageOption[] = [
    { label: "japanese", range: "日本語", value: "japanese" },
    { label: "english", range: "英語", value: "english" },
]

const LanguageSelect: React.FC<LanguageSelectProps > = ({ selectedLanguage, setSelectedLanguage }) => {
    return (
        <div className="space-y-6">
            <div className="relative">
                <div className="text-white text-center py-2 px-6 rounded-lg font-bold tracking-wider shadow-lg">
                    言語を選ぶ
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {difficulties.map((d) => (
                    <Button
                        key={d.value}
                        onClick={() => setSelectedLanguage(d.value)}
                        selected={selectedLanguage === d.value}
                    >
                        <div font-bold mb-1>{d.label}</div>
                        <div className="text-sm opacity-80">{d.range}</div>
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default LanguageSelect