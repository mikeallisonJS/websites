import {
  IconBrandAlgolia,
  IconBrandAngular,
  IconBrandAws,
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandGraphql,
  IconBrandGumroad,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandReact,
  IconBrandTerraform,
  IconBrandTypescript,
  IconBrandVercel,
  IconBrandWordpress,
  IconCoffee,
  IconDiamond,
  IconExternalLink,
  IconFlame
} from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

import type { ComponentType } from 'react'

import { projects, type ProjectData } from '@/lib/agent/projects'

const iconMap: Record<string, ComponentType<{ size?: number }>> = {
  BrandAlgolia: IconBrandAlgolia,
  BrandAngular: IconBrandAngular,
  BrandAws: IconBrandAws,
  BrandGoogle: IconBrandGoogle,
  BrandGraphql: IconBrandGraphql,
  BrandGumroad: IconBrandGumroad,
  BrandNextjs: IconBrandNextjs,
  BrandNodejs: IconBrandNodejs,
  BrandReact: IconBrandReact,
  BrandTerraform: IconBrandTerraform,
  BrandTypescript: IconBrandTypescript,
  BrandVercel: IconBrandVercel,
  BrandWordpress: IconBrandWordpress,
  Coffee: IconCoffee,
  Diamond: IconDiamond,
  Hono: IconFlame
}

function StackIcons({ stack }: { stack: string[] }) {
  return (
    <>
      {stack.map((name) => {
        const Icon = iconMap[name]
        if (!Icon) return null
        return <Icon key={name} size={18} />
      })}
    </>
  )
}

function ProjectCard({ project }: { project: ProjectData }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-[#3d4248] bg-[#1e2226] shadow-md transition-all duration-300 hover:border-[#3daee9]/40 hover:shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
      {/* Preview image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--deep-space)] via-[color:var(--deep-space)]/20 to-transparent opacity-90" />

        {/* Hover action buttons */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-[color:var(--deep-space)]/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          {project.websiteUrl && (
            <Link
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-[color:var(--spring-green)] px-4 py-2 font-mono text-xs font-medium text-white shadow-[0_0_20px_-4px_rgba(8,135,43,0.6)] transition-transform hover:scale-105"
            >
              <IconExternalLink size={14} />
              visit
            </Link>
          )}
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-[color:var(--subtle-gray)] bg-black/50 px-4 py-2 font-mono text-xs font-medium text-[color:var(--polar-blue)] transition-colors hover:border-[color:var(--polar-blue)]/60"
            >
              <IconBrandGithub size={14} />
              source
            </Link>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-[color:var(--ghost-white)]">
            {project.title}
          </h3>
          <div className="flex items-center gap-1.5 text-[color:var(--ui-gray)]">
            <StackIcons stack={project.stack} />
          </div>
        </div>
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
      </div>
    </article>
  )
}

export function Portfolio() {
  return (
    <div className="container mx-auto max-w-7xl px-4 md:px-6">
      <header className="mb-6 flex flex-col items-start gap-3">
        <p className="max-w-2xl text-base text-[color:var(--ui-gray)] md:text-lg">
          A selection of professional and personal projects shipped over the
          years.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}
