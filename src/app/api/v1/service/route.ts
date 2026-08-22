import { apiJson } from '@/lib/api/errors'
import { COUNTS } from '@/lib/api/resources'
import {
  ABOUT_URL,
  BOOKING_URL,
  COMPANY_FACTS,
  LEGAL_ENTITY,
  LEGAL_URL,
  SITE_NAME,
  SITE_URL,
  WHEN_NOT_TO_USE,
  WHEN_TO_USE,
} from '@/lib/agent/site'

export const dynamic = 'force-static'

/** GET /api/v1/service - what Minute Call is and when an agent should reach for it. */
export async function GET() {
  return apiJson({
    name: SITE_NAME,
    url: SITE_URL,
    summary:
      'Inbound phone reception for small and medium businesses in Spain: calls answered 24/7 in the company name by native Spanish, English and French speaking agents or by AI receptionists, with lead qualification and appointment booking.',
    languages: ['es', 'en', 'fr'],
    coverage: {
      countries: ['ES'],
      sectors: COUNTS.sectors,
      cities: COUNTS.cities,
    },
    activation_time_hours: 48,
    minimum_contract_months: 0,
    average_answer_seconds: 15,
    answer_rate_pct: 98,
    pricing: {
      model: 'monthly base fee plus a per-call rate',
      published: false,
      note: 'No published price list: the quote depends on call volume and the hours covered. There is no minimum team size, no minimum volume and no lock-in.',
      quote_url: BOOKING_URL,
    },
    company: {
      legal_name: LEGAL_ENTITY.legalName,
      trading_name: LEGAL_ENTITY.tradingName,
      tax_id: LEGAL_ENTITY.taxId,
      registered_address: LEGAL_ENTITY.address,
      country: LEGAL_ENTITY.country,
      founded: COMPANY_FACTS.founded,
      founder: COMPANY_FACTS.founder,
      partners: [...COMPANY_FACTS.partners],
      rating: COMPANY_FACTS.rating,
      profiles: [...COMPANY_FACTS.profiles],
      contact_email: LEGAL_ENTITY.email,
      legal_notice_url: LEGAL_URL,
      privacy_policy_url: `${SITE_URL}/politica-privacidad`,
      about_url: ABOUT_URL,
    },
    when_to_use: [...WHEN_TO_USE],
    when_not_to_use: [...WHEN_NOT_TO_USE],
    booking_url: BOOKING_URL,
  })
}
