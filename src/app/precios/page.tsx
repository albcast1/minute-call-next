import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Precios recepcionista virtual para PYMES | minute call',
  description: 'Planes desde 250 euros/mes. Sin permanencia, sin costes ocultos. Agentes nativos o IA. Activa en 48 horas. Compara con recepcionista interna y ahorra mas del 60%.',
  alternates: { canonical: 'https://www.minute-call.com/precios' },
  openGraph: {
    title: 'Precios recepcionista virtual para PYMES | minute call',
    description: 'Planes desde 250 euros/mes. Sin permanencia. Activa en 48 horas.',
    url: 'https://www.minute-call.com/precios',
    siteName: 'minute call',
    locale: 'es_ES',
    type: 'website',
  },
}

const faqs: { question: string; answer: string }[] = [
  { question: 'Cuanto cuesta un servicio de recepcionista virtual?', answer: 'Los planes de Minute Call empiezan desde 250 euros/mes para PYMES con hasta 200 llamadas mensuales. El precio varia segun el volumen de llamadas, el horario de cobertura y el tipo de agente (humano o IA). Sin costes de activacion ni permanencia.' },
  { question: 'Hay permanencia o contrato minimo?', answer: 'No. Todos los planes funcionan mes a mes, sin contratos a largo plazo ni penalizaciones por cancelacion. Puedes activar, pausar o cancelar cuando lo necesites.' },
  { question: 'Que incluye el precio?', answer: 'El precio incluye atencion de llamadas 24/7, personalizacion del guion y protocolo, toma de mensajes, agenda de citas, cualificacion de leads y notificaciones en tiempo real. Sin costes ocultos.' },
  { question: 'Cuanto cuesta comparado con una recepcionista interna?', answer: 'Una recepcionista a jornada completa en Espana cuesta entre 1.500-2.200 euros/mes mas seguridad social, vacaciones y formacion. Con Minute Call, desde 250 euros/mes obtienes cobertura 24/7 sin costes de estructura.' },
  { question: 'Se puede empezar con el plan mas basico y escalar?', answer: 'Si. Puedes empezar con el Plan Starter y escalar en cualquier momento segun crezca tu volumen de llamadas. El cambio se hace sin coste adicional y con activacion inmediata.' },
  { question: 'Cuanto tarda en activarse el servicio?', answer: 'El servicio se activa en menos de 48 horas. Definimos contigo el protocolo de atencion y configuramos el desvio de llamadas para que todo funcione sin cambiar tu numero.' },
]

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Recepcionista virtual para PYMES',
  description: 'Servicio de atencion telefonica 24/7 con agentes nativos o IA. Sin permanencia. Desde 250 euros/mes.',
  provider: { '@type': 'Organization', '@id': 'https://www.minute-call.com/#organization', name: 'minute call' },
  areaServed: { '@type': 'Country', name: 'Espana' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Planes de recepcionista virtual',
    itemListElement: [
      { '@type': 'Offer', name: 'Plan Starter', price: '250', priceCurrency: 'EUR', description: 'Hasta 200 llamadas/mes, horario comercial, agentes nativos.' },
      { '@type': 'Offer', name: 'Plan Business', price: '490', priceCurrency: 'EUR', description: 'Hasta 600 llamadas/mes, cobertura 24/7, agentes nativos o IA.' },
      { '@type': 'Offer', name: 'Plan Enterprise', price: '890', priceCurrency: 'EUR', description: 'Mas de 600 llamadas/mes, equipo dedicado, SLA garantizado.' },
    ],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

const testimonials = [
  { quote: 'Desde que implementamos Minute Call, hemos recuperado un 30% de leads que antes perdiamos fuera de horario.', author: 'Maria M.', role: 'Directora de Clinica, Madrid' },
  { quote: 'La calidad es indistinguible de tener una recepcionista propia. Nuestros clientes no saben que es externo.', author: 'Carlos F.', role: 'Responsable de Inmobiliaria, Barcelona' },
  { quote: 'En temporada fiscal el volumen se disparaba y perdiamos clientes. Ahora cada llamada se atiende.', author: 'Laura M.', role: 'Gerente de Asesoria, Valencia' },
]

export default function PreciosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main>
        {/* Hero */}
        <div style={{ textAlign: 'center', padding: '80px 24px 48px', maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: '#f0fdf4', color: '#166534', fontSize: 13, fontWeight: 600, padding: '4px 14px', borderRadius: 999, marginBottom: 20 }}>
            Sin permanencia · Sin costes ocultos · Activa en 48h
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, marginBottom: 16, lineHeight: 1.1 }}>
            Atencion telefonica profesional<br />desde <span style={{ color: '#000' }}>250 euros/mes</span>
          </h1>
          <p style={{ fontSize: 18, color: '#666', marginBottom: 32 }}>
            Agentes nativos en Espana o IA. Partners de Teleperformance. 5.0 en Trustpilot.
          </p>
          <a href="/reserva-llamada" style={{ display: 'inline-block', background: '#000', color: '#fff', padding: '14px 32px', borderRadius: 999, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
            Reserva una llamada gratuita &rarr;
          </a>
          <p style={{ fontSize: 12, color: '#999', marginTop: 12 }}>Sin compromiso. Te llamamos en menos de 24h.</p>
        </div>

        {/* Social proof bar */}
        <div style={{ borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0', padding: '16px 24px', display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap', fontSize: 14, color: '#444' }}>
          <span>⭐ <strong>5.0/5</strong> en Trustpilot</span>
          <span>🏆 Partners de <strong>Teleperformance</strong></span>
          <span>⚡ Activacion en <strong>48 horas</strong></span>
          <span>📞 <strong>98%</strong> tasa de respuesta</span>
          <span>🔒 Sin permanencia</span>
        </div>

        {/* Pricing cards */}
        <div style={{ maxWidth: 1100, margin: '64px auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {/* Starter */}
          <div style={{ border: '1px solid #e5e5e5', borderRadius: 20, padding: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Starter</h2>
            <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>Hasta 200 llamadas/mes</p>
            <div style={{ marginBottom: 24 }}>
              <span style={{ fontSize: 48, fontWeight: 700 }}>250</span>
              <span style={{ color: '#888', fontSize: 15 }}> euros/mes</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: 32, lineHeight: 2, fontSize: 14, color: '#444' }}>
              <li>✓ Horario comercial (L-V 9-18h)</li>
              <li>✓ Agentes nativos en espanol</li>
              <li>✓ Toma de mensajes y citas</li>
              <li>✓ Notificaciones en tiempo real</li>
              <li>✓ Sin permanencia</li>
            </ul>
            <a href="/reserva-llamada" style={{ display: 'block', textAlign: 'center', padding: '12px 24px', border: '2px solid #000', borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: 'none', color: '#000' }}>Empezar ahora</a>
          </div>

          {/* Business - highlighted */}
          <div style={{ border: '2px solid #000', borderRadius: 20, padding: 32, position: 'relative', background: '#000', color: '#fff' }}>
            <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: '#16a34a', color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 16px', borderRadius: 999, whiteSpace: 'nowrap' }}>MAS POPULAR</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Business</h2>
            <p style={{ color: '#aaa', fontSize: 14, marginBottom: 24 }}>Hasta 600 llamadas/mes</p>
            <div style={{ marginBottom: 24 }}>
              <span style={{ fontSize: 48, fontWeight: 700 }}>490</span>
              <span style={{ color: '#aaa', fontSize: 15 }}> euros/mes</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: 32, lineHeight: 2, fontSize: 14, color: '#ccc' }}>
              <li>✓ Cobertura 24/7</li>
              <li>✓ Agentes nativos o IA a elegir</li>
              <li>✓ Espanol, ingles y frances</li>
              <li>✓ Cualificacion de leads</li>
              <li>✓ Integracion CRM y agenda</li>
              <li>✓ Sin permanencia</li>
            </ul>
            <a href="/reserva-llamada" style={{ display: 'block', textAlign: 'center', padding: '12px 24px', background: '#fff', borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: 'none', color: '#000' }}>Empezar ahora</a>
          </div>

          {/* Enterprise */}
          <div style={{ border: '1px solid #e5e5e5', borderRadius: 20, padding: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Enterprise</h2>
            <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>+600 llamadas/mes</p>
            <div style={{ marginBottom: 24 }}>
              <span style={{ fontSize: 48, fontWeight: 700 }}>890</span>
              <span style={{ color: '#888', fontSize: 15 }}> euros/mes</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: 32, lineHeight: 2, fontSize: 14, color: '#444' }}>
              <li>✓ Todo lo del plan Business</li>
              <li>✓ Equipo dedicado</li>
              <li>✓ Reporting y analytics avanzado</li>
              <li>✓ Account manager dedicado</li>
              <li>✓ SLA garantizado</li>
              <li>✓ Sin permanencia</li>
            </ul>
            <a href="/reserva-llamada" style={{ display: 'block', textAlign: 'center', padding: '12px 24px', border: '2px solid #000', borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: 'none', color: '#000' }}>Empezar ahora</a>
          </div>
        </div>

        {/* Testimonials */}
        <div style={{ background: '#f9f9f9', padding: '64px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, marginBottom: 48 }}>Lo que dicen nuestros clientes</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
              {testimonials.map((t, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 16, padding: 28, border: '1px solid #e5e5e5' }}>
                  <div style={{ fontSize: 28, marginBottom: 16 }}>⭐⭐⭐⭐⭐</div>
                  <p style={{ fontSize: 15, color: '#333', lineHeight: 1.6, marginBottom: 20, fontStyle: 'italic' }}>"{t.quote}"</p>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14 }}>{t.author}</p>
                    <p style={{ fontSize: 13, color: '#888' }}>{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison table */}
        <div style={{ maxWidth: 900, margin: '64px auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>Minute Call vs recepcionista interna</h2>
          <p style={{ textAlign: 'center', color: '#888', marginBottom: 40 }}>Ahorra mas del 80% manteniendo cobertura 24/7</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e5e5' }}>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: '#888', fontWeight: 600 }}>Concepto</th>
                  <th style={{ textAlign: 'center', padding: '12px 16px' }}>Recepcionista interna</th>
                  <th style={{ textAlign: 'center', padding: '12px 16px', color: '#000' }}>Minute Call</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Coste mensual','1.500 - 2.200 euros','Desde 250 euros'],
                  ['Horario','8h/dia laborables','24/7/365'],
                  ['Vacaciones y bajas','Interrupciones','Sin interrupciones'],
                  ['Activacion','1-3 meses','48 horas'],
                  ['Escalabilidad','Contratar mas personal','Inmediata'],
                  ['Permanencia','Contrato laboral','Mes a mes'],
                  ['Control de calidad','Supervision interna','Revision de cada llamada'],
                ].map(([concept, internal, mc]) => (
                  <tr key={concept} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '14px 16px', color: '#444' }}>{concept}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'center', color: '#888' }}>{internal}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'center', fontWeight: 600 }}>{mc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 64px' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 40 }}>Preguntas frecuentes sobre precios</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: 24 }}>
                <h3 style={{ fontWeight: 600, marginBottom: 8, fontSize: 16 }}>{faq.question}</h3>
                <p style={{ color: '#555', fontSize: 14, lineHeight: 1.7 }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div style={{ background: '#000', color: '#fff', textAlign: 'center', padding: '80px 24px' }}>
          <h2 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 700, marginBottom: 16 }}>Listo para no perder mas llamadas?</h2>
          <p style={{ color: '#aaa', marginBottom: 12, fontSize: 16 }}>Activa tu recepcionista virtual en 48 horas. Sin permanencia ni costes ocultos.</p>
          <p style={{ color: '#888', marginBottom: 40, fontSize: 14 }}>Ya confian en nosotros clinicas, despachos, inmobiliarias y mas de 100 PYMES en Espana.</p>
          <a href="/reserva-llamada" style={{ display: 'inline-block', background: '#fff', color: '#000', padding: '16px 40px', borderRadius: 999, fontSize: 16, fontWeight: 700, textDecoration: 'none', marginBottom: 16 }}>
            Reserva una llamada gratuita &rarr;
          </a>
          <p style={{ color: '#666', fontSize: 13 }}>Sin compromiso · Respuesta en menos de 24h · Activacion en 48h</p>
        </div>
      </main>
    </>
  )
}
