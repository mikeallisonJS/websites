# Websites

This is a [Vite+](https://viteplus.dev) monorepo for my personal websites. Everything is licensed under the MIT license, so feel free to use any of this for your own development as you see fit.

## Included websites

- [mikeallisonJS](https://mikeallisonjs.com)
- [Captain](https://captainofbass.com)
- [SLTDNB](https://sltdnb.com)

## Tech stack

- Monorepo: [Vite+](https://viteplus.dev)
- Framework: [Next.js](https://nextjs.org)
- Package Manager: [Vite+](https://viteplus.dev) (delegating to [pnpm](https://pnpm.io))
- Deployment: [Vercel](https://vercel.com)
- IDE: [Cursor](https://cursor.com)
- Styles: [Tailwind](https://tailwindcss.com)
- Components: [ShadCN](https://ui.shadcn.com)
- Analytics: [Posthog](https://posthog.com)
- Logging: [Sentry](https://sentry.io)
- Formatting: [Oxfmt](https://oxc.rs)
- Linting: [Oxlint](https://oxc.rs)

## Getting started

Install the Vite+ CLI (see the [install guide](https://viteplus.dev/guide/) for other platforms)
`curl -fsSL https://viteplus.dev/install.sh | sh`

Install dependencies (Vite+ downloads the pnpm version pinned in `packageManager` for you)
`vp install`

Login to vercel (you will need your own account, don't worry it's free to get started)
`vp dlx vercel login`

Fetch secrets for all projects (you will need to change org_id and project_id in each package project.json)
`sh scripts/fetch-secrets.sh`

Run an app
`vp run dev:mjs`

Optionally install the pre-commit hook, which runs `vp check --fix` on staged files
`vp config`

## Everyday commands

| Command                                  | What it does                                |
| ---------------------------------------- | ------------------------------------------- |
| `vp install`                             | Install dependencies                        |
| `vp run dev:mjs` / `dev:slt` / `dev:cob` | Start one app's Next.js dev server          |
| `vp check`                               | Format check + lint, the same thing CI runs |
| `vp check --fix`                         | Format and auto-fix lint issues             |
| `vp run -r build`                        | Build every app                             |
| `vp add <pkg>` / `vp remove <pkg>`       | Change dependencies                         |

Lint and format settings live in the `lint` and `fmt` blocks of the root `vite.config.ts`.
