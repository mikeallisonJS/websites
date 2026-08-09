# Context Map

This repo is a pnpm workspace of independent sites and shared packages. Each
workspace package is a bounded context with its own `CONTEXT.md` and
`docs/adr/`. System-wide decisions live in the root `docs/adr/`.

`CONTEXT.md` files are created lazily by `/domain-modeling` as terminology and
decisions actually get pinned down — an unwritten one below is expected, not a gap.

## Contexts

| Context                     | Path                        | What it is                             | `CONTEXT.md` |
| --------------------------- | --------------------------- | -------------------------------------- | ------------ |
| mikeallisonjs.com           | `apps/mikeallisonjs.com`    | Personal site (Next.js)                | not yet      |
| sltdnb.com                  | `apps/sltdnb.com`           | SLT DNB site (Next.js)                 | not yet      |
| captainofbass.com           | `apps/captainofbass.com`    | Captain of Bass site (Next.js)         | not yet      |
| ui                          | `packages/ui`               | Shared UI primitives                   | not yet      |
| shared-react-components     | `packages/shared-react-components` | Shared React components         | not yet      |
| eslint-config               | `packages/eslint-config`    | Shared lint config                     | not yet      |
| typescript-config           | `packages/typescript-config`| Shared tsconfig bases                  | not yet      |

See `docs/agents/domain.md` for how agents should read these.
