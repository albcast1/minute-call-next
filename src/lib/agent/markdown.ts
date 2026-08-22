import sectors from '@/data/sectors.json'
import cities from '@/data/cities.json'
import articles from '@/data/articles.json'
import {
  AGENT_INSTRUCTIONS_URL,
  BOOKING_URL,
  COMPANY_FACTS,
  LEGAL_ENTITY,
  DOCS_URL,
  LLMS_FULL_URL,
  LLMS_URL,
  OPENAPI_URL,
  SITEMAP_URL,
  SITE_NAME,
  SITE_URL,
  WHEN_NOT_TO_USE,
  WHEN_TO_USE,
} from './site'

type Sector = (typeof sectors)[number]
type City = (typeof cities)[number]
type Article = (typeof articles)[number]

export type MarkdownDocument = {
  status: 200 | 404
  path: string
  title: string
  body: string
}

const sectorBySlug = new Map<string, Sector>(sectors.map((s): [string, Sector] => [s.slug, s]))
const cityBySlug = new Map<string, City>(cities.map((c): [string, City] => [c.slug, c]))
const articleBySlug = new Map<string, Article>(articles.map((a): [string, Article] => [a.slug, a]))


/** Some records omit optional copy fields; read them without narrowing the JSON union. */
function optionalString(record: object, key: string): string | undefined {
  const value = (record as Record<string, unknown>)[key]
  return typeof value === 'string' && value.trim() !== '' ? value : undefined
}

/** Language landing pages that live as their own route files. */
const LANGUAGE_PAGES: Record<string, string> = {
  'call-center-en-aleman': 'Call center en alemán',
  'call-center-en-danes': 'Call center en danés',
  'call-center-en-frances': 'Call center en francés',
  'call-center-en-hebreo': 'Call center en hebreo',
  'call-center-en-holandes': 'Call center en holandés',
  'call-center-en-ingles': 'Call center en inglés',
  'call-center-en-italiano': 'Call center en italiano',
  'call-center-en-noruego': 'Call center en noruego',
  'call-center-en-sueco': 'Call center en sueco',
  'call-center-para-hoteles': 'Call center para hoteles',
}

/**
 * Normalise an incoming request path into a lookup key.
 * Accepts `/foo`, `/foo/`, `/foo.md` and `/foo/index.md`.
 */
export function normalizePath(rawPath: string): string {
  let path = rawPath.split('?')[0].split('#')[0]
  try {
    path = decodeURIComponent(path)
  } catch {
    /* keep the raw form if it is not valid percent-encoding */
  }
  if (!path.startsWith('/')) path = `/${path}`
  path = path.replace(/\/index\.md$/i, '/')
  path = path.replace(/\.md$/i, '')
  if (path.length > 1) path = path.replace(/\/+$/, '')
  return path === '' ? '/' : path
}

function link(label: string, href: string): string {
  return `- [${label}](${href.startsWith('http') ? href : SITE_URL + href})`
}

function frontMatter(title: string, path: string, description?: string): string {
  const lines = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `canonical: ${SITE_URL}${path === '/' ? '' : path}`,
  ]
  if (description) lines.push(`description: ${JSON.stringify(description.replace(/\s+/g, ' ').trim())}`)
  lines.push('---', '')
  return lines.join('\n')
}

const AGENT_FOOTER = [
  '',
  '---',
  '',
  '## Machine-readable resources',
  '',
  link('Agent instructions (when to use Minute Call)', AGENT_INSTRUCTIONS_URL),
  link('OpenAPI specification', OPENAPI_URL),
  link('Developer documentation', DOCS_URL),
  link('llms.txt', LLMS_URL),
  link('llms-full.txt', LLMS_FULL_URL),
  link('Sitemap', SITEMAP_URL),
  '',
].join('\n')

