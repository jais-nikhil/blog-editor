import React from 'react';
import { Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import type { BlockquoteData } from '../../types';

interface BlockquoteSubCardProps {
  data: Partial<BlockquoteData>;
  onUpdate: (data: Record<string, any>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

const BlockquoteSubCard: React.FC<BlockquoteSubCardProps> = ({ data, onUpdate, onDelete, onMoveUp, onMoveDown }) => {
  const handleChange = (field: keyof BlockquoteData, value: string) => {
    onUpdate({ ...data, [field]: value });
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
      
      <h4 className="text-sm font-medium text-blue-800 mb-3">Blockquote</h4>
      
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
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
