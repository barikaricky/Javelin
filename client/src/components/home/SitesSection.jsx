import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaUserShield, FaBuilding } from 'react-icons/fa';
import { sitesAPI } from '../../services/api';
import './SitesSection.css';

const SitesSection = () => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback data in case API fails
  const fallbackSites = [
    {
      name: 'Corporate Plaza Lagos',
      location: 'Victoria Island, Lagos',
      guards: 12,
      supervisor: 'Yes',
      type: 'Corporate'
    },
    {
      name: 'Residential Estate Abuja',
      location: 'Maitama, Abuja',
      guards: 8,
      supervisor: 'Yes',
      type: 'Residential'
    },
    {
      name: 'Industrial Complex PH',
      location: 'Port Harcourt',
      guards: 15,
      supervisor: 'Yes',
      type: 'Industrial'
    },
    {
      name: 'Shopping Mall Ibadan',
      location: 'Bodija, Ibadan',
      guards: 10,
      supervisor: 'Yes',
      type: 'Commercial'
    }
  ];

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const response = await sitesAPI.getAll();
      if (response.data && response.data.length > 0) {
        setSites(response.data);
      } else {
        setSites(fallbackSites);
      }
    } catch (error) {
      console.error('Error fetching sites:', error);
      setSites(fallbackSites);
    } finally {
      setLoading(false);
    }
  };

  const displaySites = sites.length > 0 ? sites : fallbackSites;

  return (
    <section className="sites-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Operational Footprint</h2>
          <p>Trusted security services across major cities in Nigeria</p>
        </div>

        <div className="sites-grid">
          {displaySites.map((site, index) => (
            <div key={site._id || index} className="site-card">
              <div className="site-card__header">
                <FaBuilding className="site-card__type-icon" />
                <span className="badge badge-yellow">{site.type}</span>
              </div>
              <h3 className="site-card__name">{site.name}</h3>
              <div className="site-card__location">
                <FaMapMarkerAlt />
                <span>{site.location}</span>
              </div>
              <div className="site-card__stats">
                <div className="site-stat">
                  <FaUserShield />
                  <div>
                    <div className="site-stat__number">{site.guards || site.personnelCount || 0}</div>
                    <div className="site-stat__label">Guards</div>
                  </div>
                </div>
                <div className="site-stat">
                  <div className="site-stat__badge">✓</div>
                  <div>
                    <div className="site-stat__number">{site.supervisor || (site.hasSupervisor ? 'Yes' : 'No')}</div>
                    <div className="site-stat__label">Supervisor</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sites-summary">
          <div className="summary-item">
            <div className="summary-number">50+</div>
            <div className="summary-label">Active Sites</div>
          </div>
          <div className="summary-item">
            <div className="summary-number">500+</div>
            <div className="summary-label">Security Personnel</div>
          </div>
          <div className="summary-item">
            <div className="summary-number">24/7</div>
            <div className="summary-label">Monitoring</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SitesSection;
