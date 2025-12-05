import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaUpload, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import * as api from '../../services/api';
import './AdminForm.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AdminForm = ({ type }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isHeadPoster } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  // Form configurations for different types
  const formConfigs = {
    activities: {
      title: id ? 'Edit Activity' : 'Add New Activity',
      fields: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'type', label: 'Type', type: 'select', required: true, options: [
          { value: 'news', label: 'News' },
          { value: 'event', label: 'Event' },
          { value: 'achievement', label: 'Achievement' },
          { value: 'update', label: 'Update' },
          { value: 'promotion', label: 'Promotion' }
        ]},
        { name: 'priority', label: 'Priority', type: 'select', options: [
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' }
        ]},
        { name: 'image', label: 'Image', type: 'file' },
        { name: 'isPublished', label: 'Published', type: 'checkbox' }
      ],
      defaultValues: { type: 'news', priority: 'medium', isPublished: true }
    },
    bonuses: {
      title: id ? 'Edit Bonus/Benefit' : 'Add New Bonus/Benefit',
      fields: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'type', label: 'Type', type: 'select', required: true, options: [
          { value: 'bonus', label: 'Bonus' },
          { value: 'benefit', label: 'Benefit' },
          { value: 'discount', label: 'Discount' },
          { value: 'offer', label: 'Special Offer' }
        ]},
        { name: 'value', label: 'Value (e.g., 10%, ₦50,000)', type: 'text' },
        { name: 'targetAudience', label: 'Target Audience', type: 'select', options: [
          { value: 'clients', label: 'Clients' },
          { value: 'employees', label: 'Employees' },
          { value: 'all', label: 'All' }
        ]},
        { name: 'validFrom', label: 'Valid From', type: 'date' },
        { name: 'validUntil', label: 'Valid Until', type: 'date' },
        { name: 'terms', label: 'Terms & Conditions', type: 'textarea' },
        { name: 'isActive', label: 'Active', type: 'checkbox' }
      ],
      defaultValues: { type: 'benefit', targetAudience: 'clients', isActive: true }
    },
    team: {
      title: id ? 'Edit Team Member' : 'Add New Team Member',
      fields: [
        { name: 'name', label: 'Full Name', type: 'text', required: true },
        { name: 'position', label: 'Position/Title', type: 'text', required: true },
        { name: 'department', label: 'Department', type: 'select', options: [
          { value: 'leadership', label: 'Leadership' },
          { value: 'operations', label: 'Operations' },
          { value: 'hr', label: 'Human Resources' },
          { value: 'training', label: 'Training' },
          { value: 'field', label: 'Field Operations' }
        ]},
        { name: 'bio', label: 'Bio/Description', type: 'textarea' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'phone', label: 'Phone', type: 'text' },
        { name: 'image', label: 'Profile Image', type: 'file' },
        { name: 'social.linkedin', label: 'LinkedIn URL', type: 'url' },
        { name: 'social.twitter', label: 'Twitter URL', type: 'url' },
        { name: 'social.facebook', label: 'Facebook URL', type: 'url' },
        { name: 'social.instagram', label: 'Instagram URL', type: 'url' },
        { name: 'displayOrder', label: 'Display Order', type: 'number' },
        { name: 'isActive', label: 'Active', type: 'checkbox' }
      ],
      defaultValues: { department: 'field', isActive: true, displayOrder: 0 }
    },
    guards: {
      title: id ? 'Edit Guard' : 'Add New Guard',
      fields: [
        { name: 'name', label: 'Full Name', type: 'text', required: true },
        { name: 'guardId', label: 'Guard ID', type: 'text', required: true },
        { name: 'rank', label: 'Rank', type: 'select', options: [
          { value: 'officer', label: 'Officer' },
          { value: 'senior_officer', label: 'Senior Officer' },
          { value: 'supervisor', label: 'Supervisor' },
          { value: 'sergeant', label: 'Sergeant' },
          { value: 'chief', label: 'Chief' }
        ]},
        { name: 'status', label: 'Status', type: 'select', options: [
          { value: 'available', label: 'Available' },
          { value: 'deployed', label: 'Deployed' },
          { value: 'on_leave', label: 'On Leave' },
          { value: 'training', label: 'Training' },
          { value: 'inactive', label: 'Inactive' }
        ]},
        { name: 'experience', label: 'Experience (Years)', type: 'number' },
        { name: 'rating', label: 'Rating (0-5)', type: 'number', min: 0, max: 5 },
        { name: 'bio', label: 'Bio/Notes', type: 'textarea' },
        { name: 'image', label: 'Photo', type: 'file' },
        { name: 'isReadyForDeployment', label: 'Ready for Deployment', type: 'checkbox' }
      ],
      defaultValues: { rank: 'officer', status: 'available', experience: 0, rating: 0, isReadyForDeployment: true }
    },
    gallery: {
      title: id ? 'Edit Gallery Image' : 'Add New Gallery Image',
      fields: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'category', label: 'Category', type: 'select', options: [
          { value: 'personnel', label: 'Personnel' },
          { value: 'operations', label: 'Operations' },
          { value: 'events', label: 'Events' },
          { value: 'training', label: 'Training' },
          { value: 'sites', label: 'Sites' },
          { value: 'equipment', label: 'Equipment' },
          { value: 'general', label: 'General' }
        ]},
        { name: 'imageUrl', label: 'Image', type: 'file', required: !id },
        { name: 'displayOrder', label: 'Display Order', type: 'number' },
        { name: 'isPublished', label: 'Published', type: 'checkbox' }
      ],
      defaultValues: { category: 'general', isPublished: true, displayOrder: 0 }
    },
    sites: {
      title: id ? 'Edit Site' : 'Add New Site',
      fields: [
        { name: 'name', label: 'Site Name', type: 'text', required: true },
        { name: 'location', label: 'Location', type: 'text', required: true },
        { name: 'type', label: 'Type', type: 'select', required: true, options: [
          { value: 'Corporate', label: 'Corporate' },
          { value: 'Residential', label: 'Residential' },
          { value: 'Industrial', label: 'Industrial' },
          { value: 'Commercial', label: 'Commercial' },
          { value: 'Government', label: 'Government' },
          { value: 'Event', label: 'Event' }
        ]},
        { name: 'guards', label: 'Number of Guards', type: 'number', required: true },
        { name: 'hasSupervisor', label: 'Has Supervisor', type: 'checkbox' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'image', label: 'Site Image', type: 'file' },
        { name: 'displayOrder', label: 'Display Order', type: 'number' },
        { name: 'isActive', label: 'Active', type: 'checkbox' }
      ],
      defaultValues: { type: 'Corporate', guards: 0, hasSupervisor: true, isActive: true, displayOrder: 0 }
    }
  };

  const config = formConfigs[type];
  const [formData, setFormData] = useState(config?.defaultValues || {});

  useEffect(() => {
    if (!isHeadPoster) {
      navigate('/admin/login');
      return;
    }

    if (id) {
      fetchData();
    }
  }, [id, isHeadPoster, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let result;
      switch (type) {
        case 'activities':
          result = await api.getActivity(id);
          break;
        case 'bonuses':
          result = await api.getBonus(id);
          break;
        case 'team':
          result = await api.getTeamMember(id);
          break;
        case 'guards':
          result = await api.getGuard(id);
          break;
        case 'gallery':
          result = await api.getGalleryImage(id);
          break;
        case 'sites':
          result = await api.getSite(id);
          break;
        default:
          return;
      }

      if (result.success) {
        setFormData(result.data);
        if (result.data.image) setImagePreview(result.data.image);
        if (result.data.imageUrl) setImagePreview(result.data.imageUrl);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: inputType === 'checkbox' ? checked : value
      }));
    }
  };

  const handleFileChange = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload
    try {
      const result = await api.uploadFile(file);
      if (result.success) {
        const imageUrl = `${API_URL}${result.data.url}`;
        if (type === 'gallery') {
          setFormData(prev => ({ ...prev, imageUrl }));
        } else {
          setFormData(prev => ({ ...prev, image: imageUrl }));
        }
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Failed to upload image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      let result;
      const dataToSend = { ...formData };
      
      // Remove _id and other mongoose fields before sending
      delete dataToSend._id;
      delete dataToSend.__v;
      delete dataToSend.createdAt;
      delete dataToSend.updatedAt;
      delete dataToSend.postedBy;

      switch (type) {
        case 'activities':
          result = id 
            ? await api.updateActivity(id, dataToSend)
            : await api.createActivity(dataToSend);
          break;
        case 'bonuses':
          result = id 
            ? await api.updateBonus(id, dataToSend)
            : await api.createBonus(dataToSend);
          break;
        case 'team':
          result = id 
            ? await api.updateTeamMember(id, dataToSend)
            : await api.createTeamMember(dataToSend);
          break;
        case 'guards':
          result = id 
            ? await api.updateGuard(id, dataToSend)
            : await api.createGuard(dataToSend);
          break;
        case 'gallery':
          result = id 
            ? await api.updateGalleryImage(id, dataToSend)
            : await api.createGalleryImage(dataToSend);
          break;
        case 'sites':
          result = id 
            ? await api.updateSite(id, dataToSend)
            : await api.createSite(dataToSend);
          break;
        default:
          return;
      }

      if (result.success) {
        navigate('/admin/dashboard');
      } else {
        setError(result.message || 'Failed to save');
      }
    } catch (error) {
      console.error('Error saving:', error);
      setError('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj) || '';
  };

  if (!config) {
    return <div>Invalid form type</div>;
  }

  if (loading) {
    return <div className="admin-form loading">Loading...</div>;
  }

  return (
    <div className="admin-form">
      <div className="admin-form__header">
        <button className="back-btn" onClick={() => navigate('/admin/dashboard')}>
          <FaArrowLeft /> Back
        </button>
        <h1>{config.title}</h1>
      </div>

      <form onSubmit={handleSubmit} className="admin-form__body">
        {error && <div className="error-message">{error}</div>}

        <div className="form-grid">
          {config.fields.map(field => (
            <div key={field.name} className={`form-group ${field.type === 'textarea' ? 'full-width' : ''}`}>
              <label htmlFor={field.name}>
                {field.label}
                {field.required && <span className="required">*</span>}
              </label>

              {field.type === 'select' ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={getNestedValue(formData, field.name)}
                  onChange={handleChange}
                  required={field.required}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  value={getNestedValue(formData, field.name)}
                  onChange={handleChange}
                  required={field.required}
                  rows={4}
                />
              ) : field.type === 'checkbox' ? (
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name={field.name}
                    checked={getNestedValue(formData, field.name) || false}
                    onChange={handleChange}
                  />
                  <span>{field.label}</span>
                </label>
              ) : field.type === 'file' ? (
                <div className="file-upload">
                  <input
                    type="file"
                    id={field.name}
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, field.name)}
                  />
                  <label htmlFor={field.name} className="file-label">
                    <FaUpload /> Choose Image
                  </label>
                  {imagePreview && (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Preview" />
                      <button 
                        type="button" 
                        className="remove-image"
                        onClick={() => {
                          setImagePreview('');
                          setFormData(prev => ({ ...prev, image: '', imageUrl: '' }));
                        }}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={getNestedValue(formData, field.name)}
                  onChange={handleChange}
                  required={field.required}
                  min={field.min}
                  max={field.max}
                />
              )}
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => navigate('/admin/dashboard')}>
            Cancel
          </button>
          <button type="submit" className="save-btn" disabled={saving}>
            <FaSave /> {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminForm;
