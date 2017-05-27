'use strict'

const postcss = require('postcss')
const cssnano = require('cssnano')
const queries = require('css-mqpacker')
const perfect = require('perfectionist')
const prefixer = require('autoprefixer')
const atImport = require('postcss-import')
const media = require('postcss-custom-media')
const vars = require('postcss-css-variables')
const conditionals = require('postcss-conditionals')
const rmComments = require('postcss-discard-comments')
const classRepeat = require('postcss-class-repeat')

const getPlugins = function (options) {
  options = options || {}

  const perfectionistOptions = options.perfectionist || {
    format: 'compact',
    trimTrailingZeros: false
  }

  const atImportOptions = options.atImport || {}

  const plugins = [
    atImport(atImportOptions), vars(), conditionals(), media(), queries(), perfect(perfectionistOptions), prefixer()
  ]

  if (options.minify) {
    plugins.push(cssnano())
    plugins.push(rmComments())
  }

  if (options.repeat) {
    let repeatNum = parseInt(options.repeat) || 4

    if (repeatNum < 2) {
      repeatNum = 4
    }

    plugins.push(classRepeat({ repeat: repeatNum }))
  }

  if (options.plugins) {
    plugins.push(...options.plugins)
  }

  return plugins
}

module.exports = function tachyonsBuild (css, options) {
  const plugins = getPlugins(options)

  return postcss(plugins).process(css, options)
}

module.exports.getPlugins = getPlugins
