import React, { useState, useEffect } from 'react';

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
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % translations[language].testimonials.length
      );
    }, 5000); // rotate every 5 seconds

    return () => clearInterval(interval);
  }, [language]);

  const testimonial = translations[language].testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      className={`${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"} py-16`}
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          {translations[language].heading}
        </h2>

        {/* Testimonial Card */}
        <div
          className={`max-w-xl mx-auto p-6 rounded-xl shadow-lg transform transition-transform duration-500 hover:scale-105
            ${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"}
          `}
        >
          <img
            src={testimonial.imageUrl}
            alt={testimonial.name}
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          <p className="text-lg italic mb-4">"{testimonial.feedback}"</p>
          <p className="font-semibold text-md">- {testimonial.name}</p>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {translations[language].testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300
                ${currentIndex === index
                  ? "bg-pink-500"
                  : isDarkMode ? "bg-gray-600" : "bg-gray-300"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
