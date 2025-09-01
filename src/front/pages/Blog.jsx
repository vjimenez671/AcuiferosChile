import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/Blog.css";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

// Opcional: Cloudinary
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export default function Blog() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loadingFeed, setLoadingFeed] = useState(false);
  const [errorFeed, setErrorFeed] = useState("");

  const [isComposerOpen, setComposerOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState("");
  const [okMsg, setOkMsg] = useState("");
  const [form, setForm] = useState({ title: "", content: "", attachment_url: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin", { replace: true });
    } else {
      fetchPosts();
    }
  }, [navigate]);

  const fetchPosts = async () => {
    setLoadingFeed(true);
    setErrorFeed("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "No se pudieron cargar las publicaciones.");
      setPosts(data);
    } catch (err) {
      setErrorFeed(err.message);
    } finally {
      setLoadingFeed(false);
    }
  };

  const openComposer = () => {
    setErrorSubmit("");
    setOkMsg("");
    setComposerOpen(true);
  };
  const closeComposer = () => {
    if (submitting) return;
    setComposerOpen(false);
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const attachFromCloudinary = () => {
    if (!window.cloudinary || !CLOUD_NAME || !UPLOAD_PRESET) {
      setErrorSubmit("Cloudinary no está configurado. Usa el campo URL de imagen.");
      return;
    }
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUD_NAME,
        uploadPreset: UPLOAD_PRESET,
        sources: ["local", "camera", "url"],
        multiple: false,
        folder: "blog",
        language: "es",
        text: {
          es: {
            menu: { files: "Archivos", url: "URL", camera: "Cámara" },
            or: "o",
            queue: { title: "Cola de carga", done: "Listo" },
            local: { browse: "Elegir archivos" },
            crop: { title: "Recortar" },
          },
        },
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setForm((f) => ({ ...f, attachment_url: result.info.secure_url }));
        } else if (error) {
          setErrorSubmit(error.message || "Error subiendo imagen.");
        }
      }
    );
    widget.open();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorSubmit("");
    setOkMsg("");

    // Solo título obligatorio
    if (!form.title.trim()) {
      return setErrorSubmit("El título es obligatorio.");
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Error al publicar.");
      setOkMsg("¡Publicación creada!");
      setForm({ title: "", content: "", attachment_url: "" });
      setComposerOpen(false);
      fetchPosts();
    } catch (err) {
      setErrorSubmit(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="blog page-container">
      {/* Composer */}
      <section className="composer-card" aria-label="Crear una publicación">
        <div className="composer-avatar" aria-hidden="true">
          <div className="avatar-circle">U</div>
        </div>
        <button className="composer-button" onClick={openComposer}>
          ¿Qué quieres compartir hoy?
        </button>
        <div className="composer-actions">
          <button className="btn btn-quiet" onClick={openComposer} title="Escribir">✍️</button>
          <button className="btn btn-quiet" onClick={openComposer} title="Imagen">🖼️</button>
        </div>
      </section>

      {/* Modal */}
      {isComposerOpen && (
        <ACModal onClose={closeComposer} title="Crear publicación">
          <form className="composer-form" onSubmit={onSubmit}>
            <label className="field">
              <span>Título *</span>
              <input type="text" name="title" value={form.title} onChange={onChange} required />
            </label>
            <label className="field">
              <span>Contenido (opcional)</span>
              <textarea
                name="content"
                rows={6}
                value={form.content}
                onChange={onChange}
                placeholder="Escribe algo (opcional)…"
              />
            </label>
            <div className="grid-attach">
              <label className="field">
                <span>URL de imagen (opcional)</span>
                <input
                  type="url"
                  name="attachment_url"
                  value={form.attachment_url}
                  onChange={onChange}
                  placeholder="https://…"
                />
              </label>
              <div className="upload-block">
                <span className="hint">o</span>
                <button type="button" className="btn btn-secondary" onClick={attachFromCloudinary}>
                  Subir imagen
                </button>
              </div>
            </div>
            {form.attachment_url && (
              <div className="image-preview">
                <img src={form.attachment_url} alt="Vista previa" />
              </div>
            )}
            {errorSubmit && <div className="error">{errorSubmit}</div>}
            {okMsg && <div className="ok">{okMsg}</div>}
            <div className="form-actions">
              <button type="button" className="btn btn-ghost" onClick={closeComposer} disabled={submitting}>
                Cancelar
              </button>
              <button className="btn btn-primary" disabled={submitting}>
                {submitting ? "Publicando..." : "Publicar"}
              </button>
            </div>
          </form>
        </ACModal>
      )}

      {/* Feed */}
      <section className="feed">
        <h2 className="sr-only">Publicaciones recientes</h2>
        {loadingFeed && <div className="feed-state">Cargando publicaciones…</div>}
        {errorFeed && <div className="error">{errorFeed}</div>}
        {!loadingFeed && !errorFeed && posts.length === 0 && (
          <div className="feed-empty">Aún no hay publicaciones. ¡Sé el primero en compartir algo!</div>
        )}
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </section>
    </main>
  );
}

