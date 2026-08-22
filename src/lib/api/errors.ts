import { NextResponse } from 'next/server'
import { DOCS_URL, OPENAPI_URL } from '@/lib/agent/site'
import {
  API_ERROR_HINTS,
  API_ERROR_STATUS,
  buildApiErrorBody,
  type ApiErrorBody,
  type ApiErrorCode,
  type ApiErrorDetail,
} from './error-shape'

export type { ApiErrorBody, ApiErrorCode, ApiErrorDetail }
export { API_ERROR_STATUS as apiErrorStatus }

/** Hints that can point at a concrete URL once the site constants are available. */
const CONTEXTUAL_HINTS: Partial<Record<ApiErrorCode, string>> = {
  bad_request: `Check the request body against the schema in ${OPENAPI_URL}.`,
  not_found: `This path does not exist. The full list of operations is in ${OPENAPI_URL}.`,
  method_not_allowed: `Use one of the HTTP methods documented for this path in ${OPENAPI_URL}.`,
  service_unavailable: `The upstream service is unavailable. Retry later or contact us at ${DOCS_URL}.`,
  internal_error: `Unexpected server error. Retry, and report it via ${DOCS_URL} if it persists.`,
}

export function apiErrorBody(
  code: ApiErrorCode,
  message: string,
  options: { hint?: string; details?: ApiErrorDetail[]; documentationUrl?: string } = {},
): ApiErrorBody {
  return buildApiErrorBody(code, message, options.documentationUrl ?? DOCS_URL, {
    hint: options.hint ?? CONTEXTUAL_HINTS[code] ?? API_ERROR_HINTS[code],
    details: options.details,
  })
}

export function apiError(
  code: ApiErrorCode,
  message: string,
  options: {
    hint?: string
    details?: ApiErrorDetail[]
    documentationUrl?: string
    headers?: Record<string, string>
  } = {},
): NextResponse<ApiErrorBody> {
  return NextResponse.json(apiErrorBody(code, message, options), {
    status: API_ERROR_STATUS[code],
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      Vary: 'Accept, Accept-Encoding',
      ...options.headers,
    },
  })
}

/** Success responses get the same header treatment so CDNs key on Accept too. */
export function apiJson<T>(
  data: T,
  options: { status?: number; cacheControl?: string; headers?: Record<string, string> } = {},
): NextResponse<T> {
  return NextResponse.json(data, {
    status: options.status ?? 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': options.cacheControl ?? 'public, max-age=300, s-maxage=3600',
      Vary: 'Accept, Accept-Encoding',
      ...options.headers,
    },
  })
}
