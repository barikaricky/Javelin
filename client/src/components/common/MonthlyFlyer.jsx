import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import './MonthlyFlyer.css';

const MonthlyFlyer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if flyer was dismissed this session
    const dismissed = sessionStorage.getItem('flyerDismissed');
    if (!dismissed) {
      // Show popup after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('flyerDismissed', 'true');
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="flyer-overlay" onClick={handleOverlayClick}>
      <div className="flyer-popup">
        <button 
          className="flyer-close"
          onClick={handleClose}
          aria-label="Close flyer"
        >
          <FiX />
        </button>
        <div className="flyer-image-wrapper">
          <img 
            src="/images/HAPPNEW_MONTH_FYLER_FROM_JAVELIN.jpeg" 
            alt="Javelin Associates Monthly Update"
            className="flyer-image"
            onError={(e) => {
              // Hide popup if image fails to load
              setIsVisible(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MonthlyFlyer;
