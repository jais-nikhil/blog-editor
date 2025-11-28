import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import type { ValidationError } from '../utils/validation';
import { getSubcardTypeName } from '../utils/validation';

interface ValidationErrorsProps {
  errors: ValidationError[];
  onClose: () => void;
  onScrollToError?: (subcardId: string) => void;
}

const ValidationErrors: React.FC<ValidationErrorsProps> = ({ errors, onClose, onScrollToError }) => {
  if (errors.length === 0) return null;

  // Group errors by subcard
  const errorsBySubcard = errors.reduce((acc, error) => {
    if (!acc[error.subcardId]) {
      acc[error.subcardId] = {
        type: error.subcardType,
        errors: [],
      };
    }
    acc[error.subcardId].errors.push(error);
    return acc;
  }, {} as Record<string, { type: string; errors: ValidationError[] }>);

  return (
    <div className="fixed bottom-4 right-4 max-w-md z-50 animate-slide-up">
      <div className="bg-red-50 border-l-4 border-red-500 rounded-lg shadow-lg p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <h3 className="text-sm font-bold text-red-900">
              Validation Errors ({errors.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-600 transition-colors"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {Object.entries(errorsBySubcard).map(([subcardId, { type, errors: subcardErrors }]) => (
            <div
              key={subcardId}
              className="bg-white rounded-md p-3 border border-red-200 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onScrollToError?.(subcardId)}
            >
              <div className="font-medium text-sm text-red-900 mb-1">
                {getSubcardTypeName(type)}
              </div>
              <ul className="space-y-1">
                {subcardErrors.map((error, idx) => (
                  <li key={idx} className="text-xs text-red-700 flex items-start gap-1">
                    <span className="mt-0.5">•</span>
                    <span>{error.message}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-3 pt-3 border-t border-red-200">
          <p className="text-xs text-red-700">
            Please fix the errors above to submit your blog. Empty cards will be automatically removed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ValidationErrors;
