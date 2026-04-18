import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Alternativa a Teleperformance, Konecta y Atento para PYMES | minute call',
  description: 'Busca una alternativa a los grandes call centers para tu PYME? Minute Call es la opcion ligera y flexible: agentes nativos, sin permanencia, desde 250 euros/mes. Activa en 48h.',
  alternates: { canonical: 'https://www.minute-call.com/comparar' },
  openGraph: {
    title: 'Alternativa a call centers para PYMES | minute call',
    description: 'La alternativa flexible a Teleperformance, Konecta y Atento para PYMES espanolas.',
    url: 'https://www.minute-call.com/comparar',
    siteName: 'minute call',
    locale: 'es_ES',
    type: 'website',
  },
}

const comparisons = [
  {
    competitor: 'Teleperformance / Konecta / Atento',
    type: 'Grandes call centers BPO',
    minContract: '12 meses',
    minVolume: '+500 llamadas/dia',
    price: '5.000+ euros/mes',
    agents: 'Agentes en LATAM o Marruecos',
    activation: '1-3 meses',
    personalization: 'Script generico',
    forWho: 'Grandes empresas y corporaciones',
  },
  {
    competitor: 'Secretaria.es (Audelia/ebuero)',
    type: 'Secretaria virtual europea',
    minContract: 'Variable',
    minVolume: 'Sin minimo',
    price: 'No publicado (estimado 200-500 euros/mes)',
    agents: 'Agentes en Europa Central',
    activation: '3-5 dias',
    personalization: 'Media',
    forWho: 'Empresas con presencia europea',
  },
  {
    competitor: 'Secrelan / Digalia',
    type: 'Secretaria virtual economica',
    minContract: 'Sin permanencia',
    minVolume: 'Sin minimo',
    price: '49-150 euros/mes',
    agents: 'Agentes en LATAM',
    activation: '24-48h',
    personalization: 'Baja',
    forWho: 'Autonomos y microempresas con bajo presupuesto',
  },
  {
    competitor: 'Minute Call',
    type: 'Secretaria virtual premium para PYMES',
    minContract: 'Sin permanencia (mes a mes)',
    minVolume: 'Sin minimo',
    price: 'Desde 250 euros/mes (publicado)',
    agents: 'Agentes nativos en Espana o IA',
    activation: '48 horas',
    personalization: 'Alta — protocolo por sector',
    forWho: 'PYMES espanolas que quieren calidad sin contratos largos',
  },
]

const useCases = [
  { icon: '🏥', title: 'Clinicas y centros medicos', description: 'Protocolo sanitario, gestion de urgencias y citas con Doctoralia o Cliniccloud. Lo que Teleperformance no puede hacer a tu escala.' },
  { icon: '⚖️', title: 'Despachos de abogados', description: 'Confidencialidad, terminologia juridica y cualificacion de nuevos asuntos. Sin los contratos anuales de los grandes BPO.' },
  { icon: '🏠', title: 'Inmobiliarias', description: 'Cualificacion de compradores (presupuesto, zona, urgencia) para que tu comercial llame preparado. Desde 250 euros/mes.' },
  { icon: '📊', title: 'Asesorias y consultoras', description: 'Primera impresion profesional sin tener que contratar recepcionista. Activa en 48 horas, cancela cuando quieras.' },
  { icon: '🍽️', title: 'Restaurantes y hosteleria', description: 'Gestion de reservas 24/7 cuando el equipo esta en servicio. Sin perder una mesa por no poder coger el telefono.' },
  { icon: '🔧', title: 'Servicios tecnicos y urgencias', description: 'Cobertura nocturna y de fin de semana para captacion de emergencias. La alternativa asequible a contratar turnos de noche.' },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Es Minute Call una alternativa a Teleperformance para PYMES?', acceptedAnswer: { '@type': 'Answer', text: 'Si. Teleperformance, Konecta y Atento estan disenados para grandes empresas con cientos de llamadas diarias y contratos anuales. Minute Call es la alternativa para PYMES: sin permanencia, desde 250 euros/mes, agentes nativos en Espana y activacion en 48 horas.' } },
    { '@type': 'Question', name: 'En que se diferencia Minute Call de Secretaria.es?', acceptedAnswer: { '@type': 'Answer', text: 'Minute Call tiene agentes nativos en Espana (no en Europa Central), precios transparentes publicados en la web, especializacion por sector y activacion en 48 horas. Secretaria.es (Audelia/ebuero) es una empresa alemana sin precios publicados y con estructura orientada al mercado europeo en general.' } },
    { '@type': 'Question', name: 'Por que no usar Secrelan o Digalia si son mas baratos?', acceptedAnswer: { '@type': 'Answer', text: 'Para autonomos con muy bajo volumen, pueden ser suficientes. Para una PYME de servicios donde la primera impresion importa (clinica, despacho, inmobiliaria), los agentes en LATAM y el protocolo generico de estos servicios pueden perjudicar la imagen de marca. Minute Call invierte en que los clientes no sepan que es un servicio externo.' } },
  ],
}

