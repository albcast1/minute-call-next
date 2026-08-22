import { buildOpenApiDocument } from '@/lib/api/openapi'

export const dynamic = 'force-static'

/** GET /api/openapi.json - alias of /openapi.json. */
export async function GET() {
  return new Response(JSON.stringify(buildOpenApiDocument(), null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      Vary: 'Accept, Accept-Encoding',
    },
  })
}
