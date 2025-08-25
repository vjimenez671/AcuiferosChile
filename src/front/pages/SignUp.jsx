import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/SignUp.css";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 7) return setError("La contraseña debe tener al menos 7 caracteres.");
    if (form.password !== form.confirm) return setError("Las contraseñas no coinciden.");

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          last_name: form.last_name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.msg || data?.message || "No se pudo registrar");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // notificar a Navbar
      window.dispatchEvent(new Event("auth-changed"));

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-wrapper">
      <form className="auth-card" onSubmit={onSubmit} aria-labelledby="signup-title">
        <h1 id="signup-title">Crear cuenta</h1>

        <div className="grid-two">
          <label className="field">
            <span>Nombre</span>
            <input type="text" name="name" placeholder="Ana" value={form.name} onChange={onChange} required />
          </label>

          <label className="field">
            <span>Apellido</span>
            <input type="text" name="last_name" placeholder="Pérez" value={form.last_name} onChange={onChange} required />
          </label>
        </div>

        <label className="field">
          <span>Correo</span>
          <input type="email" name="email" placeholder="tu@correo.com" value={form.email} onChange={onChange} required />
        </label>

        <label className="field">
          <span>Contraseña (mín. 7)</span>
          <div className="pw">
            <input
              type={showPw ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={onChange}
              minLength={7}
              required
            />
            <button
              type="button"
              className="eye-btn"
              aria-label={showPw ? "Ocultar contraseña" : "Mostrar contraseña"}
              onClick={() => setShowPw((v) => !v)}
            >
              {showPw ? "🙈" : "👁️"}
            </button>
          </div>
        </label>

        <label className="field">
          <span>Repetir contraseña</span>
          <div className="pw">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirm"
              placeholder="••••••••"
              value={form.confirm}
              onChange={onChange}
              minLength={7}
              required
            />
            <button
              type="button"
              className="eye-btn"
              aria-label={showConfirm ? "Ocultar contraseña" : "Mostrar contraseña"}
              onClick={() => setShowConfirm((v) => !v)}
            >
              {showConfirm ? "🙈" : "👁️"}
            </button>
          </div>
        </label>

        {error && <div className="error" role="alert">{error}</div>}

        <button className="btn btn-primary auth-submit" disabled={loading}>
          {loading ? "Creando cuenta..." : "Crear cuenta"}
        </button>

        <p className="hint">
          ¿Ya tienes cuenta? <Link to="/signin">Iniciar sesión</Link>
        </p>
      </form>
    </main>
  );
}
