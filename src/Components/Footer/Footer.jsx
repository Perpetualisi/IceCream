import React, { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────
   TRANSLATIONS
──────────────────────────────────────────────────────────────────*/
const translations = {
  en: {
    about: "Our Story",
    contact: "Contact Us",
    privacy: "Privacy Policy",
    terms: "Terms",
    language: "Language",
    rights: "All rights reserved.",
    followUs: "Follow the Flavor",
    description: "Frostify crafts premium artisan ice cream in small batches — made with love, served with soul.",
    quickLinks: "Quick Scoops",
    style: "Style",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    tagline: "Handcrafted. Always.",
  },
  fr: {
    about: "Notre Histoire",
    contact: "Contactez-nous",
    privacy: "Confidentialité",
    terms: "Conditions",
    language: "Langue",
    rights: "Tous droits réservés.",
    followUs: "Suivez le Goût",
    description: "Frostify crée des glaces artisanales premium en petites quantités — faites avec amour, servies avec âme.",
    quickLinks: "Accès Rapide",
    style: "Apparence",
    lightMode: "Mode Clair",
    darkMode: "Mode Sombre",
    tagline: "Artisanal. Toujours.",
  },
  es: {
    about: "Nuestra Historia",
    contact: "Contáctenos",
    privacy: "Privacidad",
    terms: "Términos",
    language: "Idioma",
    rights: "Todos los derechos reservados.",
    followUs: "Sigue el Sabor",
    description: "Frostify elabora helados artesanales premium en pequeños lotes — hechos con amor, servidos con alma.",
    quickLinks: "Enlaces Rápidos",
    style: "Estilo",
    lightMode: "Modo Claro",
    darkMode: "Modo Oscuro",
    tagline: "Artesanal. Siempre.",
  },
};

/* ─── Nav link ───────────────────────────────────────────────────*/
const NavLink = ({ href, children }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <li>
      <a
        href={href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          fontSize: "clamp(11px,2.5vw,12px)", fontWeight: 700,
          color: hovered ? "white" : "rgba(255,255,255,0.45)",
          textDecoration: "none",
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "0.04em",
          transition: "color 0.22s ease",
        }}
      >
        <span style={{
          width: hovered ? 14 : 0, height: 1,
          background: "linear-gradient(90deg,#FF6B8A,#4ECDC4)",
          borderRadius: 1, flexShrink: 0,
          transition: "width 0.28s cubic-bezier(0.22,1,0.36,1)",
        }}/>
        {children}
      </a>
    </li>
  );
};

/* ─── Social button ──────────────────────────────────────────────*/
const SocialBtn = ({ label, href }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 38, height: 38, borderRadius: 12, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 9, fontWeight: 800, letterSpacing: "0.1em",
        fontFamily: "'DM Sans', sans-serif",
        textDecoration: "none",
        background: hovered
          ? "linear-gradient(135deg,#FF4878,#FF6B8A)"
          : "rgba(255,255,255,0.06)",
        border: `1px solid ${hovered ? "rgba(255,107,138,0.6)" : "rgba(255,255,255,0.1)"}`,
        color: hovered ? "white" : "rgba(255,255,255,0.45)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 8px 20px rgba(255,60,100,0.35)" : "none",
        transition: "all 0.25s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {label}
    </a>
  );
};

