import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import BrandBand from "@/components/brand/BrandBand";
import { TrustpilotBadge } from "@/components/brand/Brand";

export const metadata: Metadata = {
  title: "Reserva una llamada | minute call",
  description:
    "Reserva una llamada con nuestro equipo para discutir cómo podemos ayudarte",
  alternates: {
    canonical: "/reserva-llamada",
  },
};

/* Solo Trustpilot junto al formulario: la atención va al formulario. */
function Trust({ className }: { className: string }) {
  return (
    <div className={`rsv-tp ${className}`}>
      <TrustpilotBadge />
    </div>
  );
}

/* Banda de la M: "photo" (agente con auriculares) o un color sólido: "purple" | "ink" | "lime". */
const BAND = "photo" as const;

export default function ReservaLlamada() {
  return (
    <>
    <div className="booking-page" style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(24px,6vw,60px) 24px 80px" }}>
      <div className="contact-grid" style={{ display: "grid", gap: 64, alignItems: "start" }}>
        {/* Left Side */}
        <div className="booking-hero">
          <h1 style={{ marginTop: 0, fontSize: "clamp(40px, 6vw, 72px)", letterSpacing: "-0.055em", lineHeight: 0.98 }}>
            Manos a la obra.
          </h1>
          <p className="hide-on-mobile" style={{ marginTop: 24, maxWidth: 400 }}>
            Nos pondremos en contacto contigo en menos de 24 h.
          </p>
          <Trust className="rsv-side" />
          <BrandBand className="mband-side" variant={BAND} />
        </div>

        {/* Right Side - Form */}
        <ContactForm />
      </div>
      <Trust className="rsv-bottom" />
    </div>
    <BrandBand className="mband-bottom" variant={BAND} />
    </>
  );
}
