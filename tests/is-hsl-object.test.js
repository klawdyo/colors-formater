const test = require('tape')
const { isHSLObject } = require('../HandleColors')

test('Is a HSL Object Color', t => {

  tests = [
    // Verdadeiros
    { input: { h: 12, s: '0%', l: '20%' }, expected: true, msg: null },
    // Falsos
    { input: { h: 460, s: '34%', l: '57%' }, expected: false, msg: null, appendMsg: '"Hue" component cannot be bigger than 360' },
    { input: { h: 12, s: '260%', l: '57%' }, expected: false, msg: null, appendMsg: '"Saturation" component cannot be bigger than 100%' },
    { input: { h: 12, s: '34%', l: '260%' }, expected: false, msg: null, appendMsg: '"Light" component cannot be bigger than 100%' },
    { input: { h: 12, s: '34%', l: '80' }, expected: false, msg: null, appendMsg: '"Saturation" component is not in percent format' },
    { input: { h: 12, s: '34', l: '80%' }, expected: false, msg: null, appendMsg: '"Light" component is not in percent format' },

  ]

  tests.forEach(({ input, expected, msg = null, appendMsg = '' }) => {
    msg = msg ? msg : `isHSLObject(${JSON.stringify(input)}) returns ${JSON.stringify(expected)}. ${appendMsg}`
    t.equal(isHSLObject(input), expected, msg)
  })





  t.end()
})
