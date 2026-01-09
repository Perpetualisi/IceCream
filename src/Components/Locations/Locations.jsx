import React from "react";

const Locations = ({ language = "en", isDarkMode }) => {
  const translations = {
    en: {
      heading: "Find Us",
      address: "123 Sweet Street, Ice Cream City, Wonderland",
      phone: "Phone: +123 456 7890",
      map: "View on Map",
    },
    fr: {
      heading: "Trouvez-nous",
      address: "123 rue Sweet, Ice Cream City, Wonderland",
      phone: "Téléphone : +123 456 7890",
      map: "Voir sur la carte",
    },
    es: {
      heading: "Encuéntranos",
      address: "123 Calle Dulce, Ice Cream City, Wonderland",
      phone: "Teléfono: +123 456 7890",
      map: "Ver en el mapa",
    },
  };

  const content = translations[language] || translations.en;

  return (
    <section
      id="locations"
      className={`${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"} py-16`}
    >
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-8">{content.heading}</h2>

        {/* Location Info */}
        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-12 space-y-4 md:space-y-0">
          <div className="space-y-2">
            <p className="text-lg md:text-xl">{content.address}</p>
            <p className="text-lg md:text-xl">{content.phone}</p>
          </div>
          
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block mt-2 md:mt-0 px-6 py-3 rounded-lg font-medium transition-colors
              ${isDarkMode 
                ? "bg-pink-600 text-white hover:bg-pink-500" 
                : "bg-pink-500 text-white hover:bg-pink-600"}`
            }
          >
            {content.map}
          </a>
        </div>

        {/* Optional: Embed Google Map */}
        <div className="mt-8 w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019621187719!2d144.9537363153124!3d-37.81720997975106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f2c1a7%3A0x5045675218ce6e0!2sIce%20Cream%20City!5e0!3m2!1sen!2sus!4v1614767234567!5m2!1sen!2sus"
            width="100%"
            height="100%"
            className="border-0"
            allowFullScreen=""
            loading="lazy"
            title="Location Map"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Locations;
