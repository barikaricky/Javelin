import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowRight,
  FaCalendarAlt,
  FaCheck,
  FaDog,
  FaPhone,
  FaShieldAlt,
  FaStar,
  FaUserShield,
  FaVideo
} from 'react-icons/fa';
import SEO from '../components/common/SEO';
import './Home.css';

const slides = [
  {
    eyebrow: 'Javelin Associates Ltd · Port Harcourt',
    title: <>PROTECTION <em>BUILT</em><br />AROUND YOUR RISK</>,
    description: 'Professional security personnel, K-9 units and technology to protect the people and places that matter.',
    background: 'one',
    image: '/assets/images/guards/guard-professional.jpg.jpg',
    position: 'center 58%'
  },
  {
    eyebrow: 'Who we are',
    title: <>DISCIPLINED <em>PEOPLE.</em><br />RELIABLE COVER.</>,
    description: 'A local security partner focused on trained officers, clear procedures and dependable supervision.',
    background: 'two',
    image: '/assets/images/images/guard1.jpg',
    position: 'center 55%'
  },
  {
    eyebrow: 'Start with a free assessment',
    title: <>KNOW YOUR <em>RISKS.</em><br />PLAN YOUR RESPONSE.</>,
    description: 'We assess your site, identify vulnerabilities and recommend a practical security plan.',
    background: 'three',
    image: '/assets/images/images/guard3..jpg',
    position: 'center 58%'
  },
  {
    eyebrow: 'People and K-9 units',
    title: <>THE RIGHT TEAM.<br /><em>ON THE GROUND.</em></>,
    description: 'Vetted, uniformed security personnel and handler-led K-9 teams for your site and operations.',
    background: 'four',
    image: '/images/dog_training.jpeg',
    position: 'center 48%'
  },
  {
    eyebrow: 'Integrated security technology',
    title: <>ALWAYS <em>WATCHING.</em><br />ALWAYS READY.</>,
    description: 'CCTV installation and monitoring help you maintain visibility and respond with confidence.',
    background: 'five',
    image: '/images/desk.jpeg',
    position: 'center 52%'
  },
  {
    eyebrow: '24/7 command and response',
    title: <>WHEN IT <em>MATTERS,</em><br />WE RESPOND.</>,
    description: 'Around-the-clock supervision and local knowledge keep your security operation moving.',
    background: 'six',
    image: '/assets/images/guards/corporate-security.jpg.jpg',
    position: 'center 55%'
  }
];

const services = [
  {
    icon: FaShieldAlt,
    title: 'Armed guards',
    description: 'Licensed, vetted armed personnel for high-value sites, cash movement and high-risk locations.'
  },
  {
    icon: FaUserShield,
    title: 'Unarmed guards',
    description: 'Disciplined, uniformed guards for offices, estates, schools, hospitals and retail premises.'
  },
  {
    icon: FaDog,
    title: 'K-9 units',
    description: 'Handler-led dog teams for patrol, perimeter defence and detection of intruders and prohibited items.'
  },
  {
    icon: FaVideo,
    title: 'CCTV & surveillance',
    description: 'Camera installation, remote monitoring and alarm integration for round-the-clock visibility.'
  },
  {
    icon: FaStar,
    title: 'Executive protection',
    description: 'Discreet bodyguard and close-protection teams for executives, VIPs and families.'
  },
  {
    icon: FaCalendarAlt,
    title: 'Event security',
    description: 'Crowd control, access management and VIP safety for corporate functions and public events.'
  }
];

const galleryItems = [
  {
    label: 'Professional security team',
    image: '/assets/images/guards/guard-professional.jpg.jpg',
    alt: 'Javelin security personnel on duty at a client site',
    position: 'center 58%'
  },
  {
    label: 'Site security',
    image: '/assets/images/images/site2.jpg',
    alt: 'Security team supervising an active site',
    position: 'center 54%'
  },
  {
    label: 'K-9 training',
    image: '/images/dog_training.jpeg',
    alt: 'Javelin K-9 handlers training with security dogs',
    position: 'center 48%'
  },
  {
    label: 'Security operations',
    image: '/images/desk.jpeg',
    alt: 'Javelin security officer recording operations at a desk',
    position: 'center 48%'
  },
  {
    label: 'Team deployment',
    image: '/images/Expect-led.jpeg',
    alt: 'Javelin personnel assembled for a site deployment',
    position: 'center 56%'
  },
  {
    label: 'Mobile patrol',
    image: '/assets/images/images/guard4.jpg',
    alt: 'Javelin security officer beside a patrol vehicle',
    position: 'center 52%'
  }
];

