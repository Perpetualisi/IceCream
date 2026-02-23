import React from "react";

const Footer = ({ language = "en", isDarkMode, toggleDarkMode, changeLanguage }) => {
  const translations = {
    en: {
      about: "Our Story",
      contact: "Contact Us",
      privacy: "Privacy Policy",
      language: "Language",
      rights: "All rights reserved.",
      followUs: "Follow the Flavor",
      description:
        "Frostify is your go-to platform for cool treats and warm connections. We deliver excellence with every scoop!",
      quickLinks: "Quick Scoops",
    },
    fr: {
      about: "Notre Histoire",
      contact: "Contactez-nous",
      privacy: "Confidentialité",
      language: "Langue",
      rights: "Tous droits réservés.",
      followUs: "Suivez le Goût",
      description:
        "Frostify est votre plateforme de choix pour des délices glacés et des connexions chaleureuses. L'excellence à chaque bouchée!",
      quickLinks: "Accès Rapide",
    },
    es: {
      about: "Nuestra Historia",
      contact: "Contáctenos",
      privacy: "Privacidad",
      language: "Idioma",
      rights: "Todos los derechos reservados.",
      followUs: "Sigue el Sabor",
      description:
        "Frostify es tu lugar ideal para postres fríos y conexiones cálidas. ¡Excelencia en cada cucharada!",
      quickLinks: "Enlaces Rápidos",
    },
  };

  const content = translations[language] || translations.en;
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`relative pt-20 pb-10 transition-colors duration-500 overflow-hidden ${
        isDarkMode ? "bg-[#0f0a06] text-white" : "bg-[#FFFBF2] text-[#1A1008]"
      }`}
    >
      {/* Decorative Background Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent opacity-30"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <h3 className="text-3xl font-black italic tracking-tighter uppercase italic">
              Frostify<span className="text-pink-500">.</span>
            </h3>
            <p className="text-sm leading-relaxed opacity-70 font-medium max-w-xs">
              {content.description}
            </p>
            <div className="flex items-center gap-4">
               <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-pink-500/20 bg-pink-500/10 flex items-center justify-center text-[10px]">🍦</div>
                  ))}
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Top Rated 2024</span>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-pink-500 mb-6">
              {content.quickLinks}
            </h4>
            <ul className="space-y-4">
              {["about", "flavours", "special-offers", "contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link}`}
                    className="text-sm font-bold opacity-60 hover:opacity-100 hover:text-pink-500 transition-all flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-pink-500 transition-all"></span>
                    {content[link.replace('-', '')] || link.charAt(0).toUpperCase() + link.slice(1).replace('-', ' ')}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Preferences Column */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-pink-500 mb-6">
              {content.language} & Style
            </h4>
            <div className="space-y-4">
              <select
                className={`w-full p-3 rounded-xl border text-xs font-bold uppercase tracking-widest outline-none transition-all cursor-pointer ${
                  isDarkMode
                    ? "bg-white/5 border-white/10 text-white focus:border-pink-500"
                    : "bg-white border-black/5 text-[#1A1008] focus:border-pink-500"
                }`}
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
              >
                <option value="en">English (US)</option>
                <option value="fr">Français (FR)</option>
                <option value="es">Español (ES)</option>
              </select>

              <button
                onClick={toggleDarkMode}
                className={`w-full p-3 rounded-xl border text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all ${
                    isDarkMode 
                    ? "bg-white text-black border-white" 
                    : "bg-black text-white border-black"
                }`}
              >
                {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>
            </div>
          </div>

          {/* Social Column */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-pink-500 mb-6">
              {content.followUs}
            </h4>
            <div className="flex gap-3">
              {[
                { ico: "FB", link: "#" },
                { ico: "IG", link: "#" },
                { ico: "TW", link: "#" },
                { ico: "TK", link: "#" }
              ].map((soc) => (
                <a
                  key={soc.ico}
                  href={soc.link}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-black border transition-all hover:-translate-y-1 ${
                    isDarkMode 
                    ? "bg-white/5 border-white/10 hover:bg-pink-500 hover:border-pink-500" 
                    : "bg-white border-black/5 hover:bg-pink-500 hover:text-white hover:border-pink-500"
                  }`}
                >
                  {soc.ico}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${
          isDarkMode ? "border-white/5" : "border-black/5"
        }`}>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-40 text-center md:text-left">
            &copy; {currentYear} Frostify Artisan Ice Cream. {content.rights}
          </p>
          <div className="flex gap-6">
             <a href="#privacy" className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">
                {content.privacy}
             </a>
             <span className="text-[10px] font-black uppercase tracking-widest opacity-20">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;