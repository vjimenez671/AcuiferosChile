import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/Blog.css";

const POSTS_DATA = [
  {
    id: "post-13",
    type: "carousel",
    title: "Planificación Hídrica en Otoño",
    date: "3 de abril de 2026",
    images: [
      "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775348886/1_nbsm4f.png",
      "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775348888/2_gcp40x.png",
      "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775348887/3_yehmgw.png"
    ],
    description: "El inicio del otoño es la etapa clave para observar el comportamiento hídrico del predio antes del invierno. Evaluar oportunidades con anticipación permite transformar la observación técnica en proyectos de seguridad hídrica de largo plazo, evitando decisiones improvisadas ante la urgencia."
  },
  {
    id: "post-12",
    type: "carousel",
    title: "Estrategia vs. Improvisación",
    date: "23 de marzo de 2026",
    images: [
      "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775348800/1_nxwas9.png",
      "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775348800/2_wjmiig.png",
      "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775348801/3_nabmiv.png"
    ],
    description: "La seguridad hídrica no se improvisa; se planifica entendiendo el acuífero antes de que la escasez deje poco margen de acción. Analizamos la realidad de cada predio para detectar errores comunes en la gestión del agua y fortalecer el potencial de Recarga de Acuíferos Gestionada."
  },
  {
    id: "post-11",
    type: "carousel",
    title: "Evaluación Digital de Potencial RAG",
    date: "15 de marzo de 2026",
    images: [
      "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775348653/Puedes_tener_una_primera_aproximaci%C3%B3n_en_minutos_con_nuestro_simulador_hv82ua.png",
      "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775348548/2_dksjoo.png",
      "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775348552/3_flp5gr.png",
      "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775348550/4_i30evt.png"
    ],
    description: "A través de nuestro simulador online, los productores pueden obtener una primera aproximación técnica del potencial de recarga de sus predios en pocos minutos. Esta herramienta digital facilita la detección de oportunidades hídricas iniciales para profundizar luego en análisis de terreno."
  },
  {
    id: "post-10",
    type: "video",
    title: "Señales Críticas en el Acuífero",
    date: "2 de marzo de 2026",
    src: "https://res.cloudinary.com/dvqbb7cjs/video/upload/v1775348491/3_se%C3%B1ales_final_2_youhbw.mp4",
    description: "El aumento en la profundidad de bombeo, la caída de caudales críticos y el alza en los costos de energía son señales de alerta del acuífero. Ayudamos a interpretar estos indicadores para evaluar si un proyecto RAG puede revertir la tendencia y dar estabilidad operativa al campo."
  },
  {
    id: "post-9",
    type: "carousel",
    title: "Mitos sobre el Agua Subterránea",
    date: "22 de febrero de 2026",
    images: [
      "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775348154/1_yzyctp.png",
      "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775348154/2_drbwpz.png",
      "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775348333/TRES_MITOS_SOBRE_EL_AGUA_SUBTERR%C3%81NEA_b1vhei.png",
      "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775348155/4_j9d9im.png"
    ],
    description: "Desmitificamos conceptos erróneos sobre el agua subterránea que suelen llevar a decisiones costosas. La seguridad hídrica real se construye comprendiendo el funcionamiento dinámico del acuífero y diseñando soluciones de recarga basadas en mediciones y datos técnicos precisos."
  },
  {
    id: "post-8",
    type: "carousel",
    title: "Seguridad Hídrica en Años Secos",
    date: "15 de febrero de 2026",
    images: [
      "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775347904/1_hby66b.png",
      "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775347906/2_nisqzu.png",
      "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775347906/3_v37prx.png"
    ],
    description: "La Recarga de Acuíferos Gestionada busca transformar el agua de invierno en seguridad hídrica para los periodos de escasez. Diseñamos y monitoreamos proyectos evaluando el acuífero y la disponibilidad de agua para que las decisiones productivas se basen en datos técnicos."
  },
  {
    id: "post-7",
    type: "carousel",
    title: "Construcción de Seguridad Hídrica en Comunidad",
    date: "6 de febrero de 2026",
    images: [
      "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775347723/orlin_2_kt1yeb.jpg",
      "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775347722/la_reu_urjy1p.jpg",
      "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775347721/jordi_vtbyxi.jpg",
      "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775347724/publico_oqluvl.jpg",
      "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775347725/si_o_si_stjx8o.jpg"
    ],
    description: "Recorremos el sur de Chile para compartir experiencias sobre la Recarga de Acuíferos Gestionada e integrar el conocimiento local con la experiencia técnica de terreno, buscando proteger los acuíferos a largo plazo."
  },
  {
    id: "post-6",
    type: "video",
    title: "Monitoreo y Evidencia en Recarga",
    date: "25 de enero de 2026",
    src: "https://res.cloudinary.com/dvqbb7cjs/video/upload/v1775347638/sub_monitoreo_publicaci%C3%B3n_3_zzolm4.mp4",
    description: "La gestión hídrica efectiva requiere datos precisos. Medimos la respuesta de los acuíferos para proporcionar evidencia clara sobre cómo la recarga beneficia a cada pozo, sustentando cada plan hídrico en análisis hidrogeológicos rigurosos."
  },
  {
    id: "post-5",
    type: "carousel",
    title: "Seguridad Hídrica a 5 Años",
    date: "17 de enero de 2026",
    images: [
      "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775347369/1_srxqrk.png",
      "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775347370/2_st4js2.png",
      "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775347370/3_a1xzai.png"
    ],
    description: "Evaluamos el potencial de proyectos de Recarga de Acuíferos Gestionada para reforzar los pozos y asegurar la disponibilidad de agua en el largo plazo, mitigando los riesgos de años secos y costos energéticos elevados."
  },
  {
    id: "post-4",
    type: "video",
    title: "Simulador de Potencial RAG",
    date: "12 de enero de 2026",
    src: "https://res.cloudinary.com/dvqbb7cjs/video/upload/v1775347253/simulador_facil_sbxxmh.mp4",
    description: "Nuestra plataforma de inteligencia artificial permite explorar las oportunidades de seguridad hídrica de cada operación de forma remota, analizando el potencial para implementar proyectos de recarga gestionada."
  },
  {
    id: "post-3",
    type: "image",
    title: "Análisis y Diseño en Terreno",
    date: "4 de enero de 2026",
    src: "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775347106/fdeb79f7-15da-42f4-93c8-dafc6997edd0_btfdlx.jpg",
    description: "Cada predio cuenta con una historia hídrica única. Integramos el análisis de datos técnicos con el levantamiento en terreno para traducir la realidad hidrogeológica en un proyecto de seguridad hídrica a medida."
  },
  {
    id: "post-2",
    type: "video",
    title: "Agua Desaprovechada: El Desafío Actual",
    date: "27 de diciembre de 2025",
    src: "https://res.cloudinary.com/dvqbb7cjs/video/upload/v1775344473/sub_agua_Desaprovechada_publicaci%C3%B3n_2_ia8x9h.mp4",
    description: "La Recarga de Acuíferos Gestionada permite almacenar excedentes de agua bajo el campo para reforzar los caudales de los pozos durante el verano, convirtiendo el agua de invierno en seguridad hídrica real."
  },
  {
    id: "post-1",
    type: "carousel",
    title: "Estrategias de Infiltración",
    date: "4 de diciembre de 2025",
    images: [
      "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775344110/1_l1lpxc.png",
      "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775344109/2_ewsi9j.png",
      "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775344110/3_jb5vzu.png",
      "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775344110/4_fwyzcm.png",
      "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775344110/5_ewujl6.png",
      "https://res.cloudinary.com/dvqbb7cjs/image/upload/v1775344108/6_l6tmw9.png"
    ],
    description: "Utilizamos el subsuelo como un embalse invisible para infiltrar agua de forma controlada. Diseñamos proyectos para predios agrícolas, lecheros y ganaderos integrando hidrogeología e ingeniería hidráulica."
  }
];

