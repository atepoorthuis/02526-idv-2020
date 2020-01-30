// const sveltex = require('@snlab/sveltex-unified')
const purgeHtml = require('purgecss-from-html')
const purgeSvelte = require('purgecss-from-svelte')
const tailwindcss = require('tailwindcss')
const rpc = require('sync-rpc')

// async version
// cannot be used until purgecss is updated to support async extractors
// const purgeFromMd = async (content) => {
//   const result = await sveltex.processor.process(content)
//   const html = result.toString()
//   return purgeSvelte.extract(html)
// }

// this version is made synchronous by using sync-rpc
// it's a hack but can't seem to find a way around it for now
const purgeFromMd = rpc(require.resolve('./postcss.asyncmd.js'))

const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.md', './src/**/*.svelte'],
  extractors: [
    {
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
