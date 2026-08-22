import test from 'node:test'
import assert from 'node:assert/strict'
import { API_ERROR_STATUS, buildApiErrorBody } from '../../src/lib/api/error-shape.ts'

const DOCS = 'https://www.minute-call.com/docs'

test('every error carries a code, a message, a hint, a status and a docs link', () => {
  const body = buildApiErrorBody('not_found', 'No API endpoint at /api/nope.', DOCS)
  assert.equal(body.code, 'not_found')
  assert.equal(body.message, 'No API endpoint at /api/nope.')
  assert.equal(body.status, 404)
  assert.equal(body.documentation_url, DOCS)
  assert.ok(body.hint.length > 0)
})

test('the legacy `error` string stays in sync with `message`', () => {
  const body = buildApiErrorBody('bad_request', 'Request body is not valid JSON.', DOCS)
  assert.equal(body.error, body.message)
})

test('validation errors expose per-field details', () => {
  const body = buildApiErrorBody('validation_error', 'Invalid.', DOCS, {
    details: [{ field: 'email', reason: 'must be a valid email address' }],
  })
  assert.equal(body.status, 422)
  assert.deepEqual(body.details, [{ field: 'email', reason: 'must be a valid email address' }])
})

test('details are omitted rather than sent empty', () => {
  const body = buildApiErrorBody('internal_error', 'Boom.', DOCS, { details: [] })
  assert.equal('details' in body, false)
})

test('status codes map to the documented values', () => {
  assert.deepEqual(API_ERROR_STATUS, {
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
  })
})
