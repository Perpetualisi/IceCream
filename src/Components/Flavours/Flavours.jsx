import React from "react";

const Flavours = ({ language, isDarkMode }) => {
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

  const flavours = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <section
      id="flavours"
      className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} py-16`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {translations[language].heading}
        </h2>

        {/* Flavours Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {flavours.map((id) => {
            const flavour = translations[language].flavours[id];
            return (
              <div
                key={id}
                className={`rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300
                  ${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"}`}
              >
                <img
                  src={flavour.image}
                  alt={flavour.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{flavour.name}</h3>
                  <p className="text-sm">{flavour.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Flavours;
