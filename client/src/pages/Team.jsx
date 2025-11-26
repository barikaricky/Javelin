import React from 'react';
import TeamSection from '../components/home/TeamSection';
import './Team.css';

const Team = () => {
  return (
    <div className="team-page">
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
