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
        </div>
        <div>
          <h4>Mapa</h4>
          <ul className="foot-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/servicios">Servicios</Link></li>
            <li><Link to="/proyectos">Proyectos</Link></li>
            <li><Link to="/impacto">Impacto</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contacto</h4>
          <ul className="foot-links">
            <li><a href="mailto:ojimenez@acuiferoschile.com">ojimenez@acuiferoschile.com</a></li>
            <li>Santiago, Chile</li>
          </ul>
        </div>
      </div>
      <div className="legal">
        <span>© {new Date().getFullYear()} Acuíferos Chile</span>
        <Link to="/privacidad">Privacidad</Link>
      </div>
    </footer>
  );
};
