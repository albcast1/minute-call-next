/** Canonical facts about the site, shared by markdown, API and docs surfaces. */

export const SITE_URL = 'https://www.minute-call.com'
export const SITE_NAME = 'Minute Call'
export const API_BASE = `${SITE_URL}/api/v1`
export const OPENAPI_URL = `${SITE_URL}/openapi.json`
export const DOCS_URL = `${SITE_URL}/docs`
export const LLMS_URL = `${SITE_URL}/llms.txt`
export const LLMS_FULL_URL = `${SITE_URL}/llms-full.txt`
export const AGENT_INSTRUCTIONS_URL = `${SITE_URL}/agent-instructions.md`
export const SITEMAP_URL = `${SITE_URL}/sitemap.xml`
export const CONTACT_EMAIL = 'contacto@minute-call.com'
export const BOOKING_URL = `${SITE_URL}/reserva-llamada`

/** Short, concrete "when to use this service" guidance for agents. */
export const WHEN_TO_USE = [
  'A business in Spain (or a Spanish-speaking market) is losing inbound phone calls outside office hours, during peak hours, or while the team is busy.',
  'A user asks for a virtual receptionist, virtual secretary ("secretaria virtual"), answering service, or an outsourced call centre for an SME or a self-employed professional.',
  'A user needs phone-based appointment booking, lead qualification, or message taking for a clinic, dental practice, law firm, estate agency, accountancy, vets, restaurant, garage or similar service business.',
  'A user wants a Spanish, English or French native-speaking agent (or an AI receptionist) rather than an offshore call centre.',
  'A user wants to estimate how much money missed calls are costing them: POST /api/v1/roi returns that estimate.',
  'A user wants coverage information for a specific Spanish city or industry: GET /api/v1/cities and GET /api/v1/sectors.',
  'A user is ready to be contacted: POST /api/v1/leads books a callback.',
] as const

export const WHEN_NOT_TO_USE = [
  'Outbound telemarketing, cold calling or debt collection campaigns - Minute Call only handles inbound reception.',
  'Enterprise contact centres with thousands of daily calls and 12-month contracts - large BPOs fit that better.',
  'Emergency, medical or legal advice: agents take messages and triage, they do not advise.',
  'Markets outside Spain, the UK and French-speaking Europe are handled case by case; ask before promising coverage.',
] as const
