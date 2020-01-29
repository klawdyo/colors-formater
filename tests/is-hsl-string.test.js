const test = require('tape')
const { isHSLString } = require('../HandleColors')

test('Is a HSL String Color', t => {

  tests = [
    // Verdadeiros
    { input: 'hsl(12, 0%, 20%)', expected: true, msg: null },
    // Falsos
    { input: 'hsl(460, 34%, 57%)', expected: false, msg: null, appendMsg: '"Hue" component cannot be bigger than 360' },
    { input: 'hsl(12, 260%, 57%)', expected: false, msg: null, appendMsg: '"Saturation" component cannot be bigger than 100%' },
    { input: 'hsl(12, 34%, 260%)', expected: false, msg: null, appendMsg: '"Light" component cannot be bigger than 100%' },
    { input: 'hsl(12, 34%, 80)', expected: false, msg: null, appendMsg: '"Saturation" component is not in percent format' },
    { input: 'hsl(12, 34, 80%)', expected: false, msg: null, appendMsg: '"Light" component is not in percent format' },
  ]

  tests.forEach(({ input, expected, msg = null, appendMsg = '' }) => {
    msg = msg ? msg : `isHSLString(${input}) returns ${expected}. ${appendMsg}`
    t.equal(isHSLString(input), expected, msg)
  })





  t.end()
})
