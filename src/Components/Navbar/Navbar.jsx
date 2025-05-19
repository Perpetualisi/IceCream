import React, { useState } from "react";
import './Navbar.css';

const translations = {
  en: { home: "Home", flavours: "Flavours", testimonials: "Testimonials", about: "About", specialOffers: "Special Offers", gallery: "Gallery", locations: "Locations", contact: "Contact" },
  fr: { home: "Accueil", flavours: "Saveurs", testimonials: "Témoignages", about: "À propos", specialOffers: "Offres Spéciales", gallery: "Galerie", locations: "Emplacements", contact: "Contact" },
  es: { home: "Inicio", flavours: "Sabores", testimonials: "Testimonios", about: "Acerca de", specialOffers: "Ofertas Especiales", gallery: "Galería", locations: "Ubicaciones", contact: "Contacto" }
};

const flavourList = [
  "Vanilla Dream", "Chocolate Heaven", "Strawberry Bliss",
  "Minty Fresh", "Caramel Crunch", "Berry Explosion",
  "Coconut Paradise", "Mango Tango", "Peach Perfect"
];

const Navbar = ({ language, handleLanguageChange, isDarkMode, handleDarkModeToggle, isMenuOpen, handleMenuToggle, handleCloseMenu, searchQuery, handleSearchChange }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchFocus = () => setIsSearchFocused(true);
  const handleSearchBlur = () => setIsSearchFocused(false);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const filteredFlavours = flavourList.filter(flavour =>
    flavour.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <nav className={`navbar ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="navbar-container">

        {/* Dark Mode Toggle */}
        <div className="dark-mode-toggle" onClick={handleDarkModeToggle}>
          {isDarkMode ? "🌙" : "🌞"}
        </div>

        <div className="search-icon" onClick={openSearch}>
          🔍
        </div>

        <div className="language-selector">
          <select value={language} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
          </select>
        </div>

        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">🌐</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">🐦</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">📸</a>
        </div>

        {/* Curved Logo */}
        <div className="logo">
          <h1>
            {"Frostify".split("").map((char, index) => (
              <span key={index} className="curve-letter">{char}</span>
            ))}
          </h1>
        </div>

        <div className="menu-icon" onClick={handleMenuToggle}>
          {isMenuOpen ? <span className="cancel-icon">&#10005;</span> : <span className="hamburger-icon">&#9776;</span>}
        </div>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><a href="#home" onClick={handleCloseMenu}>{translations[language].home}</a></li>
            <li><a href="#flavours" onClick={handleCloseMenu}>{translations[language].flavours}</a></li>
            <li><a href="#testimonials" onClick={handleCloseMenu}>{translations[language].testimonials}</a></li>
            <li><a href="#about" onClick={handleCloseMenu}>{translations[language].about}</a></li>
            <li><a href="#special-offers" onClick={handleCloseMenu}>{translations[language].specialOffers}</a></li>
            <li><a href="#gallery" onClick={handleCloseMenu}>{translations[language].gallery}</a></li>
            <li><a href="#locations" onClick={handleCloseMenu}>{translations[language].locations}</a></li>
            <li><a href="#contact" onClick={handleCloseMenu}>{translations[language].contact}</a></li>
          </ul>
        </div>

      </div>

      {isSearchOpen && (
        <div className="search-overlay">
          <input
            type="text"
            placeholder="Search Frostify..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            autoFocus
          />
          <button className="cancel-search" onClick={closeSearch}>Cancel</button>

          {searchQuery && (
            <div className="search-results">
              {filteredFlavours.length > 0 ? (
                filteredFlavours.map((flavour, index) => (
                  <div key={index} className="search-result-item">
                    {flavour}
                  </div>
                ))
              ) : (
                <div className="no-results">No results found.</div>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
