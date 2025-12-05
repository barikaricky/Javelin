import React from 'react';
import SEOHead from '../components/SEO/SEOHead';
import GallerySection from '../components/home/GallerySection';
import './Gallery.css';

const Gallery = () => {
  return (
    <div className="gallery-page">
      <SEOHead 
        title="Security Gallery - Professional Guards Nigeria"
        description="View our gallery of professional security operations in Nigeria. See Javelin Associates security guards, VIP protection, corporate security & event security services in Lagos, Abuja & Port Harcourt."
        keywords="security gallery Nigeria, security guards photos Lagos, professional security team Nigeria, VIP protection images, corporate security pictures Abuja, event security photos Nigeria"
        url="/gallery"
      />
      <section className="gallery-page-hero">
        <div className="container">
          <h1>Our Gallery</h1>
          <p>Witness our professional security operations in action</p>
        </div>
      </section>

      <GallerySection />
    </div>
  );
};

export default Gallery;
