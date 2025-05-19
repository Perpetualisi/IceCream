import React from "react";
import './Flavours.css';

const Flavours = ({ language, isDarkMode }) => {
  console.log("Dark Mode:", isDarkMode);

  const translations = {
    en: {
      heading: "Our Delicious Flavours",
      flavours: {
        1: { name: "Vanilla", description: "Classic vanilla flavor with a creamy texture.", image: "/flavoursjsx/vanilla.jpg" },
        2: { name: "Chocolate", description: "Rich and indulgent chocolate flavor.", image: "/images/hero.jpg" },
        3: { name: "Strawberry", description: "Fresh strawberry with a burst of sweetness.", image: "/flavoursjsx/strawberry.jpg" },
        4: { name: "Mango", description: "Tropical mango flavor that's refreshing.", image: "/flavoursjsx/mango.jpg" },
        5: { name: "Coffee", description: "Bold coffee flavor for coffee lovers.", image: "/flavoursjsx/Coffee.jpg" },
        6: { name: "Mint Chocolate", description: "Cool mint blended with rich chocolate chips.", image: "/flavoursjsx/Mintchocolate.jpg" },
        7: { name: "Pistachio", description: "Nutty pistachio flavor with a creamy twist.", image: "/flavoursjsx/Pistachio.jpg" },
        8: { name: "Cookies & Cream", description: "Crunchy cookies mixed in smooth cream.", image: "/flavoursjsx/cookies.jpg" },
      }
    },
    fr: {
      heading: "Nos délicieuses saveurs",
      flavours: {
        1: { name: "Vanille", description: "Saveur de vanille classique avec une texture crémeuse.", image: "/flavoursjsx/vanilla.jpg" },
        2: { name: "Chocolat", description: "Saveur de chocolat riche et indulgente.", image: "/images/hero.jpg" },
        3: { name: "Fraise", description: "Fraise fraîche avec un éclat de douceur.", image: "/flavoursjsx/strawberry.jpg" },
        4: { name: "Mangue", description: "Saveur de mangue tropicale rafraîchissante.", image: "/flavoursjsx/mango.jpg" },
        5: { name: "Café", description: "Saveur de café audacieuse pour les amateurs de café.", image: "/flavoursjsx/Coffee.jpg" },
        6: { name: "Menthe Chocolat", description: "Menthe fraîche mélangée à des pépites de chocolat.", image: "/flavoursjsx/Mintchocolate.jpg" },
        7: { name: "Pistache", description: "Saveur de pistache avec une touche crémeuse.", image: "/flavoursjsx/Pistachio.jpg" },
        8: { name: "Cookies & Crème", description: "Biscuits croquants mélangés à une crème lisse.", image: "/flavoursjsx/cookies.jpg" },
      }
    },
    es: {
      heading: "Nuestros deliciosos sabores",
      flavours: {
        1: { name: "Vainilla", description: "Sabor clásico de vainilla con una textura cremosa.", image: "/flavoursjsx/vanilla.jpg" },
        2: { name: "Chocolate", description: "Sabor rico e indulgente de chocolate.", image: "/images/hero.jpg" },
        3: { name: "Fresa", description: "Fresa fresca con un toque de dulzura.", image: "/flavoursjsx/strawberry.jpg" },
        4: { name: "Mango", description: "Sabor a mango tropical refrescante.", image: "/flavoursjsx/mango.jpg" },
        5: { name: "Café", description: "Sabor audaz de café para los amantes del café.", image: "/flavoursjsx/Coffee.jpg" },
        6: { name: "Menta Chocolate", description: "Menta fresca mezclada con trozos de chocolate.", image: "/flavoursjsx/Mintchocolate.jpg" },
        7: { name: "Pistacho", description: "Sabor a pistacho con un giro cremoso.", image: "/flavoursjsx/Pistachio.jpg" },
        8: { name: "Galletas y Crema", description: "Galletas crujientes mezcladas con crema suave.", image: "/flavoursjsx/cookies.jpg" },
      }
    }
  };

  const flavours = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
  ];

  return (
    <section id="flavours" className={`flavours ${isDarkMode ? 'dark' : ''}`}>
      <h2 className="flavours-heading">{translations[language].heading}</h2>
      <div className="flavours-grid">
        {flavours.map(flavour => {
          const translatedFlavour = translations[language].flavours[flavour.id];
          return (
            <div key={flavour.id} className="flavour-card">
              <img 
                src={translatedFlavour.image}  
                alt={translatedFlavour.name} 
                className="flavour-image" 
              />
              <div className="flavour-info">
                <h3 className="flavour-name">{translatedFlavour.name}</h3>
                <p className="flavour-description">{translatedFlavour.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Flavours;
