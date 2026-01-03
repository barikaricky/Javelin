import React from 'react';
import SEO from '../components/common/SEO';
import AboutSection from '../components/home/AboutSection';
import TeamSection from '../components/home/TeamSection';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <SEO 
        title="About Javelin Associates - Leading Security Company in Rivers State Since Establishment"
        description="Learn about Javelin Associates Ltd, Rivers State's premier security company. With years of experience, professional security personnel, and 24/7 operations, we provide trusted security solutions across Nigeria. Licensed, reliable, and committed to protecting what matters most."
        keywords="about Javelin Associates, Javelin security company, security company history Nigeria, professional security team, licensed security company Rivers State, trusted security Nigeria, security company Port Harcourt about"
        url="/#/about"
      />
      <section className="about-page-hero">
        <div className="container">
          <h1>About Javelin Associates Ltd - Premier Security Company in Rivers State, Nigeria</h1>
          <p>Nigeria's Leading Professional Security Services Provider Since Establishment</p>
        </div>
      </section>

      <AboutSection />
      <TeamSection />
    </div>
  );
};

export default About;
