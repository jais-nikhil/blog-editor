// Content types that can be added to cards
export interface ContentType {
  id: string;
  name: string;
  icon: string;
  component: string;
}

export interface SubCard {
  id: string;
  type: string;
  data: Record<string, any>;
  position: 'top' | 'bottom';
}

export interface Card {
  id: string;
  content: string; // Rich text content
  subcards: SubCard[];
  isDefault?: boolean; // Primary card cannot be deleted
}

export interface BlogEditorState {
  cards: Card[];
}

// Content type data structures
export interface TextData {
  content: string;
}

export interface BlockquoteData {
  title: string;
  attribute: string;
}

export interface CTAData {
  title: string;
  actionUrl: string;
  isExternal: boolean;
  noFollow: boolean;
}

export interface BigFactData {
  fact: string;
  description: string;
}

export interface BlurpData {
  content: string;
}

export interface QuestionData {
  question: string;
}

export interface QAData {
  question: string;
  answer: string;
}

export interface SummaryData {
  title: string;
  points: string[];
}

export interface ImageData {
  url: string;
  alt: string;
  caption: string;
  credit: string;
}

export interface AlsoReadData {
  title: string;
  url: string;
  description: string;
}

export interface QuoteData {
  quote: string;
  author: string;
  source: string;
}

export interface EmbedData {
  embedCode: string;
  type: 'video' | 'iframe' | 'other';
}

export interface TableData {
  headers: string[];
  rows: string[][];
}
