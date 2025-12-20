import { useEffect, useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { adminBlogsAPI, adminUploadAPI } from '../../lib/adminApi';
import '../../styles/admin/common.css';
import '../../styles/admin/Dashboard.css';

interface Blog {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  category: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  ogImage: string;
  published: boolean;
  featured: boolean;
  views: number;
}

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState<Blog>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    author: 'Admin',
    category: 'General',
    tags: [],
    metaTitle: '',
    metaDescription: '',
    metaKeywords: [],
    ogImage: '',
    published: false,
    featured: false,
    views: 0,
  });
  const [tagInput, setTagInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [editorKey, setEditorKey] = useState(0);
  const quillRef = useRef<any>(null);
  const [quillReady, setQuillReady] = useState(false);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const response = await adminBlogsAPI.getAll();
      setBlogs(response.data);
    } catch (error) {
      console.error('Failed to load blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-generate slug from title
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  // Update formData when editingBlog changes (backup in case handleEdit didn't set it)
  useEffect(() => {
    if (editingBlog && showModal && !formData.content && editingBlog.content) {
      console.log('🔄 Backup: Updating formData from editingBlog');
      setFormData(prev => ({
        ...prev,
        ...editingBlog,
        content: editingBlog.content || ''
      }));
    }
  }, [editingBlog?._id, showModal]);

  // Manually set Quill content when editor is ready and we have content to set
  useEffect(() => {
    if (quillReady && quillRef.current && editingBlog && showModal) {
      const targetContent = formData.content || editingBlog.content || '';
      if (targetContent && targetContent.length > 0) {
        const setQuillContent = () => {
          try {
            const quill = quillRef.current?.getEditor();
            if (quill) {
              const currentContent = quill.root.innerHTML;
              // Only update if content is different
              if (currentContent !== targetContent && (currentContent === '<p><br></p>' || currentContent === '' || currentContent === '<p></p>')) {
                quill.clipboard.dangerouslyPasteHTML(targetContent);
                console.log('✅ Manually set Quill content, length:', targetContent.length);
                console.log('📄 Content preview:', targetContent.substring(0, 100));
              }
            }
          } catch (error) {
            console.error('❌ Error setting Quill content:', error);
          }
        };
        
        // Try immediately, then retry with delays to ensure editor is fully initialized
        setQuillContent();
        const timeoutId = setTimeout(setQuillContent, 100);
        const timeoutId2 = setTimeout(setQuillContent, 300);
        const timeoutId3 = setTimeout(setQuillContent, 600);
        
        return () => {
          clearTimeout(timeoutId);
          clearTimeout(timeoutId2);
          clearTimeout(timeoutId3);
        };
      }
    }
  }, [quillReady, editingBlog?._id, showModal, editorKey, formData.content]);

  // Auto-generate meta title and description if empty
  useEffect(() => {
    if (formData.title && !formData.metaTitle) {
      setFormData(prev => ({ ...prev, metaTitle: formData.title }));
    }
    if (formData.excerpt && !formData.metaDescription) {
      setFormData(prev => ({ ...prev, metaDescription: formData.excerpt.substring(0, 160) }));
    }
    if (formData.title && !formData.slug) {
      setFormData(prev => ({ ...prev, slug: generateSlug(formData.title) }));
    }
  }, [formData.title, formData.excerpt]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const uploadFormData = new FormData();
      uploadFormData.append('image', file);

      const response = await adminUploadAPI.uploadSingle(uploadFormData);
      setFormData({ ...formData, featuredImage: response.data.secure_url, ogImage: response.data.secure_url });
      alert('Image uploaded successfully!');
    } catch (error: any) {
      console.error('Upload failed:', error);
      alert('Failed to upload image: ' + (error.message || 'Unknown error'));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBlog?._id) {
        await adminBlogsAPI.update(editingBlog._id, formData);
      } else {
        await adminBlogsAPI.create(formData);
      }
      setShowModal(false);
      setEditingBlog(null);
      resetForm();
      loadBlogs();
    } catch (error: any) {
      console.error('Failed to save blog:', error);
      alert('Failed to save blog: ' + (error.message || 'Unknown error'));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      await adminBlogsAPI.delete(id);
      loadBlogs();
    } catch (error) {
      console.error('Failed to delete blog:', error);
      alert('Failed to delete blog');
    }
  };

  const handleEdit = async (blog: Blog) => {
    try {
      // Fetch fresh blog data to ensure we have the latest content
      const response = await adminBlogsAPI.getOne(blog._id!);
      console.log('📦 Full API response:', response);
      
      // Handle different response structures
      const freshBlog = response.data || response;
      
      console.log('📝 Editing blog ID:', freshBlog._id);
      console.log('📝 Blog content exists:', !!freshBlog.content);
      console.log('📝 Blog content type:', typeof freshBlog.content);
      console.log('📝 Blog content length:', freshBlog.content?.length || 0);
      console.log('📝 Blog content preview (first 300 chars):', freshBlog.content?.substring(0, 300) || 'NO CONTENT');
      
      // Ensure we have valid blog data
      if (!freshBlog) {
        throw new Error('No blog data received');
      }
      
      // Set formData FIRST, then open modal after state has updated
      const contentToSet = freshBlog.content || '';
      console.log('📝 Setting formData with content, length:', contentToSet.length);
      
      setFormData({
        ...freshBlog,
        content: contentToSet
      });
      
      setEditingBlog(freshBlog);
      setQuillReady(false);
      setEditorKey(prev => prev + 1);
      
      // Use requestAnimationFrame to ensure state updates before opening modal
      requestAnimationFrame(() => {
        setShowModal(true);
        // Then try to set quill content after modal renders
        setTimeout(() => {
          setQuillReady(true);
        }, 200);
      });
    } catch (error) {
      console.error('Failed to load blog for editing:', error);
      console.log('📝 Using fallback blog data from list');
      console.log('📝 Fallback content:', blog.content?.substring(0, 200) || 'NO CONTENT');
      
      // Set editingBlog - useEffect will update formData
      setEditingBlog(blog);
      setQuillReady(false); // Reset quill ready state
      setShowModal(true);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featuredImage: '',
      author: 'Admin',
      category: 'General',
      tags: [],
      metaTitle: '',
      metaDescription: '',
      metaKeywords: [],
      ogImage: '',
      published: false,
      featured: false,
      views: 0,
    });
    setTagInput('');
    setKeywordInput('');
    setEditorKey(prev => prev + 1);
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !formData.metaKeywords.includes(keywordInput.trim())) {
      setFormData({ ...formData, metaKeywords: [...formData.metaKeywords, keywordInput.trim()] });
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setFormData({ ...formData, metaKeywords: formData.metaKeywords.filter((k) => k !== keyword) });
  };

  // React Quill modules configuration
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['blockquote', 'code-block'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'script', 'indent',
    'color', 'background', 'align',
    'link', 'image', 'video',
    'blockquote', 'code-block'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="table-title">Blog Posts</h2>
        <button
          onClick={() => {
            resetForm();
            setEditingBlog(null);
            setShowModal(true);
          }}
          className="admin-btn admin-btn-primary"
        >
          + Add Blog Post
        </button>
      </div>

      {/* Blogs List */}
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : blogs.length === 0 ? (
        <div className="recent-contacts" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ marginBottom: '1rem', color: 'inherit' }}>No blog posts yet</p>
          <button onClick={() => setShowModal(true)} className="admin-btn admin-btn-primary">
            Create Your First Blog Post
          </button>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <div className="admin-table">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Views</th>
                  <th>Date</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog._id}>
                    <td className="primary">{blog.title}</td>
                    <td className="secondary">{blog.category}</td>
                    <td>
                      <span className={`badge ${blog.published ? 'badge-green' : 'badge-yellow'}`}>
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                      {blog.featured && <span className="badge badge-blue" style={{ marginLeft: '0.5rem' }}>Featured</span>}
                    </td>
                    <td className="tertiary">{blog.views || 0}</td>
                    <td className="tertiary">
                      {new Date((blog as any).createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => handleEdit(blog)}
                          className="admin-btn admin-btn-primary"
                          style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => blog._id && handleDelete(blog._id)}
                          className="admin-btn admin-btn-danger"
                          style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '56rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="modal-header">
              <h2 className="modal-title">
                {editingBlog ? 'Edit Blog Post' : 'Create Blog Post'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="modal-close"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="modal-body">
              <div className="admin-form" style={{ gap: '1.5rem' }}>
                <div className="admin-form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) })}
                    required
                    className="admin-form-input"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Slug *</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                    required
                    className="admin-form-input"
                    placeholder="auto-generated-from-title"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Excerpt * (Short description for preview)</label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    required
                    rows={3}
                    className="admin-form-textarea"
                    placeholder="Brief summary of the blog post..."
                  />
                </div>
                <div className="admin-form-group">
                  <label>Content *</label>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'inherit', opacity: 0.7 }}>
                      Use the rich text editor below to format your content. You can add headings, bold, italic, links, images, and more.
                    </span>
                  </div>
                  <div style={{ minHeight: '300px', marginBottom: '1rem' }}>
                    {import.meta.env.DEV && (
                      <div style={{ marginBottom: '0.5rem', fontSize: '0.75rem', color: '#666' }}>
                        Debug: Content length = {formData.content?.length || 0}, Editor Key = {editorKey}
                      </div>
                    )}
                    <ReactQuill
                      ref={(el) => {
                        quillRef.current = el;
                        if (el) {
                          // Mark quill as ready after a brief delay
                          setTimeout(() => {
                            setQuillReady(true);
                          }, 50);
                        }
                      }}
                      key={`quill-${editingBlog?._id || 'new'}-${editorKey}`}
                      theme="snow"
                      value={formData.content || ''}
                      onChange={(value) => {
                        setFormData(prev => ({ ...prev, content: value }));
                      }}
                      modules={quillModules}
                      formats={quillFormats}
                      placeholder="Write your blog content here..."
                      style={{ height: '250px', marginBottom: '3rem' }}
                    />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label>Featured Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="admin-form-input"
                  />
                  {uploading && <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'inherit' }}>Uploading...</p>}
                  {formData.featuredImage && (
                    <img src={formData.featuredImage} alt="Preview" style={{ marginTop: '0.5rem', height: '8rem', borderRadius: '0.5rem', objectFit: 'cover' }} />
                  )}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Author</label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Category</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="admin-form-input"
                    />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label>Tags</label>
                  <div className="tag-input-container">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      placeholder="Add a tag and press Enter"
                      className="admin-form-input"
                      style={{ flex: 1 }}
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="admin-btn admin-btn-secondary"
                    >
                      Add
                    </button>
                  </div>
                  <div className="tag-list">
                    {formData.tags.map((tag, index) => (
                      <span key={index} className="tag-item">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="tag-remove"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* SEO Section */}
                <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '1.5rem', marginTop: '1rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'inherit' }}>SEO Settings</h3>
                  
                  <div className="admin-form-group">
                    <label>Meta Title (for SEO)</label>
                    <input
                      type="text"
                      value={formData.metaTitle}
                      onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                      className="admin-form-input"
                      placeholder="Auto-filled from title"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Meta Description (for SEO)</label>
                    <textarea
                      value={formData.metaDescription}
                      onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                      rows={3}
                      className="admin-form-textarea"
                      placeholder="Auto-filled from excerpt"
                    />
                    <p style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: 'inherit', opacity: 0.7 }}>
                      Recommended: 150-160 characters
                    </p>
                  </div>
                  <div className="admin-form-group">
                    <label>Meta Keywords</label>
                    <div className="tag-input-container">
                      <input
                        type="text"
                        value={keywordInput}
                        onChange={(e) => setKeywordInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                        placeholder="Add a keyword and press Enter"
                        className="admin-form-input"
                        style={{ flex: 1 }}
                      />
                      <button
                        type="button"
                        onClick={addKeyword}
                        className="admin-btn admin-btn-secondary"
                      >
                        Add
                      </button>
                    </div>
                    <div className="tag-list">
                      {formData.metaKeywords.map((keyword, index) => (
                        <span key={index} className="tag-item">
                          {keyword}
                          <button
                            type="button"
                            onClick={() => removeKeyword(keyword)}
                            className="tag-remove"
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="admin-form-group">
                    <label>OG Image (for social sharing)</label>
                    <input
                      type="text"
                      value={formData.ogImage}
                      onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                      className="admin-form-input"
                      placeholder="URL or auto-filled from featured image"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="admin-form-checkbox"
                    />
                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Published</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="admin-form-checkbox"
                    />
                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Featured</span>
                  </label>
                </div>

                <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem' }}>
                  <button
                    type="submit"
                    className="admin-btn admin-btn-primary"
                    style={{ flex: 1 }}
                  >
                    {editingBlog ? 'Update' : 'Create'} Blog Post
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="admin-btn admin-btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

