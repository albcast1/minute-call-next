import { Metadata } from "next";
import Link from "next/link";
import cities from "@/data/cities.json";
import sectors from "@/data/sectors.json";
import { FAQPageSchema, BreadcrumbSchema } from "@/components/JsonLd";

export async function generateStaticParams() {
  return cities.map((city) => ({
    ciudad: city.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ciudad: string }>;
}): Promise<Metadata> {
  const { ciudad } = await params;
  const city = cities.find((c) => c.slug === ciudad);

  if (!city) {
    return {};
  }

  return {
    title: city.metaTitle,
    description: city.metaDescription,
    alternates: {
      canonical: `/atencion-telefonica/${ciudad}`,
    },
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      type: "website",
      locale: "es_ES",
      url: `https://www.minute-call.com/atencion-telefonica/${ciudad}`,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: city.metaTitle }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: city.metaTitle,
      description: city.metaDescription,
      images: ["/og-image.png"],
    },
  };
}

/**
 * Helper function to generate city-specific FAQs
 */
function getCityFaqs(city: (typeof cities)[0]) {
  const keySectorsText = city.keySectors.join(", ");

  return [
    {
      question: `¿Minute Call opera en ${city.city}?`,
      answer: `Sí, Minute Call opera en ${city.city} y en toda España. Atendemos empresas y PYMES de forma remota con agentes nativos basados en España. Sin importar dónde estés, tu empresa siempre estará conectada con tus clientes.`,
    },
    {
      question: `¿Qué sectores atendemos en ${city.city}?`,
      answer: `En ${city.city}, atendemos especialmente a: ${keySectorsText}. Nuestro servicio se adapta a cualquier sector, desde servicios médicos hasta consultoría empresarial. Cada industria tiene necesidades diferentes, y nosotros personalizamos nuestro servicio para encajar perfectamente en tu negocio.`,
    },
    {
      question: "¿Cuánto cuesta el servicio?",
      answer: "Minute Call funciona con un modelo de suscripción mensual flexible, sin compromiso a largo plazo. Combinamos una tarifa base fija con un coste variable por llamada, adaptándose a tu volumen actual. Sin contratos vinculantes ni sorpresas: paga solo por lo que usas.",
    },
    {
      question: "¿Los agentes son nativos?",
      answer: "Sí, contamos con agentes humanos nativos en español basados en España. Son profesionales cualificados que entienden el contexto local y ofrecen una atención de calidad. También disponemos de asistentes de IA para ampliar tu cobertura 24/7.",
    },
  ];
}

/**
 * Helper function to match key sectors with actual sector slugs for linking
 */
