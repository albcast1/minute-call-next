import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  buildCitySectorTitle,
  buildCitySectorDescription,
  pickHighlight,
} from '../../src/lib/seo/city-sector.ts'

const read = (p: string) => JSON.parse(readFileSync(new URL(p, import.meta.url), 'utf8'))

type City = { slug: string; city: string; region: string; keySectors?: string[]; stats?: { pymes?: string; callsLost?: string } }
type Sector = { slug: string; sector: string; title: string; faq?: Array<{ question: string; answer: string }> }

const cities: City[] = read('../../src/data/cities.json')
const sectors: Sector[] = read('../../src/data/sectors.json')
const highlights: Record<string, { heading: string; intro: string; angle: string }> = read('../../src/data/city-sector-highlights.json')

const allCombos = () => {
  const out: Array<{ city: City; sector: Sector }> = []
  for (const city of cities) {
    for (const sector of sectors) out.push({ city, sector })
  }
  return out
}

test('cada combinacion ciudad x sector tiene una meta description distinta', () => {
  const seen = new Map<string, string>()
  const dupes: string[] = []
  for (const { city, sector } of allCombos()) {
    const desc = buildCitySectorDescription(city, sector)
    const key = `${city.slug}/${sector.slug}`
    const prev = seen.get(desc)
    if (prev) dupes.push(`${key} == ${prev}`)
    else seen.set(desc, key)
  }
  assert.equal(
    dupes.length,
    0,
    `Hay ${dupes.length} meta descriptions duplicadas. Ejemplos: ${dupes.slice(0, 5).join(' | ')}`
  )
})

test('ninguna meta description de ciudad x sector supera los 165 caracteres ni queda truncada', () => {
  const bad: string[] = []
  for (const { city, sector } of allCombos()) {
    const desc = buildCitySectorDescription(city, sector)
    if (desc.length > 165) bad.push(`${city.slug}/${sector.slug} (${desc.length})`)
    if (/\.\.\.$|…$/.test(desc)) bad.push(`${city.slug}/${sector.slug} truncada`)
  }
  assert.deepEqual(bad, [], `Meta descriptions invalidas: ${bad.slice(0, 8).join(', ')}`)
})

test('los titles de ciudad x sector caben en el SERP', () => {
  const tooLong: string[] = []
  for (const { city, sector } of allCombos()) {
    const title = buildCitySectorTitle(city, sector)
    if (title.length > 75) tooLong.push(`${city.slug}/${sector.slug} (${title.length}): ${title}`)
  }
  assert.deepEqual(tooLong, [], `Titles demasiado largos (>75): ${tooLong.slice(0, 5).join(' | ')}`)
})

test('el contenido diferenciado apunta a ciudades y sectores que existen', () => {
  const citySlugs = new Set(cities.map(c => c.slug))
  const sectorSlugs = new Set(sectors.map(s => s.slug))
  const broken: string[] = []
  for (const key of Object.keys(highlights)) {
    if (key.startsWith('_')) continue
    const [ciudad, sector] = key.split(':')
    if (!citySlugs.has(ciudad)) broken.push(`ciudad inexistente: ${ciudad}`)
    if (!sectorSlugs.has(sector)) broken.push(`sector inexistente: ${sector}`)
    const entry = pickHighlight(highlights, ciudad, sector)
    assert.ok(entry, `sin contenido para ${key}`)
    assert.ok(entry!.heading.length > 15, `heading demasiado corto en ${key}`)
    assert.ok(entry!.intro.length > 120, `intro demasiado corta en ${key}`)
    assert.ok(entry!.angle.length > 60, `angle demasiado corto en ${key}`)
  }
  assert.deepEqual(broken, [], broken.join(', '))
})

test('el contenido diferenciado es unico entre combinaciones', () => {
  const intros = new Set<string>()
  for (const [key, value] of Object.entries(highlights)) {
    if (key.startsWith('_')) continue
    const intro = (value as { intro: string }).intro
    assert.ok(!intros.has(intro), `intro repetida en ${key}`)
    intros.add(intro)
  }
  assert.ok(intros.size >= 25, `Se esperaban al menos 25 combinaciones diferenciadas, hay ${intros.size}`)
})

test('las preguntas de FAQ llevan signo de apertura', () => {
  const bad: string[] = []
  for (const sector of sectors) {
    for (const faq of sector.faq ?? []) {
      if (faq.question.trim().endsWith('?') && !faq.question.trim().startsWith('¿')) {
        bad.push(`${sector.slug}: ${faq.question}`)
      }
    }
  }
  assert.deepEqual(bad, [], `Preguntas sin '¿': ${bad.slice(0, 5).join(' | ')}`)
})
