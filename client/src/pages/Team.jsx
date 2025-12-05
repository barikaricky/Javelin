import React from 'react';
import SEOHead from '../components/SEO/SEOHead';
import TeamSection from '../components/home/TeamSection';
import './Team.css';

const Team = () => {
  return (
    <div className="team-page">
      <SEOHead 
        title="Our Team - Security Professionals Nigeria"
        description="Meet Javelin Associates leadership team. Our experienced security professionals bring 15+ years expertise in corporate security, VIP protection & security management across Nigeria."
        keywords="security team Nigeria, security professionals Lagos, security leadership Abuja, security experts Nigeria, Javelin Associates team, security management Nigeria"
        url="/team"
      />
      <section className="team-page-hero">
        <div className="container">
          <h1>Our Leadership Team</h1>
          <p>Meet the professionals behind Javelin Associates' success</p>
        </div>
      </section>

      <TeamSection />
    </div>
  );
};

export default Team;
