import React, { useState, useEffect } from 'react';
import { galleryAPI } from '../services/api';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiImage, FiFilter } from 'react-icons/fi';
import { buildImageUrl } from '../utils/imageHelper';
import './Manager.css';

const GalleryManager = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'work-in-action',
    image: null,
    order: 0,
    isActive: true
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    { value: 'work-in-action', label: 'Work in Action' },
    { value: 'events', label: 'Events' },
    { value: 'team', label: 'Team' },
    { value: 'facilities', label: 'Facilities' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const response = await galleryAPI.getAllAdmin();
      const raw = response.data?.data || [];
      const normalized = raw.map((item) => ({
        ...item,
        image: buildImageUrl(item.image),
      }));
      setGalleryItems(normalized);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      setError('Failed to load gallery items');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      category: 'work-in-action',
      image: null,
      order: galleryItems.length,
      isActive: true
    });
    setImagePreview(null);
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || '',
      category: item.category,
      image: null,
      order: item.order || 0,
      isActive: item.isActive
    });
    setImagePreview(buildImageUrl(item.image));
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('category', formData.category);
      data.append('order', formData.order);
      data.append('isActive', formData.isActive);
      
      if (formData.image) {
        data.append('image', formData.image);
      }

      if (editingItem) {
        await galleryAPI.update(editingItem._id, data);
      } else {
        await galleryAPI.create(data);
      }

      fetchGalleryItems();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving gallery item:', error);
      setError(error.response?.data?.message || 'Failed to save gallery item');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gallery item?')) return;
    
    try {
      await galleryAPI.delete(id);
      fetchGalleryItems();
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      setError('Failed to delete gallery item');
    }
  };

  const filteredItems = filterCategory 
    ? galleryItems.filter(item => item.category === filterCategory)
    : galleryItems;

  if (loading) {
    return <div className="manager-loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="manager">
      <div className="manager-header">
        <div>
          <h1>Gallery</h1>
          <p>Manage your work in action and gallery images</p>
        </div>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div className="filter-group">
            <FiFilter />
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
          <button className="btn-primary" onClick={openAddModal}>
            <FiPlus /> Add Image
          </button>
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="items-grid">
        {filteredItems.length === 0 ? (
          <div className="no-items">
            <FiImage size={48} />
            <p>No gallery items yet</p>
            <button className="btn-primary" onClick={openAddModal}>Add First Image</button>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div key={item._id} className={`item-card ${!item.isActive ? 'inactive' : ''}`}>
              <div className="item-image">
                <img
                  src={buildImageUrl(item.image)}
                  alt={item.title}
                  onError={(e) => {
                    e.target.src = '/assets/images/placeholder.jpg';
                  }}
                />
                {!item.isActive && <span className="inactive-badge">Inactive</span>}
              </div>
              <div className="item-content">
                <h3>{item.title}</h3>
                <p className="item-subtitle">{categories.find(c => c.value === item.category)?.label}</p>
                {item.description && (
                  <p className="item-description">{item.description.substring(0, 80)}...</p>
                )}
              </div>
              <div className="item-actions">
                <button className="btn-icon" onClick={() => openEditModal(item)} title="Edit">
                  <FiEdit2 />
                </button>
                <button className="btn-icon btn-danger" onClick={() => handleDelete(item._id)} title="Delete">
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
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingItem ? 'Edit Gallery Item' : 'Add Gallery Item'}</h2>
              <button className="btn-close" onClick={() => setShowModal(false)}>
                <FiX />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
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
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Optional description"
                />
              </div>
              
              <div className="form-group">
                <label>Image {!editingItem && '*'}</label>
                <div className="image-upload">
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="image-preview" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required={!editingItem}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Display Order</label>
                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleInputChange}
                    min={0}
                  />
                </div>
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                    />
                    Active (visible on website)
                  </label>
                </div>
              </div>
              
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={submitting}>
                  {submitting ? 'Saving...' : (editingItem ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryManager;
