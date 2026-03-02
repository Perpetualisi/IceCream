import React, { useEffect, useRef, useState, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────────
   TRANSLATIONS
──────────────────────────────────────────────────────────────────*/
const translations = {
  en: {
    eyebrow: "Our Philosophy",
    heading: "Our\nCraft",
    subheading: "Redefining the art of the scoop since 2026.",
    description:
      "We don't just freeze cream; we curate moments. Every batch is handcrafted in small quantities using locally sourced ingredients and traditional slow-churning techniques. Excellence is found in the details — from the hand-picked vanilla beans to the 72% dark Belgian chocolate we melt into our base.",
    badge1: "Handmade with",
    badge2: "Pure Love",
    stat1: "100%", stat1label: "Natural",
    stat2: "48h",  stat2label: "Slow Churn",
    stat3: "12",   stat3label: "Flavours",
    cta: "Meet the Makers",
    teamLabel: "Master Scoopers",
  },
  fr: {
    eyebrow: "Notre Philosophie",
    heading: "Notre\nArt",
    subheading: "L'art de la boule artisanale depuis 2026.",
    description:
      "Nous ne nous contentons pas de congeler de la crème ; nous créons des souvenirs. Chaque lot est fabriqué à la main en petites quantités, avec des ingrédients locaux et des techniques de barattage lent traditionnelles.",
    badge1: "Fait avec",
    badge2: "Amour Pur",
    stat1: "100%", stat1label: "Naturel",
    stat2: "48h",  stat2label: "Barattage",
    stat3: "12",   stat3label: "Saveurs",
    cta: "Rencontrer l'équipe",
    teamLabel: "Nos Artisans",
  },
  es: {
    eyebrow: "Nuestra Filosofía",
    heading: "Nuestra\nArte",
    subheading: "Redefiniendo el helado artesanal desde 2026.",
    description:
      "No solo congelamos crema; curamos momentos. Cada lote se elabora a mano en pequeñas cantidades utilizando ingredientes locales y técnicas tradicionales de batido lento.",
    badge1: "Hecho con",
    badge2: "Amor Puro",
    stat1: "100%", stat1label: "Natural",
    stat2: "48h",  stat2label: "Batido Lento",
    stat3: "12",   stat3label: "Sabores",
    cta: "Conoce al Equipo",
    teamLabel: "Maestros Heladeros",
  },
};

/* ─────────────────────────────────────────────────────────────────
   3D ICE CREAM — fully scale-driven, all positions % of viewBox
   The entire illustration lives in one SVG (viewBox 0 0 400 560)
   so it scales perfectly at any container size. CSS 3D wraps it.
──────────────────────────────────────────────────────────────────*/
const IceCream3D = ({ scale = 1 }) => {
  const containerRef = useRef(null);
  const rafRef       = useRef(null);
  const targetTilt   = useRef({ x: 0, y: 0 });
  const animState    = useRef({ t: 0, d1: 0, d2: 30, orbit: 0, cx: 0, cy: 0 });

  const [state, setState] = useState({
    tiltX: 0, tiltY: 0,
    floatY: 0,
    orbit: 0,
    d1: 0, d2: 30,
    hovered: false,
  });

  /* Single unified rAF — no per-state thrash */
  useEffect(() => {
    const s = animState.current;
    const loop = () => {
      s.t     += 0.018;
      s.d1     = (s.d1 + 0.38) % 100;
      s.d2     = (s.d2 + 0.26) % 100;
      s.orbit  = (s.orbit + 0.32) % 360;
      s.cx     = s.cx + (targetTilt.current.x - s.cx) * 0.055;
      s.cy     = s.cy + (targetTilt.current.y - s.cy) * 0.055;
      setState(prev => ({
        ...prev,
        tiltX:  s.cx,
        tiltY:  s.cy,
        floatY: Math.sin(s.t) * 10,
        orbit:  s.orbit,
        d1:     s.d1,
        d2:     s.d2,
      }));
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onMove = useCallback((e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width;
    const cy = (e.clientY - rect.top)  / rect.height;
    targetTilt.current = { x: (cy - 0.5) * -24, y: (cx - 0.5) * 24 };
  }, []);

  /* Touch tilt */
  const onTouch = useCallback((e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const touch = e.touches[0];
    const cx = (touch.clientX - rect.left) / rect.width;
    const cy = (touch.clientY - rect.top)  / rect.height;
    targetTilt.current = { x: (cy - 0.5) * -14, y: (cx - 0.5) * 14 };
  }, []);

  const onEnd = useCallback(() => {
    targetTilt.current = { x: 0, y: 0 };
    setState(prev => ({ ...prev, hovered: false }));
  }, []);

  const { tiltX, tiltY, floatY, orbit, d1, d2, hovered } = state;

  /* Orbit dot positions — computed in SVG space (centre 200, 280) */
  const orbitRings = [
    { dots: 5, rx: 180, ry: 45, speed:  1,    colors: ["#FF6B8A","#4ECDC4","#FFB347","#A78BFA","#F5D76E"], r: 5.5 },
    { dots: 3, rx: 138, ry: 32, speed: -0.65, colors: ["#F5D76E","#FF6B8A","#4ECDC4"],                     r: 3.5 },
  ];

  /* Drip helper */
  const makeDrip = (cx, d, color) => {
    const dropY = 46 + d * 0.44;
    const dropR = 2.8 + (d % 18) * 0.09;
    const dropO = Math.max(0, 1 - (d % 18) * 0.055);
    return { cx, dropY, dropR, dropO, color };
  };
  const drips = [
    makeDrip(188, d1, "#FF6B8A"),
    makeDrip(215, d2, "#F5D76E"),
  ];

  /* Sprinkles orbiting the cone */
  const sprinkles = [
    { offset: 0,   color: "#FF6B8A", dist: 160, w: 22, h: 9  },
    { offset: 52,  color: "#4ECDC4", dist: 152, w: 18, h: 8  },
    { offset: 108, color: "#F5D76E", dist: 165, w: 20, h: 8  },
    { offset: 162, color: "#A78BFA", dist: 145, w: 17, h: 7  },
    { offset: 218, color: "#FFB347", dist: 158, w: 19, h: 8  },
    { offset: 274, color: "#78A860", dist: 148, w: 16, h: 7  },
    { offset: 328, color: "#FF6B8A", dist: 155, w: 18, h: 7  },
  ].map(sp => {
    const a = ((orbit * 0.55 + sp.offset) % 360) * (Math.PI / 180);
    const px = 200 + Math.cos(a) * sp.dist;
    const py = 310 + Math.sin(a) * sp.dist * 0.32;
    const sc = 0.62 + (Math.sin(a) + 1) * 0.22;
    return { ...sp, px, py, sc, rot: orbit * 1.5 + sp.offset * 0.4 };
  });

  return (
    <div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseEnter={() => setState(p => ({ ...p, hovered: true }))}
      onMouseLeave={onEnd}
      onTouchMove={onTouch}
      onTouchEnd={onEnd}
      style={{
        width: "100%", height: "100%",
        display: "flex", alignItems: "center", justifyContent: "center",
        perspective: "1000px",
        userSelect: "none",
        WebkitUserSelect: "none",
        touchAction: "none",
        position: "relative",
        cursor: "crosshair",
      }}
    >
      {/* CSS 3D tilt + float wrapper */}
      <div style={{
        transformStyle: "preserve-3d",
        transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(${floatY + (hovered ? -14 : 0)}px)`,
        transition: hovered ? "none" : "transform 1.6s cubic-bezier(0.22,1,0.36,1)",
        width: "100%",
        maxWidth: 420,
        willChange: "transform",
      }}>
        {/* Everything in ONE SVG — scales perfectly at any size */}
        <svg
          viewBox="0 0 400 580"
          width="100%"
          style={{ display: "block", overflow: "visible" }}
        >
          <defs>
            {/* ── Cone ── */}
            <pattern id="wf3d" patternUnits="userSpaceOnUse" width="13" height="13" patternTransform="rotate(42)">
              <rect width="13" height="13" fill="#C49038"/>
              <line x1="0" y1="6.5" x2="13" y2="6.5" stroke="#7A3C0A" strokeWidth="1.4" opacity="0.58"/>
              <line x1="6.5" y1="0" x2="6.5" y2="13" stroke="#7A3C0A" strokeWidth="1.4" opacity="0.58"/>
              <line x1="0" y1="0" x2="13" y2="13" stroke="#A06020" strokeWidth="0.7" opacity="0.3"/>
              <line x1="13" y1="0" x2="0" y2="13" stroke="#A06020" strokeWidth="0.7" opacity="0.22"/>
            </pattern>
            <linearGradient id="coneLightSide" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.2)"/>
              <stop offset="45%" stopColor="rgba(255,255,255,0)"/>
              <stop offset="100%" stopColor="rgba(0,0,0,0.28)"/>
            </linearGradient>
            <radialGradient id="coneRim" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFE0A0"/>
              <stop offset="100%" stopColor="#9A5E10"/>
            </radialGradient>

            {/* ── Scoops ── */}
            {[
              ["sg0","#E8C890","#B87030","#4A1800","#280A00"],
              ["sg1","#D8FAF6","#4ECDC4","#006860","#003038"],
              ["sg2","#E0F8C0","#78A860","#204818","#102008"],
              ["sg3","#FFCCD8","#FF6B8A","#880020","#500010"],
              ["sg4","#FFFCE8","#F5D76E","#8B6010","#3C1800"],
            ].map(([id, c0, c1, c2, c3]) => (
              <radialGradient key={id} id={id} cx="38%" cy="32%" r="72%">
                <stop offset="0%"   stopColor={c0}/>
                <stop offset="45%"  stopColor={c1}/>
                <stop offset="85%"  stopColor={c2}/>
                <stop offset="100%" stopColor={c3}/>
              </radialGradient>
            ))}

            {/* Whip */}
            <radialGradient id="whipG" cx="50%" cy="30%" r="68%">
              <stop offset="0%"   stopColor="white"/>
              <stop offset="100%" stopColor="#DDD8D0"/>
            </radialGradient>

            {/* Cherry */}
            <radialGradient id="cherG" cx="38%" cy="30%" r="65%">
              <stop offset="0%"   stopColor="#FF4060"/>
              <stop offset="60%"  stopColor="#C8182F"/>
              <stop offset="100%" stopColor="#6A0010"/>
            </radialGradient>

            {/* Drip gradients */}
            <linearGradient id="dg0" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF6B8A"/>
              <stop offset="100%" stopColor="#FF6B8A" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="dg1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F5D76E"/>
              <stop offset="100%" stopColor="#F5D76E" stopOpacity="0"/>
            </linearGradient>

            {/* Drop shadow filter */}
            <filter id="coneShadow" x="-20%" y="-10%" width="140%" height="130%">
              <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="rgba(0,0,0,0.45)"/>
            </filter>
            <filter id="scoopShadow">
              <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="rgba(0,0,0,0.3)"/>
            </filter>
          </defs>

          {/* ────── GROUND SHADOW ────── */}
          <ellipse cx="200" cy="562" rx="110" ry="16"
            fill="rgba(255,107,138,0.18)" style={{filter:"blur(12px)"}}/>

          {/* ────── ORBIT RINGS (drawn first, behind cone) ────── */}
          {orbitRings.map((ring, ri) => (
            Array.from({ length: ring.dots }).map((_, di) => {
              const a = ((di * (360 / ring.dots) + orbit * ring.speed * 0.5) % 360) * (Math.PI / 180);
              const px = 200 + Math.cos(a) * ring.rx;
              const py = 300 + Math.sin(a) * ring.ry;
              return (
                <circle key={`${ri}-${di}`}
                  cx={px} cy={py} r={ring.r}
                  fill={ring.colors[di % ring.colors.length]}
                  opacity="0.7">
                  <animate attributeName="r" values={`${ring.r};${ring.r * 1.3};${ring.r}`} dur="2s" repeatCount="indefinite" begin={`${di * 0.4}s`}/>
                </circle>
              );
            })
          ))}

          {/* ────── FLOATING SPRINKLES ────── */}
          {sprinkles.map((sp, i) => (
            <rect key={i}
              x={sp.px - sp.w / 2} y={sp.py - sp.h / 2}
              width={sp.w} height={sp.h} rx={sp.h / 2}
              fill={sp.color}
              opacity={0.68 * sp.sc}
              transform={`rotate(${sp.rot}, ${sp.px}, ${sp.py}) scale(${sp.sc})`}
              style={{ filter: `drop-shadow(0 0 5px ${sp.color}88)` }}
            />
          ))}

          {/* ────── CONE ────── */}
          <g filter="url(#coneShadow)">
            <path d="M88 310 L200 555 L312 310 Z" fill="url(#wf3d)"/>
            <path d="M88 310 L164 310 L200 555 Z" fill="url(#coneLightSide)" opacity="0.85"/>
            <path d="M236 310 L312 310 L200 555 Z" fill="rgba(0,0,0,0.2)"/>
            <path d="M88 310 L200 555 L312 310 Z" fill="none" stroke="rgba(100,50,8,0.4)" strokeWidth="1.2"/>
            {/* Horizontal waffle lines */}
            {[330, 360, 394, 432, 474, 514, 534].map((y, i) => {
              const prog = (y - 310) / (555 - 310);
              const hw   = (1 - prog) * 112;
              return <line key={i} x1={200 - hw} y1={y} x2={200 + hw} y2={y} stroke="rgba(100,50,8,0.35)" strokeWidth="1.3"/>;
            })}
            {/* Diagonal highlight */}
            <path d="M130 316 L178 545" stroke="rgba(255,215,110,0.2)" strokeWidth="2.5" strokeLinecap="round"/>
            {/* Rim */}
            <ellipse cx="200" cy="310" rx="112" ry="22" fill="url(#coneRim)" opacity="0.9"/>
            <ellipse cx="200" cy="310" rx="112" ry="22" fill="none" stroke="rgba(255,195,90,0.5)" strokeWidth="1.5"/>
            <ellipse cx="168" cy="305" rx="38" ry="8"   fill="rgba(255,255,255,0.36)" style={{filter:"blur(4px)"}}/>
          </g>

          {/* ────── DRIPS ────── */}
          {drips.map((d, i) => (
            <g key={i}>
              <path
                d={`M${d.cx} 262 Q${d.cx + 2} ${280 + d1 * 0.36} ${d.cx} ${296 + d.dropY - 44} Q${d.cx - 1} ${310 + d.dropY * 0.6} ${d.cx} ${312 + d.dropY}`}
                stroke={`url(#dg${i})`} strokeWidth="4.5" fill="none" strokeLinecap="round"/>
              <circle cx={d.cx} cy={312 + d.dropY} r={d.dropR} fill={d.color} opacity={d.dropO}/>
            </g>
          ))}

          {/* ────── SCOOP 0 — Espresso (bottom / widest) ────── */}
          <g filter="url(#scoopShadow)">
            <circle cx="200" cy="278" r="84" fill="url(#sg0)"/>
            <ellipse cx="200" cy="208" rx="64" ry="18" fill="#E8C890" opacity="0.45" style={{filter:"blur(5px)"}}/>
            <path d="M128 285 Q164 272 200 278 Q236 284 272 272" stroke="rgba(60,20,0,0.22)" strokeWidth="2.5" fill="none"/>
            <path d="M135 297 Q167 285 200 289 Q233 293 265 283" stroke="rgba(60,20,0,0.16)" strokeWidth="1.8" fill="none"/>
            <ellipse cx="172" cy="248" rx="24" ry="15" fill="rgba(255,255,255,0.38)" style={{filter:"blur(6px)"}}/>
            <ellipse cx="168" cy="242" rx="11" ry="7"  fill="rgba(255,255,255,0.75)" style={{filter:"blur(2px)"}}/>
            {/* Coffee bean */}
            <ellipse cx="228" cy="255" rx="11" ry="8"  fill="#1A0600" transform="rotate(-18,228,255)"/>
            <path d="M218 253 Q228 258 238 253" stroke="#4A2008" strokeWidth="1.3" fill="none" opacity="0.7" transform="rotate(-18,228,255)"/>
          </g>

          {/* ────── SCOOP 1 — Mint ────── */}
          <g filter="url(#scoopShadow)">
            <circle cx="200" cy="218" r="70" fill="url(#sg1)"/>
            <ellipse cx="200" cy="158" rx="52" ry="14" fill="#D8FAF6" opacity="0.44" style={{filter:"blur(4px)"}}/>
            <path d="M140 225 Q170 214 200 219 Q230 224 260 214" stroke="rgba(0,120,110,0.2)" strokeWidth="2" fill="none"/>
            <ellipse cx="174" cy="192" rx="20" ry="12" fill="rgba(255,255,255,0.42)" style={{filter:"blur(5px)"}}/>
            <ellipse cx="170" cy="187" rx="9"  ry="6"  fill="rgba(255,255,255,0.76)" style={{filter:"blur(1.5px)"}}/>
            {/* Choc chips */}
            {[[190,200,14],[212,195,-22],[203,210,35],[220,207,-10],[180,212,28]].map(([x,y,r],ci)=>(
              <rect key={ci} x={x-6} y={y-3.5} width={12} height={7} rx="2.5"
                fill={ci%2===0?"#0D0400":"#1A0800"} transform={`rotate(${r},${x},${y})`} opacity="0.88"/>
            ))}
          </g>

          {/* ────── SCOOP 2 — Pistachio ────── */}
          <g filter="url(#scoopShadow)">
            <circle cx="200" cy="164" r="60" fill="url(#sg2)"/>
            <ellipse cx="200" cy="112" rx="44" ry="12" fill="#E0F8C0" opacity="0.44" style={{filter:"blur(4px)"}}/>
            <path d="M148 170 Q174 160 200 165 Q226 170 252 160" stroke="rgba(40,100,20,0.2)" strokeWidth="2" fill="none"/>
            <ellipse cx="176" cy="140" rx="18" ry="11" fill="rgba(255,255,255,0.42)" style={{filter:"blur(4px)"}}/>
            <ellipse cx="172" cy="136" rx="8"  ry="5"  fill="rgba(255,255,255,0.76)" style={{filter:"blur(1.5px)"}}/>
            {/* Pistachios */}
            {[[188,122,-14],[204,118,20],[196,114,0],[180,128,28],[212,124,-22]].map(([x,y,r],ci)=>(
              <g key={ci} transform={`rotate(${r},${x},${y})`}>
                <ellipse cx={x} cy={y} rx="6.5" ry="5" fill="#7B5C12"/>
                <ellipse cx={x} cy={y} rx="4"   ry="3" fill="#C8A818"/>
                <line x1={x-4} y1={y} x2={x+4} y2={y} stroke="#5A4008" strokeWidth="1" opacity="0.6"/>
              </g>
            ))}
          </g>

          {/* ────── SCOOP 3 — Strawberry ────── */}
          <g filter="url(#scoopShadow)">
            <circle cx="200" cy="116" r="52" fill="url(#sg3)"/>
            <ellipse cx="200" cy="70"  rx="38" ry="10" fill="#FFCCD8" opacity="0.44" style={{filter:"blur(4px)"}}/>
            <path d="M155 122 Q177 113 200 117 Q223 122 245 113" stroke="rgba(180,20,60,0.2)" strokeWidth="2" fill="none"/>
            <ellipse cx="178" cy="95"  rx="16" ry="10" fill="rgba(255,255,255,0.44)" style={{filter:"blur(4px)"}}/>
            <ellipse cx="175" cy="91"  rx="7"  ry="5"  fill="rgba(255,255,255,0.78)" style={{filter:"blur(1.5px)"}}/>
            {/* Strawberry bits */}
            {[[192,70,10],[208,66,-12],[200,62,0]].map(([x,y,r],ci)=>(
              <g key={ci} transform={`rotate(${r},${x},${y})`}>
                <ellipse cx={x} cy={y} rx="7" ry="9"   fill="#FF1A3A"/>
                <ellipse cx={x} cy={y-1} rx="5" ry="6.5" fill="#FF4060" opacity="0.5"/>
                <path d={`M${x-4} ${y-7} Q${x} ${y-13} ${x+4} ${y-7}`} stroke="#2A8020" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                <ellipse cx={x-2} cy={y-1} rx="1.2" ry="1.5" fill="rgba(255,255,200,0.7)"/>
                <ellipse cx={x+1.5} cy={y+2.5} rx="1.2" ry="1.5" fill="rgba(255,255,200,0.7)"/>
              </g>
            ))}
          </g>

          {/* ────── SCOOP 4 — Vanilla (top) ────── */}
          <g filter="url(#scoopShadow)">
            <circle cx="200" cy="72" r="44" fill="url(#sg4)"/>
            <ellipse cx="200" cy="34"  rx="32" ry="9"  fill="#FFFCE8" opacity="0.5" style={{filter:"blur(4px)"}}/>
            <path d="M162 78 Q181 70 200 74 Q219 78 238 70" stroke="rgba(140,90,0,0.2)" strokeWidth="2" fill="none"/>
            <ellipse cx="180" cy="52"  rx="14" ry="9"  fill="rgba(255,255,255,0.46)" style={{filter:"blur(4px)"}}/>
            <ellipse cx="177" cy="49"  rx="6"  ry="4"  fill="rgba(255,255,255,0.82)" style={{filter:"blur(1px)"}}/>
            {/* Vanilla specks */}
            {[[194,42,12],[206,38,-8],[200,46,18],[210,43,-5]].map(([x,y,r],ci)=>(
              <line key={ci} x1={x-2.5} y1={y} x2={x+2.5} y2={y+4}
                stroke="#5C3000" strokeWidth="1" opacity="0.55"
                transform={`rotate(${r},${x},${y})`}/>
            ))}
          </g>

          {/* Scoop shadow overlaps */}
          <path d="M166 295 Q183 302 200 298" stroke="rgba(0,0,0,0.28)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
          <path d="M234 295 Q217 302 200 298" stroke="rgba(0,0,0,0.25)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
          <path d="M172 236 Q186 242 200 239" stroke="rgba(0,0,0,0.22)" strokeWidth="4"   fill="none" strokeLinecap="round"/>
          <path d="M228 236 Q214 242 200 239" stroke="rgba(0,0,0,0.2)"  strokeWidth="4"   fill="none" strokeLinecap="round"/>
          <path d="M174 182 Q187 187 200 184" stroke="rgba(0,0,0,0.18)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          <path d="M226 182 Q213 187 200 184" stroke="rgba(0,0,0,0.17)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          <path d="M175 130 Q188 135 200 132" stroke="rgba(0,0,0,0.15)" strokeWidth="3"   fill="none" strokeLinecap="round"/>

          {/* ────── WHIPPED CREAM ────── */}
          <g>
            <path d="M168 40 Q178 22 188 14 Q194 6 200 4 Q206 6 212 14 Q222 22 232 40 Q226 48 200 46 Q174 44 168 40Z"
              fill="url(#whipG)"/>
            <path d="M176 38 Q184 22 192 14 Q196 8 200 6 Q204 8 208 14 Q216 22 224 38"
              stroke="rgba(190,182,172,0.5)" strokeWidth="1.5" fill="none"/>
            <path d="M190 14 Q195 4 200 2 Q205 4 210 14"
              fill="url(#whipG)" stroke="rgba(190,182,172,0.4)" strokeWidth="1"/>
            <ellipse cx="186" cy="28" rx="10" ry="6" fill="rgba(255,255,255,0.72)" style={{filter:"blur(3px)"}}/>
          </g>

          {/* ────── CHERRY ────── */}
          <g>
            <path d="M200 8 C202 -2 208 -10 210 -4" stroke="#1A5A10" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M208 -6 C206 -14 216 -16 212 -8Z" fill="#2A8020"/>
            <circle cx="200" cy="18" r="16" fill="url(#cherG)"/>
            <circle cx="200" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
            <ellipse cx="194" cy="11" rx="6" ry="4"   fill="rgba(255,255,255,0.65)" style={{filter:"blur(2px)"}}/>
            <ellipse cx="192" cy="10" rx="2.5" ry="2" fill="rgba(255,255,255,0.9)"  style={{filter:"blur(0.6px)"}}/>
          </g>

          {/* ────── STEAM (SVG animate) ────── */}
          {[170, 200, 230].map((x, i) => (
            <path key={i}
              d={`M${x} -10 Q${x+6} -24 ${x-2} -36 Q${x-8} -48 ${x} -56`}
              stroke="rgba(255,255,255,0.5)" strokeWidth="3" fill="none" strokeLinecap="round">
              <animate attributeName="opacity"  values="0;0.45;0" dur={`${2.8 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.9}s`}/>
              <animateTransform attributeName="transform" type="translate" values="0,0; 0,-8; 0,-18" dur={`${2.8 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.9}s`}/>
            </path>
          ))}

        </svg>
      </div>
    </div>
  );
};

/* ── Stat pill ───────────────────────────────────────────────────*/
const StatPill = ({ value, label, accent, delay }) => {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTimeout(() => setVis(true), delay); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div ref={ref} style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(18px)",
      transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)",
    }}>
      <span style={{
        fontSize: "clamp(20px,5vw,34px)", fontWeight: 900, fontStyle: "italic",
        letterSpacing: "-0.04em", lineHeight: 1,
        background: `linear-gradient(135deg, ${accent}, rgba(255,255,255,0.7))`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        fontFamily: "'Syne', sans-serif",
      }}>{value}</span>
      <span style={{
        fontSize: "clamp(7px,2vw,9px)", fontWeight: 700, letterSpacing: "0.22em",
        textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
        fontFamily: "'DM Sans', sans-serif",
        textAlign: "center",
      }}>{label}</span>
    </div>
  );
};

