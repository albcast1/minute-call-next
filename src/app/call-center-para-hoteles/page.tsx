import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Call center para hoteles | Atencion telefonica 24/7 | minute call',
  description: 'Call center especializado en hoteles: gestión de reservas, atención multilingüe, upselling y cobertura 24/7. Agentes nativos en España o IA. Sin permanencia.',
  alternates: { canonical: 'https://www.minute-call.com/call-center-para-hoteles' },
  openGraph: {
    title: 'Call center para hoteles | minute call',
    description: 'Atención telefónica especializada en hoteles. Reservas, check-in, upselling y soporte multilingüe 24/7.',
    url: 'https://www.minute-call.com/call-center-para-hoteles',
    siteName: 'minute call',
    locale: 'es_ES',
    type: 'website',
  },
}

const painPoints = [
  {
    icon: '📞',
    title: 'Llamadas perdidas durante el check-in',
    description: 'El pico de llamadas coincide con el momento en que tu recepción está más ocupada. Cada llamada perdida es una reserva que se va a Booking o a la competencia.',
  },
  {
    icon: '🌍',
    title: 'Huespedes internacionales',
    description: 'Turistas que llaman en inglés, francés o alemán y no consiguen comunicarse. Primera impresión negativa antes de pisar el hotel.',
  },
  {
    icon: '🌙',
    title: 'Noches, festivos y temporada alta',
    description: 'Fuera de horario de recepción nadie coge el teléfono. Las reservas directas de última hora se pierden frente a las OTAs.',
  },
  {
    icon: '💸',
    title: 'Comisiones de OTAs vs reserva directa',
    description: 'Booking y Expedia cobran entre un 15% y un 25% de comisión. Cada reserva directa que captas por teléfono es margen puro para tu hotel.',
  },
]

const services = [
  {
    title: 'Gestion de reservas directas',
    description: 'Recibimos llamadas de huéspedes potenciales, consultamos disponibilidad en tu PMS y cerramos la reserva directa — sin comisiones de OTA. Confirmación por email o SMS al instante.',
  },
  {
    title: 'Atencion multilingue',
    description: 'Agentes nativos en español, inglés y francés. Atendemos a turistas internacionales con fluidez real, no con scripts traducidos. Ideal para hoteles en zonas turísticas.',
  },
  {
    title: 'Upselling y cross-selling',
    description: 'Ofrecemos upgrades de habitación, late check-out, packs de spa o cenas especiales durante la llamada de reserva. Incremento medio del ticket sin esfuerzo de tu equipo.',
  },
  {
    title: 'Cobertura 24/7 todo el ano',
    description: 'Noches, fines de semana, festivos y temporada alta cubiertos. No necesitas contratar turnos de noche ni refuerzos temporales.',
  },
  {
    title: 'Filtrado y gestion de incidencias',
    description: 'Clasificamos llamadas: reservas nuevas, modificaciones, cancelaciones, quejas, proveedores. Solo te pasamos lo que requiere tu intervención directa.',
  },
  {
    title: 'Integracion con tu PMS',
    description: 'Trabajamos con los principales sistemas de gestión hotelera. Accedemos a disponibilidad y tarifas en tiempo real para dar información precisa al huésped.',
  },
]

const stats = [
  { value: '24/7', label: 'Cobertura' },
  { value: '3', label: 'Idiomas nativos' },
  { value: '48h', label: 'Activación' },
  { value: '0%', label: 'Comisión OTA' },
]

const process = [
  { step: '01', title: 'Nos cuentas tu hotel', description: 'Tipos de habitación, tarifas, políticas de cancelación, servicios extra. Creamos tu protocolo personalizado.' },
  { step: '02', title: 'Configuramos el desvio', description: 'Desvías las llamadas que no puedas atender a nuestro número. Tus huéspedes nunca notan la diferencia.' },
  { step: '03', title: 'Atendemos como tu equipo', description: 'Gestionamos reservas, resolvemos dudas y ofrecemos upselling siguiendo tu protocolo. Recibes un resumen de cada llamada.' },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '¿Qué es un call center para hoteles?', acceptedAnswer: { '@type': 'Answer', text: 'Es un servicio de atención telefónica especializado en el sector hotelero. Gestiona reservas directas, consultas de huéspedes, modificaciones, cancelaciones y upselling — todo sin comisiones de OTA y con agentes que conocen la operativa hotelera.' } },
    { '@type': 'Question', name: '¿Cómo gestionáis las reservas directas?', acceptedAnswer: { '@type': 'Answer', text: 'Accedemos a la disponibilidad de tu hotel en tiempo real a través de tu PMS. Cuando un huésped llama, consultamos fechas, ofrecemos la mejor tarifa disponible y cerramos la reserva directa. El huésped recibe confirmación por email o SMS al instante.' } },
    { '@type': 'Question', name: '¿Qué idiomas hablan vuestros agentes?', acceptedAnswer: { '@type': 'Answer', text: 'Español, inglés y francés nativos. Nuestros agentes no usan scripts traducidos — atienden con fluidez real y entienden las referencias culturales de cada mercado emisor.' } },
    { '@type': 'Question', name: '¿Puedo usar el servicio solo en temporada alta?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. No hay permanencia ni compromiso de duración. Puedes activar el servicio para cubrir picos de temporada alta, puentes o eventos y desactivarlo cuando quieras.' } },
    { '@type': 'Question', name: '¿Cuánto cuesta el servicio?', acceptedAnswer: { '@type': 'Answer', text: 'El precio depende del volumen de llamadas y los servicios que necesites. Contacta con nosotros para un presupuesto personalizado sin compromiso.' } },
    { '@type': 'Question', name: '¿En qué se diferencia Minute Call de otros call centers?', acceptedAnswer: { '@type': 'Answer', text: 'Agentes nativos en España (no en LATAM), sin permanencia, protocolo personalizado por hotel, integración con tu PMS y posibilidad de combinar agentes humanos con IA. Somos partners de Teleperformance.' } },
  ],
}

