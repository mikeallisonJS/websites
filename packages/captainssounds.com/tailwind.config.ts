import { join } from 'path'

import { createGlobPatternsForDependencies } from '@nx/react/tailwind'

module.exports = {
  content: [
    join(
      __dirname,
      '{src,lib,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname)
  ],
  theme: {
    extend: {}
  },
  plugins: []
}

// import { buildConfig } from '@websites/shared/react'

// export default buildConfig(__dirname)
