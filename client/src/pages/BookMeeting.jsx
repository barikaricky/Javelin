import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BookMeeting.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const BookMeeting = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    clientName: '',
    companyName: '',
    email: '',
    phone: '',
    meetingType: '',
    preferredDate: '',
    preferredTime: '',
    alternateDate: '',
    alternateTime: '',
    serviceInterest: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        // Generate unique booking ID
        const uniqueId = `JVL-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
        setBookingId(uniqueId);
        setSuccess(true);
      } else {
        setError(data.message || 'Failed to submit appointment request');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const meetingTypes = [
    { value: 'in-person', label: 'In-Person Meeting', icon: '🏢', description: 'Meet us at our office or your location' },
    { value: 'phone-call', label: 'Phone Call', icon: '📞', description: 'Speak with our security consultant' },
    { value: 'video-call', label: 'Video Call', icon: '💻', description: 'Virtual meeting via Zoom or Teams' }
  ];

  const services = [
    { value: 'manned-guarding', label: 'Manned Guarding' },
    { value: 'mobile-patrol', label: 'Mobile Patrol' },
    { value: 'event-security', label: 'Event Security' },
    { value: 'corporate-security', label: 'Corporate Security' },
    { value: 'residential-security', label: 'Residential Security' },
    { value: 'vip-protection', label: 'VIP Protection' },
    { value: 'other', label: 'Other / Multiple Services' }
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
  ];

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (success) {
    return (
      <div className="book-meeting-page">
        <div className="success-container">
          <div className="success-icon">✓</div>
          <h2>Appointment Request Submitted!</h2>
          <div className="booking-id-display">
            <p className="booking-id-label">Your Booking ID:</p>
            <p className="booking-id-code">{bookingId}</p>
            <p className="booking-id-hint">Please save this ID for your records</p>
          </div>
          <p>Thank you for choosing Javelin Security. We have received your meeting request and will contact you within 24 hours to confirm your appointment.</p>
          <div className="success-details">
            <p><strong>Name:</strong> {formData.clientName}</p>
            <p><strong>Company:</strong> {formData.companyName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Meeting Type:</strong> {meetingTypes.find(t => t.value === formData.meetingType)?.label}</p>
            <p><strong>Preferred Date:</strong> {new Date(formData.preferredDate).toLocaleDateString()}</p>
            <p><strong>Preferred Time:</strong> {formData.preferredTime}</p>
          </div>
          <Link to="/" className="btn-home">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="book-meeting-page">
      <div className="book-meeting-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Book a Consultation</h1>
          <p>Schedule a meeting with our security experts to discuss your needs</p>
        </div>
      </div>

      <div className="booking-container">
        <div className="progress-bar">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Your Info</span>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Meeting Type</span>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">Schedule</span>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 4 ? 'active' : ''}`}>
            <span className="step-number">4</span>
            <span className="step-label">Details</span>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="form-step">
              <h2>Tell Us About Yourself</h2>
              <p className="step-description">Please provide your contact information</p>
              
              <div className="form-group">
                <label htmlFor="clientName">Full Name *</label>
                <input
                  type="text"
                  id="clientName"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="companyName">Company / Organization / Compound Name *</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter your company or organization name"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+234 XXX XXX XXXX"
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-next" onClick={nextStep} 
                  disabled={!formData.clientName || !formData.companyName || !formData.email || !formData.phone}>
                  Next Step →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Meeting Type */}
          {step === 2 && (
            <div className="form-step">
              <h2>How Would You Like to Meet?</h2>
              <p className="step-description">Select your preferred meeting format</p>
              
              <div className="meeting-types">
                {meetingTypes.map(type => (
                  <div
                    key={type.value}
                    className={`meeting-type-card ${formData.meetingType === type.value ? 'selected' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, meetingType: type.value }))}
                  >
                    <span className="type-icon">{type.icon}</span>
                    <h3>{type.label}</h3>
                    <p>{type.description}</p>
                  </div>
                ))}
              </div>

              <div className="form-actions">
                <button type="button" className="btn-prev" onClick={prevStep}>
                  ← Previous
                </button>
                <button type="button" className="btn-next" onClick={nextStep}
                  disabled={!formData.meetingType}>
                  Next Step →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Schedule */}
          {step === 3 && (
            <div className="form-step">
              <h2>Choose Your Schedule</h2>
              <p className="step-description">Select your preferred date and time</p>
              
              <div className="schedule-section">
                <h3>Preferred Schedule</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="preferredDate">Preferred Date *</label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      min={getMinDate()}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="preferredTime">Preferred Time *</label>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select time</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="schedule-section alternate">
                <h3>Alternate Schedule (Optional)</h3>
                <p className="hint">Provide a backup option in case your preferred time is unavailable</p>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="alternateDate">Alternate Date</label>
                    <input
                      type="date"
                      id="alternateDate"
                      name="alternateDate"
                      value={formData.alternateDate}
                      onChange={handleChange}
                      min={getMinDate()}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="alternateTime">Alternate Time</label>
                    <select
                      id="alternateTime"
                      name="alternateTime"
                      value={formData.alternateTime}
                      onChange={handleChange}
                    >
                      <option value="">Select time</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-prev" onClick={prevStep}>
                  ← Previous
                </button>
                <button type="button" className="btn-next" onClick={nextStep}
                  disabled={!formData.preferredDate || !formData.preferredTime}>
                  Next Step →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Service Interest & Message */}
          {step === 4 && (
            <div className="form-step">
              <h2>Tell Us More</h2>
              <p className="step-description">Help us prepare for your consultation</p>
              
              <div className="form-group">
                <label htmlFor="serviceInterest">Service You're Interested In</label>
                <select
                  id="serviceInterest"
                  name="serviceInterest"
                  value={formData.serviceInterest}
                  onChange={handleChange}
                >
                  <option value="">Select a service</option>
                  {services.map(service => (
                    <option key={service.value} value={service.value}>{service.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Additional Message (Optional)</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell us about your security needs, specific requirements, or any questions you have..."
                ></textarea>
              </div>

              <div className="booking-summary">
                <h3>Booking Summary</h3>
                <div className="summary-grid">
                  <div className="summary-item">
                    <span className="label">Name:</span>
                    <span className="value">{formData.clientName}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Company:</span>
                    <span className="value">{formData.companyName}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Meeting Type:</span>
                    <span className="value">{meetingTypes.find(t => t.value === formData.meetingType)?.label}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Date & Time:</span>
                    <span className="value">
                      {formData.preferredDate && new Date(formData.preferredDate).toLocaleDateString()} at {formData.preferredTime}
                    </span>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-prev" onClick={prevStep}>
                  ← Previous
                </button>
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Appointment Request'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default BookMeeting;
