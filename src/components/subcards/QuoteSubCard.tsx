import React from 'react';
import { Trash2, ChevronUp, ChevronDown, Quote as QuoteIcon } from 'lucide-react';
import type { QuoteData } from '../../types';

interface QuoteSubCardProps {
  data: Partial<QuoteData>;
  onUpdate: (data: Record<string, any>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

const QuoteSubCard: React.FC<QuoteSubCardProps> = ({ data, onUpdate, onDelete, onMoveUp, onMoveDown }) => {
  const handleChange = (field: keyof QuoteData, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="bg-gray-50 border-l-4 border-gray-500 p-4 rounded-r-lg relative">
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
        <QuoteIcon className="h-4 w-4 text-gray-600" />
        <h4 className="text-sm font-bold text-gray-800">Quote</h4>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quote
          </label>
          <textarea
            value={data.quote || ''}
            onChange={(e) => handleChange('quote', e.target.value)}
            placeholder="Enter the quote..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Author
          </label>
          <input
            type="text"
            value={data.author || ''}
            onChange={(e) => handleChange('author', e.target.value)}
            placeholder="Author name..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Source
          </label>
          <input
            type="text"
            value={data.source || ''}
            onChange={(e) => handleChange('source', e.target.value)}
            placeholder="Source (optional)..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default QuoteSubCard;
