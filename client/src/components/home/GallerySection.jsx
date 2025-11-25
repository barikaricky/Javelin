import React, { useState } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand } from 'react-icons/fa';
import { GALLERY_IMAGES } from '../../utils/imageHelper';
import './GallerySection.css';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setSelectedImage(GALLERY_IMAGES[index]);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % GALLERY_IMAGES.length;
    setCurrentIndex(newIndex);
    setSelectedImage(GALLERY_IMAGES[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    setCurrentIndex(newIndex);
    setSelectedImage(GALLERY_IMAGES[newIndex]);
  };

  const galleryItems = [
    { image: GALLERY_IMAGES[0], title: 'Professional Guard on Duty', category: 'Personnel' },
    { image: GALLERY_IMAGES[1], title: 'Corporate Security Team', category: 'Corporate' },
    { image: GALLERY_IMAGES[2], title: 'Trained Security Personnel', category: 'Training' },
    { image: GALLERY_IMAGES[3], title: 'Event Security Service', category: 'Events' },
    { image: GALLERY_IMAGES[4], title: 'Mobile Patrol Unit', category: 'Patrol' },
    { image: GALLERY_IMAGES[5], title: 'Security Operations', category: 'Operations' },
  ];

  return (
    <section className="gallery-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Work in Action</h2>
          <p>See our professional security team protecting what matters most</p>
        </div>

        <div className="gallery-grid">
          {galleryItems.map((item, index) => (
            <div key={index} className="gallery-item" onClick={() => openLightbox(index)}>
              <div className="gallery-item__image">
                <img src={item.image} alt={item.title} />
                <div className="gallery-item__overlay">
                  <FaExpand className="gallery-item__icon" />
                  <div className="gallery-item__info">
                    <span className="gallery-item__category">{item.category}</span>
                    <h3 className="gallery-item__title">{item.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox__close" onClick={closeLightbox}>
            <FaTimes />
          </button>
          
          <button className="lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
            <FaChevronLeft />
          </button>
          
          <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Gallery" />
            <div className="lightbox__counter">
              {currentIndex + 1} / {GALLERY_IMAGES.length}
            </div>
          </div>
          
          <button className="lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
            <FaChevronRight />
          </button>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
