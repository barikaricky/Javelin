import React, { useState, useEffect } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand, FaImages } from 'react-icons/fa';
import { galleryAPI } from '../../services/api';
import { buildImageUrl } from '../../utils/imageHelper';
import './GallerySection.css';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const response = await galleryAPI.getAll();

      // Safely handle different API shapes: [items] vs { data: [items] }
      const rawItems = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data?.data)
          ? response.data.data
          : [];

      const transformedData = rawItems.map((item) => ({
        _id: item._id,
        image: buildImageUrl(item.image),
        title: item.title,
        category: item.category,
      }));

      setGalleryItems(transformedData);
    } catch (error) {
      console.error('Error fetching gallery:', error);
      setGalleryItems([]);
    } finally {
      setLoading(false);
    }
  };

  const openLightbox = (index) => {
    setSelectedImage(galleryItems[index]?.image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % galleryItems.length;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryItems[newIndex]?.image);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryItems[newIndex]?.image);
  };

  // Hardcoded gallery items with real images
  const defaultGalleryItems = [
    {
      _id: '1',
      image: '/images/javelin-logo-1.jpg',
      title: 'Professional Security Operations',
      category: 'Operations'
    },
    {
      _id: '2',
      image: '/images/javelin-site-2.jpg',
      title: 'Site Security Team',
      category: 'Operations'
    },
    {
      _id: '3',
      image: '/images/javelin-site-3.jpg',
      title: 'Security Deployment',
      category: 'Operations'
    },
    {
      _id: '4',
      image: '/images/javelin-guard-4.jpg',
      title: 'Elite Security Guards',
      category: 'Team'
    },
    {
      _id: '5',
      image: '/images/javelin-logo-2.jpg',
      title: 'Security Operations Center',
      category: 'Facilities'
    },
    {
      _id: '6',
      image: '/images/javelin-site-5.jpg',
      title: 'Industrial Security',
      category: 'Operations'
    },
    {
      _id: '7',
      image: '/images/site1.jpg',
      title: 'Site Protection Services',
      category: 'Operations'
    },
    {
      _id: '8',
      image: '/images/site2.jpg',
      title: 'Commercial Security',
      category: 'Operations'
    },
    {
      _id: '9',
      image: '/images/site3.jpg',
      title: 'Facility Protection',
      category: 'Operations'
    },
    {
      _id: '10',
      image: '/images/md_image.jpg',
      title: 'Leadership Team',
      category: 'Team'
    },
    {
      _id: '11',
      image: '/images/javelin-logo.png',
      title: 'Javelin Associates',
      category: 'Brand'
    }
  ];

  // Use API data if available, otherwise use default
  const displayItems = galleryItems.length > 0 ? galleryItems : defaultGalleryItems;

  // Loading State
  if (loading) {
    return (
      <section className="gallery-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Work in Action</h2>
            <p>See our professional security team protecting what matters most</p>
          </div>
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading gallery...</p>
          </div>
        </div>
      </section>
    );
  }

  // Empty State
  if (galleryItems.length === 0) {
    return (
      <section className="gallery-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Work in Action</h2>
            <p>See our professional security team protecting what matters most</p>
          </div>
          <div className="empty-state">
            <FaImages className="empty-icon" />
            <h3>Gallery Coming Soon</h3>
            <p>We're building our gallery to showcase our professional security services. Check back soon!</p>
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
          {displayItems.map((item, index) => (
            <div
              key={item._id || index}
              className="gallery-item"
              onClick={() => openLightbox(index)}
            >
              <div className="gallery-item__image">
                <img
                  src={item.image}
                  alt={item.title}
                  onError={(e) => {
                    // Fallback if something still goes wrong with the URL
                    e.currentTarget.src = '/images/javelin-logo.png';
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
            <img src={selectedImage} alt="Gallery" />
            <div className="lightbox__counter">
              {currentIndex + 1} / {displayItems.length}
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
