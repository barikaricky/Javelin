import React from 'react';
import AboutSection from '../components/home/AboutSection';
import TeamSection from '../components/home/TeamSection';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
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
