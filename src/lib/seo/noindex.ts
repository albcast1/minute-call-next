/**
 * Contenido que sale del indice de Google (noindex,follow) tras la caida del
 * 28 de agosto de 2026: las impresiones sin marca bajaron un 97% de un dia para
 * otro, con la marca intacta y sin accion manual. Es el patron de una rebaja
 * algoritmica del dominio, asi que se retira lo que mas se parece a contenido
 * de baja calidad a escala. Las paginas siguen accesibles; solo se deja de
 * pedir que se indexen. Para revertir basta con vaciar estas listas.
 */

/** Articulos sobre marcas de terceros (publicados el 20/08/2026) y la pagina de opiniones propia. */
export const NOINDEX_ARTICLES = new Set<string>([
  // Reescritas con fuentes el 10/10/2026. Quitar de la lista hacia mediados de
  // noviembre de 2026 si las impresiones sin marca se han recuperado.
  'alternativa-konecta-pymes',
  'alternativa-atento-pymes',
  'alternativa-transcom-pymes',
  'alternativa-concentrix-pymes',
  'alternativa-fonvirtual-pymes',
  'alternativa-mas-ip-pymes',
  'alternativa-secretaria-es-minute-call-comparativa',
  'minute-call-opiniones-precios-analisis',
])

/**
 * Paginas ciudad x sector: todas en noindex. La lista de city-sector-indexables.json
 * se calculo con datos de antes de la caida y desde entonces no traen impresiones.
 * Se mantienen las 50 paginas de ciudad y las 48 de sector.
 */
export const CITY_SECTOR_INDEXABLE = false

/**
 * Paginas de ciudad que se piden indexar (oct 2026). En 16 meses las 50 ciudades
 * sumaron 38 clics; estas 12 concentran casi todas las impresiones. El resto queda
 * en noindex,follow: siguen accesibles y enlazadas, pero no compiten en el indice
 * con contenido de plantilla.
 */
export const INDEXABLE_CITIES = new Set<string>([
  'malaga', 'madrid', 'barcelona', 'valencia', 'sevilla', 'bilbao', 'zaragoza',
  'alicante', 'valladolid', 'palma-de-mallorca', 'las-palmas', 'murcia',
])
