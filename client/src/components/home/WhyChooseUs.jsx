import React from 'react';
import { 
  FaCheckCircle, 
  FaClock, 
  FaGraduationCap, 
  FaBolt, 
  FaClipboardCheck, 
  FaHardHat 
} from 'react-icons/fa';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <FaCheckCircle />,
      title: 'Verified Guards',
      description: 'All personnel undergo thorough background checks and verification'
    },
    {
      icon: <FaClock />,
      title: '24/7 Monitoring',
      description: 'Round-the-clock surveillance and rapid response capabilities'
    },
    {
      icon: <FaGraduationCap />,
      title: 'Professional Training',
      description: 'Military-grade training programs for all security operatives'
    },
    {
      icon: <FaBolt />,
      title: 'Emergency Response',
      description: 'Immediate action and coordination with relevant authorities'
    },
    {
      icon: <FaClipboardCheck />,
      title: 'Discipline & Reporting',
      description: 'Detailed incident reports and structured chain of command'
    },
    {
      icon: <FaHardHat />,
      title: 'HSE Compliant',
      description: 'Full compliance with Health, Safety, and Environmental standards'
    }
  ];

  return (
    <section className="why-choose-us">
      <div className="container">
        <div className="section-header section-header--light">
          <h2>Why Choose Javelin Associates</h2>
          <p>Excellence in security, reliability in service</p>
        </div>

        <div className="reasons-grid">
          {reasons.map((reason, index) => (
            <div key={index} className="reason-card">
              <div className="reason-card__icon">{reason.icon}</div>
              <h3 className="reason-card__title">{reason.title}</h3>
              <p className="reason-card__description">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
