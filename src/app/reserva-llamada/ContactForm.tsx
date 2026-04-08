"use client";
import { useState } from "react";

const FORM_BG = "#F5F1EB";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data: Record<string, string> = {};
    const fd = new FormData(form);
    fd.forEach((v, k) => { data[k] = String(v); });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Error al enviar. Inténtalo de nuevo.");
      }
    } catch {
      setError("Error al enviar. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            background: FORM_BG,
            borderRadius: 16,
            padding: "20px 28px",
            fontSize: 16,
            color: "#222",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          ✓ ¡Solicitud recibida! Elige el hueco que mejor te venga:
        </div>
        <iframe
          src="https://calendly.com/alberto-minutecall/20min?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=F5F1EB&text_color=000000&primary_color=5AFF15"
          width="100%"
          height="680"
          frameBorder="0"
          style={{ borderRadius: 16, border: "none", display: "block" }}
        />
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 10,
    border: "1px solid rgba(0,0,0,0.12)",
    background: "#fff",
    fontSize: 15,
    color: "#222",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 13,
    fontWeight: 500,
    color: "rgba(0,0,0,0.5)",
    marginBottom: 6,
  };

  return (
    <div
      style={{
        background: FORM_BG,
        borderRadius: 20,
        padding: "36px 40px",
        border: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <label style={labelStyle} htmlFor="nombre">Nombre</label>
          <input id="nombre" name="nombre" type="text" required placeholder="Tu nombre" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required placeholder="tu@email.com" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle} htmlFor="telefono">Teléfono</label>
          <input id="telefono" name="telefono" type="tel" required placeholder="+34 600 000 000" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle} htmlFor="contexto">¿En qué contexto usarías Minute Call?</label>
          <textarea
            id="contexto"
            name="contexto"
            required
            rows={4}
            placeholder="Cuéntanos brevemente..."
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </div>

        {error && (
          <p style={{ color: "#cc0000", fontSize: 14, margin: 0 }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-cta"
          style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer", width: "100%" }}
        >
          {loading ? "Enviando..." : "Reservar llamada →"}
        </button>
      </form>
    </div>
  );
}
