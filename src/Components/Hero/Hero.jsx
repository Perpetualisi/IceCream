import React, { useEffect, useState } from "react";
import './Hero.css';

const Hero = ({ language, isDarkMode }) => {
  const translations = {
    en: {
      headings: [
        "Welcome to the Sweetest Spot in Town!",
        "Indulge in Creamy Happiness!",
        "Chill with Every Scoop!",
        "Delicious Moments Await!",
        "Every Bite is Bliss!",
        "Scoop, Smile, Repeat!",
        "Discover Your Favourite Flavour!",
        "Flavours that Spark Joy!",
        "Cool Down, Sweeten Up!",
        "Where Ice Cream Dreams Come True!",
        "Tastes You’ll Never Forget!",
        "A Party in Every Cone!",
        "More than Just Ice Cream!",
        "Crafted with Love, Served with Joy!"
      ],
      subheading: "Scoop up the finest, creamiest ice cream flavours made with love and top-quality ingredients. Each scoop is a burst of joy, crafted to bring a smile to your face and sweetness to your day. Whether it’s a treat for yourself or a shared delight, our ice cream turns ordinary moments into extraordinary ones.",
      cta: "Scoop Yours Now"
    },
    fr: {
      headings: [
        "Bienvenue dans le lieu le plus sucré de la ville !",
        "Savourez un bonheur crémeux !",
        "Détendez-vous avec chaque cuillerée !",
        "Des moments délicieux vous attendent !",
        "Chaque bouchée est un bonheur !",
        "Scoop, souriez, répétez !",
        "Découvrez votre parfum préféré !",
        "Des saveurs qui apportent de la joie !",
        "Rafraîchissez-vous et sucrez votre journée !",
        "Là où les rêves glacés deviennent réalité !",
        "Des goûts inoubliables !",
        "Une fête dans chaque cornet !",
        "Bien plus que de la glace !",
        "Préparée avec amour, servie avec joie !"
      ],
      subheading: "Dégustez les saveurs de glace les plus fines et crémeuses, préparées avec amour et des ingrédients de qualité. Chaque cuillerée est une explosion de joie, conçue pour illuminer votre journée. Que ce soit un plaisir personnel ou un moment partagé, notre glace rend chaque instant spécial.",
      cta: "Prenez le vôtre maintenant"
    },
    es: {
      headings: [
        "¡Bienvenido al lugar más dulce de la ciudad!",
        "¡Disfruta de la felicidad cremosa!",
        "¡Relájate con cada cucharada!",
        "¡Momentos deliciosos te esperan!",
        "¡Cada bocado es una delicia!",
        "¡Sirve, sonríe, repite!",
        "¡Descubre tu sabor favorito!",
        "¡Sabores que despiertan alegría!",
        "¡Refresca tu día con dulzura!",
        "¡Donde los sueños helados se hacen realidad!",
        "¡Sabores que no olvidarás!",
        "¡Una fiesta en cada cono!",
        "¡Más que solo helado!",
        "¡Hecho con amor, servido con alegría!"
      ],
      subheading: "Disfruta de los sabores de helado más finos y cremosos, elaborados con amor y los mejores ingredientes. Cada cucharada es un estallido de alegría que transforma lo cotidiano en algo extraordinario. Comparte una sonrisa, celebra un momento, y déjate llevar por la dulzura.",
      cta: "Sírvelo ahora"
    }
  };

  const heroImages = [
    "/images/hero1.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpg",
    "/images/hero4.jpg",
    "/images/hero5.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentHeadings = translations[language].headings;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 3000); // Change image and text every 3 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section id="home" className={`hero ${isDarkMode ? 'dark' : ''}`}>
      <div className="hero-container">
        <div className="hero-image">
          <img src={heroImages[currentIndex]} alt="Ice Cream Delight" />
        </div>
        <div className="hero-content">
          <h1 className="hero-heading fade-in-text">
            {currentHeadings[currentIndex % currentHeadings.length]}
          </h1>
          <p className="hero-subheading">{translations[language].subheading}</p>
          <a href="#flavours" className="cta-button">{translations[language].cta}</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
