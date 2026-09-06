/**
 * Generacion de metadatos diferenciados para las paginas /atencion-telefonica/{ciudad}/{sector}.
 *
 * Problema que resuelve: las 2.400 combinaciones compartian el mismo title y la
 * misma meta description salvo por el nombre de ciudad y sector. En Search Console
 * estan indexadas pero con posicion media ~17 y practicamente cero clics, que es el
 * patron tipico de contenido plantilla: Google las considera y no las premia.
 *
 * Estrategia:
 *  - `buildCitySectorMeta` produce title y description unicos por combinacion usando
 *    datos reales de la ciudad (region, numero de pymes, patron de llamadas perdidas,
 *    sectores clave) y rotando plantilla de forma determinista.
 *  - `pickHighlight` devuelve contenido escrito a mano para las 30
 *    combinaciones prioritarias, que son el grupo de prueba para medir si el
 *    contenido diferenciado mueve posiciones frente al resto.
 */

export type CityLike = {
  slug: string
  city: string
  region: string
  keySectors?: string[]
  stats?: { pymes?: string; callsLost?: string }
}

export type SectorLike = {
  slug: string
  sector: string
  title: string
  /** Frase de servicio para title y H1: "Recepcionista virtual para clinicas". */
  servicio?: string
  /** Sintagma con articulo y genero para el cuerpo: "las clinicas". */
  clientes?: string
  /** Version corta para combinaciones con nombre de ciudad largo. */
  servicioCorto?: string
}

export type CitySectorHighlight = {
  heading: string
  intro: string
  angle: string
}

/**
 * Busca el contenido escrito a mano de una combinacion. El mapa se pasa desde fuera
 * (la pagina lo importa con el alias `@/data/...`) para que este modulo siga siendo
 * puro y se pueda testear con el runner de Node sin resolver alias ni JSON imports.
 */
export function pickHighlight(
  highlights: Record<string, unknown>,
  ciudad: string,
  sector: string
): CitySectorHighlight | null {
  const entry = highlights[`${ciudad}:${sector}`]
  if (!entry || typeof entry !== 'object' || !('heading' in (entry as object))) return null
  return entry as CitySectorHighlight
}

/** Hash estable (FNV-1a de 32 bits) para rotar plantillas sin aleatoriedad entre builds. */
function stableHash(input: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h >>> 0
}

/** Recorta a `max` caracteres sin partir palabras ni dejar puntuacion colgando. */
export function trimTo(text: string, max: number): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return cut.slice(0, lastSpace > 0 ? lastSpace : max).replace(/[\s,;:.-]+$/, '') + '.'
}

/**
 * Frase de SERVICIO del sector.
 *
 * `sector.sector` guarda el CLIENTE ("clinicas") en 41 de los 48 sectores y el
 * SERVICIO ("Call Center para Empresas") solo en 7. Usarlo tal cual generaba
 * titles como "clinicas en Huesca | minute call", sin el servicio y empezando
 * en minuscula. `servicio` resuelve eso de forma explicita.
 */
function sectorLabel(sector: SectorLike): string {
  const s = (sector.servicio ?? sector.sector).replace(/\.$/, '').trim()
  return s.charAt(0).toUpperCase() + s.slice(1)
}

/** Sintagma de clientes con articulo y genero: "las clinicas", "los restaurantes". */
export function clientesDe(sector: SectorLike): string {
  return (sector.clientes ?? 'las empresas').trim()
}

/** El mismo sintagma sin articulo: "clinicas", "restaurantes". */
export function clientesSinArticulo(sector: SectorLike): string {
  return clientesDe(sector).replace(/^(las|los)\s+/i, '')
}

/**
 * Title unico por combinacion. Se mantiene corto (<= 60 caracteres antes de la marca)
 * para que Google no lo recorte en el SERP.
 */
export function buildCitySectorTitle(city: CityLike, sector: SectorLike): string {
  const largo = `${sectorLabel(sector)} en ${city.city}`
  const corto = sector.servicioCorto ? `${sector.servicioCorto} en ${city.city}` : largo

  // Escalera: marca solo si cabe; si el nombre del sector y el de la ciudad son
  // los dos largos (p. ej. "estudios de arquitectura e ingenieria" + "Las Palmas
  // de Gran Canaria"), se cae a la version corta. El termino de busqueda va
  // delante siempre: Google recorta por el final, no por el principio.
  if (`${largo} | minute call`.length <= 60) return `${largo} | minute call`
  if (largo.length <= 65) return largo
  return corto.length < largo.length ? corto : largo
}

/**
 * Meta description unica por combinacion. Rota entre seis plantillas y en cada una
 * inyecta un dato propio de la ciudad, de forma que no existan dos descripciones
 * identicas en las 2.400 paginas.
 */
export function buildCitySectorDescription(city: CityLike, sector: SectorLike): string {
  const label = sectorLabel(sector)
  const lower = label.charAt(0).toLowerCase() + label.slice(1)
  const clientes = clientesSinArticulo(sector)
  const region = city.region
  const pymes = city.stats?.pymes?.replace(/\+$/, '') ?? ''
  const callsLost = city.stats?.callsLost ?? ''
  const keySector = city.keySectors?.[0] ?? ''

  const variants: string[] = [
    `${label} en ${city.city}: agentes nativos atienden y agendan tus llamadas en ${region}. Sin permanencia, activo en 48 h.`,
    `${label} en ${city.city}: cobertura ampliada en ${region} con agentes nativos en español y sin permanencia.`,
    pymes
      ? `${label} en ${city.city}, donde operan ${pymes} pymes. Atendemos, filtramos y agendamos cada llamada por ti.`
      : `${label} en ${city.city}. Atendemos, filtramos y agendamos cada llamada en nombre de tu empresa.`,
    callsLost
      ? `En ${city.city} se pierde un ${callsLost.replace(/^(\d+)%.*/, '$1%')} de las llamadas. ${label}: las atendemos todas, sin permanencia.`
      : `${label} en ${city.city}: ninguna llamada sin atender, sin permanencia ni alta de personal.`,
    keySector
      ? `${label} en ${city.city}. Trabajamos con ${clientes} de la ciudad con agentes nativos y activación en 48 horas.`
      : `${label} en ${city.city} con agentes nativos. Activación en 48 horas y sin permanencia.`,
    `¿Buscas ${lower} en ${city.city}? Atendemos tus llamadas 24/7 en ${region} y te pasamos solo lo importante.`,
  ]

  const idx = stableHash(`${city.slug}:${sector.slug}`) % variants.length
  const elegida = variants[idx]
  // Si la frase larga no cabe, se reescribe con la etiqueta corta antes de
  // recortar: mejor una frase entera que una cortada con un punto suelto.
  if (elegida.length > 158 && sector.servicioCorto && sector.servicioCorto !== label) {
    const corta = elegida.split(label).join(sector.servicioCorto)
    if (corta.length <= 158) return corta
  }
  return trimTo(elegida, 158)
}

export function buildCitySectorMeta(city: CityLike, sector: SectorLike) {
  return {
    title: buildCitySectorTitle(city, sector),
    description: buildCitySectorDescription(city, sector),
  }
}
