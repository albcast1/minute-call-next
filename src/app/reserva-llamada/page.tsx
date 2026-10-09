import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import BrandBand from "@/components/brand/BrandBand";

export const metadata: Metadata = {
  title: "Reserva una llamada | minute call",
  description:
    "Reserva una llamada con nuestro equipo para discutir cómo podemos ayudarte",
  alternates: {
    canonical: "/reserva-llamada",
  },
};

export default function ReservaLlamada() {
  return (
    <>
    <div className="booking-page" style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(24px,6vw,60px) 24px 80px" }}>
      <div className="contact-grid" style={{ display: "grid", gap: 64, alignItems: "start" }}>
        {/* Left Side */}
        <div className="booking-hero">
          <span className="pill-label" style={{ marginBottom: 24, display: "inline-block" }}>
            Hablemos
          </span>
          <h1 style={{ marginTop: 16, fontSize: "clamp(40px, 6vw, 72px)", letterSpacing: "-0.055em", lineHeight: 0.98 }}>
            Manos a la obra.
          </h1>
          <p className="hide-on-mobile" style={{ marginTop: 24, maxWidth: 400 }}>
            Nos pondremos en contacto contigo menos de 24h.
          </p>
          <BrandBand className="mband-side" />
        </div>

        {/* Right Side - Form */}
        <ContactForm />
      </div>
    </div>
    <BrandBand className="mband-bottom" />
    </>
  );
}
