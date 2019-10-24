const fs = require('fs')
const test = require('ava')
const colorFunction = require('postcss-color-function')

const tachyonsBuildCss = require('../')
const { getPlugins } = require('../')

const input = fs.readFileSync('test/fixtures/input.css', 'utf8')

test('processes source code', async t => {
  const result = await tachyonsBuildCss(input)

  t.snapshot(result.css)
})

test('processes source code and minifies css', async t => {
  const result = await tachyonsBuildCss(input, { minify: true })

  t.snapshot(result.css)
})

test('processes source code and repeats classes', async t => {
  const result = await tachyonsBuildCss(input, { repeat: 4 })

  t.snapshot(result.css)
})

test('processes source code with custom plugins', async t => {
  const result = await tachyonsBuildCss(input, { plugins: [colorFunction()] })

  t.snapshot(result.css)
})

test('processes source code with optional rtl support', async t => {
  const rtlInput = fs.readFileSync('node_modules/tachyons-floats/src/tachyons-floats.css', 'utf8')
  const result = await tachyonsBuildCss(rtlInput, { rtl: true })

  t.snapshot(result.css)
})

test('getPlugins returns array of plugins', t => {
  const plugins = getPlugins()

  t.true(Array.isArray(plugins), 'returns an array')
  t.true(plugins.every(plugin => typeof plugin === 'function'), 'all plugins are functions')
})
