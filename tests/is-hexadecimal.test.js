const test = require('tape')
const { isHexadecimal } = require('../dist/HandleColors')

test('Is a VALID Hexadecimal Color', t => {

  tests = [
    { input: '123', expected: true, msg: null },
    { input: '#123', expected: true, msg: null },
    { input: '#123345', expected: true, msg: null },
    { input: '123567', expected: true, msg: null },
    { input: '#abc', expected: true, msg: null },
    { input: 'abc', expected: true, msg: null },
  ]

  tests.forEach(({ input, expected, msg = null }) => {
    msg = msg ? msg : `isHexadecimal(${input}) returns ${expected}`
    t.equal(isHexadecimal(input), expected, msg)
  })

  t.end()
})
test('Is a INVALID Hexadecimal Color', t => {

  tests = [
    { input: '#1232', expected: false, msg: '"#1232" is not a valid hexadecimal color. Returns false' },
    { input: '#cla', expected: false, msg: '"#cla" is not a valid hexadecimal color. Returns false' },
    { input: 'cla', expected: false, msg: '"cla" is not a valid hexadecimal color. Returns false' },
  ]

  tests.forEach(({ input, expected, msg = null }) => {
    msg = msg ? msg : `isHexadecimal(${input}) returns ${expected}`
    t.equal(isHexadecimal(input), expected, msg)
  })

  t.end()
})
