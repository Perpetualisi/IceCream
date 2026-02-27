import React, { useState, useRef, useEffect } from "react";

/* ─────────────────────────────────────────────
    DATA
───────────────────────────────────────────── */
const FLAVOURS = [
  {
    id: 1, name: "Vanilla",    tagline: "Madagascar Reserve",
    emoji: "🍦", badge: "Classic",
    c1: "#FFF8DC", c2: "#F5D76E", c3: "#C8A000", c4: "#7A5900",
    scoops: 2, sprinkles: ["#FFB347","#FF6B8A","#A78BFA"],
    wafer: "#D4A060",
  },
  {
    id: 2, name: "Chocolate",  tagline: "Belgian 73% Dark",
    emoji: "🍫", badge: "Rich",
    c1: "#C8956A", c2: "#7B4F2E", c3: "#4A2010", c4: "#200A00",
    scoops: 3, sprinkles: ["#F5D76E","#FF6B8A","#FFFFFF"],
    wafer: "#8B4513",
  },
  {
    id: 3, name: "Strawberry", tagline: "Field-Picked Fresh",
    emoji: "🍓", badge: "Fresh",
    c1: "#FFBCCC", c2: "#FF6B8A", c3: "#C0182F", c4: "#6A0018",
    scoops: 2, sprinkles: ["#F5D76E","#4ECDC4","#FFFFFF"],
    wafer: "#D4A060",
  },
  {
    id: 4, name: "Mango",      tagline: "Alphonso Reserve",
    emoji: "🥭", badge: "Exotic",
    c1: "#FFE0A0", c2: "#FFB347", c3: "#E07000", c4: "#7A3800",
    scoops: 2, sprinkles: ["#FF6B8A","#78A860","#FFFFFF"],
    wafer: "#C8A060",
  },
  {
    id: 5, name: "Coffee",     tagline: "Cold-Brew Arabica",
    emoji: "☕", badge: "Bold",
    c1: "#E8C090", c2: "#C08040", c3: "#7A4818", c4: "#3A1800",
    scoops: 2, sprinkles: ["#F5D76E","#FFFFFF","#C8956A"],
    wafer: "#8B5020",
  },
  {
    id: 6, name: "Mint Chip",  tagline: "Garden Mojito",
    emoji: "🌿", badge: "Cool",
    c1: "#D0F5F0", c2: "#4ECDC4", c3: "#00968C", c4: "#004A45",
    scoops: 2, sprinkles: ["#2D2D2D","#1A1A1A","#FFFFFF"],
    wafer: "#C8A060",
  },
  {
    id: 7, name: "Pistachio",  tagline: "Sicilian Roasted",
    emoji: "🫙", badge: "Premium",
    c1: "#E0F0C8", c2: "#78A860", c3: "#3A6828", c4: "#1A3A08",
    scoops: 3, sprinkles: ["#C8956A","#F5D76E","#FFFFFF"],
    wafer: "#B8963C",
  },
  {
    id: 8, name: "Cookies",    tagline: "Charcoal Cocoa",
    emoji: "🍪", badge: "Crunchy",
    c1: "#F0D0A8", c2: "#C8956A", c3: "#7A4820", c4: "#3A1800",
    scoops: 2, sprinkles: ["#2D2D2D","#1A1A1A","#C8956A"],
    wafer: "#7A3C10",
  },
];

const translations = {
  en: { heading: "Artisanal Scoops", sub: "Eight obsession-worthy flavours, made fresh every morning.", eyebrow: "Our Collection", viewAll: "Explore Full Menu" },
  fr: { heading: "Boules Artisanales", sub: "Huit saveurs irrésistibles, faites fraîches chaque matin.", eyebrow: "Notre Collection", viewAll: "Voir le Menu" },
  es: { heading: "Bolas Artesanales", sub: "Ocho sabores irresistibles, hechos frescos cada mañana.", eyebrow: "Nuestra Colección", viewAll: "Ver Menú" },
};