function getSectorLink(sectorName: string): string | null {
  // Map common sector names to their slugs
  const sectorMap: Record<string, string> = {
    "Clínicas & Salud": "recepcionista-ia-clinicas",
    "Agencias inmobiliarias": "recepcionista-ia-inmobiliarias",
    "Hostelería": "recepcionista-ia-restaurantes",
    "Despachos de abogados": "recepcionista-ia-abogados",
    "Clínicas dentales": "recepcionista-ia-clinicas-dentales",
    "Asesorías y gestorías": "recepcionista-ia-asesorias",
    "Veterinarias": "recepcionista-ia-veterinarias",
    "Centros de estética": "recepcionista-ia-centros-estetica",
    "Fisioterapia": "recepcionista-ia-fisioterapia",
    "Seguros": "recepcionista-ia-seguros",
    "Turismo": "recepcionista-ia-turismo",
    "Autoescuelas": "recepcionista-ia-autoescuelas",
    "Consultoría": "recepcionista-ia-consultoria",
  };

  const slug = sectorMap[sectorName];
  if (slug && sectors.find((s) => s.slug === slug)) {
    return `/lp/${slug}`;
  }
  return null;
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ ciudad: string }>;
}) {
  const { ciudad } = await params;
  const city = cities.find((c) => c.slug === ciudad);

  if (!city) {
    return (
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <h1>Ciudad no encontrada</h1>
        <p style={{ marginTop: 16 }}>
          <Link href="/" style={{ color: "black", textDecoration: "underline" }}>
            Volver al inicio
          </Link>
        </p>
      </div>
    );
  }

  const faqs = getCityFaqs(city);
  const breadcrumbItems = [
    { name: "Inicio", url: "https://www.minute-call.com" },
    { name: "Atención telefónica", url: "https://www.minute-call.com/atencion-telefonica" },
    { name: city.city, url: `https://www.minute-call.com/atencion-telefonica/${city.slug}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQPageSchema faqs={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />

      {/* ===== BREADCRUMB NAVIGATION ===== */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "24px clamp(16px,5vw,64px)",
          fontSize: 13,
          color: "rgba(0,0,0,0.4)",
        }}
      >
        {breadcrumbItems.map((item, index) => (
          <span key={item.name}>
            {index > 0 && <span style={{ margin: "0 8px" }}>/</span>}
            <Link href={item.url} style={{ color: "rgba(0,0,0,0.4)", textDecoration: "none" }}>
              {item.name}
            </Link>
          </span>
        ))}
      </div>

      {/* ===== HERO SECTION ===== */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "80px clamp(16px,5vw,64px) 60px",
        }}
      >
        <div style={{ flex: "1 1 280px", maxWidth: 700 }}>
          {/* Pill label */}
          <div style={{ marginBottom: 24 }}>
            <span className="pill-label">{city.heroTag}</span>
          </div>

          {/* Main heading */}
          <h1 style={{ marginTop: 24 }}>
            {city.heroTitle.split(city.city).map((part, index) => (
              <span key={index}>
                {part}
                {index === 0 && <span className="serif-italic">{city.city}</span>}
              </span>
            ))}
          </h1>

          {/* Subtext */}
          <p style={{ maxWidth: 600, marginBottom: 32, lineHeight: "1.6" }}>
            {city.heroSubtitle}
          </p>

          {/* CTA Button */}
          <Link href="/reserva-llamada" className="btn-cta">
            Reserva una llamada
          </Link>
        </div>
      </section>

      {/* ===== LOCAL CONTEXT SECTION ===== */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "60px clamp(16px,5vw,64px)",
        }}
      >
        <h2 style={{ marginBottom: 16 }}>
          Atención telefónica adaptada a{" "}
          <span className="serif-italic">{city.city}</span>
        </h2>

        <p style={{ maxWidth: 700, marginBottom: 40, lineHeight: "1.6" }}>
          {city.localContext}
        </p>
          {(city as { sectorContext?: string }).sectorContext && (
            <p style={{ color: '#555', lineHeight: 1.7, fontSize: 16, marginTop: 20 }}>
              {(city as { sectorContext?: string }).sectorContext}
            </p>
          )}

        {/* Stats cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          <div className="card" style={{ padding: 32 }}>
            <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>
              {city.stats.pymes}
            </p>
          </div>
          <div className="card" style={{ padding: 32 }}>
            <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>
              {city.stats.callsLost}
            </p>
          </div>
        </div>
      </section>

      {/* ===== KEY SECTORS SECTION ===== */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "60px clamp(16px,5vw,64px)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: 40 }}>
          Sectores que atendemos en {city.city}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 16,
          }}
        >
          {city.keySectors.map((sector) => {
            const link = getSectorLink(sector);
            const content = (
              <div
                key={sector}
                className="card"
                style={{
                  padding: "28px 24px",
                  display: "flex",
                  alignItems: "center",
                  cursor: link ? "pointer" : "default",
                  minHeight: 80,
                }}
              >
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 500,
                    color: "black",
                    letterSpacing: "-0.72px",
                  }}
                >
                  {sector}
                </span>
              </div>
            );

            if (link) {
              return (
                <Link key={sector} href={link} style={{ textDecoration: "none" }}>
                  {content}
                </Link>
              );
            }
            return content;
          })}
        </div>
      </section>

      {/* ===== TESTIMONIAL SECTION ===== */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "60px clamp(16px,5vw,64px)",
        }}
      >
        <blockquote
          style={{
            fontSize: 20,
            lineHeight: "1.6",
            fontStyle: "italic",
            maxWidth: 700,
            marginBottom: 24,
            borderLeft: "4px solid black",
            paddingLeft: 24,
          }}
        >
          "{city.testimonial.quote}"
        </blockquote>
        <p style={{ fontSize: 16, fontWeight: 500, margin: "0 0 4px 0" }}>
          {city.testimonial.author}
        </p>
        <p style={{ fontSize: 14, color: "rgba(0,0,0,0.56)", margin: 0 }}>
          {city.testimonial.role}
        </p>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "60px clamp(16px,5vw,64px)",
        }}
      >
        <h2 style={{ marginBottom: 40, textAlign: "center" }}>
          Preguntas frecuentes
        </h2>

        <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 0, textAlign: "left", maxWidth: 800, margin: "0 auto" }}>
          {faqs.map((faq) => (
            <details
              key={faq.question}
              style={{
                padding: "24px 0",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
              }}
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
              <p style={{ marginTop: 16 }}>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "60px clamp(16px,5vw,64px)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: 16 }}>Empieza hoy</h2>
        <p style={{ marginBottom: 32, maxWidth: 600, margin: "0 auto 32px" }}>
          No pierdas más llamadas en {city.city}. Prueba Minute Call sin
          compromiso.
        </p>
        <Link href="/reserva-llamada" className="btn-cta">
          Reserva una llamada
        </Link>
      

      {/* Top sectores en esta ciudad */}
      {city.topSectors && city.topSectors.length > 0 && (
        <section style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px 0' }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>Sectores que más nos llaman desde {city.city}</h2>
          <p style={{ color: '#666', marginBottom: 24, fontSize: 15 }}>Si tienes un negocio en {city.city}, estos son los sectores que más se benefician de nuestro servicio de atención telefónica.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {city.topSectors.map((sector: {slug: string; title: string}) => (
              <a key={sector.slug} href={`/lp/${sector.slug}`} style={{ display: 'block', padding: '16px 20px', border: '1px solid #e5e5e5', borderRadius: 12, textDecoration: 'none', color: '#000', fontSize: 14, fontWeight: 500, transition: 'border-color 0.2s' }}>
                {sector.title} →
              </a>
            ))}
          </div>
        </section>
      )}
      </section>
    </>
  );
}
