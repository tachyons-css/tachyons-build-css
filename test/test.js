import fs from 'fs'
import test from 'ava'
import colorFunction from 'postcss-color-function'

import tachyonsBuildCss from '../'

const input = fs.readFileSync('test/fixtures/input.css', 'utf8')
const cssOutput = fs.readFileSync('test/fixtures/output.css', 'utf8')
const cssMinOutput = fs.readFileSync('test/fixtures/output.min.css', 'utf8')
const cssRepeatOutput = fs.readFileSync('test/fixtures/output.repeat.css', 'utf8')
const inputColorFunction = fs.readFileSync('test/fixtures/input_color_function.css', 'utf8')
const cssColorFunctionOutput = fs.readFileSync('test/fixtures/output_color_function.css', 'utf8')

test.cb('processes source code', t => {
  testFixture(t, input, cssOutput)
})

test.cb('processes source code and minifies css', t => {
  testFixture(t, input, cssMinOutput, { minify: true })
})

test.cb('processes source code and repeats classes', t => {
  testFixture(t, input, cssRepeatOutput, { repeat: 4 })
})

test.cb('processes source code with custom plugins', t => {
  testFixture(t, inputColorFunction, cssColorFunctionOutput, { plugins: [colorFunction()] })
})

function testFixture (t, input, output, opts) {
  tachyonsBuildCss(input, opts).then(result => {
    t.deepEqual(result.css.trim(), output.trim())
    t.end()
  })
}
