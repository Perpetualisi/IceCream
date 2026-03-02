import React, { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────
   TRANSLATIONS
──────────────────────────────────────────────────────────────────*/
const translations = {
  en: {
    eyebrow: "Find Us",
    heading: "Visit Our\nParlor",
    subheading: "The magic happens here. Come grab a scoop.",
    city: "New York Flagship",
    address: "123 Sweet Street, Ice Cream City, NY 10001",
    phone: "+1 (555) 456-7890",
    hours: "Mon – Sat, 9 AM – 10 PM",
    mapBtn: "Open in Google Maps",
    addrLabel: "Address",
    phoneLabel: "Phone",
    hoursLabel: "Hours",
  },
  fr: {
    eyebrow: "Nous Trouver",
    heading: "Visitez Notre\nSalon",
    subheading: "La magie opère ici. Venez chercher une boule !",
    city: "Boutique New York",
    address: "123 rue Sweet, Ice Cream City, NY 10001",
    phone: "+1 (555) 456-7890",
    hours: "Lun – Sam, 9h – 22h",
    mapBtn: "Ouvrir Google Maps",
    addrLabel: "Adresse",
    phoneLabel: "Téléphone",
    hoursLabel: "Horaires",
  },
  es: {
    eyebrow: "Encuéntranos",
    heading: "Visita Nuestra\nHeladería",
    subheading: "La magia ocurre aquí. ¡Ven por una bola!",
    city: "Tienda de Nueva York",
    address: "123 Calle Dulce, Ice Cream City, NY 10001",
    phone: "+1 (555) 456-7890",
    hours: "Lun – Sáb, 9AM – 10PM",
    mapBtn: "Abrir en Google Maps",
    addrLabel: "Dirección",
    phoneLabel: "Teléfono",
    hoursLabel: "Horario",
  },
};

const MAP_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968459391!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480293%3A0x5117f70619940334!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1625500000000!5m2!1sen!2sus";
const MAP_URL   = "https://maps.google.com/?q=Times+Square,New+York,NY";

/* ─── Info row ───────────────────────────────────────────────────*/
const InfoRow = ({ label, value, accent, icon, visible, delay }) => (
  <div style={{
    display: "flex", flexDirection: "column", gap: 5,
    opacity:   visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(14px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
  }}>
    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
      <span style={{ fontSize:12 }}>{icon}</span>
      <span style={{
        fontSize:8, fontWeight:800, letterSpacing:"0.26em",
        textTransform:"uppercase", color: accent,
        fontFamily:"'DM Sans',sans-serif",
      }}>{label}</span>
    </div>
    <span style={{
      fontSize:"clamp(12px,3vw,14px)", fontWeight:600,
      color:"rgba(255,255,255,0.78)",
      fontFamily:"'DM Sans',sans-serif", lineHeight:1.4,
    }}>{value}</span>
  </div>
);

/* ─── Main Locations ─────────────────────────────────────────────*/
const Locations = ({ language = "en", isDarkMode = false }) => {
  const t = translations[language] || translations.en;

  const [isMobile, setMobile]     = useState(false);
  const [isTablet, setTablet]     = useState(false);
  const [headerVis, setHeaderVis] = useState(false);
  const [cardVis,   setCardVis]   = useState(false);
  const [mapVis,    setMapVis]    = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [btnHover,  setBtnHover]  = useState(false);

  const headerRef = useRef(null);
  const cardRef   = useRef(null);
  const mapRef    = useRef(null);

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
    const obs = (setter) => new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setter(true); }, { threshold: 0.08 }
    );
    const o1 = obs(setHeaderVis);
    const o2 = obs(setCardVis);
    const o3 = obs(setMapVis);
    if (headerRef.current) o1.observe(headerRef.current);
    if (cardRef.current)   o2.observe(cardRef.current);
    if (mapRef.current)    o3.observe(mapRef.current);
    return () => { o1.disconnect(); o2.disconnect(); o3.disconnect(); };
  }, []);

  const bg = isDarkMode ? "#04040A" : "#050408";

  return (
    <section
      id="locations"
      style={{
        position: "relative",
        background: bg,
        color: "white",
        padding: isMobile ? "48px 0 64px" : isTablet ? "96px 0 112px" : "112px 0 136px",
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
          33%      { transform: translateY(-26px) scale(1.06) rotate(3deg); }
          66%      { transform: translateY(-10px) scale(0.95) rotate(-3deg); }
        }
        @keyframes marqueeLocations {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes shimmerLoc {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes floatStar {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50%     { transform: translateY(-10px) rotate(14deg); }
        }
        @keyframes pingDot {
          0%   { transform: scale(1); opacity: 0.9; }
          70%  { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes mapReveal {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }

        .loc-shimmer {
          background: linear-gradient(100deg,
            rgba(255,255,255,0.92) 20%,
            rgba(255,255,255,0.28) 50%,
            rgba(255,255,255,0.92) 80%
          );
          background-size: 200% auto;
          animation: shimmerLoc 6s linear infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* ── Ambient blobs ── */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden", zIndex:0 }}>
        {[
          { top:"-12%",   left:"-6%",  w:460, col:"#FF6B8A", dur:20, delay:0  },
          { top:"40%",    right:"-8%", w:380, col:"#4ECDC4", dur:23, delay:6  },
          { bottom:"-8%", left:"26%",  w:340, col:"#FFB347", dur:17, delay:11 },
          { top:"22%",    left:"44%",  w:260, col:"#A78BFA", dur:21, delay:3  },
        ].map((b, i) => (
          <div key={i} style={{
            position: "absolute", ...b,
            width:  isMobile ? b.w * 0.5 : b.w,
            height: isMobile ? b.w * 0.5 : b.w,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${b.col}1C 0%, transparent 70%)`,
            filter: "blur(88px)",
            animation: `blobDrift ${b.dur}s ease-in-out infinite ${b.delay}s`,
          }}/>
        ))}
        <div style={{
          position:"absolute", inset:0,
          backgroundImage:"linear-gradient(rgba(255,255,255,0.016) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.016) 1px,transparent 1px)",
          backgroundSize:"60px 60px",
          maskImage:"radial-gradient(ellipse at 50% 50%, black 40%, transparent 80%)",
        }}/>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(0,0,0,0.65) 100%)" }}/>
      </div>

      {/* Noise grain */}
      <div style={{
        position:"absolute", inset:0, zIndex:1, pointerEvents:"none",
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        opacity:0.044, mixBlendMode:"overlay",
      }}/>

      {/* Floating stars */}
      {!isMobile && [
        { top:"10%", left:"3%",   size:13, delay:"0s",   col:"#F5D76E" },
        { top:"20%", right:"4%",  size:10, delay:"1.1s", col:"#FF6B8A" },
        { top:"72%", left:"5%",   size:11, delay:"2.2s", col:"#4ECDC4" },
        { top:"80%", right:"5%",  size:13, delay:"0.6s", col:"#A78BFA" },
      ].map((s, i) => (
        <div key={i} style={{
          position:"absolute", ...s, color:s.col, fontSize:s.size,
          opacity:0.38, animation:`floatStar ${3.5+i*0.7}s ease-in-out infinite ${s.delay}`,
          zIndex:1, pointerEvents:"none",
        }}>✦</div>
      ))}

      {/* Decorative spinning ring — desktop */}
      {!isMobile && (
        <div style={{
          position:"absolute", left:"-5%", bottom:"10%",
          width:320, height:320, borderRadius:"50%",
          border:"1px dashed rgba(78,205,196,0.1)",
          animation:"spinSlow 48s linear infinite",
          zIndex:0, pointerEvents:"none",
        }}>
          {[0,120,240].map((deg,i)=>(
            <div key={i} style={{
              position:"absolute", top:"50%", left:"50%",
              width:5, height:5, borderRadius:"50%",
              background:["#4ECDC4","#F5D76E","#FF6B8A"][i],
              boxShadow:`0 0 8px ${["#4ECDC4","#F5D76E","#FF6B8A"][i]}`,
              transform:`rotate(${deg}deg) translateX(160px) translate(-50%,-50%)`,
              opacity:0.55,
            }}/>
          ))}
        </div>
      )}

      <div style={{
        maxWidth:1280, margin:"0 auto",
        padding: isMobile?"0 16px":isTablet?"0 24px":"0 48px",
        position:"relative", zIndex:2,
      }}>

        {/* ── Marquee ── */}
        <div style={{
          marginBottom: isMobile?32:52,
          paddingBottom: isMobile?12:20,
          borderBottom:"1px solid rgba(255,255,255,0.05)",
          overflow:"hidden", position:"relative",
        }}>
          <div style={{position:"absolute",left:0,top:0,bottom:0,width:36,background:`linear-gradient(90deg,${bg},transparent)`,zIndex:1,pointerEvents:"none"}}/>
          <div style={{position:"absolute",right:0,top:0,bottom:0,width:36,background:`linear-gradient(-90deg,${bg},transparent)`,zIndex:1,pointerEvents:"none"}}/>
          <div style={{
            display:"flex", whiteSpace:"nowrap", fontWeight:800,
            textTransform:"uppercase", letterSpacing:"0.26em",
            fontSize:"clamp(7px,2vw,8px)", color:"rgba(255,255,255,0.16)",
            animation:"marqueeLocations 30s linear infinite",
          }}>
            {Array(8).fill(["✦ New York City","📍 Times Square","✦ Now Open","🍦 Come Visit","✦ NYC Flagship","🍓 Find Us Here"]).flat().map((l,i)=>(
              <span key={i} style={{margin:"0 20px",color:i%6===0?"rgba(245,215,110,0.32)":"rgba(255,255,255,0.16)"}}>{l}</span>
            ))}
          </div>
        </div>

        {/* ── Header ── */}
        <div
          ref={headerRef}
          style={{
            marginBottom: isMobile?24:56,
            display:"flex", flexDirection: isMobile?"column":isTablet?"column":"row",
            alignItems: isMobile||isTablet?"flex-start":"flex-end",
            justifyContent:"space-between",
            gap: isMobile?16:24,
            opacity:   headerVis?1:0,
            transform: headerVis?"translateY(0)":"translateY(28px)",
            transition:"opacity 0.8s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div>
            {/* Eyebrow */}
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom: isMobile?10:14}}>
              <div style={{width:26,height:2,background:"linear-gradient(90deg,#FF6B8A,#4ECDC4)",borderRadius:2,boxShadow:"0 0 12px rgba(255,107,138,0.5)",flexShrink:0}}/>
              <span style={{fontSize:"clamp(8px,2.2vw,9px)",fontWeight:800,letterSpacing:"0.3em",textTransform:"uppercase",color:"rgba(255,255,255,0.35)",fontFamily:"'DM Sans',sans-serif"}}>{t.eyebrow}</span>
              <div style={{width:4,height:4,borderRadius:"50%",background:"linear-gradient(135deg,#FF6B8A,#4ECDC4)",flexShrink:0}}/>
            </div>
            <h2 className="loc-shimmer" style={{
              fontSize: isMobile ? "clamp(28px,8vw,36px)" : isTablet ? "clamp(44px,8vw,72px)" : "clamp(56px,6vw,104px)",
              fontWeight:900, lineHeight:0.88,
              letterSpacing:"-0.03em", textTransform:"uppercase",
              fontStyle:"italic", margin:0,
              whiteSpace:"pre-line",
            }}>{t.heading}</h2>
          </div>

          <p style={{
            maxWidth:280, fontSize: isMobile ? "clamp(12px,3.5vw,14px)" : "clamp(13px,2vw,16px)",
            color:"rgba(255,255,255,0.45)",
            fontFamily:"'DM Sans',sans-serif", fontStyle:"italic",
            lineHeight:1.65, margin:0,
          }}>{t.subheading}</p>
        </div>

        {/* ── Main grid: info card + map ── */}
        <div style={{
          display:"grid",
          gridTemplateColumns: isMobile?"1fr":isTablet?"1fr":"1fr 2fr",
          gap: isMobile?20:isTablet?20:28,
          alignItems:"stretch",
        }}>

          {/* ════ INFO CARD ════ */}
          <div
            ref={cardRef}
            style={{
              borderRadius:24,
              background:"linear-gradient(160deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))",
              border:"1px solid rgba(255,255,255,0.1)",
              backdropFilter:"blur(14px)",
              padding: isMobile?"22px 20px":"32px 28px",
              position:"relative", overflow:"hidden",
              boxShadow:"0 24px 56px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.05)",
              display:"flex", flexDirection:"column", justifyContent:"space-between",
              gap: isMobile?16:24,
              opacity:   cardVis?1:0,
              transform: cardVis?"translateX(0)":"translateX(-28px)",
              transition:"opacity 0.9s ease, transform 1s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {/* Noise */}
            <div style={{
              position:"absolute",inset:0,borderRadius:24,pointerEvents:"none",
              backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              opacity:0.04, mixBlendMode:"overlay",
            }}/>
            {/* Top accent */}
            <div style={{
              position:"absolute",top:0,left:"12%",right:"12%",height:2,borderRadius:2,
              background:"linear-gradient(90deg,transparent,#FF6B8A,#4ECDC4,transparent)",
              boxShadow:"0 0 18px rgba(255,107,138,0.35)",
            }}/>
            {/* Corner glow */}
            <div style={{
              position:"absolute",top:0,left:0,right:0,bottom:0,borderRadius:24,pointerEvents:"none",
              background:"radial-gradient(ellipse at 20% 0%, rgba(255,107,138,0.1), transparent 55%)",
            }}/>
            {/* Inner rim */}
            <div style={{
              position:"absolute",inset:0,borderRadius:24,pointerEvents:"none",
              boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.06)",
            }}/>

            <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",gap:20}}>
              {/* City pill + live dot */}
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{
                  padding:"4px 12px",borderRadius:100,
                  background:"rgba(255,107,138,0.12)",
                  border:"1px solid rgba(255,107,138,0.3)",
                  display:"flex",alignItems:"center",gap:8,
                }}>
                  {/* Ping dot */}
                  <div style={{position:"relative",width:7,height:7,flexShrink:0}}>
                    <div style={{
                      position:"absolute",inset:0,borderRadius:"50%",
                      background:"#FF6B8A",
                      animation:"pingDot 1.8s ease-out infinite",
                    }}/>
                    <div style={{
                      position:"absolute",inset:0,borderRadius:"50%",
                      background:"#FF6B8A",
                    }}/>
                  </div>
                  <span style={{fontSize:8,fontWeight:800,letterSpacing:"0.2em",textTransform:"uppercase",color:"#FF6B8A",fontFamily:"'DM Sans',sans-serif"}}>{t.city}</span>
                </div>
              </div>

              {/* Info rows */}
              <div style={{display:"flex",flexDirection:"column",gap:isMobile?16:20}}>
                <InfoRow icon="📍" label={t.addrLabel}  value={t.address} accent="#FF6B8A" visible={cardVis} delay={0.22}/>
                <div style={{height:1,background:"linear-gradient(90deg,rgba(255,255,255,0.07),transparent)"}}/>
                <InfoRow icon="📞" label={t.phoneLabel} value={t.phone}   accent="#4ECDC4" visible={cardVis} delay={0.32}/>
                <div style={{height:1,background:"linear-gradient(90deg,rgba(255,255,255,0.07),transparent)"}}/>
                <InfoRow icon="🕒" label={t.hoursLabel} value={t.hours}   accent="#F5D76E" visible={cardVis} delay={0.42}/>
              </div>
            </div>

            {/* CTA button */}
            <div style={{position:"relative",zIndex:1}}>
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={()=>setBtnHover(true)}
                onMouseLeave={()=>setBtnHover(false)}
                style={{
                  display:"flex",alignItems:"center",justifyContent:"space-between",
                  padding:"12px 14px 12px 20px",
                  borderRadius:14,
                  background: btnHover
                    ? "linear-gradient(135deg,#FF4070,#FF6B8A)"
                    : "linear-gradient(135deg,rgba(255,107,138,0.18),rgba(78,205,196,0.1))",
                  border:"1px solid rgba(255,107,138,0.4)",
                  textDecoration:"none",
                  transition:"all 0.28s cubic-bezier(0.22,1,0.36,1)",
                  boxShadow: btnHover
                    ? "0 12px 36px rgba(255,60,100,0.45), 0 0 0 1px rgba(255,255,255,0.08)"
                    : "0 4px 16px rgba(0,0,0,0.3)",
                  transform: btnHover?"translateY(-2px)":"translateY(0)",
                }}
              >
                <span style={{
                  fontSize:"clamp(8px,2vw,9px)",fontWeight:800,letterSpacing:"0.22em",
                  textTransform:"uppercase",color:"white",
                  fontFamily:"'Syne',sans-serif",
                }}>{t.mapBtn}</span>
                <div style={{
                  width:36,height:36,borderRadius:10,
                  background: btnHover?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.08)",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:16,
                  transition:"background 0.2s",
                  flexShrink:0,
                }}>📍</div>
              </a>
            </div>
          </div>

          {/* ════ MAP EMBED ════ */}
          <div
            ref={mapRef}
            style={{
              borderRadius:24,
              overflow:"hidden",
              position:"relative",
              /* min height so map is usable on all screen sizes */
              minHeight: isMobile?260:isTablet?340:420,
              border:"1px solid rgba(255,255,255,0.08)",
              boxShadow:"0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
              opacity:   mapVis?1:0,
              transform: mapVis?"translateX(0) scale(1)":"translateX(24px) scale(0.97)",
              transition:"opacity 0.95s ease 0.12s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.12s",
              background:"#0A0A0A",
            }}
          >
            {/* Loading skeleton */}
            {!mapLoaded && (
              <div style={{
                position:"absolute",inset:0,
                background:"linear-gradient(160deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))",
                display:"flex",alignItems:"center",justifyContent:"center",
                zIndex:2,
              }}>
                <div style={{
                  width:40,height:40,borderRadius:"50%",
                  border:"2px solid rgba(255,255,255,0.1)",
                  borderTopColor:"#FF6B8A",
                  animation:"spinSlow 1s linear infinite",
                }}/>
              </div>
            )}

            <iframe
              src={MAP_EMBED}
              width="100%"
              height="100%"
              style={{
                border:0,
                display:"block",
                minHeight: isMobile?260:isTablet?340:420,
                filter: "invert(90%) hue-rotate(180deg) brightness(90%) saturate(1.1)",
                opacity: mapLoaded?1:0,
                transition:"opacity 0.6s ease",
              }}
              allowFullScreen=""
              loading="lazy"
              title="Frostify Location"
              onLoad={()=>setMapLoaded(true)}
            />

            {/* Overlay — top gradient so map bleeds into section */}
            <div style={{
              position:"absolute",top:0,left:0,right:0,height:50,
              background:`linear-gradient(${bg},transparent)`,
              pointerEvents:"none",zIndex:3,
            }}/>
            {/* Bottom gradient */}
            <div style={{
              position:"absolute",bottom:0,left:0,right:0,height:40,
              background:`linear-gradient(transparent,${bg})`,
              pointerEvents:"none",zIndex:3,
            }}/>
            {/* Inner rim */}
            <div style={{
              position:"absolute",inset:0,borderRadius:24,
              boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.07)",
              pointerEvents:"none",zIndex:4,
            }}/>

            {/* Location pin badge overlay */}
            <div style={{
              position:"absolute",bottom:16,right:16,
              background:"rgba(5,4,8,0.82)",
              backdropFilter:"blur(12px)",
              border:"1px solid rgba(255,107,138,0.3)",
              borderRadius:14,
              padding:"8px 14px",
              display:"flex",alignItems:"center",gap:8,
              zIndex:5,
              boxShadow:"0 8px 24px rgba(0,0,0,0.4)",
            }}>
              <div style={{position:"relative",width:8,height:8,flexShrink:0}}>
                <div style={{
                  position:"absolute",inset:0,borderRadius:"50%",
                  background:"#FF6B8A",
                  animation:"pingDot 2s ease-out infinite",
                }}/>
                <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"#FF6B8A"}}/>
              </div>
              <span style={{
                fontSize:8,fontWeight:800,letterSpacing:"0.2em",
                textTransform:"uppercase",color:"rgba(255,255,255,0.7)",
                fontFamily:"'DM Sans',sans-serif",
              }}>New York, NY</span>
            </div>
          </div>
        </div>

        {/* ── Bottom brand rule ── */}
        <div style={{
          marginTop: isMobile?40:64,
          display:"flex",alignItems:"center",gap:isMobile?12:20,
          opacity: headerVis?0.18:0,
          transition:"opacity 0.8s ease 0.6s",
          overflow:"hidden",
        }}>
          <div style={{height:1,flex:1,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.4))"}}/>
          <span style={{
            fontSize:"clamp(7px,2vw,9px)",fontWeight:800,
            letterSpacing:isMobile?"0.3em":"0.8em",
            textTransform:"uppercase",
            fontFamily:"'Syne',sans-serif",
            whiteSpace:"nowrap",
          }}>✦ Frostify Artisan ✦</span>
          <div style={{height:1,flex:1,background:"linear-gradient(90deg,rgba(255,255,255,0.4),transparent)"}}/>
        </div>

        <div style={{
          marginTop: isMobile?20:28,
          height:1,
          background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)",
        }}/>
      </div>
    </section>
  );
};

export default Locations;