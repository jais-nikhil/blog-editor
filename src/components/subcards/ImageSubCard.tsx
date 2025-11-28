import React from 'react';
import { Trash2 } from 'lucide-react';
import type { ImageData } from '../../types';

interface ImageSubCardProps {
  data: Partial<ImageData>;
  onUpdate: (data: Record<string, any>) => void;
  onDelete: () => void;
}

const ImageSubCard: React.FC<ImageSubCardProps> = ({ data, onUpdate, onDelete }) => {
  const handleChange = (field: keyof ImageData, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="bg-pink-50 border-l-4 border-pink-500 p-4 rounded-r-lg relative">
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 text-red-400 hover:text-red-600 transition-colors"
      >
        <Trash2 className="h-4 w-4" />
      </button>
      
      <h4 className="text-sm font-medium text-pink-800 mb-3">Image</h4>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="url"
            value={data.url || ''}
            onChange={(e) => handleChange('url', e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alt Text
          </label>
          <input
            type="text"
            value={data.alt || ''}
            onChange={(e) => handleChange('alt', e.target.value)}
            placeholder="Describe the image..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Caption
          </label>
          <input
            type="text"
            value={data.caption || ''}
            onChange={(e) => handleChange('caption', e.target.value)}
            placeholder="Image caption (optional)..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
        
        {data.url && (
          <div className="mt-3">
            <img
              src={data.url}
              alt={data.alt || 'Preview'}
              className="max-w-full h-auto rounded-md border border-gray-200"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageSubCard;
