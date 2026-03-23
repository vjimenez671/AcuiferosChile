import React, { useEffect, useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import "../../styles/Home.css";
import bgUrl from "../imagenes/fondo-home.jpg";
import qrAcuiferos from "../imagenes/qr-acuiferos-transparent.png";
import { cld } from "../lib/cloudinary";

export default function Home() {
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
    setTimeout(() => {
      galleryRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const backToCiclo = () => {
    cicloRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="home-unique-context">
      <header className="home-hero" style={{ backgroundImage: `url(${bgUrl})` }}>
        <div className="home-hero-overlay"></div>
        <div className="container">
          <div className="home-hero-content">
            <span className="home-tag-premium">Acuíferos Chile • Soluciones Hídricas</span>
            <h1 className="home-hero-h1">Agua para hoy, <br /><span>seguridad para mañana.</span></h1>
            <p className="home-hero-p">Recarga gestionada de acuíferos: capturamos el exceso de invierno para abastecer tu verano.</p>
            <div className="home-hero-btns">
              <Link className="home-btn-fill" to="/rag">Explorar Soluciones</Link>
              <Link className="home-btn-ghost" to="/contacto">Contacto</Link>
            </div>
            <div className="home-ia-card" onClick={() => window.open("https://ia.acuiferoschile.cl", "_blank")}>
              <div className="home-ia-qr">
                <img src={qrAcuiferos} alt="QR" />
                <div className="home-pulse"></div>
              </div>
              <div className="home-ia-info">
                <span className="home-ia-tag">IA ENGINE</span>
                <h3>Potencial Hídrico IA</h3>
                <p>Simulador de recarga para tu terreno</p>
                <span className="home-ia-link">Calcular viabilidad →</span>
              </div>
              <i className="fas fa-microchip home-ia-icon"></i>
            </div>
          </div>
        </div>
      </header>

      <section ref={cicloRef} className="home-section-stages home-bg-ice-blue">
        <div className="container">
          <div className="home-section-header">
            <span className="home-eyebrow">Metodología</span>
            <h2 className="home-display-h2">Ciclo Completo <span>RAG</span></h2>
            <p className="home-subtitle">Desde la primera evaluación técnica hasta la construcción y monitoreo inteligente.</p>
          </div>
          <div className="home-stages-grid">
            {[
              { id: 1, t: "Ingeniería Conceptual", d: "Evaluación de sitio y derechos de agua.", f: "ic" },
              { id: 2, t: "Ingeniería de Detalle", d: "Estudios de campo, geofísica y planos finales.", f: "idd" },
              { id: 3, t: "Construcción de Obra", d: "Ejecución de zanjas con estándar QA/QC.", f: "cdo" },
              { id: 4, t: "Operación Inteligente", d: "Monitoreo en tiempo real y calibración.", f: null }
            ].map(s => (
              <div key={s.id} className="home-stage-card">
                <div className="home-stage-number">{s.id}</div>
                <div className="home-stage-body">
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
                {s.f && (
                  <button onClick={() => goToGallery(s.f)} className="home-stage-btn">
                    Evidencia <i className="fas fa-arrow-right"></i>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section-bento home-bg-ice-gray">
        <div className="container">
          <div className="home-section-header">
            <span className="home-eyebrow">Nuestro Valor</span>
            <h2 className="home-display-h2">Cómo <span>Colaboramos</span></h2>
          </div>
          <div className="home-bento-grid">
            <div className="home-bento-item home-bento-navy">
              <i className="fas fa-shield-alt"></i>
              <h3>Ética Técnica</h3>
              <p>Diseños conservadores y trazables basados en evidencia científica.</p>
            </div>
            <div className="home-bento-item home-bento-pale">
              <i className="fas fa-microscope"></i>
              <h3>QA/QC Total</h3>
              <p>Bitácoras digitales y fotogrametría para reportabilidad ODS 6.</p>
            </div>
            <div className="home-bento-item home-bento-white">
              <i className="fas fa-chart-line"></i>
              <h3>Escalabilidad</h3>
              <p>Evaluamos el desempeño del piloto para trazar la hoja de ruta final.</p>
            </div>
          </div>
        </div>
      </section>

      <section ref={galleryRef} className="home-section-gallery home-bg-ice-blue">
        <div className="container">
          <div className="home-section-header">
            <h2 className="home-display-h2">Evidencia en <span>Terreno</span></h2>
            <div className="home-gallery-filters">
              {[{ key: "all", label: "Ver todo" }, { key: "ic", label: "Conceptual" }, { key: "idd", label: "Detalle" }, { key: "cdo", label: "Construcción" }].map(f => (
                <button key={f.key} className={`home-filter-btn ${filter === f.key ? 'is-active' : ''}`} onClick={() => setFilter(f.key)}>
                  <span>{f.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="home-gallery-grid">
            {imagesFiltered.map((img, i) => (
              <article className="home-gallery-card" key={i} onClick={() => setLightboxIndex(i)}>
                <div className="home-gallery-img">
                  <img src={srcBase(img.pid)} alt={img.alt} loading="lazy" />
                  <div className="home-gallery-zoom"><span>Ampliar</span></div>
                </div>
                <div className="home-gallery-info">
                  <span className="home-gallery-tag">{img.cap}</span>
                  <h4>{img.alt}</h4>
                </div>
              </article>
            ))}
          </div>
          <div className="home-gallery-footer">
            <button onClick={backToCiclo} className="home-btn-return">
              <i className="fas fa-arrow-up"></i> Volver al Ciclo RAG
            </button>
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <div className="rag-modal-overlay-v4" onClick={() => setLightboxIndex(null)}>
          <button className="rag-modal-close-v4" onClick={() => setLightboxIndex(null)}>✕</button>
          <div className="rag-modal-body-v4" onClick={e => e.stopPropagation()}>
            <img src={srcBase(imagesFiltered[lightboxIndex].pid, 1920)} alt={imagesFiltered[lightboxIndex].alt} />
            <div className="rag-modal-caption-v4">
              <strong>{imagesFiltered[lightboxIndex].cap}</strong>
              <p>{imagesFiltered[lightboxIndex].alt}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}