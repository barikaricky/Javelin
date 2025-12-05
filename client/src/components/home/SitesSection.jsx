import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaUserShield, FaBuilding } from 'react-icons/fa';
import { apiGet } from '../../services/api';
import './SitesSection.css';

const SitesSection = () => {
  const [sites, setSites] = useState([]);
  const [stats, setStats] = useState({ totalSites: 50, totalGuards: 500, monitoring: '24/7' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sitesRes, statsRes] = await Promise.all([
          apiGet('/sites'),
          apiGet('/sites/stats')
        ]);
        
        if (sitesRes.success && sitesRes.data.length > 0) {
          setSites(sitesRes.data);
        } else {
          // Fallback to default data
          setSites([
            { name: 'Corporate Plaza Lagos', location: 'Victoria Island, Lagos', guards: 12, hasSupervisor: true, type: 'Corporate' },
            { name: 'Residential Estate Abuja', location: 'Maitama, Abuja', guards: 8, hasSupervisor: true, type: 'Residential' },
            { name: 'Industrial Complex PH', location: 'Port Harcourt', guards: 15, hasSupervisor: true, type: 'Industrial' },
            { name: 'Shopping Mall Ibadan', location: 'Bodija, Ibadan', guards: 10, hasSupervisor: true, type: 'Commercial' }
          ]);
        }
        
        if (statsRes.success) {
          setStats(statsRes.data);
        }
      } catch (error) {
        console.error('Error fetching sites:', error);
        // Use fallback data
        setSites([
          { name: 'Corporate Plaza Lagos', location: 'Victoria Island, Lagos', guards: 12, hasSupervisor: true, type: 'Corporate' },
          { name: 'Residential Estate Abuja', location: 'Maitama, Abuja', guards: 8, hasSupervisor: true, type: 'Residential' },
          { name: 'Industrial Complex PH', location: 'Port Harcourt', guards: 15, hasSupervisor: true, type: 'Industrial' },
          { name: 'Shopping Mall Ibadan', location: 'Bodija, Ibadan', guards: 10, hasSupervisor: true, type: 'Commercial' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="sites-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Operational Footprint</h2>
            <p>Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="sites-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Operational Footprint</h2>
          <p>Trusted security services across major cities in Nigeria</p>
        </div>

        <div className="sites-grid">
          {sites.map((site, index) => (
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
                    <div className="site-stat__number">{site.guards}</div>
                    <div className="site-stat__label">Guards</div>
                  </div>
                </div>
                <div className="site-stat">
                  <div className="site-stat__badge">✓</div>
                  <div>
                    <div className="site-stat__number">{site.hasSupervisor ? 'Yes' : 'No'}</div>
                    <div className="site-stat__label">Supervisor</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sites-summary">
          <div className="summary-item">
            <div className="summary-number">{stats.totalSites}+</div>
            <div className="summary-label">Active Sites</div>
          </div>
          <div className="summary-item">
            <div className="summary-number">{stats.totalGuards}+</div>
            <div className="summary-label">Security Personnel</div>
          </div>
          <div className="summary-item">
            <div className="summary-number">{stats.monitoring}</div>
            <div className="summary-label">Monitoring</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SitesSection;
