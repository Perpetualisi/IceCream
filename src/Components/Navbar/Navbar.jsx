import React, { useState, useEffect, useRef } from "react";

const translations = {
  en: {
    home: "Home", flavours: "Flavours", testimonials: "Testimonials",
    about: "About", specialOffers: "Special Offers", gallery: "Gallery",
    locations: "Locations", contact: "Contact",
    tagline: "Handcrafted with love",
    cta: "Order Now",
    search: "Search flavours...",
    noResults: "No flavours found",
  },
  fr: {
    home: "Accueil", flavours: "Saveurs", testimonials: "Témoignages",
    about: "À propos", specialOffers: "Offres Spéciales", gallery: "Galerie",
    locations: "Emplacements", contact: "Contact",
    tagline: "Fait avec amour",
    cta: "Commander",
    search: "Chercher des saveurs...",
    noResults: "Aucun résultat",
  },
  es: {
    home: "Inicio", flavours: "Sabores", testimonials: "Testimonios",
    about: "Acerca de", specialOffers: "Ofertas Especiales", gallery: "Galería",
    locations: "Ubicaciones", contact: "Contacto",
    tagline: "Hecho con amor",
    cta: "Pedir Ahora",
    search: "Buscar sabores...",
    noResults: "Sin resultados",
  },
};

const linkKeys = [
  { key: "home",         emoji: "🏠", color: "#FF6B8A" },
  { key: "flavours",     emoji: "🍦", color: "#FFB347" },
  { key: "testimonials", emoji: "💬", color: "#A78BFA" },
  { key: "about",        emoji: "✨", color: "#34D399" },
  { key: "specialOffers",emoji: "🎁", color: "#F87171" },
  { key: "gallery",      emoji: "🖼️", color: "#60A5FA" },
  { key: "locations",    emoji: "📍", color: "#FBBF24" },
  { key: "contact",      emoji: "📮", color: "#FB923C" },
];

const searchableFlavours = [
  { name: "Wild Berry",   emoji: "🍓", section: "flavours" },
  { name: "Dark Cacao",   emoji: "🍫", section: "flavours" },
  { name: "Mango Rush",   emoji: "🥭", section: "flavours" },
  { name: "Arctic Mint",  emoji: "🌿", section: "flavours" },
  { name: "Summer Melon", emoji: "🍉", section: "flavours" },
  { name: "Pistachio",    emoji: "🫙", section: "flavours" },
  { name: "Vanilla Dream",emoji: "🍦", section: "flavours" },
  { name: "Coffee Kick",  emoji: "☕", section: "flavours" },
];

// ── Arc SVG Logo ─────────────────────────────────────────────────────────────
const ArcLogo = ({ dark, small }) => (
  <svg
    viewBox="0 0 220 58"
    aria-label="Frostify"
    style={{
      overflow: "visible", flexShrink: 0,
      width: small ? 108 : 148, height: small ? 34 : 44,
      transition: "width 0.3s, height 0.3s",
    }}
  >
    <defs>
      <path id="nb-arc" d="M 10,52 Q 110,-14 210,52" fill="none" />
      <linearGradient id="nb-shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="#FF6B8A" />
        <stop offset="35%"  stopColor="#FFB347" />
        <stop offset="65%"  stopColor="#FF6B8A" />
        <stop offset="100%" stopColor="#C84B6E" />
      </linearGradient>
      <filter id="nb-shadow" x="-10%" y="-30%" width="120%" height="160%">
        <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#FF6B8A" floodOpacity="0.4" />
      </filter>
    </defs>
    <text
      fill="url(#nb-shimmer)" filter="url(#nb-shadow)"
      fontFamily="'Playfair Display', serif" fontStyle="italic"
      fontWeight="900" fontSize={small ? "24" : "28"} letterSpacing="1.5"
    >
      <textPath href="#nb-arc" startOffset="50%" textAnchor="middle">
        Frostify
      </textPath>
    </text>
  </svg>
);

