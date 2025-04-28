import React from "react";
import './Footer.css'; // We'll style it here

const Footer = ({ language, isDarkMode, toggleDarkMode, changeLanguage }) => {
  const translations = {
    en: {
      about: "About Us",
      contact: "Contact Us",
      privacy: "Privacy Policy",
      language: "Language",
    },
    fr: {
      about: "À propos de nous",
      contact: "Contactez-nous",
      privacy: "Politique de confidentialité",
      language: "Langue",
    },
    es: {
      about: "Sobre nosotros",
      contact: "Contáctenos",
      privacy: "Política de privacidad",
      language: "Idioma",
    },
  };

  const content = translations[language];

  return (
    <footer className={`footer ${isDarkMode ? "dark" : ""}`}>
      <div className="footer-container">
        <div className="footer-links">
          <ul>
            <li>{content.about}</li>
            <li>{content.contact}</li>
            <li>{content.privacy}</li>
            
          </ul>
        </div>
        <div className="footer-language">
          <label htmlFor="language-select">{content.language}: </label>
          <select
            id="language-select"
            onChange={(e) => changeLanguage(e.target.value)}
            value={language}
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
          </select>
        </div>
        <div className="footer-darkmode-toggle">
          <label htmlFor="dark-mode-toggle">Dark Mode: </label>
          <input
            type="checkbox"
            id="dark-mode-toggle"
            checked={isDarkMode}
            onChange={toggleDarkMode}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
