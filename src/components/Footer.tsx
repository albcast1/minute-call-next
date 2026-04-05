import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-[#E0DCD6] mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Branding Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 font-bold text-lg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                  fill="#7BF542"
                  stroke="#000000"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
              </svg>
              <span>minute call</span>
            </div>
            <p className="text-[#6B6B6B] font-medium">
              No pierdas ninguna llamada más.
            </p>
            <p className="text-[#999999] text-sm">
              Servicio premium de secretaría virtual y atención telefónica para
              PYMES.
            </p>
            {/* LinkedIn Icon */}
            <div className="mt-4">
              <a
                href="https://www.linkedin.com/company/minute-call/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#F7F5F2] hover:bg-[#7BF542] transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-black"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigate Column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-black">Navigate</h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-[#6B6B6B] hover:text-[#7BF542] transition-colors"
              >
                Home
              </Link>
              <Link
                href="/sobre-nosotros"
                className="text-[#6B6B6B] hover:text-[#7BF542] transition-colors"
              >
                Nosotros
              </Link>
              <Link
                href="/politica-privacidad"
                className="text-[#6B6B6B] hover:text-[#7BF542] transition-colors"
              >
                Política de Privacidad
              </Link>
              <Link
                href="/politica-cookies"
                className="text-[#6B6B6B] hover:text-[#7BF542] transition-colors"
              >
                Política de Cookies
              </Link>
            </nav>
          </div>

          {/* Articles Column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-black">Articles</h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="/articulos"
                className="text-[#6B6B6B] hover:text-[#7BF542] transition-colors font-medium"
              >
                Ver todos los artículos
              </Link>
              <Link
                href="/articulos/1"
                className="text-[#6B6B6B] hover:text-[#7BF542] transition-colors"
              >
                Cómo mejorar la atención al cliente
              </Link>
              <Link
                href="/articulos/2"
                className="text-[#6B6B6B] hover:text-[#7BF542] transition-colors"
              >
                Ventajas de la secretaría virtual
              </Link>
              <Link
                href="/articulos/3"
                className="text-[#6B6B6B] hover:text-[#7BF542] transition-colors"
              >
                Gestión eficiente de llamadas
              </Link>
              <Link
                href="/articulos/4"
                className="text-[#6B6B6B] hover:text-[#7BF542] transition-colors"
              >
                Mejores prácticas para PYMES
              </Link>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#E0DCD6] pt-8 text-center">
          <p className="text-[#999999] text-sm">
            &copy; {currentYear} minute call. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
