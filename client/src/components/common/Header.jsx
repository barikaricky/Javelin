import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone, FaEnvelope } from 'react-icons/fa';
import { NAV_LINKS } from '../../utils/constants';
import { LOGO } from '../../utils/imageHelper';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state for styling
      setIsScrolled(currentScrollY > 50);
      
      // Show header when scrolling up or at top, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMenuOpen(false); // Close mobile menu when hiding
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''} ${isVisible ? 'header--visible' : 'header--hidden'}`}>
      {/* Top Bar - Contact Info */}
      <div className="header__topbar">
        <div className="container">
          <div className="header__topbar-content">
            <div className="header__contact">
              <a href="tel:+2348012345678" className="header__contact-item">
                <FaPhone className="header__icon" />
                <span className="hide-mobile">+234 801 234 5678</span>
              </a>
              <a href="mailto:info@javelinassociates.com" className="header__contact-item">
                <FaEnvelope className="header__icon" />
                <span className="hide-mobile">info@javelinassociates.com</span>
              </a>
            </div>
            <div className="header__cta">
              <Link to="/recruitment" className="btn btn-sm btn-yellow">
                JOIN NOW
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="header__nav">
        <div className="container">
          <div className="header__nav-content">
            {/* Logo */}
            <Link to="/" className="header__logo" onClick={closeMenu}>
              <img
                src={LOGO}
                alt="Javelin Associates"
                className="header__logo-img"
              />
              <div className="header__logo-text">
                <span className="header__logo-main">JAVELIN</span>
                <span className="header__logo-sub">ASSOCIATES</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <ul className="header__menu header__menu--desktop">
              {NAV_LINKS.map((link) => (
                <li key={link.path} className="header__menu-item">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `header__menu-link ${isActive ? 'header__menu-link--active' : ''}`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Toggle */}
            <button
              className="header__toggle"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`header__mobile ${isMenuOpen ? 'header__mobile--open' : ''}`}>
          <ul className="header__menu header__menu--mobile">
            {NAV_LINKS.map((link) => (
              <li key={link.path} className="header__menu-item">
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `header__menu-link ${isActive ? 'header__menu-link--active' : ''}`
                  }
                  onClick={closeMenu}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="header__mobile-contact">
            <a href="tel:+2348012345678" className="btn btn-secondary btn-block">
              <FaPhone /> Call Us
            </a>
            <Link to="/recruitment" className="btn btn-primary btn-block" onClick={closeMenu}>
              Join Our Team
            </Link>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isMenuOpen && (
        <div className="header__overlay" onClick={closeMenu}></div>
      )}
    </header>
  );
};

export default Header;
