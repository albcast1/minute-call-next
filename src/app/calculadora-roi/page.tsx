'use client'

import { useState } from 'react'

const faqItems = [
  { q: '¿Cuánto me cuesta cada llamada perdida?', a: 'Depende de tu ticket medio y tasa de conversión. Para una empresa con ticket de 500€ y conversión del 20%, cada lead perdido supone 100€ de facturación no ingresada.' },
  { q: '¿Qué porcentaje de llamadas pierde una PYME española de media?', a: 'Entre el 27% y el 58% según el sector. Las inmobiliarias pierden el 48%. Las clínicas pierden más del 22% fuera de horario. La media en PYMES de servicios es del 35%.' },
  { q: '¿Cómo puedo reducir las llamadas perdidas?', a: 'La forma más efectiva es un servicio de recepcionista virtual. Minute Call cubre todas las llamadas desde presupuesto personalizado/mes, sin permanencia.' },
]

export default function CalculadoraROIPage() {
  const [calls, setCalls] = useState(200)
  const [lostPct, setLostPct] = useState(35)
  const [leadsPct, setLeadsPct] = useState(30)
  const [ticket, setTicket] = useState(500)
  const [convPct, setConvPct] = useState(20)
  const [result, setResult] = useState<{llamadas:number,leads:number,coste:number}|null>(null)

  const calcular = () => {
    const llamadas = Math.round(calls * lostPct / 100)
    const leads = Math.round(llamadas * leadsPct / 100)
    const coste = Math.round(leads * convPct / 100 * ticket)
    setResult({llamadas,leads,coste})
    setTimeout(()=>document.getElementById('resultado')?.scrollIntoView({behavior:'smooth'}),100)
  }

  const fmt = (n:number) => n.toLocaleString('es-ES')

  const inputStyle = { width: '100%', padding: '12px 16px', border: '1.5px solid rgba(0,0,0,0.12)', borderRadius: 10, fontSize: 16, boxSizing: 'border-box' as const, fontFamily: 'inherit' }
  const labelStyle = { fontSize: 13, fontWeight: 500 as const, color: 'rgba(0,0,0,0.56)', display: 'block' as const, marginBottom: 8 }

  return (
    <>
      {/* Hero */}
      <section style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto', padding: 'clamp(40px,8vw,72px) clamp(16px,5vw,64px) clamp(24px,4vw,40px)' }}>
        <span className="pill-label" style={{ marginBottom: 20, display: 'inline-block' }}>
          Herramienta gratuita
        </span>
        <h1>
          ¿Cuanto te cuestan las llamadas<br/>que no <span className="serif-italic">atiendes?</span>
        </h1>
        <p style={{ maxWidth: 600, margin: '0 auto' }}>
          Calcula el impacto económico real de las llamadas perdidas en tu negocio. Las PYMES españolas pierden entre el 27% y el 58% de sus llamadas entrantes.
        </p>
      </section>

      {/* Calculator */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 clamp(16px,5vw,64px) clamp(40px,8vw,80px)' }}>
        <div className="card" style={{ padding: 40, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, marginBottom: 32 }}>Introduce los datos de tu negocio</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
            <div>
              <label style={labelStyle}>Llamadas que recibes al mes</label>
              <input type="number" value={calls} onChange={e=>setCalls(Number(e.target.value))} min={10} max={10000} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>% llamadas que se pierden sin atender</label>
              <input type="number" value={lostPct} onChange={e=>setLostPct(Number(e.target.value))} min={1} max={99} style={inputStyle} />
              <p style={{ fontSize: 11, color: 'rgba(0,0,0,0.4)', marginTop: 4 }}>Media PYMES: 35%. Inmobiliarias: 48%</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
            <div>
              <label style={labelStyle}>% de llamadas que son leads nuevos</label>
              <input type="number" value={leadsPct} onChange={e=>setLeadsPct(Number(e.target.value))} min={1} max={100} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Ticket medio por cliente (€)</label>
              <input type="number" value={ticket} onChange={e=>setTicket(Number(e.target.value))} min={50} max={100000} style={inputStyle} />
            </div>
          </div>
          <div style={{ marginBottom: 32 }}>
            <label style={labelStyle}>% de leads que cierran (tasa de conversión)</label>
            <input type="number" value={convPct} onChange={e=>setConvPct(Number(e.target.value))} min={1} max={100} style={{ ...inputStyle, width: 300 }} />
          </div>
          <button onClick={calcular} className="btn-contact" style={{ border: 'none', cursor: 'pointer' }}>
            Calcular mi coste de llamadas perdidas
          </button>
        </div>

        {/* Result */}
        {result && (
          <div id="resultado" style={{ background: 'rgba(90,255,21,0.06)', border: '2px solid #5AFF15', borderRadius: 20, padding: 40 }}>
            <h3 style={{ fontSize: 18, marginBottom: 24 }}>Tu analisis de llamadas perdidas</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 32 }}>
              {[
                { label: 'Llamadas perdidas/mes', value: fmt(result.llamadas) },
                { label: 'Leads perdidos/mes', value: fmt(result.leads) },
                { label: 'Facturación perdida/mes', value: fmt(result.coste) + '€' },
              ].map(({ label, value }) => (
                <div key={label} className="card" style={{ textAlign: 'center', padding: 20 }}>
                  <p style={{ fontSize: 36, fontWeight: 500, color: '#e53e3e', letterSpacing: -2, marginBottom: 4 }}>{value}</p>
                  <p className="service-card-body" style={{ marginBottom: 0 }}>{label}</p>
                </div>
              ))}
            </div>
            <div style={{ background: 'black', color: 'white', borderRadius: 14, padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Coste de Minute Call para cubrirlo:</p>
                <p style={{ fontSize: 20, fontWeight: 500, color: 'white', marginBottom: 0 }}>Precio adaptado a tu volumen — sin permanencia</p>
              </div>
              <a href="/reserva-llamada" style={{ background: 'white', color: 'black', padding: '12px 28px', borderRadius: 999, fontWeight: 500, textDecoration: 'none', fontSize: 14, whiteSpace: 'nowrap' }}>
                Empezar ahora
              </a>
            </div>
          </div>
        )}
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(40px,8vw,80px) clamp(16px,5vw,64px)' }}>
        <h2 style={{ marginBottom: 32 }}>Preguntas frecuentes</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {faqItems.map((item, i) => (
            <details key={i} style={{ padding: '24px 0', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <summary style={{ fontSize: 18, fontWeight: 500, cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'black' }}>
                {item.q}
                <span style={{ fontSize: 24, fontWeight: 300 }}>+</span>
              </summary>
              <p style={{ marginTop: 16 }}>{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}
