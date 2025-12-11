import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import { teamAPI } from '../../services/api';
import { buildImageUrl } from '../../utils/imageHelper';
import './TeamSection.css';

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await teamAPI.getAll();
      const dataArray = Array.isArray(response.data) ? response.data : 
                        Array.isArray(response.data?.data) ? response.data.data : [];

      // Normalize image URLs
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

  // If no data from backend, don't show the section
  if (loading || teamMembers.length === 0) {
    return null;
  }

  const activeMembers = teamMembers.filter(member => member.isActive);

  return (
    <section className="team-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Leadership Team</h2>
          <p>Meet the experienced professionals driving excellence at Javelin Associates</p>
        </div>

        <div className="team-grid">
          {activeMembers.map((member) => (
            <div key={member._id} className="team-member-card">
              <div className="team-member-image">
                <img 
                  src={member.image} 
                  alt={member.name}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect width="300" height="300" fill="%23e0e0e0"/%3E%3C/svg%3E';
                  }}
                />
              </div>
              <div className="team-member-content">
                <h3 className="team-member-name">{member.name}</h3>
                <p className="team-member-position">{member.position}</p>
                <p className="team-member-bio">{member.bio}</p>
                
                {/* Social links */}
                <div className="team-member-socials">
                  {member.socialLinks?.linkedin && (
                    <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                      <FaLinkedin />
                    </a>
                  )}
                  {member.socialLinks?.twitter && (
                    <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" title="Twitter">
                      <FaTwitter />
                    </a>
                  )}
                  {member.socialLinks?.facebook && (
                    <a href={member.socialLinks.facebook} target="_blank" rel="noopener noreferrer" title="Facebook">
                      <FaFacebook />
                    </a>
                  )}
                  {member.socialLinks?.instagram && (
                    <a href={member.socialLinks.instagram} target="_blank" rel="noopener noreferrer" title="Instagram">
                      <FaInstagram />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
