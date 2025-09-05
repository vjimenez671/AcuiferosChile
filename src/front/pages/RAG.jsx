import React from "react";
import "../../styles/RAG.css";
import { Link } from "react-router-dom";
import ragImg from "../imagenes/rag-2.png"; // 👈 importa la imagen

export default function RAG() {
  return (
    <main className="rag-page">
      <header className="rag-hero" role="banner" aria-label="Recarga gestionada de acuíferos (RAG)">
        <div className="rag-hero__overlay" aria-hidden="true"></div>
        <section className="container rag-hero__content">
          <div className="rag-hero__grid">
            <div className="rag-hero__text">
              <p className="eyebrow">Gestión hídrica basada en evidencia</p>
              <h1>Recarga Gestionada de Acuíferos (RAG)</h1>
              <p className="lead">
                Métodos para <strong>recargar agua intencionalmente</strong> en los acuíferos, favoreciendo
                su recuperación, uso posterior y beneficios ambientales.
              </p>
              <div className="hero-cta">
                <Link className="btn btn-primary" to="/contacto">Conversemos su factibilidad</Link>
              </div>
            </div>

            <div className="rag-hero__right">
              <img src={ragImg} alt="Recarga gestionada de acuíferos" />
            </div>
          </div>
        </section>
      </header>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="linea-divisora" />
            <h2>Definiciones clave</h2>
            <p className="section-subtitle">Conceptos operativos y su relación en un programa de RAG.</p>
          </div>

          <div className="surface-grid">
            <div className="surface">
              <h3>¿Qué es la RAG?</h3>
              <p>
                La <strong>Recarga Gestionada de Acuíferos (RAG)</strong> es el conjunto de métodos utilizados para
                recargar agua adicional a los acuíferos de manera intencional para su recuperación y uso posterior
                o con el propósito de generar un beneficio ambiental (Dillon, 2005).
              </p>
            </div>

            <div className="surface">
              <h3>¿Qué es recarga?</h3>
              <p>
                La <strong>recarga</strong> es el flujo descendente de agua que llega al nivel piezométrico
                y se suma al almacenamiento de agua subterránea (Lerner et&nbsp;al., 1990).
              </p>
            </div>

            <div className="surface span-2">
              <h3>Infiltración, escorrentía y factores</h3>
              <p>
                La <strong>infiltración</strong> es la entrada de agua al subsuelo; no toda alcanza el acuífero,
                parte se transforma en <strong>escorrentía</strong>. La capacidad de infiltración depende de:
              </p>
              <ul className="list-inline">
                <li>Clima (intensidad/duración, ET)</li>
                <li>Geología / hidrogeología</li>
                <li>Morfología / pendiente</li>
                <li>Suelo (textura, compactación)</li>
                <li>Vegetación / coberturas</li>
              </ul>
              <p className="muted">
                La interacción de estos factores define el mecanismo de recarga y su eficiencia.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <div className="linea-divisora" />
            <h2>Beneficios y aplicación</h2>
          </div>

          <div className="benefits-wrap">
            <div className="panel panel--tint">
              <h3>Beneficios</h3>
              <ul className="list-check">
                <li>Mitigación de efectos de sequías</li>
                <li>Bajos costos y bajo impacto ambiental</li>
                <li>Flexibilidad de diseño e integración operativa</li>
                <li>Mejora de niveles piezométricos y resiliencia</li>
              </ul>
            </div>

            <div className="panel">
              <h3>Casos típicos</h3>
              <ul className="list-dot">
                <li>Predios con descensos piezométricos o riesgo de descenso</li>
                <li>Predios que no puedan inscribir nuevos derechos de agua</li>
                <li>Gestión de excedentes pluviales o caudales estacionales</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section video-block">
        <div className="container">
          <div className="section-head">
            <div className="linea-divisora" />
            <h2>RAG en acción</h2>
            <p className="section-subtitle">Una visión práctica del funcionamiento de la recarga gestionada.</p>
          </div>

          <figure className="media-embed">
            <iframe
              src="https://www.youtube-nocookie.com/embed/5mvm_wBydBg?rel=0"
              title="Recarga Gestionada de Acuíferos (RAG) - Video explicativo"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            <figcaption>
              Fuente: demostración del flujo de una intervención RAG.{" "}
              <a href="https://youtu.be/5mvm_wBydBg" target="_blank" rel="noreferrer">Ver en YouTube</a>.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="linea-divisora" />
            <h2>Marco legal (Chile)</h2>
            <p className="section-subtitle">Código de Aguas reformado y lineamientos DGA recientes.</p>
          </div>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot" aria-hidden />
              <div className="timeline-card">
                <h3>Código de Aguas (Ley N° 21.435, 2022)</h3>
                <ul className="bullets">
                  <li><strong>Art. 66 y 67:</strong> contempla obras de RAG y regula la gestión de derechos asociados.</li>
                  <li>
                    <strong>Art. 10:</strong> el uso de aguas pluviales dentro de un predio corresponde a su dueño
                    mientras corran dentro de su predio o no caigan a cauces naturales de uso público.
                  </li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot" aria-hidden />
              <div className="timeline-card">
                <h3>Circular DGA N° 3 (junio 2024)</h3>
                <p>
                  Define <em>recarga natural</em> como caudal que alimenta un acuífero sin intervención humana.
                  Las obras de RAG con aguas pluviales <strong>no requieren informe previo</strong> ante la DGA.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot" aria-hidden />
              <div className="timeline-card">
                <h3>Circular DGA N° 2 (julio 2025)</h3>
                <p>
                  El titular que ejecute RAG puede solicitar autorización para <strong>reutilizar</strong> la mayor parte
                  de las aguas recargadas, considerando pérdidas, sustentabilidad del acuífero y derechos de terceros.
                </p>
              </div>
            </div>
          </div>

          <div className="callout">
            <p>
              <strong>Importante:</strong> cada proyecto RAG requiere evaluación hidrogeológica y diseño de control
              (balance, trazabilidad, QA/QC y protección de terceros).
            </p>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <div className="linea-divisora" />
            <h2>Diseño y operación</h2>
            <p className="section-subtitle">Enfoque modular según fuente, suelo/acuífero y objetivo.</p>
          </div>

          <div className="modules">
            <div className="module">
              <h3>Fuentes & pretratamiento</h3>
              <ul className="list-dot tight">
                <li>Pluviales / excedentes superficiales</li>
                <li>Decantación, filtración y control de sólidos</li>
                <li>Gestión estacional y ventanas operativas</li>
              </ul>
            </div>

            <div className="module">
              <h3>Obras de recarga</h3>
              <ul className="list-dot tight">
                <li>Trincheras, estanques y lechos de infiltración</li>
                <li>Pozos de recarga e inyección controlada</li>
                <li>Protección y manejo de colmatación</li>
              </ul>
            </div>

            <div className="module">
              <h3>Monitoreo & gobernanza</h3>
              <ul className="list-dot tight">
                <li>Red piezométrica y balance hídrico</li>
                <li>Telemetría, tableros, alertas y QA/QC</li>
                <li>Reportes verificables y cumplimiento</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
