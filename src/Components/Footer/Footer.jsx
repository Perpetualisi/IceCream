import React from "react";
import './Footer.css'; 

const Footer = ({ language, isDarkMode, toggleDarkMode, changeLanguage }) => {
  const translations = {
    en: {
      about: "About Us",
      contact: "Contact Us",
      privacy: "Privacy Policy",
      language: "Language",
      rights: "All rights reserved.",
      followUs: "Follow us",
      description: "Frostify is your go-to platform for cool treats and warm connections. We deliver excellence with every scoop!",
    },
    fr: {
      about: "À propos de nous",
      contact: "Contactez-nous",
      privacy: "Politique de confidentialité",
      language: "Langue",
      rights: "Tous droits réservés.",
      followUs: "Suivez-nous",
      description: "Frostify est votre plateforme de choix pour des délices glacés et des connexions chaleureuses. L'excellence à chaque bouchée!",
    },
    es: {
      about: "Sobre nosotros",
      contact: "Contáctenos",
      privacy: "Política de privacidad",
      language: "Idioma",
      rights: "Todos los derechos reservados.",
      followUs: "Síguenos",
      description: "Frostify es tu lugar ideal para postres fríos y conexiones cálidas. ¡Excelencia en cada cucharada!",
    },
  };

  const content = translations[language];
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`footer ${isDarkMode ? "dark" : ""}`}>
      <div className="footer-container">
        <div className="footer-description">
          <h3>Frostify</h3>
          <p>{content.description}</p>
        </div>

        <div className="footer-links">
          <ul>
            <li><a href="#about">{content.about}</a></li>
            <li><a href="#contact">{content.contact}</a></li>
            <li><a href="#privacy">{content.privacy}</a></li>
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

        <div className="footer-social">
          <p>{content.followUs}:</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">👍</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">🐦</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">📸</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Frostify. {content.rights}</p>
      </div>
    </footer>
  );
};

export default Footer;
