import React from 'react';
import { Trash2 } from 'lucide-react';
import type { QuestionData } from '../../types';

interface QuestionSubCardProps {
  data: Partial<QuestionData>;
  onUpdate: (data: Record<string, any>) => void;
  onDelete: () => void;
}

const QuestionSubCard: React.FC<QuestionSubCardProps> = ({ data, onUpdate, onDelete }) => {
  const handleChange = (field: keyof QuestionData, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg relative">
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 text-red-400 hover:text-red-600 transition-colors"
      >
        <Trash2 className="h-4 w-4" />
      </button>
      
      <h4 className="text-sm font-medium text-indigo-800 mb-3">Question</h4>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Question
        </label>
        <textarea
          value={data.question || ''}
          onChange={(e) => handleChange('question', e.target.value)}
          placeholder="Enter your question..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
          rows={2}
        />
      </div>
    </div>
  );
};

export default QuestionSubCard;
