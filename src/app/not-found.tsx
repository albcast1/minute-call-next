import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pagina no encontrada (404) | minute call',
  description:
    'La pagina que buscas no existe. Consulta el sitemap, llms.txt o la documentacion para agentes de minute call.',
  robots: { index: false, follow: true },
}

/**
 * 404 page. Next.js already answers with a real HTTP 404 status here; the
 * "Donde seguir buscando" block gives crawlers and agents the machine-readable
 * entry points they need to recover (sitemap, llms.txt, docs, OpenAPI).
 * The same content is served as Markdown when the request asks for it.
 */
export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-24 text-center">
      <span className="pill-label" style={{ marginBottom: 20 }}>Error 404</span>
      <h1>Pagina no encontrada</h1>
      <p style={{ maxWidth: 440, marginBottom: 32 }}>
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/" className="btn-contact">Volver al inicio</Link>
        <Link href="/reserva-llamada" className="btn-cta">Reserva una llamada</Link>
      </div>
      <div className="flex flex-wrap justify-center gap-2" style={{ fontSize: 15, marginTop: 48 }}>
        {[
          ["/lp", "Sectores"],
          ["/atencion-telefonica", "Ciudades"],
          ["/articulos", "Blog"],
          ["/calculadora-roi", "Calculadora ROI"],
        ].map(([href, label]) => (
          <Link key={href} href={href} style={{ padding: "8px 13px", borderRadius: 5, background: "var(--soft)" }}>
            {label}
          </Link>
        ))}
      </div>
      <div className="max-w-xl" style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 40 }}>
        <p style={{ marginBottom: 12, fontFamily: "var(--mono)", fontSize: 12, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink)" }}>
          Donde seguir buscando
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2" style={{ fontFamily: "var(--mono)", fontSize: 13 }}>
          <a href="/sitemap.xml" style={{ color: "var(--ink-2)" }}>sitemap.xml</a>
          <a href="/llms.txt" style={{ color: "var(--ink-2)" }}>llms.txt</a>
          <a href="/llms-full.txt" style={{ color: "var(--ink-2)" }}>llms-full.txt</a>
          <a href="/agent-instructions.md" style={{ color: "var(--ink-2)" }}>agent-instructions.md</a>
          <Link href="/docs" style={{ color: "var(--ink-2)" }}>Documentacion API</Link>
          <a href="/openapi.json" style={{ color: "var(--ink-2)" }}>openapi.json</a>
        </div>
      </div>
    </div>
  )
}
