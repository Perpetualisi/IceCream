import React from "react";
import './Locations.css'; 

const Locations = ({ language, isDarkMode }) => {
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
    }
  };

  const content = translations[language];

  return (
    <section id="locations" className={`location ${isDarkMode ? 'dark' : ''}`}>
      <h2 className="location-heading">{content.heading}</h2>
      <div className="location-info">
        <p className="location-address">{content.address}</p>
        <p className="location-phone">{content.phone}</p>
        <a 
          href="https://maps.google.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="location-map-link"
        >
          {content.map}
        </a>
      </div>
    </section>
  );
};

export default Locations;
