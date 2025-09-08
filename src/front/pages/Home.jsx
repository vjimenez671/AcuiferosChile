import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "../../styles/Home.css";
import bgUrl from "../imagenes/fondo-home.jpg"; // ✅ banner intacto

// Imágenes propias (mapas cenitales)
import foto1 from "../imagenes/recorte-1.png";
import foto2 from "../imagenes/recorte-2.png";
import foto3 from "../imagenes/recorte-3.png";
import foto4 from "../imagenes/recorte-4.png";

export const Home = () => {
  // ----- Lightbox (JS puro) -----
  const images = [
    { src: foto1, alt: "Mapa de ubicación del sector San Joaquín con polígono de estudio, ríos y vialidad; puntos P1–P3 y columnas litológicas de tres pozos con profundidad, nivel estático y caudal." },
    { src: foto2, alt: "Mapa regional de la cuenca Río Bueno Medio con derechos de aguas subterráneas (puntos) y detalle local con radios de protección de 200 m." },
    { src: foto3, alt: "Mapa geológico del sector San Joaquín con unidades cuaternarias (Hf, PlHf, Plgf1–2, Plgfa, Plm3) y rocas metamórficas CTrbm; hidrografía y vialidad." },
    { src: foto4, alt: "Mapa geológico de área con zona de estudio rayada, esteros Ma ule/La Arena/La Piedra, Río Camal; unidades PlHf, Plgf2, Plm4 y Msd; pozos con derecho concedido." },
  ];

  const [lightboxIndex, setLightboxIndex] = useState(null);
  const isOpen = lightboxIndex !== null;

  const openLightbox = (idx) => setLightboxIndex(idx);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  // Cerrar con ESC y navegar con ← →
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => (i === null ? 0 : (i + 1) % images.length));
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) => (i === null ? 0 : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeLightbox, images.length]);

  return (
    <main className="ac-home">
      {/* HERO */}
      <header
        className="hero hero--banner"
        role="banner"
        aria-label="Hero principal"
        style={{ backgroundImage: `url(${bgUrl})` }}
      >
        <div className="hero-overlay-left" aria-hidden="true"></div>
        <section className="hero-content container">
          <div className="hero-inner">
            <div className="hero-text">
              <p className="eyebrow">Gestión hídrica basada en evidencia</p>
              <h1>Recarga gestionada, monitoreo y trazabilidad para acuíferos en Chile</h1>
              <p className="lead">
                Somos una <strong>empresa emergente</strong> enfocada en{" "}
                <strong>Recarga Gestionada de Acuíferos (RAG)</strong>. Diseñamos pilotos,
                redes de monitoreo piezométrico y gobernanza de datos para preparar
                implementaciones seguras, medibles y escalables.
              </p>
              <div className="hero-cta">
                <Link className="btn btn-primary" to="/rag">Explorar RAG</Link>
                <Link className="btn btn-ghost" to="/contacto" aria-label="Hablar con el equipo">
                  Conversemos
                </Link>
              </div>
            </div>
            <div className="hero-visual" aria-hidden="true"></div>
          </div>
        </section>
      </header>

      {/* ESTADO ACTUAL (early-stage) */}
      <section className="kpis">
        <div className="container kpis-inner">
          <div className="kpi">
            <span className="kpi-label">Estado de clientes</span>
            <span className="kpi-value">Onboarding</span>
            <span className="kpi-note">Acuerdos marco y cartas de intención</span>
          </div>
          <div className="kpi">
            <span className="kpi-label">Pilotos RAG 2025</span>
            <span className="kpi-value">En diseño</span>
            <span className="kpi-note">Prefactibilidad & trazabilidad</span>
          </div>
          <div className="kpi">
            <span className="kpi-label">Telemetría</span>
            <span className="kpi-value">Listo para instalar</span>
            <span className="kpi-note">Pozos & estaciones con QA/QC</span>
          </div>
          <div className="kpi">
            <span className="kpi-label">Marco de cumplimiento</span>
            <span className="kpi-value">DGA & ODS 6</span>
            <span className="kpi-note">Reportes verificables</span>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="section" id="servicios" aria-labelledby="servicios-title">
        <div className="container">
          <div className="section-head">
            <div className="linea-divisora"></div>
            <h2 id="servicios-title">Servicios para iniciar con seguridad</h2>
            <p className="section-subtitle">
              Paquetes pensados para comenzar sin fricción: desde la prefactibilidad
              hasta el piloto instrumentado y su reporte.
            </p>
          </div>

          <div className="grid cards">
            <article className="card">
              <h3>Prefactibilidad & Sitio</h3>
              <p>
                Selección de áreas candidatas, revisión de fuentes (pluviales/superficiales),
                condiciones de suelo/acuífero y definición de <em>ventanas operativas</em>.
                Entregables claros para decidir avanzar a piloto.
              </p>
            </article>

            <article className="card">
              <h3>Piloto RAG instrumentado</h3>
              <p>
                Diseño de obra de recarga (trincheras/lechos/pozos), pretratamiento y plan de
                operación. Instrumentación con telemetría, QA/QC y tableros para medir respuesta.
              </p>
            </article>

            <article className="card">
              <h3>Datos, QA/QC & Reportes</h3>
              <p>
                Trazabilidad de caudales y niveles piezométricos, control de calidad, análisis de
                desempeño y reportes verificables para auditorías y toma de decisiones.
              </p>
            </article>

            <article className="card">
              <h3>Permisos & Relación con terceros</h3>
              <p>
                Alineamiento con criterios DGA, resguardo de derechos, comunicación con vecinos y
                protocolos de operación segura y sustentable.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CLIENTES & SECTORES */}
      <section className="section alt" id="clientes" aria-labelledby="clientes-title">
        <div className="container">
          <div className="linea-divisora"></div>
          <div className="section-head">
            <h2 id="clientes-title">Clientes y sectores que confían</h2>
            <p className="section-subtitle">
              Acompañamos a organizaciones que buscan avanzar a pilotos RAG con medición y
              trazabilidad desde el día uno.
            </p>
          </div>

          <div className="grid projects">
            <article className="project">
              <div className="tag">Sector Forestal</div>
              <h3>Clientes confidenciales</h3>
              <p>
                Programas de prefactibilidad y diseño de pilotos para disminuir escorrentía,
                favorecer recarga estacional y resguardar terceros.
              </p>
            </article>

            <article className="project">
              <div className="tag">Lechero & Agro</div>
              <h3>Clientes en onboarding</h3>
              <p>
                Propuestas para balance hídrico verificable y redes de monitoreo, preparando
                permisos y ventanas operativas por temporada.
              </p>
            </article>

            <article className="project">
              <div className="tag">Infraestructura hídrica</div>
              <h3>Alianzas técnicas</h3>
              <p>
                Integración con proveedores de sensores/telemetría y laboratorios para asegurar
                calidad de datos, continuidad y reportabilidad.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* GALERÍA 2x2 con Lightbox */}
      <section className="section" id="evidencias" aria-labelledby="evidencias-title">
        <div className="container container--wide">
          <div className="section-head">
            <div className="linea-divisora"></div>
            <h2 id="evidencias-title">Imágenes de avance</h2>
            <p className="section-subtitle">
              Mapas cenitales y cartografía técnica utilizados en prefactibilidades y diseño de
              pilotos. Material propio de Acuíferos Chile.
            </p>
          </div>

          {/* Cada figure se ajusta a la altura natural de su imagen */}
          <div className="grid gallery-grid gallery-2x2">
            {images.map((img, idx) => (
              <figure className="gallery-item" key={idx}>
                <div className="gallery-media">
                  <button
                    type="button"
                    className="gallery-btn"
                    onClick={() => openLightbox(idx)}
                    aria-label={`Abrir imagen: ${img.alt}`}
                  >
                    <img src={img.src} alt={img.alt} loading="lazy" />
                  </button>
                </div>
                <figcaption>{img.alt}</figcaption>
              </figure>
            ))}
          </div>

          <p className="gallery-note">
            *Imágenes con fines ilustrativos y de comunicación técnica.
          </p>
        </div>
      </section>

      {/* Lightbox */}
      {isOpen && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Visor de imagen"
          onClick={closeLightbox}
        >
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[lightboxIndex || 0].src}
              alt={images[lightboxIndex || 0].alt}
            />
            <button
              type="button"
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Cerrar imagen"
              title="Cerrar (Esc)"
            >
              ×
            </button>
            <button
              type="button"
              className="lightbox-nav lightbox-prev"
              onClick={() =>
                setLightboxIndex((i) => ((i ?? 0) - 1 + images.length) % images.length)
              }
              aria-label="Imagen anterior"
              title="Anterior (←)"
            >
              ‹
            </button>
            <button
              type="button"
              className="lightbox-nav lightbox-next"
              onClick={() =>
                setLightboxIndex((i) => ((i ?? 0) + 1) % images.length)
              }
              aria-label="Imagen siguiente"
              title="Siguiente (→)"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </main>
  );
};
