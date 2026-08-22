import { apiError } from '@/lib/api/errors'
import { API_BASE, OPENAPI_URL } from '@/lib/agent/site'

export const dynamic = 'force-dynamic'

/**
 * Catch-all for unknown /api/* paths. Static API routes take precedence, so
 * this only runs for paths that genuinely do not exist - and it answers with a
 * real 404 carrying a structured JSON body instead of the HTML app shell.
 */
function notFound(pathname: string) {
  return apiError('not_found', `No API endpoint at ${pathname}.`, {
    hint: `Discover the available operations at GET ${API_BASE} or read ${OPENAPI_URL}.`,
  })
}

export async function GET(request: Request) {
  return notFound(new URL(request.url).pathname)
}
export const POST = GET
export const PUT = GET
export const PATCH = GET
export const DELETE = GET
export const HEAD = GET
export const OPTIONS = GET