function faqSection(faq: { question: string; answer: string }[] | undefined): string {
  if (!faq || faq.length === 0) return ''
  return ['', '## Preguntas frecuentes', '', ...faq.flatMap((f) => [`### ${f.question}`, '', f.answer, ''])].join('\n')
}

/* ------------------------------------------------------------------ */
/* Static pages                                                        */
/* ------------------------------------------------------------------ */

function homeDoc(): string {
  return [
    `# ${SITE_NAME} - Recepcionista virtual y call center para PYMES`,
    '',
    'Minute Call atiende las llamadas entrantes de pequeñas y medianas empresas 24/7, con agentes nativos en España (español, inglés y francés) o con recepcionistas de IA. Sin permanencia y activo en 48 horas.',
    '',
    '## Qué hacemos',
    '',
    '- Recepción de llamadas en nombre de tu empresa, siguiendo tu propio guión y protocolo.',
    '- Cualificación de leads y envío inmediato del resumen por email.',
    '- Gestión y confirmación de citas, con integración en tu CRM o agenda.',
    '- Cobertura 24/7, incluidos fines de semana y festivos.',
    '',
    '## Cuándo recurrir a Minute Call',
    '',
    ...WHEN_TO_USE.map((item) => `- ${item}`),
    '',
    '## Cuándo NO es la opción adecuada',
    '',
    ...WHEN_NOT_TO_USE.map((item) => `- ${item}`),
    '',
    '## Secciones principales',
    '',
    link('Reservar una llamada', BOOKING_URL),
    link('Sobre nosotros', '/sobre-nosotros'),
    link('Documentación para desarrolladores y agentes', DOCS_URL),
    link('Calculadora de llamadas perdidas', '/calculadora-roi'),
    link('Landings por sector', '/lp'),
    link('Cobertura por ciudad', '/atencion-telefonica'),
    link('Artículos', '/articulos'),
    link('Comparativa con otros proveedores', '/comparar'),
    link('Política de privacidad', '/politica-privacidad'),
  ].join('\n')
}

function docsDoc(): string {
  return [
    '# Documentación para desarrolladores y agentes',
    '',
    `La API pública de ${SITE_NAME} es de solo lectura salvo la creación de solicitudes de contacto. No requiere autenticación para los endpoints de consulta.`,
    '',
    '## Endpoints',
    '',
    '| Método | Ruta | Operación |',
    '| --- | --- | --- |',
    '| GET | /api/v1 | listApiIndex |',
    '| GET | /api/v1/service | getService |',
    '| GET | /api/v1/sectors | listSectors |',
    '| GET | /api/v1/sectors/{slug} | getSector |',
    '| GET | /api/v1/cities | listCities |',
    '| GET | /api/v1/cities/{slug} | getCity |',
    '| GET | /api/v1/articles | listArticles |',
    '| POST | /api/v1/roi | calculateMissedCallCost |',
    '| POST | /api/v1/leads | createLead |',
    '| GET | /api/v1/health | getHealth |',
    '',
    '## Especificación',
    '',
    link('OpenAPI 3.1 (JSON)', OPENAPI_URL),
    link('OpenAPI 3.1 (YAML)', '/api/openapi.yaml'),
    '',
    '## Ejemplo',
    '',
    '```bash',
    `curl -s -X POST ${SITE_URL}/api/v1/roi \\`,
    "  -H 'Content-Type: application/json' \\",
    '  -d \'{"callsPerMonth":200,"missedPct":35,"leadPct":30,"averageTicket":500,"conversionPct":20}\'',
    '```',
    '',
    '## Errores',
    '',
    'Todos los errores devuelven JSON con `code`, `message`, `hint`, `status` y `documentation_url`; los de validación añaden `details` por campo.',
  ].join('\n')
}

