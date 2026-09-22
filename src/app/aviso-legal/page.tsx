import type { Metadata } from 'next'
import Link from 'next/link'
import { LEGAL_ENTITY, SITE_URL } from '@/lib/agent/site'

export const metadata: Metadata = {
  title: 'Aviso legal | minute call',
  description:
    'Aviso legal e información del titular del sitio web de Minute Call SLU: denominación social, NIF, domicilio, objeto, condiciones de uso y propiedad intelectual.',
  alternates: { canonical: `${SITE_URL}/aviso-legal` },
  openGraph: {
    title: 'Aviso legal | minute call',
    description: 'Información del titular del sitio web de Minute Call SLU conforme a la LSSI-CE.',
    url: `${SITE_URL}/aviso-legal`,
    siteName: 'minute call',
    locale: 'es_ES',
    type: 'website',
  },
}

const sectionStyle = { maxWidth: 820, margin: '0 auto', padding: '0 clamp(16px,5vw,64px) clamp(24px,4vw,40px)' } as const
const rowStyle = { padding: '12px 0', borderBottom: '1px solid rgba(0,0,0,0.08)', display: 'flex', gap: 16, flexWrap: 'wrap' as const }
const labelStyle = { fontWeight: 600, minWidth: 200 }

export default function AvisoLegal() {
  return (
    <>
      <section style={{ maxWidth: 820, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(16px,5vw,64px) clamp(24px,4vw,40px)' }}>
        <span className="pill-label" style={{ marginBottom: 20, display: 'inline-block' }}>Información legal</span>
        <h1>Aviso legal</h1>
        <p style={{ marginBottom: 0 }}>
          En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la
          Información y de Comercio Electrónico (LSSI-CE), se ponen a disposición de los usuarios los datos
          identificativos del titular de este sitio web.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={{ fontSize: 22, marginBottom: 20 }}>Titular del sitio web</h2>
        <div>
          <div style={rowStyle}><span style={labelStyle}>Denominación social</span><span>{LEGAL_ENTITY.legalName}</span></div>
          <div style={rowStyle}><span style={labelStyle}>NIF</span><span>{LEGAL_ENTITY.taxId}</span></div>
          <div style={rowStyle}><span style={labelStyle}>Domicilio social y fiscal</span><span>{LEGAL_ENTITY.address}</span></div>
          <div style={rowStyle}><span style={labelStyle}>Correo de contacto</span><span><a href={`mailto:${LEGAL_ENTITY.email}`}>{LEGAL_ENTITY.email}</a></span></div>
          <div style={rowStyle}><span style={labelStyle}>Sitio web</span><span><a href={SITE_URL}>{SITE_URL.replace('https://', '')}</a></span></div>
          <div style={rowStyle}><span style={labelStyle}>Actividad</span><span>{LEGAL_ENTITY.activity}</span></div>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={{ fontSize: 22, marginBottom: 16 }}>Objeto</h2>
        <p>
          Este sitio web tiene por objeto informar sobre los servicios de recepción telefónica, atención al cliente y
          secretaría virtual que {LEGAL_ENTITY.legalName} presta a empresas, así como permitir a los interesados
          solicitar información o un presupuesto. El acceso al sitio es gratuito, salvo el coste de la conexión a
          través de la red de telecomunicaciones del propio usuario.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={{ fontSize: 22, marginBottom: 16 }}>Condiciones de uso</h2>
        <p>
          El usuario se compromete a hacer un uso diligente del sitio web y de los formularios y de la API pública que
          se ponen a su disposición, absteniéndose de emplearlos con fines ilícitos, de introducir datos personales de
          terceros sin su consentimiento expreso, o de realizar cualquier acción que pueda dañar, sobrecargar o
          impedir el normal funcionamiento del servicio.
        </p>
        <p>
          {LEGAL_ENTITY.legalName} se reserva el derecho a modificar en cualquier momento los contenidos del sitio,
          así como a suspender o limitar el acceso a los mismos, sin necesidad de preaviso.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={{ fontSize: 22, marginBottom: 16 }}>Propiedad intelectual e industrial</h2>
        <p>
          Los contenidos de este sitio web (textos, imágenes, marcas, logotipos, código fuente y estructura de
          navegación) son titularidad de {LEGAL_ENTITY.legalName} o de terceros que han autorizado su uso, y están
          protegidos por la normativa de propiedad intelectual e industrial. Queda prohibida su reproducción,
          distribución o transformación sin autorización expresa, salvo el uso citado y enlazado con fines
          informativos o de indexación, incluido el acceso automatizado a los recursos publicados en{' '}
          <Link href="/llms.txt">llms.txt</Link>, <Link href="/agent-instructions.md">agent-instructions.md</Link> y{' '}
          <Link href="/openapi.json">openapi.json</Link>.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={{ fontSize: 22, marginBottom: 16 }}>Responsabilidad</h2>
        <p>
          {LEGAL_ENTITY.legalName} no se hace responsable de los daños derivados del uso indebido del sitio web ni de
          los contenidos de sitios de terceros a los que se pueda acceder mediante enlaces. La información sobre
          precios, plazos y cobertura publicada tiene carácter orientativo: las condiciones aplicables son las que se
          recojan en el presupuesto y el contrato firmado con cada cliente.
        </p>
      </section>

      <section style={{ ...sectionStyle, paddingBottom: 'clamp(40px,8vw,80px)' }}>
        <h2 style={{ fontSize: 22, marginBottom: 16 }}>Legislacion aplicable y proteccion de datos</h2>
        <p>
          Las presentes condiciones se rigen por la legislación española. Para cualquier controversia serán competentes
          los juzgados y tribunales del domicilio del titular, salvo que la normativa aplicable establezca otro fuero
          imperativo.
        </p>
        <p style={{ marginBottom: 0 }}>
          El tratamiento de datos personales se describe en la{' '}
          <Link href="/politica-privacidad">política de privacidad</Link> y el uso de cookies en la{' '}
          <Link href="/politica-cookies">política de cookies</Link>.
        </p>
      </section>
    </>
  )
}
