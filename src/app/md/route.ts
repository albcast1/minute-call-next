import { NextRequest } from 'next/server'
import { renderMarkdown } from '@/lib/agent/markdown'
import { DOCS_URL, LLMS_URL, OPENAPI_URL, SITEMAP_URL } from '@/lib/agent/site'

export const dynamic = 'force-dynamic'

/**
 * Markdown representation of any page.
 *
 * Reached either directly (`/md?path=/lp/recepcionista-ia-clinicas`), through a
 * `.md` URL, or through the Accept-header rewrite in middleware. Unknown paths
 * return a real 404 with a short Markdown recovery body.
 */
export async function GET(request: NextRequest) {
  const requested = request.nextUrl.searchParams.get('path') ?? '/'
  const document = renderMarkdown(requested)

  return new Response(document.body, {
    status: document.status,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Language': 'es',
      Vary: 'Accept, Accept-Encoding',
      'Cache-Control':
        document.status === 200
          ? 'public, max-age=300, s-maxage=3600'
          : 'no-store',
      Link: [
        `<${SITEMAP_URL}>; rel="sitemap"; type="application/xml"`,
        `<${LLMS_URL}>; rel="alternate"; type="text/plain"`,
        `<${OPENAPI_URL}>; rel="service-desc"; type="application/json"`,
        `<${DOCS_URL}>; rel="help"`,
      ].join(', '),
      'X-Robots-Tag': 'noindex',
    },
  })
}

export const HEAD = GET
