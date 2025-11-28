import React from 'react';
import { Trash2 } from 'lucide-react';
import type { AlsoReadData } from '../../types';

interface AlsoReadSubCardProps {
  data: Partial<AlsoReadData>;
  onUpdate: (data: Record<string, any>) => void;
  onDelete: () => void;
}

const AlsoReadSubCard: React.FC<AlsoReadSubCardProps> = ({ data, onUpdate, onDelete }) => {
  const handleChange = (field: keyof AlsoReadData, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 rounded-r-lg relative">
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 text-red-400 hover:text-red-600 transition-colors"
      >
        <Trash2 className="h-4 w-4" />
      </button>
      
      <h4 className="text-sm font-medium text-cyan-800 mb-3">Also Read</h4>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={data.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Article title..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL
          </label>
          <input
            type="url"
            value={data.url || ''}
            onChange={(e) => handleChange('url', e.target.value)}
            placeholder="https://example.com/article"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={data.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Brief description of the article..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
            rows={2}
          />
        </div>
      </div>
    </div>
  );
};

export default AlsoReadSubCard;
