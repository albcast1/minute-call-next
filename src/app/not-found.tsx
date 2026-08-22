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
                <p className="text-sm font-medium text-gray-500 mb-4">Error 404</p>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Pagina no encontrada
                </h1>
                <p className="text-lg text-gray-500 max-w-md mb-8">
                        Lo sentimos, la página que buscas no existe o ha sido movida.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                                    href="/"
                                    className="inline-block bg-black text-white font-semibold px-8 py-3 rounded-full hover:bg-gray-800 transition"
                                  >
                                  Volver al inicio
                        </Link>
                        <Link
                                    href="/reserva-llamada"
                                    className="inline-block border-2 border-black text-black font-semibold px-8 py-3 rounded-full hover:bg-black hover:text-white transition"
                                  >
                                  Reserva una llamada
                        </Link>
                </div>
                <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                        <Link href="/lp" className="hover:text-black transition">Sectores</Link>
                        <Link href="/atencion-telefonica" className="hover:text-black transition">Ciudades</Link>
                        <Link href="/articulos" className="hover:text-black transition">Blog</Link>
                        <Link href="/calculadora-roi" className="hover:text-black transition">Calculadora ROI</Link>
                </div>
                <div className="mt-10 max-w-xl text-sm text-gray-400">
                        <p className="mb-3 font-medium text-gray-500">Donde seguir buscando</p>
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                                <a href="/sitemap.xml" className="hover:text-black transition">sitemap.xml</a>
                                <a href="/llms.txt" className="hover:text-black transition">llms.txt</a>
                                <a href="/llms-full.txt" className="hover:text-black transition">llms-full.txt</a>
                                <a href="/agent-instructions.md" className="hover:text-black transition">agent-instructions.md</a>
                                <Link href="/docs" className="hover:text-black transition">Documentacion API</Link>
                                <a href="/openapi.json" className="hover:text-black transition">openapi.json</a>
                        </div>
                </div>
          </div>
        )
}
