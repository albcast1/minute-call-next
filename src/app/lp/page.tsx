import { Metadata } from "next";
import Link from "next/link";
import sectors from "@/data/sectors.json";
import { BreadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Call center para cada sector | minute call",
  description:
    "Servicio de call center especializado en más de 48 sectores. Clínicas, abogados, inmobiliarias, restaurantes y más. Atención 24/7, sin permanencia.",
  alternates: {
    canonical: "/lp",
  },
  openGraph: {
    title: "Call center para cada sector | minute call",
    description:
      "Servicio de call center especializado en más de 48 sectores. Atención 24/7, sin permanencia.",
    type: "website",
    locale: "es_ES",
    url: "https://www.minute-call.com/lp",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Call center para cada sector" }],
  },
};

/**
 * Group sectors into broad categories for display
 */
function getSectorCategory(sectorName: string): string {
  const categoryMap: Record<string, string> = {
    "clínicas": "Salud y bienestar",
    "clínicas dentales": "Salud y bienestar",
    "veterinarias": "Salud y bienestar",
    "fisioterapia": "Salud y bienestar",
    "Farmacias": "Salud y bienestar",
    "Ópticas": "Salud y bienestar",
    "Psicólogos y Terapeutas": "Salud y bienestar",
    "Clínicas de Podología": "Salud y bienestar",
    "Nutricionistas y Dietistas": "Salud y bienestar",
    "Logopedas": "Salud y bienestar",
    "Centros de Rehabilitación": "Salud y bienestar",
    "centros de estética": "Belleza y deporte",
    "Peluquerías y Salones de Belleza": "Belleza y deporte",
    "Gimnasios y Centros Deportivos": "Belleza y deporte",
    "Centros de Yoga y Pilates": "Belleza y deporte",
    "despachos de abogados": "Servicios profesionales",
    "asesorías y gestorías": "Servicios profesionales",
    "consultoría y formación": "Servicios profesionales",
    "Notarías": "Servicios profesionales",
    "Arquitectos e Ingenieros": "Servicios profesionales",
    "seguros y corredurías": "Servicios profesionales",
    "inmobiliarias": "Inmobiliario y construcción",
    "Empresas de Reformas": "Inmobiliario y construcción",
    "Empresas de Mudanzas": "Inmobiliario y construcción",
    "restaurantes": "Hostelería y turismo",
    "turismo y agencias de viajes": "Hostelería y turismo",
    "Empresas de Catering": "Hostelería y turismo",
    "Hoteles Boutique": "Hostelería y turismo",
    "autoescuelas": "Educación y formación",
    "Academias de Idiomas": "Educación y formación",
    "Guarderías y Escuelas Infantiles": "Educación y formación",
    "Talleres Mecánicos": "Servicios técnicos",
    "Cerrajerías": "Servicios técnicos",
    "Empresas de Limpieza": "Servicios técnicos",
  };
  return categoryMap[sectorName] || "Otros servicios";
}

const categoryOrder = [
  "Salud y bienestar",
  "Belleza y deporte",
  "Servicios profesionales",
  "Inmobiliario y construcción",
  "Hostelería y turismo",
  "Educación y formación",
  "Servicios técnicos",
  "Otros servicios",
];

export default function SectorIndexPage() {
  const byCategory: Record<string, Array<{ slug: string; sector: string; title: string; heroSubtitle: string }>> = {};
  sectors.forEach((s) => {
    const category = getSectorCategory(s.sector);
    if (!byCategory[category]) byCategory[category] = [];
    byCategory[category].push({
      slug: s.slug,
      sector: s.sector,
      title: s.title,
      heroSubtitle: s.heroSubtitle,
    });
  });

  Object.values(byCategory).forEach((arr) =>
    arr.sort((a, b) => a.sector.localeCompare(b.sector))
  );

  const sortedCategories = Object.keys(byCategory).sort((a, b) => {
    const ia = categoryOrder.indexOf(a);
    const ib = categoryOrder.indexOf(b);
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
  });

  const totalSectors = sectors.length;

  const breadcrumbItems = [
    { name: "Inicio", url: "https://www.minute-call.com" },
    { name: "Sectores", url: "https://www.minute-call.com/lp" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* ===== BREADCRUMB ===== */}
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

      {/* ===== HERO ===== */}
      <section
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "80px clamp(16px,5vw,64px) 60px",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <span className="pill-label">{totalSectors} sectores</span>
        </div>
        <h1 style={{ marginTop: 24 }}>
          Call center para{" "}
          <span className="serif-italic">cada sector</span>.
        </h1>
        <p
          style={{
            maxWidth: 700,
            margin: "24px auto 32px",
            lineHeight: "1.6",
          }}
        >
          Cada negocio tiene necesidades distintas. Por eso adaptamos nuestro servicio
          de atención telefónica a los flujos de trabajo de tu sector. Elige el tuyo.
        </p>
        <Link href="/reserva-llamada" className="btn-cta">
          Reserva una llamada
        </Link>
      </section>

      {/* ===== SECTOR GRID BY CATEGORY ===== */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "60px clamp(16px,5vw,64px)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 48 }}>
          Todos nuestros{" "}
          <span className="serif-italic">sectores</span>
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {sortedCategories.map((category) => (
            <div key={category}>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  marginBottom: 16,
                  letterSpacing: "-0.5px",
                  color: "rgba(0,0,0,0.7)",
                }}
              >
                {category}
              </h3>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                {byCategory[category].map((sector) => (
                  <Link
                    key={sector.slug}
                    href={`/lp/${sector.slug}`}
                    className="card"
                    style={{
                      padding: "20px 24px",
                      textDecoration: "none",
                      color: "black",
                      flex: "0 1 280px",
                      display: "block",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 500,
                        letterSpacing: "-0.5px",
                        display: "block",
                        marginBottom: 8,
                      }}
                    >
                      {sector.title.replace(/\.$/, "")} →
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        color: "rgba(0,0,0,0.56)",
                        lineHeight: "1.5",
                        display: "block",
                      }}
                    >
                      {sector.heroSubtitle.length > 100
                        ? sector.heroSubtitle.substring(0, 100) + "..."
                        : sector.heroSubtitle}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "60px clamp(16px,5vw,64px)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: 16 }}>
          ¿No encuentras tu{" "}
          <span className="serif-italic">sector</span>?
        </h2>
        <p style={{ maxWidth: 600, margin: "0 auto 32px", lineHeight: "1.6" }}>
          Adaptamos nuestro servicio a cualquier tipo de negocio.
          Contacta con nosotros y diseñamos la solución perfecta para ti.
        </p>
        <Link href="/reserva-llamada" className="btn-cta">
          Reserva una llamada
        </Link>
      </section>
    </>
  );
}
