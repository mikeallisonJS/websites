import type { MetadataRoute } from 'next'

import { projects } from '@/lib/agent/projects'
import { getAllJobs, getAllPosts } from '@/lib/content'
import { absoluteUrl, buildTimestamp } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [jobs, posts, now] = await Promise.all([
    getAllJobs(),
    getAllPosts(),
    buildTimestamp()
  ])

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1
    },
    {
      url: absoluteUrl('/about'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9
    },
    {
      url: absoluteUrl('/resume'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9
    },
    {
      url: absoluteUrl('/projects'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: absoluteUrl('/experience'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: absoluteUrl('/blog'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7
    }
  ]

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: absoluteUrl(`/projects/${p.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6
  }))

  const experiencePages: MetadataRoute.Sitemap = jobs.map((j) => ({
    url: absoluteUrl(`/experience/${j.slug}`),
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.5
  }))

  const blogPages: MetadataRoute.Sitemap = posts.map((p) => {
    const parsed = p.date ? new Date(`${p.date}T00:00:00Z`) : null
    return {
      url: absoluteUrl(`/blog/${p.slug}`),
      // Fall back to the build time if the frontmatter date is missing or
      // malformed, so a bad date can't poison the sitemap.
      lastModified: parsed && !Number.isNaN(parsed.getTime()) ? parsed : now,
      changeFrequency: 'monthly',
      priority: 0.7
    }
  })

  return [...staticPages, ...projectPages, ...experiencePages, ...blogPages]
}
