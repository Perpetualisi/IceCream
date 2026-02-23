import React from 'react';

const About = ({ language = "en", isDarkMode = false }) => {
  const translations = {
    en: {
      heading: "Our Craft",
      subheading: "Redefining the art of the scoop since 2026.",
      description: "We don't just freeze cream; we curate moments. Every batch is handcrafted in small quantities using locally sourced ingredients and traditional slow-churning techniques. Excellence is found in the details—from the hand-picked vanilla beans to the 70% dark Belgian chocolate we melt into our base.",
      image: "/aboutus.jpg"
    },
    fr: {
      heading: "Notre Art",
      subheading: "L'art de la boule artisanale depuis 2026.",
      description: "Nous ne nous contentons pas de congeler de la crème ; nous créons des souvenirs. Chaque lot est fabriqué à la main en petites quantités, avec des ingrédients locaux et des techniques de barattage lent traditionnelles. L'excellence se cache dans les détails.",
      image: "/aboutus.jpg"
    },
    es: {
      heading: "Nuestra Arte",
      subheading: "Redefiniendo el helado artesanal desde 2026.",
      description: "No solo congelamos crema; curamos momentos. Cada lote se elabora a mano en pequeñas cantidades utilizando ingredientes locales y técnicas tradicionales de batido lento. La excelencia se encuentra en los detalles.",
      image: "/aboutus.jpg"
    }
  };

  const content = translations[language];

  return (
    <section
      id="about"
      className={`relative py-16 md:py-24 overflow-hidden transition-colors duration-1000 ${
        isDarkMode ? 'bg-[#050505] text-white' : 'bg-[#FFFBF2] text-[#1A1008]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          
          {/* Image Side - Styled to show image FULLY */}
          <div className="flex-1 w-full flex justify-center items-center">
            <div className={`relative p-4 rounded-[2.5rem] border-2 ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-black/5 bg-white/50'}`}>
              <div className="overflow-hidden rounded-[2rem] shadow-2xl">
                <img
                  src={content.image}
                  alt="Our Craft"
                  className="w-full h-auto max-h-[500px] object-contain block transition-transform duration-700 hover:scale-105"
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-4 -left-4 bg-pink-500 text-white px-6 py-3 rounded-2xl shadow-xl transform -rotate-3 hidden md:block">
                <p className="text-[10px] font-black uppercase tracking-widest">Handmade with</p>
                <p className="text-xl font-black italic uppercase">Pure Love</p>
              </div>
            </div>
          </div>

          {/* Text Side - Shorter and Punchier */}
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <span className="text-pink-500 font-black uppercase tracking-[0.3em] text-[10px]">
                Artisanal Quality
              </span>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">
                {content.heading}
              </h2>
            </div>

            <div className="h-1 w-16 bg-pink-500 rounded-full" />

            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold opacity-90 leading-tight italic">
                {content.subheading}
              </h3>
              <p className="text-base md:text-lg opacity-70 leading-relaxed font-medium max-w-xl">
                {content.description}
              </p>
            </div>

            {/* Signature Area */}
            <div className="pt-6 border-t border-current opacity-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-pink-500 bg-gray-300 overflow-hidden">
                    {/* You can put founder headshots here */}
                    <div className="w-full h-full bg-pink-100 flex items-center justify-center text-[10px] font-bold text-pink-500 italic">S{i}</div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Meet our master scoopers</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;