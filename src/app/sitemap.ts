import { MetadataRoute } from 'next'
import sectors from '@/data/sectors.json'
import articles from '@/data/articles.json'
import cities from '@/data/cities.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.minute-call.com'

  const staticPages = [
    { url: baseUrl, lastModified: new Date('2025-04-06'), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/sobre-nosotros`, lastModified: new Date('2025-04-06'), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/reserva-llamada`, lastModified: new Date('2025-04-06'), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/articulos`, lastModified: new Date('2025-04-06'), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/politica-privacidad`, lastModified: new Date('2025-04-06'), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/politica-cookies`, lastModified: new Date('2025-04-06'), changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  const sectorPages = sectors.map((sector) => ({
    url: `${baseUrl}/lp/${sector.slug}`,
    lastModified: new Date('2025-04-06'),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const articlePages = articles.map((article) => ({
    url: `${baseUrl}/articulos/${article.slug}`,
    lastModified: new Date('2025-04-06'),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const cityPages = cities.map((city) => ({
    url: `${baseUrl}/atencion-telefonica/${city.slug}`,
    lastModified: new Date('2025-04-06'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...sectorPages, ...articlePages, ...cityPages]
}
