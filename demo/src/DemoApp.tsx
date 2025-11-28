import React, { useState } from 'react';
import BlogEditor from '../../src/components/BlogEditor';
import type { BlogEditorState } from '../../src/types';
import '../../src/index.css';

function DemoApp() {
  const [showExport, setShowExport] = useState(false);
  const [exportedData, setExportedData] = useState<BlogEditorState | null>(null);

  const handleExport = (data: BlogEditorState) => {
    setExportedData(data);
    setShowExport(true);
    console.log('Exported data:', data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                📝 React Blog Editor
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                A powerful, customizable blog editor for React & Next.js
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <a
                href="https://github.com/jais-nikhil/blog-editor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 hover:scale-105 text-sm font-medium shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <a
                href="https://www.npmjs.com/package/@jais-nikhil/react-blog-editor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 hover:scale-105 text-sm font-medium shadow-lg hover:shadow-xl"
              >
                NPM
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Features Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-6 sm:py-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            <div className="text-center transform hover:scale-110 transition-transform">
              <div className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">13+</div>
              <div className="text-xs sm:text-sm opacity-90 font-medium">Content Types</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform">
              <div className="text-2xl sm:text-4xl mb-1 sm:mb-2">✅</div>
              <div className="text-xs sm:text-sm opacity-90 font-medium">Validation</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform">
              <div className="text-2xl sm:text-4xl mb-1 sm:mb-2">🎨</div>
              <div className="text-xs sm:text-sm opacity-90 font-medium">Customizable</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform">
              <div className="text-2xl sm:text-4xl mb-1 sm:mb-2">⚡</div>
              <div className="text-xs sm:text-sm opacity-90 font-medium">Fast</div>
            </div>
          </div>
        </div>
      </div>

      {/* Installation Instructions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="bg-white rounded-xl shadow-xl p-4 sm:p-8 mb-6 sm:mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <span className="text-3xl sm:text-4xl">🚀</span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Quick Start</h2>
          </div>
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base flex items-center gap-2">
                <span className="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shadow-md">1</span>
                Install the package
              </h3>
              <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-md">
                <code className="text-green-400 font-mono text-sm block">
                  npm install @jais-nikhil/react-blog-editor
                </code>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base flex items-center gap-2">
                <span className="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shadow-md">2</span>
                Import and use
              </h3>
              <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-md">
                <pre className="text-gray-100 font-mono text-sm leading-relaxed overflow-x-auto">
{`import { BlogEditor } from '@jais-nikhil/react-blog-editor';
import '@jais-nikhil/react-blog-editor/dist/style.css';

function App() {
  return <BlogEditor />;
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Editor */}
        <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl">🎨</span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Live Demo</h2>
            </div>
            <button
              onClick={() => setShowExport(!showExport)}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all hover:scale-105 shadow-md text-sm sm:text-base font-medium"
            >
              {showExport ? '👁️ Hide' : '👁️ Show'} Export
            </button>
          </div>
          
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-2 sm:p-4">
            <BlogEditor />
          </div>
        </div>

        {/* Export Preview */}
        {showExport && exportedData && (
          <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl sm:text-4xl">📤</span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Exported Data</h2>
            </div>
            <div className="bg-gray-800 border border-gray-700 p-4 sm:p-6 rounded-lg shadow-md max-h-96 overflow-auto">
              <pre className="text-green-400 font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">
                {JSON.stringify(exportedData, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Features Grid */}
        <div className="mb-6 sm:mb-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 inline-block">
              ✨ Key Features
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr">
            <FeatureCard
              icon="📝"
              title="Rich Text Editor"
              description="Full WYSIWYG editor with formatting, lists, links, and more"
            />
            <FeatureCard
              icon="🎯"
              title="13+ Content Types"
              description="Text, Images, CTAs, Embeds, Tables, Quotes, and more"
            />
            <FeatureCard
              icon="🔄"
              title="Drag & Drop"
              description="Reorder content blocks with smooth animations"
            />
            <FeatureCard
              icon="✅"
              title="Validation"
              description="Built-in validation with inline and panel error messages"
            />
            <FeatureCard
              icon="🖼️"
              title="Image Editing"
              description="Crop and edit images directly in the editor"
            />
            <FeatureCard
              icon="📱"
              title="Responsive"
              description="Works perfectly on desktop, tablet, and mobile"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 sm:py-14 mt-16 sm:mt-20 border-t-4 border-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg sm:text-xl font-medium mb-3 text-gray-100">
              Made with <span className="text-red-500 animate-pulse">❤️</span> by <span className="text-indigo-400 font-bold">Nikhil Jais</span>
            </p>
            <div className="flex items-center justify-center gap-4 sm:gap-6 text-sm sm:text-base text-gray-300 mb-4 flex-wrap">
              <span className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-lg">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
                <span className="text-gray-200">MIT License</span>
              </span>
              <a 
                href="https://github.com/jais-nikhil/blog-editor" 
                className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-200">GitHub</span>
              </a>
            </div>
            <p className="text-sm text-gray-400">
              Version 1.0.0 • Updated November 2024
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-indigo-300 h-full flex flex-col">
      <div className="text-4xl mb-3 flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed flex-grow">{description}</p>
    </div>
  );
}

export default DemoApp;