const STATIC_DOCS: Record<string, { title: string; build: () => string }> = {
  '/': { title: `${SITE_NAME} - Recepcionista virtual y call center para PYMES`, build: homeDoc },
  '/docs': { title: 'Documentación para desarrolladores y agentes', build: docsDoc },
  '/sobre-nosotros': {
    title: 'Sobre Minute Call',
    build: () =>
      [
        '# Sobre Minute Call',
        '',
        'Minute Call es una empresa española de recepción telefónica, atención al cliente y secretaría virtual 24/7 para PYMES y autónomos. Opera con agentes nativos basados en España o con recepcionistas de inteligencia artificial, según lo que necesite cada cliente.',
        '',
        '## Identidad de la empresa',
        '',
        `- **Razón social:** ${LEGAL_ENTITY.legalName}`,
        `- **NIF:** ${LEGAL_ENTITY.taxId}`,
        `- **Domicilio social y fiscal:** ${LEGAL_ENTITY.address}`,
        `- **Constitución:** ${COMPANY_FACTS.founded}`,
        `- **Contacto:** ${LEGAL_ENTITY.email}`,
        `- **Actividad:** ${LEGAL_ENTITY.activity}`,
        '',
        '## Fundador',
        '',
        `- **${COMPANY_FACTS.founder.name}** (${COMPANY_FACTS.founder.role}). Ex General Manager en Leocare, insurtech valorada en 350 M€. Como Country Manager en Novum Bank escaló el mercado francés de 0 a 45 M€ de facturación, con crecimiento del 70% interanual, y multiplicó el EBITDA por 8. LinkedIn: ${COMPANY_FACTS.founder.linkedin}`,
        '',
        '## Partners y credenciales verificables',
        '',
        '- Partner comercial de **Teleperformance**, líder mundial en BPO con más de 410.000 empleados.',
        '- Partner comercial de **Zendesk**, plataforma de atención al cliente.',
        `- Valoración **${COMPANY_FACTS.rating.value}/${COMPANY_FACTS.rating.best}** en Trustpilot sobre ${COMPANY_FACTS.rating.count} reseñas: ${COMPANY_FACTS.rating.source}`,
        `- Perfil de empresa en LinkedIn: ${COMPANY_FACTS.profiles[0]}`,
        '',
        '## Operativa',
        '',
        `- Tiempo medio de respuesta: ${COMPANY_FACTS.averageAnswerSeconds} segundos. Tasa de respuesta: ${COMPANY_FACTS.answerRatePct}%.`,
        '- Idiomas de atención: español, inglés y francés, con agentes nativos.',
        '- Sin permanencia, sin cuota de alta y activación en 48 horas.',
        '- Sectores atendidos: clínicas, despachos de abogados, inmobiliarias, asesorías, veterinarias y otras PYMES de servicios.',
        '',
        '## Documentos legales',
        '',
        link('Aviso legal', '/aviso-legal'),
        link('Política de privacidad', '/politica-privacidad'),
        link('Política de cookies', '/politica-cookies'),
        '',
        link('Página completa', '/sobre-nosotros'),
        link('Contacto y reserva de llamada', BOOKING_URL),
      ].join('\n'),
  },
  '/aviso-legal': {
    title: 'Aviso legal',
    build: () =>
      [
        '# Aviso legal',
        '',
        'Datos identificativos del titular del sitio web, conforme al artículo 10 de la Ley 34/2002 (LSSI-CE).',
        '',
        `- **Denominación social:** ${LEGAL_ENTITY.legalName}`,
        `- **NIF:** ${LEGAL_ENTITY.taxId}`,
        `- **Domicilio social y fiscal:** ${LEGAL_ENTITY.address}`,
        `- **Correo de contacto:** ${LEGAL_ENTITY.email}`,
        `- **Actividad:** ${LEGAL_ENTITY.activity}`,
        `- **Sitio web:** ${SITE_URL}`,
        '',
        link('Aviso legal completo', '/aviso-legal'),
        link('Política de privacidad', '/politica-privacidad'),
        link('Política de cookies', '/politica-cookies'),
      ].join('\n'),
  },
  '/reserva-llamada': {
    title: 'Reserva una llamada con Minute Call',
    build: () =>
      [
        '# Reserva una llamada',
        '',
        'Cuéntanos el volumen de llamadas y el horario que necesitas cubrir y te preparamos un presupuesto. Sin permanencia ni coste de alta.',
        '',
        '## Cómo contactar',
        '',
        link('Formulario de reserva', BOOKING_URL),
        `- API: \`POST ${SITE_URL}/api/v1/leads\` con \`{ "name", "email", "phone", "context" }\``,
        '- LinkedIn: https://www.linkedin.com/company/minute-call/',
      ].join('\n'),
  },
  '/calculadora-roi': {
    title: 'Calculadora del coste de las llamadas perdidas',
    build: () =>
      [
        '# Calculadora del coste de las llamadas perdidas',
        '',
        'Estima cuánta facturación pierde un negocio cada mes por no atender todas sus llamadas.',
        '',
        '## Entradas',
        '',
        '- `callsPerMonth`: llamadas entrantes al mes.',
        '- `missedPct`: porcentaje de llamadas no atendidas.',
        '- `leadPct`: porcentaje de llamadas que son leads nuevos.',
        '- `averageTicket`: ticket medio por cliente, en euros.',
        '- `conversionPct`: porcentaje de leads que cierran.',
        '',
        '## Salidas',
        '',
        '- `missedCallsPerMonth`, `lostLeadsPerMonth`, `lostRevenuePerMonth`, `lostRevenuePerYear`.',
        '',
        `Versión programática: \`POST ${SITE_URL}/api/v1/roi\`.`,
        '',
        link('Calculadora interactiva', '/calculadora-roi'),
      ].join('\n'),
  },
  '/comparar': {
    title: 'Minute Call frente a otros proveedores',
    build: () =>
      [
        '# Minute Call frente a otros proveedores',
        '',
        'Comparativa con Teleperformance, Konecta, Atento, Secretaria.es y Secrelan para empresas pequeñas y medianas.',
        '',
        '- Agentes nativos basados en España, no deslocalizados.',
        '- Sin permanencia y sin mínimo de volumen ni de tamaño de equipo.',
        '- Activación en 48 horas frente a 1-3 meses de los grandes BPO.',
        '',
        link('Comparativa completa', '/comparar'),
      ].join('\n'),
  },
  '/politica-privacidad': {
    title: 'Política de privacidad',
    build: () =>
      [
        '# Política de privacidad',
        '',
        'Minute Call trata los datos personales conforme al RGPD (UE 2016/679) y a la LOPDGDD. La versión vigente y completa, con responsable del tratamiento, finalidades, base jurídica, plazos de conservación, encargados y ejercicio de derechos, está publicada en la web.',
        '',
        link('Política de privacidad completa', '/politica-privacidad'),
        link('Política de cookies', '/politica-cookies'),
      ].join('\n'),
  },
  '/politica-cookies': {
    title: 'Política de cookies',
    build: () =>
      ['# Política de cookies', '', link('Política de cookies completa', '/politica-cookies')].join('\n'),
  },
}

