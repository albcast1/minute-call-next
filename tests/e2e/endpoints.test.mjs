/**
 * End-to-end checks for every public machine-readable surface.
 *
 * Run against a local server:   npm run build && npm start & npm run test:e2e
 * Or against a deployment:      BASE_URL=https://minute-call-next.vercel.app npm run test:e2e
 *
 * Nothing here mutates state: the lead endpoint is only exercised with invalid
 * payloads so it never sends an email.
 */
import test from 'node:test'
import assert from 'node:assert/strict'

const BASE_URL = (process.env.BASE_URL ?? 'http://127.0.0.1:3000').replace(/\/$/, '')

async function get(path, init = {}) {
  const response = await fetch(`${BASE_URL}${path}`, { redirect: 'manual', ...init })
  const text = await response.text()
  return { response, text, status: response.status }
}

function varyIncludesAccept(response) {
  const vary = response.headers.get('vary') ?? ''
  return vary
    .split(',')
    .map((v) => v.trim().toLowerCase())
    .includes('accept')
}

/* ---------------------------------------------------------------- 404s -- */

test('an unknown path returns a real HTTP 404', async () => {
  const { status } = await get('/esta-ruta-no-existe-12345')
  assert.equal(status, 404)
})

test('the HTML 404 points agents at the sitemap, llms.txt and the docs', async () => {
  const { text, status } = await get('/esta-ruta-no-existe-12345')
  assert.equal(status, 404)
  for (const needle of ['/sitemap.xml', '/llms.txt', '/agent-instructions.md', '/docs', '/openapi.json']) {
    assert.ok(text.includes(needle), `404 body should mention ${needle}`)
  }
})

