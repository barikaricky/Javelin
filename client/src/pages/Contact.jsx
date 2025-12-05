import React from 'react';
import SEOHead from '../components/SEO/SEOHead';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import GoogleMap from '../components/contact/GoogleMap';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <SEOHead 
        title="Contact Us - Get Free Security Quote Nigeria"
        description="Contact Javelin Associates for professional security services in Nigeria. Get free security assessment & quote. Call +234-XXX-XXXX or visit our Lagos, Abuja, Port Harcourt offices. 24/7 emergency response."
        keywords="contact security company Nigeria, security services quote Lagos, free security assessment Nigeria, security company phone number, Javelin Associates contact, security office Lagos Abuja"
        url="/contact"
      />
      <section className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch with Javelin Associates for professional security services</p>
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