/* ------------------------------------------------------------------ */
/* Index pages                                                         */
/* ------------------------------------------------------------------ */

function sectorsIndex(): string {
  return [
    '# Sectores atendidos',
    '',
    `${sectors.length} sectores con guión y protocolo especializado.`,
    '',
    ...sectors.map((s) => link(s.sector, `/lp/${s.slug}`)),
    '',
    `Versión JSON: \`GET ${SITE_URL}/api/v1/sectors\`.`,
  ].join('\n')
}

function citiesIndex(): string {
  return [
    '# Atención telefónica por ciudad',
    '',
    `Cobertura en ${cities.length} ciudades españolas.`,
    '',
    ...cities.map((c) => link(c.city, `/atencion-telefonica/${c.slug}`)),
    '',
    `Versión JSON: \`GET ${SITE_URL}/api/v1/cities\`.`,
  ].join('\n')
}

function articlesIndex(): string {
  return [
    '# Artículos',
    '',
    ...articles.map((a) => link(a.title, `/articulos/${a.slug}`)),
    '',
    `Versión JSON: \`GET ${SITE_URL}/api/v1/articles\`.`,
  ].join('\n')
}

/* ------------------------------------------------------------------ */
/* Dynamic pages                                                       */
/* ------------------------------------------------------------------ */

