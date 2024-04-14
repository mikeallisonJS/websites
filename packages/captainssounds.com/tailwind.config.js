const { join } = require('path')

const { createGlobPatternsForDependencies } = require('@nx/react/tailwind')

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
