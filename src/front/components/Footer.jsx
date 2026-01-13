import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand">
            <span>Acuíferos Chile</span>
          </div>
          <p className="foot-text">
            Ingeniería y operación para la seguridad hídrica del país.
          </p>
          <div className="social-links">
            <a href="https://www.instagram.com/acuiferoschile/" target="_blank" rel="noopener noreferrer" className="social-icon"><i class="fa-brands fa-instagram"></i></a>
            <a href="https://www.facebook.com/profile.php?id=61584798719331" target="_blank" rel="noopener noreferrer" className="social-icon"><i class="fa-brands fa-facebook"></i></a>
            <a href="https://www.linkedin.com/company/acu%C3%ADferos-chile/" target="_blank" rel="noopener noreferrer" className="social-icon"><i class="fa-brands fa-linkedin"></i></a>
          </div>
        </div>

        <div>
          <h4>Mapa</h4>
          <ul className="foot-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/quienes-somos">¿Quiénes somos?</Link></li>
            <li><Link to="/rag">RAG</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            {/* <li><Link to="/politica-privacidad">Privacidad</Link></li> */}
          </ul>
        </div>

        <div>
          <h4>Localización</h4>
          <ul className="foot-links">
            <li>Santiago, Chile</li>
          </ul>
        </div>
      </div>

      <div className="legal">
        <span>© {new Date().getFullYear()} Acuíferos Chile</span>

        <nav aria-label="Legal" className="legal-links">
          <Link to="/politica-privacidad">Privacidad</Link>
          {/* Si agregas términos a futuro:
          <span aria-hidden="true">·</span>
          <Link to="/terminos">Términos</Link> */}
        </nav>
      </div>
    </footer>
  );
};