/* Post Card */
function PostCard({ post }) {
  const [isOpen, setOpen] = useState(false);

  const createdAt = useMemo(() => {
    try {
      const d = new Date(post.created_at);
      const dd = String(d.getDate()).padStart(2, "0");
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const yyyy = d.getFullYear();
      const time = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      return `${dd}/${mm}/${yyyy} ${time}`;
    } catch {
      return post.created_at;
    }
  }, [post.created_at]);

  const openLightbox = () => setOpen(true);
  const keyOpen = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  };

  return (
    <article className="post-card">
      <header className="post-header">
        <div className="post-author">
          <div className="avatar-circle">
            {initials(`${post.user?.name || ""} ${post.user?.last_name || ""}`)}
          </div>
          <div className="meta">
            <div className="name">{post.user?.name} {post.user?.last_name}</div>
            <div className="time">{createdAt}</div>
          </div>
        </div>
        <h3 className="post-title">{post.title}</h3>
      </header>

      <div className="post-content">{post.content}</div>

      {post.attachment_url && (
        <figure className="post-media">
          <div
            className="media-frame"
            onClick={openLightbox}
            onKeyDown={keyOpen}
            role="button"
            tabIndex={0}
            aria-label="Ampliar imagen"
          >
            <img
              src={post.attachment_url}
              alt={post.title}
              className="media-image"
            />
          </div>
          <figcaption>Haz click para ampliar</figcaption>
          {isOpen && <Lightbox imgSrc={post.attachment_url} onClose={() => setOpen(false)} />}
        </figure>
      )}
    </article>
  );
}

/* Lightbox */
function Lightbox({ imgSrc, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return createPortal(
    <div className="lightbox" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose}>✕</button>
      <img
        src={imgSrc}
        alt="Imagen ampliada"
        className="lightbox-image"
        onClick={(e) => e.stopPropagation()}
      />
    </div>,
    document.body
  );
}

/* Utilidad: iniciales */
function initials(name = "") {
  const parts = name.split(" ").filter(Boolean);
  const first = parts[0]?.[0] || "";
  const last = parts[parts.length - 1]?.[0] || "";
  return (first + last).toUpperCase();
}

/* Modal */
function ACModal({ title, onClose, children }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return createPortal(
    <div className="ac-modal-backdrop" onClick={onBackdropClick} role="dialog" aria-modal="true">
      <div className="ac-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ac-modal-head">
          <h3 className="ac-modal-title">{title}</h3>
          <button className="ac-modal-close" onClick={onClose} aria-label="Cerrar">✕</button>
        </div>
        <div className="ac-modal-body">{children}</div>
      </div>
    </div>,
    document.body
  );
}
