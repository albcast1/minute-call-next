import { Metadata } from "next";
import Link from "next/link";
import { BrandPage, Hero, Ed, Chips, CtaFinal } from "@/components/brand/Sections";
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

      <BrandPage>
        <Hero
          crumbs={breadcrumbItems.map((c) => ({ name: c.name, url: c.url.replace("https://www.minute-call.com", "") || "/" }))}
          tag="Cobertura nacional"
          title="Atención telefónica para empresas en toda España."
          sub={<>Ofrecemos servicio de recepcionista virtual en más de {totalCities} ciudades. Agentes nativos o asistentes de IA - tú eliges. Sin permanencia. Presupuesto a medida.</>}
        />
        <Ed tag="Ciudades" title="Ciudades donde operamos." flush={false}>
          {sortedRegions.map((region) => (
            <div className="dir-cat" key={region}>
              <h3>{region}</h3>
              <Chips links={byRegion[region].map((city) => ({ href: `/atencion-telefonica/${city.slug}`, label: city.city }))} />
            </div>
          ))}
        </Ed>
        <CtaFinal
          tag="Toda España"
          title="¿No encuentras tu ciudad?"
          text="Atendemos llamadas de empresas en toda España. Contacta con nosotros y te explicamos cómo podemos ayudarte."
        />
      </BrandPage>
    </>
  );
}
