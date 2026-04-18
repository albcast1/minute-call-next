import type { Metadata } from "next";
import { PersonSchema, ReviewSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Quiénes somos | minute call",
  description:
    "Minute Call es un servicio premium de secretaría virtual y atención telefónica 24/7 con agentes humanos profesionales",
  alternates: {
    canonical: "/sobre-nosotros",
  },
};

export default function SobreNosotros() {
    const albertoDesc = "Co-fundador de minute call. Ex General Manager en Leocare. Experto en call center, BPO e IA.";
  const albertoKnows = ["Atencion telefonica 24/7","Call center para PYMES","Recepcionistas virtuales","IA conversacional","BPO","Leads"];
  const rev1Body = "Desde que implementamos Minute Call, hemos recuperado un 30% de leads que antes perdiamos fuera de horario.";
  const rev2Body = "La calidad es indistinguible de tener una recepcionista propia. Nuestros clientes no saben que es externo.";
  const rev3Body = "En temporada de declaraciones el volumen se disparaba y perdiamos clientes. Ahora cada llamada se atiende.";

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px 80px" }}>
      <PersonSchema
        id="https://www.minute-call.com/#alberto-castiel"
        name="Alberto Castiel"
        jobTitle="Co-fundador de minute call"
        description={albertoDesc}
        sameAs={["https://www.linkedin.com/in/alberto-castiel/"]}
        knowsAbout={["Atencion telefonica 24/7","Call center para PYMES","Recepcionistas virtuales","IA conversacional","BPO","Cualificacion de leads","Operaciones de startups"]}
      />
      <ReviewSchema
        authorName="Maria Monsalve"
        authorRole="Directora de Clinica"
        reviewBody={rev1Body}
        ratingValue={5}
      />
      <ReviewSchema
        authorName="Carlos Fernandez"
        authorRole="Responsable de Inmobiliaria"
        reviewBody={rev2Body}
        ratingValue={5}
      />
      <ReviewSchema
        authorName="Laura Martinez"
        authorRole="Gerente de Asesoria"
        reviewBody={rev3Body}
        ratingValue={5}
      />
      <PersonSchema
        id="https://www.minute-call.com/#beatriz-hernandez"
        name="Beatriz Hernández"
        jobTitle="Co-fundadora de minute call"
        description="Co-fundadora de minute call. Especialista en operaciones de atención telefónica y gestión de equipos multilingües."
        knowsAbout={[
          "Operaciones de atención telefónica",
          "Gestión de equipos multilingües",
          "Procesos de cualificación",
        ]}
      />
      {/* Badge */}
      <span className="pill-label" style={{ marginBottom: 24, display: "inline-block" }}>
        Sobre nosotros
      </span>

      {/* Heading */}
      <h1 style={{ marginTop: 16 }}>
        Quienes <span className="serif-italic">somos</span>
      </h1>
          {/* Trustpilot social proof */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '24px 0', flexWrap: 'wrap' }}>
            <a
              href="https://www.trustpilot.com/review/minute-call.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', background: '#fff', border: '1px solid #e5e5e5', borderRadius: 8, padding: '10px 16px' }}
            >
              <span style={{ color: '#00b67a', fontSize: 20, letterSpacing: -1 }}>&#9733;&#9733;&#9733;&#9733;&#9734;</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#333' }}>4.4 de 5 en Trustpilot</div>
                <div style={{ fontSize: 12, color: '#888' }}>12 opiniones verificadas</div>
              </div>
            </a>
            <div style={{ fontSize: 13, color: '#666' }}>
              Partners de <strong>Teleperformance</strong> &middot; Fundada en 2023 &middot; Madrid, Espana
            </div>
          </div>

      {/* Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 32 }}>
        <p style={{ maxWidth: 700 }}>
          Minute Call es un servicio premium de secretaría virtual y atención
          telefónica 24/7, con agentes humanos profesionales en inglés,
          español y francés. Ayudamos a las pequeñas y medianas empresas a
          garantizar que se responda a todas las llamadas, se capture cada
          oportunidad de venta y se gestione cada solicitud urgente.
        </p>

        <p style={{ maxWidth: 700 }}>
          Nuestros agentes de recepción trabajan como una extensión de su
          equipo. Seguimos sus instrucciones, su tono y sus flujos de trabajo:
          calificamos a las personas que llaman, tomamos mensajes, programamos
          citas y escalamos los casos urgentes cuando es necesario.
        </p>

        <p style={{ maxWidth: 700 }}>
          No somos un centro de llamadas ni un chatbot con IA. Nos centramos
          en ofrecer una gestión de llamadas fiable y de alta calidad con
          criterio humano, empatía y coherencia, especialmente para equipos
          que no pueden permitirse perder llamadas fuera del horario laboral o
          durante los periodos de mayor actividad.
        </p>

        <p style={{ maxWidth: 700 }}>
          Minute Call está diseñado para pymes, equipos globales y empresas de
          servicios modernas que valoran la profesionalidad, la comunicación
          clara y una cobertura fiable las 24 horas del día, los 7 días de la
          semana.
        </p>
      </div>

      {/* Team Section */}
      <section style={{ marginTop: 80 }}>
        <h2>
          Nuestro <span className="serif-italic">equipo</span>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: 24,
            marginTop: 48,
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
                alt="Alberto Castiel"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <h3 style={{ fontSize: 22 }}>Alberto Castiel</h3>
            <p className="service-card-body">
              Ex General Manager en Leocare (130M€ en Series B). Lideró el
              crecimiento de una fintech de 0 a 45M€ con +30 agentes.
            </p>
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
                alt="Beatriz De Tena"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <h3 style={{ fontSize: 22 }}>Beatriz De Tena</h3>
            <p className="service-card-body">
              Ex CEO en Walmeric by Globant (NYSE:GLOB). También fue Directora
              Global de Ventas en Konecta y Telefónica.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section style={{ marginTop: 80 }}>
        <h2>
          Experiencia del <span className="serif-italic">Fundador</span>
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 32 }}>
          <div className="card" style={{ padding: 32 }}>
            <h3 style={{ fontSize: 20, marginBottom: 8 }}>Leocare</h3>
            <p className="service-card-body">
              General Manager de una startup insurtech que levantó 130M€ en Series B.
              Alberto lideró el crecimiento de 0 a 45M€ de facturación con más de 30 agentes.
            </p>
          </div>
          <div className="card" style={{ padding: 32 }}>
            <h3 style={{ fontSize: 20, marginBottom: 8 }}>Novum Bank</h3>
            <p className="service-card-body">
              Country Manager en un banco online, pasando de 0 a 45M€ de facturación
              en sólo 4 años.
            </p>
          </div>
          <div className="card" style={{ padding: 32 }}>
            <h3 style={{ fontSize: 20, marginBottom: 8 }}>Deloitte</h3>
            <p className="service-card-body">
              Consultor de Estrategia &amp; Operaciones.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
