import { apiError, apiJson } from '@/lib/api/errors'
import { clientKey, escapeHtml, rateLimit, readJsonBody } from '@/lib/api/request'
import { validateLead } from '@/lib/api/leads'
import { BOOKING_URL } from '@/lib/agent/site'

export const dynamic = 'force-dynamic'

const LEAD_RATE_LIMIT = { limit: 5, windowMs: 60 * 60 * 1000 }

/** POST /api/v1/leads - request a callback. */
export async function POST(request: Request) {
  const limit = rateLimit(`leads:${clientKey(request)}`, LEAD_RATE_LIMIT)
  if (!limit.allowed) {
    return apiError('rate_limited', 'Too many callback requests from this client.', {
      headers: { 'Retry-After': String(limit.retryAfterSeconds) },
    })
  }

  const body = await readJsonBody(request)
  if (!body.ok) return body.response

  const parsed = validateLead(body.value)
  if (!parsed.ok) {
    return apiError('validation_error', 'One or more fields are missing or invalid.', {
      details: parsed.problems,
    })
  }

  const lead = parsed.value
  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) {
    console.error('RESEND_API_KEY not configured')
    return apiError('service_unavailable', 'Email delivery is not configured right now.', {
      hint: `Send the request through ${BOOKING_URL} instead.`,
    })
  }

  const rows: [string, string][] = [
    ['Nombre', lead.name],
    ['Email', lead.email],
    ['Telefono', lead.phone],
    ...(lead.company ? ([['Empresa', lead.company]] as [string, string][]) : []),
    ['Contexto', lead.context],
    ['Origen', lead.source ? `API (${lead.source})` : 'API /api/v1/leads'],
  ]

  const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
        <h2 style="margin-bottom: 24px;">Nueva solicitud de llamada (API)</h2>
        <table style="width: 100%; border-collapse: collapse;">
          ${rows
            .map(
              ([label, value]) => `<tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; font-weight: 600; width: 140px; vertical-align: top;">${escapeHtml(label)}</td>
            <td style="padding: 12px 0;">${escapeHtml(value)}</td>
          </tr>`,
            )
            .join('')}
        </table>
      </div>
    `

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Minute Call <contacto@minute-call.com>',
        to: ['alberto@minute-call.com'],
        reply_to: lead.email,
        subject: `Nueva solicitud de llamada (API) - ${lead.name}`,
        html,
      }),
    })

    if (!res.ok) {
      console.error('Resend error:', res.status, await res.text())
      return apiError('service_unavailable', 'The callback request could not be delivered.', {
        hint: `Retry shortly, or send it through ${BOOKING_URL}.`,
      })
    }

    const payload = (await res.json().catch(() => ({}))) as { id?: string }
    return apiJson(
      {
        ok: true,
        id: payload.id ?? 'accepted',
        status: 'received' as const,
        message: 'Solicitud recibida. Te llamamos en horario laboral.',
        next_step: 'A member of the Minute Call team will call the number provided during Spanish business hours.',
        booking_url: BOOKING_URL,
      },
      { status: 201, cacheControl: 'no-store' },
    )
  } catch (error) {
    console.error('Leads API error:', error)
    return apiError('service_unavailable', 'The callback request could not be delivered.', {
      hint: `Retry shortly, or send it through ${BOOKING_URL}.`,
    })
  }
}
