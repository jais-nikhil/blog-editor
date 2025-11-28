import React, { useState, useRef, useEffect } from 'react';
import { Trash2, ChevronUp, ChevronDown, Search, BookOpen, ExternalLink, Check } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import type { AlsoReadData, StoryOption } from '../../types';

interface AlsoReadSubCardProps {
  data: Partial<AlsoReadData>;
  onUpdate: (data: Record<string, any>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  storiesData?: StoryOption[];
  onFetchStories?: (query: string) => Promise<StoryOption[]>;
  validationErrors?: Array<{ field: string; message: string }>;
}

interface FormValues {
  title: string;
  url: string;
  description: string;
  openInNewTab: boolean;
}

const AlsoReadSubCard: React.FC<AlsoReadSubCardProps> = ({ 
  data, 
  onUpdate, 
  onDelete, 
  onMoveUp, 
  onMoveDown, 
  storiesData = [],
  onFetchStories 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStories, setFilteredStories] = useState<StoryOption[]>(storiesData);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStory, setSelectedStory] = useState<StoryOption | null>(null);
  const [useCustom, setUseCustom] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // React Hook Form setup with validation
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      title: data.title || '',
      url: data.url || '',
      description: data.description || '',
      openInNewTab: data.openInNewTab || false,
    }
  });

  // Watch form values and update parent
  const formValues = watch();
  useEffect(() => {
    onUpdate(formValues);
  }, [formValues]);

  // Mock stories data
  const defaultStories: StoryOption[] = [
    {
      id: '1',
      title: 'Getting Started with React Hooks',
      url: 'https://example.com/react-hooks-guide',
      description: 'A comprehensive guide to using React hooks effectively'
    },
    {
      id: '2', 
      title: 'Modern CSS Techniques in 2024',
      url: 'https://example.com/modern-css-2024',
      description: 'Learn the latest CSS features and best practices'
    },
    {
      id: '3',
      title: 'TypeScript Best Practices for Large Projects',
      url: 'https://example.com/typescript-best-practices',
      description: 'How to structure and maintain large TypeScript codebases'
    },
    {
      id: '4',
      title: 'Performance Optimization in Web Applications',
      url: 'https://example.com/web-performance-optimization',
      description: 'Techniques to improve your application performance'
    },
    {
      id: '5',
      title: 'Building Accessible User Interfaces',
      url: 'https://example.com/accessible-ui-design',
      description: 'Creating inclusive designs for all users'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchAndFilterStories = async () => {
      if (searchQuery.trim()) {
        setIsLoading(true);
        try {
          let stories: StoryOption[];
          if (onFetchStories) {
            stories = await onFetchStories(searchQuery);
          } else {
            stories = defaultStories.filter(story =>
              story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              story.description?.toLowerCase().includes(searchQuery.toLowerCase())
            );
          }
          setFilteredStories(stories);
        } catch (error) {
          console.error('Error fetching stories:', error);
          setFilteredStories([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setFilteredStories(storiesData.length > 0 ? storiesData : defaultStories);
      }
    };

    const debounce = setTimeout(fetchAndFilterStories, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery, storiesData, onFetchStories]);

  const selectStory = (story: StoryOption) => {
    setSelectedStory(story);
    setValue('title', story.title);
    setValue('url', story.url);
    if (story.description) {
      setValue('description', story.description);
    }
    setUseCustom(false);
    setIsDropdownOpen(false);
    setSearchQuery('');
  };

  const openDropdown = () => {
    setIsDropdownOpen(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  const clearSelection = () => {
    setSelectedStory(null);
    setUseCustom(true);
    setValue('title', '');
    setValue('url', '');
    setValue('description', '');
  };

  return (
    <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 rounded-r-lg relative">
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
        <BookOpen className="h-4 w-4 text-cyan-600" />
        <h4 className="text-sm font-bold text-cyan-800">Also Read</h4>
      </div>
      
      <div className="space-y-3">
        {/* Story Selector or Custom Toggle */}
        <div className="flex gap-2 items-center">
          <button
            onClick={() => {
              setUseCustom(false);
              if (!selectedStory) {
                setIsDropdownOpen(true);
              }
            }}
            className={`px-3 py-1 text-xs rounded ${!useCustom ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Select Story
          </button>
          <button
            onClick={clearSelection}
            className={`px-3 py-1 text-xs rounded ${useCustom ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Custom Entry
          </button>
        </div>

        {/* Story Selector Dropdown - Only show if not using custom */}
        {!useCustom && (
          <div className="relative" ref={dropdownRef}>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Selected Story
            </label>
            <button
              onClick={openDropdown}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-left bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
            >
              <span className={selectedStory ? 'text-gray-900' : 'text-gray-400'}>
                {selectedStory ? selectedStory.title : 'Search and select a story...'}
              </span>
              <Search className="h-4 w-4 text-gray-400" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-hidden">
                {/* Search Input */}
                <div className="p-2 border-b border-gray-200">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search stories..."
                      className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                {/* Stories List */}
                <div className="max-h-48 overflow-y-auto">
                  {isLoading ? (
                    <div className="p-3 text-center text-gray-500">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-cyan-500 mx-auto"></div>
                      <span className="mt-1 block text-xs">Loading...</span>
                    </div>
                  ) : filteredStories.length > 0 ? (
                    filteredStories.map((story) => (
                      <button
                        key={story.id}
                        onClick={() => selectStory(story)}
                        className={`w-full p-2 text-left hover:bg-cyan-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                          selectedStory?.id === story.id ? 'bg-cyan-100' : ''
                        }`}
                      >
                        <div className="font-medium text-gray-900 text-xs">{story.title}</div>
                        {story.description && (
                          <div className="text-xs text-gray-600 mt-0.5 line-clamp-2">{story.description}</div>
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="p-3 text-center text-gray-500 text-xs">
                      No stories found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Manual Fields */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Title {!useCustom && '*'}
          </label>
          <Controller
            name="title"
            control={control}
            rules={{ 
              required: !useCustom ? 'Title is required' : false,
              minLength: { value: 3, message: 'Title must be at least 3 characters' }
            }}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="text"
                  placeholder="Article title..."
                  disabled={!useCustom && !!selectedStory}
                  className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  } ${!useCustom && selectedStory ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
                )}
              </>
            )}
          />
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            URL {!useCustom && '*'}
          </label>
          <Controller
            name="url"
            control={control}
            rules={{ 
              required: !useCustom ? 'URL is required' : false,
              pattern: {
                value: /^https?:\/\/.+/,
                message: 'Please enter a valid URL starting with http:// or https://'
              }
            }}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="url"
                  placeholder="https://example.com/article"
                  disabled={!useCustom && !!selectedStory}
                  className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                    errors.url ? 'border-red-500' : 'border-gray-300'
                  } ${!useCustom && selectedStory ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                />
                {errors.url && (
                  <p className="text-red-500 text-xs mt-1">{errors.url.message}</p>
                )}
              </>
            )}
          />
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Description <span className="text-gray-500">(Optional)</span>
          </label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                placeholder="Brief description..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                rows={2}
              />
            )}
          />
        </div>

        {/* Styled Checkbox */}
        <div className="flex items-center gap-2">
          <Controller
            name="openInNewTab"
            control={control}
            render={({ field }) => (
              <>
                <div className="relative">
                  <input
                    type="checkbox"
                    id="openInNewTab"
                    checked={field.value}
                    onChange={field.onChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor="openInNewTab"
                    className={`relative flex items-center justify-center w-4 h-4 border-2 rounded cursor-pointer transition-all duration-200 ${
                      field.value
                        ? 'bg-cyan-500 border-cyan-500 text-white'
                        : 'border-gray-300 bg-white hover:border-cyan-400'
                    }`}
                  >
                    {field.value && (
                      <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                    )}
                  </label>
                </div>
                <label htmlFor="openInNewTab" className="text-xs text-gray-700 cursor-pointer flex items-center gap-1">
                  Open in new tab
                  <ExternalLink className="h-3 w-3" />
                </label>
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default AlsoReadSubCard;
