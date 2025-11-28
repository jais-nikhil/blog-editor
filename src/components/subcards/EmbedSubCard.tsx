import React, { useState, useEffect, useRef } from 'react';
import { Trash2, ChevronUp, ChevronDown, Code, Youtube, Video, Twitter, Instagram, Linkedin, AlertCircle } from 'lucide-react';
import type { EmbedData } from '../../types';
import { InlineFieldError } from '../index';

// Extend Window interface for social media embed scripts
declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void;
      };
    };
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

interface EmbedSubCardProps {
  data: Partial<EmbedData>;
  onUpdate: (data: Record<string, any>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  validationErrors?: Array<{ field: string; message: string }>;
}

interface ParsedEmbed {
  platform: 'youtube' | 'vimeo' | 'twitter' | 'instagram' | 'linkedin' | 'unknown';
  embedCode: string;
  cleanCode: string; // Code without script tags
  url?: string;
  needsScript?: boolean;
}

const EmbedSubCard: React.FC<EmbedSubCardProps> = ({ data, onUpdate, onDelete, onMoveUp, onMoveDown, validationErrors = [] }) => {
  const [parsedEmbed, setParsedEmbed] = useState<ParsedEmbed | null>(null);
  const [error, setError] = useState<string>('');
  const previewRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef<{ twitter: boolean; instagram: boolean }>({ twitter: false, instagram: false });

  const handleChange = (field: keyof EmbedData, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  const getFieldError = (fieldName: string) => {
    return validationErrors.find(e => e.field === fieldName)?.message;
  };

  // Load external scripts for social embeds
  const loadScript = (platform: 'twitter' | 'instagram') => {
    if (scriptLoadedRef.current[platform]) return;

    const scriptId = platform === 'twitter' ? 'twitter-wjs' : 'instagram-embed';
    if (document.getElementById(scriptId)) {
      scriptLoadedRef.current[platform] = true;
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.async = true;
    
    if (platform === 'twitter') {
      script.src = 'https://platform.twitter.com/widgets.js';
      script.charset = 'utf-8';
    } else {
      script.src = '//www.instagram.com/embed.js';
    }
    
    document.body.appendChild(script);
    scriptLoadedRef.current[platform] = true;
  };

  // Parse and detect embed platform
  const parseEmbed = (input: string): ParsedEmbed | null => {
    if (!input.trim()) return null;

    const trimmedInput = input.trim();
    
    // YouTube patterns
    const youtubePatterns = [
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /<iframe[^>]*src=["'](?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})[^"']*["'][^>]*>/,
    ];

    for (const pattern of youtubePatterns) {
      const match = trimmedInput.match(pattern);
      if (match) {
        const videoId = match[1];
        const code = `<iframe width="100%" height="400" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        return {
          platform: 'youtube',
          embedCode: code,
          cleanCode: code,
          url: `https://www.youtube.com/watch?v=${videoId}`,
        };
      }
    }

    // Vimeo patterns
    const vimeoPatterns = [
      /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/,
      /<iframe[^>]*src=["'](?:https?:\/\/)?player\.vimeo\.com\/video\/(\d+)[^"']*["'][^>]*>/,
    ];

    for (const pattern of vimeoPatterns) {
      const match = trimmedInput.match(pattern);
      if (match) {
        const videoId = match[1];
        const code = `<iframe src="https://player.vimeo.com/video/${videoId}" width="100%" height="400" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
        return {
          platform: 'vimeo',
          embedCode: code,
          cleanCode: code,
          url: `https://vimeo.com/${videoId}`,
        };
      }
    }

    // Twitter/X patterns
    const twitterPatterns = [
      /(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\/(\w+)\/status\/(\d+)/,
      /<blockquote[^>]*class=["'][^"']*twitter-tweet[^"']*["'][^>]*>/,
    ];

    for (const pattern of twitterPatterns) {
      const match = trimmedInput.match(pattern);
      if (match) {
        let cleanCode = '';
        if (trimmedInput.includes('<blockquote')) {
          // Remove script tag if present
          cleanCode = trimmedInput.replace(/<script[^>]*>.*?<\/script>/gi, '').trim();
        } else {
          const username = match[1];
          const tweetId = match[2];
          cleanCode = `<blockquote class="twitter-tweet" data-width="550" data-theme="light"><a href="https://twitter.com/${username}/status/${tweetId}"></a></blockquote>`;
        }
        return {
          platform: 'twitter',
          embedCode: cleanCode,
          cleanCode: cleanCode,
          url: trimmedInput.includes('<blockquote') ? undefined : match[0],
          needsScript: true,
        };
      }
    }

    // Instagram patterns
    const instagramPatterns = [
      /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel)\/([a-zA-Z0-9_-]+)/,
      /<blockquote[^>]*class=["'][^"']*instagram-media[^"']*["'][^>]*>/,
    ];

    for (const pattern of instagramPatterns) {
      const match = trimmedInput.match(pattern);
      if (match) {
        let cleanCode = '';
        if (trimmedInput.includes('<blockquote')) {
          // Remove script tag if present
          cleanCode = trimmedInput.replace(/<script[^>]*>.*?<\/script>/gi, '').trim();
        } else {
          const postId = match[1];
          cleanCode = `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/${postId}/" data-instgrm-version="14" style="max-width:540px; min-width:326px; width:calc(100% - 2px);"></blockquote>`;
        }
        return {
          platform: 'instagram',
          embedCode: cleanCode,
          cleanCode: cleanCode,
          url: trimmedInput.includes('<blockquote') ? undefined : `https://www.instagram.com/p/${match[1]}/`,
          needsScript: true,
        };
      }
    }

    // LinkedIn patterns
    const linkedinPatterns = [
      /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/(?:posts|embed)\/[a-zA-Z0-9_-]+/,
      /<iframe[^>]*src=["'](?:https?:\/\/)?(?:www\.)?linkedin\.com\/embed\/feed[^"']*["'][^>]*>/,
    ];

    for (const pattern of linkedinPatterns) {
      const match = trimmedInput.match(pattern);
      if (match) {
        let code = '';
        if (trimmedInput.includes('<iframe')) {
          code = trimmedInput;
        } else {
          code = `<iframe src="${match[0]}" height="400" width="100%" frameborder="0" allowfullscreen></iframe>`;
        }
        return {
          platform: 'linkedin',
          embedCode: code,
          cleanCode: code,
          url: trimmedInput.includes('<iframe') ? undefined : match[0],
        };
      }
    }

    // If it's already an iframe or embed code, use it as-is
    if (trimmedInput.includes('<iframe') || trimmedInput.includes('<blockquote') || trimmedInput.includes('<embed')) {
      const cleanCode = trimmedInput.replace(/<script[^>]*>.*?<\/script>/gi, '').trim();
      return {
        platform: 'unknown',
        embedCode: cleanCode,
        cleanCode: cleanCode,
      };
    }

    return null;
  };

  // Auto-detect and parse embed when embedCode changes
  useEffect(() => {
    if (data.embedCode) {
      const parsed = parseEmbed(data.embedCode);
      if (parsed) {
        setParsedEmbed(parsed);
        setError('');
        
        // Only update if the clean code is different (avoid infinite loops)
        const currentClean = data.embedCode.replace(/<script[^>]*>.*?<\/script>/gi, '').trim();
        if (parsed.cleanCode !== currentClean && parsed.cleanCode !== data.embedCode) {
          onUpdate({ ...data, embedCode: parsed.cleanCode, platform: parsed.platform });
        }
      } else {
        setParsedEmbed(null);
        setError('Could not detect embed type. Please paste a valid URL or embed code from YouTube, Vimeo, X, Instagram, or LinkedIn.');
      }
    } else {
      setParsedEmbed(null);
      setError('');
    }
  }, [data.embedCode]);

  // Load scripts and process embeds when parsedEmbed changes
  useEffect(() => {
    if (!parsedEmbed || !previewRef.current) return;

    // Load required scripts for social embeds
    if (parsedEmbed.platform === 'twitter' && parsedEmbed.needsScript) {
      loadScript('twitter');
      // Process Twitter embeds
      setTimeout(() => {
        if (window.twttr && window.twttr.widgets && previewRef.current) {
          window.twttr.widgets.load(previewRef.current);
        }
      }, 100);
    } else if (parsedEmbed.platform === 'instagram' && parsedEmbed.needsScript) {
      loadScript('instagram');
      // Process Instagram embeds
      setTimeout(() => {
        if (window.instgrm && window.instgrm.Embeds) {
          window.instgrm.Embeds.process();
        }
      }, 100);
    }
  }, [parsedEmbed]);

  const getPlatformIcon = (platform?: string) => {
    switch (platform) {
      case 'youtube':
        return <Youtube className="h-4 w-4" />;
      case 'vimeo':
        return <Video className="h-4 w-4" />;
      case 'twitter':
        return <Twitter className="h-4 w-4" />;
      case 'instagram':
        return <Instagram className="h-4 w-4" />;
      case 'linkedin':
        return <Linkedin className="h-4 w-4" />;
      default:
        return <Code className="h-4 w-4" />;
    }
  };

  const getPlatformName = (platform?: string) => {
    switch (platform) {
      case 'youtube':
        return 'YouTube';
      case 'vimeo':
        return 'Vimeo';
      case 'twitter':
        return 'X (Twitter)';
      case 'instagram':
        return 'Instagram';
      case 'linkedin':
        return 'LinkedIn';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg relative">
      <div className="absolute top-2 right-2 flex gap-1">
        <button
          onClick={onMoveUp}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          title="Move up"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
        <button
          onClick={onMoveDown}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          title="Move down"
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
        <Code className="h-4 w-4 text-red-600" />
        <h4 className="text-sm font-bold text-red-800">Embed</h4>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Embed URL or Code
          </label>
          <textarea
            value={data.embedCode || ''}
            onChange={(e) => handleChange('embedCode', e.target.value)}
            placeholder="Paste YouTube, Vimeo, X, Instagram, or LinkedIn URL or embed code here..."
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono text-sm resize-none ${
              getFieldError('embedCode') ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            rows={3}
          />
          <InlineFieldError message={getFieldError('embedCode')} />
          <p className="text-xs text-gray-500 mt-1">
            Supports: YouTube, Vimeo, X (Twitter), Instagram, LinkedIn URLs or embed codes
          </p>
        </div>

        {/* Platform Detection Badge */}
        {parsedEmbed && (
          <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-md">
            <div className="text-green-600">
              {getPlatformIcon(parsedEmbed.platform)}
            </div>
            <span className="text-sm font-medium text-green-800">
              Detected: {getPlatformName(parsedEmbed.platform)}
            </span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-start gap-2 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-md">
            <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <span className="text-xs text-yellow-800">{error}</span>
          </div>
        )}
        
        {/* Live Preview */}
        {parsedEmbed && parsedEmbed.embedCode && (
          <div className="mt-3">
            <p className="text-xs font-medium text-gray-700 mb-2">Live Preview:</p>
            <div 
              ref={previewRef}
              className="border-2 border-gray-300 rounded-md overflow-hidden bg-white p-2"
              dangerouslySetInnerHTML={{ __html: parsedEmbed.cleanCode }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EmbedSubCard;
