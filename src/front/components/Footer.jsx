import React from "react";
import "../../styles/Footer.css";
import logoSrc from "../imagenes/AcuíferosChile.jpg"; // sube un nivel desde components → front/imagenes

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
            <li><a href="/">Inicio</a></li>
            <li><a href="/servicios">Servicios</a></li>
            <li><a href="/proyectos">Proyectos</a></li>
            <li><a href="/impacto">Impacto</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
        </div>
        <div>
          <h4>Contacto</h4>
          <ul className="foot-links">
            <li><a href="mailto:contacto@acuiferoschile.cl">contacto@acuiferoschile.cl</a></li>
            <li><a href="tel:+56900000000">+56 9 0000 0000</a></li>
            <li>Santiago, Chile</li>
          </ul>
        </div>
      </div>
      <div className="legal">
        <span>© {new Date().getFullYear()} Acuíferos Chile</span>
        <a href="/privacidad">Privacidad</a>
      </div>
    </footer>
  );
};
