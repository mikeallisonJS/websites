import Link from 'next/link'

import type { Metadata } from 'next'

import { ContentPage } from '@/components/content-page'
import { JsonLd } from '@/components/structured-data'
import { projects } from '@/lib/agent/projects'
import { breadcrumbSchema, itemListSchema } from '@/lib/schema'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Projects',
  description: `Selected professional and personal software projects by ${site.author} — Next.js, GraphQL, AWS, and AI-powered products.`,
  alternates: { canonical: '/projects' }
}

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={itemListSchema(
          'Projects',
          projects.map((p) => ({ name: p.title, path: `/projects/${p.slug}` }))
        )}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' }
        ])}
      />
      <ContentPage
        eyebrow="Work"
        title="Projects"
        lead="A selection of professional and personal projects shipped over the years."
      >
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                aria-label={`${project.title} — ${project.description}`}
                className="group flex h-full flex-col gap-3 rounded-xl border border-[color:var(--subtle-gray)] bg-[color:var(--code-canvas)] p-5 transition-colors hover:border-[color:var(--polar-blue)]/40"
              >
                <h2 className="text-lg font-semibold text-[color:var(--ghost-white)] group-hover:text-[color:var(--polar-blue)]">
                  {project.title}
                </h2>
                <p className="text-sm leading-relaxed text-[color:var(--ui-gray)]">
                  {project.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[color:var(--subtle-gray)] bg-white/[0.03] px-2.5 py-0.5 font-mono text-[11px] text-[color:var(--cosmic-violet)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </ContentPage>
    </>
  )
}
