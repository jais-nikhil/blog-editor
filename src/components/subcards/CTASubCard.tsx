import React from 'react';
import { Trash2, ChevronUp, ChevronDown, MousePointer, Check, ExternalLink, Shield } from 'lucide-react';
import type { CTAData } from '../../types';

interface CTASubCardProps {
  data: Partial<CTAData>;
  onUpdate: (data: Record<string, any>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

const CTASubCard: React.FC<CTASubCardProps> = ({ data, onUpdate, onDelete, onMoveUp, onMoveDown }) => {
  const handleChange = (field: keyof CTAData, value: string | boolean) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg relative">
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
        <MousePointer className="h-4 w-4 text-green-600" />
        <h4 className="text-sm font-bold text-green-800">Call to Action</h4>
      </div>
      
      {/* Inline layout with checkboxes below */}
      <div className="space-y-3">
        <div className="flex space-x-3">
          <div className="flex-1">
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
          
          <div className="flex-1">
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
        </div>
        
        {/* Styled Checkboxes */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="checkbox"
                id="isExternal"
                checked={data.isExternal || false}
                onChange={(e) => handleChange('isExternal', e.target.checked)}
                className="sr-only"
              />
              <label
                htmlFor="isExternal"
                className={`relative flex items-center justify-center w-5 h-5 border-2 rounded cursor-pointer transition-all duration-200 ${
                  data.isExternal
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 bg-white hover:border-green-400'
                }`}
              >
                {data.isExternal && (
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                )}
              </label>
            </div>
            <label htmlFor="isExternal" className="text-sm text-gray-700 cursor-pointer flex items-center gap-1">
              External Link
              <ExternalLink className="h-3 w-3" />
            </label>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="checkbox"
                id="noFollow"
                checked={data.noFollow || false}
                onChange={(e) => handleChange('noFollow', e.target.checked)}
                className="sr-only"
              />
              <label
                htmlFor="noFollow"
                className={`relative flex items-center justify-center w-5 h-5 border-2 rounded cursor-pointer transition-all duration-200 ${
                  data.noFollow
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 bg-white hover:border-green-400'
                }`}
              >
                {data.noFollow && (
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                )}
              </label>
            </div>
            <label htmlFor="noFollow" className="text-sm text-gray-700 cursor-pointer flex items-center gap-1">
              No Follow
              <Shield className="h-3 w-3" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASubCard;
