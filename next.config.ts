import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 301 redirects para URLs antiguas indexadas en Google que devuelven 404
      { source: '/precios', destination: '/comparar', permanent: true },

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
    ]
  },
}

export default nextConfig
