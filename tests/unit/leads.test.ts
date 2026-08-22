import test from 'node:test'
import assert from 'node:assert/strict'
import { validateLead } from '../../src/lib/api/leads.ts'

const VALID = {
  name: 'Ana Ruiz',
  email: 'ana@clinicaruiz.es',
  phone: '+34600111222',
  context: 'Clinica dental en Valencia, 300 llamadas al mes',
}

test('accepts a well-formed request and trims whitespace', () => {
  const parsed = validateLead({ ...VALID, name: '  Ana Ruiz  ' })
  assert.equal(parsed.ok, true)
  if (parsed.ok) assert.equal(parsed.value.name, 'Ana Ruiz')
})

test('keeps optional company and source when present', () => {
  const parsed = validateLead({ ...VALID, company: 'Clinica Ruiz', source: 'mi-agente' })
  assert.equal(parsed.ok, true)
  if (parsed.ok) {
    assert.equal(parsed.value.company, 'Clinica Ruiz')
    assert.equal(parsed.value.source, 'mi-agente')
  }
})

test('omits optional fields when they are empty', () => {
  const parsed = validateLead({ ...VALID, company: '   ' })
  assert.equal(parsed.ok, true)
  if (parsed.ok) assert.equal('company' in parsed.value, false)
})

test('rejects a filled honeypot', () => {
  const parsed = validateLead({ ...VALID, website: 'http://spam.example' })
  assert.equal(parsed.ok, false)
  if (!parsed.ok) assert.ok(parsed.problems.some((p) => p.field === 'website'))
})

test('rejects an invalid email address', () => {
  const parsed = validateLead({ ...VALID, email: 'ana@localhost' })
  assert.equal(parsed.ok, false)
  if (!parsed.ok) assert.ok(parsed.problems.some((p) => p.field === 'email'))
})

test('rejects a phone number that is too short or contains letters', () => {
  for (const phone of ['12', 'call me']) {
    const parsed = validateLead({ ...VALID, phone })
    assert.equal(parsed.ok, false, `expected ${phone} to be rejected`)
  }
})

test('rejects an over-long context', () => {
  const parsed = validateLead({ ...VALID, context: 'x'.repeat(2001) })
  assert.equal(parsed.ok, false)
  if (!parsed.ok) assert.ok(parsed.problems.some((p) => p.field === 'context'))
})

test('reports every problem in one pass', () => {
  const parsed = validateLead({ name: 'A', email: 'nope', phone: '1', context: '' })
  assert.equal(parsed.ok, false)
  if (!parsed.ok) {
    assert.deepEqual(parsed.problems.map((p) => p.field).sort(), ['context', 'email', 'name', 'phone'])
  }
})
