const test = require('tape')
const { isRGBString } = require('../dist/HandleColors')

console.log(process.env);


test('Is a RGB String Color', t => {

  tests = [
    // Verdadeiros
    { input: 'rgb(12, 34, 57)', expected: true, msg: null },
    // Falsos
    { input: 'rgb(260, 34, 57)', expected: false, msg: null, appendMsg: '"R" component cannot be bigger than 255' },
    { input: 'rgb(12, 260, 57)', expected: false, msg: null, appendMsg: '"G" component cannot be bigger than 255' },
    { input: 'rgb(12, 34, 260)', expected: false, msg: null, appendMsg: '"B" component cannot be bigger than 255' },

  ]

  tests.forEach(({ input, expected, msg = null, appendMsg = '' }) => {
    msg = msg ? msg : `isRGBString(${input}) returns ${expected}. ${appendMsg}`
    t.equal(isRGBString(input), expected, msg)
  })

  t.end()
})

test('Parameter is false', t => {
  t.equal(isRGBString(null), false, 'isRGBString(null) is false')
  t.end()
})