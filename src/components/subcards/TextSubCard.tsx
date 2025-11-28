import React from 'react';
import { Trash2, ChevronUp, ChevronDown, Type } from 'lucide-react';
import RichTextEditor from '../RichTextEditor';

interface TextData {
  content: string;
}

interface TextSubCardProps {
  data: Partial<TextData>;
  onUpdate: (data: Record<string, any>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  validationErrors?: Array<{ field: string; message: string }>;
}

const TextSubCard: React.FC<TextSubCardProps> = ({ data, onUpdate, onDelete, onMoveUp, onMoveDown }) => {
  const handleContentChange = (content: string) => {
    onUpdate({ ...data, content });
  };

  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg relative">
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
        <Type className="h-4 w-4 text-blue-600" />
        <h4 className="text-sm font-bold text-blue-800">Rich Text</h4>
      </div>
      
      <RichTextEditor
        content={data.content || ''}
        onChange={handleContentChange}
        placeholder="Enter your text content..."
      />
    </div>
  );
};

export default TextSubCard;
