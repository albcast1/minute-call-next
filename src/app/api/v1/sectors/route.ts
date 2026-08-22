import { NextRequest } from 'next/server'
import { apiError, apiJson } from '@/lib/api/errors'
import { parseLimit, searchSectors, sectorSummary } from '@/lib/api/resources'

/** GET /api/v1/sectors - industries covered, optionally filtered. */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const query = params.get('q')

  if (query !== null && query.length > 100) {
    return apiError('validation_error', 'The `q` parameter is too long.', {
      details: [{ field: 'q', reason: 'must be at most 100 characters' }],
    })
  }

  const limit = parseLimit(params.get('limit'))
  if (!limit.ok) {
    return apiError('validation_error', 'The `limit` parameter is invalid.', {
      details: [{ field: 'limit', reason: limit.reason }],
    })
  }

  const matches = searchSectors(query)
  return apiJson({
    count: Math.min(matches.length, limit.value),
    total: matches.length,
    items: matches.slice(0, limit.value).map(sectorSummary),
  })
}
