import fs from 'fs'
import test from 'ava'

import tachyonsBuildCss from '../'

const input = fs.readFileSync('fixtures/input.css', 'utf8')
const cssOutput = fs.readFileSync('fixtures/output.css', 'utf8').trim()
const cssMinOutput = fs.readFileSync('fixtures/output.min.css', 'utf8').trim()
const cssRepeatOutput = fs.readFileSync('fixtures/output.repeat.css', 'utf8').trim()

test('processes source code', t => {
  testFixture(t, input, cssOutput)
})

test('processes source code and minifies css', t => {
  testFixture(t, input, cssOutput, { minify: true })
})

test('processes source code and repeats classes', t => {
  testFixture(t, input, cssOutput, { repeat: 4 })
})

function testFixture (t, input, output, opts) {
  const result = tachyonsBuildCss(input, opts).then(result => {
    t.deepEqual(result.css, output)
  })
}
