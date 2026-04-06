import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#EFEBE5", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 64px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 48 }}>
          {/* Branding */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <img
                src="https://framerusercontent.com/images/ovXvDkQi2KTHjwV1Nl9n9WlloRI.png"
                alt=""
                style={{ width: 20, height: 20 }}
              />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 500, letterSpacing: "-1px", color: "black" }}>
                minute call
              </span>
            </div>
            <h2 style={{ fontSize: 32, fontWeight: 500, color: "black", margin: 0, letterSpacing: "-1.92px", lineHeight: "35.2px" }}>
              No pierdas ninguna llamada más.
            </h2>
            <p style={{ fontSize: 14, color: "rgba(0,0,0,0.56)", margin: 0 }}>
              Servicio premium de secretaría virtual y atención telefónica para PYMES.
            </p>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/minute-call/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-block", marginTop: 8 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(0,0,0,0.56)">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>

          {/* Navigate */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: "black", margin: 0 }}>Navigate</h4>
            <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Link href="/" style={{ fontSize: 14, color: "rgba(0,0,0,0.56)" }}>Home</Link>
              <Link href="/sobre-nosotros" style={{ fontSize: 14, color: "rgba(0,0,0,0.56)" }}>Nosotros</Link>
              <Link href="/politica-privacidad" style={{ fontSize: 14, color: "rgba(0,0,0,0.56)" }}>Politica de Privacidad</Link>
              <Link href="/politica-cookies" style={{ fontSize: 14, color: "rgba(0,0,0,0.56)" }}>Politica de Cookies</Link>
            </nav>
          </div>

          {/* Articles */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: "black", margin: 0 }}>
              <Link href="/articulos" style={{ color: "black" }}>Articles</Link>
            </h4>
            <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Link href="/articulos/secretaria-virtual-pymes-espana" style={{ fontSize: 14, color: "rgba(0,0,0,0.56)" }}>
                Qué es un servicio de secretaría virtual
              </Link>
              <Link href="/articulos/secretaria-virtual-o-call-center-para-pymes" style={{ fontSize: 14, color: "rgba(0,0,0,0.56)" }}>
                Secretaría virtual vs call center
              </Link>
              <Link href="/articulos/recepcionista-virtual-para-pymes-evitar-llamadas-perdidas-leads-frios-y-distracciones-en-el-equipo" style={{ fontSize: 14, color: "rgba(0,0,0,0.56)" }}>
                Recepcionista virtual para PYMES
              </Link>
              <Link href="/articulos/coste-externalizar-atencion-telefonica-pyme-espana" style={{ fontSize: 14, color: "rgba(0,0,0,0.56)" }}>
                Cuánto cuesta externalizar la atención telefónica
              </Link>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(0,0,0,0.06)", textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "rgba(0,0,0,0.4)", margin: 0 }}>
            &copy; {currentYear} minute call. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
