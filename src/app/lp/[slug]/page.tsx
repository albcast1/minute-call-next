import Link from "next/link";
import { Metadata } from "next";
import sectors from "@/data/sectors.json";
import { FAQPageSchema, BreadcrumbSchema } from "@/components/JsonLd";
import VideoCard from "@/components/VideoCard";

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
  if (!sector) return {};
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

export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sector = sectors.find((s) => s.slug === slug);

  if (!sector) {
    return <div style={{ textAlign: "center", padding: "80px 64px" }}>Sector no encontrado</div>;
  }

  return (
    <>
      <FAQPageSchema faqs={sector.faq.map(f => ({ question: f.question, answer: f.answer }))} />
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "https://www.minute-call.com" },
        { name: sector.title, url: `https://www.minute-call.com/lp/${sector.slug}` }
      ]} />

      {/* ===== HERO ===== */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "80px 64px 60px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 60,
          flexWrap: "wrap",
        }}
      >
        {/* Left column */}
        <div style={{ flex: "1 1 480px", maxWidth: 560 }}>
          <a
            href="https://www.trustpilot.com/review/minute-call.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-block", marginBottom: 20, marginLeft: 16 }}
          >
            <img
              src="https://framerusercontent.com/images/2kfdzrRIvwdbWAtc0ABXMgtFH2E.png"
              alt="Trustpilot reviews"
              style={{ height: 36 }}
            />
          </a>

          <div style={{ marginBottom: 24 }}>
            <span className="pill-label">{sector.heroTag}</span>
          </div>

          <h1>
            Recepcionista de IA para{" "}
            <span className="serif-italic">{sector.sector}.</span>
          </h1>

          <p style={{ maxWidth: 500, marginBottom: 16 }}>{sector.heroSubtitle}</p>

          <p style={{ marginBottom: 40 }}>{sector.socialProof}</p>

          <Link href="/reserva-llamada" className="btn-cta">
            Solicitar demo gratis
          </Link>
        </div>

        <VideoCard />
      </section>

      {/* ===== TESTIMONIAL ===== */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 64px", textAlign: "center" }}>
        <span className="pill-label" style={{ marginBottom: 24, display: "inline-block" }}>
          Clientes
        </span>
        <h2 style={{ marginTop: 16 }}>
          Lo que dicen <span className="serif-italic">nuestros clientes.</span>
        </h2>
        <div
          className="card"
          style={{ maxWidth: 720, margin: "48px auto 0", padding: 48, textAlign: "center" }}
        >
          <p
            style={{
              fontSize: 22,
              fontStyle: "italic",
              color: "black",
              marginBottom: 24,
              lineHeight: 1.5,
              letterSpacing: "-0.5px",
            }}
          >
            &ldquo;{sector.testimonial.quote}&rdquo;
          </p>
          <p style={{ fontWeight: 600, color: "black", marginBottom: 4 }}>
            {sector.testimonial.author}
          </p>
          <p style={{ color: "rgba(0,0,0,0.56)", marginBottom: 0 }}>
            {sector.testimonial.role}
          </p>
        </div>
      </section>

      {/* ===== VENTAJAS CLAVE ===== */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 64px", textAlign: "center" }}>
        <span className="pill-label" style={{ marginBottom: 24, display: "inline-block" }}>
          Ventajas
        </span>
        <h2 style={{ marginTop: 16 }}>
          Qué hacemos <span className="serif-italic">por ti.</span>
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
            marginTop: 48,
          }}
        >
          {sector.features.map((feature, index) => (
            <div key={index} className="card" style={{ textAlign: "left", padding: 32 }}>
              <h3 className="service-card-title" style={{ fontSize: 24 }}>
                {feature.title}
              </h3>
              <p className="service-card-body">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CÓMO FUNCIONA ===== */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 64px", textAlign: "center" }}>
        <span className="pill-label" style={{ marginBottom: 16, display: "inline-block" }}>
          Como funciona
        </span>
        <h2 style={{ marginTop: 16 }}>
          Cómo <span className="serif-italic">funciona.</span>
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
            marginTop: 48,
            textAlign: "left",
          }}
        >
          {[
            {
              step: "01",
              title: "Configuración",
              description: "Te conocemos. Entrenamos a la IA con tus datos, políticas y FAQs.",
            },
            {
              step: "02",
              title: "Integración",
              description: "Configuramos tu número. Los clientes siguen llamando al mismo número.",
            },
            {
              step: "03",
              title: "Gestión",
              description: "La IA atiende, filtra leads y agenda citas. Tú solo enfocado en cerrar.",
            },
          ].map((item) => (
            <div key={item.step} className="card" style={{ padding: 32 }}>
              <p
                style={{
                  fontSize: 48,
                  fontWeight: 500,
                  color: "rgba(0,0,0,0.1)",
                  marginBottom: 16,
                  letterSpacing: -2,
                }}
              >
                {item.step}
              </p>
              <h3 style={{ fontSize: 22 }}>{item.title}</h3>
              <p className="service-card-body">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 64px", textAlign: "center" }}>
        <span className="pill-label" style={{ marginBottom: 16, display: "inline-block" }}>
          Preguntas
        </span>
        <h2 style={{ marginTop: 16 }}>FAQ</h2>
        <div
          style={{
            marginTop: 32,
            display: "flex",
            flexDirection: "column",
            gap: 0,
            textAlign: "left",
          }}
        >
          {sector.faq.map((faq, index) => (
            <details
              key={index}
              style={{ padding: "24px 0", borderBottom: "1px solid rgba(0,0,0,0.08)" }}
            >
              <summary
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  cursor: "pointer",
                  listStyle: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "black",
                }}
              >
                {faq.question}
                <span style={{ fontSize: 24, fontWeight: 300 }}>+</span>
              </summary>
              <p style={{ marginTop: 16, maxWidth: 700 }}>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section
        style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 64px", textAlign: "center" }}
      >
        <span className="pill-label" style={{ marginBottom: 16, display: "inline-block" }}>
          Empieza hoy
        </span>
        <h2 style={{ marginTop: 16 }}>
          ¿Listo para <span className="serif-italic">transformar</span> tu atención?
        </h2>
        <p style={{ maxWidth: 520, margin: "0 auto 40px auto" }}>
          Prueba Minute Call sin compromiso. La mayoría de clientes ven resultados en la primera
          semana.
        </p>
        <Link href="/reserva-llamada" className="btn-cta">
          Solicitar demo gratis
        </Link>
      </section>
    </>
  );
}
