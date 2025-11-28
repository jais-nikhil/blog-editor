import React, { useState, useRef, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import FontFamily from '@tiptap/extension-font-family';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Link as LinkIcon, 
  List, 
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Highlighter,
  Palette,
  Undo2,
  Redo2,
  ChevronDown,
  Type,
  Heading1,
  Heading2,
  Heading3
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange, placeholder }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [showHeadingDropdown, setShowHeadingDropdown] = useState(false);
  const [showFontDropdown, setShowFontDropdown] = useState(false);
  
  const headingDropdownRef = useRef<HTMLDivElement>(null);
  const fontDropdownRef = useRef<HTMLDivElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const highlightPickerRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headingDropdownRef.current && !headingDropdownRef.current.contains(event.target as Node)) {
        setShowHeadingDropdown(false);
      }
      if (fontDropdownRef.current && !fontDropdownRef.current.contains(event.target as Node)) {
        setShowFontDropdown(false);
      }
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false);
      }
      if (highlightPickerRef.current && !highlightPickerRef.current.contains(event.target as Node)) {
        setShowHighlightPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline',
        },
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      FontFamily.configure({
        types: ['textStyle'],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[240px] p-4 text-left max-w-none',
        ...(placeholder && { 'data-placeholder': placeholder }),
      },
    },
  });

  if (!editor) {
    return null;
  }

  const setLink = () => {
    const url = window.prompt('Enter the URL');
    if (url === null) return;

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
    '#FFA500', '#800080', '#008000', '#800000', '#008080', '#000080', '#808080'
  ];

  const highlightColors = [
    '#FFFF00', '#00FF00', '#00FFFF', '#FF00FF', '#FFA500', '#FF6B6B', '#4ECDC4', '#45B7D1'
  ];

  const headingOptions = [
    { level: 0, label: 'Paragraph', icon: Type },
    { level: 1, label: 'Heading 1', icon: Heading1 },
    { level: 2, label: 'Heading 2', icon: Heading2 },
    { level: 3, label: 'Heading 3', icon: Heading3 }
  ];

  const [customFonts, setCustomFonts] = useState<Array<{name: string, value: string, category: string}>>([]);
  const [showAddFont, setShowAddFont] = useState(false);
  const [newFontName, setNewFontName] = useState('');
  const [newFontValue, setNewFontValue] = useState('');

  const defaultFontFamilies = [
    { name: 'Default', value: '', category: 'System' },
    { name: 'Arial', value: 'Arial, sans-serif', category: 'System' },
    { name: 'Times New Roman', value: 'Times New Roman, serif', category: 'System' },
    { name: 'Georgia', value: 'Georgia, serif', category: 'System' },
    { name: 'Helvetica', value: 'Helvetica, sans-serif', category: 'System' },
    { name: 'Verdana', value: 'Verdana, sans-serif', category: 'System' },
    { name: 'Monaco', value: 'Monaco, monospace', category: 'System' },
    { name: 'Inter', value: 'Inter, sans-serif', category: 'Google' },
    { name: 'Open Sans', value: 'Open Sans, sans-serif', category: 'Google' },
    { name: 'Roboto', value: 'Roboto, sans-serif', category: 'Google' },
    { name: 'Lato', value: 'Lato, sans-serif', category: 'Google' },
    { name: 'Montserrat', value: 'Montserrat, sans-serif', category: 'Google' },
    { name: 'Poppins', value: 'Poppins, sans-serif', category: 'Google' },
    { name: 'Playfair Display', value: 'Playfair Display, serif', category: 'Google' },
    { name: 'Source Sans Pro', value: 'Source Sans 3, sans-serif', category: 'Google' },
    { name: 'Nunito', value: 'Nunito, sans-serif', category: 'Google' },
    { name: 'PT Sans', value: 'PT Sans, sans-serif', category: 'Google' },
    { name: 'Merriweather', value: 'Merriweather, serif', category: 'Google' },
    { name: 'Oswald', value: 'Oswald, sans-serif', category: 'Google' },
  ];

  const fontFamilies = [...defaultFontFamilies, ...customFonts];

  const getCurrentHeadingLevel = () => {
    for (let i = 1; i <= 6; i++) {
      if (editor.isActive('heading', { level: i })) {
        return i;
      }
    }
    return 0; // paragraph
  };

  const setHeading = (level: number) => {
    if (level === 0) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run();
    }
    setShowHeadingDropdown(false);
  };

  const getCurrentFontFamily = () => {
    const currentFont = editor.getAttributes('textStyle').fontFamily;
    const foundFont = fontFamilies.find(font => font.value === currentFont);
    return foundFont ? foundFont.name : 'Default';
  };

  const setFontFamily = (fontValue: string) => {
    if (fontValue === '') {
      editor.chain().focus().unsetFontFamily().run();
    } else {
      editor.chain().focus().setFontFamily(fontValue).run();
    }
    setShowFontDropdown(false);
  };

  const addCustomFont = () => {
    if (newFontName.trim() && newFontValue.trim()) {
      const newFont = {
        name: newFontName.trim(),
        value: newFontValue.trim(),
        category: 'Custom'
      };
      setCustomFonts(prev => [...prev, newFont]);
      setNewFontName('');
      setNewFontValue('');
      setShowAddFont(false);
    }
  };

  const removeCustomFont = (index: number) => {
    setCustomFonts(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Compact Single Row Toolbar */}
      <div className="border-b border-gray-200 p-2 bg-gray-50">
        <div className="flex items-center gap-1 flex-wrap">
          {/* Heading Dropdown */}
          <div className="relative" ref={headingDropdownRef}>
            <button
              onClick={() => {
                setShowHeadingDropdown(!showHeadingDropdown);
                setShowFontDropdown(false);
                setShowColorPicker(false);
                setShowHighlightPicker(false);
              }}
              className="px-2 py-1 text-xs rounded hover:bg-gray-200 flex items-center gap-1 min-w-[90px] justify-between"
              title="Text Style"
            >
              <span className="text-xs truncate">
                {getCurrentHeadingLevel() === 0 ? 'Paragraph' : `H${getCurrentHeadingLevel()}`}
              </span>
              <ChevronDown className="h-3 w-3" />
            </button>
            {showHeadingDropdown && (
              <div className="absolute top-8 left-0 bg-white border rounded-lg shadow-lg py-1 z-50 min-w-[120px]">
                {headingOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <button
                      key={option.level}
                      onClick={() => setHeading(option.level)}
                      className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-sm"
                    >
                      <IconComponent className="h-4 w-4" />
                      {option.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Font Family Dropdown */}
          <div className="relative" ref={fontDropdownRef}>
            <button
              onClick={() => {
                setShowFontDropdown(!showFontDropdown);
                setShowHeadingDropdown(false);
                setShowColorPicker(false);
                setShowHighlightPicker(false);
              }}
              className="px-2 py-1 text-xs rounded hover:bg-gray-200 flex items-center gap-1 min-w-[80px] justify-between"
              title="Font Family"
            >
              <span className="text-xs truncate">
                {getCurrentFontFamily()}
              </span>
              <ChevronDown className="h-3 w-3" />
            </button>
            {showFontDropdown && (
              <div className="absolute top-8 left-0 bg-white border rounded-lg shadow-lg py-1 z-50 min-w-[200px] max-h-80 overflow-y-auto">
                {/* System Fonts */}
                <div className="px-3 py-1 text-xs font-semibold text-gray-500 border-b">System Fonts</div>
                {fontFamilies.filter(f => f.category === 'System').map((font) => (
                  <button
                    key={font.value}
                    onClick={() => setFontFamily(font.value)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm"
                    style={{ fontFamily: font.value }}
                  >
                    {font.name}
                  </button>
                ))}
                
                {/* Google Fonts */}
                <div className="px-3 py-1 text-xs font-semibold text-gray-500 border-b border-t">Google Fonts</div>
                {fontFamilies.filter(f => f.category === 'Google').map((font) => (
                  <button
                    key={font.value}
                    onClick={() => setFontFamily(font.value)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm"
                    style={{ fontFamily: font.value }}
                  >
                    {font.name}
                  </button>
                ))}

                {/* Custom Fonts */}
                {customFonts.length > 0 && (
                  <>
                    <div className="px-3 py-1 text-xs font-semibold text-gray-500 border-b border-t">Custom Fonts</div>
                    {customFonts.map((font, index) => (
                      <div key={font.value} className="flex items-center hover:bg-gray-100">
                        <button
                          onClick={() => setFontFamily(font.value)}
                          className="flex-1 px-3 py-2 text-left text-sm"
                          style={{ fontFamily: font.value }}
                        >
                          {font.name}
                        </button>
                        <button
                          onClick={() => removeCustomFont(index)}
                          className="px-2 text-red-500 hover:text-red-700"
                          title="Remove font"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </>
                )}

                {/* Add Custom Font */}
                <div className="border-t">
                  {!showAddFont ? (
                    <button
                      onClick={() => setShowAddFont(true)}
                      className="w-full px-3 py-2 text-left text-sm text-blue-600 hover:bg-blue-50"
                    >
                      + Add Custom Font
                    </button>
                  ) : (
                    <div className="p-3 space-y-2">
                      <input
                        type="text"
                        placeholder="Font name"
                        value={newFontName}
                        onChange={(e) => setNewFontName(e.target.value)}
                        className="w-full px-2 py-1 text-xs border rounded"
                      />
                      <input
                        type="text"
                        placeholder="Font family (e.g., 'Roboto, sans-serif')"
                        value={newFontValue}
                        onChange={(e) => setNewFontValue(e.target.value)}
                        className="w-full px-2 py-1 text-xs border rounded"
                      />
                      <div className="flex gap-1">
                        <button
                          onClick={addCustomFont}
                          className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => {
                            setShowAddFont(false);
                            setNewFontName('');
                            setNewFontValue('');
                          }}
                          className="px-2 py-1 text-xs bg-gray-300 rounded hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="w-px h-6 bg-gray-300" />

          {/* Text Formatting */}
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-300' : ''}`}
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-300' : ''}`}
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('underline') ? 'bg-gray-300' : ''}`}
            title="Underline"
          >
            <UnderlineIcon className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('strike') ? 'bg-gray-300' : ''}`}
            title="Strikethrough"
          >
            <Strikethrough className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('code') ? 'bg-gray-300' : ''}`}
            title="Code"
          >
            <Code className="h-4 w-4" />
          </button>

          <div className="w-px h-6 bg-gray-300" />

          {/* Lists */}
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-300' : ''}`}
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-300' : ''}`}
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('blockquote') ? 'bg-gray-300' : ''}`}
            title="Quote"
          >
            <Quote className="h-4 w-4" />
          </button>

          <div className="w-px h-6 bg-gray-300" />

          {/* Alignment */}
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-300' : ''}`}
            title="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-300' : ''}`}
            title="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-300' : ''}`}
            title="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </button>

          <div className="w-px h-6 bg-gray-300" />

          {/* Color Tools */}
          <div className="relative" ref={colorPickerRef}>
            <button
              onClick={() => {
                setShowColorPicker(!showColorPicker);
                setShowHighlightPicker(false);
                setShowHeadingDropdown(false);
                setShowFontDropdown(false);
              }}
              className="p-1.5 rounded hover:bg-gray-200"
              title="Text Color"
            >
              <Palette className="h-4 w-4" />
            </button>
            {showColorPicker && (
              <div className="absolute top-8 left-0 bg-white border rounded-lg shadow-lg p-3 z-50">
                <div className="grid grid-cols-7 gap-1 w-max">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        editor.chain().focus().setColor(color).run();
                        setShowColorPicker(false);
                      }}
                      className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={highlightPickerRef}>
            <button
              onClick={() => {
                setShowHighlightPicker(!showHighlightPicker);
                setShowColorPicker(false);
                setShowHeadingDropdown(false);
                setShowFontDropdown(false);
              }}
              className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('highlight') ? 'bg-gray-300' : ''}`}
              title="Highlight"
            >
              <Highlighter className="h-4 w-4" />
            </button>
            {showHighlightPicker && (
              <div className="absolute top-8 left-0 bg-white border rounded-lg shadow-lg p-3 z-50">
                <div className="grid grid-cols-4 gap-1 w-max">
                  {highlightColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        editor.chain().focus().toggleHighlight({ color }).run();
                        setShowHighlightPicker(false);
                      }}
                      className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                  <button
                    onClick={() => {
                      editor.chain().focus().unsetHighlight().run();
                      setShowHighlightPicker(false);
                    }}
                    className="w-6 h-6 rounded border border-gray-300 bg-white flex items-center justify-center text-sm hover:bg-gray-100"
                    title="Remove Highlight"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="w-px h-6 bg-gray-300" />

          {/* Link and History */}
          <button
            onClick={setLink}
            className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('link') ? 'bg-gray-300' : ''}`}
            title="Link"
          >
            <LinkIcon className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-50"
            title="Undo"
          >
            <Undo2 className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-50"
            title="Redo"
          >
            <Redo2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="relative">
        <EditorContent editor={editor} />
        {!content && (
          <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
};

export default RichTextEditor;
