import React, { useState } from 'react';
import axios from 'axios';
import { FaUserShield, FaUpload, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import './Recruitment.css';

const Recruitment = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    state: '',
    age: '',
    position: '',
    experience: '',
    address: '',
    education: '',
    previousEmployer: '',
    references: ''
  });

  const [files, setFiles] = useState({
    passport: null,
    cv: null,
    idCard: null
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const positions = [
    'Security Guard',
    'Senior Security Guard',
    'Security Supervisor',
    'Chief Security Officer',
    'Mobile Patrol Officer',
    'CCTV Operator',
    'Control Room Operator'
  ];

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
    'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
    'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles && selectedFiles[0]) {
      setFiles({
        ...files,
        [name]: selectedFiles[0]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const submitData = new FormData();
      
      // Append form data
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });

      // Append files
      if (files.passport) submitData.append('passport', files.passport);
      if (files.cv) submitData.append('cv', files.cv);
      if (files.idCard) submitData.append('idCard', files.idCard);

      const apiUrl = process.env.REACT_APP_API_URL || 
        (process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api');
      const response = await axios.post(`${apiUrl}/applications`, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setStatus({ loading: false, success: true, error: null });
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          state: '',
          age: '',
          position: '',
          experience: '',
          address: '',
          education: '',
          previousEmployer: '',
          references: ''
        });
        setFiles({ passport: null, cv: null, idCard: null });

        setTimeout(() => {
          setStatus({ loading: false, success: false, error: null });
        }, 5000);
      }
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: error.response?.data?.message || 'Failed to submit application. Please try again.'
      });
    }
  };

  return (
    <div className="recruitment-page">
      {/* Hero Section */}
      <section className="recruitment-hero">
        <div className="recruitment-hero__overlay"></div>
        <div className="container">
          <div className="recruitment-hero__content">
            <FaUserShield className="recruitment-hero__icon" />
            <h1>Join Our Elite Security Team</h1>
            <p>Become part of Nigeria's leading security services provider</p>
            <div className="recruitment-hero__badges">
              <span className="badge badge-yellow">Competitive Salary</span>
              <span className="badge badge-green">Professional Training</span>
              <span className="badge badge-blue">Career Growth</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="recruitment-benefits">
        <div className="container">
          <h2 className="text-center mb-4">Why Join Javelin Associates?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-card__icon">💰</div>
              <h3>Competitive Pay</h3>
              <p>Attractive salary packages with regular increments and bonuses</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-card__icon">🎓</div>
              <h3>Professional Training</h3>
              <p>Comprehensive training programs and skill development workshops</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-card__icon">🏥</div>
              <h3>Health Insurance</h3>
              <p>Medical coverage for you and your immediate family</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-card__icon">📈</div>
              <h3>Career Advancement</h3>
              <p>Clear promotion path from Guard to Supervisor to Manager</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-card__icon">👔</div>
              <h3>Uniform Allowance</h3>
              <p>Provided uniforms and equipment at no cost</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-card__icon">🎯</div>
              <h3>Job Security</h3>
              <p>Stable employment with one of Nigeria's top security firms</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="recruitment-form-section">
        <div className="container">
          <div className="recruitment-form-wrapper">
            <div className="recruitment-form-header">
              <h2>Application Form</h2>
              <p>Fill out the form below to apply for a position with Javelin Associates</p>
              <div className="recruitment-form-note">
                <FaExclamationTriangle />
                <span>All fields marked with * are required</span>
              </div>
            </div>

            <form className="recruitment-form" onSubmit={handleSubmit}>
              {/* Personal Information */}
              <div className="form-section">
                <h3 className="form-section-title">Personal Information</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fullName" className="form-label">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      className="form-input"
                      value={formData.fullName}
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
                    <label htmlFor="phone" className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-input"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+234 801 234 5678"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="age" className="form-label">Age *</label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      className="form-input"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      min="18"
                      max="65"
                      placeholder="25"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="state" className="form-label">State of Residence *</label>
                    <select
                      id="state"
                      name="state"
                      className="form-select"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select State</option>
                      {nigerianStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="position" className="form-label">Position Applied For *</label>
                    <select
                      id="position"
                      name="position"
                      className="form-select"
                      value={formData.position}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Position</option>
                      {positions.map(position => (
                        <option key={position} value={position}>{position}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address" className="form-label">Residential Address *</label>
                  <textarea
                    id="address"
                    name="address"
                    className="form-textarea"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows="3"
                    placeholder="Enter your full address"
                  ></textarea>
                </div>
              </div>

              {/* Professional Background */}
              <div className="form-section">
                <h3 className="form-section-title">Professional Background</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="education" className="form-label">Highest Education *</label>
                    <select
                      id="education"
                      name="education"
                      className="form-select"
                      value={formData.education}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Education Level</option>
                      <option value="Primary">Primary</option>
                      <option value="Secondary/SSCE">Secondary/SSCE</option>
                      <option value="OND">OND</option>
                      <option value="HND">HND</option>
                      <option value="Bachelor's Degree">Bachelor's Degree</option>
                      <option value="Master's Degree">Master's Degree</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="experience" className="form-label">Years of Security Experience *</label>
                    <select
                      id="experience"
                      name="experience"
                      className="form-select"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Experience</option>
                      <option value="No Experience">No Experience</option>
                      <option value="Less than 1 year">Less than 1 year</option>
                      <option value="1-2 years">1-2 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5+ years">5+ years</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="previousEmployer" className="form-label">Previous Employer (if any)</label>
                  <input
                    type="text"
                    id="previousEmployer"
                    name="previousEmployer"
                    className="form-input"
                    value={formData.previousEmployer}
                    onChange={handleChange}
                    placeholder="Previous company name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="references" className="form-label">References (Optional)</label>
                  <textarea
                    id="references"
                    name="references"
                    className="form-textarea"
                    value={formData.references}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Name, relationship, and phone number of 2 references"
                  ></textarea>
                </div>
              </div>

              {/* File Uploads */}
              <div className="form-section">
                <h3 className="form-section-title">Document Uploads</h3>

                <div className="upload-grid">
                  <div className="upload-card">
                    <label htmlFor="passport" className="upload-label">
                      <FaUpload className="upload-icon" />
                      <span className="upload-title">Passport Photograph *</span>
                      <span className="upload-hint">JPG, PNG (Max 2MB)</span>
                      <input
                        type="file"
                        id="passport"
                        name="passport"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        hidden
                      />
                    </label>
                    {files.passport && (
                      <div className="upload-success">
                        <FaCheckCircle /> {files.passport.name}
                      </div>
                    )}
                  </div>

                  <div className="upload-card">
                    <label htmlFor="cv" className="upload-label">
                      <FaUpload className="upload-icon" />
                      <span className="upload-title">CV/Resume (Optional)</span>
                      <span className="upload-hint">PDF, DOC (Max 5MB)</span>
                      <input
                        type="file"
                        id="cv"
                        name="cv"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        hidden
                      />
                    </label>
                    {files.cv && (
                      <div className="upload-success">
                        <FaCheckCircle /> {files.cv.name}
                      </div>
                    )}
                  </div>

                  <div className="upload-card">
                    <label htmlFor="idCard" className="upload-label">
                      <FaUpload className="upload-icon" />
                      <span className="upload-title">Valid ID Card (Optional)</span>
                      <span className="upload-hint">National ID, Driver's License</span>
                      <input
                        type="file"
                        id="idCard"
                        name="idCard"
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        hidden
                      />
                    </label>
                    {files.idCard && (
                      <div className="upload-success">
                        <FaCheckCircle /> {files.idCard.name}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Messages */}
              {status.success && (
                <div className="form-message form-message--success">
                  <FaCheckCircle /> Application submitted successfully! We'll contact you within 48 hours.
                </div>
              )}

              {status.error && (
                <div className="form-message form-message--error">
                  <FaExclamationTriangle /> {status.error}
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn btn-primary btn-lg btn-block"
                disabled={status.loading}
              >
                {status.loading ? 'Submitting Application...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Recruitment;
