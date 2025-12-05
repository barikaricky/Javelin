import React from 'react';
import { FaUserShield } from 'react-icons/fa';
import SEOHead from '../components/SEO/SEOHead';
import ApplicationForm from '../components/recruitment/ApplicationForm';
import './Recruitment.css';

const Recruitment = () => {
  return (
    <div className="recruitment-page">
      <SEOHead 
        title="Security Guard Jobs Nigeria - Join Javelin Associates"
        description="Looking for security guard jobs in Nigeria? Join Javelin Associates! We're hiring professional security guards in Lagos, Abuja, Port Harcourt. Competitive salary, training, career growth. Apply now!"
        keywords="security guard jobs Nigeria, security jobs Lagos, guard recruitment Abuja, security careers Nigeria, security guard vacancies, private security jobs Lagos, armed guard positions Nigeria, security company hiring"
        url="/recruitment"
      />
      {/* Hero Section */}
      <section className="recruitment-hero">
        <div className="recruitment-hero__overlay"></div>
        <div className="container">
          <div className="recruitment-hero__content">
            <FaUserShield className="recruitment-hero__icon" />
            <h1>Join Our Elite Security Team</h1>
            <p>Become part of Nigeria's leading security services provider</p>
            <div className="recruitment-hero__badges">
              <span className="badge badge-yellow">Competitive Salary</span>
              <span className="badge badge-green">Professional Training</span>
              <span className="badge badge-blue">Career Growth</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="recruitment-benefits">
        <div className="container">
          <h2 className="text-center mb-4">Why Join Javelin Associates?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-card__icon">💰</div>
              <h3>Competitive Pay</h3>
              <p>Attractive salary packages with regular increments and bonuses</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-card__icon">🎓</div>
              <h3>Professional Training</h3>
              <p>Comprehensive training programs and skill development workshops</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-card__icon">🏥</div>
              <h3>Health Insurance</h3>
              <p>Medical coverage for you and your immediate family</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-card__icon">📈</div>
              <h3>Career Advancement</h3>
              <p>Clear promotion path from Guard to Supervisor to Manager</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-card__icon">👔</div>
              <h3>Uniform Allowance</h3>
              <p>Provided uniforms and equipment at no cost</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-card__icon">🎯</div>
              <h3>Job Security</h3>
              <p>Stable employment with one of Nigeria's top security firms</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="recruitment-form-section">
        <div className="container">
          <ApplicationForm />
        </div>
      </section>
    </div>
  );
};

export default Recruitment;
