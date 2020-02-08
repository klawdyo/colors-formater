const test = require('tape')
const { normalizeHex } = require('../dist/HandleColors')

test('Normalize Hexadecimal Color', t => {

  tests = [
    { input: '123', expected: '#112233', msg: null },
    { input: '#123', expected: '#112233', msg: null },
    { input: '#123345', expected: '#123345', msg: null },
    { input: '123567', expected: '#123567', msg: null },
    { input: '#abc', expected: '#AABBCC', msg: null },
    { input: 'abc', expected: '#AABBCC', msg: null },

    { input: '#1232', expected: null, msg: '"#1232" is not a valid hexadecimal color. Returns null' },
    { input: '#cla', expected: null, msg: '"#cla" is not a valid hexadecimal color. Returns null' },
    { input: 'cla', expected: null, msg: '"cla" is not a valid hexadecimal color. Returns null' },

  ]

  tests.forEach(({ input, expected, msg = null }) => {
    msg = msg ? msg : `normalizeHex(${input}) returns ${expected}`
    t.equal(normalizeHex(input), expected, msg)
  })





  t.end()
})
