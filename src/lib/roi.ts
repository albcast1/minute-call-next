/**
 * Missed-call cost model shared by the /calculadora-roi page and POST /api/v1/roi.
 * Kept intentionally identical to the numbers the public calculator has always shown.
 */

export type RoiInput = {
  /** Inbound calls received per month. */
  callsPerMonth: number
  /** Percentage of those calls that go unanswered (0-100). */
  missedPct: number
  /** Percentage of calls that are new leads (0-100). */
  leadPct: number
  /** Average revenue per won customer, in euros. */
  averageTicket: number
  /** Percentage of leads that convert into customers (0-100). */
  conversionPct: number
}

export type RoiResult = {
  missedCallsPerMonth: number
  lostLeadsPerMonth: number
  lostRevenuePerMonth: number
  lostRevenuePerYear: number
  currency: 'EUR'
}

export const ROI_LIMITS = {
  callsPerMonth: { min: 1, max: 1_000_000 },
  missedPct: { min: 0, max: 100 },
  leadPct: { min: 0, max: 100 },
  averageTicket: { min: 1, max: 10_000_000 },
  conversionPct: { min: 0, max: 100 },
} as const

export type RoiField = keyof typeof ROI_LIMITS

/** Validate a raw payload, returning either the typed input or the offending fields. */
export function validateRoiInput(raw: unknown):
  | { ok: true; value: RoiInput }
  | { ok: false; invalid: { field: RoiField; reason: string }[] } {
  const invalid: { field: RoiField; reason: string }[] = []
  const source = (raw ?? {}) as Record<string, unknown>
  const value = {} as RoiInput

  for (const field of Object.keys(ROI_LIMITS) as RoiField[]) {
    const limits = ROI_LIMITS[field]
    const candidate = source[field]
    if (candidate === undefined || candidate === null || candidate === '') {
      invalid.push({ field, reason: 'required' })
      continue
    }
    const num = typeof candidate === 'number' ? candidate : Number(candidate)
    if (!Number.isFinite(num)) {
      invalid.push({ field, reason: 'must be a number' })
      continue
    }
    if (num < limits.min || num > limits.max) {
      invalid.push({ field, reason: `must be between ${limits.min} and ${limits.max}` })
      continue
    }
    value[field] = num
  }

  return invalid.length > 0 ? { ok: false, invalid } : { ok: true, value }
}

/** Same arithmetic as the on-page calculator, rounded the same way. */
export function calculateRoi(input: RoiInput): RoiResult {
  const missedCallsPerMonth = Math.round((input.callsPerMonth * input.missedPct) / 100)
  const lostLeadsPerMonth = Math.round((missedCallsPerMonth * input.leadPct) / 100)
  const lostRevenuePerMonth = Math.round(
    ((lostLeadsPerMonth * input.conversionPct) / 100) * input.averageTicket,
  )
  return {
    missedCallsPerMonth,
    lostLeadsPerMonth,
    lostRevenuePerMonth,
    lostRevenuePerYear: lostRevenuePerMonth * 12,
    currency: 'EUR',
  }
}
