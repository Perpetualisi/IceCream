import React, { useState, useRef, useEffect } from "react";

/* ─────────────────────────────────────────
   OFFER DATA — pure SVG visuals, no images
───────────────────────────────────────────*/
const OFFERS = [
  {
    id: 1,
    tag: "50% OFF",
    tagBg: "#FF6B8A",
    c1: "#FFBCCC", c2: "#FF6B8A", c3: "#C0182F", c4: "#5A0018",
    icon: (s) => (  // Sundae cup
      <svg width={s} height={s} viewBox="0 0 120 130" fill="none">
        <defs>
          <radialGradient id="cup1" cx="40%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFBCCC"/>
            <stop offset="55%" stopColor="#FF6B8A"/>
            <stop offset="100%" stopColor="#8B0A28"/>
          </radialGradient>
          <linearGradient id="cupGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F0C0A0"/>
            <stop offset="100%" stopColor="#8B5020"/>
          </linearGradient>
        </defs>
        {/* Cup body */}
        <path d="M28 55 L38 105 L82 105 L92 55 Z" fill="url(#cupGrad)" />
        <path d="M28 55 L38 105 L82 105 L92 55 Z" fill="none" stroke="#7A3C10" strokeWidth="1.5"/>
        {/* Cup stripes */}
        <path d="M32 70 L87 70" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
        <path d="M34 82 L86 82" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        {/* Scoop 1 */}
        <circle cx="60" cy="45" r="28" fill="url(#cup1)"/>
        <ellipse cx="50" cy="36" rx="8" ry="5" fill="rgba(255,255,255,0.45)" style={{filter:"blur(3px)"}}/>
        {/* Scoop 2 */}
        <circle cx="42" cy="38" r="18" fill="url(#cup1)" opacity="0.9"/>
        {/* Whip */}
        <path d="M55 18 Q60 8 65 18 Q70 28 60 26 Q50 24 55 18Z" fill="white" opacity="0.9"/>
        {/* Cherry */}
        <circle cx="62" cy="14" r="6" fill="#C0182F"/>
        <ellipse cx="63" cy="12" rx="2" ry="1.5" fill="rgba(255,255,255,0.5)"/>
        {/* Chocolate drizzle */}
        <path d="M45 28 Q50 35 42 40 Q38 44 44 50" stroke="#5A2000" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7"/>
        <path d="M68 25 Q72 32 78 38 Q82 44 76 50" stroke="#5A2000" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6"/>
        {/* Sprinkles */}
        {[[48,22,20],[72,28,140],[55,30,60],[68,20,100],[60,24,80]].map(([x,y,r],i)=>(
          <rect key={i} x={x-4} y={y-1.5} width={8} height={3} rx={1.5} fill={["#FFB347","#4ECDC4","#F5D76E","#FF6B8A","#A78BFA"][i]} transform={`rotate(${r},${x},${y})`}/>
        ))}
        {/* Ground shadow */}
        <ellipse cx="60" cy="112" rx="30" ry="6" fill="#FF6B8A" opacity="0.18" style={{filter:"blur(6px)"}}/>
      </svg>
    ),
  },
  {
    id: 2,
    tag: "BOGO",
    tagBg: "#FFB347",
    c1: "#FFF3B0", c2: "#FFB347", c3: "#C87000", c4: "#5A3000",
    icon: (s) => (  // Two cones side by side
      <svg width={s} height={s} viewBox="0 0 120 130" fill="none">
        <defs>
          <radialGradient id="sg2a" cx="35%" cy="28%" r="65%">
            <stop offset="0%" stopColor="#FFF8DC"/>
            <stop offset="50%" stopColor="#F5D76E"/>
            <stop offset="100%" stopColor="#7A5900"/>
          </radialGradient>
          <radialGradient id="sg2b" cx="35%" cy="28%" r="65%">
            <stop offset="0%" stopColor="#E8C090"/>
            <stop offset="50%" stopColor="#C08040"/>
            <stop offset="100%" stopColor="#3A1800"/>
          </radialGradient>
          <pattern id="wf2" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
            <rect width="8" height="8" fill="#D4A060"/>
            <line x1="0" y1="4" x2="8" y2="4" stroke="#7A3C0A" strokeWidth="1" opacity="0.5"/>
            <line x1="4" y1="0" x2="4" y2="8" stroke="#7A3C0A" strokeWidth="1" opacity="0.5"/>
          </pattern>
        </defs>
        {/* Cone 1 (left) */}
        <path d="M12 52 L34 120 L56 52 Z" fill="url(#wf2)" stroke="#7A3C0A" strokeWidth="1.2"/>
        <path d="M22 52 L34 120 L56 52 Z" fill="rgba(0,0,0,0.15)"/>
        <circle cx="34" cy="40" r="20" fill="url(#sg2a)"/>
        <ellipse cx="27" cy="32" rx="6" ry="4" fill="rgba(255,255,255,0.5)" style={{filter:"blur(2px)"}}/>
        {/* Cone 2 (right) — overlapping */}
        <path d="M64 52 L86 120 L108 52 Z" fill="url(#wf2)" stroke="#7A3C0A" strokeWidth="1.2"/>
        <path d="M74 52 L86 120 L108 52 Z" fill="rgba(0,0,0,0.15)"/>
        <circle cx="86" cy="40" r="20" fill="url(#sg2b)"/>
        <ellipse cx="79" cy="32" rx="6" ry="4" fill="rgba(255,255,255,0.45)" style={{filter:"blur(2px)"}}/>
        {/* Heart between them */}
        <path d="M60 28 C60 24 54 20 54 26 C54 30 60 36 60 36 C60 36 66 30 66 26 C66 20 60 24 60 28Z" fill="#FF6B8A" opacity="0.9"/>
        {/* Ground shadows */}
        <ellipse cx="34" cy="124" rx="18" ry="4" fill="#FFB347" opacity="0.2" style={{filter:"blur(5px)"}}/>
        <ellipse cx="86" cy="124" rx="18" ry="4" fill="#C08040" opacity="0.2" style={{filter:"blur(5px)"}}/>
      </svg>
    ),
  },
  {
    id: 3,
    tag: "−20%",
    tagBg: "#A78BFA",
    c1: "#DDD6FE", c2: "#A78BFA", c3: "#6D28D9", c4: "#2D1060",
    icon: (s) => (  // Layered cake slice
      <svg width={s} height={s} viewBox="0 0 120 130" fill="none">
        <defs>
          <linearGradient id="layer1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#DDD6FE"/>
            <stop offset="100%" stopColor="#A78BFA"/>
          </linearGradient>
          <linearGradient id="layer2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F0C8A0"/>
            <stop offset="100%" stopColor="#C07830"/>
          </linearGradient>
          <linearGradient id="layer3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFBCCC"/>
            <stop offset="100%" stopColor="#FF6B8A"/>
          </linearGradient>
          <linearGradient id="cakeTop" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EEE8FF"/>
            <stop offset="100%" stopColor="#C4B0FF"/>
          </linearGradient>
        </defs>
        {/* Slice base shape (trapezoid) */}
        {/* Bottom layer - chocolate */}
        <path d="M20 95 L100 95 L100 78 L20 78 Z" fill="url(#layer2)"/>
        {/* Cream layer */}
        <path d="M20 78 L100 78 L100 72 L20 72 Z" fill="white" opacity="0.9"/>
        {/* Middle layer - berry */}
        <path d="M20 72 L100 72 L100 55 L20 55 Z" fill="url(#layer3)"/>
        {/* Cream layer 2 */}
        <path d="M20 55 L100 55 L100 49 L20 49 Z" fill="white" opacity="0.85"/>
        {/* Top layer - vanilla */}
        <path d="M20 49 L100 49 L100 32 L20 32 Z" fill="url(#layer1)"/>
        {/* Top frosting */}
        <path d="M16 32 Q20 22 30 28 Q40 20 50 26 Q60 18 70 24 Q80 16 90 22 Q100 18 104 32 L100 32 L20 32 Z" fill="url(#cakeTop)"/>
        {/* Side faces for 3D depth */}
        <path d="M100 32 L110 38 L110 101 L100 95 Z" fill="rgba(100,40,200,0.25)"/>
        <path d="M16 32 L104 32 L110 38 L22 38 Z" fill="rgba(255,255,255,0.35)"/>
        <path d="M100 95 L110 101 L100 101 Z" fill="rgba(0,0,0,0.2)"/>
        {/* Candle */}
        <rect x="55" y="12" width="8" height="20" rx="2" fill="#FFB347"/>
        <path d="M59 8 C59 5 56 3 57 7 C58 10 61 10 60 7 C60 5 59 3 59 8Z" fill="#FF4500"/>
        {/* Outline */}
        <path d="M20 32 L20 95 L100 95 L100 32" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        {/* Ground shadow */}
        <ellipse cx="60" cy="108" rx="38" ry="7" fill="#A78BFA" opacity="0.2" style={{filter:"blur(7px)"}}/>
      </svg>
    ),
  },
  {
    id: 4,
    tag: "FREE",
    tagBg: "#34D399",
    c1: "#D1FAE5", c2: "#34D399", c3: "#065F46", c4: "#022C22",
    icon: (s) => (  // Bowl with toppings
      <svg width={s} height={s} viewBox="0 0 120 130" fill="none">
        <defs>
          <radialGradient id="bowl1" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#D0F5F0"/>
            <stop offset="50%" stopColor="#4ECDC4"/>
            <stop offset="100%" stopColor="#004A45"/>
          </radialGradient>
          <linearGradient id="bowlBase" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F0EEE8"/>
            <stop offset="100%" stopColor="#D0C8C0"/>
          </linearGradient>
        </defs>
        {/* Bowl body */}
        <path d="M18 62 Q20 100 60 105 Q100 100 102 62 Z" fill="url(#bowlBase)"/>
        <path d="M18 62 Q20 100 60 105 Q100 100 102 62 Z" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5"/>
        {/* Bowl rim */}
        <ellipse cx="60" cy="62" rx="42" ry="12" fill="#E8E4DC"/>
        <ellipse cx="60" cy="62" rx="42" ry="12" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5"/>
        {/* Ice cream scoop */}
        <circle cx="60" cy="50" r="26" fill="url(#bowl1)"/>
        <ellipse cx="51" cy="41" rx="8" ry="5" fill="rgba(255,255,255,0.5)" style={{filter:"blur(3px)"}}/>
        {/* Toppings */}
        {/* Strawberries */}
        <ellipse cx="44" cy="36" rx="6" ry="7" fill="#FF6B8A"/>
        <path d="M41 32 Q44 28 47 32" stroke="#4A8A30" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <ellipse cx="76" cy="38" rx="5" ry="6" fill="#FF6B8A"/>
        <path d="M73 34 Q76 30 79 34" stroke="#4A8A30" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Mango chunks */}
        <rect x="52" y="28" width="10" height="9" rx="3" fill="#FFB347" transform="rotate(-15,57,32)"/>
        <rect x="62" y="30" width="8" height="7" rx="2.5" fill="#FFB347" transform="rotate(10,66,33)"/>
        {/* Mint leaves */}
        <path d="M36 46 C34 40 42 38 38 44Z" fill="#4ECDC4"/>
        <path d="M82 44 C84 38 76 37 80 43Z" fill="#4ECDC4"/>
        {/* Chocolate sauce */}
        <path d="M50 54 Q56 48 64 52 Q70 56 76 50" stroke="#5A2000" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.75"/>
        {/* Sprinkles */}
        {[[55,60,30],[65,57,120],[60,55,75],[70,62,10],[50,63,160]].map(([x,y,r],i)=>(
          <rect key={i} x={x-4} y={y-1.5} width={8} height={3} rx={1.5}
            fill={["#FFB347","#FF6B8A","#A78BFA","#F5D76E","#4ECDC4"][i]}
            transform={`rotate(${r},${x},${y})`}/>
        ))}
        {/* Ground shadow */}
        <ellipse cx="60" cy="114" rx="34" ry="6" fill="#34D399" opacity="0.2" style={{filter:"blur(7px)"}}/>
      </svg>
    ),
  },
];

