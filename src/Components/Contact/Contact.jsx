import React, { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────
   TRANSLATIONS
──────────────────────────────────────────────────────────────────*/
const translations = {
  en: {
    eyebrow: "Say Hello",
    heading: "Get In\nTouch",
    subheading: "A question, a craving, or just a vibe? Drop us a line.",
    namePlaceholder: "Your Name",
    emailPlaceholder: "Your Email",
    messagePlaceholder: "Your Message…",
    button: "Send Message",
    successMsg: "We got it — we'll be in touch soon. 🍦",
    info: [
      { icon: "📍", label: "Location",  value: "456 Elm Street, New York, USA",  accent: "#FF6B8A" },
      { icon: "📞", label: "Phone",     value: "+1-555-123-4567",                accent: "#4ECDC4" },
      { icon: "✉️", label: "Email",     value: "hello@frostify.com",             accent: "#F5D76E" },
      { icon: "🕒", label: "Hours",     value: "Mon – Sat, 9 AM – 6 PM",        accent: "#A78BFA" },
    ],
  },
  fr: {
    eyebrow: "Dites Bonjour",
    heading: "Entrer en\nContact",
    subheading: "Une question ou une envie ? Écrivez-nous !",
    namePlaceholder: "Votre nom",
    emailPlaceholder: "Votre e-mail",
    messagePlaceholder: "Votre message…",
    button: "Envoyer le message",
    successMsg: "Reçu ! Nous vous répondrons bientôt. 🍦",
    info: [
      { icon: "📍", label: "Adresse",  value: "456 rue Elm, New York, États-Unis", accent: "#FF6B8A" },
      { icon: "📞", label: "Téléphone",value: "+1-555-123-4567",                   accent: "#4ECDC4" },
      { icon: "✉️", label: "E-mail",   value: "hello@frostify.com",               accent: "#F5D76E" },
      { icon: "🕒", label: "Horaires", value: "Lun – Sam, 9h – 18h",              accent: "#A78BFA" },
    ],
  },
  es: {
    eyebrow: "Di Hola",
    heading: "Ponte en\nContacto",
    subheading: "¿Tienes una pregunta o un antojo? ¡Escríbenos!",
    namePlaceholder: "Tu nombre",
    emailPlaceholder: "Tu correo electrónico",
    messagePlaceholder: "Tu mensaje…",
    button: "Enviar mensaje",
    successMsg: "¡Recibido! Te responderemos pronto. 🍦",
    info: [
      { icon: "📍", label: "Ubicación", value: "456 Calle Elm, Nueva York, EE. UU.", accent: "#FF6B8A" },
      { icon: "📞", label: "Teléfono",  value: "+1-555-123-4567",                    accent: "#4ECDC4" },
      { icon: "✉️", label: "Correo",    value: "hello@frostify.com",                accent: "#F5D76E" },
      { icon: "🕒", label: "Horario",   value: "Lun – Sáb, 9AM – 6PM",             accent: "#A78BFA" },
    ],
  },
};

/* ─── Info card ──────────────────────────────────────────────────*/
const InfoCard = ({ icon, label, value, accent, index, visible }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 20,
        padding: "24px 22px",
        background: hovered
          ? `linear-gradient(160deg, ${accent}18, rgba(255,255,255,0.04))`
          : "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))",
        border: `1px solid ${hovered ? accent + "50" : "rgba(255,255,255,0.08)"}`,
        backdropFilter: "blur(10px)",
        boxShadow: hovered
          ? `0 20px 48px rgba(0,0,0,0.4), 0 0 0 1px ${accent}30, 0 0 30px ${accent}12`
          : "0 8px 24px rgba(0,0,0,0.25)",
        transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
        opacity:   visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${index * 0.08 + 0.2}s`,
      }}
    >
      {/* Accent corner glow */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2, borderRadius: "20px 20px 0 0",
        background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
        opacity: hovered ? 1 : 0.3,
        transition: "opacity 0.3s",
        boxShadow: `0 0 12px ${accent}80`,
      }}/>
      <div style={{
        position: "absolute", inset: 0, borderRadius: 20, pointerEvents: "none",
        background: `radial-gradient(ellipse at 20% 20%, ${accent}14, transparent 60%)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.35s",
      }}/>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Icon */}
        <div style={{
          fontSize: 22, marginBottom: 12,
          transform: hovered ? "scale(1.18) translateY(-2px)" : "scale(1)",
          transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          display: "inline-block",
        }}>{icon}</div>

        {/* Label */}
        <div style={{
          fontSize: 8, fontWeight: 800, letterSpacing: "0.26em",
          textTransform: "uppercase", color: accent,
          fontFamily: "'DM Sans', sans-serif",
          marginBottom: 6, opacity: 0.85,
        }}>{label}</div>

        {/* Value */}
        <div style={{
          fontSize: "clamp(12px,2.5vw,14px)", fontWeight: 600,
          color: "rgba(255,255,255,0.78)",
          fontFamily: "'DM Sans', sans-serif",
          lineHeight: 1.4,
        }}>{value}</div>
      </div>
    </div>
  );
};