function sectorDoc(sector: Sector): string {
  return [
    `# ${sector.title.replace(/\.$/, '')}`,
    '',
    sector.heroSubtitle,
    '',
    `**Sector:** ${sector.sector}`,
    '',
    '## Qué incluye',
    '',
    ...sector.features.map((f) => `- **${f.title}:** ${f.description}`),
    '',
    ...(sector.testimonial
      ? ['## Testimonio', '', `> ${sector.testimonial.quote}`, '>', `> — ${sector.testimonial.author}, ${sector.testimonial.role}`, '']
      : []),
    faqSection(sector.faq),
    '## Cobertura por ciudad',
    '',
    ...cities.slice(0, 10).map((c) => link(`${sector.sector} en ${c.city}`, `/atencion-telefonica/${c.slug}/${sector.slug}`)),
  ].join('\n')
}

function cityDoc(city: City): string {
  return [
    `# ${city.heroTitle.replace(/\.$/, '')}`,
    '',
    city.heroSubtitle,
    '',
    `**Ciudad:** ${city.city} (${city.region})`,
    '',
    '## Contexto local',
    '',
    city.localContext,
    '',
    '## Sectores con más demanda',
    '',
    ...city.topSectors.map((s) => link(s.title.replace(/\.$/, ''), `/atencion-telefonica/${city.slug}/${s.slug}`)),
    faqSection(city.faq),
  ].join('\n')
}

function citySectorDoc(city: City, sector: Sector): string {
  return [
    `# ${sector.sector.charAt(0).toUpperCase()}${sector.sector.slice(1)} en ${city.city}: atención telefónica 24/7`,
    '',
    `Minute Call atiende las llamadas de ${sector.sector} en ${city.city} (${city.region}) con agentes nativos basados en España o con recepcionistas de IA.`,
    '',
    sector.heroSubtitle,
    '',
    ...(optionalString(city, 'sectorContext')
      ? ['## Contexto local', '', optionalString(city, 'sectorContext') as string, '']
      : []),
    '## Enlaces relacionados',
    '',
    link(`Todos los sectores en ${city.city}`, `/atencion-telefonica/${city.slug}`),
    link(`${sector.sector} en toda España`, `/lp/${sector.slug}`),
  ].join('\n')
}

function articleDoc(article: Article): string {
  return [
    `# ${article.title}`,
    '',
    article.excerpt,
    '',
    article.content,
    faqSection(article.faq),
    ...(article.relatedLinks && article.relatedLinks.length > 0
      ? ['', '## Enlaces relacionados', '', ...article.relatedLinks.map((l) => link(l.label, l.href))]
      : []),
  ].join('\n')
}

/* ------------------------------------------------------------------ */
/* 404                                                                 */
/* ------------------------------------------------------------------ */

