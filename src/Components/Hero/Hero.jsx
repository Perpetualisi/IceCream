import React, { useState, useEffect, useRef, useCallback } from "react";

const flavours = [
  {
    id: "BERRY",  name: "Wild Berry",   tagline: "Creamy Joy.",     sub: "Handpicked & Blended Fresh",
    emoji: "🍓",  color: "#FF4D6D",     colorDark: "#C0182F",       colorLight: "#FFB3C1",
    calories: 180, rating: 4.9, scoops: 2847,
  },
  {
    id: "CACAO",  name: "Dark Cacao",   tagline: "Dark Bliss.",     sub: "73% Belgian Chocolate",
    emoji: "🍫",  color: "#C47E2E",     colorDark: "#3B1F0A",       colorLight: "#E8B97A",
    calories: 210, rating: 4.8, scoops: 3210,
  },
  {
    id: "MANGO",  name: "Mango Rush",   tagline: "Tropical Rush.",  sub: "Alphonso Mango Reserve",
    emoji: "🥭",  color: "#FF9A00",     colorDark: "#B85E00",       colorLight: "#FFD580",
    calories: 160, rating: 4.7, scoops: 2100,
  },
  {
    id: "MINT",   name: "Arctic Mint",  tagline: "Cool Snap.",      sub: "Mojito-Inspired Refresh",
    emoji: "🌿",  color: "#00C6A7",     colorDark: "#007860",       colorLight: "#A0EAD9",
    calories: 150, rating: 4.6, scoops: 1890,
  },
  {
    id: "MELON",  name: "Summer Melon", tagline: "Summer Pop.",     sub: "Seedless Watermelon Crush",
    emoji: "🍉",  color: "#F7505A",     colorDark: "#A81C26",       colorLight: "#FAB0B0",
    calories: 140, rating: 4.5, scoops: 1740,
  },
];

