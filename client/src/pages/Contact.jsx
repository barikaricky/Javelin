import React from 'react';
import SEO from '../components/common/SEO';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import GoogleMap from '../components/contact/GoogleMap';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <SEO 
        title="Contact Javelin Associates - Security Company in Port Harcourt, Rivers State | 08103323437"
        description="Contact Javelin Associates Ltd for professional security services in Port Harcourt, Rivers State. Located at No. 58 Aker Road, Iwofe. Call us at 08103323437 or 09153542986. 24/7 emergency response available. Get a free security consultation today."
        keywords="contact security company Nigeria, Javelin Associates contact, security company Port Harcourt address, security services phone number Nigeria, 24/7 security contact, security company Aker Road, emergency security Nigeria, security consultation Rivers State"
        url="/#/contact"
      />
      <section className="contact-hero">
        <div className="container">
          <h1>Contact Javelin Associates - Professional Security Services in Port Harcourt</h1>
          <p>Get in touch with Rivers State's leading security company for expert protection solutions</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>

      <GoogleMap />
    </div>
  );
};

export default Contact;
