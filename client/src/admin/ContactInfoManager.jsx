import React, { useState, useEffect } from 'react';
import { contactAPI } from '../services/api';
import { FiSave } from 'react-icons/fi';
import './Manager.css';
import './ContactInfoManager.css';

const ContactInfoManager = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      postalCode: ''
    },
    phone: {
      primary: '',
      secondary: '',
      whatsapp: ''
    },
    email: {
      general: '',
      support: '',
      careers: ''
    },
    businessHours: {
      weekdays: '',
      saturday: '',
      sunday: ''
    },
    socialLinks: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: '',
      youtube: ''
    },
    googleMapsEmbed: ''
  });

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const response = await contactAPI.getInfo();
      if (response.data.data) {
        setFormData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching contact info:', error);
      setError('Failed to load contact information');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested fields (e.g., address.street)
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
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await contactAPI.updateInfo(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving contact info:', error);
      setError(error.response?.data?.message || 'Failed to save contact information');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="manager-loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="manager contact-info-manager">
      <div className="manager-header">
        <div>
          <h1>Contact Information</h1>
          <p>Manage your company's contact details displayed on the website</p>
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}
      {success && <div className="success-banner">Contact information saved successfully!</div>}

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-section-card">
          <h3>Company Details</h3>
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-section-card">
          <h3>Address</h3>
          <div className="form-group">
            <label>Street Address</label>
            <input
              type="text"
              name="address.street"
              value={formData.address?.street || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="address.city"
                value={formData.address?.city || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>State/Province</label>
              <input
                type="text"
                name="address.state"
                value={formData.address?.state || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="address.country"
                value={formData.address?.country || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Postal Code</label>
              <input
                type="text"
                name="address.postalCode"
                value={formData.address?.postalCode || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="form-section-card">
          <h3>Phone Numbers</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Primary Phone</label>
              <input
                type="tel"
                name="phone.primary"
                value={formData.phone?.primary || ''}
                onChange={handleInputChange}
                placeholder="+234 800 000 0000"
              />
            </div>
            <div className="form-group">
              <label>Secondary Phone</label>
              <input
                type="tel"
                name="phone.secondary"
                value={formData.phone?.secondary || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label>WhatsApp</label>
            <input
              type="tel"
              name="phone.whatsapp"
              value={formData.phone?.whatsapp || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-section-card">
          <h3>Email Addresses</h3>
          <div className="form-row">
            <div className="form-group">
              <label>General Email</label>
              <input
                type="email"
                name="email.general"
                value={formData.email?.general || ''}
                onChange={handleInputChange}
                placeholder="info@company.com"
              />
            </div>
            <div className="form-group">
              <label>Support Email</label>
              <input
                type="email"
                name="email.support"
                value={formData.email?.support || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Careers Email</label>
            <input
              type="email"
              name="email.careers"
              value={formData.email?.careers || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-section-card">
          <h3>Business Hours</h3>
          <div className="form-group">
            <label>Weekdays</label>
            <input
              type="text"
              name="businessHours.weekdays"
              value={formData.businessHours?.weekdays || ''}
              onChange={handleInputChange}
              placeholder="Mon - Fri: 8:00 AM - 6:00 PM"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Saturday</label>
              <input
                type="text"
                name="businessHours.saturday"
                value={formData.businessHours?.saturday || ''}
                onChange={handleInputChange}
                placeholder="Sat: 9:00 AM - 2:00 PM"
              />
            </div>
            <div className="form-group">
              <label>Sunday</label>
              <input
                type="text"
                name="businessHours.sunday"
                value={formData.businessHours?.sunday || ''}
                onChange={handleInputChange}
                placeholder="Sun: Closed"
              />
            </div>
          </div>
        </div>

        <div className="form-section-card">
          <h3>Social Media Links</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Facebook</label>
              <input
                type="url"
                name="socialLinks.facebook"
                value={formData.socialLinks?.facebook || ''}
                onChange={handleInputChange}
                placeholder="https://facebook.com/..."
              />
            </div>
            <div className="form-group">
              <label>Twitter</label>
              <input
                type="url"
                name="socialLinks.twitter"
                value={formData.socialLinks?.twitter || ''}
                onChange={handleInputChange}
                placeholder="https://twitter.com/..."
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>LinkedIn</label>
              <input
                type="url"
                name="socialLinks.linkedin"
                value={formData.socialLinks?.linkedin || ''}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/company/..."
              />
            </div>
            <div className="form-group">
              <label>Instagram</label>
              <input
                type="url"
                name="socialLinks.instagram"
                value={formData.socialLinks?.instagram || ''}
                onChange={handleInputChange}
                placeholder="https://instagram.com/..."
              />
            </div>
          </div>
          <div className="form-group">
            <label>YouTube</label>
            <input
              type="url"
              name="socialLinks.youtube"
              value={formData.socialLinks?.youtube || ''}
              onChange={handleInputChange}
              placeholder="https://youtube.com/..."
            />
          </div>
        </div>

        <div className="form-section-card">
          <h3>Google Maps</h3>
          <div className="form-group">
            <label>Google Maps Embed Code</label>
            <textarea
              name="googleMapsEmbed"
              value={formData.googleMapsEmbed || ''}
              onChange={handleInputChange}
              rows={4}
              placeholder="Paste the iframe embed code from Google Maps..."
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary btn-large" disabled={saving}>
            <FiSave /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactInfoManager;
