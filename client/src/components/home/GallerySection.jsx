import React, { useState, useEffect } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand } from 'react-icons/fa';
import { GALLERY_IMAGES } from '../../utils/imageHelper';
import { apiGet } from '../../services/api';
import './GallerySection.css';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default gallery items as fallback
  const defaultGalleryItems = [
    { image: GALLERY_IMAGES[0], title: 'Professional Guard on Duty', category: 'Personnel' },
    { image: GALLERY_IMAGES[1], title: 'Corporate Security Team', category: 'Corporate' },
    { image: GALLERY_IMAGES[2], title: 'Trained Security Personnel', category: 'Training' },
    { image: GALLERY_IMAGES[3], title: 'Event Security Service', category: 'Events' },
    { image: GALLERY_IMAGES[4], title: 'Mobile Patrol Unit', category: 'Patrol' },
    { image: GALLERY_IMAGES[5], title: 'Security Operations', category: 'Operations' },
  ];

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await apiGet('/gallery');
        if (response.success && response.data && response.data.length > 0) {
          const mappedGallery = response.data
            .filter(item => item.isPublished !== false)
            .map((item, idx) => {
              // Handle different image URL formats
              let imageUrl = item.imageUrl || item.image;
              
              // If it's a relative path from server uploads, prepend the API URL
              if (imageUrl && imageUrl.startsWith('/uploads/')) {
                const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:5000';
                imageUrl = `${apiBase}${imageUrl}`;
              }
              
              // Fallback to placeholder if no image
              if (!imageUrl) {
                imageUrl = GALLERY_IMAGES[idx % GALLERY_IMAGES.length];
              }
              
              return {
                _id: item._id,
                image: imageUrl,
                title: item.title || 'Gallery Image',
                category: item.category || 'General'
              };
            });
          setGalleryItems(mappedGallery.length > 0 ? mappedGallery : defaultGalleryItems);
        } else {
          setGalleryItems(defaultGalleryItems);
        }
      } catch (error) {
        console.error('Error fetching gallery:', error);
        setGalleryItems(defaultGalleryItems);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const openLightbox = (index) => {
    setSelectedImage(galleryItems[index]);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % galleryItems.length;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryItems[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryItems[newIndex]);
  };

  if (loading) {
    return (
      <section className="gallery-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Work in Action</h2>
            <p>Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="gallery-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Work in Action</h2>
          <p>See our professional security team protecting what matters most</p>
        </div>

        <div className="gallery-grid">
          {galleryItems.map((item, index) => (
            <div key={item._id || index} className="gallery-item" onClick={() => openLightbox(index)}>
              <div className="gallery-item__image">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = GALLERY_IMAGES[index % GALLERY_IMAGES.length] || '/assets/images/placeholders/gallery-placeholder.jpg';
                  }}
                />
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
            <img src={selectedImage.image} alt={selectedImage.title} />
            <div className="lightbox__counter">
              {currentIndex + 1} / {galleryItems.length}
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
