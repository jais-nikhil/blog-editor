import React, { useState, useCallback } from 'react';
import { Trash2, ChevronUp, ChevronDown, Upload, Edit, Download, Image } from 'lucide-react';
import ImageEditor from '../ImageEditorFixed';
import type { ImageData } from '../../types';
import { InlineFieldError } from '../index';

interface ImageSubCardProps {
  data: Partial<ImageData>;
  onUpdate: (data: Record<string, any>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  validationErrors?: Array<{ field: string; message: string }>;
}

const ImageSubCard: React.FC<ImageSubCardProps> = ({ data, onUpdate, onDelete, onMoveUp, onMoveDown, validationErrors = [] }) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (field: keyof ImageData, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  const getFieldError = (fieldName: string) => {
    return validationErrors.find(e => e.field === fieldName)?.message;
  };

  const handleFileUpload = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    if (!file.type.startsWith('image/')) return;
    
    const url = URL.createObjectURL(file);
    onUpdate({ ...data, url });
  }, [data, onUpdate]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleImageSave = (imageData: { url: string; caption: string; alt: string; credit: string }) => {
    onUpdate({
      ...data,
      url: imageData.url,
      caption: imageData.caption,
      alt: imageData.alt,
      credit: imageData.credit
    });
    setIsEditorOpen(false);
  };

  const downloadImage = () => {
    if (!data.url) return;
    const link = document.createElement('a');
    link.href = data.url;
    link.download = 'image.png';
    link.click();
  };

  return (
    <>
      <div className="bg-pink-50 border-l-4 border-pink-500 p-4 rounded-r-lg relative">
        {/* Move and Delete buttons */}
        <div className="absolute top-2 right-2 flex gap-1">
          <button
            onClick={onMoveUp}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title="Move Up"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
          <button
            onClick={onMoveDown}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title="Move Down"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
          <button
            onClick={onDelete}
            className="text-red-400 hover:text-red-600 transition-colors"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <Image className="h-4 w-4 text-pink-600" />
          <h4 className="text-sm font-bold text-pink-800">Image</h4>
        </div>

        {!data.url ? (
          /* Drop Zone */
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging 
                ? 'border-pink-400 bg-pink-100' 
                : 'border-gray-300 hover:border-pink-400'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Drag and drop an image here, or</p>
            <label className="inline-block">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
              <span className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 cursor-pointer transition-colors">
                Choose File
              </span>
            </label>
          </div>
        ) : (
          /* Image Preview and Controls */
          <div className="grid grid-cols-2 gap-4">
            {/* Left side - Image Preview */}
            <div className="space-y-2">
              <div className="relative aspect-video">
                <img
                  src={data.url}
                  alt={data.alt || 'Preview'}
                  className="w-full h-full object-cover rounded-md border border-gray-200"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    onClick={() => setIsEditorOpen(true)}
                    className="bg-black bg-opacity-50 text-white p-1 rounded-md hover:bg-opacity-70 transition-opacity"
                    title="Edit Image"
                  >
                    <Edit className="h-3 w-3" />
                  </button>
                  <button
                    onClick={downloadImage}
                    className="bg-black bg-opacity-50 text-white p-1 rounded-md hover:bg-opacity-70 transition-opacity"
                    title="Download Image"
                  >
                    <Download className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => onUpdate({ ...data, url: '' })}
                    className="bg-red-500 bg-opacity-75 text-white p-1 rounded-md hover:bg-opacity-90 transition-opacity"
                    title="Delete Image"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right side - Form Fields */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Caption
                </label>
                <input
                  type="text"
                  value={data.caption || ''}
                  onChange={(e) => handleChange('caption', e.target.value)}
                  placeholder="Image caption..."
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Alt Text
                </label>
                <input
                  type="text"
                  value={data.alt || ''}
                  onChange={(e) => handleChange('alt', e.target.value)}
                  placeholder="Alternative text..."
                  className={`w-full px-2 py-1 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                    getFieldError('alt') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                <InlineFieldError message={getFieldError('alt')} />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Credit
                </label>
                <input
                  type="text"
                  value={data.credit || ''}
                  onChange={(e) => handleChange('credit', e.target.value)}
                  placeholder="Photo credit..."
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Image Editor Modal */}
      <ImageEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        imageUrl={data.url || null}
        onSave={handleImageSave}
      />
    </>
  );
};

export default ImageSubCard;
