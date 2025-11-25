import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaUserShield, FaCheckCircle, FaVideo, FaCar, FaBuilding, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { HERO_IMAGES, PLACEHOLDER_IMAGES } from '../../utils/imageHelper';
import './HeroSlider.css';

const slides = [
  {
    id: 1,
    title: 'Professional Security Guards',
    subtitle: 'Trained • Certified • Reliable',
    description: 'Elite security personnel protecting what matters most to you',
    icon: <FaUserShield />,
    gradient: 'linear-gradient(135deg, rgba(0, 58, 103, 0.85) 0%, rgba(0, 102, 204, 0.85) 100%)',
    image: HERO_IMAGES.SLIDE_1,
    fallback: PLACEHOLDER_IMAGES.GUARD,
    cta: {
      primary: { text: 'Request Service', link: '/services' },
      secondary: { text: 'View Our Guards', link: '/about' }
    }
  },
  {
    id: 2,
    title: 'Corporate & Residential Protection',
    subtitle: '24/7 Monitoring • Rapid Response',
    description: 'Comprehensive security solutions for businesses and homes',
    icon: <FaShieldAlt />,
    gradient: 'linear-gradient(135deg, rgba(0, 32, 68, 0.85) 0%, rgba(0, 58, 103, 0.85) 100%)',
    image: HERO_IMAGES.SLIDE_2,
    fallback: PLACEHOLDER_IMAGES.SECURITY,
    cta: {
      primary: { text: 'Get Protected', link: '/services' },
      secondary: { text: 'Contact Us', link: '/contact' }
    }
  },
  {
    id: 3,
    title: 'Trained & Verified Personnel',
    subtitle: 'Background Checked • HSE Compliant',
    description: 'Every guard undergoes rigorous training and verification',
    icon: <FaCheckCircle />,
    gradient: 'linear-gradient(135deg, rgba(0, 170, 85, 0.85) 0%, rgba(0, 136, 68, 0.85) 100%)',
    image: HERO_IMAGES.SLIDE_3,
    fallback: PLACEHOLDER_IMAGES.GUARD,
    cta: {
      primary: { text: 'Join Our Team', link: '/recruitment' },
      secondary: { text: 'Learn More', link: '/about' }
    }
  },
  {
    id: 4,
    title: 'Event Security Excellence',
    subtitle: 'Crowd Control • Access Management',
    description: 'Professional security teams for events of any size',
    icon: <FaBuilding />,
    gradient: 'linear-gradient(135deg, rgba(0, 58, 103, 0.85) 0%, rgba(0, 102, 204, 0.85) 100%)',
    image: HERO_IMAGES.SLIDE_4,
    fallback: PLACEHOLDER_IMAGES.SECURITY,
    cta: {
      primary: { text: 'Book Event Security', link: '/services' },
      secondary: { text: 'View Services', link: '/services' }
    }
  },
  {
    id: 5,
    title: 'Advanced CCTV Monitoring',
    subtitle: 'Smart Surveillance • Real-time Alerts',
    description: '24/7 monitoring with cutting-edge technology',
    icon: <FaVideo />,
    gradient: 'linear-gradient(135deg, rgba(0, 32, 68, 0.85) 0%, rgba(0, 58, 103, 0.85) 100%)',
    image: HERO_IMAGES.SLIDE_5,
    fallback: PLACEHOLDER_IMAGES.SECURITY,
    cta: {
      primary: { text: 'Get Monitored', link: '/services' },
      secondary: { text: 'See Technology', link: '/services' }
    }
  },
  {
    id: 6,
    title: 'Mobile Patrol Services',
    subtitle: 'Regular Patrols • Multiple Locations',
    description: 'Constant vigilance across your facilities',
    icon: <FaCar />,
    gradient: 'linear-gradient(135deg, rgba(0, 170, 85, 0.85) 0%, rgba(0, 136, 68, 0.85) 100%)',
    image: HERO_IMAGES.SLIDE_6,
    fallback: PLACEHOLDER_IMAGES.SECURITY,
    cta: {
      primary: { text: 'Schedule Patrol', link: '/services' },
      secondary: { text: 'Contact Us', link: '/contact' }
    }
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [imageErrors, setImageErrors] = useState(new Set());

  // Preload images with error handling
  useEffect(() => {
    slides.forEach((slide, index) => {
      const img = new Image();
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, index]));
      };
      img.onerror = () => {
        setImageErrors(prev => new Set([...prev, index]));
        // Load fallback image
        const fallbackImg = new Image();
        fallbackImg.src = slide.fallback;
        fallbackImg.onload = () => {
          setLoadedImages(prev => new Set([...prev, index]));
        };
      };
      img.src = slide.image;
    });
  }, []);

  const nextSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 600);
    }
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 600);
    }
  }, [isAnimating]);

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        nextSlide();
      }, 6000);

      return () => clearInterval(timer);
    }
  }, [isPaused, nextSlide]);

  const goToSlide = (index) => {
    if (!isAnimating && index !== currentSlide) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  return (
    <section 
      className="hero-slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="hero-slider__container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${index === currentSlide ? 'hero-slide--active' : ''}`}
          >
            {/* Background Image with fallback */}
            <div 
              className="hero-slide__bg"
              style={{
                backgroundImage: `url(${imageErrors.has(index) ? slide.fallback : slide.image})`,
                opacity: loadedImages.has(index) ? 1 : 0
              }}
            />
            
            {/* Gradient Overlay */}
            <div 
              className="hero-slide__overlay"
              style={{ background: slide.gradient }}
            />

            {/* Content */}
            <div className="container">
              <div className="hero-slide__content">
                <div className="hero-slide__icon">
                  {slide.icon}
                </div>
                <h1 className="hero-slide__title">{slide.title}</h1>
                <p className="hero-slide__subtitle">{slide.subtitle}</p>
                <p className="hero-slide__description">{slide.description}</p>
                <div className="hero-slide__buttons">
                  <Link to={slide.cta.primary.link} className="btn btn-primary btn-lg">
                    {slide.cta.primary.text}
                  </Link>
                  <Link to={slide.cta.secondary.link} className="btn btn-outline btn-lg">
                    {slide.cta.secondary.text}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button className="hero-slider__arrow hero-slider__arrow--prev" onClick={prevSlide}>
        <FaChevronLeft />
      </button>
      <button className="hero-slider__arrow hero-slider__arrow--next" onClick={nextSlide}>
        <FaChevronRight />
      </button>

      {/* Progress Bar */}
      <div className="hero-slider__progress">
        <div 
          className="hero-slider__progress-bar"
          style={{
            animation: isPaused ? 'none' : 'progress 6s linear infinite'
          }}
        />
      </div>

      {/* Dots Navigation */}
      <div className="hero-slider__dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`hero-slider__dot ${index === currentSlide ? 'hero-slider__dot--active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
