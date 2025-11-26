import React from 'react';
import { FaLinkedinIn, FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { TEAM_IMAGES } from '../../utils/imageHelper';
import './TeamSection.css';

const TeamSection = () => {
  const team = [
    {
      name: 'Chief Adebayo Williams',
      position: 'Chief Executive Officer',
      image: TEAM_IMAGES.CEO,
      bio: 'Over 20 years of experience in security management and strategic operations',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        facebook: 'https://facebook.com',
      }
    },
    {
      name: 'Mrs. Chidinma Okonkwo',
      position: 'Managing Director',
      image: TEAM_IMAGES.MD,
      bio: 'Expert in corporate security solutions with 15+ years industry experience',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
      }
    },
    {
      name: 'Mr. Yusuf Mohammed',
      position: 'Operations Manager',
      image: TEAM_IMAGES.OPS_MANAGER,
      bio: 'Military veteran specializing in tactical operations and security protocols',
      social: {
        linkedin: 'https://linkedin.com',
        facebook: 'https://facebook.com',
      }
    },
    {
      name: 'Miss Blessing Eze',
      position: 'HR Manager',
      image: TEAM_IMAGES.HR_MANAGER,
      bio: 'Human resources specialist focused on recruitment and staff development',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
      }
    },
    {
      name: 'Sergeant Emeka Nwosu',
      position: 'Senior Supervisor',
      image: TEAM_IMAGES.SUPERVISOR_1,
      bio: 'Field operations expert with expertise in residential and corporate security',
      social: {
        linkedin: 'https://linkedin.com',
        facebook: 'https://facebook.com',
      }
    },
    {
      name: 'Officer Fatima Bello',
      position: 'Training Supervisor',
      image: TEAM_IMAGES.SUPERVISOR_2,
      bio: 'Certified security trainer specializing in guard development programs',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
      }
    }
  ];

  return (
    <section className="team-section">
      <div className="container">
        <div className="section-header">
          <h2>Meet Our Leadership Team</h2>
          <p>Experienced professionals dedicated to your security</p>
        </div>

        <div className="team-grid">
          {team.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-card__image-wrapper">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="team-card__image"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%23003A67"/%3E%3Ctext x="50%25" y="50%25" font-size="24" fill="%23FFCC00" text-anchor="middle" dominant-baseline="middle"%3ETeam Member%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="team-card__overlay">
                  <div className="team-card__social">
                    {member.social.linkedin && (
                      <a 
                        href={member.social.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="team-social-link"
                        aria-label="LinkedIn"
                      >
                        <FaLinkedinIn />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a 
                        href={member.social.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="team-social-link"
                        aria-label="Twitter"
                      >
                        <FaTwitter />
                      </a>
                    )}
                    {member.social.facebook && (
                      <a 
                        href={member.social.facebook} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="team-social-link"
                        aria-label="Facebook"
                      >
                        <FaFacebookF />
                      </a>
                    )}
                    {member.social.instagram && (
                      <a 
                        href={member.social.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="team-social-link"
                        aria-label="Instagram"
                      >
                        <FaInstagram />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="team-card__content">
                <h3 className="team-card__name">{member.name}</h3>
                <p className="team-card__position">{member.position}</p>
                <p className="team-card__bio">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
