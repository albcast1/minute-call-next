import { MetadataRoute } from 'next'
import sectors from '@/data/sectors.json'
import articles from '@/data/articles.json'
import cities from '@/data/cities.json'

// Top 10 ciudades españolas por PIB/empresas: se priorizan en el sitemap.
// El resto de ciudades siguen accesibles pero no se declaran al crawler.
const TOP_CITY_SLUGS = [
  'madrid',
  'barcelona',
  'valencia',
  'sevilla',
  'zaragoza',
  'malaga',
  'bilbao',
  'murcia',
  'palma-de-mallorca',
  'las-palmas',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.minute-call.com'
  const now = new Date()

  const staticPages = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/sobre-nosotros`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/reserva-llamada`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articulos`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/politica-privacidad`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politica-cookies`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
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

  // Solo las 10 ciudades principales, no las 50 completas.
  const cityPages = cities
    .filter((c) => TOP_CITY_SLUGS.includes(c.slug))
    .map((city) => ({
      url: `${baseUrl}/atencion-telefonica/${city.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  // NOTA SEO: 45 sectores × 50 ciudades = 2.250 URLs cuasi-idénticas = doorway pages
  // que Google penaliza (Helpful Content Update). Las páginas siguen existiendo para
  // campañas SEM, pero NO se declaran al crawler y llevan noindex (ver page.tsx).

  return [
    ...staticPages,
    ...sectorPages,
    ...articlePages,
    ...cityPages,
  ]
}
