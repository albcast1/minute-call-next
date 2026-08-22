import { API_BASE, CONTACT_EMAIL, DOCS_URL, SITE_NAME, SITE_URL, WHEN_NOT_TO_USE, WHEN_TO_USE } from '@/lib/agent/site'

/**
 * OpenAPI 3.1 description of the public Minute Call API.
 *
 * Every operation has a unique operationId, a summary, a description and a
 * typed response schema so it can be converted straight into an LLM
 * function-calling tool definition.
 */
export const OPENAPI_VERSION = '1.0.0'

const errorSchema = {
  type: 'object',
  title: 'Error',
  description: 'Structured error envelope returned by every endpoint on failure.',
  required: ['error', 'code', 'message', 'hint', 'status', 'documentation_url'],
  properties: {
    error: { type: 'string', description: 'Human-readable message (legacy field, same text as `message`).' },
    code: {
      type: 'string',
      description: 'Stable machine-readable error code.',
      enum: [
        'bad_request',
        'validation_error',
        'not_found',
        'method_not_allowed',
        'not_acceptable',
        'unsupported_media_type',
        'payload_too_large',
        'rate_limited',
        'service_unavailable',
        'internal_error',
      ],
    },
    message: { type: 'string', description: 'Human-readable message.' },
    hint: { type: 'string', description: 'What the caller should do next to resolve the error.' },
    details: {
      type: 'array',
      description: 'Per-field problems, present on validation errors.',
      items: {
        type: 'object',
        required: ['reason'],
        properties: {
          field: { type: 'string', description: 'Request field the problem refers to.' },
          reason: { type: 'string', description: 'Why the field was rejected.' },
        },
      },
    },
    status: { type: 'integer', description: 'HTTP status code, repeated in the body.' },
    documentation_url: { type: 'string', format: 'uri', description: 'Where to read about this endpoint.' },
  },
} as const

const errorResponse = (description: string) => ({
  description,
  content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
})

