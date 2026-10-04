import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import sectors from '@/data/sectors.json'
import cities from '@/data/cities.json'
import { FAQPageSchema, BreadcrumbSchema, ServiceSchema } from '@/components/JsonLd'
import { BrandPage, Hero, Ed, Stats, Faq, Quote, CtaFinal } from '@/components/brand/Sections'
import highlights from '@/data/city-sector-highlights.json'
import indexables from '@/data/city-sector-indexables.json'
import { buildCitySectorMeta, pickHighlight, clientesDe, clientesSinArticulo } from '@/lib/seo/city-sector'

/**
 * Se prerenderizan las combinaciones con demanda demostrada, no un top 10x10
 * elegido a ojo. De las 100 que se generaban antes, la mayoria no recibia
 * ninguna impresion; estas 231 concentran el 91% del trafico de la ruta.
 */
export async function generateStaticParams() {
  return (indexables.indexables as string[]).map(par => {
    const [ciudad, sector] = par.split('/')
    return { ciudad, sector }
  })
}

export async function generateMetadata({ params }: { params: Promise<{ ciudad: string; sector: string }> }): Promise<Metadata> {
  const { ciudad, sector } = await params
  const city = cities.find(c => c.slug === ciudad)
  const sec = sectors.find(s => s.slug === sector)
  if (!city || !sec) return {}

  const { title, description } = buildCitySectorMeta(city, sec)

  // Solo pedimos indexacion de las combinaciones con demanda demostrada
  // (>=5 impresiones en 90 dias). El resto sigue accesible y transmitiendo
  // enlaces, pero deja de competir por presupuesto de rastreo y de diluir la
  // senal de calidad del dominio con 2.169 paginas casi identicas.
  const indexable = (indexables.indexables as string[]).includes(`${ciudad}/${sector}`)

  return {
    title,
    description,
    robots: indexable ? undefined : { index: false, follow: true },
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
  // `sec.sector` es el CLIENTE en 41 de 48 sectores ("clinicas"), no el servicio.
  // Estas dos formas dan la concordancia correcta en el cuerpo de la pagina.
  const clientes = clientesDe(sec)
  const clientesPlano = clientesSinArticulo(sec)
  const servicio = sec.servicio ?? sec.sector

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

      <BrandPage>
        <Hero
          crumbs={[
            { name: 'Inicio', url: '/' },
            { name: city.city, url: `/atencion-telefonica/${ciudad}` },
            { name: sec.sector, url: `/atencion-telefonica/${ciudad}/${sector}` },
          ]}
          tag={<>{servicio} en {city.city}</>}
          title={<>{servicio} en {city.city}.</>}
          sub={<>{sec.heroSubtitle} Servicio disponible en {city.city} ({city.region}) con agentes nativos en español. Sin permanencia.</>}
          secondary={{ href: `/lp/${sector}`, label: 'Ver landing completa' }}
        />

        <Ed tag="En cifras" flush>
          <Stats
            items={[
              { value: '15 s', label: 'Tiempo de respuesta' },
              { value: '98%', label: 'Tasa de respuesta' },
              { value: '48 h', label: 'Activación' },
              { value: '4,4', label: 'Trustpilot' },
            ]}
          />
        </Ed>

        {/* Contexto local: bloque unico escrito a mano en las combinaciones prioritarias,
            plantilla apoyada en datos reales de la ciudad en el resto. */}
        {highlight ? (
          <Ed tag="Contexto local" title={<>{highlight.heading}.</>} flush={false}>
            <p className="lead2">{highlight.intro}</p>
            <p className="lead2">{highlight.angle}</p>
            {city.keySectors && city.keySectors.length > 0 && (
              <p className="lead2">
                Trabajamos también con el resto del tejido empresarial de {city.city}: {city.keySectors.map(s => s.toLowerCase()).join(', ')}.
              </p>
            )}
          </Ed>
        ) : (
          <Ed tag="Contexto local" title={<>Por qué {clientes} de {city.city} necesitan atención telefónica profesional.</>} flush={false}>
            <p className="lead2">{city.localContext}</p>
            <p className="lead2">
              {city.stats?.callsLost
                ? `En ${city.city} el patrón es conocido: ${city.stats.callsLost.toLowerCase()}. `
                : ''}
              Para <strong>{clientes}</strong> de {city.city} ({city.region}), cada llamada perdida es un cliente que llama al siguiente de la lista. Atendemos todas las llamadas en nombre de tu empresa, con agentes formados específicamente para {clientesPlano}.
            </p>
            {city.keySectors && city.keySectors.length > 0 && (
              <p className="lead2">
                Trabajamos también con el resto del tejido empresarial de {city.city}: {city.keySectors.map(s => s.toLowerCase()).join(', ')}.
              </p>
            )}
          </Ed>
        )}

        {sec.testimonial && (
          <Ed tag="Clientes" title={<>Lo que dicen {clientes} que nos usan.</>}>
            {sec.socialProof && <p className="lead2">{sec.socialProof}</p>}
            <Quote
              quote={(sec.testimonial as { quote: string; author: string; role: string }).quote}
              author={(sec.testimonial as { quote: string; author: string; role: string }).author}
              role={(sec.testimonial as { quote: string; author: string; role: string }).role}
            />
          </Ed>
        )}

        {faqs.length > 0 && (
          <Ed tag="Preguntas" title={<>Preguntas frecuentes: {servicio.toLowerCase()} en {city.city}.</>}>
            <Faq items={faqs.map((f) => ({ q: f.question, a: f.answer ?? '' }))} />
          </Ed>
        )}

        <CtaFinal
          title={<>Activa tu recepcionista en {city.city}.</>}
          text="Sin permanencia. Agentes nativos. Activación en 48 horas."
          cta={{ label: 'Reserva una llamada gratuita' }}
        />
      </BrandPage>
    </>
  )
}
