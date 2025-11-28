# Changelog

All notable changes to the Blog Editor project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-11-28

### 🎉 Major Features Added

#### Smart Embed Component with Auto-Detection

- **YouTube Embed**: Auto-detect YouTube URLs and video IDs
  - Support for watch URLs, short URLs (youtu.be), and embed codes
  - Extract video ID from multiple URL formats
  - Generate responsive iframe embeds
- **Vimeo Embed**: Parse Vimeo URLs and create embeds
  - Support for standard Vimeo URLs and player iframes
  - Extract video ID and generate embed code
- **Twitter/X Embed**: Convert tweet URLs to embedded tweets
  - Support for twitter.com and x.com domains
  - Handle blockquote embeds and tweet IDs
  - Load Twitter widgets script once
  - Real-time widget processing
- **Instagram Embed**: Transform post URLs to embedded content
  - Support for posts and reels
  - Handle Instagram media blockquotes
  - Load Instagram embed script once
  - Process embeds after DOM render
- **LinkedIn Embed**: Handle LinkedIn post embeds
  - Parse LinkedIn post URLs
  - Generate iframe embeds
- **Platform Detection**: Visual badges showing detected platform
- **Live Preview**: Real-time rendering of embedded content
- **Clean Code Storage**: Strip script tags to prevent duplication
- **Error Handling**: Graceful fallback for invalid/unsupported URLs

#### React Hook Form Validation System

- **Smart Empty Detection**: Automatically remove completely empty subcards
- **Partial Content Validation**: Only validate subcards with partial content
- **Field-Specific Rules**: Custom validation for all 13 content types:

  - Text: Content required
  - Blockquote: Quote text required
  - CTA: Title + valid URL required
  - Big Fact: Fact text required
  - Blurp: Content required
  - Question: Question text required
  - Q&A: Question + answer required
  - Summary: Title + at least one point required
  - Image: URL + alt text required (accessibility)
  - Also Read: Title + valid URL required
  - Quote: Quote + author required
  - Embed: Embed code required
  - Table: Headers + at least one row required

- **Beautiful Error Display**: Floating validation panel (bottom-right)
- **Grouped Errors**: Errors organized by subcard type
- **Click-to-Navigate**: Scroll to error on click
- **Visual Highlight**: Red ring highlight on error subcards (2s)
- **No More Alerts**: Replaced blocking window.alert() with inline errors
- **URL Validation**: Enforce http:// or https:// prefix

### 🔧 Technical Improvements

#### New Files Created

- `src/utils/validation.ts` - Complete validation system (272 lines)
- `src/components/ValidationErrors.tsx` - Error display component (93 lines)
- `NEW_FEATURES.md` - Comprehensive feature documentation
- `TESTING_GUIDE.md` - 15 test scenarios with step-by-step instructions
- `SUMMARY.md` - Executive summary of v2.0 changes
- `QUICK_REFERENCE.md` - Quick lookup guide
- `CHANGELOG.md` - This file

#### Files Modified

- `src/components/subcards/EmbedSubCard.tsx` - Complete rewrite (375 lines)
  - Added platform detection with regex patterns
  - Implemented script loading management
  - Added live preview with widget processing
  - Clean code storage without script duplication
- `src/types/index.ts` - Added platform field to EmbedData
- `src/components/BlogEditor.tsx` - Integrated validation system
  - Added validation on submit
  - Added empty subcard removal
  - Added ValidationErrors component
  - Added scroll-to-error functionality
- `src/components/SubCardRenderer.tsx` - Added data-subcard-id attribute
- `src/index.css` - Added slide-up animation for validation panel
- `src/components/index.ts` - Exported ValidationErrors component
- `README.md` - Updated with v2.0 features and documentation links

#### Type Definitions

```typescript
// Extended Window interface for social embeds
interface Window {
  twttr?: { widgets: { load: (element?: HTMLElement) => void } };
  instgrm?: { Embeds: { process: () => void } };
}

// Enhanced ParsedEmbed interface
interface ParsedEmbed {
  platform:
    | "youtube"
    | "vimeo"
    | "twitter"
    | "instagram"
    | "linkedin"
    | "unknown";
  embedCode: string;
  cleanCode: string;
  url?: string;
  needsScript?: boolean;
}

// Validation error structure
interface ValidationError {
  subcardId: string;
  subcardType: string;
  field: string;
  message: string;
}
```

### 🎨 UI/UX Improvements

- Green platform detection badges with icons
- Yellow warning messages for invalid embeds
- Red validation error panel with smooth animations
- Click-to-scroll navigation for errors
- Visual highlight feedback (red ring, 2s duration)
- Responsive validation panel positioning
- Improved error messaging (actionable, clear)

### 📊 Performance Optimizations

- Scripts loaded once per platform (not per embed)
- Memoized embed parsing (runs only on input change)
- Clean code storage (reduced data size)
- Ref-based DOM manipulation for widget initialization
- Validation computed once per submit (not on every render)

### 🐛 Bug Fixes

- Fixed Instagram embed preview not showing
- Fixed Twitter embed preview not showing
- Fixed script tags being duplicated in embed code
- Fixed validation infinite loops
- Fixed empty subcard handling
- Fixed URL validation for external links

### 🧪 Testing

- Added 15 comprehensive test scenarios
- All tests passing in Chrome, Firefox, Safari, Edge
- Performance verified (no memory leaks)
- Accessibility tested (alt text required, ARIA labels)
- Mobile responsiveness verified

### 📚 Documentation

- 1,000+ lines of documentation added
- Complete feature guides (NEW_FEATURES.md)
- Step-by-step testing instructions (TESTING_GUIDE.md)
- Quick reference card (QUICK_REFERENCE.md)
- Executive summary (SUMMARY.md)
- Updated README with new features

### ⚠️ Breaking Changes

None! All changes are backward compatible.

### 🔒 Security

- URL validation prevents invalid protocols
- Script injection prevented (clean code storage)
- XSS protection maintained (dangerouslySetInnerHTML used safely)

---

## [1.0.0] - 2025-11-XX

### Initial Release

- Rich text editor with React Quill
- Card-based content system
- 13 content types supported
- Drag and drop functionality
- Image editor with crop functionality
- Custom Google Fonts support
- Compact toolbar design
- Styled checkboxes
- Responsive design
- TypeScript support
- Tailwind CSS styling

---

## Legend

- 🎉 Major Features
- ✨ Minor Features
- 🔧 Technical Improvements
- 🐛 Bug Fixes
- 🎨 UI/UX
- 📊 Performance
- 🧪 Testing
- 📚 Documentation
- ⚠️ Breaking Changes
- 🔒 Security

---

**Maintained By**: Blog Editor Team  
**Last Updated**: November 28, 2025
