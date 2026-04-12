import Link from 'next/link';
import { Metadata } from 'next';
import sectors from '@/data/sectors.json';
import cities from '@/data/cities.json';
import { FAQPageSchema, BreadcrumbSchema, ServiceSchema, LocalBusinessSchema, HowToSchema, ReviewSchema } from '@/components/JsonLd';

type SectorType = {
  slug: string;
  sector: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroTag: string;
  heroSubtitle: string;
  socialProof: string;
  features: Array<{
    title: string;
    description: string;
  }>;
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  faq: Array<{
    question: string;
    answer: string;
  }>;
};

type CityType = {
  slug: string;
  city: string;
  region: string;
  metaTitle: string;
  metaDescription: string;
  heroTag: string;
  heroTitle: string;
  heroSubtitle: string;
  localContext: string;
  keySectors: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  stats: {
    pymes: string;
    callsLost: string;
  };
};

export async function generateStaticParams() {
  const params: Array<{ slug: string; ciudad: string }> = [];

  for (const sector of sectors as SectorType[]) {
    for (const city of cities as CityType[]) {
      params.push({
        slug: sector.slug,
        ciudad: city.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; ciudad: string }>;
}): Promise<Metadata> {
  const { slug, ciudad } = await params;

  const sector = (sectors as SectorType[]).find((s) => s.slug === slug);
  const city = (cities as CityType[]).find((c) => c.slug === ciudad);

  if (!sector || !city) {
    return {
      title: 'Página no encontrada | minute call',
      description: 'La página que buscas no existe.',
    };
  }

  const title = sector.metaTitle
    ? sector.metaTitle.replace('{ciudad}', city.city)
    : `Recepcionista Virtual para ${sector.sector} en ${city.city} | minute call`;
  const description = sector.metaDescription
    ? sector.metaDescription.replace('{ciudad}', city.city)
    : `Atención telefónica 24/7 para ${sector.sector} en ${city.city} con agentes nativos o IA — tú eliges. Sin permanencia.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/lp/${slug}/${ciudad}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'es_ES',
      url: `https://www.minute-call.com/lp/${slug}/${ciudad}`,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function SectorCityPage({
  params,
}: {
  params: Promise<{ slug: string; ciudad: string }>;
}) {
  const { slug, ciudad } = await params;

  const sector = (sectors as SectorType[]).find((s) => s.slug === slug);
  const city = (cities as CityType[]).find((c) => c.slug === ciudad);

  if (!sector || !city) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#EFEBE5', minHeight: '60vh' }}>
        <h1 style={{ fontFamily: "'Source Serif 4', 'Source Serif Pro', Georgia, serif", fontWeight: 600, fontStyle: 'italic' }}>
          Página no encontrada
        </h1>
        <p style={{ color: '#333' }}>Lo sentimos, la página que buscas no existe.</p>
        <Link href="/" style={{ color: '#000' }}>Volver al inicio</Link>
      </div>
    );
  }

  const featureCards = sector.features.slice(0, 3);

  const relatedSectors = (sectors as SectorType[])
    .filter((s) => s.slug !== slug)
    .slice(0, 3);

  const relatedCities = (cities as CityType[])
    .filter((c) => c.slug !== ciudad)
    .slice(0, 5);

  const howToSteps = [
    { name: 'Elige tu plan', text: `Selecciona el plan que mejor se adapte a tu negocio de ${sector.sector} en ${city.city}.` },
    { name: 'Configura tu flujo', text: 'Define cómo quieres que atendamos tus llamadas: horarios, mensajes y derivaciones.' },
    { name: 'Activa tu recepcionista', text: 'En menos de 24h tu recepcionista virtual estará operativa atendiendo llamadas.' },
  ];

  const breadcrumbItems = [
    { name: 'Inicio', url: '/' },
    { name: sector.sector, url: `/lp/${sector.slug}` },
    { name: city.city, url: `/lp/${sector.slug}/${city.slug}` },
  ];

  const faqItems = [
    {
      question: `¿Minute Call ofrece recepcionista para ${sector.sector} en ${city.city}?`,
      answer: `Sí, Minute Call ofrece atención telefónica especializada para ${sector.sector} en ${city.city} con agentes nativos basados en España o asistentes de IA — tú eliges. Nuestro servicio está diseñado para las necesidades específicas de este sector.`,
    },
    {
      question: `¿Qué sectores atiende Minute Call en ${city.city}?`,
      answer: `En ${city.city}, Minute Call atiende a varios sectores clave: ${city.keySectors.join(', ')}. Cada uno cuenta con una solución personalizada de recepcionista virtual con agentes nativos o IA.`,
    },
    {
      question: `¿Cuánto cuesta el servicio de recepcionista para ${sector.sector}?`,
      answer: `Los planes de Minute Call empiezan desde 250€/mes. El precio varía según el volumen de llamadas, horario y tipo de agente (humano o IA). Sin permanencia ni costes ocultos. Contacta con nosotros para un presupuesto personalizado.`,
    },
    {
      question: `¿Cómo funciona el servicio en ${city.city}?`,
      answer: `Nuestro servicio funciona en 3 pasos: primero, personalizamos el guión de llamada y acciones del agente; segundo, respondemos en nombre de tu empresa siguiendo tu procedimiento; tercero, agendamos la cita o enviamos el mensaje al instante a tu email.`,
    },
  ];

  /* ─────────────────────────────────────────────
     BRAND TOKENS — minute call brandbook
     ───────────────────────────────────────────── */
  const brand = {
    beige: '#EFEBE5',
    black: '#000000',
    darkText: '#1a1a1a',
    bodyText: '#333333',
    mutedText: '#666666',
    green: '#5AFF15',
    greenLight: '#A9FF7B',
    white: '#FFFFFF',
    serif: "'Source Serif 4', 'Source Serif Pro', Georgia, serif",
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  };

  /* ─────────────────────────────────────────────
     STYLE SYSTEM — following home page design
     ───────────────────────────────────────────── */

  const container: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
  };

  const sectionBeige: React.CSSProperties = {
    padding: '80px 0',
    backgroundColor: brand.beige,
  };

  const sectionDark: React.CSSProperties = {
    padding: '80px 0',
    backgroundColor: brand.black,
    color: brand.white,
  };

  const hero: React.CSSProperties = {
    padding: '100px 24px 80px',
    backgroundColor: brand.beige,
  };

  const h1: React.CSSProperties = {
    fontSize: '52px',
    fontWeight: 600,
    fontStyle: 'italic',
    margin: '24px 0',
    lineHeight: 1.1,
    color: brand.darkText,
    fontFamily: brand.serif,
    maxWidth: '700px',
  };

  const subtitle: React.CSSProperties = {
    fontSize: '18px',
    color: brand.mutedText,
    marginBottom: '36px',
    maxWidth: '600px',
    lineHeight: 1.6,
    fontFamily: brand.sans,
  };

  const cta: React.CSSProperties = {
    display: 'inline-block',
    padding: '16px 36px',
    backgroundColor: brand.green,
    color: brand.black,
    textDecoration: 'none',
    borderRadius: '999px',
    fontSize: '16px',
    fontWeight: 600,
    fontFamily: brand.sans,
    border: `2px solid ${brand.black}`,
  };

  const ctaDark: React.CSSProperties = {
    ...cta,
    border: `2px solid ${brand.green}`,
  };

  const cards: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginTop: '40px',
  };

  const card: React.CSSProperties = {
    padding: '32px',
    borderRadius: '16px',
    backgroundColor: brand.white,
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
  };

  const cardDark: React.CSSProperties = {
    padding: '32px',
    borderRadius: '16px',
    backgroundColor: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
  };

  const h2: React.CSSProperties = {
    fontSize: '36px',
    fontWeight: 600,
    fontStyle: 'italic',
    marginBottom: '16px',
    color: brand.darkText,
    fontFamily: brand.serif,
  };

  const h2Light: React.CSSProperties = {
    ...h2,
    color: brand.white,
  };

  const h3: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 600,
    marginBottom: '12px',
    color: brand.darkText,
    fontFamily: brand.sans,
  };

  const h3Light: React.CSSProperties = {
    ...h3,
    color: brand.white,
  };

  const pill: React.CSSProperties = {
    display: 'inline-block',
    padding: '8px 20px',
    backgroundColor: 'transparent',
    borderRadius: '999px',
    fontSize: '14px',
    fontWeight: 500,
    color: brand.bodyText,
    border: `1px solid ${brand.bodyText}`,
    fontFamily: brand.sans,
  };

  const body: React.CSSProperties = {
    fontSize: '16px',
    color: brand.mutedText,
    lineHeight: 1.6,
    fontFamily: brand.sans,
  };

  const bodyLight: React.CSSProperties = {
    ...body,
    color: 'rgba(255,255,255,0.7)',
  };

  const stepNum: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    backgroundColor: brand.green,
    color: brand.black,
    borderRadius: '50%',
    fontSize: '20px',
    fontWeight: 700,
    marginBottom: '16px',
    fontFamily: brand.sans,
  };

  const link: React.CSSProperties = {
    color: brand.darkText,
    textDecoration: 'none',
    fontWeight: 500,
    fontFamily: brand.sans,
    borderBottom: `1px solid ${brand.bodyText}`,
    paddingBottom: '2px',
  };

  const linkLight: React.CSSProperties = {
    ...link,
    color: brand.white,
    borderBottomColor: 'rgba(255,255,255,0.3)',
  };

  const breadcrumb: React.CSSProperties = {
    fontSize: '14px',
    color: brand.mutedText,
    fontFamily: brand.sans,
  };

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <ServiceSchema
        services={[{
          name: `Recepcionista Virtual para ${sector.sector}`,
          description: `Atención telefónica 24/7 para ${sector.sector} en ${city.city} con agentes nativos o IA`,
        }]}
      />
      <FAQPageSchema faqs={faqItems} />
      <LocalBusinessSchema />
      <HowToSchema steps={howToSteps} />
      <ReviewSchema
        authorName={sector.testimonial.author}
        authorRole={sector.testimonial.role}
        reviewBody={sector.testimonial.quote}
      />

      {/* ── HERO ── */}
      <section style={hero}>
        <div style={container}>
          {/* Breadcrumb */}
          <nav style={breadcrumb}>
            {breadcrumbItems.map((item, idx) => (
              <span key={idx}>
                {idx > 0 && <span style={{ margin: '0 8px', color: brand.mutedText }}>/</span>}
                {idx < breadcrumbItems.length - 1 ? (
                  <Link href={item.url} style={{ color: brand.bodyText, textDecoration: 'none' }}>
                    {item.name}
                  </Link>
                ) : (
                  <span style={{ color: brand.darkText }}>{item.name}</span>
                )}
              </span>
            ))}
          </nav>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center', marginTop: '40px' }}>
            {/* Left: copy */}
            <div>
              <div style={pill}>
                Recepcionista Virtual para {sector.sector}
              </div>
              <h1 style={h1}>
                Atención telefónica para {sector.sector} en {city.city}.
              </h1>
              <p style={subtitle}>
                {sector.heroSubtitle} en {city.city}. Automatiza tu atención telefónica con
                agentes nativos basados en España o asistentes de IA — tú eliges.
              </p>
              <Link href="/reserva-llamada" style={cta}>
                Reserva una llamada
              </Link>
            </div>

            {/* Right: visual card (mirrors home hero) */}
            <div style={{
              backgroundColor: brand.white,
              borderRadius: '20px',
              padding: '32px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            }}>
              <div style={{
                display: 'flex',
                gap: 0,
                marginBottom: '24px',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.08)',
              }}>
                <div style={{
                  flex: 1,
                  padding: '14px 24px',
                  textAlign: 'center',
                  backgroundColor: brand.white,
                  fontWeight: 600,
                  fontSize: '15px',
                  fontFamily: brand.sans,
                  color: brand.darkText,
                  borderRight: '1px solid rgba(0,0,0,0.08)',
                }}>
                  Recepcionista
                </div>
                <div style={{
                  flex: 1,
                  padding: '14px 24px',
                  textAlign: 'center',
                  fontWeight: 500,
                  fontSize: '15px',
                  fontFamily: brand.sans,
                  color: brand.mutedText,
                }}>
                  Recepcionista IA
                </div>
              </div>
              <div style={{
                backgroundColor: brand.beige,
                borderRadius: '12px',
                height: '240px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{ textAlign: 'center', color: brand.mutedText, fontFamily: brand.sans, fontSize: '15px' }}>
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>📞</div>
                  <p>Atención telefónica profesional</p>
                  <p style={{ fontSize: '13px', marginTop: '4px' }}>para {sector.sector}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCAL CONTEXT ── */}
      <section style={sectionBeige}>
        <div style={container}>
          <h2 style={h2}>
            Por qué necesitas atención telefónica profesional en {city.city}
          </h2>
          <p style={{ ...body, marginBottom: '20px', maxWidth: '700px' }}>
            {city.localContext}
          </p>
          <div style={cards}>
            {sector.features.slice(0, 2).map((feature, idx) => (
              <div key={idx} style={card}>
                <h3 style={h3}>{feature.title}</h3>
                <p style={body}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES (dark section) ── */}
      <section style={sectionDark}>
        <div style={container}>
          <h2 style={h2Light}>Características principales para {sector.sector}</h2>
          <div style={cards}>
            {featureCards.map((feature, idx) => (
              <div key={idx} style={cardDark}>
                <h3 style={h3Light}>{feature.title}</h3>
                <p style={bodyLight}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section style={sectionBeige}>
        <div style={container}>
          <h2 style={h2}>Lo que dicen nuestros clientes</h2>
          <div style={{
            padding: '48px',
            backgroundColor: brand.white,
            borderRadius: '16px',
            marginTop: '40px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}>
            <p style={{
              fontSize: '20px',
              fontStyle: 'italic',
              marginBottom: '24px',
              color: brand.bodyText,
              lineHeight: 1.6,
              fontFamily: brand.serif,
            }}>
              &ldquo;{sector.testimonial.quote}&rdquo;
            </p>
            <p style={{ fontSize: '16px', fontWeight: 600, color: brand.darkText, fontFamily: brand.sans }}>
              {sector.testimonial.author}
            </p>
            <p style={{ fontSize: '14px', color: brand.mutedText, marginTop: '4px', fontFamily: brand.sans }}>
              {sector.testimonial.role}
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={sectionBeige}>
        <div style={container}>
          <h2 style={h2}>Cómo funciona</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px', marginTop: '48px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={stepNum}>1</div>
              <h3 style={h3}>Configuración</h3>
              <p style={body}>
                Personalizamos el guión de llamada y acciones del agente con los detalles de tu
                negocio y sector.
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={stepNum}>2</div>
              <h3 style={h3}>Integración</h3>
              <p style={body}>
                Integramos el sistema con tu telefonía actual sin necesidad de cambios en
                tu infraestructura.
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={stepNum}>3</div>
              <h3 style={h3}>Gestión</h3>
              <p style={body}>
                Tu recepcionista virtual gestiona las llamadas y consultas
                de forma inteligente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── IA vs HUMAN (dark) ── */}
      <section style={sectionDark}>
        <div style={container}>
          <h2 style={h2Light}>¿IA o agente humano? Tú decides</h2>
          <p style={{ ...bodyLight, marginBottom: '30px', maxWidth: '700px' }}>
            En Minute Call puedes elegir entre asistentes de IA y recepcionistas nativos basados en España, o combinar ambos según tus necesidades.
          </p>
          <div style={cards}>
            <div style={cardDark}>
              <div style={{
                display: 'inline-block',
                padding: '6px 14px',
                borderRadius: '999px',
                backgroundColor: brand.green,
                color: brand.black,
                fontSize: '13px',
                fontWeight: 600,
                marginBottom: '16px',
                fontFamily: brand.sans,
              }}>IA</div>
              <h3 style={h3Light}>Agente de IA</h3>
              <p style={bodyLight}>
                Ideal para consultas frecuentes, confirmaciones de cita, horarios y disponibilidad.
                Responde al instante, 24/7, sin esperas. Perfecto para volumen alto y horario nocturno o fines de semana.
              </p>
            </div>
            <div style={cardDark}>
              <div style={{
                display: 'inline-block',
                padding: '6px 14px',
                borderRadius: '999px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: brand.white,
                fontSize: '13px',
                fontWeight: 600,
                marginBottom: '16px',
                fontFamily: brand.sans,
              }}>Humano</div>
              <h3 style={h3Light}>Agente Humano Nativo</h3>
              <p style={bodyLight}>
                Mejor para primeras consultas de alto valor, quejas, presupuestos personalizados y
                situaciones que requieren empatía. Recepcionistas nativos basados en España que atienden en español, inglés y francés.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MC vs CALL CENTERS ── */}
      <section style={sectionBeige}>
        <div style={container}>
          <h2 style={h2}>Minute Call vs Call Centers Tradicionales</h2>
          <p style={{ ...body, marginBottom: '30px', maxWidth: '700px' }}>
            Los grandes call centers están diseñados para corporaciones. Minute Call está diseñado para PYMES como tu {sector.sector.toLowerCase()} en {city.city}.
          </p>
          <div style={cards}>
            <div style={{ ...card, border: '1px solid rgba(0,0,0,0.08)' }}>
              <div style={{
                display: 'inline-block',
                padding: '6px 14px',
                borderRadius: '999px',
                backgroundColor: 'rgba(0,0,0,0.06)',
                color: brand.mutedText,
                fontSize: '13px',
                fontWeight: 600,
                marginBottom: '16px',
                fontFamily: brand.sans,
              }}>Tradicional</div>
              <h3 style={h3}>Call Centers Tradicionales</h3>
              <p style={body}>
                Agentes basados en LATAM · Contratos rígidos a largo plazo · Bajo nivel tecnológico · Errores frecuentes · Falta de personalización · Diseñados para grandes corporaciones
              </p>
            </div>
            <div style={{ ...card, border: `2px solid ${brand.green}` }}>
              <div style={{
                display: 'inline-block',
                padding: '6px 14px',
                borderRadius: '999px',
                backgroundColor: brand.green,
                color: brand.black,
                fontSize: '13px',
                fontWeight: 600,
                marginBottom: '16px',
                fontFamily: brand.sans,
              }}>minute call</div>
              <h3 style={h3}>Minute Call</h3>
              <p style={body}>
                Agentes nativos basados en España · Sin permanencia, mes a mes · Agentes humanos o IA, tú eliges · Control de calidad de cada conversación · Partners de Teleperformance (#1 BPO mundial) · Desde 250€/mes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={sectionBeige}>
        <div style={container}>
          <h2 style={h2}>Preguntas frecuentes</h2>
          <div style={{ marginTop: '40px', maxWidth: '800px' }}>
            {faqItems.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                <p style={{ fontSize: '18px', fontWeight: 600, color: brand.darkText, marginBottom: '12px', fontFamily: brand.sans }}>
                  {item.question}
                </p>
                <p style={{ fontSize: '16px', color: brand.mutedText, lineHeight: 1.6, fontFamily: brand.sans }}>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERNAL LINKS ── */}
      <section style={sectionBeige}>
        <div style={container}>
          <h2 style={h2}>Más información</h2>
          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Link href={`/lp/${sector.slug}`} style={link}>
              Recepcionista Virtual para {sector.sector} →
            </Link>
            <Link href={`/atencion-telefonica/${city.slug}`} style={link}>
              Servicios de atención telefónica en {city.city} →
            </Link>
          </div>

          <h3 style={{ ...h3, marginTop: '48px', marginBottom: '20px' }}>
            Sectores relacionados en {city.city}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {relatedSectors.map((relatedSector, idx) => (
              <Link key={idx} href={`/lp/${relatedSector.slug}/${city.slug}`} style={link}>
                Recepcionista Virtual para {relatedSector.sector} →
              </Link>
            ))}
          </div>

          {/* Other cities for this sector */}
          <div style={{ marginTop: '48px' }}>
            <h3 style={{ ...h3, marginBottom: '16px' }}>
              {sector.sector} en otras ciudades
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {relatedCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/lp/${sector.slug}/${c.slug}`}
                  style={{
                    display: 'inline-block',
                    padding: '8px 16px',
                    backgroundColor: brand.white,
                    borderRadius: '999px',
                    fontSize: '14px',
                    color: brand.darkText,
                    textDecoration: 'none',
                    fontFamily: brand.sans,
                    border: '1px solid rgba(0,0,0,0.1)',
                  }}
                >
                  {sector.sector} en {c.city}
                </Link>
              ))}
            </div>
          </div>

          {/* Mid-page CTA */}
          <div style={{
            marginTop: '48px',
            padding: '40px',
            backgroundColor: brand.black,
            borderRadius: '16px',
            textAlign: 'center',
            color: brand.white,
          }}>
            <p style={{ fontSize: '22px', fontWeight: 600, marginBottom: '12px', fontFamily: brand.serif, fontStyle: 'italic' }}>
              Prueba Minute Call para tu negocio en {city.city}
            </p>
            <p style={{ fontSize: '16px', marginBottom: '24px', opacity: 0.7, fontFamily: brand.sans }}>
              Sin permanencia. Activa tu recepcionista virtual en menos de 24 horas.
            </p>
            <Link href="/reserva-llamada" style={ctaDark}>
              Reservar llamada
            </Link>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA (dark) ── */}
      <section style={{ ...sectionDark, textAlign: 'center', padding: '100px 0' }}>
        <div style={container}>
          <h2 style={{ ...h2Light, maxWidth: '600px', margin: '0 auto 16px' }}>
            Habla con nuestro equipo
          </h2>
          <p style={{ ...bodyLight, marginBottom: '36px', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
            Descubre cómo Minute Call puede transformar la atención
            telefónica de tu {sector.sector.toLowerCase()} en {city.city}.
          </p>
          <Link href="/reserva-llamada" style={ctaDark}>
            Reserva una llamada
          </Link>
        </div>
      </section>
    </>
  );
}
