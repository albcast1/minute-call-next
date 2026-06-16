import Link from 'next/link';
import { Metadata } from 'next';
import sectors from '@/data/sectors.json';
import cities from '@/data/cities.json';
import {
  FAQPageSchema,
  BreadcrumbSchema,
  ServiceSchema,
  LocalBusinessSchema,
  HowToSchema,
  ReviewSchema,
} from '@/components/JsonLd';

type SectorType = {
  slug: string;
  sector: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroTag: string;
  heroSubtitle: string;
  socialProof: string;
  features: Array<{ title: string; description: string }>;
  testimonial: { quote: string; author: string; role: string; faq: Array<{ question: string; answer: string }> };
  faq: Array<{ question: string; answer: string }>;
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
  testimonial: { quote: string; author: string; role: string };
  stats: { pymes: string; callsLost: string };
};

export async function generateStaticParams() {
  const params: Array<{ slug: string; ciudad: string }> = [];
  for (const sector of sectors as SectorType[]) {
    for (const city of cities as CityType[]) {
      params.push({ slug: sector.slug, ciudad: city.slug });
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
    return { title: 'PÃ¡gina no encontrada | minute call', description: 'La pÃ¡gina que buscas no existe.' };
  }

  const title = sector.metaTitle && sector.metaTitle.includes('{ciudad}')
    ? sector.metaTitle.replace('{ciudad}', city.city)
    : sector.metaTitle
      ? `${sector.metaTitle.replace(/\s*\|\s*minute call\s*$/i, '')} en ${city.city} | minute call`
      : `Recepcionista Virtual para ${sector.sector} en ${city.city} | minute call`;

  const description = sector.metaDescription && sector.metaDescription.includes('{ciudad}')
    ? sector.metaDescription.replace('{ciudad}', city.city)
    : sector.metaDescription
      ? `${sector.metaDescription} Servicio disponible en ${city.city}.`
      : `AtenciÃ³n telefÃ³nica 24/7 para ${sector.sector} en ${city.city} con agentes nativos o IA â tÃº eliges. Sin permanencia.`;

  return {
    title,
    description,
    alternates: { canonical: `/lp/${slug}/${ciudad}` },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'es_ES',
      url: `https://www.minute-call.com/lp/${slug}/${ciudad}`,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/og-image.png'] },
    robots: { index: false, follow: true },
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
      <div style={{ textAlign: 'center', padding: '60px 20px', minHeight: '60vh' }}>
        <h1>Pagina no encontrada</h1>
        <p>Lo sentimos, la pÃ¡gina que buscas no existe.</p>
        <Link href="/" style={{ color: '#000' }}>Volver al inicio</Link>
      </div>
    );
  }

  const featureCards = sector.features.slice(0, 3);

  const hashCode = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  };

  const pageHash = hashCode(`${slug}-${ciudad}`);
  const otherSectors = (sectors as SectorType[]).filter((s) => s.slug !== slug);
  const sectorOffset = pageHash % otherSectors.length;
  const relatedSectors = [...otherSectors.slice(sectorOffset), ...otherSectors.slice(0, sectorOffset)].slice(0, 6);
  const otherCities = (cities as CityType[]).filter((c) => c.slug !== ciudad);
  const cityOffset = (pageHash >> 4) % otherCities.length;
  const relatedCities = [...otherCities.slice(cityOffset), ...otherCities.slice(0, cityOffset)].slice(0, 8);

  const howToSteps = [
    { name: 'Elige tu plan', text: `Selecciona el plan que mejor se adapte a tu negocio de ${sector.sector} en ${city.city}.` },
    { name: 'Configura tu flujo', text: 'Define cÃ³mo quieres que atendamos tus llamadas: horarios, mensajes y derivaciones.' },
    { name: 'Activa tu recepcionista', text: 'En menos de 24h tu recepcionista virtual estarÃ¡ operativa atendiendo llamadas.' },
  ];

  const breadcrumbItems = [
    { name: 'Inicio', url: '/' },
    { name: sector.sector, url: `/lp/${sector.slug}` },
    { name: city.city, url: `/lp/${sector.slug}/${city.slug}` },
  ];

  const sectorFaqs = sector.faq.slice(0, 3).map(f => ({
    question: f.question.replace('{ciudad}', city.city),
    answer: f.answer.replace('{ciudad}', city.city),
  }));
  const cityFaq = {
    question: `Â¿Minute Call ofrece servicio para ${sector.sector} en ${city.city}?`,
    answer: `SÃ­, Minute Call ofrece atenciÃ³n telefÃ³nica especializada para ${sector.sector} en ${city.city} con agentes nativos basados en EspaÃ±a o asistentes de IA â tÃº eliges. Nuestro servicio estÃ¡ diseÃ±ado para las necesidades especÃ­ficas de este sector en tu ciudad. Sin permanencia.`,
  };
  const faqItems = [cityFaq, ...sectorFaqs];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <ServiceSchema services={[{ name: `Recepcionista Virtual para ${sector.sector}`, description: `AtenciÃ³n telefÃ³nica 24/7 para ${sector.sector} en ${city.city} con agentes nativos o IA` }]} />
      <FAQPageSchema faqs={faqItems} />
      <LocalBusinessSchema />
      <HowToSchema steps={howToSteps} />
      <ReviewSchema authorName={sector.testimonial.author} authorRole={sector.testimonial.role} reviewBody={sector.testimonial.quote} />

      {/* Breadcrumb */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px clamp(16px,5vw,64px)', fontSize: 13, color: 'rgba(0,0,0,0.4)' }}>
        {breadcrumbItems.map((item, idx) => (
          <span key={idx}>
            {idx > 0 && <span style={{ margin: '0 6px' }}>/</span>}
            {idx < breadcrumbItems.length - 1 ? (
              <Link href={item.url} style={{ color: 'rgba(0,0,0,0.4)', textDecoration: 'none' }}>{item.name}</Link>
            ) : (
              <span style={{ color: 'black' }}>{item.name}</span>
            )}
          </span>
        ))}
      </div>

      {/* Hero */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(16px,5vw,64px) clamp(40px,6vw,60px)' }}>
        <span className="pill-label" style={{ marginBottom: 16, display: 'inline-block' }}>
          Recepcionista Virtual para {sector.sector}
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(32px,5vw,64px)', alignItems: 'start' }}>
          <div>
            <h1>
              Atencion telefonica para {sector.sector} en{' '}
              <span className="serif-italic">{city.city}.</span>
            </h1>
            <p style={{ maxWidth: 480, marginBottom: 36 }}>
              {sector.heroSubtitle} en {city.city}. Atendemos las llamadas de tu empresa con agentes nativos o asistentes de IA â tÃº eliges. Sin permanencia.
            </p>
            <Link href="/reserva-llamada" className="btn-cta">
              Reserva una llamada
            </Link>
          </div>

          {/* Audio card */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="card" style={{ width: '100%', maxWidth: 460, overflow: 'hidden', padding: 0 }}>
              <div style={{ display: 'flex', background: 'rgba(0,0,0,0.03)', borderRadius: '14px 14px 0 0' }}>
                <div style={{ flex: 1, padding: 16, textAlign: 'center', fontSize: 15, fontWeight: 600, background: 'white', borderRadius: '14px 0 0 0' }}>
                  Recepcionista
                </div>
                <div style={{ flex: 1, padding: 16, textAlign: 'center', fontSize: 15, fontWeight: 500, color: 'rgba(0,0,0,0.4)' }}>
                  Recepcionista IA
                </div>
              </div>
              <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ height: 80, background: 'rgba(0,0,0,0.03)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, padding: '0 20px' }}>
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div key={i} style={{ width: 3, height: `${12 + Math.sin(i * 0.5) * 20 + Math.random() * 15}px`, background: 'black', borderRadius: 2, opacity: 0.3 }} />
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 0, height: 0, borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderLeft: '10px solid white', marginLeft: 2 }} />
                  </div>
                  <span style={{ fontSize: 13, color: 'rgba(0,0,0,0.56)' }}>0:00</span>
                  <div style={{ flex: 1, height: 4, background: '#e5e5e5', borderRadius: 2 }}>
                    <div style={{ width: '0%', height: '100%', background: 'black', borderRadius: 2 }} />
                  </div>
                  <span style={{ fontSize: 13, color: 'rgba(0,0,0,0.56)' }}>0:44</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 clamp(16px,5vw,64px) clamp(40px,6vw,60px)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { value: '<3s', label: 'Tiempo de respuesta' },
          { value: '99.7%', label: 'Tasa de respuesta' },
          { value: '48h', label: 'Activacion' },
          { value: '5.0', label: 'Trustpilot' },
        ].map((s, i) => (
          <div key={i} className="card" style={{ textAlign: 'center', padding: 24 }}>
            <p style={{ fontSize: 'clamp(22px,5vw,28px)', fontWeight: 500, color: 'black', letterSpacing: -1.5, marginBottom: 4 }}>
              {s.value}
            </p>
            <p className="service-card-body" style={{ marginBottom: 0 }}>{s.label}</p>
          </div>
        ))}
      </section>

      {/* Local context */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(16px,5vw,64px)', textAlign: 'center' }}>
        <h2>
          Por que necesitas atencion telefonica profesional en{' '}
          <span className="serif-italic">{city.city}.</span>
        </h2>
        <p style={{ maxWidth: 700, margin: '24px auto', lineHeight: 1.7 }}>
          {city.localContext}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginTop: 32, textAlign: 'left' }}>
          {sector.features.slice(0, 2).map((feature, idx) => (
            <div key={idx} className="card" style={{ padding: 32 }}>
              <h3 style={{ fontSize: 20, marginBottom: 12 }}>{feature.title}</h3>
              <p className="service-card-body">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features â dark section */}
      <section style={{ background: 'black', padding: 'clamp(40px,8vw,80px) clamp(16px,5vw,64px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ color: 'white', marginBottom: 40 }}>
            Caracteristicas principales para{' '}
            <span className="serif-italic">{sector.sector}.</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {featureCards.map((feature, idx) => (
              <div key={idx} style={{ padding: 32, borderRadius: 20, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ fontSize: 20, color: 'white', marginBottom: 12 }}>{feature.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.56)', lineHeight: 1.7, marginBottom: 0 }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(16px,5vw,64px)', textAlign: 'center' }}>
        <span className="pill-label" style={{ marginBottom: 16, display: 'inline-block' }}>Clientes</span>
        <h2 style={{ marginTop: 16 }}>
          Lo que dicen nuestros <span className="serif-italic">clientes.</span>
        </h2>
        <div className="card" style={{ maxWidth: 600, margin: '32px auto 0', padding: 32, textAlign: 'center' }}>
          <p style={{ fontSize: 'clamp(14px,3.8vw,24px)', marginBottom: 12 }}>âââââ</p>
          <p style={{ fontSize: 16, fontStyle: 'italic', color: 'black', lineHeight: 1.7, marginBottom: 20 }}>
            &ldquo;{sector.testimonial.quote}&rdquo;
          </p>
          <p style={{ fontWeight: 600, marginBottom: 4 }}>{sector.testimonial.author}</p>
          <p style={{ color: 'rgba(0,0,0,0.56)', marginBottom: 0 }}>{sector.testimonial.role}</p>
        </div>
      </section>

      {/* How it works */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(16px,5vw,64px)', textAlign: 'center' }}>
        <span className="pill-label" style={{ marginBottom: 16, display: 'inline-block' }}>Como funciona</span>
        <h2 style={{ marginTop: 16 }}>
          Como <span className="serif-italic">funciona.</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginTop: 48, textAlign: 'left' }}>
          {[
            { step: '01', title: 'Configuracion', desc: 'Personalizamos el guiÃ³n de llamada y acciones del agente con los detalles de tu negocio y sector.' },
            { step: '02', title: 'Integracion', desc: 'Integramos el sistema con tu telefonÃ­a actual sin necesidad de cambios en tu infraestructura.' },
            { step: '03', title: 'Gestion', desc: 'Tu recepcionista virtual gestiona las llamadas y consultas de forma inteligente.' },
          ].map((item) => (
            <div key={item.step} className="card" style={{ padding: 32 }}>
              <p style={{ fontSize: 48, fontWeight: 500, color: 'rgba(0,0,0,0.1)', marginBottom: 16, letterSpacing: -2 }}>
                {item.step}
              </p>
              <h3 style={{ fontSize: 22 }}>{item.title}</h3>
              <p className="service-card-body">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* IA vs Human */}
      <section style={{ background: 'black', padding: 'clamp(40px,8vw,80px) clamp(16px,5vw,64px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ color: 'white', marginBottom: 20 }}>
            IA o agente humano? Tu <span className="serif-italic">eliges.</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.56)', lineHeight: 1.7, marginBottom: 40, maxWidth: 700 }}>
            En Minute Call puedes elegir entre asistentes de IA y recepcionistas nativos basados en EspaÃ±a, o combinar ambos segÃºn tus necesidades.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            <div style={{ padding: 32, borderRadius: 20, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ display: 'inline-block', padding: '6px 16px', borderRadius: 50, background: '#5AFF15', color: 'black', fontSize: 13, fontWeight: 600, marginBottom: 20 }}>IA</span>
              <h3 style={{ fontSize: 20, color: 'white', marginBottom: 12 }}>Agente de IA</h3>
              <p style={{ color: 'rgba(255,255,255,0.56)', lineHeight: 1.7, marginBottom: 0 }}>
                Ideal para consultas frecuentes, confirmaciones de cita, horarios y disponibilidad. Responde al instante, 24/7, sin esperas. Perfecto para volumen alto y horario nocturno o fines de semana.
              </p>
            </div>
            <div style={{ padding: 32, borderRadius: 20, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ display: 'inline-block', padding: '6px 16px', borderRadius: 50, background: 'rgba(255,255,255,0.15)', color: 'white', fontSize: 13, fontWeight: 600, marginBottom: 20 }}>Humano</span>
              <h3 style={{ fontSize: 20, color: 'white', marginBottom: 12 }}>Agente Humano Nativo</h3>
              <p style={{ color: 'rgba(255,255,255,0.56)', lineHeight: 1.7, marginBottom: 0 }}>
                Mejor para primeras consultas de alto valor, quejas, presupuestos personalizados y situaciones que requieren empatÃ­a. Recepcionistas nativos basados en EspaÃ±a.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison â home style â/â cards */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(16px,5vw,64px)', textAlign: 'center' }}>
        <span className="pill-label" style={{ marginBottom: 16, display: 'inline-block' }}>La diferencia</span>
        <h2 style={{ marginTop: 16 }}>
          Minute Call vs Call Centers <span className="serif-italic">Tradicionales.</span>
        </h2>
        <p style={{ maxWidth: 700, margin: '24px auto 48px', lineHeight: 1.7 }}>
          Los grandes call centers estÃ¡n diseÃ±ados para corporaciones. Minute Call estÃ¡ diseÃ±ado para PYMES como tu {sector.sector.toLowerCase()} en {city.city}.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 24, textAlign: 'left' }}>
          <div className="card" style={{ padding: 32 }}>
            <h3 style={{ fontSize: 20, marginBottom: 24 }}>Call Centers Tradicionales</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                'Agentes basados en LATAM',
                'Contratos rigidos a largo plazo',
                'Bajo nivel tecnologico',
                'Errores frecuentes',
                'Falta de personalizacion',
                'DiseÃ±ados para grandes corporaciones',
              ].map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, color: 'rgba(0,0,0,0.56)' }}>
                  <span style={{ color: '#e53e3e', fontSize: 16 }}>â</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: 'black', borderRadius: 24, padding: 32, color: 'white' }}>
            <h3 style={{ fontSize: 20, marginBottom: 24, color: 'white' }}>minute call</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                'Agentes nativos basados en EspaÃ±a',
                'Sin permanencia, mes a mes',
                'Agentes humanos o IA, tu eliges',
                'Control de calidad',
                'Partners de Teleperformance (#1 BPO mundial)',
                'Presupuesto personalizado',
              ].map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, color: 'rgba(255,255,255,0.8)' }}>
                  <span style={{ color: '#5AFF15', fontSize: 16 }}>â</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(16px,5vw,64px)', textAlign: 'center' }}>
        <span className="pill-label" style={{ marginBottom: 16, display: 'inline-block' }}>Preguntas</span>
        <h2 style={{ marginTop: 16 }}>
          Preguntas <span className="serif-italic">frecuentes.</span>
        </h2>
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 0, maxWidth: 800, margin: '32px auto 0', textAlign: 'left' }}>
          {faqItems.map((item, idx) => (
            <details key={idx} style={{ padding: '24px 0', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <summary style={{ fontSize: 18, fontWeight: 500, cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'black' }}>
                {item.question}
                <span style={{ fontSize: 24, fontWeight: 300 }}>+</span>
              </summary>
              <p style={{ marginTop: 16 }}>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Internal links */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(16px,5vw,64px)' }}>
        <h2 style={{ marginBottom: 24 }}>
          Mas <span className="serif-italic">informacion.</span>
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Link href={`/lp/${sector.slug}`} style={{ color: 'black', textDecoration: 'none', fontWeight: 500, fontSize: 16, borderBottom: '1px solid rgba(0,0,0,0.2)', paddingBottom: 2, display: 'inline-block', width: 'fit-content' }}>
            Recepcionista Virtual para {sector.sector} â
          </Link>
          <Link href={`/atencion-telefonica/${city.slug}`} style={{ color: 'black', textDecoration: 'none', fontWeight: 500, fontSize: 16, borderBottom: '1px solid rgba(0,0,0,0.2)', paddingBottom: 2, display: 'inline-block', width: 'fit-content' }}>
            Servicios de atenciÃ³n telefÃ³nica en {city.city} â
          </Link>
        </div>

        <h3 style={{ fontSize: 20, marginTop: 48, marginBottom: 20 }}>
          Sectores relacionados en {city.city}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
          {relatedSectors.map((relatedSector, idx) => (
            <Link key={idx} href={`/lp/${relatedSector.slug}/${city.slug}`} className="card" style={{ display: 'block', padding: '16px 20px', color: 'black', textDecoration: 'none', fontWeight: 500, fontSize: 15 }}>
              {relatedSector.sector} en {city.city} â
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 48 }}>
          <h3 style={{ fontSize: 20, marginBottom: 16 }}>
            {sector.sector} en otras ciudades
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {relatedCities.map((c) => (
              <Link key={c.slug} href={`/lp/${sector.slug}/${c.slug}`} className="card" style={{ display: 'inline-block', padding: '10px 20px', fontSize: 14, fontWeight: 500, color: 'black', textDecoration: 'none', borderRadius: 50 }}>
                {c.city}
              </Link>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 48 }}>
          <h3 style={{ fontSize: 20, marginBottom: 16 }}>
            Por que Minute Call?
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['teleperformance', 'intelcia', 'ringover', 'heydiga'].map((comp) => (
              <Link key={comp} href={`/comparar/${comp}`} className="card" style={{ display: 'inline-block', padding: '10px 20px', fontSize: 14, fontWeight: 500, color: 'black', textDecoration: 'none', borderRadius: 50 }}>
                vs {comp.charAt(0).toUpperCase() + comp.slice(1)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ background: 'black', color: 'white', textAlign: 'center', padding: 'clamp(40px,8vw,80px) clamp(16px,5vw,64px)' }}>
        <h2 style={{ color: 'white' }}>
          Habla con nuestro <span className="serif-italic">equipo.</span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 500, margin: '0 auto 32px' }}>
          Descubre cÃ³mo Minute Call puede transformar la atenciÃ³n telefÃ³nica de tu {sector.sector.toLowerCase()} en {city.city}.
        </p>
        <a href="/reserva-llamada" style={{ display: 'inline-block', background: 'white', color: 'black', padding: 'var(--btn-padding)', borderRadius: 'var(--btn-border-radius)', fontSize: 'var(--btn-font-size)', fontWeight: 500, textDecoration: 'none' }}>
          Reserva una llamada
        </a>
      </section>
    </>
  );
}
