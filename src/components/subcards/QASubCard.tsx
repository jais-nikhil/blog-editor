import React from 'react';
import { Trash2, ChevronUp, ChevronDown, MessageSquare } from 'lucide-react';
import type { QAData } from '../../types';

interface QASubCardProps {
  data: Partial<QAData>;
  onUpdate: (data: Record<string, any>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

const QASubCard: React.FC<QASubCardProps> = ({ data, onUpdate, onDelete, onMoveUp, onMoveDown }) => {
  const handleChange = (field: keyof QAData, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-lg relative">
      <div className="absolute top-2 right-2 flex gap-1">
        <button
          onClick={onMoveUp}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          title="Move up"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
        <button
          onClick={onMoveDown}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          title="Move down"
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
        <MessageSquare className="h-4 w-4 text-teal-600" />
        <h4 className="text-sm font-bold text-teal-800">Q & A</h4>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Question
          </label>
          <textarea
            value={data.question || ''}
            onChange={(e) => handleChange('question', e.target.value)}
            placeholder="Enter the question..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
            rows={2}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Answer
          </label>
          <textarea
            value={data.answer || ''}
            onChange={(e) => handleChange('answer', e.target.value)}
            placeholder="Enter the answer..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};

export default QASubCard;
