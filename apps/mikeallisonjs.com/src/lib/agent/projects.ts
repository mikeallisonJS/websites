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
    githubUrl: 'https://github.com/pbmtv',
    stack: ['BrandReact', 'BrandNodejs', 'BrandWordpress'],
    tags: ['react', 'wordpress', 'video'],
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
    slug: 'pathblazer',
    title: 'PathBlazer',
    description:
      "CompassLearning's adaptive K-8 reading & math intervention program.",
    image: '/images/pathblazer.png',
    websiteUrl: 'https://www.imaginelearning.com/products/pathblazer/',
    stack: ['BrandAngular', 'BrandNodejs'],
    tags: ['angular', 'edtech', 'intervention'],
    details:
      "CompassLearning's flagship K-8 reading and math intervention program (now part of Imagine Learning). An adaptive screener and proficiency diagnostic pinpoint each student's gaps, then prescribe an individualized, standards-based path of interactive lessons, with progress-monitoring reports for teachers. Mike owned the complete front-end of the 2.0 rewrite — an AngularJS single-page app — architected its Webpack build pipeline, and migrated the codebase from Angular 1.2 MVC to 1.5 component conventions. The program was an EDDIE Award–winning intervention solution."
  },
  {
    slug: 'goquest',
    title: 'GoQuest',
    description:
      "CompassLearning's project-based, inquiry-driven learning tool.",
    image: '/images/goquest.png',
    stack: ['BrandCsharp', 'Database'],
    tags: ['dotnet', 'edtech', 'project-based'],
    details:
      'CompassLearning\'s differentiation and project-based learning tool. GoQuest profiles each student\'s interests and learning preferences with the embedded Renzulli Profiler®, then matches them against a library of 40,000+ vetted, standards-aligned resources so teachers can assign individualized inquiry projects. Built as an ASP.NET MVC / C# application (codename "Renzulli") on the shared CompassLearning core platform.'
  },
  {
    slug: 'compass-core',
    title: 'CompassLearning Core',
    description:
      "The shared Web API platform powering CompassLearning's K-12 products.",
    image: '/images/compass.png',
    stack: ['BrandCsharp', 'Database'],
    tags: ['dotnet', 'api', 'edtech'],
    details:
      "The shared ASP.NET Web API platform behind CompassLearning's K-12 products — the services layer that PathBlazer, GoQuest, and the intervention screener all run on. It sits on top of Agilix's XLI / DLAP LMS for multi-tenant accounts, courses, and enrollments, and ties together a data warehouse for student performance and persistence analytics, Salesforce for district provisioning, a batch-job queue for long-running processes, external-assessment services, and SignalR for real-time updates."
  },
  {
    slug: 'buzz',
    title: 'Buzz',
    description: "Agilix's flagship K-12 learning management system.",
    image: '/images/buzz.png',
    websiteUrl: 'https://www.agilix.com/products/buzz',
    stack: ['BrandAngular', 'BrandNodejs', 'Coffee'],
    tags: ['angular', 'lms', 'edtech'],
    details:
      "Agilix's flagship learning management system — a configurable, white-label LMS for blended, virtual, and mastery-based K-12 programs, with personalized learning paths, analytics, and standards-based integrations (LTI, OneRoster). An AngularJS application (CoffeeScript, Node tooling) built on the xli-ng framework over Agilix's DLAP API."
  },
  {
    slug: 'hive',
    title: 'Hive',
    description:
      'A distributed online/offline high-stakes assessment platform.',
    image: '/images/hive.png',
    stack: ['BrandAngular', 'BrandNodejs', 'Database'],
    tags: ['angular', 'assessment', 'edtech'],
    details:
      "A platform for delivering high-stakes assessments across browser, tablet, and locked-down desktop (Node-Webkit + Safe Exam Browser). Separate student, proctor, and admin apps on a MEAN-style stack (MongoDB, Express, AngularJS, Node) backed by a Java assessment server — students can keep testing offline and sync when they reconnect. Mike led the front-end across all three apps."
  },
  {
    slug: 'xli-ng',
    title: 'xli-ng',
    description: 'The AngularJS framework Agilix applications are built on.',
    image: '/images/xli-ng.png',
    stack: ['BrandAngular', 'Coffee'],
    tags: ['angular', 'framework', 'library'],
    details:
      "Agilix's core AngularJS library for building xLi / DLAP applications — the shared framework underpinning Buzz, Hive, and partner apps. Mike contributed core framework features and built out its accessibility support."
  },
  {
    slug: 'contraxx',
    title: 'Contraxx',
    description:
      "Enterprise contract lifecycle management (CLM) — Ecteon's flagship platform.",
    image: '/images/contraxx.png',
    websiteUrl: 'https://ecteon.com',
    stack: ['BrandCsharp', 'BrandWindows', 'Database'],
    tags: ['dotnet', 'clm', 'enterprise'],
    details:
      "Ecteon's flagship product — a contract lifecycle management (CLM) platform for enterprises with complex contracting requirements. Mike ported the original Delphi / Win32 client to a layered .NET architecture (C# and VB.NET) and built the web application that mirrored and then expanded on it: ASP.NET (WebForms, later MVC / Web API) over SQL Server and Oracle, with a custom serializable data layer, DocuSign e-signatures, SAML single sign-on, and a security model meeting OWASP / HIPAA / HITECH requirements."
  },
  {
    slug: 'client-support',
    title: '24/7 Client Support Tool',
    description:
      "WebMD's self-service support portal for healthcare clients.",
    image: '/images/client-support.png',
    stack: ['BrandCsharp', 'Database'],
    tags: ['dotnet', 'healthcare', 'support'],
    details:
      "The flagship customer-facing product at WebMD's healthcare-transaction business — a 24/7 self-service portal where clients could open support requests, search claim and remittance error codes, retrieve electronic remittance advice (ERA), manage account options, and browse FAQs and documents. Built in ASP.NET / C# on SQL Server. Mike led the development effort that scaled it from 5,000 to 50,000 users."
  },
  {
    slug: 'noah',
    title: 'NOAH',
    description: "WebMD's internal CRM for sales and account management.",
    image: '/images/noah.png',
    stack: ['BrandCsharp', 'Database'],
    tags: ['dotnet', 'crm', 'healthcare'],
    details:
      "WebMD's internal CRM — a sales and account-management application with tree-based navigation, filtering, Excel export, and a charting reports module, backed by Windows services that processed client enrollment files. Built in ASP.NET / C# on SQL Server."
  },
  {
    slug: 'wire',
    title: 'WIRE',
    description: 'An internal staff portal at WebMD.',
    image: '/images/wire.png',
    stack: ['BrandCsharp', 'Database'],
    tags: ['dotnet', 'healthcare', 'portal'],
    details:
      "An internal ASP.NET / C# portal at WebMD that pulled together reports, shared resources, and scheduled (timed) events for staff behind a single front door."
  },
  {
    slug: 'online-enrollment',
    title: 'Online Enrollment',
    description: "WebMD's online provider-enrollment application.",
    image: '/images/online-enrollment.png',
    stack: ['Diamond', 'Database'],
    tags: ['ruby', 'rails', 'healthcare'],
    details:
      "WebMD's online enrollment application — moving healthcare provider and client enrollment off paper and into a self-service web flow. One of the company's early Ruby on Rails applications."
  },
  {
    slug: 'nashville-post',
    title: 'NashvillePost',
    description: 'A Nashville business-news publication.',
    image: '/images/nashville-post.png',
    stack: ['Perl', 'Database'],
    tags: ['perl', 'news', 'cms'],
    details:
      "An online business-news publication for Nashville, built at Duthie (DAI) — one of Mike's first professional builds. Article publishing and content delivery on a Perl codebase, with commerce (subscriptions and listings) running on the InterShop platform."
  },
  {
    slug: 'ame-church',
    title: 'AME Church',
    description:
      'Official website and Pastors Reporting System for the AME Church.',
    image: '/images/ame-church.png',
    stack: ['BrandPhp', 'Database'],
    tags: ['php', 'database', 'nonprofit'],
    details:
      'The official website for the African Methodist Episcopal Church, plus a database-backed Pastors Reporting System that let pastors submit congregation reports online. Built in PHP against a relational database — a content site fronting a real reporting application.'
  },
  {
    slug: 'stinger-configurator',
    title: 'Stinger Online Configurator',
    description: 'A browser-based product configurator.',
    image: '/images/stinger-configurator.png',
    stack: ['ASP', 'BrandWindows'],
    tags: ['asp', 'configurator', 'ecommerce'],
    details:
      "An online configurator that let customers build a product from interchangeable parts — choosing bases and heads and seeing each combination rendered from a photo library in real time. Built in classic ASP."
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
