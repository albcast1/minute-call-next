import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calculadora: cuánto te cuestan las llamadas perdidas | minute call',
  description: 'Calcula gratis el impacto económico real de las llamadas perdidas en tu negocio. Introduce tus datos y descubre cuánta facturación estás perdiendo cada mes.',
  alternates: { canonical: 'https://www.minute-call.com/calculadora-roi' },
  openGraph: {
    title: 'Calculadora de llamadas perdidas | minute call',
    description: 'Descubre cuánto te están costando las llamadas que no atiendes.',
    url: 'https://www.minute-call.com/calculadora-roi',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '¿Cuánto me cuesta cada llamada perdida?', acceptedAnswer: { '@type': 'Answer', text: 'Depende de tu ticket medio y tasa de conversión. Para una empresa con ticket de 500€ y conversión del 20%, cada llamada perdida que era un lead nuevo tiene un coste de oportunidad de 100€. Usa la calculadora para calcular tu caso específico.' } },
    { '@type': 'Question', name: '¿Qué porcentaje de llamadas pierde una PYME española de media?', acceptedAnswer: { '@type': 'Answer', text: 'Entre el 27% y el 58% según el sector. Las inmobiliarias pierden el 48%. Las clínicas pierden más del 22% fuera de horario. La media general en PYMES de servicios es del 35%.' } },
    { '@type': 'Question', name: '¿Cómo puedo reducir las llamadas perdidas?', acceptedAnswer: { '@type': 'Answer', text: 'La forma más efectiva es contratar un servicio de recepcionista virtual o atención telefónica externalizada. Minute Call cubre todas las llamadas desde 250€/mes, sin permanencia.' } },
  ],
}

