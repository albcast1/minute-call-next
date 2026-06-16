import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Alternativa a Teleperformance, Konecta y Atento para PYMES | minute call',
  description: '¿Buscas una alternativa a los grandes call centers para tu PYME? Minute Call es la opción ligera y flexible: agentes nativos, sin permanencia, presupuesto personalizado. Activa en 48h.',
  alternates: { canonical: 'https://www.minute-call.com/comparar' },
  openGraph: {
    title: 'Alternativa a call centers para PYMES | minute call',
    description: 'La alternativa flexible a Teleperformance, Konecta y Atento para PYMES españolas.',
    url: 'https://www.minute-call.com/comparar',
    siteName: 'minute call',
    locale: 'es_ES',
    type: 'website',
  },
}

const useCases = [
  { icon: '🏥', title: 'Clinicas y centros medicos', description: 'Protocolo sanitario, gestión de urgencias y citas con Doctoralia o Cliniccloud. Lo que Teleperformance no puede hacer a tu escala.' },
  { icon: '⚖️', title: 'Despachos de abogados', description: 'Confidencialidad, terminología jurídica y cualificación de nuevos asuntos. Sin los contratos anuales de los grandes BPO.' },
  { icon: '🏠', title: 'Inmobiliarias', description: 'Cualificación de compradores (presupuesto, zona, urgencia) para que tu comercial llame preparado. Presupuesto personalizado.' },
  { icon: '📊', title: 'Asesorias y consultoras', description: 'Primera impresión profesional sin tener que contratar recepcionista. Activa en 48 horas, cancela cuando quieras.' },
  { icon: '🍽️', title: 'Restaurantes y hosteleria', description: 'Gestión de reservas 24/7 cuando el equipo está en servicio. Sin perder una mesa por no poder coger el teléfono.' },
  { icon: '🔧', title: 'Servicios tecnicos y urgencias', description: 'Cobertura nocturna y de fin de semana para captación de emergencias. La alternativa asequible a contratar turnos de noche.' },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '¿Es Minute Call una alternativa a Teleperformance para PYMES?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. Teleperformance, Konecta y Atento están diseñados para grandes empresas con cientos de llamadas diarias y contratos anuales. Minute Call es la alternativa para PYMES: sin permanencia, presupuesto personalizado, agentes nativos en España y activación en 48 horas.' } },
    { '@type': 'Question', name: '¿En qué se diferencia Minute Call de Secretaria.es?', acceptedAnswer: { '@type': 'Answer', text: 'Minute Call tiene agentes nativos en España (no en Europa Central), precios transparentes publicados en la web, especialización por sector y activación en 48 horas. Secretaria.es (Audelia/ebuero) es una empresa alemana sin precios publicados y con estructura orientada al mercado europeo en general.' } },
    { '@type': 'Question', name: '¿Por qué no usar Secrelan o Digalia si son más baratos?', acceptedAnswer: { '@type': 'Answer', text: 'Para autónomos con muy bajo volumen, pueden ser suficientes. Para una PYME de servicios donde la primera impresión importa (clínica, despacho, inmobiliaria), los agentes en LATAM y el protocolo genérico de estos servicios pueden perjudicar la imagen de marca. Minute Call invierte en que los clientes no sepan que es un servicio externo.' } },
  ],
}

