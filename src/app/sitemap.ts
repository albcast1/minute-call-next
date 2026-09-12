import { MetadataRoute } from 'next'
import sectors from '@/data/sectors.json'
import cities from '@/data/cities.json'
import articles from '@/data/articles.json'
import indexables from '@/data/city-sector-indexables.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.minute-call.com'
  const now = new Date().toISOString()

  const TOP_CITY_SLUGS = ['madrid','barcelona','valencia','sevilla','malaga','bilbao','zaragoza','murcia','palma-de-mallorca','las-palmas']
  const TOP_SECTOR_SLUGS = ['recepcionista-ia-clinicas','recepcionista-ia-abogados','recepcionista-ia-asesorias','recepcionista-ia-inmobiliarias','recepcionista-ia-restaurantes','recepcionista-ia-veterinarias','recepcionista-ia-seguros','recepcionista-ia-consultoria','recepcionista-ia-clinicas-dentales','recepcionista-ia-fisioterapia']

  const staticPages = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/precios`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/sobre-nosotros`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/reserva-llamada`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/comparar`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/calculadora-roi`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/articulos`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/docs`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/aviso-legal`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.4 },
    { url: `${baseUrl}/politica-privacidad`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.4 },
    { url: `${baseUrl}/politica-cookies`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  const sectorPages = sectors.map(sector => ({
    url: `${baseUrl}/lp/${sector.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const articlePages = articles.map(article => ({
    url: `${baseUrl}/articulos/${article.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const cityPages = cities.map(city => ({
    url: `${baseUrl}/atencion-telefonica/${city.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Paginas ciudad x sector: solo las que tienen demanda demostrada.
  //
  // De las 2.400 combinaciones, 231 concentran el 91% de las impresiones
  // (>=5 impresiones en 90 dias, Search Console 12/09/2026). Las otras 2.169
  // no aportan trafico y diluyen la senal de calidad del dominio, que es el
  // patron de doorway pages que senalaba la auditoria. Salen del sitemap y
  // pasan a noindex,follow en la propia pagina; no se borra ninguna.
  const indexableSet = new Set(indexables.indexables)
  const TOP = new Set(
    TOP_CITY_SLUGS.flatMap(c => TOP_SECTOR_SLUGS.map(s => `${c}/${s}`))
  )
  const sectorCityPages = [...indexableSet].map(par => ({
    url: `${baseUrl}/atencion-telefonica/${par}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    // Las que ademas estaban en el grupo prioritario mantienen prioridad alta.
    priority: TOP.has(par) ? 0.8 : 0.6,
  }))

  return [
    ...staticPages,
    ...sectorCityPages,
    ...sectorPages,
    ...articlePages,
    ...cityPages,
  ]
}
