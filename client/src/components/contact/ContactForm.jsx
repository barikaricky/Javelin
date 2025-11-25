import React, { useState } from 'react';
import axios from 'axios';
import { FaPaperPlane } from 'react-icons/fa';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const response = await axios.post('/api/contact', formData);
      
      if (response.data.success) {
        setStatus({ loading: false, success: true, error: null });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        
        setTimeout(() => {
          setStatus({ loading: false, success: false, error: null });
        }, 5000);
      }
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: error.response?.data?.message || 'Failed to send message. Please try again.'
      });
    }
  };

  return (
    <div className="contact-form-wrapper">
      <div className="contact-form-header">
        <h2>Send Us a Message</h2>
        <p>Fill out the form below and we'll get back to you within 24 hours</p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-input"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+234 801 234 5678"
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject" className="form-label">Subject *</label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="form-input"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="Security Service Inquiry"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label">Message *</label>
          <textarea
            id="message"
            name="message"
            className="form-textarea"
            value={formData.message}
            onChange={handleChange}
            required
            rows="6"
            placeholder="Tell us about your security needs..."
          ></textarea>
        </div>

        {status.success && (
          <div className="form-message form-message--success">
            ✓ Message sent successfully! We'll get back to you soon.
          </div>
        )}

        {status.error && (
          <div className="form-message form-message--error">
            ✗ {status.error}
          </div>
        )}

        <button 
          type="submit" 
          className="btn btn-primary btn-lg btn-block"
          disabled={status.loading}
        >
          {status.loading ? (
            <>Sending...</>
          ) : (
            <>
              <FaPaperPlane /> Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
