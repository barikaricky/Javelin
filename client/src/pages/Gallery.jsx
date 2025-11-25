import React from 'react';
import GallerySection from '../components/home/GallerySection';
import './Gallery.css';

const Gallery = () => {
  return (
    <div className="gallery-page">
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
