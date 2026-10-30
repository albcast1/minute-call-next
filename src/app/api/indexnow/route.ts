import { NextResponse } from 'next/server'

// IndexNow API endpoint - llamar tras cada deploy para notificar Bing/Yandex/DuckDuckGo
export async function GET() {
  const key = 'mc-indexnow-2026-a7f3b9e2d1c4'
  const host = 'www.minute-call.com'

  // URLs prioritarias a notificar (las más nuevas/importantes)
  const urls = [
    'https://www.minute-call.com/',
    'https://www.minute-call.com/sobre-nosotros',
    'https://www.minute-call.com/articulos/cuanto-cuesta-contratar-call-center-espana',
    'https://www.minute-call.com/articulos/coste-externalizar-atencion-telefonica-pyme-espana',
    'https://www.minute-call.com/articulos/agentes-compartidos-o-dedicados-call-center',
    'https://www.minute-call.com/lp/call-center-para-empresas',
    'https://www.minute-call.com/llms.txt',
    'https://www.minute-call.com/llms-full.txt',
    'https://www.minute-call.com/agent-instructions.md',
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
