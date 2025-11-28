import React, { useEffect, useRef } from 'react';
import { 
  Type,
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
  Type,
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
      className="bg-white rounded-lg shadow-lg border border-gray-200 p-2"
    >
      <div className="flex items-center space-x-1">
        {contentTypes.map((type) => {
          const IconComponent = iconComponents[type.icon as keyof typeof iconComponents];
          
          return (
            <button
              key={type.id}
              onClick={() => onSelect(type.id)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800"
              title={type.name}
            >
              <IconComponent className="h-4 w-4" />
            </button>
          );
        })}
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button
          onClick={onClose}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          title="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ContentTypeMenu;
