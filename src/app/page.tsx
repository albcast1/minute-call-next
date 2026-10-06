import Link from "next/link";
import { InternalLinks } from '@/components/InternalLinks';
import { FAQPageSchema, ServiceSchema } from "@/components/JsonLd";
import { Star, Voice, TrustpilotBadge, WaveBars } from "@/components/brand/Brand";
import { LogoMark } from "@/components/brand/Logo";
import HomeEffects from "@/components/brand/HomeEffects";
import SectorRail from "@/components/brand/SectorRail";

/* Pasarela de sectores: la lista se pinta dos veces para que el bucle sea continuo. */
const SECTORS = [
  { name: "Clínicas & Salud", href: "/lp/recepcionista-ia-clinicas", c: "lime" },
  { name: "Agencias inmobiliarias", href: "/lp/recepcionista-ia-inmobiliarias", c: "purple" },
  { name: "Hostelería", href: "/lp/recepcionista-ia-restaurantes", c: "ink" },
  { name: "Despachos de abogados", href: "/lp/recepcionista-ia-abogados", c: "lime" },
  { name: "Clínicas dentales", href: "/lp/recepcionista-ia-clinicas-dentales", c: "purple" },
  { name: "Asesorías y gestorías", href: "/lp/recepcionista-ia-asesorias", c: "orange" },
  { name: "Veterinarias", href: "/lp/recepcionista-ia-veterinarias", c: "ink" },
  { name: "Centros de estética", href: "/lp/recepcionista-ia-centros-estetica", c: "lime" },
  { name: "Fisioterapia", href: "/lp/recepcionista-ia-fisioterapia", c: "purple" },
  { name: "Seguros", href: "/lp/recepcionista-ia-seguros", c: "ink" },
  { name: "Turismo", href: "/lp/recepcionista-ia-turismo", c: "lime" },
  { name: "Autoescuelas", href: "/lp/recepcionista-ia-autoescuelas", c: "purple" },
];

