import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone, FaEnvelope } from 'react-icons/fa';
import { NAV_LINKS } from '../../utils/constants';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
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
                Apply Now
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
              <div className="header__logo-icon">J</div>
              <div className="header__logo-text">
                <span className="header__logo-main">JAVELIN</span>
                <span className="header__logo-sub">ASSOCIATES LTD</span>
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
