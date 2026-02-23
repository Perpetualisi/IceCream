import React from "react";

const Flavours = ({ language = "en", isDarkMode = false }) => {
  const translations = {
    en: {
      heading: "Artisanal Scoops",
      subheading: "Curated joy, handmade daily.",
      flavours: {
        1: { name: "Vanilla", description: "Madagascar bean infused cream.", image: "/flavoursjsx/vanilla.jpg", badge: "Classic" },
        2: { name: "Chocolate", description: "70% Dark Belgian cocoa bliss.", image: "/images/hero.jpg", badge: "Rich" },
        3: { name: "Strawberry", description: "Hand-picked field strawberries.", image: "/flavoursjsx/strawberry.jpg", badge: "Fresh" },
        4: { name: "Mango", description: "Alphonso mango sun-ripened puree.", image: "/flavoursjsx/mango.jpg", badge: "Exotic" },
        5: { name: "Coffee", description: "Cold-brewed Arabica essence.", image: "/flavoursjsx/Coffee.jpg", badge: "Bold" },
        6: { name: "Mint Chip", description: "Garden mint with organic shards.", image: "/flavoursjsx/Mintchocolate.jpg", badge: "Cool" },
        7: { name: "Pistachio", description: "Roasted Sicilian pistachio paste.", image: "/flavoursjsx/Pistachio.jpg", badge: "Premium" },
        8: { name: "Cookies", description: "House-made charcoal cocoa snaps.", image: "/flavoursjsx/cookies.jpg", badge: "Crunchy" },
      }
    },
    fr: {
      heading: "Boules Artisanales",
      subheading: "Bonheur fait main chaque jour.",
      flavours: {
        1: { name: "Vanille", description: "Crème infusée à la vanille.", image: "/flavoursjsx/vanilla.jpg", badge: "Classique" },
        2: { name: "Chocolat", description: "Bonheur au cacao belge 70%.", image: "/images/hero.jpg", badge: "Riche" },
        3: { name: "Fraise", description: "Fraises des champs.", image: "/flavoursjsx/strawberry.jpg", badge: "Frais" },
        4: { name: "Mangue", description: "Purée de mangue Alphonso.", image: "/flavoursjsx/mango.jpg", badge: "Exotique" },
        5: { name: "Café", description: "Essence d'Arabica infusée à froid.", image: "/flavoursjsx/Coffee.jpg", badge: "Corsé" },
        6: { name: "Menthe", description: "Menthe du jardin et éclats bio.", image: "/flavoursjsx/Mintchocolate.jpg", badge: "Frais" },
        7: { name: "Pistache", description: "Pistache de Sicile torréfiée.", image: "/flavoursjsx/Pistachio.jpg", badge: "Premium" },
        8: { name: "Cookies", description: "Biscuits au cacao faits maison.", image: "/flavoursjsx/cookies.jpg", badge: "Croquant" },
      }
    },
    es: {
      heading: "Bolas Artesanales",
      subheading: "Alegría hecha a mano a diario.",
      flavours: {
        1: { name: "Vainilla", description: "Crema de vainilla Madagascar.", image: "/flavoursjsx/vanilla.jpg", badge: "Clásico" },
        2: { name: "Chocolate", description: "Delicia de cacao belga al 70%.", image: "/images/hero.jpg", badge: "Rico" },
        3: { name: "Fresa", description: "Fresas de campo frescas.", image: "/flavoursjsx/strawberry.jpg", badge: "Fresco" },
        4: { name: "Mango", description: "Puré de mango madurado al sol.", image: "/flavoursjsx/mango.jpg", badge: "Exótico" },
        5: { name: "Café", description: "Esencia de café Arabica.", image: "/flavoursjsx/Coffee.jpg", badge: "Fuerte" },
        6: { name: "Menta", description: "Menta fresca con trozos.", image: "/flavoursjsx/Mintchocolate.jpg", badge: "Fresco" },
        7: { name: "Pistacho", description: "Pasta de pistacho siciliano.", image: "/flavoursjsx/Pistachio.jpg", badge: "Premium" },
        8: { name: "Galletas", description: "Cacao hecho en casa.", image: "/flavoursjsx/cookies.jpg", badge: "Crujiente" },
      }
    }
  };

  const flavourIds = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <section
      id="flavours"
      className={`relative py-16 md:py-20 transition-colors duration-1000 ${
        isDarkMode ? "bg-[#050505] text-white" : "bg-[#FFFBF2] text-[#1A1008]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Compact Editorial Header */}
        <div className="text-center md:text-left mb-10 md:mb-14">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-[0.9] mb-2">
            {translations[language].heading}
          </h2>
          <p className="text-sm md:text-lg opacity-60 font-medium tracking-tight">
            {translations[language].subheading}
          </p>
        </div>

        {/* Tightened Flavours Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {flavourIds.map((id, index) => {
            const flavour = translations[language].flavours[id];
            return (
              <div
                key={id}
                style={{ animationDelay: `${index * 50}ms` }}
                className="group relative h-[320px] rounded-3xl overflow-hidden cursor-pointer animate-fadeIn shadow-lg bg-[#111]"
              >
                {/* Full Image Display */}
                <img
                  src={flavour.image}
                  alt={flavour.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
                
                {/* Subtle Overlay (only bottom) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300" />
                
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/10 backdrop-blur-md text-white text-[9px] font-black uppercase px-3 py-1 rounded-full border border-white/20">
                    {flavour.badge}
                  </span>
                </div>

                {/* Content Area */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter transform group-hover:-translate-y-1 transition-transform duration-300">
                    {flavour.name}
                  </h3>
                  
                  {/* Slide Description */}
                  <div className="h-0 group-hover:h-8 overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100 mt-1">
                    <p className="text-white/80 text-[11px] font-medium leading-tight line-clamp-2">
                      {flavour.description}
                    </p>
                  </div>

                  <div className="mt-3 h-1 w-8 bg-pink-500 rounded-full transition-all duration-500 group-hover:w-full" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s cubic-bezier(0.2, 1, 0.3, 1) forwards;
        }
      `}} />
    </section>
  );
};

export default Flavours;