/* ─────────────────────────────────────────────────────────────────
   MAIN FOOTER
──────────────────────────────────────────────────────────────────*/
const Footer = ({ language = "en", isDarkMode = false, toggleDarkMode, changeLanguage }) => {
  const t = translations[language] || translations.en;
  const year = new Date().getFullYear();

  const [isMobile, setMobile]   = useState(false);
  const [isTablet, setTablet]   = useState(false);
  const [vis,      setVis]      = useState(false);
  const [dmHover,  setDmHover]  = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const check = () => {
      setMobile(window.innerWidth < 640);
      setTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.06 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const bg = isDarkMode ? "#04040A" : "#050408";

  const navLinks = [
    { href: "#about",          label: t.about },
    { href: "#gallery",        label: "Gallery" },
    { href: "#testimonials",   label: "Reviews" },
    { href: "#locations",      label: "Locations" },
    { href: "#contact",        label: t.contact },
  ];

  const socials = [
    { label: "FB", href: "#" },
    { label: "IG", href: "#" },
    { label: "TK", href: "#" },
    { label: "TW", href: "#" },
  ];

  return (
    <footer
      ref={sectionRef}
      style={{
        position: "relative",
        background: bg,
        color: "white",
        paddingTop: isMobile ? 56 : 80,
        paddingBottom: isMobile ? 32 : 44,
        overflow: "hidden",
        fontFamily: "'Syne', system-ui, sans-serif",
        isolation: "isolate",
        transition: "background 0.8s",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        @keyframes blobDrift {
          0%,100% { transform: translateY(0) scale(1); }
          50%      { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes marqueeFooter {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes shimmerBrand {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes floatStar {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50%     { transform: translateY(-9px) rotate(12deg); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .brand-shimmer {
          background: linear-gradient(100deg,
            rgba(255,255,255,0.95) 20%,
            rgba(255,107,138,0.9) 48%,
            rgba(255,255,255,0.95) 76%
          );
          background-size: 200% auto;
          animation: shimmerBrand 5s linear infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        select option { background: #0A0A0A; color: white; }
      `}</style>

      {/* ── Ambient blobs ── */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden", zIndex:0 }}>
        {[
          { top:"-30%",   left:"-8%",  w:380, col:"#FF6B8A", dur:20 },
          { bottom:"-20%",right:"-8%", w:340, col:"#4ECDC4", dur:24 },
          { top:"30%",    left:"40%",  w:260, col:"#A78BFA", dur:18 },
        ].map((b, i) => (
          <div key={i} style={{
            position: "absolute", ...b,
            width:  isMobile ? b.w * 0.45 : b.w,
            height: isMobile ? b.w * 0.45 : b.w,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${b.col}16 0%, transparent 70%)`,
            filter: "blur(80px)",
            animation: `blobDrift ${b.dur}s ease-in-out infinite ${i * 6}s`,
          }}/>
        ))}
        <div style={{
          position:"absolute", inset:0,
          backgroundImage:"linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)",
          backgroundSize:"60px 60px",
          maskImage:"radial-gradient(ellipse at 50% 0%, black 30%, transparent 75%)",
        }}/>
      </div>

      {/* Noise grain */}
      <div style={{
        position:"absolute", inset:0, zIndex:1, pointerEvents:"none",
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        opacity:0.038, mixBlendMode:"overlay",
      }}/>

      {/* Top accent line */}
      <div style={{
        position:"absolute", top:0, left:0, right:0, height:1,
        background:"linear-gradient(90deg,transparent,rgba(255,107,138,0.5),rgba(78,205,196,0.4),transparent)",
        boxShadow:"0 0 24px rgba(255,107,138,0.2)",
        zIndex:2,
      }}/>

      {/* Floating stars — desktop only */}
      {!isMobile && [
        { top:"18%", left:"3%",  size:11, delay:"0s",   col:"#F5D76E" },
        { top:"50%", right:"4%", size:9,  delay:"1.4s", col:"#FF6B8A" },
      ].map((s, i) => (
        <div key={i} style={{
          position:"absolute", ...s, color:s.col, fontSize:s.size,
          opacity:0.3, animation:`floatStar ${3.8+i}s ease-in-out infinite ${s.delay}`,
          zIndex:1, pointerEvents:"none",
        }}>✦</div>
      ))}

      <div style={{
        maxWidth: 1280, margin:"0 auto",
        padding: isMobile?"0 16px":isTablet?"0 24px":"0 48px",
        position:"relative", zIndex:2,
      }}>

        {/* ── Top marquee ── */}
        <div style={{
          marginBottom: isMobile?36:52,
          paddingBottom: isMobile?12:20,
          borderBottom:"1px solid rgba(255,255,255,0.05)",
          overflow:"hidden", position:"relative",
        }}>
          <div style={{position:"absolute",left:0,top:0,bottom:0,width:32,background:`linear-gradient(90deg,${bg},transparent)`,zIndex:1,pointerEvents:"none"}}/>
          <div style={{position:"absolute",right:0,top:0,bottom:0,width:32,background:`linear-gradient(-90deg,${bg},transparent)`,zIndex:1,pointerEvents:"none"}}/>
          <div style={{
            display:"flex", whiteSpace:"nowrap", fontWeight:800,
            textTransform:"uppercase", letterSpacing:"0.26em",
            fontSize:"clamp(7px,2vw,8px)", color:"rgba(255,255,255,0.14)",
            animation:"marqueeFooter 32s linear infinite",
          }}>
            {Array(8).fill(["✦ Frostify","🍦 Artisan Ice Cream","✦ Est. 2026","🍓 New York","✦ Handcrafted","🍫 Premium Grade"]).flat().map((l,i)=>(
              <span key={i} style={{margin:"0 20px",color:i%6===0?"rgba(245,215,110,0.28)":"rgba(255,255,255,0.14)"}}>{l}</span>
            ))}
          </div>
        </div>

        {/* ── Main 4-col grid ── */}
        <div style={{
          display:"grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : isTablet
              ? "1fr 1fr"
              : "1.5fr 1fr 1fr 1fr",
          gap: isMobile ? 36 : isTablet ? 40 : 48,
          marginBottom: isMobile ? 40 : 56,
          opacity:   vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(24px)",
          transition:"opacity 0.9s ease, transform 1s cubic-bezier(0.22,1,0.36,1)",
        }}>

          {/* ── BRAND COL ── */}
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {/* Wordmark */}
            <div style={{ marginBottom: 4 }}>
              <span className="brand-shimmer" style={{
                fontSize: isMobile ? 28 : 32,
                fontWeight: 900, fontStyle:"italic",
                letterSpacing:"-0.04em",
                textTransform:"uppercase",
                fontFamily:"'Syne',sans-serif",
                lineHeight:1,
              }}>Frostify</span>
              <span style={{
                fontSize: isMobile ? 28 : 32,
                fontWeight: 900, fontStyle:"italic",
                letterSpacing:"-0.04em",
                color:"#FF6B8A",
                fontFamily:"'Syne',sans-serif",
                lineHeight:1,
              }}>.</span>
            </div>

            <p style={{
              fontSize:"clamp(12px,2.5vw,13px)",
              color:"rgba(255,255,255,0.42)",
              fontFamily:"'DM Sans',sans-serif",
              fontStyle:"italic",
              lineHeight:1.72,
              maxWidth: isMobile ? "100%" : 240,
              margin:0,
            }}>{t.description}</p>

            {/* Tagline chip */}
            <div style={{
              display:"inline-flex", alignItems:"center", gap:8,
              padding:"5px 12px",
              background:"linear-gradient(135deg,rgba(255,107,138,0.1),rgba(78,205,196,0.06))",
              border:"1px solid rgba(255,107,138,0.2)",
              borderRadius:100, alignSelf:"flex-start",
            }}>
              <span style={{ fontSize:8, color:"#FF6B8A", lineHeight:0 }}>✦</span>
              <span style={{
                fontSize:8, fontWeight:800, letterSpacing:"0.22em",
                textTransform:"uppercase", color:"rgba(255,255,255,0.45)",
                fontFamily:"'DM Sans',sans-serif",
              }}>{t.tagline}</span>
            </div>

            {/* Avatar cluster */}
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{display:"flex",alignItems:"center"}}>
                {["#FF6B8A","#4ECDC4","#F5D76E"].map((col,i)=>(
                  <div key={i} style={{
                    width:28, height:28, borderRadius:"50%",
                    background:`linear-gradient(135deg,${col}88,${col}44)`,
                    border:"2px solid rgba(5,4,8,0.8)",
                    marginLeft: i>0 ? -8 : 0,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:11, zIndex:3-i, position:"relative",
                  }}>🍦</div>
                ))}
              </div>
              <span style={{
                fontSize:8, fontWeight:800, letterSpacing:"0.2em",
                textTransform:"uppercase", color:"rgba(255,255,255,0.25)",
                fontFamily:"'DM Sans',sans-serif",
              }}>Top Rated {year}</span>
            </div>
          </div>

          {/* ── LINKS COL ── */}
          <div>
            <div style={{
              fontSize:8, fontWeight:800, letterSpacing:"0.28em",
              textTransform:"uppercase", color:"#FF6B8A",
              fontFamily:"'DM Sans',sans-serif",
              marginBottom:18,
            }}>{t.quickLinks}</div>
            <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:12 }}>
              {navLinks.map(l => (
                <NavLink key={l.href} href={l.href}>{l.label}</NavLink>
              ))}
            </ul>
          </div>

          {/* ── PREFERENCES COL ── */}
          <div>
            <div style={{
              fontSize:8, fontWeight:800, letterSpacing:"0.28em",
              textTransform:"uppercase", color:"#4ECDC4",
              fontFamily:"'DM Sans',sans-serif",
              marginBottom:18,
            }}>{t.language} & {t.style}</div>

            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {/* Language select */}
              <select
                value={language}
                onChange={e => changeLanguage?.(e.target.value)}
                style={{
                  width:"100%", padding:"10px 14px",
                  borderRadius:12,
                  background:"rgba(255,255,255,0.05)",
                  border:"1px solid rgba(255,255,255,0.1)",
                  color:"rgba(255,255,255,0.7)",
                  fontSize:10, fontWeight:700,
                  letterSpacing:"0.16em", textTransform:"uppercase",
                  fontFamily:"'DM Sans',sans-serif",
                  outline:"none", cursor:"pointer",
                  appearance:"none",
                  backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(255,255,255,0.3)' strokeWidth='1.5' fill='none' strokeLinecap='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat:"no-repeat",
                  backgroundPosition:"right 12px center",
                  transition:"border-color 0.2s",
                }}
                onFocus={e=>{e.currentTarget.style.borderColor="rgba(78,205,196,0.5)";}}
                onBlur={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.1)";}}
              >
                <option value="en">🇺🇸 English</option>
                <option value="fr">🇫🇷 Français</option>
                <option value="es">🇪🇸 Español</option>
              </select>

              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                onMouseEnter={()=>setDmHover(true)}
                onMouseLeave={()=>setDmHover(false)}
                style={{
                  width:"100%", padding:"10px 14px",
                  borderRadius:12,
                  background: dmHover
                    ? isDarkMode
                      ? "linear-gradient(135deg,rgba(255,255,150,0.15),rgba(255,200,80,0.1))"
                      : "linear-gradient(135deg,rgba(100,100,200,0.15),rgba(80,80,180,0.1))"
                    : "rgba(255,255,255,0.05)",
                  border:`1px solid ${dmHover ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)"}`,
                  color: dmHover ? "white" : "rgba(255,255,255,0.55)",
                  fontSize:10, fontWeight:800,
                  letterSpacing:"0.16em", textTransform:"uppercase",
                  fontFamily:"'DM Sans',sans-serif",
                  cursor:"pointer",
                  display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                  transition:"all 0.25s ease",
                }}
              >
                <span style={{fontSize:13}}>{isDarkMode ? "☀️" : "🌙"}</span>
                {isDarkMode ? t.lightMode : t.darkMode}
              </button>
            </div>
          </div>

          {/* ── SOCIAL COL ── */}
          <div>
            <div style={{
              fontSize:8, fontWeight:800, letterSpacing:"0.28em",
              textTransform:"uppercase", color:"#F5D76E",
              fontFamily:"'DM Sans',sans-serif",
              marginBottom:18,
            }}>{t.followUs}</div>

            <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
              {socials.map(s => <SocialBtn key={s.label} label={s.label} href={s.href}/>)}
            </div>

            {/* Handle */}
            <div style={{marginTop:16,display:"flex",alignItems:"center",gap:8}}>
              <div style={{
                width:6,height:6,borderRadius:"50%",
                background:"linear-gradient(135deg,#FF6B8A,#4ECDC4)",
                flexShrink:0,
              }}/>
              <span style={{
                fontSize:"clamp(11px,2.5vw,12px)",
                color:"rgba(255,255,255,0.35)",
                fontFamily:"'DM Sans',sans-serif",
                fontStyle:"italic",
                fontWeight:600,
              }}>@frostify.official</span>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{
          height:1,
          background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)",
          marginBottom: isMobile?20:24,
          opacity: vis?1:0,
          transition:"opacity 0.8s ease 0.3s",
        }}/>

        {/* ── Bottom bar ── */}
        <div style={{
          display:"flex",
          flexDirection: isMobile?"column":"row",
          alignItems: isMobile?"center":"center",
          justifyContent:"space-between",
          gap: isMobile?10:16,
          opacity:   vis?1:0,
          transform: vis?"translateY(0)":"translateY(10px)",
          transition:"opacity 0.8s ease 0.4s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s",
        }}>
          <p style={{
            margin:0,
            fontSize:"clamp(9px,2vw,10px)", fontWeight:800,
            letterSpacing:"0.18em", textTransform:"uppercase",
            color:"rgba(255,255,255,0.22)",
            fontFamily:"'DM Sans',sans-serif",
            textAlign: isMobile?"center":"left",
          }}>
            © {year} Frostify Artisan Ice Cream. {t.rights}
          </p>
          <div style={{display:"flex",alignItems:"center",gap:20}}>
            {[{ label:t.privacy, href:"#privacy" }, { label:t.terms, href:"#terms" }].map((l,i) => (
              <a key={i} href={l.href} style={{
                fontSize:"clamp(9px,2vw,10px)", fontWeight:800,
                letterSpacing:"0.18em", textTransform:"uppercase",
                color:"rgba(255,255,255,0.22)",
                fontFamily:"'DM Sans',sans-serif",
                textDecoration:"none",
                transition:"color 0.2s",
              }}
                onMouseEnter={e=>e.currentTarget.style.color="rgba(255,255,255,0.65)"}
                onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.22)"}
              >{l.label}</a>
            ))}
            {/* Accent dot */}
            <div style={{
              width:4,height:4,borderRadius:"50%",
              background:"linear-gradient(135deg,#FF6B8A,#4ECDC4)",
              flexShrink:0,
            }}/>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;