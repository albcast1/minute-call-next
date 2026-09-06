import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

/**
 * Los titles de los articulos son el mayor problema de CTR medido del sitio.
 *
 * En Search Console (90 dias) los 78 articulos con datos sumaban 20.035
 * impresiones y 157 clics (0,78%). Al mirarlos se vio por que:
 *  - 13 articulos compartian exactamente el mismo title en el SERP
 *    ("Mejores soluciones de atencion telefonica | minute call"), asi que
 *    Google mostraba trece resultados indistinguibles.
 *  - unos 15 estaban cortados a media frase ("Call center para pymes en
 *    Espana: cuando", "Cuanto cuestan las llamadas perdidas a tu").
 *  - cuatro llevaban la marca duplicada o un pipe vacio
 *    ("Precio recepcionista virtual Espana 2026 | | minute call").
 *
 * Estos tests fallan si cualquiera de esas tres cosas vuelve a colarse.
 */

type Article = { slug: string; title: string; metaTitle: string; metaDescription: string }

const articles: Article[] = JSON.parse(
  readFileSync(new URL('../../src/data/articles.json', import.meta.url), 'utf8')
)

// Palabras con las que un title no puede terminar: indican una frase cortada.
// Se compara la ultima palabra entera, no con \b, porque en JS el limite de
// palabra no reconoce acentos y partiria "Espana" o "Andalucia" por la mitad.
const CORTE = new Set([
  'y', 'o', 'e', 'u', 'de', 'del', 'en', 'con', 'por', 'para', 'sin',
  'que', 'qué', 'cuando', 'cuándo', 'como', 'cómo', 'tu', 'su',
  'la', 'el', 'los', 'las', 'un', 'una', 'al', 'lo', 'es', 'sobre', 'entre',
])
const ultimaPalabra = (s: string) => s.trim().split(/\s+/).pop()?.toLowerCase() ?? ''

test('ningun articulo repite el title de otro', () => {
  const porTitle = new Map<string, string[]>()
  for (const a of articles) {
    const list = porTitle.get(a.metaTitle) ?? []
    list.push(a.slug)
    porTitle.set(a.metaTitle, list)
  }
  const dupes = [...porTitle.entries()].filter(([, slugs]) => slugs.length > 1)
  assert.deepEqual(
    dupes.map(([t, s]) => `${s.length}x "${t}" -> ${s.join(', ')}`),
    [],
    'Hay titles compartidos entre articulos'
  )
})

test('ningun title queda cortado a media frase', () => {
  const bad: string[] = []
  for (const a of articles) {
    const base = a.metaTitle.replace(/\s*\|\s*minute call\s*$/i, '').trim()
    if (CORTE.has(ultimaPalabra(base))) bad.push(`${a.slug}: "${a.metaTitle}"`)
    if (base.endsWith(':') || base.endsWith(',') || base.endsWith('-')) {
      bad.push(`${a.slug}: termina en signo suelto -> "${a.metaTitle}"`)
    }
  }
  assert.deepEqual(bad, [], `Titles cortados: ${bad.slice(0, 6).join(' | ')}`)
})

test('ningun title lleva la marca dos veces ni un pipe vacio', () => {
  const bad: string[] = []
  for (const a of articles) {
    const veces = (a.metaTitle.toLowerCase().match(/minute call/g) ?? []).length
    if (veces > 1) bad.push(`${a.slug}: marca ${veces} veces`)
    if (/\|\s*\|/.test(a.metaTitle)) bad.push(`${a.slug}: pipe vacio`)
  }
  assert.deepEqual(bad, [], bad.join(' | '))
})

test('los titles caben en el SERP sin que Google los recorte', () => {
  const bad = articles
    .filter(a => a.metaTitle.length > 60 || a.metaTitle.length < 20)
    .map(a => `${a.slug} (${a.metaTitle.length})`)
  assert.deepEqual(bad, [], `Titles fuera de rango 20-60: ${bad.join(', ')}`)
})

test('ninguna meta description de articulo se repite', () => {
  const vistas = new Map<string, string>()
  const dupes: string[] = []
  for (const a of articles) {
    const prev = vistas.get(a.metaDescription)
    if (prev) dupes.push(`${a.slug} == ${prev}`)
    else vistas.set(a.metaDescription, a.slug)
  }
  assert.deepEqual(dupes, [], dupes.join(' | '))
})
