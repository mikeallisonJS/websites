import { config } from '@mikeallisonjs/eslint-config/react-internal'

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    rules: {
      'import/order': 'off'
    }
  }
]
