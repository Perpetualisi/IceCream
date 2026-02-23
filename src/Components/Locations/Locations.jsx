import React from "react";

const Locations = ({ language = "en", isDarkMode }) => {
  const translations = {
    en: {
      heading: "Visit Our Parlor",
      subheading: "The magic happens here. Come grab a scoop!",
      address: "123 Sweet Street, Ice Cream City, NY 10001",
      phone: "+1 (555) 456-7890",
      mapBtn: "Open in Google Maps",
      city: "New York flagship",
    },
    fr: {
      heading: "Visitez Notre Salon",
      subheading: "La magie opère ici. Venez chercher une boule !",
      address: "123 rue Sweet, Ice Cream City, NY 10001",
      phone: "+1 (555) 456-7890",
      mapBtn: "Ouvrir Google Maps",
      city: "Boutique New York",
    },
    es: {
      heading: "Visita Nuestra Heladería",
      subheading: "La magia ocurre aquí. ¡Ven por una bola!",
      address: "123 Calle Dulce, Ice Cream City, NY 10001",
      phone: "+1 (555) 456-7890",
      mapBtn: "Abrir en Google Maps",
      city: "Tienda de Nueva York",
    },
  };

  const content = translations[language] || translations.en;

  // Real Google Maps embed URL (Times Square area as a placeholder)
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968459391!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480293%3A0x5117f70619940334!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1625500000000!5m2!1sen!2sus";
  const mapRedirectUrl = "https://goo.gl/maps/xyz";

  return (
    <section
      id="locations"
      className={`py-24 transition-colors duration-500 ${
        isDarkMode ? "bg-[#0f0a06] text-white" : "bg-[#FFFBF2] text-[#1A1008]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-left">
            <h4 className="text-pink-500 font-black uppercase tracking-[0.3em] text-xs mb-3">Locations</h4>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
              {content.heading}
            </h2>
          </div>
          <p className="max-w-xs text-lg opacity-70 font-medium leading-tight">
            {content.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Card */}
          <div className={`lg:col-span-1 p-8 rounded-[2rem] flex flex-col justify-between border ${
            isDarkMode ? "bg-white/5 border-white/10" : "bg-white border-black/5"
          } shadow-xl`}>
            <div>
              <div className="bg-pink-500/10 text-pink-500 w-fit px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                {content.city}
              </div>
              <div className="space-y-6">
                <div>
                  <h5 className="text-[10px] font-black uppercase opacity-40 tracking-widest mb-2">Address</h5>
                  <p className="text-xl font-bold leading-snug">{content.address}</p>
                </div>
                <div>
                  <h5 className="text-[10px] font-black uppercase opacity-40 tracking-widest mb-2">Contact</h5>
                  <p className="text-xl font-bold">{content.phone}</p>
                </div>
              </div>
            </div>

            <a
              href={mapRedirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 group flex items-center justify-between bg-pink-500 hover:bg-pink-600 text-white p-2 pl-6 rounded-2xl transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-pink-500/20"
            >
              <span className="font-black uppercase tracking-widest text-xs">{content.mapBtn}</span>
              <div className="bg-white/20 p-3 rounded-xl group-hover:bg-white/30 transition-colors">
                📍
              </div>
            </a>
          </div>

          {/* Map Embed Card */}
          <div className={`lg:col-span-2 h-[400px] lg:h-auto min-h-[400px] rounded-[2rem] overflow-hidden border-4 ${
            isDarkMode ? "border-white/5" : "border-white"
          } shadow-2xl relative`}>
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: isDarkMode ? "invert(90%) hue-rotate(180deg) brightness(95%)" : "none" }}
              allowFullScreen=""
              loading="lazy"
              title="Frostify Location"
            ></iframe>
            
            {/* Custom Overlay for Dark Mode Map integration */}
            {isDarkMode && (
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-[2rem]"></div>
            )}
          </div>
        </div>

        {/* Brand Footnote */}
        <div className="mt-12 flex items-center gap-4 opacity-20 overflow-hidden whitespace-nowrap select-none">
          <div className="h-px bg-current flex-grow"></div>
          <span className="font-black uppercase tracking-[1em] text-[10px]">Frostify Artisan</span>
          <div className="h-px bg-current flex-grow"></div>
        </div>
      </div>
    </section>
  );
};

export default Locations;