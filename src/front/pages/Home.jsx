import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "../../styles/Home.css";
import bgUrl from "../imagenes/fondo-home.jpg"; // ✅ banner intacto

// Imágenes propias (nueva galería en 2 columnas)
import estratigrafia from "../imagenes/estratigrafia.png";
import mapaGeologico from "../imagenes/mapa-geologico-1.png";
import mapaGeologicoZona from "../imagenes/mapa-geologico-2.png";
import mapaHidrogeologico from "../imagenes/mapa-hidrogeológico-1.png";
import perfilZona from "../imagenes/perfil-zona.png";
import pozos from "../imagenes/pozos.png";

// ✅ QR para CTA en el hero (lado izquierdo)
import qrAcuiferos from "../imagenes/qr-acuiferos-transparent.png";

export const Home = () => {
  // ----- Imágenes por columna -----
  const imagesLeft = [
    {
      src: estratigrafia,
      alt:
        "Talud expuesto con capa de tierra vegetal sobre paquete grueso de grava de arenas con lentes de arenas finas; superficies de estratificación y contactos marcados; textura heterométrica; barra de escala 0–5 m.",
      caption:
        "Estratigrafía: capa vegetal sobre gravas arenosas con lentes finos; contactos marcados. Escala 0–5 m."
    },
    {
      src: mapaGeologico,
      alt:
        "Mapa geológico regional 1:50.000 con unidades Plm4, Plgf2 y PlHf; hidrografía principal (Estero Maule, La Arena y Río Camal), rutas viales, zona de estudio hachurada y pozos con derecho concedido.",
      caption:
        "Mapa regional: Plm4, Plgf2 y PlHf; hidrografía, vialidad, zona de estudio y pozos (1:50.000)."
    },
    {
      src: mapaGeologicoZona,
      alt:
        "Mapa geológico local 1:70.000 con depósitos fluviales y glaciofluviales (Hf, PlHf, Plgf1–2, Plgfa, Plm3) y afloramientos metamórficos CTrbm; drenaje y caminos; polígono de estudio resaltado.",
      caption:
        "Detalle local: Hf, PlHf, Plgf1–2, Plgfa, Plm3 y CTrbm; drenaje y polígono de estudio (1:70.000)."
    },
    {
      src: mapaHidrogeologico,
      alt:
        "Mapa hidrogeológico con unidades A1–A2–B2 en depósitos no consolidados y C2 en roca fisurada; red de ríos, vías, zona rural y polígono de estudio; clasificación por importancia de acuíferos.",
      caption:
        "Mapa hidrogeológico: A1–A2–B2 (no consolidados) y C2 (roca fisurada); base para priorizar recarga."
    }
  ];

  const imagesRight = [
    {
      src: perfilZona,
      alt:
        "Perfil geológico–piezométrico SW–NE con PlHf, Plgf2, Plm4 y Formación Santo Domingo (Msd); trazas de esteros, línea piezométrica y ubicación de P1 y P4; escalas horizontal (km) y vertical (m s.n.m.).",
      caption:
        "Sección SW–NE: PlHf, Plgf2, Plm4 y Msd; esteros, nivel piezométrico y P1–P4."
    },
    {
      src: pozos,
      alt:
        "Columnas litológicas de cuatro pozos con profundidades, niveles estáticos y caudales; materiales (arcilla, arena, gravas con arenas y roca sólida) y tramos de cañería; pozo 4 surgente 44,1 l/s.",
      caption:
        "Pozos: litología, cañerías y parámetros; destaca pozo surgente (44,1 l/s)."
    }
  ];

  // Orden global para el lightbox (columna izquierda arriba→abajo, luego derecha)
  const images = [...imagesLeft, ...imagesRight];

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
      {/* HERO (no tocar estructura general) */}
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

              <h1>¿Problemas de disponibilidad de agua en verano?</h1>
              <h2>Almacénala en invierno con recarga gestionada.</h2>

              <p className="lead">
                Diseñamos <strong>Recarga Gestionada de Acuíferos (RAG)</strong> para aprovechar el agua de invierno,
                almacenarla de manera segura en el subsuelo y disponer de ella cuando más se necesita.
                Monitoreo, trazabilidad y reportes verificables desde el día uno.
              </p>

              <div className="hero-cta">
                <Link className="btn btn-primary" to="/rag">Explorar RAG</Link>
                <Link className="btn btn-ghost" to="/contacto" aria-label="Hablar con el equipo">
                  Conversemos
                </Link>

                {/* Bloque con mensaje + botón + QR */}
                <div className="cta-block">
                  <p className="cta-sub">
                    <strong>Descubre el Potencial Hídrico Oculto de tu Campo</strong>
                  </p>

                  {/* Botón externo hacia la IA con QR a su derecha */}
                  <div className="cta-inline">
                    <a
                      className="btn btn-accent"
                      href="https://ia.acuiferoschile.cl"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Abrir IA de prefactibilidad de Acuíferos Chile en una nueva pestaña"
                    >
                      Calcular viabilidad en segundos
                    </a>

                    <div className="hero-qr hero-qr--inline" aria-label="Código QR para acceder a ia.acuiferoschile.cl">
                      <img
                        src={qrAcuiferos}
                        alt="QR que abre ia.acuiferoschile.cl"
                        loading="eager"
                      />
                      <small className="hero-qr__caption">o escanea el código QR</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-visual" aria-hidden="true"></div>
          </div>
        </section>
      </header>

      {/* ETAPAS DETALLADAS */}
      <section className="section" id="servicios" aria-labelledby="servicios-title">
        <div className="container">
          <div className="section-head">
            <div className="linea-divisora"></div>
            <h2 id="servicios-title">De la prefactibilidad a la operación</h2>
            <p className="section-subtitle">
              Alineamos técnica, regulación y QA/QC para decisiones trazables y proyectos ejecutables. <br />
              <strong>
                Ofrecemos el ciclo completo: realizamos los estudios de viabilidad, nos encargamos del diseño y la
                construcción de las obras, y aseguramos su éxito con un monitoreo posterior para verificar y cuantificar los resultados.
              </strong>
            </p>
          </div>

          {/* Filas (rows) */}
          <div className="stages-rows">
            {/* 1. Conceptual / Prefactibilidad */}
            <article className="stage-row">
              <div className="stage-row__aside">
                <span className="stage-badge">1</span>
              </div>
              <div className="stage-row__main">
                <h3>Ingeniería Conceptual — Prefactibilidad del Sitio</h3>
                <p>
                  Tras una <strong>evaluación preliminar online</strong>,
                  entregamos un informe que integra el análisis técnico (hidrología, hidrogeología, etc.)
                  con el regulatorio, incluyendo la <strong>verificación de derechos de agua</strong> para asegurar la viabilidad legal.
                </p>
              </div>
            </article>

            {/* 2. Detalle */}
            <article className="stage-row">
              <div className="stage-row__aside">
                <span className="stage-badge">2</span>
              </div>
              <div className="stage-row__main">
                <h3>Ingeniería de Detalle — Estudios de Campo y Diseño de Obra</h3>
                <p>
                  Realizamos los estudios de campo necesarios (<em>geología, ensayos de infiltración, topografía y geofísica</em>)
                  para obtener datos precisos del sitio. Con esta información desarrollamos la <strong>ingeniería final</strong>:
                  bases técnicas, planos de construcción y presupuesto del proyecto.
                </p>
                <p className="muted">
                  Además, construimos un <strong>modelo numérico de flujo</strong> como herramienta para la gestión futura del recurso.
                </p>
              </div>
            </article>

            {/* 3. Construcción */}
            <article className="stage-row">
              <div className="stage-row__aside">
                <span className="stage-badge">3</span>
              </div>
              <div className="stage-row__main">
                <h3>Construcción de Obra</h3>
                <p>
                  Materializamos el proyecto construyendo obras de recarga (<em>piscinas, zanjas</em> u otras soluciones)
                  conforme a la Ingeniería de Detalle. Gestionamos la construcción asegurando <strong>calidad (QA/QC)</strong> y seguridad en cada etapa.
                </p>
              </div>
            </article>

            {/* 4. Operación y Monitoreo */}
            <article className="stage-row">
              <div className="stage-row__aside">
                <span className="stage-badge">4</span>
              </div>
              <div className="stage-row__main">
                <h3>Operación y Monitoreo</h3>
                <p>
                  Aseguramos el rendimiento a largo plazo mediante el <strong>monitoreo continuo</strong> de caudales y niveles piezométricos.
                  Estos datos permiten <strong>calibrar y validar</strong> el modelo numérico desarrollado en la etapa de Detalle,
                  convirtiéndolo en una <strong>herramienta predictiva</strong> para la gestión futura.
                </p>
              </div>
            </article>
          </div>
        </div>

        <div className="container">
          <div className="linea-divisora-como"></div>
          <div className="linea-divisora"></div>
          <div className="section-head">
            <div className="como-trabajamos"><h2 id="principios-title">Cómo trabajamos</h2></div>
            <p className="section-subtitle">
              Nuestros compromisos, estándares y forma de colaboración para proyectos RAG trazables y auditables.
            </p>
          </div>

          <div className="grid cards" style={{ marginTop: "1rem" }}>
            <article className="card">
              <h3>Compromisos del equipo</h3>
              <p>
                <strong>Profesionalismo y ética</strong>; diseños conservadores y trazables; apertura
                técnica y comunicación transparente con comunidades y autoridades.
              </p>
            </article>
            <article className="card">
              <h3>Estándares de trabajo</h3>
              <p>
                QA/QC de datos, bitácoras de campo, fotogrametría y protocolos de muestreo;
                reportabilidad compatible con auditorías y ODS 6.
              </p>
            </article>
            <article className="card">
              <h3>Cómo colaboramos</h3>
              <p>
                Inicio con <em>prefactibilidad</em>, diseño del piloto, instalación de telemetría y
                tableros; evaluación de desempeño y hoja de ruta para escalar si los resultados lo justifican.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* SECTORES (ahora solo casos de uso) */}
      <section className="section alt" id="sectores" aria-labelledby="sectores-title">
        <div className="container">
          <div className="linea-divisora"></div>
          <div className="section-head">
            <h2 id="sectores-title">Sectores prioritarios & casos de uso</h2>
            <p className="section-subtitle">
              Dónde una RAG bien diseñada genera mayor impacto medible. Sin declarar clientes:
              enfoque en problemas reales y resultados verificables.
            </p>
          </div>

          <div className="grid projects">
            <article className="project" aria-labelledby="usecase-forestal">
              <h3 id="usecase-forestal">Forestal: recarga estacional y control de escorrentía</h3>
              <p>
                Prefactibilidad para ubicar obras de recarga que reduzcan pérdida de agua por
                escorrentía superficial, mejoren disponibilidad estacional y resguarden terceros.
              </p>
            </article>

            <article className="project" aria-labelledby="usecase-agro">
              <h3 id="usecase-agro">Lechero & agro: balance hídrico verificable</h3>
              <p>
                Redes piezométricas y trazabilidad de caudales para soportar decisiones
                de riego y manejo invernal. QA/QC de datos y reportes compatibles con DGA.
              </p>
            </article>

            <article className="project" aria-labelledby="usecase-infra">
              <h3 id="usecase-infra">Infraestructura hídrica: telemetría interoperable</h3>
              <p>
                Integración con proveedores de sensores y laboratorios para asegurar continuidad,
                calidad y auditoría de datos. APIs y modelos de datos para escalar pilotos.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* GALERÍA en 2 columnas con Lightbox */}
      <section className="section" id="evidencias" aria-labelledby="evidencias-title">
        <div className="container container--wide">
          <div className="section-head">
            <div className="linea-divisora"></div>
            <h2 id="evidencias-title">Imágenes de avance</h2>
            <p className="section-subtitle">
              Estratigrafía, cartografía y parámetros hidrogeológicos usados en prefactibilidades y diseño de
              pilotos RAG. Material propio de Acuíferos Chile.
            </p>
          </div>

          {/* 2 columnas: izquierda (4) y derecha (2) */}
          <div className="grid gallery-grid gallery-columns">
            {/* Columna izquierda */}
            <div className="gallery-col">
              {imagesLeft.map((img, idx) => (
                <figure className="gallery-item" key={`L-${idx}`}>
                  <div className="gallery-media">
                    <button
                      type="button"
                      className="gallery-btn"
                      onClick={() => openLightbox(idx)} // 0..3
                      aria-label={`Abrir imagen: ${img.alt}`}
                    >
                      <img src={img.src} alt={img.alt} loading="lazy" />
                    </button>
                  </div>
                  <figcaption>{img.caption}</figcaption>
                </figure>
              ))}
            </div>

            {/* Columna derecha */}
            <div className="gallery-col">
              {imagesRight.map((img, idx) => {
                const globalIndex = imagesLeft.length + idx; // 4..5
                return (
                  <figure className="gallery-item" key={`R-${idx}`}>
                    <div className="gallery-media">
                      <button
                        type="button"
                        className="gallery-btn"
                        onClick={() => openLightbox(globalIndex)}
                        aria-label={`Abrir imagen: ${img.alt}`}
                      >
                        <img src={img.src} alt={img.alt} loading="lazy" />
                      </button>
                    </div>
                    <figcaption>{img.caption}</figcaption>
                  </figure>
                );
              })}
            </div>
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
