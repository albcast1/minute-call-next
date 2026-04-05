import { MetadataRoute } from 'next'
import sectors from '@/data/sectors.json'
import articles from '@/data/articles.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.minute-call.com'

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/sobre-nosotros`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/reserva-llamada`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/articulos`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/politica-privacidad`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/politica-cookies`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  const sectorPages = sectors.map((sector) => ({
    url: `${baseUrl}/lp/${sector.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const articlePages = articles.map((article) => ({
    url: `${baseUrl}/articulos/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...sectorPages, ...articlePages]
}
