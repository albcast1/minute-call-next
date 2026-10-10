import { Metadata } from "next";
import Link from "next/link";
import cities from "@/data/cities.json";
import sectors from "@/data/sectors.json";
import indexables from "@/data/city-sector-indexables.json";
import { CITY_SECTOR_INDEXABLE } from "@/lib/seo/noindex";
import { FAQPageSchema, BreadcrumbSchema, CityLocalBusinessSchema, CityServiceSchema } from "@/components/JsonLd";
import { BrandPage, Hero, Ed, Stats, Faq, Quote, Chips, CtaFinal, splitFigure } from "@/components/brand/Sections";

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

type SectorRow = { slug: string; title: string; servicio?: string };

/**
 * Paginas ciudad x sector indexables de esta ciudad.
 *
 * Estan en el sitemap pero ninguna pagina las enlazaba (la auditoria de SE Ranking
 * las marcaba como "sin enlaces entrantes"). Se enlazan desde su ciudad y desde
 * la landing de su sector para que Google las encuentre rastreando la web.
 */
function servicesForCity(ciudad: string): { href: string; label: string }[] {
  // Con las paginas ciudad x sector en noindex no se enlazan desde la ciudad.
  if (!CITY_SECTOR_INDEXABLE) return [];
  const prefix = `${ciudad}/`;
  const rows = sectors as unknown as SectorRow[];
  return (indexables.indexables as string[])
    .filter((par) => par.startsWith(prefix))
    .map((par) => {
      const s = rows.find((x) => x.slug === par.slice(prefix.length));
      if (!s) return null;
      return { href: `/atencion-telefonica/${par}`, label: (s.servicio ?? s.title).replace(/\.$/, "") };
    })
    .filter((x): x is { href: string; label: string } => x !== null);
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
          <Link href="/" style={{ color: "var(--ink)", textDecoration: "underline" }}>
            Volver al inicio
          </Link>
        </p>
      </div>
    );
  }

  const faqs = (city as { faq?: Array<{question: string; answer: string}> }).faq || [];
  const nearbyCities = getNearbyCities(city.slug, city.region);
  const cityServices = servicesForCity(city.slug);

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

      <BrandPage>
        <Hero
          crumbs={breadcrumbItems.map((c) => ({ name: c.name, url: c.url.replace("https://www.minute-call.com", "") || "/" }))}
          tag={city.heroTag}
          title={city.heroTitle}
          sub={city.heroSubtitle}
        />

        <Ed tag="Contexto local" title={<>Atención telefónica adaptada a {city.city}.</>} flush={false}>
          {(() => {
            const sentences = city.localContext.split(". ");
            const mid = Math.ceil(sentences.length / 2);
            const p1 = sentences.slice(0, mid).join(". ") + (sentences.length > 1 ? "." : "");
            const p2 = sentences.slice(mid).join(". ");
            return (
              <>
                <p className="lead2">{p1}</p>
                {p2 && <p className="lead2">{p2}</p>}
              </>
            );
          })()}
          <Stats
            items={[
              { value: city.stats.pymes, label: `PYMES en ${city.city}` },
              splitFigure(city.stats.callsLost) ?? { value: "!", label: city.stats.callsLost },
            ]}
          />
          {(city as { sectorContext?: string }).sectorContext && (
            <p className="lead2">{(city as { sectorContext?: string }).sectorContext}</p>
          )}
        </Ed>

        <Ed tag="Sectores" title={<>Sectores que atendemos en {city.city}.</>}>
          <Chips links={city.keySectors.map((sector) => ({ href: getSectorLink(sector), label: sector }))} />
        </Ed>

        <Ed tag="Clientes" title="Lo que dicen nuestros clientes.">
          <Quote quote={city.testimonial.quote} author={city.testimonial.author} role={city.testimonial.role} />
        </Ed>

        {faqs.length > 0 && (
          <Ed tag="Preguntas" title={<>Preguntas frecuentes sobre atención telefónica en {city.city}.</>}>
            <Faq items={faqs.map((f) => ({ q: f.question, a: f.answer }))} />
          </Ed>
        )}

        {cityServices.length > 0 && (
          <Ed tag="Servicios" title={<>Servicios en {city.city}.</>}>
            <p className="lead2">Cómo trabajamos con las empresas de {city.city} según su sector.</p>
            <Chips links={cityServices.map((s) => ({ href: s.href, label: `${s.label} en ${city.city}` }))} />
          </Ed>
        )}

        {city.topSectors && city.topSectors.length > 0 && (
          <Ed tag="Más demandados" title={<>Sectores que más nos llaman desde {city.city}.</>}>
            <p className="lead2">
              Si tienes un negocio en {city.city}, estos son los sectores que más se benefician de nuestro servicio de
              atención telefónica.
            </p>
            <Chips
              links={city.topSectors.map((sector: { slug: string; title: string }) => ({
                href: `/lp/${sector.slug}`,
                label: sector.title,
              }))}
            />
          </Ed>
        )}

        {nearbyCities.length > 0 && (
          <Ed tag="Ciudades" title="También atendemos en otras ciudades.">
            <p className="lead2">
              Nuestro servicio de atención telefónica está disponible en toda España. Consulta la cobertura en estas
              ciudades cercanas.
            </p>
            <Chips links={nearbyCities.map((n) => ({ href: `/atencion-telefonica/${n.slug}`, label: n.city }))} />
            <p className="lead2">
              <Link href="/atencion-telefonica" style={{ textDecoration: "underline", textUnderlineOffset: 3 }}>
                Ver todas las ciudades →
              </Link>
            </p>
          </Ed>
        )}

        <CtaFinal
          title="Empieza hoy."
          text={<>No pierdas más llamadas en {city.city}. Prueba Minute Call sin compromiso.</>}
        />
      </BrandPage>
    </>
  );
}
