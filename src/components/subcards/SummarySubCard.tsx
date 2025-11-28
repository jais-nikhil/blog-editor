import React from 'react';
import { Trash2, Plus, X, ChevronUp, ChevronDown, List } from 'lucide-react';
import type { SummaryData } from '../../types';
import { InlineFieldError } from '../index';

interface SummarySubCardProps {
  data: Partial<SummaryData>;
  onUpdate: (data: Record<string, any>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  validationErrors?: Array<{ field: string; message: string }>;
}

const SummarySubCard: React.FC<SummarySubCardProps> = ({ data, onUpdate, onDelete, onMoveUp, onMoveDown, validationErrors = [] }) => {
  const points = data.points || [''];

  const getFieldError = (fieldName: string) => {
    return validationErrors.find(e => e.field === fieldName)?.message;
  };

  const handleTitleChange = (value: string) => {
    onUpdate({ ...data, title: value });
  };

  const handlePointChange = (index: number, value: string) => {
    const newPoints = [...points];
    newPoints[index] = value;
    onUpdate({ ...data, points: newPoints });
  };

  const addPoint = () => {
    onUpdate({ ...data, points: [...points, ''] });
  };

  const removePoint = (index: number) => {
    if (points.length > 1) {
      const newPoints = points.filter((_, i) => i !== index);
      onUpdate({ ...data, points: newPoints });
    }
  };

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg relative">
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
      
      <div className="flex items-center gap-2 mb-3">
        <List className="h-4 w-4 text-yellow-600" />
        <h4 className="text-sm font-bold text-yellow-800">Summary</h4>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={data.title || ''}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Enter summary title..."
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
              getFieldError('title') ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
          <InlineFieldError message={getFieldError('title')} />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Points
          </label>
          <div className="space-y-2">
            {points.map((point, index) => (
              <div key={index}>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={point}
                    onChange={(e) => handlePointChange(index, e.target.value)}
                    placeholder={`Point ${index + 1}...`}
                    className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                      getFieldError(`points[${index}]`) ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {points.length > 1 && (
                    <button
                      onClick={() => removePoint(index)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <InlineFieldError message={getFieldError(`points[${index}]`)} />
              </div>
            ))}
            <button
              onClick={addPoint}
              className="flex items-center space-x-1 text-yellow-600 hover:text-yellow-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span className="text-sm">Add Point</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarySubCard;
