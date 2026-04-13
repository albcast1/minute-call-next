import Link from "next/link";
import { FAQPageSchema, LocalBusinessSchema, HowToSchema, ServiceSchema } from "@/components/JsonLd";
import VideoCard from "@/components/VideoCard";

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
      a: "Los planes de Minute Call empiezan desde 250\u20ac/mes para peque\u00f1as PYMES. El precio var\u00eda seg\u00fan el volumen de llamadas, horario y tipo de agente (humano o IA). Sin permanencia ni costes ocultos.",
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
      <FAQPageSchema faqs={faqs.map(f => ({ question: f.q, answer: f.a }))} />
      <LocalBusinessSchema />
      <HowToSchema steps={[
        { name: "Definici\u00f3n del flujo", text: "Personalizamos contigo el gui\u00f3n de llamada y acciones del agente." },
        { name: "Llamada entrante", text: "Respondemos en nombre de tu empresa siguiendo tu procedimiento." },
        { name: "Citas y mensajes", text: "Agendamos la cita o enviamos el mensaje al instante a tu email." },
      ]} />
      <ServiceSchema services={[
        { name: "Toma de mensajes", description: "Recepci\u00f3n de llamadas con protocolo personalizado para cada empresa." },
        { name: "Cualificaci\u00f3n de leads", description: "Cualificamos y recopilamos datos clave para que tu equipo se centre en leads relevantes." },
        { name: "Reserva de citas", description: "Integraci\u00f3n con CRM y agenda para programar citas en nombre de tu empresa." },
      ]} />

      {/* ===== HERO SECTION ===== */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(40px, 8vw, 80px) clamp(20px, 5vw, 64px) clamp(30px, 6vw, 60px)",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 60,
          flexWrap: "wrap",
        }}
      >
        {/* Left column */}
        <div style={{ flex: "1 1 480px", maxWidth: 560 }}>
          {/* Trustpilot badge */}
          <a
            href="https://www.trustpilot.com/review/minute-call.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-block", marginBottom: 20, marginLeft: 16 }}
          >
            <img
              src="https://framerusercontent.com/images/2kfdzrRIvwdbWAtc0ABXMgtFH2E.png"
              alt="Trustpilot reviews"
              style={{ height: 36 }}
            />
          </a>

          {/* Pill label */}
          <div style={{ marginBottom: 24 }}>
            <span className="pill-label">Recepción de llamadas para PYMES</span>
          </div>

          {/* Main heading */}
          <h1 style={{ marginTop: 24 }}>
            Atención telefónica <span className="serif-italic">24/7.</span>
          </h1>

          {/* Subtext */}
          <p style={{ maxWidth: 500, marginBottom: 32 }}>
            Atendemos las llamadas de tu empresa con agentes nativos o asistentes de IA - tú
            eliges. Sin permanencia, diseñado para PYMES.
          </p>

          {/* CTA Button */}
          <Link href="/reserva-llamada" className="btn-cta">
            Reserva una llamada
          </Link>
        </div>

        {/* Right column — VideoCard centered vertically */}
        <div style={{ alignSelf: "center" }}>
          <VideoCard />
        </div>
      </section>

      {/* ===== PARTNERS ===== */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(24px, 5vw, 40px) clamp(20px, 5vw, 64px)",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 24 }}>
          Somos partners de empresas líderes
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "clamp(16px, 4vw, 40px)",
            opacity: 0.6,
          }}
        >
          <img
            src="https://framerusercontent.com/assets/vVcZO7NVGGx5NLbyvAVMug0g1ko.png"
            alt="Teleperformance"
            style={{ height: "clamp(22px, 5vw, 34px)", width: "auto", maxWidth: "100%" }}
          />
          <img
            src="https://framerusercontent.com/images/pZqRL99lnwLqdJMbZFfqwh1XGBk.png"
            alt="Intelcia"
            style={{ height: "clamp(20px, 4.5vw, 30px)", width: "auto", maxWidth: "100%" }}
          />
          <img
            src="https://framerusercontent.com/images/B3NliQmX4vcGor4wPgTZ3oHU.png"
            alt="Zendesk"
            style={{ height: "clamp(14px, 3vw, 19px)", width: "auto", maxWidth: "100%" }}
          />
        </div>
      </section>

      {/* ===== QUÉ HACEMOS POR TI ===== */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(40px, 8vw, 80px) clamp(20px, 5vw, 64px)",
          textAlign: "center",
        }}
      >
        <span className="pill-label">Qué hacemos</span>
        <h2 style={{ marginTop: 24 }}>
          Qué hacemos <span className="serif-italic">por ti.</span>
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
            marginTop: 48,
          }}
        >
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
            <div key={service.title} className="card" style={{ textAlign: "left", padding: 32 }}>
              <h3 className="service-card-title" style={{ fontSize: 24 }}>
                {service.title}
              </h3>
              <p className="service-card-body">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== RESULTADOS / CADA LLAMADA PERDIDA ===== */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(40px, 8vw, 80px) clamp(20px, 5vw, 64px)",
        }}
      >
        <div style={{ display: "flex", gap: 48, alignItems: "flex-start", flexWrap: "wrap" }}>
          {/* Left column */}
          <div style={{ flex: "3 1 0", minWidth: 0 }}>
            <span
              className="pill-label"
              style={{ marginBottom: 24, display: "inline-block" }}
            >
              Resultados de clientes
            </span>
            <h2 style={{ marginTop: 16 }}>
              Cada llamada perdida es una{" "}
              <span className="serif-italic">oportunidad perdida.</span>
            </h2>
            <p style={{ maxWidth: 520, marginTop: 24 }}>
              El <strong style={{ color: "black" }}>78% de los leads</strong> contratan al
              negocio que responde <strong style={{ color: "black" }}>primero</strong> - sin
              embargo la mayoría de las PYMES{" "}
              <strong style={{ color: "black" }}>
                pierde entre el 40-60% de las llamadas entrantes.
              </strong>
            </p>
            <p style={{ maxWidth: 520 }}>
              Para las empresas de servicios, el teléfono no es solo un canal de comunicación:
              es su fuente de ingresos.
            </p>
            <p style={{ maxWidth: 520 }}>
              Minute Call es un servicio de atención telefónica 24/7 para empresas y PYMES que
              no pueden permitirse perder llamadas. Basados en España, somos partners de
              Teleperformance (nº1 mundial BPO), muestra de nuestras altos estándares e calidad.
            </p>
            <div style={{ display: "flex", gap: 20, marginTop: 40, flexWrap: "wrap" }}>
              <div className="card" style={{ padding: 24, flex: "1 1 180px" }}>
                <p
                  style={{
                    fontSize: 48,
                    fontWeight: 500,
                    color: "black",
                    letterSpacing: -2,
                    marginBottom: 8,
                  }}
                >
                  15 s
                </p>
                <h3 style={{ fontSize: 18 }}>Tiempo de respuesta</h3>
                <p className="service-card-body">Somos rápidos.</p>
              </div>
              <div className="card" style={{ padding: 24, flex: "1 1 180px" }}>
                <p
                  style={{
                    fontSize: 48,
                    fontWeight: 500,
                    color: "black",
                    letterSpacing: -2,
                    marginBottom: 8,
                  }}
                >
                  98%
                </p>
                <h3 style={{ fontSize: 18 }}>Tasa de respuesta</h3>
                <p className="service-card-body">No pierdas más llamadas.</p>
              </div>
            </div>
          </div>
          {/* Right column: video */}
          <div style={{ flex: "2 1 0", minWidth: 0, alignSelf: "center" }}>
            <div style={{ borderRadius: 16, overflow: "hidden", background: "#F5F5F5" }}>
              <video
                src="https://framerusercontent.com/assets/FaxcwHWdhZxkAcLltQoQxhlJciw.mp4"
                playsInline
                muted
                loop
                autoPlay
                preload="auto"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTORES / INDUSTRIAS ===== */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(24px, 5vw, 40px) clamp(20px, 5vw, 64px) clamp(40px, 8vw, 80px)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "rgba(0,0,0,0.56)",
            marginBottom: 8,
            letterSpacing: -0.5,
          }}
        >
          Creados por ser flexibles.
        </p>
        <h2 style={{ marginBottom: 32 }}>
          Diseñado para <span className="serif-italic">PYMES.</span>
        </h2>
        <div
          className="sectors-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 16,
          }}
        >
          {[
            { name: "Clínicas & Salud", href: "/lp/recepcionista-ia-clinicas" },
            { name: "Agencias inmobiliarias", href: "/lp/recepcionista-ia-inmobiliarias" },
            { name: "Hostelería", href: "/lp/recepcionista-ia-restaurantes" },
            { name: "Despachos de abogados", href: "/lp/recepcionista-ia-abogados" },
            { name: "Clínicas dentales", href: "/lp/recepcionista-ia-clinicas-dentales" },
            { name: "Asesorías y gestorías", href: "/lp/recepcionista-ia-asesorias" },
            { name: "Veterinarias", href: "/lp/recepcionista-ia-veterinarias" },
            { name: "Centros de estética", href: "/lp/recepcionista-ia-centros-estetica" },
            { name: "Fisioterapia", href: "/lp/recepcionista-ia-fisioterapia" },
            { name: "Seguros", href: "/lp/recepcionista-ia-seguros" },
            { name: "Turismo", href: "/lp/recepcionista-ia-turismo" },
            { name: "Autoescuelas", href: "/lp/recepcionista-ia-autoescuelas" },
            { name: "Consultoría", href: "/lp/recepcionista-ia-consultoria" },
          ].map((sector) => {
            const content = (
              <div
                key={sector.name}
                className="card"
                style={{
                  padding: "28px 24px",
                  display: "flex",
                  alignItems: "center",
                  cursor: sector.href ? "pointer" : "default",
                }}
              >
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 500,
                    color: "black",
                    letterSpacing: "-0.72px",
                  }}
                >
                  {sector.name}
                </span>
              </div>
            );
            if (sector.href) {
              return (
                <Link key={sector.name} href={sector.href} style={{ textDecoration: "none" }}>
                  {content}
                </Link>
              );
            }
            return content;
          })}
        </div>
      </section>

      {/* ===== POR QUÉ NOS ELIGEN ===== */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(40px, 8vw, 80px) clamp(20px, 5vw, 64px)",
          textAlign: "center",
        }}
      >
        <span className="pill-label" style={{ marginBottom: 16, display: "inline-block" }}>
          La diferencia
        </span>
        <h2 style={{ marginTop: 16 }}>
          Por qué nos <span className="serif-italic">eligen.</span>
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: 24,
            marginTop: 48,
            textAlign: "left",
          }}
        >
          <div className="card" style={{ padding: 32 }}>
            <h3 style={{ fontSize: 20, marginBottom: 24 }}>Otros Call Centers</h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                "Agentes basados en LATAM",
                "Rigidez en la duración",
                "Bajo nivel tech",
                "Errores frecuentes",
                "Falta de profesionalidad",
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontSize: 15,
                    color: "rgba(0,0,0,0.56)",
                  }}
                >
                  <span style={{ color: "#e53e3e", fontSize: 16 }}>✕</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div
            style={{
              background: "black",
              borderRadius: 24,
              padding: 32,
              color: "white",
            }}
          >
            <h3 style={{ fontSize: 20, marginBottom: 24, color: "white" }}>minute call</h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                "Agentes nativos basados en España",
                "Sin contratos a largo plazo. Mes a mes.",
                "Agentes humanos o IA. Tú eliges.",
                "Control de calidad de cada conversación.",
                "Partners de Teleperformance (#1 BPO mundial).",
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontSize: 15,
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  <span style={{ color: "#5AFF15", fontSize: 16 }}>✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== EQUIPO ===== */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(40px, 8vw, 80px) clamp(20px, 5vw, 64px)",
          textAlign: "center",
        }}
      >
        <span className="pill-label" style={{ marginBottom: 16, display: "inline-block" }}>
          Nuestro equipo
        </span>
        <h2 style={{ marginTop: 16 }}>
          Fundado por quienes escalaron <span className="serif-italic">startups.</span>
        </h2>
        <div style={{ display: "flex", gap: 24, marginTop: 48, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 0", minWidth: 0, textAlign: "left" }}>
            <div
              style={{ overflow: "hidden", borderRadius: 16, marginBottom: 20, aspectRatio: "524/465" }}
            >
              <img
                src="https://framerusercontent.com/images/3EqwlGYnNWfbaSmYW7sjtrJQ.jpg"
                alt="Alberto Castiel"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <h3 style={{ fontSize: 22 }}>Alberto Castiel</h3>
            <p className="service-card-body">
              Ex General Manager en Leocare (130M€ en Series B). Lideró el crecimiento de una
              fintech de 0 a 45M€ con +30 agentes.
            </p>
          </div>
          <div style={{ flex: "1 1 0", minWidth: 0, textAlign: "left" }}>
            <div
              style={{ overflow: "hidden", borderRadius: 16, marginBottom: 20, aspectRatio: "524/465" }}
            >
              <img
                src="https://framerusercontent.com/images/6QCXvNGkCPpl1XOgOz1Op6nosP0.jpeg"
                alt="Beatriz De Tena"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <h3 style={{ fontSize: 22 }}>Beatriz De Tena</h3>
            <p className="service-card-body">
              Ex CEO en Walmeric by Globant (NYSE:GLOB). También fue Directora Global de Ventas
              en Konecta y Telefónica.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CÓMO FUNCIONA ===== */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(40px, 8vw, 80px) clamp(20px, 5vw, 64px)",
          textAlign: "center",
        }}
      >
        <span className="pill-label" style={{ marginBottom: 16, display: "inline-block" }}>
          Como funciona
        </span>
        <h2 style={{ marginTop: 16 }}>
          Cómo <span className="serif-italic">funciona.</span>
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
            marginTop: 48,
            textAlign: "left",
          }}
        >
          {[
            {
              step: "01",
              title: "Definición del flujo",
              desc: "Personalizamos contigo el guión de llamada y acciones del agente.",
            },
            {
              step: "02",
              title: "Llamada entrante",
              desc: "Respondemos en nombre de tu empresa siguiendo tu procedimiento.",
            },
            {
              step: "03",
              title: "Citas y mensajes",
              desc: "Agendamos la cita o enviamos el mensaje al instante a tu email.",
            },
          ].map((item) => (
            <div key={item.step} className="card" style={{ padding: 32 }}>
              <p
                style={{
                  fontSize: 48,
                  fontWeight: 500,
                  color: "rgba(0,0,0,0.1)",
                  marginBottom: 16,
                  letterSpacing: -2,
                }}
              >
                {item.step}
              </p>
              <h3 style={{ fontSize: 22 }}>{item.title}</h3>
              <p className="service-card-body">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(40px, 8vw, 80px) clamp(20px, 5vw, 64px)",
          textAlign: "center",
        }}
      >
        <span className="pill-label" style={{ marginBottom: 16, display: "inline-block" }}>
          Preguntas
        </span>
        <h2 style={{ marginTop: 16 }}>FAQ</h2>
        <div
          style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 0, textAlign: "left" }}
        >
          {faqs.map((faq) => (
            <details
              key={faq.q}
              style={{
                padding: "24px 0",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <summary
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  cursor: "pointer",
                  listStyle: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "black",
                }}
              >
                {faq.q}
                <span style={{ fontSize: 24, fontWeight: 300 }}>+</span>
              </summary>
              <p style={{ marginTop: 16, maxWidth: 700 }}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