export default function Blog() {
  const { pathname } = useLocation();
  const [currentPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div id="blog-unique-context">
      <main className="blog-main-layout">
        <header className="blog-header-v5">
          <div className="blog-container">
            <span className="blog-badge">Comunicación Estratégica</span>
            <h1 className="blog-display-h1">Nuestra <span>Vitrina.</span></h1>
            <p className="blog-header-p">Actualizaciones, proyectos y avances técnicos en Gestión de Acuíferos.</p>
          </div>
        </header>

        <section className="blog-feed-section">
          <div className="blog-container">
            <div className="blog-grid">
              {POSTS_DATA.map((post) => (
                <article key={post.id} className="blog-post-card">
                  <div className="blog-post-media">
                    {post.type === "video" ? (
                      <video controls className="blog-video-player">
                        <source src={post.src} type="video/mp4" />
                      </video>
                    ) : post.type === "carousel" ? (
                      <Carousel images={post.images} />
                    ) : (
                      <img src={post.src} alt={post.title} className="blog-single-img" />
                    )}
                  </div>
                  <div className="blog-post-info">
                    <div className="blog-post-meta">
                      <span className="blog-post-date">{post.date}</span>
                    </div>
                    <h2 className="blog-post-title">{post.title}</h2>
                    <p className="blog-post-desc">{post.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="blog-pager">
              <button className="blog-pager-btn disabled">Anterior</button>
              <span className="blog-pager-info">Página {currentPage} de 1</span>
              <button className="blog-pager-btn disabled">Siguiente</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Carousel({ images }) {
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((prev) => (prev + 1) % images.length);
  const prev = () => setIdx((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="blog-carousel">
      <img src={images[idx]} alt="Slide" className="blog-carousel-img" />
      {images.length > 1 && (
        <>
          <button className="carousel-btn prev" onClick={prev}>‹</button>
          <button className="carousel-btn next" onClick={next}>›</button>
          <div className="carousel-dots">
            {images.map((_, i) => (
              <span key={i} className={`dot ${i === idx ? "active" : ""}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}