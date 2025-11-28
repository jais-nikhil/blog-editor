import React from 'react';
import { Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import type { QuestionData } from '../../types';

interface QuestionSubCardProps {
  data: Partial<QuestionData>;
  onUpdate: (data: Record<string, any>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

const QuestionSubCard: React.FC<QuestionSubCardProps> = ({ data, onUpdate, onDelete, onMoveUp, onMoveDown }) => {
  const handleChange = (field: keyof QuestionData, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg relative">
      {/* Move and Delete buttons */}
      <div className="absolute top-2 right-2 flex space-x-1">
        <button
          onClick={onMoveUp}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          title="Move Up"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
        <button
          onClick={onMoveDown}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          title="Move Down"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
        <button
          onClick={onDelete}
          className="text-red-400 hover:text-red-600 transition-colors"
          title="Delete"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      
      <h4 className="text-sm font-medium text-indigo-800 mb-3">Question</h4>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Question
        </label>
        <input
          type="text"
          value={data.question || ''}
          onChange={(e) => handleChange('question', e.target.value)}
          placeholder="Enter your question..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default QuestionSubCard;
