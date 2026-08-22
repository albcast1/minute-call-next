import sectors from '@/data/sectors.json'
import cities from '@/data/cities.json'
import articles from '@/data/articles.json'
import { SITE_URL } from '@/lib/agent/site'

export type FaqEntry = { question: string; answer: string }

export type SectorSummary = {
  slug: string
  name: string
  title: string
  description: string
  url: string
}

export type CitySummary = {
  slug: string
  name: string
  region: string
  description: string
  url: string
}

export type ArticleSummary = {
  slug: string
  title: string
  excerpt: string
  url: string
  markdown_url: string
}

const normalise = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

export function sectorSummary(sector: (typeof sectors)[number]): SectorSummary {
  return {
    slug: sector.slug,
    name: sector.sector,
    title: sector.title.replace(/\.$/, ''),
    description: sector.metaDescription,
    url: `${SITE_URL}/lp/${sector.slug}`,
  }
}

export function sectorDetail(sector: (typeof sectors)[number]) {
  return {
    ...sectorSummary(sector),
    features: sector.features.map((f) => ({ title: f.title, description: f.description })),
    faq: sector.faq as FaqEntry[],
    markdown_url: `${SITE_URL}/lp/${sector.slug}.md`,
  }
}

export function citySummary(city: (typeof cities)[number]): CitySummary {
  return {
    slug: city.slug,
    name: city.city,
    region: city.region,
    description: city.metaDescription,
    url: `${SITE_URL}/atencion-telefonica/${city.slug}`,
  }
}

export function cityDetail(city: (typeof cities)[number]) {
  return {
    ...citySummary(city),
    local_context: city.localContext,
    top_sectors: city.topSectors.map((s) => ({
      slug: s.slug,
      name: s.title.replace(/\.$/, ''),
      title: s.title.replace(/\.$/, ''),
      description: `${s.title.replace(/\.$/, '')} en ${city.city}`,
      url: `${SITE_URL}/atencion-telefonica/${city.slug}/${s.slug}`,
    })),
    faq: city.faq as FaqEntry[],
    markdown_url: `${SITE_URL}/atencion-telefonica/${city.slug}.md`,
  }
}

export function articleSummary(article: (typeof articles)[number]): ArticleSummary {
  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    url: `${SITE_URL}/articulos/${article.slug}`,
    markdown_url: `${SITE_URL}/articulos/${article.slug}.md`,
  }
}

export function findSector(slug: string) {
  return sectors.find((s) => s.slug === slug)
}

export function findCity(slug: string) {
  return cities.find((c) => c.slug === slug)
}

export function findArticle(slug: string) {
  return articles.find((a) => a.slug === slug)
}

export function searchSectors(query: string | null) {
  if (!query) return sectors
  const q = normalise(query)
  return sectors.filter((s) => normalise(`${s.sector} ${s.slug} ${s.title}`).includes(q))
}

export function searchCities(query: string | null) {
  if (!query) return cities
  const q = normalise(query)
  return cities.filter((c) => normalise(`${c.city} ${c.region} ${c.slug}`).includes(q))
}

export const COUNTS = {
  sectors: sectors.length,
  cities: cities.length,
  articles: articles.length,
}

export { sectors, cities, articles }

/** Parse and validate a `limit` query parameter. */
export function parseLimit(raw: string | null, fallback = 50, max = 100):
  | { ok: true; value: number }
  | { ok: false; reason: string } {
  if (raw === null || raw === '') return { ok: true, value: fallback }
  const parsed = Number(raw)
  if (!Number.isInteger(parsed)) return { ok: false, reason: 'must be an integer' }
  if (parsed < 1 || parsed > max) return { ok: false, reason: `must be between 1 and ${max}` }
  return { ok: true, value: parsed }
}

export const SLUG_PATTERN = /^[a-z0-9-]{1,120}$/
