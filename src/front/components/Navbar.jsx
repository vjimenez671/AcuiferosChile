import { Link } from "react-router-dom";
import React from "react";
import "../../styles/Navbar.css";

import logoSrc from "../imagenes/AcuíferosChile.jpg"; // sube un nivel desde components → front/imagenes

export const Navbar = () => {
  return (
    <nav className="navbar" aria-label="Primary">
      <div className="navbar-brand">
        <div className="contenedor-logo"><img src={logoSrc} alt="Acuíferos Chile" /></div>
		
        <span className="nombre">Acuíferos Chile</span>
      </div>
      <ul className="navbar-menu">
        <li className="elemento"><a href="/quienes-somos">Quiénes somos</a></li>
        <li className="elemento"><a href="/servicios">Servicios</a></li>
        <li className="elemento"><a href="/proyectos">Proyectos</a></li>
        <li className="elemento"><a href="/impacto">Impacto</a></li>
        <li className="elemento"><a className="btn btn-primary" href="/contacto">Contáctanos</a></li>
      </ul>
    </nav>
  );
};