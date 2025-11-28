# NPM Publishing Guide

## ✅ Completed Tasks

### 1. Inline Validation Implementation

- ✅ Added inline field-level validation error messages to all subcards
- ✅ Implemented red borders and background for invalid fields
- ✅ Added `InlineFieldError` component display below each validated field
- ✅ Validation props flow: BlogEditor → Card → SubCardRenderer → Individual Subcards

### 2. Library Setup

- ✅ Created library entry point at `lib/index.ts`
- ✅ Created `vite.config.lib.ts` for building as a library
- ✅ Created `tsconfig.lib.json` with proper JSX configuration
- ✅ Updated `package.json` with package metadata
- ✅ Created `.npmignore` to exclude source files
- ✅ Added MIT `LICENSE`
- ✅ Created comprehensive `README-LIBRARY.md`

### 3. Demo Application

- ✅ Created `demo/src/DemoApp.tsx` with full demo
- ✅ Features showcase, installation instructions, live editor
- ✅ Export preview functionality

### 4. Build & Git

- ✅ Fixed TypeScript compilation errors
- ✅ Successfully built library: `npm run build:lib`
- ✅ Generated TypeScript declarations
- ✅ Pushed code to GitHub repository

## 📦 How to Publish to NPM

### Step 1: Login to NPM

```bash
npm login
```

You'll need your NPM credentials:

- Username: `jais-nikhil`
- Password: Your NPM password
- Email: Your email address
- OTP: If 2FA is enabled

### Step 2: Test the Build

```bash
# Clean install to ensure everything works
rm -rf node_modules package-lock.json
npm install

# Build the library
npm run build:lib

# Verify dist folder contents
ls -la dist/
```

### Step 3: Test Package Locally (Optional)

```bash
# Create a test project
cd /tmp
npx create-vite test-blog-editor --template react-ts
cd test-blog-editor
npm install

# Link your local package
npm link /Volumes/E/dev/react/blog-editor

# Test importing
# Add to src/App.tsx:
# import { BlogEditor } from '@jais-nikhil/react-blog-editor';
```

### Step 4: Verify Package Contents

```bash
# See what will be published
npm pack --dry-run

# This shows all files that will be included
# Should include: dist/, README-LIBRARY.md, LICENSE, package.json
```

### Step 5: Publish to NPM

```bash
# For first time publishing a scoped package
npm publish --access public

# For subsequent updates, increment version first:
# npm version patch  # 1.0.0 -> 1.0.1
# npm version minor  # 1.0.0 -> 1.1.0
# npm version major  # 1.0.0 -> 2.0.0
# Then publish again
```

### Step 6: Verify Published Package

```bash
# Check on NPM
open https://www.npmjs.com/package/@jais-nikhil/react-blog-editor

# Or install in a new project
npm install @jais-nikhil/react-blog-editor
```

## 🔄 Update Workflow

When you make changes and want to publish an update:

```bash
# 1. Make your changes
# 2. Build the library
npm run build:lib

# 3. Update version (choose one)
npm version patch  # Bug fixes: 1.0.0 -> 1.0.1
npm version minor  # New features: 1.0.0 -> 1.1.0
npm version major  # Breaking changes: 1.0.0 -> 2.0.0

# 4. Commit the version change
git add package.json package-lock.json
git commit -m "Bump version to $(node -p "require('./package.json').version")"

# 5. Push to GitHub
git push origin master
git push origin --tags

# 6. Publish to NPM
npm publish --access public
```

## 📚 Package Information

- **Package Name**: `@jais-nikhil/react-blog-editor`
- **Current Version**: 1.0.0
- **Repository**: https://github.com/jais-nikhil/blog-editor
- **NPM URL**: https://www.npmjs.com/package/@jais-nikhil/react-blog-editor

## 🧪 Testing Validation

To test inline validation errors in the demo:

1. Start dev server: `npm run dev`
2. Open http://localhost:5174/
3. Click "Export JSON" to trigger validation
4. Fields with errors will show:
   - Red border (`border-red-500`)
   - Red background (`bg-red-50`)
   - Error message below field

## 🛠️ Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build demo app
npm run build:lib        # Build library for NPM
npm run preview          # Preview production build

# Testing
npm run lint             # Lint code
npm run type-check       # Check TypeScript types

# Package Management
npm pack                 # Create tarball (for testing)
npm publish              # Publish to NPM
npm unpublish @jais-nikhil/react-blog-editor@1.0.0  # Unpublish (within 72hrs)
```

## 📝 Package.json Scripts

- `build:lib`: Builds the library (Vite + TypeScript declarations)
- `prepublishOnly`: Automatically runs before publishing (builds lib)

## 🎯 Next Steps

1. **Publish to NPM**: Run `npm publish --access public`
2. **Update README**: Copy `README-LIBRARY.md` to `README.md` for GitHub display
3. **Add GitHub Topics**: Add topics like `react`, `blog-editor`, `rich-text`, `drag-and-drop`
4. **Create GitHub Release**: Tag version and create release notes
5. **Demo Site**: Consider deploying demo to Vercel/Netlify

## ⚠️ Important Notes

- The `dist` folder is excluded from git but included in NPM package
- TypeScript declarations are generated automatically during build
- All dependencies are properly externalized (not bundled)
- Peer dependencies require React 18 or 19
- Package size: ~136KB (uncompressed), ~22KB (gzipped)

## 🐛 Troubleshooting

### Build Fails

- Ensure all dependencies are installed: `npm install`
- Clear cache: `rm -rf node_modules dist && npm install`

### TypeScript Errors

- Check `tsconfig.lib.json` has `"jsx": "react-jsx"`
- Ensure all imports use proper paths

### Publish Fails

- Verify you're logged in: `npm whoami`
- Check package name is available
- Ensure version hasn't been published before

### Package Not Found After Publishing

- Wait a few minutes for NPM CDN propagation
- Clear NPM cache: `npm cache clean --force`
- Try installing with full version: `npm install @jais-nikhil/react-blog-editor@1.0.0`