test('the Markdown 404 carries a short recovery body', async () => {
  const { response, text, status } = await get('/esta-ruta-no-existe-12345', {
    headers: { Accept: 'text/markdown' },
  })
  assert.equal(status, 404)
  assert.match(response.headers.get('content-type') ?? '', /text\/markdown/)
  assert.match(text, /^# 404/m)
  assert.ok(text.includes('/sitemap.xml'))
  assert.ok(text.includes('/llms.txt'))
  assert.ok(text.includes('/docs'))
})

test('an unknown API path returns a structured JSON 404', async () => {
  const { response, text, status } = await get('/api/definitivamente-no-existe')
  assert.equal(status, 404)
  assert.match(response.headers.get('content-type') ?? '', /application\/json/)
  const body = JSON.parse(text)
  assert.equal(body.code, 'not_found')
  assert.equal(body.status, 404)
  assert.ok(body.hint)
  assert.ok(body.documentation_url)
})

/* ------------------------------------------- markdown content negotiation */

test('Accept: text/markdown returns Markdown with Vary: Accept', async () => {
  const { response, text, status } = await get('/', { headers: { Accept: 'text/markdown' } })
  assert.equal(status, 200)
  assert.match(response.headers.get('content-type') ?? '', /text\/markdown/)
  assert.ok(varyIncludesAccept(response), `Vary must include Accept, got "${response.headers.get('vary')}"`)
  assert.match(text, /^#/m)
})

/**
 * Known Next.js behaviour, verified against a real deployment: on prerendered
 * App Router pages Next writes its own `Vary` (the RSC router headers) into the
 * prerender metadata, which replaces anything set by `next.config.ts` headers()
 * or by the Proxy. `Accept` therefore cannot appear in the Vary of a static HTML
 * page from userland.
 *
 * This does not reopen the cache-poisoning hole that Vary protects against: the
 * Proxy negotiates before the CDN cache is consulted and rewrites every
 * `Accept: text/markdown` request to /md, so a markdown request can never be
 * served the cached HTML variant. The Markdown responses themselves - the ones
 * acceptmarkdown.com asks about - do carry `Vary: Accept, Accept-Encoding`,
 * which the test above asserts.
 *
 * What the HTML variant must do is point agents at the Markdown alternate.
 */
test('the HTML variant advertises the Markdown alternate and keeps the RSC Vary', async () => {
  const { response, status } = await get('/', { headers: { Accept: 'text/html' } })
  assert.equal(status, 200)
  assert.match(response.headers.get('content-type') ?? '', /text\/html/)
  assert.match(response.headers.get('link') ?? '', /<\/index\.md>; rel="alternate"; type="text\/markdown"/)
  assert.match(response.headers.get('vary') ?? '', /rsc/i)
})

test('q-values decide the representation', async () => {
  const markdown = await get('/', { headers: { Accept: 'text/markdown;q=0.9, text/html;q=0.8' } })
  assert.match(markdown.response.headers.get('content-type') ?? '', /text\/markdown/)

  const html = await get('/', { headers: { Accept: 'text/markdown;q=0.4, text/html;q=0.8' } })
  assert.match(html.response.headers.get('content-type') ?? '', /text\/html/)
})

test('a browser Accept header still gets HTML', async () => {
  const { response } = await get('/', {
    headers: { Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' },
  })
  assert.match(response.headers.get('content-type') ?? '', /text\/html/)
})

test('an RSC navigation request is left alone', async () => {
  const { response, status } = await get('/', { headers: { Accept: 'text/x-component' } })
  assert.notEqual(status, 406)
  assert.doesNotMatch(response.headers.get('content-type') ?? '', /text\/markdown/)
})

test('a POST to a page is never negotiated into Markdown', async () => {
  const response = await fetch(`${BASE_URL}/reserva-llamada`, {
    method: 'POST',
    headers: { Accept: 'text/markdown' },
    redirect: 'manual',
  })
  assert.doesNotMatch(response.headers.get('content-type') ?? '', /text\/markdown/)
})

test('an unsatisfiable Accept header returns 406', async () => {
  const { status, response } = await get('/', { headers: { Accept: 'application/pdf' } })
  assert.equal(status, 406)
  assert.ok(varyIncludesAccept(response))
})

test('a .md suffix returns the Markdown variant of a real page', async () => {
  const { response, text, status } = await get('/lp/recepcionista-ia-clinicas.md')
  assert.equal(status, 200)
  assert.match(response.headers.get('content-type') ?? '', /text\/markdown/)
  assert.match(text, /^# /m)
})

test('city and article pages have Markdown representations', async () => {
  for (const path of ['/atencion-telefonica/madrid.md', '/articulos.md', '/index.md', '/docs.md']) {
    const { status, response } = await get(path)
    assert.equal(status, 200, `${path} should be 200`)
    assert.match(response.headers.get('content-type') ?? '', /text\/markdown/, `${path} should be Markdown`)
  }
})

/* -------------------------------------------------- machine-readable files */

test('llms.txt is published and names when to use Minute Call', async () => {
  const { text, status } = await get('/llms.txt')
  assert.equal(status, 200)
  assert.ok(text.includes('Cuando usar Minute Call'))
  assert.ok(text.includes('/api/v1'))
})

test('agent-instructions.md is published as Markdown', async () => {
  const { response, text, status } = await get('/agent-instructions.md')
  assert.equal(status, 200)
  assert.match(response.headers.get('content-type') ?? '', /text\/markdown/)
  assert.ok(text.includes('When to use Minute Call'))
  assert.ok(text.includes('When NOT to use Minute Call'))
})

test('robots.txt and sitemap.xml are still served', async () => {
  assert.equal((await get('/robots.txt')).status, 200)
  const sitemap = await get('/sitemap.xml')
  assert.equal(sitemap.status, 200)
  assert.ok(sitemap.text.includes('/docs'))
  assert.ok(sitemap.text.includes('/politica-privacidad'))
  assert.ok(sitemap.text.includes('/aviso-legal'))
})

/* -------------------------------------------------------------- OpenAPI -- */

test('the OpenAPI document is published and self-describing', async () => {
  const { response, text, status } = await get('/openapi.json')
  assert.equal(status, 200)
  assert.match(response.headers.get('content-type') ?? '', /application\/json/)
  const doc = JSON.parse(text)
  assert.match(doc.openapi, /^3\.1/)
  assert.ok(doc.info.title.includes('Minute Call'))
  assert.ok(doc.servers[0].url.endsWith('/api/v1'))

  const operations = Object.values(doc.paths).flatMap((methods) => Object.values(methods))
  assert.ok(operations.length >= 9)

  const ids = new Set()
  for (const operation of operations) {
    assert.ok(operation.operationId, 'every operation needs an operationId')
    assert.equal(ids.has(operation.operationId), false, `duplicate operationId ${operation.operationId}`)
    ids.add(operation.operationId)
    assert.ok(operation.summary, `${operation.operationId} needs a summary`)
    assert.ok(operation.description, `${operation.operationId} needs a description`)
    assert.ok(operation.responses['200'] || operation.responses['201'], `${operation.operationId} needs a success response`)
    for (const parameter of operation.parameters ?? []) {
      assert.ok(parameter.schema, `${operation.operationId}.${parameter.name} needs a typed schema`)
      assert.ok(parameter.description, `${operation.operationId}.${parameter.name} needs a description`)
    }
  }
})

test('the OpenAPI document is also served as YAML', async () => {
  const { response, text, status } = await get('/api/openapi.yaml')
  assert.equal(status, 200)
  assert.match(response.headers.get('content-type') ?? '', /yaml/)
  assert.match(text, /^openapi: "3\.1\.0"$/m)
  assert.ok(text.includes('operationId: listSectors'))
})

test('/api/openapi.json mirrors /openapi.json', async () => {
  const canonical = JSON.parse((await get('/openapi.json')).text)
  const alias = JSON.parse((await get('/api/openapi.json')).text)
  assert.deepEqual(alias, canonical)
})

/* ------------------------------------------------------------- API v1 --- */

test('GET /api/v1 lists every operation', async () => {
  const { text, status } = await get('/api/v1')
  assert.equal(status, 200)
  const body = JSON.parse(text)
  assert.ok(Array.isArray(body.operations))
  assert.ok(body.operations.some((o) => o.operationId === 'calculateMissedCallCost'))
  assert.ok(body.openapi_url.endsWith('/openapi.json'))
})

test('GET /api/v1/service states when to use and when not to use the service', async () => {
  const { text, status } = await get('/api/v1/service')
  assert.equal(status, 200)
  const body = JSON.parse(text)
  assert.ok(body.when_to_use.length >= 3)
  assert.ok(body.when_not_to_use.length >= 3)
  assert.deepEqual(body.languages, ['es', 'en', 'fr'])
})

test('GET /api/v1/health reports ok', async () => {
  const { text, status } = await get('/api/v1/health')
  assert.equal(status, 200)
  assert.equal(JSON.parse(text).status, 'ok')
})

test('GET /api/v1/sectors filters and limits', async () => {
  const all = JSON.parse((await get('/api/v1/sectors?limit=100')).text)
  assert.ok(all.total >= 40)

  const filtered = JSON.parse((await get('/api/v1/sectors?q=clinicas')).text)
  assert.ok(filtered.total >= 1)
  assert.ok(filtered.items.every((item) => item.url.startsWith('http')))

  const limited = JSON.parse((await get('/api/v1/sectors?limit=3')).text)
  assert.equal(limited.items.length, 3)
  assert.equal(limited.count, 3)
})

test('GET /api/v1/sectors rejects a bad limit with a validation error', async () => {
  const { text, status } = await get('/api/v1/sectors?limit=0')
  assert.equal(status, 422)
  const body = JSON.parse(text)
  assert.equal(body.code, 'validation_error')
  assert.equal(body.details[0].field, 'limit')
})

test('GET /api/v1/sectors/{slug} returns detail or a JSON 404', async () => {
  const found = await get('/api/v1/sectors/recepcionista-ia-clinicas')
  assert.equal(found.status, 200)
  const sector = JSON.parse(found.text)
  assert.equal(sector.slug, 'recepcionista-ia-clinicas')
  assert.ok(sector.faq.length > 0)

  const missing = await get('/api/v1/sectors/no-existe')
  assert.equal(missing.status, 404)
  assert.equal(JSON.parse(missing.text).code, 'not_found')
})

test('GET /api/v1/cities/{slug} returns detail or a JSON 404', async () => {
  const found = await get('/api/v1/cities/madrid')
  assert.equal(found.status, 200)
  const city = JSON.parse(found.text)
  assert.equal(city.slug, 'madrid')
  assert.ok(city.top_sectors.length > 0)

  const missing = await get('/api/v1/cities/atlantida')
  assert.equal(missing.status, 404)
})

test('GET /api/v1/articles lists articles and can return one in Markdown', async () => {
  const list = JSON.parse((await get('/api/v1/articles?limit=5')).text)
  assert.equal(list.items.length, 5)

  const one = JSON.parse((await get(`/api/v1/articles?slug=${list.items[0].slug}`)).text)
  assert.equal(one.total, 1)
  assert.ok(one.items[0].content_markdown.length > 100)
})

test('POST /api/v1/roi mirrors the on-page calculator', async () => {
  const response = await fetch(`${BASE_URL}/api/v1/roi`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      callsPerMonth: 200,
      missedPct: 35,
      leadPct: 30,
      averageTicket: 500,
      conversionPct: 20,
    }),
  })
  assert.equal(response.status, 200)
  const body = await response.json()
  assert.deepEqual(body.result, {
    missedCallsPerMonth: 70,
    lostLeadsPerMonth: 21,
    lostRevenuePerMonth: 2100,
    lostRevenuePerYear: 25200,
    currency: 'EUR',
  })
})

test('POST /api/v1/roi returns a field-level validation error', async () => {
  const response = await fetch(`${BASE_URL}/api/v1/roi`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ callsPerMonth: 200 }),
  })
  assert.equal(response.status, 422)
  const body = await response.json()
  assert.equal(body.code, 'validation_error')
  assert.ok(body.details.length >= 4)
  assert.ok(body.hint)
})

