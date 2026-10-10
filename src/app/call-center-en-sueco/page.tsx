import type { Metadata } from 'next'
import LanguageLanding from '@/components/brand/LanguageLanding'

export const metadata: Metadata = {
  title: 'Call center en sueco para empresas | minute call',
  description: 'Call center en sueco con agentes nativos para empresas españolas. Atención 24/7 y sin permanencia, ideal para turismo y comercio internacional.',
  alternates: { canonical: 'https://www.minute-call.com/call-center-en-sueco' },
  openGraph: {
    title: 'Call center en sueco | minute call',
    description: 'Atención telefónica en sueco con agentes nativos. Contact center especializado para empresas que necesitan comunicarse con clientes suecoparlantes.',
    url: 'https://www.minute-call.com/call-center-en-sueco',
    siteName: 'minute call',
    locale: 'es_ES',
    type: 'website',
  },
}

const painPoints = [
  {
    icon: '🇸🇪',
    title: 'Clientes suecos que cuelgan',
    description: 'Suecia es un mercado escandinavo con alto poder adquisitivo. España es uno de los destinos favoritos de los suecos, especialmente la Costa del Sol, Canarias y Baleares. Si llaman y nadie les atiende en sueco, buscan otra opción.',
  },
  {
    icon: '📉',
    title: 'Oportunidades comerciales perdidas',
    description: 'Clientes suecos que contactan con tu negocio. Aunque muchos hablan inglés, la atención en sueco genera una confianza que marca la diferencia en la conversión.',
  },
  {
    icon: '🗣️',
    title: 'Traducciones automáticas que no convencen',
    description: 'Un script traducido al sueco no es atención en sueco. Los clientes notan la diferencia y la confianza se pierde.',
  },
  {
    icon: '💼',
    title: 'Contratar un nativo es caro',
    description: 'Incorporar un empleado que hable sueco nativo a tu plantilla supone un coste fijo elevado que muchas empresas no pueden justificar.',
  },
]

const services = [
  {
    title: 'Atención telefónica en sueco nativo',
    description: 'Agentes nativos en sueco que atienden a tus clientes con fluidez real, no con guiones traducidos.',
  },
  {
    title: 'Soporte multicanal',
    description: 'Atención por teléfono, email y chat en sueco. Tus clientes eligen cómo contactar.',
  },
  {
    title: 'Cobertura 24/7',
    description: 'Cubrimos cualquier franja horaria: mañanas, tardes, noches, fines de semana y festivos.',
  },
  {
    title: 'Gestión de reservas y pedidos',
    description: 'Recibimos llamadas de clientes suecos, procesamos reservas, consultas y pedidos siguiendo tu protocolo.',
  },
  {
    title: 'Filtrado y clasificación de llamadas',
    description: 'Clasificamos cada llamada en sueco por tipo: venta, soporte, incidencia. Solo te pasamos lo que necesita tu atención.',
  },
  {
    title: 'Integración con tus herramientas',
    description: 'Trabajamos con tu CRM, PMS o sistema de tickets. Cada interacción queda registrada en tu plataforma.',
  },
]

const stats = [
  { value: '24/7', label: 'Cobertura' },
  { value: '100%', label: 'sueco nativo' },
  { value: '48h', label: 'Activación' },
  { value: '0', label: 'Permanencia' },
]

const steps = [
  { step: '01', title: 'Definimos tu protocolo', description: 'Nos cuentas cómo quieres que atendamos a tus clientes suecoparlantes: tono, información clave, procedimientos y escalado.' },
  { step: '02', title: 'Configuramos el desvío', description: 'Desvías las llamadas en sueco a nuestro equipo. Tus clientes nunca notan que es un servicio externo.' },
  { step: '03', title: 'Atendemos como tu equipo', description: 'Gestionamos cada llamada en sueco nativo siguiendo tu protocolo. Recibes un resumen detallado de cada interacción.' },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '¿Qué es un call center en sueco?', acceptedAnswer: { '@type': 'Answer', text: 'Es un servicio de atención telefónica con agentes nativos en sueco que atienden a tus clientes como parte de tu equipo. Siguen tu protocolo, usan tus herramientas y representan tu marca.' } },
    { '@type': 'Question', name: '¿Vuestros agentes son suecos nativos?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. Nuestros agentes son hablantes nativos de sueco - no usan traducciones ni scripts. Entienden las referencias culturales y el registro que tus clientes esperan.' } },
    { '@type': 'Question', name: '¿Para qué sectores es útil un contact center en sueco?', acceptedAnswer: { '@type': 'Answer', text: 'Turismo y hostelería, inmobiliarias en costa, tecnología, diseño, logística y servicios premium dirigidos al mercado escandinavo.' } },
    { '@type': 'Question', name: '¿Puedo activar el servicio solo cuando lo necesite?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. No hay permanencia ni compromiso de duración. Puedes activar la atención en sueco para temporadas altas, campañas puntuales o de forma continuada - tú decides.' } },
    { '@type': 'Question', name: '¿Cuánto cuesta un call center en sueco?', acceptedAnswer: { '@type': 'Answer', text: 'El precio depende del volumen de llamadas y la complejidad del servicio. Contacta con nosotros para un presupuesto personalizado sin compromiso.' } },
    { '@type': 'Question', name: '¿En qué se diferencia Minute Call de otros call centers?', acceptedAnswer: { '@type': 'Answer', text: 'Agentes nativos basados en España, sin permanencia, protocolo personalizado, integración con tu CRM/PMS y posibilidad de combinar agentes humanos con IA conversacional.' } },
  ],
}

export default function CallCenterSuecoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <LanguageLanding
        heroTag={"Call center y contact center en sueco"}
        heroTitle={"Call center en sueco. Atención telefónica nativa para tus clientes suecos."}
        heroSub={"Contact center en sueco con agentes nativos para empresas españolas. Atendemos a tus clientes de Suecia - sin permanencia y con activación en 48 horas."}
        heroCta={"Solicita presupuesto gratuito"}
        stats={stats}
        painTitle={"Por qué pierdes clientes suecos sin un call center en sueco."}
        painPoints={painPoints}
        servicesTitle={"Qué incluye nuestro contact center en sueco."}
        services={services}
        stepsTitle={"Cómo funciona."}
        steps={steps}
        compareTitle={"Contratar un nativo vs externalizar con Minute Call."}
        themLabel={"Contratar empleado nativo"}
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
        ctaTitle={"Atiende a tus clientes suecos como se merecen."}
        ctaText={"Activa tu call center en sueco en 48 horas. Sin permanencia, agentes nativos."}
      />
    </>
  )
}
