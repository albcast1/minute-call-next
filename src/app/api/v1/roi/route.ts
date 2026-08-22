import { apiError, apiJson } from '@/lib/api/errors'
import { readJsonBody } from '@/lib/api/request'
import { calculateRoi, validateRoiInput } from '@/lib/roi'
import { SITE_URL } from '@/lib/agent/site'

/** POST /api/v1/roi - revenue lost to unanswered calls. */
export async function POST(request: Request) {
  const body = await readJsonBody(request)
  if (!body.ok) return body.response

  const parsed = validateRoiInput(body.value)
  if (!parsed.ok) {
    return apiError('validation_error', 'One or more fields are missing or out of range.', {
      details: parsed.invalid.map((item) => ({ field: item.field, reason: item.reason })),
    })
  }

  return apiJson(
    {
      input: parsed.value,
      result: calculateRoi(parsed.value),
      calculator_url: `${SITE_URL}/calculadora-roi`,
    },
    { cacheControl: 'no-store' },
  )
}
