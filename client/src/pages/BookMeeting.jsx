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

      if (response.ok && data.success) {
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

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (success) {
    return (
      <div className="book-meeting-page">
        <div className="booking-container">
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Appointment Request Submitted!</h2>
            <p>Thank you for choosing Javelin Security. We have received your meeting request and will contact you within 24 hours to confirm your appointment.</p>
            <div className="booking-id">
              {bookingId}
            </div>
            <p>Please save this ID for your records.</p>
            <Link to="/" className="btn btn-primary">Return to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2>Tell Us About Yourself</h2>
            <p>Please provide your contact information.</p>
            <div className="form-group">
              <label htmlFor="clientName">Full Name <span className="required">*</span></label>
              <input type="text" id="clientName" name="clientName" value={formData.clientName} onChange={handleChange} placeholder="Enter your full name" required />
            </div>
            <div className="form-group">
              <label htmlFor="companyName">Company / Organization <span className="required">*</span></label>
              <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Enter your company name" required />
            </div>
            <div className="datetime-grid">
              <div className="form-group">
                <label htmlFor="email">Email Address <span className="required">*</span></label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number <span className="required">*</span></label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+234 XXX XXX XXXX" required />
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2>How Would You Like to Meet?</h2>
            <p>Select your preferred meeting format.</p>
            <div className="meeting-types">
              {meetingTypes.map(type => (
                <div
                  key={type.value}
                  className={`meeting-type-card ${formData.meetingType === type.value ? 'selected' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, meetingType: type.value }))}
                >
                  <div className="meeting-type-icon">{type.icon}</div>
                  <h3>{type.label}</h3>
                  <p>{type.description}</p>
                </div>
              ))}
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2>Choose Your Schedule</h2>
            <p>Select your preferred date and time. All times are in WAT.</p>
            <div className="datetime-grid">
              <div className="form-group">
                <label htmlFor="preferredDate">Preferred Date <span className="required">*</span></label>
                <input type="date" id="preferredDate" name="preferredDate" value={formData.preferredDate} onChange={handleChange} min={getMinDate()} required />
              </div>
              <div className="form-group">
                <label htmlFor="preferredTime">Preferred Time <span className="required">*</span></label>
                <select id="preferredTime" name="preferredTime" value={formData.preferredTime} onChange={handleChange} required>
                  <option value="">Select time</option>
                  {timeSlots.map(time => <option key={time} value={time}>{time}</option>)}
                </select>
              </div>
            </div>
            <div className="datetime-grid">
              <div className="form-group">
                <label htmlFor="alternateDate">Alternate Date (Optional)</label>
                <input type="date" id="alternateDate" name="alternateDate" value={formData.alternateDate} onChange={handleChange} min={getMinDate()} />
              </div>
              <div className="form-group">
                <label htmlFor="alternateTime">Alternate Time (Optional)</label>
                <select id="alternateTime" name="alternateTime" value={formData.alternateTime} onChange={handleChange}>
                  <option value="">Select time</option>
                  {timeSlots.map(time => <option key={time} value={time}>{time}</option>)}
                </select>
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h2>Final Details</h2>
            <p>Help us prepare for your consultation.</p>
            <div className="form-group">
              <label htmlFor="serviceInterest">Service You're Interested In</label>
              <select id="serviceInterest" name="serviceInterest" value={formData.serviceInterest} onChange={handleChange}>
                <option value="">Select a service</option>
                {services.map(service => <option key={service.value} value={service.value}>{service.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message">Additional Message (Optional)</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Tell us about your security needs, specific requirements, or any questions you have..."></textarea>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.clientName && formData.companyName && formData.email && formData.phone;
      case 2:
        return formData.meetingType;
      case 3:
        return formData.preferredDate && formData.preferredTime;
      default:
        return true;
    }
  };

  return (
    <div className="book-meeting-page">
      <div className="booking-container">
        <div className="booking-header">
          <h1>Book a Consultation</h1>
          <p>Schedule a meeting with our security experts to discuss your needs.</p>
        </div>

        <div className="booking-card">
          <div className="progress-steps">
            {['Your Info', 'Meeting Type', 'Schedule', 'Details'].map((label, index) => (
              <div key={label} className={`step ${step > index + 1 ? 'completed' : ''} ${step === index + 1 ? 'active' : ''}`}>
                <div className="step-circle">{step > index + 1 ? '✓' : index + 1}</div>
                <div className="step-label">{label}</div>
              </div>
            ))}
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            {renderStepContent()}

            <div className="button-group">
              {step > 1 && (
                <button type="button" className="btn btn-secondary" onClick={prevStep}>
                  Back
                </button>
              )}
              {step < 4 ? (
                <button type="button" className="btn btn-primary" onClick={nextStep} disabled={!isStepValid()}>
                  Next
                </button>
              ) : (
                <button type="submit" className="btn btn-primary" disabled={loading || !isStepValid()}>
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookMeeting;
