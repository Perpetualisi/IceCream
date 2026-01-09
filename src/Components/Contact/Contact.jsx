import React from "react";

const Contact = ({ language = "en", isDarkMode }) => {
  const translations = {
    en: {
      heading: "Get In Touch",
      namePlaceholder: "Your Name",
      emailPlaceholder: "Your Email",
      messagePlaceholder: "Your Message",
      button: "Send Message",
      contactInfo: {
        address: "456 Elm Street, New York, USA",
        phone: "+1-555-123-4567",
        email: "Frostify@gmail.com",
        hours: "Opening Hours: Mon - Sat, 9AM - 6PM",
      },
    },
    fr: {
      heading: "Entrer en contact",
      namePlaceholder: "Votre nom",
      emailPlaceholder: "Votre e-mail",
      messagePlaceholder: "Votre message",
      button: "Envoyer le message",
      contactInfo: {
        address: "456 rue Elm, New York, États-Unis",
        phone: "+1-555-123-4567",
        email: "Frostify@gmail.com",
        hours: "Heures d'ouverture : Lun - Sam, 9h - 18h",
      },
    },
    es: {
      heading: "Ponte en contacto",
      namePlaceholder: "Tu nombre",
      emailPlaceholder: "Tu correo electrónico",
      messagePlaceholder: "Tu mensaje",
      button: "Enviar mensaje",
      contactInfo: {
        address: "456 Calle Elm, Nueva York, EE. UU.",
        phone: "+1-555-123-4567",
        email: "Frostify@gmail.com",
        hours: "Horario: Lun - Sáb, 9AM - 6PM",
      },
    },
  };

  const content = translations[language] || translations.en;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! 🍦");
  };

  return (
    <section
      id="contact"
      className={`py-16 ${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          {content.heading}
        </h2>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-center md:text-left">
          <p className="text-lg">
            <strong>📍 {content.contactInfo.address}</strong>
          </p>
          <p className="text-lg">
            <strong>📞 {content.contactInfo.phone}</strong>
          </p>
          <p className="text-lg">
            <strong>✉️ {content.contactInfo.email}</strong>
          </p>
          <p className="text-lg">
            <strong>🕒 {content.contactInfo.hours}</strong>
          </p>
        </div>

        {/* Contact Form */}
        <form
          className="flex flex-col space-y-4 max-w-xl mx-auto"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder={content.namePlaceholder}
            required
            className={`p-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-400 transition-colors ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
          />
          <input
            type="email"
            placeholder={content.emailPlaceholder}
            required
            className={`p-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-400 transition-colors ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
          />
          <textarea
            placeholder={content.messagePlaceholder}
            required
            rows="5"
            className={`p-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-400 transition-colors ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
          ></textarea>
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {content.button}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
