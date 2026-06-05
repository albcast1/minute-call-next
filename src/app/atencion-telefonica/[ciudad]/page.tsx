import { Metadata } from "next";
import Link from "next/link";
import cities from "@/data/cities.json";
import sectors from "@/data/sectors.json";
import { FAQPageSchema, BreadcrumbSchema, CityLocalBusinessSchema, CityServiceSchema } from "@/components/JsonLd";

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
 * Normalize region names for grouping
 */
function normalizeRegion(region: string): string {
  const map: Record<string, string> = {
    "Comunidad de Madrid": "Madrid",
    "Región de Murcia": "Murcia",
    "Islas Canarias": "Canarias",
    "Valencia": "Comunidad Valenciana",
  };
  return map[region] || region;
}

/**
 * Helper function to match key sectors with actual sector slugs for linking
 */
function getSectorLink(sectorName: string): string | null {
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

/**
 * Get nearby cities for interlinking — same region first, then fill from major cities
 */
function getNearbyCities(currentSlug: string, currentRegion: string, count: number = 5) {
  const normalizedRegion = normalizeRegion(currentRegion);

  // Cities in the same normalized region (excluding current)
  const sameRegion = cities.filter(
    (c) => normalizeRegion(c.region) === normalizedRegion && c.slug !== currentSlug
  );

  // Major cities to fill gaps when region is small
  const majorCitySlugs = [
    "madrid", "barcelona", "valencia", "sevilla", "bilbao",
    "malaga", "zaragoza", "murcia", "palma-de-mallorca", "alicante",
  ];

  const majorCities = cities.filter(
    (c) => majorCitySlugs.includes(c.slug) && c.slug !== currentSlug && normalizeRegion(c.region) !== normalizedRegion
  );

  // Combine: same-region cities first, then major cities to fill up to count
  const result = [...sameRegion];
  if (result.length < count) {
    for (const mc of majorCities) {
      if (result.length >= count) break;
      if (!result.find((r) => r.slug === mc.slug)) {
        result.push(mc);
      }
    }
  }

  return result.slice(0, count);
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

  const faqs = (city as { faq?: Array<{question: string; answer: string}> }).faq || [];
  const nearbyCities = getNearbyCities(city.slug, city.region);

  const breadcrumbItems = [
    { name: "Inicio", url: "https://www.minute-call.com" },
    { name: "Atención telefónica", url: "https://www.minute-call.com/atencion-telefonica" },
    { name: city.city, url: `https://www.minute-call.com/atencion-telefonica/${city.slug}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQPageSchema faqs={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
      <CityLocalBusinessSchema cityName={city.city} region={city.region} slug={city.slug} />
      <CityServiceSchema cityName={city.city} slug={city.slug} />

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
          maxWidth: 1000,
          margin: "0 auto",
          padding: "80px clamp(16px,5vw,64px) 60px",
          textAlign: "center",
        }}
      >
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
        <p
          style={{
            maxWidth: 700,
            margin: "24px auto 32px",
            lineHeight: "1.6",
          }}
        >
          {city.heroSubtitle}
        </p>

        {/* CTA Button */}
        <Link href="/reserva-llamada" className="btn-cta">
          Reserva una llamada
        </Link>
      </section>

      {/* ===== LOCAL CONTEXT SECTION ===== */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "60px clamp(16px,5vw,64px)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: 24 }}>
          Atención telefónica adaptada a{" "}
          <span className="serif-italic">{city.city}</span>
        </h2>

        {(() => {
          const sentences = city.localContext.split('. ');
          const mid = Math.ceil(sentences.length / 2);
          const p1 = sentences.slice(0, mid).join('. ') + (sentences.length > 1 ? '.' : '');
          const p2 = sentences.slice(mid).join('. ');
          return (
            <>
              <p style={{ maxWidth: 700, margin: "0 auto 24px", lineHeight: "1.7" }}>{p1}</p>
              {p2 && <p style={{ maxWidth: 700, margin: "0 auto 40px", lineHeight: "1.7" }}>{p2}</p>}
            </>
          );
        })()}

        {/* Stats cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
            marginTop: 40,
            textAlign: "left",
          }}
        >
          <div className="card" style={{ padding: 32 }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: "rgba(0,0,0,0.4)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              PYMES en {city.city}
            </p>
            <p style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-1.5px", marginBottom: 0 }}>
              {city.stats.pymes}
            </p>
          </div>
          <div className="card" style={{ padding: 32 }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: "rgba(0,0,0,0.4)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Problema actual
            </p>
            <p style={{ fontSize: 16, fontWeight: 500, lineHeight: "1.5", marginBottom: 0 }}>
              {city.stats.callsLost}
            </p>
          </div>
        </div>

        {/* Sector context callout */}
        {(city as { sectorContext?: string }).sectorContext && (
          <div className="card" style={{ padding: "28px 32px", marginTop: 32, textAlign: "left" }}>
            <p style={{ color: 'rgba(0,0,0,0.56)', lineHeight: 1.7, fontSize: 15, margin: 0 }}>
              {(city as { sectorContext?: string }).sectorContext}
            </p>
          </div>
        )}
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
          Sectores que atendemos en{" "}
          <span className="serif-italic">{city.city}</span>
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 16,
            textAlign: "left",
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
                  flex: "0 1 280px",
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
          maxWidth: 800,
          margin: "0 auto",
          padding: "60px clamp(16px,5vw,64px)",
          textAlign: "center",
        }}
      >
        <blockquote
          style={{
            fontSize: 20,
            lineHeight: "1.6",
            fontStyle: "italic",
            maxWidth: 700,
            margin: "0 auto 24px",
          }}
        >
          &ldquo;{city.testimonial.quote}&rdquo;
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
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: 40 }}>
          Preguntas frecuentes sobre atención telefónica en{" "}
          <span className="serif-italic">{city.city}</span>
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0, maxWidth: 800, margin: "0 auto", textAlign: "left" }}>
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
                <span style={{ fontSize: "clamp(14px,3.8vw,24px)", fontWeight: 300 }}>+</span>
              </summary>
              <p style={{ marginTop: 16, lineHeight: "1.6", color: "rgba(0,0,0,0.56)" }}>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ===== NEARBY CITIES INTERLINKING ===== */}
      {nearbyCities.length > 0 && (
        <section
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "60px clamp(16px,5vw,64px)",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: 16 }}>
            También atendemos en{" "}
            <span className="serif-italic">otras ciudades</span>
          </h2>
          <p style={{ maxWidth: 600, margin: "0 auto 32px", lineHeight: "1.6" }}>
            Nuestro servicio de atención telefónica está disponible en toda España.
            Consulta la cobertura en estas ciudades cercanas.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 12,
            }}
          >
            {nearbyCities.map((nearby) => (
              <Link
                key={nearby.slug}
                href={`/atencion-telefonica/${nearby.slug}`}
                className="card"
                style={{
                  padding: "20px 24px",
                  textDecoration: "none",
                  color: "black",
                  fontSize: 16,
                  fontWeight: 500,
                  letterSpacing: "-0.5px",
                  flex: "0 1 220px",
                  display: "block",
                }}
              >
                {nearby.city} →
              </Link>
            ))}
          </div>
          <p style={{ marginTop: 24, fontSize: 14 }}>
            <Link
              href="/atencion-telefonica"
              style={{ color: "rgba(0,0,0,0.56)", textDecoration: "underline" }}
            >
              Ver todas las ciudades →
            </Link>
          </p>
        </section>
      )}

      {/* ===== CTA SECTION ===== */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "60px clamp(16px,5vw,64px)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: 16 }}>
          Empieza{" "}
          <span className="serif-italic">hoy</span>
        </h2>
        <p style={{ marginBottom: 32, maxWidth: 600, margin: "0 auto 32px" }}>
          No pierdas más llamadas en {city.city}. Prueba Minute Call sin compromiso.
        </p>
        <Link href="/reserva-llamada" className="btn-cta">
          Reserva una llamada
        </Link>

        {/* Top sectores en esta ciudad */}
        {city.topSectors && city.topSectors.length > 0 && (
          <section style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px 0' }}>
            <h2 style={{ fontSize: "clamp(14px,3.8vw,22px)", fontWeight: 600, marginBottom: 8 }}>
              Sectores que más nos llaman desde{" "}
              <span className="serif-italic">{city.city}</span>
            </h2>
            <p style={{ color: '#666', marginBottom: 24, fontSize: 15 }}>
              Si tienes un negocio en {city.city}, estos son los sectores que más se benefician de nuestro servicio de atención telefónica.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
              {city.topSectors.map((sector: {slug: string; title: string}) => (
                <a key={sector.slug} href={`/lp/${sector.slug}`} style={{
                  display: 'block', padding: '16px 20px', border: '1px solid #e5e5e5', borderRadius: 12,
                  textDecoration: 'none', color: '#000', fontSize: 14, fontWeight: 500, transition: 'border-color 0.2s'
                }}>
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
