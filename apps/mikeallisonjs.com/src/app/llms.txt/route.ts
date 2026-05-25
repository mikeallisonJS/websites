import { projects } from '@/lib/agent/projects'
import { formatMonth, getAllJobs, getAllPosts } from '@/lib/content'
import { absoluteUrl, site } from '@/lib/site'

/**
 * /llms.txt — the emerging convention for giving language models a curated,
 * link-rich map of a site. Generated from the same content as the pages so it
 * never drifts. See https://llmstxt.org. The body is built in a cached
 * function so the route prerenders cleanly under `cacheComponents`.
 */
async function render(): Promise<string> {
  'use cache'
  const [jobs, posts] = await Promise.all([getAllJobs(), getAllPosts()])

  const lines = [
    `# ${site.author} — ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    site.tagline,
    '',
    '## Key pages',
    `- [About](${absoluteUrl('/about')}): who Mike is, his expertise, and an FAQ`,
    `- [Resume](${absoluteUrl('/resume')}): full CV — skills, career history, certifications, education`,
    `- [Projects](${absoluteUrl('/projects')}): selected professional and personal work`,
    `- [Experience](${absoluteUrl('/experience')}): detailed employment history`,
    `- [Blog](${absoluteUrl('/blog')}): writing on full-stack engineering and AI`,
    '',
    '## Projects',
    ...projects.map(
      (p) =>
        `- [${p.title}](${absoluteUrl(`/projects/${p.slug}`)}): ${p.description}`
    ),
    '',
    '## Experience',
    ...jobs.map(
      (j) =>
        `- [${j.role} — ${j.company}](${absoluteUrl(`/experience/${j.slug}`)}): ${formatMonth(j.start)} – ${formatMonth(j.end)}`
    ),
    ''
  ]

  if (posts.length > 0) {
    lines.push(
      '## Blog',
      ...posts.map(
        (p) =>
          `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.description}`
      ),
      ''
    )
  }

  lines.push(
    '## Contact',
    `- Email: ${site.email}`,
    `- GitHub: ${site.github}`,
    '',
    '## Full text',
    `- [Complete profile in one file](${absoluteUrl('/llms-full.txt')})`,
    ''
  )

  return lines.join('\n')
}

export async function GET() {
  return new Response(await render(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  })
}
