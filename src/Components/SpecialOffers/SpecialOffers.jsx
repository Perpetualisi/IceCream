import React, { useState } from 'react';
import './SpecialOffers.css'; 

const SpecialOffers = ({ language = 'en', isDarkMode }) => {
  const translations = {
    en: {
      heading: "Special Ice Cream Offers",
      description: "Indulge in our special ice cream offers and enjoy irresistible discounts. Treat yourself to a scoop or two of happiness at amazing prices!",
      offers: [
        {
          id: 1,
          title: "50% Off on Chocolate Sundae",
          description: "Get 50% off on all Chocolate Sundaes. Hurry, limited time offer!",
          image: "/SpecialOffer/chocolate.jpg",
        },
        {
          id: 2,
          title: "Buy 1 Get 1 Free on Vanilla Cone",
          description: "Buy any Vanilla Cone and get another one free. Double the fun, double the sweetness!",
          image: "/SpecialOffer/vanilla.jpg",
        },
        {
          id: 3,
          title: "20% Off on Ice Cream Cakes",
          description: "Enjoy 20% off on all Ice Cream Cakes. Perfect for your celebrations!",
          image: "/SpecialOffer/cake.jpg",
        },
        {
          id: 4,
          title: "Free Toppings with Any Sundae",
          description: "Get free toppings with any Sundae you buy. Choose from a variety of delicious toppings!",
          image: "/SpecialOffer/toppings.jpg",
        },
      ],
    },
    fr: {
      heading: "Offres spéciales de crème glacée",
      description: "Profitez de nos offres spéciales sur la crème glacée et bénéficiez de réductions irrésistibles. Faites-vous plaisir à des prix incroyables !",
      offers: [
        {
          id: 1,
          title: "50% de réduction sur le Sundae au chocolat",
          description: "Obtenez 50% de réduction sur tous les Sundaes au chocolat. Dépêchez-vous, offre limitée !",
          image: "/SpecialOffer/chocolate.jpg",
        },
        {
          id: 2,
          title: "1 acheté = 1 offert sur le cornet vanille",
          description: "Achetez un cornet vanille et recevez-en un autre gratuitement. Deux fois plus de plaisir !",
          image: "/SpecialOffer/vanilla.jpg",
        },
        {
          id: 3,
          title: "20% de réduction sur les gâteaux glacés",
          description: "Profitez de 20% de réduction sur tous les gâteaux glacés. Parfait pour vos célébrations !",
          image: "/SpecialOffer/cake.jpg",
        },
        {
          id: 4,
          title: "Garnitures gratuites avec tout Sundae",
          description: "Obtenez des garnitures gratuites avec tout Sundae acheté. Choisissez parmi une variété délicieuse !",
          image: "/SpecialOffer/toppings.jpg",
        },
      ],
    },
    es: {
      heading: "Ofertas especiales de helado",
      description: "Disfruta de nuestras ofertas especiales de helado y aprovecha descuentos irresistibles. ¡Date un capricho a precios increíbles!",
      offers: [
        {
          id: 1,
          title: "50% de descuento en Sundae de Chocolate",
          description: "Obtén un 50% de descuento en todos los Sundaes de Chocolate. ¡Apresúrate, oferta limitada!",
          image: "/SpecialOffer/chocolate.jpg",
        },
        {
          id: 2,
          title: "Compra 1 y llévate 1 gratis en cono de vainilla",
          description: "Compra un cono de vainilla y obtén otro gratis. ¡Doble diversión, doble dulzura!",
          image: "/SpecialOffer/vanilla.jpg",
        },
        {
          id: 3,
          title: "20% de descuento en pasteles de helado",
          description: "Disfruta de un 20% de descuento en todos los pasteles de helado. ¡Perfecto para tus celebraciones!",
          image: "/SpecialOffer/cake.jpg",
        },
        {
          id: 4,
          title: "Toppings gratis con cualquier Sundae",
          description: "Obtén toppings gratis con cualquier Sundae que compres. ¡Elige entre una variedad deliciosa!",
          image: "/SpecialOffer/toppings.jpg",
        },
      ],
    },
  };

  const content = translations[language] || translations.en;
  const [selectedOffer, setSelectedOffer] = useState(0);

  return (
    <section id="special-offers" className={`special-offers ${isDarkMode ? 'dark' : ''}`}>
      <h2 className="special-offers-heading">{content.heading}</h2>
      <p className="special-offers-description">{content.description}</p>

      <div className="offers-container">
        {content.offers.map((offer, index) => (
          <div
            key={offer.id}
            className={`offer-card ${selectedOffer === index ? 'selected' : ''}`}
            onClick={() => setSelectedOffer(index)}
          >
            <img className="offer-image" src={offer.image} alt={offer.title} />
            <h3 className="offer-title">{offer.title}</h3>
            <p className="offer-description">{offer.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffers;
