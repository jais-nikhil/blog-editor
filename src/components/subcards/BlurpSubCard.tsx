import React from 'react';
import { Trash2, ChevronUp, ChevronDown, MessageCircle } from 'lucide-react';
import type { BlurpData } from '../../types';

interface BlurpSubCardProps {
  data: Partial<BlurpData>;
  onUpdate: (data: Record<string, any>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

const BlurpSubCard: React.FC<BlurpSubCardProps> = ({ data, onUpdate, onDelete, onMoveUp, onMoveDown }) => {
  const handleChange = (field: keyof BlurpData, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg relative">
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
        <MessageCircle className="h-4 w-4 text-purple-600" />
        <h4 className="text-sm font-bold text-purple-800">Blurp</h4>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <input
          type="text"
          value={data.content || ''}
          onChange={(e) => handleChange('content', e.target.value)}
          placeholder="Enter blurp content..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default BlurpSubCard;
