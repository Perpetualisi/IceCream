import React, { useState } from "react";

const translations = {
  en: {
    home: "Home",
    flavours: "Flavours",
    testimonials: "Testimonials",
    about: "About",
    specialOffers: "Special Offers",
    gallery: "Gallery",
    locations: "Locations",
    contact: "Contact"
  },
  fr: {
    home: "Accueil",
    flavours: "Saveurs",
    testimonials: "Témoignages",
    about: "À propos",
    specialOffers: "Offres Spéciales",
    gallery: "Galerie",
    locations: "Emplacements",
    contact: "Contact"
  },
  es: {
    home: "Inicio",
    flavours: "Sabores",
    testimonials: "Testimonios",
    about: "Acerca de",
    specialOffers: "Ofertas Especiales",
    gallery: "Galería",
    locations: "Ubicaciones",
    contact: "Contacto"
  }
};

const flavourList = [
  "Vanilla Dream",
  "Chocolate Heaven",
  "Strawberry Bliss",
  "Minty Fresh",
  "Caramel Crunch",
  "Berry Explosion",
  "Coconut Paradise",
  "Mango Tango",
  "Peach Perfect"
];

const Navbar = ({
  language,
  handleLanguageChange,
  isDarkMode,
  handleDarkModeToggle,
  isMenuOpen,
  handleMenuToggle,
  handleCloseMenu,
  searchQuery,
  handleSearchChange
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const linkKeys = [
    "home",
    "flavours",
    "testimonials",
    "about",
    "specialOffers",
    "gallery",
    "locations",
    "contact"
  ];

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const filteredFlavours = flavourList.filter((f) =>
    f.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <nav className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-800 text-white"} sticky top-0 z-50 shadow`}>
      {/* Navbar Container */}
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center relative">

        {/* Logo */}
        <div className="flex items-center">
          <h1 className="flex space-x-1 font-poppins text-2xl font-bold">
            {"Frostify".split("").map((char, i) => (
              <span
                key={i}
                className="inline-block"
                style={{
                  transform: `rotate(${[-25, -15, -8, 0, 8, 15, 25, 30][i] || 0}deg)`
                }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode */}
          <button
            onClick={handleDarkModeToggle}
            className="text-2xl hover:text-pink-400 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? "🌙" : "🌞"}
          </button>

          {/* Language Selector */}
          <select
            value={language}
            onChange={handleLanguageChange}
            className="px-3 py-1 rounded border border-gray-400 bg-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="en">EN</option>
            <option value="fr">FR</option>
            <option value="es">ES</option>
          </select>

          {/* Search */}
          <button
            onClick={openSearch}
            className="text-2xl hover:text-pink-400 transition-colors"
            aria-label="Open Search"
          >
            🔍
          </button>

          {/* Hamburger */}
          <button
            onClick={handleMenuToggle}
            className="text-3xl hover:text-pink-400 transition-colors"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Hamburger Menu */}
      {isMenuOpen && (
        <div
          className={`${
            isDarkMode ? "bg-gray-900 text-white" : "bg-gray-800 text-white"
          } absolute w-full left-0 top-full shadow-lg`}
        >
          <ul className="flex flex-col space-y-2 px-6 py-4 text-lg">
            {linkKeys.map((link) => (
              <li key={link}>
                <a
                  href={`#${link}`}
                  onClick={handleCloseMenu}
                  className="block hover:text-pink-400 transition-colors"
                >
                  {translations[language][link]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex flex-col items-center justify-center z-50 px-6">
          <input
            type="text"
            placeholder="Search Frostify..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full max-w-lg p-4 rounded-full text-lg outline-none focus:ring-2 focus:ring-pink-400"
            autoFocus
          />
          <button
            onClick={closeSearch}
            className="mt-4 text-white underline hover:text-pink-400"
          >
            Cancel
          </button>

          {searchQuery && (
            <div className="mt-4 w-full max-w-lg bg-white rounded shadow-lg max-h-64 overflow-y-auto">
              {filteredFlavours.length > 0 ? (
                filteredFlavours.map((f, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {f}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">No results found.</div>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
