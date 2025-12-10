import React, { useState, useEffect } from 'react';
import { teamAPI } from '../services/api';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiImage } from 'react-icons/fi';
import './Manager.css';

const TeamManager = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    bio: '',
    image: null,
    socialLinks: {
      linkedin: '',
      twitter: '',
      facebook: '',
      instagram: ''
    },
    order: 0,
    isActive: true
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await teamAPI.getAllAdmin();
      setTeamMembers(response.data.data);
    } catch (error) {
      console.error('Error fetching team members:', error);
      setError('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('social_')) {
      const socialKey = name.replace('social_', '');
      setFormData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialKey]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
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
    setEditingMember(null);
    setFormData({
      name: '',
      position: '',
      bio: '',
      image: null,
      socialLinks: { linkedin: '', twitter: '', facebook: '', instagram: '' },
      order: teamMembers.length,
      isActive: true
    });
    setImagePreview(null);
    setShowModal(true);
  };

  const openEditModal = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      position: member.position,
      bio: member.bio,
      image: null,
      socialLinks: member.socialLinks || { linkedin: '', twitter: '', facebook: '', instagram: '' },
      order: member.order || 0,
      isActive: member.isActive
    });
    setImagePreview(member.image);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('position', formData.position);
      data.append('bio', formData.bio);
      data.append('socialLinks', JSON.stringify(formData.socialLinks));
      data.append('order', formData.order);
      data.append('isActive', formData.isActive);
      
      if (formData.image) {
        data.append('image', formData.image);
      }

      if (editingMember) {
        await teamAPI.update(editingMember._id, data);
      } else {
        await teamAPI.create(data);
      }

      fetchTeamMembers();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving team member:', error);
      setError(error.response?.data?.message || 'Failed to save team member');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this team member?')) return;
    
    try {
      await teamAPI.delete(id);
      fetchTeamMembers();
    } catch (error) {
      console.error('Error deleting team member:', error);
      setError('Failed to delete team member');
    }
  };

  if (loading) {
    return <div className="manager-loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="manager">
      <div className="manager-header">
        <div>
          <h1>Leadership Team</h1>
          <p>Manage your organization's leadership team members</p>
        </div>
        <button className="btn-primary" onClick={openAddModal}>
          <FiPlus /> Add Member
        </button>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="items-grid">
        {teamMembers.length === 0 ? (
          <div className="no-items">
            <FiImage size={48} />
            <p>No team members yet</p>
            <button className="btn-primary" onClick={openAddModal}>Add First Member</button>
          </div>
        ) : (
          teamMembers.map((member) => (
            <div key={member._id} className={`item-card ${!member.isActive ? 'inactive' : ''}`}>
              <div className="item-image">
                <img src={member.image} alt={member.name} onError={(e) => e.target.src = '/assets/images/placeholder.jpg'} />
                {!member.isActive && <span className="inactive-badge">Inactive</span>}
              </div>
              <div className="item-content">
                <h3>{member.name}</h3>
                <p className="item-subtitle">{member.position}</p>
                <p className="item-description">{member.bio.substring(0, 100)}...</p>
              </div>
              <div className="item-actions">
                <button className="btn-icon" onClick={() => openEditModal(member)} title="Edit">
                  <FiEdit2 />
                </button>
                <button className="btn-icon btn-danger" onClick={() => handleDelete(member._id)} title="Delete">
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
              <h2>{editingMember ? 'Edit Team Member' : 'Add Team Member'}</h2>
              <button className="btn-close" onClick={() => setShowModal(false)}>
                <FiX />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Position *</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Bio *</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Photo {!editingMember && '*'}</label>
                <div className="image-upload">
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="image-preview" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required={!editingMember}
                  />
                </div>
              </div>
              
              <div className="form-section">
                <h3>Social Links</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>LinkedIn</label>
                    <input
                      type="url"
                      name="social_linkedin"
                      value={formData.socialLinks.linkedin}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>
                  <div className="form-group">
                    <label>Twitter</label>
                    <input
                      type="url"
                      name="social_twitter"
                      value={formData.socialLinks.twitter}
                      onChange={handleInputChange}
                      placeholder="https://twitter.com/..."
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Facebook</label>
                    <input
                      type="url"
                      name="social_facebook"
                      value={formData.socialLinks.facebook}
                      onChange={handleInputChange}
                      placeholder="https://facebook.com/..."
                    />
                  </div>
                  <div className="form-group">
                    <label>Instagram</label>
                    <input
                      type="url"
                      name="social_instagram"
                      value={formData.socialLinks.instagram}
                      onChange={handleInputChange}
                      placeholder="https://instagram.com/..."
                    />
                  </div>
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
                  {submitting ? 'Saving...' : (editingMember ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManager;
