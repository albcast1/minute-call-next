import { apiJson } from '@/lib/api/errors'
import { OPENAPI_VERSION } from '@/lib/api/openapi'
import { OPENAPI_URL } from '@/lib/agent/site'

export const dynamic = 'force-static'

/** GET /api/v1/health */
export async function GET() {
  return apiJson(
    { status: 'ok' as const, version: OPENAPI_VERSION, openapi_url: OPENAPI_URL },
    { cacheControl: 'public, max-age=60' },
  )
}