/* ─────────────────────────────────────────────
    3-D ICE CREAM RENDER (pure SVG + CSS)
───────────────────────────────────────────── */
const IceCream3D = ({ f, size = 180, hover }) => {
  const s = size / 180; // scale factor
  const W = size, H = size * 1.45;

  // Scoop radii
  const r0 = 52 * s; // bottom scoop
  const r1 = 40 * s;
  const r2 = 30 * s;

  // Scoop centres (stacked)
  const cx = W / 2;
  const y0 = H * 0.44;
  const y1 = y0 - r0 * 0.88;
  const y2 = y1 - r1 * 0.82;

  // Cone tip & top edge
  const tipY = H * 0.96;
  const coneTopY = y0 + r0 * 0.55;

  return (
    <svg
      width={W} height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{
        overflow: "visible",
        filter: `drop-shadow(0 ${16*s}px ${32*s}px rgba(0,0,0,0.45)) drop-shadow(0 ${4*s}px ${8*s}px ${f.c3}66)`,
        transform: hover ? `translateY(${-8*s}px)` : "translateY(0)",
        transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1), filter 0.4s",
      }}
    >
      <defs>
        {/* Scoop radial gradients */}
        {[0,1,2].map(i => (
          <radialGradient key={i} id={`sg${f.id}-${i}`} cx="35%" cy="28%" r="65%">
            <stop offset="0%"   stopColor={f.c1} />
            <stop offset="45%"  stopColor={f.c2} />
            <stop offset="80%"  stopColor={f.c3} />
            <stop offset="100%" stopColor={f.c4} />
          </radialGradient>
        ))}

        {/* Cone gradient */}
        <linearGradient id={`cg${f.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#F0C878" />
          <stop offset="40%"  stopColor={f.wafer} />
          <stop offset="100%" stopColor="#5A2800" />
        </linearGradient>

        {/* Waffle pattern */}
        <pattern id={`wf${f.id}`} patternUnits="userSpaceOnUse" width={10*s} height={10*s} patternTransform="rotate(45)">
          <rect width={10*s} height={10*s} fill={`url(#cg${f.id})`} />
          <line x1={0} y1={5*s} x2={10*s} y2={5*s} stroke="#7A3C0A" strokeWidth={1.2*s} opacity="0.5"/>
          <line x1={5*s} y1={0} x2={5*s} y2={10*s} stroke="#7A3C0A" strokeWidth={1.2*s} opacity="0.5"/>
        </pattern>

        {/* Scoop shadow/depth */}
        <radialGradient id={`sd${f.id}`} cx="50%" cy="85%" r="55%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.35)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>

        {/* Gloss overlay */}
        <radialGradient id={`gl${f.id}`} cx="30%" cy="22%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>

        {/* Clip for cone */}
        <clipPath id={`cc${f.id}`}>
          <path d={`M${cx - 58*s} ${coneTopY} L${cx} ${tipY} L${cx + 58*s} ${coneTopY} Z`} />
        </clipPath>
      </defs>

      {/* ── CONE ── */}
      <path
        d={`M${cx - 58*s} ${coneTopY} L${cx} ${tipY} L${cx + 58*s} ${coneTopY} Z`}
        fill={`url(#wf${f.id})`}
      />
      <path
        d={`M${cx - 58*s} ${coneTopY} L${cx} ${tipY} L${cx + 58*s} ${coneTopY} Z`}
        fill="none" stroke="#5A2800" strokeWidth={1.5*s} strokeLinejoin="round"
      />
      <path
        d={`M${cx + 10*s} ${coneTopY} L${cx} ${tipY} L${cx + 58*s} ${coneTopY} Z`}
        fill="rgba(0,0,0,0.18)"
      />
      <path
        d={`M${cx - 58*s} ${coneTopY} Q${cx} ${coneTopY - 8*s} ${cx + 58*s} ${coneTopY}`}
        fill="none" stroke="rgba(255,220,140,0.7)" strokeWidth={2*s} strokeLinecap="round"
      />
      <ellipse cx={cx} cy={tipY - 4*s} rx={4*s} ry={2.5*s} fill="rgba(255,200,100,0.35)" />

      {/* ── SCOOPS ── */}
      <ellipse cx={cx} cy={y0 + r0 * 0.7} rx={r0 * 0.85} ry={r0 * 0.22} fill={`url(#sd${f.id})`} />
      <circle cx={cx} cy={y0} r={r0} fill={`url(#sg${f.id}-0)`} />
      {/* FIXED ERROR HERE: changed url(#sd0) to use the correct dynamic ID */}
      <circle cx={cx} cy={y0} r={r0} fill={`url(#sd${f.id})`} opacity="0.4">
        <animate attributeName="opacity" values="0.3;0.5;0.3" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={y0} r={r0} fill={`url(#gl${f.id})`} />
      <ellipse cx={cx - r0*0.3} cy={y0 - r0*0.35} rx={r0*0.18} ry={r0*0.13} fill="rgba(255,255,255,0.7)" style={{filter:`blur(${2*s}px)`}} />

      {f.scoops >= 2 && <>
        <circle cx={cx} cy={y1} r={r1} fill={`url(#sg${f.id}-1)`} />
        <circle cx={cx} cy={y1} r={r1} fill={`url(#gl${f.id})`} />
        <ellipse cx={cx - r1*0.28} cy={y1 - r1*0.32} rx={r1*0.18} ry={r1*0.12} fill="rgba(255,255,255,0.65)" style={{filter:`blur(${1.5*s}px)`}} />
      </>}

      {f.scoops >= 3 && <>
        <circle cx={cx} cy={y2} r={r2} fill={`url(#sg${f.id}-2)`} />
        <circle cx={cx} cy={y2} r={r2} fill={`url(#gl${f.id})`} />
        <ellipse cx={cx - r2*0.28} cy={y2 - r2*0.3} rx={r2*0.2} ry={r2*0.13} fill="rgba(255,255,255,0.6)" style={{filter:`blur(${1*s}px)`}} />
      </>}

      {/* ── SPRINKLES ── */}
      {f.sprinkles.map((col, si) => {
        const topScoop = f.scoops === 3 ? { cx, cy: y2, r: r2 } : { cx, cy: y1, r: r1 };
        const angles = [30, 110, 200, 280, 60, 160, 240, 320];
        return angles.filter((_, ai) => ai % 3 === si % 3).map((angle, ai) => {
          const rad = (angle * Math.PI) / 180;
          const dist = (si === 0 ? 0.55 : si === 1 ? 0.65 : 0.48) * topScoop.r;
          const sx = topScoop.cx + Math.cos(rad) * dist;
          const sy = topScoop.cy + Math.sin(rad) * dist * 0.7;
          const len = 6 * s, w = 2.5 * s;
          return (
            <rect
              key={`${si}-${ai}`}
              x={sx - w/2} y={sy - len/2}
              width={w} height={len}
              rx={w/2}
              fill={col}
              transform={`rotate(${angle + 45}, ${sx}, ${sy})`}
              opacity="0.95"
              style={{filter:`drop-shadow(0 1px 2px rgba(0,0,0,0.4))`}}
            />
          );
        });
      })}

      {/* ── DRIPS ── */}
      {hover && [
        { x: cx - r0*0.3, startY: y0 - r0*0.1, len: 22*s, w: 7*s },
        { x: cx + r0*0.4, startY: y0 - r0*0.05, len: 14*s, w: 5*s },
      ].map((d, di) => (
        <g key={di}>
          <path
            d={`M${d.x - d.w/2} ${d.startY} Q${d.x} ${d.startY + d.len * 0.5} ${d.x} ${d.startY + d.len} Q${d.x} ${d.startY + d.len + d.w * 0.6} ${d.x - d.w*0.1} ${d.startY + d.len + d.w}`}
            fill={f.c2} stroke="none" opacity="0.85"
          />
        </g>
      ))}

      <ellipse
        cx={cx} cy={H * 0.99}
        rx={hover ? 48*s : 40*s} ry={6*s}
        fill={f.c3}
        opacity="0.22"
        style={{filter:`blur(${6*s}px)`, transition:"all 0.4s"}}
      />
    </svg>
  );
};

