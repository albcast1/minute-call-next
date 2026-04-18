import { Metadata } from 'next'
import Link from 'next/link'
import sectors from '@/data/sectors.json'
import cities from '@/data/cities.json'
import { FAQPageSchema, BreadcrumbSchema, ServiceSchema } from '@/components/JsonLd'

// Top 10 cities x top 10 sectors = 100 pages
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
  const title = `${sec.title} en ${city.city} | minute call`
  const description = `Servicio de recepcionista virtual para ${sec.sector} en ${city.city}. Agentes nativos o IA. Sin permanencia. Activa en 48h. Desde 250 euros/mes.`
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
  if (!city || !sec) return <div>Pagina no encontrada</div>

  const faqs = sec.faq?.slice(4, 9) || []
  const breadcrumbs = [
    { name: 'Inicio', url: 'https://www.minute-call.com' },
    { name: `Atencion telefonica en ${city.city}`, url: `https://www.minute-call.com/atencion-telefonica/${ciudad}` },
    { name: sec.title, url: `https://www.minute-call.com/atencion-telefonica/${ciudad}/${sector}` },
  ]

  return (
    <>
      <FAQPageSchema faqs={faqs.map(f => ({ question: f.question, answer: f.answer ?? '' }))} />
      <BreadcrumbSchema items={breadcrumbs} />
      <ServiceSchema services={[{ name: sec.title, description: sec.heroSubtitle }]} />
      <main>
        {/* Hero */}
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px 48px' }}>
          <div style={{ fontSize: 13, color: '#888', marginBottom: 12 }}>
            <Link href="/" style={{ color: '#888', textDecoration: 'none' }}>Inicio</Link>
            {' / '}
            <Link href={`/atencion-telefonica/${ciudad}`} style={{ color: '#888', textDecoration: 'none' }}>{city.city}</Link>
            {' / '}
            <span>{sec.sector}</span>
          </div>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
            {sec.heroTag} en {city.city}
          </p>
          <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, marginBottom: 20, lineHeight: 1.15 }}>
            {sec.title} en {city.city}
          </h1>
          <p style={{ fontSize: 18, color: '#555', marginBottom: 36, lineHeight: 1.6, maxWidth: 700 }}>
            {sec.heroSubtitle} Servicio disponible en {city.city} ({city.region}) con agentes nativos en espanol. Sin permanencia.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="/reserva-llamada" style={{ background: '#000', color: '#fff', padding: '14px 28px', borderRadius: 999, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
              Reserva una llamada &rarr;
            </a>
            <a href={`/lp/${sector}`} style={{ border: '1px solid #000', color: '#000', padding: '14px 28px', borderRadius: 999, fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>
              Ver landing completa
            </a>
          </div>
        </div>

        {/* Stats */}
        <div style={{ borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0', padding: '24px', display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}><div style={{ fontSize: 28, fontWeight: 700 }}>15s</div><div style={{ fontSize: 13, color: '#888' }}>Tiempo de respuesta</div></div>
          <div style={{ textAlign: 'center' }}><div style={{ fontSize: 28, fontWeight: 700 }}>98%</div><div style={{ fontSize: 13, color: '#888' }}>Tasa de respuesta</div></div>
          <div style={{ textAlign: 'center' }}><div style={{ fontSize: 28, fontWeight: 700 }}>48h</div><div style={{ fontSize: 13, color: '#888' }}>Activacion</div></div>
          <div style={{ textAlign: 'center' }}><div style={{ fontSize: 28, fontWeight: 700 }}>5.0</div><div style={{ fontSize: 13, color: '#888' }}>Trustpilot</div></div>
        </div>

        {/* Local context */}
        <div style={{ maxWidth: 900, margin: '64px auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 16 }}>Por que {sec.sector} en {city.city} necesitan atencion telefonica profesional</h2>
          <p style={{ color: '#555', lineHeight: 1.7, fontSize: 16, marginBottom: 24 }}>
            {city.localContext}
          </p>
          <p style={{ color: '#555', lineHeight: 1.7, fontSize: 16 }}>
            Para los negocios del sector <strong>{sec.sector}</strong> en {city.city}, cada llamada perdida puede significar un cliente menos. Minute Call garantiza que todas las llamadas se atiendan en nombre de tu empresa, con agentes formados especificamente en {sec.sector.toLowerCase()}.
          </p>
        </div>

        {/* Social proof + testimonial - unique per sector */}
        {sec.testimonial && (
          <div style={{ background: '#f9f9f9', padding: '64px 24px' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 32 }}>Lo que dicen los {sec.sector} que nos usan</h2>
              {sec.socialProof && <p style={{ fontSize: 16, color: '#555', marginBottom: 32, lineHeight: 1.7 }}>{sec.socialProof}</p>}
              <div style={{ background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #e5e5e5', maxWidth: 600 }}>
                <div style={{ fontSize: 24, marginBottom: 12 }}>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <p style={{ fontSize: 16, fontStyle: 'italic', color: '#333', lineHeight: 1.7, marginBottom: 20 }}>"{(sec.testimonial as { quote: string; author: string; role: string }).quote}"</p>
                <p style={{ fontWeight: 700, fontSize: 14 }}>{(sec.testimonial as { quote: string; author: string; role: string }).author}</p>
                <p style={{ fontSize: 13, color: '#888' }}>{(sec.testimonial as { quote: string; author: string; role: string }).role}</p>
              </div>
            </div>
          </div>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <div style={{ maxWidth: 800, margin: '64px auto', padding: '0 24px' }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 32 }}>Preguntas frecuentes — {sec.sector} en {city.city}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: 20 }}>
                  <h3 style={{ fontWeight: 600, marginBottom: 8, fontSize: 15 }}>{faq.question}</h3>
                  <p style={{ color: '#555', fontSize: 14, lineHeight: 1.6 }}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{ background: '#000', color: '#fff', textAlign: 'center', padding: '64px 24px', marginTop: 64 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Activa tu recepcionista en {city.city}</h2>
          <p style={{ color: '#aaa', marginBottom: 32 }}>Sin permanencia. Agentes nativos. Desde 250 euros/mes.</p>
          <a href="/reserva-llamada" style={{ background: '#fff', color: '#000', padding: '14px 32px', borderRadius: 999, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
            Reserva una llamada gratuita &rarr;
          </a>
        </div>
      </main>
    </>
  )
}
