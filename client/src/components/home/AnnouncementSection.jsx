import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBullhorn, FaTimes, FaArrowRight } from 'react-icons/fa';
import { ANNOUNCEMENT_IMAGE, PLACEHOLDER_IMAGES } from '../../utils/imageHelper';
import './AnnouncementSection.css';

const AnnouncementSection = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimated, setIsAnimated] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Sample announcement - This will come from backend in production
  const announcement = {
    title: 'We\'re Hiring! Join Our Elite Security Team',
    description: 'Javelin Associates is expanding! We\'re looking for dedicated, professional security guards. Competitive salary, comprehensive training, and career growth opportunities await you.',
    image: ANNOUNCEMENT_IMAGE,
    fallbackImage: PLACEHOLDER_IMAGES.GUARD,
    badge: 'Limited Positions',
    cta: {
      text: 'Apply Now',
      link: '/recruitment'
    },
    discount: '20% OFF',
    discountText: 'New Client Special Offer',
    type: 'recruitment' // 'recruitment', 'discount', 'news', 'event'
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <section className={`announcement-section ${isAnimated ? 'announcement-section--animated' : ''}`}>
      <div className="container">
        <div className="announcement-card">
          {/* Close Button */}
          <button 
            className="announcement-close"
            onClick={() => setIsVisible(false)}
            aria-label="Close announcement"
          >
            <FaTimes />
          </button>

          {/* Badge */}
          <div className="announcement-badge">
            <FaBullhorn className="announcement-badge__icon" />
            <span>{announcement.badge}</span>
          </div>

          <div className="announcement-content">
            {/* Image Section */}
            <div className="announcement-image">
              <img 
                src={imageError ? announcement.fallbackImage : announcement.image} 
                alt={announcement.title}
                onError={() => setImageError(true)}
              />
              {announcement.type === 'discount' && (
                <div className="announcement-discount">
                  <span className="announcement-discount__value">{announcement.discount}</span>
                  <span className="announcement-discount__text">{announcement.discountText}</span>
                </div>
              )}
              <div className="announcement-image__overlay"></div>
            </div>

            {/* Text Content */}
            <div className="announcement-text">
              <h2 className="announcement-title">{announcement.title}</h2>
              <p className="announcement-description">{announcement.description}</p>
              
              <div className="announcement-features">
                <div className="announcement-feature">
                  <span className="announcement-feature__icon">✓</span>
                  <span>Competitive Salary</span>
                </div>
                <div className="announcement-feature">
                  <span className="announcement-feature__icon">✓</span>
                  <span>Professional Training</span>
                </div>
                <div className="announcement-feature">
                  <span className="announcement-feature__icon">✓</span>
                  <span>Career Growth</span>
                </div>
              </div>

              <Link to={announcement.cta.link} className="btn btn-primary btn-lg announcement-cta">
                {announcement.cta.text}
                <FaArrowRight className="announcement-cta__icon" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnnouncementSection;
