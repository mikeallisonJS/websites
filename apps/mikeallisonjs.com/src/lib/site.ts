/**
 * Single source of truth for the site's identity. Consumed by metadata,
 * JSON-LD structured data, the sitemap, robots, and the llms.txt routes so
 * everything that an AI crawler or search engine reads stays in sync.
 */
export const site = {
  url: 'https://mikeallisonjs.com',
  name: 'mikeallisonJS',
  /** Used in <title> templates and OpenGraph site_name. */
  shortName: 'mikeallisonJS',
  author: 'Mike Allison',
  jobTitle: 'Staff / Principal Software Engineer',
  email: 'dj.mikeallison@gmail.com',
  location: 'United States',
  /** One-liner reused across metadata, the homepage, and llms.txt. */
  tagline:
    'Over 25 years designing cutting-edge software for global, industry-leading businesses.',
  description:
    'Mike Allison is a Staff / Principal Software Engineer with 25+ years of full-stack experience — TypeScript, Next.js, React, GraphQL, AWS / Vercel, and AI integrations. Career spans EdTech, healthcare, contract management, global non-profits, and music software.',
  /** Profiles that establish Mike as an entity to search and language models. */
  sameAs: ['https://github.com/mikeallisonJS'],
  github: 'https://github.com/mikeallisonJS',
  alumniOf: 'Western Kentucky University',
  /** Topical expertise — feeds Person.knowsAbout in JSON-LD. */
  knowsAbout: [
    'TypeScript',
    'JavaScript',
    'Next.js',
    'React',
    'Angular',
    'Node.js',
    'GraphQL',
    'AWS',
    'Vercel',
    'Terraform',
    'AI integration',
    'Full-stack architecture',
    'Software architecture'
  ]
} as const

/** Primary navigation — drives the content-page header and the site footer. */
export const nav = [
  { href: '/about', label: 'About' },
  { href: '/resume', label: 'Resume' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/blog', label: 'Blog' }
] as const

/** Absolute URL helper for canonical links, sitemap entries, and JSON-LD ids. */
export function absoluteUrl(path = ''): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  return `${site.url}${clean === '/' ? '' : clean}`
}

/**
 * Current time read inside `'use cache'` so it's frozen at build — reading the
 * clock during render is otherwise flagged as dynamic under `cacheComponents`.
 */
export async function buildYear(): Promise<number> {
  'use cache'
  return new Date().getFullYear()
}

export async function buildTimestamp(): Promise<string> {
  'use cache'
  return new Date().toISOString()
}
