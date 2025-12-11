import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { teamAPI } from '../../services/api';
import { buildImageUrl } from '../../utils/imageHelper';
import './TeamSection.css';

const TeamSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
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
  if (loading) {
    return null;
  }

  if (teamMembers.length === 0) {
    return null;
  }

  // Keep the original hardcoded data as fallback (will not be used since we return null above)
  const fallbackTeamMembers = [
    {
      _id: '1',
      name: 'Chief Okonkwo',
      position: 'Chief Executive Officer',
      bio: 'With over 25 years of experience in security management and business leadership, Chief Okonkwo founded Javelin Associates with a vision to transform security services in Nigeria.',
      image: '/images/meeting-room.jpg',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/chiefokonkwo',
        twitter: 'https://twitter.com/chiefokonkwo',
        facebook: 'https://facebook.com/chiefokonkwo',
        instagram: 'https://instagram.com/chiefokonkwo'
      },
      isActive: true
    },
    {
      _id: '2',
      name: 'Engr. Adeyemi Oluwaseun',
      position: 'Managing Director',
      bio: 'A strategic leader with 20 years in corporate security and risk management. Engr. Adeyemi oversees all operational excellence and strategic initiatives at Javelin.',
      image: '/images/waterfront-patrol.jpg',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/adeyemioluwaseun',
        twitter: 'https://twitter.com/adeyemioluwaseun',
        facebook: '',
        instagram: ''
      },
      isActive: true
    },
    {
      _id: '3',
      name: 'Mrs. Ife Okafor',
      position: 'Head of Human Resources',
      bio: 'HR professional with 18 years of experience in talent acquisition and team development. Mrs. Okafor ensures we maintain the highest standards of personnel excellence.',
      image: '/images/javelin-logo.png',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/ifeokafor',
        twitter: '',
        facebook: 'https://facebook.com/ifeokafor',
        instagram: 'https://instagram.com/ifeokafor'
      },
      isActive: true
    },
    {
      _id: '4',
      name: 'Captain Chisom Nwosu',
      position: 'Operations Manager',
      bio: 'Former military officer with 15 years of operational and tactical experience. Captain Nwosu coordinates all field operations and security deployments.',
      image: '/images/female-k9-handler.jpg',
     
      _id: '5',
      name: 'Mr. Tunde Adeleke',
      position: 'Finance Director',
      bio: 'Certified accountant with 16 years in financial management and corporate compliance. Mr. Adeleke ensures fiscal responsibility and transparent reporting.',
      image: '/images/k9-handler-duo.jpg',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/tundeadeleke',
        twitter: 'https://twitter.com/tundeadeleke',
        facebook: 'https://facebook.com/tundeadeleke',
        instagram: ''
      },
      isActive: true
    },
    {
      _id: '6',
      name: 'Dr. Amara Ejiofor',
      position: 'Head of Training & Development',
      bio: 'Educational expert with 14 years in security training and professional development. Dr. Ejiofor designs and delivers world-class training programs.',
      image: '/images/team-lineup.jpg',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/amaraejiofor',
        twitter: 'https://twitter.com/amaraejiofor',
        facebook: 'https://facebook.com/amaraejiofor',
        instagram: 'https://instagram.com/amaraejiofor'
      },
      isActive: true
    },
    {
      _id: '7',
      name: 'Mr. Kunle Oladele',
      position: 'Technology & Innovation Lead',
      bio: 'IT specialist with 12 years of experience in security systems and technology integration. Mr. Oladele leads our digital transformation initiatives.',
      image: '/images/office-worker.jpg',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/kunleoladele',
        twitter: 'https://twitter.com/kunleoladele',
        facebook: '',
        instagram: 'https://instagram.com/kunleoladele'
      },
      isActive: true
    }
  ];

  const activeMembers = teamMembers.filter(member => member.isActive);

  // Get visible slides (3 per row on desktop, 1 on mobile)
  const slidesPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
  const totalSlides = Math.ceil(activeMembers.length / slidesPerView);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getVisibleMembers = () => {
    const startIndex = currentSlide * slidesPerView;
    return activeMembers.slice(startIndex, startIndex + slidesPerView);
  };

  return (
    <section className="team-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Leadership Team</h2>
          <p>Meet the experienced professionals driving excellence at Javelin Associates</p>
        </div>

        <div className="team-slider-container">
          {/* Previous button */}
          <button 
            className="team-slider-btn team-slider-btn--prev" 
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <FaChevronLeft />
          </button>

          {/* Team members grid */}
          <div className="team-grid-slider">
            {getVisibleMembers().map((member) => (
              <div key={member._id} className="team-member-card">
                <div className="team-member-image">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect width="300" height="300" fill="%23e0e0e0"/%3E%3Ctext x="50%25" y="50%25" font-size="16" fill="%23999" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
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

          {/* Next button */}
          <button 
            className="team-slider-btn team-slider-btn--next" 
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Slide indicators */}
        <div className="team-slider-indicators">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
