import React, { useState, useEffect } from 'react';
import { newsAPI } from '../services/api';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiFileText, FiFilter, FiEye } from 'react-icons/fi';
import './Manager.css';

const NewsManager = () => {
  const [newsPosts, setNewsPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'news',
    tags: '',
    featuredImage: null,
    status: 'draft'
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    { value: 'news', label: 'News' },
    { value: 'blog', label: 'Blog' },
    { value: 'announcement', label: 'Announcement' },
    { value: 'press-release', label: 'Press Release' }
  ];

  const statuses = [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
    { value: 'archived', label: 'Archived' }
  ];

  useEffect(() => {
    fetchNewsPosts();
  }, []);

  const fetchNewsPosts = async () => {
    try {
      const response = await newsAPI.getAllAdmin();
      setNewsPosts(response.data.data);
    } catch (error) {
      console.error('Error fetching news posts:', error);
      setError('Failed to load news posts');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, featuredImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const openAddModal = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: 'news',
      tags: '',
      featuredImage: null,
      status: 'draft'
    });
    setImagePreview(null);
    setShowModal(true);
  };

  const openEditModal = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt || '',
      content: post.content,
      category: post.category,
      tags: post.tags?.join(', ') || '',
      featuredImage: null,
      status: post.status
    });
    setImagePreview(post.featuredImage);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('excerpt', formData.excerpt);
      data.append('content', formData.content);
      data.append('category', formData.category);
      data.append('tags', formData.tags);
      data.append('status', formData.status);
      
      if (formData.featuredImage) {
        data.append('featuredImage', formData.featuredImage);
      }

      if (editingPost) {
        await newsAPI.update(editingPost._id, data);
      } else {
        await newsAPI.create(data);
      }

      fetchNewsPosts();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving news post:', error);
      setError(error.response?.data?.message || 'Failed to save news post');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this news post?')) return;
    
    try {
      await newsAPI.delete(id);
      fetchNewsPosts();
    } catch (error) {
      console.error('Error deleting news post:', error);
      setError('Failed to delete news post');
    }
  };

  const filteredPosts = newsPosts.filter(post => {
    if (filterStatus && post.status !== filterStatus) return false;
    if (filterCategory && post.category !== filterCategory) return false;
    return true;
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div className="manager-loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="manager">
      <div className="manager-header">
        <div>
          <h1>News & Blogs</h1>
          <p>Manage your news posts and blog articles</p>
        </div>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="filter-group">
            <FiFilter />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="">All Status</option>
              {statuses.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
          <button className="btn-primary" onClick={openAddModal}>
            <FiPlus /> Create Post
          </button>
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="items-grid">
        {filteredPosts.length === 0 ? (
          <div className="no-items">
            <FiFileText size={48} />
            <p>No news posts yet</p>
            <button className="btn-primary" onClick={openAddModal}>Create First Post</button>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div key={post._id} className={`item-card ${post.status === 'draft' ? 'draft' : ''}`}>
              <div className="item-image">
                <img src={post.featuredImage} alt={post.title} onError={(e) => e.target.src = '/assets/images/placeholder.jpg'} />
                <span className={`status-badge ${post.status}`}>{post.status}</span>
              </div>
              <div className="item-content">
                <h3>{post.title}</h3>
                <p className="item-subtitle">{categories.find(c => c.value === post.category)?.label}</p>
                <p className="item-description">{post.excerpt || post.content.substring(0, 100)}...</p>
                <div className="item-meta">
                  <span className="item-tag"><FiEye /> {post.views || 0}</span>
                  <span className="item-tag">{formatDate(post.publishedAt || post.createdAt)}</span>
                </div>
              </div>
              <div className="item-actions">
                <button className="btn-icon" onClick={() => openEditModal(post)} title="Edit">
                  <FiEdit2 />
                </button>
                <button className="btn-icon btn-danger" onClick={() => handleDelete(post._id)} title="Delete">
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal modal-large" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingPost ? 'Edit Post' : 'Create Post'}</h2>
              <button className="btn-close" onClick={() => setShowModal(false)}>
                <FiX />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Status *</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                  >
                    {statuses.map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Excerpt (Brief summary)</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows={2}
                  maxLength={300}
                  placeholder="A brief summary shown in previews..."
                />
              </div>
              
              <div className="form-group">
                <label>Content *</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={10}
                  required
                  placeholder="Write your post content here..."
                />
              </div>
              
              <div className="form-group">
                <label>Tags (comma separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="security, news, update"
                />
              </div>
              
              <div className="form-group">
                <label>Featured Image {!editingPost && '*'}</label>
                <div className="image-upload">
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="image-preview" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required={!editingPost}
                  />
                </div>
              </div>
              
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={submitting}>
                  {submitting ? 'Saving...' : (editingPost ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsManager;
