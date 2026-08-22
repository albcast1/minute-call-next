/**
 * Pure, dependency-free shape of the JSON error envelope.
 * Kept apart from `errors.ts` (which pulls in next/server) so it can be unit
 * tested with the plain Node test runner.
 */

export type ApiErrorCode =
  | 'bad_request'
  | 'validation_error'
  | 'not_found'
  | 'method_not_allowed'
  | 'not_acceptable'
  | 'unsupported_media_type'
  | 'payload_too_large'
  | 'rate_limited'
  | 'service_unavailable'
  | 'internal_error'

export type ApiErrorDetail = { field?: string; reason: string }

export type ApiErrorBody = {
  /** Human-readable message. Kept as a plain string for backwards compatibility. */
  error: string
  /** Stable, machine-readable error code. */
  code: ApiErrorCode
  /** Same text as `error`, under the conventional key. */
  message: string
  /** What the caller should do next. */
  hint: string
  /** Per-field problems, when the error came from validation. */
  details?: ApiErrorDetail[]
  /** HTTP status, repeated in the body so buffered clients can read it. */
  status: number
  /** Where to read about this endpoint. */
  documentation_url: string
}

export const API_ERROR_STATUS: Record<ApiErrorCode, number> = {
  bad_request: 400,
  validation_error: 422,
  not_found: 404,
  method_not_allowed: 405,
  not_acceptable: 406,
  unsupported_media_type: 415,
  payload_too_large: 413,
  rate_limited: 429,
  service_unavailable: 503,
  internal_error: 500,
}

export const API_ERROR_HINTS: Record<ApiErrorCode, string> = {
  bad_request: 'Check the request body against the published OpenAPI schema.',
  validation_error: 'Fix the fields listed in `details` and retry.',
  not_found: 'This path does not exist. Read the OpenAPI document for the full list of operations.',
  method_not_allowed: 'Use one of the HTTP methods documented for this path.',
  not_acceptable: 'Send `Accept: application/json`, `text/markdown` or `text/html`.',
  unsupported_media_type: 'Send the body as `Content-Type: application/json`.',
  payload_too_large: 'Reduce the request body below 64 KB and retry.',
  rate_limited: 'Wait for the interval in the Retry-After header, then retry.',
  service_unavailable: 'The upstream service is unavailable. Retry later.',
  internal_error: 'Unexpected server error. Retry, and report it if it persists.',
}

export function buildApiErrorBody(
  code: ApiErrorCode,
  message: string,
  documentationUrl: string,
  options: { hint?: string; details?: ApiErrorDetail[] } = {},
): ApiErrorBody {
  const body: ApiErrorBody = {
    error: message,
    code,
    message,
    hint: options.hint ?? API_ERROR_HINTS[code],
    status: API_ERROR_STATUS[code],
    documentation_url: documentationUrl,
  }
  if (options.details && options.details.length > 0) body.details = options.details
  return body
}
