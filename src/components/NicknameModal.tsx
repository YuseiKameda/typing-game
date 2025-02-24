import React, { useState } from 'react';

interface NicknameModalProps {
    onConfirm: (nickname: string, icon: string | null) => void;
    onCancel: () => void;
}

const icons = [
    { id: 'alien1', src: '/alien_icon1.png' },
    { id: 'alien2', src: '/alien_icon2.png' },
    { id: 'alien3', src: '/alien_icon3.png' },
    { id: 'alien4', src: '/alien_icon4.png' },
    { id: 'dog', src: '/dog_icon.png' },
];

const NicknameModal: React.FC<NicknameModalProps> = ({ onConfirm, onCancel }) => {
    const [nickname, setNickname] = useState<string>('');
    const [icon, setIcon] = useState<string>(icons[0].src); // ここでは URL 入力など簡単な例として

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm(nickname.trim() || 'anonymous', icon);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-gray-600 rounded p-6 max-w-md w-full">
                <h3 className="text-lg mb-4 text-gray-300">記録を登録</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1 text-gray-300">ニックネーム</label>
                        <input
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="例: タイピングマスター"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-gray-300">アイコンを選ぶ</label>
                        <div className='flex space-x-4'>
                            {icons.map((icons) => (
                                <div
                                    key={icons.id}
                                    onClick={() => setIcon(icons.src)}
                                    className={`cursor-pointer p-1 rounded transition-all ${
                                        icon === icons.src
                                        ? 'border-2 border-blue-600'
                                        : 'border border-gray-300'
                                    }`}
                                >
                                    <img src={icons.src} alt={icons.id} className='w-16 h-16 object-cover' />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 font-mono text-sm border rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 bg-gray-800/30 text-gray-400 border-gray-700/50 hover:bg-gray-800/50 hover:border-gray-600"
                        >
                            キャンセル
                        </button>
                        <button
                            type="submit"
                            className="text-center px-4 py-2 font-mono text-sm border rounded transition-all duration-300 focus:outline-none focus:ring-2 bg-yellow-500/10 text-yellow-400 border-yellow-500/50 hover:bg-yellow-500/20 hover:border-yellow-400 focus:ring-yellow-500/40 active:bg-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.1)] hover:shadow-[0_0_20px_rgba(234,179,8,0.2)]"
                        >
                            登録する
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NicknameModal;
