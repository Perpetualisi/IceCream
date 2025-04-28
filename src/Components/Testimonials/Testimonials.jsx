import React, { useState, useEffect } from 'react';
import './Testimonials.css';

const Testimonials = ({ language, isDarkMode }) => {
  const translations = {
    en: {
      heading: "WHAT OUR CUSTOMERS SAY ABOUT US", 
      testimonials: [
        {
          id: 1,
          name: "John Doe",
          feedback: "This is the best service I've ever experienced. Highly recommend!",
          imageUrl: "/JohnDoe.jpg"
        },
        {
          id: 2,
          name: "Jane Smith",
          feedback: "Amazing quality and fantastic customer support!",
          imageUrl: "/JaneSmith.jpg"
        },
        {
          id: 3,
          name: "Michael Brown",
          feedback: "A truly wonderful experience. I will definitely be back!",
          imageUrl: "/MichaelBrown.jpg"
        }
      ]
    },
    fr: {
      heading: "CE QUE NOS CLIENTS DISENT DE NOUS", 
      testimonials: [
        {
          id: 1,
          name: "John Doe",
          feedback: "C'est le meilleur service que j'ai jamais expérimenté. Je recommande vivement!",
          imageUrl: "/JohnDoe.jpg"
        },
        {
          id: 2,
          name: "Jane Smith",
          feedback: "Qualité incroyable et un support client fantastique!",
          imageUrl: "/JaneSmith.jpg"
        },
        {
          id: 3,
          name: "Michael Brown",
          feedback: "Une expérience vraiment merveilleuse. Je reviendrai certainement!",
          imageUrl: "/MichaelBrown.jpg"
        }
      ]
    },
    es: {
      heading: "LO QUE NUESTROS CLIENTES DICEN SOBRE NOSOTROS", 
      testimonials: [
        {
          id: 1,
          name: "John Doe",
          feedback: "¡Este es el mejor servicio que he experimentado! ¡Lo recomiendo mucho!",
          imageUrl: "/JohnDoe.jpg"
        },
        {
          id: 2,
          name: "Jane Smith",
          feedback: "¡Calidad increíble y un soporte al cliente fantástico!",
          imageUrl: "/JaneSmith.jpg"
        },
        {
          id: 3,
          name: "Michael Brown",
          feedback: "Una experiencia realmente maravillosa. ¡Definitivamente volveré!",
          imageUrl: "/MichaelBrown.jpg"
        }
      ]
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % translations[language].testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [language]);

  return (
    <section id="testimonials" className={`testimonials ${isDarkMode ? 'dark' : ''}`}>
      <h2 className="testimonials-heading">{translations[language].heading}</h2>
      <div className="testimonials-slider">
        <div className="testimonial-card">
          <img
            src={translations[language].testimonials[currentIndex].imageUrl}
            alt={translations[language].testimonials[currentIndex].name}
            className="testimonial-image"
          />
          <p className="testimonial-feedback">
            "{translations[language].testimonials[currentIndex].feedback}"
          </p>
          <p className="testimonial-name">
            - {translations[language].testimonials[currentIndex].name}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
