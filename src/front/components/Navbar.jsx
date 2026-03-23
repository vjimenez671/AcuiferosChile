import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../../styles/Navbar.css";
import logoSrc from "../imagenes/Logo.png";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const toggle = () => {
    setOpen(!open);
    document.body.style.overflow = !open ? 'hidden' : 'auto';
  };

  const close = () => {
    setOpen(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    close();
  }, [location.pathname]);

  return (
    <nav className={`navbar ${open ? "menu-open" : ""}`}>
      <div className="container navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            <div className="contenedor-logo">
              <img src={logoSrc} alt="Logo" />
            </div>
            <div className="brand-text-container">
              <span className="nombre-principal">Acuíferos</span>
              <span className="nombre-secundario"> Chile</span>
              <div className="brand-underline"></div>
            </div>
          </Link>
        </div>

        <button
          className={`hamburger ${open ? "is-open" : ""}`}
          onClick={toggle}
          aria-label="Menú"
        >
          <div className="hamburger-box">
            <div className="hamburger-inner"></div>
          </div>
        </button>

        <ul className={`navbar-menu ${open ? "open" : ""}`}>
          <li className="elemento"><Link to="/quienes-somos">Quiénes somos</Link></li>
          <li className="elemento"><Link to="/rag">¿Qué es RAG?</Link></li>
          <li className="elemento">
            <a href="https://ia.acuiferoschile.cl" target="_blank" rel="noreferrer" className="nav-accent-link">
              Evalúa tu terreno <i className="fas fa-microchip" style={{ fontSize: '0.7rem', marginLeft: '4px' }}></i>
            </a>
          </li>
          <li className="elemento"><Link to="/blog">Blog</Link></li>
          <li className="elemento"><Link to="/contacto">Contacto</Link></li>
        </ul>
      </div>
    </nav>
  );
};