test('POST /api/v1/roi rejects a non-JSON content type', async () => {
  const response = await fetch(`${BASE_URL}/api/v1/roi`, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: 'callsPerMonth=200',
  })
  assert.equal(response.status, 415)
  assert.equal((await response.json()).code, 'unsupported_media_type')
})

test('POST /api/v1/roi rejects malformed JSON', async () => {
  const response = await fetch(`${BASE_URL}/api/v1/roi`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{oops',
  })
  assert.equal(response.status, 400)
  assert.equal((await response.json()).code, 'bad_request')
})

test('POST /api/v1/leads validates before doing anything else', async () => {
  const response = await fetch(`${BASE_URL}/api/v1/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'A', email: 'nope', phone: '1', context: '' }),
  })
  assert.equal(response.status, 422)
  const body = await response.json()
  assert.equal(body.code, 'validation_error')
  assert.deepEqual(body.details.map((d) => d.field).sort(), ['context', 'email', 'name', 'phone'])
})

test('POST /api/v1/leads rejects a filled honeypot', async () => {
  const response = await fetch(`${BASE_URL}/api/v1/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Spam Bot',
      email: 'spam@example.com',
      phone: '+34600000000',
      context: 'Comprar enlaces',
      website: 'http://spam.example',
    }),
  })
  assert.equal(response.status, 422)
  assert.ok((await response.json()).details.some((d) => d.field === 'website'))
})

