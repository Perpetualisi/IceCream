import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import Flavours from './Components/Flavours/Flavours';
import Testimonials from './Components/Testimonials/Testimonials';
import About from './Components/About/About';
import SpecialOffers from './Components/SpecialOffers/SpecialOffers';
import './App.css';
import Gallery from './Components/Gallery/Gallery';
import Locations from './Components/Locations/Locations';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';

const App = () => {
  const [language, setLanguage] = useState('en');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : true; 
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      <Navbar 
        language={language}
        handleLanguageChange={handleLanguageChange}
        isDarkMode={isDarkMode}
        handleDarkModeToggle={handleDarkModeToggle}
        isMenuOpen={isMenuOpen}
        handleMenuToggle={handleMenuToggle}
        handleCloseMenu={handleCloseMenu}
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
      />
      <Hero language={language} isDarkMode={isDarkMode} />
      <Flavours language={language} isDarkMode={isDarkMode} />
      <Testimonials language={language} isDarkMode={isDarkMode} />
      <About language={language} isDarkMode={isDarkMode} />
      <SpecialOffers language={language} isDarkMode={isDarkMode} />
      <Gallery language={language} isDarkMode={isDarkMode} />
      <Locations language={language} isDarkMode={isDarkMode} />
      <Contact language={language} isDarkMode={isDarkMode} />
      <Footer 
        language={language} 
        isDarkMode={isDarkMode} 
        toggleDarkMode={handleDarkModeToggle} 
        changeLanguage={handleLanguageChange} 
      />
    </div>
  );
};

export default App;
