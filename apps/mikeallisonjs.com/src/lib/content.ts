import { promises as fs } from 'node:fs'
import path from 'node:path'

/**
 * Server-side content loaders for the crawlable, statically-rendered pages
 * (resume, experience, blog). The agent's runtime corpus lives in
 * `agent/corpus.ts`; this module is the build-time counterpart that turns the
 * same markdown into indexable HTML. Loaders are marked `'use cache'` so they
 * prerender cleanly under Next's `cacheComponents`.
 */
const CONTENT_ROOT = path.join(process.cwd(), 'content')

type Frontmatter = Record<string, string | string[]>

function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
  if (!raw.startsWith('---\n')) return { data: {}, body: raw }
  const end = raw.indexOf('\n---', 4)
  if (end === -1) return { data: {}, body: raw }
  const block = raw.slice(4, end)
  const body = raw.slice(end + 4).replace(/^\n+/, '')
  const data: Frontmatter = {}
  for (const line of block.split('\n')) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!m || !m[1] || m[2] == null) continue
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
    data[m[1]] = value
  }
  return { data, body }
}

function str(v: string | string[] | undefined): string | undefined {
  return typeof v === 'string' ? v : undefined
}

function arr(v: string | string[] | undefined): string[] {
  if (Array.isArray(v)) return v
  if (typeof v === 'string' && v) return [v]
  return []
}

async function listMarkdownSlugs(dir: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(path.join(CONTENT_ROOT, dir))
    return entries
      .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
      .map((f) => f.replace(/\.md$/, ''))
  } catch {
    return []
  }
}

/** Format a frontmatter date like "2016-01" as "Jan 2016". */
export function formatMonth(value?: string): string {
  if (!value || value.toLowerCase() === 'present') return 'Present'
  const [year, month] = value.split('-')
  if (!month) return year ?? value
  const names = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  const idx = Number(month) - 1
  return names[idx] ? `${names[idx]} ${year}` : (year ?? value)
}

// ── Resume ──────────────────────────────────────────────────────────────────

export type ResumeDoc = {
  name: string
  title: string
  location?: string
  focus?: string
  education?: string
  yearsExperience?: string
  body: string
}

export async function getResume(): Promise<ResumeDoc | null> {
  'use cache'
  try {
    const raw = await fs.readFile(path.join(CONTENT_ROOT, 'resume.md'), 'utf8')
    const { data, body } = parseFrontmatter(raw)
    return {
      name: str(data.name) ?? 'Mike Allison',
      title: str(data.title) ?? '',
      location: str(data.location),
      focus: str(data.focus),
      education: str(data.education),
      yearsExperience: str(data.yearsExperience),
      body
    }
  } catch {
    return null
  }
}

// ── Experience (jobs) ─────────────────────────────────────────────────────────

export type JobDoc = {
  slug: string
  company: string
  role: string
  start?: string
  end?: string
  location?: string
  stack: string[]
  body: string
}

async function readJob(slug: string): Promise<JobDoc | null> {
  try {
    const raw = await fs.readFile(
      path.join(CONTENT_ROOT, 'jobs', `${slug}.md`),
      'utf8'
    )
    const { data, body } = parseFrontmatter(raw)
    return {
      slug: str(data.slug) ?? slug,
      company: str(data.company) ?? slug,
      role: str(data.role) ?? '',
      start: str(data.start),
      end: str(data.end),
      location: str(data.location),
      stack: arr(data.stack),
      body
    }
  } catch {
    return null
  }
}

export async function getAllJobs(): Promise<JobDoc[]> {
  'use cache'
  const slugs = await listMarkdownSlugs('jobs')
  const records = await Promise.all(slugs.map(readJob))
  return records
    .filter((r): r is JobDoc => r !== null)
    .sort((a, b) => (b.start ?? '').localeCompare(a.start ?? ''))
}

export async function getJobDoc(slug: string): Promise<JobDoc | null> {
  'use cache'
  if (!/^[a-z0-9-]+$/i.test(slug)) return null
  return readJob(slug)
}

// ── Blog ──────────────────────────────────────────────────────────────────────

export type BlogMeta = {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
}

export type BlogPost = BlogMeta & { body: string }

async function readPost(slug: string): Promise<BlogPost | null> {
  try {
    const raw = await fs.readFile(
      path.join(CONTENT_ROOT, 'blog', `${slug}.md`),
      'utf8'
    )
    const { data, body } = parseFrontmatter(raw)
    return {
      slug: str(data.slug) ?? slug,
      title: str(data.title) ?? slug,
      description: str(data.description) ?? '',
      date: str(data.date) ?? '',
      tags: arr(data.tags),
      body
    }
  } catch {
    return null
  }
}

export async function getAllPosts(): Promise<BlogMeta[]> {
  'use cache'
  const slugs = await listMarkdownSlugs('blog')
  const posts = await Promise.all(slugs.map(readPost))
  return posts
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(({ slug, title, description, date, tags }) => ({
      slug,
      title,
      description,
      date,
      tags
    }))
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  'use cache'
  if (!/^[a-z0-9-]+$/i.test(slug)) return null
  return readPost(slug)
}
