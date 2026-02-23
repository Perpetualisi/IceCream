import React, { useState, useEffect, useRef } from "react";

const translations = {
  en: {
    home: "Home", flavours: "Flavours", testimonials: "Testimonials",
    about: "About", specialOffers: "Special Offers", gallery: "Gallery",
    locations: "Locations", contact: "Contact",
  },
  fr: {
    home: "Accueil", flavours: "Saveurs", testimonials: "Témoignages",
    about: "À propos", specialOffers: "Offres Spéciales", gallery: "Galerie",
    locations: "Emplacements", contact: "Contact",
  },
  es: {
    home: "Inicio", flavours: "Sabores", testimonials: "Testimonios",
    about: "Acerca de", specialOffers: "Ofertas Especiales", gallery: "Galería",
    locations: "Ubicaciones", contact: "Contacto",
  },
};

const linkKeys = [
  { key: "home", emoji: "🏠" },
  { key: "flavours", emoji: "🍦" },
  { key: "testimonials", emoji: "💬" },
  { key: "about", emoji: "✨" },
  { key: "specialOffers", emoji: "🎁" },
  { key: "gallery", emoji: "🖼️" },
  { key: "locations", emoji: "📍" },
  { key: "contact", emoji: "📮" },
];

const ArcLogo = ({ dark }) => (
  <svg
    viewBox="0 0 220 58"
    className="frostify-logo-svg"
    aria-label="Frostify"
    style={{ overflow: "visible", flexShrink: 0 }}
  >
    <defs>
      <path id="nb-arc" d="M 10,52 Q 110,-14 210,52" fill="none" />
      <linearGradient id="nb-shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FF6B8A" />
        <stop offset="35%" stopColor="#FFB347" />
        <stop offset="65%" stopColor="#FF6B8A" />
        <stop offset="100%" stopColor="#C84B6E" />
      </linearGradient>
      <filter id="nb-shadow" x="-10%" y="-30%" width="120%" height="160%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#FF6B8A" floodOpacity="0.35" />
      </filter>
    </defs>
    <text
      fill="url(#nb-shimmer)"
      filter="url(#nb-shadow)"
      fontFamily="'Playfair Display', serif"
      fontStyle="italic"
      fontWeight="900"
      fontSize="28"
      letterSpacing="1.5"
    >
      <textPath href="#nb-arc" startOffset="50%" textAnchor="middle">
        Frostify
      </textPath>
    </text>
  </svg>
);

