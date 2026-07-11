import React, { useState } from 'react';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './TestimonialsSlider.css';

const TestimonialsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Chief Adebayo Johnson',
      role: 'CEO, TechCorp Nigeria',
      image: '👨‍💼',
      rating: 5,
      text: 'Javelin Associates has been securing our corporate headquarters for 3 years. Their professionalism and reliability are unmatched.'
    },
    {
      name: 'Mrs. Amina Yusuf',
      role: 'Estate Manager, Luxury Gardens',
      image: '👩‍💼',
      rating: 5,
      text: 'The security guards are well-trained, courteous, and always alert. Our residents feel safe and protected 24/7.'
    },
    {
      name: 'Mr. Chukwuma Okafor',
      role: 'Operations Director, Industrial Ltd',
      image: '👨‍💼',
      rating: 5,
      text: 'Great training and discipline. The reporting system is excellent and we have had zero security incidents since partnering with Javelin.'
    },
    {
      name: 'Pastor Emmanuel David',
      role: 'Senior Pastor, Faith Chapel',
      image: '👨‍🏫',
      rating: 5,
      text: 'Their event security team handled our 5000+ attendee conference flawlessly. Professional and highly recommended.'
    },
    {
      name: 'Dr. Fatima Abdullahi',
      role: 'Hospital Administrator',
      image: '👩‍⚕️',
      rating: 5,
      text: 'Reliable company with great training standards. Their guards are respectful, vigilant, and well-coordinated.'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2>What Our Clients Say</h2>
          <p>Trusted by leading organizations across Nigeria</p>
        </div>

        <div className="testimonials-slider">
          <button className="testimonial-arrow testimonial-arrow--prev" onClick={prevTestimonial}>
            <FaChevronLeft />
          </button>

          <div className="testimonial-card">
            <FaQuoteLeft className="testimonial-quote" />
            <div className="testimonial-rating">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p className="testimonial-text">{testimonials[currentIndex].text}</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">
                {testimonials[currentIndex].image}
              </div>
              <div className="testimonial-info">
                <div className="testimonial-name">{testimonials[currentIndex].name}</div>
                <div className="testimonial-role">{testimonials[currentIndex].role}</div>
              </div>
            </div>
          </div>

          <button className="testimonial-arrow testimonial-arrow--next" onClick={nextTestimonial}>
            <FaChevronRight />
          </button>
        </div>

        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`testimonial-dot ${index === currentIndex ? 'testimonial-dot--active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
