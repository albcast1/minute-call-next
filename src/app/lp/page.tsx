import { Metadata } from "next";
import Link from "next/link";
import { BrandPage, Hero, Ed, CtaFinal } from "@/components/brand/Sections";
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

      <BrandPage>
        <Hero
          crumbs={breadcrumbItems.map((c) => ({ name: c.name, url: c.url.replace("https://www.minute-call.com", "") || "/" }))}
          tag={<>{totalSectors} sectores</>}
          title="Call center para cada sector."
          sub="Cada negocio tiene necesidades distintas. Por eso adaptamos nuestro servicio de atención telefónica a los flujos de trabajo de tu sector. Elige el tuyo."
        />
        <Ed tag="Sectores" title="Todos nuestros sectores." flush={false}>
          {sortedCategories.map((category) => (
            <div className="dir-cat" key={category}>
              <h3>{category}</h3>
              <div className="dir-grid">
                {byCategory[category].map((sector) => (
                  <Link key={sector.slug} href={`/lp/${sector.slug}`} className="dir-item">
                    <b>{sector.title.replace(/\.$/, "")} →</b>
                    <span>
                      {sector.heroSubtitle.length > 100
                        ? sector.heroSubtitle.substring(0, 100) + "..."
                        : sector.heroSubtitle}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </Ed>
        <CtaFinal
          tag="A medida"
          title="¿No encuentras tu sector?"
          text="Adaptamos nuestro servicio a cualquier tipo de negocio. Contacta con nosotros y diseñamos la solución perfecta para ti."
        />
      </BrandPage>
    </>
  );
}
