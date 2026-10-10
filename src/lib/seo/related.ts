import articles from "@/data/articles.json";
import { NOINDEX_ARTICLES } from "@/lib/seo/noindex";

/*
 * Artículos relacionados (oct 2026). Antes cada artículo enlazaba a los dos
 * primeros del JSON, así que esos dos acumulaban todos los enlaces y el resto
 * solo recibía el del índice /articulos. Ahora cada artículo enlaza a:
 *  - los 2 más parecidos por tema (palabras compartidas en slug y título), y
 *  - el siguiente de la lista, en anillo, para que ninguno quede con un solo enlace.
 * Solo entran artículos indexables.
 */

type Article = (typeof articles)[number];

const STOP = new Set(
  "de la el en y para a los las un una que con por del o al vs como es mejores soluciones cuanto cuesta espana 2025 2026 guia sin mas cual".split(" "),
);

const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");

const tokens = (a: Article) =>
  new Set((norm(`${a.slug} ${a.title}`).match(/[a-z0-9]+/g) ?? []).filter((w) => w.length > 2 && !STOP.has(w)));

const indexable = articles.filter((a) => !NOINDEX_ARTICLES.has(a.slug));
const toks = new Map(indexable.map((a) => [a.slug, tokens(a)]));

const similarity = (a: Set<string>, b: Set<string>) => {
  let inter = 0;
  a.forEach((w) => {
    if (b.has(w)) inter++;
  });
  const union = a.size + b.size - inter;
  return union ? inter / union : 0;
};

export function relatedArticles(slug: string, count = 2): Article[] {
  const i = indexable.findIndex((a) => a.slug === slug);
  const own = toks.get(slug) ?? tokens(articles.find((a) => a.slug === slug) ?? indexable[0]);
  const next = i >= 0 ? indexable[(i + 1) % indexable.length] : undefined;
  const topical = indexable
    .filter((a) => a.slug !== slug && a.slug !== next?.slug)
    .map((a) => ({ a, s: similarity(own, toks.get(a.slug)!) }))
    .sort((x, y) => y.s - x.s || (x.a.slug < y.a.slug ? -1 : 1))
    .slice(0, count)
    .map((x) => x.a);
  return next ? [...topical, next] : topical;
}
