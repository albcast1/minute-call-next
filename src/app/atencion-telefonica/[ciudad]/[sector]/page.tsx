import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import sectors from '@/data/sectors.json'
import cities from '@/data/cities.json'
import { FAQPageSchema, BreadcrumbSchema, ServiceSchema } from '@/components/JsonLd'
import highlights from '@/data/city-sector-highlights.json'
import { buildCitySectorMeta, pickHighlight } from '@/lib/seo/city-sector'

const TOP_CITY_SLUGS = ['madrid','barcelona','valencia','sevilla','malaga','bilbao','zaragoza','murcia','palma-de-mallorca','las-palmas']
const TOP_SECTOR_SLUGS = ['recepcionista-ia-clinicas','recepcionista-ia-inmobiliarias','recepcionista-ia-restaurantes','recepcionista-ia-abogados','recepcionista-ia-clinicas-dentales','recepcionista-ia-asesorias','recepcionista-ia-veterinarias','recepcionista-ia-centros-estetica','recepcionista-ia-fisioterapia','recepcionista-ia-seguros']

export async function generateStaticParams() {
  const params: { ciudad: string; sector: string }[] = []
  for (const ciudad of TOP_CITY_SLUGS) {
    for (const sector of TOP_SECTOR_SLUGS) {
      params.push({ ciudad, sector })
    }
  }
  return params
}

export async function generateMetadata({ params }: { params: Promise<{ ciudad: string; sector: string }> }): Promise<Metadata> {
  const { ciudad, sector } = await params
  const city = cities.find(c => c.slug === ciudad)
  const sec = sectors.find(s => s.slug === sector)
  if (!city || !sec) return {}

  const { title, description } = buildCitySectorMeta(city, sec)

  return {
    title,
    description,
    alternates: { canonical: `https://www.minute-call.com/atencion-telefonica/${ciudad}/${sector}` },
    openGraph: { title, description, url: `https://www.minute-call.com/atencion-telefonica/${ciudad}/${sector}`, siteName: 'minute call', locale: 'es_ES', type: 'website' },
  }
}