export default function CallCenterHotelesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main>
        {/* Hero */}
        <div style={{ textAlign: 'center', padding: '80px 24px 48px', maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: '#fff3cd', color: '#856404', fontSize: 13, fontWeight: 600, padding: '4px 14px', borderRadius: 999, marginBottom: 20 }}>
            Especialistas en atencion telefonica hotelera
          </div>
          <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, marginBottom: 16, lineHeight: 1.15 }}>
            Call center para hoteles.<br />Mas reservas directas, menos comisiones.
          </h1>
          <p style={{ fontSize: 18, color: '#555', marginBottom: 32, lineHeight: 1.6 }}>
            Atención telefónica especializada en hoteles: gestionamos reservas directas, atendemos en 3 idiomas y cubrimos las 24 horas — sin permanencia y sin comisiones de OTA.
          </p>
          <a href="/reserva-llamada" style={{ display: 'inline-block', background: '#000', color: '#fff', padding: '14px 32px', borderRadius: 999, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
            Solicita presupuesto gratuito &rarr;
          </a>
        </div>

        {/* Stats bar */}
        <div style={{ maxWidth: 800, margin: '0 auto 64px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, padding: '0 24px' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '24px 8px', background: '#f9f9f9', borderRadius: 12 }}>
              <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#888', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Pain points */}
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 64px' }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 12, textAlign: 'center' }}>Por que los hoteles pierden reservas por telefono</h2>
          <p style={{ textAlign: 'center', color: '#888', marginBottom: 40, maxWidth: 600, margin: '0 auto 40px' }}>
            El teléfono sigue siendo el canal con mayor tasa de conversión en hostelería. Pero la mayoría de hoteles no pueden atenderlo bien.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {painPoints.map((p, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #e5e5e5' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{p.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>{p.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div style={{ background: '#f9f9f9', padding: '64px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 12, textAlign: 'center' }}>Que incluye nuestro servicio para hoteles</h2>
            <p style={{ textAlign: 'center', color: '#888', marginBottom: 40 }}>Todo lo que necesitas para no perder ni una reserva</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
              {services.map((s, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #e5e5e5' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process */}
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '64px 24px' }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 40, textAlign: 'center' }}>Como funciona</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {process.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#ddd', minWidth: 48 }}>{p.step}</div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{p.title}</h3>
                  <p style={{ fontSize: 15, color: '#666', lineHeight: 1.6 }}>{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison with OTAs */}
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 64px' }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 32, textAlign: 'center' }}>Reserva directa vs OTA</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e5e5', background: '#f9f9f9' }}>
                {['', 'Booking / Expedia', 'Minute Call'].map((h, i) => (
                  <th key={i} style={{ padding: '14px 16px', textAlign: i === 0 ? 'left' : 'center', fontWeight: 700, color: i === 2 ? '#000' : '#555' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Comisión', '15-25%', '0%'],
                ['Datos del huésped', 'Los retiene la OTA', 'Tuyos al 100%'],
                ['Upselling', 'Limitado', 'En cada llamada'],
                ['Fidelización', 'Difícil', 'Relación directa'],
                ['Atención personalizada', 'Chat genérico', 'Agente con tu protocolo'],
                ['Coste por reserva', 'Variable (comisión)', 'Presupuesto fijo mensual'],
              ].map(([label, ...vals]) => (
                <tr key={label} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '12px 16px', color: '#666', fontWeight: 600 }}>{label}</td>
                  {vals.map((v, i) => (
                    <td key={i} style={{ padding: '12px 16px', textAlign: 'center', fontWeight: i === 1 ? 700 : 400, color: i === 1 ? '#000' : '#555', background: i === 1 ? '#f9fff9' : '' }}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FAQ */}
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 64px' }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 32 }}>Preguntas frecuentes</h2>
          {faqSchema.mainEntity.map((item, i) => (
            <div key={i} style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: 24, marginBottom: 24 }}>
              <h3 style={{ fontWeight: 600, marginBottom: 8, fontSize: 16 }}>{item.name}</h3>
              <p style={{ color: '#555', fontSize: 14, lineHeight: 1.7 }}>{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background: '#000', color: '#fff', textAlign: 'center', padding: '64px 24px' }}>
          <h2 style={{ fontSize: 'clamp(22px,3vw,36px)', fontWeight: 700, marginBottom: 12 }}>Deja de perder reservas por telefono</h2>
          <p style={{ color: '#aaa', marginBottom: 32 }}>Activa tu call center hotelero en 48 horas. Sin permanencia, sin comisiones.</p>
          <a href="/reserva-llamada" style={{ background: '#fff', color: '#000', padding: '14px 32px', borderRadius: 999, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
            Solicita presupuesto gratuito &rarr;
          </a>
        </div>
      </main>
    </>
  )
}
