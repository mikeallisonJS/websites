import { type Config } from 'tailwindcss'
import { tailwindConfig } from '@mikeallisonjs/shared-react-lib'

export default {
  ...tailwindConfig,
  theme: {
    ...tailwindConfig.theme,
    extend: {
      ...tailwindConfig.theme?.extend,
      fontFamily: {
        arimo: ['--font-arimo']
      }
    }
  }
} satisfies Config
