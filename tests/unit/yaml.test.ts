import test from 'node:test'
import assert from 'node:assert/strict'
import { toYaml } from '../../src/lib/api/yaml.ts'

test('emits nested maps with two-space indentation', () => {
  assert.equal(toYaml({ info: { title: 'API', version: '1.0.0' } }), 'info:\n  title: API\n  version: "1.0.0"\n')
})

test('quotes strings that YAML would read as another type', () => {
  assert.equal(toYaml({ a: 'yes', b: 'null', c: '3.1.0', d: '' }), 'a: "yes"\nb: "null"\nc: "3.1.0"\nd: ""\n')
})

test('emits sequences of scalars and of maps', () => {
  assert.equal(toYaml({ tags: ['a', 'b'] }), 'tags:\n  - a\n  - b\n')
  assert.equal(
    toYaml({ servers: [{ url: 'https://example.com', description: 'Prod' }] }),
    'servers:\n  - url: "https://example.com"\n    description: Prod\n',
  )
})

test('preserves booleans, numbers and null', () => {
  assert.equal(toYaml({ ok: true, count: 3, nothing: null }), 'ok: true\ncount: 3\nnothing: null\n')
})

test('renders empty collections inline', () => {
  assert.equal(toYaml({ items: [], meta: {} }), 'items: []\nmeta: {}\n')
})

test('escapes multi-line strings instead of breaking the document', () => {
  const yaml = toYaml({ description: 'line one\nline two' })
  assert.equal(yaml, 'description: "line one\\nline two"\n')
  assert.equal(yaml.split('\n').filter(Boolean).length, 1)
})

test('quotes keys that are not plain-safe', () => {
  assert.equal(toYaml({ '/sectors/{slug}': { get: 1 } }), '"/sectors/{slug}":\n  get: 1\n')
})
