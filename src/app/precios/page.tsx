import type { Metadata } from 'next'
import Link from 'next/link'

/**
 * Pagina de precios.
 *
 * "Cuanto cuesta" es la intencion con mas volumen del nicho y la que mas citan
 * los motores generativos. En Search Console aparecemos en posicion 2,6 para
 * "tarifas call center" y 1,4 para "recepcionista virtual clinica precio", con
 * cero clics en ambas: Google nos pone delante de gente que busca una cifra y
 * hasta ahora /precios redirigia a /comparar, que es una pagina de competencia.
 *
 * Lo que publicamos son RANGOS DE MERCADO, no nuestras tarifas. El precio de
 * Minute Call sigue siendo por presupuesto segun volumen. La pagina existe para
 * que quien busca orientarse la encuentre aqui y no en la web de otro.
 */

export const metadata: Metadata = {
  title: 'Precios de atención telefónica en España 2026 | minute call',
  description:
    'Qué cuesta un call center o una secretaria virtual en España: modelos por hora, por llamada y por paquete, con rangos reales de mercado y el coste de la alternativa interna.',
  alternates: { canonical: 'https://www.minute-call.com/precios' },
  openGraph: {
    title: 'Precios de atención telefónica en España 2026',
    description:
      'Modelos de precio del mercado español: por hora de agente, por llamada y por paquete mensual. Con el coste real de contratar en interno para comparar.',
    url: 'https://www.minute-call.com/precios',
    siteName: 'minute call',
    locale: 'es_ES',
    type: 'website',
  },
}

const MODELOS = [
  {
    nombre: 'Por hora de agente',
    rango: '25 - 30 €/hora',
    detalle: 'Servicio estándar. Sube en perfiles con idiomas o especialización sectorial.',
    cuandoEncaja: 'Volumen alto y constante, con un equipo dedicado a tu cuenta.',
    cuandoNo: 'Pagas la disponibilidad la uses o no. Con volumen irregular se dispara el coste por llamada real.',
  },
  {
    nombre: 'Por llamada atendida',
    rango: '0,80 - 2,50 € por llamada',
    detalle: 'Casi siempre con un mínimo mensual. El precio depende de qué haya que hacer con la llamada.',
    cuandoEncaja: 'Volumen conocido y estable. Es el modelo más habitual en secretaría virtual.',
    cuandoNo: 'Con picos fuertes el gasto deja de ser previsible.',
  },
  {
    nombre: 'Por paquete mensual',
    rango: 'desde 100 € hasta 900 €/mes',
    detalle:
      'Un número cerrado de llamadas o minutos a precio fijo. Entrada 100-200 €, pyme estándar 200-500 €, pyme activa 450-900 €.',
    cuandoEncaja: 'La mayoría de pymes. Hace el gasto previsible sin comprar una jornada completa.',
    cuandoNo: 'Si te pasas del paquete, el excedente suele facturarse aparte.',
  },
]

