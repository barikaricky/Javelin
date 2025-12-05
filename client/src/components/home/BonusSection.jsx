import React, { useState, useEffect } from 'react';
import { FaGift, FaPercent, FaStar, FaUsers, FaBuilding } from 'react-icons/fa';
import { apiGet } from '../../services/api';
import './BonusSection.css';

const BonusSection = () => {
  const [bonuses, setBonuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBonuses = async () => {
      try {
        const response = await apiGet('/bonuses');
        if (response.success && response.data.length > 0) {
          setBonuses(response.data.filter(b => b.isActive).slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching bonuses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBonuses();
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'discount': return <FaPercent />;
      case 'bonus': return <FaGift />;
      case 'benefit': return <FaStar />;
      default: return <FaGift />;
    }
  };

  const getAudienceIcon = (audience) => {
    switch (audience) {
      case 'clients': return <FaBuilding />;
      case 'employees': return <FaUsers />;
      default: return <FaUsers />;
    }
  };

  const getTypeClass = (type) => {
    switch (type) {
      case 'discount': return 'type-discount';
      case 'bonus': return 'type-bonus';
      case 'benefit': return 'type-benefit';
      default: return '';
    }
  };

  if (loading) {
    return (
      <section className="bonus-section">
        <div className="container">
          <div className="section-header">
            <h2>Bonuses & Benefits</h2>
            <p>Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  if (bonuses.length === 0) {
    return null;
  }

  return (
    <section className="bonus-section">
      <div className="container">
        <div className="section-header">
          <h2>Bonuses & Benefits</h2>
          <p>Exclusive offers for our clients and valued employees</p>
        </div>

        <div className="bonus-grid">
          {bonuses.map((bonus) => (
            <div key={bonus._id} className={`bonus-card ${getTypeClass(bonus.type)}`}>
              <div className="bonus-card__header">
                <div className="bonus-card__icon">
                  {getIcon(bonus.type)}
                </div>
                {bonus.value && (
                  <div className="bonus-card__value">
                    {bonus.value}
                  </div>
                )}
              </div>
              
              <div className="bonus-card__content">
                <span className="bonus-card__type">{bonus.type}</span>
                <h3 className="bonus-card__title">{bonus.title}</h3>
                <p className="bonus-card__description">{bonus.description}</p>
                
                {bonus.terms && (
                  <p className="bonus-card__terms">* {bonus.terms}</p>
                )}
              </div>

              <div className="bonus-card__footer">
                <div className="bonus-card__audience">
                  {getAudienceIcon(bonus.targetAudience)}
                  <span>For {bonus.targetAudience === 'all' ? 'Everyone' : bonus.targetAudience}</span>
                </div>
                {bonus.validUntil && (
                  <span className="bonus-card__validity">
                    Valid until {new Date(bonus.validUntil).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BonusSection;
