import React from 'react';
import HeroSlider from '../components/home/HeroSlider';
import AnnouncementSection from '../components/home/AnnouncementSection';
import AboutSection from '../components/home/AboutSection';
import ServicesSection from '../components/home/ServicesSection';
import TeamSection from '../components/home/TeamSection';
import SitesSection from '../components/home/SitesSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import GallerySection from '../components/home/GallerySection';
import TestimonialsSlider from '../components/home/TestimonialsSlider';

const Home = () => {
  return (
    <div className="home">
      <HeroSlider />
      <AnnouncementSection />
      <AboutSection />
      <ServicesSection />
      <TeamSection />
      <SitesSection />
      <WhyChooseUs />
      <GallerySection />
      <TestimonialsSlider />
    </div>
  );
};

export default Home;
