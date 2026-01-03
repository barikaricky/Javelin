import React from 'react';
import { FaAward, FaUserTie, FaCertificate, FaShieldAlt, FaCheckCircle, FaBullseye, FaQuoteLeft } from 'react-icons/fa';
import CEOImage from '../images/CEO.jpg';
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

  const values = [
    {
      icon: <FaShieldAlt />,
      title: 'Reliability',
      description: 'Dependable protection you can trust 24/7'
    },
    {
      icon: <FaCheckCircle />,
      title: 'Professionalism',
      description: 'Military-grade training and discipline'
    },
    {
      icon: <FaBullseye />,
      title: 'Excellence',
      description: 'Committed to the highest service standards'
    }
  ];

  return (
    <section className="about-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Who We Are</span>
          <h2>About Javelin Associates</h2>
          <p className="section-subtitle">Your Trusted Partner in Professional Security Services</p>
        </div>

        <div className="about-content">
          {/* Main Text Content */}
          <div className="about-text">
            {/* CEO Section */}
            <div className="about-ceo">
              <div className="about-ceo__image">
                <img src={CEOImage} alt="CEO - Javelin Associates" />
                <div className="about-ceo__badge">
                  <FaAward />
                </div>
              </div>
              <div className="about-ceo__content">
                <div className="about-ceo__quote">
                  <FaQuoteLeft className="quote-icon" />
                  <p>
                    "Our commitment to excellence and integrity has made us a trusted name in security services across Nigeria. We don't just protect assets; we protect peace of mind."
                  </p>
                </div>
                <div className="about-ceo__info">
                  <h5>Chief Executive Officer</h5>
                  <p>Javelin Associates Ltd</p>
                </div>
              </div>
            </div>

            <div className="about-text__intro">
              <h3>Leading Security Services Provider in Nigeria</h3>
              <p>
                Javelin Associates Ltd is a premier security services provider in Nigeria, 
                delivering professional, reliable, and comprehensive security solutions to 
                businesses, residential estates, and organizations across the nation.
              </p>
            </div>

            <div className="about-text__details">
              <div className="about-detail-card">
                <h4>Who We Are</h4>
                <p>
                  Founded on principles of discipline, integrity, and excellence, we have grown 
                  to become one of the most trusted names in the security industry. Our team of 
                  highly trained security professionals operates with military-grade precision 
                  and dedication.
                </p>
              </div>

              <div className="about-detail-card">
                <h4>Our Mission</h4>
                <p>
                  To provide world-class security services that protect lives, assets, and 
                  ensure peace of mind for our clients through trained personnel, advanced 
                  technology, and unwavering commitment to safety.
                </p>
              </div>
            </div>

            {/* Core Values */}
            <div className="about-values">
              {values.map((value, index) => (
                <div key={index} className="value-item">
                  <div className="value-icon">{value.icon}</div>
                  <div className="value-content">
                    <h5>{value.title}</h5>
                    <p>{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
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
