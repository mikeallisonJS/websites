import { IconBrandGithub, IconExternalLink } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import type { Metadata } from 'next'

import { ContentPage } from '@/components/content-page'
import { JsonLd } from '@/components/structured-data'
import { getProject, projects } from '@/lib/agent/projects'
import { breadcrumbSchema, projectSchema } from '@/lib/schema'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.details ?? project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.image }]
    }
  }
}

export default async function ProjectPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  return (
    <>
      <JsonLd data={projectSchema(project)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
          { name: project.title, path: `/projects/${project.slug}` }
        ])}
      />
      <ContentPage
        breadcrumb={{ href: '/projects', label: 'All projects' }}
        eyebrow="Project"
        title={project.title}
        lead={project.description}
      >
        <div className="relative mb-8 aspect-[16/10] overflow-hidden rounded-xl border border-[color:var(--subtle-gray)]">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(min-width: 768px) 48rem, 100vw"
            className="object-cover"
          />
        </div>

        {project.details && (
          <p className="my-4 text-[15px] leading-relaxed text-[color:var(--ui-gray)] md:text-base">
            {project.details}
          </p>
        )}

        <h2 className="mt-8 mb-3 text-sm font-semibold uppercase tracking-wider text-[color:var(--ui-gray)]">
          Stack
        </h2>
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-[color:var(--subtle-gray)] bg-white/[0.03] px-3 py-1 font-mono text-xs text-[color:var(--cosmic-violet)]"
            >
              {tech.replace(/^Brand/, '')}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3 font-mono text-sm">
          {project.websiteUrl && (
            <Link
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit the ${project.title} site (opens in a new tab)`}
              className="inline-flex items-center gap-2 rounded-md bg-[color:var(--spring-green)] px-4 py-2 font-medium text-white transition-transform hover:scale-105"
            >
              <IconExternalLink size={16} /> Visit site
            </Link>
          )}
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code on GitHub (opens in a new tab)`}
              className="inline-flex items-center gap-2 rounded-md border border-[color:var(--subtle-gray)] px-4 py-2 text-[color:var(--polar-blue)] transition-colors hover:border-[color:var(--polar-blue)]/50"
            >
              <IconBrandGithub size={16} /> Source
            </Link>
          )}
        </div>
      </ContentPage>
    </>
  )
}
