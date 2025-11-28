# React Blog Editor

[![npm version](https://badge.fury.io/js/%40jais-nikhil%2Freact-blog-editor.svg)](https://www.npmjs.com/package/@jais-nikhil/react-blog-editor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful, flexible, and beautiful blog editor component for React and Next.js applications. Built with TypeScript, Tailwind CSS, and modern React practices.

## ✨ Features

- 🎨 **Rich Text Editor** - Full-featured WYSIWYG editor powered by Tiptap
- 🎯 **12+ Content Types** - Text, Blockquote, CTA, Images, Embeds, Tables, and more
- 🔄 **Drag & Drop** - Reorder content blocks with smooth animations
- ✅ **Built-in Validation** - Inline and panel validation with custom error messages
- 🖼️ **Image Editing** - Crop and edit images directly in the editor
- 📱 **Responsive** - Works perfectly on desktop, tablet, and mobile
- 🎭 **Fully Typed** - Complete TypeScript support
- 🎨 **Customizable** - Use with your own Tailwind CSS theme
- ⚡ **Performance** - Optimized for large content with lazy loading

## 📦 Installation

```bash
npm install @jais-nikhil/react-blog-editor
```

or with yarn:

```bash
yarn add @jais-nikhil/react-blog-editor
```

or with pnpm:

```bash
pnpm add @jais-nikhil/react-blog-editor
```

## 🚀 Quick Start

### Basic Usage (React)

```tsx
import React from 'react';
import { BlogEditor } from '@jais-nikhil/react-blog-editor';
import '@jais-nikhil/react-blog-editor/dist/style.css';

function App() {
  return (
    <div className="container mx-auto p-4">
      <BlogEditor />
    </div>
  );
}

export default App;
```

### Next.js Usage

```tsx
'use client';

import dynamic from 'next/dynamic';
import '@jais-nikhil/react-blog-editor/dist/style.css';

const BlogEditor = dynamic(
  () => import('@jais-nikhil/react-blog-editor').then(mod => mod.BlogEditor),
  { ssr: false }
);

export default function EditorPage() {
  return (
    <div className="container mx-auto p-4">
      <BlogEditor />
    </div>
  );
}
```

## 📚 Content Types

The editor supports 13 different content types:

1. **Text** - Rich text with formatting, lists, links, and more
2. **Blockquote** - Styled quote blocks with attribution
3. **CTA (Call to Action)** - Buttons with customizable text and URLs
4. **Big Fact** - Highlight important statistics or facts
5. **Blurp** - Short highlighted text snippets
6. **Question** - Standalone question blocks
7. **Q&A** - Question and answer pairs
8. **Summary** - Bullet point summaries with titles
9. **Image** - Upload and edit images with alt text
10. **Also Read** - Link to related articles
11. **Quote** - Formatted quotes with author and source
12. **Embed** - YouTube, Vimeo, Twitter, Instagram, LinkedIn embeds
13. **Table** - Dynamic tables with custom rows and columns

## 🎯 Advanced Usage

### With Custom Initial State

```tsx
import { BlogEditor } from '@jais-nikhil/react-blog-editor';
import type { BlogEditorState } from '@jais-nikhil/react-blog-editor';

const initialState: BlogEditorState = {
  cards: [
    {
      id: '1',
      content: '<p>Welcome to my blog!</p>',
      subcards: [],
    },
  ],
};

function App() {
  return <BlogEditor initialState={initialState} />;
}
```

### Handling Submit/Export

```tsx
import { BlogEditor } from '@jais-nikhil/react-blog-editor';

function App() {
  const handleExport = (data: BlogEditorState) => {
    console.log('Blog content:', data);
    // Send to your API or save to database
  };

  return <BlogEditor onExport={handleExport} />;
}
```

### Using Individual Components

```tsx
import { 
  RichTextEditor, 
  CTASubCard, 
  ImageSubCard 
} from '@jais-nikhil/react-blog-editor';

function CustomEditor() {
  const [content, setContent] = useState('');
  
  return (
    <div>
      <RichTextEditor
        content={content}
        onChange={setContent}
        placeholder="Start writing..."
      />
      
      <CTASubCard
        data={{ title: 'Click me!', actionUrl: 'https://example.com' }}
        onUpdate={(data) => console.log(data)}
        onDelete={() => {}}
        onMoveUp={() => {}}
        onMoveDown={() => {}}
      />
    </div>
  );
}
```

## 🎨 Styling

The editor uses Tailwind CSS for styling. Make sure you have Tailwind CSS installed in your project:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Update your `tailwind.config.js`:

```js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@jais-nikhil/react-blog-editor/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## 📖 API Reference

### BlogEditor Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialState` | `BlogEditorState` | `undefined` | Initial editor state with cards |
| `onExport` | `(data: BlogEditorState) => void` | `undefined` | Callback when content is exported |
| `className` | `string` | `''` | Additional CSS classes |

### Types

```typescript
interface Card {
  id: string;
  content: string;
  subcards: SubCard[];
  isDefault?: boolean;
}

interface SubCard {
  id: string;
  type: string;
  data: Record<string, any>;
  position: 'top' | 'bottom';
}

interface BlogEditorState {
  cards: Card[];
}
```

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm

### Setup

```bash
git clone https://github.com/jais-nikhil/blog-editor.git
cd blog-editor
npm install
npm run dev
```

### Build Library

```bash
npm run build:lib
```

### Run Demo

```bash
npm run dev
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tiptap](https://tiptap.dev/) - Headless rich text editor
- [DND Kit](https://dndkit.com/) - Drag and drop library
- [Lucide React](https://lucide.dev/) - Beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## 📧 Support

For support, email nikhil@example.com or create an issue on GitHub.

## 🔗 Links

- [Documentation](https://github.com/jais-nikhil/blog-editor#readme)
- [Demo](https://blog-editor-demo.vercel.app)
- [NPM Package](https://www.npmjs.com/package/@jais-nikhil/react-blog-editor)
- [GitHub Repository](https://github.com/jais-nikhil/blog-editor)
