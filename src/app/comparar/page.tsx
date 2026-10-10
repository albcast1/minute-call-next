import type { Metadata } from 'next'
import { BrandPage, Hero, Ed, Rows, Faq, Versus, CtaFinal } from '@/components/brand/Sections'

export const metadata: Metadata = {
  title: 'Alternativa a Teleperformance, Konecta y Atento para PYMES',
  description: '¿Buscas una alternativa a los grandes call centers para tu PYME? Agentes nativos, sin permanencia, presupuesto a medida y activación en 48 h.',
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
  { icon: '🏥', title: 'Clínicas y centros médicos', description: 'Protocolo sanitario, gestión de urgencias y citas con Doctoralia o Cliniccloud. Lo que Teleperformance no puede hacer a tu escala.' },
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
    { '@type': 'Question', name: '¿En qué se diferencia Minute Call de Secretaria.es?', acceptedAnswer: { '@type': 'Answer', text: 'Minute Call tiene agentes nativos en España (no en Europa Central), especialización por sector, presupuesto ajustado al volumen real y activación en 48 horas. Secretaria.es (Audelia/ebuero) es una empresa alemana con estructura orientada al mercado europeo en general.' } },
    { '@type': 'Question', name: '¿Por qué no usar Secrelan o Digalia si son más baratos?', acceptedAnswer: { '@type': 'Answer', text: 'Para autónomos con muy bajo volumen, pueden ser suficientes. Para una PYME de servicios donde la primera impresión importa (clínica, despacho, inmobiliaria), los agentes en LATAM y el protocolo genérico de estos servicios pueden perjudicar la imagen de marca. Minute Call invierte en que los clientes no sepan que es un servicio externo.' } },
  ],
}

export default function CompararPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BrandPage>
        <Hero
          tag="La alternativa a los grandes call centers para PYMES"
          title="Todo lo que necesitas de un call center. Sin los contratos que no puedes pagar."
          sub="Teleperformance, Konecta y Atento son para grandes corporaciones. Secretaria.es es alemana. Minute Call es la alternativa española para PYMES: agentes nativos, sin permanencia, presupuesto personalizado."
          cta={{ label: 'Reserva una llamada gratuita' }}
        />
        <Ed tag="La comparativa" title="Grandes BPO vs Minute Call." flush={false}>
          <Versus
            themLabel="Teleperformance / Konecta / Atento"
            them={[
              'Contratos de 12+ meses obligatorios',
              'Agentes en LATAM o Marruecos',
              'Mínimo 500+ llamadas/día',
              'Activación en 1-3 meses',
              'Protocolo genérico, sin especialización por sector',
              'Diseñado para grandes corporaciones',
            ]}
            ours={[
              'Sin permanencia - mes a mes',
              'Agentes nativos en España',
              'Sin volumen mínimo de llamadas',
              'Activación en 48 horas',
              'Protocolo personalizado por sector',
              'Diseñado para PYMES españolas',
            ]}
          />
        </Ed>
        <Ed tag="Sectores" title="Para qué tipo de empresa es Minute Call.">
          <Rows items={useCases.map((uc) => ({ title: uc.title, desc: uc.description }))} />
        </Ed>
        <Ed tag="Preguntas" title="FAQ">
          <Faq items={faqSchema.mainEntity.map((q) => ({ q: q.name, a: q.acceptedAnswer.text }))} />
        </Ed>
        <CtaFinal
          title="Prueba la alternativa española a los grandes call centers."
          text="Sin contratos, sin permanencia, sin agentes en LATAM. Activa en 48 horas."
          cta={{ label: 'Reserva una llamada gratuita' }}
        />
      </BrandPage>
    </>
  )
}
