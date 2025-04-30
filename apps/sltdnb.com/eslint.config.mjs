import { nextJsConfig } from '@mikeallisonjs/eslint-config/next-js'

export default [
  ...nextJsConfig,
  {
    rules: {
      // Override rules from the shared config
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'react-hooks/rules-of-hooks': 'warn',
      '@next/next/no-html-link-for-pages': 'warn',
      'react/no-unescaped-entities': 'warn'
    }
  }
]