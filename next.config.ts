import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 301 redirects para URLs antiguas indexadas en Google que devuelven 404
      { source: '/precios', destination: '/comparar', permanent: true },
      // URLs antiguas rastreadas por Google que devuelven 404 — fix indexación
      { source: '/secretaria-virtual-pymes', destination: '/lp/secretaria-virtual', permanent: true },
      { source: '/recepcionista-ia-vs-humana', destination: '/articulos/secretaria-virtual-pymes-espana', permanent: true },
      { source: '/empleo/empleo-call-center-desde-casa', destination: '/', permanent: true },
      { source: '/empleo/:slug*', destination: '/', permanent: true },
      { source: '/recepcion-telefonica-servicios-tecnicos', destination: '/lp/recepcion-de-llamadas', permanent: true },
      { source: '/recepcionista-ia-empresas', destination: '/lp/secretaria-virtual', permanent: true },
      { source: '/alberto-castiel-atencion-cliente', destination: '/', permanent: true },
      { source: '/recepcion-telefonica-inmobiliarias', destination: '/atencion-telefonica/madrid/recepcionista-ia-inmobiliarias', permanent: true },

      // Old EN pages Google has cached — 301 to Spanish equivalents
      { source: '/overview', destination: '/', permanent: true },
      { source: '/articles/:slug*', destination: '/articulos/:slug*', permanent: true },
      { source: '/es/reserva-llamada', destination: '/reserva-llamada', permanent: true },
      { source: '/call-center-vs-secretaria-virtual-pymes', destination: '/articulos/secretaria-virtual-o-call-center-para-pymes', permanent: true },
      { source: '/blog', destination: '/articulos', permanent: true },
      { source: '/contacto', destination: '/reserva-llamada', permanent: true },
      { source: '/servicios', destination: '/', permanent: true },
      { source: '/atencion-telefonica-externalizada', destination: '/lp/outsourcing-atencion-cliente', permanent: true },
      { source: '/casos-de-exito', destination: '/sobre-nosotros', permanent: true },
      // Legacy language routes
      { source: '/es/home', destination: '/', permanent: true },
      { source: '/es', destination: '/', permanent: true },
      { source: '/en/home', destination: '/', permanent: true },
      { source: '/en', destination: '/', permanent: true },
      // EN legacy pages — wildcard catches all /en/* routes not already handled
      { source: '/en/pricing', destination: '/comparar', permanent: true },
      { source: '/en/contact', destination: '/reserva-llamada', permanent: true },
      { source: '/en/services', destination: '/', permanent: true },
      { source: '/en/about', destination: '/', permanent: true },
      { source: '/en/call-center', destination: '/', permanent: true },
      { source: '/en/virtual-receptionist', destination: '/lp/secretaria-virtual', permanent: true },
      { source: '/en/:slug*', destination: '/', permanent: true },

      // Old ES routes Google crawled
      { source: '/planes', destination: '/comparar', permanent: true },
      { source: '/como-funciona', destination: '/', permanent: true },
      { source: '/quienes-somos', destination: '/', permanent: true },
      { source: '/sobre-nosotros', destination: '/', permanent: true },
      { source: '/atencion-al-cliente', destination: '/lp/recepcion-de-llamadas', permanent: true },
      { source: '/externalizar-atencion-cliente', destination: '/lp/recepcion-de-llamadas', permanent: true },
      { source: '/llamada-perdida', destination: '/', permanent: true },
      { source: '/prueba-gratis', destination: '/reserva-llamada', permanent: true },
      { source: '/demo', destination: '/reserva-llamada', permanent: true },
      { source: '/login', destination: '/', permanent: true },

      // Old city pages (flat structure) → new city pages
      { source: '/recepcion-telefonica-barcelona', destination: '/atencion-telefonica/barcelona', permanent: true },
      { source: '/recepcion-telefonica-sevilla', destination: '/atencion-telefonica/sevilla', permanent: true },
      { source: '/recepcion-telefonica-madrid', destination: '/atencion-telefonica/madrid', permanent: true },
      { source: '/recepcion-telefonica-valencia', destination: '/atencion-telefonica/valencia', permanent: true },
      { source: '/recepcion-telefonica-bilbao', destination: '/atencion-telefonica/bilbao', permanent: true },
      { source: '/secretaria-virtual-barcelona', destination: '/atencion-telefonica/barcelona', permanent: true },
      { source: '/secretaria-virtual-sevilla', destination: '/atencion-telefonica/sevilla', permanent: true },
      { source: '/secretaria-virtual-madrid', destination: '/atencion-telefonica/madrid', permanent: true },
      { source: '/secretaria-virtual-valencia', destination: '/atencion-telefonica/valencia', permanent: true },
      // ── GSC 404 bulk fix — URLs restantes sin redirect ──────────────
      { source: '/insights/:slug*', destination: '/articulos', permanent: true },
      { source: '/insights', destination: '/articulos', permanent: true },
      { source: '/case-studies/:slug*', destination: '/', permanent: true },
      { source: '/case-studies', destination: '/', permanent: true },
      { source: '/es/clinicas', destination: '/sectores', permanent: true },
      { source: '/es/agencias', destination: '/sectores', permanent: true },
      { source: '/es/automatizacion-agencias-marketing', destination: '/', permanent: true },
      { source: '/es/agencia-automatizacion-ia', destination: '/', permanent: true },
      { source: '/es/lp/:slug*', destination: '/', permanent: true },
      { source: '/es/:slug*', destination: '/', permanent: true },
      { source: '/book-a-call', destination: '/reserva-llamada', permanent: true },
      { source: '/about', destination: '/', permanent: true },
      { source: '/about-minute-call', destination: '/', permanent: true },
      { source: '/ai-automation-agency', destination: '/', permanent: true },
      { source: '/automation-marketing-agencies', destination: '/', permanent: true },
      { source: '/articles', destination: '/articulos', permanent: true },
      { source: '/articulos/articulos/:slug*', destination: '/articulos', permanent: true },
      { source: '/404', destination: '/', permanent: true },
      { source: '/empleo/trabajo-telefonista', destination: '/', permanent: true },
      { source: '/empleo/trabajo-call-center', destination: '/', permanent: true },
      { source: '/en/best-contact-center-for-startups', destination: '/', permanent: true },
      { source: '/en/automation-marketing-agencies', destination: '/', permanent: true },
      { source: '/en/articles/:slug*', destination: '/articulos', permanent: true },
      { source: '/en/about-us', destination: '/', permanent: true },
      { source: '/en/book-a-call', destination: '/reserva-llamada', permanent: true },
      { source: '/articles/secretaria-virtual-pymes-espana', destination: '/articulos/secretaria-virtual-pymes-espana', permanent: true },
      { source: '/articles/secretaria-virtual-o-call-center-para-pymes', destination: '/articulos/secretaria-virtual-o-call-center-para-pymes', permanent: true },
    ]
  },
}

export default nextConfig
