import { notFound } from 'next/navigation'

import type { Metadata } from 'next'

import { ContentPage } from '@/components/content-page'
import { JsonLd } from '@/components/structured-data'
import { formatMonth, getAllJobs, getJobDoc } from '@/lib/content'
import { Markdown } from '@/lib/markdown'
import { breadcrumbSchema, jobSchema } from '@/lib/schema'

export async function generateStaticParams() {
  const jobs = await getAllJobs()
  return jobs.map((j) => ({ slug: j.slug }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const job = await getJobDoc(slug)
  if (!job) return {}
  return {
    title: `${job.role} — ${job.company}`,
    description: `What Mike Allison worked on at ${job.company} as ${job.role} (${formatMonth(job.start)} – ${formatMonth(job.end)}).`,
    alternates: { canonical: `/experience/${job.slug}` }
  }
}

export default async function ExperienceDetailPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const job = await getJobDoc(slug)
  if (!job) notFound()

  const body = job.body.replace(/^#\s+.*\n+/, '')
  const meta = [
    `${formatMonth(job.start)} – ${formatMonth(job.end)}`,
    job.location
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <>
      <JsonLd data={jobSchema(job)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Experience', path: '/experience' },
          { name: job.company, path: `/experience/${job.slug}` }
        ])}
      />
      <ContentPage
        breadcrumb={{ href: '/experience', label: 'All experience' }}
        eyebrow={meta}
        title={job.company}
        lead={job.role}
      >
        {job.stack.length > 0 && (
          <ul className="mb-8 flex flex-wrap gap-2">
            {job.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-[color:var(--subtle-gray)] bg-white/[0.03] px-3 py-1 font-mono text-xs text-[color:var(--cosmic-violet)]"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}
        <Markdown content={body} headingOffset={0} />
      </ContentPage>
    </>
  )
}
