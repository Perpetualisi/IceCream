import React from "react";
import './Hero.css'; // We will style it in this file

const Hero = ({ language, isDarkMode }) => {
  // Translations for different languages with more ice cream words
  const translations = {
    en: {
      heading: "Welcome to the Sweetest Spot in Town!",
      subheading: "Scoop up the finest ice cream flavours and sprinkle your day with happiness.",
      cta: "Scoop Yours Now"
    },
    fr: {
      heading: "Bienvenue dans le lieu le plus sucré de la ville !",
      subheading: "Ramassez les meilleures saveurs de glace et parsemez votre journée de bonheur.",
      cta: "Prenez le vôtre maintenant"
    },
    es: {
      heading: "¡Bienvenido al lugar más dulce de la ciudad!",
      subheading: "Coge los mejores sabores de helado y endulza tu día con felicidad.",
      cta: "Sírvelo ahora"
    }
  };

  return (
    <section id="home" className={`hero ${isDarkMode ? 'dark' : ''}`}>
      <div className="hero-content">
        <h1 className="hero-heading">{translations[language].heading}</h1>
        <p className="hero-subheading">
          {translations[language].subheading}
        </p>
        <a href="#flavours" className="cta-button">
          {translations[language].cta}
        </a>
      </div>
    </section>
  );
};

export default Hero;
