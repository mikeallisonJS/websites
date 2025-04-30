# Websites

This is a bun monorepo for my personal websites. Everything is licensed under the MIT license, so feel free to use any of this for your own development as you see fit.

## Included websites

- [mikeallisonJS](https://mikeallisonjs.com)
- [Captain](https://captainofbass.com)
- [SLTDNB](https://sltdnb.com)

## Tech stack

- Monorepo: [bun](https://bun.sh)
- Framework: [Next.js](https://nextjs.org)
- Package Manager: [bun](https://bun.sh)
- Deployment: [Vercel](https://vercel.com)
- IDE: [VSCode with devcontainers](https://code.visualstudio.com)
- Styles: [Tailwind](https://tailwindcss.com)
- Components: [ShadCN](https://ui.shadcn.com)
- Analytics: [Posthog](https://posthog.com)
- Logging: [Sentry](https://sentry.io)
- Authentication: [Clerk](https://clerk.com)
- Formatting: [ESLint](https://eslint.org)
- Linting [Prettier](https://prettier.io)

## Getting started

Login to vercel (you will need your own account, don't worry it's free to get started)
`bunx vercel login`

Fetch secrets for all projects (you will need to change org_id and project_id in each package project.json)
`sh scripts/fetch-secrets.sh`

Run an app
`bun dev`
