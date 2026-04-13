import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Reserva una llamada | minute call",
  description:
    "Reserva una llamada con nuestro equipo para discutir cómo podemos ayudarte",
};

export default function ReservaLlamada() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px 80px" }}>
      <div className="contact-grid" style={{ display: "grid", gap: 64, alignItems: "start" }}>
        {/* Left Side */}
        <div>
          <span className="pill-label" style={{ marginBottom: 24, display: "inline-block" }}>
            Hablemos
          </span>
          <h1 style={{ marginTop: 16, fontSize: "clamp(36px, 7vw, 55px)", letterSpacing: "-0.06em", lineHeight: 1.05 }}>
            Manos a la <span className="serif-italic">obra</span>
          </h1>
          <p style={{ marginTop: 24, maxWidth: 400 }}>
            Nos pondremos en contacto contigo menos de 24h.
          </p>
        </div>

        {/* Right Side - Form */}
        <ContactForm />
      </div>
    </div>
  );
}
