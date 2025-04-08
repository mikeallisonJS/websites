import type { Config } from 'tailwindcss'
import { tailwindConfig } from '@mikeallisonjs/shared-react-lib'

const config: Config = {
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
}

export default config