export default function Home() {
  const faqs = [
    {
      q: "\u00bfQu\u00e9 es Minute Call?",
      a: "Minute Call es un servicio de atenci\u00f3n telef\u00f3nica para empresas que atiende llamadas en nombre del negocio con recepcionistas nativos o agentes de IA para evitar perder contactos y oportunidades comerciales.",
    },
    {
      q: "\u00bfEn qu\u00e9 se diferencia de un call center tradicional?",
      a: "Un call center tradicional est\u00e1 orientado a grandes vol\u00famenes de llamadas, mientras que Minute Call se centra en la atenci\u00f3n telef\u00f3nica para pymes y empresas de servicios donde cada llamada es relevante.",
    },
    {
      q: "\u00bfLas llamadas las atienden humanos o IA?",
      a: "Las empresas pueden elegir entre recepcionistas nativos, agentes de IA o una combinaci\u00f3n seg\u00fan su volumen de llamadas, horario y tipo de cliente.",
    },
    {
      q: "\u00bfPara qu\u00e9 tipo de empresas est\u00e1 pensado el servicio?",
      a: "Principalmente para pymes, cl\u00ednicas, despachos, inmobiliarias y empresas de servicios que reciben llamadas frecuentes y no pueden permitirse perder oportunidades por no atender el tel\u00e9fono.",
    },
    {
      q: "\u00bfQu\u00e9 ocurre cuando no se atiende una llamada?",
      a: "Cuando una empresa no responde una llamada, es habitual que el cliente potencial no vuelva a llamar. Por eso la atenci\u00f3n telef\u00f3nica continua es clave para la captaci\u00f3n y conversi\u00f3n de clientes.",
    },
    {
      q: "\u00bfCu\u00e1nto cuesta el servicio de recepcionista virtual?",
      a: "El precio de Minute Call se define según el volumen de llamadas, el horario de cobertura y las necesidades de cada empresa. Sin mínimo de tamaño ni permanencia.",
    },
    {
      q: "\u00bfHay permanencia o compromiso de duraci\u00f3n?",
      a: "No. Minute Call funciona mes a mes, sin contratos a largo plazo ni penalizaciones por cancelaci\u00f3n. Puedes activar o desactivar el servicio cuando lo necesites.",
    },
    {
      q: "\u00bfCu\u00e1nto se tarda en activar el servicio?",
      a: "El servicio se activa en menos de 48 horas. Definimos contigo el protocolo de atenci\u00f3n y configuramos todo para que las llamadas se atiendan siguiendo las instrucciones de tu empresa.",
    },
    {
      q: "\u00bfSe integra con mi CRM o agenda?",
      a: "S\u00ed. Minute Call se integra con los principales CRM y herramientas de agenda para agendar citas, registrar leads y enviar notificaciones autom\u00e1ticas a tu equipo.",
    },
    {
      q: "\u00bfEn qu\u00e9 idiomas se atienden las llamadas?",
      a: "Nuestros agentes atienden en espa\u00f1ol, ingl\u00e9s y franc\u00e9s. Todos los recepcionistas son nativos, garantizando una atenci\u00f3n profesional y natural en cada idioma.",
    },
  ]

  return (
    <>
      {/* Schema de la home.
          Los cuatro componentes estaban IMPORTADOS y ninguno se renderizaba: la
          home tenia 10 preguntas frecuentes visibles y cero FAQPage JSON-LD, y
          ningun Service. Es la causa real de que las auditorias GEO marquen la
          FAQ como "sin estructura": el <details>/<summary> esta bien, lo que
          faltaba era el marcado. */}
      <FAQPageSchema faqs={faqs.map((f) => ({ question: f.q, answer: f.a }))} />
      <ServiceSchema
        services={[
          { name: "Recepcionista virtual", description: "Agentes nativos en España atienden las llamadas de tu empresa con tu protocolo y tu nombre." },
          { name: "Toma de mensajes", description: "Recogemos el recado con el contexto que necesitas y te lo hacemos llegar en tiempo real." },
          { name: "Cualificación de leads", description: "Filtramos y cualificamos cada llamada para que tu equipo solo dedique tiempo a lo relevante." },
          { name: "Reserva de citas", description: "Nos integramos con tu calendario y agendamos citas en tu nombre según tu disponibilidad." },
        ]}
      />


      <HomeEffects />
      <div className="home mc-reset">
        {/* ===== HERO ===== */}
        <section className="hero">
          <div className="wrap">
            <span className="tag"><Voice />Call center para PYMES</span>
            <h1 style={{ marginTop: 28 }}>
              Atención telefónica <Star /> 24/7.
            </h1>
            <p className="sub">
              Atendemos las llamadas de tu empresa con <span className="chip">personas</span> o{" "}
              <span className="chip">asistentes de IA</span> - tú eliges. Sin permanencia, diseñado para PYMES.
            </p>
            <div className="hero-actions">
              <Link href="/reserva-llamada" className="btn btn-lime" data-hero-cta>
                Reserva una llamada
              </Link>
            </div>
            <div className="tp-row"><TrustpilotBadge /></div>
          </div>
        </section>

        {/* ===== PARTNERS ===== */}
        <section className="partners" aria-label="Partners">
          <div className="wrap">
            <span className="tag">Somos partners de empresas líderes</span>
            <div className="logos">
              <img src="/assets/partners/teleperformance.png" alt="Teleperformance" width={200} height={49} style={{ height: "clamp(24px, 3vw, 32px)" }} />
              <img src="/assets/partners/intelcia.png" alt="Intelcia" width={140} height={36} style={{ height: "clamp(22px, 2.8vw, 30px)" }} />
              <img src="/assets/partners/zendesk.png" alt="Zendesk" width={120} height={24} style={{ height: "clamp(16px, 2vw, 21px)" }} />
            </div>
          </div>
        </section>

        {/* ===== QUÉ HACEMOS POR TI ===== */}
        <section className="section" id="servicios">
          <div className="wrap ed">
            <div className="ed-side"><span className="tag">Qué hacemos</span></div>
            <div className="ed-main">
              <h2 className="h2 left">Qué hacemos por ti.</h2>
              <div className="rows">
                {[
                  {
                    title: "Toma de mensajes",
                    desc: "Personalizamos el protocolo para que des la mejor atención a tus clientes y no se te escape una oportunidad.",
                  },
                  {
                    title: "Cualificación de leads",
                    desc: "Cualificamos y recopilamos datos clave, para que tu equipo solo dedique tiempo a leads relevantes.",
                  },
                  {
                    title: "Reserva de citas",
                    desc: "Nos integramos en tu CRM y programamos citas en tu nombre, siguiendo tu disponibilidad.",
                  },
                ].map((service) => (
                  <div className="row" key={service.title}>
                    <h3>{service.title}</h3>
                    <p>{service.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== RESULTADOS / CADA LLAMADA PERDIDA ===== */}
        <section id="resultados" className="section center">
          <div className="wrap">
            <span className="tag">Resultados de clientes</span>
            <h2 className="h2" style={{ marginTop: 22 }}>Cada llamada perdida es una oportunidad perdida.</h2>
            <div className="bento">
              <div className="bx bx-big">
                <span className="tag dark" style={{ color: "var(--lime)" }}>Llamadas perdidas</span>
                <div>
                  <div className="bx-fig">40<span className="bs-c">-</span>60%</div>
                  <p className="bx-cap">de las llamadas entrantes que pierde la mayoría de las PYMES.</p>
                </div>
              </div>
              <div className="bx bx-purple scard">
                <span className="tag onp">Tiempo de respuesta</span>
                <div><strong>15&#8239;s</strong><p>Somos rápidos.</p></div>
              </div>
              <div className="bx bx-soft scard">
                <span className="tag">Tasa de respuesta</span>
                <div><strong>98%</strong><p>No pierdas más llamadas.</p></div>
              </div>
              <div className="bx bx-lime bx-wide scard">
                <span className="tag lime-tag">Responder primero gana</span>
                <div className="bx-row"><strong>78%</strong><p>de los leads contratan al negocio que responde primero.</p></div>
              </div>
            </div>
            <p className="res-note">
              <span className="tag">Basados en España</span>
              Somos partners de Teleperformance (nº1 mundial BPO), muestra de nuestros altos estándares y calidad.
            </p>
          </div>
        </section>

        {/* ===== SECTORES / INDUSTRIAS ===== */}
        <section className="section center" id="sectores">
          <div className="wrap">
            <span className="tag">Creados para ser flexibles</span>
            <h2 className="h2" style={{ marginTop: 22 }}>Diseñado para PYMES.</h2>
            <SectorRail sectors={SECTORS} />
          </div>
        </section>

        {/* ===== POR QUÉ NOS ELIGEN ===== */}
        <section className="section" id="diferencia" style={{ paddingTop: 0 }}>
          <div className="wrap ed">
            <div className="ed-side"><span className="tag">La diferencia</span></div>
            <div className="ed-main">
              <h2 className="h2 left">Por qué nos eligen.</h2>
              <div className="vs">
                <div className="vs-head">
                  <span>Otros Call Centers</span>
                  <span className="us">
                    <LogoMark height={12} />
                    minute call
                  </span>
                </div>
                {[
                  ["Agentes basados en LATAM", "Agentes nativos basados en España"],
                  ["Rigidez en la duración", "Sin contratos a largo plazo. Mes a mes."],
                  ["Bajo nivel tech", "Agentes humanos o IA. Tú eliges."],
                  ["Errores frecuentes", "Control de calidad de cada conversación."],
                  ["Falta de profesionalidad", "Partner comercial de Teleperformance."],
                ].map(([them, ours]) => (
                  <div className="vs-row" key={them}>
                    <span className="them"><i aria-hidden="true">✕</i><span>{them}</span></span>
                    <span className="ours"><i aria-hidden="true">✓</i>{ours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== EQUIPO ===== */}
        <section className="section" id="fundador" style={{ paddingTop: 0 }}>
          <div className="wrap ed">
            <div className="ed-side"><span className="tag">Nuestro equipo</span></div>
            <div className="ed-main">
              <h2 className="h2 left">Fundado por quien ha escalado startups de 0 a millones.</h2>
              <div className="founder2">
                <figure className="fframe">
                  <div className="fshot">
                    <img
                      src="/assets/team/alberto-castiel.jpg"
                      alt="Alberto Castiel, fundador de Minute Call"
                      width={720}
                      height={900}
                      loading="lazy"
                    />
                    <i className="fc tl" aria-hidden="true" />
                    <i className="fc tr" aria-hidden="true" />
                    <i className="fc bl" aria-hidden="true" />
                    <i className="fc br" aria-hidden="true" />
                  </div>
                  <figcaption>
                    <span>Minute Call · desde 2024</span>
                    <Star className="fstar" />
                  </figcaption>
                </figure>
                <div className="bio2">
                  <div>
                    <h3>Alberto Castiel</h3>
                    <span className="role">Fundador</span>
                  </div>
                  <p className="bio-short">
                    Head of Global Operations en Naboo, respaldada por Lightspeed. Antes, General Manager de Leocare
                    en España y Country Manager de Novum Bank en Francia, donde escaló el negocio hasta +45M€ de
                    facturación anual. Ex Deloitte.
                  </p>
                  <details className="bio-more" id="bio-more">
                    <summary>Ver trayectoria completa</summary>
                    <p>
                      Fundador de Minute Call y actualmente Head of Global Operations en Naboo, plataforma B2B de
                      gestión de eventos con IA respaldada por más de 90M€ de fondos como Lightspeed (el VC detrás de
                      Anthropic y ElevenLabs). Antes fue General Manager en España de Leocare, insurtech valorada en
                      350M€, donde lideró el rediseño de operaciones con IA y redujo el tiempo medio de respuesta de 7
                      horas a 18 minutos.
                    </p>
                    <p>
                      Como Country Manager en Francia de Novum Bank escaló el mercado francés desde cero hasta +45M€
                      de facturación anual con un crecimiento del 70% interanual, multiplicó el EBITDA ×8 y gestionó un
                      equipo de +30 personas. Ex consultor de Estrategia y Operaciones en Deloitte. Formado en
                      Administración de Empresas y Derecho en la UC3M.
                    </p>
                  </details>
                  <a className="link" href="https://www.linkedin.com/in/albertocastiel/" target="_blank" rel="noopener noreferrer">
                    LinkedIn →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CÓMO FUNCIONA ===== */}
        <section className="section" id="como-funciona" style={{ paddingTop: 0 }}>
          <div className="wrap ed">
            <div className="ed-side"><span className="tag">Cómo funciona</span></div>
            <div className="ed-main">
              <h2 className="h2 left">Cómo funciona.</h2>
              <div className="steps2">
                {[
                  { step: "01", title: "Definición del flujo", desc: "Personalizamos contigo el guión de llamada y acciones del agente." },
                  { step: "02", title: "Llamada entrante", desc: "Respondemos en nombre de tu empresa siguiendo tu procedimiento." },
                  { step: "03", title: "Citas y mensajes", desc: "Agendamos la cita o enviamos el mensaje al instante a tu email." },
                ].map((item) => (
                  <div key={item.step}>
                    <span className="n">{item.step}</span>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="section" id="faq" style={{ paddingTop: 0 }}>
          <div className="wrap ed">
            <div className="ed-side"><span className="tag">Preguntas</span></div>
            <div className="ed-main">
              <h2 className="h2 left">FAQ</h2>
              <div className="faq2">
                {faqs.map((faq) => (
                  <details key={faq.q}>
                    <summary>
                      {faq.q}
                      <span className="pl" aria-hidden="true">+</span>
                    </summary>
                    <p>{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== CTA FINAL ===== */}
        <section id="contacto" className="cta3">
          <div className="wrap cta3-grid">
            <div className="cta3-copy">
              <span className="tag">Activación en menos de 48 h</span>
              <div>
                <h2>No pierdas ninguna llamada más.</h2>
                <p>Servicio premium de secretaría virtual y atención telefónica para PYMES.</p>
              </div>
            </div>
            <div className="call-card">
              <div className="cc-top"><Voice /><span>Llamada entrante</span></div>
              <div className="cc-who">Tu próximo cliente</div>
              <div className="cc-sub">Respondida en 15 s · 24/7</div>
              <WaveBars />
              <Link className="btn btn-white cc-btn" href="/reserva-llamada">Reserva una llamada</Link>
            </div>
          </div>
        </section>
      </div>
      <InternalLinks />
    </>
  );
}
