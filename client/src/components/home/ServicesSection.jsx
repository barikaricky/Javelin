import React, { useMemo, useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUserShield,
  FaBuilding,
  FaHome,
  FaCalendarAlt,
  FaVideo,
  FaCar,
  FaKey,
  FaUserSecret,
  FaArrowRight
} from 'react-icons/fa';
import './ServicesSection.css';

const ServicesSection = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const gridRef = useRef(null);

  const services = useMemo(() => ([
    {
      icon: <FaUserShield />,
      title: 'Manned Guarding',
      description: 'Professional security guards stationed at your premises 24/7 with rigorous training standards.',
      num: '01'
    },
    {
      icon: <FaBuilding />,
      title: 'Corporate Security',
      description: 'Comprehensive security solutions for businesses, banks, and commercial offices.',
      num: '02'
    },
    {
      icon: <FaHome />,
      title: 'Residential Protection',
      description: 'Secure your home and family with our highly trained residential personnel.',
      num: '03'
    },
    {
      icon: <FaCalendarAlt />,
      title: 'Event Security',
      description: 'Professional crowd control and VIP protection for all event types.',
      num: '04'
    },
    {
      icon: <FaVideo />,
      title: 'CCTV Monitoring',
      description: 'Advanced 24/7 surveillance systems with real-time monitoring and alerts.',
      num: '05'
    },
    {
      icon: <FaCar />,
      title: 'Mobile Patrol',
      description: 'Regular GPS-tracked patrol services across multiple locations.',
      num: '06'
    },
    {
      icon: <FaKey />,
      title: 'Access Control',
      description: 'Biometric entry systems and comprehensive visitor management.',
      num: '07'
    },
    {
      icon: <FaUserSecret />,
      title: 'VIP Protection',
      description: 'Discreet close protection for high-profile individuals and executives.',
      num: '08'
    }
  ]), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    const cards = gridRef.current?.querySelectorAll('.service-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="services-section">
      {/* Decorative background elements */}
      <div className="services-bg-pattern" />

      <div className="container">
        <div className="services-section__header">
          <span className="services-eyebrow">Our Security Services</span>
          <h2>Comprehensive Coverage For Every Mission</h2>
          <p>Premium guarding, technology, and intelligence delivered by trained professionals.</p>
          <div className="services-header__line" />
        </div>

        <div className="services-grid" ref={gridRef}>
          {services.map((service, index) => (
            <div
              key={index}
              data-index={index}
              className={`service-card ${visibleCards.includes(index) ? 'service-card--visible' : ''}`}
              style={{ transitionDelay: `${index * 0.08}s` }}
            >
              <span className="service-card__num">{service.num}</span>
              <div className="service-card__icon-wrap">
                <div className="service-card__icon">{service.icon}</div>
              </div>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__description">{service.description}</p>
              <Link to="/book-meeting" className="service-card__cta">
                Request for Quote <FaArrowRight />
              </Link>
            </div>
          ))}
        </div>

        <div className="services-cta">
          <Link to="/services" className="btn btn-primary btn-lg services-cta__btn">
            View Full Service Catalogue <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
