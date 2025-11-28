import React from 'react';
import { Trash2 } from 'lucide-react';
import type { BlurpData } from '../../types';

interface BlurpSubCardProps {
  data: Partial<BlurpData>;
  onUpdate: (data: Record<string, any>) => void;
  onDelete: () => void;
}

const BlurpSubCard: React.FC<BlurpSubCardProps> = ({ data, onUpdate, onDelete }) => {
  const handleChange = (field: keyof BlurpData, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg relative">
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 text-red-400 hover:text-red-600 transition-colors"
      >
        <Trash2 className="h-4 w-4" />
      </button>
      
      <h4 className="text-sm font-medium text-purple-800 mb-3">Blurp</h4>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          value={data.content || ''}
          onChange={(e) => handleChange('content', e.target.value)}
          placeholder="Enter blurp content..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>
    </div>
  );
};

export default BlurpSubCard;
