const test = require('tape')
const { convertRGBStringToObject } = require('../HandleColors')

test('Convert RGB String to Object', t => {

  tests = [
    // Verdadeiros
    { input: 'rgb(12, 45, 67)', expected: { r: 12, g: 45, b: 67 }, msg: null },
    // Falsos
    { input: 'rgb(260, 45, 67)', expected: null, msg: null, appendMsg: '"Red" component cannot be bigger than 255' },
    { input: 'rgb(12, 260, 67)', expected: null, msg: null, appendMsg: '"Green" component cannot be bigger than 255' },
    { input: 'rgb(12, 45, 260)', expected: null, msg: null, appendMsg: '"Blue" component cannot be bigger than 255' },
  ]

  tests.forEach(({ input, expected, msg = null, appendMsg = '' }) => {
    msg = msg ? msg : `convertRGBStringToObject(${JSON.stringify(input)}) returns ${JSON.stringify(expected)}. ${appendMsg}`
    t.deepEqual(convertRGBStringToObject(input), expected, msg)
  })





  t.end()
})
