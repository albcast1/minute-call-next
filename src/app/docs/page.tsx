import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { API_BASE, DOCS_URL, SITE_URL } from '@/lib/agent/site'
import { buildOpenApiDocument, OPENAPI_VERSION } from '@/lib/api/openapi'

export const metadata: Metadata = {
  title: 'Minute Call API y documentación para desarrolladores | minute call',
  description:
    'Documentación de la API pública de Minute Call: especificación OpenAPI, endpoints de sectores y ciudades, calculadora de llamadas perdidas, alta de leads, autenticación y errores JSON.',
  alternates: { canonical: DOCS_URL },
  keywords: [
    'Minute Call API',
    'Minute Call documentación',
    'Minute Call developers',
    'API recepcionista virtual',
    'OpenAPI call center',
  ],
  openGraph: {
    title: 'Minute Call API y documentación para desarrolladores',
    description:
      'API pública de Minute Call con especificación OpenAPI 3.1, endpoints REST y respuestas JSON estructuradas.',
    url: DOCS_URL,
    siteName: 'minute call',
    locale: 'es_ES',
    type: 'website',
  },
}

const doc = buildOpenApiDocument()

const operations = Object.entries(doc.paths).flatMap(([path, methods]) =>
  Object.entries(methods as unknown as Record<string, { operationId: string; summary: string; description: string }>).map(
    ([method, operation]) => ({
      method: method.toUpperCase(),
      path: `/api/v1${path === '/' ? '' : path}`,
      operationId: operation.operationId,
      summary: operation.summary,
      description: operation.description,
    }),
  ),
)

const apiSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebAPI',
  name: 'Minute Call Public API',
  description:
    'API pública de Minute Call: cobertura por sector y ciudad, calculadora del coste de las llamadas perdidas y alta de solicitudes de llamada.',
  url: DOCS_URL,
  documentation: DOCS_URL,
  termsOfService: `${SITE_URL}/politica-privacidad`,
  provider: { '@type': 'Organization', name: 'minute call', url: SITE_URL },
  potentialAction: {
    '@type': 'ConsumeAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${API_BASE}/service`, httpMethod: 'GET', contentType: 'application/json' },
  },
}

const codeBlock: CSSProperties = {
  background: 'rgba(0,0,0,0.04)',
  border: '1px solid rgba(0,0,0,0.08)',
  borderRadius: 12,
  padding: 20,
  overflowX: 'auto',
  fontSize: 13,
  lineHeight: 1.7,
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  whiteSpace: 'pre',
  margin: 0,
}

const cellStyle: CSSProperties = {
  padding: '14px 12px',
  borderBottom: '1px solid rgba(0,0,0,0.08)',
  fontSize: 14,
  verticalAlign: 'top',
  textAlign: 'left',
}

