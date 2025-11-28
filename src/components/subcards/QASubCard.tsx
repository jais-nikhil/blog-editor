import React from 'react';
import { Trash2 } from 'lucide-react';
import type { QAData } from '../../types';

interface QASubCardProps {
  data: Partial<QAData>;
  onUpdate: (data: Record<string, any>) => void;
  onDelete: () => void;
}

const QASubCard: React.FC<QASubCardProps> = ({ data, onUpdate, onDelete }) => {
  const handleChange = (field: keyof QAData, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-lg relative">
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 text-red-400 hover:text-red-600 transition-colors"
      >
        <Trash2 className="h-4 w-4" />
      </button>
      
      <h4 className="text-sm font-medium text-teal-800 mb-3">Q & A</h4>
      
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
