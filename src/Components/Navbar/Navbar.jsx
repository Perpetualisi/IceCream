import React from "react";

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

const Navbar = ({
  language,
  handleLanguageChange,
  isDarkMode,
  handleDarkModeToggle,
  isMenuOpen,
  handleMenuToggle,
  handleCloseMenu
}) => {
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

  return (
    <nav
      className={`${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } sticky top-0 z-50 shadow`}
    >
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
          {/* Dark Mode Toggle */}
          <button
            onClick={handleDarkModeToggle}
            className="text-2xl hover:text-pink-400 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? "🌙" : "☀️"}
          </button>

          {/* Language Selector */}
          <select
            value={language}
            onChange={handleLanguageChange}
            className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          >
            <option value="en">EN</option>
            <option value="fr">FR</option>
            <option value="es">ES</option>
          </select>

          {/* Hamburger - Always visible */}
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
            isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
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
    </nav>
  );
};

export default Navbar;
