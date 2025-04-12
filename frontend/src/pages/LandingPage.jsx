import React from 'react';
import Navbar from '../components/LandPageComponents/Navbar.jsx';
import HeroSection from '../components/LandPageComponents/HeroSection.jsx';
import FeaturesSection from '../components/LandPageComponents/FeaturesSection.jsx';
import TestimonialSection from '../components/LandPageComponents/TestimonialsSection.jsx';
import HowItWorks from '../components/LandPageComponents/HowItWorks.jsx';
import FAQPage from '../components/LandPageComponents/FAQs.jsx';
import Footer from '../components/LandPageComponents/Footer.jsx';

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