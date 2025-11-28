import React, { useState, useCallback } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import type { Card as CardType, SubCard } from '../types';
import RichTextEditor from './RichTextEditor';
import { ContentTypeMenu, SubCardRenderer } from './';

interface CardProps {
  card: CardType;
  onUpdateCard: (cardId: string, updates: Partial<CardType>) => void;
  onDeleteCard: (cardId: string) => void;
  onAddSubCard: (cardId: string, subcard: SubCard) => void;
  onUpdateSubCard: (cardId: string, subcardId: string, data: Record<string, any>) => void;
  onDeleteSubCard: (cardId: string, subcardId: string) => void;
}

const Card: React.FC<CardProps> = ({
  card,
  onUpdateCard,
  onDeleteCard,
  onAddSubCard,
  onUpdateSubCard,
  onDeleteSubCard,
}) => {
  const [showTopMenu, setShowTopMenu] = useState(false);
  const [showBottomMenu, setShowBottomMenu] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleContentChange = useCallback((content: string) => {
    onUpdateCard(card.id, { content });
  }, [card.id, onUpdateCard]);

  const handleAddSubCard = useCallback((type: string, position: 'top' | 'bottom') => {
    const newSubCard: SubCard = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      data: {},
      position,
    };
    
    onAddSubCard(card.id, newSubCard);
    
    if (position === 'top') {
      setShowTopMenu(false);
    } else {
      setShowBottomMenu(false);
    }
  }, [card.id, onAddSubCard]);

  const topSubCards = card.subcards.filter(sc => sc.position === 'top');
  const bottomSubCards = card.subcards.filter(sc => sc.position === 'bottom');

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-lg shadow-md border border-gray-200 p-6 relative"
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 right-2 cursor-grab hover:cursor-grabbing text-gray-400 hover:text-gray-600"
      >
        <GripVertical className="h-5 w-5" />
      </div>

      {/* Delete Button (only for non-default cards) */}
      {!card.isDefault && (
        <button
          onClick={() => onDeleteCard(card.id)}
          className="absolute top-2 right-10 text-red-400 hover:text-red-600 transition-colors"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      )}

      {/* Top Plus Button */}
      <div className="relative mb-4">
        <button
          onClick={() => setShowTopMenu(!showTopMenu)}
          className="absolute -left-8 top-2 w-6 h-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center text-sm transition-colors z-10"
        >
          <Plus className="h-4 w-4" />
        </button>
        
        {showTopMenu && (
          <div className="absolute -left-2 top-10 z-20">
            <ContentTypeMenu
              onSelect={(type: string) => handleAddSubCard(type, 'top')}
              onClose={() => setShowTopMenu(false)}
            />
          </div>
        )}
      </div>

      {/* Top SubCards */}
      {topSubCards.map((subcard) => (
        <div key={subcard.id} className="mb-4">
          <SubCardRenderer
            subcard={subcard}
            onUpdate={(data: Record<string, any>) => onUpdateSubCard(card.id, subcard.id, data)}
            onDelete={() => onDeleteSubCard(card.id, subcard.id)}
          />
        </div>
      ))}

      {/* Rich Text Editor */}
      <div className="mb-4">
        <RichTextEditor
          content={card.content}
          onChange={handleContentChange}
          placeholder="Start writing your blog content..."
        />
      </div>

      {/* Bottom SubCards */}
      {bottomSubCards.map((subcard) => (
        <div key={subcard.id} className="mb-4">
          <SubCardRenderer
            subcard={subcard}
            onUpdate={(data: Record<string, any>) => onUpdateSubCard(card.id, subcard.id, data)}
            onDelete={() => onDeleteSubCard(card.id, subcard.id)}
          />
        </div>
      ))}

      {/* Bottom Plus Button */}
      <div className="relative">
        <button
          onClick={() => setShowBottomMenu(!showBottomMenu)}
          className="absolute -left-8 top-2 w-6 h-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center text-sm transition-colors z-10"
        >
          <Plus className="h-4 w-4" />
        </button>
        
        {showBottomMenu && (
          <div className="absolute -left-2 top-10 z-20">
            <ContentTypeMenu
              onSelect={(type: string) => handleAddSubCard(type, 'bottom')}
              onClose={() => setShowBottomMenu(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
