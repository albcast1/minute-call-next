import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

/**
 * El precio de Minute Call no es publico: se da por presupuesto.
 *
 * Varias tandas de contenido lo habian filtrado (250 EUR/mes, 139 EUR/mes,
 * 490 EUR/mes) en articulos, en las FAQ de sectores y en llms-full.txt, que es
 * justo el fichero que leen los asistentes de IA. Estos tests fallan si una
 * edicion futura vuelve a publicar una tarifa propia.
 *
 * Los rangos de mercado y los precios de otros proveedores (Secretaria.es,
 * Fonvirtual, Konecta...) son legitimos y no deben saltar aqui: solo se
 * persiguen las construcciones que atribuyen un importe a Minute Call.
 */

const FILES = [
  'src/data/articles.json',
  'src/data/sectors.json',
  'src/data/cities.json',
  'public/llms.txt',
  'public/llms-full.txt',
]

const AMOUNT = String.raw`\d{1,3}(?:[.,]\d{3})?(?:[.,]\d+)?\s?(?:€|euros?\b)`

const COMPETITORS =
  /Secretaria\.es|Secrelan|Fonvirtual|M[aá]s IP|Teleperformance|Konecta|Atento|Transcom|Concentrix|Webhelp|Centraldereservas|Servinform|Contacta|IA aut[oó]noma/i

const OWN_PRICE_PATTERNS: Array<{ name: string; re: RegExp; needsBrandNearby?: boolean }> = [
  // "Minute Call ... desde 250 EUR/mes"
  { name: 'importe atribuido a Minute Call', re: new RegExp(String.raw`Minute\s*Call[^.\n|]{0,90}?\b(?:desde|a partir de)\s*${AMOUNT}`, 'gi') },
  // "El precio base de 250 EUR/mes", "los planes empiezan desde 139 EUR"
  { name: 'precio base o plan propio', re: new RegExp(String.raw`(?:precio base|planes?\s+(?:empiezan|parten|desde))[^.\n]{0,60}${AMOUNT}`, 'gi'), needsBrandNearby: true },
  // "Plan Business (490 euros/mes)" - los planes con nombre propio son de Minute Call
  { name: 'tarifa de un plan propio', re: new RegExp(String.raw`Plan\s+(?:Starter|Business)[^.\n]{0,60}${AMOUNT}`, 'gi') },
  // Fila de tabla comparativa: "| Minute Call | 250 EUR/mes |"
  { name: 'fila de tabla con precio propio', re: new RegExp(String.raw`\|\s*\*{0,2}Minute Call\*{0,2}\s*\|[^|\n]*${AMOUNT}`, 'gi') },
  // Ficha de producto: "**Precio:** desde 250 EUR/mes"
  { name: 'ficha de precio', re: new RegExp(String.raw`\*\*Precio:\*\*[^.\n]{0,40}${AMOUNT}`, 'gi'), needsBrandNearby: true },
]

/**
 * Un importe solo delata a Minute Call si la marca aparece justo antes y no hay
 * otro proveedor por medio: las comparativas citan precios ajenos a proposito.
 */
function attributedToMinuteCall(text: string, index: number): boolean {
  const before = text.slice(Math.max(0, index - 320), index)
  const brand = before.toLowerCase().lastIndexOf('minute call')
  if (brand === -1) return false
  return !COMPETITORS.test(before.slice(brand))
}

test('ninguna tarifa propia de Minute Call esta publicada', () => {
  const offenders: string[] = []

  for (const file of FILES) {
    const text = readFileSync(new URL(`../../${file}`, import.meta.url), 'utf8')
    for (const { name, re, needsBrandNearby } of OWN_PRICE_PATTERNS) {
      for (const match of text.matchAll(re)) {
        if (needsBrandNearby && !attributedToMinuteCall(text, match.index)) continue
        offenders.push(`${file} [${name}]: "${match[0].replace(/\s+/g, ' ').slice(0, 160)}"`)
      }
    }
  }

  assert.deepEqual(
    offenders,
    [],
    `El precio de Minute Call no debe publicarse. Encontrado:\n${offenders.join('\n')}`,
  )
})

test('ninguna metaDescription queda truncada ni se pasa de largo', () => {
  const problems: string[] = []
  for (const file of ['src/data/articles.json', 'src/data/sectors.json', 'src/data/cities.json']) {
    const items = JSON.parse(readFileSync(new URL(`../../${file}`, import.meta.url), 'utf8'))
    for (const item of items) {
      const md: string | undefined = item?.metaDescription
      if (!md) continue
      if (md.trimEnd().endsWith('...')) problems.push(`${file}: ${item.slug} termina cortada`)
      // Google recorta el snippet alrededor de 160 caracteres.
      if (md.length > 165) problems.push(`${file}: ${item.slug} tiene ${md.length} caracteres`)
    }
  }
  assert.deepEqual(problems, [], `metaDescription con problemas:\n${problems.join('\n')}`)
})
