import type { Metadata } from 'next'
import LanguageLanding from '@/components/brand/LanguageLanding'

export const metadata: Metadata = {
  title: 'Call center en francés para empresas | minute call',
  description: 'Call center en francés con agentes nativos para empresas españolas. Atención 24/7 y sin permanencia, ideal para turismo y comercio internacional.',
  alternates: { canonical: 'https://www.minute-call.com/call-center-en-frances' },
  openGraph: {
    title: 'Call center en frances | minute call',
    description: 'Atención telefónica en francés con agentes nativos. Contact center especializado para empresas que necesitan comunicarse con clientes francófonos.',
    url: 'https://www.minute-call.com/call-center-en-frances',
    siteName: 'minute call',
    locale: 'es_ES',
    type: 'website',
  },
}

const painPoints = [
  {
    icon: '🇫🇷',
    title: 'Clientes franceses que cuelgan',
    description: 'Francia es el segundo mercado emisor de turistas a España. Si llaman y nadie les atiende en francés, reservan en otro sitio.',
  },
  {
    icon: '📉',
    title: 'Oportunidades comerciales perdidas',
    description: 'Empresas francófonas de Francia, Bélgica, Suiza y norte de África que contactan con tu negocio y no consiguen comunicarse.',
  },
  {
    icon: '🗣️',
    title: 'Traducciones automaticas que no convencen',
    description: 'Un script traducido al francés no es atención en francés. Los clientes notan la diferencia y la confianza se pierde.',
  },
  {
    icon: '💼',
    title: 'Contratar un nativo es caro',
    description: 'Incorporar un empleado francófono a tu plantilla supone un coste fijo elevado que muchas empresas no pueden justificar.',
  },
]

const services = [
  {
    title: 'Atencion telefonica en frances nativo',
    description: 'Agentes francófonos nativos que atienden a tus clientes con fluidez real, no con guiones traducidos.',
  },
  {
    title: 'Soporte multicanal',
    description: 'Atención por teléfono, email y chat en francés. Tus clientes francófonos eligen cómo contactar.',
  },
  {
    title: 'Cobertura 24/7',
    description: 'Cubrimos horario de oficina francés (mismo huso horario que España) y también noches, fines de semana y festivos.',
  },
  {
    title: 'Gestion de reservas y pedidos',
    description: 'Recibimos llamadas de clientes franceses, procesamos reservas, consultas y pedidos siguiendo tu protocolo.',
  },
  {
    title: 'Filtrado y clasificacion de llamadas',
    description: 'Clasificamos cada llamada en francés por tipo: venta, soporte, incidencia. Solo te pasamos lo que necesita tu atención.',
  },
  {
    title: 'Integracion con tus herramientas',
    description: 'Trabajamos con tu CRM, PMS o sistema de tickets. Cada interacción queda registrada en tu plataforma.',
  },
]

const stats = [
  { value: '24/7', label: 'Cobertura' },
  { value: '100%', label: 'Francés nativo' },
  { value: '48h', label: 'Activación' },
  { value: '0', label: 'Permanencia' },
]

const steps = [
  { step: '01', title: 'Definimos tu protocolo', description: 'Nos cuentas cómo quieres que atendamos a tus clientes francófonos: tono, información clave, procedimientos y escalado.' },
  { step: '02', title: 'Configuramos el desvio', description: 'Desvías las llamadas en francés a nuestro equipo. Tus clientes nunca notan que es un servicio externo.' },
  { step: '03', title: 'Atendemos como tu equipo', description: 'Gestionamos cada llamada en francés nativo siguiendo tu protocolo. Recibes un resumen detallado de cada interacción.' },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '¿Qué es un call center en francés?', acceptedAnswer: { '@type': 'Answer', text: 'Es un servicio de atención telefónica con agentes nativos francófonos que atienden a tus clientes en francés. Funciona como una extensión de tu equipo: siguen tu protocolo, usan tus herramientas y representan tu marca.' } },
    { '@type': 'Question', name: '¿Vuestros agentes son franceses nativos?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. Nuestros agentes francófonos son nativos — no usan traducciones ni scripts. Entienden las referencias culturales, los modismos y el registro formal que los clientes franceses esperan.' } },
    { '@type': 'Question', name: '¿Para qué sectores es útil un contact center en francés?', acceptedAnswer: { '@type': 'Answer', text: 'Turismo y hostelería, comercio internacional, e-commerce con clientes en Francia, Bélgica o Suiza, logística, inmobiliarias en zonas con compradores franceses, y cualquier empresa española que reciba llamadas en francés.' } },
    { '@type': 'Question', name: '¿Puedo activar el servicio solo cuando lo necesite?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. No hay permanencia ni compromiso de duración. Puedes activar la atención en francés para temporadas altas, campañas puntuales o de forma continuada — tú decides.' } },
    { '@type': 'Question', name: '¿Cuánto cuesta un call center en francés?', acceptedAnswer: { '@type': 'Answer', text: 'El precio depende del volumen de llamadas y la complejidad del servicio. Contacta con nosotros para un presupuesto personalizado sin compromiso.' } },
    { '@type': 'Question', name: '¿En qué se diferencia Minute Call de otros call centers?', acceptedAnswer: { '@type': 'Answer', text: 'Agentes nativos basados en España, sin permanencia, protocolo personalizado, integración con tu CRM/PMS y posibilidad de combinar agentes humanos con IA conversacional.' } },
  ],
}

export default function CallCenterFrancesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <LanguageLanding
        heroTag={"Call center y contact center en frances"}
        heroTitle={"Call center en frances. Atencion telefonica nativa para tus clientes francofonos."}
        heroSub={"Contact center en francés con agentes nativos para empresas españolas. Atendemos a tus clientes francófonos de Francia, Bélgica y Suiza — sin permanencia y con activación en 48 horas."}
        heroCta={"Solicita presupuesto gratuito"}
        stats={stats}
        painTitle={"Por que pierdes clientes franceses sin un call center en frances."}
        painPoints={painPoints}
        servicesTitle={"Que incluye nuestro contact center en frances."}
        services={services}
        stepsTitle={"Como funciona."}
        steps={steps}
        compareTitle={"Contratar un nativo vs externalizar con Minute Call."}
        themLabel={"Contratar empleado francofonos"}
        them={['Coste fijo elevado (salario + SS)',
                'Solo cubre horario laboral',
                'Si enferma o se va, sin cobertura',
                'Proceso de selección largo',
                'Un solo idioma por empleado',
                'Difícil escalar en temporada alta',]}
        ours={['Coste variable según volumen',
                'Cobertura 24/7 todo el año',
                'Equipo siempre disponible',
                'Activación en 48 horas',
                'Múltiples idiomas disponibles',
                'Escala automática en picos',]}
        faq={faqSchema.mainEntity.map((q) => ({ q: q.name, a: q.acceptedAnswer.text }))}
        ctaTitle={"Atiende a tus clientes franceses como se merecen."}
        ctaText={"Activa tu call center en francés en 48 horas. Sin permanencia, agentes nativos."}
      />
    </>
  )
}
