import React from 'react';
import HeroSlider from '../components/home/HeroSlider';
import AboutSection from '../components/home/AboutSection';
import ServicesSection from '../components/home/ServicesSection';
import SitesSection from '../components/home/SitesSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import TestimonialsSlider from '../components/home/TestimonialsSlider';

const Home = () => {
  return (
    <div className="home">
      <HeroSlider />
      <AboutSection />
      <ServicesSection />
      <SitesSection />
      <WhyChooseUs />
      <TestimonialsSlider />
    </div>
  );
};

export default Home;