export default function CalculadoraROIPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main>
        {/* Hero */}
        <div style={{ textAlign:'center', padding:'72px 24px 40px', maxWidth:760, margin:'0 auto' }}>
          <div style={{ display:'inline-block', background:'#fff3cd', color:'#856404', fontSize:13, fontWeight:600, padding:'4px 14px', borderRadius:999, marginBottom:20 }}>
            Herramienta gratuita
          </div>
          <h1 style={{ fontSize:'clamp(28px,4vw,44px)', fontWeight:700, marginBottom:16, lineHeight:1.2 }}>
            ¿Cuánto te cuestan las llamadas<br/>que no atiendes?
          </h1>
          <p style={{ fontSize:17, color:'#555', lineHeight:1.7 }}>
            Calcula el impacto económico real de las llamadas perdidas en tu negocio. Las PYMES españolas pierden entre el 27% y el 58% de sus llamadas entrantes.
          </p>
        </div>

        {/* Calculator — client component embedded */}
        <div id="calculadora-roi" style={{ maxWidth:860, margin:'0 auto', padding:'0 24px 80px' }}>
          <div style={{ background:'#fff', border:'2px solid #000', borderRadius:20, padding:'40px', marginBottom:32 }}>
            <h2 style={{ fontSize:20, fontWeight:700, marginBottom:32 }}>Introduce los datos de tu negocio</h2>

            {/* Row 1 */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, marginBottom:24 }}>
              <div>
                <label style={{ fontSize:13, fontWeight:600, color:'#333', display:'block', marginBottom:8 }}>
                  Llamadas que recibes al mes
                </label>
                <input id="cal-calls" type="number" defaultValue="200" min="10" max="10000"
                  style={{ width:'100%', padding:'12px 16px', border:'1.5px solid #ddd', borderRadius:10, fontSize:16, boxSizing:'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize:13, fontWeight:600, color:'#333', display:'block', marginBottom:8 }}>
                  % llamadas que se pierden sin atender
                </label>
                <input id="cal-lost" type="number" defaultValue="35" min="1" max="99"
                  style={{ width:'100%', padding:'12px 16px', border:'1.5px solid #ddd', borderRadius:10, fontSize:16, boxSizing:'border-box' }} />
                <p style={{ fontSize:11, color:'#888', marginTop:4 }}>Media PYMES: 35%. Inmobiliarias: 48%</p>
              </div>
            </div>

            {/* Row 2 */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, marginBottom:24 }}>
              <div>
                <label style={{ fontSize:13, fontWeight:600, color:'#333', display:'block', marginBottom:8 }}>
                  % de llamadas que son leads nuevos
                </label>
                <input id="cal-leads" type="number" defaultValue="30" min="1" max="100"
                  style={{ width:'100%', padding:'12px 16px', border:'1.5px solid #ddd', borderRadius:10, fontSize:16, boxSizing:'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize:13, fontWeight:600, color:'#333', display:'block', marginBottom:8 }}>
                  Ticket medio por cliente (€)
                </label>
                <input id="cal-ticket" type="number" defaultValue="500" min="50" max="100000"
                  style={{ width:'100%', padding:'12px 16px', border:'1.5px solid #ddd', borderRadius:10, fontSize:16, boxSizing:'border-box' }} />
              </div>
            </div>

            {/* Row 3 */}
            <div style={{ marginBottom:32 }}>
              <label style={{ fontSize:13, fontWeight:600, color:'#333', display:'block', marginBottom:8 }}>
                % de leads que cierran (tasa de conversión)
              </label>
              <input id="cal-conv" type="number" defaultValue="20" min="1" max="100"
                style={{ width:'300px', padding:'12px 16px', border:'1.5px solid #ddd', borderRadius:10, fontSize:16 }} />
            </div>

            <button onclick="calcularROI()"
              style={{ background:'#000', color:'#fff', border:'none', padding:'16px 40px', borderRadius:999, fontSize:16, fontWeight:700, cursor:'pointer' }}>
              Calcular mi coste de llamadas perdidas →
            </button>
          </div>

          {/* Result */}
          <div id="resultado" style={{ display:'none', background:'#f9fff9', border:'2px solid #00b67a', borderRadius:20, padding:'40px' }}>
            <h3 style={{ fontSize:18, fontWeight:700, marginBottom:24 }}>Tu análisis de llamadas perdidas</h3>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:20, marginBottom:32 }}>
              <div style={{ textAlign:'center', padding:20, background:'#fff', borderRadius:12, border:'1px solid #e5e5e5' }}>
                <div id="res-llamadas" style={{ fontSize:36, fontWeight:800, color:'#e74c3c' }}>—</div>
                <div style={{ fontSize:13, color:'#666', marginTop:4 }}>Llamadas perdidas/mes</div>
              </div>
              <div style={{ textAlign:'center', padding:20, background:'#fff', borderRadius:12, border:'1px solid #e5e5e5' }}>
                <div id="res-leads" style={{ fontSize:36, fontWeight:800, color:'#e74c3c' }}>—</div>
                <div style={{ fontSize:13, color:'#666', marginTop:4 }}>Leads perdidos/mes</div>
              </div>
              <div style={{ textAlign:'center', padding:20, background:'#fff', borderRadius:12, border:'1px solid #e5e5e5' }}>
                <div id="res-coste" style={{ fontSize:36, fontWeight:800, color:'#e74c3c' }}>—</div>
                <div style={{ fontSize:13, color:'#666', marginTop:4 }}>Facturación perdida/mes</div>
              </div>
            </div>
            <div style={{ background:'#000', color:'#fff', borderRadius:14, padding:24, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16 }}>
              <div>
                <div style={{ fontSize:14, color:'#aaa', marginBottom:4 }}>Coste de Minute Call para cubrirlo:</div>
                <div style={{ fontSize:22, fontWeight:700 }}>desde 250€/mes — sin permanencia</div>
              </div>
              <a href="/reserva-llamada" style={{ background:'#fff', color:'#000', padding:'12px 28px', borderRadius:999, fontWeight:700, textDecoration:'none', fontSize:14, whiteSpace:'nowrap' }}>
                Empezar ahora →
              </a>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ maxWidth:760, margin:'0 auto 80px', padding:'0 24px' }}>
          <h2 style={{ fontSize:24, fontWeight:700, marginBottom:32 }}>Preguntas frecuentes</h2>
          {faqSchema.mainEntity.map((item,i)=>(
            <div key={i} style={{ borderBottom:'1px solid #f0f0f0', paddingBottom:20, marginBottom:20 }}>
              <h3 style={{ fontWeight:600, marginBottom:8, fontSize:16 }}>{item.name}</h3>
              <p style={{ color:'#555', fontSize:14, lineHeight:1.7 }}>{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>
      </main>

      <script dangerouslySetInnerHTML={{ __html: `
        function calcularROI() {
          const calls = parseFloat(document.getElementById('cal-calls').value)||0;
          const lostPct = parseFloat(document.getElementById('cal-lost').value)||0;
          const leadsPct = parseFloat(document.getElementById('cal-leads').value)||0;
          const ticket = parseFloat(document.getElementById('cal-ticket').value)||0;
          const convPct = parseFloat(document.getElementById('cal-conv').value)||0;

          const llamadasPerdidas = Math.round(calls * lostPct / 100);
          const leadsPerdidos = Math.round(llamadasPerdidas * leadsPct / 100);
          const facturacionPerdida = Math.round(leadsPerdidos * convPct / 100 * ticket);

          document.getElementById('res-llamadas').textContent = llamadasPerdidas.toLocaleString('es-ES');
          document.getElementById('res-leads').textContent = leadsPerdidos.toLocaleString('es-ES');
          document.getElementById('res-coste').textContent = facturacionPerdida.toLocaleString('es-ES') + '€';
          document.getElementById('resultado').style.display = 'block';
          document.getElementById('resultado').scrollIntoView({behavior:'smooth'});
        }
      ` }} />
    </>
  )
}
