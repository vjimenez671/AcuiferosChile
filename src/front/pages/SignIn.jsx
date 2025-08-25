import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/SignIn.css";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pw }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.msg || data?.message || "Error de autenticación");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // notificar a Navbar (misma pestaña)
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
      <form className="auth-card" onSubmit={onSubmit} aria-labelledby="signin-title">
        <h1 id="signin-title">Iniciar sesión</h1>

        <label className="field">
          <span>Correo</span>
          <input
            type="email"
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
        </label>

        <label className="field">
          <span>Contraseña</span>
          <div className="pw">
            <input
              type={showPw ? "text" : "password"}
              placeholder="••••••••"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
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

        {error && <div className="error" role="alert">{error}</div>}

        <button className="btn btn-primary auth-submit" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>

        <p className="hint">
          ¿No tienes cuenta? <Link to="/signup">Registrar usuario</Link>
        </p>
      </form>
    </main>
  );
}
