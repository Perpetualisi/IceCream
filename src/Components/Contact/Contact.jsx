import React from "react";
import './Contact.css';

const Contact = ({ language, isDarkMode }) => {
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
    }
  };

  const content = translations[language];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting us! 🍦');
  };

  return (
    <section id="contact" className={`contact ${isDarkMode ? 'dark' : ''}`}>
      <h2 className="contact-heading">{content.heading}</h2>

      <div className="contact-info">
        <p><strong>📍 {content.contactInfo.address}</strong></p>
        <p><strong>📞 {content.contactInfo.phone}</strong></p>
        <p><strong>✉️ {content.contactInfo.email}</strong></p>
        <p><strong>🕒 {content.contactInfo.hours}</strong></p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={content.namePlaceholder}
          required
          className="contact-input"
        />
        <input
          type="email"
          placeholder={content.emailPlaceholder}
          required
          className="contact-input"
        />
        <textarea
          placeholder={content.messagePlaceholder}
          required
          className="contact-textarea"
          rows="5"
        ></textarea>
        <button type="submit" className="contact-button">
          {content.button}
        </button>
      </form>
    </section>
  );
};

export default Contact;
