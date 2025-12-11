import React, { useState, useEffect } from 'react';
import { teamAPI } from '../services/api';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import './Team.css';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await teamAPI.getAll();
      setTeamMembers(response.data.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching team members:', err);
      setError('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="team-page">
        <section className="team-page-hero">
          <div className="container">
            <h1>Our Leadership Team</h1>
            <p>Meet the professionals behind Javelin Associates' success</p>
          </div>
        </section>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading team members...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="team-page">
        <section className="team-page-hero">
          <div className="container">
            <h1>Our Leadership Team</h1>
            <p>Meet the professionals behind Javelin Associates' success</p>
          </div>
        </section>
        <div className="error-container">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="team-page">
      <section className="team-page-hero">
        <div className="container">
          <h1>Our Leadership Team</h1>
          <p>Meet the professionals behind Javelin Associates' success</p>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          {teamMembers.length === 0 ? (
            <div className="empty-state">
              <p>No team members available at the moment.</p>
            </div>
          ) : (
            <div className="team-grid">
              {teamMembers.map((member) => (
                <div key={member._id} className="team-member-card">
                  <div className="member-image-wrapper">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      onError={(e) => {
                        e.target.src = '/images/javelin-logo.png';
                      }}
                    />
                  </div>
                  <div className="member-info">
                    <h3>{member.name}</h3>
                    <p className="member-position">{member.position}</p>
                    <p className="member-bio">{member.bio}</p>
                    {member.socialLinks && (
                      <div className="member-socials">
                        {member.socialLinks.linkedin && (
                          <a 
                            href={member.socialLinks.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                          >
                            <FaLinkedin />
                          </a>
                        )}
                        {member.socialLinks.twitter && (
                          <a 
                            href={member.socialLinks.twitter} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="Twitter"
                          >
                            <FaTwitter />
                          </a>
                        )}
                        {member.socialLinks.facebook && (
                          <a 
                            href={member.socialLinks.facebook} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                          >
                            <FaFacebook />
                          </a>
                        )}
                        {member.socialLinks.instagram && (
                          <a 
                            href={member.socialLinks.instagram} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                          >
                            <FaInstagram />
                          </a>
                        )}
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

export default Team;
