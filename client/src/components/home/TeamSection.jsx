import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaQuoteLeft, FaTimes } from 'react-icons/fa';
import { teamAPI } from '../../services/api';
import { buildImageUrl } from '../../utils/imageHelper';
import './TeamSection.css';

const BIO_CHAR_LIMIT = 150;

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await teamAPI.getAll();
      const dataArray = Array.isArray(response.data) ? response.data : 
                        Array.isArray(response.data?.data) ? response.data.data : [];

      const normalized = dataArray.map((member) => ({
        ...member,
        image: buildImageUrl(member.image),
      }));

      setTeamMembers(normalized);
    } catch (error) {
      console.error('Error fetching team members:', error);
      setTeamMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const truncateBio = (bio) => {
    if (!bio || bio.length <= BIO_CHAR_LIMIT) return bio;
    return bio.substring(0, BIO_CHAR_LIMIT).trim() + '...';
  };

  const handleReadMore = (member) => {
    setSelectedMember(member);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedMember(null);
    document.body.style.overflow = '';
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  if (loading || teamMembers.length === 0) {
    return null;
  }

  const activeMembers = teamMembers.filter(member => member.isActive);

  return (
    <section className="team-section">
      <div className="container">
        <div className="team-header">
          <div className="team-header__badge">Our Leaders</div>
          <h2 className="team-header__title">
            Meet Our <span className="team-header__highlight">Leadership Team</span>
          </h2>
          <p className="team-header__subtitle">
            The experienced professionals driving excellence and integrity at Javelin Associates
          </p>
          <div className="team-header__divider">
            <span></span><span></span><span></span>
          </div>
        </div>

        <div className="team-grid">
          {activeMembers.map((member) => (
            <div key={member._id} className="team-card">
              <div className="team-card__image-container">
                <div className="team-card__image-frame">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="team-card__image"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect width="300" height="300" fill="%23003A67"/%3E%3Ctext x="50%25" y="50%25" font-size="80" fill="%23FFCC00" text-anchor="middle" dominant-baseline="middle"%3E' + (member.name ? member.name.charAt(0) : 'J') + '%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
                <div className="team-card__position-badge">
                  {member.position}
                </div>
              </div>

              <div className="team-card__content">
                <h3 className="team-card__name">{member.name}</h3>
                
                <div className="team-card__bio">
                  <p>{truncateBio(member.bio)}</p>
                  {member.bio && member.bio.length > BIO_CHAR_LIMIT && (
                    <button 
                      className="team-card__read-more" 
                      onClick={() => handleReadMore(member)}
                    >
                      Read More
                    </button>
                  )}
                </div>
                
                <div className="team-card__socials">
                  {member.socialLinks?.linkedin && (
                    <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="social-link social-link--linkedin">
                      <FaLinkedin />
                    </a>
                  )}
                  {member.socialLinks?.twitter && (
                    <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" title="Twitter" className="social-link social-link--twitter">
                      <FaTwitter />
                    </a>
                  )}
                  {member.socialLinks?.facebook && (
                    <a href={member.socialLinks.facebook} target="_blank" rel="noopener noreferrer" title="Facebook" className="social-link social-link--facebook">
                      <FaFacebook />
                    </a>
                  )}
                  {member.socialLinks?.instagram && (
                    <a href={member.socialLinks.instagram} target="_blank" rel="noopener noreferrer" title="Instagram" className="social-link social-link--instagram">
                      <FaInstagram />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Read More Modal */}
      {selectedMember && (
        <div className="team-modal-overlay" onClick={handleOverlayClick}>
          <div className="team-modal">
            <button className="team-modal__close" onClick={closeModal} aria-label="Close">
              <FaTimes />
            </button>
            
            <div className="team-modal__content">
              <div className="team-modal__header">
                <div className="team-modal__avatar">
                  <img 
                    src={selectedMember.image} 
                    alt={selectedMember.name}
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect width="300" height="300" fill="%23003A67"/%3E%3Ctext x="50%25" y="50%25" font-size="80" fill="%23FFCC00" text-anchor="middle" dominant-baseline="middle"%3E' + (selectedMember.name ? selectedMember.name.charAt(0) : 'J') + '%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
                <div className="team-modal__info">
                  <h3 className="team-modal__name">{selectedMember.name}</h3>
                  <p className="team-modal__position">{selectedMember.position}</p>
                </div>
              </div>

              <div className="team-modal__body">
                <FaQuoteLeft className="team-modal__quote-icon" />
                <p className="team-modal__bio">{selectedMember.bio}</p>
              </div>

              <div className="team-modal__footer">
                {(selectedMember.socialLinks?.linkedin || selectedMember.socialLinks?.twitter || selectedMember.socialLinks?.facebook || selectedMember.socialLinks?.instagram) && (
                  <div className="team-modal__socials">
                    {selectedMember.socialLinks?.linkedin && (
                      <a href={selectedMember.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-link social-link--linkedin">
                        <FaLinkedin />
                      </a>
                    )}
                    {selectedMember.socialLinks?.twitter && (
                      <a href={selectedMember.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-link social-link--twitter">
                        <FaTwitter />
                      </a>
                    )}
                    {selectedMember.socialLinks?.facebook && (
                      <a href={selectedMember.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="social-link social-link--facebook">
                        <FaFacebook />
                      </a>
                    )}
                    {selectedMember.socialLinks?.instagram && (
                      <a href={selectedMember.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-link social-link--instagram">
                        <FaInstagram />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TeamSection;
