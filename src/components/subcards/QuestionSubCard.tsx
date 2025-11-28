import React from 'react';
import { Trash2, ChevronUp, ChevronDown, HelpCircle } from 'lucide-react';
import type { QuestionData } from '../../types';
import { InlineFieldError } from '../index';

interface QuestionSubCardProps {
  data: Partial<QuestionData>;
  onUpdate: (data: Record<string, any>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  validationErrors?: Array<{ field: string; message: string }>;
}

const QuestionSubCard: React.FC<QuestionSubCardProps> = ({ data, onUpdate, onDelete, onMoveUp, onMoveDown, validationErrors = [] }) => {
  const handleChange = (field: keyof QuestionData, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  const getFieldError = (fieldName: string) => {
    return validationErrors.find(e => e.field === fieldName)?.message;
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
      
      <div className="flex items-center gap-2 mb-3">
        <HelpCircle className="h-4 w-4 text-indigo-600" />
        <h4 className="text-sm font-bold text-indigo-800">Question</h4>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Question
        </label>
        <input
          type="text"
          value={data.question || ''}
          onChange={(e) => handleChange('question', e.target.value)}
          placeholder="Enter your question..."
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
            getFieldError('question') ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
        />
        <InlineFieldError message={getFieldError('question')} />
      </div>
    </div>
  );
};

export default QuestionSubCard;
