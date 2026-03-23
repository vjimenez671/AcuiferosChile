import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Footer.css";
import logoSrc from "../imagenes/Logo.png";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-main">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Columna Marca */}
          <section className="footer-column-brand">
            <div className="footer-brand">
              <div className="footer-logo-wrapper">
                <img src={logoSrc} alt="Acuíferos Chile" />
              </div>
              <div className="footer-brand-text">
                <span className="footer-nombre-principal">Acuíferos</span>
                <span className="footer-nombre-secundario">Chile</span>
              </div>
            </div>
            <p className="foot-text">
              Ingeniería de vanguardia y gestión hídrica basada en evidencia científica para la resiliencia climática.
            </p>
            <div className="social-links">
              <a href="https://www.linkedin.com/company/acu%C3%ADferos-chile/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="https://www.instagram.com/acuiferoschile/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61584798719331" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            </div>
          </section>

          {/* Columna Mapa */}
          <section className="footer-column">
            <h4>Explorar</h4>
            <ul className="foot-links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/quienes-somos">¿Quiénes somos?</Link></li>
              <li><Link to="/rag">Tecnología RAG</Link></li>
              <li><Link to="/blog">Blog Técnico</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </section>

          {/* Columna Localización */}
          <section className="footer-column">
            <h4>Sede Central</h4>
            <ul className="foot-links">
              <li className="info-item"><i className="fas fa-map-marker-alt"></i> Santiago, Chile</li>
              <li className="info-item"><i className="fas fa-globe-americas"></i> Todo el territorio</li>
              <li className="info-email">
                <a href="mailto:contacto@acuiferoschile.cl">
                  <i className="fas fa-envelope"></i> contacto@acuiferoschile.cl
                </a>
              </li>
            </ul>
          </section>
        </div>

        <div className="legal-bar">
          <div className="legal-content">
            <p>© {currentYear} Acuíferos Chile. Todos los derechos reservados.</p>
            <nav className="legal-links">
              <Link to="/politica-privacidad">Privacidad</Link>
              <span className="separator">|</span>
              <Link to="/terminos">Términos</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};