import React from "react";
import './Gallery.css'; 

const Gallery = ({ language, isDarkMode }) => {
  const translations = {
    en: {
      heading: "Our Flavours",
    },
    fr: {
      heading: "Nos Saveurs",
    },
    es: {
      heading: "Nuestros Sabores",
    }
  };

  
  const images = [
    { src: "/flavoursjsx/vanilla.jpg", alt: "Vanilla Ice Cream" },
    { src: "/images/hero.jpg", alt: "Chocolate Ice Cream" },
    { src: "/flavoursjsx/strawberry.jpg", alt: "Strawberry Ice Cream" },
    { src: "/flavoursjsx/mango.jpg", alt: "Mango Ice Cream" },
    { src: "/flavoursjsx/Mintchocolate.jpg", alt: "Mint Chocolate Ice Cream" },
    { src: "/SpecialOffer/cake.jpg", alt: "Cookies and Cream Ice Cream" },
    { src: "/flavoursjsx/Pistachio.jpg", alt: "Pistachio Ice Cream" },
    { src: "/flavoursjsx/Coffee.jpg", alt: "Coffee Ice Cream" },
  ];

  return (
    <section id="gallery" className={`gallery ${isDarkMode ? 'dark' : ''}`}>
      <h2 className="gallery-heading">{translations[language].heading}</h2>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <div key={index} className="gallery-item">
            <img src={image.src} alt={image.alt} className="gallery-image" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