/* ─── Input / Textarea ───────────────────────────────────────────*/
const Field = ({ as: Tag = "input", style: extraStyle, ...props }) => {
  const [focused, setFocused] = useState(false);
  return (
    <Tag
      {...props}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
      onBlur={(e)  => { setFocused(false); props.onBlur?.(e); }}
      style={{
        width: "100%",
        background: focused ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${focused ? "rgba(255,107,138,0.55)" : "rgba(255,255,255,0.1)"}`,
        borderRadius: 14,
        padding: Tag === "textarea" ? "16px 18px" : "15px 18px",
        color: "white",
        fontSize: "clamp(13px,2.5vw,14px)",
        fontFamily: "'DM Sans', sans-serif",
        fontStyle: "italic",
        outline: "none",
        resize: "none",
        transition: "all 0.25s ease",
        boxShadow: focused ? "0 0 0 3px rgba(255,107,138,0.14), 0 0 20px rgba(255,107,138,0.1)" : "none",
        backdropFilter: "blur(6px)",
        caretColor: "#FF6B8A",
        ...extraStyle,
      }}
    />
  );
};

/* ─── Main Contact ───────────────────────────────────────────────*/
const Contact = ({ language = "en", isDarkMode = false }) => {
  const t = translations[language] || translations.en;

  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);
  const [isMobile, setMobile] = useState(false);
  const [isTablet, setTablet] = useState(false);
  const [leftVis, setLeftVis] = useState(false);
  const [rightVis, setRightVis] = useState(false);
  const [headerVis, setHeaderVis] = useState(false);

  const leftRef   = useRef(null);
  const rightRef  = useRef(null);
  const headerRef = useRef(null);

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
    const o2 = obs(setLeftVis);
    const o3 = obs(setRightVis);
    if (headerRef.current) o1.observe(headerRef.current);
    if (leftRef.current)   o2.observe(leftRef.current);
    if (rightRef.current)  o3.observe(rightRef.current);
    return () => { o1.disconnect(); o2.disconnect(); o3.disconnect(); };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1600);
  };

  const bg = isDarkMode ? "#04040A" : "#050408";

  /* Animated send button icon */
  const [btnHover, setBtnHover] = useState(false);

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        background: bg,
        color: "white",
        padding: isMobile ? "72px 0 88px" : isTablet ? "96px 0 112px" : "112px 0 136px",
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
          33%      { transform: translateY(-26px) scale(1.07) rotate(3deg); }
          66%      { transform: translateY(-10px) scale(0.95) rotate(-3deg); }
        }
        @keyframes marqueeContact {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes shimmerContact {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes successIn {
          from { opacity: 0; transform: translateY(10px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes sendPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(255,107,138,0); }
          50%     { box-shadow: 0 0 0 10px rgba(255,107,138,0.08); }
        }
        @keyframes floatStar {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50%     { transform: translateY(-10px) rotate(14deg); }
        }

        .contact-shimmer {
          background: linear-gradient(100deg,
            rgba(255,255,255,0.92) 20%,
            rgba(255,255,255,0.28) 50%,
            rgba(255,255,255,0.92) 80%
          );
          background-size: 200% auto;
          animation: shimmerContact 6s linear infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        ::placeholder { color: rgba(255,255,255,0.28) !important; font-style: italic; }
        ::-webkit-input-placeholder { color: rgba(255,255,255,0.28); font-style: italic; }
        :-ms-input-placeholder { color: rgba(255,255,255,0.28); font-style: italic; }
      `}</style>

      {/* ── Ambient blobs ── */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden", zIndex:0 }}>
        {[
          { top:"-10%",   left:"-6%",  w:460, col:"#FF6B8A", dur:20, delay:0  },
          { top:"35%",    right:"-8%", w:400, col:"#4ECDC4", dur:24, delay:5  },
          { bottom:"-8%", left:"28%",  w:340, col:"#F5D76E", dur:17, delay:9  },
          { top:"60%",    left:"-4%",  w:260, col:"#A78BFA", dur:22, delay:3  },
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
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.016) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.016) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at 50% 50%, black 40%, transparent 80%)",
        }}/>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(0,0,0,0.65) 100%)",
        }}/>
      </div>

      {/* Noise grain */}
      <div style={{
        position:"absolute", inset:0, zIndex:1, pointerEvents:"none",
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        opacity: 0.044, mixBlendMode: "overlay",
      }}/>

      {/* Floating stars */}
      {!isMobile && [
        { top:"14%", left:"3%",   size:13, delay:"0s",   col:"#F5D76E" },
        { top:"24%", right:"4%",  size:10, delay:"1.1s", col:"#FF6B8A" },
        { top:"70%", left:"5%",   size:11, delay:"2.3s", col:"#4ECDC4" },
        { top:"80%", right:"4%",  size:13, delay:"0.6s", col:"#A78BFA" },
      ].map((s, i) => (
        <div key={i} style={{
          position:"absolute", ...s, color:s.col, fontSize:s.size,
          opacity:0.4, animation:`floatStar ${3.5+i*0.7}s ease-in-out infinite ${s.delay}`,
          zIndex:1, pointerEvents:"none",
        }}>✦</div>
      ))}

      {/* Decorative spinning ring — desktop only */}
      {!isMobile && (
        <div style={{
          position:"absolute", right:"-6%", top:"15%",
          width:380, height:380, borderRadius:"50%",
          border:"1px dashed rgba(255,107,138,0.1)",
          animation:"spinSlow 40s linear infinite",
          zIndex:0, pointerEvents:"none",
        }}>
          {[0,90,180,270].map((deg,i) => (
            <div key={i} style={{
              position:"absolute", top:"50%", left:"50%",
              width:6, height:6, borderRadius:"50%",
              background:["#FF6B8A","#4ECDC4","#F5D76E","#A78BFA"][i],
              boxShadow:`0 0 10px ${["#FF6B8A","#4ECDC4","#F5D76E","#A78BFA"][i]}`,
              transform:`rotate(${deg}deg) translateX(190px) translate(-50%,-50%)`,
              opacity:0.6,
            }}/>
          ))}
        </div>
      )}

      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: isMobile ? "0 16px" : isTablet ? "0 24px" : "0 48px",
        position: "relative", zIndex: 2,
      }}>

        {/* ── Marquee ── */}
        <div style={{
          marginBottom: isMobile ? 36 : 52,
          paddingBottom: isMobile ? 14 : 20,
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          overflow: "hidden", position: "relative",
        }}>
          <div style={{position:"absolute",left:0,top:0,bottom:0,width:40,background:`linear-gradient(90deg,${bg},transparent)`,zIndex:1,pointerEvents:"none"}}/>
          <div style={{position:"absolute",right:0,top:0,bottom:0,width:40,background:`linear-gradient(-90deg,${bg},transparent)`,zIndex:1,pointerEvents:"none"}}/>
          <div style={{
            display:"flex", whiteSpace:"nowrap", fontWeight:800,
            textTransform:"uppercase", letterSpacing:"0.26em",
            fontSize:"clamp(7px,2vw,8px)", color:"rgba(255,255,255,0.16)",
            animation:"marqueeContact 28s linear infinite",
          }}>
            {Array(8).fill(["✦ Get In Touch","🍦 We'd Love To Hear","✦ Open Every Day","📍 New York City","✦ Fast Response","🍓 Frostify HQ"]).flat().map((l,i)=>(
              <span key={i} style={{margin:"0 20px",color:i%6===0?"rgba(245,215,110,0.32)":"rgba(255,255,255,0.16)"}}>{l}</span>
            ))}
          </div>
        </div>

        {/* ── Header ── */}
        <div
          ref={headerRef}
          style={{
            textAlign:"center", marginBottom: isMobile ? 40 : 60,
            opacity:   headerVis?1:0,
            transform: headerVis?"translateY(0)":"translateY(28px)",
            transition:"opacity 0.8s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,marginBottom:16}}>
            <div style={{width:28,height:2,background:"linear-gradient(90deg,#FF6B8A,#4ECDC4)",borderRadius:2,boxShadow:"0 0 12px rgba(255,107,138,0.5)"}}/>
            <span style={{fontSize:"clamp(8px,2.2vw,9px)",fontWeight:800,letterSpacing:"0.3em",textTransform:"uppercase",color:"rgba(255,255,255,0.35)",fontFamily:"'DM Sans',sans-serif"}}>{t.eyebrow}</span>
            <div style={{width:28,height:2,background:"linear-gradient(90deg,#4ECDC4,#FF6B8A)",borderRadius:2,boxShadow:"0 0 12px rgba(78,205,196,0.5)"}}/>
          </div>

          <h2 className="contact-shimmer" style={{
            fontSize:"clamp(44px,10vw,104px)",
            fontWeight:900,lineHeight:0.84,letterSpacing:"-0.04em",
            textTransform:"uppercase",fontStyle:"italic",
            margin:"0 0 16px",whiteSpace:"pre-line",
          }}>
            {t.heading}
          </h2>

          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,marginBottom:14}}>
            <div style={{height:1,width:isMobile?36:56,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.3))"}}/>
            <span style={{fontSize:9,opacity:0.2,letterSpacing:"0.18em"}}>✦ ✦ ✦</span>
            <div style={{height:1,width:isMobile?36:56,background:"linear-gradient(90deg,rgba(255,255,255,0.3),transparent)"}}/>
          </div>

          <p style={{
            fontSize:"clamp(12px,3vw,15px)",color:"rgba(255,255,255,0.42)",
            fontFamily:"'DM Sans',sans-serif",fontStyle:"italic",margin:0,
          }}>{t.subheading}</p>
        </div>

        {/* ── Two-column layout ── */}
        <div style={{
          display:"grid",
          gridTemplateColumns: isMobile?"1fr":isTablet?"1fr":"1fr 1.3fr",
          gap: isMobile?36:isTablet?36:56,
          alignItems:"start",
        }}>

          {/* ════ INFO COLUMN ════ */}
          <div
            ref={leftRef}
            style={{
              display:"grid",
              gridTemplateColumns: isMobile?"1fr 1fr":"1fr 1fr",
              gap: isMobile?10:14,
              opacity:   leftVis?1:0,
              transform: leftVis?"translateX(0)":"translateX(-28px)",
              transition:"opacity 0.9s ease, transform 1s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {t.info.map((item, i) => (
              <InfoCard key={i} {...item} index={i} visible={leftVis}/>
            ))}

            {/* Social / CTA strip */}
            <div style={{
              gridColumn:"1/-1",
              borderRadius:20, padding:"20px 22px",
              background:"linear-gradient(135deg,rgba(255,107,138,0.1),rgba(78,205,196,0.06))",
              border:"1px solid rgba(255,107,138,0.2)",
              display:"flex",alignItems:"center",justifyContent:"space-between",
              flexWrap:"wrap",gap:12,
              opacity:   leftVis?1:0,
              transform: leftVis?"translateY(0)":"translateY(18px)",
              transition:"opacity 0.8s ease 0.38s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.38s",
            }}>
              <div>
                <div style={{fontSize:8,fontWeight:800,letterSpacing:"0.24em",textTransform:"uppercase",color:"rgba(255,255,255,0.35)",fontFamily:"'DM Sans',sans-serif",marginBottom:4}}>Follow Us</div>
                <div style={{fontSize:13,fontWeight:700,color:"rgba(255,255,255,0.65)",fontFamily:"'DM Sans',sans-serif",fontStyle:"italic"}}>@frostify.official</div>
              </div>
              <div style={{display:"flex",gap:8}}>
                {["IG","TK","FB"].map((s,i)=>(
                  <div key={i} style={{
                    width:32,height:32,borderRadius:"50%",
                    background:"rgba(255,255,255,0.07)",
                    border:"1px solid rgba(255,255,255,0.12)",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:9,fontWeight:800,color:"rgba(255,255,255,0.5)",
                    fontFamily:"'DM Sans',sans-serif",cursor:"pointer",
                    transition:"all 0.22s ease",
                  }}
                    onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,107,138,0.2)";e.currentTarget.style.color="white";e.currentTarget.style.borderColor="rgba(255,107,138,0.5)";}}
                    onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.07)";e.currentTarget.style.color="rgba(255,255,255,0.5)";e.currentTarget.style.borderColor="rgba(255,255,255,0.12)";}}
                  >{s}</div>
                ))}
              </div>
            </div>
          </div>

          {/* ════ FORM COLUMN ════ */}
          <div
            ref={rightRef}
            style={{
              opacity:   rightVis?1:0,
              transform: rightVis?"translateX(0)":"translateX(28px)",
              transition:"opacity 0.9s ease 0.1s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.1s",
            }}
          >
            <div style={{
              borderRadius:28,
              background:"linear-gradient(160deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))",
              border:"1px solid rgba(255,255,255,0.1)",
              backdropFilter:"blur(14px)",
              padding: isMobile?"24px 20px":isTablet?"32px 28px":"40px 40px",
              position:"relative",overflow:"hidden",
              boxShadow:"0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
            }}>
              {/* Noise */}
              <div style={{
                position:"absolute",inset:0,borderRadius:28,pointerEvents:"none",
                backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                opacity:0.04, mixBlendMode:"overlay",
              }}/>
              {/* Top stripe */}
              <div style={{
                position:"absolute",top:0,left:"12%",right:"12%",height:2,borderRadius:2,
                background:"linear-gradient(90deg,transparent,#FF6B8A,#4ECDC4,transparent)",
                boxShadow:"0 0 18px rgba(255,107,138,0.4)",
              }}/>
              {/* Corner glow */}
              <div style={{
                position:"absolute",top:0,left:0,right:0,bottom:0,borderRadius:28,pointerEvents:"none",
                background:"radial-gradient(ellipse at 30% 0%, rgba(255,107,138,0.1), transparent 55%)",
              }}/>
              {/* Inner rim */}
              <div style={{
                position:"absolute",inset:0,borderRadius:28,pointerEvents:"none",
                boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.06)",
              }}/>

              {sent ? (
                /* ── Success state ── */
                <div style={{
                  textAlign:"center",padding:"48px 24px",
                  animation:"successIn 0.6s cubic-bezier(0.22,1,0.36,1) both",
                  position:"relative",zIndex:1,
                }}>
                  <div style={{
                    fontSize:52,marginBottom:20,
                    filter:"drop-shadow(0 0 20px rgba(78,205,196,0.6))",
                    animation:"floatStar 2.5s ease-in-out infinite",
                    display:"inline-block",
                  }}>🍦</div>
                  <h3 style={{
                    fontSize:"clamp(20px,5vw,28px)",fontWeight:900,fontStyle:"italic",
                    letterSpacing:"-0.03em",margin:"0 0 10px",
                    background:"linear-gradient(135deg,#4ECDC4,#F5D76E)",
                    WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
                  }}>Message Sent!</h3>
                  <p style={{
                    fontSize:"clamp(13px,3vw,15px)",color:"rgba(255,255,255,0.55)",
                    fontFamily:"'DM Sans',sans-serif",fontStyle:"italic",margin:0,
                  }}>{t.successMsg}</p>
                </div>
              ) : (
                /* ── Form ── */
                <form onSubmit={handleSubmit} style={{position:"relative",zIndex:1}}>
                  {/* Form label */}
                  <div style={{
                    display:"flex",alignItems:"center",gap:10,marginBottom:24,
                  }}>
                    <div style={{width:22,height:2,background:"linear-gradient(90deg,#FF6B8A,#4ECDC4)",borderRadius:2,flexShrink:0}}/>
                    <span style={{fontSize:8,fontWeight:800,letterSpacing:"0.28em",textTransform:"uppercase",color:"rgba(255,255,255,0.3)",fontFamily:"'DM Sans',sans-serif"}}>Drop a note</span>
                  </div>

                  {/* Name + Email row */}
                  <div style={{
                    display:"grid",
                    gridTemplateColumns: isMobile?"1fr":"1fr 1fr",
                    gap:12, marginBottom:12,
                  }}>
                    <Field
                      type="text"
                      placeholder={t.namePlaceholder}
                      required
                      value={form.name}
                      onChange={e=>setForm(p=>({...p,name:e.target.value}))}
                    />
                    <Field
                      type="email"
                      placeholder={t.emailPlaceholder}
                      required
                      value={form.email}
                      onChange={e=>setForm(p=>({...p,email:e.target.value}))}
                    />
                  </div>

                  {/* Message */}
                  <Field
                    as="textarea"
                    placeholder={t.messagePlaceholder}
                    required
                    rows={isMobile?4:5}
                    value={form.message}
                    onChange={e=>setForm(p=>({...p,message:e.target.value}))}
                    style={{display:"block",marginBottom:20}}
                  />

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={sending}
                    onMouseEnter={()=>setBtnHover(true)}
                    onMouseLeave={()=>setBtnHover(false)}
                    style={{
                      width:"100%",
                      padding:"16px 28px",
                      borderRadius:14,
                      border:"none",
                      cursor: sending?"wait":"pointer",
                      fontFamily:"'Syne',sans-serif",
                      fontSize:"clamp(9px,2.2vw,10px)",
                      fontWeight:800,
                      letterSpacing:"0.24em",
                      textTransform:"uppercase",
                      color:"white",
                      display:"flex",alignItems:"center",justifyContent:"center",gap:10,
                      position:"relative",overflow:"hidden",
                      background: sending
                        ? "rgba(255,107,138,0.4)"
                        : btnHover
                          ? "linear-gradient(135deg,#FF4070,#FF6B8A,#FF9060)"
                          : "linear-gradient(135deg,#FF4878,#FF6B8A)",
                      boxShadow: sending
                        ? "none"
                        : btnHover
                          ? "0 16px 48px rgba(255,60,100,0.55), 0 0 0 1px rgba(255,255,255,0.1)"
                          : "0 8px 28px rgba(255,60,100,0.35)",
                      transform: btnHover&&!sending ? "translateY(-2px)" : "translateY(0)",
                      animation: !sending&&!btnHover ? "sendPulse 3s ease-in-out infinite" : "none",
                      transition:"all 0.25s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    {/* Shimmer overlay */}
                    {btnHover && !sending && (
                      <div style={{
                        position:"absolute",inset:0,
                        background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)",
                        backgroundSize:"200% 100%",
                        animation:"shimmerContact 1.2s linear infinite",
                        pointerEvents:"none",
                      }}/>
                    )}

                    {sending ? (
                      <>
                        <div style={{
                          width:14,height:14,borderRadius:"50%",
                          border:"2px solid rgba(255,255,255,0.3)",
                          borderTopColor:"white",
                          animation:"spinSlow 0.8s linear infinite",
                          flexShrink:0,
                        }}/>
                        Sending…
                      </>
                    ) : (
                      <>
                        <span style={{
                          display:"inline-block",
                          transform: btnHover ? "translateX(3px)" : "translateX(0)",
                          transition:"transform 0.22s ease",
                        }}>✦</span>
                        {t.button}
                        <span style={{
                          display:"inline-block",fontSize:16,
                          transform: btnHover ? "translateX(4px) rotate(10deg)" : "translateX(0) rotate(0deg)",
                          transition:"transform 0.28s cubic-bezier(0.34,1.56,0.64,1)",
                        }}>🍦</span>
                      </>
                    )}
                  </button>

                  {/* Privacy note */}
                  <p style={{
                    textAlign:"center",marginTop:14,
                    fontSize:"clamp(9px,2vw,10px)",color:"rgba(255,255,255,0.22)",
                    fontFamily:"'DM Sans',sans-serif",fontStyle:"italic",
                  }}>We'll never share your info. Ever. 🔒</p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom rule */}
        <div style={{
          marginTop: isMobile?52:80,
          height:1,
          background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)",
        }}/>
      </div>
    </section>
  );
};

export default Contact;