/* ------------------------------------------------------- trust anchors --- */

test('the trust anchor pages resolve', async () => {
  for (const path of ['/sobre-nosotros', '/reserva-llamada', '/politica-privacidad', '/docs']) {
    const { status } = await get(path)
    assert.equal(status, 200, `${path} should be 200`)
  }
})

test('/about and its aliases reach the real about page, not the homepage', async () => {
  // Regression: these used to 301 to "/", so an agent probing /about got a 200
  // with the homepage and no verifiable company information at all.
  for (const path of ['/about', '/about-us', '/quienes-somos', '/nosotros', '/team', '/company']) {
    const { response, status } = await get(path)
    assert.equal(status, 308, `${path} should redirect`)
    assert.equal(response.headers.get('location'), '/sobre-nosotros', `${path} should land on the about page`)
  }
})

test('the legal notice is published with the registered company details', async () => {
  const { text, status } = await get('/aviso-legal')
  assert.equal(status, 200)
  for (const needle of ['MINUTE CALL SLU', 'B22766828', 'Sierra de Grazalema', 'LSSI']) {
    assert.ok(text.includes(needle), `the legal notice should state ${needle}`)
  }
})

test('/legal and /terms reach the legal notice', async () => {
  for (const path of ['/legal', '/terms', '/imprint']) {
    const { response, status } = await get(path)
    assert.equal(status, 308, `${path} should redirect`)
    assert.equal(response.headers.get('location'), '/aviso-legal')
  }
})

test('the about page in Markdown carries the facts an agent needs to verify the business', async () => {
  const { response, text, status } = await get('/sobre-nosotros.md')
  assert.equal(status, 200)
  assert.match(response.headers.get('content-type') ?? '', /text\/markdown/)
  for (const needle of [
    'MINUTE CALL SLU',
    'B22766828',
    'Alberto Castiel',
    'Teleperformance',
    'Zendesk',
    'trustpilot.com',
    'linkedin.com',
    '/aviso-legal',
  ]) {
    assert.ok(text.includes(needle), `the about Markdown should mention ${needle}`)
  }
})

test('GET /api/v1/service exposes the registered company identity', async () => {
  const body = JSON.parse((await get('/api/v1/service')).text)
  assert.equal(body.company.legal_name, 'MINUTE CALL SLU')
  assert.equal(body.company.tax_id, 'B22766828')
  assert.equal(body.company.country, 'ES')
  assert.ok(body.company.founder.name)
  assert.ok(body.company.rating.source.startsWith('http'))
  assert.ok(body.company.legal_notice_url.endsWith('/aviso-legal'))
})

test('/privacy and /contact redirect to the real pages', async () => {
  const privacy = await get('/privacy')
  assert.equal(privacy.status, 308)
  assert.equal(privacy.response.headers.get('location'), '/politica-privacidad')

  const contact = await get('/contact')
  assert.equal(contact.status, 308)
  assert.equal(contact.response.headers.get('location'), '/reserva-llamada')
})

test('/developers and /desarrolladores redirect to the docs', async () => {
  for (const path of ['/developers', '/desarrolladores', '/api-docs']) {
    const { response, status } = await get(path)
    assert.equal(status, 308, `${path} should redirect`)
    assert.equal(response.headers.get('location'), '/docs')
  }
})

test('the privacy policy has enough substance to read as a trust anchor', async () => {
  const { text } = await get('/politica-privacidad')
  const visible = text
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  assert.ok(visible.length > 500, `expected >500 characters of copy, got ${visible.length}`)
})

test('the homepage links to the developer documentation', async () => {
  const { text } = await get('/')
  assert.ok(text.includes('/docs'), 'homepage should link to /docs')
})
