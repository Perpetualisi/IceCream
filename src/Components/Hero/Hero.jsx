import React, { useState, useEffect, useRef } from "react";

const PremiumHero = ({ isDarkMode = false }) => {
  const flavours = [
    { id: "Sweet", name: "Berry", tagline: "Creamy Joy.", emoji: "🍓", color: "#FF4D6D", bg: "bg-[#FF4D6D]", text: "text-[#FF4D6D]" },
    { id: "Chill", name: "Vanilla", tagline: "Pure Chill.", emoji: "🍦", color: "#70A288", bg: "bg-[#70A288]", text: "text-[#70A288]" },
    { id: "Bliss", name: "Cacao", tagline: "Dark Bliss.", emoji: "🍫", color: "#4A2C2A", bg: "bg-[#4A2C2A]", text: "text-[#4A2C2A]" },
    { id: "Zest", name: "Mango", tagline: "Tropical Rush.", emoji: "🥭", color: "#FFB347", bg: "bg-[#FFB347]", text: "text-[#FFB347]" },
    { id: "Fresh", name: "Mint", tagline: "Cool Snap.", emoji: "🌿", color: "#4ECDC4", bg: "bg-[#4ECDC4]", text: "text-[#4ECDC4]" },
    { id: "Pop", name: "Melon", tagline: "Summer Pop.", emoji: "🍉", color: "#FF6B6B", bg: "bg-[#FF6B6B]", text: "text-[#FF6B6B]" }
  ];

  const [index, setIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const audioRef = useRef(null);
  const f = flavours[index];

  const popSnd = "data:audio/wav;base64,UklGRl9vT19XQVZFRm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YTdvT197e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3s=";

  const playScoopSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.2;
      audioRef.current.play().catch(() => {});
    }
  };

  useEffect(() => {
    const id = setInterval(() => {
      setIsChanging(true);
      // We don't play sound automatically anymore to follow browser autoplay policies
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % flavours.length);
        setIsChanging(false);
      }, 600);
    }, 4500);
    return () => clearInterval(id);
  }, [flavours.length]);

  return (
    <section 
      id="home" 
      className={`relative min-h-[100dvh] w-full flex flex-col items-center overflow-hidden transition-colors duration-1000 pt-[112px] lg:pt-[120px] pb-20 ${isDarkMode ? 'bg-black text-white' : 'bg-[#FFFBF2] text-[#1A1008]'}`}
    >
      
      <audio ref={audioRef} src={popSnd} preload="auto" />

      {/* BACKGROUND WATERMARK */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <h2 className={`text-[25vw] lg:text-[18vw] font-black uppercase tracking-tighter opacity-[0.04] transition-all duration-1000 transform ${isChanging ? 'scale-110 blur-xl' : 'scale-100 blur-0'}`}>
          {f.id}
        </h2>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-12">
          
          {/* EMOJI VISUAL */}
          <div className="w-full lg:w-1/2 relative flex items-center justify-center order-1 lg:order-2">
            <div className={`absolute w-48 h-48 sm:w-72 sm:h-72 lg:w-[500px] lg:h-[500px] rounded-full blur-[60px] lg:blur-[120px] opacity-40 transition-colors duration-1000 animate-pulse-slow ${f.bg}`} />
            
            <div className={`relative transition-all duration-700 flex items-center justify-center ${isChanging ? 'opacity-0 scale-50 rotate-12' : 'opacity-100 scale-100 rotate-0'}`}>
              <span className="relative z-10 text-[120px] sm:text-[180px] lg:text-[320px] drop-shadow-[0_10px_30px_rgba(0,0,0,0.1)] lg:drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)] animate-float select-none">
                {f.emoji}
              </span>
              <div className="absolute bottom-4 -right-2 lg:bottom-12 lg:-right-6 z-20 bg-white text-black px-3 py-1.5 lg:px-6 lg:py-3 rounded-xl lg:rounded-2xl font-black text-[10px] lg:text-xs shadow-2xl -rotate-6 border-2 border-black/5 uppercase tracking-tighter whitespace-nowrap">
                🔥 Hot Seller
              </div>
            </div>
          </div>

          {/* TEXT CONTENT */}
          <div className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black leading-[0.85] tracking-tighter uppercase mb-4 lg:mb-6">
              Sweet <br />
              <span className={`italic transition-colors duration-500 ${f.text}`}>Spot</span>
            </h1>
            
            <p className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-8 lg:mb-10 transition-all duration-500 ${isChanging ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}>
              {f.tagline}
            </p>

            <div className="flex flex-col items-center lg:items-start gap-6 lg:gap-8">
              <button 
                onClick={() => playScoopSound()}
                className={`${f.bg} w-full sm:w-auto text-white px-8 py-4 lg:px-10 lg:py-5 rounded-2xl font-black uppercase tracking-widest text-xs lg:text-sm flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95 transition-all shadow-2xl`}
              >
                <span>😋 Scoop Now</span>
              </button>
              
              {/* Fan Proof */}
              <div className="flex items-center gap-3 lg:gap-4 bg-white/40 backdrop-blur-xl px-3 py-1.5 lg:px-4 lg:py-2 rounded-2xl border border-black/5 shadow-sm">
                <div className="flex -space-x-3 lg:-space-x-4">
                  {[64, 65, 68].map((id, i) => (
                    <div key={i} className="relative group">
                      <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-full border-2 border-white overflow-hidden shadow-md">
                        <img src={`https://i.pravatar.cc/150?u=${id}`} alt="fan" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col pr-1 lg:pr-2 text-left">
                    <span className="text-[9px] lg:text-[11px] font-black uppercase tracking-widest leading-none">+2k Fans</span>
                    <span className="text-[8px] lg:text-[9px] opacity-60 font-bold">Obsessed.</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER MARQUEE */}
      <div className="absolute bottom-0 w-full overflow-hidden border-t border-black/5 py-4 lg:py-6">
        <div className="flex whitespace-nowrap animate-marquee font-black uppercase tracking-[0.3em] lg:tracking-[0.5em] text-[8px] lg:text-[10px] opacity-30">
          <span className="mx-6 lg:mx-12">🍦 Zero Guilt</span>
          <span className="mx-6 lg:mx-12">🍓 Fresh Berry</span>
          <span className="mx-6 lg:mx-12">🍫 Dark Cacao</span>
          <span className="mx-6 lg:mx-12">🍨 Handmade Daily</span>
          <span className="mx-6 lg:mx-12">🥭 Mango Rush</span>
          <span className="mx-6 lg:mx-12">🌿 Mint Cool</span>
          <span className="mx-6 lg:mx-12">🍉 Summer Pop</span>
          <span className="mx-6 lg:mx-12">🍦 Zero Guilt</span>
          <span className="mx-6 lg:mx-12">🍓 Fresh Berry</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(5deg); } }
        @keyframes pulse-slow { 0%, 100% { transform: scale(1); opacity: 0.3; } 50% { transform: scale(1.1); opacity: 0.5; } }
        .animate-marquee { animation: marquee 20s linear infinite; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
      `}} />
    </section>
  );
};

export default PremiumHero;