import React, { useState, useRef, useCallback, useEffect } from 'react';
import { X, Download, Edit, Save, RotateCcw, RotateCw, Sun, Filter, ChevronDown, ChevronRight, Crop } from 'lucide-react';
import { uploadImage } from '../utils/helpers';

interface ImageEditorProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  onSave: (imageData: {
    url: string;
    caption: string;
    alt: string;
    credit: string;
  }) => void;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

const aspectRatios = [
  { name: '16:9', ratio: 16/9, label: 'Landscape' },
  { name: '9:16', ratio: 9/16, label: 'Portrait' },
  { name: '4:3', ratio: 4/3, label: 'Standard' },
  { name: '3:4', ratio: 3/4, label: 'Portrait' },
  { name: '1:1', ratio: 1, label: 'Square' },
  { name: 'Custom', ratio: null, label: 'Free Form' }
];

const imageFilters = [
  { name: 'none', label: 'None', filter: '' },
  { name: 'grayscale', label: 'Grayscale', filter: 'grayscale(100%)' },
  { name: 'sepia', label: 'Sepia', filter: 'sepia(100%)' },
  { name: 'blur', label: 'Blur', filter: 'blur(2px)' },
  { name: 'vintage', label: 'Vintage', filter: 'sepia(50%) contrast(120%) brightness(110%)' },
  { name: 'cold', label: 'Cold', filter: 'hue-rotate(90deg) saturate(120%)' },
  { name: 'warm', label: 'Warm', filter: 'hue-rotate(-30deg) saturate(110%)' }
];

