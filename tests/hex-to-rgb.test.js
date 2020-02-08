const test = require('tape')
const { hexToRgb } = require('../dist/HandleColors')

test('Try convert a VALID Hexadecimal Color to RGB', t => {

  tests = [
    { input: '123', expected: { r: 17, g: 34, b: 51 }, msg: null },
    { input: '#123', expected: { r: 17, g: 34, b: 51 }, msg: null },
    { input: '112233', expected: { r: 17, g: 34, b: 51 }, msg: null },
    { input: '#112233', expected: { r: 17, g: 34, b: 51 }, msg: null },
    { input: 'abc', expected: { r: 170, g: 187, b: 204 }, msg: null },
    { input: '#abc', expected: { r: 170, g: 187, b: 204 }, msg: null },
  ]

  tests.forEach(({ input, expected, msg = null }) => {
    msg = msg ? msg : `hexToRgb(${input}) returns ${JSON.stringify(expected)}`
    t.deepEqual(hexToRgb(input), expected, msg)
  })

  t.equal(hexToRgb('#CLA'), null, `hexToRgb('#CLA') returns null`)

  t.end()
})


// test('Try convert an INVALID Hexadecimal Color to RGB', t => {

//   tests = [
//     { input: '#CLA', expected: null, msg: null },
//   ]

//   tests.forEach(({ input, expected, msg = null }) => {
//     msg = msg ? msg : `hexToRgb(${input}) returns ${JSON.stringify(expected)}`
//     t.equal(hexToRgb(input), expected, msg)
//   })

//   t.end()
// })

