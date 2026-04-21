import Link from "next/link";
import { InternalLinks } from '@/components/InternalLinks';
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

      {/* ===== HERO ===== */}
      <section className="hero-section" style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px 60px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))', gap: 40, alignItems: 'center' }}>
        {/* Left column */}
        <div>

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
            src="/assets/partners/teleperformance.png"
            alt="Teleperformance"
            width={200} height={34} style={{ height: "clamp(22px, 5vw, 34px)", width: "auto", maxWidth: "100%" }}
          loading="eager" fetchPriority="high" />
          <img
            src="/assets/partners/intelcia.png"
            alt="Intelcia"
            width={140} height={28} style={{ height: "clamp(20px, 4.5vw, 30px)", width: "auto", maxWidth: "100%" }}
          loading="lazy" />
          <img
            src="/assets/partners/zendesk.png"
            alt="Zendesk"
            width={120} height={20} style={{ height: "clamp(14px, 3vw, 19px)", width: "auto", maxWidth: "100%" }}
          loading="lazy" />
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
              <h3 className="service-card-title" style={{ fontSize: 18, letterSpacing: "-0.5px" }}>
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
          <div style={{ flex: "3 1 340px", minWidth: 0 }}>
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
              Teleperformance (nº1 mundial BPO), muestra de nuestros altos estándares y calidad.
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
          <div style={{ flex: "2 1 300px", minWidth: 0, alignSelf: "flex-start", width: "100%", maxHeight: 420, overflow: "hidden" }}>
            <div style={{ borderRadius: 16, overflow: "hidden", background: "#F5F5F5", position: "relative", height: "100%" }}>
              <video
                poster="/og-image.png"
                src="https://framerusercontent.com/assets/FaxcwHWdhZxkAcLltQoQxhlJciw.mp4"
                playsInline
                muted
                loop
                autoPlay
                preload="metadata"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", maxHeight: 420 }}
              />
              {/* Brand overlay */}
              <div style={{
                position: "absolute",
                bottom: 14,
                left: 14,
              }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.85)", letterSpacing: "-0.2px", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>Glowhaus Studio</span>
              </div>
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
          ].map((sector) => {
            const content = (
              <div
                key={sector.name}
                className="card"
                style={{
                  padding: "24px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  cursor: sector.href ? "pointer" : "default",
                  height: "100%",
                  minHeight: 76,
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "black",
                    letterSpacing: "-0.3px",
                  }}
                >
                  {sector.name}
                </span>
              </div>
            );
            if (sector.href) {
              return (
                <Link
                  key={sector.name}
                  href={sector.href}
                  style={{ textDecoration: "none", display: "block", height: "100%" }}
                >
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
          <div style={{ flex: "1 1 280px", minWidth: 0, textAlign: "left" }}>
            <div
              style={{ overflow: "hidden", borderRadius: 16, marginBottom: 20, aspectRatio: "524/465" }}
            >
              <img
                src="/assets/team/alberto.jpg"
                alt="Alberto Castiel"
                width={260} height={260} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              loading="lazy" />
            </div>
            <h3 style={{ fontSize: 22 }}>Alberto Castiel</h3>
            <p className="service-card-body">
              Ex General Manager en Leocare (130M€ en Series B). Lideró el crecimiento de una
              fintech de 0 a 45M€ con +30 agentes.
            </p>
          </div>
          <div style={{ flex: "1 1 280px", minWidth: 0, textAlign: "left" }}>
            <div
              style={{ overflow: "hidden", borderRadius: 16, marginBottom: 20, aspectRatio: "524/465" }}
            >
              <img
                src="/assets/team/beatriz.jpg"
                alt="Beatriz De Tena"
                width={260} height={260} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              loading="lazy" />
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
              <p style={{ marginTop: 16 }}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    <InternalLinks />
    </>
  );
}
