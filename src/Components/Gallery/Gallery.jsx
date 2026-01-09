import React from "react";

const Gallery = ({ language = "en", isDarkMode }) => {
  const translations = {
    en: { heading: "Our Flavours" },
    fr: { heading: "Nos Saveurs" },
    es: { heading: "Nuestros Sabores" },
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
    <section
      id="gallery"
      className={`${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"} py-16`}
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          {translations[language].heading}
        </h2>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className={`overflow-hidden rounded-xl shadow-lg transform transition duration-300 hover:scale-105
                ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-48 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