// ── 3D Waffle Cone ──────────────────────────────────────────────────────────
const IceCreamCone = ({ flavour, isChanging, scale = 1 }) => {
  const scoopCount = Math.min(3, Math.ceil(flavour.scoops / 1000));
  const base = 120 * scale;
  const step = 24 * scale;
  const cW   = 100 * scale;
  const cH   = 135 * scale;

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      userSelect: "none",
      filter: "drop-shadow(0 20px 36px rgba(0,0,0,0.42))",
    }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: -5 * scale, position: "relative", zIndex: 2 }}>
        {[...Array(scoopCount)].map((_, i) => {
          const sz = base - i * step;
          return (
            <div key={i} style={{
              width: sz, height: sz, borderRadius: "50%",
              marginTop: i === 0 ? 0 : -sz * 0.32,
              background: `radial-gradient(circle at 33% 28%, ${flavour.colorLight}, ${flavour.color} 52%, ${flavour.colorDark})`,
              boxShadow: `0 5px 18px ${flavour.color}77, inset 0 -4px 12px ${flavour.colorDark}55, inset 3px 3px 8px rgba(255,255,255,0.28)`,
              position: "relative", zIndex: 10 - i,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transitionDelay: `${i * 0.07}s`,
              transform: isChanging ? "scale(0.25) translateY(-30px)" : "scale(1) translateY(0)",
              opacity: isChanging ? 0 : 1,
            }}>
              <div style={{
                position: "absolute", top: "17%", left: "21%", width: "28%", height: "20%",
                borderRadius: "50%", background: "rgba(255,255,255,0.42)",
                transform: "rotate(-28deg)", filter: "blur(3px)",
              }} />
              {i === 0 && (
                <span style={{ fontSize: 40 * scale, lineHeight: 1, filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.28))" }}>
                  {flavour.emoji}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <svg width={cW} height={cH} viewBox="0 0 100 135" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`cg-${flavour.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EAB46C" />
              <stop offset="50%" stopColor="#C47E2E" />
              <stop offset="100%" stopColor="#8B4E12" />
            </linearGradient>
            <pattern id={`wp-${flavour.id}`} patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
              <rect width="10" height="10" fill={`url(#cg-${flavour.id})`} />
              <line x1="0" y1="5" x2="10" y2="5" stroke="#9A5A15" strokeWidth="1.2" opacity="0.65" />
              <line x1="5" y1="0" x2="5" y2="10" stroke="#9A5A15" strokeWidth="1.2" opacity="0.65" />
            </pattern>
          </defs>
          <path d="M6 6 L50 132 L94 6 Z" fill={`url(#wp-${flavour.id})`} />
          <path d="M6 6 L50 132 L94 6 Z" fill="none" stroke="#7A3C0A" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M6 6 Q50 -4 94 6" stroke="rgba(255,218,140,0.55)" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
        <div style={{
          position: "absolute", bottom: -5, left: "50%", transform: "translateX(-50%)",
          width: 60 * scale, height: 10 * scale, borderRadius: "50%",
          background: "rgba(0,0,0,0.22)", filter: "blur(7px)",
        }} />
      </div>
    </div>
  );
};

// ── Stat pill ───────────────────────────────────────────────────────────────
const StatPill = ({ icon, label, value, color }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 6,
    background: "rgba(255,255,255,0.06)", backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "6px 10px",
  }}>
    <span style={{ fontSize: 13 }}>{icon}</span>
    <div>
      <div style={{ fontSize: 8, opacity: 0.45, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1 }}>{label}</div>
      <div style={{ fontSize: 12, fontWeight: 900, color, lineHeight: 1.3 }}>{value}</div>
    </div>
  </div>
);

// ── Flavour dot ─────────────────────────────────────────────────────────────
const FlavourDot = ({ f, isActive, onClick }) => (
  <button onClick={onClick} title={f.name} style={{
    width: isActive ? 30 : 22, height: isActive ? 30 : 22,
    borderRadius: "50%",
    border: isActive ? "2.5px solid white" : `2px solid ${f.color}44`,
    background: f.color, cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
    boxShadow: isActive ? `0 0 0 3px ${f.color}44, 0 3px 12px ${f.color}66` : "none",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: isActive ? 11 : 9,
    flexShrink: 0,
  }}>
    {f.emoji}
  </button>
);

// ── Main ─────────────────────────────────────────────────────────────────────
export default function PremiumHero3D() {
  const [index, setIndex]         = useState(0);
  const [isChanging, setChanging] = useState(false);
  const [mousePos, setMouse]      = useState({ x: 0, y: 0 });
  const [isMobile, setMobile]     = useState(false);
  const [isTablet, setTablet]     = useState(false);

  const f = flavours[index];

  const switchTo = useCallback((i) => {
    if (i === index) return;
    setChanging(true);
    setTimeout(() => { setIndex(i); setChanging(false); }, 460);
  }, [index]);

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
    const id = setInterval(() => {
      setChanging(true);
      setTimeout(() => { setIndex(p => (p + 1) % flavours.length); setChanging(false); }, 460);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (isMobile || isTablet) return;
    const h = (e) => setMouse({
      x: (e.clientX / window.innerWidth  - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, [isMobile, isTablet]);

  const isSmall = isMobile || isTablet;

  // Scale: mobile=0.55, tablet=0.72, desktop=1
  const coneScale = isMobile ? 0.55 : isTablet ? 0.72 : 1;

  const parallaxStyle = isSmall ? {} : {
    transform: `rotateY(${mousePos.x * 9}deg) rotateX(${-mousePos.y * 7}deg)`,
    transition: "transform 0.12s ease-out",
    transformStyle: "preserve-3d",
  };

  // Responsive values
  const headingSize = isMobile ? "clamp(32px, 10vw, 44px)" : isTablet ? "clamp(44px, 8vw, 64px)" : "clamp(64px, 6.5vw, 100px)";
  const taglineSize = isMobile ? 13 : isTablet ? 15 : 19;
  const sectionPadding = isMobile ? "88px 18px 80px" : isTablet ? "110px 32px 88px" : "130px 56px 90px";
  const coneHeight = isMobile ? 220 : isTablet ? 280 : 480;
  const coneWidth  = isMobile ? "100%" : isTablet ? "100%" : 400;
  const layout     = isSmall ? "column" : "row";

  return (
    <section id="home" style={{
      minHeight: "100dvh", width: "100%",
      background: "#080810", color: "white",
      fontFamily: "'Syne', system-ui, sans-serif",
      overflow: "hidden", position: "relative",
      display: "flex", flexDirection: "column",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        button { font-family: inherit; }
        @keyframes marquee  { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes float    { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-11px) rotate(3deg)} }
        @keyframes glow     { 0%,100%{opacity:.28;transform:scale(1)} 50%{opacity:.5;transform:scale(1.1)} }
        @keyframes spinCW   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spinCCW  { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes pulseDot { 0%,100%{transform:scale(1);opacity:.8} 50%{transform:scale(1.7);opacity:1} }
        .ring1 { animation: spinCW  16s linear infinite; }
        .ring2 { animation: spinCCW 24s linear infinite; }
        .floatbadge { animation: float 4s ease-in-out infinite; }
      `}</style>

      {/* ── BG glows ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{
          position: "absolute",
          top: isMobile ? "-5%" : "8%",
          right: isMobile ? "-20%" : isTablet ? "-10%" : "3%",
          width: isMobile ? 260 : isTablet ? 380 : 520,
          height: isMobile ? 260 : isTablet ? 380 : 520,
          borderRadius: "50%", background: f.color,
          filter: "blur(120px)", opacity: 0.12,
          transition: "background 1.1s ease", animation: "glow 7s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: "8%",
          left: isMobile ? "-12%" : "0%",
          width: isMobile ? 200 : isTablet ? 300 : 380,
          height: isMobile ? 200 : isTablet ? 300 : 380,
          borderRadius: "50%", background: f.colorDark,
          filter: "blur(90px)", opacity: 0.16,
          transition: "background 1.1s ease",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.016) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.016) 1px,transparent 1px)",
          backgroundSize: "54px 54px",
        }} />
      </div>

      {/* ── Hero body ── */}
      <div style={{
        position: "relative", zIndex: 10, flex: 1,
        display: "flex",
        flexDirection: layout,
        alignItems: "center",
        justifyContent: isSmall ? "flex-start" : "center",
        gap: isSmall ? 0 : 48,
        padding: sectionPadding,
        maxWidth: 1240, margin: "0 auto", width: "100%",
      }}>

        {/* ── 3D Cone ── */}
        <div style={{
          order: isSmall ? 1 : 2,
          flex: isSmall ? "0 0 auto" : "0 0 400px",
          display: "flex", alignItems: "center", justifyContent: "center",
          perspective: 1200, position: "relative",
          width: coneWidth,
          height: coneHeight,
          marginBottom: isMobile ? -8 : isTablet ? -12 : 0,
        }}>
          {/* orbit rings */}
          <div style={{ position: "absolute", top: "50%", left: "50%", width: 0, height: 0 }}>
            <div className="ring1" style={{
              position: "absolute",
              width:  isMobile ? 160 : isTablet ? 210 : 280,
              height: isMobile ? 160 : isTablet ? 210 : 280,
              borderRadius: "50%", border: `1px solid ${f.color}28`,
              marginLeft: isMobile ? -80 : isTablet ? -105 : -140,
              marginTop:  isMobile ? -80 : isTablet ? -105 : -140,
              transition: "border-color 0.5s",
            }}>
              <div style={{
                position: "absolute", top: -3, left: "50%", marginLeft: -3,
                width: isMobile ? 6 : 7, height: isMobile ? 6 : 7,
                borderRadius: "50%", background: f.color,
                boxShadow: `0 0 8px ${f.color}`, transition: "background 0.5s",
              }} />
            </div>
            <div className="ring2" style={{
              position: "absolute",
              width:  isMobile ? 230 : isTablet ? 300 : 380,
              height: isMobile ? 230 : isTablet ? 300 : 380,
              borderRadius: "50%", border: `1px solid ${f.color}10`,
              marginLeft: isMobile ? -115 : isTablet ? -150 : -190,
              marginTop:  isMobile ? -115 : isTablet ? -150 : -190,
              transition: "border-color 0.5s",
            }}>
              <div style={{
                position: "absolute", bottom: -3, right: "20%",
                width: 5, height: 5, borderRadius: "50%",
                background: f.colorLight, boxShadow: `0 0 7px ${f.colorLight}`,
                transition: "background 0.5s",
              }} />
              <div style={{
                position: "absolute", top: "18%", left: -3,
                width: 4, height: 4, borderRadius: "50%",
                background: f.color, opacity: 0.6, transition: "background 0.5s",
              }} />
            </div>
          </div>

          <div style={parallaxStyle}>
            <IceCreamCone flavour={f} isChanging={isChanging} scale={coneScale} />
          </div>

          {/* Floating badges — desktop only */}
          {!isSmall && <>
            <div className="floatbadge" style={{
              position: "absolute", top: "10%", right: "0%",
              background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.12)", borderRadius: 11,
              padding: "7px 12px", fontSize: 10, fontWeight: 800,
              letterSpacing: "0.05em", whiteSpace: "nowrap",
            }}>✨ Premium Grade</div>
            <div style={{
              position: "absolute", bottom: "18%", left: "-2%",
              background: `${f.color}1C`, backdropFilter: "blur(12px)",
              border: `1px solid ${f.color}3C`, borderRadius: 11,
              padding: "7px 12px", fontSize: 10, fontWeight: 800,
              color: f.colorLight, whiteSpace: "nowrap",
              animation: "float 5s ease-in-out infinite 1.2s",
              transition: "all 0.5s",
            }}>🌱 Vegan Friendly</div>
          </>}
        </div>

        {/* ── Text ── */}
        <div style={{
          order: isSmall ? 2 : 1,
          flex: "1 1 auto",
          textAlign: isSmall ? "center" : "left",
          display: "flex", flexDirection: "column",
          alignItems: isSmall ? "center" : "flex-start",
          paddingTop: isSmall ? 0 : 0,
        }}>

          {/* Sub-badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: `${f.color}1C`, border: `1px solid ${f.color}40`,
            borderRadius: 40, padding: isMobile ? "4px 10px" : "5px 13px",
            marginBottom: isMobile ? 12 : 16,
            fontSize: isMobile ? 9 : 10, fontWeight: 800,
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: f.colorLight, transition: "all 0.5s",
          }}>
            <span style={{
              width: isMobile ? 5 : 6, height: isMobile ? 5 : 6,
              borderRadius: "50%", background: f.color, display: "inline-block",
              animation: "pulseDot 1.8s infinite", transition: "background 0.5s",
            }} />
            {f.sub}
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: headingSize,
            fontWeight: 900, lineHeight: 0.88,
            letterSpacing: "-0.04em", textTransform: "uppercase",
            marginBottom: isMobile ? 10 : 14,
          }}>
            Sweet<br />
            <span style={{
              color: f.color, fontStyle: "italic", display: "inline-block",
              opacity: isChanging ? 0 : 1,
              transform: isChanging ? "translateY(8px)" : "translateY(0)",
              transition: "all 0.4s",
            }}>{f.name.split(" ")[0]}</span>
          </h1>

          {/* Tagline */}
          <p style={{
            fontSize: taglineSize, fontWeight: 700,
            opacity: isChanging ? 0 : 0.5,
            transform: isChanging ? "translateY(-4px)" : "translateY(0)",
            transition: "all 0.4s",
            marginBottom: isMobile ? 14 : 20,
            lineHeight: 1.4,
          }}>
            {f.tagline} — {f.sub}
          </p>

          {/* Stats */}
          <div style={{
            display: "flex", gap: isMobile ? 6 : 8, flexWrap: "wrap",
            justifyContent: isSmall ? "center" : "flex-start",
            marginBottom: isMobile ? 14 : 20,
          }}>
            <StatPill icon="⭐" label="Rating"  value={`${f.rating}/5`}                 color={f.colorLight} />
            <StatPill icon="🍦" label="Scooped" value={`${f.scoops.toLocaleString()}×`}  color={f.colorLight} />
            <StatPill icon="🔥" label="Kcal"    value={`${f.calories} cal`}             color={f.colorLight} />
          </div>

          {/* CTAs */}
          <div style={{
            display: "flex", gap: isMobile ? 8 : 10, flexWrap: "wrap",
            justifyContent: isSmall ? "center" : "flex-start",
            marginBottom: isMobile ? 14 : 20,
            width: "100%",
          }}>
            <button
              onClick={() => {
                const el = document.getElementById("flavours");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              style={{
                background: `linear-gradient(135deg, ${f.color}, ${f.colorDark})`,
                color: "white", border: "none",
                padding: isMobile ? "11px 18px" : isTablet ? "12px 22px" : "14px 28px",
                borderRadius: 12, fontWeight: 900,
                fontSize: isMobile ? 11 : 12, letterSpacing: "0.07em",
                textTransform: "uppercase", cursor: "pointer",
                boxShadow: `0 6px 22px ${f.color}44`,
                transition: "all 0.3s", whiteSpace: "nowrap",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04) translateY(-2px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${f.color}66`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 6px 22px ${f.color}44`; }}
            >😋 Scoop Yours — $4.99</button>

            <button
              onClick={() => {
                const el = document.getElementById("flavours");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              style={{
                background: "rgba(255,255,255,0.05)", backdropFilter: "blur(8px)",
                color: "white", border: "1px solid rgba(255,255,255,0.12)",
                padding: isMobile ? "11px 15px" : isTablet ? "12px 18px" : "14px 20px",
                borderRadius: 12, fontWeight: 700,
                fontSize: isMobile ? 11 : 12, cursor: "pointer",
                transition: "background 0.2s", whiteSpace: "nowrap",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
            >See All →</button>
          </div>

          {/* Social proof */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            justifyContent: isSmall ? "center" : "flex-start",
            marginBottom: isMobile ? 14 : 22,
          }}>
            <div style={{ display: "flex" }}>
              {[64, 65, 68, 72].map((id, i) => (
                <div key={i} style={{
                  width: isMobile ? 24 : 27, height: isMobile ? 24 : 27,
                  borderRadius: "50%", border: "2px solid #080810",
                  marginLeft: i > 0 ? -7 : 0,
                  overflow: "hidden", background: "#222", flexShrink: 0,
                }}>
                  <img src={`https://i.pravatar.cc/80?u=${id}`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
            <span style={{ fontSize: isMobile ? 10 : 11, opacity: 0.4, fontWeight: 700 }}>+2,000 fans obsessed</span>
          </div>

          {/* Flavour picker */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: isSmall ? "center" : "flex-start", gap: 8 }}>
            <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: "0.2em", opacity: 0.32, textTransform: "uppercase" }}>
              Pick Flavour
            </span>
            <div style={{ display: "flex", gap: isMobile ? 8 : 10, alignItems: "center" }}>
              {flavours.map((fl, i) => (
                <FlavourDot key={fl.id} f={fl} isActive={i === index} onClick={() => switchTo(i)} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Marquee strip ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: isMobile ? "7px 0" : "9px 0",
        background: "rgba(8,8,16,0.55)", backdropFilter: "blur(8px)", zIndex: 20,
      }}>
        <div style={{
          display: "flex", whiteSpace: "nowrap",
          fontWeight: 900, textTransform: "uppercase",
          letterSpacing: "0.32em", fontSize: isMobile ? 7 : 9, opacity: 0.26,
          animation: "marquee 20s linear infinite",
        }}>
          {[
            "🍦 Zero Guilt","🍓 Wild Berry","🍫 Dark Cacao","🍨 Handmade Daily",
            "🥭 Mango Rush","🌿 Arctic Mint","🍉 Summer Melon","⭐ Premium Grade","🌱 Vegan Friendly",
            "🍦 Zero Guilt","🍓 Wild Berry","🍫 Dark Cacao","🍨 Handmade Daily",
            "🥭 Mango Rush","🌿 Arctic Mint","🍉 Summer Melon","⭐ Premium Grade","🌱 Vegan Friendly",
          ].map((item, i) => <span key={i} style={{ margin: `0 ${isMobile ? 24 : 32}px` }}>{item}</span>)}
        </div>
      </div>
    </section>
  );
}