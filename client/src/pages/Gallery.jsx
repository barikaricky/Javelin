import React from 'react';
import SEO from '../components/common/SEO';
import GallerySection from '../components/home/GallerySection';
import './Gallery.css';

const Gallery = () => {
  return (
    <div className="gallery-page">
      <SEO 
        title="Security Operations Gallery - Javelin Associates Professional Security Team in Action"
        description="View photos of Javelin Associates' professional security operations in Rivers State, Nigeria. See our armed guards, K-9 units, mobile patrol, CCTV installations, and security personnel in action protecting clients across Nigeria."
        keywords="security company photos Nigeria, security guards images, K-9 security photos, security operations gallery, professional security team, armed guards Nigeria, security company gallery Rivers State"
        url="/#/gallery"
      />
      <section className="gallery-page-hero">
        <div className="container">
          <h1>Security Operations Gallery - Professional Security in Action</h1>
          <p>Witness our elite security operations and professional team serving Rivers State and Nigeria</p>
        </div>
      </section>

      <GallerySection />
    </div>
  );
};

export default Gallery;