const FAQ = [
  {
    q: '¿Cuánto cuesta un call center en España?',
    a: 'Depende del modelo de contratación. Por hora de agente, el mercado español se mueve en torno a los 25-30 € en servicio estándar. Por llamada atendida, entre 0,80 € y 2,50 € según la complejidad del protocolo. Por paquete mensual cerrado, desde unos 100 € para volúmenes de entrada hasta 900 € para una pyme con 300-600 llamadas al mes.',
  },
  {
    q: '¿Cuánto cuesta una secretaria virtual?',
    a: 'La secretaría virtual se factura casi siempre por llamada atendida con un mínimo mensual, no por hora. El precio por llamada varía según la tarea: tomar un recado cuesta menos que cualificar un lead con un guion de preguntas o cerrar una cita en tu agenda. Para una pyme con 200 llamadas al mes, el rango habitual del mercado está entre 160 € y 500 € mensuales.',
  },
  {
    q: '¿Sale más barato contratar a alguien en plantilla?',
    a: 'Casi nunca, si se compara el coste completo y no el salario. Un administrativo o recepcionista en España cobra entre 1.200 € y 1.700 € brutos al mes, a lo que hay que sumar entre un 30% y un 33% de Seguridad Social a cargo de la empresa, más vacaciones, bajas, formación y puesto de trabajo. El coste real ronda los 1.800-2.500 € mensuales, y cubre una jornada, no 24 horas.',
  },
  {
    q: '¿Por qué Minute Call no publica una tarifa cerrada?',
    a: 'Porque el precio depende del volumen real de llamadas y de lo que haya que hacer con cada una, y una tarifa única obliga a que unos clientes subvencionen a otros. Preparamos el presupuesto sobre tu volumen concreto. No hay coste de alta, no hay permanencia y la cobertura fuera de horario no se factura como recargo.',
  },
  {
    q: '¿Qué conceptos suelen quedar fuera del precio anunciado?',
    a: 'Los tres habituales son los recargos por noches, fines de semana y festivos; el coste de alta o configuración inicial; y los excedentes cuando se supera el paquete contratado. Conviene preguntar por los tres antes de comparar dos presupuestos, porque son los que hacen que la oferta más barata sobre el papel acabe no siéndolo.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function PreciosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(16px,5vw,64px) clamp(24px,4vw,40px)' }}>
        <span className="pill-label" style={{ marginBottom: 20, display: 'inline-block' }}>
          Precios de atención telefónica en España
        </span>
        <h1>
          Qué cuesta atender tus llamadas, <span className="serif-italic">con cifras.</span>
        </h1>
        <p style={{ maxWidth: 700, marginTop: 24, lineHeight: 1.7 }}>
          Los rangos de esta página son del mercado español, no nuestras tarifas. Si estás
          comparando presupuestos, esto es lo que necesitas saber para que la comparación tenga
          sentido: los tres modelos que existen, lo que cuesta la alternativa interna y los
          conceptos que suelen quedar fuera de la cifra que te enseñan.
        </p>
      </section>

      {/* Modelos de precio */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 clamp(16px,5vw,64px) clamp(40px,6vw,60px)' }}>
        <h2 style={{ marginBottom: 8 }}>Los tres modelos del mercado</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 28 }}>
          {MODELOS.map((m, i) => (
            <div key={i} className="card" style={{ padding: 28 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
                <p style={{ fontSize: 19, fontWeight: 600, color: 'black', marginBottom: 0 }}>{m.nombre}</p>
                <p style={{ fontSize: 18, fontWeight: 500, color: 'black', marginBottom: 0, letterSpacing: -0.5 }}>{m.rango}</p>
              </div>
              <p style={{ marginBottom: 12, lineHeight: 1.7 }}>{m.detalle}</p>
              <p style={{ marginBottom: 6, lineHeight: 1.7, fontSize: 15 }}>
                <strong>Encaja si:</strong> {m.cuandoEncaja}
              </p>
              <p style={{ marginBottom: 0, lineHeight: 1.7, fontSize: 15, color: 'rgba(0,0,0,0.56)' }}>
                <strong>Cuidado con:</strong> {m.cuandoNo}
              </p>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 20, fontSize: 14, color: 'rgba(0,0,0,0.5)', lineHeight: 1.6 }}>
          Rangos orientativos del mercado español en 2026, recogidos de presupuestos y tarifas
          públicas de proveedores del sector. Varían según idiomas, especialización y volumen.
        </p>
      </section>

      {/* La alternativa interna */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 clamp(16px,5vw,64px) clamp(40px,6vw,60px)' }}>
        <h2>La cifra contra la que hay que comparar</h2>
        <p style={{ maxWidth: 700, marginTop: 20, lineHeight: 1.7 }}>
          El error más común al valorar un servicio externo es compararlo con el sueldo de una
          recepcionista. La comparación honesta es contra el coste completo:
        </p>
        <div className="card" style={{ padding: 28, marginTop: 20, maxWidth: 560 }}>
          {[
            ['Salario bruto', '1.200 - 1.700 €/mes'],
            ['Seguridad Social a cargo de la empresa', '+30-33%'],
            ['Vacaciones, bajas, formación y puesto', 'variable'],
            ['Coste real aproximado', '1.800 - 2.500 €/mes'],
          ].map(([k, v], i, arr) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 16,
                padding: '12px 0',
                borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none',
                fontWeight: i === arr.length - 1 ? 600 : 400,
                color: i === arr.length - 1 ? 'black' : 'inherit',
              }}
            >
              <span>{k}</span>
              <span style={{ whiteSpace: 'nowrap' }}>{v}</span>
            </div>
          ))}
        </div>
        <p style={{ maxWidth: 700, marginTop: 20, lineHeight: 1.7 }}>
          Y eso cubre una jornada de lunes a viernes. Las llamadas de las tardes, los fines de
          semana y las de agosto siguen sin atenderse.
        </p>
      </section>

      {/* Nuestro modelo */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 clamp(16px,5vw,64px) clamp(40px,6vw,60px)' }}>
        <h2>Cómo calculamos el presupuesto en Minute Call</h2>
        <p style={{ maxWidth: 700, marginTop: 20, lineHeight: 1.7 }}>
          No publicamos una tarifa cerrada porque el precio depende del volumen real de llamadas y
          de lo que haya que hacer con cada una, y una tarifa única obliga a que unos clientes
          subvencionen a otros. Lo que sí es fijo:
        </p>
        <ul style={{ maxWidth: 700, marginTop: 16, lineHeight: 1.9, paddingLeft: 20 }}>
          <li>Sin coste de alta ni configuración inicial.</li>
          <li>Sin permanencia: se da de baja cuando quieras.</li>
          <li>La cobertura fuera de horario, fines de semana y festivos no se factura como recargo.</li>
          <li>No cambias de número: el servicio arranca con un desvío desde tu numeración actual.</li>
          <li>Operativo en menos de 48 horas.</li>
        </ul>
        <p style={{ maxWidth: 700, marginTop: 20, lineHeight: 1.7 }}>
          Para darte una cifra necesitamos tres datos: cuántas llamadas recibes al mes, en qué
          franjas y qué quieres que se haga con ellas. Con eso el presupuesto sale en la misma
          llamada.
        </p>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 clamp(16px,5vw,64px) clamp(40px,6vw,60px)' }}>
        <h2>Preguntas frecuentes sobre precios</h2>
        <div style={{ marginTop: 24 }}>
          {FAQ.map((f, i) => (
            <details key={i} style={{ padding: '24px 0', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <summary
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  cursor: 'pointer',
                  listStyle: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 16,
                  color: 'black',
                }}
              >
                {f.q}
                <span style={{ fontSize: 24, fontWeight: 300 }}>+</span>
              </summary>
              <p style={{ marginTop: 16, lineHeight: 1.7 }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'black', color: 'white', textAlign: 'center', padding: 'clamp(40px,8vw,80px) clamp(16px,5vw,64px)' }}>
        <h2 style={{ color: 'white' }}>
          Dinos tu volumen y te damos la <span className="serif-italic">cifra.</span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 520, margin: '0 auto 32px' }}>
          Sin coste de alta, sin permanencia y operativo en 48 horas.
        </p>
        <Link
          href="/reserva-llamada"
          style={{ display: 'inline-block', background: 'white', color: 'black', padding: 'var(--btn-padding)', borderRadius: 'var(--btn-border-radius)', fontSize: 'var(--btn-font-size)', fontWeight: 500, textDecoration: 'none' }}
        >
          Pedir presupuesto
        </Link>
      </section>
    </>
  )
}
