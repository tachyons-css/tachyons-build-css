import fs from 'fs'
import test from 'ava'

const cssOutput = fs.readFileSync('fixtures/output.css', 'utf8').trim()
const cssRepeatOutput = fs.readFileSync('fixtures/output.repeat.css', 'utf8').trim()

test('processes source code', async t => {

  t.same(stdout.trim(), cssOutput)
})

test('processes source code and repeats classes', async t => {

  t.same(stdout.trim(), cssRepeatOutput)
})
