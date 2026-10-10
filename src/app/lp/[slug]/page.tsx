import { Metadata } from "next";
import sectors from "@/data/sectors.json";
import cities from "@/data/cities.json";
import indexables from "@/data/city-sector-indexables.json";
import { CITY_SECTOR_INDEXABLE } from "@/lib/seo/noindex";
import { FAQPageSchema, BreadcrumbSchema , ServiceSchema } from "@/components/JsonLd";
import { BrandPage, Hero, Ed, Rows, Steps, Faq, Quote, Chips, CtaFinal, CaseStudy, type CaseStudyData } from "@/components/brand/Sections";

export async function generateStaticParams() {
  return sectors.map((sector) => ({
    slug: sector.slug }));
}

export async function generateMetadata({
  params }: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sector = sectors.find((s) => s.slug === slug);
  if (!sector) return {};
  return {
    title: sector.metaTitle,
    description: sector.metaDescription,
    alternates: {
      canonical: `/lp/${slug}` },
    openGraph: {
      title: sector.metaTitle,
      description: sector.metaDescription,
      type: "website",
      locale: "es_ES",
      url: `https://www.minute-call.com/lp/${slug}`,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: sector.metaTitle }] },
    twitter: {
      card: "summary_large_image" as const,
      title: sector.metaTitle,
      description: sector.metaDescription,
      images: ["/og-image.png"] } };
}

/**
 * Ciudades con página ciudad x sector indexable para este sector. Esas paginas
 * estan en el sitemap pero no las enlazaba ninguna otra (auditoria SE Ranking:
 * "sin enlaces entrantes"); desde aqui y desde la ciudad reciben dos enlaces.
 */
function citiesForSector(slug: string): { href: string; city: string }[] {
  // Con las paginas ciudad x sector en noindex no se enlazan desde la landing.
  if (!CITY_SECTOR_INDEXABLE) return [];
  const suffix = `/${slug}`;
  return (indexables.indexables as string[])
    .filter((par) => par.endsWith(suffix) && par.split("/").length === 2)
    .map((par) => {
      const c = cities.find((x) => x.slug === par.split("/")[0]);
      return c ? { href: `/atencion-telefonica/${par}`, city: c.city } : null;
    })
    .filter((x): x is { href: string; city: string } => x !== null)
    .sort((a, b) => a.city.localeCompare(b.city, "es"));
}

export default async function LandingPage({
  params }: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sector = sectors.find((s) => s.slug === slug);

  if (!sector) {
    return <div style={{ textAlign: "center", padding: "80px 64px" }}>Sector no encontrado</div>;
  }

  const deepDive = (sector as unknown as { deepDive?: Array<{ heading: string; body: string }> }).deepDive;
  // Campos opcionales de las páginas para medianas y grandes empresas.
  const extra = sector as unknown as {
    testimonial?: { quote: string; author: string; role: string };
    caseStudy?: CaseStudyData;
    caseStudies?: CaseStudyData[];
    related?: Array<{ href: string; label: string }>;
    steps?: Array<{ title: string; desc: string }>;
    faqFrom?: number;
    cta?: { title: string; text: string };
  };
  const faqFrom = extra.faqFrom ?? 4;
  const faqs = sector.faq.slice(faqFrom);

  return (
    <>
      <FAQPageSchema faqs={faqs.map(f => ({ question: f.question, answer: f.answer ?? "" }))} />
      <ServiceSchema
        services={[{
          name: sector.title,
          description: sector.heroSubtitle }]}
      />

      <BreadcrumbSchema items={[
        { name: "Inicio", url: "https://www.minute-call.com" },
        { name: sector.title, url: `https://www.minute-call.com/lp/${sector.slug}` }
      ]} />

      <BrandPage>
        <Hero
          tag={sector.heroTag}
          title={sector.heroTitle ? sector.heroTitle : <>Recepcionista de IA para {sector.sector}.</>}
          sub={sector.heroSubtitle}
          extra={sector.socialProof}
        />

        {extra.testimonial && (
          <Ed tag="Clientes" title="Lo que dicen nuestros clientes." flush={false}>
            <Quote
              quote={extra.testimonial.quote}
              author={extra.testimonial.author}
              role={extra.testimonial.role}
            />
          </Ed>
        )}

        {(extra.caseStudies ?? (extra.caseStudy ? [extra.caseStudy] : [])).map((cs, n) => (
          <CaseStudy key={n} {...cs} />
        ))}

        <Ed tag="Ventajas" title="Qué hacemos por ti.">
          <Rows items={sector.features.slice(0, 3).map((f) => ({ title: f.title, desc: f.description }))} />
        </Ed>

        <Ed tag="Cómo funciona" title="Cómo funciona.">
          <Steps
            items={
              extra.steps ?? [
                { title: "Diagnóstico", desc: "Repasamos contigo los tipos de llamada, el horario a cubrir y qué hay que resolver, registrar o escalar." },
                { title: "Procedimiento", desc: "Lo convertimos en un procedimiento por escenarios y formamos a los agentes (o configuramos la IA) sobre él." },
                { title: "Operación", desc: "Atendemos con tu nombre, registramos cada llamada en tu herramienta y revisamos el procedimiento contigo." },
              ]
            }
          />
        </Ed>

        {deepDive && (
          <Ed tag="En detalle" title="En detalle." flush={false}>
            <div className="dd">
              {deepDive.map((bloque, i) => (
                <div className="dd-row" key={i}>
                  <h3>{bloque.heading}</h3>
                  <div className="dd-body">
                    {bloque.body.split("\n\n").map((parrafo, j) => (
                      <p
                        key={j}
                        dangerouslySetInnerHTML={{ __html: parrafo.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Ed>
        )}

        <Ed tag="Preguntas" title="FAQ">
          <Faq items={faqs.map((f) => ({ q: f.question, a: f.answer }))} />
        </Ed>

        {/* Contenido en profundidad: aquí vive el contenido que antes estaba
            repartido en cuatro URLs (consolidación del cluster SEO). */}
        {extra.related && extra.related.length > 0 && (
          <Ed tag="Relacionado" title="Sigue leyendo.">
            <Chips links={extra.related} />
          </Ed>
        )}

        {citiesForSector(sector.slug).length > 0 && (
          <Ed tag="Ciudades" title="También por ciudad.">
            <p className="lead2">Cómo trabajamos este servicio en cada ciudad.</p>
            <Chips links={citiesForSector(sector.slug).map((c) => ({ href: c.href, label: c.city }))} />
          </Ed>
        )}

        <CtaFinal
          tag="Empieza hoy"
          title={extra.cta?.title ?? "¿Listo para transformar tu atención?"}
          text={extra.cta?.text ?? "Te proponemos un procedimiento y un presupuesto ajustado a tu volumen, sin permanencia."}
        />
      </BrandPage>
    </>
  );
}
