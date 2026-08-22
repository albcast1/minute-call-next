import test from 'node:test'
import assert from 'node:assert/strict'
import { calculateRoi, validateRoiInput } from '../../src/lib/roi.ts'

const DEFAULTS = {
  callsPerMonth: 200,
  missedPct: 35,
  leadPct: 30,
  averageTicket: 500,
  conversionPct: 20,
}

test('matches the numbers the public calculator has always shown', () => {
  // 200 * 35% = 70 missed calls -> 30% = 21 lost leads -> 20% * 500 EUR = 2100 EUR
  assert.deepEqual(calculateRoi(DEFAULTS), {
    missedCallsPerMonth: 70,
    lostLeadsPerMonth: 21,
    lostRevenuePerMonth: 2100,
    lostRevenuePerYear: 25200,
    currency: 'EUR',
  })
})

test('rounds each step the same way as the on-page calculator', () => {
  const result = calculateRoi({ ...DEFAULTS, callsPerMonth: 155, missedPct: 33 })
  assert.equal(result.missedCallsPerMonth, 51) // 51.15 -> 51
  assert.equal(result.lostLeadsPerMonth, 15) // 15.3 -> 15
  assert.equal(result.lostRevenuePerMonth, 1500)
})

test('zero percentages produce zero loss rather than NaN', () => {
  const result = calculateRoi({ ...DEFAULTS, missedPct: 0 })
  assert.equal(result.missedCallsPerMonth, 0)
  assert.equal(result.lostRevenuePerYear, 0)
})

test('accepts numeric strings', () => {
  const parsed = validateRoiInput({
    callsPerMonth: '200',
    missedPct: '35',
    leadPct: '30',
    averageTicket: '500',
    conversionPct: '20',
  })
  assert.equal(parsed.ok, true)
  if (parsed.ok) assert.deepEqual(parsed.value, DEFAULTS)
})

test('reports every missing field at once', () => {
  const parsed = validateRoiInput({})
  assert.equal(parsed.ok, false)
  if (!parsed.ok) {
    assert.deepEqual(
      parsed.invalid.map((i) => i.field).sort(),
      ['averageTicket', 'callsPerMonth', 'conversionPct', 'leadPct', 'missedPct'],
    )
    assert.ok(parsed.invalid.every((i) => i.reason === 'required'))
  }
})

test('rejects out-of-range and non-numeric values', () => {
  const parsed = validateRoiInput({ ...DEFAULTS, missedPct: 140, callsPerMonth: 'many' })
  assert.equal(parsed.ok, false)
  if (!parsed.ok) {
    const fields = parsed.invalid.map((i) => i.field).sort()
    assert.deepEqual(fields, ['callsPerMonth', 'missedPct'])
  }
})