/** Short recovery body served with every 404, in both HTML and Markdown variants. */
export function notFoundMarkdown(path: string): string {
  return [
    '# 404 - Página no encontrada',
    '',
    `No existe ningún recurso en \`${path}\` en ${SITE_URL}.`,
    '',
    '## Dónde buscar',
    '',
    link('Índice del sitio (sitemap.xml)', SITEMAP_URL),
    link('Resumen para LLMs (llms.txt)', LLMS_URL),
    link('Contenido completo para LLMs (llms-full.txt)', LLMS_FULL_URL),
    link('Instrucciones para agentes', AGENT_INSTRUCTIONS_URL),
    link('Documentación de la API', DOCS_URL),
    link('Especificación OpenAPI', OPENAPI_URL),
    '',
    '## Secciones principales',
    '',
    link('Inicio', '/'),
    link('Sectores', '/lp'),
    link('Ciudades', '/atencion-telefonica'),
    link('Artículos', '/articulos'),
    link('Calculadora de llamadas perdidas', '/calculadora-roi'),
    link('Reservar una llamada', BOOKING_URL),
    '',
  ].join('\n')
}

/* ------------------------------------------------------------------ */
/* Resolver                                                            */
/* ------------------------------------------------------------------ */

/** Resolve a request path to its Markdown representation. */
export function renderMarkdown(rawPath: string): MarkdownDocument {
  const path = normalizePath(rawPath)

  const staticDoc = STATIC_DOCS[path]
  if (staticDoc) {
    return {
      status: 200,
      path,
      title: staticDoc.title,
      body: frontMatter(staticDoc.title, path) + staticDoc.build() + AGENT_FOOTER,
    }
  }

  if (path === '/lp') {
    return { status: 200, path, title: 'Sectores atendidos', body: frontMatter('Sectores atendidos', path) + sectorsIndex() + AGENT_FOOTER }
  }
  if (path === '/atencion-telefonica') {
    return { status: 200, path, title: 'Atención telefónica por ciudad', body: frontMatter('Atención telefónica por ciudad', path) + citiesIndex() + AGENT_FOOTER }
  }
  if (path === '/articulos') {
    return { status: 200, path, title: 'Artículos', body: frontMatter('Artículos', path) + articlesIndex() + AGENT_FOOTER }
  }

  const segments = path.split('/').filter(Boolean)

  if (segments.length === 1 && LANGUAGE_PAGES[segments[0]]) {
    const title = LANGUAGE_PAGES[segments[0]]
    return {
      status: 200,
      path,
      title,
      body:
        frontMatter(title, path) +
        [`# ${title}`, '', `Minute Call ofrece ${title.toLowerCase()} con agentes nativos, sin permanencia y con activación en 48 horas.`, '', link('Página completa', path), link('Reservar una llamada', BOOKING_URL)].join('\n') +
        AGENT_FOOTER,
    }
  }

  if (segments[0] === 'lp' && segments.length === 2) {
    const sector = sectorBySlug.get(segments[1])
    if (sector) {
      return { status: 200, path, title: sector.metaTitle, body: frontMatter(sector.metaTitle, path, sector.metaDescription) + sectorDoc(sector) + AGENT_FOOTER }
    }
  }

  if (segments[0] === 'atencion-telefonica' && segments.length === 2) {
    const city = cityBySlug.get(segments[1])
    if (city) {
      return { status: 200, path, title: city.metaTitle, body: frontMatter(city.metaTitle, path, city.metaDescription) + cityDoc(city) + AGENT_FOOTER }
    }
  }

  if (segments[0] === 'atencion-telefonica' && segments.length === 3) {
    const city = cityBySlug.get(segments[1])
    const sector = sectorBySlug.get(segments[2])
    if (city && sector) {
      const title = `${sector.sector} en ${city.city} | ${SITE_NAME}`
      return { status: 200, path, title, body: frontMatter(title, path) + citySectorDoc(city, sector) + AGENT_FOOTER }
    }
  }

  if (segments[0] === 'articulos' && segments.length === 2) {
    const article = articleBySlug.get(segments[1])
    if (article) {
      return { status: 200, path, title: article.metaTitle, body: frontMatter(article.metaTitle, path, article.metaDescription) + articleDoc(article) + AGENT_FOOTER }
    }
  }

  return { status: 404, path, title: '404 - Página no encontrada', body: notFoundMarkdown(path) }
}
