import React, { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────────
   TRANSLATIONS
──────────────────────────────────────────────────────────────────*/
const translations = {
  en: {
    eyebrow: "Social Proof",
    heading: "Word on\nthe Street",
    subheading: "What our 2k+ fans say about their scoops.",
    testimonials: [
      {
        id: 1,
        name: "John Doe",
        feedback: "The Madagascar Vanilla is life-changing. I've never had ice cream this creamy and authentic — it tastes like it was made by someone who genuinely loves what they do.",
        imageUrl: "/JohnDoe.jpg",
        tag: "Vanilla Devotee",
        flavour: "Madagascar Bean",
        rating: 5,
        accent: "#F5D76E",
      },
      {
        id: 2,
        name: "Jane Smith",
        feedback: "Fantastic service and even better flavors. The Mint Chip is an absolute garden-fresh masterpiece. I drove 40 minutes just to come back for a second scoop.",
        imageUrl: "/JaneSmith.jpg",
        tag: "Local Guide",
        flavour: "Cool Infusion",
        rating: 5,
        accent: "#4ECDC4",
      },
      {
        id: 3,
        name: "Michael Brown",
        feedback: "A truly wonderful experience. It's not just ice cream; it's a premium dessert event every time. The Velvet Cocoa destroyed every other chocolate ice cream for me.",
        imageUrl: "/MichaelBrown.jpg",
        tag: "Foodie",
        flavour: "Velvet Cocoa",
        rating: 5,
        accent: "#C08040",
      },
    ],
  },
  fr: {
    eyebrow: "Témoignages",
    heading: "L'Avis de\nnos Fans",
    subheading: "Ce que disent nos plus de 2000 amateurs de glaces.",
    testimonials: [
      {
        id: 1,
        name: "John Doe",
        feedback: "La Vanille de Madagascar change la vie. Je n'ai jamais goûté une glace aussi crémeuse et authentique — on sent que c'est fait avec amour.",
        imageUrl: "/JohnDoe.jpg",
        tag: "Fan de Vanille",
        flavour: "Madagascar Bean",
        rating: 5,
        accent: "#F5D76E",
      },
      {
        id: 2,
        name: "Jane Smith",
        feedback: "Service fantastique et saveurs encore meilleures. La Menthe est un chef-d'œuvre de fraîcheur. J'ai fait 40 minutes de route pour revenir en chercher une autre.",
        imageUrl: "/JaneSmith.jpg",
        tag: "Guide Local",
        flavour: "Cool Infusion",
        rating: 5,
        accent: "#4ECDC4",
      },
      {
        id: 3,
        name: "Michael Brown",
        feedback: "Une expérience vraiment merveilleuse. Plus qu'une glace, un véritable événement gastronomique. Le Velvet Cocoa a ruiné tous les autres chocolats pour moi.",
        imageUrl: "/MichaelBrown.jpg",
        tag: "Gourmet",
        flavour: "Velvet Cocoa",
        rating: 5,
        accent: "#C08040",
      },
    ],
  },
  es: {
    eyebrow: "Testimonios",
    heading: "Voz de\nla Calle",
    subheading: "Lo que dicen nuestros más de 2000 fans sobre sus helados.",
    testimonials: [
      {
        id: 1,
        name: "John Doe",
        feedback: "La Vainilla de Madagascar te cambia la vida. Nunca había probado un helado tan cremoso y auténtico — se nota que está hecho con verdadero amor.",
        imageUrl: "/JohnDoe.jpg",
        tag: "Fan de la Vainilla",
        flavour: "Madagascar Bean",
        rating: 5,
        accent: "#F5D76E",
      },
      {
        id: 2,
        name: "Jane Smith",
        feedback: "Servicio fantástico y mejores sabores. El de Menta es una obra maestra de frescura. Conduje 40 minutos solo para volver a por otra bola.",
        imageUrl: "/JaneSmith.jpg",
        tag: "Guía Local",
        flavour: "Cool Infusion",
        rating: 5,
        accent: "#4ECDC4",
      },
      {
        id: 3,
        name: "Michael Brown",
        feedback: "Una experiencia maravillosa. No es solo helado; es un evento de postre premium cada vez. El Velvet Cocoa arruinó todos los demás helados de chocolate para mí.",
        imageUrl: "/MichaelBrown.jpg",
        tag: "Amante del buen comer",
        flavour: "Velvet Cocoa",
        rating: 5,
        accent: "#C08040",
      },
    ],
  },
};

/* ─── Avatar with fallback initials ──────────────────────────────*/
const Avatar = ({ src, name, accent, size = 72 }) => {
  const [err, setErr] = useState(false);
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: err ? `linear-gradient(135deg, ${accent}88, ${accent}44)` : "transparent",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden", flexShrink: 0,
    }}>
      {!err ? (
        <img src={src} alt={name} onError={() => setErr(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
      ) : (
        <span style={{
          fontSize: size * 0.32, fontWeight: 900, fontStyle: "italic",
          color: accent, fontFamily: "'Syne', sans-serif",
        }}>{initials}</span>
      )}
    </div>
  );
};

