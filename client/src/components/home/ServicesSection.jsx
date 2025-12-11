import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUserShield,
  FaBuilding,
  FaHome,
  FaCalendarAlt,
  FaVideo,
  FaCar,
  FaKey,
  FaUserSecret
} from 'react-icons/fa';
import './ServicesSection.css';

const ServicesSection = () => {
  const services = useMemo(() => ([
    {
      icon: <FaUserShield />,
      title: 'Manned Guarding',
      description: 'Professional security guards stationed at your premises 24/7',
      image: '/assets/images/services/trained-personnel.jp.jpg'
    },
    {
      icon: <FaBuilding />,
      title: 'Corporate Security',
      description: 'Comprehensive security solutions for businesses and offices',
      image: '/assets/images/services/default.jpg'
    },
    {
      icon: <FaHome />,
      title: 'Residential Protection',
      description: 'Secure your home and family with our trained personnel',
      image: '/assets/images/services/trained-personnel.jp.jpg'
    },
    {
      icon: <FaCalendarAlt />,
      title: 'Event Security',
      description: 'Professional crowd control and security for all events',
      image: '/assets/images/services/event-security.jpg.jpg'
    },
    {
      icon: <FaVideo />,
      title: 'CCTV Monitoring',
      description: 'Advanced surveillance systems with 24/7 monitoring',
      image: '/assets/images/services/default.jpg'
    },
    {
      icon: <FaCar />,
      title: 'Mobile Patrol',
      description: 'Regular patrol services across multiple locations',
      image: '/assets/images/services/mobile-patrol.jpg.jpg'
    },
    {
      icon: <FaKey />,
      title: 'Access Control',
      description: 'Secure entry systems and visitor management',
      image: '/assets/images/services/default.jpg'
    },
    {
      icon: <FaUserSecret />,
      title: 'VIP Protection',
      description: 'Discreet personal security for high-profile individuals',
      image: '/assets/images/services/trained-personnel.jp.jpg'
    }
  ]), []);

  const getItemsPerSlide = useCallback(() => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  }, []);

  const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide);
  const slides = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < services.length; i += itemsPerSlide) {
      chunks.push(services.slice(i, i + itemsPerSlide));
    }
    return chunks;
  }, [services, itemsPerSlide]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length || 1;

  useEffect(() => {
    setCurrentSlide((prev) => Math.min(prev, totalSlides - 1));
  }, [totalSlides]);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getItemsPerSlide]);

  useEffect(() => {
    if (totalSlides <= 1) return undefined;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 6000);

    return () => clearInterval(timer);
  }, [totalSlides]);

  const goToSlide = (index) => {
    if (index === currentSlide) return;
    setCurrentSlide((prev) => {
      if (index < 0) return totalSlides - 1;
      if (index >= totalSlides) return 0;
      return index;
    });
  };

  return (
    <section className="services-section">
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">Our Security Services</p>
          <h2>Comprehensive Coverage For Every Mission</h2>
          <p>Premium guarding, technology, and intelligence delivered by trained professionals.</p>
        </div>

        <div className="services-slider">
          <button
            className="services-slider__arrow services-slider__arrow--prev"
            onClick={() => goToSlide(currentSlide - 1)}
            aria-label="Previous services"
          >
            ‹
          </button>

          <div className="services-slider__viewport">
            <div
              className="services-slider__track"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((group, slideIndex) => (
                <div className="services-slide" key={`slide-${slideIndex}`}>
                  {group.map((service, index) => (
                    <div key={service.title + index} className="service-card">
                      <div className="service-card__image">
                        <img
                          src={service.image}
                          alt={service.title}
                          onError={(e) => {
                            e.currentTarget.src = '/assets/images/services/default.jpg';
                          }}
                        />
                        <div className="service-card__overlay">
                          <div className="service-card__icon">{service.icon}</div>
                        </div>
                      </div>
                      <div className="service-card__content">
                        <span className="service-card__tag">Security Service</span>
                        <h3 className="service-card__title">{service.title}</h3>
                        <p className="service-card__description">{service.description}</p>
                        <Link to="/services" className="service-card__link">
                          Explore Service →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <button
            className="services-slider__arrow services-slider__arrow--next"
            onClick={() => goToSlide(currentSlide + 1)}
            aria-label="Next services"
          >
            ›
          </button>
        </div>

        <div className="services-slider__dots">
          {slides.map((_, idx) => (
            <button
              key={`dot-${idx}`}
              className={`dot ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(idx)}
              aria-label={`View slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="services-cta">
          <Link to="/services" className="btn btn-primary btn-lg">
            View Full Service Catalogue
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
