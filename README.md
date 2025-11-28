# Blog Editor

A comprehensive ReactJS + Vite + Tailwind CSS application for creating rich blog content with multiple content types and drag-and-drop functionality.

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