const Navbar = ({
  language = "en",
  handleLanguageChange,
  isDarkMode = false,
  handleDarkModeToggle,
  isMenuOpen,
  handleMenuToggle,
  handleCloseMenu,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const t = translations[language] || translations.en;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (e, id) => {
    if (e) e.preventDefault();
    setActiveLink(id);
    handleCloseMenu?.();

    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const hyphenatedId = id.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
    const element = document.getElementById(id) || document.getElementById(hyphenatedId);
    
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&family=DM+Sans:wght@400;500;600&display=swap');

        .nb {
          font-family:'DM Sans',sans-serif;
          position:fixed; top:0; left:0; right:0; z-index:300;
          height:72px; display:flex; align-items:center;
          transition: background .35s, box-shadow .35s, height .3s;
        }
        .nb.scrolled {
          background: ${isDarkMode ? "rgba(18,12,6,.9)" : "rgba(255,248,240,.88)"};
          backdrop-filter:blur(22px) saturate(1.7);
          box-shadow:0 8px 28px rgba(26,16,8,.07);
          height:62px;
        }

        .nb-inner { 
          max-width:1280px; 
          margin:0 auto; 
          padding:0 24px; 
          width:100%; 
          display:flex; 
          align-items:center; 
          justify-content:space-between; 
        }

        /* Mobile Adjustments for Logo Space */
        @media (max-width: 768px) {
          .nb-inner {
            padding: 0 12px; /* Reduce side padding to give more internal room */
          }
          .nb-logo-link {
            transform: translateX(-8px); /* Nudge logo further left */
          }
          .frostify-logo-svg {
            width: 120px; /* Scale logo down slightly so it doesn't hit the center */
            height: 38px;
          }
          .nb-controls {
            gap: 8px; /* Tighten gap between buttons */
          }
        }

        @media (min-width: 769px) {
          .frostify-logo-svg {
            width: 148px;
            height: 44px;
          }
        }

        .nb-controls { display:flex; align-items:center; gap:12px; }

        .nb-mode-btn {
          width:42px; height:24px; border-radius:12px; border:none; cursor:pointer;
          background: ${isDarkMode ? "linear-gradient(135deg,#FF6B8A,#C84B6E)" : "linear-gradient(135deg,#1A1008,#3A2A1A)"};
          position:relative; transition: background .3s;
        }
        .nb-mode-thumb {
          width:18px; height:18px; border-radius:50%; background:#FFF8F0;
          display:flex; align-items:center; justify-content:center; font-size:11px;
          transition: transform .35s cubic-bezier(.34,1.56,.64,1);
          transform: ${isDarkMode ? "translateX(18px)" : "translateX(0)"};
        }

        .nb-lang {
          appearance:none; border:1.5px solid rgba(180,120,80,.28); border-radius:100px;
          padding:5px 20px 5px 10px; font-size:.7rem; font-weight:600; cursor:pointer;
          background: ${isDarkMode ? "rgba(255,255,255,.07)" : "rgba(255,255,255,.55)"};
          color: ${isDarkMode ? "#FFF8F0" : "#1A1008"};
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23D4896A'/%3E%3C/svg%3E");
          background-repeat:no-repeat; background-position:right 7px center;
        }

        .nb-ham {
          display:flex; flex-direction:column; gap:5px; width:38px; height:38px;
          align-items:center; justify-content:center; background:rgba(255,107,138,.08);
          border:1.5px solid rgba(255,107,138,.18); border-radius:10px; cursor:pointer;
        }
        .nb-bar { width:18px; height:2px; border-radius:2px; background: ${isDarkMode ? "#FFF8F0" : "#1A1008"}; transition: all .3s; }
        
        .nb-drawer {
          position:fixed; top:0; right:0; width:min(340px,90vw); height:100dvh;
          background: ${isDarkMode ? "#1A1008" : "#FFF8F0"}; z-index:320;
          transform: translateX(110%); transition: transform .38s cubic-bezier(.32,.72,0,1);
          box-shadow:-12px 0 48px rgba(0,0,0,.2);
        }
        .nb-drawer.open { transform: translateX(0); }
        
        .nb-overlay {
          position:fixed; inset:0; background:rgba(26,16,8,.45); backdrop-filter:blur(5px);
          z-index:310; display:none;
        }
        .nb-overlay.show { display:block; }

        .nb-drawer-link {
          display:flex; align-items:center; gap:14px; padding:16px 24px;
          text-decoration:none; color: ${isDarkMode ? "rgba(255,248,240,.88)" : "#1A1008"};
          font-size:1.1rem; font-weight:600; border-left:4px solid transparent; transition: all .2s;
        }
        .nb-drawer-link:hover, .nb-drawer-link.active {
          background:rgba(255,107,138,.07); color:#FF6B8A; border-left-color:#FF6B8A; padding-left:32px;
        }
      `}</style>

      <div className={`nb-overlay${isMenuOpen ? " show" : ""}`} onClick={handleCloseMenu} />

      <nav className={`nb${scrolled ? " scrolled" : ""}${isDarkMode ? " nb-dark" : ""}`}>
        <div className="nb-inner">
          <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="nb-logo-link">
            <ArcLogo dark={isDarkMode} />
          </a>

          <div className="nb-controls">
            <button className="nb-mode-btn" onClick={handleDarkModeToggle} aria-label="Toggle Dark Mode">
              <div className="nb-mode-thumb">{isDarkMode ? "🌙" : "☀️"}</div>
            </button>

            <select value={language} onChange={handleLanguageChange} className="nb-lang">
              <option value="en">EN</option>
              <option value="fr">FR</option>
              <option value="es">ES</option>
            </select>

            <button id="nb-ham-btn" className={`nb-ham${isMenuOpen ? " open" : ""}`} onClick={handleMenuToggle} aria-label="Open Menu">
              <span className="nb-bar" />
              <span className="nb-bar" />
              <span className="nb-bar" />
            </button>
          </div>
        </div>
      </nav>

      <aside id="nb-drawer" className={`nb-drawer ${isMenuOpen ? "open" : ""}`}>
        <div className="nb-drawer-top" style={{display:'flex', justifyContent:'space-between', padding:'20px', alignItems:'center', borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
          <span className="nb-drawer-title" style={{fontWeight:'900', fontStyle:'italic', opacity:0.5}}>MENU</span>
          <button className="nb-close-btn" onClick={handleCloseMenu} style={{background:'none', border:'none', fontSize:'24px', cursor:'pointer', color: isDarkMode ? '#fff' : '#000'}}>✕</button>
        </div>

        <ul className="nb-drawer-links" style={{listStyle:'none', padding:'20px 0'}}>
          {linkKeys.map(({ key, emoji }) => (
            <li key={key}>
              <a
                href={`#${key}`}
                className={`nb-drawer-link${activeLink === key ? " active" : ""}`}
                onClick={(e) => scrollToSection(e, key)}
              >
                <span style={{fontSize:'1.2rem'}}>{emoji}</span>
                <span>{t[key]}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="nb-drawer-bottom" style={{marginTop:'auto', padding:'30px 20px', borderTop:'1px solid rgba(0,0,0,0.1)'}}>
          <p style={{fontSize:'0.8rem', opacity:0.6, fontStyle:'italic', fontWeight:'bold', letterSpacing:'1px'}}>FROSTIFY ARTISAN ICE CREAM<br/>EST. 2024</p>
        </div>
      </aside>
    </>
  );
};

export default Navbar;