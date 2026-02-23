import React, { useState, useEffect } from 'react';

const Testimonials = ({ language = "en", isDarkMode = false }) => {
  const translations = {
    en: {
      heading: "Word on the Street",
      subheading: "What our 2k+ fans are saying about their scoops.",
      testimonials: [
        { id: 1, name: "John Doe", feedback: "The Madagascar Vanilla is life-changing. I’ve never had ice cream this creamy and authentic!", imageUrl: "/JohnDoe.jpg", tag: "Vanilla Fan" },
        { id: 2, name: "Jane Smith", feedback: "Fantastic service and even better flavors. The Mint Chip is a absolute garden-fresh masterpiece.", imageUrl: "/JaneSmith.jpg", tag: "Local Guide" },
        { id: 3, name: "Michael Brown", feedback: "A truly wonderful experience. It's not just ice cream; it's a premium dessert event every time.", imageUrl: "/MichaelBrown.jpg", tag: "Foodie" }
      ]
    },
    fr: {
      heading: "L'avis de nos Fans",
      subheading: "Ce que disent nos plus de 2000 amateurs de glaces.",
      testimonials: [
        { id: 1, name: "John Doe", feedback: "La Vanille de Madagascar change la vie. Je n'ai jamais goûté une glace aussi crémeuse !", imageUrl: "/JohnDoe.jpg", tag: "Fan de Vanille" },
        { id: 2, name: "Jane Smith", feedback: "Service fantastique et saveurs encore meilleures. La Menthe est un chef-d'œuvre de fraîcheur.", imageUrl: "/JaneSmith.jpg", tag: "Guide Local" },
        { id: 3, name: "Michael Brown", feedback: "Une expérience vraiment merveilleuse. Plus qu'une glace, un véritable événement gastronomique.", imageUrl: "/MichaelBrown.jpg", tag: "Gourmet" }
      ]
    },
    es: {
      heading: "Voz de la Calle",
      subheading: "Lo que dicen nuestros más de 2000 fans sobre sus helados.",
      testimonials: [
        { id: 1, name: "John Doe", feedback: "La Vainilla de Madagascar te cambia la vida. ¡Nunca había probado un helado tan cremoso!", imageUrl: "/JohnDoe.jpg", tag: "Fan de la Vainilla" },
        { id: 2, name: "Jane Smith", feedback: "Servicio fantástico y mejores sabores. El de Menta es una obra maestra de frescura.", imageUrl: "/JaneSmith.jpg", tag: "Guía Local" },
        { id: 3, name: "Michael Brown", feedback: "Una experiencia maravillosa. No es solo helado; es un evento de postre premium.", imageUrl: "/MichaelBrown.jpg", tag: "Amante del buen comer" }
      ]
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      triggerFade();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, language]);

  const triggerFade = (newIndex = null) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => 
        newIndex !== null ? newIndex : (prev + 1) % translations[language].testimonials.length
      );
      setIsFading(false);
    }, 500);
  };

  const testimonial = translations[language].testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      className={`relative py-24 overflow-hidden transition-colors duration-1000 ${
        isDarkMode ? "bg-[#0A0A0A] text-white" : "bg-[#FFFBF2] text-[#1A1008]"
      }`}
    >
      {/* Background Decorative Quote Mark */}
      <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
        <span className="text-[40rem] font-black italic">“</span>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        {/* Editorial Header */}
        <div className="mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">
            {translations[language].heading}
          </h2>
          <p className="text-lg opacity-60 font-medium">
            {translations[language].subheading}
          </p>
          <div className="h-1 w-20 bg-pink-500 mx-auto rounded-full" />
        </div>

        {/* Testimonial Card */}
        <div className={`transition-all duration-700 ease-in-out transform ${
          isFading ? "opacity-0 scale-95 blur-sm" : "opacity-100 scale-100 blur-0"
        }`}>
          <div className="relative inline-block mb-8">
             <div className="absolute -inset-2 bg-pink-500 rounded-full blur opacity-20 animate-pulse"></div>
             <img
                src={testimonial.imageUrl}
                alt={testimonial.name}
                className="relative w-28 h-28 md:w-32 md:h-32 rounded-full mx-auto object-cover border-4 border-white shadow-2xl"
              />
          </div>
          
          <blockquote className="max-w-2xl mx-auto">
            <p className="text-2xl md:text-3xl font-medium italic leading-relaxed mb-8 tracking-tight">
              "{testimonial.feedback}"
            </p>
            <footer className="space-y-1">
              <cite className="not-italic text-xl font-black uppercase tracking-tighter italic">
                {testimonial.name}
              </cite>
              <div className="text-pink-500 text-xs font-black uppercase tracking-widest">
                {testimonial.tag}
              </div>
            </footer>
          </blockquote>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-12 space-x-4">
          {translations[language].testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => triggerFade(index)}
              className={`group relative h-2 transition-all duration-500 rounded-full
                ${currentIndex === index ? "w-12 bg-pink-500" : "w-4 bg-current opacity-20 hover:opacity-40"}`}
              aria-label={`Go to testimonial ${index + 1}`}
            >
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                0{index + 1}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;