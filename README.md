# Blog Editor

A comprehensive ReactJS + Vite + Tailwind CSS application for creating rich blog content with multiple content types and drag-and-drop functionality.

## ✨ What's New (v2.0.0)

### 🎬 Smart Embed Component

Auto-detect and embed content from major platforms:

- **YouTube**: Paste any YouTube URL for instant video embed
- **Vimeo**: Support for Vimeo video embeds
- **Twitter/X**: Embed tweets with live rendering
- **Instagram**: Display Instagram posts and reels
- **LinkedIn**: Embed LinkedIn posts
- Live preview with automatic platform detection
- Clean code storage (no script duplication)

### ✅ Intelligent Validation System

- **Smart Empty Detection**: Empty subcards removed automatically
- **Partial Content Validation**: Only validates fields with content
- **Beautiful Error Display**: Floating panel with actionable errors
- **Click-to-Navigate**: Scroll directly to any validation error
- **Field-Specific Rules**: Custom validation for all 13 content types
- **No More Alerts**: Replaced blocking alerts with elegant error UI

**See [NEW_FEATURES.md](./NEW_FEATURES.md) for detailed documentation.**

## Features

### Core Functionality

- **Rich Text Editor**: Built with React Quill for comprehensive text formatting
- **Card-based Content System**: Organize content in draggable cards
- **Multiple Content Types**: Support for 12 different content types:
  - Text (Rich Text Editor)
  - Blockquote
  - Call to Action (CTA)
  - Big Fact
  - Blurp
  - Question
  - Q & A
  - Summary
  - Image
  - Also Read
  - Quote
  - Embed
  - Table

### User Experience

- **Drag and Drop**: Reorder cards and subcards with @dnd-kit
- **Dynamic Content Creation**: Add and remove cards and subcards on the fly
- **Smart Form Validation**: Automatic cleanup of empty content on submission
- **Responsive Design**: Works seamlessly across different screen sizes

## Technologies Used

- **React 19** with TypeScript for robust component development
- **Vite** for fast development and building
- **Tailwind CSS 3.5** for modern, utility-first styling
- **React Quill** for rich text editing capabilities
- **@dnd-kit** for smooth drag and drop interactions
- **Lucide React** for beautiful, consistent icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation & Setup

1. **Clone and install dependencies:**

   ```bash
   npm install
   ```

2. **Start development server:**

   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## How to Use

### Basic Usage

1. **Writing Content**: Use the rich text editor in the main card to write your blog content
2. **Adding Content Types**: Click the + icons (top/bottom) to add different content types
3. **Creating New Cards**: Use the "Add Card" button to create additional content cards
4. **Reordering**: Drag cards using the grip handle to reorder them
5. **Deleting**: Click the trash icon to delete cards or content blocks
6. **Submitting**: Click "Submit Blog" to finalize your content

### Content Types Available

Each content type has specific fields:

- **Blockquote**: Quote text + Attribution
- **CTA**: Title + Action URL + Link options (External, NoFollow)
- **Big Fact**: Main fact + Description
- **Blurp**: Simple content block
- **Question**: Standalone question
- **Q & A**: Question + Answer pair
- **Summary**: Title + Bullet points (add/remove points)
- **Image**: URL + Alt text + Caption (with preview)
- **Also Read**: Title + URL + Description
- **Quote**: Quote + Author + Source
- **Embed**: HTML embed code + Type selection (with preview)
- **Table**: Dynamic table (add/remove columns and rows)

### Smart Features

- **Auto-cleanup**: Empty cards and content blocks are automatically removed on submission
- **Position Control**: Add content above or below the rich text editor using top/bottom + buttons
- **Drag & Drop**: Reorder all cards and content blocks
- **Real-time Preview**: See images and embeds as you add them

## Project Structure

```
src/
├── components/
│   ├── BlogEditor.tsx          # Main editor component
│   ├── Card.tsx               # Individual card container
│   ├── ContentTypeMenu.tsx    # Content type selection menu
│   ├── SubCardRenderer.tsx    # Renders different content types
│   ├── index.ts              # Component exports
│   └── subcards/             # Individual content type components
│       ├── BlockquoteSubCard.tsx
│       ├── CTASubCard.tsx
│       ├── BigFactSubCard.tsx
│       ├── BlurpSubCard.tsx
│       ├── QuestionSubCard.tsx
│       ├── QASubCard.tsx
│       ├── SummarySubCard.tsx
│       ├── ImageSubCard.tsx
│       ├── AlsoReadSubCard.tsx
│       ├── QuoteSubCard.tsx
│       ├── EmbedSubCard.tsx
│       └── TableSubCard.tsx
├── types/
│   └── index.ts              # TypeScript type definitions
├── utils/
│   └── helpers.ts            # Utility functions
├── App.tsx                   # Main app component
└── main.tsx                  # App entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

## 📚 Documentation

### Complete Guides

- **[NEW_FEATURES.md](./NEW_FEATURES.md)** - Detailed feature documentation with examples
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - 15 comprehensive test scenarios
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick lookup for common tasks
- **[SUMMARY.md](./SUMMARY.md)** - Executive summary of v2.0 updates

### Quick Links

- **Embed Component**: Support for YouTube, Vimeo, X, Instagram, LinkedIn
- **Validation System**: Smart validation with beautiful error displays
- **All Subcard Types**: Text, Blockquote, CTA, Big Fact, Blurp, Question, Q&A, Summary, Image, Also Read, Quote, Embed, Table

## 🧪 Testing

Run the test scenarios from [TESTING_GUIDE.md](./TESTING_GUIDE.md):

```bash
# Start dev server
npm run dev

# Test embed detection
# 1. Add Embed subcard
# 2. Paste: https://www.youtube.com/watch?v=dQw4w9WgXcQ
# 3. See auto-detection and live preview

# Test validation
# 1. Add CTA with title only (no URL)
# 2. Click Submit Blog
# 3. See validation panel with errors
# 4. Click error to scroll to field
```

## 🎯 Key Features in Detail

### Smart Embed Detection

```typescript
// Supported formats:
- YouTube: URLs, short links, embed codes
- Vimeo: URLs, player iframes
- Twitter/X: Tweet URLs, blockquote embeds
- Instagram: Post/reel URLs, media embeds
- LinkedIn: Post URLs, feed iframes
```

### Validation Rules

- **Empty subcards**: Removed silently (no errors)
- **Partial content**: Validated with clear error messages
- **URL fields**: Must start with http:// or https://
- **Image alt text**: Required for accessibility
- **All 13 types**: Custom validation rules per content type

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly (see TESTING_GUIDE.md)
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React team for React 19
- Tailwind CSS for the styling framework
- @dnd-kit for drag and drop functionality
- React Quill for rich text editing
- Lucide for the icon set

---

**Version**: 2.0.0  
**Last Updated**: November 28, 2025  
**Status**: ✅ Production Ready
