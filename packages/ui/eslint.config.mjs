import { config } from '@mikeallisonjs/eslint-config/react-internal'

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    rules: {
      'import/order': 'off',
      // Disable React 19 migration hints for shadcn UI components
      '@eslint-react/no-context-provider': 'off',
      '@eslint-react/no-use-context': 'off',
      '@eslint-react/set-state-in-effect': 'off',
      '@eslint-react/use-state': 'off',
      '@eslint-react/dom-no-dangerously-set-innerhtml': 'off'
    }
  }
]
