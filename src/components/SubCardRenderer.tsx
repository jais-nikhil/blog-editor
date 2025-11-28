import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { SubCard } from '../types';
import ContentTypeMenu from './ContentTypeMenu';
import TextSubCard from './subcards/TextSubCard';
import BlockquoteSubCard from './subcards/BlockquoteSubCard';
import CTASubCard from './subcards/CTASubCard';
import BigFactSubCard from './subcards/BigFactSubCard';
import BlurpSubCard from './subcards/BlurpSubCard';
import QuestionSubCard from './subcards/QuestionSubCard';
import QASubCard from './subcards/QASubCard';
import SummarySubCard from './subcards/SummarySubCard';
import ImageSubCard from './subcards/ImageSubCard';
import AlsoReadSubCard from './subcards/AlsoReadSubCard';
import QuoteSubCard from './subcards/QuoteSubCard';
import EmbedSubCard from './subcards/EmbedSubCard';
import TableSubCard from './subcards/TableSubCard';

interface SubCardRendererProps {
  subcard: SubCard;
  onUpdate: (data: Record<string, any>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onInsertAbove: (type: string) => void;
  onInsertBelow: (type: string) => void;
}

const SubCardRenderer: React.FC<SubCardRendererProps> = ({ subcard, onUpdate, onDelete, onMoveUp, onMoveDown, onInsertAbove, onInsertBelow }) => {
  const [showAboveMenu, setShowAboveMenu] = useState(false);
  const [showBelowMenu, setShowBelowMenu] = useState(false);

  const renderSubCard = () => {
    switch (subcard.type) {
      case 'text':
        return <TextSubCard data={subcard.data} onUpdate={onUpdate} onDelete={onDelete} onMoveUp={onMoveUp} onMoveDown={onMoveDown} />;
      case 'blockquote':
        return <BlockquoteSubCard data={subcard.data} onUpdate={onUpdate} onDelete={onDelete} onMoveUp={onMoveUp} onMoveDown={onMoveDown} />;
      case 'cta':
        return <CTASubCard data={subcard.data} onUpdate={onUpdate} onDelete={onDelete} onMoveUp={onMoveUp} onMoveDown={onMoveDown} />;
      case 'bigfact':
        return <BigFactSubCard data={subcard.data} onUpdate={onUpdate} onDelete={onDelete} onMoveUp={onMoveUp} onMoveDown={onMoveDown} />;
      case 'blurp':
        return <BlurpSubCard data={subcard.data} onUpdate={onUpdate} onDelete={onDelete} onMoveUp={onMoveUp} onMoveDown={onMoveDown} />;
      case 'question':
        return <QuestionSubCard data={subcard.data} onUpdate={onUpdate} onDelete={onDelete} onMoveUp={onMoveUp} onMoveDown={onMoveDown} />;
      case 'qa':
        return <QASubCard data={subcard.data} onUpdate={onUpdate} onDelete={onDelete} onMoveUp={onMoveUp} onMoveDown={onMoveDown} />;
      case 'summary':
        return <SummarySubCard data={subcard.data} onUpdate={onUpdate} onDelete={onDelete} onMoveUp={onMoveUp} onMoveDown={onMoveDown} />;
      case 'image':
        return <ImageSubCard data={subcard.data} onUpdate={onUpdate} onDelete={onDelete} onMoveUp={onMoveUp} onMoveDown={onMoveDown} />;
      case 'alsoread':
        return <AlsoReadSubCard data={subcard.data} onUpdate={onUpdate} onDelete={onDelete} onMoveUp={onMoveUp} onMoveDown={onMoveDown} />;
      case 'quote':
        return <QuoteSubCard data={subcard.data} onUpdate={onUpdate} onDelete={onDelete} onMoveUp={onMoveUp} onMoveDown={onMoveDown} />;
      case 'embed':
        return <EmbedSubCard data={subcard.data} onUpdate={onUpdate} onDelete={onDelete} onMoveUp={onMoveUp} onMoveDown={onMoveDown} />;
      case 'table':
        return <TableSubCard data={subcard.data} onUpdate={onUpdate} onDelete={onDelete} onMoveUp={onMoveUp} onMoveDown={onMoveDown} />;
      default:
        return <div className="p-4 bg-red-100 text-red-700 rounded">Unknown content type: {subcard.type}</div>;
    }
  };

  return (
    <div className="relative" style={{ marginBottom: '40px' }}>
      {/* Plus button above */}
      <div className="relative mb-3">
        <div className="group relative">
          <button
            onClick={() => setShowAboveMenu(!showAboveMenu)}
            className="absolute -left-8 -top-2 w-6 h-6 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center text-sm transition-all duration-300 z-20 hover:scale-110 transform hover:shadow-lg animate-pulse-gentle hover:animate-none"
            title=""
          >
            <Plus className="h-3 w-3 transition-transform duration-300 group-hover:rotate-90" />
          </button>
          
          {/* Fixed tooltip */}
          <div className="absolute left-4 -top-16 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-40 delay-200">
            <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-xl border border-gray-700">
              Insert content above
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </div>
        
        {showAboveMenu && (
          <div className="absolute left-8 -top-2 z-30">
            <ContentTypeMenu
              onSelect={(type: string) => {
                onInsertAbove(type);
                setShowAboveMenu(false);
              }}
              onClose={() => setShowAboveMenu(false)}
            />
          </div>
        )}
      </div>

      {/* Subcard content */}
      <div className="mb-3" data-subcard-id={subcard.id}>
        {renderSubCard()}
      </div>

      {/* Plus button below */}
      <div className="relative" style={{ marginTop: '-12px' }}>
        <div className="group relative">
          <button
            onClick={() => setShowBelowMenu(!showBelowMenu)}
            className="absolute -left-8 -top-3 w-6 h-6 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center text-sm transition-all duration-300 z-20 hover:scale-110 transform hover:shadow-lg animate-pulse-gentle hover:animate-none"
            title=""
          >
            <Plus className="h-3 w-3 transition-transform duration-300 group-hover:rotate-90" />
          </button>
          
          {/* Fixed tooltip */}
          <div className="absolute left-4 -top-16 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-40 delay-200">
            <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-xl border border-gray-700">
              Insert content below
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </div>
        
        {showBelowMenu && (
          <div className="absolute left-8 -top-3 z-30">
            <ContentTypeMenu
              onSelect={(type: string) => {
                onInsertBelow(type);
                setShowBelowMenu(false);
              }}
              onClose={() => setShowBelowMenu(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SubCardRenderer;
