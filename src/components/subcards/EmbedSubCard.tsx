import React from 'react';
import { Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import type { EmbedData } from '../../types';

interface EmbedSubCardProps {
  data: Partial<EmbedData>;
  onUpdate: (data: Record<string, any>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

const EmbedSubCard: React.FC<EmbedSubCardProps> = ({ data, onUpdate, onDelete, onMoveUp, onMoveDown }) => {
  const handleChange = (field: keyof EmbedData, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg relative">
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
      
      <h4 className="text-sm font-medium text-red-800 mb-3">Embed</h4>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Embed Type
          </label>
          <select
            value={data.type || 'iframe'}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="iframe">iFrame</option>
            <option value="video">Video</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Embed Code
          </label>
          <textarea
            value={data.embedCode || ''}
            onChange={(e) => handleChange('embedCode', e.target.value)}
            placeholder="Paste your embed code here..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono text-sm resize-none"
            rows={4}
          />
        </div>
        
        {data.embedCode && (
          <div className="mt-3">
            <p className="text-xs text-gray-500 mb-2">Preview:</p>
            <div 
              className="border border-gray-200 rounded-md p-2 bg-white"
              dangerouslySetInnerHTML={{ __html: data.embedCode }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EmbedSubCard;
