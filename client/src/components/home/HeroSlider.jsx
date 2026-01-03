import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaUserShield, FaCheckCircle, FaChevronLeft, FaChevronRight, FaDesktop, FaLifeRing } from 'react-icons/fa';
import './HeroSlider.css';

const slides = [
  {
    image: '/images/desk.jpeg',
    title: '24/7 Security Monitoring & Control',
    subtitle: 'Advanced Command Center Operations',
    description: 'Professional security personnel providing round-the-clock surveillance and rapid response coordination',
    icon: <FaDesktop />,
    gradient: 'linear-gradient(135deg, rgba(0,58,103,0.35) 0%, rgba(11,64,118,0.25) 100%)',
    cta: {
      primary: { text: 'Our Services', link: '/services' },
      secondary: { text: 'Contact Us', link: '/contact' }
    }
  },
  {
    image: '/images/Expect-led.jpeg',
    title: 'Comprehensive Safety Training Programs',
    subtitle: 'Building a Culture of Safety Excellence',
    description: 'Expert-led orientation and training sessions ensuring our team is prepared for all safety scenarios',
    icon: <FaLifeRing />,
    gradient: 'linear-gradient(135deg, rgba(0,58,103,0.35) 0%, rgba(11,64,118,0.25) 100%)',
    cta: {
      primary: { text: 'Training Programs', link: '/services' },
      secondary: { text: 'Learn More', link: '/about' }
    }
  },
  {
    
    image: '/images/javelin-logo-1.jpg',
    title: 'Professional Security Services',
    subtitle: 'Protecting What Matters Most',
    description: 'Comprehensive security solutions tailored to your needs',
    icon: <FaShieldAlt />,
    gradient: 'linear-gradient(135deg, rgba(0,58,103,0.35) 0%, rgba(11,64,118,0.25) 100%)',
    cta: {
      primary: { text: 'Our Services', link: '/services' },
      secondary: { text: 'Contact Us', link: '/contact' }
    }
  },
  {
    image: '/images/javelin-logo-2.jpeg',
    title: '24/7 Armed & Unarmed Guards',
    subtitle: 'Elite Security Personnel at Your Service',
    description: 'Professional guards available around the clock',
    icon: <FaUserShield />,
    gradient: 'linear-gradient(135deg, rgba(11,64,118,0.35) 0%, rgba(0,58,103,0.25) 100%)',
    cta: {
      primary: { text: 'View Our Sites', link: '/sites' },
      secondary: { text: 'Learn More', link: '/about' }
    }
  },
  {
    image: '/images/javelin-logo-2.jpg',
    title: 'Advanced K-9 Security Units',
    subtitle: 'Specialized Canine Protection Services',
    description: 'Elite K-9 units for enhanced security operations',
    icon: <FaCheckCircle />,
    gradient: 'linear-gradient(135deg, rgba(0,58,103,0.35) 0%, rgba(30,90,142,0.25) 100%)',
    cta: {
      primary: { text: 'Learn More', link: '/services' },
      secondary: { text: 'Contact Us', link: '/contact' }
    }
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

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
            key={index}
            className={`hero-slide ${index === currentSlide ? 'hero-slide--active' : ''}`}
          >
            {/* Background Image (if available) */}
            {slide.image && (
              <div 
                className="hero-slide__bg"
                style={{
                  backgroundImage: `url(${slide.image})`
                }}
              />
            )}
            
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
