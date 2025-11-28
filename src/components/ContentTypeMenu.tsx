import React, { useEffect, useRef } from 'react';
import { 
  Quote, 
  ExternalLink, 
  TrendingUp, 
  MessageCircle, 
  HelpCircle, 
  MessageSquare, 
  List, 
  Image, 
  BookOpen, 
  Code, 
  Table,
  X
} from 'lucide-react';
import { contentTypes } from '../utils/helpers';

interface ContentTypeMenuProps {
  onSelect: (type: string) => void;
  onClose: () => void;
}

const iconComponents = {
  Quote,
  ExternalLink,
  TrendingUp,
  MessageCircle,
  HelpCircle,
  MessageSquare,
  List,
  Image,
  BookOpen,
  Code,
  Table,
};

const ContentTypeMenu: React.FC<ContentTypeMenuProps> = ({ onSelect, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="bg-white rounded-lg shadow-lg border border-gray-200 py-2 w-48 max-h-80 overflow-y-auto"
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
        <span className="text-sm font-medium text-gray-700">Add Content</span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      {contentTypes.map((type) => {
        const IconComponent = iconComponents[type.icon as keyof typeof iconComponents];
        
        return (
          <button
            key={type.id}
            onClick={() => onSelect(type.id)}
            className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 transition-colors"
          >
            <IconComponent className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">{type.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ContentTypeMenu;
