import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";

const NAV = [
  ["/", "Home"],
  ["/sobre-nosotros", "Nosotros"],
  ["/atencion-telefonica", "Ciudades"],
  ["/politica-privacidad", "Política de privacidad"],
  ["/politica-cookies", "Política de cookies"],
  ["/aviso-legal", "Aviso legal"],
  ["/docs", "API y documentación"],
] as const;

const ARTICLES = [
  ["/articulos/secretaria-virtual-pymes-espana", "Qué es un servicio de secretaría virtual"],
  ["/articulos/secretaria-virtual-o-call-center-para-pymes", "Secretaría virtual vs call center"],
  [
    "/articulos/recepcionista-virtual-para-pymes-evitar-llamadas-perdidas-leads-frios-y-distracciones-en-el-equipo",
    "Recepcionista virtual para PYMES",
  ],
  ["/articulos/coste-externalizar-atencion-telefonica-pyme-espana", "Cuánto cuesta externalizar la atención telefónica"],
] as const;

const SECTORS = [
  ["/lp/recepcionista-ia-clinicas", "Clínicas"],
  ["/lp/call-center-para-empresas", "Grandes empresas"],
  ["/lp/call-center-farmaceuticas", "Farmacéuticas"],
  ["/lp/call-center-energia", "Energía"],
  ["/lp/call-center-logistica-ecommerce", "Logística y e-commerce"],
  ["/lp/recepcionista-ia-inmobiliarias", "Inmobiliarias"],
  ["/lp/recepcionista-ia-restaurantes", "Hostelería"],
  ["/lp/recepcionista-ia-abogados", "Abogados"],
  ["/lp/recepcionista-ia-clinicas-dentales", "Dentistas"],
  ["/lp/recepcionista-ia-asesorias", "Asesorías"],
  ["/lp/recepcionista-ia-veterinarias", "Veterinarias"],
  ["/lp/recepcionista-ia-seguros", "Seguros"],
  ["/lp/recepcionista-ia-turismo", "Turismo"],
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer mc-reset">
      <div className="wrap">
        <div className="fgrid">
          <div>
            <Link className="brand" href="/">
              <LogoMark height={17} title="Logo de Minute Call" />
              minute call
            </Link>
            <p className="tagline">
              No pierdas ninguna llamada más. Servicio premium de secretaría virtual y atención telefónica para PYMES.
            </p>
          </div>
          <div>
            <h5><span className="tag">Navegación</span></h5>
            <ul>
              {NAV.map(([href, label]) => (
                <li key={href}><Link href={href}>{label}</Link></li>
              ))}
              <li><a href="/agent-instructions.md">Instrucciones para agentes</a></li>
            </ul>
          </div>
          <div>
            <h5><Link href="/articulos" className="tag">Artículos</Link></h5>
            <ul>
              {ARTICLES.map(([href, label]) => (
                <li key={href}><Link href={href}>{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h5><Link href="/lp" className="tag">Sectores</Link></h5>
            <ul>
              {SECTORS.map(([href, label]) => (
                <li key={href}><Link href={href}>{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bigword" aria-hidden="true">minute call</div>
        <div className="legal">
          <span>&copy; {currentYear} minute call. Todos los derechos reservados.</span>
          <a href="https://www.linkedin.com/company/minute-call/" target="_blank" rel="noopener noreferrer">
            Minute Call en LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
