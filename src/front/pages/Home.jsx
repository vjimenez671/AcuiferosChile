import React, { useEffect, useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import "../../styles/Home.css";
import bgUrl from "../imagenes/fondo-home.jpg";
import qrAcuiferos from "../imagenes/qr-acuiferos-transparent.png";
import { cld } from "../lib/cloudinary";

export default function Home() {
  // Asegura que al volver al Home el scroll esté arriba
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const srcBase = (pid, w = 1000) => cld(pid, `f_auto,q_auto,w_${w},c_limit`);

  const DATA = useMemo(() => ({
    ic: [
      { pid: "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1761607992/ic1_nsjbe2.png", alt: "Mapa geológico", cap: "Ingeniería Conceptual" },
      { pid: "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1761607992/ic2_snazvs.png", alt: "Mapa geológico", cap: "Ingeniería Conceptual" },
      { pid: "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1761607992/ic3_y490uc.png", alt: "Mapa hidrogeológico", cap: "Ingeniería Conceptual" },
    ],
    idd: [
      { pid: "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1761608115/idd1_twyk2d.jpg", alt: "Toma de muestras", cap: "Ingeniería de Detalle" },
      { pid: "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1761608113/idd2_ya8gup.jpg", alt: "Registro de datos", cap: "Ingeniería de Detalle" },
      { pid: "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1761608104/idd4_mpsfkn.png", alt: "Diseño de obra", cap: "Ingeniería de Detalle" },
      { pid: "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1761608104/idd3_wp5tqu.jpg", alt: "Construcción de zanja", cap: "Ingeniería de Detalle" },
    ],
    cdo: [
      { pid: "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1761608136/cdo1_dgkfng.jpg", alt: "Ampliación de zanja", cap: "Construcción" },
      { pid: "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1761608136/cdo3_mgy8jq.png", alt: "Material granular", cap: "Construcción" },
      { pid: "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1761608132/cdo2_n20icy.jpg", alt: "Resultado final", cap: "Construcción" },
    ]
  }), []);

  const [filter, setFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const galleryRef = useRef(null);
  const cicloRef = useRef(null);

  const imagesFiltered = useMemo(() => {
    return filter === "all" ? [...DATA.ic, ...DATA.idd, ...DATA.cdo] : DATA[filter];
  }, [filter, DATA]);

  const goToGallery = (f) => {
    setFilter(f);
    galleryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const backToCiclo = () => {
    cicloRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="main-content">
      <header className="hero--banner" style={{ backgroundImage: `url(${bgUrl})` }}>
        <div className="hero-overlay-gradient"></div>
        <div className="container">
          <div className="hero-text">
            <span className="hero-eyebrow">Acuíferos Chile • Soluciones Hídricas</span>
            <h1>Agua para hoy,<br />seguridad para mañana.</h1>
            <h2>Recarga gestionada de acuíferos: capturamos el exceso de invierno para abastecer tu verano.</h2>
            <div className="hero-cta">
              <Link className="btn btn-primary" to="/rag">Explorar Soluciones</Link>
              <Link className="btn btn-ghost" to="/contacto">Contacto</Link>
            </div>

            <div className="ia-badge-cta">
              <div className="ia-qr-wrapper">
                <img src={qrAcuiferos} alt="QR" />
                <div className="pulse-ring"></div>
              </div>
              <div className="ia-content">
                <span className="ia-tag">IA ENGINE</span>
                <p><strong>Potencial Hídrico IA</strong></p>
                <span>Simulador de recarga para tu terreno</span>
                <a href="https://ia.acuiferoschile.cl" target="_blank" rel="noreferrer" className="ia-link">Calcular viabilidad →</a>
              </div>
              <div className="ia-visual-icon">
                <i className="fas fa-microchip"></i>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section ref={cicloRef} className="section section-stages">
        <div className="container">
          <div className="section-head">
            <h2 className="title-md">Ciclo Completo RAG</h2>
            <p className="subtitle">Desde la primera evaluación técnica hasta la construcción y monitoreo inteligente.</p>
          </div>
          <div className="stages-list">
            {[
              { id: 1, t: "Ingeniería Conceptual", d: "Evaluación de sitio y derechos de agua.", f: "ic" },
              { id: 2, t: "Ingeniería de Detalle", d: "Estudios de campo, geofísica y planos finales.", f: "idd" },
              { id: 3, t: "Construcción de Obra", d: "Ejecución de piscinas y zanjas con estándar QA/QC.", f: "cdo" },
              { id: 4, t: "Operación Inteligente", d: "Monitoreo en tiempo real y calibración de modelos.", f: null }
            ].map(s => (
              <article key={s.id} className="stage-row">
                <div className="stage-badge">{s.id}</div>
                <div className="stage-content">
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
                <div className="stage-action">
                  {s.f && (
                    <button onClick={() => goToGallery(s.f)} className="btn-ghost-sm">
                      Ver evidencia <i className="fas fa-chevron-right" style={{ marginLeft: '8px', fontSize: '0.7rem' }}></i>
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-bento">
        <div className="container">
          <div className="section-head">
            <h2 className="title-md">Cómo colaboramos</h2>
          </div>
          <div className="bento-grid">
            <div className="bento-card">
              <div className="bento-icon-wrapper">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Ética Técnica</h3>
              <p>Diseños conservadores y trazables basados en evidencia científica.</p>
            </div>
            <div className="bento-card">
              <div className="bento-icon-wrapper">
                <i className="fas fa-microscope"></i>
              </div>
              <h3>QA/QC Total</h3>
              <p>Bitácoras digitales y fotogrametría para reportabilidad compatible con ODS 6.</p>
            </div>
            <div className="bento-card">
              <div className="bento-icon-wrapper">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>Escalabilidad</h3>
              <p>Evaluamos el desempeño del piloto para trazar la hoja de ruta final.</p>
            </div>
          </div>
        </div>
      </section>

      <section ref={galleryRef} className="section section-gallery">
        <div className="container">
          <div className="section-head">
            <h2 className="title-md">Evidencia en Terreno</h2>
            <div className="gallery-filters row-filters">
              {[
                { key: "all", label: "Ver todo" },
                { key: "ic", label: "Ingeniería Conceptual" },
                { key: "idd", label: "Ingeniería de Detalle" },
                { key: "cdo", label: "Construcción de Obra" }
              ].map(f => (
                <button
                  key={f.key}
                  className={`filter-btn ${filter === f.key ? 'is-active' : ''}`}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="gallery-grid">
            {imagesFiltered.map((img, i) => (
              <div className="gallery-card" key={i} onClick={() => setLightboxIndex(i)}>
                <div className="gallery-img-wrapper">
                  <img src={srcBase(img.pid)} alt={img.alt} loading="lazy" />
                  <div className="gallery-card-overlay">
                    <span>Ampliar vista</span>
                  </div>
                </div>
                <div className="gallery-card-info">
                  <span className="gallery-card-tag">{img.cap}</span>
                  <h4>{img.alt}</h4>
                </div>
              </div>
            ))}
          </div>

          <div className="gallery-footer">
            <button onClick={backToCiclo} className="btn-return-ciclo">
              <i className="fas fa-arrow-up"></i> Volver al Ciclo RAG
            </button>
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <div className="lightbox-overlay" onClick={() => setLightboxIndex(null)}>
          <button className="lightbox-close" onClick={() => setLightboxIndex(null)}>×</button>
          <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
            <img
              src={srcBase(imagesFiltered[lightboxIndex].pid, 1920)}
              alt={imagesFiltered[lightboxIndex].alt}
            />
            <div className="lightbox-caption">
              <h4>{imagesFiltered[lightboxIndex].cap}</h4>
              <p>{imagesFiltered[lightboxIndex].alt}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}