#!/usr/bin/env node
/**
 * Sincroniza public/llms-full.txt con src/data/sectors.json.
 *
 * llms-full.txt es un fichero estatico que sirven las IAs y los crawlers, y se
 * habia quedado desfasado respecto a los datos (llego a publicar un precio que
 * ya no estaba en ninguna otra parte del sitio). Este script reescribe la linea
 * "- Descripcion:" de cada bloque "- Slug: /lp/<slug>" con el metaDescription
 * vigente del sector, para que no vuelva a divergir.
 *
 * Uso: node scripts/sync-llms.mjs [--check]
 *   --check  no escribe; sale con codigo 1 si el fichero esta desincronizado.
 */
import { readFileSync, writeFileSync } from 'node:fs'

const CHECK = process.argv.includes('--check')
const SECTORS = new URL('../src/data/sectors.json', import.meta.url)
const LLMS = new URL('../public/llms-full.txt', import.meta.url)

const sectors = JSON.parse(readFileSync(SECTORS, 'utf8'))
const bySlug = new Map(sectors.map((s) => [s.slug, s]))

const lines = readFileSync(LLMS, 'utf8').split('\n')
let changed = 0

for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^- Slug: \/lp\/([a-z0-9-]+)\s*$/)
  if (!m) continue
  const sector = bySlug.get(m[1])
  if (!sector?.metaDescription) continue

  const next = lines[i + 1]
  if (!next || !next.startsWith('- Descripción:')) continue

  const wanted = `- Descripción: ${sector.metaDescription}`
  if (next !== wanted) {
    lines[i + 1] = wanted
    changed++
  }
}

if (CHECK) {
  if (changed) {
    console.error(`llms-full.txt desincronizado: ${changed} descripciones. Ejecuta: node scripts/sync-llms.mjs`)
    process.exit(1)
  }
  console.log('llms-full.txt sincronizado.')
} else {
  writeFileSync(LLMS, lines.join('\n'))
  console.log(`llms-full.txt: ${changed} descripciones sincronizadas.`)
}
