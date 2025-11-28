import React from 'react';
import { AlertCircle } from 'lucide-react';

interface InlineFieldErrorProps {
  message?: string;
}

const InlineFieldError: React.FC<InlineFieldErrorProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex items-start gap-1.5 mt-1 text-red-600 animate-slide-down">
      <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
      <span className="text-xs font-medium">{message}</span>
    </div>
  );
};

export default InlineFieldError;