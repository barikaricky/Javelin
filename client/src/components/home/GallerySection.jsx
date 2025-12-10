import React, { useState, useEffect } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand } from 'react-icons/fa';
import { GALLERY_IMAGES } from '../../utils/imageHelper';
import { galleryAPI } from '../../services/api';
import './GallerySection.css';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback gallery items
  const fallbackGalleryItems = [
    { image: GALLERY_IMAGES[0], title: 'Professional Guard on Duty', category: 'Personnel' },
    { image: GALLERY_IMAGES[1], title: 'Corporate Security Team', category: 'Corporate' },
    { image: GALLERY_IMAGES[2], title: 'Trained Security Personnel', category: 'Training' },
    { image: GALLERY_IMAGES[3], title: 'Event Security Service', category: 'Events' },
    { image: GALLERY_IMAGES[4], title: 'Mobile Patrol Unit', category: 'Patrol' },
    { image: GALLERY_IMAGES[5], title: 'Security Operations', category: 'Operations' },
  ];

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await galleryAPI.getAll();
      if (response.data && response.data.length > 0) {
        // Transform API data to match component structure
        const transformedData = response.data.map(item => ({
          _id: item._id,
          image: item.image,
          title: item.title,
          category: item.category
        }));
        setGalleryItems(transformedData);
      } else {
        setGalleryItems(fallbackGalleryItems);
      }
    } catch (error) {
      console.error('Error fetching gallery:', error);
      setGalleryItems(fallbackGalleryItems);
    } finally {
      setLoading(false);
    }
  };

  const displayGallery = galleryItems.length > 0 ? galleryItems : fallbackGalleryItems;

  const openLightbox = (index) => {
    setSelectedImage(displayGallery[index]?.image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % displayGallery.length;
    setCurrentIndex(newIndex);
    setSelectedImage(displayGallery[newIndex]?.image);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + displayGallery.length) % displayGallery.length;
    setCurrentIndex(newIndex);
    setSelectedImage(displayGallery[newIndex]?.image);
  };

  return (
    <section className="gallery-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Work in Action</h2>
          <p>See our professional security team protecting what matters most</p>
        </div>

        <div className="gallery-grid">
          {displayGallery.map((item, index) => (
            <div key={item._id || index} className="gallery-item" onClick={() => openLightbox(index)}>
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
              {currentIndex + 1} / {displayGallery.length}
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
