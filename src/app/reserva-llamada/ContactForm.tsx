"use client";

import { FormEvent, useState } from "react";

// Fondo del form: más claro que el fondo de página (#EFEBE5)
const FORM_BG = "#F5F1EB";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Enviamos a Formspree en paralelo (fire & forget) — no bloqueamos el flujo
    fetch("https://formspree.io/f/xpwrjqkd", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    }).catch(() => {});

    // Mostramos Calendly siempre
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            background: FORM_BG,
            borderRadius: 16,
            padding: "20px 28px",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span style={{ fontSize: 24 }}>✓</span>
          <div>
            <p style={{ fontWeight: 600, color: "black", marginBottom: 2, fontSize: 16 }}>
              ¡Solicitud recibida!
            </p>
            <p className="service-card-body" style={{ marginBottom: 0 }}>
              Elige el hueco que mejor te venga:
            </p>
          </div>
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

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: FORM_BG,
        borderRadius: 16,
        padding: 40,
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <div>
        <label style={{ fontSize: 14, fontWeight: 500, color: "black", display: "block", marginBottom: 8 }}>
          Nombre *
        </label>
        <input
          type="text"
          name="nombre"
          required
          placeholder="Tu nombre"
          style={{
            width: "100%",
            padding: "12px 0",
            border: "none",
            borderBottom: "1px solid rgba(0,0,0,0.2)",
            background: "transparent",
            fontSize: 16,
            outline: "none",
            fontFamily: "Inter, sans-serif",
          }}
        />
      </div>

      <div>
        <label style={{ fontSize: 14, fontWeight: 500, color: "black", display: "block", marginBottom: 8 }}>
          Email de empresa *
        </label>
        <input
          type="email"
          name="email"
          required
          placeholder="tu@empresa.com"
          style={{
            width: "100%",
            padding: "12px 0",
            border: "none",
            borderBottom: "1px solid rgba(0,0,0,0.2)",
            background: "transparent",
            fontSize: 16,
            outline: "none",
            fontFamily: "Inter, sans-serif",
          }}
        />
      </div>

      <div>
        <label style={{ fontSize: 14, fontWeight: 500, color: "black", display: "block", marginBottom: 8 }}>
          Teléfono *
        </label>
        <input
          type="tel"
          name="telefono"
          required
          placeholder="+34 XXX XXX XXX"
          style={{
            width: "100%",
            padding: "12px 0",
            border: "none",
            borderBottom: "1px solid rgba(0,0,0,0.2)",
            background: "transparent",
            fontSize: 16,
            outline: "none",
            fontFamily: "Inter, sans-serif",
          }}
        />
      </div>

      <div>
        <label style={{ fontSize: 14, fontWeight: 500, color: "black", display: "block", marginBottom: 8 }}>
          Contexto (necesidad, volumen de llamadas diario, etc.) *
        </label>
        <textarea
          name="contexto"
          required
          rows={4}
          placeholder="Cuéntanos sobre tu empresa y tus necesidades..."
          style={{
            width: "100%",
            padding: "12px 0",
            border: "none",
            borderBottom: "1px solid rgba(0,0,0,0.2)",
            background: "transparent",
            fontSize: 16,
            outline: "none",
            fontFamily: "Inter, sans-serif",
            resize: "none",
          }}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-cta"
        style={{
          width: "100%",
          marginTop: 8,
          cursor: loading ? "wait" : "pointer",
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? "Enviando..." : "Reserva una llamada →"}
      </button>
    </form>
  );
}
