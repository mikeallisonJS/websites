import type { ProjectData } from '@/lib/agent/projects'
import type { BlogMeta, JobDoc } from '@/lib/content'

import { absoluteUrl, site } from '@/lib/site'

/**
 * Schema.org JSON-LD builders. A stable `@id` per entity lets the graph cross
 * -reference itself (e.g. every CreativeWork points back to the one Person),
 * which is what helps AI engines treat Mike as a single, well-defined entity.
 */
const PERSON_ID = absoluteUrl('/#person')
const WEBSITE_ID = absoluteUrl('/#website')

type Schema = Record<string, unknown>

export function personSchema(): Schema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: site.author,
    url: site.url,
    jobTitle: site.jobTitle,
    email: `mailto:${site.email}`,
    description: site.description,
    sameAs: site.sameAs,
    knowsAbout: site.knowsAbout,
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: site.alumniOf
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US'
    }
  }
}

export function websiteSchema(): Schema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: 'en-US',
    publisher: { '@id': PERSON_ID }
  }
}

/** Homepage profile page that anchors the Person entity. */
export function profilePageSchema(): Schema {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: site.url,
    name: `${site.author} — ${site.jobTitle}`,
    mainEntity: { '@id': PERSON_ID }
  }
}

export function projectSchema(project: ProjectData): Schema {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.details ?? project.description,
    url: project.websiteUrl,
    ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
    keywords: [...project.tags, ...project.stack].join(', '),
    creator: { '@id': PERSON_ID },
    isAccessibleForFree: true
  }
}

export function jobSchema(job: JobDoc): Schema {
  // An ongoing role uses `present` (or no end) in frontmatter; only emit
  // `endDate` for a real date so the JSON-LD stays valid.
  const isOngoing = !job.end || job.end.toLowerCase() === 'present'
  return {
    '@context': 'https://schema.org',
    '@type': 'Role',
    roleName: job.role,
    startDate: job.start,
    ...(isOngoing ? {} : { endDate: job.end }),
    description: job.body.split('\n').find((l) => l.trim() && !l.startsWith('#')),
    member: { '@id': PERSON_ID },
    worksFor: {
      '@type': 'Organization',
      name: job.company
    }
  }
}

export function blogPostingSchema(post: BlogMeta): Schema {
  const url = absoluteUrl(`/blog/${post.slug}`)
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(', '),
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    mainEntityOfPage: url,
    url
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Schema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  }
}

/** Ordered list of links (projects, posts, jobs) for listing pages. */
export function itemListSchema(
  name: string,
  items: { name: string; path: string }[]
): Schema {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.path)
    }))
  }
}
