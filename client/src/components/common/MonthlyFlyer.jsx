import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import './MonthlyFlyer.css';

const PHONE_INTL = '2348134233131';
const SERVICES = [
  'Armed security guards',
  'Unarmed security guards',
  'K-9 security units',
  'CCTV surveillance',
  'Guard outsourcing',
  'Investigations'
];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const OFFER_SEEN_KEY = 'javelinMonthlyOfferSeen';

const rememberOfferSeen = () => {
  try {
    window.localStorage.setItem(
      OFFER_SEEN_KEY,
      `${new Date().getFullYear()}-${new Date().getMonth()}`
    );
  } catch (error) {
    console.error('Unable to save monthly offer display preference:', error);
  }
};

const getOfferDetails = (date = new Date()) => {
  const month = date.getMonth();
  const name = MONTHS[month];
  const isNewMonth = date.getDate() <= 7;
  const isNewYear = month === 0 && isNewMonth;

  return {
    name,
    isNewMonth,
    heading: isNewYear ? `${name} ${date.getFullYear()}` : name,
    greeting: isNewMonth ? (isNewYear ? 'HAPPY NEW YEAR' : 'HAPPY NEW MONTH') : '',
    message: isNewMonth
      ? `Start ${name} protected. Book this week and enjoy 10% off our security services.`
      : `Stay protected all through ${name} with 10% off our security services.`
  };
};

const MonthlyFlyer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const offer = getOfferDetails();
  const whatsappMessage = encodeURIComponent(
    `Hello Javelin Associates, I'd like to book your security services and claim the 10% ${offer.name} offer.`
  );

  useEffect(() => {
    let seenThisMonth = false;
    try {
      seenThisMonth = window.localStorage.getItem(OFFER_SEEN_KEY) ===
        `${new Date().getFullYear()}-${new Date().getMonth()}`;
    } catch (error) {
      console.error('Unable to read monthly offer display preference:', error);
    }

    if (seenThisMonth) return undefined;

    const timer = window.setTimeout(() => setIsVisible(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        rememberOfferSeen();
        setIsVisible(false);
      }
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    rememberOfferSeen();
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) handleClose();
  };

  if (!isVisible) return null;

  return (
    <div
      className="monthly-offer-overlay"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <section
        className={`monthly-offer-card${offer.isNewMonth ? ' monthly-offer-card--new-month' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="monthly-offer-month"
        aria-describedby="monthly-offer-message"
      >
        <button
          className="monthly-offer-close"
          onClick={handleClose}
          aria-label="Close monthly offer"
          autoFocus
          type="button"
        >
          <FiX aria-hidden="true" />
        </button>

        <div className="monthly-offer-brand">
          <img src="/images/javelin-logo.png" alt="Javelin Associates Ltd" />
        </div>
        {offer.greeting && <p className="monthly-offer-greeting">{offer.greeting}</p>}
        <div className="monthly-offer-month-wrap">
          <h2 className="monthly-offer-month" id="monthly-offer-month">
            {Array.from(offer.heading).map((character, index) => (
              <span
                aria-hidden="true"
                key={`${character}-${index}`}
                style={{ '--character-index': index }}
              >
                {character === ' ' ? '\u00a0' : character}
              </span>
            ))}
            <span className="monthly-offer-visually-hidden">{offer.heading}</span>
          </h2>
        </div>

        <div className="monthly-offer-discount">
          <strong>10%</strong>
          <span>OFF ALL<br />SERVICES</span>
        </div>
        <p className="monthly-offer-message" id="monthly-offer-message">{offer.message}</p>

        <ul className="monthly-offer-services">
          {SERVICES.map((service, index) => (
            <li key={service} style={{ '--service-index': index }}>{service}</li>
          ))}
        </ul>

        <div className="monthly-offer-actions">
          <Link
            className="monthly-offer-button"
            to="/book-meeting"
            onClick={handleClose}
          >
            Book now
          </Link>
          <a
            className="monthly-offer-button monthly-offer-button--whatsapp"
            href={`https://wa.me/${PHONE_INTL}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
          >
            WhatsApp now
          </a>
        </div>

        <p className="monthly-offer-phone">08134233131</p>
        <p className="monthly-offer-tagline">
          Transforming safety with insightful security and integrity-driven investigations
        </p>
        {offer.isNewMonth && (
          <div className="monthly-offer-confetti" aria-hidden="true">
            {Array.from({ length: 24 }, (_, index) => (
              <i
                key={index}
                style={{
                  '--confetti-index': index,
                  '--confetti-left': `${(index * 47 + 13) % 100}%`,
                  '--confetti-delay': `${(index % 7) * 0.11}s`
                }}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MonthlyFlyer;
