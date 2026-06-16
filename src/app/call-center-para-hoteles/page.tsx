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
    title: 'Llamadas perdidas en el check-in',
    description: 'El pico de llamadas coincide con el momento en que tu recepción está más ocupada. Cada llamada perdida es una reserva que se va a Booking.',
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
    title: 'Comisiones de OTAs',
    description: 'Booking y Expedia cobran entre un 15% y un 25% de comisión. Cada reserva directa que captas por teléfono es margen puro.',
  },
]

const services = [
  {
    title: 'Gestion de reservas directas',
    description: 'Consultamos disponibilidad en tu PMS y cerramos la reserva directa — sin comisiones de OTA.',
  },
  {
    title: 'Atencion multilingue',
    description: 'Agentes nativos en español, inglés y francés. Fluidez real, no scripts traducidos.',
  },
  {
    title: 'Upselling y cross-selling',
    description: 'Upgrades de habitación, late check-out, packs de spa durante la llamada de reserva.',
  },
  {
    title: 'Cobertura 24/7 todo el ano',
    description: 'Noches, fines de semana, festivos y temporada alta. Sin contratar turnos de noche.',
  },
  {
    title: 'Filtrado de incidencias',
    description: 'Clasificamos llamadas: reservas, modificaciones, cancelaciones, quejas. Solo te pasamos lo importante.',
  },
  {
    title: 'Integracion con tu PMS',
    description: 'Accedemos a disponibilidad y tarifas en tiempo real para dar información precisa al huésped.',
  },
]

const stats = [
  { value: '24/7', label: 'Cobertura' },
  { value: '3', label: 'Idiomas nativos' },
  { value: '48h', label: 'Activación' },
  { value: '0%', label: 'Comisión OTA' },
]

const steps = [
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

      {/* Hero */}
      <section style={{ textAlign: 'center', maxWidth: 860, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(16px,5vw,64px) clamp(40px,6vw,60px)' }}>
        <span className="pill-label" style={{ marginBottom: 20, display: 'inline-block' }}>
          Especialistas en atencion telefonica hotelera
        </span>
        <h1>
          Call center para hoteles.<br />Mas reservas directas, menos <span className="serif-italic">comisiones.</span>
        </h1>
        <p style={{ maxWidth: 600, margin: '0 auto 32px' }}>
          Atención telefónica especializada en hoteles: gestionamos reservas directas, atendemos en 3 idiomas y cubrimos las 24 horas — sin permanencia y sin comisiones de OTA.
        </p>
        <a href="/reserva-llamada" className="btn-contact">
          Solicita presupuesto gratuito
        </a>
      </section>

      {/* Stats bar */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 clamp(16px,5vw,64px) clamp(40px,6vw,60px)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {stats.map((s, i) => (
          <div key={i} className="card" style={{ textAlign: 'center', padding: 24 }}>
            <p style={{ fontSize: 'clamp(26px,7vw,48px)', fontWeight: 500, color: 'black', letterSpacing: -2, marginBottom: 8 }}>
              {s.value}
            </p>
            <p className="service-card-body" style={{ marginBottom: 0 }}>{s.label}</p>
          </div>
        ))}
      </section>

      {/* Pain points — 2x2 grid */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(20px,5vw,64px)', textAlign: 'center' }}>
        <span className="pill-label" style={{ marginBottom: 16, display: 'inline-block' }}>El problema</span>
        <h2 style={{ marginTop: 16 }}>
          Por que los hoteles pierden reservas por <span className="serif-italic">telefono.</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginTop: 48, textAlign: 'left' }}>
          {painPoints.map((p, i) => (
            <div key={i} className="card" style={{ padding: 32 }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{p.icon}</div>
              <h3 style={{ fontSize: 18, letterSpacing: '-0.5px' }}>{p.title}</h3>
              <p className="service-card-body">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services — 3 col grid */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(20px,5vw,64px)', textAlign: 'center' }}>
        <span className="pill-label" style={{ marginBottom: 16, display: 'inline-block' }}>Servicios</span>
        <h2 style={{ marginTop: 16 }}>
          Que incluye nuestro servicio para <span className="serif-italic">hoteles.</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginTop: 48, textAlign: 'left' }}>
          {services.map((s, i) => (
            <div key={i} className="card" style={{ padding: 32 }}>
              <h3 className="service-card-title" style={{ fontSize: 18, letterSpacing: '-0.5px' }}>{s.title}</h3>
              <p className="service-card-body">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process — same style as home */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(20px,5vw,64px)', textAlign: 'center' }}>
        <span className="pill-label" style={{ marginBottom: 16, display: 'inline-block' }}>Como funciona</span>
        <h2 style={{ marginTop: 16 }}>
          Cómo <span className="serif-italic">funciona.</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginTop: 48, textAlign: 'left' }}>
          {steps.map((item) => (
            <div key={item.step} className="card" style={{ padding: 32 }}>
              <p style={{ fontSize: 48, fontWeight: 500, color: 'rgba(0,0,0,0.1)', marginBottom: 16, letterSpacing: -2 }}>
                {item.step}
              </p>
              <h3 style={{ fontSize: 22 }}>{item.title}</h3>
              <p className="service-card-body">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison — home style cards */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(20px,5vw,64px)', textAlign: 'center' }}>
        <span className="pill-label" style={{ marginBottom: 16, display: 'inline-block' }}>La diferencia</span>
        <h2 style={{ marginTop: 16 }}>
          Reserva directa vs <span className="serif-italic">OTA.</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 24, marginTop: 48, textAlign: 'left' }}>
          <div className="card" style={{ padding: 32 }}>
            <h3 style={{ fontSize: 20, marginBottom: 24 }}>Booking / Expedia</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                'Comisiones del 15-25% por reserva',
                'Los datos del huésped los retiene la OTA',
                'Sin posibilidad de upselling real',
                'Difícil fidelizar al huésped',
                'Chat genérico, sin personalización',
                'Coste variable e impredecible',
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
                '0% comisiones — reserva directa pura',
                'Datos del huésped tuyos al 100%',
                'Upselling activo en cada llamada',
                'Relación directa con tu huésped',
                'Agente nativo con tu protocolo de hotel',
                'Presupuesto fijo mensual, sin sorpresas',
              ].map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, color: 'rgba(255,255,255,0.8)' }}>
                  <span style={{ color: '#5AFF15', fontSize: 16 }}>✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ — same style as home */}
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
          Deja de perder reservas por <span className="serif-italic">telefono.</span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 500, margin: '0 auto 32px' }}>
          Activa tu call center hotelero en 48 horas. Sin permanencia, sin comisiones.
        </p>
        <a href="/reserva-llamada" style={{ display: 'inline-block', background: 'white', color: 'black', padding: 'var(--btn-padding)', borderRadius: 'var(--btn-border-radius)', fontSize: 'var(--btn-font-size)', fontWeight: 500, textDecoration: 'none' }}>
          Solicita presupuesto gratuito
        </a>
      </section>
    </>
  )
}
