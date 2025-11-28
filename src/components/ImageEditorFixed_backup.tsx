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
  const [isEditing, setIsEditing] = useState(true);
  const [caption, setCaption] = useState('');
  const [alt, setAlt] = useState('');
  const [credit, setCredit] = useState('');
  const [selectedRatio, setSelectedRatio] = useState(aspectRatios[0]); // Default to 16:9
  const [cropArea, setCropArea] = useState<CropArea>({ x: 50, y: 50, width: 300, height: 169 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string>('');
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [containerSize] = useState({ width: 800, height: 600 });
  
  // Collapsible panel states
  const [showCrop, setShowCrop] = useState(true);
  const [showAdjustments, setShowAdjustments] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Editing features state
  const [rotation, setRotation] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [selectedFilter, setSelectedFilter] = useState('none');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const cropContainerRef = useRef<HTMLDivElement>(null);

  // Initialize crop area when aspect ratio changes
  useEffect(() => {
    if (selectedRatio.ratio) {
      const ratio = selectedRatio.ratio;
      
      // Use full width by default, calculate height based on aspect ratio
      const cropWidth = containerSize.width * 0.95; // 95% of container width
      const cropHeight = cropWidth / ratio;
      
      // If calculated height exceeds container, fit by height instead
      if (cropHeight > containerSize.height * 0.95) {
        const adjustedHeight = containerSize.height * 0.95;
        const adjustedWidth = adjustedHeight * ratio;
        
        setCropArea({
          x: (containerSize.width - adjustedWidth) / 2,
          y: (containerSize.height - adjustedHeight) / 2,
          width: adjustedWidth,
          height: adjustedHeight
        });
      } else {
        // Use full width approach
        setCropArea({
          x: (containerSize.width - cropWidth) / 2,
          y: (containerSize.height - cropHeight) / 2,
          width: cropWidth,
          height: cropHeight
        });
      }
    }
  }, [selectedRatio.ratio, containerSize.width, containerSize.height]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!isEditing) return;
    
    const rect = cropContainerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if click is on a resize handle
    const handleSize = 24; // Size of resize handles (6px radius * 2)
    const handleTolerance = handleSize / 2;
    const isOnCorner = (cornerX: number, cornerY: number) => {
      return Math.abs(x - cornerX) <= handleTolerance && Math.abs(y - cornerY) <= handleTolerance;
    };
    
    const cropRight = cropArea.x + cropArea.width;
    const cropBottom = cropArea.y + cropArea.height;
    
    if (isOnCorner(cropArea.x, cropArea.y)) {
      setIsResizing(true);
      setResizeHandle('nw');
    } else if (isOnCorner(cropRight, cropArea.y)) {
      setIsResizing(true);
      setResizeHandle('ne');
    } else if (isOnCorner(cropArea.x, cropBottom)) {
      setIsResizing(true);
      setResizeHandle('sw');
    } else if (isOnCorner(cropRight, cropBottom)) {
      setIsResizing(true);
      setResizeHandle('se');
    } else {
      // Regular drag
      setIsDragging(true);
      setDragStart({ x: x - cropArea.x, y: y - cropArea.y });
    }
  }, [isEditing, cropArea]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = cropContainerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // If not actively dragging or resizing, check for hover states
    if (!isDragging && !isResizing && isEditing) {
      // You could add hover state logic here if needed
      // For now, we'll just handle the active states
    }
    
    if ((!isDragging && !isResizing) || !isEditing) return;
    
    if (isResizing && selectedRatio.ratio) {
      // Handle resizing while maintaining aspect ratio
      const ratio = selectedRatio.ratio;
      const minSize = 50;
      let newWidth, newHeight, newX, newY;
      
      switch (resizeHandle) {
        case 'se': // Southeast corner - resize from top-left anchor
          newWidth = Math.max(minSize, mouseX - cropArea.x);
          newHeight = newWidth / ratio;
          
          // If height exceeds bounds, constrain by height
          if (cropArea.y + newHeight > containerSize.height) {
            newHeight = containerSize.height - cropArea.y;
            newWidth = newHeight * ratio;
          }
          
          newX = cropArea.x;
          newY = cropArea.y;
          break;
          
        case 'sw': // Southwest corner - resize from top-right anchor
          const maxWidthSW = cropArea.x + cropArea.width;
          newWidth = Math.max(minSize, maxWidthSW - mouseX);
          newHeight = newWidth / ratio;
          
          // If height exceeds bounds, constrain by height
          if (cropArea.y + newHeight > containerSize.height) {
            newHeight = containerSize.height - cropArea.y;
            newWidth = newHeight * ratio;
          }
          
          newX = maxWidthSW - newWidth;
          newY = cropArea.y;
          break;
          
        case 'ne': // Northeast corner - resize from bottom-left anchor
          newWidth = Math.max(minSize, mouseX - cropArea.x);
          newHeight = newWidth / ratio;
          
          // If height would exceed bounds upward, constrain by available height
          const maxHeightNE = cropArea.y + cropArea.height;
          if (newHeight > maxHeightNE) {
            newHeight = maxHeightNE;
            newWidth = newHeight * ratio;
          }
          
          newX = cropArea.x;
          newY = maxHeightNE - newHeight;
          break;
          
        case 'nw': // Northwest corner - resize from bottom-right anchor
          const maxWidthNW = cropArea.x + cropArea.width;
          const maxHeightNW = cropArea.y + cropArea.height;
          
          newWidth = Math.max(minSize, maxWidthNW - mouseX);
          newHeight = newWidth / ratio;
          
          // If height would exceed bounds upward, constrain by available height
          if (newHeight > maxHeightNW) {
            newHeight = maxHeightNW;
            newWidth = newHeight * ratio;
          }
          
          newX = maxWidthNW - newWidth;
          newY = maxHeightNW - newHeight;
          break;
          
        default:
          return;
      }
      
      // Final boundary checks
      newX = Math.max(0, Math.min(containerSize.width - newWidth, newX));
      newY = Math.max(0, Math.min(containerSize.height - newHeight, newY));
      
      // Ensure dimensions don't exceed container
      newWidth = Math.min(newWidth, containerSize.width - newX);
      newHeight = Math.min(newHeight, containerSize.height - newY);
      
      setCropArea({
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight
      });
      
    } else if (isDragging) {
      // Handle dragging
      const x = mouseX - dragStart.x;
      const y = mouseY - dragStart.y;
      
      const maxX = containerSize.width - cropArea.width;
      const maxY = containerSize.height - cropArea.height;
      
      setCropArea(prev => ({
        ...prev,
        x: Math.max(0, Math.min(maxX, x)),
        y: Math.max(0, Math.min(maxY, y))
      }));
    }
  }, [isDragging, isResizing, isEditing, dragStart, containerSize, cropArea, resizeHandle, selectedRatio.ratio]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeHandle('');
  }, []);

  const handleCropImage = async () => {
    if (!imageRef.current || !canvasRef.current || !imageUrl) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imageRef.current;
    
    if (!ctx) return;
    
    // Calculate the actual displayed image dimensions and position
    const imgRect = img.getBoundingClientRect();
    const containerRect = cropContainerRef.current?.getBoundingClientRect();
    
    if (!containerRect) return;
    
    // Scale factors from displayed image to natural image
    const scaleX = img.naturalWidth / imgRect.width;
    const scaleY = img.naturalHeight / imgRect.height;
    
    // Calculate crop coordinates relative to the displayed image
    const cropXRelative = cropArea.x * (imgRect.width / containerSize.width);
    const cropYRelative = cropArea.y * (imgRect.height / containerSize.height);
    const cropWidthRelative = cropArea.width * (imgRect.width / containerSize.width);
    const cropHeightRelative = cropArea.height * (imgRect.height / containerSize.height);
    
    // Convert to natural image coordinates
    const naturalCropX = cropXRelative * scaleX;
    const naturalCropY = cropYRelative * scaleY;
    const naturalCropWidth = cropWidthRelative * scaleX;
    const naturalCropHeight = cropHeightRelative * scaleY;
    
    // Set canvas size
    canvas.width = naturalCropWidth;
    canvas.height = naturalCropHeight;
    
    // Draw cropped image
    ctx.drawImage(
      img,
      naturalCropX,
      naturalCropY,
      naturalCropWidth,
      naturalCropHeight,
      0,
      0,
      canvas.width,
      canvas.height
    );
    
    // Convert to blob and save
    canvas.toBlob(async (blob) => {
      if (blob) {
        try {
          const uploadedUrl = await uploadImage(blob);
          onSave({ url: uploadedUrl, caption, alt, credit });
          setIsEditing(false);
        } catch (error) {
          console.error('Failed to upload image:', error);
          const croppedUrl = URL.createObjectURL(blob);
          onSave({ url: croppedUrl, caption, alt, credit });
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
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Image Editor</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 flex">
          {/* Left Sidebar */}
          <div className="w-80 bg-gray-50 border-r overflow-y-auto">
            <div className="p-6">
              {/* Crop Panel */}
              <div className="mb-6">
                <button
                  onClick={() => setShowCrop(!showCrop)}
                  className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-3"
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
                    
                    {/* Crop Info */}
                    <div className="text-xs text-gray-600 space-y-1 p-2 bg-gray-100 rounded">
                      <div>Crop: {Math.round(cropArea.width)} × {Math.round(cropArea.height)}px</div>
                      <div>Ratio: {selectedRatio.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        💡 Drag to move, resize from corners
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Image Details */}
              <div className="space-y-4">
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
                    placeholder="Alternative text..."
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

                <button
                  onClick={() => onSave({ url: imageUrl, caption, alt, credit })}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Save Image
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b flex gap-2">
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
            </div>

            {/* Image Container */}
            <div className="flex-1 flex items-center justify-center p-6 bg-gray-100">
              <div className="relative">
                {/* Instructions tooltip */}
                <div className="absolute -top-8 left-0 text-sm text-gray-600 bg-white px-3 py-1 rounded shadow-md mb-2">
                  <span className="font-medium">Crop Tool:</span> Drag to move • Resize from corners • Maintains aspect ratio
                </div>
                
                <div
                  ref={cropContainerRef}
                  className="relative bg-white rounded-lg shadow-lg select-none"
                  style={{ 
                    width: containerSize.width, 
                    height: containerSize.height
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
                
                {/* Crop Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40" />
                
                {/* Crop Selection */}
                <div
                  className={`absolute border-2 bg-transparent transition-all duration-150 ${
                    isResizing 
                      ? 'border-blue-400 shadow-lg cursor-crosshair' 
                      : isDragging 
                        ? 'border-green-400 shadow-md cursor-grabbing'
                        : 'border-white cursor-move hover:border-blue-300'
                  }`}
                  style={{
                    left: cropArea.x,
                    top: cropArea.y,
                    width: cropArea.width,
                    height: cropArea.height,
                  }}
                  onMouseDown={handleMouseDown}
                >
                  {/* Grid lines */}
                  <div className="absolute top-0 left-1/3 w-px h-full bg-white opacity-50" />
                  <div className="absolute top-0 left-2/3 w-px h-full bg-white opacity-50" />
                  <div className="absolute top-1/3 left-0 w-full h-px bg-white opacity-50" />
                  <div className="absolute top-2/3 left-0 w-full h-px bg-white opacity-50" />
                  
                  {/* Corner resize handles */}
                  <div 
                    className={`absolute -top-2 -left-2 w-6 h-6 rounded-full cursor-nw-resize shadow-lg transition-all duration-150 ${
                      isResizing && resizeHandle === 'nw'
                        ? 'bg-blue-500 border-2 border-blue-600 scale-110'
                        : 'bg-white border-2 border-blue-500 hover:bg-blue-50 hover:scale-105'
                    }`}
                    style={{ transform: 'translate(-50%, -50%)' }}
                  />
                  <div 
                    className={`absolute -top-2 -right-2 w-6 h-6 rounded-full cursor-ne-resize shadow-lg transition-all duration-150 ${
                      isResizing && resizeHandle === 'ne'
                        ? 'bg-blue-500 border-2 border-blue-600 scale-110'
                        : 'bg-white border-2 border-blue-500 hover:bg-blue-50 hover:scale-105'
                    }`}
                    style={{ transform: 'translate(50%, -50%)' }}
                  />
                  <div 
                    className={`absolute -bottom-2 -left-2 w-6 h-6 rounded-full cursor-sw-resize shadow-lg transition-all duration-150 ${
                      isResizing && resizeHandle === 'sw'
                        ? 'bg-blue-500 border-2 border-blue-600 scale-110'
                        : 'bg-white border-2 border-blue-500 hover:bg-blue-50 hover:scale-105'
                    }`}
                    style={{ transform: 'translate(-50%, 50%)' }}
                  />
                  <div 
                    className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full cursor-se-resize shadow-lg transition-all duration-150 ${
                      isResizing && resizeHandle === 'se'
                        ? 'bg-blue-500 border-2 border-blue-600 scale-110'
                        : 'bg-white border-2 border-blue-500 hover:bg-blue-50 hover:scale-105'
                    }`}
                    style={{ transform: 'translate(50%, 50%)' }}
                  />
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden canvas */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default ImageEditor;