// ── Search bar ────────────────────────────────────────────────────────────────
const SearchBar = ({ t, isDarkMode, onClose, onNavigate }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const results = query.length > 0
    ? searchableFlavours.filter(f => f.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 400,
      background: isDarkMode ? "rgba(10,5,2,0.92)" : "rgba(255,248,240,0.94)",
      backdropFilter: "blur(24px)",
      display: "flex", flexDirection: "column",
      alignItems: "center", paddingTop: 120,
      animation: "searchIn 0.25s ease both",
    }}>
      <style>{`@keyframes searchIn { from{opacity:0;transform:translateY(-16px)} to{opacity:1;transform:translateY(0)} }`}</style>

      <div style={{ position: "relative", width: "min(560px, 90vw)" }}>
        <span style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", fontSize: 18, opacity: 0.4 }}>🔍</span>
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={t.search}
          style={{
            width: "100%", padding: "16px 52px",
            borderRadius: 16, fontSize: 18, fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            background: isDarkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",
            border: "1.5px solid rgba(255,107,138,0.3)",
            color: isDarkMode ? "#FFF8F0" : "#1A1008",
            outline: "none", boxSizing: "border-box",
          }}
        />
        <button onClick={onClose} style={{
          position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
          background: "none", border: "none", fontSize: 20, cursor: "pointer",
          color: isDarkMode ? "#FFF8F0" : "#1A1008", opacity: 0.5,
        }}>✕</button>
      </div>

      {/* Results */}
      <div style={{ marginTop: 20, width: "min(560px, 90vw)", display: "flex", flexDirection: "column", gap: 6 }}>
        {query && results.length === 0 && (
          <p style={{ textAlign: "center", opacity: 0.4, fontSize: 14, fontWeight: 600, marginTop: 20 }}>{t.noResults}</p>
        )}
        {results.map((item, i) => (
          <button key={i} onClick={() => { onNavigate(item.section); onClose(); }} style={{
            display: "flex", alignItems: "center", gap: 14,
            padding: "14px 20px", borderRadius: 14,
            background: isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
            border: "1px solid rgba(255,107,138,0.15)",
            color: isDarkMode ? "#FFF8F0" : "#1A1008",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15, fontWeight: 700, cursor: "pointer",
            textAlign: "left", transition: "background 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = isDarkMode ? "rgba(255,107,138,0.12)" : "rgba(255,107,138,0.08)"}
          onMouseLeave={e => e.currentTarget.style.background = isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"}
          >
            <span style={{ fontSize: 22 }}>{item.emoji}</span>
            {item.name}
            <span style={{ marginLeft: "auto", fontSize: 11, opacity: 0.35, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Flavours →</span>
          </button>
        ))}
      </div>
    </div>
  );
};


// ── 3D Nav Link (desktop) ─────────────────────────────────────────────────────
const NavLink = ({ label, emoji, color, isActive, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "none", border: "none", cursor: "pointer",
        padding: "6px 10px", borderRadius: 10,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13, fontWeight: 600,
        color: isActive ? color : "inherit",
        opacity: isActive ? 1 : 0.65,
        position: "relative",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.2s",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
      }}
    >
      <span style={{
        fontSize: 11,
        opacity: hovered || isActive ? 1 : 0,
        transform: hovered || isActive ? "translateY(0)" : "translateY(4px)",
        transition: "all 0.2s",
      }}>{emoji}</span>
      {label}
      {/* Active / hover underline */}
      <span style={{
        position: "absolute", bottom: 0, left: "50%",
        height: 2, borderRadius: 2, background: color,
        width: isActive ? "70%" : hovered ? "50%" : 0,
        transform: "translateX(-50%)",
        transition: "width 0.25s ease",
      }} />
    </button>
  );
};

// ── Drawer Item ───────────────────────────────────────────────────────────────
const DrawerItem = ({ label, emoji, color, isActive, index, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <li>
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: 14,
          padding: "13px 24px", background: "none", border: "none",
          borderLeft: `3px solid ${isActive || hovered ? color : "transparent"}`,
          cursor: "pointer", textAlign: "left",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 15, fontWeight: 600,
          color: isActive || hovered ? color : "inherit",
          transition: "all 0.2s",
          paddingLeft: isActive || hovered ? 28 : 24,
          animation: `drawerItemIn 0.35s ${index * 0.045}s both`,
        }}
      >
        <span style={{
          width: 36, height: 36, borderRadius: 10, fontSize: 16,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: isActive || hovered ? `${color}20` : "rgba(128,128,128,0.08)",
          transition: "background 0.2s",
        }}>{emoji}</span>
        {label}
        <span style={{ marginLeft: "auto", opacity: 0.25, fontSize: 12 }}>→</span>
      </button>
    </li>
  );
};