/* ─────────────────────────────────────────────
    PREMIUM CARD
───────────────────────────────────────────── */
const PremiumCard = ({ f, index, isMobile, isTablet }) => {
  const wrapRef = useRef(null);
  const [tilt,    setTilt]    = useState({ x: 0, y: 0 });
  const [shine,   setShine]   = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), index * 70); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  const onMove = (e) => {
    if (isMobile) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width;
    const cy = (e.clientY - rect.top)  / rect.height;
    setTilt({ x: (cy - 0.5) * -14, y: (cx - 0.5) * 14 });
    setShine({ x: cx * 100, y: cy * 100 });
  };

  const scoopSize = isMobile ? 90 : isTablet ? 110 : 160;

  return (
    <div
      ref={wrapRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(48px) scale(0.94)",
        transition: `opacity 0.8s ease, transform 0.8s cubic-bezier(0.22,1,0.36,1)`,
        perspective: 900,
      }}
    >
      <div
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setTilt({x:0,y:0}); setShine({x:50,y:50}); setHovered(false); }}
        style={{
          position: "relative",
          borderRadius: 28,
          overflow: "hidden",
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? "translateZ(18px) scale(1.025)" : "scale(1)"}`,
          transition: hovered
            ? "transform 0.1s ease-out, box-shadow 0.3s"
            : "transform 0.65s cubic-bezier(0.22,1,0.36,1), box-shadow 0.6s",
          boxShadow: hovered
            ? `0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px ${f.c2}44, 0 0 60px ${f.c2}28`
            : `0 8px 24px rgba(0,0,0,0.25), 0 0 0 1px ${f.c3}22`,
          cursor: "pointer",
          background: `linear-gradient(145deg, ${f.c4}44, ${f.c4}88)`,
          backdropFilter: "blur(20px)",
        }}
      >
        <div style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.04, mixBlendMode: "overlay",
        }} />

        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(145deg,
            ${f.c1}18 0%,
            ${f.c2}12 30%,
            ${f.c3}22 65%,
            ${f.c4}44 100%)`,
          transition: "background 0.5s",
        }} />

        <div style={{
          position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.16) 0%, transparent 58%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.2s",
          mixBlendMode: "overlay",
        }} />

        <div style={{
          position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          borderRadius: 28,
          boxShadow: `inset 0 0 0 1px ${f.c2}${hovered ? "66" : "28"}`,
          transition: "box-shadow 0.35s",
        }} />

        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: 3, borderRadius: "28px 28px 0 0",
          background: `linear-gradient(90deg, ${f.c1}, ${f.c2}, ${f.c3})`,
          opacity: hovered ? 1 : 0.45,
          transition: "opacity 0.3s",
        }} />

        <div style={{
          position: "absolute", top: 18, left: 18, zIndex: 5,
          background: `${f.c4}cc`,
          backdropFilter: "blur(12px)",
          border: `1px solid ${f.c2}55`,
          borderRadius: 40, padding: isMobile ? "3px 8px" : "4px 12px",
          fontSize: 9, fontWeight: 800,
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: f.c1,
          transform: `translateZ(${hovered ? 32 : 0}px)`,
          transition: "transform 0.35s",
        }}>{f.badge}</div>

        <div style={{
          display: "flex", justifyContent: "center",
          paddingTop: isMobile ? 18 : isTablet ? 24 : 40,
          paddingBottom: 0,
          position: "relative", zIndex: 3,
          transform: `translateZ(${hovered ? 20 : 0}px)`,
          transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        }}>
          <IceCream3D f={f} size={scoopSize} hover={hovered} />
        </div>

        <div style={{
          padding: isMobile ? "10px 12px 14px" : isTablet ? "14px 16px 18px" : "18px 22px 26px",
          position: "relative", zIndex: 4,
          transform: `translateZ(${hovered ? 16 : 0}px)`,
          transition: "transform 0.35s",
        }}>
          <div style={{
            maxHeight: hovered ? 32 : 0, overflow: "hidden",
            opacity: hovered ? 1 : 0,
            marginBottom: hovered ? 8 : 0,
            transition: "max-height 0.4s ease, opacity 0.35s, margin 0.3s",
          }}>
            <p style={{
              fontSize: 11, color: `${f.c1}bb`, margin: 0,
              fontWeight: 500, lineHeight: 1.5,
              fontFamily: "'DM Sans', sans-serif",
            }}>{f.tagline}</p>
          </div>

          <h3 style={{
            fontSize: isMobile ? 13 : isTablet ? 16 : 22,
            fontWeight: 900, margin: 0,
            textTransform: "uppercase",
            letterSpacing: "-0.03em",
            fontStyle: "italic",
            color: f.c1,
            lineHeight: 1,
          }}>{f.name}</h3>

          <div style={{
            marginTop: 10, height: 2, borderRadius: 2,
            background: `linear-gradient(90deg, ${f.c1}, ${f.c2}, ${f.c3}44)`,
            width: hovered ? "100%" : "20px",
            transition: "width 0.55s cubic-bezier(0.22,1,0.36,1)",
            boxShadow: hovered ? `0 0 10px ${f.c2}88` : "none",
          }} />
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
    SECTION