const ImageEditor: React.FC<ImageEditorProps> = ({ isOpen, onClose, imageUrl, onSave }) => {
  const [isEditing, setIsEditing] = useState(true); // Start with editing mode (crop) by default
  const [caption, setCaption] = useState('');
  const [alt, setAlt] = useState('');
  const [credit, setCredit] = useState('');
  const [selectedRatio, setSelectedRatio] = useState(aspectRatios[0]); // Default to 16:9
  const [cropArea, setCropArea] = useState<CropArea>({ x: 0, y: 0, width: 100, height: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [actualImageBounds, setActualImageBounds] = useState({ x: 0, y: 0, width: 0, height: 0 });
  
  // Collapsible panel states
  const [showCrop, setShowCrop] = useState(true);
  const [showAdjustments, setShowAdjustments] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // New editing features state
  const [rotation, setRotation] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [selectedFilter, setSelectedFilter] = useState('none');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const cropContainerRef = useRef<HTMLDivElement>(null);

  // Initialize image size when image loads
  useEffect(() => {
    if (imageUrl && imageRef.current) {
      const img = imageRef.current;
      const onLoad = () => {
        // Use fixed container size that fills the available space
        const containerWidth = 800;
        const containerHeight = 600;
        
        setImageSize({ width: containerWidth, height: containerHeight });
        
        // Since we're using object-contain, the image fills the entire container
        // but maintains aspect ratio, so actual image bounds = container bounds
        setActualImageBounds({ 
          x: 0, 
          y: 0, 
          width: containerWidth, 
          height: containerHeight 
        });
      };
      
      if (img.complete) {
        onLoad();
      } else {
        img.onload = onLoad;
      }
    }
  }, [imageUrl]);

  // Initialize and update crop area
  useEffect(() => {
    if (actualImageBounds.width > 0 && actualImageBounds.height > 0) {
      const currentRatio = selectedRatio.ratio || (16/9);
      
      // Calculate crop dimensions that fit within the container
      let cropWidth, cropHeight;
      
      // Try fitting by width first
      cropWidth = actualImageBounds.width * 0.9; // 90% of container width
      cropHeight = cropWidth / currentRatio;
      
      // If height exceeds container, fit by height instead
      if (cropHeight > actualImageBounds.height * 0.9) {
        cropHeight = actualImageBounds.height * 0.9;
        cropWidth = cropHeight * currentRatio;
      }
      
      // Center the crop area
      const cropX = (actualImageBounds.width - cropWidth) / 2;
      const cropY = (actualImageBounds.height - cropHeight) / 2;
      
      setCropArea({
        x: cropX,
        y: cropY,
        width: cropWidth,
        height: cropHeight
      });
    }
  }, [selectedRatio.ratio, actualImageBounds]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!isEditing) return;
    
    const rect = cropContainerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDragging(true);
    setDragStart({ x: x - cropArea.x, y: y - cropArea.y });
  }, [isEditing, cropArea]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !isEditing) return;
    
    const rect = cropContainerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left - dragStart.x;
    const y = e.clientY - rect.top - dragStart.y;
    
    // Constrain movement within container bounds
    const minX = 0;
    const minY = 0;
    const maxX = imageSize.width - cropArea.width;
    const maxY = imageSize.height - cropArea.height;
    
    setCropArea(prev => ({
      ...prev,
      x: Math.max(minX, Math.min(maxX, x)),
      y: Math.max(minY, Math.min(maxY, y))
    }));
  }, [isDragging, isEditing, dragStart, imageSize, cropArea.width, cropArea.height]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleCropImage = async () => {
    if (!imageRef.current || !canvasRef.current || !imageUrl) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imageRef.current;
    
    if (!ctx) return;
    
    // Calculate scale factors from container to natural image size
    const scaleX = img.naturalWidth / imageSize.width;
    const scaleY = img.naturalHeight / imageSize.height;
    
    // Set canvas size to crop area (in natural image pixels)
    canvas.width = cropArea.width * scaleX;
    canvas.height = cropArea.height * scaleY;
    
    // Calculate crop coordinates in natural image pixels
    const cropX = cropArea.x * scaleX;
    const cropY = cropArea.y * scaleY;
    const cropWidth = cropArea.width * scaleX;
    const cropHeight = cropArea.height * scaleY;
    
    // Draw cropped image
    ctx.drawImage(
      img,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      canvas.width,
      canvas.height
    );
    
    // Convert to blob and upload
    canvas.toBlob(async (blob) => {
      if (blob) {
        try {
          // Call the dummy upload API
          const uploadedUrl = await uploadImage(blob);
          onSave({
            url: uploadedUrl,
            caption,
            alt,
            credit
          });
          setIsEditing(false);
        } catch (error) {
          console.error('Failed to upload image:', error);
          // Fallback to local URL
          const croppedUrl = URL.createObjectURL(blob);
          onSave({
            url: croppedUrl,
            caption,
            alt,
            credit
          });
          setIsEditing(false);
        }
      }
    }, 'image/png');
  };

  const downloadImage = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'image.png';
    link.click();
  };

  const resetAllAdjustments = () => {
    setRotation(0);
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setSelectedFilter('none');
  };

  const rotateImage = (degrees: number) => {
    setRotation(prev => (prev + degrees) % 360);
  };

  const getImageStyle = () => {
    const filterValue = imageFilters.find(f => f.name === selectedFilter)?.filter || '';
    const customFilters = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
    const combinedFilters = filterValue ? `${filterValue} ${customFilters}` : customFilters;
    
    return {
      transform: `rotate(${rotation}deg)`,
      filter: combinedFilters,
      transition: 'all 0.3s ease'
    };
  };

  if (!isOpen || !imageUrl) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50">
      <div className="h-full w-full bg-white flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Image Editor</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 flex">
          {/* Left Sidebar - Editing Options */}
          <div className="w-80 bg-gray-50 border-r overflow-y-auto max-h-full">
            <div className="p-6">
              {/* Cropping Panel */}
              <div className="mb-4">
                <button
                  onClick={() => setShowCrop(!showCrop)}
                  className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Crop className="h-4 w-4" />
                    <span>Crop & Resize</span>
                  </div>
                  {showCrop ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
                
                {showCrop && (
                  <div className="space-y-3 pl-6">
                    <div className="grid grid-cols-3 gap-2">
                      {aspectRatios.map((ratio) => (
                        <button
                          key={ratio.name}
                          onClick={() => setSelectedRatio(ratio)}
                          className={`px-2 py-2 text-xs rounded-md transition-colors ${
                            selectedRatio.name === ratio.name
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {ratio.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Adjustments Panel */}
              <div className="mb-4">
                <button
                  onClick={() => setShowAdjustments(!showAdjustments)}
                  className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    <span>Adjustments</span>
                  </div>
                  {showAdjustments ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
                
                {showAdjustments && (
                  <div className="space-y-4 pl-6">
                    {/* Rotation */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rotation
                      </label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => rotateImage(-90)}
                          className="flex items-center gap-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                        >
                          <RotateCcw className="h-4 w-4" />
                          -90°
                        </button>
                        <button
                          onClick={() => rotateImage(90)}
                          className="flex items-center gap-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                        >
                          <RotateCw className="h-4 w-4" />
                          +90°
                        </button>
                      </div>
                    </div>

                    {/* Brightness */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Brightness: {brightness}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={brightness}
                        onChange={(e) => setBrightness(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>

                    {/* Contrast */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contrast: {contrast}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={contrast}
                        onChange={(e) => setContrast(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>

                    {/* Saturation */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Saturation: {saturation}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={saturation}
                        onChange={(e) => setSaturation(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>

                    {/* Reset Button */}
                    <button
                      onClick={resetAllAdjustments}
                      className="w-full px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                    >
                      Reset All Adjustments
                    </button>
                  </div>
                )}
              </div>

              {/* Filters Panel */}
              <div className="mb-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                  </div>
                  {showFilters ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
                
                {showFilters && (
                  <div className="pl-6">
                    <div className="grid grid-cols-2 gap-2">
                      {imageFilters.map((filter) => (
                        <button
                          key={filter.name}
                          onClick={() => setSelectedFilter(filter.name)}
                          className={`px-3 py-2 text-sm rounded-md transition-colors ${
                            selectedFilter === filter.name
                              ? 'bg-purple-500 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {filter.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Image Details Form */}
              <div className="space-y-4 border-t pt-4">
                <h4 className="font-semibold text-gray-900">Image Details</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Caption
                </label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Image caption..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alt Text
                </label>
                <input
                  type="text"
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
                  placeholder="Alternative text for accessibility..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Credit
                  </label>
                  <input
                    type="text"
                    value={credit}
                    onChange={(e) => setCredit(e.target.value)}
                    placeholder="Photo credit..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="pt-4 border-t">
                  <button
                    onClick={() => onSave({ url: imageUrl, caption, alt, credit })}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Save Image
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Image Preview */}
          <div className="flex-1 flex flex-col">
            <div className="mb-4 flex gap-2">
              {!isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                    Edit Image
                  </button>
                  <button
                    onClick={downloadImage}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleCropImage}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    Apply Crop
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Cancel
                  </button>
                </>
              )}
            </div>



            {/* Image Container */}
            <div className="flex-1 flex items-center justify-center p-6 bg-gray-100">
              <div
                ref={cropContainerRef}
                className="relative bg-white rounded-lg overflow-hidden shadow-lg"
                style={{ 
                  maxWidth: '1280px',
                  width: imageSize.width || 800, 
                  height: imageSize.height || 600,
                  maxHeight: 'calc(100vh - 200px)'
                }}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <img
                  ref={imageRef}
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-contain"
                  draggable={false}
                  style={getImageStyle()}
                />
                
                {/* Crop Overlay (only in edit mode) */}
                {isEditing && (
                  <>
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-40" />
                    
                    {/* Crop area */}
                    <div
                      className="absolute border-2 border-white cursor-move"
                      style={{
                        left: cropArea.x,
                        top: cropArea.y,
                        width: cropArea.width,
                        height: cropArea.height,
                        backgroundColor: 'transparent'
                      }}
                      onMouseDown={handleMouseDown}
                    >
                      {/* Corner handles */}
                      <div className="absolute -top-1 -left-1 w-3 h-3 bg-white border border-gray-400 cursor-nw-resize" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white border border-gray-400 cursor-ne-resize" />
                      <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white border border-gray-400 cursor-sw-resize" />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white border border-gray-400 cursor-se-resize" />
                      
                      {/* Grid lines */}
                      <div className="absolute top-0 left-1/3 w-px h-full bg-white opacity-50" />
                      <div className="absolute top-0 left-2/3 w-px h-full bg-white opacity-50" />
                      <div className="absolute top-1/3 left-0 w-full h-px bg-white opacity-50" />
                      <div className="absolute top-2/3 left-0 w-full h-px bg-white opacity-50" />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>


        </div>

        {/* Hidden canvas for cropping */}
        <canvas
          ref={canvasRef}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageEditor;
