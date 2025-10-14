import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../../styles/Navbar.css";
import logoSrc from "../imagenes/Logo.png";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setIsAuth(true);
      try {
        const parsed = JSON.parse(user);
        setUserName(parsed.name || "");
      } catch {
        setUserName("");
      }
    } else {
      setIsAuth(false);
      setUserName("");
    }
  };

  useEffect(() => {
    checkAuth();
  }, [location.pathname]);

  useEffect(() => {
    const onAuthChanged = () => checkAuth();
    window.addEventListener("auth-changed", onAuthChanged);
    return () => window.removeEventListener("auth-changed", onAuthChanged);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuth(false);
    setUserName("");
    window.dispatchEvent(new Event("auth-changed"));
    close();
    navigate("/");
  };

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
        <li className="elemento">
          <Link to="/quienes-somos" onClick={close}>Quiénes somos</Link>
        </li>
        <li className="elemento">
          <Link to="/rag" onClick={close}>¿Qué es la RAG?</Link>
        </li>

        <li className="elemento">
          <a
            href="https://ia.acuiferoschile.cl"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            aria-label="Abrir IA de prefactibilidad de Acuíferos Chile en una nueva pestaña"
            title="Analiza tu terreno con IA y estima la viabilidad de recargar acuíferos"
          >
            Evaluar mi terreno
          </a>
        </li>

        <li className="elemento">
          <Link to="/blog" onClick={close}>Blog</Link>
        </li>

        {/* Enlace externo con mismo estilo que los demás */}


        <li className="elemento">
          <Link to="/contacto" onClick={close}>Contáctanos</Link>
        </li>

        {!isAuth ? (
          <li className="elemento">
            <Link className="btn btn-ghost" to="/signin" onClick={close}>Iniciar sesión</Link>
          </li>
        ) : (
          <>
            <li className="elemento bienvenido">Bienvenido/a {userName}</li>
            <li className="elemento">
              <button className="btn btn-ghost btn-logout" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