/* ─── Star rating ────────────────────────────────────────────────*/
const Stars = ({ count = 5, accent }) => (
  <div style={{ display: "flex", gap: 3 }}>
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 1 L7.4 4.1 L10.8 4.5 L8.4 6.8 L9 10.2 L6 8.5 L3 10.2 L3.6 6.8 L1.2 4.5 L4.6 4.1 Z"
          fill={accent} stroke={accent} strokeWidth="0.5" strokeLinejoin="round"/>
      </svg>
    ))}
  </div>
);

/* ─── Testimonial Card ───────────────────────────────────────────
   KEY MOBILE FIX: On mobile the card is position:relative in normal
   flow (no 3D stack) so content never clips. On desktop we keep the
   3D perspective stack with absolute positioning.
──────────────────────────────────────────────────────────────────*/
const TestiCard = ({ item, isActive, isPrev, isNext, onClick, isMobile, cardRef }) => {
  /* Desktop 3D offsets */
  const depth  = isActive ? 0 : (isPrev || isNext) ? -55 : -110;
  const scale  = isActive ? 1 : (isPrev || isNext) ? 0.87 : 0.74;
  const xShift = isActive ? "0px" : isPrev ? "-50%" : isNext ? "50%" : "0px";
  const blur   = isActive ? 0 : (isPrev || isNext) ? 2.5 : 6;
  const opac   = isActive ? 1 : (isPrev || isNext) ? 0.42 : 0.18;

  /* On mobile, only render the active card — prev/next are hidden */
  if (isMobile && !isActive) return null;

  return (
    <div
      ref={isActive ? cardRef : null}
      onClick={!isActive ? onClick : undefined}
      style={isMobile ? {
        /* Mobile: normal flow, full width */
        width: "100%",
        position: "relative",
        cursor: "default",
      } : {
        /* Desktop: absolute 3D stack */
        position: "absolute",
        top: 0, left: "50%",
        width: "min(680px, 76vw)",
        transform: `translateX(calc(-50% + ${xShift})) translateZ(${depth}px) scale(${scale})`,
        transition: "transform 0.65s cubic-bezier(0.22,1,0.36,1), opacity 0.55s ease, filter 0.55s ease",
        opacity: opac,
        filter: `blur(${blur}px)`,
        cursor: isActive ? "default" : "pointer",
        zIndex: isActive ? 10 : (isPrev || isNext) ? 5 : 2,
        pointerEvents: isActive ? "none" : "auto",
      }}
    >
      <div style={{
        borderRadius: isMobile ? 22 : 28,
        background: "linear-gradient(160deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.018) 100%)",
        border: `1px solid ${item.accent}${isActive ? "38" : "18"}`,
        backdropFilter: "blur(12px)",
        padding: isMobile ? "24px 20px 22px" : "44px 48px 40px",
        position: "relative",
        overflow: "hidden",
        boxShadow: isActive
          ? `0 24px 56px rgba(0,0,0,0.5), 0 0 0 1px ${item.accent}28, 0 0 40px ${item.accent}10`
          : `0 12px 32px rgba(0,0,0,0.3)`,
        transition: "box-shadow 0.5s ease, border-color 0.5s ease",
      }}>
        {/* Noise grain */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: isMobile ? 22 : 28,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.04, mixBlendMode: "overlay", pointerEvents: "none",
        }}/>
        {/* Accent top stripe */}
        <div style={{
          position: "absolute", top: 0, left: "15%", right: "15%", height: 2, borderRadius: 2,
          background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)`,
          boxShadow: `0 0 16px ${item.accent}60`,
          opacity: isActive ? 1 : 0.3, transition: "opacity 0.5s",
        }}/>
        {/* Giant quote mark */}
        <div style={{
          position: "absolute", top: isMobile ? -8 : -20, right: isMobile ? 14 : 28,
          fontSize: isMobile ? 100 : 180, fontWeight: 900, fontStyle: "italic",
          lineHeight: 1, color: item.accent, opacity: 0.055,
          fontFamily: "'Syne', serif", userSelect: "none", pointerEvents: "none",
        }}>"</div>
        {/* Inner rim */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: isMobile ? 22 : 28, pointerEvents: "none",
          boxShadow: `inset 0 0 0 1px rgba(255,255,255,${isActive ? "0.07" : "0.03"})`,
          transition: "box-shadow 0.5s",
        }}/>
        {/* Radial bg glow */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: isMobile ? 22 : 28, pointerEvents: "none",
          background: `radial-gradient(ellipse at 30% 20%, ${item.accent}18, transparent 60%)`,
          opacity: isActive ? 1 : 0.4, transition: "opacity 0.5s",
        }}/>

        {/* ── Content ── */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Avatar + meta row */}
          <div style={{
            display: "flex", alignItems: "center",
            gap: isMobile ? 12 : 20,
            marginBottom: isMobile ? 18 : 30,
          }}>
            {/* Avatar ring */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{
                position: "absolute", inset: -4, borderRadius: "50%",
                background: `conic-gradient(${item.accent} 0%, ${item.accent}44 60%, transparent 100%)`,
                opacity: 0.85,
              }}/>
              <div style={{ position: "absolute", inset: -1, borderRadius: "50%", background: "rgba(5,4,8,0.9)" }}/>
              <Avatar src={item.imageUrl} name={item.name} accent={item.accent} size={isMobile ? 50 : 72}/>
            </div>
            {/* Name + tag + stars */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, flexWrap: "wrap" }}>
                <span style={{
                  fontSize: isMobile ? 14 : 18, fontWeight: 900, fontStyle: "italic",
                  letterSpacing: "-0.02em", color: "white",
                  fontFamily: "'Syne', sans-serif", textTransform: "uppercase",
                }}>{item.name}</span>
                <div style={{
                  padding: "2px 8px", borderRadius: 100,
                  background: `${item.accent}18`, border: `1px solid ${item.accent}40`,
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontSize: isMobile ? 7 : 8, fontWeight: 800, letterSpacing: "0.18em",
                    textTransform: "uppercase", color: item.accent,
                    fontFamily: "'DM Sans', sans-serif",
                  }}>{item.tag}</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <Stars count={item.rating} accent={item.accent}/>
                <span style={{
                  fontSize: isMobile ? 7 : 8, fontWeight: 700, letterSpacing: "0.16em",
                  textTransform: "uppercase", color: `${item.accent}99`,
                  fontFamily: "'DM Sans', sans-serif",
                }}>✦ {item.flavour}</span>
              </div>
            </div>
          </div>

          {/* Quote */}
          <blockquote style={{ margin: 0 }}>
            <p style={{
              fontSize: isMobile ? "clamp(14px,3.8vw,16px)" : "clamp(17px,2.2vw,22px)",
              fontStyle: "italic", fontWeight: 500,
              lineHeight: isMobile ? 1.65 : 1.72,
              letterSpacing: "-0.01em",
              color: "rgba(255,255,255,0.82)",
              fontFamily: "'DM Sans', sans-serif",
              margin: 0,
            }}>
              <span style={{ color: item.accent, fontSize: "1.35em", lineHeight: 0, verticalAlign: "-0.15em", marginRight: 3 }}>"</span>
              {item.feedback}
              <span style={{ color: item.accent, fontSize: "1.35em", lineHeight: 0, verticalAlign: "-0.15em", marginLeft: 3 }}>"</span>
            </p>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   MAIN TESTIMONIALS SECTION
──────────────────────────────────────────────────────────────────*/
const Testimonials = ({ language = "en", isDarkMode = false }) => {
  const t     = translations[language] || translations.en;
  const total = t.testimonials.length;

  const [current,    setCurrent]    = useState(0);
  const [animating,  setAnimating]  = useState(false);
  const [isMobile,   setMobile]     = useState(false);
  const [isTablet,   setTablet]     = useState(false);
  const [headerVis,  setHeaderVis]  = useState(false);
  const [cardsVis,   setCardsVis]   = useState(false);
  const [dragStart,  setDragStart]  = useState(null);
  const [progress,   setProgress]   = useState(0);
  /* Desktop card height — measured from the active card's DOM node */
  const [stageH,     setStageH]     = useState(320);

  const headerRef  = useRef(null);
  const cardsRef   = useRef(null);
  const activeCard = useRef(null); /* ref attached to active card */
  const timerRef   = useRef(null);

  /* Responsive breakpoints */
  useEffect(() => {
    const check = () => {
      setMobile(window.innerWidth < 640);
      setTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* Measure active card height on desktop to set stage height */
  useEffect(() => {
    if (isMobile) return;
    const measure = () => {
      if (activeCard.current) {
        const h = activeCard.current.getBoundingClientRect().height;
        if (h > 0) setStageH(h + 40);
      }
    };
    measure();
    const id = setTimeout(measure, 700); /* after transition */
    window.addEventListener("resize", measure);
    return () => { clearTimeout(id); window.removeEventListener("resize", measure); };
  }, [current, isMobile, language]);

  /* Intersection observers */
  useEffect(() => {
    const obs = (setter) => new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setter(true); }, { threshold: 0.08 }
    );
    const o1 = obs(setHeaderVis);
    const o2 = obs(setCardsVis);
    if (headerRef.current) o1.observe(headerRef.current);
    if (cardsRef.current)  o2.observe(cardsRef.current);
    return () => { o1.disconnect(); o2.disconnect(); };
  }, []);

  /* Navigation */
  const goTo = useCallback((idx) => {
    if (animating || idx === current) return;
    setAnimating(true);
    setCurrent(idx);
    setTimeout(() => setAnimating(false), 700);
  }, [animating, current]);

  const next = useCallback(() => goTo((current + 1) % total), [goTo, current, total]);
  const prev = useCallback(() => goTo((current - 1 + total) % total), [goTo, current, total]);

  /* Auto-advance */
  useEffect(() => {
    timerRef.current = setInterval(next, 6500);
    return () => clearInterval(timerRef.current);
  }, [next]);

  /* Progress bar */
  useEffect(() => {
    setProgress(0);
    let p = 0;
    const id = setInterval(() => {
      p = Math.min(100, p + 100 / (6500 / 60));
      setProgress(p);
      if (p >= 100) clearInterval(id);
    }, 60);
    return () => clearInterval(id);
  }, [current]);

  /* Touch / drag swipe */
  const onDragStart = useCallback((e) => {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    setDragStart(x);
  }, []);
  const onDragEnd = useCallback((e) => {
    if (dragStart === null) return;
    const x  = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const dx = dragStart - x;
    if (Math.abs(dx) > 40) { dx > 0 ? next() : prev(); }
    setDragStart(null);
  }, [dragStart, next, prev]);

  const bg = isDarkMode ? "#04040A" : "#050408";

  return (
    <section
      id="testimonials"
      style={{
        position: "relative",
        background: bg,
        color: "white",
        padding: isMobile ? "64px 0 80px" : isTablet ? "96px 0 112px" : "112px 0 136px",
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
          50%      { transform: translateY(-22px) scale(1.06); }
        }
        @keyframes marqueeTest {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes shimmerTest {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes floatStar {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50%     { transform: translateY(-11px) rotate(14deg); }
        }
        @keyframes mobileSlideIn {
          from { opacity: 0; transform: translateX(22px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .test-shimmer {
          background: linear-gradient(100deg,
            rgba(255,255,255,0.92) 20%,
            rgba(255,255,255,0.28) 50%,
            rgba(255,255,255,0.92) 80%
          );
          background-size: 200% auto;
          animation: shimmerTest 6s linear infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .arrow-btn { transition: all 0.22s ease !important; }
        .arrow-btn:hover { background: rgba(255,255,255,0.12) !important; border-color: rgba(255,255,255,0.4) !important; }
        .arrow-btn:active { transform: scale(0.92) !important; }
      `}</style>

      {/* ── Ambient blobs ── */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden", zIndex:0 }}>
        {[
          { top:"-10%",   left:"-6%",  w:460, col:"#FF6B8A", dur:18 },
          { top:"35%",    right:"-8%", w:380, col:"#4ECDC4", dur:22 },
          { bottom:"-6%", left:"30%",  w:320, col:"#FFB347", dur:16 },
          { top:"55%",    left:"-5%",  w:260, col:"#A78BFA", dur:20 },
        ].map((b, i) => (
          <div key={i} style={{
            position: "absolute", ...b,
            width: isMobile ? b.w * 0.5 : b.w,
            height: isMobile ? b.w * 0.5 : b.w,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${b.col}1A 0%, transparent 70%)`,
            filter: "blur(88px)",
            animation: `blobDrift ${b.dur}s ease-in-out infinite ${i * 4}s`,
          }}/>
        ))}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.016) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.016) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at 50% 50%, black 40%, transparent 80%)",
        }}/>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(0,0,0,0.65) 100%)" }}/>
      </div>

      {/* Noise grain */}
      <div style={{
        position:"absolute", inset:0, zIndex:1, pointerEvents:"none",
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        opacity: 0.044, mixBlendMode: "overlay",
      }}/>

      {/* Floating stars — desktop only */}
      {!isMobile && [
        { top:"12%", left:"4%",  size:14, delay:"0s",   col:"#F5D76E" },
        { top:"22%", right:"6%", size:10, delay:"1.2s", col:"#FF6B8A" },
        { top:"68%", left:"6%",  size:11, delay:"2.4s", col:"#4ECDC4" },
        { top:"78%", right:"5%", size:13, delay:"0.7s", col:"#A78BFA" },
      ].map((s, i) => (
        <div key={i} style={{
          position: "absolute", ...s,
          color: s.col, fontSize: s.size, opacity: 0.42,
          animation: `floatStar ${3.5 + i * 0.8}s ease-in-out infinite ${s.delay}`,
          zIndex: 1, pointerEvents: "none",
        }}>✦</div>
      ))}

      <div style={{
        maxWidth: 1100, margin: "0 auto",
        padding: isMobile ? "0 16px" : isTablet ? "0 24px" : "0 32px",
        position: "relative", zIndex: 2,
      }}>

        {/* ── Marquee ── */}
        <div style={{
          marginBottom: isMobile ? 32 : 52,
          paddingBottom: isMobile ? 12 : 20,
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          overflow: "hidden", position: "relative",
        }}>
          <div style={{ position:"absolute", left:0, top:0, bottom:0, width:36, background:`linear-gradient(90deg,${bg},transparent)`, zIndex:1, pointerEvents:"none" }}/>
          <div style={{ position:"absolute", right:0, top:0, bottom:0, width:36, background:`linear-gradient(-90deg,${bg},transparent)`, zIndex:1, pointerEvents:"none" }}/>
          <div style={{
            display:"flex", whiteSpace:"nowrap", fontWeight:800,
            textTransform:"uppercase", letterSpacing:"0.26em",
            fontSize:"clamp(7px,2vw,8px)", color:"rgba(255,255,255,0.16)",
            animation:"marqueeTest 28s linear infinite",
          }}>
            {Array(8).fill(["✦ Verified Reviews","🍦 2,000+ Happy Fans","✦ 5 Star Rated","🍓 Real Customers","✦ Trust the Scoop","🍫 Loved Globally"]).flat().map((l, i) => (
              <span key={i} style={{ margin:"0 18px", color: i%6===0 ? "rgba(245,215,110,0.32)" : "rgba(255,255,255,0.16)" }}>{l}</span>
            ))}
          </div>
        </div>

        {/* ── Header ── */}
        <div
          ref={headerRef}
          style={{
            textAlign: "center",
            marginBottom: isMobile ? 36 : 64,
            opacity:   headerVis ? 1 : 0,
            transform: headerVis ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.8s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:16 }}>
            <div style={{ width:26, height:2, background:"linear-gradient(90deg,#FF6B8A,#4ECDC4)", borderRadius:2, boxShadow:"0 0 12px rgba(255,107,138,0.5)" }}/>
            <span style={{ fontSize:"clamp(8px,2.2vw,9px)", fontWeight:800, letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)", fontFamily:"'DM Sans',sans-serif" }}>{t.eyebrow}</span>
            <div style={{ width:26, height:2, background:"linear-gradient(90deg,#4ECDC4,#FF6B8A)", borderRadius:2, boxShadow:"0 0 12px rgba(78,205,196,0.5)" }}/>
          </div>

          <h2 className="test-shimmer" style={{
            fontSize: "clamp(42px,10vw,104px)",
            fontWeight: 900, lineHeight: 0.84,
            letterSpacing: "-0.04em", textTransform: "uppercase",
            fontStyle: "italic", margin: "0 0 18px",
            whiteSpace: "pre-line",
          }}>
            {t.heading}
          </h2>

          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:12 }}>
            <div style={{ height:1, width:isMobile?34:56, background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.3))" }}/>
            <span style={{ fontSize:9, opacity:0.2, letterSpacing:"0.18em" }}>✦ ✦ ✦</span>
            <div style={{ height:1, width:isMobile?34:56, background:"linear-gradient(90deg,rgba(255,255,255,0.3),transparent)" }}/>
          </div>

          <p style={{
            fontSize: "clamp(12px,3vw,15px)",
            color:"rgba(255,255,255,0.42)",
            fontFamily:"'DM Sans',sans-serif", fontStyle:"italic", margin: 0,
          }}>{t.subheading}</p>
        </div>

        {/* ── Carousel ── */}
        <div
          ref={cardsRef}
          style={{
            opacity:   cardsVis ? 1 : 0,
            transform: cardsVis ? "translateY(0)" : "translateY(36px)",
            transition: "opacity 0.85s ease 0.18s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.18s",
          }}
        >
          {isMobile ? (
            /* ══════════════════════════════════
               MOBILE: simple single-card swap with slide animation
               No absolute positioning, no fixed height, no overflow clips.
            ══════════════════════════════════ */
            <div
              onTouchStart={onDragStart}
              onTouchEnd={onDragEnd}
              style={{ marginBottom: 28, touchAction: "pan-y" }}
            >
              {/* Slide-in animation key forces re-mount on change */}
              <div key={current} style={{ animation: "mobileSlideIn 0.42s cubic-bezier(0.22,1,0.36,1) both" }}>
                <TestiCard
                  item={t.testimonials[current]}
                  isActive={true}
                  isPrev={false}
                  isNext={false}
                  isMobile={true}
                  cardRef={activeCard}
                />
              </div>
            </div>
          ) : (
            /* ══════════════════════════════════
               DESKTOP: 3D perspective stack
               Height is measured from the real active card.
            ══════════════════════════════════ */
            <div
              onMouseDown={onDragStart}
              onMouseUp={onDragEnd}
              onTouchStart={onDragStart}
              onTouchEnd={onDragEnd}
              style={{
                position: "relative",
                height: stageH,
                perspective: "1200px",
                perspectiveOrigin: "50% 40%",
                overflow: "visible",
                marginBottom: 48,
                transition: "height 0.5s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              {t.testimonials.map((item, i) => {
                const offset   = (i - current + total) % total;
                const isPrev   = offset === total - 1;
                const isNext   = offset === 1;
                const isActive = offset === 0;
                return (
                  <TestiCard
                    key={item.id}
                    item={item}
                    isActive={isActive}
                    isPrev={isPrev}
                    isNext={isNext}
                    onClick={() => goTo(i)}
                    isMobile={false}
                    cardRef={isActive ? activeCard : null}
                  />
                );
              })}
            </div>
          )}

          {/* ── Controls ── */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: isMobile ? 14 : 24,
          }}>
            <button
              className="arrow-btn"
              onClick={prev}
              aria-label="Previous"
              style={{
                width: isMobile ? 38 : 48, height: isMobile ? 38 : 48,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "rgba(255,255,255,0.6)",
                fontSize: isMobile ? 14 : 16, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}
            >←</button>

            {/* Progress dots */}
            <div style={{ display:"flex", alignItems:"center", gap: isMobile ? 7 : 12 }}>
              {t.testimonials.map((item, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  style={{
                    position: "relative",
                    height: isMobile ? 3 : 4,
                    width: current === i ? (isMobile ? 28 : 44) : (isMobile ? 8 : 12),
                    borderRadius: 4, border: "none", padding: 0, cursor: "pointer",
                    background: current === i ? item.accent : "rgba(255,255,255,0.18)",
                    boxShadow: current === i ? `0 0 10px ${item.accent}80` : "none",
                    transition: "all 0.45s cubic-bezier(0.22,1,0.36,1)",
                    overflow: "hidden",
                    opacity: current === i ? 1 : 0.5,
                  }}
                >
                  {current === i && (
                    <div style={{
                      position: "absolute", inset: 0, borderRadius: 4,
                      background: "linear-gradient(90deg, rgba(255,255,255,0.5), transparent)",
                      width: `${progress}%`, transition: "none",
                    }}/>
                  )}
                </button>
              ))}
            </div>

            <button
              className="arrow-btn"
              onClick={next}
              aria-label="Next"
              style={{
                width: isMobile ? 38 : 48, height: isMobile ? 38 : 48,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "rgba(255,255,255,0.6)",
                fontSize: isMobile ? 14 : 16, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}
            >→</button>
          </div>

          {/* Count */}
          <div style={{
            textAlign: "center", marginTop: isMobile ? 16 : 24,
            fontSize: "clamp(8px,2vw,9px)", fontWeight: 800,
            letterSpacing: "0.28em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.22)", fontFamily: "'DM Sans', sans-serif",
          }}>
            <span style={{ color: t.testimonials[current].accent }}>0{current + 1}</span>
            {" / "}0{total}
          </div>
        </div>

        {/* ── Stats ── */}
        <div style={{
          marginTop: isMobile ? 44 : 72,
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1px",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 20,
          overflow: "hidden",
          background: "rgba(255,255,255,0.06)",
          opacity:   cardsVis ? 1 : 0,
          transform: cardsVis ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s ease 0.4s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s",
          /* On tablet+ expand to 4 columns */
          ...(!isMobile && { gridTemplateColumns: "repeat(4, 1fr)" }),
        }}>
          {[
            { value: "2,000+", label: "Happy Fans",  accent: "#F5D76E" },
            { value: "4.98",   label: "Avg. Rating", accent: "#FF6B8A" },
            { value: "100%",   label: "Verified",    accent: "#4ECDC4" },
            { value: "12",     label: "Flavours",    accent: "#A78BFA" },
          ].map((s, i) => (
            <div key={i} style={{
              padding: isMobile ? "18px 12px" : "28px 24px",
              background: "linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
              backdropFilter: "blur(8px)",
              textAlign: "center",
              borderRight: !isMobile && i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
              /* On 2-col mobile, add dividers to right of col 0 and bottom of top row */
              ...(isMobile && i % 2 === 0 && { borderRight: "1px solid rgba(255,255,255,0.06)" }),
              ...(isMobile && i < 2 && { borderBottom: "1px solid rgba(255,255,255,0.06)" }),
            }}>
              <div style={{
                fontSize: "clamp(22px,5vw,36px)", fontWeight: 900, fontStyle: "italic",
                letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 5,
                background: `linear-gradient(135deg, ${s.accent}, rgba(255,255,255,0.7))`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                fontFamily: "'Syne', sans-serif",
              }}>{s.value}</div>
              <div style={{
                fontSize: "clamp(7px,2vw,9px)", fontWeight: 800,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif",
              }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Bottom rule */}
        <div style={{
          marginTop: isMobile ? 48 : 80, height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
        }}/>
      </div>
    </section>
  );
};

export default Testimonials;