const scrollToSection = (event, id) => {
  event.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  const changeSlide = (index) => {
    setActiveSlide((index + slides.length) % slides.length);
  };

  return (
    <div className="landing-page">
      <SEO
        title="Javelin Associates Ltd - #1 Professional Security Company in Rivers State, Port Harcourt, Nigeria"
        description="Leading security company in Rivers State, Port Harcourt, Nigeria. We provide 24/7 armed security guards, unarmed security personnel, K-9 units, CCTV surveillance, mobile patrol, and comprehensive security solutions. Licensed, trusted, and professional security services across Nigeria."
        keywords="security company Nigeria, security company Rivers State, security services Port Harcourt, armed security guards Nigeria, security company in Port Harcourt, private security Nigeria, K-9 security services, CCTV installation Rivers State, security guards Rivers State, professional security Nigeria, Javelin Associates, security services in Nigeria, bodyguard services Nigeria, event security Port Harcourt, corporate security Nigeria, security company near me, best security company Nigeria, security guard services, mobile patrol Nigeria, access control Nigeria"
        url="/"
      />

      <header className="landing-header">
        <nav className="landing-wrap landing-nav" aria-label="Main navigation">
          <a className="landing-brand" href="#top" onClick={(event) => scrollToSection(event, 'top')}>
            <img
              className="landing-brand__logo"
              src="/images/javelin-logo.png"
              alt="Javelin Associates Ltd"
            />
          </a>
          <div className="landing-links">
            <a href="#services" onClick={(event) => scrollToSection(event, 'services')}>Services</a>
            <a href="#why" onClick={(event) => scrollToSection(event, 'why')}>Why Javelin</a>
            <a href="#process" onClick={(event) => scrollToSection(event, 'process')}>How it works</a>
            <a href="#gallery" onClick={(event) => scrollToSection(event, 'gallery')}>Gallery</a>
            <Link className="landing-button landing-button--primary landing-nav__cta" to="/book-meeting">
              Request a quote <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <section className="landing-hero" id="top" aria-label="Javelin security services">
          {slides.map((slide, index) => (
            <div
              className={`landing-hero__background landing-hero__background--${slide.background}${activeSlide === index ? ' is-active' : ''}`}
              style={{
                backgroundImage: `linear-gradient(100deg, rgb(4 7 15 / 58%) 0%, rgb(4 7 15 / 30%) 58%, rgb(4 7 15 / 16%) 100%), url("${slide.image}")`,
                backgroundPosition: slide.position
              }}
              key={slide.background}
              aria-hidden="true"
            />
          ))}
          {slides.map((slide, index) => (
            <div
              className={`landing-hero__slide${activeSlide === index ? ' is-active' : ''}`}
              key={slide.eyebrow}
              aria-hidden={activeSlide !== index}
            >
              <div className="landing-hero__content">
                <img
                  className="landing-hero__logo"
                  src="/images/javelin-logo.png"
                  alt=""
                  aria-hidden="true"
                />
                <p className="landing-eyebrow">{slide.eyebrow}</p>
                <h1>{slide.title}</h1>
                <p className="landing-hero__description">{slide.description}</p>
                <div className="landing-hero__actions">
                  <Link className="landing-button landing-button--primary" to="/book-meeting">
                    Request a quote <FaArrowRight aria-hidden="true" />
                  </Link>
                  <a
                    className="landing-button landing-button--outline"
                    href="#services"
                    onClick={(event) => scrollToSection(event, 'services')}
                  >
                    Explore services
                  </a>
                </div>
              </div>
            </div>
          ))}
          <div className="landing-hero__controls" aria-label="Hero slides">
            {slides.map((slide, index) => (
              <button
                aria-label={`Show slide ${index + 1}`}
                aria-current={activeSlide === index ? 'true' : undefined}
                className={`landing-hero__dot${activeSlide === index ? ' is-active' : ''}`}
                key={slide.eyebrow}
                onClick={() => changeSlide(index)}
                type="button"
              >
                <span />
              </button>
            ))}
            <div className="landing-hero__arrows">
              <button type="button" aria-label="Previous slide" onClick={() => changeSlide(activeSlide - 1)}>←</button>
              <button type="button" aria-label="Next slide" onClick={() => changeSlide(activeSlide + 1)}>→</button>
            </div>
          </div>
        </section>

        <div className="landing-strip" aria-label="Security capabilities">
          <div className="landing-wrap landing-strip__grid">
            <div><b>24/7</b><span>Command & response</span></div>
            <div><b>K-9</b><span>Detection & patrol units</span></div>
            <div><b>CCTV</b><span>Install & monitoring</span></div>
            <div><b>PH</b><span>Based in Port Harcourt</span></div>
          </div>
        </div>

        <section className="landing-section" id="services">
          <div className="landing-wrap">
            <div className="landing-section__heading">
              <p className="landing-eyebrow">What we do</p>
              <h2>Security services built around your risk</h2>
              <p className="landing-subtitle">
                From a single gatehouse to a multi-site estate, we match the right people, technology and
                procedures to the threat you actually face.
              </p>
            </div>
            <div className="landing-services">
              {services.map(({ icon: Icon, title, description }) => (
                <article className="landing-card" key={title}>
                  <div className="landing-card__icon"><Icon aria-hidden="true" /></div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="landing-section landing-why" id="why">
          <div className="landing-wrap landing-why__grid">
            <div id="about">
              <p className="landing-eyebrow">Why Javelin</p>
              <h2>Discipline, accountability and fast response</h2>
              <div className="landing-reasons">
                <div><b>01</b><span><strong>Vetted & trained people</strong><small>Every officer is screened, trained and supervised, because your safety is only as strong as the person on post.</small></span></div>
                <div><b>02</b><span><strong>Supervised around the clock</strong><small>Site and beat supervisors check posts, log incidents and escalate quickly, day and night.</small></span></div>
                <div><b>03</b><span><strong>Local knowledge</strong><small>Based in Port Harcourt, we understand the city, its routes and its risks.</small></span></div>
              </div>
            </div>
            <aside className="landing-assessment">
              <p className="landing-eyebrow">Free assessment</p>
              <h3>Know your weak points before someone else does</h3>
              <ul>
                <li><FaCheck aria-hidden="true" /> On-site risk and vulnerability walkthrough</li>
                <li><FaCheck aria-hidden="true" /> Recommended manpower and technology plan</li>
                <li><FaCheck aria-hidden="true" /> Clear, no-pressure written proposal</li>
              </ul>
              <Link className="landing-button landing-button--primary" to="/book-meeting">
                Book assessment <FaArrowRight aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </section>

        <section className="landing-section" id="process">
          <div className="landing-wrap">
            <div className="landing-section__heading">
              <p className="landing-eyebrow">How it works</p>
              <h2>From first call to secured site</h2>
            </div>
            <div className="landing-steps">
              <article><b>1</b><h3>Assess</h3><p>We visit, map your risks and agree what needs protecting.</p></article>
              <article><b>2</b><h3>Deploy</h3><p>Briefed, uniformed personnel and equipment are posted to your site.</p></article>
              <article><b>3</b><h3>Supervise</h3><p>Regular patrols, reports and reviews keep standards high.</p></article>
            </div>
          </div>
        </section>

        <section className="landing-section" id="gallery">
          <div className="landing-wrap">
            <div className="landing-section__heading">
              <p className="landing-eyebrow">Gallery</p>
              <h2>Javelin in the field</h2>
              <p className="landing-subtitle">Our teams, technology and response capability at a glance.</p>
            </div>
            <div className="landing-gallery">
              {galleryItems.map(({ label, image, alt, position }) => (
                <div className="landing-gallery__tile" key={label}>
                  <img
                    src={image}
                    alt={alt}
                    loading="lazy"
                    style={{ objectPosition: position }}
                  />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="landing-section landing-contact" id="contact">
          <div className="landing-wrap landing-contact__grid">
            <div>
              <p className="landing-eyebrow">Contact</p>
              <h2>Let’s secure what matters to you</h2>
              <p className="landing-subtitle">Tell us about your premises, event or team and we’ll respond with a tailored plan.</p>
              <Link className="landing-button landing-button--primary" to="/book-meeting">
                Request a quote <FaArrowRight aria-hidden="true" />
              </Link>
            </div>
            <div className="landing-contact__details">
              <a href="tel:+2348103323437"><FaPhone aria-hidden="true" /><span><small>Call us</small><strong>+234 810 332 3437</strong></span></a>
              <a href="https://wa.me/2348103323437" rel="noopener noreferrer"><span className="landing-contact__whatsapp" aria-hidden="true">WA</span><span><small>WhatsApp</small><strong>Chat with our team</strong></span></a>
              <div><span className="landing-contact__pin" aria-hidden="true">PH</span><span><small>Location</small><strong>Port Harcourt, Rivers State</strong></span></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-wrap">
          <span>© 2026 Javelin Associates Ltd. All rights reserved.</span>
          <span>Professional security services · Rivers State, Nigeria</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
