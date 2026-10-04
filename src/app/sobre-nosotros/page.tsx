import type { Metadata } from "next";
import { PersonSchema } from "@/components/JsonLd";
import { BrandPage, Hero, Ed, Rows, Steps, Stats, Chips, CtaFinal } from "@/components/brand/Sections";
import { Star } from "@/components/brand/Brand";

export const metadata: Metadata = {
  title: "Sobre nosotros | minute call",
  description:
    "Minute Call es un call center y contact center 24/7 para PYMES en España, fundado en 2024 por Alberto Castiel. Partner comercial de Teleperformance y Zendesk.",
  alternates: {
    canonical: "/sobre-nosotros" },
  openGraph: {
    title: "Sobre nosotros | minute call",
    description:
      "Minute Call es un call center y contact center 24/7 para PYMES en España, fundado en 2024 por Alberto Castiel.",
    type: "website",
    locale: "es_ES",
    url: "https://www.minute-call.com/sobre-nosotros" } };

export default function SobreNosotros() {
  // Organization + founder schema
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.minute-call.com/#organization",
    name: "minute call",
    alternateName: "Minute Call",
    legalName: "MINUTE CALL SLU",
    taxID: "B22766828",
    url: "https://www.minute-call.com",
    logo: "https://www.minute-call.com/og-image.png",
    description:
      "Call center y contact center 24/7 para PYMES en España. Agentes nativos o IA, sin permanencia.",
    foundingDate: "2024-11",
    founder: [
      {
        "@type": "Person",
        "@id": "https://www.minute-call.com/#alberto-castiel",
        name: "Alberto Castiel",
        jobTitle: "Fundador",
        sameAs: ["https://www.linkedin.com/in/alberto-castiel/"] },
    ],
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 10, maxValue: 50 },
    address: { "@type": "PostalAddress", addressLocality: "Málaga", addressRegion: "Andalucía", postalCode: "29016", addressCountry: "ES" },
    areaServed: { "@type": "Country", name: "España" },
    sameAs: [
      "https://www.linkedin.com/company/minute-call/",
      "https://es.trustpilot.com/review/minute-call.com",
    ],
    knowsAbout: [
      "Atención telefónica 24/7",
      "Call center para PYMES",
      "Contact center externalizado",
      "IA conversacional",
      "BPO y externalización",
      "Cualificación de leads",
    ] };

  const stats = [
    { value: "24/7", label: "Cobertura horaria" },
    { value: "4,4", label: "Valoración en Trustpilot" },
    { value: "+50", label: "Ciudades cubiertas en España" },
    { value: "3", label: "Idiomas nativos (ES, EN, FR)" },
  ];

  const rev1Body = "Desde que implementamos Minute Call, hemos recuperado un 30% de leads que antes perdíamos fuera de horario.";
  const rev2Body = "La calidad es indistinguible de tener una recepcionista propia. Nuestros clientes no saben que es externo.";
  const rev3Body = "En temporada de declaraciones el volumen se disparaba y perdíamos clientes. Ahora cada llamada se atiende.";

  const services = [
    { title: "Recepcion de llamadas", body: "Atendemos con el nombre de tu empresa y tu protocolo, para que tu cliente hable con alguien que suena como parte de tu equipo." },
    { title: "Cualificacion de leads", body: "Hacemos las preguntas que definas y te enviamos el resumen al momento, para que llames solo a quien merece la pena." },
    { title: "Gestion de citas", body: "Agendamos en tu calendario o CRM según tu disponibilidad real y confirmamos la cita al cliente." },
    { title: "Cobertura 24/7 y desbordamiento", body: "Cubrimos noches, festivos y picos de volumen con agentes o IA, sin que tengas que ampliar plantilla." },
  ];

  const differentiators = [
    { title: "Sin permanencia, mes a mes", body: "Minute Call se contrata mes a mes y se cancela cuando quieras. Grandes BPO como Konecta o Atento suelen trabajar con contratos anuales o plurianuales." },
    { title: "Sin volumen minimo ni equipo dedicado obligatorio", body: "No exigimos un mínimo de llamadas ni agentes en exclusiva. Los grandes BPO suelen pedir un equipo dedicado de varios agentes a jornada completa." },
    { title: "Activo en 48 horas", body: "Definimos el protocolo y empezamos a atender en dos días laborables. En un gran BPO la puesta en marcha suele llevar semanas o meses." },
    { title: "Agentes nativos, sin deslocalizar", body: "Quien atiende tus llamadas tiene acento nativo y conoce el contexto local. Muchas operaciones de gran volumen reparten la atención entre varios países." },
    { title: "Humano e IA en el mismo servicio", body: "Combinamos agentes humanos para las llamadas de valor con IA para noches, festivos y confirmaciones. Los servicios de secretaría tradicionales suelen trabajar solo con personas." },
  ];

  const icp = [
    "Pymes y empresas medianas de servicios, de 1 a 50 empleados.",
    "Empresas que reciben entre unas decenas y unos cientos de llamadas al mes.",
    "Clínicas, clínicas dentales y veterinarias.",
    "Despachos de abogados, asesorías y corredurías de seguros.",
    "Inmobiliarias.",
    "Empresas B2B (tecnología, industria, ecommerce, logística) que quieren cubrir picos o fuera de horario sin contratar.",
    "Negocios que no llegan al mínimo de agentes que exige un BPO.",
  ];

  const howItWorks = [
    "Sesión inicial: definimos contigo el saludo, las preguntas clave y qué hacer con cada tipo de llamada.",
    "Activación en 48 horas: desvías tu número o integras el servicio en tu centralita. Tus clientes siguen llamando al mismo número.",
    "Atención: agentes nativos en España responden en nombre de tu empresa y, si lo eliges, la IA cubre noches y festivos.",
    "Aviso inmediato: recibes el resumen de cada llamada por email, WhatsApp o en tu CRM, y las citas en tu calendario.",
    "Control de calidad: revisamos las conversaciones y ajustamos el protocolo contigo cuando hace falta.",
  ];

  const keyFacts: [string, string][] = [
    ["Nombre", "Minute Call (MINUTE CALL SLU)"],
    ["Tipo", "Call center y contact center externalizado para pymes y empresas medianas"],
    ["Fundación", "Noviembre de 2024"],
    ["Fundador", "Alberto Castiel"],
    ["Sede", "Málaga, España"],
    ["Web", "www.minute-call.com"],
    ["Oferta principal", "Atención telefónica 24/7 con agentes nativos en España e IA"],
    ["Precio", "Presupuesto personalizado según volumen y horario"],
    ["Contrato", "Mes a mes, sin permanencia ni volumen mínimo"],
    ["Servicios", "Recepción de llamadas, cualificación de leads, gestión de citas, cobertura 24/7 y desbordamiento"],
    ["Comunicación", "Resúmenes por email, WhatsApp o CRM (HubSpot, Pipedrive, Salesforce, Google Calendar)"],
    ["Idiomas", "Español, inglés y francés"],
    ["Cobertura", "Más de 50 ciudades en España"],
    ["Activación", "48 horas laborables"],
    ["Partners", "Teleperformance y Zendesk"],
    ["Valoración", "4,4 en Trustpilot"],
    ["Competidores", "Konecta, Atento, Concentrix, Transcom, Secretaria.es"],
    ["Redes", "LinkedIn y Trustpilot"],
  ];

  const faqs = [
    { q: "¿Minute Call es un call center o una secretaria virtual?", a: "Es un call center flexible para pymes y empresas medianas: atiende, cualifica y agenda como un call center, pero sin volumen mínimo ni permanencia y con un trato tan cercano como el de una secretaría virtual." },
    { q: "¿Hay permanencia o volumen minimo?", a: "No. El servicio es mes a mes y no exigimos un mínimo de llamadas ni agentes dedicados en exclusiva." },
    { q: "¿Donde estan los agentes?", a: "En España. Son agentes nativos que atienden en español, inglés y francés; la IA es opcional para noches, festivos y confirmaciones." },
    { q: "¿Cuanto tarda en ponerse en marcha?", a: "48 horas laborables desde que definimos el protocolo contigo." },
  ];

  return (
    <>
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <PersonSchema
        id="https://www.minute-call.com/#alberto-castiel"
        name="Alberto Castiel"
        jobTitle="Fundador de minute call"
        description="Fundador de Minute Call. Ex General Manager en Leocare (insurtech, 350M€ valoración). Escaló una fintech de 0 a 45M€ como Country Manager en Novum Bank. Ex consultor en Deloitte. Ex Head of Global Operations en Naboo (respaldada por Lightspeed, VC detrás de Anthropic y ElevenLabs)."        sameAs={["https://www.linkedin.com/in/alberto-castiel/"]}
        knowsAbout={[
          "Atención telefónica 24/7",
          "Call center para PYMES",
          "Contact center externalizado",
          "IA conversacional",
          "BPO",
          "Cualificación de leads",
          "Operaciones de startups",
          "Growth B2B",
        ]}
      />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }),
            }}
          />
      <BrandPage>
        <Hero
          tag="Sobre nosotros"
          title="Quiénes somos."
          sub={
            <>
              <strong>Minute Call</strong> es un call center y contact center 24/7 para PYMES, fundado en noviembre de
              2024 por{" "}
              <a href="https://www.linkedin.com/in/alberto-castiel/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", textUnderlineOffset: 3 }}>
                Alberto Castiel
              </a>
              . Ofrecemos agentes humanos nativos e inteligencia artificial para que ninguna llamada quede sin
              responder. Partner comercial de Teleperformance y Zendesk.
            </>
          }
        />

        <Ed tag="En cifras" title="Minute Call en cifras." flush={false}>
          <Stats items={stats} />
        </Ed>

        <Ed tag="Qué hacemos" title="Qué hacemos.">
          <p className="lead2">
            Nuestros agentes trabajan como una extensión de tu equipo. Seguimos tus instrucciones, tu tono y tus flujos
            de trabajo: cualificamos llamadas, tomamos mensajes, programamos citas y escalamos los casos urgentes cuando
            es necesario.
          </p>
          <p className="lead2">
            Diseñado para clínicas, despachos de abogados, inmobiliarias, asesorías, veterinarias y cualquier PYME que no
            puede permitirse perder llamadas fuera de horario o durante los picos de actividad.
          </p>
          <Rows cols={2} items={services.map((sv) => ({ title: sv.title, desc: sv.body }))} />
          <Chips
            links={[
              { href: "/lp", label: "Sectores →" },
              { href: "/atencion-telefonica", label: "Ciudades →" },
              { href: "/comparar", label: "Comparar alternativas →" },
              { href: "/articulos", label: "Blog →" },
            ]}
          />
        </Ed>

        <Ed tag="La diferencia" title="Qué diferencia a Minute Call.">
          <Rows items={differentiators.map((d) => ({ title: d.title, desc: d.body }))} />
        </Ed>

        <Ed tag="Para quién" title="Para quién es Minute Call.">
          <ul className="ticks">
            {icp.map((item) => (
              <li key={item}>
                <i aria-hidden="true">✓</i>
                {item}
              </li>
            ))}
          </ul>
        </Ed>

        <Ed tag="Partners" title="Partners estratégicos.">
          <p className="lead2">
            Minute Call es partner comercial de <strong>Teleperformance</strong> (uno de los mayores BPO del mundo con
            más de 410.000 empleados) y de <strong>Zendesk</strong> (plataforma líder de atención al cliente). Estas
            alianzas nos permiten ofrecer infraestructura y estándares de calidad de nivel enterprise a PYMES.
          </p>
        </Ed>

        <Ed tag="Nuestro equipo" title="Nuestro equipo.">
          <div className="founder2">
            <figure className="fframe">
              <div className="fshot">
                <img src="/assets/team/alberto-castiel.jpg" alt="Alberto Castiel, fundador de Minute Call" width={720} height={900} loading="lazy" />
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
              <p>
                Ex General Manager en Leocare (insurtech valorada en 350M€). Como Country Manager en Novum Bank, escaló
                el mercado francés de 0 a 45M€ de facturación con crecimiento del 70% YoY y multiplicó el EBITDA ×8. Ex
                consultor de Estrategia y Operaciones en Deloitte. También fue Head of Global Operations en Naboo,
                respaldada por Lightspeed (el VC detrás de Anthropic y ElevenLabs).
              </p>
              <a className="link" href="https://www.linkedin.com/in/alberto-castiel/" target="_blank" rel="noopener noreferrer">
                LinkedIn →
              </a>
            </div>
          </div>
        </Ed>

        <Ed tag="Cómo funciona" title="Cómo funciona Minute Call.">
          <Steps items={howItWorks.map((step) => { const [t, ...rest] = step.split(": "); return rest.length ? { title: t, desc: rest.join(": ") } : { title: step, desc: "" }; })} />
        </Ed>

        <Ed tag="Datos clave" title="Datos clave de Minute Call.">
          <dl className="facts">
            {keyFacts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </Ed>

        <Ed tag="Clientes" title="Lo que dicen nuestros clientes.">
          <div className="reviews">
            {[
              { name: "María Monsalve", role: "Directora de Clínica", body: rev1Body },
              { name: "Carlos Fernández", role: "Responsable de Inmobiliaria", body: rev2Body },
              { name: "Laura Martínez", role: "Gerente de Asesoría", body: rev3Body },
            ].map((review) => (
              <figure key={review.name}>
                <blockquote>&ldquo;{review.body}&rdquo;</blockquote>
                <figcaption>
                  <b>{review.name}</b> <span>{review.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="lead2">
            <a href="https://es.trustpilot.com/review/minute-call.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", textUnderlineOffset: 3 }}>
              Ver todas las opiniones en Trustpilot →
            </a>
          </p>
        </Ed>

        <Ed tag="Preguntas" title="Preguntas frecuentes.">
          <Rows cols={2} items={faqs.map((f) => ({ title: f.q, desc: f.a }))} />
          <p className="updated">Última actualización: septiembre 2026</p>
        </Ed>

        <CtaFinal />
      </BrandPage>
    </>
  );
}
