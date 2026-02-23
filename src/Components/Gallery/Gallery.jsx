import React from "react";

const Gallery = ({ language = "en", isDarkMode = false }) => {
  const translations = {
    en: { 
      heading: "The Collection", 
      subheading: "A visual journey through our signature small-batch churns." 
    },
    fr: { 
      heading: "La Collection", 
      subheading: "Un voyage visuel à travers nos créations artisanales." 
    },
    es: { 
      heading: "La Colección", 
      subheading: "Un viaje visual por nuestros lotes maestros de helado." 
    },
  };

  const images = [
    { src: "/flavoursjsx/vanilla.jpg", alt: "Vanilla Bean Scoop", label: "Madagascar Bean" },
    { src: "/images/hero.jpg", alt: "Chocolate Ganache", label: "Velvet Cocoa" },
    { src: "/flavoursjsx/strawberry.jpg", alt: "Field Strawberry", label: "Summer Churn" },
    { src: "/flavoursjsx/mango.jpg", alt: "Alphonso Mango", label: "Sun Ripened" },
    { src: "/flavoursjsx/Mintchocolate.jpg", alt: "Mint Chip Shards", label: "Cool Infusion" },
    { src: "/SpecialOffer/cake.jpg", alt: "Artisan Ice Cream Cake", label: "Layered Joy" },
    { src: "/flavoursjsx/Pistachio.jpg", alt: "Roasted Pistachio", label: "Sicilian Gold" },
    { src: "/flavoursjsx/Coffee.jpg", alt: "Cold Brew Espresso", label: "Dark Roast" },
  ];

  return (
    <section
      id="gallery"
      className={`relative py-16 md:py-24 transition-colors duration-1000 ${
        isDarkMode ? "bg-[#050505] text-white" : "bg-[#FFFBF2] text-[#1A1008]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Straight Line Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <p className="text-pink-500 font-black uppercase tracking-[0.4em] text-[10px] mb-2">
              Chilled Series
            </p>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-none border-l-8 border-pink-500 pl-6">
              {translations[language].heading}
            </h2>
          </div>
          <p className="text-base md:text-lg opacity-40 font-medium max-w-[200px] md:text-right uppercase tracking-tighter leading-tight">
            {translations[language].subheading}
          </p>
        </div>

        {/* Straight-Edge Lookbook Grid - Now in Full Color */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-current border-opacity-10">
          {images.map((image, index) => (
            <div
              key={index}
              className={`group relative aspect-square border-r border-b border-current border-opacity-10 overflow-hidden flex items-center justify-center p-6 transition-all duration-500 hover:bg-pink-500/5`}
            >
              {/* Image showing FULLY and in COLOR */}
              <img
                src={image.src}
                alt={image.alt}
                className="max-w-full max-h-full object-contain transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
              />

              {/* Minimalist Overlay Label */}
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-pink-500 text-white text-[9px] font-black uppercase px-2 py-1">
                  {image.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Closing Accent Line */}
        <div className="mt-12 flex items-center justify-center gap-4">
           <div className="h-px w-12 bg-pink-500" />
           <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30">The Finest Scoops</span>
           <div className="h-px w-12 bg-pink-500" />
        </div>
      </div>
    </section>
  );
};

export default Gallery;