export default async function SectorCityPage({ params }: { params: Promise<{ ciudad: string; sector: string }> }) {
  const { ciudad, sector } = await params
  const city = cities.find(c => c.slug === ciudad)
  const sec = sectors.find(s => s.slug === sector)
  if (!city || !sec) notFound()

  const faqs = sec.faq?.slice(4, 9) || []
  const highlight = pickHighlight(highlights as unknown as Record<string, unknown>, ciudad, sector)

  const breadcrumbs = [
    { name: 'Inicio', url: 'https://www.minute-call.com' },
    { name: `Atención telefónica en ${city.city}`, url: `https://www.minute-call.com/atencion-telefonica/${ciudad}` },
    { name: sec.title, url: `https://www.minute-call.com/atencion-telefonica/${ciudad}/${sector}` },
  ]

  return (
    <>
      <FAQPageSchema faqs={faqs.map(f => ({ question: f.question, answer: f.answer ?? '' }))} />
      <BreadcrumbSchema items={breadcrumbs} />
      <ServiceSchema services={[{ name: sec.title, description: sec.heroSubtitle }]} />

      {/* Breadcrumb */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px clamp(16px,5vw,64px)', fontSize: 13, color: 'rgba(0,0,0,0.4)' }}>
        <Link href="/" style={{ color: 'rgba(0,0,0,0.4)', textDecoration: 'none' }}>Inicio</Link>
        {' / '}
        <Link href={`/atencion-telefonica/${ciudad}`} style={{ color: 'rgba(0,0,0,0.4)', textDecoration: 'none' }}>{city.city}</Link>
        {' / '}
        <span>{sec.sector}</span>
      </div>

      {/* Hero */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(16px,5vw,64px) clamp(40px,6vw,60px)' }}>
        <span className="pill-label" style={{ marginBottom: 16, display: 'inline-block' }}>
          {sec.heroTag} en {city.city}
        </span>
        <h1>
          {sec.title.replace(/\.$/,'')} en <span className="serif-italic">{city.city}.</span>
        </h1>
        <p style={{ maxWidth: 700, marginBottom: 36 }}>
          {sec.heroSubtitle} Servicio disponible en {city.city} ({city.region}) con agentes nativos en español. Sin permanencia.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/reserva-llamada" className="btn-cta">
            Reserva una llamada
          </Link>
          <Link href={`/lp/${sector}`} style={{ border: '1px solid black', color: 'black', padding: 'var(--btn-padding)', borderRadius: 'var(--btn-border-radius)', fontSize: 'var(--btn-font-size)', fontWeight: 500, textDecoration: 'none' }}>
            Ver landing completa
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 clamp(16px,5vw,64px) clamp(40px,6vw,60px)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { value: '15s', label: 'Tiempo de respuesta' },
          { value: '98%', label: 'Tasa de respuesta' },
          { value: '48h', label: 'Activación' },
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

      {/* Contexto local: bloque unico escrito a mano en las combinaciones prioritarias,
          plantilla apoyada en datos reales de la ciudad en el resto. */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(16px,5vw,64px)', textAlign: 'center' }}>
        {highlight ? (
          <>
            <h2>
              {highlight.heading}<span className="serif-italic">.</span>
            </h2>
            <p style={{ maxWidth: 700, margin: '24px auto', lineHeight: 1.7 }}>{highlight.intro}</p>
            <p style={{ maxWidth: 700, margin: '0 auto', lineHeight: 1.7 }}>{highlight.angle}</p>
          </>
        ) : (
          <>
            <h2>
              Por qué {sec.sector.toLowerCase()} en {city.city} necesitan atención telefónica <span className="serif-italic">profesional.</span>
            </h2>
            <p style={{ maxWidth: 700, margin: '24px auto', lineHeight: 1.7 }}>
              {city.localContext}
            </p>
            <p style={{ maxWidth: 700, margin: '0 auto', lineHeight: 1.7 }}>
              {city.stats?.callsLost
                ? `En ${city.city} el patrón es conocido: ${city.stats.callsLost.toLowerCase()}. `
                : ''}
              Para los negocios del sector <strong>{sec.sector.toLowerCase()}</strong> en {city.city} ({city.region}), cada llamada perdida es un cliente que llama al siguiente de la lista. Atendemos todas las llamadas en nombre de tu empresa, con agentes formados específicamente en {sec.sector.toLowerCase()}.
            </p>
          </>
        )}
        {city.keySectors && city.keySectors.length > 0 && (
          <p style={{ maxWidth: 700, margin: '24px auto 0', lineHeight: 1.7, color: 'rgba(0,0,0,0.56)', fontSize: 15 }}>
            Trabajamos también con el resto del tejido empresarial de {city.city}: {city.keySectors.map(s => s.toLowerCase()).join(', ')}.
          </p>
        )}
      </section>

      {/* Social proof + testimonial */}
      {sec.testimonial && (
        <section style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(16px,5vw,64px)', textAlign: 'center' }}>
          <span className="pill-label" style={{ marginBottom: 16, display: 'inline-block' }}>Clientes</span>
          <h2 style={{ marginTop: 16 }}>
            Lo que dicen los {sec.sector.toLowerCase()} que nos <span className="serif-italic">usan.</span>
          </h2>
          {sec.socialProof && <p style={{ maxWidth: 700, margin: '24px auto 32px', lineHeight: 1.7 }}>{sec.socialProof}</p>}
          <div className="card" style={{ maxWidth: 600, margin: '0 auto', padding: 32, textAlign: 'center' }}>
            <p style={{ fontSize: 'clamp(14px,3.8vw,24px)', marginBottom: 12 }}>★★★★★</p>
            <p style={{ fontSize: 16, fontStyle: 'italic', color: 'black', lineHeight: 1.7, marginBottom: 20 }}>
              &ldquo;{(sec.testimonial as { quote: string; author: string; role: string }).quote}&rdquo;
            </p>
            <p style={{ fontWeight: 600, marginBottom: 4 }}>
              {(sec.testimonial as { quote: string; author: string; role: string }).author}
            </p>
            <p style={{ color: 'rgba(0,0,0,0.56)', marginBottom: 0 }}>
              {(sec.testimonial as { quote: string; author: string; role: string }).role}
            </p>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(16px,5vw,64px)', textAlign: 'center' }}>
          <span className="pill-label" style={{ marginBottom: 16, display: 'inline-block' }}>Preguntas</span>
          <h2 style={{ marginTop: 16 }}>
            Preguntas frecuentes sobre {sec.sector.toLowerCase()} en <span className="serif-italic">{city.city}.</span>
          </h2>
          <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 0, maxWidth: 800, margin: '32px auto 0', textAlign: 'left' }}>
            {faqs.map((faq, i) => (
              <details key={i} style={{ padding: '24px 0', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                <summary style={{ fontSize: 18, fontWeight: 500, cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'black' }}>
                  {faq.question}
                  <span style={{ fontSize: 24, fontWeight: 300 }}>+</span>
                </summary>
                <p style={{ marginTop: 16 }}>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ background: 'black', color: 'white', textAlign: 'center', padding: 'clamp(40px,8vw,80px) clamp(16px,5vw,64px)' }}>
        <h2 style={{ color: 'white' }}>
          Activa tu recepcionista en <span className="serif-italic">{city.city}.</span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 500, margin: '0 auto 32px' }}>
          Sin permanencia. Agentes nativos. Activación en 48 horas.
        </p>
        <a href="/reserva-llamada" style={{ display: 'inline-block', background: 'white', color: 'black', padding: 'var(--btn-padding)', borderRadius: 'var(--btn-border-radius)', fontSize: 'var(--btn-font-size)', fontWeight: 500, textDecoration: 'none' }}>
          Reserva una llamada gratuita
        </a>
      </section>
    </>
  )
}
