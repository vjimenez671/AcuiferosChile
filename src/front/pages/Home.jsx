import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Home.css";

export const Home = () => {
  return (
    <main className="ac-home">
      <header className="hero hero--banner" role="banner" aria-label="Hero principal">
        <div className="hero-overlay-left" aria-hidden="true"></div>
        <section className="hero-content container">
          <div className="hero-inner">
            <div className="hero-text">
              <p className="eyebrow">Gestión hídrica basada en evidencia</p>
              <h1>Cuidado, recarga y monitoreo de acuíferos en Chile</h1>
              <p className="lead">
                Soluciones técnicas para la seguridad hídrica: <strong>recarga artificial (ARS)</strong>,
                monitoreo continuo y <strong>gestión trazable</strong> orientada a sostenibilidad y cumplimiento.
              </p>
              <div className="hero-cta">
                <Link className="btn btn-primary" to="/proyectos">Ver proyectos</Link>
                <Link className="btn btn-ghost" to="/servicios" aria-label="Ver servicios">Nuestros servicios</Link>
              </div>
            </div>
            <div className="hero-visual" aria-hidden="true"></div>
          </div>
        </section>
      </header>

      <section className="kpis">
        <div className="container kpis-inner">
          <div className="kpi">
            <span className="kpi-label">Volumen gestionado</span>
            <span className="kpi-value">+200.000 m³</span>
            <span className="kpi-note">Recarga/gestión*</span>
          </div>
          <div className="kpi">
            <span className="kpi-label">Operación</span>
            <span className="kpi-value">24/7</span>
            <span className="kpi-note">Monitoreo y alertas</span>
          </div>
          <div className="kpi">
            <span className="kpi-label">Marco</span>
            <span className="kpi-value">Normativa</span>
            <span className="kpi-note">Buenas prácticas DGA / ODS 6</span>
          </div>
          <div className="kpi">
            <span className="kpi-label">Gobernanza</span>
            <span className="kpi-value">Transparencia</span>
            <span className="kpi-note">Reportes verificables</span>
          </div>
        </div>
      </section>

      <section className="section" id="servicios" aria-labelledby="servicios-title">
        <div className="container">
          <div className="section-head">
            <div className="linea-divisora"></div>
            <h2 id="servicios-title">Servicios</h2>
            <p className="section-subtitle">Ingeniería y operación con foco en resultados y cumplimiento normativo.</p>
          </div>

          <div className="grid cards">
            <article className="card">
              <h3>Recarga Artificial (ARS)</h3>
              <p>Diseño y operación de obras de infiltración, pozos de recarga y gestión de caudales con balance hídrico y modelación.</p>
            </article>

            <article className="card">
              <h3>Monitoreo & Supervisión</h3>
              <p>Redes piezométricas, sensórica, tableros y alertas. QA/QC de datos y trazabilidad completa.</p>
            </article>

            <article className="card">
              <h3>Consultoría Hídrica</h3>
              <p>Estudios hidrogeológicos, permisos, compliance y planes de gestión sostenible del recurso.</p>
            </article>

            <article className="card">
              <h3>I+D e Innovación</h3>
              <p>Ensayos, modelación y analítica avanzada para mejorar eficiencia de recarga y protección de acuíferos.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section alt" id="proyectos" aria-labelledby="proyectos-title">
        <div className="container">
          <div className="linea-divisora"></div>
          <div className="section-head">
            <h2 id="proyectos-title">Proyectos destacados</h2>
            <p className="section-subtitle">Intervenciones con métricas claras de impacto social y ambiental.</p>
          </div>

          <div className="grid projects">
            <article className="project">
              <div className="tag">Piloto ARS</div>
              <h3>Valle Central</h3>
              <p>Infiltración estacional con control de sólidos y monitoreo piezométrico.</p>
            </article>

            <article className="project">
              <div className="tag">Monitoreo</div>
              <h3>Cuenca Norte</h3>
              <p>Red de pozos con telemetría en tiempo real y tablero de alertas.</p>
            </article>

            <article className="project">
              <div className="tag">I+D</div>
              <h3>Altiplano</h3>
              <p>Ensayos de infiltración en condiciones de alta oscilación térmica.</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
};
