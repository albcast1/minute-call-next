import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const articles = [
    {
      title: "Qué es un servicio de secretaría virtual",
      slug: "que-es-secretaria-virtual",
    },
    {
      title: "Secretaría virtual vs call center",
      slug: "secretaria-virtual-vs-call-center",
    },
    {
      title: "Recepcionista virtual para PYMES",
      slug: "recepcionista-virtual-pymes",
    },
    {
      title: "Cuánto cuesta externalizar la atención telefónica de una pyme en España",
      slug: "costo-externalizacion-atencion-telefonica",
    },
  ];

  return (
    <footer
      className="bg-[#EFEBE5] mt-auto"
      style={{ backgroundColor: "#EFEBE5" }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Branding Column */}
          <div className="flex flex-col gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
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
              <span className="font-bold text-black">minute call</span>
            </div>

            {/* Tagline */}
            <p className="text-black font-medium text-sm">
              No pierdas ninguna llamada más.
            </p>

            {/* Description */}
            <p
              className="text-sm"
              style={{ color: "rgba(0, 0, 0, 0.56)" }}
            >
              Servicio premium de secretaría virtual y atención telefónica para
              PYMES.
            </p>
          </div>

          {/* Navigate Column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-black">Navigate</h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm hover:text-[#7BF542] transition-colors"
                style={{ color: "rgba(0, 0, 0, 0.56)" }}
              >
                Home
              </Link>
              <Link
                href="/sobre-nosotros"
                className="text-sm hover:text-[#7BF542] transition-colors"
                style={{ color: "rgba(0, 0, 0, 0.56)" }}
              >
                Nosotros
              </Link>
              <Link
                href="/politica-privacidad"
                className="text-sm hover:text-[#7BF542] transition-colors"
                style={{ color: "rgba(0, 0, 0, 0.56)" }}
              >
                Politica de Privacidad
              </Link>
              <Link
                href="/politica-cookies"
                className="text-sm hover:text-[#7BF542] transition-colors"
                style={{ color: "rgba(0, 0, 0, 0.56)" }}
              >
                Politica de Cookies
              </Link>
            </nav>
          </div>

          {/* Articles/Nosotros Column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-black">Nosotros</h4>
            <nav className="flex flex-col gap-2">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articulos/${article.slug}`}
                  className="text-sm hover:text-[#7BF542] transition-colors"
                  style={{ color: "rgba(0, 0, 0, 0.56)" }}
                >
                  {article.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t pt-8 text-center" style={{ borderColor: "#EFEBE5" }}>
          <p className="text-sm" style={{ color: "rgba(0, 0, 0, 0.56)" }}>
            &copy; {currentYear} minute call. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
