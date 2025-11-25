import React from 'react';

const Home = () => {
  return (
    <div className="home">
      <section className="hero bg-blue" style={{ padding: '5rem 0', textAlign: 'center', color: 'white' }}>
        <div className="container">
          <h1>Professional Security Services</h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
            Trusted. Trained. Reliable.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/services" className="btn btn-primary">Our Services</a>
            <a href="/recruitment" className="btn btn-secondary">Join Our Team</a>
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <h2 className="text-center">Welcome to Javelin Associates</h2>
          <p className="text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
            Leading provider of professional security services across Nigeria. 
            Our trained and certified guards ensure the safety of your assets 24/7.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
