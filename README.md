# Websites

This is an NX monorepo for my personal websites. Everything is licensed under the MIT license, so feel free to use any of this for your own development as you see fit.

## Included websites

- [mikeallisonJS](mikeallisonjs.com)
- [Captain](captainofbass.com)
- [Captain's Sounds](captainssounds.com)
- [SLTDNB](sltdnb.com)

## Tech stack

- Monorepo: (Nx)[nx.dev]
- Framework: (Next.js)[nextjs.org]
- Package Manager: (pnpm)[pnpm.io]
- Deployment: (Vercel)[vercel.com]
- Database: (Postgres on Vercel)[vercel.com]
- ORM: (Prisma)[prisma.io]
- IDE: (VSCode with devcontainers)[code.visualstudio.com]
- eCommerce Backend: (Shopify)[shopify.com] & (Gumroad)[gumroad.com]

## Getting started

Login to vercel (you will need your own account, don't worry it's free to get started)
`vercel login`

Fetch secrets for all projects (you will need to change org_id and project_id in each package project.json)
`sh scripts/fetch-secrets.sh`

Run a project
`nx serve packagename`
