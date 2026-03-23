import React, { useState, useEffect, useCallback } from "react";
import "../../styles/RAG.css";
import { Link, useLocation } from "react-router-dom";

// Imágenes
import ragImg from "../imagenes/rag-esta.png";
import piscinasImg from "../imagenes/piscinas-de-infiltracion.png";
import zanjasImg from "../imagenes/zanjas-de-infiltracion.png";
import galeriasImg from "../imagenes/galerias-de-infiltracion.png";
import estanquesImg from "../imagenes/estanques-de-percolacion.png";
import pozosImg from "../imagenes/pozos-secos.png";

const TECHNIQUES = [
  { id: 1, title: "Piscinas de Infiltración", img: piscinasImg, desc: "Estanques de alta capacidad para maximizar la recarga en suelos permeables.", plus: "Máximo volumen estacional.", use: "Superficies planas." },
  { id: 2, title: "Zanjas de Infiltración", img: zanjasImg, desc: "Sistemas lineales modulares que optimizan el espacio y la conducción.", plus: "Bajo impacto espacial.", use: "Laderas y corredores." },
  { id: 3, title: "Galerías Subterráneas", img: galeriasImg, desc: "Infraestructura invisible que elimina la evaporación y protege el recurso.", plus: "Cero huella visual.", use: "Climas extremos." },
  { id: 4, title: "Estanques de Percolación", img: estanquesImg, desc: "Regulación vertical profunda para asegurar la alimentación del acuífero.", plus: "Reserva hídrica constante.", use: "Estratos someros." },
  { id: 5, title: "Pozos Secos", img: pozosImg, desc: "Inyección de alta precisión para superar estratos geológicos impermeables.", plus: "Eficiencia en profundidad.", use: "Acuíferos profundos." },
];

