import { NextRequest, NextResponse } from 'next/server'
import { negotiateDocument, withAcceptVary } from '@/lib/agent/accept'

/**
 * Next.js Proxy (the file convention that replaced `middleware` in Next 16).
 *
 * Content negotiation for agents (acceptmarkdown.com):
 *  - `Accept: text/markdown` (honouring q-values) is served the Markdown variant
 *  - `<path>.md` always serves the Markdown variant
 *  - every response advertises `Vary: Accept, Accept-Encoding`
 *  - an Accept header that matches nothing we can serve gets a 406
 */

const SKIP_EXACT = new Set(['/api', '/md'])
const SKIP_PREFIXES = ['/_next/', '/api/', '/md/', '/md?']
const STATIC_FILE = /\.[a-z0-9]+$/i
/** Markdown files that are served verbatim from /public and must not be rewritten. */
const STATIC_MARKDOWN = new Set(['/agent-instructions.md', '/llms.txt', '/llms-full.txt'])

function markdownRewrite(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone()
  url.pathname = '/md'
  url.search = ''
  url.searchParams.set('path', pathname)
  const response = NextResponse.rewrite(url)
  response.headers.set('Vary', 'Accept, Accept-Encoding')
  return response
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only safe, read-only document requests are negotiated. Form posts and
  // Server Function calls are left completely untouched.
  const isReadRequest = request.method === 'GET' || request.method === 'HEAD'

  if (
    !isReadRequest ||
    SKIP_EXACT.has(pathname) ||
    SKIP_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  ) {
    return NextResponse.next()
  }

  // Files shipped in /public keep their own content, only the Vary header is added.
  if (STATIC_MARKDOWN.has(pathname.toLowerCase())) {
    const verbatim = NextResponse.next()
    verbatim.headers.set('Vary', withAcceptVary(verbatim.headers.get('Vary')))
    return verbatim
  }

  // Explicit `.md` URLs always resolve to Markdown.
  if (pathname.toLowerCase().endsWith('.md')) {
    return markdownRewrite(request, pathname)
  }

  // Leave real static assets (images, fonts, txt, xml...) alone.
  if (STATIC_FILE.test(pathname)) {
    const passthrough = NextResponse.next()
    passthrough.headers.set('Vary', withAcceptVary(passthrough.headers.get('Vary')))
    return passthrough
  }

  const negotiation = negotiateDocument(request.headers.get('accept'))

  if (negotiation.outcome === 'markdown') {
    return markdownRewrite(request, pathname)
  }

  if (negotiation.outcome === 'not-acceptable') {
    return NextResponse.json(
      {
        error: 'No acceptable representation for the requested media types.',
        code: 'not_acceptable',
        message: 'No acceptable representation for the requested media types.',
        hint: 'Send `Accept: text/html`, `text/markdown` or `*/*`.',
        status: 406,
        documentation_url: 'https://www.minute-call.com/docs',
      },
      {
        status: 406,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Vary: 'Accept, Accept-Encoding',
          'Cache-Control': 'no-store',
        },
      },
    )
  }

  // HTML variant: advertise the Markdown alternate so agents can discover it.
  const response = NextResponse.next()
  response.headers.set('Vary', withAcceptVary(response.headers.get('Vary')))
  response.headers.append(
    'Link',
    `<${pathname === '/' ? '/index.md' : `${pathname}.md`}>; rel="alternate"; type="text/markdown"`,
  )
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}