───────────────────────────────────────────── */
const Flavours = ({ language = "en", isDarkMode = false }) => {
  const t   = translations[language] || translations.en;
  const [isMobile, setMobile] = useState(false);
  const [isTablet, setTablet] = useState(false);

  useEffect(() => {
    const check = () => { 
      setMobile(window.innerWidth < 480); 
      setTablet(window.innerWidth >= 480 && window.innerWidth < 768); 
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="flavours"
      style={{
        position: "relative",
        padding: isMobile ? "60px 0 72px" : isTablet ? "80px 0 96px" : "96px 0 120px",
        background: isDarkMode ? "#06060A" : "#0A0810",
        color: "white",
        fontFamily: "'Syne', system-ui, sans-serif",
        overflow: "hidden",
        transition: "background 0.8s",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        @keyframes floatBlob {
          0%,100% { transform:translateY(0) scale(1); }
          50%      { transform:translateY(-30px) scale(1.08); }
        }
        @keyframes headIn {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .fl-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 22px;
        }
        @media (max-width: 1100px) { .fl-grid { grid-template-columns: repeat(2,1fr); gap: 20px; } }
        @media (max-width: 560px)  { .fl-grid { grid-template-columns: repeat(2,1fr); gap: 10px; } }
      `}</style>

      {/* Ambient light blobs */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden", zIndex:0 }}>
        {[
          { top:"-8%", left:"-6%",  w:500, col:"#FF6B8A", dur:14 },
          { top:"40%", right:"-8%", w:420, col:"#FFB347", dur:18 },
          { bottom:"5%", left:"30%", w:380, col:"#4ECDC4", dur:22 },
        ].map((b, i) => (
          <div key={i} style={{
            position:"absolute", ...b,
            width: isMobile ? b.w*0.5 : b.w,
            height: isMobile ? b.w*0.5 : b.w,
            borderRadius:"50%",
            background:`radial-gradient(circle, ${b.col}1A 0%, transparent 70%)`,
            filter:"blur(80px)",
            animation:`floatBlob ${b.dur}s ease-in-out infinite ${i*3}s`,
          }} />
        ))}

        <div style={{
          position:"absolute", inset:0,
          backgroundImage:"linear-gradient(rgba(255,255,255,0.024) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.024) 1px,transparent 1px)",
          backgroundSize:"52px 52px",
        }} />
      </div>

      <div style={{ maxWidth:1300, margin:"0 auto", padding: isMobile ? "0 14px" : isTablet ? "0 22px" : "0 28px", position:"relative", zIndex:2 }}>

        {/* ── Header ── */}
        <div style={{
          display:"flex", flexWrap:"wrap",
          alignItems:"flex-end", justifyContent:"space-between",
          gap: isMobile ? 10 : 16, marginBottom: isMobile ? 28 : isTablet ? 40 : 64,
          animation:"headIn 0.7s ease both",
        }}>
          <div>
            <p style={{ fontSize:10, fontWeight:800, letterSpacing:"0.26em", textTransform:"uppercase", opacity:0.35, margin:"0 0 10px" }}>
              — {t.eyebrow}
            </p>
            <h2 style={{
              fontSize: isMobile ? "clamp(24px,7.5vw,34px)" : isTablet ? "clamp(34px,7vw,48px)" : "clamp(52px,6vw,84px)",
              fontWeight:900, lineHeight:0.87,
              letterSpacing:"-0.04em", textTransform:"uppercase",
              fontStyle:"italic", margin:0,
              background:"linear-gradient(135deg, #fff 20%, rgba(255,255,255,0.45))",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            }}>
              {t.heading}
            </h2>
          </div>
          <p style={{
            fontSize: isMobile ? 10 : isTablet ? 12 : 14, opacity:0.45, fontWeight:600,
            maxWidth:240, lineHeight:1.7, margin:0,
            fontFamily:"'DM Sans', sans-serif",
          }}>
            {t.sub}
          </p>
        </div>

        {/* ── Grid ── */}
        <div className="fl-grid">
          {FLAVOURS.map((f, i) => (
            <PremiumCard key={f.id} f={f} index={i} isMobile={isMobile} isTablet={isTablet} />
          ))}
        </div>

        {/* ── Footer CTA ── */}
        <div style={{ display:"flex", justifyContent:"center", marginTop: isMobile ? 36 : isTablet ? 52 : 72 }}>
          <button
            style={{
              background:"rgba(255,255,255,0.05)",
              backdropFilter:"blur(12px)",
              border:"1px solid rgba(255,255,255,0.15)",
              color:"rgba(255,255,255,0.75)",
              padding: isMobile ? "10px 24px" : isTablet ? "12px 36px" : "14px 48px",
              borderRadius:100,
              fontFamily:"'Syne', system-ui, sans-serif",
              fontWeight:800, fontSize: isMobile ? 9 : 11,
              letterSpacing:"0.18em", textTransform:"uppercase",
              cursor:"pointer", transition:"all 0.35s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.35)"; e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.color="white"; }}
            onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.15)"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.color="rgba(255,255,255,0.75)"; }}
          >
            {t.viewAll} →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Flavours;