const translations = {
  en: {
    heading: "Exclusive Deals",
    eyebrow: "Limited Churns",
    description: "Small-batch indulgence at irresistible prices. Discover our seasonal highlights.",
    footer: "Scoop it while it's cold",
    offers: [
      { id:1, title:"50% Off Sundaes",    description:"Half-price on all handcrafted Chocolate Sundaes. Limited time churn." },
      { id:2, title:"Double the Scoop",   description:"Buy one Vanilla Bean Cone and get the second on the house." },
      { id:3, title:"Artisan Cake Deal",  description:"Enjoy 20% off our layered Ice Cream Cakes. Perfect for celebrations." },
      { id:4, title:"Bonus Toppings",     description:"Complimentary artisanal toppings with any signature Sundae order." },
    ],
  },
  fr: {
    heading: "Offres Exclusives",
    eyebrow: "Édition Limitée",
    description: "Le plaisir artisanal à prix irrésistibles. Découvrez nos points forts de la saison.",
    footer: "À déguster sans tarder",
    offers: [
      { id:1, title:"50% sur les Sundaes", description:"Moitié prix sur tous les Sundaes au chocolat faits main." },
      { id:2, title:"Doublez la Boule",    description:"Achetez un cornet Vanille et recevez le deuxième offert." },
      { id:3, title:"Gâteaux Artisans",   description:"20% de réduction sur nos gâteaux glacés à plusieurs étages." },
      { id:4, title:"Garnitures Offertes",description:"Toppings artisanaux gratuits avec toute commande de Sundae." },
    ],
  },
  es: {
    heading: "Ofertas Únicas",
    eyebrow: "Edición Limitada",
    description: "Indulgencia artesanal a precios increíbles. Descubre lo mejor de la temporada.",
    footer: "Sírvete antes de que se derrita",
    offers: [
      { id:1, title:"50% en Sundaes",     description:"Mitad de precio en todos los Sundaes de chocolate artesanal." },
      { id:2, title:"Doble Dulzura",      description:"Compra un cono de Vainilla y llévate el segundo gratis." },
      { id:3, title:"Pasteles de Autor",  description:"Disfruta de un 20% de descuento en nuestros pasteles helados." },
      { id:4, title:"Toppings Gratis",    description:"Toppings artesanales de cortesía con cualquier pedido de Sundae." },
    ],
  },
};

