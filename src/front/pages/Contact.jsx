import React, { useMemo, useState } from "react";
import "../../styles/Contact.css";

const TO_EMAIL = "vicentejimenez.prog@gmail.com";

export default function Contact() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    asunto: "",
    mensaje: "",
    website: "", // honeypot antispam
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // Construye el mailto con subject y body formateado
  const mailtoHref = useMemo(() => {
    const asunto = form.asunto?.trim() || "Contacto desde sitio web";
    const lineas = [
      `Nombre: ${form.nombre || "-"}`,
      `Correo: ${form.correo || "-"}`,
      form.telefono ? `Teléfono: ${form.telefono}` : null,
      "",
      "Mensaje:",
      form.mensaje || "-",
    ].filter(Boolean);
    const body = lineas.join("\n");
    const params = new URLSearchParams({
      subject: asunto,
      body,
    }).toString();
    return `mailto:${TO_EMAIL}?${params}`;
  }, [form]);

  const handleOpenEmail = (e) => {
    e.preventDefault();
    // Si el honeypot viene con algo, no enviamos
    if (form.website) return;
    window.location.href = mailtoHref;
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(TO_EMAIL);
      alert("Dirección copiada al portapapeles.");
    } catch {
      // fallback silencioso
    }
  };

  return (
    <main className="ac-contact">
      <section className="section contact-intro" aria-labelledby="contact-title">
        <div className="container">
          <div className="linea-divisora"></div>
          <header className="section-head">
            <h1 id="contact-title" className="contact-title">Contáctanos</h1>
            <p className="section-subtitle">
              Completa el formulario y te abriremos tu cliente de correo con el mensaje pre-llenado.
              También puedes escribirnos directamente a{" "}
              <a className="link-mail" href={`mailto:${TO_EMAIL}`}>{TO_EMAIL}</a>.
            </p>
          </header>

          <form className="contact-form" onSubmit={handleOpenEmail}>
            {/* Honeypot antispam */}
            <div className="hidden-field" aria-hidden="true">
              <label htmlFor="website">No completar</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={onChange}
              />
            </div>

            <div className="form-grid">
              <div className="form-control">
                <label htmlFor="nombre">Nombre</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Tu nombre"
                  value={form.nombre}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="form-control">
                <label htmlFor="correo">Correo</label>
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  placeholder="tucorreo@dominio.com"
                  value={form.correo}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="form-control">
                <label htmlFor="telefono">Teléfono (opcional)</label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder="+56 9 1234 5678"
                  value={form.telefono}
                  onChange={onChange}
                />
              </div>

              <div className="form-control form-span-2">
                <label htmlFor="asunto">Asunto</label>
                <input
                  id="asunto"
                  name="asunto"
                  type="text"
                  placeholder="Asunto del mensaje"
                  value={form.asunto}
                  onChange={onChange}
                />
              </div>

              <div className="form-control form-span-2">
                <label htmlFor="mensaje">Mensaje</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows="6"
                  placeholder="Cuéntanos brevemente tu necesidad…"
                  value={form.mensaje}
                  onChange={onChange}
                  required
                />
              </div>
            </div>

            <div className="actions">
              <button type="submit" className="btn btn-primary">
                Abrir correo y enviar
              </button>

              <a className="btn btn-ghost" href={mailtoHref}>
                Ver vista previa
              </a>

              <button type="button" className="btn btn-ghost" onClick={copyAddress}>
                Copiar dirección
              </button>
            </div>

            <p className="hint">
              * Al presionar “Abrir correo y enviar” se abrirá tu aplicación de correo con el mensaje pre-llenado para{" "}
              <strong>{TO_EMAIL}</strong>. Revisa y envía desde tu buzón.
            </p>

            <noscript>
              <p>
                JavaScript está deshabilitado. Puedes escribirnos a{" "}
                <a href={`mailto:${TO_EMAIL}`}>{TO_EMAIL}</a>.
              </p>
            </noscript>
          </form>
        </div>
      </section>
    </main>
  );
}
