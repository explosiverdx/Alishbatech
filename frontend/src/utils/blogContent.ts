/**
 * Process blog content to:
 * 1. If content is HTML (from React Quill), return as-is (already formatted)
 * 2. If content is plain text, convert URLs to links and format markdown-style
 * 3. Support backward compatibility with markdown-style formatting
 */

export function processBlogContent(content: string): string {
  if (!content) return '';

  // Use browser's built-in HTML entity decoder
  const tempDiv = document.createElement('div');
  
  // First, check if content has HTML tags (direct or escaped)
  const hasDirectHTML = /<[a-z][a-z0-9]*[^>]*>/i.test(content) || /<\/[a-z][a-z0-9]*>/i.test(content);
  const hasEscapedHTML = /&lt;[a-z]|&lt;\/[a-z]/i.test(content);
  
  // If content has direct HTML tags, use it as-is (React Quill output)
  if (hasDirectHTML) {
    return content;
  }
  
  // If content has escaped HTML, decode it using browser's parser
  if (hasEscapedHTML) {
    tempDiv.innerHTML = content;
    const decoded = tempDiv.textContent || tempDiv.innerText || content;
    
    // Check if decoded content has HTML tags
    if (/<[a-z][a-z0-9]*[^>]*>/i.test(decoded) || /<\/[a-z][a-z0-9]*>/i.test(decoded)) {
      return decoded;
    }
    
    // If still escaped, manually decode
    const manuallyDecoded = content
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#x27;/g, "'")
      .replace(/&#x2F;/g, '/')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&');
    
    if (/<[a-z][a-z0-9]*[^>]*>/i.test(manuallyDecoded) || /<\/[a-z][a-z0-9]*>/i.test(manuallyDecoded)) {
      return manuallyDecoded;
    }
  }

  // Otherwise, process as plain text/markdown
  let processed = content;

  // Convert **text** to <strong>text</strong>
  processed = processed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Convert <b>text</b> to <strong>text</strong> (normalize)
  processed = processed.replace(/<b>(.+?)<\/b>/gi, '<strong>$1</strong>');

  // Convert URLs to clickable links (only for plain text URLs not already in HTML)
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}[^\s]*)/g;
  
  processed = processed.replace(urlRegex, (url) => {
    // Skip if already inside an anchor tag
    if (url.includes('<a') || url.includes('</a>')) {
      return url;
    }

    let href = url;
    if (!href.startsWith('http://') && !href.startsWith('https://')) {
      href = 'https://' + href;
    }

    return `<a href="${href}" target="_blank" rel="noopener noreferrer" style="color: #3b82f6; text-decoration: underline;">${url}</a>`;
  });

  // Convert line breaks to <br>
  processed = processed.replace(/\n/g, '<br>');

  return processed;
}

/**
 * Extract plain text from HTML (for meta descriptions)
 */
export function extractPlainText(html: string, maxLength: number = 160): string {
  if (!html) return '';
  
  // Remove HTML tags
  let text = html.replace(/<[^>]*>/g, '');
  
  // Decode HTML entities
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  
  // Trim and limit length
  text = text.trim();
  if (text.length > maxLength) {
    text = text.substring(0, maxLength).trim() + '...';
  }
  
  return text;
}

