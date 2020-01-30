const sveltex = require('@snlab/sveltex-unified')
const purgeSvelte = require('purgecss-from-svelte')

function purgeFromMd () {
  return async function (content) {
    const result = await sveltex.processor.process(content)
    const html = result.toString()
    return purgeSvelte.extract(html)
  }
}

module.exports = purgeFromMd
