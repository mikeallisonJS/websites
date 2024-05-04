const TailwindConfig = require('../shared/react/lib/src/shadcnUtils/tailwind.config.js')

module.exports = {
  ...TailwindConfig,
  fontFamily: {
    ...TailwindConfig.fontFamily,
    arimo: ['--font-arimo']
  }
}
