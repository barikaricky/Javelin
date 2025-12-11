import React, { useMemo } from 'react';
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
    },
    {
      icon: <FaBuilding />,
      title: 'Corporate Security',
      description: 'Comprehensive security solutions for businesses and offices',
    },
    {
      icon: <FaHome />,
      title: 'Residential Protection',
      description: 'Secure your home and family with our trained personnel',
    },
    {
      icon: <FaCalendarAlt />,
      title: 'Event Security',
      description: 'Professional crowd control and security for all events',
    },
    {
      icon: <FaVideo />,
      title: 'CCTV Monitoring',
      description: 'Advanced surveillance systems with 24/7 monitoring',
    },
    {
      icon: <FaCar />,
      title: 'Mobile Patrol',
      description: 'Regular patrol services across multiple locations',
    },
    {
      icon: <FaKey />,
      title: 'Access Control',
      description: 'Secure entry systems and visitor management',
    },
    {
      icon: <FaUserSecret />,
      title: 'VIP Protection',
      description: 'Discreet personal security for high-profile individuals',
    }
  ]), []);

  return (
    <section className="services-section">
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">Our Security Services</p>
          <h2>Comprehensive Coverage For Every Mission</h2>
          <p>Premium guarding, technology, and intelligence delivered by trained professionals.</p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-card__image">
                <div className="service-card__overlay">
                  <div className="service-card__icon">{service.icon}</div>
                </div>
              </div>
              <div className="service-card__content">
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__description">{service.description}</p>
                <Link to="/services" className="service-card__link">
                  Explore Service →
                </Link>
              </div>
            </div>
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
