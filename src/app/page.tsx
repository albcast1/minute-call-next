import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "80px 24px 60px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 60,
          flexWrap: "wrap",
        }}
      >
        {/* Left column */}
        <div style={{ flex: "1 1 500px", maxWidth: 600 }}>
          {/* Trustpilot badge */}
          <a href="https://www.trustpilot.com/review/minute-call.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginBottom: 16 }}>
            <img
              src="https://framerusercontent.com/images/2kfdzrRIvwdbWAtc0ABXMgtFH2E.png"
              alt="Trustpilot reviews"
              style={{ height: 40 }}
            />
          </a>

          {/* Pill label */}
          <span className="pill-label" style={{ marginBottom: 24, display: "inline-block" }}>
            Recepción de llamadas para PYMES
          </span>

          {/* Main heading */}
          <h1 style={{ marginTop: 24 }}>
            Atención telefónica <span className="serif-italic">24/7.</span>
          </h1>

          {/* Subtext */}
          <p style={{ maxWidth: 500, marginBottom: 32 }}>
            Atendemos las llamadas de tu empresa con agentes nativos o asistentes
            de IA - tú eliges. Sin permanencia, diseñado para PYMES.
          </p>

          {/* CTA Button */}
          <Link href="/reserva-llamada" className="btn-cta">
            Reserva una llamada
          </Link>
        </div>

        {/* Right column - Video card */}
        <div
          style={{
            flex: "1 1 400px",
            maxWidth: 460,
            background: "#F5F5F5",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
            <div
              style={{
                flex: 1,
                padding: "16px 24px",
                background: "white",
                textAlign: "center",
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Recepcionista
            </div>
            <div
              style={{
                flex: 1,
                padding: "16px 24px",
                background: "transparent",
                textAlign: "center",
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                fontWeight: 500,
                color: "rgba(0,0,0,0.4)",
              }}
            >
              Recepcionista IA
            </div>
          </div>
          {/* Video */}
          <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
            <video
              src="https://framerusercontent.com/assets/FaxcwHWdhZxkAcLltQoQxhlJciw.mp4"
              playsInline
              muted
              loop
              autoPlay
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
          {/* Video controls bar */}
          <div
            style={{
              padding: "12px 20px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "white",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
                <path d="M3 1.5v11l9-5.5z" />
              </svg>
            </div>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "black",
                flexShrink: 0,
              }}
            />
            <div
              style={{
                flex: 1,
                height: 3,
                background: "rgba(0,0,0,0.1)",
                borderRadius: 2,
              }}
            />
            <span style={{ fontSize: 12, color: "rgba(0,0,0,0.5)", whiteSpace: "nowrap" }}>
              0:00 / 0:00
            </span>
          </div>
        </div>
      </section>

      {/* ===== PARTNERS ===== */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "40px 24px",
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
            opacity: 0.6,
          }}
        >
          <img
            src="https://framerusercontent.com/assets/vVcZO7NVGGx5NLbyvAVMug0g1ko.png"
            alt="Partner logos"
            style={{ height: 35, width: "auto" }}
          />
        </div>
      </section>

      {/* ===== QUÉ HACEMOS POR TI ===== */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "80px 24px",
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
          padding: "80px 24px",
        }}
      >
        <div style={{ display: "flex", gap: 60, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 500px" }}>
            <span className="pill-label" style={{ marginBottom: 24, display: "inline-block" }}>
              Resultados de clientes
            </span>
            <h2 style={{ marginTop: 16 }}>
              Cada llamada perdida es una{" "}
              <span className="serif-italic">oportunidad perdida.</span>
            </h2>
            <p style={{ maxWidth: 520, marginTop: 24 }}>
              El <strong style={{ color: "black" }}>78% de los leads</strong> contratan al negocio
              que responde <strong style={{ color: "black" }}>primero</strong> - sin embargo la
              mayoría de las PYMES{" "}
              <strong style={{ color: "black" }}>pierde entre el 40-60% de las llamadas entrantes.</strong>
            </p>
            <p style={{ maxWidth: 520 }}>
              Para las empresas de servicios, el teléfono no es solo un canal de
              comunicación: es su fuente de ingresos.
            </p>
            <p style={{ maxWidth: 520 }}>
              Minute Call es un servicio de atención telefónica 24/7 para empresas
              y PYMES que no pueden permitirse perder llamadas. Basados en España,
              somos partners de Teleperformance (nº1 mundial BPO), muestra de
              nuestras altos estándares e calidad.
            </p>
          </div>

          <div style={{ flex: "0 0 auto", alignSelf: "center" }}>
            <img
              src="https://framerusercontent.com/images/yFHgV1OOpi4Y9SNihdiTqSFXU.png"
              alt="Resultados de clientes"
              style={{ width: 180, borderRadius: 12 }}
            />
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 24,
            marginTop: 64,
          }}
        >
          <div className="card" style={{ padding: 32 }}>
            <p style={{ fontSize: 48, fontWeight: 500, color: "black", letterSpacing: -2, marginBottom: 8 }}>
              15 s
            </p>
            <h3>Tiempo de respuesta</h3>
            <p className="service-card-body">Somos rápidos.</p>
          </div>
          <div className="card" style={{ padding: 32 }}>
            <p style={{ fontSize: 48, fontWeight: 500, color: "black", letterSpacing: -2, marginBottom: 8 }}>
              98%
            </p>
            <h3>Tasa de respuesta</h3>
            <p className="service-card-body">No pierdas más llamadas.</p>
          </div>
          <div className="card" style={{ padding: 32 }}>
            <p style={{ fontSize: 14, fontWeight: 500, color: "rgba(0,0,0,0.56)", marginBottom: 8, letterSpacing: -0.5 }}>
              Creados por ser flexibles.
            </p>
            <h3>Diseñado para PYMES.</h3>
          </div>
        </div>
      </section>

      {/* ===== SECTORES / INDUSTRIAS ===== */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "40px 24px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          {[
            "Clinicas & Salud",
            "Agencias inmobiliarias",
            "Hostelería",
            "Turismo",
            "Despachos de abogados",
            "Otros servicios",
          ].map((sector) => (
            <span
              key={sector}
              className="pill-label"
              style={{ fontSize: 14, padding: "10px 20px" }}
            >
              {sector}
            </span>
          ))}
        </div>
      </section>

      {/* ===== POR QUÉ NOS ELIGEN (COMPARACIÓN) ===== */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "80px 24px",
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
          }}
        >
          {/* Otros Call Centers */}
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

          {/* minute call */}
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
          padding: "80px 24px",
        }}
      >
        <span className="pill-label" style={{ marginBottom: 16, display: "inline-block" }}>
          Nuestro equipo
        </span>
        <h2 style={{ marginTop: 16 }}>
          Fundado por quienes escalaron <span className="serif-italic">startups.</span>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: 24,
            marginTop: 48,
          }}
        >
          <div className="card" style={{ padding: 32 }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.08)",
                marginBottom: 20,
                overflow: "hidden",
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

          <div className="card" style={{ padding: 32 }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.08)",
                marginBottom: 20,
                overflow: "hidden",
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

      {/* ===== CÓMO FUNCIONA ===== */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "80px 24px",
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
          padding: "80px 24px",
        }}
      >
        <span className="pill-label" style={{ marginBottom: 16, display: "inline-block" }}>
          Preguntas
        </span>
        <h2 style={{ marginTop: 16 }}>FAQ</h2>

        <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            {
              q: "¿Qué es Minute Call?",
              a: "Minute Call es un servicio de atención telefónica para empresas que atiende llamadas en nombre del negocio con recepcionistas nativos o agentes de IA para evitar perder contactos y oportunidades comerciales.",
            },
            {
              q: "¿En qué se diferencia de un call center tradicional?",
              a: "Un call center tradicional está orientado a grandes volúmenes de llamadas, mientras que Minute Call se centra en la atención telefónica para pymes y empresas de servicios donde cada llamada es relevante.",
            },
            {
              q: "¿Las llamadas las atienden humanos o IA?",
              a: "Las empresas pueden elegir entre recepcionistas nativos, agentes de IA o una combinación según su volumen de llamadas, horario y tipo de cliente.",
            },
            {
              q: "¿Para qué tipo de empresas está pensado el servicio?",
              a: "Principalmente para pymes, clínicas, despachos, inmobiliarias y empresas de servicios que reciben llamadas frecuentes y no pueden permitirse perder oportunidades por no atender el teléfono.",
            },
            {
              q: "¿Qué ocurre cuando no se atiende una llamada?",
              a: "Cuando una empresa no responde una llamada, es habitual que el cliente potencial no vuelva a llamar. Por eso la atención telefónica continua es clave para la captación y conversión de clientes.",
            },
          ].map((faq) => (
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

      {/* ===== CTA FINAL ===== */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "80px 24px 120px",
          textAlign: "center",
        }}
      >
        <h2>
          No pierdas ninguna llamada <span className="serif-italic">más.</span>
        </h2>
        <p style={{ maxWidth: 500, margin: "16px auto 32px" }}>
          Servicio premium de secretaría virtual y atención telefónica para PYMES.
        </p>
        <Link href="/reserva-llamada" className="btn-cta">
          Reserva una llamada
        </Link>
      </section>
    </>
  );
}
