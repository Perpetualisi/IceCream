import React from "react";

const Contact = ({ language = "en", isDarkMode }) => {
  const translations = {
    en: {
      heading: "Get In Touch",
      subheading: "Have a question or a craving? Drop us a line!",
      namePlaceholder: "Your Name",
      emailPlaceholder: "Your Email",
      messagePlaceholder: "Your Message",
      button: "Send Message 🍦",
      contactInfo: {
        address: "456 Elm Street, New York, USA",
        phone: "+1-555-123-4567",
        email: "Frostify@gmail.com",
        hours: "Mon - Sat, 9AM - 6PM",
      },
    },
    fr: {
      heading: "Entrer en contact",
      subheading: "Une question ou une envie ? Écrivez-nous !",
      namePlaceholder: "Votre nom",
      emailPlaceholder: "Votre e-mail",
      messagePlaceholder: "Votre message",
      button: "Envoyer le message 🍦",
      contactInfo: {
        address: "456 rue Elm, New York, États-Unis",
        phone: "+1-555-123-4567",
        email: "Frostify@gmail.com",
        hours: "Lun - Sam, 9h - 18h",
      },
    },
    es: {
      heading: "Ponte en contacto",
      subheading: "¿Tienes alguna pregunta? ¡Escríbenos!",
      namePlaceholder: "Tu nombre",
      emailPlaceholder: "Tu correo electrónico",
      messagePlaceholder: "Tu mensaje",
      button: "Enviar mensaje 🍦",
      contactInfo: {
        address: "456 Calle Elm, Nueva York, EE. UU.",
        phone: "+1-555-123-4567",
        email: "Frostify@gmail.com",
        hours: "Lun - Sáb, 9AM - 6PM",
      },
    },
  };

  const content = translations[language] || translations.en;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting Frostify! We'll get back to you soon. 🍦");
  };

  return (
    <section
      id="contact"
      className={`py-24 transition-colors duration-500 ${
        isDarkMode 
          ? "bg-[#0f0a06] text-white" 
          : "bg-[#FFFBF2] text-[#1A1008]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            {content.heading}
          </h2>
          <p className="text-lg opacity-70 font-medium">
            {content.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-black/5'} shadow-sm`}>
              <span className="text-3xl mb-4 block">📍</span>
              <h4 className="font-bold uppercase tracking-widest text-xs opacity-50 mb-2">Location</h4>
              <p className="font-semibold">{content.contactInfo.address}</p>
            </div>

            <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-black/5'} shadow-sm`}>
              <span className="text-3xl mb-4 block">📞</span>
              <h4 className="font-bold uppercase tracking-widest text-xs opacity-50 mb-2">Phone</h4>
              <p className="font-semibold">{content.contactInfo.phone}</p>
            </div>

            <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-black/5'} shadow-sm`}>
              <span className="text-3xl mb-4 block">✉️</span>
              <h4 className="font-bold uppercase tracking-widest text-xs opacity-50 mb-2">Email</h4>
              <p className="font-semibold">{content.contactInfo.email}</p>
            </div>

            <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-black/5'} shadow-sm`}>
              <span className="text-3xl mb-4 block">🕒</span>
              <h4 className="font-bold uppercase tracking-widest text-xs opacity-50 mb-2">Hours</h4>
              <p className="font-semibold">{content.contactInfo.hours}</p>
            </div>
          </div>

          {/* Form Section */}
          <form
            className={`flex flex-col space-y-4 p-8 md:p-10 rounded-[2rem] border ${
              isDarkMode ? "bg-white/5 border-white/10" : "bg-white border-black/5"
            } shadow-2xl`}
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={content.namePlaceholder}
                required
                className={`p-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all ${
                  isDarkMode
                    ? "bg-black/40 border-white/10 text-white placeholder-white/30"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
                }`}
              />
              <input
                type="email"
                placeholder={content.emailPlaceholder}
                required
                className={`p-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all ${
                  isDarkMode
                    ? "bg-black/40 border-white/10 text-white placeholder-white/30"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
                }`}
              />
            </div>
            <textarea
              placeholder={content.messagePlaceholder}
              required
              rows="5"
              className={`p-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all ${
                isDarkMode
                  ? "bg-black/40 border-white/10 text-white placeholder-white/30"
                  : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
              }`}
            ></textarea>
            
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white font-black uppercase tracking-widest py-5 rounded-2xl transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-pink-500/20"
            >
              {content.button}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;