const test = require('tape')
const { convertHSLObjectToString } = require('../dist/HandleColors')

test('Try convert a HSL Object to String', t => {

  tests = [
    // Verdadeiros
    { input: { h: 12, s: '0%', l: '20%' }, expected: 'hsl(12, 0%, 20%)', msg: null },
    // Falsos
    { input: { h: 460, s: '34%', l: '57%' }, expected: null, msg: null, appendMsg: '"Hue" component cannot be bigger than 360' },
    { input: { h: 12, s: '260%', l: '57%' }, expected: null, msg: null, appendMsg: '"Saturation" component cannot be bigger than 100%' },
    { input: { h: 12, s: '34%', l: '260%' }, expected: null, msg: null, appendMsg: '"Light" component cannot be bigger than 100%' },
    { input: { h: 12, s: '34%', l: '80' }, expected: null, msg: null, appendMsg: '"Saturation" component is not in percent format' },
    { input: { h: 12, s: '34', l: '80%' }, expected: null, msg: null, appendMsg: '"Light" component is not in percent format' },

  ]

  tests.forEach(({ input, expected, msg = null, appendMsg = '' }) => {
    msg = msg ? msg : `convertHSLObjectToString(${JSON.stringify(input)}) returns ${JSON.stringify(expected)}. ${appendMsg}`
    t.equal(convertHSLObjectToString(input), expected, msg)
  })

  t.end()
})
