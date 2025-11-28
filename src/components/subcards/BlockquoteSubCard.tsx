import React from 'react';
import { Trash2, ChevronUp, ChevronDown, Quote } from 'lucide-react';
import type { BlockquoteData } from '../../types';
import { InlineFieldError } from '../index';

interface BlockquoteSubCardProps {
  data: Partial<BlockquoteData>;
  onUpdate: (data: Record<string, any>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  validationErrors?: Array<{ field: string; message: string }>;
}

const BlockquoteSubCard: React.FC<BlockquoteSubCardProps> = ({ data, onUpdate, onDelete, onMoveUp, onMoveDown, validationErrors = [] }) => {
  const handleChange = (field: keyof BlockquoteData, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  const getFieldError = (fieldName: string) => {
    return validationErrors.find(e => e.field === fieldName)?.message;
  };

  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg relative">
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
        <Quote className="h-4 w-4 text-blue-600" />
        <h4 className="text-sm font-bold text-blue-800">Blockquote</h4>
      </div>
      
      {/* Inline layout */}
      <div className="flex space-x-3">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quote Text
          </label>
          <input
            type="text"
            value={data.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Enter the quote text..."
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              getFieldError('title') ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
          <InlineFieldError message={getFieldError('title')} />
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Attribution
          </label>
          <input
            type="text"
            value={data.attribute || ''}
            onChange={(e) => handleChange('attribute', e.target.value)}
            placeholder="Author or source..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default BlockquoteSubCard;
