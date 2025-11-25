import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaUserShield, FaCheckCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './HeroSlider.css';

const slides = [
  {
    id: 1,
    title: 'Professional Security Guards',
    subtitle: 'Trained • Certified • Reliable',
    description: 'Elite security personnel protecting what matters most to you',
    icon: <FaUserShield />,
    gradient: 'linear-gradient(135deg, #003A67 0%, #0066CC 100%)'
  },
  {
    id: 2,
    title: 'Corporate & Residential Protection',
    subtitle: '24/7 Monitoring • Rapid Response',
    description: 'Comprehensive security solutions for businesses and homes',
    icon: <FaShieldAlt />,
    gradient: 'linear-gradient(135deg, #002044 0%, #003A67 100%)'
  },
  {
    id: 3,
    title: 'Trained & Verified Personnel',
    subtitle: 'Background Checked • HSE Compliant',
    description: 'Every guard undergoes rigorous training and verification',
    icon: <FaCheckCircle />,
    gradient: 'linear-gradient(135deg, #00AA55 0%, #008844 100%)'
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []); // Remove currentSlide dependency and use functional update

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const goToSlide = (index) => {
    if (!isAnimating && index !== currentSlide) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  return (
    <section className="hero-slider">
      <div className="hero-slider__container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${index === currentSlide ? 'hero-slide--active' : ''}`}
            style={{ background: slide.gradient }}
          >
            <div className="container">
              <div className="hero-slide__content">
                <div className="hero-slide__icon">
                  {slide.icon}
                </div>
                <h1 className="hero-slide__title">{slide.title}</h1>
                <p className="hero-slide__subtitle">{slide.subtitle}</p>
                <p className="hero-slide__description">{slide.description}</p>
                <div className="hero-slide__buttons">
                  <Link to="/services" className="btn btn-primary btn-lg">
                    Request Security Service
                  </Link>
                  <Link to="/recruitment" className="btn btn-outline btn-lg">
                    Apply for Guard Job
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
