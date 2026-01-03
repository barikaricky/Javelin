import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { 
  FaUserShield, 
  FaBuilding, 
  FaHome, 
  FaCalendarAlt, 
  FaVideo, 
  FaCar,
  FaKey,
  FaUserSecret,
  FaShieldAlt,
  FaUsers,
  FaCheckCircle,
  FaArrowRight
} from 'react-icons/fa';
import './Services.css';

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const services = [
    {
      icon: <FaUserShield />,
      title: 'Private Guard Services',
      category: 'private',
      description: 'Professional security guards for personal protection and residential estates',
      features: [
        'Background-verified personnel',
        '24/7 availability',
        'Emergency response training',
        'Detailed reporting'
      ],
      price: '120,000',
      duration: 'per guard/month',
      popular: false
    },
    {
      icon: <FaBuilding />,
      title: 'Corporate Security',
      category: 'corporate',
      description: 'Comprehensive security solutions for offices, banks, and commercial buildings',
      features: [
        'Access control management',
        'Visitor screening',
        'CCTV monitoring',
        'Security team coordination'
      ],
      price: '120,000',
      duration: 'per location/month',
      popular: true
    },
    {
      icon: <FaHome />,
      title: 'Residential Protection',
      category: 'private',
      description: 'Secure your home and family with trained residential security guards',
      features: [
        'Gate and perimeter security',
        'Patrol services',
        'Package screening',
        'Visitor log management'
      ],
      price: '120,000',
      duration: 'per residence/month',
      popular: false
    },
    {
      icon: <FaCalendarAlt />,
      title: 'Event Security',
      category: 'event',
      description: 'Professional crowd control and security management for all event types',
      features: [
        'Crowd management',
        'VIP protection',
        'Entry/exit control',
        'Emergency evacuation planning'
      ],
      price: '120,000',
      duration: 'per event',
      popular: false
    },
    {
      icon: <FaVideo />,
      title: 'CCTV Monitoring',
      category: 'technology',
      description: 'Advanced 24/7 surveillance with real-time monitoring and recording',
      features: [
        'HD camera installation',
        'Remote monitoring',
        'Motion detection alerts',
        'Cloud storage backup'
      ],
      price: '12,000',
      duration: 'setup + monthly fee',
      popular: false
    },
    {
      icon: <FaCar />,
      title: 'Mobile Patrol',
      category: 'patrol',
      description: 'Regular patrol services across multiple locations and facilities',
      features: [
        'Scheduled patrols',
        'Random security checks',
        'Incident response',
        'GPS tracking'
      ],
      duration: 'per route/month',
      popular: true
    },
    {
      icon: <FaKey />,
      title: 'Access Control Systems',
      category: 'technology',
      description: 'Electronic access control and visitor management solutions',
      features: [
        'Biometric systems',
        'Key card management',
        'Visitor registration',
        'Integration with CCTV'
      ],
      price: '120,000',
      duration: 'installation + monthly',
      popular: false
    },
    {
      icon: <FaUserSecret />,
      title: 'VIP/Executive Protection',
      category: 'vip',
      description: 'Discreet personal security for high-profile individuals and executives',
      features: [
        'Close protection officers',
        'Route planning',
        'Threat assessment',
        'Advance security coordination'
      ],
      price: '800,000',
      duration: 'per principal/month',
      popular: false
    },
    {
      icon: <FaShieldAlt />,
      title: 'Industrial Security',
      category: 'corporate',
      description: 'Specialized security for factories, warehouses, and industrial facilities',
      features: [
        'Perimeter security',
        'Asset protection',
        'Fire watch services',
        'Safety compliance'
      ],
      price: '120,000',
      duration: 'per facility/month',
      popular: false
    },
    {
      icon: <FaUsers />,
      title: 'Security Consulting',
      category: 'consulting',
      description: 'Professional security audits and risk assessment services',
      features: [
        'Vulnerability assessment',
        'Security planning',
        'Training programs',
        'Compliance review'
      ],
      price: '150,000',
      duration: 'per project',
      popular: false
    }
  ];

  const categories = [
    { value: 'all', label: 'All Services' },
    { value: 'private', label: 'Private Security' },
    { value: 'corporate', label: 'Corporate Security' },
    { value: 'technology', label: 'Technology' },
    { value: 'patrol', label: 'Patrol Services' },
    { value: 'vip', label: 'VIP Protection' },
    { value: 'event', label: 'Event Security' },
    { value: 'consulting', label: 'Consulting' }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="services-page">
      <SEO 
        title="Security Services in Rivers State, Nigeria - Armed Guards, K-9 Units, CCTV Surveillance"
        description="Comprehensive security services in Port Harcourt and Rivers State: Armed security guards, unarmed personnel, K-9 units, CCTV installation, mobile patrol, event security, corporate security, and residential protection. Professional, licensed, and affordable security solutions."
        keywords="armed security guards Nigeria, unarmed security guards, K-9 security services Nigeria, CCTV installation Port Harcourt, mobile patrol services, event security Nigeria, corporate security Rivers State, residential security Nigeria, security guard services, bodyguard services, access control Nigeria, security company services"
        url="/#/services"
      />
      {/* Hero Section */}}
      <section className="services-hero">
        <div className="container">
          <h1>Our Security Services</h1>
          <p>Professional protection solutions tailored to your needs</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="services-filter">
        <div className="container">
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category.value}
                className={`filter-btn ${selectedCategory === category.value ? 'filter-btn--active' : ''}`}
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-content">
        <div className="container">
          <div className="services-grid-page">
            {filteredServices.map((service, index) => (
              <div 
                key={index} 
                className={`service-card-page ${service.popular ? 'service-card-page--popular' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {service.popular && (
                  <div className="service-badge">Most Popular</div>
                )}
                
                <div className="service-card-page__icon">
                  {service.icon}
                </div>
                
                <h3 className="service-card-page__title">{service.title}</h3>
                <p className="service-card-page__description">{service.description}</p>
                
                <div className="service-card-page__price">
                  <span className="price-currency">₦</span>
                  <span className="price-amount">{service.price}</span>
                  <span className="price-duration">/{service.duration}</span>
                </div>

                <ul className="service-card-page__features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <FaCheckCircle className="feature-icon" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link to="/book-meeting" className="btn btn-primary btn-block">
                  Request Quote <FaArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta">
        <div className="container">
          <div className="cta-card">
            <h2>Need a Custom Security Solution?</h2>
            <p>Contact us for a personalized quote tailored to your specific security needs</p>
            <div className="cta-buttons">
              <Link to="/book-meeting" className="btn btn-primary btn-lg">
                Get Custom Quote
              </Link>
              <Link to="/recruitment" className="btn btn-outline btn-lg">
                Join Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
