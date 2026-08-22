import { apiError, apiJson } from '@/lib/api/errors'
import { cityDetail, findCity, SLUG_PATTERN } from '@/lib/api/resources'
import { API_BASE } from '@/lib/agent/site'

/** GET /api/v1/cities/{slug} */
export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params

  if (!SLUG_PATTERN.test(slug)) {
    return apiError('validation_error', 'The `slug` path parameter is invalid.', {
      details: [{ field: 'slug', reason: 'must match ^[a-z0-9-]+$' }],
    })
  }

  const city = findCity(slug)
  if (!city) {
    return apiError('not_found', `No city with slug "${slug}".`, {
      hint: `List the available cities with GET ${API_BASE}/cities.`,
    })
  }

  return apiJson(cityDetail(city))
}
