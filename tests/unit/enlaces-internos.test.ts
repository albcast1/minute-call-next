import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

/**
 * Enlaces internos rotos y canibalizacion.
 *
 * Habia 20 enlaces internos apuntando a cinco URLs que no existen. Una de
 * ellas, /articulos/call-center-pymes-espana-alternativa-teleperformance,
 * acumulaba 296 impresiones en 90 dias devolviendo 404: Google la rastreaba
 * porque la enlazabamos nosotros.
 *
 * El segundo test vigila la canibalizacion que dejaba el cluster comercial en
 * posicion 36: para la consulta "call center para empresas" competian siete
 * URLs propias entre si. Si vuelven a aparecer articulos que dupliquen la
 * intencion comercial de las landings, este test avisa.
 */

const read = (p: string) => JSON.parse(readFileSync(new URL(p, import.meta.url), 'utf8'))

type Article = { slug: string; content: string; relatedLinks?: Array<{ href: string; label: string }> }
type Sector = { slug: string }
type City = { slug: string }

const articles: Article[] = read('../../src/data/articles.json')
const sectors: Sector[] = read('../../src/data/sectors.json')
const cities: City[] = read('../../src/data/cities.json')

const blob = JSON.stringify(articles) + JSON.stringify(sectors) + JSON.stringify(cities)

test('ningun enlace interno apunta a una pagina que no existe', () => {
  const slugsArticulo = new Set(articles.map(a => a.slug))
  const slugsSector = new Set(sectors.map(s => s.slug))
  const slugsCiudad = new Set(cities.map(c => c.slug))

  const rotos: string[] = []
  for (const m of new Set(blob.match(/\/articulos\/[a-z0-9-]+/g) ?? [])) {
    if (!slugsArticulo.has(m.replace('/articulos/', ''))) rotos.push(m)
  }
  for (const m of new Set(blob.match(/\/lp\/[a-z0-9-]+/g) ?? [])) {
    if (!slugsSector.has(m.replace('/lp/', ''))) rotos.push(m)
  }
  for (const m of new Set(blob.match(/\/atencion-telefonica\/[a-z0-9-]+(?![/a-z0-9-])/g) ?? [])) {
    if (!slugsCiudad.has(m.replace('/atencion-telefonica/', ''))) rotos.push(m)
  }

  assert.deepEqual(rotos, [], `Enlaces internos a paginas inexistentes: ${rotos.join(', ')}`)
})

test('el hub comercial recibe enlaces internos', () => {
  const HUB = '/lp/call-center-para-empresas'
  const entrantes = articles.filter(a =>
    (a.relatedLinks ?? []).some(l => l.href === HUB) || a.content.includes(HUB)
  ).length
  assert.ok(
    entrantes >= 15,
    `El hub comercial solo recibe ${entrantes} enlaces internos. Estuvo en 0 y por eso ` +
      `posicionaba en el puesto 72 mientras la home lo hacia en el 17.`
  )
})

test('ningun articulo vuelve a duplicar la intencion comercial de las landings', () => {
  // Slugs de articulo que serian indistinguibles de una landing de sector.
  const PROHIBIDOS = [
    'call-center-para-empresas-espana',
    'call-center-externalizado-para-empresas',
    'call-center-para-pequenas-empresas',
    'call-center-24-7-para-pymes-espana',
  ]
  const revividos = articles.filter(a => PROHIBIDOS.includes(a.slug)).map(a => a.slug)
  assert.deepEqual(
    revividos,
    [],
    `Estos articulos se fusionaron con su landing porque competian con ella. ` +
      `Si hacen falta, tienen que cubrir una intencion distinta y cambiar de slug: ${revividos.join(', ')}`
  )
})
