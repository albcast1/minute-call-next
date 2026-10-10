import Link from "next/link";
import { InternalLinks } from '@/components/InternalLinks';
import { FAQPageSchema, ServiceSchema } from "@/components/JsonLd";
import { Star, Voice, TrustpilotBadge, WaveBars } from "@/components/brand/Brand";
import { LogoMark } from "@/components/brand/Logo";
import HomeEffects from "@/components/brand/HomeEffects";

/* Sectores de la home: 8 para que la rejilla de 4 columnas quede completa.
   El resto de landings de sector siguen enlazadas desde el pie y el sitemap. */
const SECTORS = [
  { name: "Grupos empresariales", href: "/lp/call-center-para-empresas", c: "purple" },
  { name: "Clínicas & Salud", href: "/lp/call-center-clinicas", c: "lime" },
  { name: "Agencias inmobiliarias", href: "/lp/call-center-inmobiliarias", c: "lime" },
  { name: "Comercializadoras de energía", href: "/lp/call-center-energia", c: "purple" },
  { name: "Turismo", href: "/lp/call-center-turismo", c: "ink" },
  { name: "Despachos de abogados", href: "/lp/call-center-abogados", c: "lime" },
  { name: "Clínicas dentales", href: "/lp/call-center-clinicas-dentales", c: "purple" },
  { name: "Asesorías y gestorías", href: "/lp/call-center-asesorias", c: "orange" },
];

/* Cinta negra: mensajes clave de la marca. */
const RIBBON = [
  "Agentes nativos en España",
  "Sin permanencia",
  "Agentes compartidos, sin mínimos",
  "Equipos dedicados de 1 a 5 agentes",
  "Activación en 48 h",
  "Inglés y francés bajo demanda",
  "Integración con tu CRM",
  "Personas o IA",
  "Cualificación de leads",
  "Reserva de citas",
  "Atención 24/7",
];

