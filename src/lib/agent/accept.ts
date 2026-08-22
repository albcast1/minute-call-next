/**
 * Accept-header content negotiation helpers (RFC 9110 §12.5.1).
 *
 * Used to implement the acceptmarkdown.com contract:
 *  1. serve Markdown when the client asks for `text/markdown`
 *  2. always advertise `Vary: Accept`
 *  3. answer `406` when no offered representation is acceptable
 *  4. honour q-values
 */

export type MediaRange = {
  type: string
  subtype: string
  q: number
}

/** Parse an Accept header into media ranges ordered by descending q-value. */
export function parseAccept(header: string | null | undefined): MediaRange[] {
  if (!header) return []
  return header
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const [rawRange, ...params] = part.split(';').map((p) => p.trim())
      const [type = '', subtype = ''] = rawRange.toLowerCase().split('/')
      const qParam = params.find((p) => p.toLowerCase().startsWith('q='))
      const parsed = qParam ? Number.parseFloat(qParam.slice(2)) : Number.NaN
      const q = Number.isFinite(parsed) ? Math.min(Math.max(parsed, 0), 1) : 1
      return { type, subtype, q }
    })
    .filter((range) => range.type !== '' && range.subtype !== '')
    .sort((a, b) => b.q - a.q)
}

/** Highest q-value the Accept header grants to a concrete media type. */
export function qualityFor(ranges: MediaRange[], mediaType: string): number {
  const [type, subtype] = mediaType.toLowerCase().split('/')
  let best = 0
  for (const range of ranges) {
    const typeMatches = range.type === '*' || range.type === type
    const subtypeMatches = range.subtype === '*' || range.subtype === subtype
    if (typeMatches && subtypeMatches && range.q > best) best = range.q
  }
  return best
}

export const MARKDOWN_TYPES = ['text/markdown', 'text/x-markdown', 'text/plain'] as const
/**
 * `text/x-component` is how the App Router asks for an RSC payload during client
 * navigations. It must always resolve to the normal (non-Markdown) response, and
 * it must never be treated as unacceptable.
 */
export const HTML_TYPES = ['text/html', 'application/xhtml+xml', 'text/x-component'] as const

export type Negotiation =
  | { outcome: 'html' }
  | { outcome: 'markdown' }
  | { outcome: 'not-acceptable' }

/**
 * Decide which representation to serve for a document request.
 *
 * - No Accept header (or `*​/*`) keeps the existing HTML behaviour.
 * - `text/markdown` (or `text/plain`) strictly above HTML wins.
 * - `text/plain` alone only wins when it is explicitly requested, never via `*​/*`.
 * - Nothing acceptable at all -> 406.
 */
export function negotiateDocument(acceptHeader: string | null | undefined): Negotiation {
  const ranges = parseAccept(acceptHeader)
  if (ranges.length === 0) return { outcome: 'html' }

  const markdownQ = Math.max(...MARKDOWN_TYPES.map((t) => qualityFor(ranges, t)))
  const htmlQ = Math.max(...HTML_TYPES.map((t) => qualityFor(ranges, t)))

  if (markdownQ === 0 && htmlQ === 0) return { outcome: 'not-acceptable' }
  if (markdownQ > htmlQ) return { outcome: 'markdown' }
  return { outcome: 'html' }
}

/** Merge `Accept` into an existing Vary header without duplicating entries. */
export function withAcceptVary(existing: string | null | undefined): string {
  const entries = (existing ?? '')
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean)
  const lower = entries.map((v) => v.toLowerCase())
  if (!lower.includes('accept')) entries.push('Accept')
  if (!lower.includes('accept-encoding')) entries.push('Accept-Encoding')
  return entries.join(', ')
}
