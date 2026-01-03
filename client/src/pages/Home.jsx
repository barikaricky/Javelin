import React from 'react';
import SEO from '../components/common/SEO';
import HeroSlider from '../components/home/HeroSlider';
import AnnouncementSection from '../components/home/AnnouncementSection';
import AboutSection from '../components/home/AboutSection';
import ServicesSection from '../components/home/ServicesSection';
import TeamSection from '../components/home/TeamSection';
import SitesSection from '../components/home/SitesSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import GallerySection from '../components/home/GallerySection';
import NewsSection from '../components/home/NewsSection';
import TestimonialsSlider from '../components/home/TestimonialsSlider';

const Home = () => {
  return (
    <div className="home">
      <SEO 
        title="Javelin Associates Ltd - #1 Professional Security Company in Rivers State, Port Harcourt, Nigeria"
        description="Leading security company in Rivers State, Port Harcourt, Nigeria. We provide 24/7 armed security guards, unarmed security personnel, K-9 units, CCTV surveillance, mobile patrol, and comprehensive security solutions. Licensed, trusted, and professional security services across Nigeria."
        keywords="security company Nigeria, security company Rivers State, security services Port Harcourt, armed security guards Nigeria, security company in Port Harcourt, private security Nigeria, K-9 security services, CCTV installation Rivers State, security guards Rivers State, professional security Nigeria, Javelin Associates, security services in Nigeria, bodyguard services Nigeria, event security Port Harcourt, corporate security Nigeria, security company near me, best security company Nigeria, security guard services, mobile patrol Nigeria, access control Nigeria"
        url="/"
      />
      <HeroSlider />
      <AboutSection />
      <ServicesSection />
      <TeamSection />
      <SitesSection />
      <WhyChooseUs />
      <GallerySection />
      <NewsSection />
      <TestimonialsSlider />
      <AnnouncementSection />
    </div>
  );
};

export default Home;
