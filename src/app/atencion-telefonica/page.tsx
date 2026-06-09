import { Metadata } from "next";
import Link from "next/link";
import cities from "@/data/cities.json";
import { BreadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Atención telefónica para empresas en España | minute call",
  description:
    "Servicio de recepcionista virtual y atención telefónica 24/7 en más de 50 ciudades de España. Agentes nativos o IA, sin permanencia. Diseñado para PYMES.",
  alternates: {
    canonical: "/atencion-telefonica",
  },
  openGraph: {
    title: "Atención telefónica para empresas en España | minute call",
    description:
      "Servicio de recepcionista virtual y atención telefónica 24/7 en más de 50 ciudades de España. Agentes nativos o IA, sin permanencia.",
    type: "website",
    locale: "es_ES",
    url: "https://www.minute-call.com/atencion-telefonica",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Atención telefónica para empresas en España" }],
  },
};

function normalizeRegion(region: string): string {
  const map: Record<string, string> = {
    "Comunidad de Madrid": "Madrid",
    "Región de Murcia": "Murcia",
    "Islas Canarias": "Canarias",
    "Valencia": "Comunidad Valenciana",
  };
  return map[region] || region;
}

const regionOrder = [
  "Andalucía", "Cataluña", "Madrid", "Comunidad Valenciana", "País Vasco",
  "Castilla y León", "Galicia", "Aragón", "Castilla-La Mancha", "Murcia",
  "Canarias", "Islas Baleares", "Asturias", "Extremadura", "Navarra",
  "Cantabria", "La Rioja",
];

export default function AtencionTelefonicaIndex() {
  const byRegion: Record<string, Array<{ slug: string; city: string }>> = {};
  cities.forEach((c) => {
    const region = normalizeRegion(c.region);
    if (!byRegion[region]) byRegion[region] = [];
    byRegion[region].push({ slug: c.slug, city: c.city });
  });

  Object.values(byRegion).forEach((arr) => arr.sort((a, b) => a.city.localeCompare(b.city)));

  const sortedRegions = Object.keys(byRegion).sort((a, b) => {
    const ia = regionOrder.indexOf(a);
    const ib = regionOrder.indexOf(b);
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
  });

  const totalCities = cities.length;

  const breadcrumbItems = [
    { name: "Inicio", url: "https://www.minute-call.com" },
    { name: "Atención telefónica", url: "https://www.minute-call.com/atencion-telefonica" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />

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

      <section
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "80px clamp(16px,5vw,64px) 60px",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <span className="pill-label">Cobertura nacional</span>
        </div>
        <h1 style={{ marginTop: 24 }}>
          Atención telefónica para empresas en{" "}
          <span className="serif-italic">toda España</span>.
        </h1>
        <p style={{ maxWidth: 700, margin: "24px auto 32px", lineHeight: "1.6" }}>
          Ofrecemos servicio de recepcionista virtual en más de {totalCities} ciudades.
          Agentes nativos o asistentes de IA — tú eliges. Sin permanencia. Presupuesto a medida.
        </p>
        <Link href="/reserva-llamada" className="btn-cta">
          Reserva una llamada
        </Link>
      </section>

      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "60px clamp(16px,5vw,64px)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 48 }}>
          Ciudades donde{" "}
          <span className="serif-italic">operamos</span>
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {sortedRegions.map((region) => (
            <div key={region}>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  marginBottom: 16,
                  letterSpacing: "-0.5px",
                  color: "rgba(0,0,0,0.7)",
                }}
              >
                {region}
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {byRegion[region].map((city) => (
                  <Link
                    key={city.slug}
                    href={`/atencion-telefonica/${city.slug}`}
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
                    {city.city} →
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

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
          <span className="serif-italic">ciudad</span>?
        </h2>
        <p style={{ maxWidth: 600, margin: "0 auto 32px", lineHeight: "1.6" }}>
          Atendemos llamadas de empresas en toda España. Contacta con nosotros
          y te explicamos cómo podemos ayudarte.
        </p>
        <Link href="/reserva-llamada" className="btn-cta">
          Reserva una llamada
        </Link>
      </section>
    </>
  );
}
