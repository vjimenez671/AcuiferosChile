import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import "../../styles/Home.css";

// Mantén estos imports locales
import bgUrl from "../imagenes/fondo-home.jpg";
import qrAcuiferos from "../imagenes/qr-acuiferos-transparent.png";

// Helper JS Cloudinary
import { cld } from "../lib/cloudinary";

export const Home = () => {
  /* =======================
   *  UTILIDADES CLOUDINARY
   * ======================= */
  // LQIP (blur) como background de contenedor
  const lqip = (pid) => cld(pid, "w_24,q_1,e_blur:2000");

  // Evitamos recortes: usamos c_limit (o c_fit) para respetar proporción
  const srcBase = (pid, w = 800) => cld(pid, `f_auto,q_auto,dpr_auto,w_${w},c_limit`);
  const srcset = (pid) =>
    [
      cld(pid, "f_auto,q_auto,dpr_auto,w_480,c_limit") + " 480w",
      cld(pid, "f_auto,q_auto,dpr_auto,w_800,c_limit") + " 800w",
      cld(pid, "f_auto,q_auto,dpr_auto,w_1280,c_limit") + " 1280w",
      cld(pid, "f_auto,q_auto,dpr_auto,w_1920,c_limit") + " 1920w",
    ].join(", ");

  /* =======================
   *  DATASET: 19 IMÁGENES (URLs que pasaste)
   * ======================= */
  const DATA = useMemo(
    () => ({
      ic: [
        { pid: "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1761607992/ic1_nsjbe2.png", alt: "Mapa geológico regional", cap: "Mapa geológico (1:50.000)" },
        { pid: "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1761607992/ic2_snazvs.png", alt: "Mapa geológico local",    cap: "Mapa geológico local (1:70.000)" },
        { pid: "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1761607992/ic3_y490uc.png", alt: "Mapa hidrogeológico",     cap: "Mapa hidrogeológico A1–A2–B2–C2" },
      ],
      idd: [
        { pid: "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1761608115/idd1_twyk2d.jpg", alt: "Ensayo de infiltración", cap: "Ensayo de infiltración en calicata" },
        { pid: "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1761608113/idd2_ya8gup.jpg", alt: "Calicata con agua",      cap: "Calicata y nivel freático" },
        { pid: "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1761608104/idd3_wp5tqu.jpg", alt: "Detalle constructivo",   cap: "Esquema de zanja de recarga" },
        { pid: "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1761608104/idd4_mpsfkn.png", alt: "Distribución de obras",  cap: "Disposición típica de obras" },
        { pid: "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1761608104/idd5_n65bnv.png", alt: "Tabla de costos",        cap: "Costos de obra y monitoreo" },
        { pid: "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1761608104/idd6_wkww1r.png", alt: "Dron y control",         cap: "Fotogrametría con dron" },
        { pid: "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1761608105/idd7_acqh7v.jpg", alt: "Muestreo en campo",      cap: "Muestreo y QA/QC" },
        { pid: "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1761608105/idd8_vy8mpw.jpg", alt: "Topografía GNSS",        cap: "Levantamiento GNSS" },
      ],
      cdo: [
        { pid: "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1761608136/cdo1_dgkfng.jpg", alt: "Excavación 1",        cap: "Apertura de zanja" },
        { pid: "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1761608132/cdo2_n20icy.jpg", alt: "Excavación 2",        cap: "Progreso de excavación" },
        { pid: "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1761608136/cdo3_mgy8jq.png", alt: "Excavación 3",        cap: "Detalle de material granular" },
        { pid: "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1761608136/cdo4_joj2sh.png", alt: "Excavación 4",        cap: "Zanja con material limo-arenoso" },
        { pid: "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1761608129/cdo5_xtv6zz.png", alt: "Vista longitudinal",  cap: "Tramo de obra" },
        { pid: "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1761608129/cdo6_im18ew.jpg", alt: "Excavadora en obra",  cap: "Movimiento de suelos" },
        { pid: "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1761608131/cdo7_dpajer.jpg", alt: "Obra en ejecución",   cap: "Línea de zanja terminada" },
        { pid: "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1761608132/cdo8_sijalt.jpg", alt: "Excavación y equipo", cap: "Equipo en terreno" },
      ],
    }),
    []
  );

  const LABEL = { all: "Todas", ic: "Ingeniería Conceptual", idd: "Ingeniería de Detalle", cdo: "Construcción de Obra" };

  /* ==============
   *  GALERÍA / UI
   * ============== */
  const [filter, setFilter] = useState("all"); // "all" | "ic" | "idd" | "cdo"
  const galleryRef = useRef(null);

  const imagesFiltered = useMemo(() => {
    if (filter === "all") return [...DATA.ic, ...DATA.idd, ...DATA.cdo];
    return [...DATA[filter]];
  }, [filter, DATA]);

  // Lightbox
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const isOpen = lightboxIndex !== null;
  const openLightbox = (idx) => setLightboxIndex(idx);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? 0 : (i + 1) % imagesFiltered.length));
      if (e.key === "ArrowLeft")  setLightboxIndex((i) => (i === null ? 0 : (i - 1 + imagesFiltered.length) % imagesFiltered.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeLightbox, imagesFiltered.length]);

  // Scroll helper desde las etapas
  const goToGallery = (targetFilter) => {
    setFilter(targetFilter);
    requestAnimationFrame(() => {
      galleryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  // Volver a "De la prefactibilidad a la operación"
  const backToStages = () => {
    const el = document.getElementById("servicios");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="ac-home">
      <link rel="preconnect" href="https://res.cloudinary.com" />

      {/* ================== HERO ================== */}
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

                <div className="cta-block">
                  <p className="cta-sub"><strong>Descubre el Potencial Hídrico Oculto de tu Campo</strong></p>
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
                      <img src={qrAcuiferos} alt="QR que abre ia.acuiferoschile.cl" loading="eager" />
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

      {/* ====== ETAPAS ====== */}
      <section className="section" id="servicios" aria-labelledby="servicios-title">
        <div className="container">
          <div className="section-head">
            <div className="linea-divisora"></div>
            <h2 id="servicios-title">De la prefactibilidad a la operación</h2>
            <p className="section-subtitle">
              Alineamos técnica, regulación y QA/QC para decisiones trazables y proyectos ejecutables. <br />
              <strong>Ofrecemos el ciclo completo: estudios de viabilidad, diseño y construcción de obras, y monitoreo posterior.</strong>
            </p>
          </div>

          <div className="stages-rows">
            {/* 1. Conceptual */}
            <article className="stage-row">
              <div className="stage-row__aside"><span className="stage-badge">1</span></div>
              <div className="stage-row__main">
                <h3>Ingeniería Conceptual — Prefactibilidad del Sitio</h3>
                <p>
                  Tras una <strong>evaluación preliminar online</strong>,
                  integramos análisis técnico (hidrología, hidrogeología) y regulatorio, incluyendo
                  <strong> verificación de derechos de agua</strong>.
                </p>
                <div className="stage-actions">
                  <button className="btn btn-ghost btn-sm" onClick={() => goToGallery("ic")}>Ver imágenes IC</button>
                </div>
              </div>
            </article>

            {/* 2. Detalle */}
            <article className="stage-row">
              <div className="stage-row__aside"><span className="stage-badge">2</span></div>
              <div className="stage-row__main">
                <h3>Ingeniería de Detalle — Estudios de Campo y Diseño de Obra</h3>
                <p>
                  Ejecutamos <em>geología, ensayos de infiltración, topografía y geofísica</em> para la
                  <strong> ingeniería final</strong>: bases técnicas, planos y presupuestos.
                </p>
                <p className="muted">
                  Además, desarrollamos un <strong>modelo numérico de flujo</strong> para la gestión futura del recurso.
                </p>
                <div className="stage-actions">
                  <button className="btn btn-ghost btn-sm" onClick={() => goToGallery("idd")}>Ver imágenes IDD</button>
                </div>
              </div>
            </article>

            {/* 3. Construcción */}
            <article className="stage-row">
              <div className="stage-row__aside"><span className="stage-badge">3</span></div>
              <div className="stage-row__main">
                <h3>Construcción de Obra</h3>
                <p>
                  Construimos obras de recarga (<em>piscinas, zanjas</em> u otras),
                  asegurando <strong>QA/QC</strong> y seguridad en cada etapa.
                </p>
                <div className="stage-actions">
                  <button className="btn btn-ghost btn-sm" onClick={() => goToGallery("cdo")}>Ver imágenes CDO</button>
                </div>
              </div>
            </article>

            {/* 4. Operación */}
            <article className="stage-row">
              <div className="stage-row__aside"><span className="stage-badge">4</span></div>
              <div className="stage-row__main">
                <h3>Operación y Monitoreo</h3>
                <p>
                  Monitoreamos caudales y niveles piezométricos para <strong>calibrar/validar</strong> el modelo numérico y
                  gestionar el recurso en el tiempo.
                </p>
              </div>
            </article>
          </div>
        </div>

        {/* ===== Cómo trabajamos ===== */}
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
              <p><strong>Profesionalismo y ética</strong>; diseños conservadores y trazables; comunicación transparente.</p>
            </article>
            <article className="card">
              <h3>Estándares de trabajo</h3>
              <p>QA/QC de datos, bitácoras de campo, fotogrametría y protocolos de muestreo; reportabilidad compatible con ODS 6.</p>
            </article>
            <article className="card">
              <h3>Cómo colaboramos</h3>
              <p>Prefactibilidad, piloto, telemetría y tableros; evaluación de desempeño y hoja de ruta para escalar.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ===== SECTORES ===== */}
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

      {/* ============ GALERÍA (SOLO COLLAGE/MASONRY) ============ */}
      <section ref={galleryRef} className="section" id="evidencias" aria-labelledby="evidencias-title">
        <div className="container container--wide">
          <div className="section-head">
            <div className="linea-divisora"></div>
            <h2 id="evidencias-title">Imágenes de avance</h2>
            <p className="section-subtitle">
              Filtra por etapa y navega en formato <em>collage</em>. Miniaturas sin recorte y visor ampliado.
            </p>
          </div>

          {/* Filtros (tabs) + botón “↑ Arriba” */}
          <div className="gallery-toolbar">
            <div className="gallery-filters" role="tablist" aria-label="Filtrar imágenes">
              {["all", "ic", "idd", "cdo"].map((key) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={filter === key}
                  className={`filter-btn ${filter === key ? "is-active" : ""}`}
                  onClick={() => setFilter(key)}
                >
                  {LABEL[key]}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="btn btn-accent btn-sm back-to-stages"
              onClick={backToStages}
              title="Volver a De la prefactibilidad a la operación"
              aria-label="Volver arriba a De la prefactibilidad a la operación"
            >
              ↑ Arriba
            </button>
          </div>

          {/* Lista masonry */}
          <div className="gallery-list masonry">
            {imagesFiltered.map((img, idx) => (
              <figure className="gallery-item" key={`${img.pid}-${idx}`}>
                <div className="gallery-media thumb-wrap" style={{ backgroundImage: `url(${lqip(img.pid)})` }}>
                  <button
                    type="button"
                    className="gallery-btn"
                    onClick={() => openLightbox(idx)}
                    aria-label={`Abrir imagen: ${img.alt}`}
                  >
                    <img
                      className="thumb"
                      src={srcBase(img.pid, 1000)}
                      srcSet={srcset(img.pid)}
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                </div>
                <figcaption>{img.cap}</figcaption>
              </figure>
            ))}
          </div>

          <p className="gallery-note">*Imágenes con fines ilustrativos y de comunicación técnica.</p>
        </div>
      </section>

      {/* ============ LIGHTBOX ============ */}
      {isOpen && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Visor de imagen" onClick={closeLightbox}>
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <img
              src={cld(imagesFiltered[lightboxIndex || 0].pid, "f_auto,q_auto,w_1920")}
              alt={imagesFiltered[lightboxIndex || 0].alt}
            />
            <button type="button" className="lightbox-close" onClick={closeLightbox} aria-label="Cerrar imagen" title="Cerrar (Esc)">×</button>
            <button
              type="button"
              className="lightbox-nav lightbox-prev"
              onClick={() => setLightboxIndex((i) => ((i ?? 0) - 1 + imagesFiltered.length) % imagesFiltered.length)}
              aria-label="Imagen anterior" title="Anterior (←)"
            >‹</button>
            <button
              type="button"
              className="lightbox-nav lightbox-next"
              onClick={() => setLightboxIndex((i) => ((i ?? 0) + 1) % imagesFiltered.length)}
              aria-label="Imagen siguiente" title="Siguiente (→)"
            >›</button>
          </div>
        </div>
      )}
    </main>
  );
};
