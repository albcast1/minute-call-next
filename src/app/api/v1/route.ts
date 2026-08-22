import { apiJson } from '@/lib/api/errors'
import { buildOpenApiDocument, OPENAPI_VERSION } from '@/lib/api/openapi'
import { AGENT_INSTRUCTIONS_URL, API_BASE, DOCS_URL, OPENAPI_URL, SITE_NAME } from '@/lib/agent/site'

export const dynamic = 'force-static'

/** GET /api/v1 - operation index, the discovery entry point for agents. */
export async function GET() {
  const doc = buildOpenApiDocument()
  const operations = Object.entries(doc.paths).flatMap(([path, methods]) =>
    Object.entries(methods as unknown as Record<string, { operationId: string; summary: string }>).map(
      ([method, operation]) => ({
        operationId: operation.operationId,
        method: method.toUpperCase(),
        path: `${API_BASE}${path === '/' ? '' : path}`,
        summary: operation.summary,
      }),
    ),
  )

  return apiJson({
    name: `${SITE_NAME} Public API`,
    version: OPENAPI_VERSION,
    documentation_url: DOCS_URL,
    openapi_url: OPENAPI_URL,
    agent_instructions_url: AGENT_INSTRUCTIONS_URL,
    operations,
  })
}
