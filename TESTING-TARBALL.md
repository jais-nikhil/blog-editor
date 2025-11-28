# Testing the Blog Editor Package Locally

## ✅ Tarball Created Successfully!

**File**: `jais-nikhil-react-blog-editor-1.0.0.tgz`  
**Size**: 148.2 KB (compressed) / 810.1 KB (unpacked)  
**Location**: `/Volumes/E/dev/react/blog-editor/jais-nikhil-react-blog-editor-1.0.0.tgz`

---

## 📦 How to Install in Your Project

### Option 1: Install from Local Tarball

Navigate to your project directory and install the package:

```bash
cd /path/to/your/project
npm install /Volumes/E/dev/react/blog-editor/jais-nikhil-react-blog-editor-1.0.0.tgz
```

### Option 2: Copy Tarball First (Recommended)

Copy the tarball to your project and install from there:

```bash
# Copy the tarball to your project
cp /Volumes/E/dev/react/blog-editor/jais-nikhil-react-blog-editor-1.0.0.tgz /path/to/your/project/

# Navigate to your project
cd /path/to/your/project

# Install the package
npm install ./jais-nikhil-react-blog-editor-1.0.0.tgz
```

---

## 🚀 Usage in Your Project

### 1. Basic Usage

```tsx
import { BlogEditor } from "@jais-nikhil/react-blog-editor";
import "@jais-nikhil/react-blog-editor/dist/style.css";

function App() {
  return (
    <div>
      <h1>My Blog Editor</h1>
      <BlogEditor />
    </div>
  );
}

export default App;
```

### 2. Import Individual Components (if needed)

```tsx
import {
  BlogEditor,
  Card,
  ValidationErrors,
  type CardType,
  type BlogEditorState,
} from "@jais-nikhil/react-blog-editor";
```

### 3. Import Types

```tsx
import type {
  BlogEditorState,
  Card,
  SubCard,
  TextData,
  ImageData,
  CTAData,
  ValidationError,
} from "@jais-nikhil/react-blog-editor";
```

---

## 📋 What's Included

The package includes:

- ✅ Main BlogEditor component
- ✅ All 13+ content type subcards
- ✅ Rich text editor
- ✅ Drag & drop functionality
- ✅ Validation system with inline errors
- ✅ Image editor with cropping
- ✅ TypeScript declarations
- ✅ All necessary utilities and helpers

---

## 🧪 Testing Checklist

After installing, test the following features:

### Basic Functionality

- [ ] Import BlogEditor component
- [ ] Render BlogEditor on page
- [ ] Add new cards
- [ ] Delete cards
- [ ] Edit card content

### Content Types

- [ ] Text subcard
- [ ] Image subcard (with upload/crop)
- [ ] Blockquote subcard
- [ ] CTA subcard
- [ ] Big Fact subcard
- [ ] Blurp subcard
- [ ] Question subcard
- [ ] Q&A subcard
- [ ] Summary subcard
- [ ] Also Read subcard
- [ ] Quote subcard
- [ ] Embed subcard
- [ ] Table subcard

### Advanced Features

- [ ] Drag and drop to reorder cards
- [ ] Drag and drop to reorder subcards
- [ ] Rich text editing (bold, italic, lists, links)
- [ ] Form validation
- [ ] Inline error messages
- [ ] Export JSON functionality
- [ ] Empty content detection

### Styling

- [ ] CSS styles loading correctly
- [ ] Responsive layout on mobile
- [ ] Icons displaying properly
- [ ] Tailwind classes working

---

## 🐛 Common Issues & Solutions

### Issue: CSS Not Loading

**Solution**: Make sure to import the CSS file:

```tsx
import "@jais-nikhil/react-blog-editor/dist/style.css";
```

### Issue: TypeScript Errors

**Solution**: The package includes TypeScript declarations. Make sure your tsconfig.json includes:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler" // or "node"
  }
}
```

### Issue: Peer Dependencies Missing

**Solution**: Install peer dependencies:

```bash
npm install react react-dom
# Or with specific versions
npm install react@^18.0.0 react-dom@^18.0.0
```

### Issue: Module Not Found

**Solution**: Clear node_modules and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
npm install ./jais-nikhil-react-blog-editor-1.0.0.tgz
```

---

## 🔄 Updating the Package

If you make changes to the blog-editor and want to test again:

```bash
# 1. In the blog-editor directory
cd /Volumes/E/dev/react/blog-editor

# 2. Rebuild the library
npm run build:lib

# 3. Create new tarball (remove old one first)
rm jais-nikhil-react-blog-editor-1.0.0.tgz
npm pack

# 4. In your project directory
cd /path/to/your/project

# 5. Uninstall old version
npm uninstall @jais-nikhil/react-blog-editor

# 6. Install new version
npm install /Volumes/E/dev/react/blog-editor/jais-nikhil-react-blog-editor-1.0.0.tgz
```

---

## 📊 Package Contents

The tarball includes:

```
jais-nikhil-react-blog-editor-1.0.0.tgz
├── dist/
│   ├── index.es.js          # ES module build
│   ├── index.js             # CommonJS build
│   ├── *.d.ts               # TypeScript declarations
│   └── *.map                # Source maps
├── README.md                # Package documentation
├── LICENSE                  # MIT License
└── package.json             # Package metadata
```

**Total Files**: 74  
**Bundled Size**: 135.7 KB (ES) / 88.4 KB (CJS)  
**Gzipped Size**: ~21 KB

---

## 📝 Example Test Project Structure

```
your-project/
├── src/
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── jais-nikhil-react-blog-editor-1.0.0.tgz  # Tarball here
└── node_modules/
    └── @jais-nikhil/
        └── react-blog-editor/  # Installed from tarball
```

---

## 🎯 Next Steps After Testing

1. **Test thoroughly** in your project
2. **Report any issues** or bugs found
3. **Verify styling** matches expectations
4. **Check performance** with large content
5. **Test on different browsers**
6. Once satisfied, **publish to NPM**:
   ```bash
   npm publish --access public
   ```

---

## 💡 Tips

- Use the tarball for local testing before publishing to NPM
- You can share this tarball with team members for testing
- The tarball can be committed to a private repository if needed
- After publishing to NPM, replace the tarball installation with:
  ```bash
  npm install @jais-nikhil/react-blog-editor
  ```

---

## 📞 Support

If you encounter any issues during testing:

1. Check the console for error messages
2. Verify all peer dependencies are installed
3. Check that Tailwind CSS is configured in your project
4. Review the README.md for additional setup instructions

---

## ✨ Features to Test

Make sure to test these key features:

1. **Content Management**

   - Add, edit, delete cards
   - Add, edit, delete subcards
   - Reorder using drag & drop

2. **Rich Text Editing**

   - Bold, italic, underline
   - Ordered and unordered lists
   - Links
   - Paste from clipboard

3. **Validation**

   - Required field validation
   - URL validation for CTAs
   - Image alt text validation
   - Inline error display

4. **Image Handling**

   - Upload images
   - Crop/edit images
   - Preview images
   - Image validation

5. **Export/Submit**
   - Export JSON data
   - Validation before export
   - Error display panel
   - Console logging

---

Happy Testing! 🎉
