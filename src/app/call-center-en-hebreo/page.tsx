import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Call center en hebreo | Contact center en hebreo para empresas | minute call',
  description: 'Call center y contact center en hebreo para empresas espaÃ±olas. Agentes nativos hebreoparlantes, atenciÃ³n telefÃ³nica 24/7, sin permanencia. Ideal para turismo, comercio internacional y mÃ¡s.',
  alternates: { canonical: 'https://www.minute-call.com/call-center-en-hebreo' },
  openGraph: {
    title: 'Call center en hebreo | minute call',
    description: 'AtenciÃ³n telefÃ³nica en hebreo con agentes nativos. Contact center especializado para empresas que necesitan comunicarse con clientes hebreoparlantes.',
    url: 'https://www.minute-call.com/call-center-en-hebreo',
    siteName: 'minute call',
    locale: 'es_ES',
    type: 'website',
  },
}

const painPoints = [
  {
    icon: 'ð®ð±',
    title: 'Clientes israelÃ­es que cuelgan',
    description: 'Israel es un mercado emisor creciente de turistas a EspaÃ±a, especialmente en destinos como Barcelona, Madrid y la Costa del Sol. Si llaman y nadie les atiende en hebreo, buscan otra opciÃ³n.',
  },
  {
    icon: 'ð',
    title: 'Oportunidades comerciales perdidas',
    description: 'Clientes israelÃ­es que contactan con tu negocio y encuentran una barrera lingÃ¼Ã­stica total. El hebreo no es un idioma que se improvise.',
  },
  {
    icon: 'ð£ï¸',
    title: 'Traducciones automaticas que no convencen',
    description: 'Un script traducido al hebreo no es atenciÃ³n en hebreo. Los clientes notan la diferencia y la confianza se pierde.',
  },
  {
    icon: 'ð¼',
    title: 'Contratar un nativo es caro',
    description: 'Incorporar un empleado que hable hebreo nativo a tu plantilla supone un coste fijo elevado que muchas empresas no pueden justificar.',
  },
]

const services = [
  {
    title: 'Atencion telefonica en hebreo nativo',
    description: 'Agentes nativos en hebreo que atienden a tus clientes con fluidez real, no con guiones traducidos.',
  },
  {
    title: 'Soporte multicanal',
    description: 'AtenciÃ³n por telÃ©fono, email y chat en hebreo. Tus clientes eligen cÃ³mo contactar.',
  },
  {
    title: 'Cobertura 24/7',
    description: 'Cubrimos cualquier franja horaria: maÃ±anas, tardes, noches, fines de semana y festivos.',
  },
  {
    title: 'Gestion de reservas y pedidos',
    description: 'Recibimos llamadas de clientes israelÃ­es, procesamos reservas, consultas y pedidos siguiendo tu protocolo.',
  },
  {
    title: 'Filtrado y clasificacion de llamadas',
    description: 'Clasificamos cada llamada en hebreo por tipo: venta, soporte, incidencia. Solo te pasamos lo que necesita tu atenciÃ³n.',
  },
  {
    title: 'Integracion con tus herramientas',
    description: 'Trabajamos con tu CRM, PMS o sistema de tickets. Cada interacciÃ³n queda registrada en tu plataforma.',
  },
]

const stats = [
  { value: '24/7', label: 'Cobertura' },
  { value: '100%', label: 'hebreo nativo' },
  { value: '48h', label: 'ActivaciÃ³n' },
  { value: '0', label: 'Permanencia' },
]

const steps = [
  { step: '01', title: 'Definimos tu protocolo', description: 'Nos cuentas cÃ³mo quieres que atendamos a tus clientes hebreoparlantes: tono, informaciÃ³n clave, procedimientos y escalado.' },
  { step: '02', title: 'Configuramos el desvio', description: 'DesvÃ­as las llamadas en hebreo a nuestro equipo. Tus clientes nunca notan que es un servicio externo.' },
  { step: '03', title: 'Atendemos como tu equipo', description: 'Gestionamos cada llamada en hebreo nativo siguiendo tu protocolo. Recibes un resumen detallado de cada interacciÃ³n.' },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Â¿QuÃ© es un call center en hebreo?', acceptedAnswer: { '@type': 'Answer', text: 'Es un servicio de atenciÃ³n telefÃ³nica con agentes nativos en hebreo que atienden a tus clientes como parte de tu equipo. Siguen tu protocolo, usan tus herramientas y representan tu marca.' } },
    { '@type': 'Question', name: 'Â¿Vuestros agentes son israelÃ­es nativos?', acceptedAnswer: { '@type': 'Answer', text: 'SÃ­. Nuestros agentes son hablantes nativos de hebreo â no usan traducciones ni scripts. Entienden las referencias culturales y el registro que tus clientes esperan.' } },
    { '@type': 'Question', name: 'Â¿Para quÃ© sectores es Ãºtil un contact center en hebreo?', acceptedAnswer: { '@type': 'Answer', text: 'Turismo y hostelerÃ­a, inmobiliarias, clÃ­nicas de salud y estÃ©tica, tecnologÃ­a, diamantes y joyerÃ­a, y servicios legales con clientes israelÃ­es.' } },
    { '@type': 'Question', name: 'Â¿Puedo activar el servicio solo cuando lo necesite?', acceptedAnswer: { '@type': 'Answer', text: 'SÃ­. No hay permanencia ni compromiso de duraciÃ³n. Puedes activar la atenciÃ³n en hebreo para temporadas altas, campaÃ±as puntuales o de forma continuada â tÃº decides.' } },
    { '@type': 'Question', name: 'Â¿CuÃ¡nto cuesta un call center en hebreo?', acceptedAnswer: { '@type': 'Answer', text: 'El precio depende del volumen de llamadas y la complejidad del servicio. Contacta con nosotros para un presupuesto personalizado sin compromiso.' } },
    { '@type': 'Question', name: 'Â¿En quÃ© se diferencia Minute Call de otros call centers?', acceptedAnswer: { '@type': 'Answer', text: 'Agentes nativos basados en EspaÃ±a, sin permanencia, protocolo personalizado, integraciÃ³n con tu CRM/PMS y posibilidad de combinar agentes humanos con IA conversacional.' } },
  ],
}

