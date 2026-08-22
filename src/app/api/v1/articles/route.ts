import { NextRequest } from 'next/server'
import { apiError, apiJson } from '@/lib/api/errors'
import { articles, articleSummary, findArticle, parseLimit, SLUG_PATTERN } from '@/lib/api/resources'
import { API_BASE } from '@/lib/agent/site'

/** GET /api/v1/articles - published articles; `?slug=` returns one with its Markdown body. */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const slug = params.get('slug')

  if (slug !== null) {
    if (!SLUG_PATTERN.test(slug)) {
      return apiError('validation_error', 'The `slug` parameter is invalid.', {
        details: [{ field: 'slug', reason: 'must match ^[a-z0-9-]+$' }],
      })
    }
    const article = findArticle(slug)
    if (!article) {
      return apiError('not_found', `No article with slug "${slug}".`, {
        hint: `List the available articles with GET ${API_BASE}/articles.`,
      })
    }
    return apiJson({
      count: 1,
      total: 1,
      items: [{ ...articleSummary(article), content_markdown: article.content }],
    })
  }

  const limit = parseLimit(params.get('limit'))
  if (!limit.ok) {
    return apiError('validation_error', 'The `limit` parameter is invalid.', {
      details: [{ field: 'limit', reason: limit.reason }],
    })
  }

  return apiJson({
    count: Math.min(articles.length, limit.value),
    total: articles.length,
    items: articles.slice(0, limit.value).map(articleSummary),
  })
}
