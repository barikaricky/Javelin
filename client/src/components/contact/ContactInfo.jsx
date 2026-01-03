import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import { contactAPI } from '../../services/api';
import './ContactInfo.css';

const ContactInfo = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fallback contact details
  const fallbackContactDetails = [
    {
      icon: <FaMapMarkerAlt />,
      title: 'Head Office',
      content: 'No. 58 Aker Road, opposite Renew Empire Iwofe, Port Harcourt.',
      link: null
    },
    {
      icon: <FaPhone />,
      title: 'Phone Numbers',
      content: '08103323437\n09153542986',
      link: 'tel:08103323437'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email Address',
      content: 'info@javelinassociates.com\nhr@javelinassociates.com',
      link: 'mailto:info@javelinassociates.com'
    },
    {
      icon: <FaClock />,
      title: 'Office Hours',
      content: 'Monday - Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 2:00 PM\nSunday: Closed',
      link: null
    }
  ];

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const response = await contactAPI.getInfo();
      if (response.data) {
        setContactData(response.data);
      }
    } catch (error) {
      console.error('Error fetching contact info:', error);
    } finally {
      setLoading(false);
    }
  };

  // Build contact details from API data or use fallback
  const buildContactDetails = () => {
    if (!contactData) return fallbackContactDetails;

    return [
      {
        icon: <FaMapMarkerAlt />,
        title: 'Head Office',
        content: contactData.address || fallbackContactDetails[0].content,
        link: null
      },
      {
        icon: <FaPhone />,
        title: 'Phone Numbers',
        content: contactData.phones?.join('\n') || fallbackContactDetails[1].content,
        link: contactData.phones?.[0] ? `tel:${contactData.phones[0].replace(/\s/g, '')}` : null
      },
      {
        icon: <FaEnvelope />,
        title: 'Email Address',
        content: contactData.emails?.join('\n') || fallbackContactDetails[2].content,
        link: contactData.emails?.[0] ? `mailto:${contactData.emails[0]}` : null
      },
      {
        icon: <FaClock />,
        title: 'Office Hours',
        content: contactData.officeHours || fallbackContactDetails[3].content,
        link: null
      }
    ];
  };

  const contactDetails = buildContactDetails();

  return (
    <div className="contact-info">
      <h2>Get In Touch</h2>
      <p className="contact-info__subtitle">
        We're here to answer any questions you may have about our security services.
      </p>

      <div className="contact-info__items">
        {contactDetails.map((detail, index) => (
          <div key={index} className="contact-info__item">
            <div className="contact-info__icon">{detail.icon}</div>
            <div className="contact-info__content">
              <h3>{detail.title}</h3>
              {detail.link ? (
                <a href={detail.link} className="contact-info__link">
                  {detail.content.split('\n').map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}
                </a>
              ) : (
                <p>
                  {detail.content.split('\n').map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="contact-info__cta">
        <div className="badge badge-yellow">
          24/7 Emergency Response Available
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
