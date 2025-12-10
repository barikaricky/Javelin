import React, { useState, useEffect } from 'react';
import { sitesAPI } from '../services/api';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiMapPin } from 'react-icons/fi';
import './Manager.css';

const SitesManager = () => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSite, setEditingSite] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    image: null,
    services: '',
    order: 0,
    isActive: true
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const response = await sitesAPI.getAllAdmin();
      setSites(response.data.data);
    } catch (error) {
      console.error('Error fetching sites:', error);
      setError('Failed to load sites');
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
    setEditingSite(null);
    setFormData({
      name: '',
      location: '',
      description: '',
      image: null,
      services: '',
      order: sites.length,
      isActive: true
    });
    setImagePreview(null);
    setShowModal(true);
  };

  const openEditModal = (site) => {
    setEditingSite(site);
    setFormData({
      name: site.name,
      location: site.location,
      description: site.description,
      image: null,
      services: site.services?.join(', ') || '',
      order: site.order || 0,
      isActive: site.isActive
    });
    setImagePreview(site.image);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('location', formData.location);
      data.append('description', formData.description);
      data.append('services', formData.services);
      data.append('order', formData.order);
      data.append('isActive', formData.isActive);
      
      if (formData.image) {
        data.append('image', formData.image);
      }

      if (editingSite) {
        await sitesAPI.update(editingSite._id, data);
      } else {
        await sitesAPI.create(data);
      }

      fetchSites();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving site:', error);
      setError(error.response?.data?.message || 'Failed to save site');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this site?')) return;
    
    try {
      await sitesAPI.delete(id);
      fetchSites();
    } catch (error) {
      console.error('Error deleting site:', error);
      setError('Failed to delete site');
    }
  };

  if (loading) {
    return <div className="manager-loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="manager">
      <div className="manager-header">
        <div>
          <h1>Operational Sites</h1>
          <p>Manage your organization's operational footprint</p>
        </div>
        <button className="btn-primary" onClick={openAddModal}>
          <FiPlus /> Add Site
        </button>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="items-grid">
        {sites.length === 0 ? (
          <div className="no-items">
            <FiMapPin size={48} />
            <p>No sites yet</p>
            <button className="btn-primary" onClick={openAddModal}>Add First Site</button>
          </div>
        ) : (
          sites.map((site) => (
            <div key={site._id} className={`item-card ${!site.isActive ? 'inactive' : ''}`}>
              <div className="item-image">
                <img src={site.image} alt={site.name} onError={(e) => e.target.src = '/assets/images/placeholder.jpg'} />
                {!site.isActive && <span className="inactive-badge">Inactive</span>}
              </div>
              <div className="item-content">
                <h3>{site.name}</h3>
                <p className="item-subtitle"><FiMapPin /> {site.location}</p>
                <p className="item-description">{site.description.substring(0, 100)}...</p>
                {site.services && site.services.length > 0 && (
                  <div className="item-meta">
                    {site.services.slice(0, 3).map((service, idx) => (
                      <span key={idx} className="item-tag">{service}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="item-actions">
                <button className="btn-icon" onClick={() => openEditModal(site)} title="Edit">
                  <FiEdit2 />
                </button>
                <button className="btn-icon btn-danger" onClick={() => handleDelete(site._id)} title="Delete">
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
              <h2>{editingSite ? 'Edit Site' : 'Add Site'}</h2>
              <button className="btn-close" onClick={() => setShowModal(false)}>
                <FiX />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Site Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="City, Country"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Services (comma separated)</label>
                <input
                  type="text"
                  name="services"
                  value={formData.services}
                  onChange={handleInputChange}
                  placeholder="Armed Guards, CCTV Monitoring, 24/7 Patrol"
                />
              </div>
              
              <div className="form-group">
                <label>Site Image {!editingSite && '*'}</label>
                <div className="image-upload">
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="image-preview" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required={!editingSite}
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
                  {submitting ? 'Saving...' : (editingSite ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SitesManager;
