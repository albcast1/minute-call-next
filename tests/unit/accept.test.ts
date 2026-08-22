import test from 'node:test'
import assert from 'node:assert/strict'
import {
  negotiateDocument,
  parseAccept,
  qualityFor,
  withAcceptVary,
} from '../../src/lib/agent/accept.ts'

test('parseAccept orders media ranges by descending q-value', () => {
  const ranges = parseAccept('text/html;q=0.5, text/markdown;q=0.9, */*;q=0.1')
  assert.deepEqual(
    ranges.map((r) => `${r.type}/${r.subtype}@${r.q}`),
    ['text/markdown@0.9', 'text/html@0.5', '*/*@0.1'],
  )
})

test('parseAccept defaults a missing q to 1 and ignores malformed entries', () => {
  const ranges = parseAccept('text/markdown, garbage, text/html;q=bogus')
  assert.equal(qualityFor(ranges, 'text/markdown'), 1)
  assert.equal(qualityFor(ranges, 'text/html'), 1)
})

test('qualityFor honours wildcard ranges', () => {
  assert.equal(qualityFor(parseAccept('*/*'), 'text/markdown'), 1)
  assert.equal(qualityFor(parseAccept('text/*;q=0.4'), 'text/markdown'), 0.4)
  assert.equal(qualityFor(parseAccept('application/json'), 'text/markdown'), 0)
})

test('a browser Accept header still gets HTML', () => {
  const browser = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
  assert.deepEqual(negotiateDocument(browser), { outcome: 'html' })
})

test('a missing Accept header gets HTML', () => {
  assert.deepEqual(negotiateDocument(null), { outcome: 'html' })
  assert.deepEqual(negotiateDocument(''), { outcome: 'html' })
})

test('Accept: text/markdown gets Markdown', () => {
  assert.deepEqual(negotiateDocument('text/markdown'), { outcome: 'markdown' })
})

test('q-values decide between Markdown and HTML', () => {
  assert.deepEqual(negotiateDocument('text/markdown;q=0.9, text/html;q=0.8'), { outcome: 'markdown' })
  assert.deepEqual(negotiateDocument('text/markdown;q=0.4, text/html;q=0.8'), { outcome: 'html' })
  // A tie must not change the historical behaviour of the site.
  assert.deepEqual(negotiateDocument('text/markdown, text/html'), { outcome: 'html' })
})

test('*/* alone never triggers the Markdown variant', () => {
  assert.deepEqual(negotiateDocument('*/*'), { outcome: 'html' })
})

test('an RSC navigation request is never turned into Markdown or rejected', () => {
  assert.deepEqual(negotiateDocument('text/x-component'), { outcome: 'html' })
  assert.deepEqual(negotiateDocument('text/x-component, text/markdown;q=0.5'), { outcome: 'html' })
})

test('an Accept header we cannot satisfy yields 406', () => {
  assert.deepEqual(negotiateDocument('application/pdf'), { outcome: 'not-acceptable' })
  assert.deepEqual(negotiateDocument('image/png, application/zip'), { outcome: 'not-acceptable' })
})

test('withAcceptVary appends Accept without duplicating entries', () => {
  assert.equal(withAcceptVary(null), 'Accept, Accept-Encoding')
  assert.equal(withAcceptVary('RSC, Next-Router-State-Tree'), 'RSC, Next-Router-State-Tree, Accept, Accept-Encoding')
  assert.equal(withAcceptVary('accept, Accept-Encoding'), 'accept, Accept-Encoding')
})
