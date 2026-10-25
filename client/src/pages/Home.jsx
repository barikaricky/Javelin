import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowRight,
  FaBuilding,
  FaCalendarAlt,
  FaCheck,
  FaCheckCircle,
  FaCar,
  FaDog,
  FaHome,
  FaInstagram,
  FaKey,
  FaLinkedinIn,
  FaPhone,
  FaShieldAlt,
  FaUsers,
  FaUserSecret,
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
    image: '/assets/images/images/guard2.jpg',
    position: 'center 58%'
  },
  {
    eyebrow: 'Start with a free assessment',
    title: <>KNOW YOUR <em>RISKS.</em><br />PLAN YOUR RESPONSE.</>,
    description: 'We assess your site, identify vulnerabilities and recommend a practical security plan.',
    background: 'three',
    image: '/assets/images/images/site2.jpg',
    position: 'center 54%'
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
    image: '/images/Expect-led.jpeg',
    position: 'center 56%'
  }
];

const services = [
  {
    icon: FaShieldAlt,
    title: 'Corporate Security',
    description: 'Protect offices, banks and commercial spaces with trained officers, visible deterrence and rapid response support.',
    features: ['Uniformed security officers', 'Access control and visitor screening', '24/7 monitoring and incident response']
  },
  {
    icon: FaHome,
    title: 'Residential Security',
    description: 'Keep homes, families and estates safe with dependable guard coverage, gate control and a reassuring presence.',
    features: ['Residential guard coverage', 'Gatehouse and perimeter support', 'Visitor management and patrol reporting']
  },
  {
    icon: FaDog,
    title: 'K-9 Security',
    description: 'Add trained canine teams to detection, high-security patrols and rapid intervention at sensitive locations.',
    features: ['Handler-led operations', 'Detection and patrol support', 'Reinforcement for high-risk sites']
  },
  {
    icon: FaBuilding,
    title: 'Industrial & Safety Security',
    description: 'Safeguard factories, warehouses and industrial facilities with safety-focused planning and trained personnel.',
    features: ['Perimeter and asset protection', 'Fire watch and safety patrols', 'Incident reporting and site supervision']
  },
  {
    icon: FaCalendarAlt,
    title: 'Event Security',
    description: 'Keep events secure and well-managed with crowd control, access monitoring and coordinated incident response.',
    features: ['Crowd and guest management', 'Entry screening and access support', 'VIP protection and response planning']
  },
  {
    icon: FaCar,
    title: 'Mobile Patrol & Escort Security',
    description: 'Protect property and movements with scheduled patrols, vehicle escort and responsive support.',
    features: ['Scheduled and random patrol checks', 'Vehicle escort and mobility support', 'Visible deterrence and incident response']
  },
  {
    icon: FaUserSecret,
    title: 'VIP & Executive Protection',
    description: 'Provide discreet close protection for executives, dignitaries and high-profile guests.',
    features: ['Close-protection officers', 'Route planning and threat awareness', 'Advance coordination and confidentiality']
  },
  {
    icon: FaVideo,
    title: 'CCTV Monitoring',
    description: 'Improve real-time visibility of your premises with surveillance, motion alerts and professional support.',
    features: ['HD camera installation and monitoring', 'Live and motion alerts', 'Remote observation and response coordination']
  },
  {
    icon: FaKey,
    title: 'Access Control Systems',
    description: 'Strengthen entry points with biometric or card access and organised visitor management.',
    features: ['Biometric and card-based access', 'Visitor registration and logging', 'CCTV and alarm integration']
  },
  {
    icon: FaUsers,
    title: 'Security Consulting',
    description: 'Turn expert audits and risk assessments into practical recommendations to improve safety.',
    features: ['Vulnerability and risk assessment', 'Security planning and policy review', 'Training and compliance support']
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
                backgroundImage: `url("${slide.image}")`,
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
              {services.map(({ icon: Icon, title, description, features }) => (
                <article className="landing-card" key={title}>
                  <div className="landing-card__icon"><Icon aria-hidden="true" /></div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <ul className="landing-card__features">
                    {features.map((feature) => (
                      <li key={feature}><FaCheckCircle aria-hidden="true" />{feature}</li>
                    ))}
                  </ul>
                  <Link
                    className="landing-card__link"
                    to="/book-meeting"
                  >
                    Request a quote <FaArrowRight aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="landing-quote" aria-labelledby="landing-quote-title">
          <div className="landing-quote__grid" aria-hidden="true" />
          <div className="landing-wrap landing-quote__content">
            <p className="landing-eyebrow">Let’s plan your protection</p>
            <h2 id="landing-quote-title">Your risks are unique.<br /><em>Your quote should be too.</em></h2>
            <p>Tell us what you need to protect. Our team will help shape a practical security plan around your site, people and priorities.</p>
            <div className="landing-quote__actions">
              <Link className="landing-button landing-button--primary" to="/book-meeting">
                Request a quote <FaArrowRight aria-hidden="true" />
              </Link>
              <a className="landing-button landing-button--outline" href="https://wa.me/2348134233131" target="_blank" rel="noopener noreferrer">
                Chat with our team
              </a>
            </div>
            <span className="landing-quote__orbit landing-quote__orbit--one" aria-hidden="true" />
            <span className="landing-quote__orbit landing-quote__orbit--two" aria-hidden="true" />
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
              <a href="tel:+2348134233131"><FaPhone aria-hidden="true" /><span><small>Call us</small><strong>08134233131</strong></span></a>
              <a href="https://wa.me/2348134233131" target="_blank" rel="noopener noreferrer"><span className="landing-contact__whatsapp" aria-hidden="true">WA</span><span><small>WhatsApp</small><strong>Chat with our team</strong></span></a>
              <div><span className="landing-contact__pin" aria-hidden="true">PH</span><span><small>Location</small><strong>Port Harcourt, Rivers State</strong></span></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-wrap">
          <span>© 2026 Javelin Associates Ltd. All rights reserved.</span>
          <span>Professional security services · Rivers State, Nigeria</span>
          <nav className="landing-footer__social" aria-label="Social media">
            <a href="https://www.instagram.com/javelinassociates/" target="_blank" rel="noopener noreferrer">
              <FaInstagram aria-hidden="true" /> Instagram
            </a>
            <a href="https://linkedin.com/company/javelin-associates-limited/" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn aria-hidden="true" /> LinkedIn
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Home;
