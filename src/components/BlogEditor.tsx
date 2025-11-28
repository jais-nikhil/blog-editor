import React, { useState, useCallback } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import type { Card as CardType, BlogEditorState, SubCard } from '../types';
import { Card } from './';
import { generateId } from '../utils/helpers';

const BlogEditor: React.FC = () => {
  const [state, setState] = useState<BlogEditorState>({
    cards: [
      {
        id: generateId(),
        content: '',
        subcards: [],
        isDefault: true,
      },
    ],
  });

  const addCard = useCallback(() => {
    const newCard: CardType = {
      id: generateId(),
      content: '',
      subcards: [],
    };
    
    setState(prev => ({
      ...prev,
      cards: [...prev.cards, newCard],
    }));
  }, []);

  const updateCard = useCallback((cardId: string, updates: Partial<CardType>) => {
    setState(prev => ({
      ...prev,
      cards: prev.cards.map(card =>
        card.id === cardId ? { ...card, ...updates } : card
      ),
    }));
  }, []);

  const deleteCard = useCallback((cardId: string) => {
    setState(prev => ({
      ...prev,
      cards: prev.cards.filter(card => card.id !== cardId),
    }));
  }, []);

  const addSubCard = useCallback((cardId: string, subcard: SubCard) => {
    setState(prev => ({
      ...prev,
      cards: prev.cards.map(card =>
        card.id === cardId
          ? {
              ...card,
              subcards: subcard.position === 'top'
                ? [subcard, ...card.subcards.filter(sc => sc.position === 'top'), ...card.subcards.filter(sc => sc.position === 'bottom')]
                : [...card.subcards.filter(sc => sc.position === 'top'), ...card.subcards.filter(sc => sc.position === 'bottom'), subcard]
            }
          : card
      ),
    }));
  }, []);

  const insertSubCard = useCallback((cardId: string, subcardId: string, newSubcard: SubCard, position: 'above' | 'below') => {
    setState(prev => ({
      ...prev,
      cards: prev.cards.map(card => {
        if (card.id !== cardId) return card;
        
        const subcardIndex = card.subcards.findIndex(sc => sc.id === subcardId);
        if (subcardIndex === -1) return card;
        
        const insertIndex = position === 'above' ? subcardIndex : subcardIndex + 1;
        const newSubcards = [...card.subcards];
        newSubcards.splice(insertIndex, 0, newSubcard);
        
        return { ...card, subcards: newSubcards };
      }),
    }));
  }, []);

  const updateSubCard = useCallback((cardId: string, subcardId: string, data: Record<string, any>) => {
    setState(prev => ({
      ...prev,
      cards: prev.cards.map(card =>
        card.id === cardId
          ? {
              ...card,
              subcards: card.subcards.map(subcard =>
                subcard.id === subcardId ? { ...subcard, data } : subcard
              ),
            }
          : card
      ),
    }));
  }, []);

  const moveSubCard = useCallback((cardId: string, subcardId: string, direction: 'up' | 'down') => {
    setState(prev => ({
      ...prev,
      cards: prev.cards.map(card => {
        if (card.id !== cardId) return card;
        
        const topSubcards = card.subcards.filter(sc => sc.position === 'top');
        const bottomSubcards = card.subcards.filter(sc => sc.position === 'bottom');
        
        const moveInArray = (arr: SubCard[]) => {
          const index = arr.findIndex(sc => sc.id === subcardId);
          if (index === -1) return arr;
          
          const newIndex = direction === 'up' ? index - 1 : index + 1;
          if (newIndex < 0 || newIndex >= arr.length) return arr;
          
          const newArray = [...arr];
          [newArray[index], newArray[newIndex]] = [newArray[newIndex], newArray[index]];
          return newArray;
        };
        
        const newTopSubcards = moveInArray(topSubcards);
        const newBottomSubcards = moveInArray(bottomSubcards);
        
        return {
          ...card,
          subcards: [...newTopSubcards, ...newBottomSubcards],
        };
      }),
    }));
  }, []);

  const deleteSubCard = useCallback((cardId: string, subcardId: string) => {
    setState(prev => ({
      ...prev,
      cards: prev.cards.map(card =>
        card.id === cardId
          ? {
              ...card,
              subcards: card.subcards.filter(subcard => subcard.id !== subcardId),
            }
          : card
      ),
    }));
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) {
      return;
    }

    setState(prev => {
      const oldIndex = prev.cards.findIndex(card => card.id === active.id);
      const newIndex = prev.cards.findIndex(card => card.id === over.id);
      
      const newCards = [...prev.cards];
      const [removed] = newCards.splice(oldIndex, 1);
      newCards.splice(newIndex, 0, removed);
      
      return { ...prev, cards: newCards };
    });
  }, []);

  const handleSubmit = useCallback(() => {
    // Filter out empty cards and subcards
    const filteredCards = state.cards
      .map(card => ({
        ...card,
        subcards: card.subcards.filter(subcard => {
          // Check if subcard has any meaningful data
          return Object.values(subcard.data).some(value => 
            typeof value === 'string' ? value.trim() !== '' : Boolean(value)
          );
        }),
      }))
      .filter(card => card.content.trim() !== '' || card.subcards.length > 0);

    if (filteredCards.length === 0) {
      alert('Please add some content before submitting.');
      return;
    }

    const hasEmptyContent = state.cards.some(card => 
      card.content.trim() === '' && card.subcards.length === 0
    ) || state.cards.some(card =>
      card.subcards.some(subcard =>
        !Object.values(subcard.data).some(value => 
          typeof value === 'string' ? value.trim() !== '' : Boolean(value)
        )
      )
    );

    if (hasEmptyContent) {
      const confirmed = window.confirm(
        'Some cards or subcards are empty and will be removed. Do you want to continue?'
      );
      
      if (!confirmed) {
        return;
      }
    }

    // Update state with filtered cards
    setState(prev => ({ ...prev, cards: filteredCards }));
    
    // Here you would typically send the data to your backend
    console.log('Submitted data:', { cards: filteredCards });
    alert('Blog content submitted successfully!');
  }, [state.cards]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={state.cards.map(card => card.id)} strategy={verticalListSortingStrategy}>
          {state.cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              onUpdateCard={updateCard}
              onDeleteCard={deleteCard}
              onAddSubCard={addSubCard}
              onUpdateSubCard={updateSubCard}
              onDeleteSubCard={deleteSubCard}
              onMoveSubCard={moveSubCard}
              onInsertSubCard={insertSubCard}
            />
          ))}
        </SortableContext>
      </DndContext>

      <div className="flex justify-center">
        <button
          onClick={addCard}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Card</span>
        </button>
      </div>

      <div className="flex justify-center pt-8">
        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
        >
          Submit Blog
        </button>
      </div>
    </div>
  );
};

export default BlogEditor;
