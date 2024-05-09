# @mikeallisonJS/web

This is an NX monorepo for my public npm modules & applications.

Everything is licensed under the MIT license, so feel free to use any of this for your own development as you see fit. Likewise, feel free to fork, add issues or pull requests, and throw me star if you find it useful.

## Included applications

- [mikeallisonJS](https://mikeallisonjs.com) [(source)](packages/mikeallisonjs.com)
- [Captain](https://captainofbass.com) [(source)](packages/captainofbass.com/)
- [Captain's Sounds](https://captainssounds.com) [(source)](packages/captainofbass.com/)
- [SLTDNB](https://sltdnb.com) [(source)](packages/sltdnb.com)

## Tech stack

- Monorepo: [Nx](https://nx.dev)
- Framework: [Next.js](https://nextjs.org)
- Package Manager: [bun](https://bun.sh)
- Deployment: [Vercel](https://vercel.com)
- Database: [Postgres on Vercel](https://vercel.com)
- ORM: [Drizzle](https://orm.drizzle.team)
- IDE: [VSCode with devcontainers](https://code.visualstudio.com)
- eCommerce Backend: [Shopify](https://shopify.com) & [Gumroad](https://gumroad.com)
- Styles: [Tailwind](https://tailwindcss.com)
- Components: [ShadCN](https://ui.shadcn.com)
- Analytics: [Posthog](https://posthog.com)
- Logging: [Sentry](https://sentry.io)
- Authentication: [Clerk](https://clerk.com)

## Getting started

Login to vercel (you will need your own account, don't worry it's free to get started)

`vercel login`

Fetch secrets for all projects (you will need to change org_id and project_id in each package project.json)

`sh scripts/fetch-secrets.sh`

Run a project

`nx serve packagename`
