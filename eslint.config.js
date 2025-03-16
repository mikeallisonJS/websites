import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import prettierPlugin from 'eslint-plugin-prettier'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'

// Base configuration for all JavaScript/TypeScript files
const baseConfig = {
  files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true
      }
    }
  },
  plugins: {
    '@typescript-eslint': tsPlugin,
    react: reactPlugin,
    'react-hooks': reactHooksPlugin,
    'jsx-a11y': jsxA11yPlugin,
    import: importPlugin,
    prettier: prettierPlugin
  },
  rules: {
    // Prettier integration
    'prettier/prettier': [
      'warn',
      {
        semi: false,
        singleQuote: true,
        trailingComma: 'none',
        tabWidth: 2,
        useTabs: false,
        printWidth: 80,
        bracketSpacing: true,
        arrowParens: 'avoid',
        endOfLine: 'lf'
      }
    ],

    // A11y rules
    'jsx-a11y/alt-text': 'warn',
    'jsx-a11y/aria-props': 'warn',
    'jsx-a11y/aria-role': 'warn',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/no-noninteractive-element-interactions': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn',

    // Complexity rules
    'no-useless-constructor': 'warn',

    // Correctness rules
    'no-use-before-define': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'warn',
    'react-hooks/exhaustive-deps': 'warn',

    // Style rules
    semi: ['warn', 'never'],
    quotes: ['warn', 'single'],
    'comma-dangle': ['warn', 'never'],

    // React rules
    'react/jsx-key': 'warn',
    'react/no-array-index-key': 'warn',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',

    // TypeScript rules
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn'
  }
}

// Configuration for TypeScript declaration files
const dtsConfig = {
  files: ['**/*.d.ts'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off'
  }
}

// Next.js specific rules for apps directory
const nextConfig = {
  files: ['apps/**/*.{js,mjs,cjs,jsx,ts,tsx}'],
  rules: {
    // Next.js specific rules
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton']
      }
    ]
  }
}

export default [
  {
    ignores: [
      'dist',
      '**/.next/**',
      '.vercel',
      'graphql-env.d.ts',
      'drizzle/meta',
      '**/drizzle/**',
      '**/src/lib/drizzle/meta/**',
      'storefront.schema.json',
      'node_modules'
    ]
  },
  baseConfig,
  dtsConfig,
  nextConfig
]
