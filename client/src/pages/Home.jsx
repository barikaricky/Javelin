import React from 'react';
import SEOHead from '../components/SEO/SEOHead';
import HeroSlider from '../components/home/HeroSlider';
import AnnouncementSection from '../components/home/AnnouncementSection';
import AboutSection from '../components/home/AboutSection';
import ServicesSection from '../components/home/ServicesSection';
import TeamSection from '../components/home/TeamSection';
import SitesSection from '../components/home/SitesSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import GallerySection from '../components/home/GallerySection';
import TestimonialsSlider from '../components/home/TestimonialsSlider';
import ActivitiesSection from '../components/home/ActivitiesSection';
import BonusSection from '../components/home/BonusSection';
import GuardsSection from '../components/home/GuardsSection';

const Home = () => {
  return (
    <div className="home">
      <SEOHead 
        title="Best Security Company Nigeria"
        description="Javelin Associates - Nigeria's #1 professional security company providing armed guards, VIP protection, corporate security, event security & 24/7 surveillance in Lagos, Abuja, Port Harcourt. Licensed by NSCDC. Free consultation!"
        keywords="security company Nigeria, security services Lagos, armed guards Nigeria, VIP protection Lagos, corporate security Abuja, event security Nigeria, best security company Lagos, professional guards Nigeria"
        url="/"
      />
      <HeroSlider />
      <AnnouncementSection />
      <AboutSection />
      <ServicesSection />
      <ActivitiesSection />
      <TeamSection />
      <GuardsSection />
      <SitesSection />
      <BonusSection />
      <WhyChooseUs />
      <GallerySection />
      <TestimonialsSlider />
    </div>
  );
};

export default Home;
