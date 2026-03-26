import React, { useEffect } from "react";
import "../../styles/Contact.css";

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const socialLinks = {
    instagram: "https://www.instagram.com/acuiferoschile/",
    facebook: "https://www.facebook.com/people/Acu%C3%ADferos-Chile/61584798719331/",
    linkedin: "https://www.linkedin.com/company/acu%C3%ADferos-chile/posts/?feedView=all"
  };

  return (
    <main className="contact-unique-context">
      <div className="container">
        {/* ENCABEZADO SIN MARGEN SUPERIOR EXCESIVO */}
        <header className="contact-premium-header">
          <span className="contact-tag-premium">Canales Oficiales</span>
          <h1 className="contact-display-h1">Hablemos de <br /><span>Seguridad Hídrica.</span></h1>
          <p className="contact-subtitle">
            Estamos a tu disposición para resolver dudas técnicas sobre Recarga Gestionada
            de Acuíferos y soluciones de ingeniería avanzadas.
          </p>
        </header>

        <section className="contact-grid">
          {/* Tarjeta de Información con Contraste Reforzado */}
          <div className="contact-card-premium info-main-card">
            <div className="contact-method-item">
              <div className="icon-wrap">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div className="text-body">
                <strong>Ubicación Base</strong>
                <p>Santiago, Chile</p>
                <span className="sub-text">Proyectos a lo largo del territorio nacional</span>
              </div>
            </div>

            <div className="contact-method-item">
              <div className="icon-wrap">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div className="text-body">
                <strong>Correo Corporativo</strong>
                <p>contacto@acuiferoschile.cl</p>
              </div>
            </div>

            <div className="contact-method-item">
              <div className="icon-wrap">
                <i className="fa-solid fa-clock"></i>
              </div>
              <div className="text-body">
                <strong>Horario de Atención</strong>
                <p>Lunes a Viernes: 09:00 - 18:00 hrs</p>
              </div>
            </div>
          </div>

          {/* Tarjeta de Redes Sociales (Orden: IG, FB, LI) */}
          <div className="contact-card-premium social-links-card">
            <div className="card-header">
              <i className="fa-solid fa-share-nodes header-icon"></i>
              <h3>Nuestras Redes</h3>
            </div>
            <p className="card-p">Síguenos para conocer nuestros últimos proyectos, hitos y avances en tecnología RAG.</p>

            <div className="social-action-list">
              <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="social-action-btn ig">
                <i className="fa-brands fa-instagram"></i>
                <span>Síguenos en Instagram</span>
                <i className="fa-solid fa-arrow-right arrow"></i>
              </a>
              <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="social-action-btn fb">
                <i className="fa-brands fa-facebook-f"></i>
                <span>Visítanos en Facebook</span>
                <i className="fa-solid fa-arrow-right arrow"></i>
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="social-action-btn li">
                <i className="fa-brands fa-linkedin-in"></i>
                <span>Conectar en LinkedIn</span>
                <i className="fa-solid fa-arrow-right arrow"></i>
              </a>
            </div>
          </div>
        </section>

        <footer className="contact-premium-footer">
          <p>Acuíferos Chile • Ingeniería basada en evidencia técnica.</p>
          <div className="footer-line"></div>
        </footer>
      </div>
    </main>
  );
}