import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Contact.css";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export default function Contact() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [form, setForm] = useState({
    topic: "general",
    subject: "",
    message: "",
    link: "",
    copyMe: true,
  });
  const [error, setError] = useState("");
  const [okMsg, setOkMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Proteger ruta: si no hay sesión, redirigir a /signin
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRaw = localStorage.getItem("user");
    if (!token || !userRaw) {
      navigate("/signin", { replace: true });
      return;
    }
    try {
      const user = JSON.parse(userRaw);
      setUserEmail(user?.email || "");
      setUserName(user?.name || "");
    } catch {
      setUserEmail("");
      setUserName("");
    }
  }, [navigate]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOkMsg("");

    if (!form.subject.trim()) return setError("El asunto es obligatorio.");
    if (!form.message.trim()) return setError("El mensaje es obligatorio.");

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          topic: form.topic,
          subject: form.subject,
          message: form.message,
          link: form.link,
          copyMe: form.copyMe,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.msg || data?.message || "No se pudo enviar el correo.");

      setOkMsg("Tu mensaje fue enviado correctamente. ¡Gracias!");
      setForm((f) => ({ ...f, subject: "", message: "", link: "" }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact-wrapper">
      <section className="contact-card" aria-labelledby="contact-title">
        <h1 id="contact-title">Contáctanos</h1>
        <p className="intro">
          {userName ? `Hola ${userName}, ` : ""}completa el formulario y enviaremos tu mensaje al equipo.
        </p>

        <form className="contact-form" onSubmit={onSubmit}>
          <div className="grid-two">
            <label className="field">
              <span>Tu correo (desde registro)</span>
              <input type="email" value={userEmail} readOnly />
            </label>
          </div>

          <label className="field">
            <span>Tema</span>
            <select name="topic" value={form.topic} onChange={onChange}>
              <option value="general">Consulta general</option>
              <option value="proyecto">Proyecto</option>
            </select>
          </label>

          <label className="field">
            <span>Asunto *</span>
            <input
              type="text"
              name="subject"
              placeholder="Ej: Interés en ARS para predio en Los Ríos"
              value={form.subject}
              onChange={onChange}
              required
            />
          </label>

          <label className="field">
            <span>Mensaje *</span>
            <textarea
              name="message"
              rows={7}
              placeholder="Cuéntanos brevemente el contexto, objetivos y plazos..."
              value={form.message}
              onChange={onChange}
              required
            />
          </label>

          <label className="field">
            <span>Enlace (opcional)</span>
            <input
              type="url"
              name="link"
              placeholder="https://… (carpeta, documento, mapa, etc.)"
              value={form.link}
              onChange={onChange}
            />
          </label>

          <label className="check">
            <input
              type="checkbox"
              name="copyMe"
              checked={form.copyMe}
              onChange={onChange}
            />
            <span>Enviarme una copia (CC) a mi correo</span>
          </label>

          {error && <div className="error" role="alert">{error}</div>}
          {okMsg && <div className="ok" role="status">{okMsg}</div>}

          <div className="actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </div>

          <p className="note">
            Tu correo será enviado desde el servidor y al responder, llegará directo a tu buzón.
          </p>
        </form>
      </section>
    </main>
  );
}
