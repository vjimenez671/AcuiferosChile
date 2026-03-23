import React from "react";
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

function TeamSection({ title, subtitle, list, anchor, tone = "bg-section-a" }) {
  return (
    <section className={`section about-team ${tone}`} id={anchor}>
      <div className="container">
        <header className="section-head-centered">
          <div className="accent-line-centered"></div>
          <h2>{title}</h2>
          {subtitle && <p className="section-subtitle-centered">{subtitle}</p>}
        </header>

        <div className="team-grid">
          {list.map((m) => (
            <div key={m.name} className="member-card">
              <div className="member-header">
                <div className="member-avatar">
                  {m.photo ? (
                    <img src={m.photo} alt={m.name} className="avatar-photo" />
                  ) : (
                    <span className="avatar-initials">{m.initials}</span>
                  )}
                </div>
                <div className="member-heading">
                  <h3 className="member-name">{m.name}</h3>
                  <span className="member-tag">{m.tag}</span>
                </div>
              </div>
              <div className="member-divider"></div>
              <p className="member-bio">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <main className="ac-about">
      <section className="about-hero bg-section-b">
        <div className="container">
          <header className="hero-header">
            <div className="accent-line"></div>
            <h1 className="about-title">Quiénes somos</h1>
          </header>

          <div className="hero-grid-layout">
            <div className="hero-main-text">
              <p className="lead-text">
                <strong>Acuíferos Chile</strong> es una firma de ingeniería de alta especialidad dedicada al diseño y ejecución de sistemas de
                <span className="text-highlight"> Recarga de Acuíferos Gestionada (RAG)</span>.
              </p>
              <p className="support-text">
                Combinamos ciencia aplicada y tecnología de vanguardia para entregar soluciones llave en mano que fortalecen la seguridad hídrica ante el desafío climático.
              </p>
            </div>

            <aside className="mission-compact">
              <div className="mission-inner">
                <div className="mission-head">
                  <i className="fas fa-bullseye"></i>
                  <h2>Nuestra misión</h2>
                </div>
                <p>
                  Transformar la gestión hídrica para construir resiliencia. Convertimos la escorrentía en reservas estratégicas para las comunidades y la agricultura.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <TeamSection
        title="Equipo Principal"
        anchor="equipo-principal"
        subtitle="Liderazgo senior con trayectoria internacional en hidrología y gestión de cuencas."
        list={TEAM_MAIN}
        tone="bg-section-a"
      />

      <TeamSection
        title="Asociados Estratégicos"
        anchor="asociados"
        subtitle="Expertos globales que complementan nuestra visión técnica y territorial."
        list={TEAM_ASSOCIATES}
        tone="bg-section-b"
      />
    </main>
  );
}