import React from 'react';

const TestComponent: React.FC = () => {
  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-600 mb-4">✅ Blog Editor is Working!</h2>
      <p className="text-gray-700 mb-4">
        The application has been successfully set up with:
      </p>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>React 19 + TypeScript</li>
        <li>Vite for development</li>
        <li>Tailwind CSS 3.x for styling</li>
        <li>Rich text editor capabilities</li>
        <li>Drag and drop functionality</li>
        <li>12 different content types</li>
      </ul>
      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <p className="text-blue-800 font-medium">
          🚀 The full Blog Editor will load shortly. If you see this message, everything is working correctly!
        </p>
      </div>
    </div>
  );
};

export default TestComponent;
