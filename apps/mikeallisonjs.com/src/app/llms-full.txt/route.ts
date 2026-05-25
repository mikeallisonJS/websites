import { projects } from '@/lib/agent/projects'
import { formatMonth, getAllJobs, getAllPosts, getPost, getResume } from '@/lib/content'
import { site } from '@/lib/site'

/**
 * /llms-full.txt — the entire profile as a single plain-text document, so a
 * model can ingest everything about Mike in one fetch without crawling. Built
 * in a cached function so the route prerenders under `cacheComponents`.
 */
async function render(): Promise<string> {
  'use cache'
  const [resume, jobs, posts] = await Promise.all([
    getResume(),
    getAllJobs(),
    getAllPosts()
  ])

  const parts: string[] = [`# ${site.author}`, '', `> ${site.description}`, '']

  if (resume) {
    parts.push(resume.body.replace(/^#\s+.*\n+/, ''), '')
  }

  parts.push('---', '', '# Projects', '')
  for (const p of projects) {
    parts.push(
      `## ${p.title}`,
      '',
      p.details ?? p.description,
      '',
      `- Website: ${p.websiteUrl}`,
      ...(p.githubUrl ? [`- Source: ${p.githubUrl}`] : []),
      `- Stack: ${p.stack.map((s) => s.replace(/^Brand/, '')).join(', ')}`,
      ''
    )
  }

  parts.push('---', '', '# Experience', '')
  for (const j of jobs) {
    parts.push(
      `## ${j.company} — ${j.role} (${formatMonth(j.start)} – ${formatMonth(j.end)})`,
      '',
      j.body.replace(/^#\s+.*\n+/, ''),
      ''
    )
  }

  if (posts.length > 0) {
    parts.push('---', '', '# Blog', '')
    for (const meta of posts) {
      const post = await getPost(meta.slug)
      if (post) {
        parts.push(post.body.replace(/^#\s+.*\n+/, ''), '')
      }
    }
  }

  parts.push('---', '', '# Contact', '', `- Email: ${site.email}`, `- GitHub: ${site.github}`, '')

  return parts.join('\n')
}

export async function GET() {
  return new Response(await render(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  })
}