// ── Main Navbar ───────────────────────────────────────────────────────────────
const Navbar = ({
  language = "en",
  handleLanguageChange,
  isDarkMode = false,
  handleDarkModeToggle,
  isMenuOpen,
  handleMenuToggle,
  handleCloseMenu,

}) => {
  const [scrolled,    setScrolled]    = useState(false);
  const [scrollPct,   setScrollPct]   = useState(0);
  const [activeLink,  setActiveLink]  = useState("home");
  const [showSearch,  setShowSearch]  = useState(false);
  const [isMobile,    setMobile]      = useState(false);
  const [isTablet,    setTablet]      = useState(false);
  const [notification,setNotif]       = useState(null);

  const t = translations[language] || translations.en;

  // Breakpoints
  useEffect(() => {
    const check = () => {
      setMobile(window.innerWidth < 640);
      setTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll + active section tracking
  useEffect(() => {
    const onScroll = () => {
      const sy  = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;
      setScrolled(sy > 12);
      setScrollPct(max > 0 ? (sy / max) * 100 : 0);

      // Detect active section
      for (const { key } of [...linkKeys].reverse()) {
        const el = document.getElementById(key) || document.getElementById(key.replace(/[A-Z]/g, m => "-" + m.toLowerCase()));
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveLink(key);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keyboard shortcut: Cmd/Ctrl+K opens search
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setShowSearch(true); }
      if (e.key === "Escape") { setShowSearch(false); handleCloseMenu?.(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const scrollToSection = (id) => {
    setActiveLink(id);
    handleCloseMenu?.();
    if (id === "home") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const key = id.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
    const el  = document.getElementById(id) || document.getElementById(key);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: "smooth" });
    }
  };

  const showDesktopLinks = !isMobile && !isTablet;
  const isSmall = isMobile || isTablet;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        button { font-family: 'DM Sans', sans-serif; }

        .nb {
          font-family: 'DM Sans', sans-serif;
          position: fixed; top: 0; left: 0; right: 0; z-index: 300;
          height: 68px;
          display: flex; align-items: center;
          transition: height 0.3s, background 0.35s, box-shadow 0.35s;
        }
        .nb.scrolled {
          background: ${isDarkMode ? "rgba(14,8,3,0.92)" : "rgba(255,248,240,0.92)"};
          backdrop-filter: blur(24px) saturate(1.8);
          box-shadow: 0 1px 0 rgba(255,107,138,0.1), 0 8px 32px rgba(26,16,8,0.08);
          height: 60px;
        }
        .nb-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 0 ${isMobile ? "14px" : "28px"};
          width: 100%;
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px;
        }
        .nb-links { display: flex; align-items: center; gap: 2px; }

        /* scroll progress bar */
        .nb-progress {
          position: absolute; bottom: 0; left: 0; height: 2px;
          background: linear-gradient(90deg, #FF6B8A, #FFB347, #FF6B8A);
          transition: width 0.1s linear;
          border-radius: 0 2px 2px 0;
        }

        /* Dark mode toggle */
        .nb-mode-btn {
          width: 42px; height: 24px; border-radius: 12px; border: none; cursor: pointer;
          background: ${isDarkMode ? "linear-gradient(135deg,#FF6B8A,#C84B6E)" : "linear-gradient(135deg,#1A1008,#3A2A1A)"};
          position: relative; transition: background 0.3s; flex-shrink: 0;
        }
        .nb-mode-thumb {
          position: absolute; top: 3px; left: 3px;
          width: 18px; height: 18px; border-radius: 50%;
          background: #FFF8F0;
          display: flex; align-items: center; justify-content: center; font-size: 10px;
          transition: transform 0.35s cubic-bezier(.34,1.56,.64,1);
          transform: ${isDarkMode ? "translateX(18px)" : "translateX(0)"};
        }

        /* Lang select */
        .nb-lang {
          appearance: none; border-radius: 100px;
          border: 1.5px solid rgba(255,107,138,0.25);
          padding: 5px 22px 5px 10px;
          font-size: 0.68rem; font-weight: 700; cursor: pointer;
          background: ${isDarkMode ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.6)"};
          color: ${isDarkMode ? "#FFF8F0" : "#1A1008"};
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23FF6B8A'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 7px center;
          flex-shrink: 0; transition: border-color 0.2s;
          letter-spacing: 0.05em;
        }
        .nb-lang:focus { outline: none; border-color: rgba(255,107,138,0.6); }

        /* Hamburger */
        .nb-ham {
          display: flex; flex-direction: column; gap: 5px;
          width: 38px; height: 38px;
          align-items: center; justify-content: center;
          background: rgba(255,107,138,0.07);
          border: 1.5px solid rgba(255,107,138,0.2);
          border-radius: 11px; cursor: pointer; flex-shrink: 0;
          transition: border-color 0.2s, background 0.2s;
        }
        .nb-ham:hover { border-color: rgba(255,107,138,0.5); background: rgba(255,107,138,0.12); }
        .nb-bar {
          width: 18px; height: 2px; border-radius: 2px;
          background: ${isDarkMode ? "#FFF8F0" : "#1A1008"};
          transition: all 0.3s;
        }
        .nb-ham.open .nb-bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .nb-ham.open .nb-bar:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .nb-ham.open .nb-bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* Search btn */
        .nb-search-btn {
          width: 38px; height: 38px; border-radius: 11px;
          background: ${isDarkMode ? "rgba(255,255,255,0.07)" : "rgba(26,16,8,0.05)"};
          border: 1.5px solid rgba(255,107,138,0.2);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 15px; flex-shrink: 0;
          transition: all 0.2s;
        }
        .nb-search-btn:hover { border-color: rgba(255,107,138,0.55); background: rgba(255,107,138,0.1); }

        /* CTA button */
        .nb-cta {
          padding: 8px 18px; border-radius: 100px; border: none;
          background: linear-gradient(135deg, #FF6B8A, #C84B6E);
          color: white; font-weight: 800; font-size: 12px;
          letter-spacing: 0.07em; text-transform: uppercase;
          cursor: pointer; white-space: nowrap; flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(255,107,138,0.35);
          transition: all 0.25s;
        }
        .nb-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,107,138,0.5); }
        .nb-cta:active { transform: translateY(0); }

        /* Drawer */
        .nb-drawer {
          position: fixed; top: 0; right: 0;
          width: min(320px, 88vw); height: 100dvh;
          background: ${isDarkMode ? "#120A04" : "#FFF8F0"};
          color: ${isDarkMode ? "#FFF8F0" : "#1A1008"};
          z-index: 320;
          transform: translateX(110%);
          transition: transform 0.38s cubic-bezier(0.32,0.72,0,1);
          box-shadow: -16px 0 60px rgba(0,0,0,0.25);
          display: flex; flex-direction: column;
        }
        .nb-drawer.open { transform: translateX(0); }

        .nb-overlay {
          position: fixed; inset: 0;
          background: rgba(10,5,2,0.5);
          backdrop-filter: blur(6px);
          z-index: 310; display: none;
        }
        .nb-overlay.show { display: block; }

        @keyframes drawerItemIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        @keyframes notifIn {
          from { opacity:0; transform:translateY(-8px) scale(0.95); }
          to   { opacity:1; transform:translateY(0)    scale(1); }
        }

        /* Notification toast */
        .nb-notif {
          position: fixed; top: 76px; left: 50%; transform: translateX(-50%);
          background: ${isDarkMode ? "#1F1008" : "white"};
          color: ${isDarkMode ? "#FFF8F0" : "#1A1008"};
          border: 1px solid rgba(255,107,138,0.25);
          border-radius: 12px; padding: 10px 20px;
          font-size: 13px; font-weight: 700;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
          z-index: 500; white-space: nowrap;
          animation: notifIn 0.25s ease;
        }
      `}</style>

      {/* Overlay */}
      <div className={`nb-overlay${isMenuOpen ? " show" : ""}`} onClick={handleCloseMenu} />

      {/* Search overlay */}
      {showSearch && (
        <SearchBar
          t={t} isDarkMode={isDarkMode}
          onClose={() => setShowSearch(false)}
          onNavigate={scrollToSection}
        />
      )}

      {/* Toast notification */}
      {notification && (
        <div className="nb-notif">{notification}</div>
      )}

      {/* ── The Navbar ── */}
      <nav className={`nb${scrolled ? " scrolled" : ""}`}
        style={{ color: isDarkMode ? "#FFF8F0" : "#1A1008" }}
      >
        {/* Scroll progress bar */}
        <div className="nb-progress" style={{ width: `${scrollPct}%` }} />

        <div className="nb-inner">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, lineHeight: 0 }}
          >
            <ArcLogo dark={isDarkMode} small={isMobile} />
          </button>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 7 : 10, flexShrink: 0 }}>

            {/* Search */}
            <button
              className="nb-search-btn"
              onClick={() => setShowSearch(true)}
              title="Search (⌘K)"
              style={{ fontSize: isMobile ? 13 : 15 }}
            >🔍</button>


            {/* Dark mode toggle — hide on very small if tight */}
            {!isMobile && (
              <button className="nb-mode-btn" onClick={handleDarkModeToggle} aria-label="Toggle dark mode">
                <div className="nb-mode-thumb">{isDarkMode ? "🌙" : "☀️"}</div>
              </button>
            )}

            {/* Language */}
            {!isMobile && (
              <select value={language} onChange={handleLanguageChange} className="nb-lang">
                <option value="en">EN</option>
                <option value="fr">FR</option>
                <option value="es">ES</option>
              </select>
            )}

            {/* Hamburger */}
            <button
              className={`nb-ham${isMenuOpen ? " open" : ""}`}
              onClick={handleMenuToggle}
              aria-label="Open menu"
            >
              <span className="nb-bar" />
              <span className="nb-bar" />
              <span className="nb-bar" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Drawer ── */}
      <aside className={`nb-drawer${isMenuOpen ? " open" : ""}`}>
        {/* Drawer header */}
        <div style={{
          padding: "20px 20px 16px",
          borderBottom: `1px solid ${isDarkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontWeight: 900, fontStyle: "italic", fontSize: 11, opacity: 0.35, letterSpacing: "0.15em", textTransform: "uppercase" }}>MENU</div>
            <div style={{ fontSize: 11, opacity: 0.4, fontWeight: 600, marginTop: 2 }}>{t.tagline}</div>
          </div>
          <button onClick={handleCloseMenu} style={{
            background: isDarkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",
            border: "none", width: 34, height: 34, borderRadius: 9,
            cursor: "pointer", fontSize: 14,
            color: isDarkMode ? "#FFF8F0" : "#1A1008",
          }}>✕</button>
        </div>

        {/* Mobile-only controls inside drawer */}
        {isMobile && (
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "14px 20px",
            borderBottom: `1px solid ${isDarkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
          }}>
            <button className="nb-mode-btn" onClick={handleDarkModeToggle} aria-label="Toggle dark mode">
              <div className="nb-mode-thumb">{isDarkMode ? "🌙" : "☀️"}</div>
            </button>
            <select value={language} onChange={handleLanguageChange} className="nb-lang" style={{ flex: 1 }}>
              <option value="en">🇬🇧 English</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="es">🇪🇸 Español</option>
            </select>
          </div>
        )}

        {/* Nav links */}
        <ul style={{ listStyle: "none", padding: "10px 0", margin: 0, flex: 1, overflowY: "auto" }}>
          {linkKeys.map(({ key, emoji, color }, i) => (
            <DrawerItem
              key={key}
              label={t[key]} emoji={emoji} color={color}
              isActive={activeLink === key}
              index={i}
              onClick={() => scrollToSection(key)}
            />
          ))}
        </ul>

        {/* CTA in drawer */}
        <div style={{ padding: "20px" }}>
          <button
            className="nb-cta"
            onClick={() => { scrollToSection("specialOffers"); }}
            style={{ width: "100%", padding: "14px", fontSize: 13, borderRadius: 14 }}
          >{t.cta}</button>
        </div>

        {/* Footer */}
        <div style={{
          padding: "16px 20px 28px",
          borderTop: `1px solid ${isDarkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
        }}>
          <p style={{ fontSize: 10, opacity: 0.35, fontStyle: "italic", fontWeight: 700, letterSpacing: "0.12em", margin: 0, lineHeight: 1.7 }}>
            FROSTIFY ARTISAN ICE CREAM<br />EST. 2024 — ALL NATURAL
          </p>
        </div>
      </aside>
    </>
  );
};

export default Navbar;