export default function DocsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(apiSchema) }} />

      <section style={{ textAlign: 'center', maxWidth: 860, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(16px,5vw,64px) clamp(24px,4vw,40px)' }}>
        <span className="pill-label" style={{ marginBottom: 20, display: 'inline-block' }}>
          Minute Call para desarrolladores y agentes de IA
        </span>
        <h1>
          Minute Call API y <span className="serif-italic">documentación</span>
        </h1>
        <p style={{ maxWidth: 640, margin: '0 auto 32px' }}>
          Minute Call publica una API REST pública para consultar la cobertura por sector y ciudad, estimar el coste de
          las llamadas perdidas y registrar solicitudes de llamada. Todas las respuestas son JSON y la superficie
          completa está descrita en OpenAPI 3.1.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/openapi.json" className="btn-contact">Especificación OpenAPI (JSON)</a>
          <a href="/api/openapi.yaml" style={{ display: 'inline-block', border: '1.5px solid rgba(0,0,0,0.15)', borderRadius: 999, padding: '12px 28px', fontSize: 14, fontWeight: 500, color: 'black', textDecoration: 'none' }}>
            OpenAPI (YAML)
          </a>
        </div>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 clamp(16px,5vw,64px) clamp(32px,6vw,56px)' }}>
        <div className="card" style={{ padding: 32 }}>
          <h2 style={{ fontSize: 22, marginBottom: 16 }}>Autenticación</h2>
          <p style={{ marginBottom: 12 }}>
            Los endpoints de lectura (<code>/service</code>, <code>/sectors</code>, <code>/cities</code>,{' '}
            <code>/articles</code>, <code>/roi</code>, <code>/health</code>) son públicos y no requieren clave de API ni
            cabecera <code>Authorization</code>.
          </p>
          <p style={{ marginBottom: 0 }}>
            <code>POST /api/v1/leads</code> también es público, pero está limitado a 5 solicitudes por hora y por
            cliente y valida todos los campos. Envía datos personales únicamente con el consentimiento explícito de la
            persona a la que vamos a llamar.
          </p>
        </div>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 clamp(16px,5vw,64px) clamp(32px,6vw,56px)' }}>
        <h2 style={{ fontSize: 22, marginBottom: 20 }}>Endpoints</h2>
        <p style={{ marginBottom: 20 }}>
          Base URL: <code>{API_BASE}</code> · Versión de la especificación: <code>{OPENAPI_VERSION}</code>
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
            <thead>
              <tr>
                <th style={{ ...cellStyle, fontWeight: 600 }}>Método</th>
                <th style={{ ...cellStyle, fontWeight: 600 }}>Ruta</th>
                <th style={{ ...cellStyle, fontWeight: 600 }}>operationId</th>
                <th style={{ ...cellStyle, fontWeight: 600 }}>Qué hace</th>
              </tr>
            </thead>
            <tbody>
              {operations.map((operation) => (
                <tr key={operation.operationId}>
                  <td style={cellStyle}><code>{operation.method}</code></td>
                  <td style={cellStyle}><code>{operation.path}</code></td>
                  <td style={cellStyle}><code>{operation.operationId}</code></td>
                  <td style={cellStyle}>{operation.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 clamp(16px,5vw,64px) clamp(32px,6vw,56px)' }}>
        <h2 style={{ fontSize: 22, marginBottom: 20 }}>Ejemplos</h2>

        <h3 style={{ fontSize: 16, margin: '24px 0 12px' }}>Descubrir la API</h3>
        <pre style={codeBlock}>{`curl -s ${API_BASE}`}</pre>

        <h3 style={{ fontSize: 16, margin: '24px 0 12px' }}>Comprobar si cubrimos un sector</h3>
        <pre style={codeBlock}>{`curl -s "${API_BASE}/sectors?q=clinicas&limit=5"`}</pre>

        <h3 style={{ fontSize: 16, margin: '24px 0 12px' }}>Calcular el coste de las llamadas perdidas</h3>
        <pre style={codeBlock}>{`curl -s -X POST ${API_BASE}/roi \\
  -H 'Content-Type: application/json' \\
  -d '{
    "callsPerMonth": 200,
    "missedPct": 35,
    "leadPct": 30,
    "averageTicket": 500,
    "conversionPct": 20
  }'`}</pre>

        <h3 style={{ fontSize: 16, margin: '24px 0 12px' }}>Solicitar una llamada</h3>
        <pre style={codeBlock}>{`curl -s -X POST ${API_BASE}/leads \\
  -H 'Content-Type: application/json' \\
  -d '{
    "name": "Ana Ruiz",
    "email": "ana@clinicaruiz.es",
    "phone": "+34600111222",
    "context": "Clinica dental en Valencia, 300 llamadas/mes, cobertura 9-21h",
    "source": "mi-agente"
  }'`}</pre>

        <h3 style={{ fontSize: 16, margin: '24px 0 12px' }}>Leer cualquier página en Markdown</h3>
        <pre style={codeBlock}>{`curl -s -H 'Accept: text/markdown' ${SITE_URL}/lp/recepcionista-ia-clinicas
curl -s ${SITE_URL}/lp/recepcionista-ia-clinicas.md`}</pre>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 clamp(16px,5vw,64px) clamp(32px,6vw,56px)' }}>
        <h2 style={{ fontSize: 22, marginBottom: 20 }}>Errores</h2>
        <p style={{ marginBottom: 20 }}>
          Todos los errores devuelven JSON con el mismo envoltorio: <code>code</code> legible por máquina,{' '}
          <code>message</code>, <code>hint</code> con la acción recomendada, <code>status</code> y{' '}
          <code>documentation_url</code>. Los errores de validación añaden <code>details</code> con el campo concreto.
        </p>
        <pre style={codeBlock}>{`{
  "error": "One or more fields are missing or out of range.",
  "code": "validation_error",
  "message": "One or more fields are missing or out of range.",
  "hint": "Fix the fields listed in \`details\` and retry.",
  "details": [
    { "field": "callsPerMonth", "reason": "required" }
  ],
  "status": 422,
  "documentation_url": "${DOCS_URL}"
}`}</pre>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 clamp(16px,5vw,64px) clamp(40px,8vw,80px)' }}>
        <h2 style={{ fontSize: 22, marginBottom: 20 }}>Recursos para agentes</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <li><a href="/agent-instructions.md">/agent-instructions.md</a> — cuándo usar Minute Call y cómo llamarnos.</li>
          <li><a href="/openapi.json">/openapi.json</a> — especificación OpenAPI 3.1.</li>
          <li><a href="/api/openapi.yaml">/api/openapi.yaml</a> — la misma especificación en YAML.</li>
          <li><a href="/llms.txt">/llms.txt</a> — resumen del sitio para LLMs.</li>
          <li><a href="/llms-full.txt">/llms-full.txt</a> — contenido completo para LLMs.</li>
          <li><a href="/sitemap.xml">/sitemap.xml</a> — índice de páginas.</li>
          <li><a href="/sobre-nosotros.md">/sobre-nosotros.md</a> — identidad de la empresa, fundador y partners en Markdown.</li>
          <li><a href="/aviso-legal">/aviso-legal</a> — datos del titular conforme a la LSSI-CE.</li>
          <li><a href="/index.md">/index.md</a> — versión Markdown de la portada.</li>
        </ul>
      </section>
    </>
  )
}
