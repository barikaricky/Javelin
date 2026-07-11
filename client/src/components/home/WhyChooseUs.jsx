import React, { useState, useEffect, useRef } from 'react';
import { 
  FaCheckCircle, 
  FaClock, 
  FaGraduationCap, 
  FaBolt, 
  FaClipboardCheck, 
  FaHardHat,
  FaShieldAlt,
  FaStar,
  FaArrowRight
} from 'react-icons/fa';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  const reasons = [
    {
      icon: <FaCheckCircle />,
      title: 'Verified Guards',
      description: 'All personnel undergo thorough background checks, drug testing, and verification before deployment to any client site.',
      stat: '100%',
      statLabel: 'Vetted'
    },
    {
      icon: <FaClock />,
      title: '24/7 Monitoring',
      description: 'Round-the-clock surveillance, patrol tracking, and rapid response capabilities across all operational zones.',
      stat: '24/7',
      statLabel: 'Coverage'
    },
    {
      icon: <FaGraduationCap />,
      title: 'Professional Training',
      description: 'ISO 18788 certified training programs including fire safety, first aid, conflict resolution, and HSE compliance.',
      stat: 'ISO',
      statLabel: '18788'
    },
    {
      icon: <FaBolt />,
      title: 'Emergency Response',
      description: 'Rapid deployment within 4-6 hours for emergencies. Immediate action and coordination with relevant authorities.',
      stat: '< 4hrs',
      statLabel: 'Response'
    },
    {
      icon: <FaClipboardCheck />,
      title: 'Discipline & Reporting',
      description: 'Detailed incident reports, GPS-tracked patrols, daily logs, and a structured chain of command built on accountability.',
      stat: 'Daily',
      statLabel: 'Reports'
    },
    {
      icon: <FaHardHat />,
      title: 'HSE Compliant',
      description: 'Full compliance with Health, Safety, and Environmental standards. Regular audits and continuous improvement protocols.',
      stat: '100%',
      statLabel: 'Compliant'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          reasons.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards(prev => [...prev, index]);
            }, index * 150);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="why-choose-us" ref={sectionRef}>
      {/* Background decorative elements */}
      <div className="wcu-bg-pattern"></div>
      <div className="wcu-bg-glow"></div>
      
      <div className="container">
        <div className="wcu-header">
          <div className="wcu-badge">
            <FaShieldAlt />
            <span>Why Choose Us</span>
          </div>
          <h2 className="wcu-title">
            Why Choose <span className="wcu-highlight">Javelin Associates</span>
          </h2>
          <p className="wcu-subtitle">
            Nigeria's trusted security partner delivering excellence, 
            reliability, and peace of mind since establishment
          </p>
          <div className="wcu-title-decoration">
            <span></span>
            <FaStar className="wcu-star" />
            <span></span>
          </div>
        </div>

        <div className="reasons-grid">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className={`reason-card ${visibleCards.includes(index) ? 'reason-card--visible' : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="reason-card__number">{String(index + 1).padStart(2, '0')}</div>
              <div className="reason-card__icon-wrapper">
                <div className="reason-card__icon">{reason.icon}</div>
                <div className="reason-card__icon-ring"></div>
              </div>
              <h3 className="reason-card__title">{reason.title}</h3>
              <p className="reason-card__description">{reason.description}</p>
              <div className="reason-card__stat">
                <span className="stat-value">{reason.stat}</span>
                <span className="stat-label">{reason.statLabel}</span>
              </div>
              <div className="reason-card__line"></div>
            </div>
          ))}
        </div>

        <div className="wcu-cta">
          <p className="wcu-cta-text">Ready to experience premium security services?</p>
          <a href="#/contact" className="wcu-cta-btn">
            Get Started Today
            <FaArrowRight className="cta-arrow" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
