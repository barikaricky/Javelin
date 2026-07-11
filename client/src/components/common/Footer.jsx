import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaTiktok,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Our Sites', path: '/sites' },
    { name: 'Recruitment', path: '/recruitment' },
    { name: 'Contact Us', path: '/contact' }
  ];

  const services = [
    'Manned Guarding',
    'Corporate Security',
    'Residential Protection',
    'Event Security',
    'CCTV Monitoring',
    'Mobile Patrol'
  ];

  const socialLinks = [
    { icon: <FaTiktok />, url: 'https://www.tiktok.com/@javelin.associate?_r=1&_t=ZS-96u4qKSAMuv', name: 'TikTok' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com/javelinassociates?igsh=MW8xNGNha2Vma2tqdA==', name: 'Instagram' },
    { icon: <FaLinkedinIn />, url: 'https://www.linkedin.com/company/javelin-associates-limited/', name: 'LinkedIn' },
    { icon: <FaWhatsapp />, url: 'https://wa.me/2348134233131', name: 'WhatsApp' }
  ];

  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            {/* Company Info */}
            <div className="footer__section">
              <div className="footer__logo">
                <div className="footer__logo-icon">J</div>
                <div className="footer__logo-text">
                  <span className="footer__logo-main">JAVELIN</span>
                  <span className="footer__logo-sub">ASSOCIATES LTD</span>
                </div>
              </div>
              <p className="footer__description">
                Leading provider of professional security services across Nigeria. 
                Protecting what matters most with trained and certified personnel.
              </p>
              <div className="footer__social">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__social-link"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer__section">
              <h3 className="footer__heading">Quick Links</h3>
              <ul className="footer__links">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path} className="footer__link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="footer__section">
              <h3 className="footer__heading">Our Services</h3>
              <ul className="footer__links">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link to="/services" className="footer__link">
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer__section">
              <h3 className="footer__heading">Contact Us</h3>
              <div className="footer__contact">
                <div className="footer__contact-item">
                  <FaMapMarkerAlt className="footer__contact-icon" />
                  <span> Address: 85 Aker road off Iwofe Road <br />Port Harcourt, Rivers State</span>
                </div>
                <div className="footer__contact-item">
                  <FaPhone className="footer__contact-icon" />
                  <a href="tel:+2348012345678">08134233131 or 08103323437</a>
                </div>
                <div className="footer__contact-item">
                  <FaEnvelope className="footer__contact-icon" />
                  <a href="mailto:info@javelinassociates.com">info@javelinassociates.com</a>
                </div>
              </div>
              <div className="footer__badge">
                <span className="badge badge-yellow">24/7 Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-content">
            <p className="footer__copyright">
              &copy; {currentYear} Javelin Associates Ltd. All rights reserved.
            </p>
            <div className="footer__legal">
              <Link to="/privacy" className="footer__legal-link">Privacy Policy</Link>
              <span className="footer__separator">|</span>
              <Link to="/terms" className="footer__legal-link">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