/* ── Main About ──────────────────────────────────────────────────*/
const About = ({ language = "en", isDarkMode = false }) => {
  const t = translations[language] || translations.en;
  const [isMobile, setMobile]   = useState(false);
  const [isTablet, setTablet]   = useState(false);
  const [textVis,  setTextVis]  = useState(false);
  const [coneVis,  setConeVis]  = useState(false);
  const textRef = useRef(null);
  const coneRef = useRef(null);

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
    const makeObs = (setter) => new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setter(true); }, { threshold: 0.1 }
    );
    const o1 = makeObs(setTextVis);
    const o2 = makeObs(setConeVis);
    if (textRef.current) o1.observe(textRef.current);
    if (coneRef.current) o2.observe(coneRef.current);
    return () => { o1.disconnect(); o2.disconnect(); };
  }, []);

  const bg = isDarkMode ? "#04040A" : "#050408";

  return (
    <section
      id="about"
      style={{
        position: "relative",
        background: bg,
        color: "white",
        padding: isMobile ? "60px 0 72px" : isTablet ? "88px 0 104px" : "112px 0 128px",
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
          0%,100% { transform: translateY(0) scale(1) rotate(0deg); }
          33%      { transform: translateY(-26px) scale(1.07) rotate(4deg); }
          66%      { transform: translateY(-10px) scale(0.95) rotate(-3deg); }
        }
        @keyframes marqueeAbout {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes floatBadge {
          0%,100% { transform: rotate(-4deg) translateY(0); }
          50%     { transform: rotate(-4deg) translateY(-8px); }
        }
        @keyframes shimmerAbout {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes pulseGlow {
          0%,100% { opacity: 0.35; transform: scale(1); }
          50%     { opacity: 0.72; transform: scale(1.06); }
        }
        @keyframes tagFloat {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-6px); }
        }

        .about-shimmer {
          background: linear-gradient(100deg,
            rgba(255,255,255,0.92) 20%,
            rgba(255,255,255,0.3) 50%,
            rgba(255,255,255,0.92) 80%
          );
          background-size: 200% auto;
          animation: shimmerAbout 6s linear infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Prevent text-fill from leaking on mobile */
        @supports not (-webkit-background-clip: text) {
          .about-shimmer { color: white; }
        }
      `}</style>

      {/* ── Ambient blobs ── */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden", zIndex:0 }}>
        {[
          { top:"-12%",   left:"-8%",  w:480, col:"#FF6B8A", dur:20, delay:0  },
          { top:"40%",    right:"-8%", w:400, col:"#4ECDC4", dur:24, delay:5  },
          { bottom:"-8%", left:"25%",  w:360, col:"#FFB347", dur:18, delay:10 },
          { top:"20%",    left:"45%",  w:280, col:"#A78BFA", dur:22, delay:3  },
        ].map((b, i) => (
          <div key={i} style={{
            position: "absolute", ...b,
            width:  isMobile ? b.w * 0.5 : b.w,
            height: isMobile ? b.w * 0.5 : b.w,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${b.col}1C 0%, transparent 70%)`,
            filter: "blur(90px)",
            animation: `blobDrift ${b.dur}s ease-in-out infinite ${b.delay}s`,
          }}/>
        ))}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at 50% 50%, black 40%, transparent 80%)",
        }}/>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(0,0,0,0.65) 100%)",
        }}/>
      </div>

      {/* Noise */}
      <div style={{
        position:"absolute", inset:0, zIndex:1, pointerEvents:"none",
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        opacity: 0.044, mixBlendMode: "overlay",
      }}/>

      <div style={{
        maxWidth: 1360, margin: "0 auto",
        padding: isMobile ? "0 16px" : isTablet ? "0 24px" : "0 48px",
        position: "relative", zIndex: 2,
      }}>

        {/* ── Marquee ── */}
        <div style={{
          marginBottom: isMobile ? 36 : 56,
          paddingBottom: isMobile ? 14 : 22,
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          overflow: "hidden", position: "relative",
        }}>
          <div style={{ position:"absolute", left:0, top:0, bottom:0, width:40, background:`linear-gradient(90deg,${bg},transparent)`, zIndex:1, pointerEvents:"none" }}/>
          <div style={{ position:"absolute", right:0, top:0, bottom:0, width:40, background:`linear-gradient(-90deg,${bg},transparent)`, zIndex:1, pointerEvents:"none" }}/>
          <div style={{
            display:"flex", whiteSpace:"nowrap", fontWeight:800,
            textTransform:"uppercase", letterSpacing:"0.26em", fontSize:"clamp(7px,2vw,8px)",
            color:"rgba(255,255,255,0.16)",
            animation:"marqueeAbout 30s linear infinite",
          }}>
            {Array(8).fill(["✦ Artisan Ice Cream","🍦 Small Batch","✦ Since 2026","🍓 All Natural","✦ Handcrafted Daily","🍫 Premium Grade"]).flat().map((label,i)=>(
              <span key={i} style={{ margin:"0 20px", color: i%6===0 ? "rgba(245,215,110,0.32)" : "rgba(255,255,255,0.16)" }}>{label}</span>
            ))}
          </div>
        </div>

        {/* ── Two-column layout ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "1fr 1.12fr",
          gap: isMobile ? 0 : isTablet ? 40 : 80,
          alignItems: "center",
        }}>

          {/* ═══ CONE COLUMN ═══ */}
          <div
            ref={coneRef}
            style={{
              position: "relative",
              /* On mobile, show below text; on desktop, show left */
              order: isMobile ? 2 : 1,
              /* Responsive height via aspect ratio — cone SVG is ~400:580 */
              width: "100%",
              /* Give enough room without hard pixel height */
              paddingBottom: isMobile ? "10px" : "0",
              opacity:    coneVis ? 1 : 0,
              transform:  coneVis
                ? "translateY(0) scale(1)"
                : isMobile
                  ? "translateY(32px) scale(0.96)"
                  : "translateX(-32px) scale(0.96)",
              transition: "opacity 0.9s ease, transform 1s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {/* Pulsing glow ring */}
            <div style={{
              position: "absolute", inset: "15%", borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(255,107,138,0.1) 0%, rgba(78,205,196,0.06) 50%, transparent 80%)",
              animation: "pulseGlow 4s ease-in-out infinite",
              pointerEvents: "none",
            }}/>

            {/* 3D Cone — fills its column width naturally */}
            <IceCream3D />

            {/* Floating badge — positioned relative to cone column */}
            <div style={{
              position: "absolute",
              bottom: isMobile ? "5%" : "8%",
              right:  isMobile ? "4%" : "6%",
              background: "linear-gradient(135deg,#FF4070,#FF6B8A)",
              borderRadius: 16, padding: isMobile ? "8px 14px" : "10px 18px",
              boxShadow: "0 12px 36px rgba(255,60,100,0.45), 0 0 0 1px rgba(255,255,255,0.1)",
              animation: "floatBadge 3.5s ease-in-out infinite",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.15)",
              zIndex: 20,
            }}>
              <p style={{ margin:0, fontSize: isMobile?7:8, fontWeight:800, letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(255,255,255,0.7)" }}>{t.badge1}</p>
              <p style={{ margin:"2px 0 0", fontSize: isMobile?13:16, fontWeight:900, fontStyle:"italic", textTransform:"uppercase", color:"white", letterSpacing:"-0.02em", lineHeight:1 }}>{t.badge2}</p>
            </div>

            {/* Flavour tags — hidden on very small screens to avoid overlap */}
            {!isMobile && [
              { label:"Vanilla",    color:"#F5D76E", side:{ left:"0%" },  top:"18%", delay:"0s"   },
              { label:"Strawberry", color:"#FF6B8A", side:{ right:"0%" }, top:"36%", delay:"0.7s" },
              { label:"Pistachio",  color:"#78A860", side:{ left:"0%" },  top:"56%", delay:"1.3s" },
            ].map((tag, i) => (
              <div key={i} style={{
                position: "absolute", ...tag.side, top: tag.top,
                padding: "5px 11px",
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(10px)",
                border: `1px solid ${tag.color}45`,
                borderRadius: 100, zIndex: 20,
                animation: `tagFloat ${3.2 + i * 0.6}s ease-in-out infinite ${tag.delay}`,
              }}>
                <span style={{ fontSize:8, fontWeight:800, letterSpacing:"0.2em", textTransform:"uppercase", color:tag.color }}>{tag.label}</span>
              </div>
            ))}
          </div>

          {/* ═══ TEXT COLUMN ═══ */}
          <div
            ref={textRef}
            style={{
              order: isMobile ? 1 : 2,
              opacity: textVis ? 1 : 0,
              transform: textVis
                ? "translateY(0)"
                : "translateY(24px)",
              transition: "opacity 0.9s ease 0.1s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.1s",
              paddingBottom: isMobile ? "0" : undefined,
            }}
          >
            {/* Eyebrow */}
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
              <div style={{ width:28, height:2, background:"linear-gradient(90deg,#FF6B8A,#4ECDC4,#FFB347)", borderRadius:2, boxShadow:"0 0 12px rgba(255,107,138,0.5)", flexShrink:0 }}/>
              <span style={{ fontSize:"clamp(8px,2.2vw,9px)", fontWeight:800, letterSpacing:"0.28em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)", fontFamily:"'DM Sans',sans-serif" }}>{t.eyebrow}</span>
              <div style={{ width:4, height:4, borderRadius:"50%", background:"linear-gradient(135deg,#FF6B8A,#4ECDC4)", flexShrink:0 }}/>
            </div>

            {/* Headline */}
            <h2 className="about-shimmer" style={{
              fontSize: "clamp(48px,12vw,112px)",
              fontWeight:900, lineHeight:0.84,
              letterSpacing:"-0.04em", textTransform:"uppercase",
              fontStyle:"italic", margin:"0 0 18px",
              whiteSpace: "pre-line",
            }}>
              {t.heading}
            </h2>

            {/* Divider */}
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
              <div style={{ height:1, width:44, background:"linear-gradient(90deg,rgba(255,255,255,0.5),transparent)" }}/>
              <span style={{ fontSize:8, opacity:0.2, letterSpacing:"0.16em" }}>✦ ✦ ✦</span>
            </div>

            {/* Subheading */}
            <h3 style={{
              fontSize: "clamp(14px,3.5vw,20px)",
              fontWeight:700, fontStyle:"italic",
              margin:"0 0 14px", lineHeight:1.4, letterSpacing:"-0.01em",
              opacity: 0.78,
            }}>
              {t.subheading}
            </h3>

            {/* Description */}
            <p style={{
              fontSize: "clamp(13px,3vw,15px)",
              lineHeight:1.85, margin:"0 0 28px",
              color:"rgba(255,255,255,0.48)",
              fontFamily:"'DM Sans',sans-serif", fontStyle:"italic",
            }}>
              {t.description}
            </p>

            {/* Stats */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "clamp(12px,3vw,24px)",
              padding: "20px 0",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              marginBottom: 28,
            }}>
              <StatPill value={t.stat1} label={t.stat1label} accent="#F5D76E" delay={200}/>
              <StatPill value={t.stat2} label={t.stat2label} accent="#4ECDC4" delay={350}/>
              <StatPill value={t.stat3} label={t.stat3label} accent="#FF6B8A" delay={500}/>
            </div>

            {/* Team + CTA */}
            <div style={{
              display:"flex", flexWrap:"wrap",
              alignItems:"center",
              gap:"clamp(10px,3vw,16px)",
            }}>
              {/* Avatars */}
              <div style={{ display:"flex", alignItems:"center" }}>
                {[
                  { bg:"linear-gradient(135deg,#FF6B8A,#C0182F)", label:"S1" },
                  { bg:"linear-gradient(135deg,#4ECDC4,#007860)", label:"S2" },
                  { bg:"linear-gradient(135deg,#F5D76E,#C8A000)", label:"S3" },
                ].map((av, i) => (
                  <div key={i} style={{
                    width:"clamp(32px,8vw,42px)", height:"clamp(32px,8vw,42px)",
                    borderRadius:"50%", background:av.bg,
                    border:"2px solid rgba(5,4,8,0.8)",
                    marginLeft: i > 0 ? -10 : 0,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:10, fontWeight:900, color:"rgba(255,255,255,0.9)", fontStyle:"italic",
                    boxShadow:"0 4px 12px rgba(0,0,0,0.4)",
                    zIndex: 3 - i, position:"relative",
                  }}>{av.label}</div>
                ))}
              </div>
              <p style={{
                margin:0, flex:1,
                fontSize:"clamp(7px,2vw,8px)", fontWeight:800,
                letterSpacing:"0.2em", textTransform:"uppercase",
                color:"rgba(255,255,255,0.3)",
                fontFamily:"'DM Sans',sans-serif",
              }}>{t.teamLabel}</p>

              {/* CTA */}
              <button
                style={{
                  padding:"10px 20px", borderRadius:100,
                  background:"linear-gradient(135deg,rgba(255,107,138,0.15),rgba(78,205,196,0.1))",
                  border:"1px solid rgba(255,107,138,0.4)",
                  color:"rgba(255,255,255,0.8)",
                  fontSize:"clamp(8px,2vw,9px)", fontWeight:700,
                  letterSpacing:"0.2em", textTransform:"uppercase",
                  cursor:"pointer", display:"flex", alignItems:"center", gap:8,
                  fontFamily:"'Syne',sans-serif",
                  backdropFilter:"blur(10px)",
                  transition:"all 0.25s ease",
                  boxShadow:"0 0 24px rgba(255,107,138,0.12)",
                  whiteSpace:"nowrap",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background="linear-gradient(135deg,rgba(255,107,138,0.3),rgba(78,205,196,0.2))";
                  e.currentTarget.style.borderColor="rgba(255,107,138,0.7)";
                  e.currentTarget.style.color="white";
                  e.currentTarget.style.boxShadow="0 0 36px rgba(255,107,138,0.3)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background="linear-gradient(135deg,rgba(255,107,138,0.15),rgba(78,205,196,0.1))";
                  e.currentTarget.style.borderColor="rgba(255,107,138,0.4)";
                  e.currentTarget.style.color="rgba(255,255,255,0.8)";
                  e.currentTarget.style.boxShadow="0 0 24px rgba(255,107,138,0.12)";
                }}
              >
                <span style={{ width:5, height:5, borderRadius:"50%", background:"linear-gradient(135deg,#FF6B8A,#4ECDC4)", display:"inline-block", flexShrink:0 }}/>
                {t.cta}
                <span style={{ fontSize:10, opacity:0.7 }}>→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom rule */}
        <div style={{
          marginTop: isMobile ? 52 : 80,
          height: 1,
          background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)",
        }}/>
      </div>
    </section>
  );
};

export default About;