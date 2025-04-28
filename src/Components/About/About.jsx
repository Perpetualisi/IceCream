import React from 'react';
import './About.css';

const About = ({ language, isDarkMode }) => {
  const translations = {
    en: {
      heading: "About Us",
      description: "We are a passionate company committed to providing the best service to our customers. Our team is dedicated to ensuring your satisfaction, with an unwavering focus on quality, integrity, and excellence. We believe in making a positive impact on our customers’ lives, one service at a time. From our humble beginnings, we have expanded our offerings, always keeping your needs in mind. Our journey has been marked by a continuous drive to innovate, improve, and adapt to the ever-changing landscape. As we move forward, we remain committed to delivering the highest standards of service in everything we do. Join us in our mission to redefine customer satisfaction!",
      image: "/aboutus.jpg"
    },
    fr: {
      heading: "À propos de nous",
      description: "Nous sommes une entreprise passionnée, engagée à fournir le meilleur service à nos clients. Notre équipe est dédiée à garantir votre satisfaction, avec un engagement indéfectible envers la qualité, l'intégrité et l'excellence. Nous croyons en l'impact positif que nous pouvons avoir sur la vie de nos clients, un service à la fois. Depuis nos débuts modestes, nous avons élargi notre offre tout en gardant vos besoins à l'esprit. Notre parcours a été marqué par une volonté continue d'innover, d'améliorer et de nous adapter à un environnement en constante évolution. En avançant, nous restons déterminés à offrir les plus hauts standards de service dans tout ce que nous entreprenons. Rejoignez-nous dans notre mission de redéfinir la satisfaction client !",
      image: "/aboutus.jpg" 
    },
    es: {
      heading: "Acerca de nosotros",
      description: "Somos una empresa apasionada comprometida a brindar el mejor servicio a nuestros clientes. Nuestro equipo está dedicado a garantizar su satisfacción, con un enfoque inquebrantable en la calidad, la integridad y la excelencia. Creemos en el impacto positivo que podemos tener en la vida de nuestros clientes, un servicio a la vez. Desde nuestros humildes comienzos, hemos ampliado nuestras ofertas, siempre teniendo en cuenta sus necesidades. Nuestro viaje ha estado marcado por un impulso continuo de innovar, mejorar y adaptarnos a un panorama siempre cambiante. A medida que avanzamos, seguimos comprometidos a ofrecer los más altos estándares de servicio en todo lo que hacemos. ¡Únase a nosotros en nuestra misión de redefinir la satisfacción del cliente!",
      image: "/aboutus.jpg" 
    },
  };

  return (
    <section id="about" className={`about ${isDarkMode ? 'dark' : ''}`}>
      <h2 className="about-heading">{translations[language].heading}</h2>
      <div className="about-content">
        <p className="about-description">{translations[language].description}</p>
        <img
          className="about-image"
          src={translations[language].image}
          alt="About Us"
        />
      </div>
    </section>
  );
};

export default About;
