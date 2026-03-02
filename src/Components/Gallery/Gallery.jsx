import React, { useState, useRef, useEffect, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────────
   ITEMS
──────────────────────────────────────────────────────────────────*/
const ITEMS = [
  {
    id:1, label:"Madagascar Bean", alt:"Vanilla Absolute", tag:"No. 01",
    category:"classic", desc:"Wild-harvested pods, 24h cold steep",
    c1:"#FFFCE0", c2:"#F5D76E", c3:"#C8A000", c4:"#2C1800", accent:"#F5D76E",
    render:(s)=>(
      <svg width={s} height={s} viewBox="0 0 160 160" fill="none">
        <defs>
          <radialGradient id="g1a" cx="38%" cy="28%" r="70%">
            <stop offset="0%" stopColor="#FFFCE8"/><stop offset="40%" stopColor="#F5D76E"/>
            <stop offset="80%" stopColor="#B8860B"/><stop offset="100%" stopColor="#5C3800"/>
          </radialGradient>
          <radialGradient id="g1b" cx="38%" cy="28%" r="70%">
            <stop offset="0%" stopColor="#FFF8C0"/><stop offset="45%" stopColor="#E8C840"/><stop offset="100%" stopColor="#4A2E00"/>
          </radialGradient>
          <pattern id="wf1" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(42)">
            <rect width="10" height="10" fill="#D4A050"/>
            <line x1="0" y1="5" x2="10" y2="5" stroke="#8B5015" strokeWidth="1.2" opacity="0.55"/>
            <line x1="5" y1="0" x2="5" y2="10" stroke="#8B5015" strokeWidth="1.2" opacity="0.55"/>
            <line x1="0" y1="0" x2="10" y2="10" stroke="#A06020" strokeWidth="0.6" opacity="0.3"/>
          </pattern>
        </defs>
        <path d="M50 80 L80 150 L110 80 Z" fill="url(#wf1)"/>
        <path d="M50 80 L80 150 L110 80 Z" fill="none" stroke="#7A3C0A" strokeWidth="1.2" opacity="0.6"/>
        <path d="M72 80 L80 150 L110 80 Z" fill="rgba(0,0,0,0.18)"/>
        <line x1="65" y1="85" x2="70" y2="140" stroke="rgba(255,220,120,0.25)" strokeWidth="1"/>
        <path d="M50 80 Q80 70 110 80" stroke="#FFE090" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M50 80 Q80 70 110 80" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" strokeLinecap="round"/>
        <circle cx="80" cy="62" r="28" fill="url(#g1a)"/>
        <path d="M60 66 Q70 60 80 64 Q90 68 100 62" stroke="rgba(180,120,0,0.25)" strokeWidth="1.5" fill="none"/>
        <circle cx="80" cy="40" r="20" fill="url(#g1b)"/>
        <ellipse cx="70" cy="33" rx="7" ry="4.5" fill="rgba(255,255,255,0.65)" style={{filter:"blur(3px)"}}/>
        <ellipse cx="71" cy="54" rx="9" ry="5.5" fill="rgba(255,255,255,0.45)" style={{filter:"blur(2.5px)"}}/>
        <ellipse cx="68" cy="31" rx="3" ry="2" fill="rgba(255,255,255,0.9)" style={{filter:"blur(1px)"}}/>
        {[[75,38,10],[82,35,-8],[78,42,15],[85,40,-5],[72,45,20]].map(([x,y,r],i)=>(
          <line key={i} x1={x-2} y1={y} x2={x+2} y2={y+3} stroke="#6B4800" strokeWidth="0.8" opacity="0.5" transform={`rotate(${r},${x},${y})`}/>
        ))}
        <ellipse cx="80" cy="152" rx="28" ry="6" fill="#F5D76E" opacity="0.18" style={{filter:"blur(8px)"}}/>
      </svg>
    ),
  },
  {
    id:2, label:"Velvet Cocoa", alt:"Noir Ganache", tag:"No. 02",
    category:"signature", desc:"72% Valrhona, triple-layer indulgence",
    c1:"#E8C090", c2:"#8B4513", c3:"#4A2010", c4:"#140500", accent:"#C07030",
    render:(s)=>(
      <svg width={s} height={s} viewBox="0 0 160 160" fill="none">
        <defs>
          <radialGradient id="g2a" cx="38%" cy="28%" r="70%"><stop offset="0%" stopColor="#D8A878"/><stop offset="50%" stopColor="#7B4F2E"/><stop offset="100%" stopColor="#180500"/></radialGradient>
          <radialGradient id="g2b" cx="38%" cy="28%" r="70%"><stop offset="0%" stopColor="#C0986A"/><stop offset="50%" stopColor="#5A3018"/><stop offset="100%" stopColor="#100300"/></radialGradient>
          <radialGradient id="g2cup" cx="30%" cy="20%" r="80%"><stop offset="0%" stopColor="#F0DEC0"/><stop offset="100%" stopColor="#B88040"/></radialGradient>
        </defs>
        <path d="M36 80 L48 128 L112 128 L124 80 Z" fill="url(#g2cup)" stroke="#9B6020" strokeWidth="1"/>
        <path d="M36 80 L48 128 L72 128 L60 80 Z" fill="rgba(255,255,255,0.14)"/>
        <line x1="40" y1="98" x2="120" y2="98" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
        <path d="M36 80 Q80 70 124 80" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
        <circle cx="80" cy="68" r="24" fill="url(#g2a)"/>
        <circle cx="60" cy="62" r="18" fill="url(#g2b)"/>
        <circle cx="100" cy="62" r="18" fill="url(#g2a)"/>
        <path d="M64 58 Q72 64 80 60" stroke="rgba(0,0,0,0.3)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <ellipse cx="73" cy="60" rx="7" ry="4.5" fill="rgba(255,255,255,0.45)" style={{filter:"blur(2.5px)"}}/>
        <path d="M58 50 Q66 42 74 48 Q82 54 90 46 Q98 40 105 46" stroke="#1A0500" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7"/>
        <path d="M66 36 Q72 26 80 28 Q88 26 94 36 Q90 44 80 42 Q70 40 66 36Z" fill="rgba(255,255,255,0.94)" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5"/>
        <circle cx="80" cy="26" r="6" fill="#C8182F"/>
        <path d="M80 20 C82 16 85 14 86 18" stroke="#1A5A10" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <ellipse cx="80" cy="136" rx="30" ry="6" fill="#8B4513" opacity="0.22" style={{filter:"blur(8px)"}}/>
      </svg>
    ),
  },
  {
    id:3, label:"Summer Churn", alt:"Field Strawberry", tag:"No. 03",
    category:"seasonal", desc:"Sun-picked berries, Normandy cream",
    c1:"#FFBCCC", c2:"#FF6B8A", c3:"#C0182F", c4:"#400010", accent:"#FF6B8A",
    render:(s)=>(
      <svg width={s} height={s} viewBox="0 0 160 160" fill="none">
        <defs>
          <radialGradient id="g3a" cx="38%" cy="28%" r="70%"><stop offset="0%" stopColor="#FFCCD8"/><stop offset="50%" stopColor="#FF6B8A"/><stop offset="100%" stopColor="#500012"/></radialGradient>
          <radialGradient id="g3b" cx="38%" cy="28%" r="70%"><stop offset="0%" stopColor="#FFB0C0"/><stop offset="50%" stopColor="#EE4060"/><stop offset="100%" stopColor="#400010"/></radialGradient>
          <pattern id="wf3" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(42)">
            <rect width="10" height="10" fill="#D4A050"/>
            <line x1="0" y1="5" x2="10" y2="5" stroke="#8B5015" strokeWidth="1.2" opacity="0.55"/>
            <line x1="5" y1="0" x2="5" y2="10" stroke="#8B5015" strokeWidth="1.2" opacity="0.55"/>
          </pattern>
        </defs>
        <path d="M50 84 L80 152 L110 84 Z" fill="url(#wf3)" stroke="#7A3C0A" strokeWidth="1.2"/>
        <path d="M72 84 L80 152 L110 84 Z" fill="rgba(0,0,0,0.16)"/>
        <path d="M50 84 Q80 73 110 84" stroke="#FFE090" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <circle cx="80" cy="64" r="30" fill="url(#g3a)"/>
        <circle cx="80" cy="44" r="20" fill="url(#g3b)"/>
        <ellipse cx="70" cy="37" rx="8" ry="5" fill="rgba(255,255,255,0.6)" style={{filter:"blur(3px)"}}/>
        <ellipse cx="69" cy="35" rx="3.5" ry="2" fill="rgba(255,255,255,0.9)" style={{filter:"blur(1px)"}}/>
        {[[68,30,10],[82,28,-12],[75,23,0]].map(([x,y,r],i)=>(
          <g key={i} transform={`rotate(${r},${x},${y})`}>
            <ellipse cx={x} cy={y} rx="5.5" ry="7" fill="#FF1A38"/>
            <path d={`M${x-3} ${y-5} Q${x} ${y-10} ${x+3} ${y-5}`} stroke="#2A8020" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </g>
        ))}
        <ellipse cx="80" cy="154" rx="28" ry="6" fill="#FF6B8A" opacity="0.2" style={{filter:"blur(8px)"}}/>
      </svg>
    ),
  },
  {
    id:4, label:"Sun Ripened", alt:"Alphonso Mango", tag:"No. 04",
    category:"seasonal", desc:"Ratnagiri alphonso, cardamom infusion",
    c1:"#FFE0A0", c2:"#FFB347", c3:"#E07000", c4:"#3A1800", accent:"#FFB347",
    render:(s)=>(
      <svg width={s} height={s} viewBox="0 0 160 160" fill="none">
        <defs>
          <radialGradient id="g4a" cx="38%" cy="28%" r="70%"><stop offset="0%" stopColor="#FFE8A8"/><stop offset="50%" stopColor="#FFB347"/><stop offset="100%" stopColor="#602800"/></radialGradient>
          <radialGradient id="g4b" cx="38%" cy="28%" r="70%"><stop offset="0%" stopColor="#FFD880"/><stop offset="50%" stopColor="#EE9020"/><stop offset="100%" stopColor="#4A1E00"/></radialGradient>
          <linearGradient id="g4glass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.18)"/><stop offset="100%" stopColor="rgba(255,200,100,0.08)"/>
          </linearGradient>
        </defs>
        <path d="M38 76 L50 128 L110 128 L122 76 Z" fill="url(#g4glass)" stroke="rgba(255,200,120,0.35)" strokeWidth="1.5"/>
        <path d="M38 76 Q80 66 122 76" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.35)" strokeWidth="1"/>
        <path d="M42 84 L46 124" stroke="rgba(255,255,255,0.18)" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="80" cy="62" r="28" fill="url(#g4a)"/>
        <circle cx="62" cy="56" r="18" fill="url(#g4b)" opacity="0.9"/>
        <circle cx="98" cy="58" r="16" fill="url(#g4a)" opacity="0.85"/>
        <ellipse cx="73" cy="54" rx="8" ry="5" fill="rgba(255,255,255,0.5)" style={{filter:"blur(2.5px)"}}/>
        <path d="M84 38 Q100 28 104 46 Q100 56 88 52 Q80 44 84 38Z" fill="#FF9A00" stroke="#E07800" strokeWidth="0.8"/>
        <path d="M58 40 C52 30 64 24 60 34 C58 40 54 40 58 40Z" fill="#5A9040"/>
        <text x="106" y="34" fontSize="10" fill="#FFD060" opacity="0.7" textAnchor="middle">✦</text>
        <ellipse cx="80" cy="136" rx="30" ry="6" fill="#FFB347" opacity="0.22" style={{filter:"blur(8px)"}}/>
      </svg>
    ),
  },
  {
    id:5, label:"Cool Infusion", alt:"Mint Chip Shards", tag:"No. 05",
    category:"classic", desc:"Garden spearmint, dark chocolate shard",
    c1:"#A8F0EC", c2:"#4ECDC4", c3:"#007860", c4:"#001E1C", accent:"#4ECDC4",
    render:(s)=>(
      <svg width={s} height={s} viewBox="0 0 160 160" fill="none">
        <defs>
          <radialGradient id="g5a" cx="38%" cy="28%" r="70%"><stop offset="0%" stopColor="#D8FAF6"/><stop offset="50%" stopColor="#4ECDC4"/><stop offset="100%" stopColor="#003038"/></radialGradient>
          <radialGradient id="g5b" cx="38%" cy="28%" r="70%"><stop offset="0%" stopColor="#C0F4F0"/><stop offset="50%" stopColor="#38B8B0"/><stop offset="100%" stopColor="#002028"/></radialGradient>
          <pattern id="wf5" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(42)">
            <rect width="10" height="10" fill="#D4A050"/>
            <line x1="0" y1="5" x2="10" y2="5" stroke="#8B5015" strokeWidth="1.2" opacity="0.55"/>
            <line x1="5" y1="0" x2="5" y2="10" stroke="#8B5015" strokeWidth="1.2" opacity="0.55"/>
          </pattern>
        </defs>
        <path d="M50 84 L80 152 L110 84 Z" fill="url(#wf5)" stroke="#7A3C0A" strokeWidth="1.2"/>
        <path d="M72 84 L80 152 L110 84 Z" fill="rgba(0,0,0,0.16)"/>
        <path d="M50 84 Q80 73 110 84" stroke="#FFE090" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <circle cx="80" cy="64" r="30" fill="url(#g5a)"/>
        <circle cx="80" cy="42" r="20" fill="url(#g5b)"/>
        <ellipse cx="70" cy="35" rx="8" ry="5" fill="rgba(255,255,255,0.65)" style={{filter:"blur(3px)"}}/>
        {[{x:70,y:44,w:8,h:5,r:15,fill:"#0D0500"},{x:84,y:40,w:9,h:5,r:-25,fill:"#1A0800"},{x:76,y:52,w:10,h:5,r:38,fill:"#0D0500"},{x:88,y:50,w:8,h:4,r:-12,fill:"#150600"}].map(({x,y,w,h,r,fill},i)=>(
          <rect key={i} x={x-w/2} y={y-h/2} width={w} height={h} rx="1.5" fill={fill} transform={`rotate(${r},${x},${y})`} opacity="0.9"/>
        ))}
        <path d="M58 40 C52 30 66 26 60 36 C58 42 54 42 58 40Z" fill="#28A850" opacity="0.92"/>
        <ellipse cx="80" cy="154" rx="28" ry="6" fill="#4ECDC4" opacity="0.2" style={{filter:"blur(8px)"}}/>
      </svg>
    ),
  },
  {
    id:6, label:"Layered Joy", alt:"Artisan Celebration", tag:"No. 06",
    category:"signature", desc:"Festive layers, edible gold, confetti",
    c1:"#DDD6FE", c2:"#A78BFA", c3:"#6D28D9", c4:"#1A0840", accent:"#A78BFA",
    render:(s)=>(
      <svg width={s} height={s} viewBox="0 0 160 160" fill="none">
        <defs>
          <linearGradient id="lA6" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#EEE8FF"/><stop offset="100%" stopColor="#A78BFA"/></linearGradient>
          <linearGradient id="lB6" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#FFD8E8"/><stop offset="100%" stopColor="#FF6B8A"/></linearGradient>
          <linearGradient id="lC6" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#F0D0A0"/><stop offset="100%" stopColor="#C07030"/></linearGradient>
          <linearGradient id="lFrost6" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="100%" stopColor="#E8E0FF"/></linearGradient>
        </defs>
        <ellipse cx="80" cy="132" rx="44" ry="8" fill="#6D28D9" opacity="0.2" style={{filter:"blur(12px)"}}/>
        <rect x="18" y="100" width="104" height="24" rx="3" fill="url(#lC6)"/>
        <path d="M122 100 L130 106 L130 130 L122 124 Z" fill="rgba(100,40,0,0.3)"/>
        <path d="M18 100 L122 100 L130 106 L26 106 Z" fill="rgba(255,255,255,0.28)"/>
        <rect x="18" y="95" width="104" height="6" fill="white" opacity="0.88"/>
        <rect x="18" y="72" width="104" height="24" fill="url(#lB6)"/>
        <path d="M122 72 L130 78 L130 100 L122 94 Z" fill="rgba(150,0,60,0.28)"/>
        <rect x="18" y="67" width="104" height="6" fill="white" opacity="0.85"/>
        <rect x="18" y="44" width="104" height="24" fill="url(#lA6)"/>
        <path d="M14 44 Q22 30 30 38 Q38 26 46 34 Q54 22 62 30 Q70 18 78 26 Q86 14 94 22 Q102 16 110 26 Q118 20 126 34 Q132 44 126 44 L122 44 L18 44 Z" fill="url(#lFrost6)"/>
        {[50,80,110].map((x,i)=>(
          <g key={i}>
            <rect x={x-3.5} y={18} width={7} height={22} rx="2.5" fill={["#FFB347","#FF6B8A","#4ECDC4"][i]}/>
            <path d={`M${x} 14 C${x} 8 ${x-5} 5 ${x-2} 10 C${x-1} 14 ${x+2} 14 ${x+2} 10 C${x+3} 5 ${x} 6 ${x} 14Z`} fill="#FF6010"/>
          </g>
        ))}
        {[[30,30,40,"#FFB347"],[120,26,-30,"#FF6B8A"],[40,56,15,"#4ECDC4"],[115,60,-25,"#A78BFA"]].map(([x,y,r,c],i)=>(
          <rect key={i} x={x-4} y={y-1.5} width={8} height={3} rx={1.5} fill={c} transform={`rotate(${r},${x},${y})`} opacity="0.8"/>
        ))}
        <text x="36" y="24" fontSize="10" fill="#F5D76E" opacity="0.75" textAnchor="middle">✦</text>
        <text x="122" y="32" fontSize="10" fill="#F5D76E" opacity="0.75" textAnchor="middle">✦</text>
      </svg>
    ),
  },
  {
    id:7, label:"Sicilian Gold", alt:"Roasted Pistachio", tag:"No. 07",
    category:"classic", desc:"Bronte DOP nuts, aged ricotta swirl",
    c1:"#D0F0B0", c2:"#78A860", c3:"#3A6828", c4:"#0E2208", accent:"#78A860",
    render:(s)=>(
      <svg width={s} height={s} viewBox="0 0 160 160" fill="none">
        <defs>
          <radialGradient id="g7a" cx="38%" cy="28%" r="70%"><stop offset="0%" stopColor="#E0F8C0"/><stop offset="55%" stopColor="#78A860"/><stop offset="100%" stopColor="#102008"/></radialGradient>
          <radialGradient id="g7b" cx="38%" cy="28%" r="70%"><stop offset="0%" stopColor="#D0F0A8"/><stop offset="55%" stopColor="#5A8A40"/><stop offset="100%" stopColor="#0A1808"/></radialGradient>
          <pattern id="wf7" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(42)">
            <rect width="10" height="10" fill="#C8A048"/>
            <line x1="0" y1="5" x2="10" y2="5" stroke="#7A3C0A" strokeWidth="1.2" opacity="0.5"/>
            <line x1="5" y1="0" x2="5" y2="10" stroke="#7A3C0A" strokeWidth="1.2" opacity="0.5"/>
          </pattern>
        </defs>
        <path d="M46 88 L80 152 L114 88 Z" fill="url(#wf7)" stroke="#8B5A10" strokeWidth="1.2"/>
        <path d="M70 88 L80 152 L114 88 Z" fill="rgba(0,0,0,0.16)"/>
        <path d="M46 88 Q80 76 114 88" stroke="rgba(255,220,120,0.7)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <circle cx="80" cy="72" r="24" fill="url(#g7a)"/>
        <circle cx="62" cy="64" r="16" fill="url(#g7b)"/>
        <circle cx="98" cy="64" r="16" fill="url(#g7a)" opacity="0.92"/>
        <circle cx="80" cy="50" r="15" fill="url(#g7a)" opacity="0.92"/>
        <circle cx="80" cy="34" r="10" fill="url(#g7b)" opacity="0.88"/>
        <ellipse cx="73" cy="64" rx="6.5" ry="4" fill="rgba(255,255,255,0.45)" style={{filter:"blur(2.5px)"}}/>
        {[[75,30,-15],[85,27,22],[78,23,5],[72,38,18],[82,34,-8]].map(([x,y,r],i)=>(
          <g key={i} transform={`rotate(${r},${x},${y})`}>
            <ellipse cx={x} cy={y} rx="4.5" ry="3.5" fill="#7B5C12"/>
            <ellipse cx={x} cy={y} rx="3" ry="2.2" fill="#C8A818"/>
            <line x1={x-2.5} y1={y} x2={x+2.5} y2={y} stroke="#6B4800" strokeWidth="0.8" opacity="0.6"/>
          </g>
        ))}
        <ellipse cx="80" cy="154" rx="28" ry="6" fill="#78A860" opacity="0.22" style={{filter:"blur(8px)"}}/>
      </svg>
    ),
  },
  {
    id:8, label:"Dark Roast", alt:"Cold Brew Espresso", tag:"No. 08",
    category:"signature", desc:"Ethiopian single-origin, 18h cold brew",
    c1:"#E8D0B0", c2:"#C08040", c3:"#7A4818", c4:"#0E0300", accent:"#C08040",
    render:(s)=>(
      <svg width={s} height={s} viewBox="0 0 160 160" fill="none">
        <defs>
          <radialGradient id="g8a" cx="38%" cy="28%" r="70%"><stop offset="0%" stopColor="#E8C890"/><stop offset="50%" stopColor="#C08040"/><stop offset="100%" stopColor="#280A00"/></radialGradient>
          <radialGradient id="g8b" cx="38%" cy="28%" r="70%"><stop offset="0%" stopColor="#D8B878"/><stop offset="50%" stopColor="#A06028"/><stop offset="100%" stopColor="#1E0800"/></radialGradient>
          <linearGradient id="g8cup" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5F0E8"/><stop offset="60%" stopColor="#E0D0B8"/><stop offset="100%" stopColor="#C8B898"/>
          </linearGradient>
        </defs>
        <ellipse cx="80" cy="134" rx="36" ry="7" fill="#C08040" opacity="0.2" style={{filter:"blur(10px)"}}/>
        <path d="M28 78 L42 130 L118 130 L132 78 Z" fill="url(#g8cup)" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5"/>
        <path d="M28 78 L42 130 L60 130 L46 78 Z" fill="rgba(255,255,255,0.15)"/>
        <path d="M28 78 Q80 66 132 78" fill="rgba(255,255,255,0.35)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
        <path d="M132 88 Q148 88 148 104 Q148 120 132 120" stroke="#D0C0A8" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <circle cx="80" cy="66" r="26" fill="url(#g8a)"/>
        <circle cx="60" cy="60" r="17" fill="url(#g8b)" opacity="0.9"/>
        <ellipse cx="72" cy="57" rx="8" ry="5" fill="rgba(255,255,255,0.42)" style={{filter:"blur(2.5px)"}}/>
        <path d="M60 52 Q68 44 76 50 Q84 56 92 48 Q100 42 108 48" stroke="#100400" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6"/>
        <ellipse cx="88" cy="50" rx="8" ry="6" fill="#1E0800" transform="rotate(-22,88,50)"/>
        {[[60,28],[70,24],[80,28]].map(([x,y],i)=>(
          <path key={i} d={`M${x} ${y+8} Q${x+4} ${y+4} ${x} ${y}`} stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        ))}
      </svg>
    ),
  },
];

const CATS = [
  { id:"all",       label:"All" },
  { id:"classic",   label:"Classic" },
  { id:"signature", label:"Signature" },
  { id:"seasonal",  label:"Seasonal" },
];

const CAT_ACCENT = { all:"#4ECDC4", classic:"#F5D76E", signature:"#A78BFA", seasonal:"#FF6B8A" };

const translations = {
  en:{ heading:"The Collection", eyebrow:"Chilled Series", subheading:"Signature small-batch churns, crafted for the discerning palate.", footer:"The Finest Scoops", cta:"Explore Flavours", discover:"Discover" },
  fr:{ heading:"La Collection", eyebrow:"Série Glacée", subheading:"Créations artisanales pour les palais exigeants.", footer:"Les Meilleures Boules", cta:"Explorer", discover:"Découvrir" },
  es:{ heading:"La Colección", eyebrow:"Serie Helada", subheading:"Lotes maestros elaborados para paladares exigentes.", footer:"Los Mejores Sabores", cta:"Explorar Sabores", discover:"Descubrir" },
};

/* ─── Deterministic particles (no Math.random on each render) ── */
const PARTICLES = Array.from({length:14},(_,i)=>({
  id:i, x:((i*17+5)%91), delay:((i*1.37)%10).toFixed(2),
  dur:(14+((i*2.1)%9)).toFixed(1), size:(1.4+((i*0.71)%2)).toFixed(1),
  opacity:(0.14+((i*0.023)%0.2)).toFixed(2),
  color:["#F5D76E","#FF6B8A","#4ECDC4","#A78BFA","#FFB347"][i%5],
}));

/* ─── Filter pill ─────────────────────────────────────────────── */
const FilterPill = ({label,active,accent,onClick,count})=>{
  const [hov,setHov]=useState(false);
  return (
    <button onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{
      display:"flex",alignItems:"center",gap:6,
      padding:"6px 14px", borderRadius:100, flexShrink:0,
      border:`1px solid ${active?accent+"70":"rgba(255,255,255,0.1)"}`,
      background:active?`linear-gradient(135deg,${accent}28,${accent}12)`:hov?"rgba(255,255,255,0.07)":"rgba(255,255,255,0.03)",
      color:active?"white":"rgba(255,255,255,0.42)",
      fontSize:"clamp(8px,2vw,9px)", fontWeight:800, letterSpacing:"0.16em",
      textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif",
      cursor:"pointer", whiteSpace:"nowrap",
      boxShadow:active?`0 0 14px ${accent}38`:"none",
      transition:"all 0.25s cubic-bezier(0.22,1,0.36,1)",
    }}>
      {active&&<span style={{fontSize:7,color:accent}}>✦</span>}
      {label}
      <span style={{
        fontSize:7,fontWeight:800,
        background:active?`${accent}33`:"rgba(255,255,255,0.1)",
        border:`1px solid ${active?accent+"40":"rgba(255,255,255,0.1)"}`,
        color:active?accent:"rgba(255,255,255,0.3)",
        borderRadius:100,padding:"0 5px",lineHeight:"14px",
        transition:"all 0.2s",
      }}>{count}</span>
    </button>
  );
};