export function buildOpenApiDocument() {
  return {
    openapi: '3.1.0',
    info: {
      title: `${SITE_NAME} Public API`,
      version: OPENAPI_VERSION,
      summary: 'Coverage, pricing context and callback booking for a Spanish virtual receptionist service.',
      description: [
        `${SITE_NAME} is a 24/7 inbound phone reception service for small and medium businesses in Spain, staffed by native Spanish, English and French speaking agents or by AI receptionists.`,
        '',
        '## When an agent should call this API',
        '',
        ...WHEN_TO_USE.map((line) => `- ${line}`),
        '',
        '## When it is not the right tool',
        '',
        ...WHEN_NOT_TO_USE.map((line) => `- ${line}`),
        '',
        '## Authentication',
        '',
        'None. Every read operation is public. `POST /api/v1/leads` is public too but rate limited and validated.',
      ].join('\n'),
      contact: { name: `${SITE_NAME} support`, email: CONTACT_EMAIL, url: DOCS_URL },
      license: { name: 'Proprietary', url: `${SITE_URL}/politica-privacidad` },
      termsOfService: `${SITE_URL}/politica-privacidad`,
    },
    servers: [{ url: API_BASE, description: 'Production' }],
    externalDocs: { description: 'Developer documentation', url: DOCS_URL },
    tags: [
      { name: 'service', description: 'What Minute Call does and when to use it.' },
      { name: 'coverage', description: 'Industries and cities covered.' },
      { name: 'content', description: 'Published articles.' },
      { name: 'tools', description: 'Calculations an agent can run on behalf of a user.' },
      { name: 'leads', description: 'Booking a callback.' },
    ],
    paths: {
      '/': {
        get: {
          operationId: 'listApiIndex',
          tags: ['service'],
          summary: 'List available operations',
          description: 'Returns the API index: every operation with its path, method and a one-line description. Start here when discovering the API.',
          responses: {
            200: {
              description: 'API index.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiIndex' } } },
            },
          },
        },
      },
      '/service': {
        get: {
          operationId: 'getService',
          tags: ['service'],
          summary: 'Get the service description, company identity and when-to-use guidance',
          description: 'Returns what Minute Call does, the languages covered, activation time, contract terms, the registered company identity (legal name, tax id, address, founder, partners, third-party rating) that an agent needs to verify the business, and explicit guidance on when it should and should not be recommended.',
          responses: {
            200: {
              description: 'Service description.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Service' } } },
            },
          },
        },
      },
      '/sectors': {
        get: {
          operationId: 'listSectors',
          tags: ['coverage'],
          summary: 'List the industries covered',
          description: 'Returns every industry with a dedicated call-handling script, optionally filtered by a free-text query. Use it to check whether a specific kind of business is covered.',
          parameters: [
            {
              name: 'q',
              in: 'query',
              required: false,
              description: 'Case-insensitive substring match against the industry name and slug.',
              schema: { type: 'string', maxLength: 100 },
            },
            {
              name: 'limit',
              in: 'query',
              required: false,
              description: 'Maximum number of results to return.',
              schema: { type: 'integer', minimum: 1, maximum: 100, default: 50 },
            },
          ],
          responses: {
            200: {
              description: 'Matching industries.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/SectorList' } } },
            },
            422: errorResponse('Invalid query parameter.'),
          },
        },
      },
      '/sectors/{slug}': {
        get: {
          operationId: 'getSector',
          tags: ['coverage'],
          summary: 'Get one industry',
          description: 'Returns the full description, feature list and FAQ for a single industry.',
          parameters: [
            {
              name: 'slug',
              in: 'path',
              required: true,
              description: 'Industry identifier, for example `recepcionista-ia-clinicas`.',
              schema: { type: 'string', pattern: '^[a-z0-9-]+$' },
            },
          ],
          responses: {
            200: {
              description: 'Industry detail.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Sector' } } },
            },
            404: errorResponse('No industry with that slug.'),
          },
        },
      },
      '/cities': {
        get: {
          operationId: 'listCities',
          tags: ['coverage'],
          summary: 'List the cities covered',
          description: 'Returns the Spanish cities with a dedicated coverage page, optionally filtered by a free-text query.',
          parameters: [
            {
              name: 'q',
              in: 'query',
              required: false,
              description: 'Case-insensitive substring match against the city name, region and slug.',
              schema: { type: 'string', maxLength: 100 },
            },
            {
              name: 'limit',
              in: 'query',
              required: false,
              description: 'Maximum number of results to return.',
              schema: { type: 'integer', minimum: 1, maximum: 100, default: 50 },
            },
          ],
          responses: {
            200: {
              description: 'Matching cities.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/CityList' } } },
            },
            422: errorResponse('Invalid query parameter.'),
          },
        },
      },
      '/cities/{slug}': {
        get: {
          operationId: 'getCity',
          tags: ['coverage'],
          summary: 'Get one city',
          description: 'Returns local context, the industries most in demand and the FAQ for a single city.',
          parameters: [
            {
              name: 'slug',
              in: 'path',
              required: true,
              description: 'City identifier, for example `madrid`.',
              schema: { type: 'string', pattern: '^[a-z0-9-]+$' },
            },
          ],
          responses: {
            200: {
              description: 'City detail.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/City' } } },
            },
            404: errorResponse('No city with that slug.'),
          },
        },
      },
      '/articles': {
        get: {
          operationId: 'listArticles',
          tags: ['content'],
          summary: 'List published articles',
          description: 'Returns the published articles with title, excerpt and canonical URL. Add `?slug=` to fetch the full Markdown body of one article.',
          parameters: [
            {
              name: 'slug',
              in: 'query',
              required: false,
              description: 'Return a single article, including its full Markdown body.',
              schema: { type: 'string', pattern: '^[a-z0-9-]+$' },
            },
            {
              name: 'limit',
              in: 'query',
              required: false,
              description: 'Maximum number of results to return.',
              schema: { type: 'integer', minimum: 1, maximum: 100, default: 50 },
            },
          ],
          responses: {
            200: {
              description: 'Matching articles.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/ArticleList' } } },
            },
            404: errorResponse('No article with that slug.'),
            422: errorResponse('Invalid query parameter.'),
          },
        },
      },
      '/roi': {
        post: {
          operationId: 'calculateMissedCallCost',
          tags: ['tools'],
          summary: 'Estimate the revenue lost to missed calls',
          description: 'Runs the same arithmetic as the public calculator at /calculadora-roi and returns the monthly and yearly revenue a business loses by not answering every inbound call.',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/RoiRequest' } } },
          },
          responses: {
            200: {
              description: 'Estimated loss.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/RoiResponse' } } },
            },
            400: errorResponse('Body is not valid JSON.'),
            415: errorResponse('Content-Type is not application/json.'),
            422: errorResponse('One or more fields are missing or out of range.'),
          },
        },
      },
      '/leads': {
        post: {
          operationId: 'createLead',
          tags: ['leads'],
          summary: 'Request a callback',
          description: 'Submits a callback request. Use it only with the explicit consent of the person whose contact details are being sent. Returns the reference of the created request.',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/LeadRequest' } } },
          },
          responses: {
            201: {
              description: 'Callback request accepted.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/LeadResponse' } } },
            },
            400: errorResponse('Body is not valid JSON.'),
            413: errorResponse('Body larger than 64 KB.'),
            415: errorResponse('Content-Type is not application/json.'),
            422: errorResponse('One or more fields are missing or invalid.'),
            429: errorResponse('Too many submissions from the same client.'),
            503: errorResponse('Email delivery is unavailable.'),
          },
        },
      },
      '/health': {
        get: {
          operationId: 'getHealth',
          tags: ['service'],
          summary: 'Check API availability',
          description: 'Returns the API status and version. Cheap to poll before a longer sequence of calls.',
          responses: {
            200: {
              description: 'API is up.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Health' } } },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Error: errorSchema,
        ApiIndex: {
          type: 'object',
          required: ['name', 'version', 'documentation_url', 'openapi_url', 'operations'],
          properties: {
            name: { type: 'string' },
            version: { type: 'string' },
            documentation_url: { type: 'string', format: 'uri' },
            openapi_url: { type: 'string', format: 'uri' },
            agent_instructions_url: { type: 'string', format: 'uri' },
            operations: {
              type: 'array',
              items: {
                type: 'object',
                required: ['operationId', 'method', 'path', 'summary'],
                properties: {
                  operationId: { type: 'string' },
                  method: { type: 'string', enum: ['GET', 'POST'] },
                  path: { type: 'string' },
                  summary: { type: 'string' },
                },
              },
            },
          },
        },
        Service: {
          type: 'object',
          required: ['name', 'url', 'summary', 'languages', 'when_to_use', 'when_not_to_use'],
          properties: {
            name: { type: 'string' },
            url: { type: 'string', format: 'uri' },
            summary: { type: 'string' },
            languages: { type: 'array', items: { type: 'string' } },
            coverage: {
              type: 'object',
              required: ['countries', 'sectors', 'cities'],
              properties: {
                countries: { type: 'array', items: { type: 'string' } },
                sectors: { type: 'integer', description: 'Number of industries with a dedicated script.' },
                cities: { type: 'integer', description: 'Number of Spanish cities with a coverage page.' },
              },
            },
            activation_time_hours: { type: 'integer' },
            minimum_contract_months: { type: 'integer' },
            average_answer_seconds: { type: 'integer' },
            answer_rate_pct: { type: 'number' },
            pricing: {
              type: 'object',
              properties: {
                model: { type: 'string' },
                published: { type: 'boolean' },
                note: { type: 'string' },
                quote_url: { type: 'string', format: 'uri' },
              },
            },
            company: {
              type: 'object',
              description: 'Registered identity and third-party trust signals, for agents verifying the business.',
              properties: {
                legal_name: { type: 'string', description: 'Registered company name.' },
                trading_name: { type: 'string' },
                tax_id: { type: 'string', description: 'Spanish NIF of the company.' },
                registered_address: { type: 'string' },
                country: { type: 'string', description: 'ISO 3166-1 alpha-2 country code.' },
                founded: { type: 'string', description: 'Month the company was incorporated (YYYY-MM).' },
                founder: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    role: { type: 'string' },
                    linkedin: { type: 'string', format: 'uri' },
                  },
                },
                partners: { type: 'array', items: { type: 'string' } },
                rating: {
                  type: 'object',
                  description: 'Third-party review score, with the source that can be checked independently.',
                  properties: {
                    value: { type: 'number' },
                    best: { type: 'number' },
                    count: { type: 'integer' },
                    source: { type: 'string', format: 'uri' },
                  },
                },
                profiles: { type: 'array', items: { type: 'string', format: 'uri' } },
                contact_email: { type: 'string', format: 'email' },
                legal_notice_url: { type: 'string', format: 'uri' },
                privacy_policy_url: { type: 'string', format: 'uri' },
                about_url: { type: 'string', format: 'uri' },
              },
            },
            when_to_use: { type: 'array', items: { type: 'string' } },
            when_not_to_use: { type: 'array', items: { type: 'string' } },
            booking_url: { type: 'string', format: 'uri' },
          },
        },
        SectorSummary: {
          type: 'object',
          required: ['slug', 'name', 'url'],
          properties: {
            slug: { type: 'string' },
            name: { type: 'string', description: 'Industry name in Spanish.' },
            title: { type: 'string' },
            description: { type: 'string' },
            url: { type: 'string', format: 'uri' },
          },
        },
        SectorList: {
          type: 'object',
          required: ['count', 'total', 'items'],
          properties: {
            count: { type: 'integer', description: 'Number of items returned.' },
            total: { type: 'integer', description: 'Number of industries matching before the limit was applied.' },
            items: { type: 'array', items: { $ref: '#/components/schemas/SectorSummary' } },
          },
        },
        Sector: {
          allOf: [
            { $ref: '#/components/schemas/SectorSummary' },
            {
              type: 'object',
              properties: {
                features: {
                  type: 'array',
                  items: {
                    type: 'object',
                    required: ['title', 'description'],
                    properties: { title: { type: 'string' }, description: { type: 'string' } },
                  },
                },
                faq: { type: 'array', items: { $ref: '#/components/schemas/FaqEntry' } },
                markdown_url: { type: 'string', format: 'uri', description: 'Same page as Markdown.' },
              },
            },
          ],
        },
        CitySummary: {
          type: 'object',
          required: ['slug', 'name', 'url'],
          properties: {
            slug: { type: 'string' },
            name: { type: 'string' },
            region: { type: 'string' },
            description: { type: 'string' },
            url: { type: 'string', format: 'uri' },
          },
        },
        CityList: {
          type: 'object',
          required: ['count', 'total', 'items'],
          properties: {
            count: { type: 'integer' },
            total: { type: 'integer' },
            items: { type: 'array', items: { $ref: '#/components/schemas/CitySummary' } },
          },
        },
        City: {
          allOf: [
            { $ref: '#/components/schemas/CitySummary' },
            {
              type: 'object',
              properties: {
                local_context: { type: 'string' },
                top_sectors: { type: 'array', items: { $ref: '#/components/schemas/SectorSummary' } },
                faq: { type: 'array', items: { $ref: '#/components/schemas/FaqEntry' } },
                markdown_url: { type: 'string', format: 'uri' },
              },
            },
          ],
        },
        FaqEntry: {
          type: 'object',
          required: ['question', 'answer'],
          properties: { question: { type: 'string' }, answer: { type: 'string' } },
        },
        Article: {
          type: 'object',
          required: ['slug', 'title', 'url'],
          properties: {
            slug: { type: 'string' },
            title: { type: 'string' },
            excerpt: { type: 'string' },
            url: { type: 'string', format: 'uri' },
            markdown_url: { type: 'string', format: 'uri' },
            content_markdown: { type: 'string', description: 'Full article body in Markdown. Only present when a single article is requested.' },
          },
        },
        ArticleList: {
          type: 'object',
          required: ['count', 'total', 'items'],
          properties: {
            count: { type: 'integer' },
            total: { type: 'integer' },
            items: { type: 'array', items: { $ref: '#/components/schemas/Article' } },
          },
        },
        RoiRequest: {
          type: 'object',
          required: ['callsPerMonth', 'missedPct', 'leadPct', 'averageTicket', 'conversionPct'],
          properties: {
            callsPerMonth: { type: 'number', minimum: 1, maximum: 1000000, description: 'Inbound calls received per month.', examples: [200] },
            missedPct: { type: 'number', minimum: 0, maximum: 100, description: 'Percentage of those calls that go unanswered.', examples: [35] },
            leadPct: { type: 'number', minimum: 0, maximum: 100, description: 'Percentage of calls that are new leads.', examples: [30] },
            averageTicket: { type: 'number', minimum: 1, maximum: 10000000, description: 'Average revenue per won customer, in euros.', examples: [500] },
            conversionPct: { type: 'number', minimum: 0, maximum: 100, description: 'Percentage of leads that convert.', examples: [20] },
          },
        },
        RoiResponse: {
          type: 'object',
          required: ['input', 'result'],
          properties: {
            input: { $ref: '#/components/schemas/RoiRequest' },
            result: {
              type: 'object',
              required: ['missedCallsPerMonth', 'lostLeadsPerMonth', 'lostRevenuePerMonth', 'lostRevenuePerYear', 'currency'],
              properties: {
                missedCallsPerMonth: { type: 'integer' },
                lostLeadsPerMonth: { type: 'integer' },
                lostRevenuePerMonth: { type: 'integer' },
                lostRevenuePerYear: { type: 'integer' },
                currency: { type: 'string', enum: ['EUR'] },
              },
            },
            calculator_url: { type: 'string', format: 'uri' },
          },
        },
        LeadRequest: {
          type: 'object',
          required: ['name', 'email', 'phone', 'context'],
          properties: {
            name: { type: 'string', minLength: 2, maxLength: 120, description: 'Full name of the person to call back.' },
            email: { type: 'string', format: 'email', maxLength: 200 },
            phone: { type: 'string', minLength: 6, maxLength: 40, description: 'Phone number in international or Spanish national format.' },
            context: { type: 'string', minLength: 5, maxLength: 2000, description: 'What the business needs: sector, call volume, hours to cover.' },
            company: { type: 'string', maxLength: 160, description: 'Company name, optional.' },
            source: { type: 'string', maxLength: 80, description: 'Where the request came from, e.g. the name of the calling agent.' },
            website: { type: 'string', maxLength: 200, description: 'Honeypot. Must be empty; requests that fill it are rejected.' },
          },
        },
        LeadResponse: {
          type: 'object',
          required: ['ok', 'id', 'status'],
          properties: {
            ok: { type: 'boolean' },
            id: { type: 'string', description: 'Reference for this callback request.' },
            status: { type: 'string', enum: ['received'] },
            message: { type: 'string' },
            next_step: { type: 'string' },
            booking_url: { type: 'string', format: 'uri' },
          },
        },
        Health: {
          type: 'object',
          required: ['status', 'version'],
          properties: {
            status: { type: 'string', enum: ['ok'] },
            version: { type: 'string' },
            openapi_url: { type: 'string', format: 'uri' },
          },
        },
      },
    },
  }
}
