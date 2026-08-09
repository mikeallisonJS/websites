import { defineConfig } from 'vite-plus'

/**
 * Oxlint plugins shared by every package. Replaces the `js.configs.recommended`
 * + `typescript-eslint` + `eslint-plugin-import-x` base of the old
 * `@mikeallisonjs/eslint-config`.
 */
const BASE_PLUGINS = ['typescript', 'oxc', 'unicorn', 'import']

/** Plugins for anything that renders React. */
const REACT_PLUGINS = [...BASE_PLUGINS, 'react', 'jsx-a11y']

/**
 * Rules the old shared config turned on for React code:
 * `eslint-plugin-react-hooks/recommended` and the `jsx-a11y` subset.
 */
const REACT_RULES = {
  'react/rules-of-hooks': 'warn',
  'react/exhaustive-deps': 'warn',
  'jsx_a11y/alt-text': 'warn',
  'jsx_a11y/aria-props': 'warn',
  'jsx_a11y/aria-role': 'warn',
  'jsx_a11y/click-events-have-key-events': 'warn',
  'jsx_a11y/no-noninteractive-element-interactions': 'warn',
  'jsx_a11y/no-static-element-interactions': 'warn'
} as const

const IGNORE_PATTERNS = ['.next/', '.vercel/', 'dist/', 'out/', 'next-env.d.ts']

export default defineConfig({
  lint: {
    ignorePatterns: IGNORE_PATTERNS,
    plugins: BASE_PLUGINS,
    rules: {
      'typescript/no-explicit-any': 'warn'
    },
    overrides: [
      {
        // The Next.js apps.
        files: ['apps/*/**'],
        plugins: [...REACT_PLUGINS, 'nextjs'],
        env: { browser: true, serviceworker: true, node: true },
        rules: {
          ...REACT_RULES,
          'typescript/no-explicit-any': 'warn',
          'nextjs/no-html-link-for-pages': 'warn'
        }
      },
      {
        // Shared React libraries.
        files: ['packages/ui/**', 'packages/shared-react-components/**'],
        plugins: REACT_PLUGINS,
        env: { browser: true, serviceworker: true },
        rules: {
          ...REACT_RULES,
          'typescript/no-explicit-any': 'warn'
        }
      }
    ]
  },

  fmt: {
    // Ported verbatim from the old root prettier.config.js.
    ignorePatterns: IGNORE_PATTERNS,
    semi: false,
    singleQuote: true,
    trailingComma: 'none',
    tabWidth: 2,
    useTabs: false,
    printWidth: 80,
    bracketSpacing: true,
    endOfLine: 'lf',
    arrowParens: 'always',
    // Replaces the `import/order` rule from the old shared ESLint config:
    // Oxlint has no `import/order`, Oxfmt sorts imports instead.
    sortImports: {
      groups: [
        'builtin',
        'external',
        ['internal', 'subpath'],
        ['parent', 'sibling', 'index'],
        'style',
        'type',
        'unknown'
      ],
      // `@mikeallisonjs/*` workspace packages counted as `internal` under the
      // old `pathGroups` config.
      internalPattern: ['@mikeallisonjs/**', '~/', '@/', '#'],
      newlinesBetween: true,
      ignoreCase: true,
      order: 'asc'
    },
    overrides: [
      {
        // These two packages had `import/order` switched off; shadcn component
        // files keep their authored import order.
        files: ['packages/ui/**', 'packages/shared-react-components/**'],
        options: { sortImports: false }
      }
    ]
  },

  staged: {
    '*.{js,jsx,mjs,ts,tsx,json,css,md}': 'vp check --fix'
  }
})
