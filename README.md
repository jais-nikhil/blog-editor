# NextGen Blog Editor

[![npm version](https://badge.fury.io/js/nextgen-blog-editor.svg)](https://www.npmjs.com/package/nextgen-blog-editor)
[![npm downloads](https://img.shields.io/npm/dm/nextgen-blog-editor.svg)](https://www.npmjs.com/package/nextgen-blog-editor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18%20%7C%2019-blue)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-Compatible-black)](https://nextjs.org/)

> **The most powerful and flexible blog editor component for React and Next.js** - Built with TypeScript, featuring rich text editing, drag-and-drop functionality, 13+ content types, and comprehensive validation.

## 🚀 Why NextGen Blog Editor?

NextGen Blog Editor is a **modern, production-ready WYSIWYG editor** designed specifically for React and Next.js applications. Whether you're building a blog platform, CMS, content management system, or any application requiring rich content editing, NextGen Blog Editor provides everything you need out of the box.

### ⚡ Key Features

- ✅ **13+ Content Types** - Text, Images, Blockquotes, CTAs, Embeds, Tables, Q&A, and more
- ✅ **Rich Text Editing** - Powered by TipTap with full formatting support
- ✅ **Drag & Drop** - Intuitive reordering of content blocks
- ✅ **Image Editor** - Built-in crop and edit functionality
- ✅ **Form Validation** - Comprehensive inline and panel validation
- ✅ **TypeScript Support** - Fully typed for excellent DX
- ✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ✅ **Zero Configuration** - Works out of the box with sensible defaults
- ✅ **Next.js Ready** - Full support for App Router and Pages Router
- ✅ **SEO Friendly** - Generates clean, semantic HTML
- ✅ **Accessible** - WCAG AA compliant
- ✅ **Customizable** - Easy to style and extend

## 📦 Installation

### NPM

```bash
npm install nextgen-blog-editor
```

### Yarn

```bash
yarn add nextgen-blog-editor
```

### PNPM

```bash
pnpm add nextgen-blog-editor
```

## 🎯 Quick Start

### React + Vite

```tsx
import { BlogEditor } from 'nextgen-blog-editor';
import 'nextgen-blog-editor/style.css';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1>My Blog Editor</h1>
      <BlogEditor />
    </div>
  );
}

export default App;
```

### Next.js (App Router)

```tsx
'use client';

import { BlogEditor } from 'nextgen-blog-editor';
import 'nextgen-blog-editor/style.css';

export default function EditorPage() {
  return (
    <div className="container mx-auto p-4">
      <h1>Blog Editor</h1>
      <BlogEditor />
    </div>
  );
}
```

### Next.js (Pages Router)

```tsx
import { BlogEditor } from 'nextgen-blog-editor';
import 'nextgen-blog-editor/style.css';

export default function EditorPage() {
  return (
    <div className="container mx-auto p-4">
      <h1>Blog Editor</h1>
      <BlogEditor />
    </div>
  );
}
```

## 📚 Content Types

NextGen Blog Editor supports 13+ different content types out of the box:

### 📝 Text & Typography

- **Text Blocks** - Rich text with formatting (bold, italic, underline, links, lists)
- **Blockquotes** - Beautiful styled quotes with attribution
- **Big Facts** - Highlight important statistics or facts
- **Blurps** - Short, impactful text snippets

### 🎯 Interactive Elements

- **Call-to-Action (CTA)** - Buttons with customizable text and URLs
- **Questions** - Standalone question blocks
- **Q&A Sections** - Question and answer pairs
- **Tables** - Full-featured data tables with TipTap

### 🖼️ Media & Embeds

- **Images** - Upload with built-in crop/edit functionality
- **Embeds** - YouTube, Vimeo, Twitter, and custom embed support

### 📌 Navigation

- **Also Read** - Related articles/links section
- **Summary** - Article summaries with optional links
- **Quotes** - Author quotes with attribution

## 🎨 Features in Detail

### Rich Text Editor

Powered by [TipTap](https://tiptap.dev/), the editor includes:

- **Text Formatting**: Bold, Italic, Underline, Strike-through
- **Lists**: Ordered and unordered lists
- **Links**: Add and edit hyperlinks
- **Headings**: H1-H6 support
- **Alignment**: Left, center, right, justify
- **Code Blocks**: Syntax-highlighted code snippets
- **Horizontal Rules**: Visual separators

### Drag & Drop

Built with [@dnd-kit](https://dndkit.com/), featuring:

- Smooth animations
- Keyboard accessibility
- Touch device support
- Nested drag & drop for subcards
- Visual feedback during dragging

### Validation System

Comprehensive validation with:

- **Inline Error Messages** - Show errors directly under fields
- **Error Panel** - Consolidated view of all validation errors
- **Required Field Validation** - Ensure critical fields are filled
- **URL Validation** - Validate URLs for CTAs and links
- **Image Validation** - Ensure images have alt text
- **Custom Validation** - Add your own validation rules

### Image Editing

Built-in image editor powered by [react-image-crop](https://github.com/DominicTobias/react-image-crop):

- Crop images to any aspect ratio
- Visual crop preview
- Drag to adjust crop area
- Upload local images
- Image validation (alt text required)

## 🔧 Advanced Usage

### Handling Export

```tsx
import { BlogEditor } from 'nextgen-blog-editor';
import 'nextgen-blog-editor/style.css';
import type { BlogEditorState } from 'nextgen-blog-editor';

function BlogEditorPage() {
  const handleExport = (data: BlogEditorState) => {
    console.log('Exported data:', data);
    
    // Send to your API
    await fetch('/api/blog/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  };

  return <BlogEditor onExport={handleExport} />;
}
```

### TypeScript Support

```tsx
import {
  BlogEditor,
  type BlogEditorState,
  type Card,
  type SubCard,
  type TextData,
  type ImageData,
  type CTAData,
  type ValidationError,
} from 'nextgen-blog-editor';

// Full type safety for your blog content
const processContent = (state: BlogEditorState) => {
  state.cards.forEach((card: Card) => {
    console.log('Card content:', card.content);
    
    card.subcards.forEach((subcard: SubCard) => {
      if (subcard.type === 'text') {
        const textData = subcard.data as TextData;
        console.log('Text content:', textData.content);
      }
    });
  });
};
```

### Custom Validation

```tsx
import { validateSubcard, type ValidationError } from 'nextgen-blog-editor';

// Use built-in validation
const errors: ValidationError[] = validateSubcard(subcard);

// Add custom validation
if (errors.length > 0) {
  console.error('Validation errors:', errors);
}
```

## 🎯 Use Cases

### Blog Platforms

Perfect for building modern blog platforms with rich content editing:

- Personal blogs
- Company blogs
- Magazine websites
- News portals
- Content marketing platforms

### Content Management Systems (CMS)

Ideal for headless CMS and traditional CMS:

- Admin panels
- Content creation workflows
- Multi-author platforms
- Editorial systems
- Publishing platforms

### Documentation Sites

Great for documentation and knowledge bases:

- Technical documentation
- User guides
- API documentation
- Wiki systems
- Help centers

### E-commerce

Enhance product descriptions and content:

- Product descriptions
- Category pages
- Blog posts
- Landing pages
- Email campaigns

## 🌟 Why Choose NextGen Blog Editor?

### 🚀 Modern Technology Stack

- Built with **React 19** and **TypeScript**
- Powered by **TipTap** for rich text editing
- Uses **@dnd-kit** for accessibility-first drag and drop
- Styled with **Tailwind CSS 3.5**
- Zero jQuery, zero legacy dependencies

### 💪 Production Ready

- Comprehensive test coverage
- Type-safe with TypeScript
- Accessible (WCAG AA)
- Mobile responsive
- Cross-browser compatible
- Performance optimized

### 🎨 Developer Friendly

- Zero configuration needed
- Excellent TypeScript support
- Comprehensive documentation
- Active maintenance
- MIT License

### 📦 Lightweight

- **~159 KB** total package size
- **~32 KB** gzipped
- Tree-shakeable
- No bloat, only features you need

## 🔌 Integrations

NextGen Blog Editor works seamlessly with:

- ✅ **React 18+** - Full support for latest React features
- ✅ **React 19** - Ready for React 19
- ✅ **Next.js 13+** - App Router and Pages Router
- ✅ **Vite** - Fast dev server and HMR
- ✅ **Create React App** - Works out of the box
- ✅ **Remix** - Full compatibility
- ✅ **Gatsby** - SSR and SSG support
- ✅ **TypeScript 5+** - Full type definitions

## 📖 Documentation

### API Reference

#### BlogEditor Component

```tsx
interface BlogEditorProps {
  initialState?: BlogEditorState;
  onExport?: (data: BlogEditorState) => void;
  onValidationError?: (errors: ValidationError[]) => void;
}
```

#### Data Types

```tsx
interface BlogEditorState {
  cards: Card[];
}

interface Card {
  id: string;
  content: string;
  subcards: SubCard[];
  isDefault?: boolean;
}

interface SubCard {
  id: string;
  type: SubCardType;
  data: SubCardData;
}

type SubCardType = 
  | 'text'
  | 'blockquote'
  | 'cta'
  | 'bigFact'
  | 'blurp'
  | 'question'
  | 'qa'
  | 'summary'
  | 'image'
  | 'alsoRead'
  | 'quote'
  | 'embed'
  | 'table';
```

### Styling & Customization

NextGen Blog Editor uses Tailwind CSS internally, but all styles are pre-compiled. You can customize the appearance using:

1. **CSS Override**:
```css
/* Override specific components */
.blog-editor-card {
  background: #f5f5f5;
}
```

2. **Inline Styles**:
```tsx
<div style={{ background: '#f0f0f0' }}>
  <BlogEditor />
</div>
```

3. **CSS Modules**:
```tsx
import styles from './Editor.module.css';

<div className={styles.editorWrapper}>
  <BlogEditor />
</div>
```

## 🐛 Troubleshooting

### CSS Not Loading?

Make sure to import the CSS file:
```tsx
import 'nextgen-blog-editor/style.css';
```

### TypeScript Errors?

Ensure your `tsconfig.json` includes:
```json
{
  "compilerOptions": {
    "moduleResolution": "bundler" // or "node"
  }
}
```

### Next.js SSR Issues?

Use `'use client'` directive for App Router:
```tsx
'use client';

import { BlogEditor } from 'nextgen-blog-editor';
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © [Jithvar Consultancy Services](https://jithvar.com)

## 🔗 Links

- **NPM Package**: https://www.npmjs.com/package/nextgen-blog-editor
- **GitHub Repository**: https://github.com/jais-nikhil/nextgen-blog-editor
- **Documentation**: https://github.com/jais-nikhil/nextgen-blog-editor#readme
- **Issues**: https://github.com/jais-nikhil/nextgen-blog-editor/issues
- **Changelog**: [CHANGELOG.md](CHANGELOG.md)

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

## 📊 Stats

![NPM](https://img.shields.io/npm/l/nextgen-blog-editor)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/nextgen-blog-editor)
![npm](https://img.shields.io/npm/v/nextgen-blog-editor)
![npm](https://img.shields.io/npm/dt/nextgen-blog-editor)
![GitHub stars](https://img.shields.io/github/stars/jais-nikhil/nextgen-blog-editor?style=social)

## 🏷️ Keywords

`react blog editor`, `next.js blog editor`, `nextgen blog editor`, `wysiwyg editor`, `rich text editor`, `react wysiwyg`, `next wysiwyg`, `blog cms`, `content editor`, `react cms`, `nextjs cms`, `tiptap react`, `drag and drop editor`, `modular editor`, `typescript editor`, `react content editor`, `nextjs content editor`, `modern blog editor`, `seo blog editor`, `responsive editor`

---

**Made with ❤️ by [Jithvar Consultancy Services](https://jithvar.com)**
