---
slug: jesusfilm
company: JesusFilm Project (via Cru)
role: Senior Software Engineer
start: 2021-10
end: present
location: Remote
stack: [Next.js, TypeScript, GraphQL, Node.js, Postgres, Prisma, AWS, Terraform, Vercel, Algolia]
---

# JesusFilm — Senior Software Engineer

## What I worked on

A core engineer on the open-source `JesusFilm/core` monorepo since late 2021,
with nearly 1,000 merged pull requests across the platform. The work centers on
the NextSteps visual-journey product (`nextstep.is` and its admin authoring
tool) and the `jesusfilm.org/watch` video library, on top of the federated
GraphQL backend, authentication, and infrastructure that power them. Next.js
(app router) on the front, a federated GraphQL API on the back, deployed to
Vercel and AWS via Terraform.

## Wins

- Drove the migration to a modern, federated GraphQL architecture — stood up
  `api-journeys-modern` and the Hive/Yoga `api-gateway`, and ported the block,
  button, icon, chat, and journey mutations off the legacy graph.
- Migrated the data layer off ArangoDB to Postgres / Prisma, building the
  ArangoDB→BigQuery ETL that kept analytics intact through the cutover.
- Designed the authentication and identity model for the modern API:
  authenticated and anonymous user types, an auth user union, and
  anonymous-journey capture with transfer-on-sign-up.
- Built journey-authoring features in the NextSteps admin — quick-start
  templates, custom-domain support, and AI-assisted translation using the
  OpenRouter AI SDK.
- Wired up analytics and reporting: Plausible journey-stats aggregation and
  Google Sheets event sync/export for non-technical teams.
- Contributed to the JesusFilm Watch video library, including Algolia search
  over the Arclight catalog.
- Modernized the platform's tooling — Terraform→OpenTofu (with Atlantis PR
  automation), Jest→Vitest test migrations, and Node upgrades across the
  monorepo.

## Tech

Next.js, TypeScript, GraphQL (federated — Hive / Yoga), Node.js,
Postgres, Prisma, ArangoDB, BigQuery, Algolia, Firebase Auth, AWS, Terraform /
OpenTofu, Vercel, Vitest.
