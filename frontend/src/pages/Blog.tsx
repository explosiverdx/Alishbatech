import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { blogsAPI } from '../lib/api';
import { extractPlainText } from '../utils/blogContent';
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

  // Simple function to clean React Quill content
  const cleanQuillContent = (html: string): string => {
    if (!html) return '';
    
    let cleaned = html;
    
    // Step 0: If content is inside <pre><code> blocks, extract and decode it
    // This handles cases where HTML was typed in a code block
    cleaned = cleaned.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, (_match, codeContent) => {
      // Decode HTML entities in code blocks
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = codeContent;
      const decoded = tempDiv.textContent || tempDiv.innerText || codeContent;
      return decoded;
    });
    
    // Step 1: Remove spans that wrap HTML syntax characters (this breaks HTML tags)
    // React Quill wraps each character in spans for syntax highlighting
    // Pattern: <span...>&lt;</span> or <span...><</span> etc.
    // We extract the content and remove the span wrapper
    cleaned = cleaned.replace(/<span[^>]*>(&lt;|&gt;|&amp;lt;|&amp;gt;|&amp;#x3C;|&amp;#x3E;|&amp;#60;|&amp;#62;|&#60;|&#62;|&#x3C;|&#x3E;|<|>|\/|\s*)<\/span>/gi, '$1');
    
    // Also handle spans with style attributes (syntax highlighting)
    cleaned = cleaned.replace(/<span[^>]*style="[^"]*"[^>]*>(&lt;|&gt;|&amp;lt;|&amp;gt;|&amp;#x3C;|&amp;#x3E;|&#60;|&#62;|&#x3C;|&#x3E;|<|>|\/|\s*)<\/span>/gi, '$1');
    
    // Remove empty spans
    cleaned = cleaned.replace(/<span[^>]*>\s*<\/span>/gi, '');
    
    // Step 2: Fix React Quill's syntax highlighting spans that break HTML tags
    // Pattern for closing tags: <span...>&lt;</span><span...>/</span><span...>tagName</span><span...>&gt;</span>
    // Handle with optional whitespace/newlines between spans
    cleaned = cleaned.replace(
      /<span[^>]*>&lt;<\/span>[\s\S]*?<span[^>]*>\/<\/span>[\s\S]*?<span[^>]*>([a-z][a-z0-9]*)\s*<\/span>[\s\S]*?<span[^>]*>&gt;<\/span>/gi,
      '</$1>'
    );
    
    // Pattern for opening tags: <span...>&lt;</span><span...>tagName</span><span...>&gt;</span>
    cleaned = cleaned.replace(
      /<span[^>]*>&lt;<\/span>[\s\S]*?<span[^>]*>([a-z][a-z0-9]*)\s*<\/span>[\s\S]*?<span[^>]*>&gt;<\/span>/gi,
      '<$1>'
    );
    
    // Also handle patterns where < and > are already decoded but spans remain
    cleaned = cleaned.replace(
      /<span[^>]*><<\/span>[\s\S]*?<span[^>]*>\/<\/span>[\s\S]*?<span[^>]*>([a-z][a-z0-9]*)\s*<\/span>[\s\S]*?<span[^>]*>><\/span>/gi,
      '</$1>'
    );
    
    cleaned = cleaned.replace(
      /<span[^>]*><<\/span>[\s\S]*?<span[^>]*>([a-z][a-z0-9]*)\s*<\/span>[\s\S]*?<span[^>]*>><\/span>/gi,
      '<$1>'
    );
    
    // Step 3: Handle cases where tags are broken across lines or have extra whitespace
    // IMPORTANT: Handle closing tags FIRST (with /), then opening tags
    cleaned = cleaned.replace(/&lt;\s*\/\s*([a-z][a-z0-9]*)\s*&gt;/gi, '</$1>');
    cleaned = cleaned.replace(/&lt;\s*([a-z][a-z0-9]*)\s*&gt;/gi, '<$1>');
    
    // Step 4: Remove any remaining decorative spans that only contain HTML syntax characters
    cleaned = cleaned.replace(/<span[^>]*style="[^"]*color:\s*rgb\(153,\s*153,\s*153\)[^"]*"[^>]*>(&lt;|&gt;|&amp;lt;|&amp;gt;|&amp;#x3C;|&amp;#x3E;|<|>|\/|\s*)<\/span>/gi, '$1');
    
    // Step 5: Manually decode HTML entities to preserve structure
    // This ensures we decode &lt;h1&gt; to <h1> without the browser trying to parse it
    let decoded = cleaned;
    decoded = decoded.replace(/&lt;/g, '<');
    decoded = decoded.replace(/&gt;/g, '>');
    decoded = decoded.replace(/&amp;/g, '&');
    decoded = decoded.replace(/&quot;/g, '"');
    decoded = decoded.replace(/&#39;/g, "'");
    decoded = decoded.replace(/&#x27;/g, "'");
    
    // Also handle numeric entities
    decoded = decoded.replace(/&#60;/g, '<');
    decoded = decoded.replace(/&#62;/g, '>');
    decoded = decoded.replace(/&#x3C;/gi, '<');
    decoded = decoded.replace(/&#x3E;/gi, '>');
    
    // Step 6: Fix any remaining escaped tags (handle all HTML entities)
    // IMPORTANT: Handle closing tags FIRST (with /), then opening tags
    decoded = decoded.replace(/&lt;\/([a-z][a-z0-9]*)\s*&gt;/gi, '</$1>');
    decoded = decoded.replace(/&lt;([a-z][a-z0-9]*)\s*&gt;/gi, '<$1>');
    decoded = decoded.replace(/&#60;\/([a-z][a-z0-9]*)\s*&#62;/gi, '</$1>');
    decoded = decoded.replace(/&#60;([a-z][a-z0-9]*)\s*&#62;/gi, '<$1>');
    decoded = decoded.replace(/&#x3C;\/([a-z][a-z0-9]*)\s*&#x3E;/gi, '</$1>');
    decoded = decoded.replace(/&#x3C;([a-z][a-z0-9]*)\s*&#x3E;/gi, '<$1>');
    
    // Step 7: Fix malformed tags like <</h1> -> </h1> (double < before closing tag)
    decoded = decoded.replace(/<(\/)([a-z][a-z0-9]*)\s*>/gi, '<$1$2>');
    decoded = decoded.replace(/<<\/([a-z][a-z0-9]*)\s*>/gi, '</$1>');
    
    // Step 8: Remove nested <p> tags that shouldn't be nested
    // This fixes cases where we have <p><p>content</p></p> -> <p>content</p>
    decoded = decoded.replace(/<p>\s*<p>/gi, '<p>');
    decoded = decoded.replace(/<\/p>\s*<\/p>/gi, '</p>');
    
    return decoded;
  };

  // Process blog content when blog changes
  useEffect(() => {
    if (blog && blog.content) {
      // Debug: Log raw content to see what we're working with
      if (blog.content.includes('h1') || blog.content.includes('Transforming')) {
        console.log('🔍 Raw blog content (first 1000 chars):', blog.content.substring(0, 1000));
      }
      
      const cleaned = cleanQuillContent(blog.content);
      
      // Debug: Log cleaned content
      if (blog.content.includes('h1') || blog.content.includes('Transforming')) {
        console.log('✨ Cleaned blog content (first 1000 chars):', cleaned.substring(0, 1000));
        console.log('🔎 Does cleaned content contain <h1>?', cleaned.includes('<h1>'));
        console.log('🔎 Does cleaned content contain </h1>?', cleaned.includes('</h1>'));
      }
      
      setProcessedContent(cleaned);
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

