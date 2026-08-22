import { apiError, apiJson } from '@/lib/api/errors'
import { findSector, sectorDetail, SLUG_PATTERN } from '@/lib/api/resources'
import { API_BASE } from '@/lib/agent/site'

/** GET /api/v1/sectors/{slug} */
export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params

  if (!SLUG_PATTERN.test(slug)) {
    return apiError('validation_error', 'The `slug` path parameter is invalid.', {
      details: [{ field: 'slug', reason: 'must match ^[a-z0-9-]+$' }],
    })
  }

  const sector = findSector(slug)
  if (!sector) {
    return apiError('not_found', `No sector with slug "${slug}".`, {
      hint: `List the available sectors with GET ${API_BASE}/sectors.`,
    })
  }

  return apiJson(sectorDetail(sector))
}
