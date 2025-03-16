import React from 'react';
import Navbar from '../components/DashboardComponents/Navbar.jsx';
import HeroSection from '../components/DashboardComponents/HeroSection.jsx';
import FeaturesSection from '../components/DashboardComponents/FeaturesSection.jsx';
import TestimonialSection from '../components/DashboardComponents/TestimonialsSection.jsx';
import HowItWorks from '../components/DashboardComponents/HowItWorks.jsx';
import FAQPage from '../components/DashboardComponents/FAQs.jsx';
import Footer from '../components/DashboardComponents/Footer.jsx';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-inter">
      <div className="container mx-auto px-6 py-6">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <TestimonialSection />
        <HowItWorks />
        <FAQPage />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;