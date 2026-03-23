import React, { useEffect } from "react";
import "../../styles/About.css";

// Importación de Imágenes
import orlandoImg from "../imagenes/Orlando Jimenez.jpg";
import claudioImg from "../imagenes/Claudio Arriagada.jpg";
import evaImg from "../imagenes/eva-saez.jpg";
import benjaminImg from "../imagenes/benjamin-santana.jpg";
import russellImg from "../imagenes/russell-martin.jpg";
import enriqueImg from "../imagenes/enrique-fernandez.jpg";
import jordiImg from "../imagenes/jordi-escorcia.jpg";
import diegoImg from "../imagenes/diego-anguita.jpg";
import reynaldoImg from "../imagenes/reynaldo-payano.png";

const TEAM_MAIN = [
  { name: "Claudio Arriagada", initials: "CA", tag: "Chile", bio: "Gerente general. Ingeniero Agrónomo (UACh). Especialista en proyectos de riego desde 2004 y en producción de berries por más de 17 años.", photo: claudioImg },
  { name: "Orlando Jiménez", initials: "OJ", tag: "Chile", bio: "Socio director. Ingeniero Agrónomo (U. de Chile), MSc y PhD (Oxford). Ex CEO de CSIRO para América Latina (12 años).", photo: orlandoImg },
  { name: "Eva Saez", initials: "ES", tag: "España", bio: "Hidrogeóloga con un MSc. en Ingeniería del Terreno con especialidad en Hidrología Subterránea (UPC).", photo: evaImg },
  { name: "Benjamín Santana", initials: "BS", tag: "Chile", bio: "Geólogo (U.Andrés Bello) con licencia de piloto de dron y dominio de SIG, enfocado en el mapeo y análisis técnico de terreno.", photo: benjaminImg },
  { name: "Diego Anguita", initials: "DA", tag: "Chile", bio: "Ingeniero Civil en Informática, MBA y Máster en Redes. Experto en gestión estratégica de TI e IA aplicada.", photo: diegoImg },
];

const TEAM_ASSOCIATES = [
  { name: "Russel Martin", initials: "RM", tag: "Australia", bio: "Hidrogeólogo líder global en implementación de recarga de acuíferos con participación en más de 60 proyectos mundiales.", photo: russellImg },
  { name: "Enrique Fernández", initials: "EF", tag: "España", bio: "Hidrogeólogo líder en RAG con más de 90 proyectos globales y autor de 22 libros técnicos.", photo: enriqueImg },
  { name: "Jordi Escorcia", initials: "JE", tag: "Chile", bio: "Geólogo (UAB), Máster en Hidrología Subterránea (UPC). Especialista en modelación hidrogeológica y minería.", photo: jordiImg },
  { name: "Reynaldo Payano", initials: "RP", tag: "Chile", bio: "Ingeniero Civil Hidrólogo, PhD. Especialista en estudios hidrológicos y planificación hídrica internacional.", photo: reynaldoImg },
];

function TeamSection({ title, subtitle, list, tone }) {
  const words = title.split(' ');
  const mainText = words.slice(0, -1).join(' ');
  const highlightText = words[words.length - 1];

  return (
    <section className={`about-team-section ${tone}`}>
      <div className="container">
        <div className="home-section-header">
          <span className="home-eyebrow">Expertos</span>
          <h2 className="home-display-h2">
            {mainText} <span>{highlightText}</span>
          </h2>
          {subtitle && <p className="home-subtitle">{subtitle}</p>}
        </div>

        <div className="about-team-grid">
          {list.map((m) => (
            <div key={m.name} className="about-member-card">
              <div className="about-member-header">
                <div className="about-member-avatar">
                  {m.photo ? (
                    <img src={m.photo} alt={m.name} />
                  ) : (
                    <div className="about-avatar-placeholder">{m.initials}</div>
                  )}
                </div>
                <div className="about-member-info">
                  <span className="about-member-tag">{m.tag}</span>
                  <h3>{m.name}</h3>
                </div>
              </div>
              <div className="about-member-divider"></div>
              <p className="about-member-bio">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="about-unique-context">
      <section className="about-hero about-bg-main">
        <div className="container">
          <div className="about-hero-layout">
            <div className="about-hero-text">
              <span className="home-tag-premium">Nuestra Identidad</span>
              <h1 className="about-hero-h1">Ciencia aplicada al <br /><span>futuro del agua.</span></h1>
              <p className="about-lead">
                <strong>Acuíferos Chile</strong> es una firma de ingeniería de alta especialidad dedicada al diseño y ejecución de sistemas de
                <span className="text-highlight"> Recarga de Acuíferos Gestionada (RAG)</span>.
              </p>
              <p className="about-support">
                Combinamos <strong>rigor científico</strong> y tecnología de vanguardia para entregar soluciones llave en mano que fortalecen la seguridad hídrica.
              </p>
            </div>

            <div className="about-mission-card">
              <div className="about-mission-icon">
                <i className="fas fa-bullseye"></i>
              </div>
              <h3>Nuestra <span>Misión</span></h3>
              <p>Transformar la gestión hídrica para construir <strong>resiliencia</strong>. Convertimos la escorrentía en reservas estratégicas para las comunidades.</p>
              <div className="about-mission-glow"></div>
            </div>
          </div>
        </div>
      </section>

      <TeamSection
        title="Equipo Principal"
        subtitle="Liderazgo senior con trayectoria internacional en hidrología y gestión de cuencas."
        list={TEAM_MAIN}
        tone="about-bg-alt"
      />

      <TeamSection
        title="Asociados Estratégicos"
        subtitle="Expertos globales que complementan nuestra visión técnica y territorial."
        list={TEAM_ASSOCIATES}
        tone="about-bg-main"
      />
    </main>
  );
}