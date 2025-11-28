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
            <div key={type.id} className="group relative">
              <button
                onClick={() => onSelect(type.id)}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800"
              >
                <IconComponent className="h-4 w-4" />
              </button>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50">
                <div className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-md whitespace-nowrap shadow-xl border border-gray-700">
                  {type.name}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <div className="group relative">
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
          
          {/* Close button tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50">
            <div className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-md whitespace-nowrap shadow-xl border border-gray-700">
              Close
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentTypeMenu;
