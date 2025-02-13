// src/components/TypingTextsList.tsx
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Vite の環境変数は "VITE_" で始まる必要があります
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface TypingText {
  id: number;
  difficulty: string;
  content: string;
  created_at: string;
}

const TypingTextsList: React.FC = () => {
  const [texts, setTexts] = useState<TypingText[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTexts = async () => {
      const { data, error } = await supabase
        .from('typing_texts')
        .select('*');
      if (error) {
        console.error('Error fetching texts:', error);
      } else {
        setTexts(data ?? []);
      }
      setLoading(false);
    };

    fetchTexts();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">読み込み中...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">タイピングテキスト一覧</h2>
      <ul className="space-y-4">
        {texts.map((text) => (
          <li key={text.id} className="p-4 border rounded shadow-sm">
            <div className="font-medium">
              難易度: <span className="text-blue-600">{text.difficulty}</span>
            </div>
            <div className="mt-2">内容: {text.content}</div>
            <div className="mt-1 text-sm text-gray-500">
              {new Date(text.created_at).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TypingTextsList;
