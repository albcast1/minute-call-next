import Link from 'next/link'

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
          </div>
        )
}
