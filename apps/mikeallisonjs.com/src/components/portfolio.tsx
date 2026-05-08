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
  IconExternalLink
} from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

import type { ReactNode } from 'react'

type Project = {
  slug: string
  title: string
  description: string
  image: string
  websiteUrl: string
  githubUrl?: string
  stack: ReactNode
  tags: string[]
}

const projects: Project[] = [
  {
    slug: 'freevstvault',
    title: 'Free VST Vault',
    description: 'An AI-powered audio plugin directory.',
    image: '/images/freevstvault.png',
    websiteUrl: 'https://freevstvault.com/',
    stack: (
      <>
        <IconBrandNextjs size={18} />
        <IconBrandNodejs size={18} />
        <IconBrandTypescript size={18} />
        <IconBrandVercel size={18} />
        <IconBrandGoogle size={18} />
      </>
    ),
    tags: ['next', 'ai', 'vercel']
  },
  {
    slug: 'nextsteps',
    title: 'NextSteps',
    description:
      'A Next.js site connecting visitors to Jesusfilm content through engaging visual journeys.',
    image: '/images/nextsteps.jpeg',
    websiteUrl: 'https://nextstep.is/',
    githubUrl: 'https://github.com/JesusFilm/core',
    stack: (
      <>
        <IconBrandNextjs size={18} />
        <IconBrandNodejs size={18} />
        <IconBrandGraphql size={18} />
        <IconBrandTypescript size={18} />
        <IconBrandVercel size={18} />
        <IconBrandTerraform size={18} />
      </>
    ),
    tags: ['next', 'graphql', 'terraform']
  },
  {
    slug: 'nextsteps-admin',
    title: 'NextSteps Admin',
    description:
      'Empowering content managers to author new visual journeys for visitors.',
    image: '/images/nextsteps-admin.jpeg',
    websiteUrl: 'https://admin.nextstep.is/',
    githubUrl: 'https://github.com/JesusFilm/core',
    stack: (
      <>
        <IconBrandNextjs size={18} />
        <IconBrandNodejs size={18} />
        <IconBrandGraphql size={18} />
        <IconBrandTypescript size={18} />
        <IconBrandAws size={18} />
        <IconBrandTerraform size={18} />
      </>
    ),
    tags: ['next', 'aws', 'graphql']
  },
  {
    slug: 'jfm-watch',
    title: 'Jesusfilm Watch',
    description:
      'Showcasing Jesusfilm videos in an easy-to-use, AI-searchable content library.',
    image: '/images/jfm-watch.png',
    websiteUrl: 'https://jesusfilm.org/watch',
    githubUrl: 'https://github.com/JesusFilm/core',
    stack: (
      <>
        <IconBrandNextjs size={18} />
        <IconBrandNodejs size={18} />
        <IconBrandGraphql size={18} />
        <IconBrandTypescript size={18} />
        <IconBrandVercel size={18} />
        <IconBrandAlgolia size={18} />
      </>
    ),
    tags: ['next', 'algolia', 'video']
  },
  {
    slug: 'captainssounds',
    title: "Captain's Sounds",
    description: 'A Next.js eCommerce site for music production.',
    image: '/images/captainssounds.jpeg',
    websiteUrl: 'https://captainssounds.com',
    stack: (
      <>
        <IconBrandNextjs size={18} />
        <IconBrandGraphql size={18} />
        <IconBrandTypescript size={18} />
        <IconBrandVercel size={18} />
        <IconBrandGumroad size={18} />
        <IconBrandGoogle size={18} />
      </>
    ),
    tags: ['next', 'ecommerce', 'audio']
  },
  {
    slug: 'captainofbass',
    title: 'captainofbass.com',
    description: 'A Next.js site for music artist Captain (my music project).',
    image: '/images/captainofbass.png',
    websiteUrl: 'https://captainofbass.com',
    githubUrl: 'https://github.com/mikeallisonJS/websites',
    stack: (
      <>
        <IconBrandNextjs size={18} />
        <IconBrandTypescript size={18} />
        <IconBrandVercel size={18} />
      </>
    ),
    tags: ['next', 'music']
  },
  {
    slug: 'pbmtv',
    title: 'PBMTV',
    description:
      'Public Broadcasting Music Television — a non-profit broadcast network.',
    image: '/images/pbmtv.png',
    websiteUrl: 'https://pbmtv.org',
    stack: (
      <>
        <IconBrandReact size={18} />
        <IconBrandNodejs size={18} />
        <IconBrandWordpress size={18} />
      </>
    ),
    tags: ['react', 'wordpress']
  },
  {
    slug: 'mpdx',
    title: 'MPDX',
    description: 'An open-source solution for fundraising and donor management.',
    image: '/images/mpdx.png',
    websiteUrl: 'https://mpdx.org',
    githubUrl: 'https://github.com/CruGlobal/mpdx-react',
    stack: (
      <>
        <IconBrandAngular size={18} />
        <IconDiamond size={18} />
      </>
    ),
    tags: ['angular', 'ruby', 'oss']
  },
  {
    slug: 'compass',
    title: 'Compass Learning',
    description: 'Nationwide online learning platforms for K-12 students.',
    image: '/images/compass.png',
    websiteUrl: 'https://edgenuity.com',
    stack: (
      <>
        <IconBrandAngular size={18} />
      </>
    ),
    tags: ['angular', 'edtech']
  },
  {
    slug: 'agilix',
    title: 'Agilix',
    description:
      'Online learning platform powering countless learning and test-taking solutions.',
    image: '/images/agilix.png',
    websiteUrl: 'https://agilix.com',
    stack: (
      <>
        <IconBrandAngular size={18} />
        <IconBrandNodejs size={18} />
        <IconCoffee size={18} />
      </>
    ),
    tags: ['angular', 'java', 'edtech']
  }
]

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-[color:var(--subtle-gray)] bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-[color:var(--cosmic-violet)]/50 hover:bg-white/[0.05] hover:shadow-[0_0_40px_-12px_rgba(140,147,251,0.4)]">
      {/* Code editor titlebar */}
      <div className="flex items-center gap-2 border-b border-[color:var(--subtle-gray)] bg-black/30 px-4 py-2.5 font-mono text-xs">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--subtle-gray)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--subtle-gray)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--subtle-gray)]" />
        </div>
        <span className="ml-2 truncate text-[color:var(--ui-gray)]">
          {project.slug}
          <span className="text-[color:var(--muted-text)]">.tsx</span>
        </span>
      </div>

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
          <Link
            href={project.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-[color:var(--spring-green)] px-4 py-2 font-mono text-xs font-medium text-white shadow-[0_0_20px_-4px_rgba(8,135,43,0.6)] transition-transform hover:scale-105"
          >
            <IconExternalLink size={14} />
            visit
          </Link>
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
            {project.stack}
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
      <header className="mb-12 flex flex-col items-start gap-3">
        <div className="flex items-center gap-2 font-mono text-xs text-[color:var(--ui-gray)]">
          <span className="text-[color:var(--neon-green)]">$</span>
          <span>ls ./projects</span>
          <span className="text-[color:var(--muted-text)]">
            — {projects.length} entries
          </span>
        </div>
        <h2 className="text-4xl font-semibold tracking-tight text-[color:var(--ghost-white)] sm:text-5xl md:text-6xl">
          Portfolio
        </h2>
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
