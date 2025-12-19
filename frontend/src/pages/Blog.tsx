import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { blogsAPI } from '../lib/api';
import { processBlogContent, extractPlainText } from '../utils/blogContent';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Blog.css';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  category: string;
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  ogImage?: string;
  published: boolean;
  featured: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export default function Blog() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processedContent, setProcessedContent] = useState<string>('');

  useEffect(() => {
    // Reset state when route changes
    setBlog(null);
    setError(null);
    setLoading(true);
    
    if (slug) {
      loadBlog(slug);
    } else {
      loadBlogs();
    }
  }, [slug, location.pathname]);

  // Process blog content when blog changes
  useEffect(() => {
    if (blog && blog.content) {
      const rawContent = blog.content;
      
      // Function to fix React Quill's syntax highlighting spans that break HTML tags
      // React Quill wraps HTML tag characters in colored spans, breaking tags like &lt;h1&gt; into spans
      // Pattern from console: <span style="...">&lt;</span><span style="...">h1</span><span style="...">&gt;</span>
      const fixQuillSyntaxHighlighting = (text: string): string => {
        let fixed = text;
        
        // FIRST: Fix closing tags (they need to be fixed before opening tags to avoid conflicts)
        // Pattern for closing tags: <span...>&lt;</span><span...>/</span><span...>tagName</span><span...>&gt;</span>
        fixed = fixed.replace(
          /<span[^>]*>&lt;<\/span><span[^>]*>\/<\/span><span[^>]*>([a-z][a-z0-9]*)\s*<\/span><span[^>]*>&gt;<\/span>/gi,
          '</$1>'
        );
        
        // Pattern: <span...>&lt;</span><span...>tagName</span><span...>&gt;</span>
        // Match opening tags like <h1>, <h2>, etc.
        fixed = fixed.replace(
          /<span[^>]*>&lt;<\/span><span[^>]*>([a-z][a-z0-9]*)\s*<\/span><span[^>]*>&gt;<\/span>/gi,
          '<$1>'
        );
        
        // Also handle patterns where &lt; and &gt; are already decoded but spans remain
        // Pattern for closing: <span...><</span><span...>/</span><span...>h1</span><span...>></span>
        fixed = fixed.replace(
          /<span[^>]*><<\/span><span[^>]*>\/<\/span><span[^>]*>([a-z][a-z0-9]*)\s*<\/span><span[^>]*>><\/span>/gi,
          '</$1>'
        );
        
        // Pattern: <span...><</span><span...>h1</span><span...>></span>
        fixed = fixed.replace(
          /<span[^>]*><<\/span><span[^>]*>([a-z][a-z0-9]*)\s*<\/span><span[^>]*>><\/span>/gi,
          '<$1>'
        );
        
        // Handle simpler patterns: &lt;\/</span><span>h1</span><span>&gt;</span>
        fixed = fixed.replace(
          /&lt;\/<\/span><span[^>]*>([a-z][a-z0-9]*)\s*<\/span><span[^>]*>&gt;<\/span>/gi,
          '</$1>'
        );
        
        // Handle simpler patterns: &lt;</span><span>h1</span><span>&gt;</span>
        fixed = fixed.replace(
          /&lt;<\/span><span[^>]*>([a-z][a-z0-9]*)\s*<\/span><span[^>]*>&gt;<\/span>/gi,
          '<$1>'
        );
        
        // Clean up syntax highlighting spans that are just decorative characters
        // Remove spans containing only < or > characters (these are from syntax highlighting)
        // These spans appear inside tags and break the HTML structure
        fixed = fixed.replace(
          /<span[^>]*style="[^"]*color:\s*rgb\(153,\s*153,\s*153\)[^"]*"[^>]*><<\/span>/gi,
          ''
        );
        fixed = fixed.replace(
          /<span[^>]*style="[^"]*color:\s*rgb\(153,\s*153,\s*153\)[^"]*"[^>]*>><\/span>/gi,
          ''
        );
        // Also remove spans with just < or > that might have different color values
        fixed = fixed.replace(
          /<span[^>]*style="[^"]*"[^>]*><<\/span>/gi,
          ''
        );
        fixed = fixed.replace(
          /<span[^>]*style="[^"]*"[^>]*>><\/span>/gi,
          ''
        );
        
        return fixed;
      };
      
      // Function to clean up broken closing tags that appear inside other tags
      // After fixing opening tags, closing tag spans might end up inside the tag
      const fixBrokenClosingTags = (text: string): string => {
        let fixed = text;
        
        // Strategy: Find all instances of broken closing tags and fix them
        // This needs to work even when they appear inside other tags
        
        // Pattern 1: <span><</span><span>/</span><span>h1</span><span>></span>
        // Match this pattern globally and replace with </h1>
        fixed = fixed.replace(
          /<span[^>]*><<\/span>\s*<span[^>]*>\/<\/span>\s*<span[^>]*>([a-z][a-z0-9]*)\s*<\/span>\s*<span[^>]*>><\/span>/gi,
          '</$1>'
        );
        
        // Pattern 2: <span>&lt;</span><span>/</span><span>h1</span><span>&gt;</span>
        fixed = fixed.replace(
          /<span[^>]*>&lt;<\/span>\s*<span[^>]*>\/<\/span>\s*<span[^>]*>([a-z][a-z0-9]*)\s*<\/span>\s*<span[^>]*>&gt;<\/span>/gi,
          '</$1>'
        );
        
        // Pattern 3: More specific for H tags - find <h1>...content...broken closing tag
        // Use a more flexible approach that matches content between tags
        const hTagPattern = /<(h[1-6])>([\s\S]*?)(<span[^>]*><<\/span>\s*<span[^>]*>\/<\/span>\s*<span[^>]*>\1\s*<\/span>\s*<span[^>]*>><\/span>)/gi;
        fixed = fixed.replace(hTagPattern, '<$1>$2</$1>');
        
        // Pattern 4: Same but with escaped entities
        const hTagPatternEscaped = /<(h[1-6])>([\s\S]*?)(<span[^>]*>&lt;<\/span>\s*<span[^>]*>\/<\/span>\s*<span[^>]*>\1\s*<\/span>\s*<span[^>]*>&gt;<\/span>)/gi;
        fixed = fixed.replace(hTagPatternEscaped, '<$1>$2</$1>');
        
        // Pattern 5: Handle any remaining broken closing tag patterns
        fixed = fixed.replace(
          /<span[^>]*><<\/span><span[^>]*>\/<\/span><span[^>]*>([a-z][a-z0-9]*)\s*<\/span><span[^>]*>><\/span>/gi,
          '</$1>'
        );
        
        fixed = fixed.replace(
          /<span[^>]*>&lt;<\/span><span[^>]*>\/<\/span><span[^>]*>([a-z][a-z0-9]*)\s*<\/span><span[^>]*>&gt;<\/span>/gi,
          '</$1>'
        );
        
        return fixed;
      };
      
      // Function to decode HTML entities while preserving HTML structure
      const decodeHTML = (text: string): string => {
        // First, fix React Quill's syntax highlighting spans
        let decoded = fixQuillSyntaxHighlighting(text);
        
        // Then manually decode HTML entities - this preserves the HTML structure
        // Keep decoding until no more changes (handles multiple levels of escaping)
        let previousDecoded = '';
        let iterations = 0;
        const maxIterations = 5; // Prevent infinite loops
        
        while (decoded !== previousDecoded && iterations < maxIterations) {
          previousDecoded = decoded;
          // Decode in correct order to avoid double-decoding
          decoded = decoded
            .replace(/&amp;/g, '&')  // Must decode &amp; first
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&#x27;/g, "'")
            .replace(/&#x2F;/g, '/')
            .replace(/&nbsp;/g, ' ')
            .replace(/&#x60;/g, '`')
            .replace(/&#96;/g, '`')
            // Decode numeric entities for common characters
            .replace(/&#60;/g, '<')
            .replace(/&#62;/g, '>')
            .replace(/&#34;/g, '"')
            .replace(/&#38;/g, '&')
            // Handle hex entities
            .replace(/&#x3C;/gi, '<')
            .replace(/&#x3E;/gi, '>')
            .replace(/&#x22;/gi, '"')
            .replace(/&#x26;/gi, '&');
          
          // After each decode iteration, fix any broken closing tags
          decoded = fixBrokenClosingTags(decoded);
          
          iterations++;
        }
        
        // Final pass to fix any remaining broken closing tags
        decoded = fixBrokenClosingTags(decoded);
        
        return decoded;
      };
      
      // Check if content contains HTML tags (either direct or escaped)
      const hasDirectHTML = /<[a-z][a-z0-9]*[^>]*>/i.test(rawContent) || /<\/[a-z][a-z0-9]*>/i.test(rawContent);
      // More comprehensive check for escaped HTML (including spaces, numbers, etc.)
      const hasEscapedHTML = /&lt;[a-z0-9]|&lt;\/[a-z0-9]|&amp;lt;|&#x3C;[a-z0-9]|&#60;[a-z0-9]/i.test(rawContent);
      const hasAnyHTMLEntities = /&[a-z0-9#]+;/i.test(rawContent);
      // Check for React Quill's syntax highlighting pattern (spans breaking HTML tags)
      const hasQuillSyntaxHighlighting = /<span[^>]*>&lt;<\/span><span[^>]*>[a-z][a-z0-9]*<\/span>/i.test(rawContent);
      
      let processed = rawContent;
      
      // ALWAYS decode HTML entities if they exist - this is safe even if content has direct HTML
      // This handles mixed content where some tags are escaped and some are not
      // React Quill often stores content with escaped HTML entities
      // Also fix React Quill syntax highlighting if detected
      if (hasEscapedHTML || hasAnyHTMLEntities || hasQuillSyntaxHighlighting) {
        processed = decodeHTML(rawContent);
        // Keep decoding until no more escaped HTML tags remain
        // Check for various escaped HTML patterns (including with spaces)
        let decodeCount = 0;
        const escapedPattern = /&lt;[a-z0-9]|&lt;\/[a-z0-9]|&#x3C;[a-z0-9]|&#60;[a-z0-9]|&amp;lt;/i;
        while (escapedPattern.test(processed) && decodeCount < 10) {
          const beforeDecode = processed;
          processed = decodeHTML(processed);
          // If no change occurred, break to avoid infinite loop
          if (beforeDecode === processed) break;
          decodeCount++;
        }
        
        // Final check: if we still have escaped H tags specifically, try one more aggressive decode
        if (/&lt;h[1-6]|&lt;\/h[1-6]|&#60;h[1-6]|&#x3C;h[1-6]/i.test(processed)) {
          console.warn('⚠️ Still found escaped H tags after decoding, applying aggressive decode');
          // More aggressive: replace all escaped H tags directly (handles attributes and spaces)
          // Match opening tags with any attributes: &lt;h1 ... &gt;
          processed = processed
            .replace(/&lt;h1([^&]*?)&gt;/gi, '<h1$1>')
            .replace(/&lt;h2([^&]*?)&gt;/gi, '<h2$1>')
            .replace(/&lt;h3([^&]*?)&gt;/gi, '<h3$1>')
            .replace(/&lt;h4([^&]*?)&gt;/gi, '<h4$1>')
            .replace(/&lt;h5([^&]*?)&gt;/gi, '<h5$1>')
            .replace(/&lt;h6([^&]*?)&gt;/gi, '<h6$1>')
            .replace(/&lt;\/h1\s*&gt;/gi, '</h1>')
            .replace(/&lt;\/h2\s*&gt;/gi, '</h2>')
            .replace(/&lt;\/h3\s*&gt;/gi, '</h3>')
            .replace(/&lt;\/h4\s*&gt;/gi, '</h4>')
            .replace(/&lt;\/h5\s*&gt;/gi, '</h5>')
            .replace(/&lt;\/h6\s*&gt;/gi, '</h6>')
            // Also handle numeric entities
            .replace(/&#60;h1([^&]*?)&#62;/gi, '<h1$1>')
            .replace(/&#60;h2([^&]*?)&#62;/gi, '<h2$1>')
            .replace(/&#60;h3([^&]*?)&#62;/gi, '<h3$1>')
            .replace(/&#60;h4([^&]*?)&#62;/gi, '<h4$1>')
            .replace(/&#60;h5([^&]*?)&#62;/gi, '<h5$1>')
            .replace(/&#60;h6([^&]*?)&#62;/gi, '<h6$1>')
            .replace(/&#60;\/h1\s*&#62;/gi, '</h1>')
            .replace(/&#60;\/h2\s*&#62;/gi, '</h2>')
            .replace(/&#60;\/h3\s*&#62;/gi, '</h3>')
            .replace(/&#60;\/h4\s*&#62;/gi, '</h4>')
            .replace(/&#60;\/h5\s*&#62;/gi, '</h5>')
            .replace(/&#60;\/h6\s*&#62;/gi, '</h6>')
            // Handle hex entities
            .replace(/&#x3C;h1([^&]*?)&#x3E;/gi, '<h1$1>')
            .replace(/&#x3C;h2([^&]*?)&#x3E;/gi, '<h2$1>')
            .replace(/&#x3C;h3([^&]*?)&#x3E;/gi, '<h3$1>')
            .replace(/&#x3C;h4([^&]*?)&#x3E;/gi, '<h4$1>')
            .replace(/&#x3C;h5([^&]*?)&#x3E;/gi, '<h5$1>')
            .replace(/&#x3C;h6([^&]*?)&#x3E;/gi, '<h6$1>')
            .replace(/&#x3C;\/h1\s*&#x3E;/gi, '</h1>')
            .replace(/&#x3C;\/h2\s*&#x3E;/gi, '</h2>')
            .replace(/&#x3C;\/h3\s*&#x3E;/gi, '</h3>')
            .replace(/&#x3C;\/h4\s*&#x3E;/gi, '</h4>')
            .replace(/&#x3C;\/h5\s*&#x3E;/gi, '</h5>')
            .replace(/&#x3C;\/h6\s*&#x3E;/gi, '</h6>');
        }
      } 
      // If content already has direct HTML tags and no entities, use as-is
      else if (hasDirectHTML) {
        processed = rawContent;
      } 
      // Otherwise, process as markdown/plain text
      else {
        processed = processBlogContent(rawContent);
      }
      
      // Final safety check: if we still have any escaped HTML entities, decode them one more time
      const stillHasEscaped = /&lt;[a-z0-9]|&lt;\/[a-z0-9]|&#x3C;[a-z0-9]|&#60;[a-z0-9]/i.test(processed);
      if (stillHasEscaped) {
        console.warn('⚠️ Still found escaped HTML after processing, applying final decode pass');
        processed = decodeHTML(processed);
      }
      
      // Final cleanup: Fix any remaining broken closing tags for H tags
      // This handles cases where closing tags appear as spans inside opening tags
      // Use a more aggressive approach: find opening H tags and their corresponding broken closing tags
      for (let i = 1; i <= 6; i++) {
        const hTag = `h${i}`;
        
        // Pattern 1: <h1>...any content including spans...<span><</span><span>/</span><span>h1</span><span>></span>
        // Use non-greedy match but allow it to match across multiple lines and tags
        // Fix: Use $1 for the tag name, not the full tag
        let pattern = new RegExp(`(<${hTag}>)([\\s\\S]*?)(<span[^>]*><<\\/span>[\\s]*<span[^>]*>/<\\/span>[\\s]*<span[^>]*>${hTag}[\\s]*<\\/span>[\\s]*<span[^>]*>><\\/span>)`, 'gi');
        processed = processed.replace(pattern, (_match, openTag, content) => {
          return `${openTag}${content}</${hTag}>`;
        });
        
        // Pattern 2: Same but with escaped entities
        pattern = new RegExp(`(<${hTag}>)([\\s\\S]*?)(<span[^>]*>&lt;<\\/span>[\\s]*<span[^>]*>/<\\/span>[\\s]*<span[^>]*>${hTag}[\\s]*<\\/span>[\\s]*<span[^>]*>&gt;<\\/span>)`, 'gi');
        processed = processed.replace(pattern, (_match, openTag, content) => {
          return `${openTag}${content}</${hTag}>`;
        });
        
        // Pattern 3: More flexible - match any broken closing tag pattern for this H tag
        // This catches cases where the pattern might be slightly different
        pattern = new RegExp(`<span[^>]*><<\\/span>[\\s]*<span[^>]*>/<\\/span>[\\s]*<span[^>]*>${hTag}[\\s]*<\\/span>[\\s]*<span[^>]*>><\\/span>`, 'gi');
        processed = processed.replace(pattern, `</${hTag}>`);
        
        pattern = new RegExp(`<span[^>]*>&lt;<\\/span>[\\s]*<span[^>]*>/<\\/span>[\\s]*<span[^>]*>${hTag}[\\s]*<\\/span>[\\s]*<span[^>]*>&gt;<\\/span>`, 'gi');
        processed = processed.replace(pattern, `</${hTag}>`);
        
        // Pattern 4: Handle cases where spans might be in different order or have different attributes
        // Match: <span...><</span> followed by <span...>/</span> followed by <span...>h1</span> followed by <span...>></span>
        // Allow for optional whitespace and different span structures
        pattern = new RegExp(`(<${hTag}>)([\\s\\S]*?)(<span[^>]*><<\\/span>.*?<span[^>]*>/<\\/span>.*?<span[^>]*>${hTag}[\\s]*<\\/span>.*?<span[^>]*>><\\/span>)`, 'gis');
        processed = processed.replace(pattern, (_match, openTag, content) => {
          return `${openTag}${content}</${hTag}>`;
        });
      }
      
      // Additional cleanup: Remove any remaining syntax highlighting spans that are just decorative
      // These are spans that contain only <, >, or / characters
      processed = processed.replace(/<span[^>]*style="[^"]*color:\s*rgb\(153,\s*153,\s*153\)[^"]*"[^>]*><<\/span>/gi, '');
      processed = processed.replace(/<span[^>]*style="[^"]*color:\s*rgb\(153,\s*153,\s*153\)[^"]*"[^>]*>><\/span>/gi, '');
      processed = processed.replace(/<span[^>]*style="[^"]*color:\s*rgb\(153,\s*153,\s*153\)[^"]*"[^>]*>\/<\/span>/gi, '');
      
      // Final aggressive pass: Use a simple but effective approach
      // Replace any broken closing tag pattern globally, regardless of context
      for (let i = 1; i <= 6; i++) {
        const hTag = `h${i}`;
        
        // Replace broken closing tag patterns with proper closing tags
        // This works even if they appear inside other tags
        const patterns = [
          // Pattern with decoded < and >
          new RegExp(`<span[^>]*><<\\/span>\\s*<span[^>]*>/<\\/span>\\s*<span[^>]*>${hTag}\\s*<\\/span>\\s*<span[^>]*>><\\/span>`, 'gi'),
          // Pattern with escaped &lt; and &gt;
          new RegExp(`<span[^>]*>&lt;<\\/span>\\s*<span[^>]*>/<\\/span>\\s*<span[^>]*>${hTag}\\s*<\\/span>\\s*<span[^>]*>&gt;<\\/span>`, 'gi'),
          // More flexible pattern allowing any attributes
          new RegExp(`<span[^>]*><<\\/span>.*?<span[^>]*>/<\\/span>.*?<span[^>]*>${hTag}\\s*<\\/span>.*?<span[^>]*>><\\/span>`, 'gis'),
        ];
        
        patterns.forEach(pattern => {
          processed = processed.replace(pattern, `</${hTag}>`);
        });
      }
      
      // CRITICAL FIX: Handle cases where closing tags appear as /h1, /h2, etc. (missing < and >)
      // This happens when the spans containing < and > are removed but /h1 remains
      // Find opening H tags and look for /h1, /h2, etc. after them and replace with proper closing tags
      for (let i = 1; i <= 6; i++) {
        const hTag = `h${i}`;
        
        // Pattern 1: Find <h1>...content...<span>/</span><span>h1</span> and replace with </h1>
        const spanPattern = new RegExp(`(<${hTag}>[\\s\\S]*?)(<span[^>]*>/<\\/span>[\\s]*<span[^>]*>${hTag}[\\s]*<\\/span>)`, 'gi');
        processed = processed.replace(spanPattern, `$1</${hTag}>`);
        
        // Pattern 2: Find <h1>...content.../h1 (plain text, no spans) and replace with </h1>
        // Use a more careful approach: find opening tag, then find /h1 that's not part of another tag
        const plainTextPattern = new RegExp(`(<${hTag}>)([\\s\\S]*?)(/${hTag})(?![a-z0-9])`, 'gi');
        processed = processed.replace(plainTextPattern, (match, openTag, content) => {
          // Check if there's already a proper closing tag in the content
          if (!content.includes(`</${hTag}>`)) {
            return `${openTag}${content}</${hTag}>`;
          }
          return match;
        });
        
        // Pattern 3: Handle cases where /h1 appears inside spans
        const spanWithSlashPattern = new RegExp(`(<${hTag}>[\\s\\S]*?)(<span[^>]*>/${hTag}<\\/span>)`, 'gi');
        processed = processed.replace(spanWithSlashPattern, `$1</${hTag}>`);
      }
      
      // Debug logging to help diagnose the issue
      // Find H tags in raw content to see their exact format (including Quill syntax highlighting)
      const hTagMatch = rawContent.match(/(&lt;h[1-6][^&]*&gt;|&lt;\/h[1-6]&gt;|<h[1-6][^>]*>|<\/h[1-6]>|<span[^>]*>&lt;<\/span><span[^>]*>h[1-6])/i);
      // Check for Quill pattern: <span...>&lt;</span><span...>h1</span>
      const quillHTagIndex = rawContent.search(/<span[^>]*>&lt;<\/span><span[^>]*>h[1-6]/i);
      const hTagIndex = rawContent.search(/(&lt;h[1-6]|<h[1-6]|<span[^>]*>&lt;<\/span><span[^>]*>h[1-6])/i);
      const rawHTagSample = hTagIndex >= 0 ? rawContent.substring(Math.max(0, hTagIndex - 20), Math.min(rawContent.length, hTagIndex + 150)) : 'Not found';
      
      const processedHTagIndex = processed.search(/(&lt;h[1-6]|<h[1-6])/i);
      const processedHTagSample = processedHTagIndex >= 0 ? processed.substring(Math.max(0, processedHTagIndex - 20), Math.min(processed.length, processedHTagIndex + 150)) : 'Not found';
      
      const finalHasEscaped = /&lt;[a-z0-9]|&lt;\/[a-z0-9]|&#x3C;[a-z0-9]|&#60;[a-z0-9]/i.test(processed);
      const finalHasQuillPattern = /<span[^>]*>&lt;<\/span><span[^>]*>[a-z][a-z0-9]*<\/span>/i.test(processed);
      
      console.log('🔍 Blog Content Debug:', {
        rawLength: rawContent.length,
        processedLength: processed.length,
        hasDirectHTML,
        hasEscapedHTML,
        hasAnyHTMLEntities,
        hasQuillSyntaxHighlighting,
        stillHasEscaped: finalHasEscaped,
        stillHasQuillPattern: finalHasQuillPattern,
        rawSample: rawContent.substring(0, 200),
        processedSample: processed.substring(0, 200),
        // Check specifically for H tags
        rawHasHTags: /&lt;h[1-6]|&lt;\/h[1-6]|<h[1-6]|<\/h[1-6]|<span[^>]*>&lt;<\/span><span[^>]*>h[1-6]/i.test(rawContent),
        processedHasHTags: /<h[1-6]|<\/h[1-6]/i.test(processed),
        processedHasEscapedHTags: /&lt;h[1-6]|&lt;\/h[1-6]/i.test(processed),
        rawHTagSample,
        processedHTagSample,
        hTagMatch: hTagMatch ? hTagMatch[0] : null,
        quillHTagIndex: quillHTagIndex >= 0 ? quillHTagIndex : -1
      });
      
      setProcessedContent(processed);
    } else {
      setProcessedContent('');
    }
  }, [blog]);


  // Update SEO meta tags when blog loads
  useEffect(() => {
    if (blog) {
      const title = blog.metaTitle || blog.title;
      const description = blog.metaDescription || extractPlainText(blog.excerpt);
      const keywords = blog.metaKeywords?.join(', ') || blog.tags?.join(', ') || '';
      const ogImage = blog.ogImage || blog.featuredImage || '';

      // Update document title
      document.title = `${title} | AlishbaTech Blog`;

      // Update or create meta tags
      updateMetaTag('description', description);
      updateMetaTag('keywords', keywords);
      updateMetaTag('og:title', title, 'property');
      updateMetaTag('og:description', description, 'property');
      updateMetaTag('og:image', ogImage, 'property');
      updateMetaTag('og:type', 'article', 'property');
      updateMetaTag('twitter:card', 'summary_large_image');
      updateMetaTag('twitter:title', title);
      updateMetaTag('twitter:description', description);
      updateMetaTag('twitter:image', ogImage);
    } else {
      document.title = 'Blog | AlishbaTech';
      updateMetaTag('description', 'Read our latest blog posts about technology, web development, and digital solutions.');
      updateMetaTag('og:title', 'Blog | AlishbaTech', 'property');
      updateMetaTag('og:description', 'Read our latest blog posts about technology, web development, and digital solutions.', 'property');
    }
  }, [blog]);

  const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
    if (!content) return;
    
    let meta = document.querySelector(`meta[${attribute}="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attribute, name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  const loadBlog = async (blogSlug: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await blogsAPI.getOne(blogSlug);
      setBlog(response.data);
      // Also load other blogs for sidebar
      const blogsResponse = await blogsAPI.getAll({ limit: 5 });
      setBlogs(blogsResponse.data.filter((b: BlogPost) => b.slug !== blogSlug));
    } catch (err: any) {
      console.error('Failed to load blog:', err);
      setError(err.message || 'Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  const loadBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await blogsAPI.getAll();
      setBlogs(response.data);
    } catch (err: any) {
      console.error('Failed to load blogs:', err);
      setError(err.message || 'Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="blog-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="blog-error">
          <p>{error}</p>
          <button
            type="button"
            onClick={() => {
              navigate('/blog');
            }}
            className="blog-back-link"
            style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left', font: 'inherit', cursor: 'pointer' }}
          >
            ← Back to Blog
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  // Single blog post view
  if (blog) {

    return (
      <main className="min-h-screen">
        <Navbar />
        <section className="blog-detail">
          <div className="blog-container blog-detail-container">
            <button
              type="button"
              onClick={() => {
                navigate('/blog');
              }}
              className="blog-back-link"
              style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left', font: 'inherit', cursor: 'pointer' }}
            >
              ← Back to Blog
            </button>
            
            <article className="blog-article blog-article-full">
              <header className="blog-header">
                {blog.featuredImage && (
                  <div className="blog-featured-image">
                    <img src={blog.featuredImage} alt={blog.title} />
                  </div>
                )}
                <h1 className="blog-title">{blog.title}</h1>
                <div className="blog-meta">
                  <span className="blog-author">By {blog.author}</span>
                  <span className="blog-date">
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="blog-category">{blog.category}</span>
                  {blog.views > 0 && <span className="blog-views">{blog.views} views</span>}
                </div>
                {blog.tags && blog.tags.length > 0 && (
                  <div className="blog-tags">
                    {blog.tags.map((tag, index) => (
                      <span key={index} className="blog-tag">{tag}</span>
                    ))}
                  </div>
                )}
              </header>

              <div 
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: processedContent || '' }}
              />
            </article>

            {/* Recent Posts Section Below Article */}
            {blogs.length > 0 && (
              <div className="blog-recent-posts-section">
                <h3 className="blog-recent-posts-title">Recent Posts</h3>
                <div className="blog-recent-posts-grid">
                  {blogs.map((recentBlog) => (
                    <Link key={recentBlog._id} to={`/blog/${recentBlog.slug}`} className="blog-recent-post-card">
                      {recentBlog.featuredImage && (
                        <div className="blog-recent-post-image">
                          <img src={recentBlog.featuredImage} alt={recentBlog.title} />
                        </div>
                      )}
                      <div className="blog-recent-post-content">
                        <h4>{recentBlog.title}</h4>
                        <p>{recentBlog.excerpt}</p>
                        <span className="blog-recent-post-date">
                          {new Date(recentBlog.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  // Blog list view
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="blog-list">
      <div className="blog-container">
        <header className="blog-list-header">
          <h1>Our Blog</h1>
          <p>Stay updated with the latest insights, tips, and news from AlishbaTech</p>
        </header>

        {blogs.length === 0 ? (
          <div className="blog-empty">
            <p>No blog posts available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="blog-grid">
            {blogs.map((post) => (
              <article key={post._id} className="blog-card">
                {post.featuredImage && (
                  <div className="blog-card-image">
                    <img src={post.featuredImage} alt={post.title} />
                  </div>
                )}
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <span className="blog-card-category">{post.category}</span>
                    <span className="blog-card-date">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="blog-card-title">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-footer">
                    <Link to={`/blog/${post.slug}`} className="blog-read-more">
                      Read More →
                    </Link>
                    {post.tags && post.tags.length > 0 && (
                      <div className="blog-card-tags">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="blog-card-tag">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
    <Footer />
    </main>
  );
}

