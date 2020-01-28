const sveltex = require('@snlab/sveltex-unified')
const purgeHtml = require('purgecss-from-html')
const purgeSvelte = require('purgecss-from-svelte')
const tailwindcss = require('tailwindcss')

const purgeFromMd = (content) => {
  const html = sveltex.processor.processSync(content).toString()
  return purgeSvelte.extract(html)
}

const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.md', './src/**/*.svelte'],
  extractors: [{
    extractor: purgeFromMd,
    extensions: ['md']
  },
  {
    extractor: purgeHtml,
    extensions: ['html']
  },
  {
    extractor: purgeSvelte.extract,
    extensions: ['svelte']
  }]
})

module.exports = {
  plugins: [
    tailwindcss('./tailwind.js'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : [])
  ]
}