export default function Home() {
  const faqs = [
    {
      q: "¿Qué es Minute Call?",
      a: "Minute Call es un servicio de atención telefónica externalizada: agentes nativos en España o IA atienden las llamadas en nombre de tu empresa, con tu procedimiento. Estamos especializados en agentes compartidos: un equipo formado en tu procedimiento que atiende tus llamadas sin que pagues puestos completos. Si lo necesitas, también montamos equipos dedicados de 1 a 5 agentes. Cobertura 24/7.",
    },
    {
      q: "¿En qué se diferencia de un gran BPO o de un call center tradicional?",
      a: "Los grandes BPO están pensados para programas de muchos agentes: suelen pedir equipos de unas diez personas y contratos anuales. Minute Call trabaja con agentes compartidos, sin mínimo de puestos, o con equipos dedicados de 1 a 5 agentes; mes a mes y siguiendo tu procedimiento por escenarios. Es la opción cuando el volumen no justifica un programa grande pero cada llamada tiene que atenderse bien.",
    },
    {
      q: "¿Para qué tipo de empresas está pensado el servicio?",
      a: "Para PYMES y grandes empresas cuyo volumen no justifica un equipo propio ni un programa con un gran BPO: grupos empresariales, farmacéuticas, energía, logística, clínicas o despachos. Atendemos líneas concretas, noches y fines de semana, desbordes y campañas.",
    },
    {
      q: "¿Cuál es el mínimo de agentes?",
      a: "No hay mínimo de puestos. Lo habitual es empezar con agentes compartidos, que cubren tu línea sin pagar un puesto completo, y pasar a un equipo dedicado de 1 a 5 agentes si crece el volumen.",
    },
    {
      q: "¿Qué diferencia hay entre agentes dedicados y compartidos?",
      a: "Un agente dedicado atiende solo a tu empresa en el horario acordado. Un equipo compartido está formado en tu procedimiento y atiende también a otras empresas, lo que permite cubrir 24/7 con poco volumen sin pagar turnos completos. Lo habitual es combinar ambos: dedicado en horario laboral y compartido por la noche y el fin de semana.",
    },
    {
      q: "¿Las llamadas las atienden personas o IA?",
      a: "Tú eliges: agentes nativos, agentes de IA o una combinación según el volumen, el horario y el tipo de llamada.",
    },
    {
      q: "¿En qué idiomas se atienden las llamadas?",
      a: "En español, inglés y francés, con agentes nativos en cada idioma.",
    },
    {
      q: "¿Cuánto cuesta el servicio?",
      a: "El precio depende del volumen de llamadas, el horario de cobertura y si los agentes son dedicados o compartidos. Sin mínimo de puestos ni permanencia.",
    },
    {
      q: "¿Hay permanencia o compromiso de duración?",
      a: "No. Minute Call funciona mes a mes, sin contratos a largo plazo ni penalizaciones por cancelación.",
    },
    {
      q: "¿Cuánto se tarda en activar el servicio?",
      a: "Menos de 48 horas para un servicio estándar. Para procedimientos complejos, definimos contigo los escenarios, los escalados y los registros antes de empezar.",
    },
    {
      q: "¿Se integra con nuestro CRM o nuestras herramientas?",
      a: "Sí. Trabajamos en tu CRM, tu sistema de tickets o tu agenda para registrar cada llamada, abrir incidencias y avisar a tu equipo.",
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
          { name: "Call center con agentes compartidos, sin mínimo de puestos", description: "Agentes nativos en España compartidos o en equipos dedicados de 1 a 5 agentes, con cobertura 24/7 y tu procedimiento." },
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
            <span className="tag"><Voice />Call center para PYMES y grandes empresas</span>
            <h1 style={{ marginTop: 28 }}>
              Atención telefónica <Star /> 24/7.
            </h1>
            <p className="sub">
              Atendemos las llamadas de tu empresa con <span className="chip">personas</span> o{" "}
              <span className="chip">asistentes de IA</span> - tú eliges. Desde un solo agente, sin permanencia.
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
            <span className="eyebrow">Somos partners de empresas líderes</span>
            <div className="logos">
              <img src="/assets/partners/teleperformance.png" alt="Teleperformance" width={200} height={49} style={{ height: "clamp(20px, 2.4vw, 26px)" }} />
              <img src="/assets/partners/intelcia.png" alt="Intelcia" width={140} height={36} style={{ height: "clamp(18px, 2.2vw, 24px)" }} />
              <img src="/assets/partners/zendesk.png" alt="Zendesk" width={120} height={24} style={{ height: "clamp(13px, 1.6vw, 17px)" }} />
            </div>
          </div>
        </section>

        {/* ===== QUÉ HACEMOS POR TI ===== */}
        <section className="section" id="servicios">
          <div className="wrap ed">
            <div className="ed-side" />
            <div className="ed-main">
              <h2 className="h2 h2-c">Qué hacemos por ti.</h2>
              <div className="rows">
                {[
                  {
                    title: "Agentes compartidos",
                    desc: "Un equipo formado en tu procedimiento, sin pagar puestos completos. Y equipos dedicados de 1 a 5 agentes si los necesitas.",
                  },
                  {
                    title: "Cobertura 24/7 y desbordes",
                    desc: "Noches, fines de semana, picos y campañas, en español, inglés y francés.",
                  },
                  {
                    title: "Tu procedimiento, al pie de la letra",
                    desc: "Cualificamos, agendamos y escalamos según tus escenarios, dentro de tu CRM.",
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
            <h2 className="h2">Cada llamada perdida es una oportunidad perdida.</h2>
            <div className="bento">
              <div className="bx bx-big">
                <span className="tag dark" style={{ color: "var(--lime)" }}>Harvard Business Review · 2011</span>
                <div>
                  <div className="bx-fig">42&#8239;h</div>
                  <p className="bx-cap">es lo que tarda de media una empresa en responder a un contacto nuevo.</p>
                </div>
              </div>
              <div className="bx bx-soft scard">
                <span className="tag">Harvard Business Review · 2011</span>
                <div><strong>×7</strong><p>más probable cualificar a un cliente si respondes en la primera hora.</p></div>
              </div>
              <div className="bx bx-soft scard">
                <span className="tag">Harvard Business Review · 2011</span>
                <div><strong>23%</strong><p>de las empresas no responde nunca.</p></div>
              </div>
              <div className="bx bx-lime bx-wide scard">
                <span className="tag lime-tag">Lead Response Study · 2007</span>
                <div className="bx-row"><strong>×21</strong><p>más probable cualificar a un cliente si le atiendes en 5 minutos en vez de en 30.</p></div>
              </div>
            </div>
            <p className="res-note">
              Datos medidos con muestra publicada.{" "}
              <Link href="/articulos/estadisticas-llamadas-perdidas-pymes-espana">Ver fuentes →</Link>
            </p>
          </div>
        </section>

        {/* ===== CINTA ===== */}
        <div className="ribbon" aria-label={RIBBON.join(", ")}>
          <div className="ribbon-track" aria-hidden="true">
            {[0, 1].map((k) => (
              <div className="ribbon-set" key={k}>
                {RIBBON.map((t) => (
                  <span className="ribbon-item" key={t}>
                    {t}
                    <LogoMark height={9} />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ===== SECTORES / INDUSTRIAS ===== */}
        <section className="section center" id="sectores">
          <div className="wrap">
            <h2 className="h2">Para PYMES. Y para las que ya no lo son.</h2>
            <div className="sgrid">
              {SECTORS.map((s) => (
                <Link key={s.href} href={s.href} className="sgrid-i">
                  <span>{s.name}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== POR QUÉ NOS ELIGEN ===== */}
        <section className="section" id="diferencia" style={{ paddingTop: 0 }}>
          <div className="wrap ed">
            <div className="ed-side" />
            <div className="ed-main">
              <h2 className="h2 h2-c">Por qué nos eligen.</h2>
              <div className="vs">
                <div className="vs-head">
                  <span>Grandes BPO y call centers</span>
                  <span className="us">
                    <LogoMark height={12} />
                    minute call
                  </span>
                </div>
                {[
                  ["Equipos desde unos diez puestos", "Agentes compartidos, sin mínimo de puestos."],
                  ["Contratos anuales", "Mes a mes, sin permanencia."],
                  ["Agentes deslocalizados", "Agentes nativos basados en España."],
                  ["Guiones genéricos", "Tu procedimiento por escenarios, revisado contigo."],
                  ["Eres una cuenta pequeña", "Trato directo. Partner comercial de Teleperformance."],
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
            <div className="ed-side" />
            <div className="ed-main">
              <h2 className="h2 h2-c">Fundado por quien ha escalado startups de 0 a millones.</h2>
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
          <div className="wrap">
          <div className="dark-panel ed">
            <div className="ed-side" />
            <div className="ed-main">
              <h2 className="h2 h2-c">Cómo funciona.</h2>
              <div className="steps2 steps-dark">
                {[
                  { step: "01", title: "Definición del flujo", desc: "Personalizamos contigo el guión de llamada y acciones del agente." },
                  { step: "02", title: "Llamada entrante", desc: "Respondemos en nombre de tu empresa siguiendo tu procedimiento." },
                  { step: "03", title: "Registro y escalado", desc: "Registramos cada llamada en tu herramienta y avisamos a quien corresponde, al momento." },
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
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="section" id="faq" style={{ paddingTop: 0 }}>
          <div className="wrap ed">
            <div className="ed-side" />
            <div className="ed-main">
              <h2 className="h2 h2-c">FAQ</h2>
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
                <p>Atención telefónica 24/7 para PYMES y grandes empresas, sin mínimo de puestos.</p>
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