export default function CompararPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section style={{ textAlign: 'center', maxWidth: 860, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(16px,5vw,64px) clamp(40px,6vw,60px)' }}>
        <span className="pill-label" style={{ marginBottom: 20, display: 'inline-block' }}>
          La alternativa a los grandes call centers para PYMES
        </span>
        <h1>
          Todo lo que necesitas de un call center.<br />Sin los contratos que no puedes <span className="serif-italic">pagar.</span>
        </h1>
        <p style={{ maxWidth: 600, margin: '0 auto 32px' }}>
          Teleperformance, Konecta y Atento son para grandes corporaciones. Secretaria.es es alemana. Minute Call es la alternativa española para PYMES: agentes nativos, sin permanencia, presupuesto personalizado.
        </p>
        <a href="/reserva-llamada" className="btn-contact">
          Reserva una llamada gratuita
        </a>
      </section>

      {/* Comparison — home style cards instead of table */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(20px,5vw,64px)', textAlign: 'center' }}>
        <span className="pill-label" style={{ marginBottom: 16, display: 'inline-block' }}>La comparativa</span>
        <h2 style={{ marginTop: 16 }}>
          Grandes BPO vs <span className="serif-italic">Minute Call.</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 24, marginTop: 48, textAlign: 'left' }}>
          <div className="card" style={{ padding: 32 }}>
            <h3 style={{ fontSize: 20, marginBottom: 24 }}>Teleperformance / Konecta / Atento</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                'Contratos de 12+ meses obligatorios',
                'Agentes en LATAM o Marruecos',
                'Mínimo 500+ llamadas/día',
                'Activación en 1-3 meses',
                'Protocolo genérico, sin especialización por sector',
                'Diseñado para grandes corporaciones',
              ].map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, color: 'rgba(0,0,0,0.56)' }}>
                  <span style={{ color: '#e53e3e', fontSize: 16 }}>✕</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: 'black', borderRadius: 24, padding: 32, color: 'white' }}>
            <h3 style={{ fontSize: 20, marginBottom: 24, color: 'white' }}>minute call</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                'Sin permanencia — mes a mes',
                'Agentes nativos en España',
                'Sin volumen mínimo de llamadas',
                'Activación en 48 horas',
                'Protocolo personalizado por sector',
                'Diseñado para PYMES españolas',
              ].map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, color: 'rgba(255,255,255,0.8)' }}>
                  <span style={{ color: '#5AFF15', fontSize: 16 }}>✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Use cases — 3x2 grid */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(20px,5vw,64px)', textAlign: 'center' }}>
        <span className="pill-label" style={{ marginBottom: 16, display: 'inline-block' }}>Sectores</span>
        <h2 style={{ marginTop: 16 }}>
          Para que tipo de empresa es <span className="serif-italic">Minute Call.</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginTop: 48, textAlign: 'left' }}>
          {useCases.map((uc, i) => (
            <div key={i} className="card" style={{ padding: 32 }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{uc.icon}</div>
              <h3 style={{ fontSize: 18, letterSpacing: '-0.5px' }}>{uc.title}</h3>
              <p className="service-card-body">{uc.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(20px,5vw,64px)', textAlign: 'center' }}>
        <span className="pill-label" style={{ marginBottom: 16, display: 'inline-block' }}>Preguntas</span>
        <h2 style={{ marginTop: 16 }}>FAQ</h2>
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 0, textAlign: 'left' }}>
          {faqSchema.mainEntity.map((item) => (
            <details key={item.name} style={{ padding: '24px 0', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <summary style={{ fontSize: 18, fontWeight: 500, cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'black' }}>
                {item.name}
                <span style={{ fontSize: 24, fontWeight: 300 }}>+</span>
              </summary>
              <p style={{ marginTop: 16 }}>{item.acceptedAnswer.text}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'black', color: 'white', textAlign: 'center', padding: 'clamp(40px,8vw,80px) clamp(20px,5vw,64px)' }}>
        <h2 style={{ color: 'white' }}>
          Prueba la alternativa espanola a los grandes <span className="serif-italic">call centers.</span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 500, margin: '0 auto 32px' }}>
          Sin contratos, sin permanencia, sin agentes en LATAM. Activa en 48 horas.
        </p>
        <a href="/reserva-llamada" style={{ display: 'inline-block', background: 'white', color: 'black', padding: 'var(--btn-padding)', borderRadius: 'var(--btn-border-radius)', fontSize: 'var(--btn-font-size)', fontWeight: 500, textDecoration: 'none' }}>
          Reserva una llamada gratuita
        </a>
      </section>
    </>
  )
}
