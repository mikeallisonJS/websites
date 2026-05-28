import type { MetadataRoute } from 'next'

import { site } from '@/lib/site'

/**
 * Explicitly welcomes the major AI/search crawlers. Default behaviour is
 * allow-all, but listing the AI user-agents documents intent and guards
 * against any upstream default that would block them. Only the API surface is
 * disallowed — everything indexable is open.
 */
const AI_CRAWLERS = [
  'GPTBot', // OpenAI training crawler
  'OAI-SearchBot', // ChatGPT search
  'ChatGPT-User', // ChatGPT live fetch
  'ClaudeBot', // Anthropic training crawler
  'anthropic-ai',
  'Claude-Web',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended', // Gemini / AI Overviews
  'Applebot-Extended',
  'CCBot', // Common Crawl (feeds many models)
  'Amazonbot',
  'Bytespider',
  'Meta-ExternalAgent',
  'cohere-ai',
  'DuckAssistBot'
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/api/' },
      { userAgent: AI_CRAWLERS, allow: '/', disallow: '/api/' }
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url
  }
}