export default function RAG() {
  const { pathname } = useLocation();
  const [lightbox, setLightbox] = useState({ open: false, src: "", alt: "" });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const openLightbox = (src, alt) => setLightbox({ open: true, src, alt });
  const closeLightbox = useCallback(() => setLightbox({ open: false, src: "", alt: "" }), []);

  return (
    <div id="rag-page-unique-context">
      <main className="rag-main-layout">

        {/* --- HERO SECTION --- */}
        <header className="rag-hero-v3 rag-bg-ice-blue">
          <div className="rag-container">
            <div className="rag-hero-grid">
              <div className="rag-hero-info">
                <span className="rag-tag-premium">Ingeniería Avanzada</span>
                <h1 className="rag-hero-h1">Recarga <br /><span>Gestionada.</span></h1>
                <p className="rag-hero-p">Tecnología de infiltración diseñada para la resiliencia hídrica estratégica.</p>
                <div className="rag-hero-btns">
                  <Link className="rag-btn-apple-fill" to="/contacto">Iniciar Proyecto</Link>
                  <a href="#tecnicas-scroll" className="rag-btn-apple-ghost">Ver técnicas →</a>
                </div>
              </div>

              <div className="rag-hero-visual">
                <div className="rag-perspective-wrapper">
                  <img src={ragImg} alt="RAG System" className="rag-3d-card" />
                  <div className="rag-image-glow"></div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* --- BENTO CONCEPT --- */}
        <section className="rag-section-bento rag-bg-ice-gray">
          <div className="rag-container">
            <div className="rag-section-header-compact">
              <span className="rag-eyebrow">Fundamentos</span>
              <h2 className="rag-display-h2-compact">Ciencia y Estrategia</h2>
            </div>
            <div className="rag-bento-layout-v4">
              <div className="rag-bento-card rag-bento-main rag-bento-navy">
                <div className="rag-bento-inner">
                  <label>01. El Concepto</label>
                  <h2>¿Qué es RAG?</h2>
                  <p>Gestión activa del ciclo hídrico: captar excedentes pluviales, filtrarlos y almacenarlos en acuíferos para su uso estratégico en épocas de escasez.</p>
                </div>
              </div>

              <div className="rag-bento-right-stack">
                <div className="rag-bento-card rag-bento-sm rag-bento-pale-blue">
                  <div className="rag-bento-inner">
                    <label>02. Propósito</label>
                    <h3>Sustentabilidad</h3>
                    <p>Recuperación de niveles freáticos y mitigación de intrusión salina.</p>
                  </div>
                </div>
                <div className="rag-bento-card rag-bento-sm rag-bento-white">
                  <div className="rag-bento-inner">
                    <label>03. Ciencia</label>
                    <h3>Modelamiento</h3>
                    <p>Estudios hidrogeológicos de alta resolución para cada terreno.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- VIDEO FULL WIDTH --- */}
        <section className="rag-video-full">
          <div className="rag-video-box">
            <iframe
              src="https://www.youtube-nocookie.com/embed/Lwtxygc5Yms?rel=0&controls=0&showinfo=0"
              title="RAG Tech Video"
              allowFullScreen
            />
          </div>
        </section>

        {/* --- TECNICAS GRID --- */}
        <section className="rag-section-grid rag-bg-ice-blue" id="tecnicas-scroll">
          <div className="rag-container">
            <div className="rag-grid-header">
              <h2 className="rag-display-h2">Técnicas de <span>Infiltración</span></h2>
              <p className="rag-grid-subtitle">Cinco soluciones de ingeniería adaptadas a la hidrogeología local.</p>
            </div>

            <div className="rag-tech-gallery">
              {TECHNIQUES.map((t) => (
                <article key={t.id} className="rag-tech-item">
                  <div className="rag-tech-img" onClick={() => openLightbox(t.img, t.title)}>
                    <img src={t.img} alt={t.title} loading="lazy" />
                    <div className="rag-tech-zoom"><span>Explorar</span></div>
                  </div>
                  <div className="rag-tech-content">
                    <h4>{t.title}</h4>
                    <p>{t.desc}</p>
                    <div className="rag-tech-meta">
                      <span className="rag-meta-line"><strong>VENTAJA:</strong> {t.plus}</span>
                      <span className="rag-meta-line"><strong>SUELO:</strong> {t.use}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* --- LEGAL SUITE --- */}
        <section className="rag-section-legal rag-bg-pale-blue-sec">
          <div className="rag-container">
            <div className="rag-legal-box">
              <div className="rag-legal-text">
                <h2 className="rag-display-h2">Marco <span>Legal</span></h2>
                <p>Base normativa vigente y agilidad administrativa para proyectos RAG en Chile.</p>
                <a href="https://dga.mop.gob.cl/legislacion/" target="_blank" rel="noreferrer" className="rag-dga-link-premium">
                  Portal Legislación DGA <i className="fas fa-external-link-alt"></i>
                </a>
              </div>
              <div className="rag-legal-docs">
                <a href="https://dga.mop.gob.cl/uploads/sites/13/2023/07/ley_21435.pdf" target="_blank" className="rag-doc-item-v4">
                  <span className="rag-doc-tag-v4">LEY</span>
                  <div className="rag-doc-info-v4">
                    <strong>Código de Aguas</strong>
                    <small>Ley 21.435 (2022)</small>
                  </div>
                </a>
                <a href="https://dga.mop.gob.cl/uploads/sites/13/2024/06/circular_3_2024.pdf" target="_blank" className="rag-doc-item-v4">
                  <span className="rag-doc-tag-v4">DGA</span>
                  <div className="rag-doc-info-v4">
                    <strong>Aguas Pluviales</strong>
                    <small>Circular N° 3 (2024)</small>
                  </div>
                </a>
                <a href="https://dga.mop.gob.cl/uploads/sites/13/2024/06/CIRCULAR-DGA-N%C2%B0-2-2025.pdf" target="_blank" className="rag-doc-item-v4">
                  <span className="rag-doc-tag-v4">DGA</span>
                  <div className="rag-doc-info-v4">
                    <strong>Uso de Recarga</strong>
                    <small>Circular N° 2 (2025)</small>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* --- LIGHTBOX MODAL --- */}
        {lightbox.open && (
          <div className="rag-modal-overlay-v4" onClick={closeLightbox}>
            <div className="rag-modal-body-v4" onClick={e => e.stopPropagation()}>
              <button className="rag-modal-close-v4" onClick={closeLightbox}>✕</button>
              <img src={lightbox.src} alt={lightbox.alt} />
              <p className="rag-modal-caption-v4">{lightbox.alt}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}