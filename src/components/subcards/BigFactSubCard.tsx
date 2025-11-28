import React from 'react';
import { Trash2 } from 'lucide-react';
import type { BigFactData } from '../../types';

interface BigFactSubCardProps {
  data: Partial<BigFactData>;
  onUpdate: (data: Record<string, any>) => void;
  onDelete: () => void;
}

const BigFactSubCard: React.FC<BigFactSubCardProps> = ({ data, onUpdate, onDelete }) => {
  const handleChange = (field: keyof BigFactData, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg relative">
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 text-red-400 hover:text-red-600 transition-colors"
      >
        <Trash2 className="h-4 w-4" />
      </button>
      
      <h4 className="text-sm font-medium text-orange-800 mb-3">Big Fact</h4>
      
      <div className="space-y-3">
        <div>
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
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={data.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Enter a description or context..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            rows={2}
          />
        </div>
      </div>
    </div>
  );
};

export default BigFactSubCard;
