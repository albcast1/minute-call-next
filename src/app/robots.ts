import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/api/' },
      // Google
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },      // Gemini training
      { userAgent: 'GoogleOther', allow: '/' },           // Google AI Overviews
      // Anthropic / Claude
      { userAgent: 'ClaudeBot', allow: '/' },             // Claude actual (reemplaza Claude-Web)
      { userAgent: 'Claude-Web', allow: '/' },            // Legacy
      { userAgent: 'anthropic-ai', allow: '/' },          // Anthropic research
      // OpenAI / ChatGPT
      { userAgent: 'GPTBot', allow: '/' },                // ChatGPT training
      { userAgent: 'OAI-SearchBot', allow: '/' },         // ChatGPT search
      { userAgent: 'ChatGPT-User', allow: '/' },          // ChatGPT live browsing
      // Perplexity
      { userAgent: 'PerplexityBot', allow: '/' },
      // Apple
      { userAgent: 'Applebot', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },     // Apple Intelligence training
      // Meta
      { userAgent: 'FacebookBot', allow: '/' },
      { userAgent: 'Meta-ExternalAgent', allow: '/' },    // Meta AI
      // Microsoft / Bing
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'DuckAssistBot', allow: '/' },         // DuckDuckGo AI
      // ByteDance / TikTok
      { userAgent: 'Bytespider', allow: '/' },
      // Amazon / Alexa
      { userAgent: 'Amazonbot', allow: '/' },
      // Otros LLM indexers
      { userAgent: 'cohere-ai', allow: '/' },
      { userAgent: 'YouBot', allow: '/' },
      { userAgent: 'MistralAI-User', allow: '/' },
    ],
    sitemap: 'https://www.minute-call.com/sitemap.xml',
  }
}
