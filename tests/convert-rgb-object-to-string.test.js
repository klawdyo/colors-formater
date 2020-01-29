const test = require('tape')
const { convertRGBObjectToString } = require('../HandleColors')

test('Try to Convert RGB Object to String', t => {

  tests = [
    // Verdadeiros
    { input: { r: 240, g: 240, b: 240 }, expected: 'rgb(240, 240, 240)', msg: null },
    // Falsos
    { input: { r: 260, g: 240, b: 240 }, expected: null, msg: null, appendMsg: '"Reg" component cannot be bigger than 255' },
    { input: { r: 240, g: 260, b: 240 }, expected: null, msg: null, appendMsg: '"Green" component cannot be bigger than 255' },
    { input: { r: 240, g: 240, b: 260 }, expected: null, msg: null, appendMsg: '"Blue" component cannot be bigger than 255' },

  ]

  tests.forEach(({ input, expected, msg = null, appendMsg = '' }) => {
    msg = msg ? msg : `convertRGBObjectToString(${JSON.stringify(input)}) returns ${JSON.stringify(expected)}. ${appendMsg}`
    t.equal(convertRGBObjectToString(input), expected, msg)
  })





  t.end()
})
