import React, { useRef } from 'react';
import Navbar from './NavBar/NavBar';
import Slidebar from "./Main/Slidebar";
import HeroSection from './HeroSection/HeroSection ';
import ThreeCards from './ThreeCards/ThreeCards';
import GenesisSection from './GenesisSection/GenesisSection';
import EmployeeTransportService from './EmployeeTransportService/EmployeeTransportService';
import TopFeatures from './TopFeatures/TopFeatures';
import Footer from './Footer/Footer';

const Home = () => {
  // Create references for Slidebar and TopFeatures components
  const slidebarRef = useRef(null);
  const topFeaturesRef = useRef(null);

  // Function to scroll to the Slidebar section
  const scrollToSlidebar = () => {
    if (slidebarRef.current) {
      slidebarRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to scroll to the TopFeatures section
  const scrollToTopFeatures = () => {
    if (topFeaturesRef.current) {
      topFeaturesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Pass scroll handlers to Navbar */}
      <Navbar scrollToSlidebar={scrollToSlidebar} scrollToTopFeatures={scrollToTopFeatures} />
      <HeroSection />
      <ThreeCards />
      {/* Attach the ref to Slidebar */}
      <div ref={slidebarRef}>
        <Slidebar />
      </div>
      <GenesisSection />
      <EmployeeTransportService />
      {/* Attach the ref to TopFeatures */}
      <div ref={topFeaturesRef}>
        <TopFeatures />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
