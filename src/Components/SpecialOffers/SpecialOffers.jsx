import React, { useState } from 'react';

const SpecialOffers = ({ language = 'en', isDarkMode = false }) => {
  const translations = {
    en: {
      heading: "Exclusive Deals",
      description: "Small-batch indulgence at irresistible prices. Discover our seasonal highlights.",
      offers: [
        { id: 1, title: "50% Off Sundaes", description: "Half-price on all handcrafted Chocolate Sundaes. Limited time churn.", image: "/SpecialOffer/chocolate.jpg", tag: "50% OFF" },
        { id: 2, title: "Double the Scoop", description: "Buy one Vanilla Bean Cone and get the second on the house.", image: "/SpecialOffer/vanilla.jpg", tag: "BOGO" },
        { id: 3, title: "Artisan Cake Deal", description: "Enjoy 20% off our layered Ice Cream Cakes. Perfect for celebrations.", image: "/SpecialOffer/cake.jpg", tag: "-20%" },
        { id: 4, title: "Bonus Toppings", description: "Complimentary artisanal toppings with any signature Sundae order.", image: "/SpecialOffer/toppings.jpg", tag: "FREE" },
      ]
    },
    fr: {
      heading: "Offres Exclusives",
      description: "Le plaisir artisanal à prix irrésistibles. Découvrez nos points forts de la saison.",
      offers: [
        { id: 1, title: "50% sur les Sundaes", description: "Moitié prix sur tous les Sundaes au chocolat faits main.", image: "/SpecialOffer/chocolate.jpg", tag: "-50%" },
        { id: 2, title: "Doublez la Boule", description: "Achetez un cornet Vanille et recevez le deuxième offert.", image: "/SpecialOffer/vanilla.jpg", tag: "1+1" },
        { id: 3, title: "Gâteaux Artisans", description: "20% de réduction sur nos gâteaux glacés à plusieurs étages.", image: "/SpecialOffer/cake.jpg", tag: "-20%" },
        { id: 4, title: "Garnitures Offertes", description: "Toppings artisanaux gratuits avec toute commande de Sundae.", image: "/SpecialOffer/toppings.jpg", tag: "OFFERT" },
      ]
    },
    es: {
      heading: "Ofertas Únicas",
      description: "Indulgencia artesanal a precios increíbles. Descubre lo mejor de la temporada.",
      offers: [
        { id: 1, title: "50% en Sundaes", description: "Mitad de precio en todos los Sundaes de chocolate artesanal.", image: "/SpecialOffer/chocolate.jpg", tag: "-50%" },
        { id: 2, title: "Doble Dulzura", description: "Compra un cono de Vainilla y llévate el segundo gratis.", image: "/SpecialOffer/vanilla.jpg", tag: "2x1" },
        { id: 3, title: "Pasteles de Autor", description: "Disfruta de un 20% de descuento en nuestros pasteles helados.", image: "/SpecialOffer/cake.jpg", tag: "-20%" },
        { id: 4, title: "Toppings Gratis", description: "Toppings artesanales de cortesía con cualquier pedido de Sundae.", image: "/SpecialOffer/toppings.jpg", tag: "GRATIS" },
      ]
    },
  };

  const content = translations[language] || translations.en;
  const [selectedOffer, setSelectedOffer] = useState(0);

  return (
    <section
      id="special-offers"
      className={`relative py-16 md:py-24 transition-colors duration-1000 ${
        isDarkMode ? 'bg-[#050505] text-white' : 'bg-[#FFFBF2] text-[#1A1008]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header with Straight Line Accent */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <p className="text-pink-500 font-black uppercase tracking-[0.4em] text-[10px] mb-2">
              Limited Churns
            </p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none border-l-8 border-pink-500 pl-6">
              {content.heading}
            </h2>
          </div>
          <p className="text-base md:text-lg opacity-50 font-medium max-w-xs md:text-right italic">
            {content.description}
          </p>
        </div>

        {/* Modern Straight-Edge Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-current border-opacity-10">
          {content.offers.map((offer, index) => (
            <div
              key={offer.id}
              onClick={() => setSelectedOffer(index)}
              className={`group relative p-8 border-r border-b border-current border-opacity-10 transition-all duration-500 cursor-pointer
                ${selectedOffer === index ? 'bg-pink-500 text-white' : 'hover:bg-white/5'}
              `}
            >
              {/* Image Container - Displays FULLY */}
              <div className="relative aspect-square w-full mb-8 flex items-center justify-center bg-black/5 p-4 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110"
                />
                {/* Sharp Tag Badge */}
                <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-black tracking-widest ${
                  selectedOffer === index ? 'bg-white text-pink-500' : 'bg-pink-500 text-white'
                }`}>
                  {offer.tag}
                </div>
              </div>

              {/* Offer Text */}
              <div className="space-y-3">
                <h3 className={`text-xl font-black uppercase italic tracking-tighter transition-colors ${
                  selectedOffer === index ? 'text-white' : 'text-current'
                }`}>
                  {offer.title}
                </h3>
                <p className={`text-sm font-medium leading-snug opacity-70 ${
                  selectedOffer === index ? 'text-white/80' : 'text-current'
                }`}>
                  {offer.description}
                </p>
              </div>

              {/* Active Underline */}
              <div className={`absolute bottom-0 left-0 h-1 transition-all duration-500 
                ${selectedOffer === index ? 'w-full bg-white' : 'w-0 bg-pink-500 group-hover:w-12'}
              `} />
            </div>
          ))}
        </div>

        {/* Bottom Accent */}
        <div className="mt-12 flex items-center justify-center gap-4">
           <div className="h-px w-full bg-current opacity-10" />
           <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 whitespace-nowrap px-4">
             Scoop it while it's cold
           </span>
           <div className="h-px w-full bg-current opacity-10" />
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;