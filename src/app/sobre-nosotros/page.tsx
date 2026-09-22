import type { Metadata } from "next";
import Link from "next/link";
import { PersonSchema } from "@/components/JsonLd";

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
    { value: "5.0", label: "Valoración en Trustpilot" },
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
    { title: "Agentes nativos en Espana", body: "Quien atiende tus llamadas tiene acento nativo y conoce el contexto local. Muchas operaciones de gran volumen reparten la atención entre varios países." },
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
    ["Valoración", "5.0 en Trustpilot"],
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
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px 80px" }}>
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

      {/* Badge */}
      <span className="pill-label" style={{ marginBottom: 24, display: "inline-block" }}>
        Sobre nosotros
      </span>

      {/* H1 */}
      <h1 style={{ marginTop: 16, marginBottom: 24 }}>
        Quienes <span className="serif-italic">somos</span>
      </h1>

      {/* Capsule response */}
      <p style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 700, marginBottom: 32 }}>
        <strong>Minute Call</strong> es un call center y contact center 24/7 para PYMES,
        fundado en noviembre de 2024 por{" "}
        <a href="https://www.linkedin.com/in/alberto-castiel/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
          Alberto Castiel
        </a>.
        Ofrecemos agentes humanos nativos e inteligencia artificial para que ninguna llamada quede
        sin responder. Partner comercial de Teleperformance y Zendesk.
      </p>      {/* En cifras */}
      <section style={{ marginBottom: 64 }}>
        <h2 style={{ fontSize: 22, marginBottom: 24 }}>
          Minute Call en cifras
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16 }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="card"
              style={{ padding: 24, textAlign: "center" }}
            >
              <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-1px", marginBottom: 4 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 14, color: "rgba(0,0,0,0.6)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Qué hacemos */}
      <section style={{ marginBottom: 64 }}>
        <h2 style={{ fontSize: 22, marginBottom: 16 }}>
          Que hacemos
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 700 }}>
          <p style={{ lineHeight: 1.8, color: 'rgba(0,0,0,0.75)' }}>
            Nuestros agentes trabajan como una extensión de tu equipo. Seguimos tus instrucciones,
            tu tono y tus flujos de trabajo: cualificamos llamadas, tomamos mensajes, programamos
            citas y escalamos los casos urgentes cuando es necesario.
          </p>
          <p style={{ lineHeight: 1.8, color: 'rgba(0,0,0,0.75)' }}>
            Diseñado para clínicas, despachos de abogados, inmobiliarias, asesorías, veterinarias
            y cualquier PYME que no puede permitirse perder llamadas fuera de horario o durante los
            picos de actividad.
          </p>
        </div>

        {/* Servicios (H3 por servicio) */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 24 }}>
            {services.map((s) => (
              <div key={s.title} className="card" style={{ padding: 24 }}>
                <h3 style={{ fontSize: 18, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(0,0,0,0.75)", margin: 0 }}>{s.body}</p>
              </div>
            ))}
          </div>

        {/* Internal links to services */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
          <Link href="/lp" style={{ display: 'inline-block', padding: '8px 20px', border: '1px solid #000', borderRadius: 999, fontSize: 14, color: '#000', textDecoration: 'none', fontWeight: 500 }}>
            Sectores →
          </Link>
          <Link href="/atencion-telefonica" style={{ display: 'inline-block', padding: '8px 20px', border: '1px solid #000', borderRadius: 999, fontSize: 14, color: '#000', textDecoration: 'none', fontWeight: 500 }}>
            Ciudades →
          </Link>
          <Link href="/comparar" style={{ display: 'inline-block', padding: '8px 20px', border: '1px solid #000', borderRadius: 999, fontSize: 14, color: '#000', textDecoration: 'none', fontWeight: 500 }}>
            Comparar alternativas →
          </Link>
          <Link href="/articulos" style={{ display: 'inline-block', padding: '8px 20px', border: '1px solid #000', borderRadius: 999, fontSize: 14, color: '#000', textDecoration: 'none', fontWeight: 500 }}>
            Blog →
          </Link>
        </div>
      </section>

      {/* Diferenciadores */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 22, marginBottom: 24 }}>Que diferencia a Minute Call</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 700 }}>
            {differentiators.map((d) => (
              <div key={d.title}>
                <h3 style={{ fontSize: 18, marginBottom: 6 }}>{d.title}</h3>
                <p style={{ lineHeight: 1.8, color: "rgba(0,0,0,0.75)", margin: 0 }}>{d.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Para quien es */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 22, marginBottom: 16 }}>Para quien es Minute Call</h2>
          <ul style={{ lineHeight: 1.9, color: "rgba(0,0,0,0.75)", maxWidth: 700, paddingLeft: 20, margin: 0 }}>
            {icp.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

      {/* Partners */}
      <section style={{ marginBottom: 64 }}>
        <h2 style={{ fontSize: 22, marginBottom: 16 }}>
          Partners estrategicos
        </h2>
        <p style={{ lineHeight: 1.8, color: 'rgba(0,0,0,0.75)', maxWidth: 700 }}>
          Minute Call es partner comercial de <strong>Teleperformance</strong> (uno de los mayores BPO del mundo con
          más de 410.000 empleados) y de <strong>Zendesk</strong> (plataforma líder de atención al cliente).
          Estas alianzas nos permiten ofrecer infraestructura y estándares de calidad de nivel enterprise
          a PYMES.
        </p>
      </section>

      {/* Equipo */}
      <section style={{ marginBottom: 64 }}>
        <h2 style={{ fontSize: 22, marginBottom: 32 }}>
          Nuestro equipo
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 420px)",
            gap: 24 }}
        >
          {/* Alberto */}
          <div className="card" style={{ padding: 32 }}>
            <div
              style={{
                width: "100%",
                aspectRatio: "1.13",
                borderRadius: 16,
                overflow: "hidden",
                marginBottom: 24,
                background: "rgba(0,0,0,0.04)" }}
            >
              <img
                src="https://framerusercontent.com/images/3EqwlGYnNWfbaSmYW7sjtrJQ.jpg"
                alt="Alberto Castiel, fundador de Minute Call"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <h3 style={{ fontSize: 22, marginBottom: 4 }}>Alberto Castiel</h3>
            <p style={{ fontSize: 14, color: 'rgba(0,0,0,0.5)', marginBottom: 12 }}>Fundador</p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(0,0,0,0.75)' }}>
              Ex General Manager en Leocare (insurtech valorada en 350M€). Como Country Manager
              en Novum Bank, escaló el mercado francés de 0 a 45M€ de facturación con crecimiento
              del 70% YoY y multiplicó el EBITDA ×8. Ex consultor de Estrategia y Operaciones en
              Deloitte. También fue Head of Global Operations en Naboo, respaldada por Lightspeed
              (el VC detrás de Anthropic y ElevenLabs).
            </p>
            <a
              href="https://www.linkedin.com/in/alberto-castiel/"
              target="_blank"              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                marginTop: 12,
                fontSize: 14,
                color: '#000',
                textDecoration: 'underline',
                textUnderlineOffset: 3 }}
            >
              LinkedIn →
            </a>
          </div>
        </div>
      </section>

      {/* Como funciona */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 22, marginBottom: 16 }}>Como funciona Minute Call</h2>
          <ol style={{ lineHeight: 1.9, color: "rgba(0,0,0,0.75)", maxWidth: 700, paddingLeft: 20, margin: 0 }}>
            {howItWorks.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        {/* Datos clave */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 22, marginBottom: 16 }}>Datos clave de Minute Call</h2>
          <dl className="card" style={{ padding: 24, margin: 0, display: "grid", gridTemplateColumns: "minmax(120px, 190px) 1fr", columnGap: 24, rowGap: 12, fontSize: 15, lineHeight: 1.6 }}>
            {keyFacts.map(([k, v]) => (
              <div key={k} style={{ display: "contents" }}>
                <dt style={{ fontWeight: 600 }}>{k}</dt>
                <dd style={{ margin: 0, color: "rgba(0,0,0,0.75)" }}>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

      {/* Trustpilot */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 22, marginBottom: 16 }}>
          Lo que dicen nuestros clientes
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { name: "María Monsalve", role: "Directora de Clínica", body: rev1Body },
            { name: "Carlos Fernández", role: "Responsable de Inmobiliaria", body: rev2Body },
            { name: "Laura Martínez", role: "Gerente de Asesoría", body: rev3Body },
          ].map((review, i) => (
            <div key={i} className="card" style={{ padding: 24 }}>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(0,0,0,0.75)', marginBottom: 12 }}>
                &ldquo;{review.body}&rdquo;
              </p>
              <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>
                {review.name} <span style={{ fontWeight: 400, color: 'rgba(0,0,0,0.5)' }}>· {review.role}</span>
              </p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.4)', marginTop: 12 }}>
          <a
            href="https://es.trustpilot.com/review/minute-call.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'rgba(0,0,0,0.4)', textDecoration: 'underline' }}
          >
            Ver todas las opiniones en Trustpilot →
          </a>
        </p>
      </section>

      {/* Preguntas frecuentes */}
        <section style={{ marginBottom: 48 }}>
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
          <h2 style={{ fontSize: 22, marginBottom: 24 }}>Preguntas frecuentes</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 700 }}>
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 style={{ fontSize: 18, marginBottom: 6 }}>{f.q}</h3>
                <p style={{ lineHeight: 1.8, color: "rgba(0,0,0,0.75)", margin: 0 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

      {/* Last updated */}
      <p style={{ fontSize: 12, color: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 24 }}>
        Última actualización: septiembre 2026
      </p>
    </div>
  );
}
