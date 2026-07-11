import React, { useState, useEffect } from 'react';
import { sitesAPI } from '../services/api';
import { FaMapMarkerAlt, FaShieldAlt } from 'react-icons/fa';
import './OurSites.css';

const OurSites = () => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      setLoading(true);
      const response = await sitesAPI.getAll();
      setSites(response.data.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching sites:', err);
      setError('Failed to load operational sites');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="our-sites-page">
        <section className="sites-hero">
          <div className="container">
            <h1>Our Operational Sites</h1>
            <p>Protecting businesses and communities across the region</p>
          </div>
        </section>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading operational sites...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="our-sites-page">
        <section className="sites-hero">
          <div className="container">
            <h1>Our Operational Sites</h1>
            <p>Protecting businesses and communities across the region</p>
          </div>
        </section>
        <div className="error-container">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="our-sites-page">
      <section className="sites-hero">
        <div className="container">
          <h1>Our Operational Sites</h1>
          <p>Protecting businesses and communities across the region</p>
        </div>
      </section>

      <section className="sites-section">
        <div className="container">
          {sites.length === 0 ? (
            <div className="empty-state">
              <FaShieldAlt />
              <p>No operational sites available at the moment.</p>
            </div>
          ) : (
            <div className="sites-grid">
              {sites.map((site) => (
                <div key={site._id} className="site-card">
                  <div className="site-image-wrapper">
                    <img 
                      src={site.image} 
                      alt={site.name}
                      onError={(e) => {
                        e.target.src = '/images/javelin-logo.png';
                      }}
                    />
                    <div className="site-overlay"></div>
                  </div>
                  <div className="site-content">
                    <h3>{site.name}</h3>
                    <div className="site-location">
                      <FaMapMarkerAlt />
                      <span>{site.location}</span>
                    </div>
                    <p className="site-description">{site.description}</p>
                    {site.services && site.services.length > 0 && (
                      <div className="site-services">
                        <h4>Services Provided:</h4>
                        <ul>
                          {site.services.map((service, index) => (
                            <li key={index}>
                              <FaShieldAlt className="service-icon" />
                              {service}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default OurSites;
