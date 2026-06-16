import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Call center en aleman | Contact center en aleman para empresas | minute call',
  description: 'Call center y contact center en alemÃ¡n para empresas espaÃ±olas. Agentes nativos germanÃ³fonos, atenciÃ³n telefÃ³nica 24/7, sin permanencia. Ideal para turismo, comercio internacional y mÃ¡s.',
  alternates: { canonical: 'https://www.minute-call.com/call-center-en-aleman' },
  openGraph: {
    title: 'Call center en aleman | minute call',
    description: 'AtenciÃ³n telefÃ³nica en alemÃ¡n con agentes nativos. Contact center especializado para empresas que necesitan comunicarse con clientes germanÃ³fonos.',
    url: 'https://www.minute-call.com/call-center-en-aleman',
    siteName: 'minute call',
    locale: 'es_ES',
    type: 'website',
  },
}

const painPoints = [
  {
    icon: 'ð©ðª',
    title: 'Clientes alemanes que cuelgan',
    description: 'Alemania es el primer mercado emisor de turistas a EspaÃ±a, con mÃ¡s de 11 millones de visitantes al aÃ±o. Si llaman y nadie les atiende en alemÃ¡n, buscan otra opciÃ³n.',
  },
  {
    icon: 'ð',
    title: 'Oportunidades comerciales perdidas',
    description: 'Empresas germanÃ³fonas de Alemania, Austria y Suiza que contactan con tu negocio y encuentran una barrera lingÃ¼Ã­stica que frena la venta.',
  },
  {
    icon: 'ð£ï¸',
    title: 'Traducciones automaticas que no convencen',
    description: 'Un script traducido al alemÃ¡n no es atenciÃ³n en alemÃ¡n. Los clientes notan la diferencia y la confianza se pierde.',
  },
  {
    icon: 'ð¼',
    title: 'Contratar un nativo es caro',
    description: 'Incorporar un empleado que hable alemÃ¡n nativo a tu plantilla supone un coste fijo elevado que muchas empresas no pueden justificar.',
  },
]

const services = [
  {
    title: 'Atencion telefonica en aleman nativo',
    description: 'Agentes nativos en alemÃ¡n que atienden a tus clientes con fluidez real, no con guiones traducidos.',
  },
  {
    title: 'Soporte multicanal',
    description: 'AtenciÃ³n por telÃ©fono, email y chat en alemÃ¡n. Tus clientes eligen cÃ³mo contactar.',
  },
  {
    title: 'Cobertura 24/7',
    description: 'Cubrimos cualquier franja horaria: maÃ±anas, tardes, noches, fines de semana y festivos.',
  },
  {
    title: 'Gestion de reservas y pedidos',
    description: 'Recibimos llamadas de clientes alemanes, procesamos reservas, consultas y pedidos siguiendo tu protocolo.',
  },
  {
    title: 'Filtrado y clasificacion de llamadas',
    description: 'Clasificamos cada llamada en alemÃ¡n por tipo: venta, soporte, incidencia. Solo te pasamos lo que necesita tu atenciÃ³n.',
  },
  {
    title: 'Integracion con tus herramientas',
    description: 'Trabajamos con tu CRM, PMS o sistema de tickets. Cada interacciÃ³n queda registrada en tu plataforma.',
  },
]

const stats = [
  { value: '24/7', label: 'Cobertura' },
  { value: '100%', label: 'alemÃ¡n nativo' },
  { value: '48h', label: 'ActivaciÃ³n' },
  { value: '0', label: 'Permanencia' },
]

