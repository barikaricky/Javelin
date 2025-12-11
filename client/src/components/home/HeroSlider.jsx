import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaUserShield, FaCheckCircle, FaVideo, FaCar, FaBuilding, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './HeroSlider.css';

const FALLBACK_IMAGE = '/images/javelin-site-5.jpg';

const slides = [
  {
    image: '/images/javelin-logo-1.jpg',
    title: 'Professional Security Services',
    subtitle: 'Protecting What Matters Most',
    description: 'Comprehensive security solutions tailored to your needs',
    icon: <FaShieldAlt />,
    gradient: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
    cta: {
      primary: { text: 'Our Services', link: '/services' },
      secondary: { text: 'Contact Us', link: '/contact' }
    }
  },
  {
    image: '/images/javelin-site-2.jpg',
    title: '24/7 Armed & Unarmed Guards',
    subtitle: 'Elite Security Personnel at Your Service',
    description: 'Professional guards available around the clock',
    icon: <FaUserShield />,
    gradient: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
    cta: {
      primary: { text: 'View Our Sites', link: '/our-sites' },
      secondary: { text: 'Learn More', link: '/about' }
    }
  },
  {
    image: '/images/javelin-site-3.jpg',
    title: 'Advanced K-9 Security Units',
    subtitle: 'Specialized Canine Protection Services',
    description: 'Elite K-9 units for enhanced security operations',
    icon: <FaCheckCircle />,
    gradient: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
    cta: {
      primary: { text: 'Learn More', link: '/services' },
      secondary: { text: 'Contact Us', link: '/contact' }
    }
  },
  {
    image: '/images/javelin-guard-4.jpg',
    title: 'Trained Security Professionals',
    subtitle: 'Expert Security Team Ready to Serve',
    description: 'Highly trained professionals dedicated to your safety',
    icon: <FaBuilding />,
    gradient: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
    cta: {
      primary: { text: 'Meet Our Team', link: '/team' },
      secondary: { text: 'Our Services', link: '/services' }
    }
  },
  {
    image: '/images/javelin-logo-2.jpg',
    title: 'Professional K-9 Handlers',
    subtitle: 'Elite Canine Security Operations',
    description: 'Expert handlers with specialized K-9 training',
    icon: <FaCar />,
    gradient: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
    cta: {
      primary: { text: 'Contact Us', link: '/contact' },
      secondary: { text: 'Our Services', link: '/services' }
    }
  },
  {
    image: '/images/javelin-site-5.jpg',
    title: 'Javelin Associates Ltd',
    subtitle: 'Your Trusted Security Partner Since Inception',
    description: 'Delivering excellence in security services',
    icon: <FaVideo />,
    gradient: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
    cta: {
      primary: { text: 'About Us', link: '/about' },
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
    const preloaders = slides.map((slide, index) => {
      const img = new Image();
      img.src = slide.image;

      img.onload = () => {
        setLoadedImages((prev) => {
          const next = new Set(prev);
          next.add(index);
          return next;
        });
      };

      img.onerror = () => {
        setImageErrors((prev) => {
          const next = new Set(prev);
          next.add(index);
          return next;
        });
        setLoadedImages((prev) => {
          const next = new Set(prev);
          next.add(index);
          return next;
        });
      };

      return img;
    });

    return () => {
      preloaders.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

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
            {/* Background Image with fallback */}
            <div 
              className="hero-slide__bg"
              style={{
                backgroundImage: `url(${imageErrors.has(index) ? FALLBACK_IMAGE : slide.image})`,
                opacity: loadedImages.has(index) || imageErrors.has(index) ? 1 : 0
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
