import { Link } from "react-router-dom";
import React, { useState } from "react";
import "../../styles/Navbar.css";
import logoSrc from "../imagenes/Logo.png";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  return (
    <nav className="navbar" aria-label="Primary">
      <div className="navbar-brand">
        <Link to="/" className="brand-link" onClick={close}>
          <div className="contenedor-logo">
            <img src={logoSrc} alt="Acuíferos Chile" />
          </div>
          <span className="nombre">Acuíferos Chile</span>
        </Link>
      </div>

      <button
        className={`hamburger ${open ? "is-open" : ""}`}
        aria-label="Abrir menú"
        aria-expanded={open ? "true" : "false"}
        aria-controls="navbar-menu"
        onClick={toggle}
      >
        <span />
        <span />
        <span />
      </button>

      <ul id="navbar-menu" className={`navbar-menu ${open ? "open" : ""}`}>
        <li className="elemento"><Link to="/quienes-somos" onClick={close}>Quiénes somos</Link></li>
        <li className="elemento"><Link to="/servicios" onClick={close}>Servicios</Link></li>
        <li className="elemento"><Link to="/proyectos" onClick={close}>Proyectos</Link></li>
        <li className="elemento"><Link to="/impacto" onClick={close}>Impacto</Link></li>
        <li className="elemento"><Link className="btn btn-primary" to="/contacto" onClick={close}>Contáctanos</Link></li>
      </ul>
    </nav>
  );
};
