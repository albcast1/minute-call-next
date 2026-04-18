import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Precios | Recepcionista virtual para PYMES - minute call',
  description: 'Planes de atención telefónica desde 250 €/mes. Sin permanencia, sin costes ocultos. Agentes nativos o IA para PYMES. Activa tu servicio en 48 horas.',
  alternates: { canonical: 'https://www.minute-call.com/precios' },
  openGraph: {
    title: 'Precios | Recepcionista virtual para PYMES - minute call',
    description: 'Planes de atención telefónica desde 250 €/mes. Sin permanencia, sin costes ocultos.',
    url: 'https://www.minute-call.com/precios',
    siteName: 'minute call',
    locale: 'es_ES',
    type: 'website',
  },
}

const schemaService = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Recepcionista virtual para PYMES',
  description: 'Servicio de atención telefónica 24/7 con agentes nativos o IA. Sin permanencia, sin costes ocultos. Activación en 48 horas.',
  provider: {
    '@type': 'Organization',
    '@id': 'https://www.minute-call.com/#organization',
    name: 'minute call',
    url: 'https://www.minute-call.com',
  },
  areaServed: { '@type': 'Country', name: 'España' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Planes de recepcionista virtual',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Plan Starter',
        description: 'Ideal para PYMES con menos de 20 llamadas diarias. Cobertura en horario comercial con agentes nativos.',
        price: '250',
        priceCurrency: 'EUR',
        priceSpecification: { '@type': 'UnitPriceSpecification', price: '250', priceCurrency: 'EUR', unitText: 'mes' },
        eligibleQuantity: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 200, unitText: 'llamadas/mes' },
      },
      {
        '@type': 'Offer',
        name: 'Plan Business',
        description: 'Para PYMES con 20-60 llamadas diarias. Cobertura 24/7 con agentes nativos y opción de IA.',
        price: '490',
        priceCurrency: 'EUR',
        priceSpecification: { '@type': 'UnitPriceSpecification', price: '490', priceCurrency: 'EUR', unitText: 'mes' },
        eligibleQuantity: { '@type': 'QuantitativeValue', minValue: 201, maxValue: 600, unitText: 'llamadas/mes' },
      },
      {
        '@type': 'Offer',
        name: 'Plan Enterprise',
        description: 'Para empresas con más de 60 llamadas diarias. Cobertura 24/7, equipo dedicado y reporting avanzado.',
        price: '890',
        priceCurrency: 'EUR',
        priceSpecification: { '@type': 'UnitPriceSpecification', price: '890', priceCurrency: 'EUR', unitText: 'mes' },
        eligibleQuantity: { '@type': 'QuantitativeValue', minValue: 601, unitText: 'llamadas/mes' },
      },
    ],
  },
}

const schemaFAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '¿Cuánto cuesta un servicio de recepcionista virtual?', acceptedAnswer: { '@type': 'Answer', text: 'Los planes de Minute Call empiezan desde 250 €/mes para PYMES con hasta 200 llamadas mensuales. El precio varía según el volumen de llamadas, el horario de cobertura y el tipo de agente (humano o IA). Sin costes de activación ni permanencia.' } },
    { '@type': 'Question', name: '¿Hay permanencia o contrato mínimo?', acceptedAnswer: { '@type': 'Answer', text: 'No. Todos los planes funcionan mes a mes, sin contratos a largo plazo ni penalizaciones por cancelación. Puedes activar, pausar o cancelar cuando lo necesites.' } },
    { '@type': 'Question', name: '¿Qué incluye el precio?', acceptedAnswer: { '@type': 'Answer', text: 'El precio incluye atención de llamadas 24/7, personalización del guión y protocolo, toma de mensajes, agenda de citas, cualificación de leads y notificaciones en tiempo real. Sin costes ocultos.' } },
    { '@type': 'Question', name: '¿Cuánto cuesta comparado con una recepcionista interna?', acceptedAnswer: { '@type': 'Answer', text: 'Una recepcionista a jornada completa en España cuesta entre 1.500-2.200 €/mes más seguridad social, vacaciones y formación. Con Minute Call, desde 250 €/mes obtienes cobertura 24/7 y sin costes de estructura.' } },
    { '@type': 'Question', name: '¿Se puede empezar con el plan más básico y escalar?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. Puedes empezar con el Plan Starter y escalar en cualquier momento según crezca tu volumen de llamadas. El cambio se hace sin coste adicional y con activación inmediata.' } },
    { '@type': 'Question', name: '¿Cuánto tarda en activarse el servicio?', acceptedAnswer: { '@type': 'Answer', text: 'El servicio se activa en menos de 48 horas. Definimos contigo el protocolo de atención y configuramos el desvío de llamadas para que todo funcione sin cambiar tu número.' } },
  ],
}

