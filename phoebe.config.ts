// Phoebe tenant config for mikeallisonJS/websites.
//
// Phoebe (https://github.com/JesusFilm/phoebe) picks up issues labelled
// `ready-for-agent`, works each one on a `phoebe/` branch in its own clone, runs
// the gates below, and opens a PR. This repo is one tenant of a Phoebe
// workspace: the workspace root discovers this file and runs the shared engine
// in its container. This file names only what is specific to this repo.
//
// No import on purpose: the container loads this file from a mount with no
// node_modules, and this repo has no `phoebe-agent` dependency. The fields are
// `PhoebeUserConfig` from phoebe-agent (docs/configuration.md).
//
// Secrets live in the gitignored `.env` beside this file (see .env.example):
// GH_TOKEN, a fine-grained PAT for this repo, and ANTHROPIC_AUTH_TOKEN, the
// provider key. The workspace image sends Claude Code through a shared proxy
// when that key is the one it is given.
//
// Gates from AGENTS.md and lint.yml. There are no tests, so the test gate is
// a no-op.

const config = {
  repoSlug: 'mikeallisonJS/websites',
  repoUrl: 'https://github.com/mikeallisonJS/websites.git',
  installCommand: 'vp install --frozen-lockfile',
  checkCommand: 'vp check',
  testCommand: 'true',
  readyCommand: 'vp check',
  defaultProvider: 'claude',
  providerEnv: { claude: 'ANTHROPIC_AUTH_TOKEN' }
}

export default config
