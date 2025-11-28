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
    <div className="relative">
      {/* Plus button above */}
      <div className="relative mb-2">
        <button
          onClick={() => setShowAboveMenu(!showAboveMenu)}
          className="absolute -left-8 top-0 w-6 h-6 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center text-sm transition-colors z-10"
          title="Add content above"
        >
          <Plus className="h-3 w-3" />
        </button>
        
        {showAboveMenu && (
          <div className="absolute left-8 top-0 z-20">
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
      {renderSubCard()}

      {/* Plus button below */}
      <div className="relative mt-2">
        <button
          onClick={() => setShowBelowMenu(!showBelowMenu)}
          className="absolute -left-8 top-0 w-6 h-6 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center text-sm transition-colors z-10"
          title="Add content below"
        >
          <Plus className="h-3 w-3" />
        </button>
        
        {showBelowMenu && (
          <div className="absolute left-8 top-0 z-20">
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
