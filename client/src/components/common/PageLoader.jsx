import React, { useState, useEffect } from 'react';
import { LOGO } from '../../utils/imageHelper';
import './PageLoader.css';

const PageLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="page-loader">
      <div className="page-loader__content">
        <div className="page-loader__logo-container">
          <img 
            src={LOGO} 
            alt="Javelin Associates Logo" 
            className="page-loader__logo"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div className="page-loader__logo-fallback">
            <div className="fallback-shield">J</div>
            <div className="fallback-text">JAVELIN</div>
          </div>
        </div>
        
        <div className="page-loader__spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>

        <div className="page-loader__progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="progress-text">{progress}%</div>
        </div>

        <p className="page-loader__text">Loading Security Services...</p>
      </div>
    </div>
  );
};

export default PageLoader;
