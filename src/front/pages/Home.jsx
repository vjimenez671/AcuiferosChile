import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Home.css";
import bgUrl from "../imagenes/fondo-home.jpg"; // 👈 importamos la imagen local

export const Home = () => {
  return (
    <main className="ac-home">
      <header
        className="hero hero--banner"
        role="banner"
        aria-label="Hero principal"
        style={{ backgroundImage: `url(${bgUrl})` }} // 👈 aplicamos el fondo aquí
      >
        <div className="hero-overlay-left" aria-hidden="true"></div>
        <section className="hero-content container">
          <div className="hero-inner">
            <div className="hero-text">
              <p className="eyebrow">Gestión hídrica basada en evidencia</p>
              <h1>Recarga gestionada, monitoreo y trazabilidad para acuíferos en Chile</h1>
              <p className="lead">
                Implementamos <strong>Recarga Gestionada de Acuíferos (RAG)</strong>, redes de monitoreo piezométrico y{" "}
                <strong>gobernanza de datos</strong> para mejorar la seguridad hídrica, cumplir normativa y proteger a terceros.
              </p>
              <div className="hero-cta">
                <Link className="btn btn-primary" to="/rag">Explorar RAG</Link>
                <Link className="btn btn-ghost" to="/clientes" aria-label="Hablar con el equipo">
                  Nuestros clientes
                </Link>
              </div>
            </div>
            <div className="hero-visual" aria-hidden="true"></div>
          </div>
        </section>
      </header>

      <section className="kpis">
        <div className="container kpis-inner">
          <div className="kpi">
            <span className="kpi-label">Volumen recargado/gestionado</span>
            <span className="kpi-value">+200.000 m³</span>
            <span className="kpi-note">Balance hídrico trazable*</span>
          </div>
          <div className="kpi">
            <span className="kpi-label">Sitios con telemetría</span>
            <span className="kpi-value">30+</span>
            <span className="kpi-note">Pozos & estaciones</span>
          </div>
          <div className="kpi">
            <span className="kpi-label">Disponibilidad de datos</span>
            <span className="kpi-value">24/7</span>
            <span className="kpi-note">Alertas y QA/QC</span>
          </div>
          <div className="kpi">
            <span className="kpi-label">Marco de cumplimiento</span>
            <span className="kpi-value">DGA & ODS 6</span>
            <span className="kpi-note">Reportes verificables</span>
          </div>
        </div>
      </section>

      <section className="section" id="servicios" aria-labelledby="servicios-title">
        <div className="container">
          <div className="section-head">
            <div className="linea-divisora"></div>
            <h2 id="servicios-title">Servicios</h2>
            <p className="section-subtitle">
              Ingeniería de recarga, monitoreo hidrogeológico y trazabilidad para decisiones y cumplimiento.
            </p>
          </div>

          <div className="grid cards">
            <article className="card">
              <h3>RAG (Recarga Gestionada)</h3>
              <p>
                Diseño/operación de trincheras y lechos de infiltración, pozos de recarga e inyección controlada;
                pretratamiento (decantación/filtración) y control de colmatación; ventanas operativas estacionales.
              </p>
            </article>

            <article className="card">
              <h3>Monitoreo & Supervisión</h3>
              <p>
                Redes piezométricas, sensores y telemetría con tableros y alertas. QA/QC, series temporales y
                líneas base para evaluar respuesta del acuífero y proteger a terceros.
              </p>
            </article>

            <article className="card">
              <h3>Modelación & Permisos</h3>
              <p>
                Balance hídrico, modelación conceptual y numérica de flujo; apoyo en trámites y criterios de DGA,
                con énfasis en Art. 66/67 y uso de aguas pluviales (Art. 10).
              </p>
            </article>

            <article className="card">
              <h3>Gobernanza & Transparencia</h3>
              <p>
                Protocolos de datos, reportes verificables y trazabilidad de volúmenes. Evidencia para auditorías,
                due diligence y metas ESG/ODS.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section alt" id="proyectos" aria-labelledby="proyectos-title">
        <div className="container">
          <div className="linea-divisora"></div>
          <div className="section-head">
            <h2 id="proyectos-title">Proyectos destacados</h2>
            <p className="section-subtitle">
              Implementaciones con métricas de recarga, control de niveles y reportabilidad continua.
            </p>
          </div>

          <div className="grid projects">
            <article className="project">
              <div className="tag">RAG · Piloto</div>
              <h3>Valle Central</h3>
              <p>
                Estanques de infiltración con pretratamiento y monitoreo piezométrico. Mejora estacional de niveles
                y reducción de escorrentía superficial.
              </p>
            </article>

            <article className="project">
              <div className="tag">Monitoreo 24/7</div>
              <h3>Cuenca Norte</h3>
              <p>
                Red de pozos con telemetría, QA/QC automático y tableros. Alertas tempranas por variaciones de nivel
                y extracción.
              </p>
            </article>

            <article className="project">
              <div className="tag">Modelación & Cumplimiento</div>
              <h3>Zona Sur</h3>
              <p>
                Balance hídrico y modelación para optimizar ventanas operativas de recarga y respaldo de reportes
                normativos y de sostenibilidad.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
};
