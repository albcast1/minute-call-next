import Link from 'next/link';
import { Metadata } from 'next';
import sectors from '@/data/sectors.json';
import cities from '@/data/cities.json';
import { FAQPageSchema, BreadcrumbSchema, ServiceSchema } from '@/components/JsonLd';

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
    sectores: string;
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

  const title = `Recepcionista Virtual para ${sector.sector} en ${city.city} | minute call`;
  const description = `Atención telefónica 24/7 para ${sector.sector} en ${city.city} con agentes nativos o IA — tú eliges. Sin permanencia.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'es_ES',
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
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h1>Página no encontrada</h1>
        <p>Lo sentimos, la página que buscas no existe.</p>
        <Link href="/lp/recepcionista-ia-clinicas" style={{ color: '#0066cc' }}>
          Volver al inicio
        </Link>
      </div>
    );
  }

  // Get 3 feature cards
  const featureCards = sector.features.slice(0, 3);

  // Related sectors (2-3 more for internal linking)
  const relatedSectors = (sectors as SectorType[])
    .filter((s) => s.slug !== slug)
    .slice(0, 3);

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
      answer: `Los planes de Minute Call empiezan desde 250€/mes. El precio varía según el volumen de llamadas, horario y tipo de agente (humano o IA). Sin permanencia ni costes ocultos. Solicita una demo gratuita para un presupuesto personalizado.`,
    },
    {
      question: `¿Cómo funciona el servicio en ${city.city}?`,
      answer: `Nuestro servicio funciona en 3 pasos: primero, personalizamos el guión de llamada y acciones del agente; segundo, respondemos en nombre de tu empresa siguiendo tu procedimiento; tercero, agendamos la cita o enviamos el mensaje al instante a tu email.`,
    },
  ];

  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  };

  const sectionStyle: React.CSSProperties = {
    padding: '60px 0',
    borderBottom: '1px solid #f0f0f0',
  };

  const heroStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '80px 20px',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  };

  const h1Style: React.CSSProperties = {
    fontSize: '48px',
    fontWeight: '700',
    margin: '20px 0',
    lineHeight: '1.2',
    color: '#1a1a1a',
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '20px',
    color: '#666',
    marginBottom: '30px',
    maxWidth: '700px',
    margin: '20px auto 30px',
    lineHeight: '1.6',
  };

  const buttonStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '14px 32px',
    backgroundColor: '#0066cc',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
  };

  const cardContainerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    marginTop: '40px',
  };

  const cardStyle: React.CSSProperties = {
    padding: '30px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    backgroundColor: '#fff',
  };

  const h2Style: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#1a1a1a',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '12px',
    color: '#1a1a1a',
  };

  const pillStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '8px 16px',
    backgroundColor: '#f0f0f0',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#0066cc',
    marginBottom: '20px',
  };

  const testimonialStyle: React.CSSProperties = {
    padding: '40px',
    backgroundColor: '#f9f9f9',
    borderLeft: '4px solid #0066cc',
    borderRadius: '4px',
    marginTop: '40px',
  };

  const testimonialTextStyle: React.CSSProperties = {
    fontSize: '18px',
    fontStyle: 'italic',
    marginBottom: '20px',
    color: '#333',
    lineHeight: '1.6',
  };

  const authorStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
  };

  const roleStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#666',
    marginTop: '4px',
  };

  const stepsContainerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    marginTop: '40px',
  };

  const stepStyle: React.CSSProperties = {
    textAlign: 'center',
  };

  const stepNumberStyle: React.CSSProperties = {
    display: 'inline-block',
    width: '50px',
    height: '50px',
    lineHeight: '50px',
    backgroundColor: '#0066cc',
    color: '#fff',
    borderRadius: '50%',
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '16px',
  };

  const faqContainerStyle: React.CSSProperties = {
    marginTop: '40px',
  };

  const faqItemStyle: React.CSSProperties = {
    marginBottom: '24px',
    paddingBottom: '24px',
    borderBottom: '1px solid #e0e0e0',
  };

  const faqQuestionStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '12px',
  };

  const faqAnswerStyle: React.CSSProperties = {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.6',
  };

  const linksStyle: React.CSSProperties = {
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid #e0e0e0',
  };

  const linkItemStyle: React.CSSProperties = {
    display: 'inline-block',
    marginRight: '20px',
    marginBottom: '12px',
  };

  const breadcrumbStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#666',
    marginBottom: '30px',
  };

  const breadcrumbLinkStyle: React.CSSProperties = {
    color: '#0066cc',
    textDecoration: 'none',
    marginRight: '8px',
  };

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <ServiceSchema
        name={`Recepcionista Virtual para ${sector.sector}`}
        description={`Atención telefónica 24/7 para ${sector.sector} en ${city.city} con agentes nativos o IA`}
      />
      <FAQPageSchema items={faqItems} />

      {/* Breadcrumb */}
      <div style={{ ...containerStyle, ...breadcrumbStyle, paddingTop: '20px' }}>
        {breadcrumbItems.map((item, idx) => (
          <span key={idx}>
            {idx > 0 && ' / '}
            {idx < breadcrumbItems.length - 1 ? (
              <Link href={item.url} style={breadcrumbLinkStyle}>
                {item.name}
              </Link>
            ) : (
              <span style={{ color: '#1a1a1a' }}>{item.name}</span>
            )}
          </span>
        ))}
      </div>

      {/* Hero Section */}
      <section style={heroStyle}>
        <div style={containerStyle}>
          <div style={pillStyle} className="pill-label">
            Recepcionista Virtual para {sector.sector}
          </div>
          <h1 style={h1Style}>
            Atención telefónica para {sector.sector} en {city.city}.
          </h1>
          <p style={subtitleStyle}>
            {sector.heroSubtitle} en {city.city}. Automatiza tu atención telefónica con
            agentes nativos basados en España o asistentes de IA — tú eliges.
          </p>
          <Link href="/reserva-llamada" style={buttonStyle} className="btn-cta">
            Reserva una llamada
          </Link>
        </div>
      </section>

      {/* Local Context Section */}
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <h2 style={h2Style}>
            Por qué necesitas atención telefónica profesional en {city.city}
          </h2>
          <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
            {city.localContext}
          </p>
          <div style={cardContainerStyle}>
            {sector.features.slice(0, 2).map((feature, idx) => (
              <div key={idx} style={cardStyle} className="card">
                <h3 style={h3Style}>{feature.title}</h3>
                <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Feature Cards */}
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <h2 style={h2Style}>Características principales para {sector.sector}</h2>
          <div style={cardContainerStyle}>
            {featureCards.map((feature, idx) => (
              <div key={idx} style={cardStyle} className="card">
                <h3 style={h3Style} className="service-card-title">
                  {feature.title}
                </h3>
                <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6' }} className="service-card-body">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <h2 style={h2Style}>Lo que dicen nuestros clientes</h2>
          <div style={testimonialStyle}>
            <p style={testimonialTextStyle} className="serif-italic">
              "{sector.testimonial.quote}"
            </p>
            <p style={authorStyle}>{sector.testimonial.author}</p>
            <p style={roleStyle}>{sector.testimonial.role}</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <h2 style={h2Style}>Cómo funciona</h2>
          <div style={stepsContainerStyle}>
            <div style={stepStyle}>
              <div style={stepNumberStyle}>1</div>
              <h3 style={h3Style}>Configuración</h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6' }}>
                Personalizamos el guión de llamada y acciones del agente con los detalles de tu
                negocio y sector.
              </p>
            </div>
            <div style={stepStyle}>
              <div style={stepNumberStyle}>2</div>
              <h3 style={h3Style}>Integración</h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6' }}>
                Integramos el sistema con tu telefonía actual sin necesidad de cambios en
                tu infraestructura.
              </p>
            </div>
            <div style={stepStyle}>
              <div style={stepNumberStyle}>3</div>
              <h3 style={h3Style}>Gestión</h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6' }}>
                Tu recepcionista virtual gestiona las llamadas y consultas
                de forma inteligente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IA vs Human Agent Section */}
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <h2 style={h2Style}>¿IA o agente humano? Tú decides</h2>
          <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', marginBottom: '30px' }}>
            En Minute Call puedes elegir entre asistentes de IA y recepcionistas nativos basados en España, o combinar ambos según tus necesidades.
          </p>
          <div style={cardContainerStyle}>
            <div style={cardStyle} className="card">
              <h3 style={h3Style}>Agente de IA</h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6' }}>
                Ideal para consultas frecuentes, confirmaciones de cita, horarios y disponibilidad. Responde al instante, 24/7, sin esperas. Perfecto para volumen alto y horario nocturno o fines de semana.
              </p>
            </div>
            <div style={cardStyle} className="card">
              <h3 style={h3Style}>Agente Humano Nativo</h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6' }}>
                Mejor para primeras consultas de alto valor, quejas, presupuestos personalizados y situaciones que requieren empatía. Recepcionistas nativos basados en España que atienden en español, inglés y francés.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Minute Call vs Call Centers Section */}
      <section style={{ ...sectionStyle, background: '#f5f7fa' }}>
        <div style={containerStyle}>
          <h2 style={h2Style}>Minute Call vs Call Centers Tradicionales</h2>
          <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', marginBottom: '30px' }}>
            Los grandes call centers (Concentrix, Konecta, etc.) están diseñados para corporaciones. Minute Call está diseñado para PYMES como tu {sector.sector.toLowerCase()} en {city.city}.
          </p>
          <div style={cardContainerStyle}>
            <div style={cardStyle} className="card">
              <h3 style={h3Style}>Call Centers Tradicionales</h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6' }}>
                Agentes basados en LATAM · Contratos rígidos a largo plazo · Bajo nivel tecnológico · Errores frecuentes · Falta de personalización · Diseñados para grandes corporaciones
              </p>
            </div>
            <div style={cardStyle} className="card">
              <h3 style={h3Style}>Minute Call</h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6' }}>
                Agentes nativos basados en España · Sin permanencia, mes a mes · Agentes humanos o IA, tú eliges · Control de calidad de cada conversación · Partners de Teleperformance (#1 BPO mundial) · Desde 250€/mes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <h2 style={h2Style}>Preguntas frecuentes</h2>
          <div style={faqContainerStyle}>
            {faqItems.map((item, idx) => (
              <div key={idx} style={faqItemStyle}>
                <p style={faqQuestionStyle}>{item.question}</p>
                <p style={faqAnswerStyle}>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links Section */}
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <h2 style={h2Style}>Más información</h2>
          <div style={linksStyle}>
            <div style={linkItemStyle}>
              <Link href={`/lp/${sector.slug}`} style={{ color: '#0066cc', textDecoration: 'none' }}>
                → Recepcionista Virtual para {sector.sector}
              </Link>
            </div>
            <div style={linkItemStyle}>
              <Link href={`/atencion-telefonica/${city.slug}`} style={{ color: '#0066cc', textDecoration: 'none' }}>
                → Servicios de atención telefónica en {city.city}
              </Link>
            </div>
          </div>
          <h3 style={{ ...h3Style, marginTop: '40px', marginBottom: '20px' }}>
            Sectores relacionados en {city.city}
          </h3>
          <div style={linksStyle}>
            {relatedSectors.map((relatedSector, idx) => (
              <div key={idx} style={linkItemStyle}>
                <Link
                  href={`/lp/${relatedSector.slug}/${city.slug}`}
                  style={{ color: '#0066cc', textDecoration: 'none' }}
                >
                  → Recepcionista Virtual para {relatedSector.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        style={{
          ...sectionStyle,
          textAlign: 'center',
          background: '#f5f7fa',
          paddingTop: '80px',
          paddingBottom: '80px',
        }}
      >
        <div style={containerStyle}>
          <h2 style={h2Style}>Comienza con una demo gratuita</h2>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px', lineHeight: '1.6' }}>
            Descubre cómo Minute Call puede transformar la atención
            telefónica de tu {sector.sector} en {city.city}.
          </p>
          <Link href="/reserva-llamada" style={buttonStyle} className="btn-cta">
            Reserva una llamada
          </Link>
        </div>
      </section>
    </>
  );
}