export default function CompararPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main>
        {/* Hero */}
        <div style={{ textAlign: 'center', padding: '80px 24px 48px', maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: '#fff3cd', color: '#856404', fontSize: 13, fontWeight: 600, padding: '4px 14px', borderRadius: 999, marginBottom: 20 }}>
            La alternativa a los grandes call centers para PYMES
          </div>
          <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, marginBottom: 16, lineHeight: 1.15 }}>
            Todo lo que necesitas de un call center.<br />Sin los contratos que no puedes pagar.
          </h1>
          <p style={{ fontSize: 18, color: '#555', marginBottom: 32, lineHeight: 1.6 }}>
            Teleperformance, Konecta y Atento son para grandes corporaciones. Secretaria.es es alemana. Minute Call es la alternativa espanola para PYMES: agentes nativos, sin permanencia, desde 250 euros/mes.
          </p>
          <a href="/reserva-llamada" style={{ display: 'inline-block', background: '#000', color: '#fff', padding: '14px 32px', borderRadius: 999, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
            Reserva una llamada gratuita &rarr;
          </a>
        </div>

        {/* Comparison table */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 64px', overflowX: 'auto' }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 32, textAlign: 'center' }}>Comparativa de opciones</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, minWidth: 800 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e5e5', background: '#f9f9f9' }}>
                {['','Grandes BPO','Secretaria.es','Secrelan / Digalia','Minute Call'].map((h,i)=>(
                  <th key={i} style={{ padding: '14px 16px', textAlign: i===0?'left':'center', fontWeight: 700, color: i===4?'#000':'#555' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Para quien','Grandes empresas','Empresas europeas','Autonomos','PYMES espanolas'],
                ['Agentes','LATAM / Marruecos','Europa Central','LATAM','Nativos en Espana'],
                ['Precio','5.000+ euros/mes','No publicado','49-150 euros/mes','Desde 250 euros/mes'],
                ['Permanencia','12 meses minimo','Variable','Sin permanencia','Sin permanencia'],
                ['Activacion','1-3 meses','3-5 dias','24-48h','48 horas'],
                ['Protocolo por sector','No','Limitado','No','Si'],
                ['IA + humano','No','Si (Audelia)','No','Si'],
              ].map(([label,...vals])=>(
                <tr key={label} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '12px 16px', color: '#666', fontWeight: 600 }}>{label}</td>
                  {vals.map((v,i)=>(
                    <td key={i} style={{ padding: '12px 16px', textAlign: 'center', fontWeight: i===3?700:400, color: i===3?'#000':'#555', background: i===3?'#f9fff9':'' }}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Use cases */}
        <div style={{ background: '#f9f9f9', padding: '64px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 12, textAlign: 'center' }}>Para que tipo de empresa es Minute Call</h2>
            <p style={{ textAlign: 'center', color: '#888', marginBottom: 40 }}>Lo que los grandes BPO no pueden hacer a tu escala</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
              {useCases.map((uc,i)=>(
                <div key={i} style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #e5e5e5' }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{uc.icon}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{uc.title}</h3>
                  <p style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>{uc.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ maxWidth: 800, margin: '64px auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 32 }}>Preguntas frecuentes sobre la comparativa</h2>
          {faqSchema.mainEntity.map((item,i)=>(
            <div key={i} style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: 24, marginBottom: 24 }}>
              <h3 style={{ fontWeight: 600, marginBottom: 8, fontSize: 16 }}>{item.name}</h3>
              <p style={{ color: '#555', fontSize: 14, lineHeight: 1.7 }}>{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background: '#000', color: '#fff', textAlign: 'center', padding: '64px 24px' }}>
          <h2 style={{ fontSize: 'clamp(22px,3vw,36px)', fontWeight: 700, marginBottom: 12 }}>Prueba la alternativa espanola a los grandes call centers</h2>
          <p style={{ color: '#aaa', marginBottom: 32 }}>Sin contratos, sin permanencia, sin agentes en LATAM. Activa en 48 horas.</p>
          <a href="/reserva-llamada" style={{ background: '#fff', color: '#000', padding: '14px 32px', borderRadius: 999, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
            Reserva una llamada gratuita &rarr;
          </a>
        </div>
      </main>
    </>
  )
}
