import React, { useState, useEffect } from 'react';
import { FaShieldAlt, FaStar, FaCertificate, FaUserCheck, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { apiGet } from '../../services/api';
import './GuardsSection.css';

const GuardsSection = () => {
  const [guards, setGuards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchGuards = async () => {
      try {
        const response = await apiGet('/guards');
        if (response.success && response.data.length > 0) {
          // Filter only guards ready for deployment
          const readyGuards = response.data.filter(g => g.isReadyForDeployment);
          setGuards(readyGuards);
        }
      } catch (error) {
        console.error('Error fetching guards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuards();
  }, []);

  const getRankBadge = (rank) => {
    const ranks = {
      'sergeant': { label: 'Sergeant', class: 'rank-sergeant' },
      'senior_officer': { label: 'Senior Officer', class: 'rank-senior' },
      'officer': { label: 'Officer', class: 'rank-officer' },
      'trainee': { label: 'Trainee', class: 'rank-trainee' }
    };
    return ranks[rank] || { label: rank, class: '' };
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 3 >= guards.length ? 0 : prev + 3));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 3 < 0 ? Math.max(0, guards.length - 3) : prev - 3));
  };

  if (loading) {
    return (
      <section className="guards-section">
        <div className="container">
          <div className="section-header">
            <h2>Guards Ready for Deployment</h2>
            <p>Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  if (guards.length === 0) {
    return null;
  }

  const visibleGuards = guards.slice(currentIndex, currentIndex + 3);

  return (
    <section className="guards-section">
      <div className="container">
        <div className="section-header">
          <h2>Guards Ready for Deployment</h2>
          <p>Our trained and certified security personnel available for immediate deployment</p>
        </div>

        <div className="guards-slider">
          {guards.length > 3 && (
            <button className="guards-nav guards-nav--prev" onClick={prevSlide}>
              <FaChevronLeft />
            </button>
          )}

          <div className="guards-grid">
            {visibleGuards.map((guard) => {
              const rankInfo = getRankBadge(guard.rank);
              return (
                <div key={guard._id} className="guard-card">
                  <div className="guard-card__image">
                    {guard.image ? (
                      <img src={guard.image} alt={guard.name} />
                    ) : (
                      <div className="guard-card__placeholder">
                        <FaShieldAlt />
                      </div>
                    )}
                    <div className={`guard-card__rank ${rankInfo.class}`}>
                      {rankInfo.label}
                    </div>
                    <div className="guard-card__status">
                      <FaUserCheck /> Available
                    </div>
                  </div>

                  <div className="guard-card__content">
                    <h3 className="guard-card__name">{guard.name}</h3>
                    <p className="guard-card__id">ID: {guard.guardId}</p>

                    <div className="guard-card__rating">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={i < Math.floor(guard.rating) ? 'star-filled' : 'star-empty'} 
                        />
                      ))}
                      <span>{guard.rating}</span>
                    </div>

                    <div className="guard-card__experience">
                      <strong>{guard.experience}</strong> years experience
                    </div>

                    {guard.specialization && guard.specialization.length > 0 && (
                      <div className="guard-card__specializations">
                        {guard.specialization.slice(0, 3).map((spec, idx) => (
                          <span key={idx} className="specialization-tag">{spec}</span>
                        ))}
                      </div>
                    )}

                    {guard.certifications && guard.certifications.length > 0 && (
                      <div className="guard-card__certifications">
                        <FaCertificate />
                        <span>{guard.certifications.length} Certifications</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {guards.length > 3 && (
            <button className="guards-nav guards-nav--next" onClick={nextSlide}>
              <FaChevronRight />
            </button>
          )}
        </div>

        <div className="guards-summary">
          <div className="guards-summary__item">
            <FaShieldAlt />
            <span><strong>{guards.length}</strong> Guards Available</span>
          </div>
          <div className="guards-summary__item">
            <FaCertificate />
            <span>All Certified & Trained</span>
          </div>
          <div className="guards-summary__item">
            <FaUserCheck />
            <span>Ready for Immediate Deployment</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuardsSection;
