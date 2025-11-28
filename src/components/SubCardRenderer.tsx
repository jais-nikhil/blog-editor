import React from 'react';
import type { SubCard } from '../types';
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
}

const SubCardRenderer: React.FC<SubCardRendererProps> = ({ subcard, onUpdate, onDelete }) => {
  const renderSubCard = () => {
    switch (subcard.type) {
      case 'blockquote':
        return <BlockquoteSubCard data={subcard.data} onUpdate={onUpdate} onDelete={onDelete} />;
      case 'cta':
        return <CTASubCard data={subcard.data} onUpdate={onUpdate} onDelete={onDelete} />;
      case 'bigfact':
        return <BigFactSubCard data={subcard.data} onUpdate={onUpdate} onDelete={onDelete} />;
      case 'blurp':
        return <BlurpSubCard data={subcard.data} onUpdate={onUpdate} onDelete={onDelete} />;
      case 'question':
        return <QuestionSubCard data={subcard.data} onUpdate={onUpdate} onDelete={onDelete} />;
      case 'qa':
        return <QASubCard data={subcard.data} onUpdate={onUpdate} onDelete={onDelete} />;
      case 'summary':
        return <SummarySubCard data={subcard.data} onUpdate={onUpdate} onDelete={onDelete} />;
      case 'image':
        return <ImageSubCard data={subcard.data} onUpdate={onUpdate} onDelete={onDelete} />;
      case 'alsoread':
        return <AlsoReadSubCard data={subcard.data} onUpdate={onUpdate} onDelete={onDelete} />;
      case 'quote':
        return <QuoteSubCard data={subcard.data} onUpdate={onUpdate} onDelete={onDelete} />;
      case 'embed':
        return <EmbedSubCard data={subcard.data} onUpdate={onUpdate} onDelete={onDelete} />;
      case 'table':
        return <TableSubCard data={subcard.data} onUpdate={onUpdate} onDelete={onDelete} />;
      default:
        return <div className="p-4 bg-red-100 text-red-700 rounded">Unknown content type: {subcard.type}</div>;
    }
  };

  return <div className="relative">{renderSubCard()}</div>;
};

export default SubCardRenderer;