const steps = [
  { step: '01', title: 'Definimos tu protocolo', description: 'Nos cuentas cÃ³mo quieres que atendamos a tus clientes germanÃ³fonos: tono, informaciÃ³n clave, procedimientos y escalado.' },
  { step: '02', title: 'Configuramos el desvio', description: 'DesvÃ­as las llamadas en alemÃ¡n a nuestro equipo. Tus clientes nunca notan que es un servicio externo.' },
  { step: '03', title: 'Atendemos como tu equipo', description: 'Gestionamos cada llamada en alemÃ¡n nativo siguiendo tu protocolo. Recibes un resumen detallado de cada interacciÃ³n.' },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Â¿QuÃ© es un call center en alemÃ¡n?', acceptedAnswer: { '@type': 'Answer', text: 'Es un servicio de atenciÃ³n telefÃ³nica con agentes nativos en alemÃ¡n que atienden a tus clientes como parte de tu equipo. Siguen tu protocolo, usan tus herramientas y representan tu marca.' } },
    { '@type': 'Question', name: 'Â¿Vuestros agentes son alemanes nativos?', acceptedAnswer: { '@type': 'Answer', text: 'SÃ­. Nuestros agentes son hablantes nativos de alemÃ¡n â no usan traducciones ni scripts. Entienden las referencias culturales y el registro que tus clientes esperan.' } },
    { '@type': 'Question', name: 'Â¿Para quÃ© sectores es Ãºtil un contact center en alemÃ¡n?', acceptedAnswer: { '@type': 'Answer', text: 'Turismo y hostelerÃ­a, automociÃ³n, industria, comercio internacional, e-commerce con clientes en Alemania, Austria o Suiza, y logÃ­stica.' } },
    { '@type': 'Question', name: 'Â¿Puedo activar el servicio solo cuando lo necesite?', acceptedAnswer: { '@type': 'Answer', text: 'SÃ­. No hay permanencia ni compromiso de duraciÃ³n. Puedes activar la atenciÃ³n en alemÃ¡n para temporadas altas, campaÃ±as puntuales o de forma continuada â tÃº decides.' } },
    { '@type': 'Question', name: 'Â¿CuÃ¡nto cuesta un call center en alemÃ¡n?', acceptedAnswer: { '@type': 'Answer', text: 'El precio depende del volumen de llamadas y la complejidad del servicio. Contacta con nosotros para un presupuesto personalizado sin compromiso.' } },
    { '@type': 'Question', name: 'Â¿En quÃ© se diferencia Minute Call de otros call centers?', acceptedAnswer: { '@type': 'Answer', text: 'Agentes nativos basados en EspaÃ±a, sin permanencia, protocolo personalizado, integraciÃ³n con tu CRM/PMS y posibilidad de combinar agentes humanos con IA conversacional.' } },
  ],
}

