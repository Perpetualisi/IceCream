import React, { useState, useEffect } from "react";

const Hero = ({ language = "en", isDarkMode = false }) => {
  // Full translations for EN, FR, ES
  const translations = {
    en: {
      heading: "Welcome to the Sweetest Spot in Town!",
      subheadings: [
        "Indulge in Creamy Happiness!",
        "Chill with Every Scoop!",
        "Delicious Moments Await!"
      ],
      cta: "Scoop Yours Now"
    },
    fr: {
      heading: "Bienvenue dans le lieu le plus sucré de la ville !",
      subheadings: [
        "Savourez un bonheur crémeux !",
        "Détendez-vous avec chaque cuillerée !",
        "Des moments délicieux vous attendent !"
      ],
      cta: "Prenez le vôtre maintenant"
    },
    es: {
      heading: "¡Bienvenido al lugar más dulce de la ciudad!",
      subheadings: [
        "¡Disfruta de la felicidad cremosa!",
        "¡Relájate con cada cucharada!",
        "¡Momentos deliciosos te esperan!"
      ],
      cta: "Sírvelo ahora"
    }
  };

  // Hero images
  const heroImages = [
    "/images/hero1.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpg",
    "/images/hero4.jpg",
    "/images/hero5.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Use fallback to English if language not found
  const { heading, subheadings, cta } = translations[language] || translations["en"];

  // Rotate images and subheadings every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className={`relative overflow-hidden ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-cream text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Image with glow effect */}
        <div className="relative w-full h-[320px] md:h-[420px] rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute -inset-4 bg-gradient-to-tr from-pink-400 via-purple-400 to-blue-400 rounded-3xl blur-3xl opacity-30" />
          <img
            key={currentIndex} // triggers smooth transition
            src={heroImages[currentIndex]}
            alt="Ice Cream Delight"
            className="relative w-full h-full object-cover transition-opacity duration-1000 opacity-100"
          />
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Static main heading */}
          <h1 className="text-3xl md:text-5xl font-display font-extrabold leading-tight">
            {heading}
          </h1>

          {/* Rotating subheading */}
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-xl transition-opacity duration-700">
            {subheadings[currentIndex % subheadings.length]}
          </p>

          {/* CTA Button */}
          <a
            href="#flavours"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-pink-600 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
          >
            🍦 {cta}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
