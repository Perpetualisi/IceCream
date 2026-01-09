import React from "react";

const Footer = ({ language, isDarkMode, toggleDarkMode, changeLanguage }) => {
  const translations = {
    en: {
      about: "About Us",
      contact: "Contact Us",
      privacy: "Privacy Policy",
      language: "Language",
      rights: "All rights reserved.",
      followUs: "Follow us",
      description:
        "Frostify is your go-to platform for cool treats and warm connections. We deliver excellence with every scoop!",
    },
    fr: {
      about: "À propos de nous",
      contact: "Contactez-nous",
      privacy: "Politique de confidentialité",
      language: "Langue",
      rights: "Tous droits réservés.",
      followUs: "Suivez-nous",
      description:
        "Frostify est votre plateforme de choix pour des délices glacés et des connexions chaleureuses. L'excellence à chaque bouchée!",
    },
    es: {
      about: "Sobre nosotros",
      contact: "Contáctenos",
      privacy: "Política de privacidad",
      language: "Idioma",
      rights: "Todos los derechos reservados.",
      followUs: "Síguenos",
      description:
        "Frostify es tu lugar ideal para postres fríos y conexiones cálidas. ¡Excelencia en cada cucharada!",
    },
  };

  const content = translations[language];
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"
      } py-12`}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Description */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Frostify</h3>
          <p className="text-sm md:text-base">{content.description}</p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-2">{content.about}</h4>
          <ul className="space-y-1">
            <li>
              <a
                href="#about"
                className="hover:text-pink-500 transition-colors"
              >
                {content.about}
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-pink-500 transition-colors"
              >
                {content.contact}
              </a>
            </li>
            <li>
              <a
                href="#privacy"
                className="hover:text-pink-500 transition-colors"
              >
                {content.privacy}
              </a>
            </li>
          </ul>
        </div>

        {/* Language Selector */}
        <div>
          <h4 className="font-semibold mb-2">{content.language}</h4>
          <select
            className={`w-full p-2 rounded border ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-gray-200"
                : "bg-white border-gray-300 text-gray-800"
            } focus:ring-2 focus:ring-pink-400 outline-none`}
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
          </select>

          {/* Dark Mode Toggle */}
          <div className="mt-4 flex items-center space-x-2">
            <label htmlFor="dark-mode-toggle" className="font-semibold">
              Dark Mode:
            </label>
            <input
              id="dark-mode-toggle"
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleDarkMode}
              className="w-5 h-5 accent-pink-500"
            />
          </div>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-semibold mb-2">{content.followUs}</h4>
          <div className="flex space-x-4 text-2xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              👍
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              🐦
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition-colors"
            >
              📸
            </a>
          </div>
        </div>
      </div>

      <div
        className={`mt-12 border-t ${
          isDarkMode ? "border-gray-700" : "border-gray-300"
        } pt-4 text-center text-sm`}
      >
        &copy; {currentYear} Frostify. {content.rights}
      </div>
    </footer>
  );
};

export default Footer;
