import Link from 'next/link'

import type { Metadata } from 'next'

import { ContentPage } from '@/components/content-page'
import { JsonLd } from '@/components/structured-data'
import { formatMonth, getAllJobs } from '@/lib/content'
import { breadcrumbSchema, itemListSchema } from '@/lib/schema'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Experience',
  description: `The professional career history of ${site.author} — roles, employers, and what he shipped across 25+ years in software.`,
  alternates: { canonical: '/experience' }
}

export default async function ExperiencePage() {
  const jobs = await getAllJobs()

  return (
    <>
      <JsonLd
        data={itemListSchema(
          'Work experience',
          jobs.map((j) => ({
            name: `${j.role} — ${j.company}`,
            path: `/experience/${j.slug}`
          }))
        )}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Experience', path: '/experience' }
        ])}
      />
      <ContentPage
        eyebrow="Career"
        title="Experience"
        lead="Roles and employers across 25+ years building software."
      >
        <ol className="space-y-3">
          {jobs.map((job) => (
            <li key={job.slug}>
              <Link
                href={`/experience/${job.slug}`}
                className="group flex flex-col gap-1 rounded-xl border border-[color:var(--subtle-gray)] bg-[color:var(--code-canvas)] p-5 transition-colors hover:border-[color:var(--polar-blue)]/40 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
              >
                <div>
                  <h2 className="text-lg font-semibold text-[color:var(--ghost-white)] group-hover:text-[color:var(--polar-blue)]">
                    {job.company}
                  </h2>
                  <p className="text-sm text-[color:var(--ui-gray)]">
                    {job.role}
                  </p>
                </div>
                <p className="shrink-0 font-mono text-xs text-[color:var(--muted-text)]">
                  {formatMonth(job.start)} – {formatMonth(job.end)}
                </p>
              </Link>
            </li>
          ))}
        </ol>
      </ContentPage>
    </>
  )
}
