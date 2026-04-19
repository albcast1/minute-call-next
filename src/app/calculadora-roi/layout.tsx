import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calculadora: cuánto te cuestan las llamadas perdidas | minute call',
  description: 'Calcula gratis el impacto económico real de las llamadas perdidas en tu negocio. Introduce tus datos y descubre cuánta facturación estás perdiendo cada mes por no atender el teléfono.',
  alternates: { canonical: 'https://www.minute-call.com/calculadora-roi' },
  openGraph: {
    title: 'Calculadora de llamadas perdidas | minute call',
    description: 'Descubre cuánto te están costando las llamadas que no atiendes. Herramienta gratuita para PYMES.',
    url: 'https://www.minute-call.com/calculadora-roi',
    siteName: 'minute call',
    locale: 'es_ES',
    type: 'website',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '¿Cuánto me cuesta cada llamada perdida?', acceptedAnswer: { '@type': 'Answer', text: 'Depende de tu ticket medio y tasa de conversión. Para una empresa con ticket de 500€ y conversión del 20%, cada lead perdido supone 100€ de facturación no ingresada. La calculadora te da el dato exacto para tu negocio.' } },
    { '@type': 'Question', name: '¿Qué porcentaje de llamadas pierde una PYME española de media?', acceptedAnswer: { '@type': 'Answer', text: 'Entre el 27% y el 58% según el sector. Las inmobiliarias pierden el 48%. Las clínicas pierden más del 22% fuera de horario. La media general en PYMES de servicios es del 35%.' } },
    { '@type': 'Question', name: '¿Cómo puedo reducir las llamadas perdidas?', acceptedAnswer: { '@type': 'Answer', text: 'La forma más efectiva es contratar un servicio de recepcionista virtual o atención telefónica externalizada. Minute Call cubre todas las llamadas desde 250€/mes, sin permanencia y activación en 48 horas.' } },
  ],
}

export default function CalculadoraLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  )
}
