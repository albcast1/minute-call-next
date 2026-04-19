import { NextResponse } from 'next/server'

// IndexNow API endpoint — llamar tras cada deploy para notificar Bing/Yandex/DuckDuckGo
export async function GET() {
  const key = 'mc-indexnow-2026-a7f3b9e2d1c4'
  const host = 'www.minute-call.com'

  // URLs prioritarias a notificar (las más nuevas/importantes)
  const urls = [
    'https://www.minute-call.com/',
    'https://www.minute-call.com/lp/secretaria-virtual',
    'https://www.minute-call.com/lp/recepcion-de-llamadas',
    'https://www.minute-call.com/comparar',
    'https://www.minute-call.com/articulos/cuanto-cuesta-secretaria-virtual-espana-2025',
    'https://www.minute-call.com/articulos/secretaria-virtual-clinicas-precio-espana',
    'https://www.minute-call.com/articulos/alternativa-secretaria-es-minute-call-comparativa',
    'https://www.minute-call.com/articulos/centralita-virtual-vs-recepcionista-virtual-diferencias',
    'https://www.minute-call.com/articulos/llamadas-perdidas-impacto-negocio-espana',
    'https://www.minute-call.com/articulos/recepcionista-virtual-inmobiliarias-espana',
    'https://www.minute-call.com/llms-full.txt',
  ]

  try {
    const body = { host, key, keyLocation: `https://${host}/${key}.txt`, urlList: urls }
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    })
    return NextResponse.json({ status: res.status, urls: urls.length })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
