import type { Metadata } from "next";
import Link from "next/link";
import { PersonSchema, ReviewSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Sobre nosotros | minute call",
  description:
    "Minute Call es un call center y contact center 24/7 para PYMES en España, fundado en 2024 por Alberto Castiel. Partners de Teleperformance y Zendesk.",
  alternates: {
    canonical: "/sobre-nosotros",
  },
  openGraph: {
    title: "Sobre nosotros | minute call",
    description:
      "Minute Call es un call center y contact center 24/7 para PYMES en España, fundado en 2024 por Alberto Castiel.",
    type: "website",
    locale: "es_ES",
    url: "https://www.minute-call.com/sobre-nosotros",
  },
};

export default function SobreNosotros() {
  // Organization + founder schema
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.minute-call.com/#organization",
    name: "minute call",
    alternateName: "Minute Call",
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
        jobTitle: "Co-fundador",
        sameAs: ["https://www.linkedin.com/in/alberto-castiel/"],
      },
      {
        "@type": "Person",
        "@id": "https://www.minute-call.com/#beatriz-de-tena",
        name: "Beatriz De Tena",
        jobTitle: "Co-fundadora",
        sameAs: ["https://www.linkedin.com/in/beatrizdetena/"],
      },
    ],
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 10, maxValue: 50 },
    address: { "@type": "PostalAddress", addressCountry: "ES" },
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
    ],
  };

  const stats = [
    { value: "24/7", label: "Cobertura horaria" },
    { value: "5.0", label: "Valoración en Trustpilot" },
    { value: "+50", label: "Ciudades cubiertas en España" },
    { value: "3", label: "Idiomas nativos (ES, EN, FR)" },
  ];

  const rev1Body = "Desde que implementamos Minute Call, hemos recuperado un 30% de leads que antes perdíamos fuera de horario.";
  const rev2Body = "La calidad es indistinguible de tener una recepcionista propia. Nuestros clientes no saben que es externo.";
  const rev3Body = "En temporada de declaraciones el volumen se disparaba y perdíamos clientes. Ahora cada llamada se atiende.";

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
        jobTitle="Co-fundador de minute call"
        description="Co-fundador de Minute Call. Ex General Manager en Leocare (insurtech, 350M€ valoración). Escaló una fintech de 0 a 45M€ como Country Manager en Novum Bank. Ex consultor en Deloitte. Licenciado en ADE y Derecho por la UC3M."
        sameAs={["https://www.linkedin.com/in/alberto-castiel/"]}
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
      <PersonSchema
        id="https://www.minute-call.com/#beatriz-de-tena"
        name="Beatriz De Tena"
        jobTitle="Co-fundadora de minute call"
        description="Co-fundadora de Minute Call. Ex CEO de Walmeric by Globant (NYSE:GLOB). Ex Directora Global de Ventas en Konecta y Telefónica. Más de 15 años de experiencia en BPO y atención al cliente."
        sameAs={["https://www.linkedin.com/in/beatrizdetena/"]}
        knowsAbout={[
          "Operaciones de atención telefónica",
          "Gestión de equipos multinacionales",
          "BPO y externalización",
          "Ventas B2B",
        ]}
      />
      <ReviewSchema authorName="María Monsalve" authorRole="Directora de Clínica" reviewBody={rev1Body} ratingValue={5} />
      <ReviewSchema authorName="Carlos Fernández" authorRole="Responsable de Inmobiliaria" reviewBody={rev2Body} ratingValue={5} />
      <ReviewSchema authorName="Laura Martínez" authorRole="Gerente de Asesoría" reviewBody={rev3Body} ratingValue={5} />

      {/* Badge */}
      <span className="pill-label" style={{ marginBottom: 24, display: "inline-block" }}>
        Sobre nosotros
      </span>

      {/* H1 */}
      <h1 style={{ marginTop: 16, marginBottom: 24 }}>
        Quienes <span className="serif-italic">somos</span>
      </h1>

      {/* Capsule response — first 80 words with entity, type, value prop */}
      <p style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 700, marginBottom: 32 }}>
        <strong>Minute Call</strong> es un call center y contact center 24/7 para PYMES,
        fundado en noviembre de 2024 por{" "}
        <a href="https://www.linkedin.com/in/alberto-castiel/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
          Alberto Castiel
        </a>{" "}
        y{" "}
        <a href="https://www.linkedin.com/in/beatrizdetena/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
          Beatriz De Tena
        </a>.
        Ofrecemos agentes humanos nativos e inteligencia artificial para que ninguna llamada quede
        sin responder. Partners comerciales de Teleperformance y Zendesk.
      </p>

      {/* En cifras — stats block */}
      <section style={{ marginBottom: 64 }}>
        <h2 style={{ fontSize: 22, marginBottom: 24 }}>
          Minute Call en <span className="serif-italic">cifras</span>
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16,
          }}
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
          Que <span className="serif-italic">hacemos</span>
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

      {/* Partners */}
      <section style={{ marginBottom: 64 }}>
        <h2 style={{ fontSize: 22, marginBottom: 16 }}>
          Partners <span className="serif-italic">estrategicos</span>
        </h2>
        <p style={{ lineHeight: 1.8, color: 'rgba(0,0,0,0.75)', maxWidth: 700 }}>
          Minute Call es partner comercial de <strong>Teleperformance</strong> (líder mundial en BPO con
          más de 410.000 empleados) y de <strong>Zendesk</strong> (plataforma líder de atención al cliente).
          Estas alianzas nos permiten ofrecer infraestructura y estándares de calidad de nivel enterprise
          a PYMES.
        </p>
      </section>

      {/* Equipo */}
      <section style={{ marginBottom: 64 }}>
        <h2 style={{ fontSize: 22, marginBottom: 32 }}>
          Nuestro <span className="serif-italic">equipo</span>
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: 24,
          }}
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
                background: "rgba(0,0,0,0.04)",
              }}
            >
              <img
                src="https://framerusercontent.com/images/3EqwlGYnNWfbaSmYW7sjtrJQ.jpg"
                alt="Alberto Castiel, co-fundador de Minute Call"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <h3 style={{ fontSize: 22, marginBottom: 4 }}>Alberto Castiel</h3>
            <p style={{ fontSize: 14, color: 'rgba(0,0,0,0.5)', marginBottom: 12 }}>Co-fundador</p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(0,0,0,0.75)' }}>
              Licenciado en ADE y Derecho por la UC3M (#1 en España para ADE). Ex General Manager
              en Leocare (insurtech valorada en 350M€). Como Country Manager en Novum Bank, escaló
              el mercado francés de 0 a 45M€ de facturación con crecimiento del 70% YoY y multiplicó
              el EBITDA ×8. Ex consultor de Estrategia y Operaciones en Deloitte. También fue Head
              of Global Operations en Naboo (respaldada por Lightspeed).
            </p>
            <a
              href="https://www.linkedin.com/in/alberto-castiel/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                marginTop: 12,
                fontSize: 14,
                color: '#000',
                textDecoration: 'underline',
                textUnderlineOffset: 3,
              }}
            >
              LinkedIn →
            </a>
          </div>

          {/* Beatriz */}
          <div className="card" style={{ padding: 32 }}>
            <div
              style={{
                width: "100%",
                aspectRatio: "1.13",
                borderRadius: 16,
                overflow: "hidden",
                marginBottom: 24,
                background: "rgba(0,0,0,0.04)",
              }}
            >
              <img
                src="https://framerusercontent.com/images/6QCXvNGkCPpl1XOgOz1Op6nosP0.jpeg"
                alt="Beatriz De Tena, co-fundadora de Minute Call"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <h3 style={{ fontSize: 22, marginBottom: 4 }}>Beatriz De Tena</h3>
            <p style={{ fontSize: 14, color: 'rgba(0,0,0,0.5)', marginBottom: 12 }}>Co-fundadora</p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(0,0,0,0.75)' }}>
              Ex CEO de Walmeric by Globant (NYSE:GLOB). Ex Directora Global de Ventas en Konecta
              y Telefónica. Más de 15 años liderando operaciones de atención al cliente y BPO a
              escala multinacional.
            </p>
            <a
              href="https://www.linkedin.com/in/beatrizdetena/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                marginTop: 12,
                fontSize: 14,
                color: '#000',
                textDecoration: 'underline',
                textUnderlineOffset: 3,
              }}
            >
              LinkedIn →
            </a>
          </div>
        </div>
      </section>

      {/* Trayectoria de Alberto */}
      <section style={{ marginBottom: 64 }}>
        <h2 style={{ fontSize: 22, marginBottom: 24 }}>
          Trayectoria del <span className="serif-italic">fundador</span>
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            {
              period: "02/2026 — Actualidad",
              role: "Head of Global Operations",
              company: "Naboo",
              desc: "Plataforma B2B de procurement para eventos corporales, respaldada por más de 90M€ de VCs como Lightspeed (inversores de Anthropic, ElevenLabs).",
            },
            {
              period: "11/2024 — Actualidad",
              role: "Fundador",
              company: "Minute Call",
              desc: "Creó un call center con agentes humanos e IA 24/7 para PYMES. Cerró alianzas comerciales con Teleperformance y Zendesk.",
            },
            {
              period: "03/2022 — 03/2024",
              role: "General Manager España + Head of New Business",
              company: "Leocare",
              desc: "Insurtech B2C valorada en 350M€ en Series B. Lideró el GTM en España, cerró partnership con Generali. Redujo tiempo de respuesta de 7h a 18min con CXM basado en IA. Ascendido a Head of New Business: creció la red de brokers de 4 a 350.",
            },
            {
              period: "01/2019 — 02/2022",
              role: "Country Manager Francia",
              company: "Novum Bank",
              desc: "Fintech de créditos B2C. Escaló el mercado francés de 0 a 45M€/año (+70% YoY). Multiplicó EBITDA ×8, redujo impago un 50%. Gestionó +25 personas.",
            },
            {
              period: "07/2016 — 12/2018",
              role: "Consultor de Estrategia y Operaciones",
              company: "Deloitte",
              desc: "Calificación Above Expectations con excelencia en liderazgo.",
            },
          ].map((exp, i) => (
            <div key={i} className="card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                <div>
                  <h3 style={{ fontSize: 18, marginBottom: 2 }}>{exp.role}</h3>
                  <p style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>{exp.company}</p>
                </div>
                <span style={{ fontSize: 13, color: 'rgba(0,0,0,0.4)', whiteSpace: 'nowrap' }}>{exp.period}</span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(0,0,0,0.65)', margin: 0 }}>{exp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trustpilot */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 22, marginBottom: 16 }}>
          Lo que dicen nuestros <span className="serif-italic">clientes</span>
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { name: "María Monsalve", role: "Directora de Clínica", body: rev1Body },
            { name: "Carlos Fernández", role: "Responsable de Inmobiliaria", body: rev2Body },
            { name: "Laura Martínez", role: "Gerente de Asesoría", body: rev3Body },
          ].map((review, i) => (
            <div key={i} className="card" style={{ padding: 24 }}>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(0,0,0,0.75)', marginBottom: 12, fontStyle: 'italic' }}>
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

      {/* Last updated */}
      <p style={{ fontSize: 12, color: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 24 }}>
        Última actualización: junio 2026
      </p>
    </div>
  );
}
