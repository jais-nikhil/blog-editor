import type { SubCard } from '../types';

export interface ValidationError {
  subcardId: string;
  subcardType: string;
  field: string;
  message: string;
}

/**
 * Check if a subcard is completely empty (has no meaningful data)
 */
export const isSubcardEmpty = (subcard: SubCard): boolean => {
  const data = subcard.data;
  
  // Check all values in data
  const hasData = Object.values(data).some(value => {
    if (typeof value === 'string') {
      return value.trim() !== '';
    }
    if (typeof value === 'boolean') {
      return false; // Booleans don't count as "data"
    }
    if (Array.isArray(value)) {
      return value.length > 0 && value.some(item => 
        typeof item === 'string' ? item.trim() !== '' : Boolean(item)
      );
    }
    return Boolean(value);
  });
  
  return !hasData;
};

/**
 * Validate a subcard and return any errors
 */
export const validateSubcard = (subcard: SubCard): ValidationError[] => {
  const errors: ValidationError[] = [];
  const { type, data, id } = subcard;
  
  // If subcard is completely empty, it's valid (will be removed)
  if (isSubcardEmpty(subcard)) {
    return [];
  }
  
  // Validation rules by type
  switch (type) {
    case 'text':
      if (!data.content || data.content.trim() === '') {
        errors.push({
          subcardId: id,
          subcardType: type,
          field: 'content',
          message: 'Content is required',
        });
      }
      break;
      
    case 'blockquote':
      if (!data.title || data.title.trim() === '') {
        errors.push({
          subcardId: id,
          subcardType: type,
          field: 'title',
          message: 'Quote text is required',
        });
      }
      break;
      
    case 'cta':
      if (!data.title || data.title.trim() === '') {
        errors.push({
          subcardId: id,
          subcardType: type,
          field: 'title',
          message: 'Title is required',
        });
      }
      if (!data.actionUrl || data.actionUrl.trim() === '') {
        errors.push({
          subcardId: id,
          subcardType: type,
          field: 'actionUrl',
          message: 'Action URL is required',
        });
      } else {
        // Validate URL format
        const urlPattern = /^https?:\/\/.+/i;
        if (!urlPattern.test(data.actionUrl)) {
          errors.push({
            subcardId: id,
            subcardType: type,
            field: 'actionUrl',
            message: 'Please enter a valid URL (must start with http:// or https://)',
          });
        }
      }
      break;
      
    case 'bigfact':
      if (!data.fact || data.fact.trim() === '') {
        errors.push({
          subcardId: id,
          subcardType: type,
          field: 'fact',
          message: 'Fact is required',
        });
      }
      break;
      
    case 'blurp':
      if (!data.content || data.content.trim() === '') {
        errors.push({
          subcardId: id,
          subcardType: type,
          field: 'content',
          message: 'Content is required',
        });
      }
      break;
      
    case 'question':
      if (!data.question || data.question.trim() === '') {
        errors.push({
          subcardId: id,
          subcardType: type,
          field: 'question',
          message: 'Question is required',
        });
      }
      break;
      
    case 'qa':
      if (!data.question || data.question.trim() === '') {
        errors.push({
          subcardId: id,
          subcardType: type,
          field: 'question',
          message: 'Question is required',
        });
      }
      if (!data.answer || data.answer.trim() === '') {
        errors.push({
          subcardId: id,
          subcardType: type,
          field: 'answer',
          message: 'Answer is required',
        });
      }
      break;
      
    case 'summary':
      if (!data.title || data.title.trim() === '') {
        errors.push({
          subcardId: id,
          subcardType: type,
          field: 'title',
          message: 'Title is required',
        });
      }
      if (!data.points || data.points.length === 0) {
        errors.push({
          subcardId: id,
          subcardType: type,
          field: 'points',
          message: 'At least one point is required',
        });
      } else {
        const hasEmptyPoints = data.points.some((point: string) => point.trim() === '');
        if (hasEmptyPoints) {
          errors.push({
            subcardId: id,
            subcardType: type,
            field: 'points',
            message: 'All points must have content',
          });
        }
      }
      break;
      
    case 'image':
      if (!data.url || data.url.trim() === '') {
        errors.push({
          subcardId: id,
          subcardType: type,
          field: 'url',
          message: 'Image URL is required',
        });
      }
      if (!data.alt || data.alt.trim() === '') {
        errors.push({
          subcardId: id,
          subcardType: type,
          field: 'alt',
          message: 'Alt text is required for accessibility',
        });
      }
      break;
      
    case 'alsoread':
      // AlsoRead component handles its own validation with react-hook-form
      // But we can add a fallback check here
      if (!data.title || data.title.trim() === '') {
        errors.push({
          subcardId: id,
          subcardType: type,
          field: 'title',
          message: 'Title is required',
        });
      }
      if (!data.url || data.url.trim() === '') {
        errors.push({
          subcardId: id,
          subcardType: type,
          field: 'url',
          message: 'URL is required',
        });
      } else {
        const urlPattern = /^https?:\/\/.+/i;
        if (!urlPattern.test(data.url)) {
          errors.push({
            subcardId: id,
            subcardType: type,
            field: 'url',
            message: 'Please enter a valid URL',
          });
        }
      }
      break;
      
    case 'quote':
      if (!data.quote || data.quote.trim() === '') {
        errors.push({
          subcardId: id,
          subcardType: type,
          field: 'quote',
          message: 'Quote text is required',
        });
      }
      if (!data.author || data.author.trim() === '') {
        errors.push({
          subcardId: id,
          subcardType: type,
          field: 'author',
          message: 'Author is required',
        });
      }
      break;
      
    case 'embed':
      if (!data.embedCode || data.embedCode.trim() === '') {
        errors.push({
          subcardId: id,
          subcardType: type,
          field: 'embedCode',
          message: 'Embed code is required',
        });
      }
      break;
      
    case 'table':
      if (!data.headers || data.headers.length === 0) {
        errors.push({
          subcardId: id,
          subcardType: type,
          field: 'headers',
          message: 'At least one header is required',
        });
      }
      if (!data.rows || data.rows.length === 0) {
        errors.push({
          subcardId: id,
          subcardType: type,
          field: 'rows',
          message: 'At least one row is required',
        });
      }
      break;
  }
  
  return errors;
};

/**
 * Get a human-readable name for a subcard type
 */
export const getSubcardTypeName = (type: string): string => {
  const typeNames: Record<string, string> = {
    text: 'Text',
    blockquote: 'Blockquote',
    cta: 'Call to Action',
    bigfact: 'Big Fact',
    blurp: 'Blurp',
    question: 'Question',
    qa: 'Q&A',
    summary: 'Summary',
    image: 'Image',
    alsoread: 'Also Read',
    quote: 'Quote',
    embed: 'Embed',
    table: 'Table',
  };
  return typeNames[type] || type;
};
