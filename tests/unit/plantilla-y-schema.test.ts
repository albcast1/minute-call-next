import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { buildCitySectorTitle, buildCitySectorDescription, clientesDe } from '../../src/lib/seo/city-sector.ts'

/**
 * Errores de plantilla que se veian en las 2.400 paginas ciudad x sector.
 *
 * El campo `sector` guarda el CLIENTE ("clinicas") en 41 de los 48 sectores y
 * el SERVICIO ("Call Center para Empresas") solo en 7. La plantilla lo trataba
 * siempre como servicio y producia:
 *     title  "clinicas en Huesca | minute call"
 *     meta   "Necesitas clinicas en Huesca?"
 *     H2     "Lo que dicen los clinicas que nos usan."
 * Ademas quedaba una variable de precio vacia visible en el cuerpo:
 *     "IA especializada/mes sin permanencia"
 *     "Sin permanencia, desde precio personalizado/mes."
 */

const read = (p: string) => JSON.parse(readFileSync(new URL(p, import.meta.url), 'utf8'))

type Sector = {
  slug: string
  sector: string
  servicio?: string
  servicioCorto?: string
  clientes?: string
  esServicio?: boolean
}
type City = { slug: string; city: string; region: string; keySectors?: string[]; stats?: { pymes?: string; callsLost?: string } }

const sectors: Sector[] = read('../../src/data/sectors.json')
const cities: City[] = read('../../src/data/cities.json')

test('todos los sectores declaran servicio y clientes', () => {
  const incompletos = sectors
    .filter(s => !s.servicio || !s.clientes || !s.servicioCorto)
    .map(s => s.slug)
  assert.deepEqual(incompletos, [], `Sectores sin los campos de plantilla: ${incompletos.join(', ')}`)
})

test('el sintagma de clientes lleva articulo con genero', () => {
  const malos = sectors
    .filter(s => !/^(las|los)\s+\S/.test(clientesDe(s)))
    .map(s => `${s.slug}: "${clientesDe(s)}"`)
  assert.deepEqual(malos, [], `Clientes sin articulo: ${malos.join(' | ')}`)
})

test('ningun title empieza en minuscula ni pierde el servicio', () => {
  const malos: string[] = []
  for (const s of sectors) {
    const t = buildCitySectorTitle(cities[0], s)
    const primera = t.charAt(0)
    if (primera !== primera.toUpperCase()) malos.push(`${s.slug}: "${t}"`)
    // Un title que sea solo el nombre del cliente ("Clinicas en X") no dice
    // que servicio se ofrece: tiene que llevar la frase de servicio.
    if (!s.esServicio && !/recepcionista/i.test(t)) malos.push(`${s.slug} sin servicio: "${t}"`)
  }
  assert.deepEqual(malos, [], malos.slice(0, 6).join(' | '))
})

test('ninguna meta description queda como una pregunta sin sentido', () => {
  const malos: string[] = []
  for (const s of sectors) {
    for (const c of cities.slice(0, 12)) {
      const d = buildCitySectorDescription(c, s)
      // "Buscas clinicas en Huesca?" -> el sujeto tiene que ser el servicio.
      if (/^¿(Buscas|Necesitas)\s+(clínicas|inmobiliarias|restaurantes|farmacias|notarías|ópticas)\b/i.test(d)) {
        malos.push(`${c.slug}/${s.slug}: "${d.slice(0, 60)}"`)
      }
      if (d.length > 165) malos.push(`${c.slug}/${s.slug} demasiado larga (${d.length})`)
    }
  }
  assert.deepEqual(malos, [], malos.slice(0, 5).join(' | '))
})

test('no queda ninguna variable de precio vacia en el contenido', () => {
  const blob = readFileSync(new URL('../../src/data/sectors.json', import.meta.url), 'utf8')
  const restos = [
    'desde precio personalizado/mes',
    'IA especializada/mes',
    'desde /mes',
    'precio a consultar/mes',
  ].filter(r => blob.includes(r))
  assert.deepEqual(restos, [], `Variables de precio vacias visibles: ${restos.join(', ')}`)
})

test('el JSON-LD del layout no declara valoraciones propias ni buscadores falsos', () => {
  const layout = readFileSync(new URL('../../src/app/layout.tsx', import.meta.url), 'utf8')
  // Se ignoran los comentarios, que explican justamente por que se quitaron.
  const codigo = layout.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')
  const problemas: string[] = []
  if (codigo.includes('aggregateRating')) problemas.push('aggregateRating auto-declarado')
  if (codigo.includes('SearchAction')) problemas.push('SearchAction sin buscador real')
  const bloques = (codigo.match(/application\/ld\+json/g) ?? []).length
  if (bloques > 1) problemas.push(`${bloques} bloques JSON-LD en lugar de un @graph`)
  assert.deepEqual(problemas, [], problemas.join(' | '))
})

test('la direccion del schema coincide con la del aviso legal', () => {
  const layout = readFileSync(new URL('../../src/app/layout.tsx', import.meta.url), 'utf8')
  assert.ok(
    layout.includes('"addressLocality": "Málaga"'),
    'El schema debe decir Malaga, que es el domicilio del aviso legal. Antes decia Madrid.'
  )
})

test('los articulos llevan fecha de revision', () => {
  const articles: Array<{ slug: string; dateModified?: string }> = read('../../src/data/articles.json')
  const sinFecha = articles.filter(a => !a.dateModified).map(a => a.slug)
  assert.deepEqual(sinFecha, [], `Articulos sin dateModified: ${sinFecha.slice(0, 5).join(', ')}`)
})
