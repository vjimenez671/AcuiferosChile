import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/Blog.css";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";


const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const EMOJI_SET = ["👍","❤️","🔥","👏","😂","😮","😢","🙏","🎉","💡"];

export default function Blog() {
  const navigate = useNavigate();

  const [feed, setFeed] = useState({ items: [], page: 1, pages: 1, total: 0, has_next: false, has_prev: false });
  const [loadingFeed, setLoadingFeed] = useState(false);
  const [errorFeed, setErrorFeed] = useState("");

  const [isComposerOpen, setComposerOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState("");
  const [okMsg, setOkMsg] = useState("");
  const [form, setForm] = useState({ title: "", content: "", attachment_url: "" });

  const { isAuth, currentUserId } = useMemo(() => {
    try {
      const token = !!localStorage.getItem("token");
      const u = JSON.parse(localStorage.getItem("user") || "null");
      return { isAuth: token && !!u, currentUserId: u?.id || null };
    } catch {
      return { isAuth: false, currentUserId: null };
    }
  }, []);

  useEffect(() => {
    fetchPosts(1);
  }, []);

  const fetchPosts = async (page = 1) => {
    setLoadingFeed(true);
    setErrorFeed("");
    try {

      const res = await fetch(`${API_URL}/api/posts?page=${page}&per_page=10`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "No se pudieron cargar las publicaciones.");
      setFeed(data);
    } catch (err) {
      setErrorFeed(err.message);
    } finally {
      setLoadingFeed(false);
    }
  };

  const requireAuth = () => {
    if (!localStorage.getItem("token")) {
      navigate("/signin", { replace: true });
      return false;
    }
    return true;
  };

  const openComposer = () => {

    if (!requireAuth()) return;
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
    if (!requireAuth()) return;
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
    if (!requireAuth()) return;

    setErrorSubmit("");
    setOkMsg("");

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
      fetchPosts(1);
    } catch (err) {
      setErrorSubmit(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const loadNext = () => feed.page < feed.pages && fetchPosts(feed.page + 1);
  const loadPrev = () => feed.page > 1 && fetchPosts(feed.page - 1);

  return (
    <main className="blog page-container">

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


      <section className="feed">
        <h2 className="sr-only">Publicaciones recientes</h2>
        {loadingFeed && <div className="feed-state">Cargando publicaciones…</div>}
        {errorFeed && <div className="error">{errorFeed}</div>}
        {!loadingFeed && !errorFeed && feed.items.length === 0 && (
          <div className="feed-empty">Aún no hay publicaciones. ¡Sé el primero en compartir algo!</div>
        )}

        {feed.items.map((p) => (
          <PostCard
            key={p.id}
            post={p}
            currentUserId={currentUserId}
            onChanged={() => fetchPosts(feed.page)}
            requireAuth={requireAuth}
          />
        ))}

        <div className="pager">
          <button className="btn btn-ghost" onClick={loadPrev} disabled={!feed.has_prev}>Anterior</button>
          <span className="pager-info">Página {feed.page} de {feed.pages}</span>
          <button className="btn btn-ghost" onClick={loadNext} disabled={!feed.has_next}>Siguiente</button>
        </div>
      </section>
    </main>
  );
}


function PostCard({ post, currentUserId, onChanged, requireAuth }) {
  const [isOpen, setOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [busy, setBusy] = useState(false);

  const [isEditing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ title: post.title, content: post.content, attachment_url: post.attachment_url || "" });

  const isAuthor = post?.user?.id === currentUserId;

  useEffect(() => {
    setEditForm({ title: post.title, content: post.content, attachment_url: post.attachment_url || "" });
  }, [post]);

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


  const toggleReaction = async (emoji) => {
    if (!requireAuth()) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/posts/${post.id}/reactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ emoji })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "No se pudo reaccionar");
      onChanged?.();
    } catch (e) {
      console.error(e);
    }
  };

  const fetchComments = async () => {

    try {
      const res = await fetch(`${API_URL}/api/posts/${post.id}/comments`, {

        headers: localStorage.getItem("token")
          ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
          : {}
      });
      if (res.status === 401 || res.status === 403) {

        setComments([]);
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Error cargando comentarios");
      setComments(data);
    } catch (e) {
      console.error(e);
    }
  };

  const sendComment = async () => {
    if (!requireAuth()) return;
    if (!newComment.trim()) return;
    setBusy(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/posts/${post.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ body: newComment })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "No se pudo comentar");
      setNewComment("");
      setComments((c) => [...c, data]);
      onChanged?.();
    } catch (e) {
      console.error(e);
    } finally {
      setBusy(false);
    }
  };

  const deleteComment = async (commentId) => {
    if (!requireAuth()) return;
    if (!window.confirm("¿Eliminar este comentario?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/posts/${post.id}/comments/${commentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message || "No se pudo eliminar");
      }
      setComments((c) => c.filter((x) => x.id !== commentId));
      onChanged?.();
    } catch (e) {
      console.error(e);
    }
  };

  const downloadAttachment = () => {
    if (!post.attachment_url) return;
    const a = document.createElement("a");
    a.href = post.attachment_url;
    a.download = (post.title || "archivo").replace(/\s+/g, "_");
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const openEdit = () => {
    if (!requireAuth()) return;
    setEditing(true);
  };
  const closeEdit = () => setEditing(false);
  const onEditChange = (e) => setEditForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submitEdit = async (e) => {
    e.preventDefault();
    if (!requireAuth()) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(editForm)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "No se pudo actualizar");
      setEditing(false);
      onChanged?.();
    } catch (e) {
      alert(e.message);
    }
  };

  const removePost = async () => {
    if (!requireAuth()) return;
    if (!window.confirm("¿Eliminar esta publicación?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/posts/${post.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message || "No se pudo eliminar");
      }
      onChanged?.();
    } catch (e) {
      alert(e.message);
    }
  };

  useEffect(() => {
    if (showComments) fetchComments();

  }, [showComments]);

  return (
    <article className="post-card" id={`post-${post.id}`}>
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
        <div className="post-header-right">
          {isAuthor && (
            <div className="owner-actions">
              <button className="btn btn-quiet" onClick={openEdit} title="Editar">✏️</button>
              <button className="btn btn-quiet" onClick={removePost} title="Eliminar">🗑️</button>
            </div>
          )}
        </div>
      </header>

      <h3 className="post-title">{post.title}</h3>

      <div className="post-content" dangerouslySetInnerHTML={{ __html: linkify(post.content) }} />

      {post.attachment_url && (
        <figure className="post-media">
          <div
            className="media-frame"
            onClick={() => setOpen(true)}
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
          <figcaption>
            <button className="btn btn-ghost" onClick={downloadAttachment}>Descargar</button>
            <span className="sep">•</span>
            <a href={post.attachment_url} target="_blank" rel="noreferrer">Abrir en pestaña</a>
          </figcaption>
          {isOpen && <Lightbox imgSrc={post.attachment_url} onClose={() => setOpen(false)} />}
        </figure>
      )}

      <div className="post-actions">
        <div className="reactions">
          {EMOJI_SET.map((e) => {
            const count = post.reactions?.[e] || 0;
            const mine = (post.my_reactions || []).includes(e);
            return (
              <button
                key={e}
                className={`reaction ${mine ? "is-active" : ""}`}
                onClick={() => toggleReaction(e)}
                title={mine ? "Quitar reacción" : "Reaccionar"}
              >
                <span className="emoji">{e}</span>
                {count > 0 && <span className="count">{count}</span>}
              </button>
            );
          })}
        </div>
        <div className="spacer" />
        <button className="btn btn-quiet" onClick={() => setShowComments((s) => !s)}>
          💬 {post.comment_count || 0}
        </button>
        <button className="btn btn-quiet" onClick={() => {
          const url = window.location.origin + window.location.pathname + `#post-${post.id}`;
          navigator.clipboard.writeText(url).then(() => alert("Enlace copiado"));
        }}>🔗 Compartir</button>
      </div>

      {showComments && (
        <div className="comments">
          {comments.length === 0 && (
            <div className="subhint">
              {localStorage.getItem("token")
                ? "Sé el primero en comentar."
                : "Inicia sesión para ver o escribir comentarios."}
            </div>
          )}
          {comments.map((c) => (
            <div className="comment" key={c.id}>
              <div className="avatar-circle small">
                {initials(`${c.user?.name || ""} ${c.user?.last_name || ""}`)}
              </div>
              <div className="comment-body">
                <div className="comment-meta">
                  <span>{c.user?.name} {c.user?.last_name}</span>
                  {c.user?.id === currentUserId && (
                    <button className="btn btn-quiet mini" title="Eliminar comentario" onClick={() => deleteComment(c.id)}>✕</button>
                  )}
                </div>
                <div className="comment-text">{c.body}</div>
              </div>
            </div>
          ))}
          <div className="comment-new">
            <input
              placeholder="Escribe un comentario…"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendComment()}
              onFocus={() => { if (!localStorage.getItem("token")) requireAuth(); }}
            />
            <button className="btn btn-primary" onClick={sendComment} disabled={busy || !newComment.trim()}>
              Enviar
            </button>
          </div>
        </div>
      )}

      {isEditing && (
        <ACModal title="Editar publicación" onClose={closeEdit}>
          <form className="composer-form" onSubmit={submitEdit}>
            <label className="field">
              <span>Título *</span>
              <input name="title" value={editForm.title} onChange={onEditChange} required />
            </label>
            <label className="field">
              <span>Contenido</span>
              <textarea name="content" rows={6} value={editForm.content} onChange={onEditChange} />
            </label>
            <label className="field">
              <span>URL de imagen (opcional)</span>
              <input name="attachment_url" value={editForm.attachment_url} onChange={onEditChange} placeholder="https://…" />
            </label>
            <div className="form-actions">
              <button type="button" className="btn btn-ghost" onClick={closeEdit}>Cancelar</button>
              <button className="btn btn-primary">Guardar cambios</button>
            </div>
          </form>
        </ACModal>
      )}
    </article>
  );
}

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

function initials(name = "") {
  const parts = name.split(" ").filter(Boolean);
  const first = parts[0]?.[0] || "";
  const last = parts[parts.length - 1]?.[0] || "";
  return (first + last).toUpperCase();
}

function linkify(text = "") {
  const esc = (s) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  const withLinks = esc(text).replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noreferrer">$1</a>');
  return withLinks.replace(/\n/g, "<br/>");
}

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
