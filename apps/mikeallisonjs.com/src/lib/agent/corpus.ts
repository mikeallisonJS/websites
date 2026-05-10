import { promises as fs } from 'node:fs'
import path from 'node:path'

const CONTENT_ROOT = path.join(process.cwd(), 'content')

export type JobSummary = {
  slug: string
  company: string
  role: string
  start?: string
  end?: string
}

export type JobRecord = JobSummary & {
  frontmatter: Record<string, unknown>
  body: string
}

function parseFrontmatter(raw: string): {
  data: Record<string, unknown>
  body: string
} {
  if (!raw.startsWith('---\n')) return { data: {}, body: raw }
  const end = raw.indexOf('\n---', 4)
  if (end === -1) return { data: {}, body: raw }
  const block = raw.slice(4, end)
  const body = raw.slice(end + 4).replace(/^\n/, '')
  const data: Record<string, unknown> = {}
  for (const line of block.split('\n')) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!m || !m[1] || m[2] == null) continue
    const key = m[1]
    let value: string | string[] = m[2].trim()
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    } else if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    data[key] = value
  }
  return { data, body }
}

async function readJobFile(slug: string): Promise<JobRecord | null> {
  const file = path.join(CONTENT_ROOT, 'jobs', `${slug}.md`)
  try {
    const raw = await fs.readFile(file, 'utf8')
    const { data, body } = parseFrontmatter(raw)
    return {
      slug: typeof data.slug === 'string' ? data.slug : slug,
      company: typeof data.company === 'string' ? data.company : slug,
      role: typeof data.role === 'string' ? data.role : '',
      start: typeof data.start === 'string' ? data.start : undefined,
      end: typeof data.end === 'string' ? data.end : undefined,
      frontmatter: data,
      body
    }
  } catch {
    return null
  }
}

export async function listJobs(): Promise<JobSummary[]> {
  const dir = path.join(CONTENT_ROOT, 'jobs')
  let entries: string[]
  try {
    entries = await fs.readdir(dir)
  } catch {
    return []
  }
  const slugs = entries
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .map((f) => f.replace(/\.md$/, ''))
  const records = await Promise.all(slugs.map((s) => readJobFile(s)))
  return records
    .filter((r): r is JobRecord => r !== null)
    .map(({ slug, company, role, start, end }) => ({
      slug,
      company,
      role,
      start,
      end
    }))
}

export async function getJob(slug: string): Promise<JobRecord | null> {
  if (!/^[a-z0-9-]+$/i.test(slug)) return null
  return readJobFile(slug)
}

export async function readResume(): Promise<string | null> {
  const file = path.join(CONTENT_ROOT, 'resume.md')
  try {
    return await fs.readFile(file, 'utf8')
  } catch {
    return null
  }
}

export async function searchCorpus(
  query: string
): Promise<
  Array<{ source: string; slug: string; snippet: string; score: number }>
> {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const terms = q.split(/\s+/).filter((t) => t.length > 1)
  if (terms.length === 0) return []

  const { projects } = await import('./projects')
  const results: Array<{
    source: string
    slug: string
    snippet: string
    score: number
  }> = []

  for (const p of projects) {
    const haystack = [
      p.title,
      p.description,
      p.details ?? '',
      p.tags.join(' '),
      p.stack.join(' ')
    ]
      .join('\n')
      .toLowerCase()
    const score = terms.reduce(
      (acc, t) => acc + (haystack.includes(t) ? 1 : 0),
      0
    )
    if (score > 0) {
      results.push({
        source: 'project',
        slug: p.slug,
        snippet: `${p.title} — ${p.description}`,
        score
      })
    }
  }

  const jobs = await listJobs()
  for (const j of jobs) {
    const record = await getJob(j.slug)
    if (!record) continue
    const haystack = [j.company, j.role, record.body].join('\n').toLowerCase()
    const score = terms.reduce(
      (acc, t) => acc + (haystack.includes(t) ? 1 : 0),
      0
    )
    if (score > 0) {
      results.push({
        source: 'job',
        slug: j.slug,
        snippet: `${j.company} — ${j.role}`,
        score
      })
    }
  }

  const resume = await readResume()
  if (resume) {
    const haystack = resume.toLowerCase()
    const score = terms.reduce(
      (acc, t) => acc + (haystack.includes(t) ? 1 : 0),
      0
    )
    if (score > 0) {
      results.push({
        source: 'resume',
        slug: 'resume',
        snippet: 'Top-level resume / CV',
        score
      })
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, 10)
}
