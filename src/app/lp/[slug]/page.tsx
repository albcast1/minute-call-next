import Link from "next/link";
import { Metadata } from "next";
import sectors from "@/data/sectors.json";
import cities from "@/data/cities.json";
import indexables from "@/data/city-sector-indexables.json";
import { FAQPageSchema, BreadcrumbSchema , ServiceSchema } from "@/components/JsonLd";
import VideoCard from "@/components/VideoCard";

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

      {/* ===== HERO ===== */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(40px,8vw,80px) clamp(16px,5vw,64px) 60px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "clamp(24px,4vw,60px)",
          flexWrap: "wrap" }}
      >
        <div style={{ flex: "1 1 280px", maxWidth: 560 }}>
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
            {sector.heroTitle ? (
              <span className="serif-italic">{sector.heroTitle}</span>
            ) : (
              <>Recepcionista de IA para{" "}<span className="serif-italic">{sector.sector}.</span></>
            )}
          </h1>

          <p style={{ maxWidth: 500, marginBottom: 16 }}>{sector.heroSubtitle}</p>

          <p style={{ marginBottom: 40 }}>{sector.socialProof}</p>

          <Link href="/reserva-llamada" className="btn-cta">
            Reserva una llamada
          </Link>
        </div>

        <div style={{ alignSelf: "center" }}>
          <VideoCard />
        </div>
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
              fontSize: "clamp(14px, 3.8vw, 22px)",
              fontStyle: "italic",
              color: "black",
              marginBottom: 24,
              lineHeight: 1.5,
              letterSpacing: "-0.5px" }}
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

      {/* ===== VENTAJAS CLAVE — siempre 3 cards ===== */}
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
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
            marginTop: 48 }}
          className="grid-3col"
        >
          {sector.features.slice(0, 3).map((feature, index) => (
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
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            marginTop: 48,
            textAlign: "left" }}
          className="grid-3col"
        >
          {[
            {
              step: "01",
              title: "Configuración",
              description: "Te conocemos. Entrenamos a la IA con tus datos, políticas y FAQs." },
            {
              step: "02",
              title: "Integración",
              description: "Configuramos tu número. Los clientes siguen llamando al mismo número." },
            {
              step: "03",
              title: "Gestión",
              description: "La IA atiende, filtra leads y agenda citas. Tú solo enfocado en cerrar." },
          ].map((item) => (
            <div key={item.step} className="card" style={{ padding: 32 }}>
              <p
                style={{
                  fontSize: 48,
                  fontWeight: 500,
                  color: "rgba(0,0,0,0.1)",
                  marginBottom: 16,
                  letterSpacing: -2 }}
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
            textAlign: "left" }}
        >
          {sector.faq.slice(4).map((faq, index) => (
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
                  color: "black" }}
              >
                {faq.question}
                <span style={{ fontSize: 24, fontWeight: 300 }}>+</span>
              </summary>
              <p style={{ marginTop: 16, maxWidth: 700 }}>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ===== CONTENIDO EN PROFUNDIDAD =====
          Las landings comerciales tenian 380-480 palabras y competian con
          articulos propios de 370-455 sobre exactamente la misma intencion.
          Consolidado el cluster, este bloque es donde vive el contenido que
          antes estaba repartido en cuatro URLs. */}
      {Array.isArray((sector as { deepDive?: Array<{ heading: string; body: string }> }).deepDive) && (
        <section style={{ maxWidth: 820, margin: "0 auto", padding: "40px 64px 0" }}>
          {(sector as unknown as { deepDive: Array<{ heading: string; body: string }> }).deepDive.map((bloque, i) => (
            <div key={i} style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: "clamp(22px,4vw,30px)", marginBottom: 20 }}>{bloque.heading}</h2>
              {bloque.body.split("\n\n").map((parrafo, j) => (
                <p
                  key={j}
                  style={{ lineHeight: 1.75, marginBottom: 16 }}
                  dangerouslySetInnerHTML={{
                    __html: parrafo.replace(
                      /\*\*(.+?)\*\*/g,
                      '<strong>$1</strong>'
                    ) }}
                />
              ))}
            </div>
          ))}
        </section>
      )}

      {/* ===== CIUDADES DE ESTE SECTOR ===== */}
      {citiesForSector(sector.slug).length > 0 && (
        <section style={{ maxWidth: 1000, margin: "0 auto", padding: "40px clamp(16px,5vw,64px) 0", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(22px,4vw,30px)", marginBottom: 12 }}>
            También por <span className="serif-italic">ciudad</span>
          </h2>
          <p style={{ maxWidth: 560, margin: "0 auto 24px" }}>
            Cómo trabajamos este servicio en cada ciudad.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
            {citiesForSector(sector.slug).map((c) => (
              <Link
                key={c.href}
                href={c.href}
                style={{ padding: "10px 18px", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 50, color: "black", textDecoration: "none", fontSize: 14, fontWeight: 500 }}
              >
                {c.city}
              </Link>
            ))}
          </div>
        </section>
      )}

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
          Reserva una llamada
        </Link>
      </section>
    </>
  );
}
