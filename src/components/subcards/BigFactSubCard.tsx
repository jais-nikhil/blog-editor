import React from 'react';
import { Trash2, ChevronUp, ChevronDown, TrendingUp } from 'lucide-react';
import type { BigFactData } from '../../types';

interface BigFactSubCardProps {
  data: Partial<BigFactData>;
  onUpdate: (data: Record<string, any>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

const BigFactSubCard: React.FC<BigFactSubCardProps> = ({ data, onUpdate, onDelete, onMoveUp, onMoveDown }) => {
  const handleChange = (field: keyof BigFactData, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg relative">
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
        <TrendingUp className="h-4 w-4 text-orange-600" />
        <h4 className="text-sm font-bold text-orange-800">Big Fact</h4>
      </div>
      
      {/* Inline layout */}
      <div className="flex space-x-3">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fact
          </label>
          <input
            type="text"
            value={data.fact || ''}
            onChange={(e) => handleChange('fact', e.target.value)}
            placeholder="Enter the main fact..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            value={data.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Enter a description or context..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default BigFactSubCard;
