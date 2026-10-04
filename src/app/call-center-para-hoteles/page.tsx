import type { Metadata } from 'next'
import LanguageLanding from '@/components/brand/LanguageLanding'

export const metadata: Metadata = {
  title: 'Call center para hoteles 24/7 | minute call',
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
    description: 'Consultamos disponibilidad en tu PMS y cerramos la reserva directa - sin comisiones de OTA.',
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
    { '@type': 'Question', name: '¿Qué es un call center para hoteles?', acceptedAnswer: { '@type': 'Answer', text: 'Es un servicio de atención telefónica especializado en el sector hotelero. Gestiona reservas directas, consultas de huéspedes, modificaciones, cancelaciones y upselling - todo sin comisiones de OTA y con agentes que conocen la operativa hotelera.' } },
    { '@type': 'Question', name: '¿Cómo gestionáis las reservas directas?', acceptedAnswer: { '@type': 'Answer', text: 'Accedemos a la disponibilidad de tu hotel en tiempo real a través de tu PMS. Cuando un huésped llama, consultamos fechas, ofrecemos la mejor tarifa disponible y cerramos la reserva directa. El huésped recibe confirmación por email o SMS al instante.' } },
    { '@type': 'Question', name: '¿Qué idiomas hablan vuestros agentes?', acceptedAnswer: { '@type': 'Answer', text: 'Español, inglés y francés nativos. Nuestros agentes no usan scripts traducidos - atienden con fluidez real y entienden las referencias culturales de cada mercado emisor.' } },
    { '@type': 'Question', name: '¿Puedo usar el servicio solo en temporada alta?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. No hay permanencia ni compromiso de duración. Puedes activar el servicio para cubrir picos de temporada alta, puentes o eventos y desactivarlo cuando quieras.' } },
    { '@type': 'Question', name: '¿Cuánto cuesta el servicio?', acceptedAnswer: { '@type': 'Answer', text: 'El precio depende del volumen de llamadas y los servicios que necesites. Contacta con nosotros para un presupuesto personalizado sin compromiso.' } },
    { '@type': 'Question', name: '¿En qué se diferencia Minute Call de otros call centers?', acceptedAnswer: { '@type': 'Answer', text: 'Agentes nativos en España (no en LATAM), sin permanencia, protocolo personalizado por hotel, integración con tu PMS y posibilidad de combinar agentes humanos con IA. Somos partners de Teleperformance.' } },
  ],
}

export default function CallCenterHotelesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <LanguageLanding
        heroTag={"Especialistas en atencion telefonica hotelera"}
        heroTitle={"Call center para hoteles. Mas reservas directas, menos comisiones."}
        heroSub={"Atención telefónica especializada en hoteles: gestionamos reservas directas, atendemos en 3 idiomas y cubrimos las 24 horas - sin permanencia y sin comisiones de OTA."}
        heroCta={"Solicita presupuesto gratuito"}
        stats={stats}
        painTitle={"Por que los hoteles pierden reservas por telefono."}
        painPoints={painPoints}
        servicesTitle={"Que incluye nuestro servicio para hoteles."}
        services={services}
        stepsTitle={"Cómo funciona."}
        steps={steps}
        compareTitle={"Reserva directa vs OTA."}
        themLabel={"Booking / Expedia"}
        them={['Comisiones del 15-25% por reserva',
                'Los datos del huésped los retiene la OTA',
                'Sin posibilidad de upselling real',
                'Difícil fidelizar al huésped',
                'Chat genérico, sin personalización',
                'Coste variable e impredecible',]}
        ours={['0% comisiones - reserva directa pura',
                'Datos del huésped tuyos al 100%',
                'Upselling activo en cada llamada',
                'Relación directa con tu huésped',
                'Agente nativo con tu protocolo de hotel',
                'Presupuesto fijo mensual, sin sorpresas',]}
        faq={faqSchema.mainEntity.map((q) => ({ q: q.name, a: q.acceptedAnswer.text }))}
        ctaTitle={"Deja de perder reservas por telefono."}
        ctaText={"Activa tu call center hotelero en 48 horas. Sin permanencia, sin comisiones."}
      />
    </>
  )
}