export default function PreciosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Precios transparentes</p>
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">Atención telefónica profesional<br />desde <span className="text-black">250 €/mes</span></h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Sin permanencia. Sin costes ocultos. Activa en 48 horas y cancela cuando quieras.</p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {/* Starter */}
          <div className="border border-gray-200 rounded-2xl p-8">
            <h2 className="text-lg font-semibold mb-2">Starter</h2>
            <p className="text-gray-500 text-sm mb-6">Hasta 200 llamadas/mes</p>
            <div className="mb-6">
              <span className="text-4xl font-semibold">250 €</span>
              <span className="text-gray-500 text-sm">/mes</span>
            </div>
            <ul className="space-y-3 text-sm text-gray-600 mb-8">
              <li className="flex items-start gap-2"><span className="text-black mt-0.5">✓</span>Horario comercial (L-V 9-18h)</li>
              <li className="flex items-start gap-2"><span className="text-black mt-0.5">✓</span>Agentes nativos en español</li>
              <li className="flex items-start gap-2"><span className="text-black mt-0.5">✓</span>Toma de mensajes y citas</li>
              <li className="flex items-start gap-2"><span className="text-black mt-0.5">✓</span>Notificaciones en tiempo real</li>
              <li className="flex items-start gap-2"><span className="text-black mt-0.5">✓</span>Sin permanencia</li>
            </ul>
            <a href="/reserva-llamada" className="block w-full text-center py-3 px-6 border border-black rounded-full text-sm font-medium hover:bg-black hover:text-white transition-colors">Empezar ahora</a>
          </div>

          {/* Business - highlighted */}
          <div className="border-2 border-black rounded-2xl p-8 relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-medium px-4 py-1 rounded-full">Más popular</div>
            <h2 className="text-lg font-semibold mb-2">Business</h2>
            <p className="text-gray-500 text-sm mb-6">Hasta 600 llamadas/mes</p>
            <div className="mb-6">
              <span className="text-4xl font-semibold">490 €</span>
              <span className="text-gray-500 text-sm">/mes</span>
            </div>
            <ul className="space-y-3 text-sm text-gray-600 mb-8">
              <li className="flex items-start gap-2"><span className="text-black mt-0.5">✓</span>Cobertura 24/7</li>
              <li className="flex items-start gap-2"><span className="text-black mt-0.5">✓</span>Agentes nativos o IA a elegir</li>
              <li className="flex items-start gap-2"><span className="text-black mt-0.5">✓</span>Español, inglés y francés</li>
              <li className="flex items-start gap-2"><span className="text-black mt-0.5">✓</span>Cualificación de leads</li>
              <li className="flex items-start gap-2"><span className="text-black mt-0.5">✓</span>Integración CRM y agenda</li>
              <li className="flex items-start gap-2"><span className="text-black mt-0.5">✓</span>Sin permanencia</li>
            </ul>
            <a href="/reserva-llamada" className="block w-full text-center py-3 px-6 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">Empezar ahora</a>
          </div>

          {/* Enterprise */}
          <div className="border border-gray-200 rounded-2xl p-8">
            <h2 className="text-lg font-semibold mb-2">Enterprise</h2>
            <p className="text-gray-500 text-sm mb-6">+600 llamadas/mes</p>
            <div className="mb-6">
              <span className="text-4xl font-semibold">890 €</span>
              <span className="text-gray-500 text-sm">/mes</span>
            </div>
            <ul className="space-y-3 text-sm text-gray-600 mb-8">
              <li className="flex items-start gap-2"><span className="text-black mt-0.5">✓</span>Todo lo del plan Business</li>
              <li className="flex items-start gap-2"><span className="text-black mt-0.5">✓</span>Equipo dedicado</li>
              <li className="flex items-start gap-2"><span className="text-black mt-0.5">✓</span>Reporting y analytics avanzado</li>
              <li className="flex items-start gap-2"><span className="text-black mt-0.5">✓</span>Account manager dedicado</li>
              <li className="flex items-start gap-2"><span className="text-black mt-0.5">✓</span>SLA garantizado</li>
              <li className="flex items-start gap-2"><span className="text-black mt-0.5">✓</span>Sin permanencia</li>
            </ul>
            <a href="/reserva-llamada" className="block w-full text-center py-3 px-6 border border-black rounded-full text-sm font-medium hover:bg-black hover:text-white transition-colors">Empezar ahora</a>
          </div>
        </div>

        {/* Comparison with internal receptionist */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-20">
          <h2 className="text-2xl font-semibold mb-8 text-center">Minute Call vs recepcionista interna</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 pr-8 font-medium text-gray-500">Concepto</th>
                  <th className="text-center py-3 px-4 font-medium">Recepcionista interna</th>
                  <th className="text-center py-3 px-4 font-medium">Minute Call</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr><td className="py-3 pr-8 text-gray-600">Coste mensual</td><td className="text-center py-3 px-4">1.500 - 2.200 €</td><td className="text-center py-3 px-4 font-medium">Desde 250 €</td></tr>
                <tr><td className="py-3 pr-8 text-gray-600">Horario</td><td className="text-center py-3 px-4">8h/día laborables</td><td className="text-center py-3 px-4 font-medium">24/7/365</td></tr>
                <tr><td className="py-3 pr-8 text-gray-600">Vacaciones y bajas</td><td className="text-center py-3 px-4">Interrupciones</td><td className="text-center py-3 px-4 font-medium">Sin interrupciones</td></tr>
                <tr><td className="py-3 pr-8 text-gray-600">Activación</td><td className="text-center py-3 px-4">1-3 meses</td><td className="text-center py-3 px-4 font-medium">48 horas</td></tr>
                <tr><td className="py-3 pr-8 text-gray-600">Escalabilidad</td><td className="text-center py-3 px-4">Contratar más personal</td><td className="text-center py-3 px-4 font-medium">Inmediata</td></tr>
                <tr><td className="py-3 pr-8 text-gray-600">Permanencia</td><td className="text-center py-3 px-4">Contrato laboral</td><td className="text-center py-3 px-4 font-medium">Mes a mes</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ section */}
        <div className="mb-20">
          <h2 className="text-2xl font-semibold mb-8">Preguntas frecuentes sobre precios</h2>
          <div className="space-y-6">
            {schemaFAQ.mainEntity.map((item, i) => (
              <div key={i} className="border-b border-gray-100 pb-6">
                <h3 className="font-medium mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-black text-white rounded-2xl p-12">
          <h2 className="text-2xl font-semibold mb-4">¿Listo para no perder más llamadas?</h2>
          <p className="text-gray-400 mb-8">Activa tu recepcionista virtual en 48 horas. Sin permanencia ni costes ocultos.</p>
          <a href="/reserva-llamada" className="inline-block py-3 px-8 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">Reserva una llamada gratis</a>
        </div>
      </main>
    </>
  )
}
