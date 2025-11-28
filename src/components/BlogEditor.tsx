import React, { useState, useCallback } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import type { Card as CardType, BlogEditorState, SubCard } from '../types';
import { Card } from './';
import { generateId } from '../utils/helpers';
import { validateSubcard, isSubcardEmpty, type ValidationError } from '../utils/validation';
import ValidationErrors from './ValidationErrors';

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

  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

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
    // Step 1: Validate all subcards and collect errors
    const allErrors: ValidationError[] = [];
    
    state.cards.forEach(card => {
      card.subcards.forEach(subcard => {
        const errors = validateSubcard(subcard);
        allErrors.push(...errors);
      });
    });

    // Step 2: If there are validation errors, show them and stop
    if (allErrors.length > 0) {
      setValidationErrors(allErrors);
      return;
    }

    // Step 3: Remove completely empty subcards
    const filteredCards = state.cards
      .map(card => ({
        ...card,
        subcards: card.subcards.filter(subcard => !isSubcardEmpty(subcard)),
      }))
      .filter(card => card.content.trim() !== '' || card.subcards.length > 0);

    // Step 4: Check if there's any content at all
    if (filteredCards.length === 0) {
      setValidationErrors([{
        subcardId: 'general',
        subcardType: 'general',
        field: 'content',
        message: 'Please add some content before submitting.',
      }]);
      return;
    }

    // Step 5: Clear any previous errors and update state
    setValidationErrors([]);
    setState(prev => ({ ...prev, cards: filteredCards }));
    
    // Step 6: Submit the data
    console.log('Submitted data:', { cards: filteredCards });
    alert('Blog content submitted successfully!');
    
    // Here you would typically send the data to your backend
    // Example: await fetch('/api/blog', { method: 'POST', body: JSON.stringify({ cards: filteredCards }) });
  }, [state.cards]);

  const handleScrollToError = useCallback((subcardId: string) => {
    const element = document.querySelector(`[data-subcard-id="${subcardId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add a highlight effect
      element.classList.add('ring-2', 'ring-red-500', 'ring-offset-2');
      setTimeout(() => {
        element.classList.remove('ring-2', 'ring-red-500', 'ring-offset-2');
      }, 2000);
    }
  }, []);

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

      {/* Validation Errors Display */}
      <ValidationErrors
        errors={validationErrors}
        onClose={() => setValidationErrors([])}
        onScrollToError={handleScrollToError}
      />
    </div>
  );
};

export default BlogEditor;
