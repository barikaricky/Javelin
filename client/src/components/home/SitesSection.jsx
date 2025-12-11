import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaShieldAlt } from 'react-icons/fa';
import { sitesAPI } from '../../services/api';
import { buildImageUrl } from '../../utils/imageHelper';
import './SitesSection.css';

const SitesSection = () => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      setLoading(true);
      const response = await sitesAPI.getAll();
      const dataArray = Array.isArray(response.data) ? response.data : 
                        Array.isArray(response.data?.data) ? response.data.data : [];

      // Normalize image URLs
      const normalized = dataArray.map((site) => ({
        ...site,
        image: buildImageUrl(site.image),
      }));

      setSites(normalized);
    } catch (error) {
      console.error('Error fetching sites:', error);
      setSites([]);
    } finally {
      setLoading(false);
    }
  };

  // If no data from backend, don't show the section
  if (loading) {
    return null;
  }

  if (sites.length === 0) {
    return null;
  }

  // Fallback sites (will not be used since we return null above)
  const fallbackSites = [
    {
      _id: '1',
      name: 'Construction Site Security',
      location: 'Lagos, Nigeria',
      description: 'Comprehensive 24/7 security services for major construction projects with armed guards and perimeter monitoring.',
      image: '/images/construction-site-security.jpg',
      services: ['Armed Guards', 'Perimeter Security', '24/7 Monitoring'],
      isActive: true
    },
    {
      _id: '2',
      name: 'Waterfront Industrial Complex',
      location: 'Port Harcourt, Nigeria',
      description: 'Maritime and industrial facility protection with specialized waterfront patrol and access control systems.',
      image: '/images/waterfront-patrol.jpg',
      services: ['Marine Patrol', 'Access Control', 'K-9 Units'],
      isActive: true
    },
    {
      _id: '3',
      name: 'Corporate Office Complex',
      location: 'Abuja, Nigeria',
      description: 'Executive protection and corporate security for high-profile office buildings and business districts.',
      image: '/images/office-worker.jpg',
      services: ['Executive Protection', 'Reception Security', 'CCTV Monitoring'],
      isActive: true
    }
  ];

  return (
    <section className="sites-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Operational Sites</h2>
          <p>Protecting assets across Nigeria with professional security services</p>
        </div>

        <div className="sites-grid">
          {sites.map((site) => (
            <div key={site._id} className="site-card">
              <div className="site-card__image">
                <img 
                  src={site.image} 
                  alt={site.name}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23003A67"/%3E%3Ctext x="50%25" y="50%25" font-size="24" fill="%23FFCC00" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="site-card__overlay">
                  <FaShieldAlt className="site-icon" />
                </div>
              </div>
              <div className="site-card__content">
                <h3 className="site-card__title">{site.name}</h3>
                <p className="site-card__location">
                  <FaMapMarkerAlt /> {site.location}
                </p>
                <p className="site-card__description">{site.description}</p>
                {site.services && Array.isArray(site.services) && site.services.length > 0 && (
                  <div className="site-card__services">
                    {site.services.map((service, idx) => (
                      <span key={idx} className="service-tag">{service}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SitesSection;
