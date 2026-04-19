import { MetadataRoute } from 'next'
import sectors from '@/data/sectors.json'
import articles from '@/data/articles.json'
import cities from '@/data/cities.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.minute-call.com'
  const now = new Date()

  const staticPages = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/sobre-nosotros`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/reserva-llamada`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/comparar`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/articulos`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/politica-privacidad`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/politica-cookies`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  const sectorPages = sectors.map((sector) => ({
    url: `${baseUrl}/lp/${sector.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const articlePages = articles.map((article) => ({
    url: `${baseUrl}/articulos/${article.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // All 50 cities included
  const cityPages = cities.map((city) => ({
    url: `${baseUrl}/atencion-telefonica/${city.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const TOP_CITY_SLUGS = ['madrid','barcelona','valencia','sevilla','malaga','bilbao','zaragoza','murcia','palma-de-mallorca','las-palmas']
  const TOP_SECTOR_SLUGS = ['recepcionista-ia-clinicas','recepcionista-ia-inmobiliarias','recepcionista-ia-restaurantes','recepcionista-ia-abogados','recepcionista-ia-clinicas-dentales','recepcionista-ia-asesorias','recepcionista-ia-veterinarias','recepcionista-ia-centros-estetica','recepcionista-ia-fisioterapia','recepcionista-ia-seguros']

  const sectorCityPages = TOP_CITY_SLUGS.flatMap(ciudad =>
    TOP_SECTOR_SLUGS.map(sector => ({
      url: `${baseUrl}/atencion-telefonica/${ciudad}/${sector}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  return [
    ...staticPages,
    ...sectorCityPages,
    ...sectorPages,
    ...articlePages,
    ...cityPages,
  ]
}
