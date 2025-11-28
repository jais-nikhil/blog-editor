export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const contentTypes = [
  { id: 'text', name: 'Rich Text', icon: 'Type', component: 'TextSubCard' },
  { id: 'blockquote', name: 'Blockquote', icon: 'Quote', component: 'BlockquoteSubCard' },
  { id: 'cta', name: 'CTA', icon: 'ExternalLink', component: 'CTASubCard' },
  { id: 'bigfact', name: 'Big Fact', icon: 'TrendingUp', component: 'BigFactSubCard' },
  { id: 'blurp', name: 'Blurp', icon: 'MessageCircle', component: 'BlurpSubCard' },
  { id: 'question', name: 'Question', icon: 'HelpCircle', component: 'QuestionSubCard' },
  { id: 'qa', name: 'Q & A', icon: 'MessageSquare', component: 'QASubCard' },
  { id: 'summary', name: 'Summary', icon: 'List', component: 'SummarySubCard' },
  { id: 'image', name: 'Image', icon: 'Image', component: 'ImageSubCard' },
  { id: 'alsoread', name: 'Also Read', icon: 'BookOpen', component: 'AlsoReadSubCard' },
  { id: 'quote', name: 'Quote', icon: 'Quote', component: 'QuoteSubCard' },
  { id: 'embed', name: 'Embed', icon: 'Code', component: 'EmbedSubCard' },
  { id: 'table', name: 'Table', icon: 'Table', component: 'TableSubCard' },
];

// Dummy API function for image upload
export const uploadImage = async (imageBlob: Blob): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real implementation, you would send the blob to your server
  // For now, we'll just return a URL to the blob
  const url = URL.createObjectURL(imageBlob);
  
  console.log('Image uploaded successfully (dummy):', {
    size: imageBlob.size,
    type: imageBlob.type,
    url
  });
  
  return url;
};
