import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 301 redirects para URLs antiguas indexadas en Google que devuelven 404
      { source: '/precios', destination: '/comparar', permanent: true },
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
