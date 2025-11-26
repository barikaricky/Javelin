import React, { useState } from 'react';
import './ImageWithFallback.css';

const ImageWithFallback = ({ 
  src, 
  alt, 
  fallback = '/images/placeholder.jpg',
  className = '',
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    console.error(`Failed to load image: ${src}`);
    setHasError(true);
    setIsLoading(false);
    
    // Try fallback SVG
    const fallbackSvg = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"%3E%3Crect width="1200" height="800" fill="%23003A67"/%3E%3Ctext x="50%25" y="50%25" font-size="48" fill="%23FFCC00" text-anchor="middle" dominant-baseline="middle"%3EJavelin Security%3C/text%3E%3C/svg%3E`;
    setImageSrc(fallbackSvg);
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  return (
    <div className={`image-wrapper ${className}`}>
      {isLoading && (
        <div className="image-loading">
          <div className="spinner"></div>
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className={`${isLoading ? 'loading' : ''} ${hasError ? 'error' : ''}`}
        {...props}
      />
    </div>
  );
};

export default ImageWithFallback;
