import React from "react";
import "../../styles/About.css";
import orlandoImg from "../imagenes/Orlando Jimenez.jpg";
import claudioImg from "../imagenes/Claudio Arriagada.jpg";
import evaImg from "../imagenes/eva-saez.jpg";
import benjaminImg from "../imagenes/benjamin-santana.png";
import russellImg from "../imagenes/russell-martin.jpg";
import enriqueImg from "../imagenes/enrique-fernandez.jpg";
import jordiImg from "../imagenes/jordi-escorcia.jpg";
import diegoImg from "../imagenes/diego-anguita.jpg";
import reynaldoImg from "../imagenes/reynaldo-payano.png";
import alejandraImg from "../imagenes/alejandra-espinoza.png";

const TEAM_MAIN = [
  {
    name: "Claudio Arriagada",
    initials: "CA",
    tag: "Chile",
    bio: "Ingeniero Agrónomo (UACh) y Perito Agrícola (IPA Adolfo Matthei). Especialista en proyectos de riego desde 2004 y en producción de berries por más de 17 años.",
    photo: claudioImg,
  },
  {
    name: "Orlando Jiménez",
    initials: "OJ",
    tag: "Chile",
    bio: "Ingeniero Agrónomo (U. de Chile), MSc y PhD (Oxford). Ex CEO de CSIRO para América Latina (12 años). Lideró programas de gestión integrada de cuencas, incluyendo recarga de acuíferos.",
    photo: orlandoImg,
  },
  {
    name: "Eva Saez",
    initials: "ES",
    tag: "España",
    bio: "Hidrogeóloga con un MSc. en Ingeniería del Terreno con especialidad en Hidrología Subterránea de la Universidad Politécnica de Catalunya (UPC).",
    photo: evaImg,
  },
  {
    name: "Benjamín Santana",
    initials: "BS",
    tag: "Chile",
    bio: "Geólogo (U. Andrés Bello) con experiencia en herramientas SIG.",
    photo: benjaminImg,
  },
  {
    name: "Diego Anguita",
    initials: "DA",
    tag: "Chile",
    bio: "Ingeniero Civil en Informática, MBA y Máster en Redes. Experto en gestión estratégica de TI, innovación, optimización de procesos e inteligencia artificial, con trayectoria en dirección de proyectos y liderazgo organizacional.",
    photo: diegoImg,
  },
];

const TEAM_ASSOCIATES = [
  {
    name: "Russel Martin",
    initials: "RM",
    tag: "Australia",
    bio: "Hidrogeólogo líder global en implementación de recarga de acuíferos. 30 años de experiencia y participación en más de 60 proyectos en todo el mundo.",
    photo: russellImg,
  },
  {
    name: "Enrique Fernández",
    initials: "EF",
    tag: "España",
    bio: "Hidrogeólogo líder en recarga gestionada de acuíferos, con más de 90 proyectos a nivel global. Autor, coautor y editor de 22 libros en gestión hídrica.",
    photo: enriqueImg,
  },
  {
    name: "Jordi Escorcia",
    initials: "JE",
    tag: "Chile",
    bio: "Geólogo (UAB), Máster en Hidrología Subterránea (UPC). Más de 20 años de experiencia en hidrogeología, minería y medio ambiente, con énfasis en modelación hidrogeológica y docencia universitaria.",
    photo: jordiImg,
  },
  {
    name: "Reynaldo Payano",
    initials: "RP",
    tag: "Chile",
    bio: "Ingeniero Civil Hidrólogo, PhD. 15 años de experiencia en recursos hídricos. Gerente General y socio fundador de INRHED, especialista en estudios hidrológicos y planificación hídrica internacional.",
    photo: reynaldoImg,
  },
];

function TeamSection({ title, subtitle, list, anchor, tone = "tone-a" }) {
  return (
    <section
      className={`section about-team ${tone}`}
      id={anchor}
      aria-labelledby={`${anchor}-title`}
    >
      <div className="container">
        <div className="section-head">
          <div className="linea-divisora"></div>
          <h2 id={`${anchor}-title`}>{title}</h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>

        <ul className="team-grid" role="list">
          {list.map((m) => (
            <li key={m.name} className="member-card" aria-label={m.name}>
              <div className="member-header">
                <div className="member-avatar" aria-hidden="true">
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
              <p className="member-bio">{m.bio}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <main className="ac-about">
      {/* Quiénes somos: fondo blanco */}
      <section className="section about-intro" aria-labelledby="about-title">
        <div className="container">
          <div className="linea-divisora"></div>
          <header className="section-head">
            <h1 id="about-title" className="about-title">Quiénes somos</h1>
            <p className="section-subtitle">
              <strong>Acuíferos Chile</strong> es una empresa de ingeniería especializada en el diseño y construcción de proyectos de{" "}
              <strong>Recarga de Acuíferos Gestionada (RAG)</strong>. Nuestro equipo reúne ingenieros agrónomos, civiles hidráulicos e
              hidrogeólogos con amplia trayectoria en gestión hídrica, conformado por profesionales de distintas nacionalidades y trayectorias internacionales.
            </p>
            <p className="section-subtitle">
              Combinamos ciencia aplicada, innovación tecnológica y rigurosidad técnica para entregar{" "}
              <strong>soluciones llave en mano</strong>, que fortalecen la seguridad hídrica, aseguran el cumplimiento normativo y
              promueven la sostenibilidad de los recursos subterráneos.
            </p>

          </header>

          {/* NUEVO: Misión (card con fondo blanco y hover) */}
          <div className="mission-callout" role="note" aria-label="Nuestra misión">
            <h2 className="mission-title">Nuestra misión</h2>
            <p className="mission-text">
              Nuestra misión es transformar la gestión de los acuíferos para construir resiliencia hídrica ante el cambio climático.
              En un contexto de sequías recurrentes y lluvias torrenciales ineficaces para la recarga (que se pierden como escorrentía),
              aportamos conocimiento, experiencia y resultados medibles para asegurar el agua en beneficio de las comunidades,
              la agricultura y el medio ambiente.
            </p>
          </div>
        </div>
      </section>

      {/* Equipo principal: fondo azul muy suave */}
      <TeamSection
        title="Equipo principal"
        anchor="equipo-principal"
        subtitle="Un equipo senior con experiencia comprobada en RAG, hidrología aplicada y gestión integrada de cuencas."
        list={TEAM_MAIN}
        tone="tone-a"
      />

      {/* Asociados: fondo azul suave alternativo */}
      <TeamSection
        title="Asociados"
        anchor="asociados"
        subtitle="Especialistas que complementan capacidades técnicas y territoriales."
        list={TEAM_ASSOCIATES}
        tone="tone-b"
      />
    </main>
  );
}