export default function CallCenterHebreoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section style={{ textAlign: 'center', maxWidth: 860, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(16px,5vw,64px) clamp(40px,6vw,60px)' }}>
        <span className="pill-label" style={{ marginBottom: 20, display: 'inline-block' }}>
          Call center y contact center en hebreo
        </span>
        <h1>
          Call center en hebreo.<br />Atencion telefonica nativa para tus clientes <span className="serif-italic">israelÃ­es.</span>
        </h1>
        <p style={{ maxWidth: 600, margin: '0 auto 32px' }}>
          Contact center en hebreo con agentes nativos para empresas espaÃ±olas. Atendemos a tus clientes de Israel â sin permanencia y con activaciÃ³n en 48 horas.
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

      {/* Pain points */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(20px,5vw,64px)', textAlign: 'center' }}>
        <span className="pill-label" style={{ marginBottom: 16, display: 'inline-block' }}>El problema</span>
        <h2 style={{ marginTop: 16 }}>
          Por que pierdes clientes israelÃ­es sin un call center en <span className="serif-italic">hebreo.</span>
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

      {/* Services */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(20px,5vw,64px)', textAlign: 'center' }}>
        <span className="pill-label" style={{ marginBottom: 16, display: 'inline-block' }}>Servicios</span>
        <h2 style={{ marginTop: 16 }}>
          Que incluye nuestro contact center en <span className="serif-italic">hebreo.</span>
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

      {/* Process */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(20px,5vw,64px)', textAlign: 'center' }}>
        <span className="pill-label" style={{ marginBottom: 16, display: 'inline-block' }}>Como funciona</span>
        <h2 style={{ marginTop: 16 }}>
          Como <span className="serif-italic">funciona.</span>
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

      {/* Comparison */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(20px,5vw,64px)', textAlign: 'center' }}>
        <span className="pill-label" style={{ marginBottom: 16, display: 'inline-block' }}>La diferencia</span>
        <h2 style={{ marginTop: 16 }}>
          Contratar un nativo vs externalizar con <span className="serif-italic">Minute Call.</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 24, marginTop: 48, textAlign: 'left' }}>
          <div className="card" style={{ padding: 32 }}>
            <h3 style={{ fontSize: 20, marginBottom: 24 }}>Contratar empleado nativo</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                'Coste fijo elevado (salario + SS)',
                'Solo cubre horario laboral',
                'Si enferma o se va, sin cobertura',
                'Proceso de selecciÃ³n largo',
                'Un solo idioma por empleado',
                'DifÃ­cil escalar en temporada alta',
              ].map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, color: 'rgba(0,0,0,0.56)' }}>
                  <span style={{ color: '#e53e3e', fontSize: 16 }}>â</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: 'black', borderRadius: 24, padding: 32, color: 'white' }}>
            <h3 style={{ fontSize: 20, marginBottom: 24, color: 'white' }}>minute call</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                'Coste variable segÃºn volumen',
                'Cobertura 24/7 todo el aÃ±o',
                'Equipo siempre disponible',
                'ActivaciÃ³n en 48 horas',
                'MÃºltiples idiomas disponibles',
                'Escala automÃ¡tica en picos',
              ].map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, color: 'rgba(255,255,255,0.8)' }}>
                  <span style={{ color: '#5AFF15', fontSize: 16 }}>â</span> {item}
                </li>
              ))}
            </ul>
          </div>
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
          Atiende a tus clientes israelÃ­es como se <span className="serif-italic">merecen.</span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 500, margin: '0 auto 32px' }}>
          Activa tu call center en hebreo en 48 horas. Sin permanencia, agentes nativos.
        </p>
        <a href="/reserva-llamada" style={{ display: 'inline-block', background: 'white', color: 'black', padding: 'var(--btn-padding)', borderRadius: 'var(--btn-border-radius)', fontSize: 'var(--btn-font-size)', fontWeight: 500, textDecoration: 'none' }}>
          Solicita presupuesto gratuito
        </a>
      </section>
    </>
  )
}
