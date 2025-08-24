import React from "react";
import "../../styles/About.css";
import orlandoImg from "../imagenes/Orlando Jimenez.jpg";

const TEAM = [
  {
    name: "Orlando Jiménez",
    initials: "OJ",
    tag: "Chile",
    bio: "Ingeniero Agrónomo (U. de Chile), MSc y PhD (Oxford). Ex CEO de CSIRO para América Latina (12 años). Lideró programas de gestión integrada de cuencas, incluyendo recarga de acuíferos.",
    photo: orlandoImg
  },
  {
    name: "Claudio Arriagada",
    initials: "CA",
    tag: "Chile",
    bio: "Ingeniero Agrónomo (UACh) y Perito Agrícola (IPA Adolfo Matthei). Especialista en proyectos de riego desde 2004 y en producción de berries por más de 17 años."
  },
  {
    name: "Russel Martin",
    initials: "RM",
    tag: "Australia",
    bio: "Hidrogeólogo líder global en implementación de recarga de acuíferos. 30 años de experiencia y participación en más de 60 proyectos en todo el mundo."
  },
  {
    name: "Enrique Fernández",
    initials: "EF",
    tag: "España",
    bio: "Hidrogeólogo líder en recarga gestionada de acuíferos, con más de 90 proyectos a nivel global. Autor, coautor y editor de 22 libros en gestión hídrica."
  },
  {
    name: "Domenico Sciolla",
    initials: "DS",
    tag: "Chile",
    bio: "Ingeniero Civil Hidráulico (PUC), MSc. Especialista en recursos hídricos, hidrología y diseño de obras hidráulicas."
  }
];

export default function About() {
  return (
    <main className="ac-about">
      <section className="section about-intro" aria-labelledby="about-title">
        <div className="container">
          <div className="linea-divisora"></div>
          <header className="section-head">
            <h1 id="about-title" className="about-title">Quiénes somos</h1>
            <p className="section-subtitle">
              <strong>Acuíferos Chile</strong> es una empresa de ingeniería especializada en el diseño y construcción de proyectos de{" "}
              <strong>Recarga de Acuíferos Gestionada (RAG)</strong>. Nuestro equipo reúne ingenieros agrónomos, civiles hidráulicos e
              hidrogeólogos con amplia trayectoria en gestión hídrica.
            </p>
            <p className="section-subtitle">
              Combinamos ciencia aplicada, innovación tecnológica y rigurosidad técnica para entregar{" "}
              <strong>soluciones llave en mano</strong>, que fortalecen la seguridad hídrica, aseguran el cumplimiento normativo y
              promueven la sostenibilidad de los recursos subterráneos.
            </p>
            <p className="section-subtitle">
              Nuestro propósito es transformar la manera en que Chile y la región gestionan sus acuíferos, aportando conocimiento,
              experiencia y resultados medibles en beneficio de las comunidades, la agricultura y el medio ambiente.
            </p>
          </header>
        </div>
      </section>

      <section className="section about-team" id="equipo" aria-labelledby="team-title">
        <div className="container">
          <div className="section-head">
            <div className="linea-divisora"></div>
            <h2 id="team-title">Equipo principal</h2>
            <p className="section-subtitle">
              Un equipo senior con experiencia comprobada en RAG, hidrología aplicada y gestión integrada de cuencas.
            </p>
          </div>

          <ul className="team-grid" role="list">
            {TEAM.map((m) => (
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
    </main>
  );
}
