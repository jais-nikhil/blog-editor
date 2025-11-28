import React from 'react';
import { Trash2 } from 'lucide-react';
import type { CTAData } from '../../types';

interface CTASubCardProps {
  data: Partial<CTAData>;
  onUpdate: (data: Record<string, any>) => void;
  onDelete: () => void;
}

const CTASubCard: React.FC<CTASubCardProps> = ({ data, onUpdate, onDelete }) => {
  const handleChange = (field: keyof CTAData, value: string | boolean) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg relative">
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 text-red-400 hover:text-red-600 transition-colors"
      >
        <Trash2 className="h-4 w-4" />
      </button>
      
      <h4 className="text-sm font-medium text-green-800 mb-3">Call to Action</h4>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={data.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Enter CTA title..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Action URL
          </label>
          <input
            type="url"
            value={data.actionUrl || ''}
            onChange={(e) => handleChange('actionUrl', e.target.value)}
            placeholder="https://example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.isExternal || false}
              onChange={(e) => handleChange('isExternal', e.target.checked)}
              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span className="ml-2 text-sm text-gray-700">External Link</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.noFollow || false}
              onChange={(e) => handleChange('noFollow', e.target.checked)}
              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span className="ml-2 text-sm text-gray-700">No Follow</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default CTASubCard;
