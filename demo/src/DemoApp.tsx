import React, { useState } from 'react';
import { BlogEditor } from '../lib';
import type { BlogEditorState } from '../lib';
import '../src/index.css';

function DemoApp() {
  const [showExport, setShowExport] = useState(false);
  const [exportedData, setExportedData] = useState<BlogEditorState | null>(null);

  const handleExport = (data: BlogEditorState) => {
    setExportedData(data);
    setShowExport(true);
    console.log('Exported data:', data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                📝 React Blog Editor
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                A powerful plugin for React & Next.js
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/jais-nikhil/blog-editor"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </a>
              <a
                href="https://www.npmjs.com/package/@jais-nikhil/react-blog-editor"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                NPM Package
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Features Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">13+</div>
              <div className="text-sm opacity-90">Content Types</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">✅</div>
              <div className="text-sm opacity-90">Built-in Validation</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">🎨</div>
              <div className="text-sm opacity-90">Fully Customizable</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">⚡</div>
              <div className="text-sm opacity-90">High Performance</div>
            </div>
          </div>
        </div>
      </div>

      {/* Installation Instructions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🚀 Quick Start</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">1. Install the package:</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                npm install @jais-nikhil/react-blog-editor
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">2. Import and use:</h3>
              <div className="bg-gray-900 text-gray-300 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`import { BlogEditor } from '@jais-nikhil/react-blog-editor';
import '@jais-nikhil/react-blog-editor/dist/style.css';

function App() {
  return <BlogEditor />;
}`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Editor */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">🎨 Live Demo</h2>
            <button
              onClick={() => setShowExport(!showExport)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {showExport ? 'Hide' : 'Show'} Export Preview
            </button>
          </div>
          
          <BlogEditor />
        </div>

        {/* Export Preview */}
        {showExport && exportedData && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📤 Exported Data</h2>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
              {JSON.stringify(exportedData, null, 2)}
            </pre>
          </div>
        )}

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <FeatureCard
            icon="📝"
            title="Rich Text Editor"
            description="Full WYSIWYG editor with formatting, lists, links, and more"
          />
          <FeatureCard
            icon="🎯"
            title="12+ Content Types"
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg mb-2">Made with ❤️ by Nikhil Jais</p>
          <p className="text-gray-400 text-sm">
            MIT License • 
            <a href="https://github.com/jais-nikhil/blog-editor" className="hover:text-white ml-2">
              View on GitHub
            </a>
          </p>
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
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

export default DemoApp;
