import { buildOpenApiDocument } from '@/lib/api/openapi'
import { toYaml } from '@/lib/api/yaml'

export const dynamic = 'force-static'

/** GET /api/openapi.yaml - YAML rendering of the same specification. */
export async function GET() {
  return new Response(toYaml(buildOpenApiDocument()), {
    status: 200,
    headers: {
      'Content-Type': 'application/yaml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      Vary: 'Accept, Accept-Encoding',
    },
  })
}
