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
      icon: <FaBuilding />,
      title: 'Corporate Security',
      category: 'corporate',
      description: 'Protect your offices, banks, and commercial spaces with trained officers, visible deterrence, and rapid response support.',
      features: [
        'Professional uniformed security officers',
        'Access control and visitor screening',
        '24/7 monitoring and incident response',
        'Tailored site protection plans'
      ],
      price: '₦150,000/month',
      duration: 'Start with a quick consultation and get a custom protection plan for your business.',
      popular: true
    },
    {
      icon: <FaHome />,
      title: 'Residential Security',
      category: 'residential',
      description: 'Keep your home, family, and estate safe with dependable guard coverage, gate control, and a reassuring presence.',
      features: [
        '24/7 residential guard coverage',
        'Gatehouse and perimeter support',
        'Visitor management and patrol reporting',
        'Fast response for emergencies'
      ],
      price: '₦100,000/month',
      duration: 'Perfect for homes, estates, and private residences that need reliable protection.',
      popular: false
    },
    {
      icon: <FaUserShield />,
      title: 'K-9 Security',
      category: 'k9',
      description: 'Use trained canine teams for enhanced detection, high-security patrols, and rapid intervention at sensitive locations.',
      features: [
        'High-alert detection support',
        'Rapid response for critical sites',
        'Patrol reinforcement for secure compounds',
        'Professional handler-led operations'
      ],
      price: '₦200,000/service',
      duration: 'Ideal for high-risk areas, warehouse inspections, and premium security operations.',
      popular: false
    },
    {
      icon: <FaShieldAlt />,
      title: 'Industrial/Safety Security',
      category: 'industrial',
      description: 'Safeguard factories, warehouses, and industrial facilities with safety-focused security planning and trained personnel.',
      features: [
        'Perimeter and asset protection',
        'Fire watch and safety patrols',
        'Compliance-driven site supervision',
        'Professional incident reporting'
      ],
      price: '₦150,000/month',
      duration: 'Built for high-value sites that need dependable protection and clear safety oversight.',
      popular: false
    },
    {
      icon: <FaCalendarAlt />,
      title: 'Event Security',
      category: 'event',
      description: 'Make every event feel secure and well-managed with crowd control, access monitoring, and fast incident response.',
      features: [
        'Crowd management and guest control',
        'Entry/exit screening and access support',
        'VIP protection and response planning',
        'Professional event security coordination'
      ],
      price: 'Request for quote',
      duration: 'Book a consultation and we will tailor the security plan to your venue and guest list.',
      popular: false
    },
    {
      icon: <FaCar />,
      title: 'Mobile Patrol/Escort Security',
      category: 'patrol',
      description: 'Keep your property and movements protected with scheduled patrols, vehicle escort, and responsive support.',
      features: [
        'Scheduled and random patrol checks',
        'Vehicle escort and mobility support',
        'Rapid incident response',
        'Visible deterrence for every route'
      ],
      price: 'Request for quote',
      duration: 'Great for sites that need flexible coverage, visibility, and quick response.',
      popular: true
    },
    {
      icon: <FaUserSecret />,
      title: 'VIP/Executive Protection',
      category: 'vip',
      description: 'Protect executives, dignitaries, and high-profile guests with discreet, professional close protection.',
      features: [
        'Close protection officers',
        'Route planning and threat awareness',
        'Advance coordination for sensitive visits',
        'Confidential and professional service'
      ],
      price: 'Request for quote',
      duration: 'Tell us your schedule and risk level, and we will prepare a secure plan for you.',
      popular: false
    },
    {
      icon: <FaVideo />,
      title: 'CCTV Monitoring',
      category: 'technology',
      description: 'Monitor your premises in real time with smart surveillance, motion alerts, and professional support.',
      features: [
        'HD camera installation and monitoring',
        'Motion alerts and live alerts',
        'Remote observation and recording',
        'Fast response coordination'
      ],
      price: 'Request for quote',
      duration: 'Perfect for homes, offices, retail spaces, and remote facilities that need 24/7 oversight.',
      popular: false
    },
    {
      icon: <FaKey />,
      title: 'Access Control Systems',
      category: 'technology',
      description: 'Strengthen your entry points with biometric access, key card systems, and secure visitor management.',
      features: [
        'Biometric and card-based access',
        'Visitor registration and logging',
        'Integration with CCTV and alarms',
        'Easy management for staff and guests'
      ],
      price: 'Request for quote',
      duration: 'Book a consultation to design the right access solution for your property.',
      popular: false
    },
    {
      icon: <FaUsers />,
      title: 'Security Consulting',
      category: 'consulting',
      description: 'Get expert security audits, risk assessment, and practical recommendations that improve safety and confidence.',
      features: [
        'Vulnerability and risk assessment',
        'Security planning and policy review',
        'Training programs and compliance support',
        'Actionable recommendations for better protection'
      ],
      price: 'Request for quote',
      duration: 'Start with a consultation and we will recommend the best security approach for your needs.',
      popular: false
    }
  ];

  const categories = [
    { value: 'all', label: 'All Services' },
    { value: 'corporate', label: 'Corporate Security' },
    { value: 'residential', label: 'Residential Security' },
    { value: 'k9', label: 'K-9 Security' },
    { value: 'industrial', label: 'Industrial/Safety Security' },
    { value: 'event', label: 'Event Security' },
    { value: 'patrol', label: 'Mobile Patrol/Escort Security' },
    { value: 'vip', label: 'VIP/Executive Protection' },
    { value: 'technology', label: 'CCTV & Access Control' },
    { value: 'consulting', label: 'Security Consulting' }
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
      {/* Hero Section */}
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
                  <span className="price-label">{service.price}</span>
                  <span className="price-note">{service.duration}</span>
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
