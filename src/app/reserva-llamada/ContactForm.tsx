"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xpwrjqkd", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setSubmitted(true);
        form.reset();
      }
    } catch {
      alert("Error al enviar. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: 48,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
        <h3 style={{ fontSize: 22, marginBottom: 8 }}>¡Gracias!</h3>
        <p className="service-card-body">
          Hemos recibido tu solicitud. Nos pondremos en contacto contigo dentro
          de 24 horas.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "white",
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
            borderBottom: "1px solid rgba(0,0,0,0.15)",
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
            borderBottom: "1px solid rgba(0,0,0,0.15)",
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
            borderBottom: "1px solid rgba(0,0,0,0.15)",
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
            borderBottom: "1px solid rgba(0,0,0,0.15)",
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
