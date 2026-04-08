import { Metadata } from "next";
import sectors from "@/data/sectors.json";
import { FAQPageSchema, BreadcrumbSchema } from "@/components/JsonLd";

type SectorData = (typeof sectors)[0];

export async function generateStaticParams() {
  return sectors.map((sector) => ({
    slug: sector.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sector = sectors.find((s) => s.slug === slug);

  if (!sector) {
    return {};
  }

  return {
    title: sector.metaTitle,
    description: sector.metaDescription,
    openGraph: {
      title: sector.metaTitle,
      description: sector.metaDescription,
      type: "website",
    },
  };
}

function FAQAccordion({
  faq,
}: {
  faq: Array<{ question: string; answer: string }>;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {faq.map((item, index) => (
        <details
          key={index}
          style={{ border: "1.5px solid rgba(0,0,0,0.12)", borderRadius: 16, overflow: "hidden" }}
        >
          <summary style={{ cursor: "pointer", padding: "20px 24px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", fontWeight: 600, fontSize: 17, color: "#111", listStyle: "none" }}>
            <span>{item.question}</span>
            <span style={{ color: "rgba(0,0,0,0.4)", fontSize: 14, flexShrink: 0, marginLeft: 16 }}>▼</span>
          </summary>
          <div style={{ padding: "16px 24px", background: "#F5F0E8", color: "rgba(0,0,0,0.7)", fontSize: 16, lineHeight: 1.6, borderTop: "1.5px solid rgba(0,0,0,0.08)" }}>
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sector = sectors.find((s) => s.slug === slug);

  if (!sector) {
    return <div style={{ textAlign: "center", padding: "80px 24px", background: "#F5F0E8" }}>Sector no encontrado</div>;
  }

  return (
    <div style={{ background: "#F5F0E8", minHeight: "100vh", fontFamily: "inherit" }}>
      <FAQPageSchema faqs={sector.faq.map(f => ({ question: f.question, answer: f.answer }))} />
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "https://www.minute-call.com" },
        { name: sector.title, url: `https://www.minute-call.com/lp/${sector.slug}` }
      ]} />

      {/* Hero Section */}
      <section style={{ paddingTop: 100, paddingBottom: 80, paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          {/* Trustpilot Badge */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", padding: "8px 20px", borderRadius: 50, fontSize: 14, fontWeight: 500, color: "#111", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
              <span style={{ color: "#f59e0b" }}>★★★★★</span>
              <span>4.9 en Trustpilot</span>
            </div>
          </div>

          {/* Tag Badge */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
            <span style={{ display: "inline-block", background: "#fff", padding: "8px 20px", borderRadius: 50, fontSize: 14, fontWeight: 600, color: "#111", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
              {sector.heroTag}
            </span>
          </div>

          {/* Main Headline */}
          <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 800, textAlign: "center", color: "#111", marginBottom: 24, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Recepcionista de IA para <em style={{ fontStyle: "italic" }}>{sector.sector}</em>.
          </h1>

          {/* Subtitle */}
          <p style={{ fontSize: 19, color: "rgba(0,0,0,0.7)", textAlign: "center", lineHeight: 1.6, maxWidth: 680, margin: "0 auto 32px auto" }}>
            {sector.heroSubtitle}
          </p>

          {/* Social Proof */}
          <p style={{ textAlign: "center", color: "rgba(0,0,0,0.56)", fontSize: 15, marginBottom: 40 }}>{sector.socialProof}</p>

          {/* CTA Button */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button style={{ backgroundColor: "#5AFF15", color: "#000", border: "2px solid #222", fontWeight: 700, padding: "18px 40px", borderRadius: 50, fontSize: 18, cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
              Solicitar demo
            </button>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section style={{ padding: "80px 24px", background: "rgba(0,0,0,0.04)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{ marginBottom: 16, fontSize: 40 }}>💬</div>
          <blockquote style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 600, color: "#111", marginBottom: 24, fontStyle: "italic", lineHeight: 1.4, margin: "0 0 24px 0" }}>
            &ldquo;{sector.testimonial.quote}&rdquo;
          </blockquote>
          <p style={{ color: "rgba(0,0,0,0.7)", fontSize: 16 }}>
            <span style={{ fontWeight: 700 }}>{sector.testimonial.author}</span>
            <br />
            <span style={{ color: "rgba(0,0,0,0.56)" }}>{sector.testimonial.role}</span>
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: "#111", marginBottom: 48, textAlign: "center", letterSpacing: "-0.02em" }}>
            Ventajas clave
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {sector.features.map((feature, index) => (
              <div
                key={index}
                style={{ background: "#fff", borderRadius: 24, padding: 32, boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
              >
                <h3 style={{ fontSize: 19, fontWeight: 700, color: "#111", marginBottom: 12 }}>
                  {feature.title}
                </h3>
                <p style={{ color: "rgba(0,0,0,0.65)", lineHeight: 1.6, fontSize: 16 }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ padding: "80px 24px", background: "rgba(0,0,0,0.04)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: "#111", marginBottom: 48, textAlign: "center", letterSpacing: "-0.02em" }}>
            Cómo funciona
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32 }}>
            {[
              { number: "1", title: "Configuración", description: "Te conocemos. Entrenamos a la IA con tus datos, políticas y FAQs." },
              { number: "2", title: "Integración", description: "Configuramos tu número. Los clientes siguen llamando al mismo número." },
              { number: "3", title: "Gestión", description: "La IA atiende, filtra leads y agenda citas. Tú solo enfocado en cerrar." },
            ].map((step, index) => (
              <div key={index} style={{ textAlign: "center" }}>
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 64, height: 64, background: "#5AFF15", border: "2px solid #222", borderRadius: "50%", fontWeight: 800, fontSize: 24, color: "#111", marginBottom: 16 }}>
                  {step.number}
                </div>
                <h3 style={{ fontSize: 19, fontWeight: 700, color: "#111", marginBottom: 10 }}>
                  {step.title}
                </h3>
                <p style={{ color: "rgba(0,0,0,0.65)", fontSize: 16, lineHeight: 1.6 }}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: "#111", marginBottom: 48, textAlign: "center", letterSpacing: "-0.02em" }}>
            Preguntas frecuentes
          </h2>
          <FAQAccordion faq={sector.faq} />
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section style={{ padding: "80px 24px", background: "rgba(0,0,0,0.04)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: "#111", marginBottom: 24, letterSpacing: "-0.02em" }}>
            ¿Listo para transformar tu atención telefónica?
          </h2>
          <p style={{ fontSize: 18, color: "rgba(0,0,0,0.7)", marginBottom: 40, lineHeight: 1.6 }}>
            Prueba Minute Call sin compromiso. La mayoría de clientes ven resultados en la primera semana.
          </p>
          <button style={{ backgroundColor: "#5AFF15", color: "#000", border: "2px solid #222", fontWeight: 700, padding: "18px 40px", borderRadius: 50, fontSize: 18, cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
            Solicitar demo gratis
          </button>
        </div>
      </section>
    </div>
  );
}
