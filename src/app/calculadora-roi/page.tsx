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

  return (
    <main>
      {/* Hero */}
      <div style={{textAlign:'center',padding:'72px 24px 40px',maxWidth:760,margin:'0 auto'}}>
        <div style={{display:'inline-block',background:'#fff3cd',color:'#856404',fontSize:13,fontWeight:600,padding:'4px 14px',borderRadius:999,marginBottom:20}}>
          Herramienta gratuita
        </div>
        <h1 style={{fontSize:'clamp(28px,4vw,44px)',fontWeight:700,marginBottom:16,lineHeight:1.2}}>
          ¿Cuánto te cuestan las llamadas<br/>que no atiendes?
        </h1>
        <p style={{fontSize:17,color:'#555',lineHeight:1.7}}>
          Calcula el impacto económico real de las llamadas perdidas en tu negocio. Las PYMES españolas pierden entre el 27% y el 58% de sus llamadas entrantes.
        </p>
      </div>

      {/* Calculator */}
      <div style={{maxWidth:860,margin:'0 auto',padding:'0 24px 80px'}}>
        <div style={{background:'#fff',border:'2px solid #000',borderRadius:20,padding:'40px',marginBottom:32}}>
          <h2 style={{fontSize:20,fontWeight:700,marginBottom:32}}>Introduce los datos de tu negocio</h2>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24,marginBottom:24}}>
            <div>
              <label style={{fontSize:13,fontWeight:600,color:'#333',display:'block',marginBottom:8}}>Llamadas que recibes al mes</label>
              <input type="number" value={calls} onChange={e=>setCalls(Number(e.target.value))} min={10} max={10000}
                style={{width:'100%',padding:'12px 16px',border:'1.5px solid #ddd',borderRadius:10,fontSize:16,boxSizing:'border-box'}} />
            </div>
            <div>
              <label style={{fontSize:13,fontWeight:600,color:'#333',display:'block',marginBottom:8}}>% llamadas que se pierden sin atender</label>
              <input type="number" value={lostPct} onChange={e=>setLostPct(Number(e.target.value))} min={1} max={99}
                style={{width:'100%',padding:'12px 16px',border:'1.5px solid #ddd',borderRadius:10,fontSize:16,boxSizing:'border-box'}} />
              <p style={{fontSize:11,color:'#888',marginTop:4}}>Media PYMES: 35%. Inmobiliarias: 48%</p>
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24,marginBottom:24}}>
            <div>
              <label style={{fontSize:13,fontWeight:600,color:'#333',display:'block',marginBottom:8}}>% de llamadas que son leads nuevos</label>
              <input type="number" value={leadsPct} onChange={e=>setLeadsPct(Number(e.target.value))} min={1} max={100}
                style={{width:'100%',padding:'12px 16px',border:'1.5px solid #ddd',borderRadius:10,fontSize:16,boxSizing:'border-box'}} />
            </div>
            <div>
              <label style={{fontSize:13,fontWeight:600,color:'#333',display:'block',marginBottom:8}}>Ticket medio por cliente (€)</label>
              <input type="number" value={ticket} onChange={e=>setTicket(Number(e.target.value))} min={50} max={100000}
                style={{width:'100%',padding:'12px 16px',border:'1.5px solid #ddd',borderRadius:10,fontSize:16,boxSizing:'border-box'}} />
            </div>
          </div>

          <div style={{marginBottom:32}}>
            <label style={{fontSize:13,fontWeight:600,color:'#333',display:'block',marginBottom:8}}>% de leads que cierran (tasa de conversión)</label>
            <input type="number" value={convPct} onChange={e=>setConvPct(Number(e.target.value))} min={1} max={100}
              style={{width:'300px',padding:'12px 16px',border:'1.5px solid #ddd',borderRadius:10,fontSize:16}} />
          </div>

          <button onClick={calcular}
            style={{background:'#000',color:'#fff',border:'none',padding:'16px 40px',borderRadius:999,fontSize:16,fontWeight:700,cursor:'pointer'}}>
            Calcular mi coste de llamadas perdidas →
          </button>
        </div>

        {/* Result */}
        {result && (
          <div id="resultado" style={{background:'#f9fff9',border:'2px solid #00b67a',borderRadius:20,padding:'40px'}}>
            <h3 style={{fontSize:18,fontWeight:700,marginBottom:24}}>Tu análisis de llamadas perdidas</h3>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:20,marginBottom:32}}>
              {[
                {label:'Llamadas perdidas/mes',value:fmt(result.llamadas)},
                {label:'Leads perdidos/mes',value:fmt(result.leads)},
                {label:'Facturación perdida/mes',value:fmt(result.coste)+'€'},
              ].map(({label,value})=>(
                <div key={label} style={{textAlign:'center',padding:20,background:'#fff',borderRadius:12,border:'1px solid #e5e5e5'}}>
                  <div style={{fontSize:36,fontWeight:800,color:'#e74c3c'}}>{value}</div>
                  <div style={{fontSize:13,color:'#666',marginTop:4}}>{label}</div>
                </div>
              ))}
            </div>
            <div style={{background:'#000',color:'#fff',borderRadius:14,padding:24,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:16}}>
              <div>
                <div style={{fontSize:14,color:'#aaa',marginBottom:4}}>Coste de Minute Call para cubrirlo:</div>
                <div style={{fontSize:22,fontWeight:700}}>Precio adaptado a tu volumen — sin permanencia</div>
              </div>
              <a href="/reserva-llamada" style={{background:'#fff',color:'#000',padding:'12px 28px',borderRadius:999,fontWeight:700,textDecoration:'none',fontSize:14,whiteSpace:'nowrap'}}>
                Empezar ahora →
              </a>
            </div>
          </div>
        )}
      </div>

      {/* FAQ */}
      <div style={{maxWidth:760,margin:'0 auto 80px',padding:'0 24px'}}>
        <h2 style={{fontSize:24,fontWeight:700,marginBottom:32}}>Preguntas frecuentes</h2>
        {faqItems.map((item,i)=>(
          <div key={i} style={{borderBottom:'1px solid #f0f0f0',paddingBottom:20,marginBottom:20}}>
            <h3 style={{fontWeight:600,marginBottom:8,fontSize:16}}>{item.q}</h3>
            <p style={{color:'#555',fontSize:14,lineHeight:1.7}}>{item.a}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