export default function CallCenterAlemanPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section style={{ textAlign: 'center', maxWidth: 860, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(16px,5vw,64px) clamp(40px,6vw,60px)' }}>
        <span className="pill-label" style={{ marginBottom: 20, display: 'inline-block' }}>
          Call center y contact center en aleman
        </span>
        <h1>
          Call center en aleman.<br />Atencion telefonica nativa para tus clientes <span className="serif-italic">alemanes.</span>
        </h1>
        <p style={{ maxWidth: 600, margin: '0 auto 32px' }}>
          Contact center en alemÃ¡n con agentes nativos para empresas espaÃ±olas. Atendemos a tus clientes de Alemania, Austria y Suiza â sin permanencia y con activaciÃ³n en 48 horas.
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
          Por que pierdes clientes alemanes sin un call center en <span className="serif-italic">aleman.</span>
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
          Que incluye nuestro contact center en <span className="serif-italic">aleman.</span>
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
          {steps.map((item) => (à¢·7FW2æÖFVÒÓâ¢ÆFb¶W×¶FVÒç7FWÒ6Æ74æÖSÒ&6&B"7GÆS×·²FFæs¢3"×Óà¢Ç7GÆS×·²föçE6¦S¢CÂföçEvVvC¢SÂ6öÆ÷#¢w&v&ÃÃÃãrÂÖ&vä&÷GFöÓ¢bÂÆWGFW%76æs¢Ó"×Óà¢¶FVÒç7FWÐ¢Â÷à¢Æ27GÆS×·²föçE6¦S¢#"×Óç¶FVÒçFFÆWÓÂö3à¢Ç6Æ74æÖSÒ'6W'f6RÖ6&BÖ&öG#ç¶FVÒæFW67&FöçÓÂ÷à¢ÂöFcà¢Ð¢ÂöFcà¢Â÷6V7Föãà ¢²ò¢6ö×&6öâ¢÷Ð¢Ç6V7Föâ7GÆS×·²ÖvGF¢#ÂÖ&vã¢sWFòrÂFFæs¢v6Æ×CÃgrÃ6Æ×#ÃWgrÃcGrÂFWDÆvã¢v6VçFW"r×Óà¢Ç7â6Æ74æÖSÒ'ÆÂÖÆ&VÂ"7GÆS×·²Ö&vä&÷GFöÓ¢bÂF7Æ¢væÆæRÖ&Æö6²r×ÓäÆFfW&Væ6Â÷7ãà¢Æ"7GÆS×·²Ö&våF÷¢b×Óà¢6öçG&F"VâæFfòg2WFW&æÆ¦"6öâÇ7â6Æ74æÖSÒ'6W&bÖFÆ2#äÖçWFR6ÆÂãÂ÷7ãà¢Âö#à¢ÆFb7GÆS×·²F7Æ¢vw&BrÂw&EFV×ÆFT6öÇVÖç3¢w&WVBWFòÖfBÂÖæÖ3SÂg"rÂv¢#BÂÖ&våF÷¢CÂFWDÆvã¢vÆVgBr×Óà¢ÆFb6Æ74æÖSÒ&6&B"7GÆS×·²FFæs¢3"×Óà¢Æ27GÆS×·²föçE6¦S¢#ÂÖ&vä&÷GFöÓ¢#B×Óä6öçG&F"V×ÆVFòæFfóÂö3à¢ÇVÂ7GÆS×·²Æ7E7GÆS¢væöæRrÂF7Æ¢vfÆWrÂfÆWF&V7Föã¢v6öÇVÖârÂv¢b×Óà¢µ°¢t6÷7FRf¦òVÆWfFò6Æ&ò²52rÀ¢u6öÆò7V'&R÷&&òÆ&÷&ÂrÀ¢u6VæfW&Öò6RfÂ6â6ö&W'GW&rÀ¢u&ö6W6òFR6VÆV66;6âÆ&vòrÀ¢uVâ6öÆòFöÖ÷"V×ÆVFòrÀ¢tFl:Ö6ÂW66Æ"VâFV×÷&FÇFrÀ¢ÒæÖFVÒÓâ¢ÆÆ¶W×¶FV×Ò7GÆS×·²F7Æ¢vfÆWrÂÆväFV×3¢v6VçFW"rÂv¢"ÂföçE6¦S¢RÂ6öÆ÷#¢w&v&ÃÃÃãSbr×Óà¢Ç7â7GÆS×·²6öÆ÷#¢r6SS6S6RrÂföçE6¦S¢b×Óî)ÉSÂ÷7ãâ¶FV×Ð¢ÂöÆà¢Ð¢Â÷VÃà¢ÂöFcà¢ÆFb7GÆS×·²&6¶w&÷VæC¢v&Æ6²rÂ&÷&FW%&FW3¢#BÂFFæs¢3"Â6öÆ÷#¢wvFRr×Óà¢Æ27GÆS×·²föçE6¦S¢#ÂÖ&vä&÷GFöÓ¢#BÂ6öÆ÷#¢wvFRr×ÓæÖçWFR6ÆÃÂö3à¢ÇVÂ7GÆS×·²Æ7E7GÆS¢væöæRrÂF7Æ¢vfÆWrÂfÆWF&V7Föã¢v6öÇVÖârÂv¢b×Óà¢µ°¢t6÷7FRf&&ÆR6V|;¦âföÇVÖVârÀ¢t6ö&W'GW&#BórFöFòVÂ;òrÀ¢tWVò6V×&RF7öæ&ÆRrÀ¢t7Ff6;6âVâC÷&2rÀ¢tÜ;¦ÇFÆW2FöÖ2F7öæ&ÆW2rÀ¢tW66ÆWFöÜ:F6Vâ6÷2rÀ¢ÒæÖFVÒÓâ¢ÆÆ¶W×¶FV×Ò7GÆS×·²F7Æ¢vfÆWrÂÆväFV×3¢v6VçFW"rÂv¢"ÂföçE6¦S¢RÂ6öÆ÷#¢w&v&#SRÃ#SRÃ#SRÃãr×Óà¢Ç7â7GÆS×·²6öÆ÷#¢r3TdcRrÂföçE6¦S¢b×Óî)É3Â÷7ãâ¶FV×Ð¢ÂöÆà¢Ð¢Â÷VÃà¢ÂöFcà¢ÂöFcà¢Â÷6V7Föãà ¢²ò¢d¢÷Ð¢Ç6V7Föâ7GÆS×·²ÖvGF¢#ÂÖ&vã¢sWFòrÂFFæs¢v6Æ×CÃgrÃ6Æ×#ÃWgrÃcGrÂFWDÆvã¢v6VçFW"r×Óà¢Ç7â6Æ74æÖSÒ'ÆÂÖÆ&VÂ"7GÆS×·²Ö&vä&÷GFöÓ¢bÂF7Æ¢væÆæRÖ&Æö6²r×Óå&VwVçF3Â÷7ãà¢Æ"7GÆS×·²Ö&våF÷¢b×ÓädÂö#à¢ÆFb7GÆS×·²Ö&våF÷¢3"ÂF7Æ¢vfÆWrÂfÆWF&V7Föã¢v6öÇVÖârÂv¢ÂFWDÆvã¢vÆVgBr×Óà¢¶f66VÖæÖäVçFGæÖFVÒÓâ¢ÆFWFÇ2¶W×¶FVÒææÖWÒ7GÆS×·²FFæs¢s#GrÂ&÷&FW$&÷GFöÓ¢s6öÆB&v&ÃÃÃãr×Óà¢Ç7VÖÖ'7GÆS×·²föçE6¦S¢ÂföçEvVvC¢SÂ7W'6÷#¢wöçFW"rÂÆ7E7GÆS¢væöæRrÂF7Æ¢vfÆWrÂ§W7Fg6öçFVçC¢w76RÖ&WGvVVârÂÆväFV×3¢v6VçFW"rÂ6öÆ÷#¢v&Æ6²r×Óà¢¶FVÒææÖWÐ¢Ç7â7GÆS×·²föçE6¦S¢#BÂföçEvVvC¢3×Óâ³Â÷7ãà¢Â÷7VÖÖ'à¢Ç7GÆS×·²Ö&våF÷¢b×Óç¶FVÒæ66WFVDç7vW"çFWGÓÂ÷à¢ÂöFWFÇ3à¢Ð¢ÂöFcà¢Â÷6V7Föãà ¢²ò¢5D¢÷Ð¢Ç6V7Föâ7GÆS×·²&6¶w&÷VæC¢v&Æ6²rÂ6öÆ÷#¢wvFRrÂFWDÆvã¢v6VçFW"rÂFFæs¢v6Æ×CÃgrÃ6Æ×#ÃWgrÃcGr×Óà¢Æ"7GÆS×·²6öÆ÷#¢wvFRr×Óà¢FVæFRGW26ÆVçFW2ÆVÖæW26öÖò6RÇ7â6Æ74æÖSÒ'6W&bÖFÆ2#æÖW&V6VâãÂ÷7ãà¢Âö#à¢Ç7GÆS×·²6öÆ÷#¢w&v&#SRÃ#SRÃ#SRÃãbrÂÖvGF¢SÂÖ&vã¢sWFò3'r×Óà¢7FfGR6ÆÂ6VçFW"VâÆVÜ:âVâC÷&2â6âW&ÖæVæ6ÂvVçFW2æFf÷2à¢Â÷à¢Æ&VcÒ"÷&W6W'fÖÆÆÖF"7GÆS×·²F7Æ¢væÆæRÖ&Æö6²rÂ&6¶w&÷VæC¢wvFRrÂ6öÆ÷#¢v&Æ6²rÂFFæs¢wf"ÒÖ'Fâ×FFærrÂ&÷&FW%&FW3¢wf"ÒÖ'FâÖ&÷&FW"×&FW2rÂföçE6¦S¢wf"ÒÖ'FâÖföçB×6¦RrÂföçEvVvC¢SÂFWDFV6÷&Föã¢væöæRr×Óà¢6öÆ6F&W7WVW7Fòw&GVFð¢Âö
