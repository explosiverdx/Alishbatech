import { useEffect, useState } from 'react';
import { adminProjectsAPI, adminUploadAPI } from '../../lib/adminApi';
import '../../styles/admin/common.css';
import '../../styles/admin/Dashboard.css';

interface Project {
  _id?: string;
  title: string;
  category: string;
  description: string;
  image: string;
  imageUrl?: string;
  tags: string[];
  featured: boolean;
  link: string;
  status: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Project>({
    title: '',
    category: '',
    description: '',
    image: '📁',
    imageUrl: '',
    tags: [],
    featured: false,
    link: '',
    status: 'active',
  });
  const [tagInput, setTagInput] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await adminProjectsAPI.getAll();
      setProjects(response.data);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const uploadFormData = new FormData();
      uploadFormData.append('image', file);

      const response = await adminUploadAPI.uploadSingle(uploadFormData);
      setFormData({ ...formData, imageUrl: response.data.secure_url });
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
      if (editingProject?._id) {
        await adminProjectsAPI.update(editingProject._id, formData);
      } else {
        await adminProjectsAPI.create(formData);
      }
      setShowModal(false);
      setEditingProject(null);
      resetForm();
      loadProjects();
    } catch (error: any) {
      console.error('Failed to save project:', error);
      alert('Failed to save project: ' + (error.message || 'Unknown error'));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await adminProjectsAPI.delete(id);
      loadProjects();
    } catch (error) {
      console.error('Failed to delete project:', error);
      alert('Failed to delete project');
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData(project);
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      image: '📁',
      imageUrl: '',
      tags: [],
      featured: false,
      link: '',
      status: 'active',
    });
    setTagInput('');
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="table-title">Projects</h2>
        <button
          onClick={() => {
            resetForm();
            setEditingProject(null);
            setShowModal(true);
          }}
          className="admin-btn admin-btn-primary"
        >
          + Add Project
        </button>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : projects.length === 0 ? (
        <div className="recent-contacts" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ marginBottom: '1rem', color: 'inherit' }}>No projects yet</p>
          <button onClick={() => setShowModal(true)} className="admin-btn admin-btn-primary">
            Create Your First Project
          </button>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project._id} className="project-card">
              <div className="project-image">
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt={project.title} />
                ) : (
                  project.image
                )}
              </div>
              <div className="project-content">
                <div className="project-title-row">
                  <h3 className="project-title">{project.title}</h3>
                  {project.featured && (
                    <span className="badge badge-yellow">Featured</span>
                  )}
                </div>
                <p className="project-category">{project.category}</p>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="project-actions">
                  <button
                    onClick={() => handleEdit(project)}
                    className="admin-btn admin-btn-primary"
                    style={{ flex: 1, fontSize: '0.875rem' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => project._id && handleDelete(project._id)}
                    className="admin-btn admin-btn-danger"
                    style={{ fontSize: '0.875rem' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">
                {editingProject ? 'Edit Project' : 'Create Project'}
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
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="admin-form-input"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Category *</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="admin-form-input"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                    className="admin-form-textarea"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Image Upload</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="admin-form-input"
                  />
                  {uploading && <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'inherit' }}>Uploading...</p>}
                  {formData.imageUrl && (
                    <img src={formData.imageUrl} alt="Preview" style={{ marginTop: '0.5rem', height: '8rem', borderRadius: '0.5rem', objectFit: 'cover' }} />
                  )}
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
                <div className="admin-form-group">
                  <label>Link</label>
                  <input
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="admin-form-input"
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="admin-form-checkbox"
                    />
                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Featured</span>
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="admin-form-select"
                    style={{ width: 'auto' }}
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem' }}>
                  <button
                    type="submit"
                    className="admin-btn admin-btn-primary"
                    style={{ flex: 1 }}
                  >
                    {editingProject ? 'Update' : 'Create'} Project
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
