import React from 'react';
import SEOHead from '../components/SEO/SEOHead';
import AboutSection from '../components/home/AboutSection';
import TeamSection from '../components/home/TeamSection';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <SEOHead 
        title="About Us - Leading Security Company Nigeria"
        description="Learn about Javelin Associates - 15+ years of excellence in security services Nigeria. Our professional team provides armed guards, corporate security & VIP protection across Lagos, Abuja & Port Harcourt."
        keywords="about Javelin Associates, security company history Nigeria, professional security team Lagos, best security firm Abuja, trusted security agency Nigeria"
        url="/about"
      />
      <section className="about-page-hero">
        <div className="container">
          <h1>About Javelin Associates</h1>
          <p>Nigeria's Premier Security Services Provider</p>
        </div>
      </section>

      <AboutSection />
      <TeamSection />
    </div>
  );
};

export default About;
