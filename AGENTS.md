<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Built-in Commands vs Scripts

`vp <name>` runs a built-in command. `vp run <name>` runs a `package.json` script or a `vite.config.ts` task. Scripts cannot overwrite built-ins, so `vp dev` and `vp run dev` may do different things. Check `package.json` and `vite.config.ts` first, and run `vp run <name>` when the project defines a script or task with that name.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` to format, lint and type check changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->

## This repo

These are Next.js apps, not Vite apps. `vp dev` and `vp build` are therefore not
used — each app has its own `dev`/`build`/`start` scripts that call `next`:

- `vp run dev:mjs` / `dev:slt` / `dev:cob` — start one app's Next.js dev server
- `vp -C apps/<app> run build` — production build of a single app
- `vp run -r build` — build every app

Lint (Oxlint) and format (Oxfmt) settings live in the `lint` and `fmt` blocks of
the root `vite.config.ts`; there is no ESLint or Prettier config in this repo.
`vp install` delegates to pnpm, pinned by `packageManager` in `package.json`.