/* ─── Detail bottom sheet / modal ────────────────────────────── */
const DetailSheet = ({item,onClose,isMobile,t})=>{
  const [mounted,setMounted]=useState(false);
  useEffect(()=>{
    const id=requestAnimationFrame(()=>setMounted(true));
    document.body.style.overflow="hidden";
    return ()=>{ cancelAnimationFrame(id); document.body.style.overflow=""; };
  },[]);

  return (
    <div onClick={onClose} style={{
      position:"fixed",inset:0,zIndex:2000,
      background:"rgba(0,0,0,0.78)",
      backdropFilter:"blur(16px)",
      display:"flex",
      alignItems:isMobile?"flex-end":"center",
      justifyContent:"center",
      opacity:mounted?1:0,
      transition:"opacity 0.28s ease",
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        width:isMobile?"100%":"min(520px,90vw)",
        maxHeight:isMobile?"88vh":"88vh",
        borderRadius:isMobile?"22px 22px 0 0":22,
        background:`linear-gradient(160deg,${item.c4}f2,rgba(4,4,10,0.98))`,
        border:`1px solid ${item.accent}30`,
        boxShadow:`0 -24px 80px rgba(0,0,0,0.65),0 0 0 1px ${item.accent}18`,
        overflow:"hidden",display:"flex",flexDirection:"column",
        transform:mounted?"translateY(0) scale(1)":isMobile?"translateY(100%)":"translateY(24px) scale(0.95)",
        transition:"transform 0.45s cubic-bezier(0.22,1,0.36,1)",
      }}>
        {/* Drag handle */}
        {isMobile&&<div style={{display:"flex",justifyContent:"center",padding:"12px 0 2px"}}>
          <div style={{width:36,height:4,borderRadius:2,background:"rgba(255,255,255,0.18)"}}/>
        </div>}

        {/* Top stripe */}
        <div style={{height:2,flexShrink:0,background:`linear-gradient(90deg,transparent,${item.accent},transparent)`,boxShadow:`0 0 22px ${item.accent}70`}}/>

        {/* Scrollable content */}
        <div style={{overflowY:"auto",padding:isMobile?"18px 20px 32px":"32px 36px"}}>
          {/* Header row */}
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:20}}>
            <div>
              <div style={{fontSize:8,fontWeight:800,letterSpacing:"0.22em",textTransform:"uppercase",color:item.accent,fontFamily:"'DM Sans',sans-serif",marginBottom:5}}>{item.tag} · {item.category}</div>
              <h3 style={{
                margin:0,
                fontSize:isMobile?"clamp(20px,5.5vw,26px)":"clamp(24px,3vw,30px)",
                fontWeight:900,fontStyle:"italic",letterSpacing:"-0.03em",
                textTransform:"uppercase",color:"white",fontFamily:"'Syne',sans-serif",lineHeight:0.9,
              }}>{item.label}</h3>
              <p style={{margin:"6px 0 0",fontSize:"clamp(11px,2.5vw,12px)",color:"rgba(255,255,255,0.45)",fontFamily:"'DM Sans',sans-serif",fontStyle:"italic"}}>{item.alt}</p>
            </div>
            <button onClick={onClose} style={{
              width:34,height:34,borderRadius:"50%",flexShrink:0,
              background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.14)",
              color:"rgba(255,255,255,0.55)",fontSize:15,cursor:"pointer",
              display:"flex",alignItems:"center",justifyContent:"center",
              transition:"all 0.2s",marginLeft:12,
            }}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.14)";e.currentTarget.style.color="white";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.07)";e.currentTarget.style.color="rgba(255,255,255,0.55)";}}
            >×</button>
          </div>

          {/* Illustration */}
          <div style={{
            display:"flex",justifyContent:"center",alignItems:"center",
            height:isMobile?160:200,marginBottom:20,
            background:`radial-gradient(ellipse at 50% 50%,${item.c2}1E,transparent 70%)`,
            borderRadius:16,
            filter:`drop-shadow(0 16px 36px ${item.accent}3A)`,
          }}>
            {item.render(isMobile?130:160)}
          </div>

          {/* Tasting notes */}
          <div style={{padding:"14px 16px",borderRadius:12,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",marginBottom:14}}>
            <div style={{fontSize:7,fontWeight:800,letterSpacing:"0.24em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",fontFamily:"'DM Sans',sans-serif",marginBottom:5}}>Tasting Notes</div>
            <p style={{margin:0,fontSize:"clamp(13px,3.5vw,14px)",color:"rgba(255,255,255,0.7)",fontFamily:"'DM Sans',sans-serif",fontStyle:"italic",lineHeight:1.65}}>{item.desc}</p>
          </div>

          {/* Tags */}
          <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:20}}>
            {[item.category,"Premium","Small Batch","Artisan"].map((tag,i)=>(
              <div key={i} style={{padding:"3px 10px",borderRadius:100,background:`${item.accent}14`,border:`1px solid ${item.accent}30`,fontSize:8,fontWeight:800,letterSpacing:"0.16em",textTransform:"uppercase",color:item.accent,fontFamily:"'DM Sans',sans-serif"}}>{tag}</div>
            ))}
          </div>

          {/* CTA */}
          <button style={{
            width:"100%",padding:"13px 20px",borderRadius:12,border:"none",
            background:`linear-gradient(135deg,${item.accent}cc,${item.accent}88)`,
            color:"white",fontSize:"clamp(8px,2vw,9px)",fontWeight:800,
            letterSpacing:"0.2em",textTransform:"uppercase",fontFamily:"'Syne',sans-serif",
            cursor:"pointer",boxShadow:`0 8px 28px ${item.accent}40`,
            transition:"all 0.22s ease",
          }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 14px 36px ${item.accent}55`;}}
            onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow=`0 8px 28px ${item.accent}40`;}}
          >{t.discover} {item.label}</button>
        </div>
      </div>
    </div>
  );
};

/* ─── Gallery Card ────────────────────────────────────────────── */
const GalleryCard = ({item,index,isMobile,isTablet,onOpen})=>{
  const ref=useRef(null);
  const [tilt,setTilt]=useState({x:0,y:0});
  const [shine,setShine]=useState({x:50,y:50});
  const [hovered,setHovered]=useState(false);
  const [visible,setVisible]=useState(false);
  const [pressed,setPressed]=useState(false);

  useEffect(()=>{
    const el=ref.current;
    if(!el)return;
    const obs=new IntersectionObserver(
      ([e])=>{if(e.isIntersecting){setTimeout(()=>setVisible(true),index*65);obs.disconnect();}},
      {threshold:0.06}
    );
    obs.observe(el);
    return()=>obs.disconnect();
  },[index]);

  const onMove=useCallback((e)=>{
    if(isMobile)return;
    const r=ref.current.getBoundingClientRect();
    const cx=(e.clientX-r.left)/r.width;
    const cy=(e.clientY-r.top)/r.height;
    setTilt({x:(cy-0.5)*-16,y:(cx-0.5)*16});
    setShine({x:cx*100,y:cy*100});
  },[isMobile]);

  const iconSize=isMobile?74:isTablet?96:120;

  return (
    <div ref={ref} style={{
      opacity:visible?1:0,
      transform:visible?"translateY(0) scale(1)":"translateY(40px) scale(0.92)",
      transition:`opacity 0.72s ease ${index*0.055}s,transform 0.78s cubic-bezier(0.22,1,0.36,1) ${index*0.055}s`,
    }}>
      <div
        onMouseMove={onMove}
        onMouseEnter={()=>!isMobile&&setHovered(true)}
        onMouseLeave={()=>{setTilt({x:0,y:0});setShine({x:50,y:50});setHovered(false);}}
        onMouseDown={()=>setPressed(true)}
        onMouseUp={()=>setPressed(false)}
        onTouchStart={()=>setPressed(true)}
        onTouchEnd={()=>setPressed(false)}
        onClick={()=>onOpen(item)}
        style={{
          position:"relative",borderRadius:isMobile?14:18,overflow:"hidden",
          transformStyle:"preserve-3d",
          transform:`rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)${hovered?" translateZ(16px) scale(1.04)":""}${pressed?" scale(0.94)":""}`,
          transition:hovered?"transform 0.1s ease-out,box-shadow 0.28s":pressed?"transform 0.1s ease":"transform 0.65s cubic-bezier(0.22,1,0.36,1),box-shadow 0.65s",
          boxShadow:hovered
            ?`0 36px 70px rgba(0,0,0,0.6),0 0 0 1px ${item.accent}55,0 0 50px ${item.accent}18`
            :`0 8px 24px rgba(0,0,0,0.3),0 0 0 1px ${item.c3}22`,
          cursor:"pointer",
          background:`linear-gradient(160deg,${item.c4}88,${item.c4}ee)`,
          aspectRatio:"1/1",
          WebkitTapHighlightColor:"transparent",
          userSelect:"none",
        }}
      >
        {/* Grain */}
        <div style={{position:"absolute",inset:0,zIndex:1,pointerEvents:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,opacity:0.05,mixBlendMode:"overlay"}}/>
        {/* Radial bg */}
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 35% 25%,${item.c2}30,${item.c4}50 60%,${item.c4}aa 100%)`}}/>
        {/* Reactive glow */}
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 40% 30%,${item.c2}35,transparent 65%)`,opacity:hovered?1:0.5,transition:"opacity 0.4s"}}/>
        {/* Shine */}
        <div style={{position:"absolute",inset:0,zIndex:2,pointerEvents:"none",background:`radial-gradient(circle at ${shine.x}% ${shine.y}%,rgba(255,255,255,0.22),transparent 55%)`,opacity:hovered?1:0,transition:"opacity 0.15s",mixBlendMode:"overlay"}}/>
        {/* Rainbow foil */}
        <div style={{position:"absolute",inset:0,zIndex:2,pointerEvents:"none",background:`linear-gradient(${shine.x*1.5}deg,rgba(255,120,120,0.06),rgba(120,255,180,0.06),rgba(120,180,255,0.06))`,opacity:hovered?0.8:0,transition:"opacity 0.2s",mixBlendMode:"color-dodge"}}/>
        {/* Top stripe */}
        <div style={{position:"absolute",top:0,left:0,right:0,height:3,zIndex:4,background:`linear-gradient(90deg,transparent,${item.c1}bb,${item.c2}ff,${item.c1}bb,transparent)`,opacity:hovered?1:0.35,transition:"opacity 0.35s"}}/>
        {/* Inner rim */}
        <div style={{position:"absolute",inset:0,zIndex:5,pointerEvents:"none",borderRadius:isMobile?14:18,boxShadow:`inset 0 0 0 1px ${item.c2}${hovered?"70":"28"}`,transition:"box-shadow 0.35s"}}/>

        {/* Tag badge */}
        <div style={{position:"absolute",top:isMobile?8:12,left:isMobile?8:12,zIndex:6,background:"rgba(0,0,0,0.48)",backdropFilter:"blur(8px)",border:`1px solid ${item.c2}38`,borderRadius:5,padding:isMobile?"2px 5px":"3px 8px"}}>
          <span style={{fontSize:isMobile?6:8,fontWeight:800,letterSpacing:"0.18em",color:item.c1,textTransform:"uppercase"}}>{item.tag}</span>
        </div>

        {/* Tap hint — mobile only */}
        {isMobile&&(
          <div style={{position:"absolute",top:8,right:8,zIndex:6,width:20,height:20,borderRadius:"50%",background:"rgba(0,0,0,0.42)",backdropFilter:"blur(8px)",border:`1px solid ${item.accent}28`,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{fontSize:8,color:"rgba(255,255,255,0.55)"}}>↗</span>
          </div>
        )}

        {/* Illustration */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",position:"relative",zIndex:4,padding:isMobile?4:10,transform:`translateZ(${hovered?18:0}px)`,transition:"transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",filter:hovered?`drop-shadow(0 14px 28px ${item.c2}65) drop-shadow(0 4px 8px rgba(0,0,0,0.45))`:`drop-shadow(0 6px 16px rgba(0,0,0,0.38))`}}>
          {item.render(iconSize)}
        </div>

        {/* Desktop hover info */}
        {!isMobile&&(
          <div style={{position:"absolute",bottom:0,left:0,right:0,zIndex:6,padding:hovered?"8px 14px 14px":"0 14px",maxHeight:hovered?80:0,overflow:"hidden",opacity:hovered?1:0,transition:"max-height 0.38s cubic-bezier(0.22,1,0.36,1),opacity 0.22s,padding 0.28s",background:`linear-gradient(to top,${item.c4}f0,transparent)`}}>
            <div style={{height:1,marginBottom:7,background:`linear-gradient(90deg,transparent,${item.c2}cc,transparent)`,boxShadow:`0 0 10px ${item.c2}50`}}/>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:6}}>
              <div>
                <p style={{margin:0,fontSize:10,fontWeight:900,letterSpacing:"0.12em",textTransform:"uppercase",color:item.c1,fontStyle:"italic"}}>{item.label}</p>
                <p style={{margin:"2px 0 0",fontSize:9,fontWeight:500,color:`${item.c1}75`,fontFamily:"'DM Sans',sans-serif"}}>{item.desc}</p>
              </div>
              <div style={{width:22,height:22,borderRadius:"50%",border:`1px solid ${item.c2}55`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:item.c1,flexShrink:0,background:`${item.c4}cc`}}>→</div>
            </div>
          </div>
        )}

        {/* Mobile: persistent label at bottom */}
        {isMobile&&(
          <div style={{position:"absolute",bottom:0,left:0,right:0,zIndex:6,padding:"5px 8px 8px",background:`linear-gradient(to top,${item.c4}f5,transparent)`}}>
            <p style={{margin:0,fontSize:"clamp(9px,2.8vw,11px)",fontWeight:900,letterSpacing:"0.08em",textTransform:"uppercase",fontStyle:"italic",color:"rgba(255,255,255,0.82)",fontFamily:"'Syne',sans-serif",lineHeight:1.1}}>{item.label}</p>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Main Gallery ────────────────────────────────────────────── */
const Gallery = ({ language = "en", isDarkMode = false }) => {
  const t = translations[language]||translations.en;
  const [isMobile,  setMobile]  = useState(false);
  const [isTablet,  setTablet]  = useState(false);
  const [headerVis, setHdrVis]  = useState(false);
  const [activeCat, setActiveCat] = useState("all");
  const [activeItem, setActiveItem] = useState(null);
  const headerRef = useRef(null);

  useEffect(()=>{
    const check=()=>{
      setMobile(window.innerWidth<560);
      setTablet(window.innerWidth>=560&&window.innerWidth<1024);
    };
    check();
    window.addEventListener("resize",check);
    return()=>window.removeEventListener("resize",check);
  },[]);

  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setHdrVis(true);},{threshold:0.1});
    if(headerRef.current)obs.observe(headerRef.current);
    return()=>obs.disconnect();
  },[]);

  const filtered = activeCat==="all" ? ITEMS : ITEMS.filter(i=>i.category===activeCat);
  const accent = CAT_ACCENT[activeCat]||"#4ECDC4";
  const bg = isDarkMode?"#04040A":"#050408";

  return (
    <section id="gallery" style={{
      position:"relative",
      padding:isMobile?"48px 0 60px":isTablet?"80px 0 96px":"104px 0 128px",
      background:bg, color:"white",
      fontFamily:"'Syne',system-ui,sans-serif",
      overflow:"hidden", transition:"background 0.8s", isolation:"isolate",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
        *,*::before,*::after{box-sizing:border-box;}
        @keyframes blobDrift{0%,100%{transform:translateY(0) scale(1) rotate(0deg);}33%{transform:translateY(-28px) scale(1.07) rotate(3deg);}66%{transform:translateY(-10px) scale(0.96) rotate(-3deg);}}
        @keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}
        @keyframes shimmer{0%{background-position:-200% center;}100%{background-position:200% center;}}
        @keyframes particleRise{0%{transform:translateY(0);opacity:0;}8%{opacity:1;}92%{opacity:0.5;}100%{transform:translateY(-110vh);opacity:0;}}
        @keyframes filterIn{from{opacity:0;transform:translateX(-8px);}to{opacity:1;transform:translateX(0);}}
        .shimmer-text{
          background:linear-gradient(100deg,rgba(255,255,255,0.9) 20%,rgba(255,255,255,0.32) 50%,rgba(255,255,255,0.9) 80%);
          background-size:200% auto;animation:shimmer 5s linear infinite;
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
        }
        .filter-row{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none;}
        .filter-row::-webkit-scrollbar{display:none;}
      `}</style>

      {/* Blobs */}
      <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden",zIndex:0}}>
        {[
          {top:"-10%",left:"-8%",w:500,col:"#4ECDC4",dur:18,delay:0},
          {top:"25%",right:"-8%",w:420,col:"#FF6B8A",dur:22,delay:4},
          {bottom:"-5%",left:"30%",w:380,col:"#FFB347",dur:16,delay:8},
          {top:"55%",left:"-5%",w:300,col:"#A78BFA",dur:20,delay:2},
        ].map((b,i)=>(
          <div key={i} style={{position:"absolute",...b,width:isMobile?b.w*0.5:b.w,height:isMobile?b.w*0.5:b.w,borderRadius:"50%",background:`radial-gradient(circle,${b.col}1A 0%,transparent 68%)`,filter:"blur(90px)",animation:`blobDrift ${b.dur}s ease-in-out infinite ${b.delay}s`}}/>
        ))}
        <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",backgroundSize:"60px 60px",maskImage:"radial-gradient(ellipse at 50% 50%,black 40%,transparent 80%)"}}/>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 50%,transparent 50%,rgba(0,0,0,0.7) 100%)"}}/>
      </div>

      {/* Particles */}
      <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden",zIndex:0}}>
        {PARTICLES.map(p=>(
          <div key={p.id} style={{position:"absolute",left:`${p.x}%`,bottom:"-20px",width:p.size,height:p.size,borderRadius:"50%",background:p.color,opacity:p.opacity,animation:`particleRise ${p.dur}s ${p.delay}s ease-in infinite`}}/>
        ))}
      </div>

      <div style={{maxWidth:1360,margin:"0 auto",padding:isMobile?"0 16px":isTablet?"0 20px":"0 32px",position:"relative",zIndex:2}}>

        {/* HEADER */}
        <div ref={headerRef} style={{marginBottom:isMobile?20:isTablet?36:52}}>
          <div style={{
            display:"flex",flexWrap:"wrap",alignItems:"flex-end",justifyContent:"space-between",
            gap:isMobile?12:16,
            opacity:headerVis?1:0,transform:headerVis?"translateY(0)":"translateY(24px)",
            transition:"opacity 0.8s ease,transform 0.9s cubic-bezier(0.22,1,0.36,1)",
          }}>
            {/* Left */}
            <div>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:isMobile?10:14}}>
                <div style={{width:isMobile?22:30,height:2,background:"linear-gradient(90deg,#4ECDC4,#FF6B8A,#FFB347)",borderRadius:2,boxShadow:"0 0 12px rgba(78,205,196,0.5)"}}/>
                <span style={{fontSize:"clamp(7px,2vw,9px)",fontWeight:800,letterSpacing:"0.28em",textTransform:"uppercase",color:"rgba(255,255,255,0.35)",fontFamily:"'DM Sans',sans-serif"}}>{t.eyebrow}</span>
                <div style={{width:4,height:4,borderRadius:"50%",background:"linear-gradient(135deg,#FF6B8A,#4ECDC4)"}}/>
              </div>
              <h2 className="shimmer-text" style={{
                fontSize:isMobile
                  ?"clamp(26px,7.5vw,34px)"
                  :isTablet
                    ?"clamp(38px,7vw,56px)"
                    :"clamp(56px,5.5vw,88px)",
                fontWeight:900,lineHeight:0.85,letterSpacing:"-0.04em",
                textTransform:"uppercase",fontStyle:"italic",margin:0,
              }}>{t.heading}</h2>
              <div style={{display:"flex",alignItems:"center",gap:10,marginTop:isMobile?8:14,opacity:headerVis?1:0,transition:"opacity 0.8s ease 0.35s"}}>
                <div style={{height:1,width:isMobile?44:72,background:"linear-gradient(90deg,rgba(255,255,255,0.4),transparent)"}}/>
                <span style={{fontSize:8,opacity:0.22,letterSpacing:"0.18em"}}>✦ ✦ ✦</span>
              </div>
            </div>

            {/* Right — hides on very narrow mobile */}
            {!isMobile&&(
              <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:12,opacity:headerVis?1:0,transform:headerVis?"translateY(0)":"translateY(24px)",transition:"opacity 0.8s ease 0.12s,transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.12s"}}>
                <p style={{fontSize:"clamp(10px,2vw,12px)",lineHeight:1.75,margin:0,textAlign:"right",color:"rgba(255,255,255,0.38)",maxWidth:190,fontFamily:"'DM Sans',sans-serif",fontStyle:"italic"}}>{t.subheading}</p>
                <button style={{
                  padding:"8px 18px",borderRadius:100,background:"transparent",
                  border:"1px solid rgba(255,255,255,0.18)",color:"rgba(255,255,255,0.65)",
                  fontSize:"clamp(8px,1.8vw,9px)",fontWeight:700,letterSpacing:"0.2em",
                  textTransform:"uppercase",cursor:"pointer",display:"flex",alignItems:"center",gap:8,
                  backdropFilter:"blur(10px)",transition:"all 0.25s ease",fontFamily:"'Syne',sans-serif",
                }}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.08)";e.currentTarget.style.color="white";e.currentTarget.style.borderColor="rgba(255,255,255,0.45)";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="rgba(255,255,255,0.65)";e.currentTarget.style.borderColor="rgba(255,255,255,0.18)";}}
                >
                  <span style={{width:5,height:5,borderRadius:"50%",background:"linear-gradient(135deg,#4ECDC4,#FF6B8A)",display:"inline-block",flexShrink:0}}/>
                  {t.cta}
                </button>
              </div>
            )}
          </div>

          {/* FILTER BAR */}
          <div style={{marginTop:isMobile?14:22,opacity:headerVis?1:0,transition:"opacity 0.8s ease 0.22s"}}>
            <div className="filter-row">
              {CATS.map(cat=>(
                <FilterPill
                  key={cat.id}
                  label={cat.label}
                  active={activeCat===cat.id}
                  accent={CAT_ACCENT[cat.id]}
                  onClick={()=>setActiveCat(cat.id)}
                  count={cat.id==="all"?ITEMS.length:ITEMS.filter(i=>i.category===cat.id).length}
                />
              ))}
            </div>
          </div>
        </div>

        {/* GRID */}
        <div style={{
          display:"grid",
          gridTemplateColumns:isMobile?"repeat(2,1fr)":isTablet?"repeat(2,1fr)":"repeat(4,1fr)",
          gap:isMobile?10:isTablet?14:16,
        }}>
          {filtered.map((item,i)=>(
            <GalleryCard key={item.id} item={item} index={i} isMobile={isMobile} isTablet={isTablet} onOpen={setActiveItem}/>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length===0&&(
          <div style={{textAlign:"center",padding:"48px 0",color:"rgba(255,255,255,0.25)",fontFamily:"'DM Sans',sans-serif",fontStyle:"italic",fontSize:14}}>
            No items in this category yet. ✦
          </div>
        )}

        {/* FOOTER MARQUEE */}
        <div style={{marginTop:isMobile?28:isTablet?52:68,paddingTop:isMobile?14:22,borderTop:"1px solid rgba(255,255,255,0.05)",overflow:"hidden",position:"relative"}}>
          <div style={{position:"absolute",left:0,top:0,bottom:0,width:48,background:`linear-gradient(90deg,${bg},transparent)`,zIndex:1,pointerEvents:"none"}}/>
          <div style={{position:"absolute",right:0,top:0,bottom:0,width:48,background:`linear-gradient(-90deg,${bg},transparent)`,zIndex:1,pointerEvents:"none"}}/>
          <div style={{display:"flex",whiteSpace:"nowrap",fontWeight:800,textTransform:"uppercase",letterSpacing:"0.28em",fontSize:"clamp(7px,2vw,8px)",color:"rgba(255,255,255,0.18)",animation:"marquee 28s linear infinite"}}>
            {Array(6).fill([`✦ ${t.footer}`,"🍦 Handcrafted Daily","✦ Small Batch","🍓 All Natural","✦ Artisan Made","🍫 Premium Grade","✦ Since MMXXVI"]).flat().map((label,i)=>(
              <span key={i} style={{margin:"0 24px",color:i%7===0?"rgba(245,215,110,0.35)":"rgba(255,255,255,0.18)"}}>{label}</span>
            ))}
          </div>
        </div>
      </div>

      {/* DETAIL SHEET */}
      {activeItem&&(
        <DetailSheet item={activeItem} onClose={()=>setActiveItem(null)} isMobile={isMobile} t={t}/>
      )}
    </section>
  );
};

export default Gallery;