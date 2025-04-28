import React from "react";
import './Contact.css'; // We'll style it here

const Contact = ({ language, isDarkMode }) => {
  const translations = {
    en: {
      heading: "Get In Touch",
      namePlaceholder: "Your Name",
      emailPlaceholder: "Your Email",
      messagePlaceholder: "Your Message",
      button: "Send Message",
    },
    fr: {
      heading: "Entrer en contact",
      namePlaceholder: "Votre nom",
      emailPlaceholder: "Votre e-mail",
      messagePlaceholder: "Votre message",
      button: "Envoyer le message",
    },
    es: {
      heading: "Ponte en contacto",
      namePlaceholder: "Tu nombre",
      emailPlaceholder: "Tu correo electrónico",
      messagePlaceholder: "Tu mensaje",
      button: "Enviar mensaje",
    }
  };

  const content = translations[language];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting us! 🍦'); // You can replace this with real submission
  };

  return (
    <section id="contact" className={`contact ${isDarkMode ? 'dark' : ''}`}>
      <h2 className="contact-heading">{content.heading}</h2>
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
