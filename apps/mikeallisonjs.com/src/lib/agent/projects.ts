export type ProjectData = {
  slug: string
  title: string
  description: string
  image: string
  /** Public site. Omitted for private / access-controlled projects. */
  websiteUrl?: string
  githubUrl?: string
  stack: string[]
  tags: string[]
  details?: string
}

export const projects: ProjectData[] = [
  {
    slug: 'nexus',
    title: 'Nexus',
    description: "The admin platform for Jesusfilm's global video catalog.",
    image: '/images/nexus.png',
    githubUrl: 'https://github.com/JesusFilm/core',
    stack: ['BrandNextjs', 'BrandNodejs', 'BrandGraphql', 'BrandTypescript', 'BrandVercel'],
    tags: ['next', 'graphql', 'cms'],
    details:
      "Nexus is Jesusfilm's internal content-administration platform for its global film catalog — the tool content managers use to curate everything that flows out to jesusfilm.org/watch and the Arclight media APIs. Built with Next.js (app router) and Material UI on a federated GraphQL backend (Apollo Client), it manages video metadata, descriptions, images, Bible citations, study questions, audio tracks, editions, and child collections, with granular publishing and view/download access controls. Localized into multiple languages and deployed on Vercel."
  },
  {
    slug: 'arclight',
    title: 'Arclight',
    description:
      "Jesusfilm's media-distribution API — its global film catalog served to partners and apps.",
    image: '/images/arclight.png',
    websiteUrl: 'https://arclight.org',
    githubUrl: 'https://github.com/JesusFilm/core',
    stack: ['Hono', 'BrandNodejs', 'BrandGraphql', 'BrandTypescript', 'BrandAws', 'BrandTerraform'],
    tags: ['hono', 'api', 'aws'],
    details:
      "Arclight is Jesusfilm's media-distribution API — the public interface that serves its global film and video catalog, plus embeddable players, to third-party partners, apps, and websites. It exposes the same catalog Nexus administers and Jesusfilm Watch consumes. Built as a versioned (v2) Hono API over the federated GraphQL media backend, containerized with Docker and deployed to AWS (ECS) via Terraform."
  },
  {
    slug: 'nextsteps',
    title: 'NextSteps',
    description:
      'A Next.js site connecting visitors to Jesusfilm content through engaging visual journeys.',
    image: '/images/nextsteps.jpeg',
    websiteUrl: 'https://nextstep.is/',
    githubUrl: 'https://github.com/JesusFilm/core',
    stack: ['BrandNextjs', 'BrandNodejs', 'BrandGraphql', 'BrandTypescript', 'BrandVercel', 'BrandTerraform'],
    tags: ['next', 'graphql', 'terraform'],
    details:
      'Built with the JesusFilm engineering team inside the Cru / JesusFilm "core" monorepo. Frontend Next.js app delivering interactive visual journeys served from a federated GraphQL backend. Infra defined in Terraform, deployed to Vercel.'
  },
  {
    slug: 'nextsteps-admin',
    title: 'NextSteps Admin',
    description:
      'Empowering content managers to author new visual journeys for visitors.',
    image: '/images/nextsteps-admin.jpeg',
    websiteUrl: 'https://admin.nextstep.is/',
    githubUrl: 'https://github.com/JesusFilm/core',
    stack: ['BrandNextjs', 'BrandNodejs', 'BrandGraphql', 'BrandTypescript', 'BrandAws', 'BrandTerraform'],
    tags: ['next', 'aws', 'graphql'],
    details:
      'Companion CMS to NextSteps. Drag-and-drop journey editor that lets non-technical content managers author the visual journeys that ship to nextstep.is. Backed by GraphQL APIs, deployed to AWS via Terraform.'
  },
  {
    slug: 'jfm-watch',
    title: 'Jesusfilm Watch',
    description:
      'Showcasing Jesusfilm videos in an easy-to-use, AI-searchable content library.',
    image: '/images/jfm-watch.png',
    websiteUrl: 'https://jesusfilm.org/watch',
    githubUrl: 'https://github.com/JesusFilm/core',
    stack: ['BrandNextjs', 'BrandNodejs', 'BrandGraphql', 'BrandTypescript', 'BrandVercel', 'BrandAlgolia'],
    tags: ['next', 'algolia', 'video'],
    details:
      'Public-facing video library for the Jesusfilm catalog. Algolia powers the AI/typeahead search; Next.js app router on Vercel serves the experience; metadata flows in over GraphQL.'
  },
  {
    slug: 'core',
    title: 'Core',
    description:
      'The federated GraphQL platform powering the entire Jesusfilm ecosystem.',
    image: '/images/core.png',
    websiteUrl: 'https://docs.core.jesusfilm.org/',
    githubUrl: 'https://github.com/JesusFilm/core',
    stack: ['BrandGraphql', 'BrandNodejs', 'BrandTypescript', 'BrandAws', 'BrandTerraform'],
    tags: ['graphql', 'federation', 'api'],
    details:
      "Jesusfilm Core is the federated GraphQL platform behind the entire Jesusfilm ecosystem — NextSteps, Jesusfilm Watch, Nexus, and Arclight all read from it. A set of NestJS subgraphs (journeys, media, languages, users, analytics) composed behind a GraphQL Hive / Yoga gateway, backed by Prisma and Postgres. Containerized with Docker and deployed to AWS (ECS) via Terraform."
  },
  {
    slug: 'mikeallisonjs',
    title: 'mikeallisonJS.com',
    description:
      'This site — a portfolio fronted by an AI agent that answers questions about my work.',
    image: '/images/mikeallisonjs.png',
    websiteUrl: 'https://mikeallisonjs.com',
    githubUrl: 'https://github.com/mikeallisonJS/websites',
    stack: ['BrandNextjs', 'BrandNodejs', 'BrandTypescript', 'BrandVercel'],
    tags: ['next', 'ai', 'agents'],
    details:
      "The site you're looking at. A Next.js (app router) portfolio whose hero is a streaming AI agent — ask it about Mike's work and it answers from a grounded content corpus through tool calls (Vercel AI SDK + OpenRouter) instead of hallucinating. Tailwind and Framer Motion for the UI, deployed on Vercel, and built for AI discoverability with Schema.org structured data, an llms.txt corpus, and crawlable resume / experience / project pages. Shares a monorepo with captainofbass.com."
  },
  {
    slug: 'freevstvault',
    title: 'Free VST Vault',
    description: 'An AI-powered audio plugin directory.',
    image: '/images/freevstvault.png',
    websiteUrl: 'https://freevstvault.com/',
    stack: ['BrandNextjs', 'BrandNodejs', 'BrandTypescript', 'BrandVercel', 'BrandGoogle'],
    tags: ['next', 'ai', 'vercel'],
    details:
      'A solo project. Indexes free audio plugins (VSTs, AUs, instruments, effects) and surfaces them through AI-assisted search and recommendations. Built on Next.js + Vercel with a Postgres-backed catalog and a crawler that ingests plugin metadata. Uses Google for SSO.'
  },
  {
    slug: 'archimedius',
    title: 'Archimedius',
    description:
      'A cross-platform desktop app that organizes media files by their metadata.',
    image: '/images/archimedius.png',
    githubUrl: 'https://github.com/mikeallisonJS/archimedius',
    stack: ['BrandPython'],
    tags: ['python', 'desktop', 'media'],
    details:
      'A solo project. Point Archimedius at a folder and it recursively scans audio, video, image, and eBook files, extracts their metadata (via TinyTag, with MediaInfo for richer video data), and sorts everything into a clean structure using customizable naming templates. Built in Python with a Tkinter GUI and shipped as native installers for macOS and Windows.'
  },
  {
    slug: 'captainssounds',
    title: "Captain's Sounds",
    description: 'A Next.js eCommerce site for music production.',
    image: '/images/captainssounds.jpeg',
    websiteUrl: 'https://captainssounds.com',
    stack: ['BrandNextjs', 'BrandGraphql', 'BrandTypescript', 'BrandVercel', 'BrandGumroad', 'BrandGoogle'],
    tags: ['next', 'ecommerce', 'audio'],
    details:
      'Solo project. eCommerce for sample packs and music production assets — Gumroad handles fulfillment, Next.js + GraphQL handles browsing and discovery, Google for auth.'
  },
  {
    slug: 'captainofbass',
    title: 'captainofbass.com',
    description: 'A Next.js site for music artist Captain (my music project).',
    image: '/images/captainofbass.png',
    websiteUrl: 'https://captainofbass.com',
    githubUrl: 'https://github.com/mikeallisonJS/websites',
    stack: ['BrandNextjs', 'BrandTypescript', 'BrandVercel'],
    tags: ['next', 'music'],
    details:
      'Personal artist site for Mike\'s music project, "Captain". Lives in the same monorepo as mikeallisonJS.com.'
  },
  {
    slug: 'pbmtv',
    title: 'PBMTV',
    description:
      'Public Broadcasting Music Television — a non-profit broadcast network.',
    image: '/images/pbmtv.png',
    websiteUrl: 'https://pbmtv.org',
    stack: ['BrandReact', 'BrandNodejs', 'BrandWordpress'],
    tags: ['react', 'wordpress', 'streaming'],
    details:
      'Non-profit broadcast network site. React frontend backed by WordPress as a headless CMS, served from a Node.js layer.'
  },
  {
    slug: 'mpdx',
    title: 'MPDX',
    description: 'An open-source solution for fundraising and donor management.',
    image: '/images/mpdx.png',
    websiteUrl: 'https://mpdx.org',
    githubUrl: 'https://github.com/CruGlobal/mpdx-react',
    stack: ['BrandAngular', 'Diamond'],
    tags: ['angular', 'ruby', 'oss'],
    details:
      'Open-source donor-management platform built at Cru Global. Angular frontend on a Ruby on Rails backend. Mike contributed to the React rewrite (mpdx-react) as well.'
  },
  {
    slug: 'compass',
    title: 'CompassLearning',
    description: 'Nationwide online learning platforms for K-12 students.',
    image: '/images/compass.png',
    websiteUrl: 'https://edgenuity.com',
    stack: ['BrandAngular'],
    tags: ['angular', 'edtech'],
    details:
      'Nationwide K-12 online learning platform (since acquired and consolidated under the Edgenuity brand). Angular frontend, large-scale deployment serving public school districts.'
  },
  {
    slug: 'agilix',
    title: 'Agilix',
    description:
      'Online learning platform powering countless learning and test-taking solutions.',
    image: '/images/agilix.png',
    websiteUrl: 'https://agilix.com',
    stack: ['BrandAngular', 'BrandNodejs', 'Coffee'],
    tags: ['angular', 'java', 'edtech'],
    details:
      'White-label LMS / assessment platform. Angular frontend, Node + Java backend services. Powers learning and test-taking experiences for downstream education customers.'
  }
]

export function listProjects() {
  return projects.map(({ slug, title, description, tags }) => ({
    slug,
    title,
    description,
    tags
  }))
}

export function getProject(slug: string): ProjectData | undefined {
  return projects.find((p) => p.slug === slug)
}
