import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  FaCalendarAlt, FaClock, FaUser, FaEnvelope, FaPhone, 
  FaBuilding, FaClipboardList, FaCheckCircle, FaArrowLeft,
  FaVideo, FaPhoneAlt, FaMapMarkerAlt
} from 'react-icons/fa';
import { createBooking } from '../services/api';
import './BookMeeting.css';

const BookMeeting = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const preSelectedService = searchParams.get('service') || '';

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    companyName: '',
    serviceType: preSelectedService,
    serviceDescription: '',
    preferredDate: '',
    preferredTime: '',
    meetingType: 'in-person',
    location: '',
    additionalNotes: ''
  });

  const services = [
    'Corporate Security',
    'Residential Security',
    'Event Security',
    'VIP Protection',
    'Industrial Security',
    'Retail Security',
    'Consultation',
    'Other'
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateStep = (currentStep) => {
    switch (currentStep) {
      case 1:
        if (!formData.clientName || !formData.clientEmail || !formData.clientPhone) {
          setError('Please fill in all required fields');
          return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientEmail)) {
          setError('Please enter a valid email address');
          return false;
        }
        return true;
      case 2:
        if (!formData.serviceType) {
          setError('Please select a service');
          return false;
        }
        return true;
      case 3:
        if (!formData.preferredDate || !formData.preferredTime) {
          setError('Please select date and time');
          return false;
        }
        const selectedDate = new Date(formData.preferredDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
          setError('Please select a future date');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setLoading(true);
    setError('');

    try {
      const result = await createBooking(formData);
      
      if (result.success) {
        setBookingResult(result.data);
        setSuccess(true);
      } else {
        setError(result.message || 'Failed to create booking. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error('Booking error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (success && bookingResult) {
    return (
      <div className="book-meeting-page">
        <div className="booking-success">
          <div className="success-icon">
            <FaCheckCircle />
          </div>
          <h1>Booking Confirmed!</h1>
          <p className="success-message">
            Your meeting has been successfully scheduled. We will contact you shortly to confirm.
          </p>
          
          <div className="booking-details-card">
            <div className="booking-id">
              <span>Booking ID</span>
              <strong>{bookingResult.bookingId}</strong>
            </div>
            
            <div className="booking-info-grid">
              <div className="info-item">
                <FaUser />
                <div>
                  <span>Name</span>
                  <strong>{bookingResult.clientName}</strong>
                </div>
              </div>
              <div className="info-item">
                <FaEnvelope />
                <div>
                  <span>Email</span>
                  <strong>{bookingResult.clientEmail}</strong>
                </div>
              </div>
              <div className="info-item">
                <FaClipboardList />
                <div>
                  <span>Service</span>
                  <strong>{bookingResult.serviceType}</strong>
                </div>
              </div>
              <div className="info-item">
                <FaCalendarAlt />
                <div>
                  <span>Date</span>
                  <strong>{new Date(bookingResult.preferredDate).toLocaleDateString('en-NG', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</strong>
                </div>
              </div>
              <div className="info-item">
                <FaClock />
                <div>
                  <span>Time</span>
                  <strong>{bookingResult.preferredTime}</strong>
                </div>
              </div>
              <div className="info-item status">
                <div className={`status-badge ${bookingResult.status}`}>
                  {bookingResult.status.toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          <p className="note">
            📧 A confirmation email will be sent to <strong>{bookingResult.clientEmail}</strong>
          </p>
          <p className="note">
            📞 Our team will call you at least 24 hours before the meeting to confirm.
          </p>

          <div className="success-actions">
            <button className="btn btn-primary" onClick={() => navigate('/')}>
              <FaArrowLeft /> Back to Home
            </button>
            <button className="btn btn-outline" onClick={() => navigate('/services')}>
              View Our Services
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="book-meeting-page">
      <section className="book-meeting-hero">
        <div className="container">
          <h1>Book a Meeting</h1>
          <p>Schedule a consultation with our security experts</p>
        </div>
      </section>

      <section className="booking-section">
        <div className="container">
          <div className="booking-container">
            {/* Progress Steps */}
            <div className="booking-progress">
              <div className={`progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                <div className="step-number">1</div>
                <span>Your Info</span>
              </div>
              <div className="progress-line"></div>
              <div className={`progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                <div className="step-number">2</div>
                <span>Service</span>
              </div>
              <div className="progress-line"></div>
              <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
                <div className="step-number">3</div>
                <span>Schedule</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="booking-form">
              {error && <div className="error-message">{error}</div>}

              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="form-step">
                  <h2>Your Information</h2>
                  <p>Please provide your contact details</p>

                  <div className="form-group">
                    <label htmlFor="clientName">
                      <FaUser /> Full Name *
                    </label>
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

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="clientEmail">
                        <FaEnvelope /> Email Address *
                      </label>
                      <input
                        type="email"
                        id="clientEmail"
                        name="clientEmail"
                        value={formData.clientEmail}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="clientPhone">
                        <FaPhone /> Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="clientPhone"
                        name="clientPhone"
                        value={formData.clientPhone}
                        onChange={handleChange}
                        placeholder="+234 XXX XXX XXXX"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="companyName">
                      <FaBuilding /> Company Name (Optional)
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Your company name"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Service Selection */}
              {step === 2 && (
                <div className="form-step">
                  <h2>Select Service</h2>
                  <p>Choose the service you're interested in</p>

                  <div className="service-grid">
                    {services.map((service) => (
                      <div
                        key={service}
                        className={`service-card ${formData.serviceType === service ? 'selected' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, serviceType: service }))}
                      >
                        <FaClipboardList />
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>

                  <div className="form-group">
                    <label htmlFor="serviceDescription">
                      Tell us more about your security needs (Optional)
                    </label>
                    <textarea
                      id="serviceDescription"
                      name="serviceDescription"
                      value={formData.serviceDescription}
                      onChange={handleChange}
                      placeholder="Describe your specific requirements..."
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Date & Time */}
              {step === 3 && (
                <div className="form-step">
                  <h2>Schedule Meeting</h2>
                  <p>Select your preferred date and time</p>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="preferredDate">
                        <FaCalendarAlt /> Preferred Date *
                      </label>
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
                      <label htmlFor="preferredTime">
                        <FaClock /> Preferred Time *
                      </label>
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a time</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Meeting Type</label>
                    <div className="meeting-type-options">
                      <div
                        className={`meeting-type-card ${formData.meetingType === 'in-person' ? 'selected' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, meetingType: 'in-person' }))}
                      >
                        <FaMapMarkerAlt />
                        <span>In-Person</span>
                      </div>
                      <div
                        className={`meeting-type-card ${formData.meetingType === 'phone' ? 'selected' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, meetingType: 'phone' }))}
                      >
                        <FaPhoneAlt />
                        <span>Phone Call</span>
                      </div>
                      <div
                        className={`meeting-type-card ${formData.meetingType === 'video' ? 'selected' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, meetingType: 'video' }))}
                      >
                        <FaVideo />
                        <span>Video Call</span>
                      </div>
                    </div>
                  </div>

                  {formData.meetingType === 'in-person' && (
                    <div className="form-group">
                      <label htmlFor="location">
                        <FaMapMarkerAlt /> Preferred Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Our office or your location"
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor="additionalNotes">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      id="additionalNotes"
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleChange}
                      placeholder="Any additional information..."
                      rows={3}
                    />
                  </div>

                  {/* Summary */}
                  <div className="booking-summary">
                    <h3>Booking Summary</h3>
                    <div className="summary-grid">
                      <div className="summary-item">
                        <span>Name:</span>
                        <strong>{formData.clientName}</strong>
                      </div>
                      <div className="summary-item">
                        <span>Email:</span>
                        <strong>{formData.clientEmail}</strong>
                      </div>
                      <div className="summary-item">
                        <span>Phone:</span>
                        <strong>{formData.clientPhone}</strong>
                      </div>
                      <div className="summary-item">
                        <span>Service:</span>
                        <strong>{formData.serviceType}</strong>
                      </div>
                      <div className="summary-item">
                        <span>Date:</span>
                        <strong>{formData.preferredDate ? new Date(formData.preferredDate).toLocaleDateString() : '-'}</strong>
                      </div>
                      <div className="summary-item">
                        <span>Time:</span>
                        <strong>{formData.preferredTime || '-'}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="form-navigation">
                {step > 1 && (
                  <button type="button" className="btn btn-outline" onClick={prevStep}>
                    <FaArrowLeft /> Back
                  </button>
                )}
                
                {step < 3 ? (
                  <button type="button" className="btn btn-primary" onClick={nextStep}>
                    Continue
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary btn-submit" disabled={loading}>
                    {loading ? 'Booking...' : 'Confirm Booking'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookMeeting;
