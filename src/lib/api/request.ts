import { NextResponse } from 'next/server'
import { apiError } from './errors'

export const MAX_BODY_BYTES = 64 * 1024

/**
 * Read a JSON request body, enforcing the content type and a size ceiling.
 * Returns either the parsed value or a ready-to-return error response.
 */
export async function readJsonBody(
  request: Request,
): Promise<{ ok: true; value: unknown } | { ok: false; response: NextResponse }> {
  const contentType = request.headers.get('content-type') ?? ''
  if (contentType && !contentType.toLowerCase().includes('application/json')) {
    return {
      ok: false,
      response: apiError('unsupported_media_type', 'This endpoint only accepts application/json.'),
    }
  }

  const declaredLength = Number(request.headers.get('content-length') ?? '0')
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return { ok: false, response: apiError('payload_too_large', 'Request body is larger than 64 KB.') }
  }

  let raw: string
  try {
    raw = await request.text()
  } catch {
    return { ok: false, response: apiError('bad_request', 'Could not read the request body.') }
  }

  if (raw.length > MAX_BODY_BYTES) {
    return { ok: false, response: apiError('payload_too_large', 'Request body is larger than 64 KB.') }
  }
  if (raw.trim() === '') {
    return { ok: false, response: apiError('bad_request', 'Request body is empty.') }
  }

  try {
    return { ok: true, value: JSON.parse(raw) }
  } catch {
    return { ok: false, response: apiError('bad_request', 'Request body is not valid JSON.') }
  }
}

/** Escape a user-supplied string before interpolating it into an HTML email. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Best-effort client identifier for rate limiting behind Vercel's proxy. */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') ?? 'unknown'
}

type Bucket = { count: number; resetAt: number }
const buckets = new Map<string, Bucket>()

/**
 * Best-effort in-memory rate limiter. Serverless instances are not shared, so
 * this throttles a single abusive caller rather than guaranteeing a global cap.
 */
export function rateLimit(
  key: string,
  { limit, windowMs, now = Date.now() }: { limit: number; windowMs: number; now?: number },
): { allowed: boolean; retryAfterSeconds: number } {
  const bucket = buckets.get(key)
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, retryAfterSeconds: 0 }
  }
  if (bucket.count >= limit) {
    return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)) }
  }
  bucket.count += 1
  return { allowed: true, retryAfterSeconds: 0 }
}

/** Test seam: drop all rate-limit state. */
export function resetRateLimits() {
  buckets.clear()
}
