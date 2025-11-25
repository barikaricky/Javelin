import React from 'react';
import { FaAward, FaUserTie, FaCertificate } from 'react-icons/fa';
import './AboutSection.css';

const AboutSection = () => {
  const stats = [
    {
      icon: <FaAward />,
      number: '15+',
      label: 'Years Experience',
      description: 'Serving Nigeria with excellence'
    },
    {
      icon: <FaUserTie />,
      number: '500+',
      label: 'Trained Guards',
      description: 'Professional security operatives'
    },
    {
      icon: <FaCertificate />,
      number: '100%',
      label: 'Certified Operations',
      description: 'HSE compliant and verified'
    }
  ];

  return (
    <section className="about-section">
      <div className="container">
        <div className="section-header">
          <h2>About Javelin Associates</h2>
          <p>Your Trusted Partner in Professional Security Services</p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <h3>Who We Are</h3>
            <p>
              Javelin Associates Ltd is a leading security services provider in Nigeria, 
              delivering professional, reliable, and comprehensive security solutions to 
              businesses, residential estates, and organizations across the nation.
            </p>
            <p>
              Founded on principles of discipline, integrity, and excellence, we have grown 
              to become one of the most trusted names in the security industry. Our team of 
              highly trained security professionals operates with military-grade precision 
              and dedication.
            </p>
            <h3 className="mt-4">Our Mission</h3>
            <p>
              To provide world-class security services that protect lives, assets, and 
              ensure peace of mind for our clients through trained personnel, advanced 
              technology, and unwavering commitment to safety.
            </p>
          </div>

          <div className="about-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-description">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