/* ─── Offer Card ─────────────────────────────────────────────── */
const OfferCard = ({ offer, tx, index, selected, onSelect, isMobile, isTablet }) => {
  const wrapRef = useRef(null);
  const [tilt,    setTilt]    = useState({ x: 0, y: 0 });
  const [shine,   setShine]   = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const isActive = selected === index;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), index * 90); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  const onMove = (e) => {
    if (isMobile || isTablet) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width;
    const cy = (e.clientY - rect.top)  / rect.height;
    setTilt({ x: (cy - 0.5) * -16, y: (cx - 0.5) * 16 });
    setShine({ x: cx * 100, y: cy * 100 });
  };

  const iconSize = isMobile ? 80 : isTablet ? 100 : 124;

  return (
    <div
      ref={wrapRef}
      style={{
        perspective: 1000,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(50px) scale(0.92)",
        transition: `opacity 0.8s ease, transform 0.8s cubic-bezier(0.22,1,0.36,1)`,
      }}
    >
      <div
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setTilt({x:0,y:0}); setShine({x:50,y:50}); setHovered(false); }}
        onClick={() => onSelect(index)}
        style={{
          position: "relative",
          borderRadius: 26,
          overflow: "hidden",
          cursor: "pointer",
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered || isActive ? "translateZ(20px) scale(1.03)" : "scale(1)"}`,
          transition: hovered
            ? "transform 0.1s ease-out, box-shadow 0.3s"
            : "transform 0.65s cubic-bezier(0.22,1,0.36,1), box-shadow 0.6s",
          boxShadow: isActive
            ? `0 36px 80px rgba(0,0,0,0.55), 0 0 0 1.5px ${offer.c2}88, 0 0 60px ${offer.c2}30`
            : hovered
            ? `0 28px 60px rgba(0,0,0,0.45), 0 0 0 1px ${offer.c2}55`
            : `0 8px 24px rgba(0,0,0,0.3), 0 0 0 1px ${offer.c3}22`,
          background: isActive
            ? `linear-gradient(145deg, ${offer.c3}88, ${offer.c4}cc)`
            : `linear-gradient(145deg, ${offer.c4}55, ${offer.c4}99)`,
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Noise grain */}
        <div style={{
          position:"absolute", inset:0, zIndex:1, pointerEvents:"none",
          backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.04, mixBlendMode:"overlay",
        }} />

        {/* BG gradient skin */}
        <div style={{
          position:"absolute", inset:0,
          background: isActive
            ? `radial-gradient(ellipse at 30% 20%, ${offer.c2}44, transparent 65%)`
            : `radial-gradient(ellipse at 30% 20%, ${offer.c2}20, transparent 65%)`,
          transition:"background 0.5s",
        }} />

        {/* Holographic shine */}
        <div style={{
          position:"absolute", inset:0, zIndex:2, pointerEvents:"none",
          background:`radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.18) 0%, transparent 58%)`,
          opacity: hovered || isActive ? 1 : 0,
          transition:"opacity 0.2s", mixBlendMode:"overlay",
        }} />

        {/* Top stripe */}
        <div style={{
          position:"absolute", top:0, left:0, right:0, height:3,
          background:`linear-gradient(90deg, ${offer.c1}, ${offer.c2}, ${offer.c3})`,
          opacity: isActive ? 1 : hovered ? 0.7 : 0.35,
          transition:"opacity 0.3s",
        }} />

        {/* Rim glow */}
        <div style={{
          position:"absolute", inset:0, zIndex:2, pointerEvents:"none", borderRadius:26,
          boxShadow:`inset 0 0 0 1px ${offer.c2}${isActive ? "66" : hovered ? "44" : "22"}`,
          transition:"box-shadow 0.3s",
        }} />

        {/* Tag badge */}
        <div style={{
          position:"absolute", top:16, right:16, zIndex:6,
          background: offer.tagBg,
          borderRadius:8, padding:"5px 12px",
          fontSize:9, fontWeight:900,
          letterSpacing:"0.14em", textTransform:"uppercase", color:"white",
          boxShadow:`0 4px 16px ${offer.tagBg}66`,
          transform:`translateZ(${isActive || hovered ? 28 : 0}px)`,
          transition:"transform 0.35s",
        }}>{offer.tag}</div>

        {/* SVG icon */}
        <div style={{
          display:"flex", justifyContent:"center",
          paddingTop: isMobile ? 18 : isTablet ? 24 : 36,
          position:"relative", zIndex:3,
          transform:`translateZ(${isActive || hovered ? 18 : 0}px)`,
          transition:"transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          filter: isActive || hovered
            ? `drop-shadow(0 16px 32px ${offer.c2}66) drop-shadow(0 4px 8px rgba(0,0,0,0.4))`
            : `drop-shadow(0 8px 16px rgba(0,0,0,0.35))`,
        }}>
          {offer.icon(iconSize)}
        </div>

        {/* Content */}
        <div style={{
          padding: isMobile ? "10px 12px 14px" : isTablet ? "12px 16px 18px" : "18px 22px 26px",
          position:"relative", zIndex:4,
          transform:`translateZ(${isActive || hovered ? 14 : 0}px)`,
          transition:"transform 0.35s",
        }}>
          {/* Description slide */}
          <div style={{
            maxHeight: isActive || hovered ? 48 : 0,
            overflow:"hidden",
            opacity: isActive || hovered ? 1 : 0,
            marginBottom: isActive || hovered ? 8 : 0,
            transition:"max-height 0.4s ease, opacity 0.35s, margin 0.3s",
          }}>
            <p style={{
              fontSize:11, color:`${offer.c1}bb`, margin:0,
              fontWeight:500, lineHeight:1.55,
              fontFamily:"'DM Sans', sans-serif",
            }}>{tx.description}</p>
          </div>

          <h3 style={{
            fontSize: isMobile ? 13 : isTablet ? 15 : 20,
            fontWeight:900, margin:0,
            textTransform:"uppercase", letterSpacing:"-0.03em",
            fontStyle:"italic", lineHeight:1,
            color: offer.c1,
          }}>{tx.title}</h3>

          {/* Accent bar */}
          <div style={{
            marginTop:10, height:2, borderRadius:2,
            background:`linear-gradient(90deg, ${offer.c1}, ${offer.c2}, ${offer.c3}44)`,
            width: isActive ? "100%" : hovered ? "60%" : "20px",
            transition:"width 0.55s cubic-bezier(0.22,1,0.36,1)",
            boxShadow: isActive ? `0 0 12px ${offer.c2}88` : "none",
          }}/>
        </div>
      </div>
    </div>
  );
};

/* ─── Section ────────────────────────────────────────────────── */
const SpecialOffers = ({ language = "en", isDarkMode = false }) => {
  const t = translations[language] || translations.en;
  const [selected, setSelected] = useState(0);
  const [isMobile, setMobile] = useState(false);
  const [isTablet, setTablet] = useState(false);
  const isSmall = isMobile || isTablet;

  useEffect(() => {
    const check = () => { setMobile(window.innerWidth < 480); setTablet(window.innerWidth >= 480 && window.innerWidth < 768); };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="special-offers"
      style={{
        position:"relative",
        padding: isMobile ? "60px 0 72px" : isTablet ? "80px 0 96px" : "96px 0 120px",
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
          0%,100% { transform: translateY(0) scale(1); }
          50%      { transform: translateY(-28px) scale(1.06); }
        }
        @keyframes headIn {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .so-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 22px;
        }
        @media (max-width: 1100px) { .so-grid { grid-template-columns: repeat(2,1fr); gap: 20px; } }
        @media (max-width: 560px)  { .so-grid { grid-template-columns: repeat(2,1fr); gap: 10px; } }
      `}</style>

      {/* Ambient blobs */}
      <div style={{position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden", zIndex:0}}>
        {[
          {top:"-6%", right:"-4%", w:460, col:"#FF6B8A", dur:13},
          {bottom:"5%", left:"-5%", w:380, col:"#FFB347", dur:19},
          {top:"40%", left:"35%",   w:320, col:"#A78BFA", dur:23},
        ].map((b,i)=>(
          <div key={i} style={{
            position:"absolute", ...b,
            width: isMobile ? b.w*0.55 : b.w,
            height: isMobile ? b.w*0.55 : b.w,
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
          gap: isMobile ? 10 : 16, marginBottom: isMobile ? 28 : isTablet ? 40 : 60,
          animation:"headIn 0.7s ease both",
        }}>
          <div>
            <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:10}}>
              <div style={{width:32, height:2, background:"linear-gradient(90deg,#FF6B8A,#FFB347)", borderRadius:2}}/>
              <p style={{fontSize:10, fontWeight:800, letterSpacing:"0.24em", textTransform:"uppercase", opacity:0.38, margin:0}}>
                {t.eyebrow}
              </p>
            </div>
            <h2 style={{
              fontSize: isMobile ? "clamp(24px,7.5vw,34px)" : isTablet ? "clamp(34px,7vw,48px)" : "clamp(52px,5.5vw,80px)",
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
            maxWidth:240, lineHeight:1.7, margin:0,
            fontFamily:"'DM Sans', sans-serif", fontStyle:"italic",
          }}>
            {t.description}
          </p>
        </div>

        {/* Grid */}
        <div className="so-grid">
          {OFFERS.map((offer, i) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              tx={t.offers[i]}
              index={i}
              selected={selected}
              onSelect={setSelected}
              isMobile={isMobile} isTablet={isTablet}
            />
          ))}
        </div>

        {/* Marquee footer */}
        <div style={{
          marginTop: isMobile ? 32 : isTablet ? 48 : 64,
          borderTop:"1px solid rgba(255,255,255,0.06)",
          paddingTop: isMobile ? 14 : 22,
          overflow:"hidden",
        }}>
          <div style={{
            display:"flex", whiteSpace:"nowrap",
            fontWeight:800, textTransform:"uppercase",
            letterSpacing:"0.36em", fontSize:9, opacity:0.22,
            animation:"marquee 22s linear infinite",
          }}>
            {Array(3).fill([
              `🍦 ${t.footer}`,
              "✦ Limited Time",
              "🍓 Fresh Daily",
              "✦ Artisan Made",
              "🍫 Premium Quality",
              "✦ Seasonal Drops",
            ]).flat().map((item,i)=>(
              <span key={i} style={{margin:"0 36px"}}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;