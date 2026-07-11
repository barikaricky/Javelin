import React, { useState, useEffect } from 'react';
import { FaCookie, FaTimes, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';
import './CookieConsent.css';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="cookie-overlay" onClick={() => setIsVisible(false)}></div>
      <div className={`cookie-consent ${isVisible ? 'cookie-consent--visible' : ''}`}>
        <button 
          className="cookie-consent__close"
          onClick={() => setIsVisible(false)}
          aria-label="Close"
        >
          <FaTimes />
        </button>

        <div className="cookie-consent__content">
          <div className="cookie-consent__header">
            <div className="cookie-consent__icon">
              <FaCookie />
            </div>
            <h3>We Value Your Privacy</h3>
          </div>

          <p className="cookie-consent__text">
            At Javelin Associates, we use cookies to enhance your browsing experience, analyze site traffic, 
            and personalize content. Your privacy and security are our top priorities.
          </p>

          {showDetails && (
            <div className="cookie-consent__details">
              <div className="cookie-detail">
                <FaCheckCircle className="cookie-detail__icon" />
                <div>
                  <strong>Essential Cookies</strong>
                  <p>Required for website functionality and security</p>
                </div>
              </div>
              <div className="cookie-detail">
                <FaShieldAlt className="cookie-detail__icon" />
                <div>
                  <strong>Performance Cookies</strong>
                  <p>Help us improve our services and user experience</p>
                </div>
              </div>
            </div>
          )}

          <button 
            className="cookie-consent__toggle"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>

          <div className="cookie-consent__actions">
            <button 
              className="btn btn-primary cookie-btn cookie-btn--accept"
              onClick={handleAccept}
            >
              <FaCheckCircle /> Accept All Cookies
            </button>
            <button 
              className="btn btn-outline cookie-btn cookie-btn--reject"
              onClick={handleReject}
            >
              Reject Non-Essential
            </button>
          </div>

          <p className="cookie-consent__privacy">
            By continuing to use our site, you agree to our <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms of Service</a>.
          </p>
        </div>
      </div>
    </>
  );
};

export default CookieConsent;
