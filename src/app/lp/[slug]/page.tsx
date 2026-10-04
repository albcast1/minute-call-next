import { Metadata } from "next";
import sectors from "@/data/sectors.json";
import cities from "@/data/cities.json";
import indexables from "@/data/city-sector-indexables.json";
import { FAQPageSchema, BreadcrumbSchema , ServiceSchema } from "@/components/JsonLd";
import VideoCard from "@/components/VideoCard";
import { BrandPage, Hero, Ed, Rows, Steps, Faq, Quote, Chips, CtaFinal, Prose } from "@/components/brand/Sections";

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
 * Ciudades con pagina ciudad x sector indexable para este sector. Esas paginas
 * estan en el sitemap pero no las enlazaba ninguna otra (auditoria SE Ranking:
 * "sin enlaces entrantes"); desde aqui y desde la ciudad reciben dos enlaces.
 */
function citiesForSector(slug: string): { href: string; city: string }[] {
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

  return (
    <>
      <FAQPageSchema faqs={sector.faq.slice(4).map(f => ({ question: f.question, answer: f.answer ?? "" }))} />
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
          title={sector.heroTitle ? sector.heroTitle : `Recepcionista de IA para ${sector.sector}.`}
          sub={sector.heroSubtitle}
          extra={sector.socialProof}
        >
          <div className="hero-media">
            <VideoCard />
          </div>
        </Hero>

        <Ed tag="Clientes" title="Lo que dicen nuestros clientes." flush={false}>
          <Quote
            quote={sector.testimonial.quote}
            author={sector.testimonial.author}
            role={sector.testimonial.role}
          />
        </Ed>

        <Ed tag="Ventajas" title="Qué hacemos por ti.">
          <Rows items={sector.features.slice(0, 3).map((f) => ({ title: f.title, desc: f.description }))} />
        </Ed>

        <Ed tag="Cómo funciona" title="Cómo funciona.">
          <Steps
            items={[
              { title: "Configuración", desc: "Te conocemos. Entrenamos a la IA con tus datos, políticas y FAQs." },
              { title: "Integración", desc: "Configuramos tu número. Los clientes siguen llamando al mismo número." },
              { title: "Gestión", desc: "La IA atiende, filtra leads y agenda citas. Tú solo enfocado en cerrar." },
            ]}
          />
        </Ed>

        <Ed tag="Preguntas" title="FAQ">
          <Faq items={sector.faq.slice(4).map((f) => ({ q: f.question, a: f.answer }))} />
        </Ed>

        {/* Contenido en profundidad: aquí vive el contenido que antes estaba
            repartido en cuatro URLs (consolidación del cluster SEO). */}
        {deepDive && (
          <Ed tag="En detalle">
            <Prose>
              {deepDive.map((bloque, i) => (
                <div key={i}>
                  <h2>{bloque.heading}</h2>
                  {bloque.body.split("\n\n").map((parrafo, j) => (
                    <p
                      key={j}
                      dangerouslySetInnerHTML={{ __html: parrafo.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }}
                    />
                  ))}
                </div>
              ))}
            </Prose>
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
          title="¿Listo para transformar tu atención?"
          text="Prueba Minute Call sin compromiso. La mayoría de clientes ven resultados en la primera semana."
        />
      </BrandPage>
    </>
  );
}
