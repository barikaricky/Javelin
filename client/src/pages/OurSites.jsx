import React from 'react';
import SEOHead from '../components/SEO/SEOHead';
import SitesSection from '../components/home/SitesSection';

const OurSites = () => {
  return (
    <div className="our-sites">
      <SEOHead 
        title="Our Security Locations Nigeria - Client Sites"
        description="View Javelin Associates security client locations across Nigeria. We provide professional security services at corporate offices, banks, hotels, estates, factories & government facilities in Lagos, Abuja, Port Harcourt."
        keywords="security locations Nigeria, protected sites Lagos, security client list, corporate security locations Abuja, security coverage areas Nigeria, guarded facilities Lagos"
        url="/sites"
      />
      <section style={{ padding: '4rem 0', background: 'linear-gradient(135deg, #003A67 0%, #005599 100%)', color: '#fff' }}>
        <div className="container">
          <h1 className="text-center" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Our Protected Sites</h1>
          <p className="text-center" style={{ fontSize: '1.2rem', opacity: 0.9 }}>Trusted by leading organizations across Nigeria</p>
        </div>
      </section>
      <SitesSection />
    </div>
  );
};

export default OurSites;
