import { MetadataRoute } from 'next'
import sectors from '@/data/sectors.json'
import cities from '@/data/cities.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.minute-call.com'
  const now = new Date().toISOString()

  const TOP_CITY_SLUGS = ['madrid','barcelona','valencia','sevilla','malaga','bilbao','zaragoza','murcia','palma-de-mallorca','las-palmas']
  const TOP_SECTOR_SLUGS = ['recepcionista-ia-clinicas','recepcionista-ia-abogados','recepcionista-ia-asesorias','recepcionista-ia-inmobiliarias','recepcionista-ia-restaurantes','recepcionista-ia-veterinarias','recepcionista-ia-seguros','recepcionista-ia-consultoria','recepcionista-ia-clinicas-dentales','recepcionista-ia-fisioterapia']

  const staticPages = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/sobre-nosotros`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/reserva-llamada`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/comparar`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/calculadora-roi`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/articulos`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
  ]

  const sectorPages = sectors.map(sector => ({
    url: `${baseUrl}/lp/${sector.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const articlePages = sectors.map(sector => ({
    url: `${baseUrl}/articulos/${sector.slug}`,
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

  // Top 10 ciudades × top 10 sectores — priority alta (contenido más trabajado)
  const topSectorCityPages = TOP_CITY_SLUGS.flatMap(ciudad =>
    TOP_SECTOR_SLUGS.map(sector => ({
      url: `${baseUrl}/atencion-telefonica/${ciudad}/${sector}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  // Resto de combinaciones ciudad×sector — priority baja (descubrimiento por Google)
  const allTopCitySet = new Set(TOP_CITY_SLUGS)
  const allTopSectorSet = new Set(TOP_SECTOR_SLUGS)
  const remainingSectorCityPages = cities.flatMap(city =>
    sectors
      .filter(sector => !(allTopCitySet.has(city.slug) && allTopSectorSet.has(sector.slug)))
      .map(sector => ({
        url: `${baseUrl}/atencion-telefonica/${city.slug}/${sector.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.3,
      }))
  )

  return [
    ...staticPages,
    ...topSectorCityPages,
    ...remainingSectorCityPages,
    ...sectorPages,
    ...articlePages,
    ...cityPages,
  ]
}
