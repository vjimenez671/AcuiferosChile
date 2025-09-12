import React, { useState, useEffect, useCallback } from "react";
import "../../styles/RAG.css";
import { Link } from "react-router-dom";
import ragImg from "../imagenes/rag-esta.png";

// 👇 imágenes de las 5 técnicas
import piscinasImg from "../imagenes/piscinas-de-infiltracion.png";
import zanjasImg from "../imagenes/zanjas-de-infiltracion.png";
import galeriasImg from "../imagenes/galerias-de-infiltracion.png";
import estanquesImg from "../imagenes/estanques-de-percolacion.png";
import pozosImg from "../imagenes/pozos-secos.png";

export default function RAG() {
  // ===== Lightbox =====
  const [lightbox, setLightbox] = useState({ open: false, src: "", alt: "" });
  const openLightbox = (src, alt) => setLightbox({ open: true, src, alt });
  const closeLightbox = useCallback(() => setLightbox({ open: false, src: "", alt: "" }), []);

  useEffect(() => {
    if (!lightbox.open) return;
    const onKey = (e) => e.key === "Escape" && closeLightbox();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox.open, closeLightbox]);

  return (
    <main className="rag-page">
      {/* ===== HERO ===== */}
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

      {/* ===== Definiciones clave ===== */}
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
                incorporar agua adicional a los acuíferos de manera intencional para su recuperación y uso posterior,
                o con el propósito de generar un beneficio ambiental (Dillon, 2005).
              </p>
            </div>

            <div className="surface">
              <h3>¿Qué es recarga?</h3>
              <p>
                La <strong>recarga</strong> es el <em>flujo descendente de agua</em> que llega al <strong>nivel piezométrico</strong>
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
              <p className="muted">La interacción de estos factores define el mecanismo de recarga y su eficiencia.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Beneficios y aplicación ===== */}
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

      {/* ===== RAG en acción (video) ===== */}
      <section className="section video-block">
        <div className="container">
          <div className="section-head">
            <div className="linea-divisora" />
            <h2>RAG en acción</h2>
            <p className="section-subtitle">Una visión práctica del funcionamiento de la recarga gestionada.</p>
          </div>

          <figure className="media-embed" aria-label="Video explicativo sobre RAG">
            <iframe
              src="https://www.youtube-nocookie.com/embed/Lwtxygc5Yms?rel=0&modestbranding=1&iv_load_policy=3&playsinline=1"
              title="Recarga Gestionada de Acuíferos (RAG) — YouTube"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </figure>

          <div className="media-credit media-credit--outside" role="note" aria-label="Crédito del video">
            <span className="credit-owner">Video © <cite>CSIRO</cite></span> —{" "}
            <a href="https://youtu.be/Lwtxygc5Yms" target="_blank" rel="noreferrer" className="credit-link">
              Ver en YouTube
            </a>.
          </div>
        </div>
      </section>

      {/* ===== Diseño y operación (Marco operativo) ===== */}
      <section className="section alt" id="diseno-operacion">
        <div className="container">
          <div className="section-head">
            <div className="linea-divisora" />
            <h2>Diseño y operación <span className="pill">Marco operativo</span></h2>
            <p className="section-subtitle">
              No existe una solución única para la RAG; cada proyecto requiere un diseño a medida según sitio y objetivos.
            </p>
          </div>

          {/* Marco operativo breve */}
          <div className="callout note">
            <p>
              La selección de la <strong>técnica de recarga</strong> más eficiente se basa en analizar la
              <strong> fuente de agua</strong>, las <strong>características del acuífero</strong>, la
              <strong> permeabilidad del suelo</strong> y el <strong>terreno disponible</strong>.
            </p>
          </div>

          {/* Módulos transversales */}
          <div className="modules" aria-label="Módulos de diseño">
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

          {/* NUEVO: Casos Objetivo */}
          <div className="subsection-head">
            <div className="linea-divisora" />
            <h3 className="subsection-title">Casos objetivo</h3>
            <p className="subsection-subtitle">Escenarios de mayor viabilidad y costo-efectividad</p>
          </div>

          <div className="info-grid">
            <div className="panel">
              <h4 className="kicker">Fuente de agua</h4>
              <p>
                <strong>Aguas pluviales exclusivamente.</strong> Por normativa chilena, su uso para recarga
                <strong> no requiere tramitación de permisos ante la DGA</strong>, lo que agiliza el proyecto.
              </p>
            </div>
            <div className="panel">
              <h4 className="kicker">Tipo de acuífero</h4>
              <p>
                Priorizamos <strong>acuíferos libres (no confinados)</strong>, que permiten obras de
                <em> infiltración superficial</em>, logrando <strong>menores costos</strong> y alta
                viabilidad técnico-económica.
              </p>
            </div>
          </div>

          {/* Sub-sección destacada: Técnicas de recarga */}
          <div className="subsection-head">
            <div className="linea-divisora" />
            <h3 className="subsection-title">Técnicas de recarga</h3>
            <p className="subsection-subtitle">Cinco enfoques complementarios</p>
          </div>

          <div className="tech-grid" aria-label="Técnicas de recarga">
            {/* Piscinas */}
            <article className="tech-card tech-card--accent" aria-label="Piscinas de infiltración">
              <button
                className="tech-image"
                onClick={() => openLightbox(piscinasImg, "Piscinas de infiltración")}
                aria-label="Abrir imagen a tamaño completo: Piscinas de infiltración"
              >
                <img src={piscinasImg} alt="Esquema de piscinas de infiltración para recarga" />
              </button>
              <h4>Piscinas de infiltración</h4>
              <p>Estanques someros que distribuyen láminas sobre superficies permeables para maximizar contacto y tiempo de residencia.</p>
              <ul className="list-dot tight">
                <li><strong>Fortalezas:</strong> alta capacidad estacional, bajo costo por m<sup>3</sup>, operación simple.</li>
                <li><strong>Cuándo usar:</strong> superficies planas permeables y caudales variables.</li>
                <li><strong>Atención:</strong> manejo de finos y <em>colmatación</em> (ciclos mojado/descanso).</li>
              </ul>
            </article>

            {/* Zanjas */}
            <article className="tech-card tech-card--accent" aria-label="Zanjas de infiltración">
              <button
                className="tech-image"
                onClick={() => openLightbox(zanjasImg, "Zanjas de infiltración")}
                aria-label="Abrir imagen a tamaño completo: Zanjas de infiltración"
              >
                <img src={zanjasImg} alt="Esquema de zanjas de infiltración en ladera" />
              </button>
              <h4>Zanjas de infiltración</h4>
              <p>Trincheras lineales con material granular que conducen y disipan el flujo, aumentando la interfase y el almacenamiento temporal.</p>
              <ul className="list-dot tight">
                <li><strong>Fortalezas:</strong> modulares, compatibles con caminos y restricciones de espacio.</li>
                <li><strong>Cuándo usar:</strong> predios con pendiente suave y corredores existentes.</li>
                <li><strong>Atención:</strong> by-pass para extremos y limpieza del medio granular.</li>
              </ul>
            </article>

            {/* Galerías */}
            <article className="tech-card tech-card--accent" aria-label="Galerías de infiltración">
              <button
                className="tech-image"
                onClick={() => openLightbox(galeriasImg, "Galerías de infiltración")}
                aria-label="Abrir imagen a tamaño completo: Galerías de infiltración"
              >
                <img src={galeriasImg} alt="Esquema de galerías de infiltración subterráneas" />
              </button>
              <h4>Galerías de infiltración</h4>
              <p>Drenes/galerías subterráneas con geotextil y grava que reparten flujo bajo la superficie, reduciendo evaporación y escorrentía.</p>
              <ul className="list-dot tight">
                <li><strong>Fortalezas:</strong> menor huella superficial; estable en climas cálidos/ventosos.</li>
                <li><strong>Cuándo usar:</strong> costras superficiales o limitación de superficie.</li>
                <li><strong>Atención:</strong> accesos de inspección; control de biofouling/fino.</li>
              </ul>
            </article>

            {/* Estanques */}
            <article className="tech-card tech-card--accent" aria-label="Estanques de percolación">
              <button
                className="tech-image"
                onClick={() => openLightbox(estanquesImg, "Estanques de percolación")}
                aria-label="Abrir imagen a tamaño completo: Estanques de percolación"
              >
                <img src={estanquesImg} alt="Esquema de estanques de percolación y regulación" />
              </button>
              <h4>Estanques de percolación</h4>
              <p>Cuerpos de agua más profundos que promueven percolación vertical hacia estratos permeables; otorgan almacenamiento y regulación.</p>
              <ul className="list-dot tight">
                <li><strong>Fortalezas:</strong> buen buffer a caudales irregulares; usos múltiples.</li>
                <li><strong>Cuándo usar:</strong> estratos permeables someros y disponibilidad de espacio.</li>
                <li><strong>Atención:</strong> seguridad de taludes, batimetría y control de algas/sedimentos.</li>
              </ul>
            </article>

            {/* Pozos secos */}
            <article className="tech-card tech-card--accent" aria-label="Pozos secos">
              <button
                className="tech-image"
                onClick={() => openLightbox(pozosImg, "Pozos secos")}
                aria-label="Abrir imagen a tamaño completo: Pozos secos"
              >
                <img src={pozosImg} alt="Esquema de pozo seco para atravesar capas poco permeables" />
              </button>
              <h4>Pozos secos</h4>
              <p>Estructuras verticales (sin lámina permanente) que conducen agua a horizontes permeables más profundos, superando capas poco permeables.</p>
              <ul className="list-dot tight">
                <li><strong>Fortalezas:</strong> alta eficiencia puntual; útil con superficie poco infiltrante.</li>
                <li><strong>Cuándo usar:</strong> horizontes permeables a mayor profundidad.</li>
                <li><strong>Atención:</strong> pretratamiento, válvulas de control y disipación de energía.</li>
              </ul>
            </article>
          </div>

          {/* NUEVO: Soluciones Hídricas Integrales */}
          <div className="subsection-head">
            <div className="linea-divisora" />
            <h3 className="subsection-title">Soluciones hídricas integrales</h3>
            <p className="subsection-subtitle">
              Si el sitio no calza con el caso objetivo (p. ej., acuíferos confinados), proponemos alternativas.
            </p>
          </div>
          <div className="panel">
            <p>
              Evaluamos y diseñamos otras estrategias hídricas —por ejemplo, <strong>almacenamiento superficial (tranques)</strong>,
              regulación estacional y combinaciones obras-fuente— para asegurar la mejor solución técnico-económica con
              resguardo ambiental y de terceros.
            </p>
          </div>

          <div className="muted tech-note">
            La selección combina <strong>fuente</strong> (pluvial/superficial), <strong>permeabilidad</strong> del suelo/acuífero y <strong>objetivos</strong>
            (recuperación de niveles, resiliencia estacional, reutilización futura). Todo proyecto debe considerar
            <strong> balance hídrico, red piezométrica, QA/QC, trazabilidad</strong> y protección de terceros.
          </div>

          {/* >>> Importante dentro de la sección de Soluciones Hídricas Integrales <<< */}
          <div className="callout" style={{ marginTop: "3rem" }}>
            <p>
              <strong>Importante:</strong> cada proyecto RAG requiere un <strong>diseño adaptado al sitio</strong>.
              Nuestra fase de <strong>Ingeniería de Detalle</strong> es clave: la investigación de campo permite
              verificar la viabilidad real, validar el modelo hidrogeológico y garantizar un diseño seguro y eficiente.
            </p>
          </div>

          
        </div>
      </section>

      {/* ===== Marco legal ===== */}
      <section className="section legal" id="marco-legal">
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
        </div>
      </section>

      {/* ===== Lightbox modal ===== */}
      {lightbox.open && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Vista ampliada: ${lightbox.alt}`} onClick={closeLightbox}>
          <button className="lightbox__close" onClick={closeLightbox} aria-label="Cerrar">✕</button>
          <img src={lightbox.src} alt={lightbox.alt} className="lightbox__img" />
        </div>
      )}
    </main>
  );
}
