import React, { useState, useRef, useEffect } from "react";

/* ─────────────────────────────────────────
   GALLERY ITEMS — pure SVG, no images
───────────────────────────────────────────*/
const ITEMS = [
  {
    id: 1, label: "Madagascar Bean", alt: "Vanilla Bean Scoop",
    c1: "#FFF8DC", c2: "#F5D76E", c3: "#C8A000", c4: "#3A2800",
    render: (s) => (
      <svg width={s} height={s} viewBox="0 0 140 140" fill="none">
        <defs>
          <radialGradient id="g1a" cx="35%" cy="28%" r="65%">
            <stop offset="0%" stopColor="#FFFCE0"/><stop offset="50%" stopColor="#F5D76E"/><stop offset="100%" stopColor="#7A5500"/>
          </radialGradient>
          <radialGradient id="g1b" cx="35%" cy="28%" r="65%">
            <stop offset="0%" stopColor="#FFF3A0"/><stop offset="50%" stopColor="#E8C840"/><stop offset="100%" stopColor="#5A3E00"/>
          </radialGradient>
          <pattern id="wf1" patternUnits="userSpaceOnUse" width="9" height="9" patternTransform="rotate(45)">
            <rect width="9" height="9" fill="#D4A060"/>
            <line x1="0" y1="4.5" x2="9" y2="4.5" stroke="#7A3C0A" strokeWidth="1" opacity="0.5"/>
            <line x1="4.5" y1="0" x2="4.5" y2="9" stroke="#7A3C0A" strokeWidth="1" opacity="0.5"/>
          </pattern>
        </defs>
        {/* Cone */}
        <path d="M48 72 L70 132 L92 72 Z" fill="url(#wf1)" stroke="#7A3C0A" strokeWidth="1.5"/>
        <path d="M62 72 L70 132 L92 72 Z" fill="rgba(0,0,0,0.18)"/>
        <path d="M48 72 Q70 64 92 72" stroke="rgba(255,220,140,0.7)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Scoop 1 */}
        <circle cx="70" cy="58" r="24" fill="url(#g1a)"/>
        {/* Scoop 2 */}
        <circle cx="70" cy="37" r="18" fill="url(#g1b)"/>
        {/* Gloss */}
        <ellipse cx="62" cy="30" rx="6" ry="4" fill="rgba(255,255,255,0.55)" style={{filter:"blur(2px)"}}/>
        <ellipse cx="63" cy="50" rx="7" ry="4.5" fill="rgba(255,255,255,0.45)" style={{filter:"blur(2px)"}}/>
        {/* Vanilla pod fleck */}
        <line x1="67" y1="34" x2="74" y2="42" stroke="#7A5500" strokeWidth="1" opacity="0.5"/>
        <line x1="64" y1="38" x2="70" y2="44" stroke="#7A5500" strokeWidth="1" opacity="0.4"/>
        {/* Ground shadow */}
        <ellipse cx="70" cy="136" rx="22" ry="5" fill="#F5D76E" opacity="0.2" style={{filter:"blur(5px)"}}/>
      </svg>
    ),
  },
  {
    id: 2, label: "Velvet Cocoa", alt: "Chocolate Ganache",
    c1: "#E8C090", c2: "#8B4513", c3: "#4A2010", c4: "#200A00",
    render: (s) => (
      <svg width={s} height={s} viewBox="0 0 140 140" fill="none">
        <defs>
          <radialGradient id="g2a" cx="35%" cy="28%" r="65%">
            <stop offset="0%" stopColor="#D4956A"/><stop offset="50%" stopColor="#7B4F2E"/><stop offset="100%" stopColor="#200A00"/>
          </radialGradient>
          <radialGradient id="g2b" cx="35%" cy="28%" r="65%">
            <stop offset="0%" stopColor="#C8B090"/><stop offset="50%" stopColor="#6B3A1E"/><stop offset="100%" stopColor="#1A0500"/>
          </radialGradient>
          <radialGradient id="g2c" cx="35%" cy="28%" r="65%">
            <stop offset="0%" stopColor="#E0C0A0"/><stop offset="50%" stopColor="#8B5030"/><stop offset="100%" stopColor="#300A00"/>
          </radialGradient>
        </defs>
        {/* Cup */}
        <path d="M38 72 L48 118 L92 118 L102 72 Z" fill="#D4A060" stroke="#8B5020" strokeWidth="1.5"/>
        <path d="M38 72 L48 118 L68 118 L58 72 Z" fill="rgba(255,255,255,0.12)"/>
        <line x1="42" y1="88" x2="98" y2="88" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        <line x1="44" y1="102" x2="96" y2="102" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
        {/* 3 scoops */}
        <circle cx="70" cy="60" r="22" fill="url(#g2a)"/>
        <circle cx="52" cy="55" r="16" fill="url(#g2b)"/>
        <circle cx="88" cy="55" r="16" fill="url(#g2c)"/>
        {/* Gloss */}
        <ellipse cx="63" cy="52" rx="6" ry="4" fill="rgba(255,255,255,0.4)" style={{filter:"blur(2px)"}}/>
        <ellipse cx="46" cy="48" rx="4.5" ry="3" fill="rgba(255,255,255,0.35)" style={{filter:"blur(1.5px)"}}/>
        {/* Choc drizzle */}
        <path d="M55 44 Q62 38 70 44 Q78 50 85 44" stroke="#3A1000" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6"/>
        <path d="M60 48 Q64 42 68 46" stroke="#3A1000" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5"/>
        {/* Whip */}
        <path d="M62 32 Q70 22 78 32 Q82 38 70 36 Q58 34 62 32Z" fill="rgba(255,255,255,0.92)"/>
        {/* Cherry */}
        <circle cx="70" cy="26" r="5" fill="#C0182F"/>
        <ellipse cx="71" cy="24" rx="1.5" ry="1" fill="rgba(255,255,255,0.5)"/>
        <ellipse cx="70" cy="128" rx="26" ry="5" fill="#8B4513" opacity="0.2" style={{filter:"blur(5px)"}}/>
      </svg>
    ),
  },
  {
    id: 3, label: "Summer Churn", alt: "Field Strawberry",
    c1: "#FFBCCC", c2: "#FF6B8A", c3: "#C0182F", c4: "#5A0018",
    render: (s) => (
      <svg width={s} height={s} viewBox="0 0 140 140" fill="none">
        <defs>
          <radialGradient id="g3a" cx="35%" cy="28%" r="65%">
            <stop offset="0%" stopColor="#FFCCD8"/><stop offset="50%" stopColor="#FF6B8A"/><stop offset="100%" stopColor="#6A0018"/>
          </radialGradient>
          <pattern id="wf3" patternUnits="userSpaceOnUse" width="9" height="9" patternTransform="rotate(45)">
            <rect width="9" height="9" fill="#D4A060"/>
            <line x1="0" y1="4.5" x2="9" y2="4.5" stroke="#7A3C0A" strokeWidth="1" opacity="0.5"/>
            <line x1="4.5" y1="0" x2="4.5" y2="9" stroke="#7A3C0A" strokeWidth="1" opacity="0.5"/>
          </pattern>
        </defs>
        {/* Cone */}
        <path d="M48 75 L70 134 L92 75 Z" fill="url(#wf3)" stroke="#7A3C0A" strokeWidth="1.5"/>
        <path d="M62 75 L70 134 L92 75 Z" fill="rgba(0,0,0,0.15)"/>
        <path d="M48 75 Q70 67 92 75" stroke="rgba(255,220,140,0.7)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Scoop */}
        <circle cx="70" cy="57" r="26" fill="url(#g3a)"/>
        <ellipse cx="61" cy="48" rx="8" ry="5" fill="rgba(255,255,255,0.5)" style={{filter:"blur(2.5px)"}}/>
        {/* Strawberry pieces on top */}
        {[[58,42],[76,40],[68,36]].map(([x,y],i)=>(
          <g key={i} transform={`rotate(${i*25-15},${x},${y})`}>
            <ellipse cx={x} cy={y} rx="5" ry="6.5" fill="#FF2244"/>
            <path d={`M${x-3} ${y-4} Q${x} ${y-8} ${x+3} ${y-4}`} stroke="#3A8A20" strokeWidth="1.2" fill="none"/>
            {[[x-1,y-1],[x+1,y+1],[x-1,y+2]].map(([sx,sy],si)=>(
              <ellipse key={si} cx={sx} cy={sy} rx="0.8" ry="1" fill="rgba(255,255,255,0.6)"/>
            ))}
          </g>
        ))}
        <ellipse cx="70" cy="136" rx="22" ry="5" fill="#FF6B8A" opacity="0.22" style={{filter:"blur(5px)"}}/>
      </svg>
    ),
  },
  {
    id: 4, label: "Sun Ripened", alt: "Alphonso Mango",
    c1: "#FFE0A0", c2: "#FFB347", c3: "#E07000", c4: "#5A3000",
    render: (s) => (
      <svg width={s} height={s} viewBox="0 0 140 140" fill="none">
        <defs>
          <radialGradient id="g4a" cx="35%" cy="28%" r="65%">
            <stop offset="0%" stopColor="#FFE8A0"/><stop offset="50%" stopColor="#FFB347"/><stop offset="100%" stopColor="#7A3800"/>
          </radialGradient>
        </defs>
        {/* Glass cup */}
        <path d="M42 68 L52 118 L88 118 L98 68 Z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
        <path d="M42 68 Q70 60 98 68" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
        {/* Mango ice cream */}
        <circle cx="70" cy="55" r="25" fill="url(#g4a)"/>
        <circle cx="52" cy="52" r="16" fill="url(#g4a)" opacity="0.85"/>
        <ellipse cx="62" cy="45" rx="7" ry="4.5" fill="rgba(255,255,255,0.5)" style={{filter:"blur(2px)"}}/>
        {/* Mango slice */}
        <path d="M75 35 Q88 28 90 42 Q86 50 76 46 Q70 38 75 35Z" fill="#FF9A00"/>
        <path d="M76 36 Q86 31 88 42" stroke="#FFD060" strokeWidth="1" fill="none" opacity="0.6"/>
        <path d="M77 39 Q83 35 85 42" stroke="#FFD060" strokeWidth="0.8" fill="none" opacity="0.5"/>
        {/* Tropical flair */}
        <path d="M52 34 C50 28 58 26 56 32 C54 36 50 35 52 34Z" fill="#78A860"/>
        <path d="M54 34 L52 38" stroke="#5A8040" strokeWidth="1" fill="none"/>
        <ellipse cx="70" cy="128" rx="24" ry="5" fill="#FFB347" opacity="0.2" style={{filter:"blur(5px)"}}/>
      </svg>
    ),
  },
  {
    id: 5, label: "Cool Infusion", alt: "Mint Chip Shards",
    c1: "#A8F0EC", c2: "#4ECDC4", c3: "#007860", c4: "#003830",
    render: (s) => (
      <svg width={s} height={s} viewBox="0 0 140 140" fill="none">
        <defs>
          <radialGradient id="g5a" cx="35%" cy="28%" r="65%">
            <stop offset="0%" stopColor="#D0F8F4"/><stop offset="50%" stopColor="#4ECDC4"/><stop offset="100%" stopColor="#004A45"/>
          </radialGradient>
          <pattern id="wf5" patternUnits="userSpaceOnUse" width="9" height="9" patternTransform="rotate(45)">
            <rect width="9" height="9" fill="#D4A060"/>
            <line x1="0" y1="4.5" x2="9" y2="4.5" stroke="#7A3C0A" strokeWidth="1" opacity="0.5"/>
            <line x1="4.5" y1="0" x2="4.5" y2="9" stroke="#7A3C0A" strokeWidth="1" opacity="0.5"/>
          </pattern>
        </defs>
        <path d="M48 76 L70 134 L92 76 Z" fill="url(#wf5)" stroke="#7A3C0A" strokeWidth="1.5"/>
        <path d="M62 76 L70 134 L92 76 Z" fill="rgba(0,0,0,0.15)"/>
        <path d="M48 76 Q70 68 92 76" stroke="rgba(255,220,140,0.7)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <circle cx="70" cy="58" r="26" fill="url(#g5a)"/>
        <ellipse cx="61" cy="49" rx="8" ry="5" fill="rgba(255,255,255,0.5)" style={{filter:"blur(2.5px)"}}/>
        {/* Choc chips - dark shards */}
        {[[62,48,15],[74,44,-20],[68,54,35],[78,52,-10],[60,56,25],[72,38,-30]].map(([x,y,r],i)=>(
          <rect key={i} x={x-3} y={y-2} width={6} height={4} rx={1}
            fill={i%2===0?"#1A0A00":"#2D1500"} transform={`rotate(${r},${x},${y})`} opacity="0.85"/>
        ))}
        {/* Mint leaf */}
        <path d="M54 38 C50 30 62 28 58 36 C56 40 52 40 54 38Z" fill="#3AAA60" opacity="0.9"/>
        <line x1="54" y1="38" x2="58" y2="35" stroke="#2A8040" strokeWidth="1" fill="none"/>
        <ellipse cx="70" cy="136" rx="22" ry="5" fill="#4ECDC4" opacity="0.2" style={{filter:"blur(5px)"}}/>
      </svg>
    ),
  },
  {
    id: 6, label: "Layered Joy", alt: "Artisan Ice Cream Cake",
    c1: "#DDD6FE", c2: "#A78BFA", c3: "#6D28D9", c4: "#2D1060",
    render: (s) => (
      <svg width={s} height={s} viewBox="0 0 140 140" fill="none">
        <defs>
          <linearGradient id="lA" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EEE8FF"/><stop offset="100%" stopColor="#A78BFA"/>
          </linearGradient>
          <linearGradient id="lB" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFCCD8"/><stop offset="100%" stopColor="#FF6B8A"/>
          </linearGradient>
          <linearGradient id="lC" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F0C8A0"/><stop offset="100%" stopColor="#C07830"/>
          </linearGradient>
        </defs>
        {/* Cake layers */}
        <rect x="22" y="96" width="96" height="20" rx="3" fill="url(#lC)"/>
        <rect x="22" y="88" width="96" height="8"  fill="white" opacity="0.85"/>
        <rect x="22" y="68" width="96" height="20" rx="0" fill="url(#lB)"/>
        <rect x="22" y="60" width="96" height="8"  fill="white" opacity="0.8"/>
        <rect x="22" y="40" width="96" height="20" rx="0" fill="url(#lA)"/>
        {/* Frosting top */}
        <path d="M18 40 Q28 28 38 36 Q48 24 58 32 Q68 20 78 28 Q88 16 98 24 Q108 18 118 32 Q122 40 118 40 L22 40 Z" fill="#F0ECFF"/>
        {/* 3D side */}
        <path d="M118 40 L126 46 L126 122 L118 116 Z" fill="rgba(80,30,180,0.22)"/>
        <path d="M22 40 L118 40 L126 46 L30 46 Z" fill="rgba(255,255,255,0.3)"/>
        {/* Candles */}
        {[50,70,90].map((x,i)=>(
          <g key={i}>
            <rect x={x-3} y={22} width={6} height={18} rx={2} fill={["#FFB347","#FF6B8A","#4ECDC4"][i]}/>
            <path d={`M${x} 18 C${x} 14 ${x-4} 12 ${x-2} 16 C${x-1} 19 ${x+2} 19 ${x+1} 16 C${x+1} 13 ${x} 12 ${x} 18Z`} fill="#FF4500"/>
          </g>
        ))}
        {/* Stars */}
        {[[38,28],[102,32],[60,14]].map(([x,y],i)=>(
          <text key={i} x={x} y={y} fontSize="8" fill="#F5D76E" opacity="0.7" textAnchor="middle">✦</text>
        ))}
        <ellipse cx="70" cy="128" rx="38" ry="6" fill="#A78BFA" opacity="0.2" style={{filter:"blur(7px)"}}/>
      </svg>
    ),
  },
  {
    id: 7, label: "Sicilian Gold", alt: "Roasted Pistachio",
    c1: "#D0F0B0", c2: "#78A860", c3: "#3A6828", c4: "#1A3A08",
    render: (s) => (
      <svg width={s} height={s} viewBox="0 0 140 140" fill="none">
        <defs>
          <radialGradient id="g7a" cx="35%" cy="28%" r="65%">
            <stop offset="0%" stopColor="#E0F8C0"/><stop offset="55%" stopColor="#78A860"/><stop offset="100%" stopColor="#1A3A08"/>
          </radialGradient>
          <radialGradient id="g7b" cx="35%" cy="28%" r="65%">
            <stop offset="0%" stopColor="#D8F0B0"/><stop offset="55%" stopColor="#5A8A40"/><stop offset="100%" stopColor="#1A2808"/>
          </radialGradient>
          <radialGradient id="g7c" cx="35%" cy="28%" r="65%">
            <stop offset="0%" stopColor="#C8E8A0"/><stop offset="55%" stopColor="#487830"/><stop offset="100%" stopColor="#102008"/>
          </radialGradient>
          <pattern id="wf7" patternUnits="userSpaceOnUse" width="9" height="9" patternTransform="rotate(45)">
            <rect width="9" height="9" fill="#C8A048"/>
            <line x1="0" y1="4.5" x2="9" y2="4.5" stroke="#7A3C0A" strokeWidth="1" opacity="0.5"/>
            <line x1="4.5" y1="0" x2="4.5" y2="9" stroke="#7A3C0A" strokeWidth="1" opacity="0.5"/>
          </pattern>
        </defs>
        {/* Triple scoop cone */}
        <path d="M46 80 L70 136 L94 80 Z" fill="url(#wf7)" stroke="#8B5A10" strokeWidth="1.5"/>
        <path d="M64 80 L70 136 L94 80 Z" fill="rgba(0,0,0,0.15)"/>
        <path d="M46 80 Q70 72 94 80" stroke="rgba(255,220,140,0.7)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* 3 scoops */}
        <circle cx="70" cy="64" r="22" fill="url(#g7a)"/>
        <circle cx="54" cy="58" r="15" fill="url(#g7b)"/>
        <circle cx="86" cy="58" r="15" fill="url(#g7c)"/>
        <circle cx="70" cy="44" r="14" fill="url(#g7a)" opacity="0.9"/>
        {/* Gloss */}
        <ellipse cx="63" cy="56" rx="6" ry="4" fill="rgba(255,255,255,0.45)" style={{filter:"blur(2px)"}}/>
        <ellipse cx="63" cy="37" rx="5" ry="3" fill="rgba(255,255,255,0.4)" style={{filter:"blur(1.5px)"}}/>
        {/* Pistachio nuts */}
        {[[65,36,-15],[75,34,20],[70,30,0],[62,40,30],[78,38,-25]].map(([x,y,r],i)=>(
          <g key={i} transform={`rotate(${r},${x},${y})`}>
            <ellipse cx={x} cy={y} rx="4" ry="3" fill="#8B6914"/>
            <ellipse cx={x} cy={y} rx="2.5" ry="2" fill="#C8A820"/>
          </g>
        ))}
        <ellipse cx="70" cy="136" rx="22" ry="5" fill="#78A860" opacity="0.22" style={{filter:"blur(5px)"}}/>
      </svg>
    ),
  },
  {
    id: 8, label: "Dark Roast", alt: "Cold Brew Espresso",
    c1: "#E8D0B0", c2: "#C08040", c3: "#7A4818", c4: "#2A0C00",
    render: (s) => (
      <svg width={s} height={s} viewBox="0 0 140 140" fill="none">
        <defs>
          <radialGradient id="g8a" cx="35%" cy="28%" r="65%">
            <stop offset="0%" stopColor="#E8C890"/><stop offset="50%" stopColor="#C08040"/><stop offset="100%" stopColor="#3A1800"/>
          </radialGradient>
          <linearGradient id="cup8" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5F0E8"/><stop offset="100%" stopColor="#D0C8B8"/>
          </linearGradient>
        </defs>
        {/* Espresso cup - ceramic */}
        <path d="M32 72 L44 116 L96 116 L108 72 Z" fill="url(#cup8)" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5"/>
        <path d="M32 72 Q70 62 108 72" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
        {/* Cup handle */}
        <path d="M108 80 Q122 80 122 92 Q122 104 108 104" stroke="#C8C0B0" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M108 80 Q118 80 118 92 Q118 104 108 104" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none"/>
        {/* Coffee ice cream */}
        <circle cx="70" cy="60" r="24" fill="url(#g8a)"/>
        <circle cx="52" cy="55" r="15" fill="url(#g8a)" opacity="0.88"/>
        {/* Gloss */}
        <ellipse cx="62" cy="51" rx="7" ry="4.5" fill="rgba(255,255,255,0.4)" style={{filter:"blur(2px)"}}/>
        <ellipse cx="46" cy="47" rx="5" ry="3" fill="rgba(255,255,255,0.35)" style={{filter:"blur(1.5px)"}}/>
        {/* Espresso drizzle */}
        <path d="M58 42 Q64 36 70 40 Q76 44 82 38" stroke="#2A0C00" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.65"/>
        {/* Coffee bean */}
        <ellipse cx="76" cy="42" rx="7" ry="5" fill="#3A1800" transform="rotate(-20,76,42)"/>
        <path d="M70 40 Q76 42 82 40" stroke="#6B3010" strokeWidth="1" fill="none"/>
        {/* Steam wisps */}
        <path d="M58 28 Q60 22 58 16" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M66 26 Q68 19 66 13" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M74 28 Q76 21 74 15" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <ellipse cx="70" cy="126" rx="28" ry="5" fill="#C08040" opacity="0.2" style={{filter:"blur(5px)"}}/>
      </svg>
    ),
  },
];

const translations = {
  en: {
    heading: "The Collection",
    eyebrow: "Chilled Series",
    subheading: "A visual journey through our signature small-batch churns.",
    footer: "The Finest Scoops",
  },
  fr: {
    heading: "La Collection",
    eyebrow: "Série Glacée",
    subheading: "Un voyage visuel à travers nos créations artisanales.",
    footer: "Les Meilleures Boules",
  },
  es: {
    heading: "La Colección",
    eyebrow: "Serie Helada",
    subheading: "Un viaje visual por nuestros lotes maestros de helado.",
    footer: "Los Mejores Sabores",
  },
};

/* ── Gallery Card ─────────────────────────────────────────────── */
const GalleryCard = ({ item, index, isMobile, isTablet }) => {
  const ref   = useRef(null);
  const [tilt,    setTilt]    = useState({ x: 0, y: 0 });
  const [shine,   setShine]   = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), index * 65); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  const onMove = (e) => {
    if (isMobile) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width;
    const cy = (e.clientY - rect.top)  / rect.height;
    setTilt({ x: (cy - 0.5) * -15, y: (cx - 0.5) * 15 });
    setShine({ x: cx * 100, y: cy * 100 });
  };

  const iconSize = isMobile ? 76 : isTablet ? 96 : 116;

  return (
    <div
      ref={ref}
      style={{
        perspective: 900,
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(44px) scale(0.93)",
        transition: `opacity 0.75s ease, transform 0.75s cubic-bezier(0.22,1,0.36,1)`,
      }}
    >
      <div
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setTilt({x:0,y:0}); setShine({x:50,y:50}); setHovered(false); }}
        style={{
          position: "relative",
          borderRadius: 24,
          overflow: "hidden",
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? "translateZ(18px) scale(1.03)" : "scale(1)"}`,
          transition: hovered
            ? "transform 0.1s ease-out, box-shadow 0.3s"
            : "transform 0.65s cubic-bezier(0.22,1,0.36,1), box-shadow 0.6s",
          boxShadow: hovered
            ? `0 36px 72px rgba(0,0,0,0.55), 0 0 0 1px ${item.c2}55, 0 0 50px ${item.c2}28`
            : `0 8px 24px rgba(0,0,0,0.3), 0 0 0 1px ${item.c3}22`,
          cursor: "pointer",
          background: `linear-gradient(145deg, ${item.c4}66, ${item.c4}bb)`,
          aspectRatio: "1 / 1",
        }}
      >
        {/* Noise grain */}
        <div style={{
          position:"absolute", inset:0, zIndex:1, pointerEvents:"none",
          backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.045, mixBlendMode:"overlay",
        }}/>

        {/* Radial bg glow */}
        <div style={{
          position:"absolute", inset:0,
          background:`radial-gradient(ellipse at 40% 30%, ${item.c2}28, transparent 68%)`,
          transition:"opacity 0.4s",
          opacity: hovered ? 1 : 0.6,
        }}/>

        {/* Holographic shine */}
        <div style={{
          position:"absolute", inset:0, zIndex:2, pointerEvents:"none",
          background:`radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.2) 0%, transparent 58%)`,
          opacity: hovered ? 1 : 0,
          transition:"opacity 0.2s", mixBlendMode:"overlay",
        }}/>

        {/* Top stripe */}
        <div style={{
          position:"absolute", top:0, left:0, right:0, height:2.5, zIndex:3,
          background:`linear-gradient(90deg, ${item.c1}, ${item.c2}, ${item.c3})`,
          opacity: hovered ? 1 : 0.4, transition:"opacity 0.3s",
        }}/>

        {/* Rim glow */}
        <div style={{
          position:"absolute", inset:0, zIndex:3, pointerEvents:"none", borderRadius:24,
          boxShadow:`inset 0 0 0 1px ${item.c2}${hovered ? "55" : "22"}`,
          transition:"box-shadow 0.3s",
        }}/>

        {/* SVG render */}
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"center",
          height:"100%", position:"relative", zIndex:4,
          padding: isMobile ? 8 : isTablet ? 12 : 16,
          transform:`translateZ(${hovered ? 16 : 0}px)`,
          transition:"transform 0.45s cubic-bezier(0.34,1.56,0.64,1)",
          filter: hovered
            ? `drop-shadow(0 14px 28px ${item.c2}66) drop-shadow(0 4px 8px rgba(0,0,0,0.4))`
            : `drop-shadow(0 6px 16px rgba(0,0,0,0.35))`,
        }}>
          {item.render(iconSize)}
        </div>

        {/* Label — slides up on hover */}
        <div style={{
          position:"absolute", bottom:0, left:0, right:0, zIndex:5,
          padding:"0 16px",
          maxHeight: hovered ? 60 : 0,
          overflow:"hidden",
          opacity: hovered ? 1 : 0,
          transition:"max-height 0.4s ease, opacity 0.3s, padding 0.3s",
          paddingBottom: hovered ? 16 : 0,
          paddingTop: hovered ? 10 : 0,
          background:`linear-gradient(to top, ${item.c4}dd, transparent)`,
        }}>
          <p style={{
            margin:0, fontSize:9, fontWeight:800,
            letterSpacing:"0.16em", textTransform:"uppercase",
            color: item.c1, lineHeight:1,
          }}>{item.alt}</p>
          <div style={{
            marginTop:6, height:1.5, borderRadius:1,
            background:`linear-gradient(90deg, ${item.c1}, ${item.c2}44)`,
            width:"100%",
            boxShadow:`0 0 8px ${item.c2}66`,
          }}/>
          <p style={{
            margin:"5px 0 0", fontSize:10, fontWeight:900,
            letterSpacing:"-0.01em", textTransform:"uppercase",
            fontStyle:"italic", color:"white",
          }}>{item.label}</p>
        </div>
      </div>
    </div>
  );
};

/* ── Section ──────────────────────────────────────────────────── */
const Gallery = ({ language = "en", isDarkMode = false }) => {
  const t = translations[language] || translations.en;
  const [isMobile, setMobile] = useState(false);
  const [isTablet, setTablet] = useState(false);

  useEffect(() => {
    const check = () => { setMobile(window.innerWidth < 480); setTablet(window.innerWidth >= 480 && window.innerWidth < 768); };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="gallery"
      style={{
        position:"relative",
        padding: isMobile ? "64px 0 72px" : isTablet ? "80px 0 96px" : "96px 0 120px",
        background: isDarkMode ? "#06060A" : "#0A0810",
        color:"white",
        fontFamily:"'Syne', system-ui, sans-serif",
        overflow:"hidden",
        transition:"background 0.8s",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        @keyframes blobDrift {
          0%,100% { transform:translateY(0) scale(1); }
          50%      { transform:translateY(-24px) scale(1.06); }
        }
        @keyframes headIn {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes marquee {
          from { transform:translateX(0); }
          to   { transform:translateX(-50%); }
        }

        .gallery-grid {
          display:grid;
          grid-template-columns:repeat(4, 1fr);
          gap:18px;
        }
        @media (max-width:1100px) { .gallery-grid { grid-template-columns:repeat(2,1fr); gap:16px; } }
        @media (max-width:560px)  { .gallery-grid { grid-template-columns:repeat(2,1fr); gap:8px; } }
      `}</style>

      {/* Ambient blobs */}
      <div style={{position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden", zIndex:0}}>
        {[
          {top:"-8%", left:"-5%",  w:420, col:"#4ECDC4", dur:15},
          {top:"30%", right:"-6%", w:360, col:"#FF6B8A", dur:20},
          {bottom:"2%", left:"35%",w:300, col:"#FFB347", dur:17},
        ].map((b,i)=>(
          <div key={i} style={{
            position:"absolute", ...b,
            width: isMobile ? b.w*0.5 : b.w,
            height: isMobile ? b.w*0.5 : b.w,
            borderRadius:"50%",
            background:`radial-gradient(circle, ${b.col}18 0%, transparent 70%)`,
            filter:"blur(80px)",
            animation:`blobDrift ${b.dur}s ease-in-out infinite ${i*4}s`,
          }}/>
        ))}
        <div style={{
          position:"absolute", inset:0,
          backgroundImage:"linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)",
          backgroundSize:"52px 52px",
        }}/>
      </div>

      <div style={{maxWidth:1300, margin:"0 auto", padding: isMobile ? "0 14px" : isTablet ? "0 22px" : "0 28px", position:"relative", zIndex:2}}>

        {/* Header */}
        <div style={{
          display:"flex", flexWrap:"wrap",
          alignItems:"flex-end", justifyContent:"space-between",
          gap:12, marginBottom: isMobile ? 28 : isTablet ? 40 : 56,
          animation:"headIn 0.7s ease both",
        }}>
          <div>
            <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:10}}>
              <div style={{width:28, height:2, background:"linear-gradient(90deg,#4ECDC4,#FF6B8A)", borderRadius:2}}/>
              <p style={{fontSize:10, fontWeight:800, letterSpacing:"0.24em", textTransform:"uppercase", opacity:0.36, margin:0}}>
                {t.eyebrow}
              </p>
            </div>
            <h2 style={{
              fontSize: isMobile ? "clamp(26px,8vw,36px)" : isTablet ? "clamp(36px,7vw,52px)" : "clamp(52px,5.5vw,80px)",
              fontWeight:900, lineHeight:0.87,
              letterSpacing:"-0.04em", textTransform:"uppercase",
              fontStyle:"italic", margin:0,
              background:"linear-gradient(135deg, #fff 20%, rgba(255,255,255,0.42))",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            }}>
              {t.heading}
            </h2>
          </div>
          <p style={{
            fontSize: isMobile ? 10 : isTablet ? 12 : 14, opacity:0.4, fontWeight:600,
            maxWidth:220, lineHeight:1.7, margin:0,
            fontFamily:"'DM Sans', sans-serif", fontStyle:"italic",
          }}>
            {t.subheading}
          </p>
        </div>

        {/* Grid */}
        <div className="gallery-grid">
          {ITEMS.map((item, i) => (
            <GalleryCard key={item.id} item={item} index={i} isMobile={isMobile} isTablet={isTablet} />
          ))}
        </div>

        {/* Marquee footer */}
        <div style={{
          marginTop: isMobile ? 32 : isTablet ? 48 : 60,
          display:"flex", alignItems:"center", gap:16,
          borderTop:"1px solid rgba(255,255,255,0.06)",
          paddingTop: isMobile ? 14 : 22,
          overflow:"hidden",
        }}>
          <div style={{
            display:"flex", whiteSpace:"nowrap",
            fontWeight:800, textTransform:"uppercase",
            letterSpacing:"0.36em", fontSize:9, opacity:0.22,
            animation:"marquee 24s linear infinite",
            flex:1,
          }}>
            {Array(4).fill([
              `✦ ${t.footer}`,
              "🍦 Handcrafted Daily",
              "✦ Small Batch",
              "🍓 All Natural",
              "✦ Artisan Made",
              "🍫 Premium Grade",
            ]).flat().map((item,i)=>(
              <span key={i} style={{margin:"0 32px"}}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;