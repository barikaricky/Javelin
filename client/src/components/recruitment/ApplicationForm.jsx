import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { 
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, 
  FaUpload, FaCheckCircle, FaExclamationTriangle, FaSpinner,
  FaUserTie, FaFileAlt, FaCamera, FaTimes, FaChevronDown,
  FaChevronUp, FaShieldAlt, FaBriefcase, FaGraduationCap, FaUsers
} from 'react-icons/fa';
import './ApplicationForm.css';

const ApplicationForm = () => {
  // Form steps
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Personal Details State
  const [personalDetails, setPersonalDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    alternatePhone: '',
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    nationality: 'Nigerian',
    stateOfOrigin: '',
    lga: '',
    address: '',
    position: '',
    experience: '',
    education: '',
    skills: ''
  });

  // Guarantor 1 State
  const [guarantor1, setGuarantor1] = useState({
    name: '',
    phone: '',
    email: '',
    relationship: '',
    occupation: '',
    address: '',
    passportPhoto: null
  });

  // Guarantor 2 State
  const [guarantor2, setGuarantor2] = useState({
    name: '',
    phone: '',
    email: '',
    relationship: '',
    occupation: '',
    address: '',
    passportPhoto: null
  });

  // Documents State
  const [documents, setDocuments] = useState({
    cv: null,
    passport: null,
    certificate: null,
    guarantor1IdFront: null,
    guarantor1IdBack: null,
    guarantor2IdFront: null,
    guarantor2IdBack: null
  });

  // File previews
  const [previews, setPreviews] = useState({});

  // Status State
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  // Nigerian States
  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
    'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
    'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

  // Positions
  const positions = [
    'Security Guard',
    'Senior Security Guard',
    'Security Supervisor',
    'Chief Security Officer',
    'Mobile Patrol Officer',
    'CCTV Operator',
    'Control Room Operator',
    'Executive Protection Officer',
    'Event Security Marshal'
  ];

  // Relationships
  const relationships = [
    'Father', 'Mother', 'Brother', 'Sister', 'Uncle', 'Aunt', 
    'Cousin', 'Friend', 'Colleague', 'Former Employer', 'Religious Leader', 
    'Community Leader', 'Other'
  ];

  // Handle Personal Details Change
  const handlePersonalChange = useCallback((e) => {
    const { name, value } = e.target;
    setPersonalDetails(prev => ({ ...prev, [name]: value }));
  }, []);

  // Handle Guarantor Change
  const handleGuarantorChange = useCallback((guarantorNum, e) => {
    const { name, value } = e.target;
    if (guarantorNum === 1) {
      setGuarantor1(prev => ({ ...prev, [name]: value }));
    } else {
      setGuarantor2(prev => ({ ...prev, [name]: value }));
    }
  }, []);

  // Handle File Change
  const handleFileChange = useCallback((fieldName, e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setStatus({
          loading: false,
          success: false,
          error: `File ${file.name} is too large. Maximum size is 10MB.`
        });
        return;
      }

      // Check if it's a guarantor passport photo
      if (fieldName === 'guarantor1PassportPhoto') {
        setGuarantor1(prev => ({ ...prev, passportPhoto: file }));
      } else if (fieldName === 'guarantor2PassportPhoto') {
        setGuarantor2(prev => ({ ...prev, passportPhoto: file }));
      } else {
        setDocuments(prev => ({ ...prev, [fieldName]: file }));
      }

      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews(prev => ({ ...prev, [fieldName]: reader.result }));
        };
        reader.readAsDataURL(file);
      } else {
        setPreviews(prev => ({ ...prev, [fieldName]: null }));
      }
    }
  }, []);

  // Remove file
  const removeFile = useCallback((fieldName) => {
    if (fieldName === 'guarantor1PassportPhoto') {
      setGuarantor1(prev => ({ ...prev, passportPhoto: null }));
    } else if (fieldName === 'guarantor2PassportPhoto') {
      setGuarantor2(prev => ({ ...prev, passportPhoto: null }));
    } else {
      setDocuments(prev => ({ ...prev, [fieldName]: null }));
    }
    setPreviews(prev => ({ ...prev, [fieldName]: null }));
  }, []);

  // Validate step
  const validateStep = (step) => {
    switch (step) {
      case 1:
        return personalDetails.fullName && 
               personalDetails.email && 
               personalDetails.phone && 
               personalDetails.dateOfBirth &&
               personalDetails.gender &&
               personalDetails.stateOfOrigin &&
               personalDetails.address &&
               personalDetails.position;
      case 2:
        return guarantor1.name && 
               guarantor1.phone && 
               guarantor1.email && 
               guarantor1.relationship &&
               guarantor1.address;
      case 3:
        return guarantor2.name && 
               guarantor2.phone && 
               guarantor2.email && 
               guarantor2.relationship &&
               guarantor2.address;
      case 4:
        return documents.cv && documents.passport;
      default:
        return true;
    }
  };

  // Go to next step
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setStatus({
        loading: false,
        success: false,
        error: 'Please fill in all required fields before proceeding.'
      });
    }
  };

  // Go to previous step
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit application
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(4)) {
      setStatus({
        loading: false,
        success: false,
        error: 'Please upload all required documents.'
      });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      const formData = new FormData();

      // Append personal details
      Object.keys(personalDetails).forEach(key => {
        formData.append(key, personalDetails[key]);
      });

      // Append guarantor 1 details (excluding file)
      Object.keys(guarantor1).forEach(key => {
        if (key !== 'passportPhoto') {
          formData.append(`guarantor1_${key}`, guarantor1[key]);
        }
      });

      // Append guarantor 2 details (excluding file)
      Object.keys(guarantor2).forEach(key => {
        if (key !== 'passportPhoto') {
          formData.append(`guarantor2_${key}`, guarantor2[key]);
        }
      });

      // Append files
      if (documents.cv) formData.append('cv', documents.cv);
      if (documents.passport) formData.append('passport', documents.passport);
      if (documents.certificate) formData.append('certificate', documents.certificate);
      if (guarantor1.passportPhoto) formData.append('guarantor1PassportPhoto', guarantor1.passportPhoto);
      if (documents.guarantor1IdFront) formData.append('guarantor1IdFront', documents.guarantor1IdFront);
      if (documents.guarantor1IdBack) formData.append('guarantor1IdBack', documents.guarantor1IdBack);
      if (guarantor2.passportPhoto) formData.append('guarantor2PassportPhoto', guarantor2.passportPhoto);
      if (documents.guarantor2IdFront) formData.append('guarantor2IdFront', documents.guarantor2IdFront);
      if (documents.guarantor2IdBack) formData.append('guarantor2IdBack', documents.guarantor2IdBack);

      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await axios.post(`${apiUrl}/applications`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setStatus({ loading: false, success: true, error: null });
        
        // Reset form
        setPersonalDetails({
          fullName: '', email: '', phone: '', alternatePhone: '',
          dateOfBirth: '', gender: '', maritalStatus: '', nationality: 'Nigerian',
          stateOfOrigin: '', lga: '', address: '', position: '',
          experience: '', education: '', skills: ''
        });
        setGuarantor1({
          name: '', phone: '', email: '', relationship: '',
          occupation: '', address: '', passportPhoto: null
        });
        setGuarantor2({
          name: '', phone: '', email: '', relationship: '',
          occupation: '', address: '', passportPhoto: null
        });
        setDocuments({
          cv: null, passport: null, certificate: null,
          guarantor1IdFront: null, guarantor1IdBack: null,
          guarantor2IdFront: null, guarantor2IdBack: null
        });
        setPreviews({});
        setCurrentStep(1);
      }
    } catch (error) {
      console.error('Application submission error:', error);
      setStatus({
        loading: false,
        success: false,
        error: error.response?.data?.message || 'Failed to submit application. Please try again.'
      });
    }
  };

  // File upload component
  const FileUploadField = ({ name, label, accept, required, preview, currentFile, guarantorField }) => (
    <div className={`file-upload-field ${currentFile ? 'has-file' : ''}`}>
      <label className="file-upload-label">
        {label} {required && <span className="required">*</span>}
      </label>
      <div className="file-upload-container">
        {preview ? (
          <div className="file-preview">
            <img src={preview} alt="Preview" />
            <button 
              type="button" 
              className="remove-file-btn"
              onClick={() => removeFile(guarantorField || name)}
            >
              <FaTimes />
            </button>
          </div>
        ) : currentFile ? (
          <div className="file-info">
            <FaFileAlt className="file-icon" />
            <span className="file-name">{currentFile.name}</span>
            <button 
              type="button" 
              className="remove-file-btn"
              onClick={() => removeFile(guarantorField || name)}
            >
              <FaTimes />
            </button>
          </div>
        ) : (
          <label className="file-drop-zone">
            <input
              type="file"
              name={name}
              accept={accept}
              onChange={(e) => handleFileChange(guarantorField || name, e)}
              className="file-input"
            />
            <div className="drop-zone-content">
              <FaUpload className="upload-icon" />
              <span className="drop-text">Click or drag file to upload</span>
              <span className="file-types">{accept}</span>
            </div>
          </label>
        )}
      </div>
    </div>
  );

  // Progress bar
  const ProgressBar = () => (
    <div className="application-progress">
      <div className="progress-steps">
        {[
          { num: 1, title: 'Personal Info', icon: <FaUser /> },
          { num: 2, title: 'Guarantor 1', icon: <FaUserTie /> },
          { num: 3, title: 'Guarantor 2', icon: <FaUsers /> },
          { num: 4, title: 'Documents', icon: <FaFileAlt /> }
        ].map((step) => (
          <div 
            key={step.num}
            className={`progress-step ${currentStep >= step.num ? 'active' : ''} ${currentStep > step.num ? 'completed' : ''}`}
          >
            <div className="step-circle">
              {currentStep > step.num ? <FaCheckCircle /> : step.icon}
            </div>
            <span className="step-title">{step.title}</span>
          </div>
        ))}
      </div>
      <div className="progress-line">
        <div 
          className="progress-fill" 
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
      </div>
    </div>
  );

  // Success Message
  if (status.success) {
    return (
      <div className="application-success">
        <div className="success-content">
          <FaCheckCircle className="success-icon" />
          <h2>Application Submitted Successfully!</h2>
          <p>Thank you for applying to Javelin Associates.</p>
          <p>Your application has been received and is being reviewed by our HR team.</p>
          <p>We will contact you via email within 3-5 business days.</p>
          <div className="success-info">
            <h4>What's Next?</h4>
            <ul>
              <li>Our HR team will review your application</li>
              <li>You'll receive an email confirmation shortly</li>
              <li>If shortlisted, you'll be invited for an interview</li>
              <li>Keep your phone accessible for possible calls</li>
            </ul>
          </div>
          <button 
            className="btn-primary"
            onClick={() => setStatus({ loading: false, success: false, error: null })}
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="application-form-container">
      <div className="form-header">
        <FaShieldAlt className="form-header-icon" />
        <h2>Employment Application Form</h2>
        <p>Complete all sections to apply for a position at Javelin Associates</p>
      </div>

      <ProgressBar />

      {status.error && (
        <div className="error-alert">
          <FaExclamationTriangle />
          <span>{status.error}</span>
          <button onClick={() => setStatus(prev => ({ ...prev, error: null }))}>
            <FaTimes />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="application-form">
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="form-step">
            <div className="step-header">
              <FaUser className="step-icon" />
              <h3>Personal Information</h3>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>
                  <FaUser /> Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={personalDetails.fullName}
                  onChange={handlePersonalChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <FaEnvelope /> Email Address <span className="required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={personalDetails.email}
                  onChange={handlePersonalChange}
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <FaPhone /> Phone Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={personalDetails.phone}
                  onChange={handlePersonalChange}
                  placeholder="+234 xxx xxx xxxx"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <FaPhone /> Alternate Phone
                </label>
                <input
                  type="tel"
                  name="alternatePhone"
                  value={personalDetails.alternatePhone}
                  onChange={handlePersonalChange}
                  placeholder="+234 xxx xxx xxxx"
                />
              </div>

              <div className="form-group">
                <label>
                  <FaCalendarAlt /> Date of Birth <span className="required">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={personalDetails.dateOfBirth}
                  onChange={handlePersonalChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Gender <span className="required">*</span></label>
                <select
                  name="gender"
                  value={personalDetails.gender}
                  onChange={handlePersonalChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="form-group">
                <label>Marital Status</label>
                <select
                  name="maritalStatus"
                  value={personalDetails.maritalStatus}
                  onChange={handlePersonalChange}
                >
                  <option value="">Select Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  <FaMapMarkerAlt /> State of Origin <span className="required">*</span>
                </label>
                <select
                  name="stateOfOrigin"
                  value={personalDetails.stateOfOrigin}
                  onChange={handlePersonalChange}
                  required
                >
                  <option value="">Select State</option>
                  {nigerianStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Local Government Area (LGA)</label>
                <input
                  type="text"
                  name="lga"
                  value={personalDetails.lga}
                  onChange={handlePersonalChange}
                  placeholder="Enter your LGA"
                />
              </div>

              <div className="form-group full-width">
                <label>
                  <FaMapMarkerAlt /> Residential Address <span className="required">*</span>
                </label>
                <textarea
                  name="address"
                  value={personalDetails.address}
                  onChange={handlePersonalChange}
                  placeholder="Enter your full residential address"
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <FaBriefcase /> Position Applied For <span className="required">*</span>
                </label>
                <select
                  name="position"
                  value={personalDetails.position}
                  onChange={handlePersonalChange}
                  required
                >
                  <option value="">Select Position</option>
                  {positions.map(pos => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Years of Experience</label>
                <select
                  name="experience"
                  value={personalDetails.experience}
                  onChange={handlePersonalChange}
                >
                  <option value="">Select Experience</option>
                  <option value="none">No Experience</option>
                  <option value="0-1">Less than 1 year</option>
                  <option value="1-2">1-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5+">5+ years</option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  <FaGraduationCap /> Highest Education
                </label>
                <select
                  name="education"
                  value={personalDetails.education}
                  onChange={handlePersonalChange}
                >
                  <option value="">Select Education</option>
                  <option value="primary">Primary School</option>
                  <option value="secondary">Secondary School (WAEC/NECO)</option>
                  <option value="ond">OND</option>
                  <option value="hnd">HND</option>
                  <option value="bsc">B.Sc/B.A</option>
                  <option value="msc">M.Sc/MBA</option>
                  <option value="phd">PhD</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label>Skills & Qualifications</label>
                <textarea
                  name="skills"
                  value={personalDetails.skills}
                  onChange={handlePersonalChange}
                  placeholder="List any relevant skills, certifications, or training (e.g., First Aid, Fire Fighting, Self Defense)"
                  rows="3"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Guarantor 1 */}
        {currentStep === 2 && (
          <div className="form-step">
            <div className="step-header">
              <FaUserTie className="step-icon" />
              <h3>First Guarantor Details</h3>
              <p className="step-description">
                Please provide details of your first guarantor. This should be someone who can vouch for your character and integrity.
              </p>
            </div>

            <div className="guarantor-section">
              <div className="form-grid">
                <div className="form-group">
                  <label>
                    <FaUser /> Full Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={guarantor1.name}
                    onChange={(e) => handleGuarantorChange(1, e)}
                    placeholder="Guarantor's full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    <FaPhone /> Phone Number <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={guarantor1.phone}
                    onChange={(e) => handleGuarantorChange(1, e)}
                    placeholder="+234 xxx xxx xxxx"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    <FaEnvelope /> Email Address <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={guarantor1.email}
                    onChange={(e) => handleGuarantorChange(1, e)}
                    placeholder="email@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Relationship <span className="required">*</span></label>
                  <select
                    name="relationship"
                    value={guarantor1.relationship}
                    onChange={(e) => handleGuarantorChange(1, e)}
                    required
                  >
                    <option value="">Select Relationship</option>
                    {relationships.map(rel => (
                      <option key={rel} value={rel}>{rel}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    <FaBriefcase /> Occupation
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={guarantor1.occupation}
                    onChange={(e) => handleGuarantorChange(1, e)}
                    placeholder="Guarantor's occupation"
                  />
                </div>

                <div className="form-group full-width">
                  <label>
                    <FaMapMarkerAlt /> Address <span className="required">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={guarantor1.address}
                    onChange={(e) => handleGuarantorChange(1, e)}
                    placeholder="Guarantor's residential/office address"
                    rows="3"
                    required
                  />
                </div>
              </div>

              <div className="guarantor-photo-section">
                <h4><FaCamera /> Guarantor's Passport Photograph</h4>
                <FileUploadField
                  name="guarantor1PassportPhoto"
                  label="Passport Photo"
                  accept="image/jpeg,image/png,image/webp"
                  required={false}
                  preview={previews.guarantor1PassportPhoto}
                  currentFile={guarantor1.passportPhoto}
                  guarantorField="guarantor1PassportPhoto"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Guarantor 2 */}
        {currentStep === 3 && (
          <div className="form-step">
            <div className="step-header">
              <FaUsers className="step-icon" />
              <h3>Second Guarantor Details</h3>
              <p className="step-description">
                Please provide details of your second guarantor. This should be a different person from your first guarantor.
              </p>
            </div>

            <div className="guarantor-section">
              <div className="form-grid">
                <div className="form-group">
                  <label>
                    <FaUser /> Full Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={guarantor2.name}
                    onChange={(e) => handleGuarantorChange(2, e)}
                    placeholder="Guarantor's full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    <FaPhone /> Phone Number <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={guarantor2.phone}
                    onChange={(e) => handleGuarantorChange(2, e)}
                    placeholder="+234 xxx xxx xxxx"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    <FaEnvelope /> Email Address <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={guarantor2.email}
                    onChange={(e) => handleGuarantorChange(2, e)}
                    placeholder="email@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Relationship <span className="required">*</span></label>
                  <select
                    name="relationship"
                    value={guarantor2.relationship}
                    onChange={(e) => handleGuarantorChange(2, e)}
                    required
                  >
                    <option value="">Select Relationship</option>
                    {relationships.map(rel => (
                      <option key={rel} value={rel}>{rel}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    <FaBriefcase /> Occupation
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={guarantor2.occupation}
                    onChange={(e) => handleGuarantorChange(2, e)}
                    placeholder="Guarantor's occupation"
                  />
                </div>

                <div className="form-group full-width">
                  <label>
                    <FaMapMarkerAlt /> Address <span className="required">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={guarantor2.address}
                    onChange={(e) => handleGuarantorChange(2, e)}
                    placeholder="Guarantor's residential/office address"
                    rows="3"
                    required
                  />
                </div>
              </div>

              <div className="guarantor-photo-section">
                <h4><FaCamera /> Guarantor's Passport Photograph</h4>
                <FileUploadField
                  name="guarantor2PassportPhoto"
                  label="Passport Photo"
                  accept="image/jpeg,image/png,image/webp"
                  required={false}
                  preview={previews.guarantor2PassportPhoto}
                  currentFile={guarantor2.passportPhoto}
                  guarantorField="guarantor2PassportPhoto"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Documents */}
        {currentStep === 4 && (
          <div className="form-step">
            <div className="step-header">
              <FaFileAlt className="step-icon" />
              <h3>Document Upload</h3>
              <p className="step-description">
                Please upload the required documents. Accepted formats: PDF, JPEG, PNG (Max 10MB each)
              </p>
            </div>

            <div className="documents-section">
              <div className="documents-grid">
                <div className="document-category">
                  <h4>Your Documents</h4>
                  <FileUploadField
                    name="cv"
                    label="CV/Resume"
                    accept=".pdf,.doc,.docx"
                    required={true}
                    preview={previews.cv}
                    currentFile={documents.cv}
                  />
                  <FileUploadField
                    name="passport"
                    label="Passport Photograph"
                    accept="image/jpeg,image/png,image/webp"
                    required={true}
                    preview={previews.passport}
                    currentFile={documents.passport}
                  />
                  <FileUploadField
                    name="certificate"
                    label="Highest Certificate"
                    accept=".pdf,.jpg,.jpeg,.png"
                    required={false}
                    preview={previews.certificate}
                    currentFile={documents.certificate}
                  />
                </div>

                <div className="document-category">
                  <h4>Guarantor 1 ID Card</h4>
                  <FileUploadField
                    name="guarantor1IdFront"
                    label="ID Card (Front)"
                    accept="image/jpeg,image/png,.pdf"
                    required={false}
                    preview={previews.guarantor1IdFront}
                    currentFile={documents.guarantor1IdFront}
                  />
                  <FileUploadField
                    name="guarantor1IdBack"
                    label="ID Card (Back)"
                    accept="image/jpeg,image/png,.pdf"
                    required={false}
                    preview={previews.guarantor1IdBack}
                    currentFile={documents.guarantor1IdBack}
                  />
                </div>

                <div className="document-category">
                  <h4>Guarantor 2 ID Card</h4>
                  <FileUploadField
                    name="guarantor2IdFront"
                    label="ID Card (Front)"
                    accept="image/jpeg,image/png,.pdf"
                    required={false}
                    preview={previews.guarantor2IdFront}
                    currentFile={documents.guarantor2IdFront}
                  />
                  <FileUploadField
                    name="guarantor2IdBack"
                    label="ID Card (Back)"
                    accept="image/jpeg,image/png,.pdf"
                    required={false}
                    preview={previews.guarantor2IdBack}
                    currentFile={documents.guarantor2IdBack}
                  />
                </div>
              </div>
            </div>

            <div className="agreement-section">
              <label className="checkbox-label">
                <input type="checkbox" required />
                <span>
                  I hereby declare that the information provided in this application is true and accurate. 
                  I understand that any false information may result in disqualification or termination of employment.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="form-navigation">
          {currentStep > 1 && (
            <button type="button" className="btn-secondary" onClick={prevStep}>
              <FaChevronUp /> Previous
            </button>
          )}
          
          {currentStep < totalSteps ? (
            <button type="button" className="btn-primary" onClick={nextStep}>
              Next <FaChevronDown />
            </button>
          ) : (
            <button 
              type="submit" 
              className="btn-submit"
              disabled={status.loading}
            >
              {status.loading ? (
                <>
                  <FaSpinner className="spinner" /> Submitting...
                </>
              ) : (
                <>
                  <FaCheckCircle /> Submit Application
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
