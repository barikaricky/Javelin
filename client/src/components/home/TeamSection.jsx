import React, { useState, useEffect, useCallback } from 'react';
import { FaLinkedinIn, FaTwitter, FaFacebookF, FaInstagram, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { TEAM_IMAGES } from '../../utils/imageHelper';
import './TeamSection.css';

const TeamSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(3);

  const team = [
    {
      name: 'Chief Adebayo Williams',
      position: 'Chief Executive Officer',
      image: TEAM_IMAGES.CEO,
      bio: 'Over 20 years of experience in security management and strategic operations',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        facebook: 'https://facebook.com',
      }
    },
    {
      name: 'Mrs. Chidinma Okonkwo',
      position: 'Managing Director',
      image: TEAM_IMAGES.MD,
      bio: 'Expert in corporate security solutions with 15+ years industry experience',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
      }
    },
    {
      name: 'Mr. Yusuf Mohammed',
      position: 'Operations Manager',
      image: TEAM_IMAGES.OPS_MANAGER,
      bio: 'Military veteran specializing in tactical operations and security protocols',
      social: {
        linkedin: 'https://linkedin.com',
        facebook: 'https://facebook.com',
      }
    },
    {
      name: 'Miss Blessing Eze',
      position: 'HR Manager',
      image: TEAM_IMAGES.HR_MANAGER,
      bio: 'Human resources specialist focused on recruitment and staff development',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
      }
    },
    {
      name: 'Sergeant Emeka Nwosu',
      position: 'Senior Supervisor',
      image: TEAM_IMAGES.SUPERVISOR_1,
      bio: 'Field operations expert with expertise in residential and corporate security',
      social: {
        linkedin: 'https://linkedin.com',
        facebook: 'https://facebook.com',
      }
    },
    {
      name: 'Officer Fatima Bello',
      position: 'Training Supervisor',
      image: TEAM_IMAGES.SUPERVISOR_2,
      bio: 'Certified security trainer specializing in guard development programs',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
      }
    }
  ];

  // Responsive slides to show
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, team.length - slidesToShow);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, maxIndex]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, maxIndex]);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const goToSlide = (index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section 
      className="team-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container">
        <div className="section-header">
          <h2>Meet Our Leadership Team</h2>
          <p>Experienced professionals dedicated to your security</p>
        </div>

        <div className="team-slider">
          <button 
            className="team-slider__arrow team-slider__arrow--prev"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <FaChevronLeft />
          </button>

          <div className="team-slider__track-container">
            <div 
              className="team-slider__track"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
              }}
            >
              {team.map((member, index) => (
                <div key={index} className="team-card">
                  <div className="team-card__inner">
                    <div className="team-card__image-wrapper">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="team-card__image"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%23003A67"/%3E%3Ctext x="50%25" y="50%25" font-size="24" fill="%23FFCC00" text-anchor="middle" dominant-baseline="middle"%3ETeam Member%3C/text%3E%3C/svg%3E';
                        }}
                      />
                      <div className="team-card__overlay">
                        <div className="team-card__social">
                          {member.social.linkedin && (
                            <a 
                              href={member.social.linkedin} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="team-social-link"
                              aria-label="LinkedIn"
                            >
                              <FaLinkedinIn />
                            </a>
                          )}
                          {member.social.twitter && (
                            <a 
                              href={member.social.twitter} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="team-social-link"
                              aria-label="Twitter"
                            >
                              <FaTwitter />
                            </a>
                          )}
                          {member.social.facebook && (
                            <a 
                              href={member.social.facebook} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="team-social-link"
                              aria-label="Facebook"
                            >
                              <FaFacebookF />
                            </a>
                          )}
                          {member.social.instagram && (
                            <a 
                              href={member.social.instagram} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="team-social-link"
                              aria-label="Instagram"
                            >
                              <FaInstagram />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="team-card__content">
                      <h3 className="team-card__name">{member.name}</h3>
                      <p className="team-card__position">{member.position}</p>
                      <p className="team-card__bio">{member.bio}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            className="team-slider__arrow team-slider__arrow--next"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="team-slider__dots">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              className={`team-slider__dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
