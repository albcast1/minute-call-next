/** Validation for callback requests, shared by the API route and its tests. */

export type LeadInput = {
  name: string
  email: string
  phone: string
  context: string
  company?: string
  source?: string
}

export type LeadProblem = { field: string; reason: string }

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
const PHONE = /^[+()\d][\d\s().-]{5,39}$/

function str(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

export function validateLead(raw: unknown):
  | { ok: true; value: LeadInput }
  | { ok: false; problems: LeadProblem[] } {
  const source = (raw ?? {}) as Record<string, unknown>
  const problems: LeadProblem[] = []

  // Honeypot: real clients never fill this in.
  if (str(source.website) !== '') {
    problems.push({ field: 'website', reason: 'must be empty' })
  }

  const name = str(source.name)
  if (name.length < 2 || name.length > 120) {
    problems.push({ field: 'name', reason: 'must be between 2 and 120 characters' })
  }

  const email = str(source.email)
  if (email.length > 200 || !EMAIL.test(email)) {
    problems.push({ field: 'email', reason: 'must be a valid email address' })
  }

  const phone = str(source.phone)
  if (!PHONE.test(phone)) {
    problems.push({ field: 'phone', reason: 'must be a phone number of 6 to 40 characters' })
  }

  const context = str(source.context)
  if (context.length < 5 || context.length > 2000) {
    problems.push({ field: 'context', reason: 'must be between 5 and 2000 characters' })
  }

  const company = str(source.company)
  if (company.length > 160) {
    problems.push({ field: 'company', reason: 'must be at most 160 characters' })
  }

  const leadSource = str(source.source)
  if (leadSource.length > 80) {
    problems.push({ field: 'source', reason: 'must be at most 80 characters' })
  }

  if (problems.length > 0) return { ok: false, problems }

  return {
    ok: true,
    value: {
      name,
      email,
      phone,
      context,
      ...(company ? { company } : {}),
      ...(leadSource ? { source: leadSource } : {}),
    },
  }
}
